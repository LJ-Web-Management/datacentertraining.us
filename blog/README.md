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

The first line of the document becomes the title. Formatting shortcuts:
`## Heading`, `### Subheading`, `**bold**`, `*italic*`, `> quote`,
`((caption))`, `[space]`, `- bullet` / `• bullet`, `1. numbered`, `---` divider,
and a `Sources` line followed by name / URL pairs.

## Running locally

```
cd blog && npm install && node scripts/convert.js
```

If the site header or footer changes, update `scripts/templates/post-template.html`
to match. Posts that are already published are not regenerated.
