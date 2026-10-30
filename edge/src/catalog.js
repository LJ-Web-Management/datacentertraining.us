// Loads the tool contract (/.well-known/mcp.json) and the catalog documents
// (/api/v1/*.json) from the static origin, and runs tools with the same engine
// the pages use (js/webmcp.js), so the edge always answers from the deployed
// site data. Documents are cached in the isolate for a few minutes.
import engine from '../../js/webmcp.js';
import { validate } from './schema.js';

const TTL_MS = 5 * 60 * 1000;
const cache = new Map();

// `paths` are tried in order; the first that exists wins.
async function load(originFetch, base, paths, now) {
  const path = [].concat(paths);
  const key = path.join('|');
  const hit = cache.get(key);
  if (hit && now - hit.at < TTL_MS) return hit.value;
  const value = (async () => {
    let status = 0;
    for (const p of path) {
      const res = await originFetch(new Request(new URL(p, base), { headers: { Accept: 'application/json' } }));
      if (res.ok) return res.json();
      status = res.status;
    }
    throw Object.assign(new Error(path[0] + ' returned ' + status), { upstream: true });
  })();
  cache.set(key, { at: now, value });
  value.catch(() => cache.delete(key));
  return value;
}

export function createCatalog(originFetch, base, now = Date.now()) {
  return {
    manifest: () => load(originFetch, base, '/.well-known/mcp.json', now),
    async tool(name) {
      const manifest = await this.manifest();
      return manifest.tools.find((t) => t.name === name) || null;
    },
    // Returns { output } or { errors } (input did not match the schema).
    async run(name, input) {
      const tool = await this.tool(name);
      if (!tool || !engine.names.includes(name)) return { unknown: true };
      const errors = validate(tool.inputSchema, input);
      if (errors.length) return { errors };
      const files = engine.toolData[name];
      // The unversioned copy covers the minutes after a Worker deploy that
      // reaches the edge before GitHub Pages has published /api/v1/.
      const docs = await Promise.all(files.map((f) => load(originFetch, base, ['/api/v1/' + f + '.json', '/api/' + f + '.json'], now)));
      const data = {};
      files.forEach((f, i) => { data[f] = docs[i]; });
      return { output: engine.run(name, input, data) };
    },
    async text(path) {
      const res = await originFetch(new Request(new URL(path, base)));
      if (!res.ok) throw Object.assign(new Error(path + ' returned ' + res.status), { upstream: res.status !== 404, status: res.status });
      return res.text();
    }
  };
}

// For tests.
export function clearCatalogCache() {
  cache.clear();
}
