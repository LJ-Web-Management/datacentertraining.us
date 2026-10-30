// Shared test setup: the Worker in front of the repository files (the same
// stand-in for GitHub Pages that dev-server.js uses).
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import worker from '../src/worker.js';
import { createLocalOrigin, ROOT } from '../local-origin.js';
import { resetRateLimits } from '../src/ratelimit.js';
import { clearCatalogCache } from '../src/catalog.js';

export { ROOT };
export const SITE = 'https://datacentertraining.us';
export const env = { ORIGIN: createLocalOrigin() };

let ip = 0;
// Each call gets its own client IP unless one is given, so rate limits only
// apply where a test means them to.
export function call(pathname, { method = 'GET', headers = {}, body, clientIp } = {}) {
  const h = new Headers(headers);
  h.set('CF-Connecting-IP', clientIp || '198.51.100.' + (++ip % 250) + '-' + ip);
  return worker.fetch(new Request(SITE + pathname, { method, headers: h, body }), env);
}

export function mcp(message, { headers = {}, clientIp } = {}) {
  return call('/mcp', {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }, headers),
    body: typeof message === 'string' ? message : JSON.stringify(message),
    clientIp
  });
}

export function readJson(rel) {
  return JSON.parse(readFileSync(path.join(ROOT, rel), 'utf8'));
}

export function reset() {
  resetRateLimits();
  clearCatalogCache();
}

// Ajv (installed by `cd scripts && npm ci`) cross-checks outputs; tests that
// need it are skipped when it is not installed.
export function loadAjv() {
  try {
    const req = createRequire(path.join(ROOT, 'scripts/package.json'));
    const Ajv = req('ajv');
    const addFormats = req('ajv-formats');
    const ajv = new Ajv({ strict: false, allErrors: true });
    addFormats(ajv);
    return ajv;
  } catch (e) {
    return null;
  }
}
