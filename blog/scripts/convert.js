const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
const AdmZip = require("adm-zip");

const ROOT = path.join(__dirname, "..");
const UPLOADS_DIR = path.join(ROOT, "uploads");
const PROCESSED_DIR = path.join(UPLOADS_DIR, "processed");
const POSTS_DIR = path.join(ROOT, "posts");
const POSTS_JSON = path.join(ROOT, "posts.json");
const POST_IMAGES_DIR = path.join(ROOT, "assets", "img", "posts");
const TEMPLATE_FILE = path.join(__dirname, "templates", "post-template.html");
const SITE_URL = "https://datacentertraining.us";
const BLOG_URL = SITE_URL + "/blog";

const SUPPORTED_EXTENSIONS = [".docx", ".txt", ".zip"];
const DOC_EXTENSIONS = [".docx", ".txt"];
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

// ---------------------------------------------------------------------------
// "Styled text" detection.
//
// Many AI-generated / social-style posts fake bold and headings using the
// Unicode Mathematical Alphanumeric Symbols block (e.g. "𝐎𝐩𝐞𝐧𝐀𝐈") instead of
// real formatting, use a line of box-drawing characters ("━━━━") as a section
// divider, "•" for bullets, and a "Sources" section listing a name followed
// by its URL on the next line. This parser recognises that shape (from a
// .docx OR a plain .txt) and turns it into real HTML headings/lists/links.
// ---------------------------------------------------------------------------

function isStyledChar(ch) {
  const cp = ch.codePointAt(0);
  return cp >= 0x1d400 && cp <= 0x1d7ff;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeEntities(str) {
  return String(str)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// Normalizes styled Unicode text back to plain characters, wrapping runs
// that were styled in <strong> so the "boldness" survives as real HTML.
function normalizeAndMarkBold(text) {
  const chars = Array.from(text);
  let html = "";
  let i = 0;
  while (i < chars.length) {
    const bold = isStyledChar(chars[i]);
    let j = i;
    while (j < chars.length && isStyledChar(chars[j]) === bold) j++;
    const run = chars.slice(i, j).join("").normalize("NFKC");
    const escaped = escapeHtml(run);
    html += bold ? "<strong>" + escaped + "</strong>" : escaped;
    i = j;
  }
  return html;
}

function plainNormalize(text) {
  return text.normalize("NFKC").trim();
}

function styledRatio(text) {
  const letters = Array.from(text).filter((c) => /[\p{L}\p{N}]/u.test(c));
  if (letters.length === 0) return 0;
  const styled = letters.filter(isStyledChar).length;
  return styled / letters.length;
}

function isMostlyStyled(text) {
  return styledRatio(text) > 0.6;
}

function isDividerLine(text) {
  const t = text.trim();
  if (/^(-{3,}|\*{3,}|_{3,})$/.test(t)) return true;
  if (t.length < 5) return false;
  return /^[─-╿—–\-=_~*]+$/.test(t);
}

function isBulletLine(text) {
  return /^[•‣◦▪●·]\s+/.test(text.trim()) || /^[*-]\s+\S/.test(text.trim());
}

function stripBullet(text) {
  return text.trim().replace(/^[•‣◦▪●·*-]\s+/, "");
}

function isUrlLine(text) {
  return /^https?:\/\/\S+$/i.test(text.trim());
}

function isSourcesHeading(text) {
  return /^(sources?|references?)$/i.test(plainNormalize(text));
}

function linkifyUrls(html) {
  return html.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

// ---------------------------------------------------------------------------
// Manual formatting shortcuts.
//
// Typed directly into the source .docx/.txt, these give the writer control
// over formatting without needing real Word styling:
//   **bold**              -> <strong>
//   *italic*  or _italic_ -> <em>
//   ## Heading            -> <h2>   (### -> <h3>)
//   > quoted text         -> indented pull-quote / blockquote
//   ((small print))       -> smaller caption-style text
//   [space]  (own line)   -> extra vertical gap
//   1. item / 2. item     -> numbered list
// A line of repeated dashes/underscores/box-drawing characters (e.g. "---" or
// "━━━━━━━━━━", already how AI drafts mark section breaks) becomes a real
// horizontal-rule divider instead of being silently discarded.
// ---------------------------------------------------------------------------

function applyMarkdownEmphasis(html) {
  html = html.replace(/\*\*([^\n*]+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^\n*]+?)\*/g, "<em>$1</em>");
  html = html.replace(/(^|[^\w])_([^\n_]+?)_(?!\w)/g, "$1<em>$2</em>");
  return html;
}

function formatInline(text) {
  return linkifyUrls(applyMarkdownEmphasis(normalizeAndMarkBold(text)));
}

function headingShortcutMatch(text) {
  const m = text.trim().match(/^(#{1,3})\s+(\S.*)$/);
  if (!m) return null;
  return { level: m[1].length >= 3 ? 3 : 2, text: m[2].trim() };
}

function isBlockquoteShortcut(text) {
  return /^>\s?\S/.test(text.trim());
}

function stripBlockquote(text) {
  return text.trim().replace(/^>\s?/, "");
}

function isSpacerShortcut(text) {
  return /^\[space\]$/i.test(text.trim());
}

function captionShortcutMatch(text) {
  const m = text.trim().match(/^\(\((.+)\)\)$/);
  return m ? m[1].trim() : null;
}

function isOrderedListLine(text) {
  return /^\d+[.)]\s+\S/.test(text.trim());
}

function stripOrderedMarker(text) {
  return text.trim().replace(/^\d+[.)]\s+/, "");
}

// ---------------------------------------------------------------------------
// Extracting an ordered list of paragraph "blocks" from either a mammoth
// HTML conversion (.docx) or plain text (.txt), so both file types can be
// run through the exact same structural parser below.
// ---------------------------------------------------------------------------

function blocksFromMammothHtml(html) {
  const matches = html.match(/<(h[1-6]|p|ul|ol|table|blockquote)[^>]*>[\s\S]*?<\/\1>/gi) || [];
  return matches.map((block) => {
    const tagMatch = block.match(/^<([a-z0-9]+)/i);
    const tag = tagMatch[1].toLowerCase();
    if (tag === "p") {
      const inner = block.replace(/^<p[^>]*>/i, "").replace(/<\/p>$/i, "");
      if (/<[a-z]/i.test(inner)) {
        // Contains real formatting (bold/italic/link/image) - leave untouched.
        return { type: "raw", html: block };
      }
      return { type: "text", text: decodeEntities(inner) };
    }
    if (tag === "h1" || tag === "h2") {
      const text = decodeEntities(block.replace(/<[^>]+>/g, ""));
      return { type: "heading", tag, text, html: block };
    }
    return { type: "raw", html: block };
  });
}

function blocksFromPlainText(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => ({ type: "text", text: line }));
}

// ---------------------------------------------------------------------------
// Title + body building
// ---------------------------------------------------------------------------

function titleFromFilename(filename) {
  const base = filename.replace(/\.(docx|txt)$/i, "");
  const words = base.replace(/[_-]+/g, " ").trim();
  return words.replace(/\w\S*/g, function (w) {
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });
}

function extractTitle(blocks, fallbackTitle) {
  if (blocks.length === 0) return { title: fallbackTitle, rest: blocks };
  const first = blocks[0];
  if (first.type === "heading") {
    return { title: plainNormalize(first.text) || fallbackTitle, rest: blocks.slice(1) };
  }
  if (first.type === "text" && first.text.trim()) {
    return { title: plainNormalize(first.text) || fallbackTitle, rest: blocks.slice(1) };
  }
  return { title: fallbackTitle, rest: blocks };
}

function buildBodyHtml(blocks) {
  const output = [];
  let bulletBuffer = [];
  let orderedBuffer = [];
  let sourcesMode = false;
  let sourcesBuffer = [];
  let pendingSourceName = null;

  function flushBullets() {
    if (bulletBuffer.length) {
      output.push(
        "<ul>" + bulletBuffer.map((t) => "<li>" + formatInline(t) + "</li>").join("") + "</ul>"
      );
      bulletBuffer = [];
    }
  }

  function flushOrdered() {
    if (orderedBuffer.length) {
      output.push(
        "<ol>" + orderedBuffer.map((t) => "<li>" + formatInline(t) + "</li>").join("") + "</ol>"
      );
      orderedBuffer = [];
    }
  }

  function flushSources() {
    if (sourcesBuffer.length) {
      output.push(
        '<ul class="sources-list">' +
          sourcesBuffer
            .map(
              (s) =>
                '<li><a href="' +
                escapeHtml(s.url) +
                '" target="_blank" rel="noopener noreferrer">' +
                escapeHtml(s.name) +
                "</a></li>"
            )
            .join("") +
          "</ul>"
      );
      sourcesBuffer = [];
    }
    if (pendingSourceName) {
      output.push("<p>" + escapeHtml(pendingSourceName) + "</p>");
      pendingSourceName = null;
    }
  }

  for (const block of blocks) {
    if (block.type === "raw" || block.type === "heading") {
      flushBullets();
      flushOrdered();
      flushSources();
      sourcesMode = false;
      output.push(block.html);
      continue;
    }

    const text = block.text.trim();
    if (!text) continue;

    if (isDividerLine(text)) {
      flushBullets();
      flushOrdered();
      output.push('<hr class="post-divider">');
      continue;
    }

    if (sourcesMode && isUrlLine(text)) {
      sourcesBuffer.push({ name: pendingSourceName || text, url: text.trim() });
      pendingSourceName = null;
      continue;
    }

    if (isSourcesHeading(text)) {
      flushBullets();
      flushOrdered();
      flushSources();
      output.push("<h2>" + escapeHtml(plainNormalize(text)) + "</h2>");
      sourcesMode = true;
      continue;
    }

    const heading = headingShortcutMatch(text);
    if (heading) {
      flushBullets();
      flushOrdered();
      flushSources();
      sourcesMode = false;
      const tag = "h" + heading.level;
      output.push("<" + tag + ">" + formatInline(heading.text) + "</" + tag + ">");
      continue;
    }

    if (isMostlyStyled(text)) {
      flushBullets();
      flushOrdered();
      flushSources();
      sourcesMode = false;
      output.push("<h2>" + escapeHtml(plainNormalize(text)) + "</h2>");
      continue;
    }

    if (sourcesMode) {
      if (pendingSourceName) {
        output.push("<p>" + escapeHtml(pendingSourceName) + "</p>");
      }
      pendingSourceName = plainNormalize(text);
      continue;
    }

    if (isSpacerShortcut(text)) {
      flushBullets();
      flushOrdered();
      output.push('<div class="post-spacer" aria-hidden="true"></div>');
      continue;
    }

    const caption = captionShortcutMatch(text);
    if (caption !== null) {
      flushBullets();
      flushOrdered();
      output.push('<p class="post-caption">' + formatInline(caption) + "</p>");
      continue;
    }

    if (isBlockquoteShortcut(text)) {
      flushBullets();
      flushOrdered();
      output.push("<blockquote><p>" + formatInline(stripBlockquote(text)) + "</p></blockquote>");
      continue;
    }

    if (isOrderedListLine(text)) {
      flushBullets();
      orderedBuffer.push(stripOrderedMarker(text));
      continue;
    }

    if (isBulletLine(text)) {
      flushOrdered();
      bulletBuffer.push(stripBullet(text));
      continue;
    }

    flushBullets();
    flushOrdered();
    output.push("<p>" + formatInline(text) + "</p>");
  }

  flushBullets();
  flushOrdered();
  flushSources();

  return output.join("\n");
}

// ---------------------------------------------------------------------------
// Page template + post index
//
// buildPostPage() fills in a *real, existing post's HTML* (saved verbatim as
// templates/post-template.html, with the variable parts swapped for
// __TOKEN__ placeholders) rather than re-typing the header/nav/footer as a
// JS string - so a generated post can never drift from the site's actual
// design, and picking up a future header/footer/nav change is just a matter
// of re-saving a fresh post as the template.
// ---------------------------------------------------------------------------

function slugify(text) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "post"
  );
}

function loadPosts() {
  if (!fs.existsSync(POSTS_JSON)) return [];
  const raw = fs.readFileSync(POSTS_JSON, "utf8").trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

function savePosts(posts) {
  fs.writeFileSync(POSTS_JSON, JSON.stringify(posts, null, 2) + "\n");
}

// Keeps the site-root sitemap.xml in sync with posts.json: drops any
// previously written /blog/ entries and re-adds the blog index plus one
// entry per post, so newly published posts are discoverable by Google.
function updateSitemap(posts) {
  const SITEMAP_PATH = path.join(ROOT, "..", "sitemap.xml");
  if (!fs.existsSync(SITEMAP_PATH)) return;

  const xml = fs.readFileSync(SITEMAP_PATH, "utf8");
  // Handles both one-line and multi-line <url> blocks; the lazy quantifier
  // stops at the nearest </url>, so blocks can't bleed into each other.
  const urlBlocks = xml.match(/[ \t]*<url>[\s\S]*?<\/url>[ \t]*\n?/g) || [];
  const nonBlogBlocks = urlBlocks
    .filter((block) => !block.includes(BLOG_URL + "/"))
    .map((block) => (block.endsWith("\n") ? block : block + "\n"));

  const newest = posts.reduce((max, p) => (p.date && p.date > max ? p.date : max), "");
  const indexLastmod = newest ? `\n    <lastmod>${newest}</lastmod>` : "";
  const blogBlocks = [
    `  <url>\n    <loc>${BLOG_URL}/</loc>${indexLastmod}\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`,
  ];
  for (const post of posts) {
    const lastmod = post.date ? `\n    <lastmod>${post.date}</lastmod>` : "";
    blogBlocks.push(
      `  <url>\n    <loc>${BLOG_URL}/posts/${post.slug}.html</loc>${lastmod}\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`
    );
  }

  const newXml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    nonBlogBlocks.join("") +
    blogBlocks.join("") +
    "</urlset>\n";

  fs.writeFileSync(SITEMAP_PATH, newXml);
  console.log("updated sitemap.xml with " + posts.length + " blog post(s)");
}

function uniqueSlug(baseSlug, existingSlugs) {
  let slug = baseSlug;
  let n = 2;
  while (existingSlugs.has(slug)) {
    slug = baseSlug + "-" + n;
    n++;
  }
  return slug;
}

// ---------------------------------------------------------------------------
// SEO metadata
//
// Search engines truncate titles past ~60 characters and descriptions past
// ~160, and flag descriptions under ~110 as too short. A post may set these
// explicitly with "SEO Title:" / "Meta Description:" lines right after the
// title; otherwise they are derived from the title and opening paragraphs.
// ---------------------------------------------------------------------------

const SEO_TITLE_MAX = 60;
const DESC_MIN = 110;
const DESC_MAX = 160;
const TITLE_SUFFIX = " | Data Center Training";
const TRAILING_STOPWORDS = /\s+(a|an|and|or|the|of|for|to|in|on|at|by|with|before|after|what|how|vs)$/i;

function truncateWords(text, max) {
  if (text.length <= max) return text;
  let cut = text.slice(0, max + 1).replace(/\s+\S*$/, "");
  while (TRAILING_STOPWORDS.test(cut)) cut = cut.replace(TRAILING_STOPWORDS, "");
  return cut.replace(/[\s,:;\-–]+$/, "");
}

function deriveSeoTitle(title) {
  let base = title;
  if (base.length > SEO_TITLE_MAX) {
    const lead = base.split(/:\s+/)[0];
    base = lead !== base && lead.length >= 30 && lead.length <= SEO_TITLE_MAX
      ? lead
      : truncateWords(base, SEO_TITLE_MAX);
  }
  return base.length + TITLE_SUFFIX.length <= SEO_TITLE_MAX ? base + TITLE_SUFFIX : base;
}

function plainTextParagraphs(bodyHtml) {
  return (bodyHtml.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [])
    .map((p) => decodeEntities(p.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim())
    .filter((t) => t.length > 40);
}

function deriveDescription(bodyHtml, title) {
  const text = plainTextParagraphs(bodyHtml).join(" ");
  if (!text) return truncateWords(title + ". Practical guidance from Data Center Training for facility and operations teams.", DESC_MAX);
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  let desc = "";
  for (const raw of sentences) {
    const next = (desc + " " + raw.trim()).trim();
    if (next.length > DESC_MAX) break;
    desc = next;
    if (desc.length >= DESC_MIN) break;
  }
  if (desc.length < DESC_MIN) desc = truncateWords(text, DESC_MAX - 1) + "…";
  return desc;
}

function extractMetaLines(blocks) {
  const meta = {};
  let i = 0;
  while (i < blocks.length && i < 3 && blocks[i].type === "text") {
    const m = blocks[i].text.trim().match(/^(SEO Title|Meta Description)\s*:\s*(.+)$/i);
    if (!m) break;
    meta[m[1].toLowerCase().startsWith("seo") ? "seoTitle" : "description"] = plainNormalize(m[2]);
    i++;
  }
  return { meta, rest: blocks.slice(i) };
}

// ---------------------------------------------------------------------------
// Cover images: resized and recompressed so pages stay fast (~100 KB or less
// instead of multi-MB PNGs straight out of an image generator).
// ---------------------------------------------------------------------------

const COVER_WIDTH = 1200;
const COVER_HEIGHT = 675;
const COVER_MAX_BYTES = 100 * 1024;

async function writeCoverImage(input, slug) {
  const sharp = require("sharp");
  fs.mkdirSync(POST_IMAGES_DIR, { recursive: true });
  // Step quality down first, then size, until the image fits the budget.
  let out;
  attempts: for (const scale of [1, 0.8, 0.64]) {
    for (const quality of [74, 66, 58, 50]) {
      out = await sharp(input)
        .resize(Math.round(COVER_WIDTH * scale), Math.round(COVER_HEIGHT * scale), { fit: "cover" })
        .jpeg({ quality, mozjpeg: true, progressive: true })
        .toBuffer();
      if (out.length <= COVER_MAX_BYTES) break attempts;
    }
  }
  const imagePath = "assets/img/posts/" + slug + ".jpg";
  fs.writeFileSync(path.join(ROOT, imagePath), out);
  return imagePath;
}

// Responsive WebP copies of each cover (the JPEG stays as the fallback src
// and share image). The featured image is the LCP element on post pages, so
// phones should download ~30 KB instead of the full 1200px JPEG.
const COVER_VARIANT_WIDTHS = [480, 800, 1200];

function coverVariantPath(image, width) {
  return image.replace(/\.jpg$/, "-" + width + "w.webp");
}

async function ensureCoverVariants(post) {
  if (!post.image || !post.image.endsWith(".jpg")) return;
  const src = path.join(ROOT, post.image);
  if (!fs.existsSync(src)) return;
  let sharp = null;
  for (const width of COVER_VARIANT_WIDTHS) {
    const target = path.join(ROOT, coverVariantPath(post.image, width));
    if (fs.existsSync(target)) continue;
    sharp = sharp || require("sharp");
    await sharp(src)
      .resize(width, Math.round((width * COVER_HEIGHT) / COVER_WIDTH), { fit: "cover" })
      .webp({ quality: 70 })
      .toFile(target);
  }
}

// srcset/sizes attributes for a cover, or "" when the variants are missing.
function coverSrcsetAttrs(image, prefix, sizes) {
  const all = COVER_VARIANT_WIDTHS.every((w) => fs.existsSync(path.join(ROOT, coverVariantPath(image, w))));
  if (!all) return "";
  const srcset = COVER_VARIANT_WIDTHS.map((w) => prefix + escapeHtml(coverVariantPath(image, w)) + " " + w + "w").join(", ");
  return ' srcset="' + srcset + '" sizes="' + sizes + '"';
}

const CARD_SIZES = "(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 380px";
const FEATURED_SIZES = "(max-width: 900px) calc(100vw - 32px), 860px";

// ---------------------------------------------------------------------------
// Page rendering
//
// Every run re-renders all post pages and the blog index from posts.json, so
// template changes, "More from the blog" links, and the pre-rendered index
// list stay current for every post, not just the newest one. Each post's body
// is read back out of its existing page.
// ---------------------------------------------------------------------------

const INDEX_FILE = path.join(ROOT, "index.html");
const INDEX_START = "<!-- POSTS:START -->";
const INDEX_END = "<!-- POSTS:END -->";
const BODY_START = '<article class="post-content">\n';
const BODY_END = "\n  </article>";

function sortNewestFirst(posts) {
  return posts
    .map((p, i) => ({ p, i }))
    .sort((a, b) => (b.p.date || "").localeCompare(a.p.date || "") || b.i - a.i)
    .map((x) => x.p);
}

// eager=true for the first card on the index, which is the LCP element on phones.
function postCardHtml(post, hrefPrefix, imgPrefix, headingTag, eager) {
  const loading = eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"';
  const thumb = post.image
    ? '<img class="post-card-thumb" src="' + imgPrefix + escapeHtml(post.image) + '"' + coverSrcsetAttrs(post.image, imgPrefix, CARD_SIZES) + ' alt="' + escapeHtml(post.title) + '" width="1200" height="675"' + loading + '>'
    : "";
  return (
    '<a class="post-card" href="' + hrefPrefix + encodeURIComponent(post.slug) + '.html">' +
    thumb +
    '<div class="post-card-body">' +
    '<div class="post-date">' + escapeHtml(post.dateDisplay || post.date) + "</div>" +
    "<" + headingTag + ">" + escapeHtml(post.title) + "</" + headingTag + ">" +
    "</div></a>"
  );
}

// Neighbours in date order plus the newest post, so links spread across the
// whole archive instead of every page pointing at the same three posts.
function relatedPosts(sorted, slug, count) {
  const idx = sorted.findIndex((p) => p.slug === slug);
  const picks = [sorted[idx - 1], sorted[idx + 1], sorted[idx + 2], sorted[idx - 2], sorted[0], sorted[1], sorted[2]];
  const seen = new Set([slug]);
  const out = [];
  for (const p of picks) {
    if (p && !seen.has(p.slug)) {
      seen.add(p.slug);
      out.push(p);
      if (out.length === count) break;
    }
  }
  return out;
}

function relatedHtml(related) {
  if (!related.length) return "";
  return (
    '  <section class="related-posts" aria-labelledby="related-heading">\n' +
    '    <h2 id="related-heading">More from the blog</h2>\n' +
    '    <div class="related-grid">' +
    related.map((p) => postCardHtml(p, "", "../", "h3")).join("") +
    "</div>\n" +
    '    <a class="related-all" href="../">View all posts &rarr;</a>\n' +
    "  </section>"
  );
}

function buildPostPage(post, bodyHtml, related) {
  const template = fs.readFileSync(TEMPLATE_FILE, "utf8");
  const shareImageUrl = post.image ? BLOG_URL + "/" + post.image : SITE_URL + "/images/og-image.jpg";
  const canonicalUrl = BLOG_URL + "/posts/" + post.slug + ".html";
  const featuredImage = post.image
    ? '  <div class="post-featured-image">\n    <img src="../' + post.image + '"' + coverSrcsetAttrs(post.image, "../", FEATURED_SIZES) + ' alt="' + escapeHtml(post.title) + '" width="1200" height="675" fetchpriority="high">\n  </div>'
    : "";

  return template
    .split("__SEO_TITLE__").join(escapeHtml(post.seoTitle))
    .split("__SHARE_IMAGE_URL__").join(shareImageUrl)
    .split("__CANONICAL_URL__").join(canonicalUrl)
    .split("__FEATURED_IMAGE__").join(featuredImage)
    .split("__DESCRIPTION__").join(escapeHtml(post.description))
    .split("__TITLE__").join(escapeHtml(post.title))
    .split("__ISO_DATE__").join(post.date)
    .split("__DATE_DISPLAY__").join(post.dateDisplay)
    .split("__RELATED__").join(relatedHtml(related))
    .split("__BODY__").join(bodyHtml);
}

function readPostBody(slug) {
  const file = path.join(POSTS_DIR, slug + ".html");
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const start = html.indexOf(BODY_START);
  const end = html.indexOf(BODY_END, start);
  if (start === -1 || end === -1) return null;
  return html.slice(start + BODY_START.length, end);
}

function updateIndex(sorted) {
  if (!fs.existsSync(INDEX_FILE)) return;
  const html = fs.readFileSync(INDEX_FILE, "utf8");
  const start = html.indexOf(INDEX_START);
  const end = html.indexOf(INDEX_END);
  if (start === -1 || end === -1) return;
  const cards = sorted.length
    ? sorted.map((p, i) => "    " + postCardHtml(p, "posts/", "", "h2", i === 0)).join("\n")
    : '    <div class="empty-state">No blog posts found.</div>';
  fs.writeFileSync(INDEX_FILE, html.slice(0, start + INDEX_START.length) + "\n" + cards + "\n    " + html.slice(end));
}

// Recompresses covers that are missing the optimized .jpg form or are over
// the size budget (older posts, or an image committed by hand).
async function optimizeCover(post) {
  if (!post.image) return;
  const current = path.join(ROOT, post.image);
  if (!fs.existsSync(current)) return;
  const optimized = post.image.endsWith(".jpg") && fs.statSync(current).size <= COVER_MAX_BYTES;
  if (optimized) return;
  const input = fs.readFileSync(current);
  const newPath = await writeCoverImage(input, post.slug);
  if (newPath !== post.image) fs.unlinkSync(current);
  console.log("  optimized cover for " + post.slug);
  post.image = newPath;
}

async function rebuildAll(posts, bodies) {
  for (const post of posts) {
    await optimizeCover(post);
    await ensureCoverVariants(post);
  }
  const sorted = sortNewestFirst(posts);
  for (const post of posts) {
    const body = bodies[post.slug] || readPostBody(post.slug);
    if (body === null || body === undefined) {
      console.warn("  ! could not read body for " + post.slug + ", leaving page untouched");
      continue;
    }
    if (!post.seoTitle) post.seoTitle = deriveSeoTitle(post.title);
    if (!post.description) post.description = deriveDescription(body, post.title);
    post.excerpt = post.description;
    const page = buildPostPage(post, body, relatedPosts(sorted, post.slug, 3));
    fs.writeFileSync(path.join(POSTS_DIR, post.slug + ".html"), page);
  }
  updateIndex(sorted);
}

// ---------------------------------------------------------------------------
// Per-file conversion
// ---------------------------------------------------------------------------

// A zip upload may contain OS cruft alongside the real document/image
// (e.g. "__MACOSX/" entries or ".DS_Store" from a Mac zip) - ignore those.
function isJunkEntry(entryName) {
  const base = path.basename(entryName);
  return entryName.startsWith("__MACOSX/") || base === ".DS_Store" || base.startsWith("._");
}

function convertZip(filePath) {
  const zip = new AdmZip(filePath);
  const entries = zip.getEntries().filter((e) => !e.isDirectory && !isJunkEntry(e.entryName));

  const docEntry = entries.find((e) =>
    DOC_EXTENSIONS.includes(path.extname(e.entryName).toLowerCase())
  );
  const imageEntry = entries.find((e) =>
    IMAGE_EXTENSIONS.includes(path.extname(e.entryName).toLowerCase())
  );

  if (!docEntry) {
    return Promise.reject(
      new Error("Zip file does not contain a .docx or .txt document: " + filePath)
    );
  }

  const docExt = path.extname(docEntry.entryName).toLowerCase();
  const docBuffer = docEntry.getData();

  const blocksPromise =
    docExt === ".docx"
      ? mammoth.convertToHtml({ buffer: docBuffer }).then((result) => {
          if (result.messages && result.messages.length) {
            result.messages.forEach((m) => console.log("  [mammoth] " + m.type + ": " + m.message));
          }
          return blocksFromMammothHtml(result.value);
        })
      : Promise.resolve(blocksFromPlainText(docBuffer.toString("utf8")));

  return blocksPromise.then((blocks) => {
    const image = imageEntry
      ? { buffer: imageEntry.getData(), ext: path.extname(imageEntry.entryName).toLowerCase() }
      : null;
    return { blocks, image };
  });
}

function convertFile(filePath, filename) {
  const ext = path.extname(filename).toLowerCase();

  if (ext === ".zip") {
    return convertZip(filePath);
  }

  if (ext === ".docx") {
    return mammoth.convertToHtml({ path: filePath }).then((result) => {
      if (result.messages && result.messages.length) {
        result.messages.forEach((m) => console.log("  [mammoth] " + m.type + ": " + m.message));
      }
      const blocks = blocksFromMammothHtml(result.value);
      return { blocks, image: null };
    });
  }

  if (ext === ".txt") {
    const text = fs.readFileSync(filePath, "utf8");
    return Promise.resolve({ blocks: blocksFromPlainText(text), image: null });
  }

  return Promise.reject(new Error("Unsupported file type: " + ext));
}

async function main() {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  const posts = loadPosts();
  const existingSlugs = new Set(posts.map((p) => p.slug));
  const bodies = {};

  const files = fs.existsSync(UPLOADS_DIR)
    ? fs.readdirSync(UPLOADS_DIR).filter((f) => SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    : [];
  if (files.length) fs.mkdirSync(PROCESSED_DIR, { recursive: true });

  const now = new Date();
  const chicago = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(now); // YYYY-MM-DD
  const dateDisplay = new Date(chicago + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  for (const filename of files) {
    const filePath = path.join(UPLOADS_DIR, filename);
    console.log("Converting " + filename + " ...");
    const { blocks, image } = await convertFile(filePath, filename);
    const { title, rest: afterTitle } = extractTitle(blocks, titleFromFilename(filename));
    const { meta, rest } = extractMetaLines(afterTitle);
    const bodyHtml = buildBodyHtml(rest);

    const slug = uniqueSlug(slugify(title), existingSlugs);
    existingSlugs.add(slug);

    const imagePath = image ? await writeCoverImage(image.buffer, slug) : null;

    posts.push({
      title: title,
      slug: slug,
      seoTitle: meta.seoTitle ? truncateWords(meta.seoTitle, SEO_TITLE_MAX) : deriveSeoTitle(title),
      description: meta.description ? truncateWords(meta.description, DESC_MAX) : deriveDescription(bodyHtml, title),
      image: imagePath,
      date: chicago,
      dateDisplay: dateDisplay,
    });
    bodies[slug] = bodyHtml;

    fs.renameSync(filePath, path.join(PROCESSED_DIR, filename));
    console.log("  -> posts/" + slug + ".html");
  }

  // --rebuild re-renders every existing post even when nothing was uploaded,
  // e.g. after a template change.
  if (!files.length && !process.argv.includes("--rebuild")) {
    console.log("No new documents to convert.");
    return;
  }

  await rebuildAll(posts, bodies);
  savePosts(posts);
  updateSitemap(posts);
  console.log("Done. " + files.length + " new post(s), " + posts.length + " page(s) rebuilt.");
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildPostPage, updateSitemap, loadPosts, deriveSeoTitle, deriveDescription };
