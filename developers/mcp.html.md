# Data Center Training MCP Server

Developers & AI Agents

Connect Claude, ChatGPT, Cursor, or any Model Context Protocol client to the Data Center Training course catalog. The remote MCP server is public and read-only: no API key, no account, and no tool can enroll, charge, or submit a form.

## Endpoint

Server URL: `https://datacentertraining.us/mcp`. Transport: Streamable HTTP (JSON-RPC 2.0 over POST), stateless, no authentication. The server card and tool schemas are published at [/.well-known/mcp.json](https://datacentertraining.us/.well-known/mcp.json).

Supported protocol versions: `2025-11-25`, `2025-06-18`, `2025-03-26`, `2024-11-05`. Methods: `initialize`, `ping`, `tools/list`, `tools/call`, `resources/list`, and `resources/read`. Tools: `list_courses`, `get_course`, `compare_bundles`, `recommend_courses`, `get_credential_info`, `answer_faq`, `list_resources`.

## Add the Data Center Training MCP Server to Your Client

Claude Code:

```
claude mcp add --transport http datacentertraining https://datacentertraining.us/mcp
```

Claude Desktop, Cursor, VS Code, and other clients that read an `mcpServers` configuration:

```
{
  "mcpServers": {
    "datacentertraining": {
      "type": "http",
      "url": "https://datacentertraining.us/mcp"
    }
  }
}
```

Test the handshake from a terminal:

```
curl -s https://datacentertraining.us/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "initialize",
       "params": {"protocolVersion": "2025-06-18", "capabilities": {},
                  "clientInfo": {"name": "my-agent", "version": "1.0.0"}}}'
```

## Tools

Every tool is read-only and idempotent, and each one is also a REST endpoint (see the [developer portal](https://datacentertraining.us/developers/#tools)). Input and output JSON Schemas, with examples, are in the [MCP manifest](https://datacentertraining.us/.well-known/mcp.json) and the [OpenAPI spec](https://datacentertraining.us/openapi.json).

**Tool endpoints (POST or GET)**

| Tool | Endpoint | What it does |
| --- | --- | --- |
| list_courses | `/api/v1/tools/list_courses` | Search and filter the course catalog |
| get_course | `/api/v1/tools/get_course` | Get one course |
| compare_bundles | `/api/v1/tools/compare_bundles` | Compare course bundles |
| recommend_courses | `/api/v1/tools/recommend_courses` | Recommend courses for a role |
| get_credential_info | `/api/v1/tools/get_credential_info` | Explain certificates and accreditation |
| answer_faq | `/api/v1/tools/answer_faq` | Answer from the published FAQ |
| list_resources | `/api/v1/tools/list_resources` | List guides and standards references |

## Resources

`resources/list` returns the site's agent documents, and `resources/read` returns their text: [llms.txt](https://datacentertraining.us/llms.txt), [llms-full.txt](https://datacentertraining.us/llms-full.txt), the [JSON catalog documents](https://datacentertraining.us/api/v1/index.json) under `/api/v1/`, the [OpenAPI spec](https://datacentertraining.us/openapi.json), and the [sitemap](https://datacentertraining.us/sitemap.xml).

## Errors and Limits

Tool failures come back as a result with `isError: true`; protocol errors use JSON-RPC error codes; HTTP-level errors are RFC 9457 `application/problem+json`. Requests are rate limited per client IP, with `RateLimit` headers on every response. See [errors](https://datacentertraining.us/developers/#errors) and [rate limits](https://datacentertraining.us/developers/#rate-limits) in the developer portal.

## Related

- [Data Center Training API documentation](https://datacentertraining.us/developers/): REST tool endpoints, JSON documents, Markdown pages, versioning.
- [Data Center Training CLI](https://datacentertraining.us/developers/cli.html): the same tools from a terminal or script.
- [MCP server source on GitHub](https://github.com/LJ-Web-Management/datacentertraining.us/tree/main/edge).

---

Markdown version of https://datacentertraining.us/developers/mcp.html · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
