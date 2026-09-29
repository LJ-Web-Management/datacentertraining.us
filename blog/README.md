# datacentertraining.us blog

Same blog system as the landing pages in `Ljweb-Hazwoper/gitops-static`.

## Publishing a post

Commit a `.docx`, `.txt`, or `.zip` (a document plus one featured image) into
`blog/uploads/` on `main`. The `blog-convert.yml` workflow then:

1. converts it into `blog/posts/<slug>.html` using `scripts/templates/post-template.html`,
2. adds an entry to `blog/posts.json` (which `blog/index.html` reads to list posts),
3. copies the image to `assets/img/posts/`,
4. adds the post to the root `sitemap.xml`,
5. moves the source file to `uploads/processed/` and commits the result.

The first line of the document becomes the title. Optional `SEO Title:` (≤60 chars) and
`Meta Description:` (120-155 chars) lines right after it set the page <title> and meta
description; without them both are derived automatically. Formatting shortcuts:
`## Heading`, `### Subheading`, `**bold**`, `*italic*`, `> quote`,
`((caption))`, `[space]`, `- bullet` / `• bullet`, `1. numbered`, `---` divider,
and a `Sources` line followed by name / URL pairs.

## Daily automation

`AUTOMATION.md` is the site block for the daily blog automation. It uploads one ZIP
(one `.txt` + one 16:9 `.png`) to `blog/uploads/` on `main`; the workflow converts it,
commits the post, and triggers a GitHub Pages rebuild.

## Running locally

```
cd blog && npm install && node scripts/convert.js
```

Every run re-renders all posts from `posts.json` (bodies are read back from the existing
pages), recompresses any cover over 100 KB to a 1200x675 JPEG, writes 480/800/1200px WebP
copies used in `srcset` (the featured image is the page's LCP element), pre-renders the post list
into `index.html` so crawlers see links without JavaScript, and refreshes each post's
"More from the blog" links. After changing `scripts/templates/post-template.html`, run
`node scripts/convert.js --rebuild` to apply it to every existing post.

The workflow then runs `node scripts/build-site.js` from the repo root so new posts
also appear in `llms-full.txt`, `/api/resources.json`, and the MCP manifest. The
`<!-- dct:head -->` block and X card tags in the template are maintained by that
script too (see `scripts/README.md`).
