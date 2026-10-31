// Remote MCP server over the Streamable HTTP transport
// (https://modelcontextprotocol.io/specification/2025-06-18/basic/transports).
// Stateless: every POST carries one JSON-RPC message or a batch, and the reply
// is application/json. No session ids are issued, and GET returns 405 because
// the server never sends messages of its own.
import contract from '../contract.json' with { type: 'json' };
import { json, problem } from './http.js';

const VERSIONS = contract.mcp_protocol_versions;
const LATEST = VERSIONS[0];
// The version a server assumes when a client sends no MCP-Protocol-Version.
const DEFAULT_VERSION = '2025-03-26';

export const JSONRPC = { PARSE_ERROR: -32700, INVALID_REQUEST: -32600, METHOD_NOT_FOUND: -32601, INVALID_PARAMS: -32602, INTERNAL_ERROR: -32603, RESOURCE_NOT_FOUND: -32002 };

const atLeast = (version, min) => version >= min;

function rpcError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  return { jsonrpc: '2.0', id: id === undefined ? null : id, error };
}

function toolForVersion(t, version) {
  const out = { name: t.name, description: t.description, inputSchema: t.inputSchema };
  if (atLeast(version, '2025-06-18')) {
    out.title = t.title;
    out.outputSchema = t.outputSchema;
  }
  if (atLeast(version, '2025-03-26') && t.annotations) out.annotations = t.annotations;
  return out;
}

function describeErrors(errors) {
  return errors.map((e) => e.path + ' ' + e.message).join('; ');
}

async function handleMessage(msg, headerVersion, catalog) {
  if (!msg || typeof msg !== 'object' || Array.isArray(msg) || msg.jsonrpc !== '2.0') {
    return rpcError(msg && typeof msg === 'object' ? msg.id : null, JSONRPC.INVALID_REQUEST, 'Invalid Request: expected a JSON-RPC 2.0 message');
  }
  // A response from the client (we never send requests, so nothing to match).
  if (!('method' in msg)) return null;
  const isNotification = !('id' in msg);
  if (typeof msg.method !== 'string') return isNotification ? null : rpcError(msg.id, JSONRPC.INVALID_REQUEST, 'Invalid Request: method must be a string');
  if (isNotification) return null; // notifications/initialized, notifications/cancelled, ...

  const id = msg.id;
  const params = msg.params && typeof msg.params === 'object' ? msg.params : {};
  const version = headerVersion || DEFAULT_VERSION;
  const ok = (result) => ({ jsonrpc: '2.0', id, result });

  switch (msg.method) {
    case 'initialize': {
      const manifest = await catalog.manifest();
      const negotiated = VERSIONS.includes(params.protocolVersion) ? params.protocolVersion : LATEST;
      return ok({
        protocolVersion: negotiated,
        capabilities: { tools: { listChanged: false }, resources: { subscribe: false, listChanged: false } },
        serverInfo: { name: manifest.name, title: manifest.title, version: manifest.version, websiteUrl: manifest.homepage },
        instructions: manifest.instructions
      });
    }
    case 'ping':
      return ok({});
    case 'tools/list': {
      const manifest = await catalog.manifest();
      return ok({ tools: manifest.tools.map((t) => toolForVersion(t, version)) });
    }
    case 'tools/call': {
      if (typeof params.name !== 'string') return rpcError(id, JSONRPC.INVALID_PARAMS, 'Invalid params: name is required');
      const args = params.arguments === undefined ? {} : params.arguments;
      const result = await catalog.run(params.name, args);
      if (result.unknown) return rpcError(id, JSONRPC.INVALID_PARAMS, 'Unknown tool: ' + params.name);
      // Input mistakes are tool errors, so the model sees them and can retry.
      if (result.errors) {
        return ok({ content: [{ type: 'text', text: 'Invalid arguments for ' + params.name + ': ' + describeErrors(result.errors) + '. See the tool inputSchema from tools/list.' }], isError: true });
      }
      const out = { content: [{ type: 'text', text: JSON.stringify(result.output) }], isError: false };
      if (atLeast(version, '2025-06-18')) out.structuredContent = result.output;
      return ok(out);
    }
    case 'resources/list': {
      const manifest = await catalog.manifest();
      return ok({ resources: manifest.resources.map((r) => ({ uri: r.uri, name: r.name, description: r.description, mimeType: r.mimeType })) });
    }
    case 'resources/read': {
      const manifest = await catalog.manifest();
      const r = manifest.resources.find((x) => x.uri === params.uri);
      if (!r) return rpcError(id, JSONRPC.RESOURCE_NOT_FOUND, 'Resource not found', { uri: params.uri });
      const text = await catalog.text(new URL(r.uri).pathname);
      return ok({ contents: [{ uri: r.uri, mimeType: r.mimeType, text }] });
    }
    default:
      return rpcError(id, JSONRPC.METHOD_NOT_FOUND, 'Method not found: ' + msg.method);
  }
}

export async function handleMcp(request, catalog, headers) {
  const path = new URL(request.url).pathname;
  if (request.method !== 'POST') {
    return problem('method_not_allowed', 'This MCP server is stateless and does not open a server-to-client stream; send JSON-RPC messages with POST.', path,
      { allowed_methods: ['POST', 'OPTIONS'] }, Object.assign({ Allow: 'POST, OPTIONS' }, headers));
  }
  const type = request.headers.get('Content-Type') || '';
  if (type && !/^application\/json\b/i.test(type)) {
    return problem('unsupported_media_type', 'Send JSON-RPC messages as application/json, not ' + type.split(';')[0] + '.', path, {}, headers);
  }
  const headerVersion = request.headers.get('MCP-Protocol-Version');
  if (headerVersion && !VERSIONS.includes(headerVersion)) {
    return problem('unsupported_protocol_version', 'MCP-Protocol-Version ' + headerVersion + ' is not supported.', path, { supported_versions: VERSIONS }, headers);
  }

  let body;
  try {
    body = JSON.parse(await request.text());
  } catch (e) {
    return json(rpcError(null, JSONRPC.PARSE_ERROR, 'Parse error: the request body is not valid JSON'), 400, headers);
  }
  const batch = Array.isArray(body);
  if (batch && !body.length) return json(rpcError(null, JSONRPC.INVALID_REQUEST, 'Invalid Request: empty batch'), 400, headers);

  const replies = [];
  for (const msg of batch ? body : [body]) {
    let reply;
    try {
      reply = await handleMessage(msg, headerVersion, catalog);
    } catch (e) {
      reply = rpcError(msg && msg.id, JSONRPC.INTERNAL_ERROR, e.upstream ? 'The catalog data is temporarily unavailable; retry shortly.' : 'Internal error');
    }
    if (reply) replies.push(reply);
  }
  if (!replies.length) return new Response(null, { status: 202, headers: Object.assign({ 'Access-Control-Allow-Origin': '*' }, headers) });
  const allInvalid = !batch && replies[0].error && replies[0].error.code === JSONRPC.INVALID_REQUEST;
  return json(batch ? replies : replies[0], allInvalid ? 400 : 200, headers);
}
