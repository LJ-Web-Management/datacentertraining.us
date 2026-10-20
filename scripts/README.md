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
| Header menu and footer on every page | `scripts/site-chrome.js` (one menu definition; links are made page-relative) |
| `<!-- dct:courses a b c -->` and `<!-- dct:bundle id -->` blocks | Course rows and bundle offers with live names, hours, and prices from `js/config.js` |
| Quiz JSON-LD on `quizzes/*-quiz.html` | The visible questions, answers, and explanations |
| Glossary JSON-LD (`DefinedTermSet`) | The terms in `learn/glossary.html` |
| `api/search.json` (site search index) | Every course, bundle, page, FAQ answer, and glossary term |

Edit the **sources**, never the generated files. To change a price, edit
`js/config.js`; to change analytics or chat, edit `THIRD_PARTY` in
`build-site.js`; to change the menu or footer, edit `scripts/site-chrome.js`.

## Adding a guide, career page, quiz, or tool

Pages under `learn/`, `careers/`, `quizzes/`, and `tools/` start from an
existing page in the same folder. Leave `<header class="glass-nav"></header>`
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

## Testing the LMS course link

`test-lms-order.js` sends the same `add_new_user` and `add_order` requests as
`checkout.html`, so you can check that a course or bundle reaches the right
LMS course ids (`lmsId` in `js/config.js`):

```bash
node scripts/test-lms-order.js --item data-center-epo-procedures --email you+test@example.com          # print only
node scripts/test-lms-order.js --item data-center-epo-procedures --email you+test@example.com --send   # live call
```

`--send` creates a real user and a pending order in the live LMS; no card is
charged. Use `--api <url>` to point it at a staging server instead.
