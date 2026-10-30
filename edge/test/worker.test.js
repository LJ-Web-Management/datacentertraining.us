// End-to-end: the Worker in front of the repository files, checked against
// the published contract (edge/contract.json, openapi.json, mcp.json).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import contract from '../contract.json' with { type: 'json' };
import engine from '../../js/webmcp.js';
import { call, mcp, readJson, reset, loadAjv, ROOT, SITE } from './helpers.js';

const BROWSER = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
const manifest = readJson('.well-known/mcp.json');
const openapi = readJson('openapi.json');
const ajv = loadAjv();

test.beforeEach(reset);

function assertRateHeaders(res) {
  const { requests, window_seconds: w, policy } = contract.rate_limit;
  assert.equal(res.headers.get('RateLimit-Policy'), '"' + policy + '";q=' + requests + ';w=' + w);
  assert.match(res.headers.get('RateLimit'), new RegExp('^"' + policy + '";r=\\d+;t=\\d+$'));
  assert.equal(res.headers.get('RateLimit-Limit'), String(requests));
  assert.match(res.headers.get('RateLimit-Remaining'), /^\d+$/);
  assert.match(res.headers.get('RateLimit-Reset'), /^\d+$/);
  assert.equal(res.headers.get('API-Version'), contract.api_version);
}

async function assertProblem(res, status, code) {
  assert.equal(res.status, status);
  assert.match(res.headers.get('Content-Type'), /^application\/problem\+json/);
  const body = await res.json();
  assert.equal(body.code, code);
  assert.equal(body.status, status);
  assert.equal(body.type, SITE + '/developers/#error-' + code);
  assert.equal(body.title, contract.errors[code].title);
  assert.ok(body.detail && body.hint && body.instance);
  if (ajv) {
    const check = ajv.compile(openapi.components.schemas.Problem);
    assert.ok(check(body), ajv.errorsText(check.errors));
  }
  return body;
}

// ---- Markdown content negotiation (acceptmarkdown.com) ----

test('homepage: Accept text/markdown returns Markdown with Vary: Accept', async () => {
  const res = await call('/', { headers: { Accept: 'text/markdown' } });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.match(res.headers.get('Vary'), /\bAccept\b/);
  const body = await res.text();
  assert.match(body, /^# Data Center Training/);
  assert.ok(body.length > 1000);
  assert.ok(!/<(div|script|nav)\b/i.test(body), 'no HTML in the Markdown body');
});

test('homepage: Accept text/html and browsers still get HTML, with Vary and a Markdown alternate', async () => {
  for (const accept of ['text/html', BROWSER, '*/*', undefined]) {
    const res = await call('/', { headers: accept ? { Accept: accept } : {} });
    assert.equal(res.status, 200, String(accept));
    assert.match(res.headers.get('Content-Type'), /^text\/html/);
    assert.match(res.headers.get('Vary'), /\bAccept\b/);
    assert.equal(res.headers.get('Link'), '</index.html.md>; rel="alternate"; type="text/markdown"');
    assert.match(await res.text(), /^<!DOCTYPE html>/);
  }
});

test('every sitemap page negotiates to its Markdown copy', async () => {
  const xml = readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(urls.length > 100);
  for (const u of urls) {
    const res = await call(new URL(u).pathname, { headers: { Accept: 'text/markdown' } });
    assert.equal(res.status, 200, u);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8', u);
    assert.match(await res.text(), /^# \S/, u);
  }
});

test('extensionless and directory URLs map to the right Markdown copy', async () => {
  const cases = { '/courses': '/courses.html.md', '/learn/': '/learn/index.html.md', '/learn': '/learn/index.html.md', '/about.html': '/about.html.md' };
  for (const [p, md] of Object.entries(cases)) {
    const res = await call(p, { headers: { Accept: 'text/markdown' } });
    assert.equal(res.status, 200, p);
    assert.equal(res.headers.get('Content-Location'), md, p);
  }
});

test('HEAD with Accept text/markdown returns headers only', async () => {
  const res = await call('/', { method: 'HEAD', headers: { Accept: 'text/markdown' } });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(await res.text(), '');
});

test('a page with no Markdown copy (noindex checkout) falls back to HTML', async () => {
  const res = await call('/checkout.html', { headers: { Accept: 'text/markdown' } });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('Content-Type'), /^text\/html/);
  assert.match(res.headers.get('Vary'), /\bAccept\b/);
});

test('direct .html.md requests are Markdown with a canonical link to the HTML page', async () => {
  const res = await call('/index.html.md');
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(res.headers.get('Link'), '<' + SITE + '/>; rel="canonical"');
  const about = await call('/about.html.md');
  assert.equal(about.headers.get('Link'), '<' + SITE + '/about.html>; rel="canonical"');
});

test('static assets pass through untouched', async () => {
  const res = await call('/llms.txt', { headers: { Accept: 'text/markdown' } });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('Content-Type'), /^text\/plain/);
  assert.equal(res.headers.get('Vary'), 'Accept-Encoding');
});

// ---- Agent-friendly 404s ----

test('404 with Accept text/markdown: status 404, Markdown body linking llms.txt', async () => {
  const res = await call('/__ora-404-probe-8f79odt7', { headers: { Accept: 'text/markdown' } });
  assert.equal(res.status, 404);
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  const body = await res.text();
  assert.ok(body.length >= 20);
  assert.match(body, /^# 404 Not Found/);
  assert.ok(body.includes(SITE + '/llms.txt') && body.includes(SITE + '/sitemap.xml') && body.includes(SITE + '/developers/'));
});

test('404 for browsers keeps the HTML page; for JSON clients it is problem+json', async () => {
  const html = await call('/no-such-page', { headers: { Accept: BROWSER } });
  assert.equal(html.status, 404);
  assert.match(html.headers.get('Content-Type'), /^text\/html/);
  assert.match(await html.text(), /We couldn't find that page/);
  await assertProblem(await call('/no-such-page', { headers: { Accept: 'application/json' } }), 404, 'not_found');
  const md = await call('/missing/file.pdf', { headers: { Accept: 'text/markdown' } });
  assert.equal(md.status, 404);
  assert.equal(md.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
});

// ---- JSON API: errors, versioning, rate limits ----

test('API documents: v1 and unversioned alias, with rate-limit and version headers', async () => {
  for (const p of ['/api/v1/courses.json', '/api/courses.json', '/api/v1/courses/ups-systems-fundamentals.json']) {
    const res = await call(p);
    assert.equal(res.status, 200, p);
    assert.match(res.headers.get('Content-Type'), /^application\/json/);
    assertRateHeaders(res);
    assert.equal(res.headers.get('Access-Control-Allow-Origin'), '*');
    assert.equal(res.headers.get('Link'), '<' + SITE + '/openapi.json>; rel="service-desc"');
    await res.json();
  }
});

test('API errors are problem+json', async () => {
  const missing = await call('/api/v1/courses/ups-101.json');
  assertRateHeaders(missing);
  const body = await assertProblem(missing, 404, 'not_found');
  assert.equal(body.instance, '/api/v1/courses/ups-101.json');
  await assertProblem(await call('/api/nonexistent', { headers: { Accept: 'application/json' } }), 404, 'not_found');
  const post = await call('/api/v1/courses.json', { method: 'POST', body: '{}' });
  assert.equal(post.headers.get('Allow'), 'GET, HEAD, OPTIONS');
  await assertProblem(post, 405, 'method_not_allowed');
});

test('API root: JSON index for clients, developer portal for browsers', async () => {
  const res = await call('/api/v1/', { headers: { Accept: 'application/json' } });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).api_version, contract.api_version);
  const curl = await call('/api');
  assert.equal(curl.status, 200);
  const browser = await call('/api/', { headers: { Accept: BROWSER } });
  assert.equal(browser.status, 302);
  assert.equal(browser.headers.get('Location'), SITE + '/developers/');
});

test('rate limit: 429 with Retry-After after the quota, per client', async () => {
  const { requests } = contract.rate_limit;
  let last;
  for (let i = 0; i < requests; i++) {
    last = await call('/api/v1/index.json', { clientIp: '203.0.113.7' });
    assert.equal(last.status, 200, 'request ' + (i + 1));
  }
  assert.equal(last.headers.get('RateLimit-Remaining'), '0');
  const limited = await call('/api/v1/index.json', { clientIp: '203.0.113.7' });
  assert.match(limited.headers.get('Retry-After'), /^\d+$/);
  assertRateHeaders(limited);
  const body = await assertProblem(limited, 429, 'rate_limited');
  assert.equal(body.retry_after_seconds, Number(limited.headers.get('Retry-After')));
  assert.equal((await call('/api/v1/index.json', { clientIp: '203.0.113.8' })).status, 200);
});

test('CORS preflight', async () => {
  const res = await call('/mcp', { method: 'OPTIONS', headers: { Origin: 'https://agent.example', 'Access-Control-Request-Method': 'POST' } });
  assert.equal(res.status, 204);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), '*');
  assert.match(res.headers.get('Access-Control-Allow-Headers'), /MCP-Protocol-Version/);
});

// ---- REST tool endpoints ----

test('every tool endpoint returns the engine output, valid against its outputSchema', async () => {
  const data = {};
  for (const f of ['courses', 'bundles', 'roles', 'faq', 'credentials', 'resources']) data[f] = readJson('api/v1/' + f + '.json');
  for (const tool of manifest.tools) {
    for (const ex of tool.examples) {
      const res = await call(contract.tools_path + '/' + tool.name, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ex.input) });
      assert.equal(res.status, 200, tool.name);
      assertRateHeaders(res);
      const out = await res.json();
      assert.deepEqual(out, engine.run(tool.name, ex.input, data), tool.name);
      if (ajv) {
        const check = ajv.compile(tool.outputSchema);
        assert.ok(check(out), tool.name + ': ' + ajv.errorsText(check.errors));
      }
    }
  }
});

test('tool GET with query parameters, and an empty POST body, use defaults', async () => {
  const res = await call(contract.tools_path + '/list_courses?query=UPS&max_price_usd=150&limit=2');
  assert.equal(res.status, 200);
  const out = await res.json();
  assert.ok(out.courses.length <= 2);
  assert.ok(out.courses.every((c) => c.price_usd <= 150));
  const empty = await call(contract.tools_path + '/compare_bundles', { method: 'POST' });
  assert.equal(empty.status, 200);
});

test('tool errors: invalid input, bad JSON, wrong media type, unknown tool, wrong method', async () => {
  const bad = await call(contract.tools_path + '/list_courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"max_price_usd": -1, "colour": "red"}' });
  const body = await assertProblem(bad, 400, 'invalid_input');
  assert.deepEqual(body.errors.map((e) => e.path).sort(), ['/colour', '/max_price_usd']);
  const query = await call(contract.tools_path + '/list_courses?limit=many');
  assert.deepEqual((await assertProblem(query, 400, 'invalid_input')).errors.map((e) => e.path), ['/limit']);
  await assertProblem(await call(contract.tools_path + '/list_courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{nope' }), 400, 'invalid_json');
  await assertProblem(await call(contract.tools_path + '/list_courses', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: 'UPS' }), 415, 'unsupported_media_type');
  await assertProblem(await call(contract.tools_path + '/enroll_user', { method: 'POST', body: '{}' }), 404, 'unknown_tool');
  await assertProblem(await call(contract.tools_path + '/'), 404, 'unknown_tool');
  const del = await call(contract.tools_path + '/list_courses', { method: 'DELETE' });
  assert.equal(del.headers.get('Allow'), 'GET, POST, OPTIONS');
  await assertProblem(del, 405, 'method_not_allowed');
});

// ---- Remote MCP server (Streamable HTTP) ----

test('MCP initialize negotiates the protocol version', async () => {
  for (const v of contract.mcp_protocol_versions) {
    const res = await mcp({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: v, capabilities: {}, clientInfo: { name: 't', version: '1' } } });
    assert.equal(res.status, 200);
    assert.match(res.headers.get('Content-Type'), /^application\/json/);
    const r = await res.json();
    assert.equal(r.jsonrpc, '2.0');
    assert.equal(r.id, 1);
    assert.equal(r.result.protocolVersion, v);
    assert.equal(r.result.serverInfo.name, manifest.name);
    assert.deepEqual(r.result.capabilities, { tools: { listChanged: false }, resources: { subscribe: false, listChanged: false } });
    assert.match(r.result.instructions, /^Use these tools when/);
  }
  const old = await (await mcp({ jsonrpc: '2.0', id: 'a', method: 'initialize', params: { protocolVersion: '2023-01-01' } })).json();
  assert.equal(old.result.protocolVersion, contract.mcp_protocol_versions[0]);
});

test('MCP notifications get 202 with no body', async () => {
  const res = await mcp({ jsonrpc: '2.0', method: 'notifications/initialized' });
  assert.equal(res.status, 202);
  assert.equal(await res.text(), '');
});

test('MCP tools/list mirrors the manifest; fields follow the protocol version', async () => {
  const v2025 = await (await mcp({ jsonrpc: '2.0', id: 2, method: 'tools/list' }, { headers: { 'MCP-Protocol-Version': '2025-06-18' } })).json();
  assert.deepEqual(v2025.result.tools.map((t) => t.name), manifest.tools.map((t) => t.name));
  for (const t of v2025.result.tools) {
    const m = manifest.tools.find((x) => x.name === t.name);
    assert.deepEqual(t.inputSchema, m.inputSchema);
    assert.deepEqual(t.outputSchema, m.outputSchema);
    assert.equal(t.inputSchema.type, 'object');
    assert.equal(t.annotations.readOnlyHint, true);
  }
  const v2024 = await (await mcp({ jsonrpc: '2.0', id: 2, method: 'tools/list' }, { headers: { 'MCP-Protocol-Version': '2024-11-05' } })).json();
  assert.ok(v2024.result.tools.every((t) => !('outputSchema' in t) && !('annotations' in t)));
});

test('MCP tools/call returns content and structuredContent valid against outputSchema', async () => {
  for (const tool of manifest.tools) {
    const r = await (await mcp({ jsonrpc: '2.0', id: tool.name, method: 'tools/call', params: { name: tool.name, arguments: tool.examples[0].input } }, { headers: { 'MCP-Protocol-Version': '2025-06-18' } })).json();
    assert.equal(r.result.isError, false, tool.name);
    assert.deepEqual(JSON.parse(r.result.content[0].text), r.result.structuredContent);
    if (ajv) {
      const check = ajv.compile(tool.outputSchema);
      assert.ok(check(r.result.structuredContent), tool.name + ': ' + ajv.errorsText(check.errors));
    }
  }
});

test('MCP tool input errors are tool results; protocol errors are JSON-RPC errors', async () => {
  const invalid = await (await mcp({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'list_courses', arguments: { limit: 0 } } })).json();
  assert.equal(invalid.result.isError, true);
  assert.match(invalid.result.content[0].text, /\/limit/);
  const unknown = await (await mcp({ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'enroll', arguments: {} } })).json();
  assert.equal(unknown.error.code, -32602);
  const method = await (await mcp({ jsonrpc: '2.0', id: 6, method: 'prompts/get' })).json();
  assert.equal(method.error.code, -32601);
  const parse = await mcp('{"jsonrpc": "2.0", "id": 7, "method": ');
  assert.equal(parse.status, 400);
  assert.equal((await parse.json()).error.code, -32700);
  const invalidReq = await mcp({ id: 8, method: 'ping' });
  assert.equal(invalidReq.status, 400);
  assert.equal((await invalidReq.json()).error.code, -32600);
});

test('MCP ping, batches, and resources', async () => {
  const batch = await (await mcp([
    { jsonrpc: '2.0', id: 1, method: 'ping' },
    { jsonrpc: '2.0', method: 'notifications/initialized' },
    { jsonrpc: '2.0', id: 2, method: 'resources/list' }
  ])).json();
  assert.equal(batch.length, 2);
  assert.deepEqual(batch[0], { jsonrpc: '2.0', id: 1, result: {} });
  const llms = batch[1].result.resources.find((r) => r.name === 'llms.txt');
  const read = await (await mcp({ jsonrpc: '2.0', id: 3, method: 'resources/read', params: { uri: llms.uri } })).json();
  assert.match(read.result.contents[0].text, /^# Data Center Training/);
  const missing = await (await mcp({ jsonrpc: '2.0', id: 4, method: 'resources/read', params: { uri: SITE + '/secret.txt' } })).json();
  assert.equal(missing.error.code, -32002);
});

test('MCP transport errors: GET is 405, wrong media type 415, unsupported version 400', async () => {
  const get = await call('/mcp', { headers: { Accept: 'text/event-stream' } });
  assert.equal(get.headers.get('Allow'), 'POST, OPTIONS');
  await assertProblem(get, 405, 'method_not_allowed');
  await assertProblem(await call('/mcp', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: 'ping' }), 415, 'unsupported_media_type');
  const v = await assertProblem(await mcp({ jsonrpc: '2.0', id: 1, method: 'ping' }, { headers: { 'MCP-Protocol-Version': '1999-01-01' } }), 400, 'unsupported_protocol_version');
  assert.deepEqual(v.supported_versions, contract.mcp_protocol_versions);
});

// ---- Redirects and the published contract ----

test('/docs redirects to the developer portal', async () => {
  for (const p of ['/docs', '/docs/']) {
    const res = await call(p);
    assert.equal(res.status, 301);
    assert.equal(res.headers.get('Location'), SITE + '/developers/');
  }
});

test('every error code the Worker can emit is documented, and every documented code is emitted', () => {
  const src = readdirSync(path.join(ROOT, 'edge/src')).map((f) => readFileSync(path.join(ROOT, 'edge/src', f), 'utf8')).join('\n');
  const used = new Set([...src.matchAll(/problem\('([a-z_]+)'/g)].map((m) => m[1]));
  assert.deepEqual([...used].sort(), Object.keys(contract.errors).sort());
  assert.deepEqual(openapi.components.schemas.Problem.properties.code.enum, Object.keys(contract.errors));
  const portal = readFileSync(path.join(ROOT, 'developers/index.html'), 'utf8');
  for (const code of used) assert.ok(portal.includes('id="error-' + code + '"'), code + ' missing from the developer portal');
});

test('the manifest and OpenAPI advertise the endpoints the Worker serves', () => {
  assert.equal(manifest.endpoint, SITE + contract.mcp_path);
  assert.ok(manifest.transports.some((t) => t.type === 'streamable-http' && t.url === SITE + contract.mcp_path));
  assert.ok(openapi.paths[contract.mcp_path].post);
  for (const t of manifest.tools) assert.ok(openapi.paths[contract.tools_path + '/' + t.name].post, t.name);
  assert.ok(openapi.info.description.includes(contract.rate_limit.requests + ' per ' + contract.rate_limit.window_seconds + ' seconds'));
});

test('tools still work while the origin has not published /api/v1/ yet', async () => {
  const { default: worker } = await import('../src/worker.js');
  const { createLocalOrigin } = await import('../local-origin.js');
  const local = createLocalOrigin();
  const oldOrigin = { fetch: (req) => (new URL(req.url).pathname.startsWith('/api/v1/') ? new Response('Not Found', { status: 404 }) : local.fetch(req)) };
  const req = new Request(SITE + contract.tools_path + '/compare_bundles', { method: 'POST', headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.50' }, body: '{}' });
  const res = await worker.fetch(req, { ORIGIN: oldOrigin });
  assert.equal(res.status, 200);
  assert.ok((await res.json()).bundles.length > 0);
});
