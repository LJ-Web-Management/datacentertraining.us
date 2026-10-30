#!/usr/bin/env node
// Runs the edge Worker locally in front of the repository files, which stand
// in for GitHub Pages:
//
//     node edge/dev-server.js            http://localhost:8787
//     PORT=9000 node edge/dev-server.js
//
// Then e.g. curl -H 'Accept: text/markdown' http://localhost:8787/
import http from 'node:http';
import worker from './src/worker.js';
import { createLocalOrigin } from './local-origin.js';

const port = Number(process.env.PORT) || 8787;
const env = { ORIGIN: createLocalOrigin() };

http.createServer(async (req, res) => {
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) headers.set(k, Array.isArray(v) ? v.join(', ') : v);
    if (!headers.has('CF-Connecting-IP')) headers.set('CF-Connecting-IP', req.socket.remoteAddress || '127.0.0.1');
    // Requests are handled as if they arrived for the production hostname.
    const request = new Request('https://datacentertraining.us' + req.url, {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks)
    });
    const response = await worker.fetch(request, env);
    const out = {};
    response.headers.forEach((v, k) => { out[k] = v; });
    res.writeHead(response.status, out);
    res.end(req.method === 'HEAD' || !response.body ? undefined : Buffer.from(await response.arrayBuffer()));
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(String(e && e.stack || e));
  }
}).listen(port, () => console.log('Edge dev server on http://localhost:' + port + ' (origin: repository files)'));
