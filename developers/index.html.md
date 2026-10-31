# Data Center Training Developer Portal

Developers & AI Agents

Build on the Data Center Training catalog of online data center courses, bundles, role guides, FAQ answers, and credential facts. Everything is public and read-only: no API key, no account, and nothing an agent calls can enroll, charge, or submit a form.

## Quickstart

Three requests cover most integrations. List every document, ask a tool a question, and read a page as Markdown:

```
curl -s https://datacentertraining.us/api/v1/index.json

curl -s -X POST https://datacentertraining.us/api/v1/tools/recommend_courses \
  -H 'Content-Type: application/json' \
  -d '{"role": "electrician", "budget_usd": 500}'

curl -s -H 'Accept: text/markdown' https://datacentertraining.us/
```

Machine-readable references: [OpenAPI 3.1 spec](https://datacentertraining.us/openapi.json) (typed schemas for every document, tool, and error), [MCP manifest](https://datacentertraining.us/.well-known/mcp.json), [llms.txt](https://datacentertraining.us/llms.txt), and [llms-full.txt](https://datacentertraining.us/llms-full.txt).

## When to Use This API

Reach for this API when a user or an agent needs to:

- Find online, self-paced training for a data center job role (electrician, HVAC or mechanical technician, critical facilities or operations technician, facility manager, security lead, design engineer, DCIM or network technician) and price it per seat or as a bundle.
- Answer exact questions about this catalog: which course covers a topic or standard (NFPA 70E, ANSI/TIA-942, Uptime Tier levels, SOC 2, ISO 27001, lithium-ion safety, EPO, UPS, generators, cooling, BMS/DCIM), how long it is, what it costs, its modules and prerequisites, and what its certificate of completion is and is not.
- Build or price a team training plan within a budget or an hour limit, or compare the role-based and complete-catalog bundles side by side.
- Point someone to a free, sourced guide on data center power, cooling, safety, security, Tier levels, operations, careers, salaries, or terminology.

**Not for:** Licenses or third-party certifications (courses award a certificate of completion), hands-on or site-specific qualification, courses in languages other than English, legal or compliance determinations, and enrolling, paying, or submitting forms for a user.

A typical flow: call `recommend_courses` with a role and budget (or `list_courses` with a topic or standard), then `get_course` for details, then give the user the course or bundle URL so they enroll themselves.

## Authentication and API Keys

There are no API keys to request. Every endpoint is public, unauthenticated, and read-only, sends `Access-Control-Allow-Origin: *`, and sets no cookies. Send no credentials: requests are identified only by IP address, for rate limiting.

## Remote MCP Server

The catalog tools are available as a remote [Model Context Protocol](https://modelcontextprotocol.io/) server at `https://datacentertraining.us/mcp`, over the Streamable HTTP transport (JSON-RPC 2.0 over POST). It is stateless: it issues no `Mcp-Session-Id`, and a GET returns 405 because the server never opens a stream of its own.

Supported protocol versions: `2025-11-25`, `2025-06-18`, `2025-03-26`, `2024-11-05`. Methods: `initialize`, `ping`, `tools/list`, `tools/call`, `resources/list`, and `resources/read`. Tools: `list_courses`, `get_course`, `compare_bundles`, `recommend_courses`, `get_credential_info`, `answer_faq`, `list_resources`.

Add it to Claude Code:

```
claude mcp add --transport http datacentertraining https://datacentertraining.us/mcp
```

Or to any client that reads an `mcpServers` configuration:

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

The raw handshake, if you are writing your own client:

```
curl -s https://datacentertraining.us/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "initialize",
       "params": {"protocolVersion": "2025-06-18", "capabilities": {},
                  "clientInfo": {"name": "my-agent", "version": "1.0.0"}}}'
```

Browser agents get the same tools in the page itself: every page registers them with `navigator.modelContext` (WebMCP).

## REST Tool Endpoints

Each MCP tool is also a REST endpoint. POST the tool input as a JSON object (send `{}` for every default), or use GET with the same fields as query parameters (separate list values with commas). The response is the tool output as JSON. Input and output schemas, with examples, are in the [OpenAPI spec](https://datacentertraining.us/openapi.json) under `/api/v1/tools/`.

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

```
curl -s 'https://datacentertraining.us/api/v1/tools/list_courses?query=UPS&max_price_usd=150'
```

## JSON Documents

The tools read a set of static JSON documents, which you can also download and filter yourself. They are regenerated from the site source whenever a course, price, or page changes, and `last_updated` and `content_hash` in the index tell you when to refresh a cache.

**Documents under /api/v1/**

| Document | Contents |
| --- | --- |
| [index.json](https://datacentertraining.us/api/v1/index.json) | Links to every document and tool, counts, content hash, versioning and rate-limit policy, and agent rules. |
| [courses.json](https://datacentertraining.us/api/v1/courses.json) | Every course: price, hours, track, standards, modules, outcomes, prerequisites, bundles, certificate facts. |
| `courses/{course_id}.json` | One course record, e.g. [ups-systems-fundamentals.json](https://datacentertraining.us/api/v1/courses/ups-systems-fundamentals.json). |
| [bundles.json](https://datacentertraining.us/api/v1/bundles.json) | Bundle prices, list prices, savings, included courses, and seat-count discounts. |
| [roles.json](https://datacentertraining.us/api/v1/roles.json) | Job roles mapped to learning tracks. |
| [faq.json](https://datacentertraining.us/api/v1/faq.json) | Every published FAQ answer with its source page. |
| [credentials.json](https://datacentertraining.us/api/v1/credentials.json) | What the certificate of completion is and is not, and claims to avoid. |
| [resources.json](https://datacentertraining.us/api/v1/resources.json) | Guides, blog posts, and official standards references. |
| [search.json](https://datacentertraining.us/api/v1/search.json) | The site search index: courses, pages, FAQ answers, and glossary terms. |

## Pages as Markdown

Every page on the site has a clean Markdown version without navigation, scripts, or styling. Request the normal page URL with `Accept: text/markdown` and the response comes back as `Content-Type: text/markdown` with `Vary: Accept`; browsers asking for HTML still get HTML. You can also fetch the Markdown file directly by adding `.md` to the page URL, using `index.html.md` for directory URLs:

```
curl -s -H 'Accept: text/markdown' https://datacentertraining.us/courses.html
curl -s https://datacentertraining.us/courses.html.md
curl -s https://datacentertraining.us/learn/index.html.md
```

Each HTML page also links its Markdown version with `<link rel="alternate" type="text/markdown">`. For the whole catalog in one file, read [llms-full.txt](https://datacentertraining.us/llms-full.txt).

## Errors

Errors from `/api/`, the tool endpoints, and `/mcp` are [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) problem details with `Content-Type: application/problem+json`. Branch on `code`, which never changes within a version; `detail` describes this request and `hint` says how to recover.

```
HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{
  "type": "https://datacentertraining.us/developers/#error-not_found",
  "title": "Not found",
  "status": 404,
  "code": "not_found",
  "detail": "No API document exists at /api/v1/courses/ups-101.json.",
  "hint": "List valid documents at /api/v1/index.json, course ids at /api/v1/courses.json, and every page at /sitemap.xml. Agent overview: /llms.txt.",
  "instance": "/api/v1/courses/ups-101.json",
  "docs": "https://datacentertraining.us/developers/#errors"
}
```

**Error codes**

| Code | Status | Meaning | What to do |
| --- | --- | --- | --- |
| invalid_json | 400 | Request body is not valid JSON | Send one JSON object with Content-Type: application/json. |
| invalid_input | 400 | Input does not match the tool's input schema | Compare the errors array with the tool's inputSchema in /openapi.json or /.well-known/mcp.json, fix the named fields, and retry. |
| unsupported_protocol_version | 400 | Unsupported MCP protocol version | Send an MCP-Protocol-Version header with a supported version (see supported_versions), or omit it. |
| not_found | 404 | Not found | List valid documents at /api/v1/index.json, course ids at /api/v1/courses.json, and every page at /sitemap.xml. Agent overview: /llms.txt. |
| unknown_tool | 404 | Unknown tool | Valid tool names are listed in /.well-known/mcp.json and under /api/v1/tools/ in /openapi.json. |
| method_not_allowed | 405 | Method not allowed | See the Allow header. JSON documents and pages are GET-only; /mcp takes POST; tools take POST (or GET with query parameters). |
| unsupported_media_type | 415 | Unsupported media type | Send the request body as application/json. |
| rate_limited | 429 | Too many requests | Wait the number of seconds in Retry-After, then retry. Cache documents: they change a few times a week at most. |
| internal_error | 500 | Internal error | Retry once. If it keeps failing, email info@hazwoper-osha.com with the request path and time. |
| upstream_error | 502 | Upstream error | The static origin did not answer. Retry with exponential backoff. |

A page URL that does not exist returns 404 in the format you asked for: HTML for browsers, Markdown for `Accept: text/markdown`, and problem details for `Accept: application/json`. Inside MCP, tool input mistakes come back as a tool result with `isError: true` so the model can correct itself; malformed JSON-RPC uses the standard JSON-RPC error codes.

## Rate Limits

Requests to /api/, /mcp, and the tool endpoints are limited to 120 per 60 seconds per client IP. Every response carries RateLimit-Policy and RateLimit (IETF draft-ietf-httpapi-ratelimit-headers) plus RateLimit-Limit, RateLimit-Remaining, and RateLimit-Reset; a 429 adds Retry-After in seconds. Static pages and the Markdown files are not rate limited.

```
RateLimit-Policy: "default";q=120;w=60
RateLimit: "default";r=117;t=42
RateLimit-Limit: 120
RateLimit-Remaining: 117
RateLimit-Reset: 42
```

Pace yourself from `RateLimit-Remaining`, and after a 429 wait the number of seconds in `Retry-After`. The documents change a few times a week at most, so cache them and check `content_hash` in the index instead of polling.

## Versioning and Deprecation

The API is versioned in the URL path; v1 (https://datacentertraining.us/api/v1/) is current, and every response from the edge carries an API-Version header. Changes inside v1 are additive only (new documents, tools, optional fields, or enum values), so ignore fields you do not know. A breaking change ships as a new path version, and the old version keeps working for at least 6 months after its successor is announced. Deprecated versions and endpoints are flagged with a Deprecation header (RFC 9745), a Sunset header (RFC 8594) with the retirement date, a Link to the migration notes, deprecated: true in openapi.json, and a changelog entry on https://datacentertraining.us/developers/. The unversioned /api/*.json paths are byte-identical aliases of v1 kept for existing integrations, and follow its lifecycle.

## Command-Line Tool

The `datacentertraining` CLI wraps the REST tools for scripts and terminal agents. It needs Node.js 18 or later and has no dependencies.

```
npx datacentertraining courses --query "NFPA 70E"
npx datacentertraining course ups-systems-fundamentals
npx datacentertraining recommend electrician --budget 500
npx datacentertraining bundles
npx datacentertraining faq "Do certificates expire?"
npx datacentertraining help
```

Add `--json` to any command for the raw tool output. The same single-file script is published on this site at [/cli/datacentertraining.mjs](https://datacentertraining.us/cli/datacentertraining.mjs) if you would rather download it than install from npm.

## Sandbox and Local Testing

Because every endpoint is read-only, the production API is safe to call while you build: no request can create an order, an account, or a charge, so there is no separate sandbox or test key. To work offline or test changes to the site itself, clone the [site repository](https://github.com/LJ-Web-Management/datacentertraining.us) and run the same edge code locally against the checked-out files:

```
git clone https://github.com/LJ-Web-Management/datacentertraining.us
cd datacentertraining.us
node edge/dev-server.js        # http://localhost:8787 (MCP at /mcp)
```

## Changelog

- **2026-10-30, API v1.** Remote MCP server at `/mcp`; REST tool endpoints under `/api/v1/tools/`; versioned document paths under `/api/v1/` (the unversioned `/api/*.json` paths stay as aliases); problem-details errors; rate-limit headers; Markdown versions of every page; the `datacentertraining` CLI.
- **Before 2026-10-30.** Static JSON documents under `/api/`, the MCP manifest, and in-page WebMCP tools. All still work unchanged.

## Developer Support

Found a wrong value, a broken link, or a schema that does not match a response? Email [info@hazwoper-osha.com](mailto:info@hazwoper-osha.com) with the request you sent and the response you got. For anything else, see the [contact page](https://datacentertraining.us/contact.html).

---

Markdown version of https://datacentertraining.us/developers/ · For AI agents: [llms.txt](https://datacentertraining.us/llms.txt) · [Developer portal](https://datacentertraining.us/developers/)
