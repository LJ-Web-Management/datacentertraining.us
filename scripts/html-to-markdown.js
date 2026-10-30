'use strict';
// Converts the <main> of a site page to clean Markdown for agents. Used by
// build-site.js to write the <page>.html.md copy of every page (the llms.txt
// convention: same URL + ".md", "index.html.md" for directory URLs), which the
// edge Worker also serves at the page URL itself for Accept: text/markdown.
//
// Handles the markup this site uses: headings, paragraphs, lists, links,
// tables, definition lists, details/summary, quizzes (fieldset/legend/label),
// and card links that wrap block content. Drops scripts, SVG icons, form
// controls, breadcrumbs, and anything aria-hidden. No dependencies.

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const DROP = new Set(['script', 'style', 'svg', 'noscript', 'template', 'input', 'select', 'option', 'textarea', 'iframe', 'canvas', 'video', 'audio']);
const BLOCK = new Set(['address', 'article', 'aside', 'blockquote', 'details', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'label', 'legend', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'summary', 'table', 'ul', 'caption',
  'thead', 'tbody', 'tfoot', 'tr', 'td', 'th']);

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–',
  middot: '·', rarr: '→', larr: '←', uarr: '↑', darr: '↓', rsaquo: '›', lsaquo: '‹', raquo: '»', laquo: '«', hellip: '…', copy: '©', reg: '®',
  trade: '™', sup2: '²', sup3: '³', deg: '°', times: '×', divide: '÷', asymp: '≈', plusmn: '±', micro: 'µ', le: '≤', ge: '≥', bull: '•', check: '✓'
};

function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z0-9]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : +e.slice(1));
    return Object.prototype.hasOwnProperty.call(ENTITIES, e) ? ENTITIES[e] : m;
  });
}

function parseAttrs(src) {
  const attrs = {};
  for (const m of src.matchAll(/([^\s=/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

// A forgiving tree builder: the pages are generated and well formed, so a
// closing tag pops back to its nearest matching open element.
function parse(html) {
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>|([^<]+|<)/g;
  let m;
  while ((m = re.exec(html))) {
    const top = stack[stack.length - 1];
    if (m[4] !== undefined) {
      top.children.push({ tag: '#text', text: decodeEntities(m[4]) });
    } else if (m[2]) {
      const tag = m[2].toLowerCase();
      const raw = m[3] || '';
      const node = { tag, attrs: parseAttrs(raw.replace(/\/\s*$/, '')), children: [] };
      top.children.push(node);
      if (!VOID.has(tag) && !/\/\s*$/.test(raw)) {
        stack.push(node);
        // Raw-text elements: skip straight to the closing tag.
        if (tag === 'script' || tag === 'style') {
          const end = html.toLowerCase().indexOf('</' + tag, re.lastIndex);
          re.lastIndex = end === -1 ? html.length : end;
        }
      }
    } else if (m[1]) {
      const tag = m[1].toLowerCase();
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tag) { stack.length = i; break; }
      }
    }
  }
  return root;
}

// FAQ accordion questions are buttons; every other button is a control.
function faqButton(node) {
  return node.tag === 'button' && /\bfaq-q\b/.test(node.attrs.class || '');
}

function hidden(node) {
  const a = node.attrs || {};
  if (DROP.has(node.tag)) return true;
  if (node.tag === 'button' && !faqButton(node)) return true;
  if ('hidden' in a || a['aria-hidden'] === 'true') return true;
  if (node.tag === 'nav' && /\bbreadcrumb\b/.test(a.class || '')) return true;
  return false;
}

function isBlock(node) {
  if (node.tag === '#text') return false;
  if (BLOCK.has(node.tag) || faqButton(node)) return true;
  // A link or label that wraps block content (a card) renders as a block.
  return node.children.some((c) => !hidden(c) && isBlock(c));
}

function textOf(node) {
  if (node.tag === '#text') return node.text;
  if (hidden(node)) return '';
  return node.children.map(textOf).join(node.tag === 'br' ? '\n' : '');
}

function squash(s) {
  return s.replace(/[ \t\r\n\f]+/g, ' ');
}

function resolve(href, base) {
  if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) return href && !/^javascript:/i.test(href) ? href : '';
  try {
    return new URL(href, base).href;
  } catch (e) {
    return href;
  }
}

function escapeLinkText(s) {
  return s.replace(/([[\]])/g, '\\$1');
}

const LABELS = new Set(['span', 'small', 'time', 'strong', 'b', 'em', 'i']);

function inline(nodes, ctx) {
  let out = '';
  let prev = null;
  for (const n of nodes) {
    if (n.tag === '#text') { out += squash(n.text); prev = n; continue; }
    if (hidden(n)) continue;
    // Side-by-side labels with no space between them ("Design Fundamentals"
    // + "8 hrs" in a card) would otherwise run together.
    if (prev && LABELS.has(prev.tag) && LABELS.has(n.tag) && out && !/\s$/.test(out)) out += ' ';
    prev = n;
    const inner = () => inline(n.children, ctx);
    switch (n.tag) {
      case 'br': out += '\n'; break;
      case 'strong': case 'b': { const t = inner().trim(); if (t) out += wrapSpace(inner(), '**' + t + '**'); break; }
      case 'em': case 'i': { const t = inner().trim(); if (t) out += wrapSpace(inner(), '*' + t + '*'); break; }
      case 's': case 'del': { const t = inner().trim(); if (t) out += wrapSpace(inner(), '~~' + t + '~~'); break; }
      case 'code': case 'kbd': { const t = textOf(n).trim(); if (t) out += '`' + t.replace(/`/g, '') + '`'; break; }
      case 'img': if (n.attrs.alt) out += '![' + escapeLinkText(n.attrs.alt) + '](' + resolve(n.attrs.src, ctx.base) + ')'; break;
      case 'a': {
        const t = inner().trim();
        const href = resolve(n.attrs.href, ctx.base);
        if (!t) break;
        out += href ? wrapSpace(inner(), '[' + escapeLinkText(t) + '](' + href + ')') : inner();
        break;
      }
      default: out += inner();
    }
  }
  return out;
}

// Keeps the spaces that surrounded an emphasised run ("a <b> b </b>c").
function wrapSpace(raw, md) {
  return (/^\s/.test(raw) ? ' ' : '') + md + (/\s$/.test(raw) ? ' ' : '');
}

function cleanInline(s) {
  return s.split('\n').map((l) => l.replace(/ {2,}/g, ' ').trim()).join('\n').trim();
}

// Renders a node's children as a list of Markdown blocks, gathering runs of
// inline content into paragraphs.
function blocks(nodes, ctx) {
  const out = [];
  let run = [];
  const flush = () => {
    const links = run.filter((n) => n.tag !== '#text' || n.text.trim());
    if (links.length > 1 && links.every((n) => n.tag === 'a')) {
      // A row of links (chips, card grids) reads better as a list.
      const items = links.map((n) => cleanInline(inline([n], ctx)).replace(/\n+/g, ' ')).filter(Boolean);
      if (items.length) out.push(items.map((t) => '- ' + t).join('\n'));
    } else {
      const t = cleanInline(inline(run, ctx));
      if (t) out.push(t);
    }
    run = [];
  };
  for (const n of nodes) {
    if (n.tag !== '#text' && hidden(n)) continue;
    if (isBlock(n)) {
      flush();
      out.push(...block(n, ctx));
    } else {
      run.push(n);
    }
  }
  flush();
  return out;
}

function indent(text, pad) {
  return text.split('\n').map((l, i) => (i === 0 || !l ? l : pad + l)).join('\n');
}

function list(n, ctx) {
  const ordered = n.tag === 'ol';
  let i = Number(n.attrs.start) || 1;
  const items = [];
  for (const li of n.children) {
    if (li.tag === '#text' || hidden(li)) continue;
    const marker = ordered ? i++ + '. ' : '- ';
    const body = join(li.tag === 'li' ? blocks(li.children, ctx) : block(li, ctx));
    if (body) items.push(marker + indent(body, ' '.repeat(marker.length)));
  }
  return items.length ? [items.join('\n')] : [];
}

function cell(n, ctx) {
  return cleanInline(blocks(n.children, ctx).join(' ')).replace(/\n+/g, ' ').replace(/\|/g, '\\|');
}

function table(n, ctx) {
  const rows = [];
  let caption = '';
  (function collect(node) {
    for (const c of node.children) {
      if (c.tag === 'caption') caption = cleanInline(inline(c.children, ctx));
      else if (c.tag === 'tr') rows.push(c.children.filter((x) => x.tag === 'td' || x.tag === 'th'));
      else if (['thead', 'tbody', 'tfoot'].includes(c.tag)) collect(c);
    }
  })(n);
  if (!rows.length) return [];
  const width = Math.max(...rows.map((r) => r.length));
  const line = (cells) => '| ' + Array.from({ length: width }, (_, i) => (cells[i] !== undefined ? cell(cells[i], ctx) : '')).join(' | ') + ' |';
  const head = line(rows[0]);
  const sep = '| ' + Array(width).fill('---').join(' | ') + ' |';
  const out = [head, sep, ...rows.slice(1).map(line)].join('\n');
  return caption ? ['**' + caption + '**', out] : [out];
}

function block(n, ctx) {
  const h = n.tag.match(/^h([1-6])$/);
  if (h) {
    const t = cleanInline(inline(n.children, ctx)).replace(/\n+/g, ' ');
    return t ? ['#'.repeat(+h[1]) + ' ' + t] : [];
  }
  switch (n.tag) {
    case 'p': case 'legend': case 'figcaption': case 'caption': {
      const t = cleanInline(inline(n.children, ctx));
      return t ? [t] : [];
    }
    case 'button': // FAQ question
    case 'summary': {
      const t = cleanInline(inline(n.children, ctx));
      return t ? ['**' + t + '**'] : [];
    }
    case 'ul': case 'ol': return list(n, ctx);
    case 'table': return table(n, ctx);
    case 'hr': return [];
    case 'pre': return ['```\n' + textOf(n).replace(/\n$/, '') + '\n```'];
    case 'blockquote': return [blocks(n.children, ctx).join('\n\n').split('\n').map((l) => '> ' + l).join('\n')];
    case 'dl': {
      const out = [];
      for (const c of n.children) {
        if (c.tag === 'dt') out.push('**' + cleanInline(inline(c.children, ctx)) + '**');
        else if (c.tag === 'dd') out.push(blocks(c.children, ctx).join('\n\n'));
        else if (c.tag === 'div') out.push(...block(c, ctx));
      }
      return out.filter(Boolean);
    }
    case 'label': {
      // Quiz answer options and form labels: one option per line.
      const t = cleanInline(inline(n.children, ctx));
      return t ? ['- ' + t] : [];
    }
    case 'a': {
      // A card link: link its first block (usually the heading).
      const href = resolve(n.attrs.href, ctx.base);
      const inner = blocks(n.children, ctx);
      if (!inner.length || !href) return inner;
      const first = inner[0].match(/^(#+ )?([\s\S]*)$/);
      inner[0] = (first[1] || '') + '[' + escapeLinkText(first[2].replace(/\*\*/g, '')) + '](' + href + ')';
      return inner;
    }
    default: return blocks(n.children, ctx);
  }
}

// Joins blocks, merging consecutive option lines ("- ...") into one list.
function join(parts) {
  let out = '';
  parts.forEach((p, i) => {
    if (i) out += /^- /.test(p) && /^- /.test(parts[i - 1]) && !p.includes('\n') && !parts[i - 1].includes('\n\n') ? '\n' : '\n\n';
    out += p;
  });
  return out;
}

function findMain(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.shift();
    if (n.tag === 'main') return n;
    if (n.children) stack.push(...n.children);
  }
  return null;
}

// html: a full page; url: its canonical URL (resolves relative links).
// Returns null when the page has no <main>.
function pageToMarkdown(html, url) {
  const main = findMain(parse(html));
  if (!main) return null;
  return join(blocks(main.children, { base: url })).replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

module.exports = { pageToMarkdown, parse, decodeEntities };
