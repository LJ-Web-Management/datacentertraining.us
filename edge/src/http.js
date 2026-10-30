// Response helpers shared by the edge handlers.
import contract from '../contract.json' with { type: 'json' };

export const SITE = 'https://datacentertraining.us';
export const DOCS = SITE + '/developers/';

export const EXPOSE_HEADERS = [
  'API-Version', 'RateLimit', 'RateLimit-Policy', 'RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset',
  'Retry-After', 'Link', 'Mcp-Session-Id', 'MCP-Protocol-Version', 'Content-Location'
].join(', ');

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Expose-Headers': EXPOSE_HEADERS
};

export function preflight(allow) {
  return new Response(null, {
    status: 204,
    headers: Object.assign({}, CORS, {
      Allow: allow,
      'Access-Control-Allow-Methods': allow,
      'Access-Control-Allow-Headers': 'Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID',
      'Access-Control-Max-Age': '86400'
    })
  });
}

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body, null, 2) + '\n', {
    status,
    headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, CORS, headers)
  });
}

// RFC 9457 problem details. `code` must be one of edge/contract.json "errors",
// which is what openapi.json and the developer portal publish.
export function problem(code, detail, instance, extra = {}, headers = {}) {
  const def = contract.errors[code];
  if (!def) throw new Error('Undocumented error code: ' + code);
  const body = Object.assign({
    type: DOCS + '#error-' + code,
    title: def.title,
    status: def.status,
    code,
    detail,
    hint: def.hint,
    instance,
    docs: DOCS + '#errors'
  }, extra);
  return new Response(JSON.stringify(body, null, 2) + '\n', {
    status: def.status,
    headers: Object.assign({ 'Content-Type': 'application/problem+json; charset=utf-8', 'Cache-Control': 'no-store' }, CORS, headers)
  });
}

// A copy of `response` with extra headers (and optionally a new body/status).
export function withHeaders(response, headers, init = {}) {
  const out = new Response(init.body !== undefined ? init.body : response.body, {
    status: init.status || response.status,
    statusText: init.status ? undefined : response.statusText,
    headers: response.headers
  });
  for (const [k, v] of Object.entries(headers)) {
    if (v === null) out.headers.delete(k);
    else out.headers.set(k, v);
  }
  return out;
}

// Adds `value` to a Vary header without duplicating it.
export function vary(existing, value) {
  const parts = (existing || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!parts.some((p) => p.toLowerCase() === value.toLowerCase() || p === '*')) parts.push(value);
  return parts.join(', ');
}
