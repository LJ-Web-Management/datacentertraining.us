# Site scripts

The site is static (GitHub Pages), but several files are **generated** so the
machine-readable layer never drifts from what the pages say.

## After editing anything

```bash
node scripts/build-site.js                 # regenerate
cd scripts && npm ci && npm run check      # verify (same checks CI runs)
```

CI (`.github/workflows/site-checks.yml`) runs the build on every push to
`main` and commits anything that was stale, then runs all checks. Pull
requests fail if a generated file is out of date.

## What is generated, and from where

| Output | Source |
| --- | --- |
| `api/*.json`, `api/courses/<id>.json` | `js/config.js` (courses, bundles, prices), each `courses/<id>.html` (description, outcomes, modules, audience, FAQ), `faq.html`, `who.html`, `blog/posts.json` |
| `.well-known/mcp.json` | Tool contract in `scripts/build-site.js`; examples are produced by running `js/webmcp.js` |
| `openapi.json`, `llms.txt`, `llms-full.txt` | Same data |
| `css/site.min.css` | `css/tokens.css` + `css/style.css` |
| `blog/assets/css/blog.min.css` | the above + `blog/assets/css/blog.css` |
| `<!-- dct:head -->` block in every page | `headBlock()` in `build-site.js` (security meta, agent links, deferred analytics/chat, WebMCP loader) |
| `twitter:*` meta | Mirrors each page's `og:*` tags |
| Course / catalog / bundle JSON-LD | Course records |

Edit the **sources**, never the generated files. To change a price, edit
`js/config.js`; to change analytics or chat, edit `THIRD_PARTY` in
`build-site.js`.

## Adding a course

1. Add it to `DC_COURSES` (and any bundles) in `js/config.js`.
2. Create `courses/<slug>.html` from an existing course page (keep the
   `lede-block`, `outcomes-list`, `module-item`, `course-audience`, and FAQPage
   JSON-LD structure; the build parses them).
3. Add it to `courses.html` and `sitemap.xml`.
4. Run the build and checks.

## Checks

- `build-site.js --check`: generated files are current.
- `validate-agent-layer.js`: every tool schema compiles as JSON Schema Draft 7;
  every example and edge-case call validates against the declared input and
  output schemas; every JSON document matches `openapi.json`; every URL in the
  agent files exists; all JSON-LD parses.
- `audit_site.py`: Ahrefs-style SEO audit: title 25-60 chars, description
  110-160 chars, one `<h1>`, no skipped heading levels, canonical = URL, full
  Open Graph + X card tags, image `alt`/`width`/`height`, no broken or
  non-canonical internal links, no orphan pages, sitemap exactly matches the
  indexable pages.

## Why analytics load late

Google Analytics, Ahrefs Analytics, Microsoft Clarity, and Tawk.to load on the
visitor's first interaction (scroll, tap, key press, or mouse move). Loading
them up front blocks the main thread during PageSpeed's mobile test (Total
Blocking Time) and triggers third-party-cookie and console warnings in Best
Practices. Visitors who leave without interacting with the page are not
counted in analytics and never see the chat widget.
