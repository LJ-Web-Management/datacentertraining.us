#!/usr/bin/env node
'use strict';
// Field Answers: one page per operator question, plus an index.
//
//   scripts/answers/content/NNN-<slug>.txt   one file per answer (edit these)
//   scripts/answers/sources.json             source library the files cite by key
//   -> answers/<slug>.html, answers/index.html, and their sitemap.xml entries
//
// Run this, then `node scripts/build-site.js`, which fills in the header,
// footer, head block, course rows, Markdown copies, search index, and
// api/resources.json for the new pages like every other page on the site.
//
// Content file format: a header of `Key: value` lines, a blank line, then
//   ## The direct answer / ## Why this matters / ## Practical review points
//   ## Example from operations / ## Frequently asked question (### question)
// Header keys: Question (the <h1>), Slug, SEO Title (<title>, 25-60 chars),
// Meta Description (110-160 chars), Track, Course (a courses/<id>.html id),
// Sources (keys in sources.json), Related posts (blog slugs), Published, Updated.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORIGIN = 'https://datacentertraining.us';
const CONTENT = path.join(__dirname, 'answers', 'content');
const OUT = path.join(ROOT, 'answers');
const SECTION = 'Field Answers';

const TRACKS = {
  'Power and Electrical': { id: 'power', label: 'Power & Electrical', hub: 'learn/data-center-power.html', hubTitle: 'Data Center Power Systems', bundle: 'bundle-power-electrical', quiz: 'quizzes/power-electrical-quiz.html', quizName: 'Power & Electrical', training: 'training/data-center-electrical-safety-training.html', trainingName: 'Electrical Safety Training' },
  'Cooling and Facilities Efficiency': { id: 'cooling', label: 'Cooling & Facilities Efficiency', hub: 'learn/data-center-cooling.html', hubTitle: 'How Data Center Cooling Works', bundle: 'bundle-cooling-efficiency', quiz: 'quizzes/cooling-quiz.html', quizName: 'Cooling', training: 'training/refrigeration-safety-training.html', trainingName: 'Refrigeration Safety Training' },
  'Monitoring and Smart Facility': { id: 'monitoring', label: 'Monitoring & Smart Facility', hub: 'learn/data-center-bms.html', hubTitle: 'Data Center BMS', bundle: 'bundle-monitoring-smart-facility', quiz: 'quizzes/operations-quiz.html', quizName: 'Operations & Monitoring', training: 'training/bms-dcim-training.html', trainingName: 'BMS & DCIM Training' },
  'Operations and Reliability': { id: 'operations', label: 'Operations & Reliability', hub: 'learn/data-center-operations.html', hubTitle: 'Data Center Operations & Maintenance', bundle: 'bundle-operations-reliability', quiz: 'quizzes/operations-quiz.html', quizName: 'Operations & Monitoring', training: 'training/preventive-maintenance-training.html', trainingName: 'Preventive Maintenance Training' },
  'Design and Planning': { id: 'design', label: 'Design, Planning & Commissioning', hub: 'learn/data-center-commissioning.html', hubTitle: 'Data Center Commissioning', bundle: 'bundle-design-planning', quiz: 'quizzes/tiers-design-quiz.html', quizName: 'Tiers & Design', training: 'training/commissioning-training.html', trainingName: 'Commissioning Training' },
  'Security and Compliance': { id: 'security', label: 'Security & Compliance', hub: 'learn/data-center-security-compliance.html', hubTitle: 'Physical Security & Compliance', bundle: 'bundle-security-compliance', quiz: 'quizzes/security-compliance-quiz.html', quizName: 'Security & Compliance', training: 'training/data-center-security-training.html', trainingName: 'Security Training' }
};
const TRACK_ORDER = ['Power and Electrical', 'Cooling and Facilities Efficiency', 'Monitoring and Smart Facility', 'Operations and Reliability', 'Design and Planning', 'Security and Compliance'];

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthYear = (iso) => MONTHS[Number(iso.slice(5, 7)) - 1] + ' ' + iso.slice(0, 4);
const ld = (obj) => '<script type="application/ld+json">\n' + JSON.stringify(obj, null, 2) + '\n</script>';
const fail = (msg) => { throw new Error('build-answers: ' + msg); };

function parse(file) {
  const raw = fs.readFileSync(path.join(CONTENT, file), 'utf8').replace(/\r\n/g, '\n');
  const [head, ...rest] = raw.split('\n\n');
  const meta = {};
  for (const line of head.split('\n')) {
    const m = line.match(/^([A-Za-z ]+):\s*(.*)$/);
    if (m) meta[m[1].trim().toLowerCase()] = m[2].trim();
  }
  const body = rest.join('\n\n');
  const section = (name) => {
    const m = body.match(new RegExp('## ' + name + '\\n([\\s\\S]*?)(?=\\n## |$)'));
    return m ? m[1].trim() : '';
  };
  const faq = section('Frequently asked question');
  const fm = faq.match(/^### (.+)\n([\s\S]+)$/);
  const a = {
    file,
    num: Number(file.slice(0, 3)),
    question: meta.question,
    slug: meta.slug,
    seoTitle: meta['seo title'],
    description: meta['meta description'],
    track: meta.track,
    course: meta.course,
    sources: (meta.sources || '').split(',').map((s) => s.trim()).filter(Boolean),
    posts: (meta['related posts'] || '').split(',').map((s) => s.trim()).filter(Boolean),
    published: meta.published || '2026-11-20',
    updated: meta.updated || meta.published || '2026-11-20',
    answer: section('The direct answer'),
    why: section('Why this matters'),
    checks: section('Practical review points').split('\n').filter((l) => /^- /.test(l)).map((l) => l.slice(2).trim()),
    example: section('Example from operations'),
    faqQ: fm ? fm[1].trim() : '',
    faqA: fm ? fm[2].trim() : ''
  };
  for (const k of ['question', 'slug', 'seoTitle', 'description', 'track', 'course', 'answer', 'why', 'example', 'faqQ', 'faqA']) {
    if (!a[k]) fail(file + ': missing ' + k);
  }
  if (!TRACKS[a.track]) fail(file + ': unknown track "' + a.track + '"');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) fail(file + ': bad slug');
  if (a.seoTitle.length < 25 || a.seoTitle.length > 60) fail(file + ': SEO Title must be 25-60 characters');
  if (a.description.length < 110 || a.description.length > 160) fail(file + ': Meta Description must be 110-160 characters');
  if (!a.checks.length) fail(file + ': no review points');
  return a;
}

function loadAll() {
  const sources = JSON.parse(read('scripts/answers/sources.json'));
  const courses = Object.fromEntries(JSON.parse(read('api/v1/courses.json')).courses.map((c) => [c.id, c]));
  let posts = JSON.parse(read('blog/posts.json'));
  posts = Object.fromEntries((Array.isArray(posts) ? posts : posts.posts).map((p) => [p.slug, p]));
  const answers = fs.readdirSync(CONTENT).filter((f) => /^\d{3}-.+\.txt$/.test(f)).sort().map(parse);
  const slugs = new Set();
  for (const a of answers) {
    if (slugs.has(a.slug)) fail('duplicate slug ' + a.slug);
    slugs.add(a.slug);
    if (!courses[a.course]) fail(a.file + ': unknown course ' + a.course);
    for (const s of a.sources) if (!sources[s]) fail(a.file + ': unknown source ' + s);
    for (const p of a.posts) if (!posts[p]) fail(a.file + ': unknown blog post ' + p);
  }
  return { answers, sources, courses, posts };
}

// The label used in breadcrumbs and cards: the SEO title before any colon.
const shortName = (a) => a.seoTitle.split(':')[0].trim();
const url = (a) => ORIGIN + '/answers/' + a.slug + '.html';
const words = (a) => [a.question, a.answer, a.why, a.checks.join(' '), a.example, a.faqQ, a.faqA].join(' ').split(/\s+/).length;
const clip = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n)).replace(/[,;:]$/, '') + '…');

// Related questions: same course first, then the nearest answers in the same track.
function related(a, all, n) {
  const pool = all.filter((b) => b !== a && b.track === a.track);
  pool.sort((x, y) => (y.course === a.course) - (x.course === a.course) || Math.abs(x.num - a.num) - Math.abs(y.num - a.num));
  return pool.slice(0, n);
}

function card(href, kicker, title, text, cta) {
  return '        <a class="topic-card" href="' + href + '"><span class="topic-card-kicker">' + esc(kicker) + '</span><h3>' + esc(title) + '</h3><p>' + esc(text) + '</p><span class="topic-card-cta">' + cta + ' &rarr;</span></a>';
}

function head(o) {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title>' + esc(o.title) + '</title>',
    '<meta name="description" content="' + esc(o.description) + '">',
    '<meta name="robots" content="index, follow">',
    '<link rel="canonical" href="' + o.url + '">',
    '',
    '<meta property="og:type" content="' + o.ogType + '">',
    '<meta property="og:title" content="' + esc(o.title) + '">',
    '<meta property="og:description" content="' + esc(o.description) + '">',
    '<meta property="og:url" content="' + o.url + '">',
    '<meta property="og:image" content="' + ORIGIN + '/images/og-image.jpg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:site_name" content="Data Center Training">',
    '',
    '<link rel="stylesheet" href="../css/site.min.css">',
    '<script src="../js/nav.js" defer></script>',
    o.ld.map(ld).join('\n'),
    '</head>',
    '<body>',
    '<a class="skip-link" href="#main">Skip to content</a>',
    '<header class="glass-nav"></header>',
    '<main id="main">'
  ].join('\n');
}

const FOOT = [
  '</main>',
  '<footer class="site-footer" id="contact"></footer>',
  '</body>',
  '</html>',
  ''
].join('\n');

const PUBLISHER = { '@type': 'EducationalOrganization', '@id': ORIGIN + '/#organization', name: 'Data Center Training', url: ORIGIN + '/' };
const AUTHOR = { '@type': 'Organization', name: 'Data Center Training', url: ORIGIN + '/' };

function breadcrumbLd(items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) };
}

function ctaSection(t) {
  return [
    '  <section class="section cta-section">',
    '    <div class="container">',
    '      <div class="cta-block">',
    '        <h2>Train Your Facilities Team</h2>',
    '        <p>Self-paced online courses for data center technicians, engineers, and managers, with a certificate of completion for every course.</p>',
    '        <div class="hero-ctas">',
    '          <a href="../' + t.training + '" class="btn glass-chip">See ' + esc(t.trainingName) + '</a>',
    '          <a href="../courses.html" class="btn glass-chip">Browse All Courses</a>',
    '          <a href="tel:18664296742" class="btn glass-chip">Call 1-866-429-6742</a>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>'
  ].join('\n');
}

function answerPage(a, ctx) {
  const t = TRACKS[a.track];
  const course = ctx.courses[a.course];
  // 4 or 5 related answers, so the two-column card grid (answers + blog posts + hub guide) has no orphan card.
  const rel = related(a, ctx.answers, a.posts.length % 2 ? 4 : 5);
  const mins = Math.max(2, Math.round(words(a) / 200));
  const srcs = a.sources.map((k) => ctx.sources[k]);

  const ldArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.question,
    description: a.description,
    url: url(a),
    mainEntityOfPage: url(a),
    image: ORIGIN + '/images/og-image.jpg',
    datePublished: a.published,
    dateModified: a.updated,
    inLanguage: 'en-US',
    articleSection: t.label,
    author: AUTHOR,
    publisher: PUBLISHER,
    isPartOf: { '@type': 'CollectionPage', name: 'Data Center ' + SECTION, url: ORIGIN + '/answers/' },
    about: [shortName(a), t.label, 'Data center facility operations'],
    citation: srcs.map(([pub, title, href]) => ({ '@type': 'CreativeWork', name: title, publisher: pub, url: href }))
  };
  const ldFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [[a.question, a.answer], [a.faqQ, a.faqA]].map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } }))
  };
  const ldCrumbs = breadcrumbLd([['Home', ORIGIN + '/'], [SECTION, ORIGIN + '/answers/'], [shortName(a), url(a)]]);

  const cards = rel.map((b) => card(b.slug + '.html', 'Answer', b.question, clip(b.answer, 110), 'Read the answer'))
    .concat(a.posts.map((s) => card('../blog/posts/' + s + '.html', 'Field guide', ctx.posts[s].title, clip(ctx.posts[s].excerpt || ctx.posts[s].description || '', 110), 'Read the post')))
    .concat([card('../' + t.hub, 'Guide', t.hubTitle, 'The Knowledge Center guide for the ' + t.label + ' track.', 'Read the guide')]);

  return [
    head({ title: a.seoTitle, description: a.description, url: url(a), ogType: 'article', ld: [ldArticle, ldCrumbs, ldFaq] }),
    '  <div class="container">',
    '    <nav class="breadcrumb" aria-label="Breadcrumb">',
    '      <a href="../">Home</a>',
    '      <span>&rsaquo;</span>',
    '      <a href="./">' + SECTION + '</a>',
    '      <span>&rsaquo;</span>',
    '      <span aria-current="page">' + esc(shortName(a)) + '</span>',
    '    </nav>',
    '  </div>',
    '  <section class="course-hero">',
    '    <div class="container">',
    '      <div class="course-hero-eyebrow">' + SECTION + ' &middot; ' + esc(t.label) + '</div>',
    '      <h1>' + esc(a.question) + '</h1>',
    '      <p class="course-hero-hook">' + esc(a.description) + '</p>',
    '      <div class="course-pills">',
    '        <span class="course-pill">' + mins + ' min read</span>',
    '        <span class="course-pill">' + esc(t.label) + '</span>',
    '        <span class="course-pill">Updated ' + monthYear(a.updated) + '</span>',
    '      </div>',
    '    </div>',
    '  </section>',
    '  <div class="container guide-layout">',
    '    <aside class="guide-toc" aria-label="On this page">',
    '      <p class="guide-toc-title">On this page</p>',
    '      <ol>',
    '        <li><a href="#answer">Short answer</a></li>',
    '        <li><a href="#why">Why it matters</a></li>',
    '        <li><a href="#check">What to check</a></li>',
    '        <li><a href="#example">Example from the field</a></li>',
    '        <li><a href="#training">Related training</a></li>',
    '        <li><a href="#faq">Follow-up question</a></li>',
    '        <li><a href="#sources">Sources</a></li>',
    '        <li><a href="#related">Related questions</a></li>',
    '      </ol>',
    '      <a class="guide-toc-cta" href="../' + t.quiz + '"><strong>Test yourself</strong>Take the ' + esc(t.quizName) + ' quiz.</a>',
    '    </aside>',
    '    <article class="guide-body prose">',
    '      <div class="answer-box" id="answer"><p><strong>Short answer:</strong> ' + esc(a.answer) + '</p></div>',
    '      <h2 id="why">Why it matters</h2>',
    '      <p>' + esc(a.why) + '</p>',
    '      <h2 id="check">What to check</h2>',
    '      <ul>',
    a.checks.map((c) => '        <li>' + esc(c) + '</li>').join('\n'),
    '      </ul>',
    '      <h2 id="example">Example from the field</h2>',
    '      <p>' + esc(a.example) + '</p>',
    '      <h2 id="training">Related training</h2>',
    '      <p>The course on this site that covers this topic most directly is <a href="../courses/' + a.course + '.html">' + esc(course.title) + '</a>, part of the ' + esc(course.track.replace(/ Track$/, '')) + ' track. Use it for role-based familiarization or as refresher training alongside your site procedures.</p>',
    '      <!-- dct:courses ' + a.course + ' -->',
    '      <!-- /dct:courses -->',
    '      <p>A certificate of completion is not a license or regulatory certification. It does not replace site-specific authorization, approved procedures, or task qualification, which your employer decides.</p>',
    '      <h2 id="faq">Follow-up question</h2>',
    '      <div class="guide-faq">',
    '        <h3>' + esc(a.faqQ) + '</h3>',
    '        <p>' + esc(a.faqA) + '</p>',
    '      </div>',
    '      <h2 id="sources">Sources</h2>',
    '      <ul class="guide-sources">',
    srcs.map(([pub, title, href]) => '        <li>' + esc(pub) + ', <a href="' + esc(href) + '" rel="noopener">' + esc(title) + '</a>.</li>').join('\n'),
    '      </ul>',
    '      <h2 id="related">Related questions</h2>',
    '      <div class="card-grid card-grid-2">',
    cards.join('\n'),
    '      </div>',
    '      <p><a href="./#' + t.id + '">See every ' + esc(t.label) + ' answer &rarr;</a></p>',
    '      <p class="guide-updated">This answer is general educational information for data center facility teams, not a site procedure, engineering advice, or a compliance determination. Follow your approved procedures and the requirements that apply to your site. Last updated ' + monthYear(a.updated) + '.</p>',
    '    </article>',
    '  </div>',
    ctaSection(t),
    FOOT
  ].join('\n');
}

function indexPage(ctx) {
  const pageUrl = ORIGIN + '/answers/';
  const title = 'Data Center Field Answers: 100 Operator Questions';
  const description = 'Short, sourced answers to ' + ctx.answers.length + ' questions data center facility teams ask about power, cooling, monitoring, operations, commissioning, and security.';
  const groups = TRACK_ORDER.map((k) => [k, ctx.answers.filter((a) => a.track === k)]).filter(([, list]) => list.length);
  const updated = ctx.answers.map((a) => a.updated).sort().pop();

  const ldPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Data Center ' + SECTION,
    description,
    url: pageUrl,
    inLanguage: 'en-US',
    dateModified: updated,
    publisher: PUBLISHER,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: ctx.answers.length,
      itemListElement: groups.flatMap(([, list]) => list).map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.question, url: url(a) }))
    }
  };
  const ldCrumbs = breadcrumbLd([['Home', ORIGIN + '/'], [SECTION, pageUrl]]);

  const sections = groups.map(([k, list]) => {
    const t = TRACKS[k];
    return [
      '      <h2 id="' + t.id + '">' + esc(t.label) + '</h2>',
      '      <p>' + list.length + ' answers. For the background, read <a href="../' + t.hub + '">' + esc(t.hubTitle) + '</a>.</p>',
      '      <div class="guide-faq">',
      list.map((a) => '        <h3><a href="' + a.slug + '.html">' + esc(a.question) + '</a></h3>\n        <p>' + esc(a.answer) + '</p>').join('\n'),
      '      </div>'
    ].join('\n');
  });

  return [
    head({ title, description, url: pageUrl, ogType: 'website', ld: [ldPage, ldCrumbs] }),
    '  <div class="container">',
    '    <nav class="breadcrumb" aria-label="Breadcrumb">',
    '      <a href="../">Home</a>',
    '      <span>&rsaquo;</span>',
    '      <span aria-current="page">' + SECTION + '</span>',
    '    </nav>',
    '  </div>',
    '  <section class="course-hero">',
    '    <div class="container">',
    '      <div class="course-hero-eyebrow">Knowledge Center &middot; ' + SECTION + '</div>',
    '      <h1>Data Center Field Answers</h1>',
    '      <p class="course-hero-hook">Short, sourced answers to the questions facility teams ask on shift: alarms, procedures, testing, records, and handover. Each answer has its own page with a checklist, an example, sources, and the course that covers it.</p>',
    '      <div class="course-pills">',
    '        <span class="course-pill">' + ctx.answers.length + ' answers</span>',
    '        <span class="course-pill">' + groups.length + ' course tracks</span>',
    '        <span class="course-pill">Updated ' + monthYear(updated) + '</span>',
    '      </div>',
    '    </div>',
    '  </section>',
    '  <div class="container guide-layout">',
    '    <aside class="guide-toc" aria-label="On this page">',
    '      <p class="guide-toc-title">Tracks</p>',
    '      <ol>',
    groups.map(([k, list]) => '        <li><a href="#' + TRACKS[k].id + '">' + esc(TRACKS[k].label) + ' (' + list.length + ')</a></li>').join('\n'),
    '      </ol>',
    '      <a class="guide-toc-cta" href="../learn/"><strong>Go deeper</strong>Read the full Knowledge Center guides.</a>',
    '    </aside>',
    '    <article class="guide-body prose">',
    '      <div class="answer-box"><p><strong>How to use these answers:</strong> each one starts with a short answer you can act on, then lists what to check, gives an example from operations, and cites the standards or agencies behind it. They are general guidance: your site procedures and the requirements that apply to your facility come first.</p></div>',
    sections.join('\n'),
    '      <p class="guide-updated">These answers are general educational information for data center facility teams, not site procedures, engineering advice, or compliance determinations.</p>',
    '    </article>',
    '  </div>',
    ctaSection(TRACKS['Operations and Reliability']),
    FOOT
  ].join('\n');
}

// Keep sitemap.xml in step: one <url> per answer page plus the index, with
// lastmod from each page's Updated date.
function updateSitemap(ctx) {
  const file = path.join(ROOT, 'sitemap.xml');
  let xml = fs.readFileSync(file, 'utf8');
  xml = xml.replace(/  <url>\n    <loc>https:\/\/datacentertraining\.us\/answers\/[^<]*<\/loc>[\s\S]*?<\/url>\n/g, '');
  const entry = (loc, lastmod, priority) => '  <url>\n    <loc>' + loc + '</loc>\n    <lastmod>' + lastmod + '</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>' + priority + '</priority>\n  </url>\n';
  const updated = ctx.answers.map((a) => a.updated).sort().pop();
  const block = entry(ORIGIN + '/answers/', updated, '0.7') + ctx.answers.map((a) => entry(url(a), a.updated, '0.6')).join('');
  xml = xml.replace('</urlset>', block + '</urlset>');
  fs.writeFileSync(file, xml);
}

function main() {
  const ctx = loadAll();
  fs.mkdirSync(OUT, { recursive: true });
  const keep = new Set(['index.html'].concat(ctx.answers.map((a) => a.slug + '.html')));
  for (const f of fs.readdirSync(OUT)) {
    // Remove pages whose content file was deleted or renamed (and their Markdown copies).
    const base = f.replace(/\.md$/, '');
    if (/\.html(\.md)?$/.test(f) && !keep.has(base)) fs.unlinkSync(path.join(OUT, f));
  }
  for (const a of ctx.answers) fs.writeFileSync(path.join(OUT, a.slug + '.html'), answerPage(a, ctx));
  fs.writeFileSync(path.join(OUT, 'index.html'), indexPage(ctx));
  updateSitemap(ctx);
  console.log('build-answers: wrote ' + ctx.answers.length + ' answer pages and answers/index.html');
}

main();
