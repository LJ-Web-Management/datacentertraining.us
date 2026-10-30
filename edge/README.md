# Edge Worker (Cloudflare) in front of GitHub Pages

GitHub Pages serves files by path and ignores request headers and methods. This
Worker sits in front of it and adds what agents need from the same URLs:

| Request | Response |
| --- | --- |
| Any page with `Accept: text/markdown` | The page's `.html.md` copy, `Content-Type: text/markdown`, `Vary: Accept` |
| Any page for browsers / `Accept: text/html` | The HTML page, plus `Vary: Accept` and a `Link` to the Markdown copy |
| A missing URL | Status 404 in the format asked for: Markdown, `application/problem+json`, or the HTML 404 page |
| `/api/...` | The static JSON with `API-Version` and rate-limit headers; errors as RFC 9457 problem details |
| `/api/v1/tools/{tool}` | The catalog tool (POST JSON body or GET query), output as JSON |
| `/mcp` | Remote MCP server, Streamable HTTP transport, stateless |
| `/docs`, `/api/` in a browser | Redirect to `/developers/` |

The Markdown copies, versioned documents, OpenAPI spec, and MCP manifest are
static files produced by `scripts/build-site.js`. The Worker reads them from the
origin at request time, so a site deploy updates what the Worker serves without
redeploying it. Error codes, rate limits, and MCP protocol versions live in
`contract.json`, which the build publishes and the Worker enforces. Page
requests fail open: if the Worker throws, the request goes straight to GitHub
Pages.

## Run and test locally

```bash
node edge/dev-server.js                          # http://localhost:8787, origin = repository files
curl -H 'Accept: text/markdown' localhost:8787/
cd scripts && npm ci && cd ../edge && npm test   # Ajv (from scripts/) cross-checks the outputs
```

`local-origin.js` imitates GitHub Pages (index.html for directories, `.html`
for extensionless paths, 404.html for anything missing).

## Deploy

One-time setup (needs a Cloudflare account and access to the domain registrar):

1. Add `datacentertraining.us` to Cloudflare (free plan is enough) and change
   the nameservers at GoDaddy to the two Cloudflare gives you. Keep the DNS
   records pointing at GitHub Pages and **proxied** (orange cloud):
   `A @ 185.199.108.153`, `.109.153`, `.110.153`, `.111.153`, and
   `CNAME www lj-web-management.github.io`. Copy over any other records
   (MX, TXT verification) before switching.
2. SSL/TLS mode: **Full**. "Flexible" talks to GitHub over HTTP, which GitHub
   redirects to HTTPS, which loops.
3. Create an API token with the "Edit Cloudflare Workers" template (Workers
   Scripts: Edit, Workers Routes: Edit on the zone) and add two repository
   secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

After that, `.github/workflows/edge.yml` tests every change and deploys from
`main` whenever `edge/` or `js/webmcp.js` changes. To deploy by hand:
`cd edge && npx wrangler@4 deploy`.

Check the live site afterwards:

```bash
curl -sS -i -H 'Accept: text/markdown' https://datacentertraining.us/
curl -sS -i -H 'Accept: text/markdown' https://datacentertraining.us/does-not-exist
curl -sS -i https://datacentertraining.us/api/v1/nope.json
curl -sS https://datacentertraining.us/mcp -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}'
```
