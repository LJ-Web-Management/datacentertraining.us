// Serves the repository the way GitHub Pages serves the site, so the Worker
// can be run and tested locally against the real files: /dir/ -> index.html,
// /page -> page.html, /dir -> 301 /dir/, a missing path -> 404 with 404.html,
// and only GET/HEAD (anything else is 405, as on Pages).
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon'
};

async function isFile(p) {
  try { return (await stat(p)).isFile(); } catch (e) { return false; }
}
async function isDir(p) {
  try { return (await stat(p)).isDirectory(); } catch (e) { return false; }
}

async function serve(file, status, method) {
  const body = await readFile(file);
  return new Response(method === 'HEAD' ? null : body, {
    status,
    headers: {
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'max-age=600',
      Vary: 'Accept-Encoding'
    }
  });
}

export function createLocalOrigin(root = ROOT) {
  return {
    async fetch(request) {
      const url = new URL(request.url);
      if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method Not Allowed', { status: 405 });
      let rel;
      try { rel = decodeURIComponent(url.pathname); } catch (e) { rel = url.pathname; }
      const file = path.join(root, path.normalize(rel));
      if (!file.startsWith(root) || rel.split('/').some((s) => s.startsWith('.') && s !== '.well-known')) {
        return serve(path.join(root, '404.html'), 404, request.method);
      }
      if (rel.endsWith('/')) {
        if (await isFile(path.join(file, 'index.html'))) return serve(path.join(file, 'index.html'), 200, request.method);
      } else if (await isFile(file)) {
        return serve(file, 200, request.method);
      } else if (await isDir(file) && await isFile(path.join(file, 'index.html'))) {
        return new Response(null, { status: 301, headers: { Location: new URL(url.pathname + '/', url).href } });
      } else if (await isFile(file + '.html')) {
        return serve(file + '.html', 200, request.method);
      }
      return serve(path.join(root, '404.html'), 404, request.method);
    }
  };
}
