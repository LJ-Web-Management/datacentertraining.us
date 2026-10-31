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
| `api/v1/*.json`, `api/v1/courses/<id>.json` (and byte-identical `api/*.json` aliases) | `js/config.js` (courses, bundles, prices), each `courses/<id>.html` (description, outcomes, modules, audience, FAQ), `faq.html`, `who.html`, `blog/posts.json` |
| `.well-known/mcp.json` | Tool contract in `scripts/build-site.js`; examples are produced by running `js/webmcp.js`; the remote endpoint from `edge/contract.json` |
| `openapi.json`, `llms.txt`, `llms-full.txt` | Same data, plus `edge/contract.json` (error codes, rate limits, MCP versions) and the agent guidance (`WHEN_TO_USE`, `VERSIONING`) in `build-site.js` |
| `<page>.html.md` next to every indexable page | The page's `<main>`, converted by `scripts/html-to-markdown.js`; served for `Accept: text/markdown` by the edge Worker (`edge/`) |
| `<!-- dct:errors -->` and the other blocks on `developers/index.html` | `edge/contract.json`, the tool list, and the agent guidance |
| `css/site.min.css` | `css/tokens.css` + `css/style.css`, keeping only rules whose classes appear in a non-blog page or a script those pages load |
| `blog/assets/css/blog.min.css` | the above + `blog/assets/css/blog.css`, keeping only rules the blog pages, their scripts, or `blog/scripts/` (the post converter) can use |
| `<!-- dct:head -->` block in every page | `headBlock()` in `build-site.js` (security meta, agent links, deferred analytics/chat, WebMCP loader) |
| `twitter:*` meta | Mirrors each page's `og:*` tags |
| Course / catalog / bundle JSON-LD | Course records |
| Header menu and footer on every page | `scripts/site-chrome.js` (one menu definition; links are made page-relative) |
| `<!-- dct:courses a b c -->` and `<!-- dct:bundle id -->` blocks | Course rows and bundle offers with live names, hours, and prices from `js/config.js` |
| "Part of the X bundle" box in each course sidebar | The course's track bundle in `js/config.js` (course count, prices, savings) |
| Card icons (`.topic-card-icon`, `.feature-icon`) | Write an emoji; the build swaps in the matching line icon from `scripts/icons.js` (Lucide, ISC). An emoji with no entry stops the build. |
| Quiz JSON-LD on `quizzes/*-quiz.html` | The visible questions, answers, and explanations |
| Glossary JSON-LD (`DefinedTermSet`) | The terms in `learn/glossary.html` |
| `api/search.json` (site search index) | Every course, bundle, page, FAQ answer, and glossary term |

Edit the **sources**, never the generated files. To change a price, edit
`js/config.js`; to change analytics or chat, edit `THIRD_PARTY` in
`build-site.js`; to change the menu or footer, edit `scripts/site-chrome.js`.

## Adding a guide, training page, career page, quiz, or tool

Pages under `learn/`, `training/`, `careers/`, `quizzes/`, and `tools/` start
from an existing page in the same folder. Leave `<header class="glass-nav"></header>`
and `<footer class="site-footer" id="contact"></footer>` empty, and leave
`dct:courses` / `dct:bundle` blocks empty: the build fills them in. Never
type a course price or hour count into the text. Then add the page to
`sitemap.xml` (and to the menu in `site-chrome.js` if it belongs there), and
run the build: the page is added to the site search, `api/resources.json`,
and `llms-full.txt` automatically.

Quiz pages use `js/quiz.js` (`data-quiz-type="knowledge"` with
`data-answer` on each question, or `"career"` for the career match quiz).
Calculators and the training plan builder use `js/tools.js`. Site search is
`js/search.js`, loaded on demand by `js/nav.js` (header button, Ctrl/Cmd+K,
or `/`) and directly by `search.html`.

The cart is saved in the visitor's browser (`localStorage`, key `dctCart`) by
`window.DCTCart` in `js/nav.js`, which also keeps the header count current.
Any link with `data-cart-add="<course-slug>[,<slug>...]"` becomes an Add to
Cart button (generated course rows get one automatically; without JavaScript
the link opens `cart.html?add=<slug>`). `cart.html` (`js/cart.js`) sends the
cart to `checkout.html?items=<slug>,<slug>&seats=<n>&from=cart`, which bills
each course at its own per-seat price and empties the cart after payment.
Only courses go in the cart; bundles are bought on their own.

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
  output schemas; every JSON document matches `openapi.json`; every OpenAPI
  operation has a unique operationId and RFC 9457 error responses; every URL in
  the agent files exists (as a file or an edge route); `api/` and `api/v1/`
  match; every indexable page has its Markdown copy; all JSON-LD parses.
- `html-to-markdown.test.js`: the Markdown converter (`node --test`).
- `edge/` and `cli/` have their own tests (`npm test` in each) and workflows.
- `audit_site.py`: Ahrefs-style SEO audit: title 25-60 chars, description
  110-160 chars, one `<h1>`, no skipped heading levels, canonical = URL, full
  Open Graph + X card tags, image `alt`/`width`/`height`, no broken or
  non-canonical internal links, no orphan pages, sitemap exactly matches the
  indexable pages.

## IndexNow

After every GitHub Pages deploy, `.github/workflows/indexnow.yml` runs
`indexnow.js`, which sends the sitemap URLs whose HTML changed since the
previous deploy to IndexNow (Bing, Yandex, Seznam, Naver, Yep). Search engines
confirm the site owns the key by fetching `/47dc0a274417ffac423a26dcc4089056.txt`,
so keep that file at the root. To announce every page, run the workflow from
the Actions tab with "all" checked, or `node scripts/indexnow.js --all`. Add
`--dry-run` to see the list without sending it.

## Why analytics load late

Google Analytics, Ahrefs Analytics, Microsoft Clarity, and Tawk.to load on the
visitor's first interaction (scroll, tap, key press, or mouse move). Loading
them up front blocks the main thread during PageSpeed's mobile test (Total
Blocking Time) and triggers third-party-cookie and console warnings in Best
Practices. Visitors who leave without interacting with the page are not
counted in analytics and never see the chat widget.

## Testing the LMS course link

`test-lms-order.js` sends the same `add_new_user` and `add_order` requests as
`checkout.html`, so you can check that a course or bundle reaches the right
LMS course ids (`lmsId` in `js/config.js`):

```bash
node scripts/test-lms-order.js --item data-center-epo-procedures --email you+test@example.com          # print only
node scripts/test-lms-order.js --item data-center-epo-procedures --email you+test@example.com --send   # live call
node scripts/test-lms-order.js --items data-center-epo-procedures,ups-systems-fundamentals --email you+test@example.com   # a cart
```

`--send` creates a real user and a pending order in the live LMS; no card is
charged. Use `--api <url>` to point it at a staging server instead.
