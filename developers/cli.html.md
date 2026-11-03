# Data Center Training CLI

Developers & AI Agents

`datacentertraining` is the official command-line tool for the Data Center Training course catalog. Search courses, compare bundles, get role-based recommendations, and answer FAQ questions from a terminal, a script, or a terminal-based AI agent.

## Install the Data Center Training CLI

It needs Node.js 18 or later and has no dependencies. From npm:

```
npx datacentertraining help
npm install -g datacentertraining
```

Or download it from this site (both files go in the same folder) and run it with Node.js:

```
curl -O https://datacentertraining.us/cli/datacentertraining.mjs
curl -O https://datacentertraining.us/cli/engine.cjs
node datacentertraining.mjs help
```

## Commands

```
datacentertraining courses --query "NFPA 70E" --max-price 200
datacentertraining course ups-systems-fundamentals
datacentertraining recommend electrician --budget 500
datacentertraining bundles
datacentertraining credentials expiration
datacentertraining faq "Do certificates expire?"
datacentertraining resources --topic generator --type blog_post
datacentertraining page /learn/data-center-power.html
datacentertraining call list_courses '{"role": "hvac", "sort": "price_asc"}'
```

Add `--json` to any command for the raw tool output, which matches the tool's output schema in the [OpenAPI spec](https://datacentertraining.us/openapi.json). Exit codes: 0 success, 1 API or network error, 2 usage error. `--base <url>` (or `DATACENTERTRAINING_BASE_URL`) points it at another host, such as a local `node edge/dev-server.js`.

## How It Works

Each command calls one of the read-only REST tool endpoints under `/api/v1/tools/`, the same tools the [Data Center Training MCP server](https://datacentertraining.us/developers/mcp.html) exposes. When a host has no tool endpoints, the CLI runs the same tool engine the site uses on the static JSON documents under `/api/v1/`, so the answers are identical. Nothing it does can enroll, pay, or change anything.

## Related

- [Data Center Training API documentation](https://datacentertraining.us/developers/): endpoints, errors, rate limits, versioning.
- [Data Center Training MCP server](https://datacentertraining.us/developers/mcp.html): the same tools for AI agents.
- [CLI source on GitHub](https://github.com/LJ-Web-Management/datacentertraining.us/tree/main/cli).

---

Markdown version of https://datacentertraining.us/developers/cli.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
