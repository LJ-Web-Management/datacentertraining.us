# datacentertraining

Official command-line client for the [Data Center Training](https://datacentertraining.us/) course catalog API. Search online data center courses, compare bundles, get recommendations for a job role, answer questions from the published FAQ, and read any page on the site as Markdown.

Read-only: no command can enroll, pay, or change anything. No API key. Node.js 18 or later, no dependencies.

```bash
npx datacentertraining courses --query "NFPA 70E" --max-price 200
npx datacentertraining course ups-systems-fundamentals
npx datacentertraining recommend electrician --budget 500
npx datacentertraining bundles
npx datacentertraining credentials ceu_pdh
npx datacentertraining faq "Do certificates expire?"
npx datacentertraining resources --topic generator --type blog_post
npx datacentertraining page /learn/data-center-power.html
npx datacentertraining call list_courses '{"role": "hvac", "sort": "price_asc"}'
```

Add `--json` to any command for the raw API response. `datacentertraining help` lists every command and option. Commands map one to one to the REST tool endpoints (`POST https://datacentertraining.us/api/v1/tools/{tool}`) and to the tools of the remote MCP server at `https://datacentertraining.us/mcp`.

Exit codes: 0 success, 1 API or network error (the problem `code`, detail, and hint are printed), 2 usage error.

Documentation: <https://datacentertraining.us/developers/>
