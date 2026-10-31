// Cloudflare Worker in front of the GitHub Pages site. GitHub Pages serves
// files by path only, so everything that depends on request headers or
// methods happens here:
//
//   - Markdown content negotiation: Accept: text/markdown on any page returns
//     the page's .html.md copy (Content-Type: text/markdown, Vary: Accept).
//   - Agent-friendly 404s: Markdown, problem+json, or the HTML 404 page,
//     whichever the client asked for (status stays 404).
//   - /api/: RFC 9457 problem+json errors, API-Version and rate-limit headers.
//   - /api/v1/tools/{name}: each catalog tool as a REST endpoint.
//   - /mcp: remote MCP server (Streamable HTTP).
//
// The origin is whatever env.ORIGIN fetches (the local dev server and tests
// pass the repository files); in production it is the zone's origin, GitHub
// Pages. Page requests fail open: if anything here throws, the original
// request goes straight to the origin.
import contract from '../contract.json' with { type: 'json' };
import { preferred } from './negotiate.js';
import { CORS, SITE, DOCS, json, preflight, problem, vary, withHeaders } from './http.js';
import { takeToken } from './ratelimit.js';
import { createCatalog } from './catalog.js';
import { coerceQuery } from './schema.js';
import { handleMcp } from './mcp.js';

const API_PREFIX = '/api/';
const TOOLS = contract.tools_path + '/';
const MARKDOWN = 'text/markdown; charset=utf-8';

function originFetcher(env) {
  if (env && env.ORIGIN && typeof env.ORIGIN.fetch === 'function') return (req) => env.ORIGIN.fetch(req);
  return (req) => fetch(req);
}

// Where a page's Markdown copy lives: /x.html -> /x.html.md,
// /dir/ -> /dir/index.html.md, /x -> /x.html.md or /x/index.html.md.
export function markdownCandidates(pathname) {
  if (pathname.endsWith('/')) return [pathname + 'index.html.md'];
  if (pathname.endsWith('.html')) return [pathname + '.md'];
  const last = pathname.slice(pathname.lastIndexOf('/') + 1);
  if (!last.includes('.')) return [pathname + '.html.md', pathname + '/index.html.md'];
  return [];
}

function isPagePath(pathname) {
  return markdownCandidates(pathname).length > 0;
}

function notFoundMarkdown(pathname) {
  const shown = pathname.length > 120 ? pathname.slice(0, 117) + '...' : pathname;
  const words = pathname.replace(/\.[a-z0-9]+$/i, '').split(/[^a-z0-9]+/i).filter((w) => w.length > 1).slice(-4).join(' ');
  return [
    '# 404 Not Found',
    '',
    'There is no page at `' + shown.replace(/`/g, '') + '` on datacentertraining.us. The link may be out of date, or the address may have a typo.',
    '',
    'Where to go next:',
    '',
    '- [llms.txt](' + SITE + '/llms.txt): what this site offers and how AI agents should use it',
    '- [Sitemap](' + SITE + '/sitemap.xml): every page on the site',
    '- [Course catalog](' + SITE + '/courses.html.md): all courses, as Markdown',
    '- [Developer portal](' + DOCS + '): the catalog API, the MCP server, and error codes',
    '- [Site search](' + SITE + '/search.html' + (words ? '?q=' + encodeURIComponent(words) : '') + ')',
    ''
  ].join('\n');
}

function markdownResponse(body, status, extra = {}) {
  return new Response(body, {
    status,
    headers: Object.assign({ 'Content-Type': MARKDOWN, Vary: 'Accept', 'Cache-Control': 'max-age=600' }, CORS, extra)
  });
}

// A 404 in the format the client asked for.
function notFound(request, pathname, originResponse) {
  const accept = request.headers.get('Accept');
  const jsonFirst = pathname.endsWith('.json') || pathname.startsWith(API_PREFIX);
  const offered = jsonFirst ? ['application/json', 'text/markdown', 'text/html'] : ['text/html', 'text/markdown', 'application/json'];
  const want = preferred(accept, offered) || offered[0];
  if (want === 'application/json') {
    return problem('not_found', 'Nothing exists at ' + pathname + '.', pathname, {}, { Vary: 'Accept' });
  }
  if (want === 'text/markdown') return markdownResponse(request.method === 'HEAD' ? null : notFoundMarkdown(pathname), 404, { 'Cache-Control': 'max-age=60' });
  return withHeaders(originResponse, { Vary: vary(originResponse.headers.get('Vary'), 'Accept') });
}

async function handlePage(request, url, origin) {
  const accept = request.headers.get('Accept');
  const page = isPagePath(url.pathname);
  const want = page ? preferred(accept, ['text/html', 'text/markdown']) : null;

  if (want === 'text/markdown') {
    for (const candidate of markdownCandidates(url.pathname)) {
      const res = await origin(new Request(new URL(candidate, url), { method: 'GET' }));
      if (res.ok) {
        const body = request.method === 'HEAD' ? null : await res.text();
        return markdownResponse(body, 200, { 'Content-Location': candidate, 'Cache-Control': res.headers.get('Cache-Control') || 'max-age=600' });
      }
    }
  }

  const res = await origin(request);
  if (res.status === 404) return notFound(request, url.pathname, res);
  const headers = {};
  if (page) headers.Vary = vary(res.headers.get('Vary'), 'Accept');
  const type = res.headers.get('Content-Type') || '';
  if (page && res.ok && type.startsWith('text/html')) {
    const md = markdownCandidates(url.pathname)[0];
    headers.Link = '<' + md + '>; rel="alternate"; type="text/markdown"';
  }
  // A direct .html.md request: point search engines at the HTML original.
  if (res.ok && url.pathname.endsWith('.html.md')) {
    headers.Link = '<' + SITE + url.pathname.replace(/(^|\/)index\.html\.md$/, '$1').replace(/\.md$/, '') + '>; rel="canonical"';
    headers['Content-Type'] = MARKDOWN;
  }
  return Object.keys(headers).length ? withHeaders(res, headers) : res;
}

async function handleTool(request, url, catalog, headers) {
  const name = decodeURIComponent(url.pathname.slice(TOOLS.length));
  if (!['GET', 'HEAD', 'POST'].includes(request.method)) {
    return problem('method_not_allowed', request.method + ' is not supported on tool endpoints.', url.pathname,
      { allowed_methods: ['GET', 'POST', 'OPTIONS'] }, Object.assign({ Allow: 'GET, POST, OPTIONS' }, headers));
  }
  const tool = name ? await catalog.tool(name) : null;
  if (!tool) {
    return problem('unknown_tool', name ? 'There is no tool named "' + name + '".' : 'Name a tool in the path: ' + TOOLS + '{tool_name}.', url.pathname, {}, headers);
  }
  let input;
  if (request.method === 'POST') {
    const type = request.headers.get('Content-Type') || '';
    const raw = await request.text();
    if (raw.trim() && type && !/^application\/json\b/i.test(type)) {
      return problem('unsupported_media_type', 'Send the tool input as application/json, not ' + type.split(';')[0] + '.', url.pathname, {}, headers);
    }
    try {
      input = raw.trim() ? JSON.parse(raw) : {};
    } catch (e) {
      return problem('invalid_json', 'The request body is not valid JSON: ' + e.message, url.pathname, {}, headers);
    }
  } else {
    input = coerceQuery(tool.inputSchema, url.searchParams);
  }
  const result = await catalog.run(name, input);
  if (result.errors) {
    return problem('invalid_input', 'The input for ' + name + ' does not match its input schema: ' + result.errors.map((e) => e.path + ' ' + e.message).join('; ') + '.',
      url.pathname, { errors: result.errors }, headers);
  }
  return json(result.output, 200, Object.assign({ Link: '<' + SITE + '/openapi.json>; rel="service-desc"' }, headers));
}

async function handleApi(request, url, origin, catalog, headers) {
  const path = url.pathname;
  if (path.startsWith(TOOLS) || path === contract.tools_path) return handleTool(request, url, catalog, headers);
  if (!['GET', 'HEAD'].includes(request.method)) {
    return problem('method_not_allowed', 'API documents are read-only; use GET.', path, { allowed_methods: ['GET', 'HEAD', 'OPTIONS'] }, Object.assign({ Allow: 'GET, HEAD, OPTIONS' }, headers));
  }
  // The API roots: the index as JSON for clients, the developer portal for browsers.
  if (/^\/api(\/v1)?\/?$/.test(path)) {
    if (preferred(request.headers.get('Accept'), ['application/json', 'text/html']) === 'text/html') {
      return new Response(null, { status: 302, headers: Object.assign({ Location: DOCS, Vary: 'Accept' }, headers) });
    }
    url = new URL(contract.api_base + '/index.json', url);
  }
  let res;
  try {
    res = await origin(new Request(url, { method: request.method, headers: request.headers }));
  } catch (e) {
    return problem('upstream_error', 'The static origin could not be reached.', path, {}, headers);
  }
  if (res.status === 404) return problem('not_found', 'No API document exists at ' + path + '.', path, {}, headers);
  if (res.status >= 500) return problem('upstream_error', 'The static origin answered ' + res.status + '.', path, {}, headers);
  return withHeaders(res, Object.assign({ Link: '<' + SITE + '/openapi.json>; rel="service-desc"' }, CORS, headers));
}

export async function handle(request, env = {}) {
  const url = new URL(request.url);
  const origin = originFetcher(env);
  const path = url.pathname;
  const isApi = path.startsWith(API_PREFIX) || path === '/api';
  const isMcp = path === contract.mcp_path;

  if (!isApi && !isMcp) {
    if (path === '/docs' || path === '/docs/') return Response.redirect(DOCS, 301);
    try {
      return await handlePage(request, url, origin);
    } catch (e) {
      return origin(request);
    }
  }

  if (request.method === 'OPTIONS') return preflight(isMcp ? 'POST, OPTIONS' : 'GET, HEAD, POST, OPTIONS');
  const rate = await takeToken(request, env);
  const headers = Object.assign({ 'API-Version': contract.api_version }, rate.headers);
  if (rate.limited) {
    return problem('rate_limited', 'More than ' + contract.rate_limit.requests + ' requests in ' + contract.rate_limit.window_seconds + ' seconds from this client.',
      path, { retry_after_seconds: rate.reset }, headers);
  }
  const catalog = createCatalog(origin, url);
  try {
    if (isMcp) return await handleMcp(request, catalog, headers);
    return await handleApi(request, url, origin, catalog, headers);
  } catch (e) {
    if (e && e.upstream) return problem('upstream_error', 'Catalog data could not be loaded from the static origin.', path, {}, headers);
    return problem('internal_error', 'Unexpected error while handling ' + request.method + ' ' + path + '.', path, {}, headers);
  }
}

export default {
  fetch(request, env) {
    return handle(request, env);
  }
};
