#!/usr/bin/env node
// Builds every generated file on datacentertraining.us from one source of
// truth (js/config.js + the course pages + faq.html + who.html + blog/posts.json):
//
//   api/*.json, api/courses/<slug>.json    static read-only JSON API
//   .well-known/mcp.json                   WebMCP / MCP discovery manifest
//   openapi.json, llms.txt, llms-full.txt  machine-readable docs for agents
//   css/site.min.css, blog/assets/css/blog.min.css   one render-blocking CSS file per page
//   <head> of every HTML page              security meta, deferred third-party
//                                          tags, agent discovery links, X cards
//   Course / ItemList / Product JSON-LD    course, catalog, and bundle pages
//
// Idempotent: running it twice produces no diff. No npm dependencies.
//
//     node scripts/build-site.js           (write)
//     node scripts/build-site.js --check   (exit 1 if anything is out of date)

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const tools = require('../js/webmcp.js');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://datacentertraining.us';
const CHECK = process.argv.includes('--check');
const MANIFEST_VERSION = '1.0.0';
const SUPPORT = { email: 'info@hazwoper-osha.com', phone: '1-866-429-6742' };
const CERT_VERIFY_URL = 'https://hazwoper-osha.com/certificate-verification';
const IACET_URL = 'https://www.iacet.org/affiliates/accredited-providers-list/accredited-provider-overview/?providerID=131618';

const changed = [];

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function write(rel, content) {
  const file = path.join(ROOT, rel);
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (old === content) return;
  changed.push(rel);
  if (CHECK) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function json(obj) {
  return JSON.stringify(obj, null, 2) + '\n';
}

function decode(s) {
  return String(s)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&middot;/g, '·')
    .replace(/&rarr;/g, '→').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n))
    .replace(/\s+/g, ' ')
    .trim();
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function money(n) {
  return Math.round(n * 100) / 100;
}

function isoDuration(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return 'PT' + (h ? h + 'H' : '') + (m ? m + 'M' : '');
}

function jsonLd(obj) {
  // Escape "<" so a value can never close the <script> element.
  return '<script type="application/ld+json">\n' + JSON.stringify(obj, null, 2).replace(/</g, '\\u003c') + '\n</script>';
}

// ---------------------------------------------------------------------------
// Source data
// ---------------------------------------------------------------------------

function loadConfig() {
  const sandbox = { document: { addEventListener() {} }, console };
  vm.createContext(sandbox);
  vm.runInContext(read('js/config.js') + '\n;this.__out = { DC_COURSES, DC_BUNDLES, CHECKOUT_DISABLED, BULK_TIERS };', sandbox);
  return sandbox.__out;
}

function parseLdBlocks(html) {
  const out = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try {
      out.push({ raw: m[0], data: JSON.parse(m[1]) });
    } catch (e) {
      out.push({ raw: m[0], data: null });
    }
  }
  return out;
}

function parseCoursePage(slug) {
  const rel = 'courses/' + slug + '.html';
  const html = read(rel);
  const grab = (re) => { const m = html.match(re); return m ? m[1] : ''; };
  const all = (re) => { const out = []; let m; while ((m = re.exec(html))) out.push(m); return out; };

  const lede = grab(/<div class="lede-block">([\s\S]*?)<\/div>/);
  const description = (lede.match(/<p>[\s\S]*?<\/p>/g) || []).map(decode).join(' ');
  const outcomes = all(/<li><svg[\s\S]*?<\/svg><span>([\s\S]*?)<\/span><\/li>/g).map((m) => decode(m[1]));
  const modules = all(/<div class="module-item">\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)
    .map((m) => ({ title: decode(m[1]), summary: decode(m[2]) }));
  const audience = decode(grab(/<p class="course-audience"><strong>Audience:<\/strong>([\s\S]*?)<\/p>/));
  const why = all(/<p class="course-why">([\s\S]*?)<\/p>/g).map((m) => decode(m[1])).join(' ');
  let faqs = [];
  for (const b of parseLdBlocks(html)) {
    if (b.data && b.data['@type'] === 'FAQPage') {
      faqs = b.data.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }));
    }
  }
  if (!description || !outcomes.length || !modules.length || !audience) {
    throw new Error(rel + ': could not parse description/outcomes/modules/audience');
  }
  return { description, outcomes, modules, audience, why, faqs };
}

function parseSiteFaq() {
  const html = read('faq.html');
  const sections = [];
  const re = /<h2 class="catalog-subhead[^"]*"[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2 class="catalog-subhead|<\/section>)/g;
  let m;
  while ((m = re.exec(html))) {
    const qs = [];
    const qre = /<button class="faq-q">([\s\S]*?)<svg/g;
    let q;
    while ((q = qre.exec(m[2]))) qs.push(decode(q[1]));
    sections.push({ name: decode(m[1]), questions: qs });
  }
  const ld = parseLdBlocks(html).find((b) => b.data && b.data['@type'] === 'FAQPage');
  return ld.data.mainEntity.map((q) => {
    const section = sections.find((s) => s.questions.includes(decode(q.name)));
    return {
      question: q.name,
      answer: q.acceptedAnswer.text,
      category: section ? section.name : 'General',
      source_url: ORIGIN + '/faq.html'
    };
  });
}

const ROLE_KEYWORDS = {
  electrician: ['electrician', 'electrical', 'power tech', 'power', 'ups', 'generator', 'battery', 'batteries', 'switchgear', 'arc flash', 'epo'],
  hvac: ['hvac', 'cooling', 'mechanical', 'chiller', 'crac', 'crah', 'refrigerant', 'thermal', 'facilities tech', 'maintenance tech'],
  operations: ['operations', 'facility manager', 'facilities manager', 'site manager', 'uptime', 'reliability', 'critical facilities', 'shift lead', 'maintenance manager', 'disaster recovery'],
  security: ['security', 'compliance', 'audit', 'access control', 'guard', 'soc 2', 'iso 27001', 'fire suppression'],
  design: ['engineer', 'design', 'planning', 'planner', 'commissioning', 'project', 'architect', 'capacity', 'tier'],
  it: ['network', 'cabling', 'fiber', 'dcim', 'monitoring', 'bms', 'bas', 'automation', 'noc', 'it tech']
};

const ROLE_BUNDLE = {
  electrician: 'bundle-power-electrical',
  hvac: 'bundle-cooling-efficiency',
  operations: 'bundle-operations-reliability',
  security: 'bundle-security-compliance',
  design: 'bundle-design-planning',
  it: 'bundle-monitoring-smart-facility'
};

function parseRoles(trackOf) {
  const html = read('who.html');
  return Object.keys(ROLE_BUNDLE).map((id) => {
    const label = decode(html.match(new RegExp('data-role="' + id + '">([\\s\\S]*?)</button>'))[1]);
    const block = html.match(new RegExp('<div class="role-picker-result" data-role="' + id + '">([\\s\\S]*?)<a href'))[1];
    const description = decode(block.match(/<\/h2>\s*<p>([\s\S]*?)<\/p>/)[1]);
    return {
      id,
      label,
      track: trackOf[ROLE_BUNDLE[id]],
      bundle_id: ROLE_BUNDLE[id],
      description,
      keywords: ROLE_KEYWORDS[id],
      source_url: ORIGIN + '/who.html#which-course'
    };
  });
}

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

function buildData() {
  const cfg = loadConfig();
  const trackBundles = cfg.DC_BUNDLES.filter((b) => b.slug !== 'bundle-complete-catalog' && !b.pack);
  const trackOf = {};
  for (const b of trackBundles) trackOf[b.slug] = b.name.replace(/ Bundle$/, ' Track');

  const bundleUrl = ORIGIN + '/bundles.html';
  const certificate = {
    type: 'Certificate of completion',
    issuer: 'HAZWOPER OSHA Training, LLC',
    issuer_accreditation: 'IACET Accredited Provider (provider-level accreditation)',
    delivery: 'Issued immediately on completion; downloadable and printable',
    validity_period: 'No fixed expiration; follow your employer\'s refresher policy',
    verification_url: CERT_VERIFY_URL,
    is_license_or_government_certification: false,
    ceu_or_pdh_credit: false
  };
  const availability = cfg.CHECKOUT_DISABLED
    ? { status: 'preorder', note: 'Enroll by submitting an enrollment request at checkout, by phone, or by email. Learner accounts are set up the same business day; pay by card or purchase order.', contact: SUPPORT }
    : { status: 'available', note: 'Enroll online at checkout.', contact: SUPPORT };

  const courses = cfg.DC_COURSES.map((c) => {
    const page = parseCoursePage(c.slug);
    const bundles = cfg.DC_BUNDLES.filter((b) => b.courses.includes(c.slug));
    const primary = bundles.find((b) => trackOf[b.slug]);
    const hours = parseFloat(c.duration);
    const siblings = primary.courses.filter((s) => s !== c.slug);
    return {
      id: c.slug,
      catalog_number: c.id,
      title: c.name,
      url: ORIGIN + '/courses/' + c.slug + '.html',
      api_url: ORIGIN + '/api/courses/' + c.slug + '.json',
      track: trackOf[primary.slug],
      category: c.category,
      course_type: c.tier,
      course_type_label: c.tier === 'comprehensive' ? 'Comprehensive Program' : 'Modular Specialization',
      duration_hours: hours,
      duration_iso8601: isoDuration(hours),
      module_count: page.modules.length,
      price_usd: c.msrp,
      currency: 'USD',
      standards: c.standard ? c.standard.split(/\s+\/\s+/) : [],
      summary: c.hook,
      description: page.description,
      why_it_matters: page.why,
      audience: page.audience,
      prerequisites: c.tier === 'comprehensive'
        ? 'No prior certification required. Assumes basic familiarity with facility systems.'
        : 'No prior certification required. Relevant equipment exposure is helpful.',
      learning_outcomes: page.outcomes,
      modules: page.modules,
      bundles: bundles.map((b) => ({ id: b.slug, name: b.name, price_usd: b.price, url: bundleUrl })),
      language: 'en',
      delivery: 'Online, self-paced, no completion deadline',
      certificate,
      availability: availability.status,
      enroll_url: ORIGIN + '/checkout.html?item=' + c.slug,
      faqs: page.faqs,
      related_course_ids: siblings.slice(0, 5)
    };
  });

  const byId = Object.fromEntries(courses.map((c) => [c.id, c]));
  const bundles = cfg.DC_BUNDLES.map((b) => {
    const list = b.courses.map((s) => byId[s]);
    const listPrice = money(list.reduce((sum, c) => sum + c.price_usd, 0));
    return {
      id: b.slug,
      catalog_number: b.id,
      name: b.name,
      track: trackOf[b.slug] || (b.pack ? 'Multiple tracks' : 'All tracks'),
      audience: b.description,
      price_usd: b.price,
      list_price_usd: listPrice,
      savings_usd: money(listPrice - b.price),
      savings_percent: Math.round((1 - b.price / listPrice) * 100),
      course_count: list.length,
      total_hours: list.reduce((sum, c) => sum + c.duration_hours, 0),
      course_ids: b.courses,
      url: bundleUrl,
      enroll_url: ORIGIN + '/checkout.html?item=' + b.slug,
      availability: availability.status
    };
  });

  const roles = parseRoles(trackOf);
  const tracks = trackBundles.map((b) => ({
    name: trackOf[b.slug],
    bundle_id: b.slug,
    course_ids: b.courses,
    roles: roles.filter((r) => r.bundle_id === b.slug).map((r) => r.id)
  }));

  const faqs = parseSiteFaq();

  const credentials = {
    source_url: ORIGIN + '/certifications.html',
    topics: {
      certificate: {
        summary: 'Learners receive a certificate of completion for each finished course, issued immediately and printable.',
        details: certificate
      },
      accreditation: {
        summary: 'HAZWOPER OSHA Training, LLC, the parent company, is an IACET Accredited Provider. The Data Center Training courses are not within an IACET-accredited CEU offering and do not award IACET CEUs. Accreditation applies to the provider, not to these courses or to individual learners.',
        verify_url: IACET_URL
      },
      standards_alignment: {
        summary: 'Course content is designed around the industry standard or framework named on each course (for example ANSI/TIA-942, the Uptime Institute Tier framework, NFPA 70E, SOC 2/ISO 27001). "Aligned with" is not the same as "issued by" or "approved by" that standards body.',
        standards_referenced: Array.from(new Set(courses.flatMap((c) => c.standards))).sort()
      },
      ceu_pdh: {
        summary: 'These courses do not award IACET CEUs, PDHs, or any other continuing education credit. Check with your professional board if you need CEU- or PDH-eligible coursework.'
      },
      expiration: {
        summary: 'Certificates of completion have no fixed expiration date. Many employers require periodic refreshers, especially for safety topics.'
      },
      verification: {
        summary: 'Each certificate carries a unique certificate number and issue date. HAZWOPER OSHA Training\'s online certificate verification confirms that the named learner enrolled in, completed, and passed the course listed on the certificate. It does not confirm job qualification, licensure, or CEU credit.',
        verify_url: CERT_VERIFY_URL
      },
      employer_responsibility: {
        summary: 'Employers remain responsible for determining whether employees are trained, qualified, and competent for their assigned duties and site conditions, and for keeping their own training records.'
      }
    },
    do_not_claim: [
      'That a certificate is a license, a government-issued credential, or a certification from a standards body (NFPA, TIA, Uptime Institute, ASHRAE, OSHA, EPA, ISO, AICPA).',
      'That a standards body endorsed, approved, or certified any course.',
      'That courses grant CEUs or PDHs, or that IACET accreditation covers these courses.',
      'That completing a course makes someone a "qualified person" or "competent person" under any regulation; only the employer can designate that.',
      'That IACET accredits individual learners.'
    ]
  };

  const posts = JSON.parse(read('blog/posts.json'));
  const topicWords = ['electrical', 'ups', 'generator', 'cooling', 'refrigerant', 'fire', 'suppression', 'security', 'access', 'commissioning',
    'dcim', 'bms', 'pue', 'battery', 'lithium', 'tier', 'confined', 'raised floor', 'training matrix', 'contractor', 'visitor', 'maintenance'];
  const staticResources = [
    { type: 'site_page', title: 'Course Catalog', url: ORIGIN + '/courses.html', description: 'All 44 courses with search, sort, and filters by track, type, duration, or price.', topics: ['catalog'], audience: [] },
    { type: 'site_page', title: 'Course Bundles', url: ORIGIN + '/bundles.html', description: cfg.DC_BUNDLES.length + ' role-based, compliance pack, and complete-catalog bundles with pricing and savings.', topics: ['pricing', 'bundles'], audience: [] },
    { type: 'site_page', title: 'Which Courses Does Your Role Need?', url: ORIGIN + '/who.html', description: 'Role-to-track recommendations for electricians, HVAC techs, operations managers, security leads, engineers, and IT staff.', topics: ['roles'], audience: [] },
    { type: 'site_page', title: 'Certifications & Accreditations', url: ORIGIN + '/certifications.html', description: 'IACET provider accreditation and what a certificate of completion does and does not mean.', topics: ['certificate', 'accreditation', 'credentials'], audience: [] },
    { type: 'site_page', title: 'FAQ', url: ORIGIN + '/faq.html', description: 'Answers about programs, pricing, certificates, access, team enrollment, and policies.', topics: ['faq'], audience: [] },
    { type: 'site_page', title: 'Certificate Verification', url: CERT_VERIFY_URL, description: 'Verify a learner certificate using its certificate number and issue date; confirms the named learner enrolled in, completed, and passed the listed course.', topics: ['certificate', 'verification'], audience: [], source: 'HAZWOPER OSHA Training, LLC' },
    { type: 'standard_reference', title: 'OSHA 29 CFR 1910.146 - Permit-required confined spaces', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146', description: 'Federal OSHA confined space standard referenced by the raised floor and confined space awareness course.', topics: ['confined', 'raised floor', 'osha'], audience: ['operations', 'technician'], source: 'U.S. Occupational Safety and Health Administration' },
    { type: 'standard_reference', title: 'OSHA 29 CFR 1910.333 - Selection and use of electrical work practices', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333', description: 'Federal OSHA electrical safety-related work practices standard.', topics: ['electrical', 'osha'], audience: ['electrician'], source: 'U.S. Occupational Safety and Health Administration' },
    { type: 'standard_reference', title: 'EPA Section 608 - Stationary refrigeration and air conditioning', url: 'https://www.epa.gov/section608', description: 'Federal refrigerant management requirements relevant to cooling system work.', topics: ['refrigerant', 'cooling', 'epa'], audience: ['hvac'], source: 'U.S. Environmental Protection Agency' },
    { type: 'standard_reference', title: 'ISO/IEC 27001 - Information security management systems', url: 'https://www.iso.org/standard/27001', description: 'International information security management standard referenced by the security and compliance program.', topics: ['security', 'compliance', 'iso'], audience: ['security'], source: 'International Organization for Standardization' },
    { type: 'standard_reference', title: 'Uptime Institute Tier Classification System', url: 'https://uptimeinstitute.com/tiers', description: 'Tier I-IV infrastructure topology framework referenced by the Tier Infrastructure Fundamentals course.', topics: ['tier', 'design'], audience: ['design', 'engineer'], source: 'Uptime Institute' },
    { type: 'standard_reference', title: 'ASHRAE TC 9.9 - Mission Critical Facilities, Data Centers, Technology Spaces and Electronic Equipment', url: 'https://tc0909.ashraetcs.org/', description: 'ASHRAE technical committee behind the data center thermal guidelines referenced in cooling courses.', topics: ['cooling', 'thermal', 'ashrae'], audience: ['hvac'], source: 'ASHRAE' }
  ];
  const resources = staticResources.map((r) => Object.assign({ source: 'Data Center Training (first party)' }, r))
    .concat(posts.map((p) => {
      const hay = (p.title + ' ' + p.description).toLowerCase();
      return {
        type: 'blog_post',
        title: p.title,
        url: ORIGIN + '/blog/posts/' + p.slug + '.html',
        description: p.description,
        topics: topicWords.filter((w) => hay.includes(w)),
        audience: [],
        source: 'Data Center Training (first party)',
        published: p.date
      };
    }).sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title)));

  return { cfg, courses, bundles, roles, tracks, faqs, credentials, resources, availability, posts };
}

// ---------------------------------------------------------------------------
// Tool contract (shared by .well-known/mcp.json, openapi.json, and WebMCP)
// ---------------------------------------------------------------------------

function schemas(d) {
  const trackNames = d.tracks.map((t) => t.name);
  const categories = Array.from(new Set(d.courses.map((c) => c.category))).sort();
  const courseSummary = {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'title', 'url', 'track', 'category', 'course_type', 'duration_hours', 'price_usd', 'standards', 'summary'],
    properties: {
      id: { type: 'string', description: 'Stable course id (URL slug).' },
      title: { type: 'string' },
      url: { type: 'string', format: 'uri', description: 'Canonical course page.' },
      track: { type: 'string', enum: trackNames },
      category: { type: 'string', enum: categories },
      course_type: { type: 'string', enum: ['comprehensive', 'modular'] },
      duration_hours: { type: 'number', minimum: 0 },
      price_usd: { type: 'number', minimum: 0, description: 'Per-seat list price in USD.' },
      standards: { type: 'array', items: { type: 'string' }, description: 'Industry standards or frameworks the content is aligned with (not issued or approved by).' },
      summary: { type: 'string' },
      rank: { type: 'integer', minimum: 1 },
      reason: { type: 'string' }
    }
  };
  const course = {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'catalog_number', 'title', 'url', 'api_url', 'track', 'category', 'course_type', 'duration_hours', 'price_usd', 'standards',
      'description', 'audience', 'prerequisites', 'learning_outcomes', 'modules', 'bundles', 'language', 'certificate', 'availability'],
    properties: {
      id: { type: 'string' },
      catalog_number: { type: 'integer' },
      title: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      api_url: { type: 'string', format: 'uri' },
      track: { type: 'string', enum: trackNames },
      category: { type: 'string', enum: categories },
      course_type: { type: 'string', enum: ['comprehensive', 'modular'] },
      course_type_label: { type: 'string' },
      duration_hours: { type: 'number', minimum: 0 },
      duration_iso8601: { type: 'string' },
      module_count: { type: 'integer', minimum: 1 },
      price_usd: { type: 'number', minimum: 0 },
      currency: { type: 'string', enum: ['USD'] },
      standards: { type: 'array', items: { type: 'string' } },
      summary: { type: 'string' },
      description: { type: 'string' },
      why_it_matters: { type: 'string' },
      audience: { type: 'string' },
      prerequisites: { type: 'string' },
      learning_outcomes: { type: 'array', items: { type: 'string' } },
      modules: {
        type: 'array',
        items: { type: 'object', additionalProperties: false, required: ['title', 'summary'], properties: { title: { type: 'string' }, summary: { type: 'string' } } }
      },
      bundles: {
        type: 'array',
        items: {
          type: 'object', additionalProperties: false, required: ['id', 'name', 'price_usd', 'url'],
          properties: { id: { type: 'string' }, name: { type: 'string' }, price_usd: { type: 'number' }, url: { type: 'string', format: 'uri' } }
        }
      },
      language: { type: 'string', enum: ['en'] },
      delivery: { type: 'string' },
      certificate: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'issuer', 'validity_period', 'verification_url', 'is_license_or_government_certification', 'ceu_or_pdh_credit'],
        properties: {
          type: { type: 'string' },
          issuer: { type: 'string' },
          issuer_accreditation: { type: 'string' },
          delivery: { type: 'string' },
          validity_period: { type: 'string' },
          verification_url: { type: 'string', format: 'uri' },
          is_license_or_government_certification: { type: 'boolean', enum: [false] },
          ceu_or_pdh_credit: { type: 'boolean' }
        }
      },
      availability: { type: 'string', enum: ['available', 'preorder'] },
      enroll_url: { type: 'string', format: 'uri' },
      faqs: {
        type: 'array',
        items: { type: 'object', additionalProperties: false, required: ['question', 'answer'], properties: { question: { type: 'string' }, answer: { type: 'string' } } }
      },
      related_course_ids: { type: 'array', items: { type: 'string' } },
      last_updated: { type: 'string', format: 'date' }
    }
  };
  const bundle = {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'name', 'price_usd', 'list_price_usd', 'savings_usd', 'course_count', 'total_hours', 'course_ids', 'url'],
    properties: {
      id: { type: 'string', enum: d.bundles.map((b) => b.id) },
      catalog_number: { type: 'integer' },
      name: { type: 'string' },
      track: { type: 'string' },
      audience: { type: 'string' },
      price_usd: { type: 'number', minimum: 0 },
      list_price_usd: { type: 'number', minimum: 0, description: 'Sum of the included courses at individual prices.' },
      savings_usd: { type: 'number', minimum: 0 },
      savings_percent: { type: 'integer', minimum: 0, maximum: 100 },
      course_count: { type: 'integer', minimum: 1 },
      total_hours: { type: 'number', minimum: 0 },
      course_ids: { type: 'array', items: { type: 'string' } },
      url: { type: 'string', format: 'uri' },
      enroll_url: { type: 'string', format: 'uri' },
      availability: { type: 'string', enum: ['available', 'preorder'] }
    }
  };
  const qa = {
    type: 'object', additionalProperties: false, required: ['question', 'answer', 'source_url'],
    properties: { question: { type: 'string' }, answer: { type: 'string' }, source_url: { type: 'string', format: 'uri' } }
  };
  const resource = {
    type: 'object',
    additionalProperties: false,
    required: ['type', 'title', 'url', 'description', 'source', 'topics', 'audience'],
    properties: {
      type: { type: 'string', enum: ['site_page', 'blog_post', 'standard_reference'] },
      title: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      description: { type: 'string' },
      source: { type: 'string' },
      topics: { type: 'array', items: { type: 'string' } },
      audience: { type: 'array', items: { type: 'string' } },
      published: { type: 'string', format: 'date' }
    }
  };
  const credTopic = { type: 'object', required: ['summary'], properties: { summary: { type: 'string' } } };
  return { trackNames, categories, courseSummary, course, bundle, qa, resource, credTopic };
}

function toolDefs(d) {
  const s = schemas(d);
  const D7 = 'http://json-schema.org/draft-07/schema#';
  const ro = (title) => ({ title, readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false });
  const rolesEnum = d.roles.map((r) => r.id);
  const credTopics = Object.keys(d.credentials.topics);
  const defs = [
    {
      name: 'list_courses',
      title: 'Search and filter the course catalog',
      description: 'Search or filter the 44-course Data Center Training catalog. Returns course summaries with canonical URL, track, type, duration in hours, per-seat USD price, and aligned standards. Use this before get_course when the user describes a topic, role, budget, or time limit. Every filter is optional; with no input it returns the full catalog. Only report courses this tool returns - never invent a course, price, or availability.',
      data_source: [ORIGIN + '/api/courses.json'],
      inputSchema: {
        $schema: D7, type: 'object', additionalProperties: false,
        properties: {
          query: { type: 'string', minLength: 1, maxLength: 100, description: 'Keywords matched against title, summary, description, track, category, and standards (all words must match).', examples: ['UPS', 'NFPA 70E'] },
          track: { type: 'string', enum: s.trackNames, description: 'Learning track (one per course).' },
          category: { type: 'string', enum: s.categories, description: 'Catalog discipline filter.' },
          role: { type: 'string', enum: rolesEnum, description: 'Role id from recommend_courses/roles.json; limits results to that role\'s track.' },
          course_type: { type: 'string', enum: ['comprehensive', 'modular'], description: 'comprehensive = 12-18 hr full-discipline programs; modular = 1-8 hr focused specializations.' },
          standard: { type: 'string', maxLength: 60, description: 'Standard or framework name, e.g. "NFPA 70E", "ANSI/TIA-942".' },
          bundle_id: { type: 'string', enum: d.bundles.map((b) => b.id), description: 'Only courses included in this bundle.' },
          language: { type: 'string', enum: ['en', 'es', 'fr', 'de', 'pt', 'zh'], description: 'ISO 639-1 code. All courses are English-only.' },
          max_price_usd: { type: 'number', minimum: 0, maximum: 10000, description: 'Maximum per-seat price in USD.' },
          max_duration_hours: { type: 'number', minimum: 0, maximum: 24, description: 'Maximum course length in hours.' },
          sort: { type: 'string', enum: ['title', 'price_asc', 'price_desc', 'duration_asc', 'duration_desc'], default: 'title' },
          limit: { type: 'integer', minimum: 1, maximum: 44, default: 44 }
        }
      },
      outputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['total_matching', 'returned', 'courses', 'notes'],
        properties: {
          total_matching: { type: 'integer', minimum: 0 },
          returned: { type: 'integer', minimum: 0 },
          courses: { type: 'array', items: s.courseSummary },
          notes: { type: 'array', items: { type: 'string' } }
        }
      },
      annotations: ro('Search and filter the course catalog'),
      exampleInputs: [{ track: 'Power & Electrical Systems Track', max_duration_hours: 2, limit: 3 }, { query: 'refrigerant' }]
    },
    {
      name: 'get_course',
      title: 'Get one course',
      description: 'Return the full record for one course: description, audience, prerequisites, learning outcomes, modules, bundles that include it, certificate details, availability, course FAQs, and related courses. Pass the course_id from list_courses or a canonical course URL. Returns found=false with error "not_found" rather than guessing when the course does not exist.',
      data_source: [ORIGIN + '/api/courses/{course_id}.json', ORIGIN + '/api/courses.json'],
      inputSchema: {
        $schema: D7, type: 'object', additionalProperties: false,
        properties: {
          course_id: { type: 'string', pattern: '^[a-z0-9-]+$', maxLength: 80, description: 'Course id (URL slug) as returned by list_courses.', examples: ['ups-operations-load-testing'] },
          url: { type: 'string', format: 'uri', pattern: '^https://datacentertraining\\.us/courses/[a-z0-9-]+\\.html$', description: 'Canonical course URL.' }
        },
        anyOf: [{ required: ['course_id'] }, { required: ['url'] }]
      },
      outputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['found'],
        properties: {
          found: { type: 'boolean' },
          course: s.course,
          related_courses: { type: 'array', items: s.courseSummary },
          error: { type: 'string', enum: ['not_found'] },
          message: { type: 'string' }
        }
      },
      annotations: ro('Get one course'),
      exampleInputs: [{ course_id: 'data-center-epo-procedures' }, { course_id: 'quantum-cooling-101' }]
    },
    {
      name: 'compare_bundles',
      title: 'Compare course bundles',
      description: 'Compare the ' + d.bundles.length + ' course bundles (' + d.tracks.length + ' role-based track bundles, ' + d.bundles.filter((b) => b.track === 'Multiple tracks').length + ' compliance packs, and the complete ' + d.courses.length + '-course catalog bundle) side by side: bundle price, sum of individual course prices, savings, course count, total hours, audience, and included course ids. Omit bundle_ids to compare all bundles. Prices are per seat before seat-count volume discounts.',
      data_source: [ORIGIN + '/api/bundles.json'],
      inputSchema: {
        $schema: D7, type: 'object', additionalProperties: false,
        properties: {
          bundle_ids: { type: 'array', minItems: 1, maxItems: d.bundles.length, uniqueItems: true, items: { type: 'string', enum: d.bundles.map((b) => b.id) }, description: 'Bundles to compare; omit for all.' }
        }
      },
      outputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['bundles', 'notes'],
        properties: { bundles: { type: 'array', items: s.bundle }, notes: { type: 'array', items: { type: 'string' } } }
      },
      annotations: ro('Compare course bundles'),
      exampleInputs: [{ bundle_ids: ['bundle-security-compliance', 'bundle-complete-catalog'] }]
    },
    {
      name: 'recommend_courses',
      title: 'Recommend courses for a role',
      description: 'Recommend a learning track, bundle, and ranked course list for a job role (e.g. "electrician", "HVAC technician", "facility manager", "security lead", "design engineer", "DCIM/network technician"). Optional work_context refines the match and budget_usd trims the list to what fits. Returns matched=false with the list of supported roles when the role is unclear - ask the user instead of guessing. Training guidance only, not legal or compliance advice.',
      data_source: [ORIGIN + '/api/roles.json', ORIGIN + '/api/bundles.json', ORIGIN + '/api/courses.json'],
      inputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['role'],
        properties: {
          role: { type: 'string', minLength: 2, maxLength: 100, description: 'Job title or role id (' + rolesEnum.join(', ') + ').', examples: ['electrician', 'critical facilities manager'] },
          work_context: { type: 'string', maxLength: 300, description: 'Optional duties or equipment, e.g. "maintains CRAH units and chillers".' },
          budget_usd: { type: 'number', minimum: 0, maximum: 100000, description: 'Optional per-person budget in USD.' }
        }
      },
      outputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['matched', 'caveats'],
        properties: {
          matched: { type: 'boolean' },
          role: { type: 'object', additionalProperties: false, required: ['id', 'label'], properties: { id: { type: 'string', enum: rolesEnum }, label: { type: 'string' } } },
          track: { type: 'string', enum: s.trackNames },
          reason: { type: 'string' },
          recommended_bundle: {
            type: ['object', 'null'], additionalProperties: false,
            properties: {
              id: { type: 'string' }, name: { type: 'string' }, price_usd: { type: 'number' }, list_price_usd: { type: 'number' },
              savings_usd: { type: 'number' }, course_count: { type: 'integer' }, total_hours: { type: 'number' }, url: { type: 'string', format: 'uri' }
            }
          },
          courses: { type: 'array', items: s.courseSummary },
          message: { type: 'string' },
          available_roles: {
            type: 'array',
            items: { type: 'object', additionalProperties: false, required: ['id', 'label'], properties: { id: { type: 'string' }, label: { type: 'string' } } }
          },
          caveats: { type: 'array', items: { type: 'string' } }
        }
      },
      annotations: ro('Recommend courses for a role'),
      exampleInputs: [{ role: 'HVAC technician', work_context: 'maintains CRAH units and chillers', budget_usd: 500 }, { role: 'chef' }]
    },
    {
      name: 'get_credential_info',
      title: 'Explain certificates and accreditation',
      description: 'Explain exactly what learners receive and what it does and does not mean: certificate of completion, IACET provider-level accreditation, standards alignment, CEU/PDH status, expiration, verification, and employer responsibility. Includes a do_not_claim list. Use this before describing any course as a "certification" or implying approval by NFPA, TIA, Uptime Institute, OSHA, or any other body.',
      data_source: [ORIGIN + '/api/credentials.json'],
      inputSchema: {
        $schema: D7, type: 'object', additionalProperties: false,
        properties: { topic: { type: 'string', enum: credTopics.concat(['all']), default: 'all' } }
      },
      outputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['topic', 'last_reviewed', 'source_url', 'do_not_claim'],
        properties: Object.assign(
          { topic: { type: 'string' }, last_reviewed: { type: 'string', format: 'date' }, source_url: { type: 'string', format: 'uri' }, do_not_claim: { type: 'array', items: { type: 'string' } } },
          Object.fromEntries(credTopics.map((t) => [t, s.credTopic]))
        )
      },
      annotations: ro('Explain certificates and accreditation'),
      exampleInputs: [{ topic: 'ceu_pdh' }]
    },
    {
      name: 'answer_faq',
      title: 'Answer from the published FAQ',
      description: 'Find published answers to a question about programs, pricing, certificates, access, team enrollment, or policies, optionally including one course\'s FAQ (course_id). Returns up to 3 quoted answers with their source URL. When answered=false there is no published answer: say so and route the user to support rather than composing one.',
      data_source: [ORIGIN + '/api/faq.json', ORIGIN + '/api/courses.json'],
      inputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['question'],
        properties: {
          question: { type: 'string', minLength: 3, maxLength: 300, examples: ['Do certificates expire?'] },
          course_id: { type: 'string', pattern: '^[a-z0-9-]+$', maxLength: 80, description: 'Optional course id to include that course\'s FAQ.' }
        }
      },
      outputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['answered', 'matches', 'last_reviewed', 'support'],
        properties: {
          answered: { type: 'boolean' },
          matches: { type: 'array', maxItems: 3, items: s.qa },
          last_reviewed: { type: 'string', format: 'date' },
          support: { type: 'string' }
        }
      },
      annotations: ro('Answer from the published FAQ'),
      exampleInputs: [{ question: 'Do data center training certificates expire?' }, { question: 'What is the difference between static bypass and maintenance bypass?', course_id: 'ups-operations-load-testing' }]
    },
    {
      name: 'list_resources',
      title: 'List guides and standards references',
      description: 'List first-party guides (blog posts, catalog, role, and credential pages) and official regulatory or standards-body references by topic, audience, or type. Each item has its source and URL. Prefer these over third-party summaries; standard_reference items point to the issuing body.',
      data_source: [ORIGIN + '/api/resources.json'],
      inputSchema: {
        $schema: D7, type: 'object', additionalProperties: false,
        properties: {
          topic: { type: 'string', maxLength: 80, description: 'Keywords, e.g. "generator", "refrigerant", "access control".' },
          audience: { type: 'string', maxLength: 60, description: 'Role keyword, e.g. "electrician", "hvac", "security".' },
          type: { type: 'string', enum: ['site_page', 'blog_post', 'standard_reference'] },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 25 }
        }
      },
      outputSchema: {
        $schema: D7, type: 'object', additionalProperties: false, required: ['count', 'resources'],
        properties: { count: { type: 'integer', minimum: 0 }, resources: { type: 'array', items: s.resource } }
      },
      annotations: ro('List guides and standards references'),
      exampleInputs: [{ topic: 'refrigerant' }]
    }
  ];
  return { defs, s };
}

// ---------------------------------------------------------------------------
// Outputs
// ---------------------------------------------------------------------------

function contentHash(d) {
  const h = crypto.createHash('sha256');
  h.update(JSON.stringify([d.courses, d.bundles, d.roles, d.faqs, d.credentials, d.resources, MANIFEST_VERSION]));
  return h.digest('hex').slice(0, 16);
}

// last_updated only moves when the catalog content actually changes, so
// re-running the build (or CI) never creates date-only churn.
function lastUpdated(hash) {
  try {
    const prev = JSON.parse(read('api/index.json'));
    if (prev.content_hash === hash) return prev.last_updated;
  } catch (e) { /* first build */ }
  return new Date().toISOString().slice(0, 10);
}

const AGENT_RULES = [
  'Quote prices, durations, course counts, and bundle contents exactly as published here; never estimate or invent them.',
  'Only name courses that exist in /api/courses.json. If nothing matches, say so.',
  'Courses award a certificate of completion from HAZWOPER OSHA Training, LLC (an IACET Accredited Provider). Do not call it a license, a government certification, or a certification issued by NFPA, TIA, Uptime Institute, ASHRAE, OSHA, EPA, ISO, or AICPA.',
  '"Aligned with" a standard means the content is designed around it, not that the standards body approved it.',
  'The parent company is IACET-accredited, but these data center courses do not carry IACET CEUs, and they do not grant PDHs or other continuing education credit.',
  'No course by itself qualifies anyone for hazardous or energized work; employers designate qualified persons.',
  'Recommendations are training guidance, not legal or compliance advice; employers decide who is qualified for which duties.',
  'Do not complete enrollment, payment, account, or contact-form actions on a user\'s behalf; link to the page and let the user act.',
  'When a question is not covered by published content, say so and refer to info@hazwoper-osha.com or 1-866-429-6742.'
];

function buildOutputs(d) {
  const { defs, s } = toolDefs(d);
  const hash = contentHash(d);
  const updated = lastUpdated(hash);
  d.credentials.last_reviewed = updated;

  const courses = d.courses.map((c) => Object.assign({}, c, { last_updated: updated }));
  const envelope = (extra) => Object.assign({ publisher: 'Data Center Training (datacentertraining.us)', last_updated: updated, license: 'Public information; quote with attribution and a link to the source URL.' }, extra);

  const data = {
    courses: envelope({ count: courses.length, courses }),
    bundles: envelope({ count: d.bundles.length, currency: 'USD', volume_discounts: d.cfg.BULK_TIERS, bundles: d.bundles }),
    roles: envelope({ roles: d.roles, tracks: d.tracks }),
    faq: envelope({ count: d.faqs.length, support: SUPPORT, faqs: d.faqs }),
    credentials: envelope(d.credentials),
    resources: envelope({ count: d.resources.length, resources: d.resources })
  };
  data.credentials.last_reviewed = updated;
  for (const [name, obj] of Object.entries(data)) write('api/' + name + '.json', json(obj));
  for (const c of courses) write('api/courses/' + c.id + '.json', json(c));

  // Run each example through the real tool engine so published examples are exact.
  const toolData = { courses: data.courses, bundles: data.bundles, roles: data.roles, faq: data.faq, credentials: data.credentials, resources: data.resources };
  const truncate = (out) => {
    const copy = JSON.parse(JSON.stringify(out));
    for (const k of ['courses', 'resources', 'bundles']) if (Array.isArray(copy[k]) && copy[k].length > 2) copy[k] = copy[k].slice(0, 2);
    if (copy.course) {
      copy.course.faqs = copy.course.faqs.slice(0, 1);
      copy.course.modules = copy.course.modules.slice(0, 2);
    }
    if (copy.related_courses) copy.related_courses = copy.related_courses.slice(0, 1);
    return copy;
  };
  const manifestTools = defs.map((t) => ({
    name: t.name,
    title: t.title,
    description: t.description,
    inputSchema: t.inputSchema,
    outputSchema: t.outputSchema,
    annotations: t.annotations,
    data_source: t.data_source,
    examples: t.exampleInputs.map((input) => ({ input, output: truncate(tools.run(t.name, input, toolData)), output_truncated: true }))
  }));
  const fullExamples = defs.map((t) => ({ name: t.name, outputSchema: t.outputSchema, runs: t.exampleInputs.map((input) => tools.run(t.name, input, toolData)) }));

  const manifest = {
    schema_version: '2026-06',
    name: 'datacentertraining-us',
    title: 'Data Center Training',
    description: 'Read-only catalog tools for Data Center Training (datacentertraining.us): ' + d.courses.length + ' online, self-paced data center courses (' + d.courses.reduce((sum, c) => sum + c.duration_hours, 0) + ' hours), ' + d.bundles.length + ' bundles, and ' + d.tracks.length + ' role-based learning tracks, delivered by HAZWOPER OSHA Training, LLC, an IACET Accredited Provider.',
    version: MANIFEST_VERSION,
    last_updated: updated,
    homepage: ORIGIN + '/',
    documentation: ORIGIN + '/llms.txt',
    documentation_full: ORIGIN + '/llms-full.txt',
    openapi: ORIGIN + '/openapi.json',
    sitemap: ORIGIN + '/sitemap.xml',
    publisher: {
      name: 'HAZWOPER OSHA Training, LLC',
      url: 'https://hazwoper-osha.com/',
      email: SUPPORT.email,
      phone: SUPPORT.phone
    },
    authentication: { type: 'none' },
    transports: [
      {
        type: 'webmcp',
        description: 'Every HTML page registers these tools with navigator.modelContext (WebMCP). The catalog search form on /courses.html is also exposed declaratively as the "search_catalog" form tool.',
        script: ORIGIN + '/js/webmcp.js'
      },
      {
        type: 'static-http',
        description: 'Every tool is backed by public JSON documents (GET, no auth, CORS-enabled). Agents without WebMCP can fetch data_source and apply the documented filters.',
        base_url: ORIGIN + '/api/'
      }
    ],
    capabilities: { tools: { listChanged: false }, resources: { subscribe: false, listChanged: false } },
    tools: manifestTools,
    resources: [
      { uri: ORIGIN + '/llms.txt', name: 'llms.txt', mimeType: 'text/markdown', description: 'Concise site summary and agent rules.' },
      { uri: ORIGIN + '/llms-full.txt', name: 'llms-full.txt', mimeType: 'text/markdown', description: 'Every course, bundle, role, FAQ, and policy as stable records.' },
      { uri: ORIGIN + '/api/index.json', name: 'API index', mimeType: 'application/json', description: 'Index of all JSON documents.' },
      { uri: ORIGIN + '/api/courses.json', name: 'Courses', mimeType: 'application/json', description: 'All 44 course records.' },
      { uri: ORIGIN + '/api/bundles.json', name: 'Bundles', mimeType: 'application/json', description: 'All ' + d.bundles.length + ' bundles with pricing and savings.' },
      { uri: ORIGIN + '/api/roles.json', name: 'Roles and tracks', mimeType: 'application/json', description: 'Role-to-track recommendations.' },
      { uri: ORIGIN + '/api/faq.json', name: 'FAQ', mimeType: 'application/json', description: 'Published FAQ answers.' },
      { uri: ORIGIN + '/api/credentials.json', name: 'Credentials', mimeType: 'application/json', description: 'Certificate and accreditation facts and claims to avoid.' },
      { uri: ORIGIN + '/api/resources.json', name: 'Resources', mimeType: 'application/json', description: 'First-party guides and official standards references.' },
      { uri: ORIGIN + '/openapi.json', name: 'OpenAPI', mimeType: 'application/json', description: 'OpenAPI 3.1 description of the JSON documents.' },
      { uri: ORIGIN + '/sitemap.xml', name: 'Sitemap', mimeType: 'application/xml', description: 'All indexable pages with lastmod.' }
    ],
    policies: {
      agent_rules: AGENT_RULES,
      excluded_actions: ['enrollment', 'checkout and payment', 'account access', 'certificate issuance', 'contact-form submission'],
      data_handling: 'Tools take no personal data and set no cookies. Inputs are processed in the page or by the agent; nothing is sent to a server.'
    },
    security: {
      https_only: true,
      read_only: true,
      write_tools: [],
      confirmation_required_for: [],
      cors: 'Public read-only GET on static JSON; no credentials accepted.'
    }
  };
  write('.well-known/mcp.json', json(manifest));

  write('api/index.json', json({
    name: 'Data Center Training public catalog API',
    description: 'Static, read-only JSON documents describing the Data Center Training catalog. No authentication. Regenerated from the site source on every change.',
    last_updated: updated,
    content_hash: hash,
    manifest: ORIGIN + '/.well-known/mcp.json',
    openapi: ORIGIN + '/openapi.json',
    documents: {
      courses: ORIGIN + '/api/courses.json',
      course: ORIGIN + '/api/courses/{course_id}.json',
      bundles: ORIGIN + '/api/bundles.json',
      roles: ORIGIN + '/api/roles.json',
      faq: ORIGIN + '/api/faq.json',
      credentials: ORIGIN + '/api/credentials.json',
      resources: ORIGIN + '/api/resources.json'
    },
    counts: { courses: courses.length, bundles: d.bundles.length, tracks: d.tracks.length, roles: d.roles.length, faqs: d.faqs.length, resources: d.resources.length },
    agent_rules: AGENT_RULES
  }));

  writeOpenApi(d, s, defs, updated);
  writeLlms(d, courses, updated);
  return { manifest, data, fullExamples, updated };
}

function writeOpenApi(d, s, defs, updated) {
  const page = (id, pathName, summary, description) => ({
    [pathName]: { get: { operationId: id, summary, description, tags: ['Pages'], responses: { 200: { description: 'HTML document', content: { 'text/html': {} } } } } }
  });
  const doc = (id, summary, description, schemaRef, extra) => ({
    get: Object.assign({
      operationId: id,
      summary,
      description,
      tags: ['Catalog data'],
      responses: {
        200: { description: summary, content: { 'application/json': { schema: { $ref: '#/components/schemas/' + schemaRef } } } },
        404: { description: 'Not found' }
      }
    }, extra || {})
  });
  const envelopeOf = (key, item) => ({
    type: 'object',
    required: ['last_updated', key],
    properties: { publisher: { type: 'string' }, last_updated: { type: 'string', format: 'date' }, license: { type: 'string' }, count: { type: 'integer' }, [key]: { type: 'array', items: { $ref: '#/components/schemas/' + item } } }
  });
  const strip = (schema) => JSON.parse(JSON.stringify(schema, (k, v) => (k === '$schema' ? undefined : v)));
  const openapi = {
    openapi: '3.1.0',
    info: {
      title: 'Data Center Training - Public Catalog API',
      version: MANIFEST_VERSION,
      description: 'Read-only, unauthenticated JSON documents describing Data Center Training\'s ' + d.courses.length + ' courses, ' + d.bundles.length + ' bundles, ' + d.tracks.length + ' learning tracks, roles, FAQ, credentials, and resources, plus the HTML pages they come from. The same data backs the WebMCP tools in /.well-known/mcp.json. Last updated ' + updated + '.',
      contact: { name: 'HAZWOPER OSHA Training, LLC', email: SUPPORT.email, url: ORIGIN + '/' }
    },
    servers: [{ url: ORIGIN }],
    externalDocs: { description: 'llms-full.txt', url: ORIGIN + '/llms-full.txt' },
    tags: [{ name: 'Catalog data', description: 'Static JSON documents' }, { name: 'Agent discovery', description: 'Manifests and AI context files' }, { name: 'Pages', description: 'Canonical HTML pages' }],
    paths: Object.assign(
      {
        '/api/index.json': doc('getApiIndex', 'API index', 'Links to every JSON document, counts, content hash, and agent rules.', 'ApiIndex'),
        '/api/courses.json': doc('listCourses', 'All courses', 'Every course as a full record. Filter client-side; see the list_courses tool for the documented filters.', 'CourseList'),
        '/api/courses/{course_id}.json': doc('getCourse', 'One course', 'Full record for one course. Returns 404 for unknown ids.', 'Course', {
          parameters: [{ name: 'course_id', in: 'path', required: true, description: 'Course id (URL slug).', schema: { type: 'string', enum: d.courses.map((c) => c.id) } }]
        }),
        '/api/bundles.json': doc('listBundles', 'All bundles', 'Bundle prices, individual list prices, savings, and included courses; also the seat-count volume discount ladder.', 'BundleList'),
        '/api/roles.json': doc('listRoles', 'Roles and tracks', 'Role-to-track recommendations and the 6 learning tracks.', 'RoleList'),
        '/api/faq.json': doc('listFaq', 'FAQ', 'Every published FAQ answer with its category and source URL.', 'FaqList'),
        '/api/credentials.json': doc('getCredentials', 'Certificate and accreditation facts', 'What the certificate of completion is and is not, with claims agents must not make.', 'Credentials'),
        '/api/resources.json': doc('listResources', 'Resources', 'First-party guides and official standards references.', 'ResourceList'),
        '/.well-known/mcp.json': {
          get: { operationId: 'getMcpManifest', summary: 'WebMCP / MCP manifest', tags: ['Agent discovery'], description: 'Tool definitions (Draft 7 JSON Schema inputs and outputs, examples, safety annotations) for the read-only catalog tools.', responses: { 200: { description: 'Manifest', content: { 'application/json': {} } } } }
        },
        '/llms.txt': { get: { operationId: 'getLlmsTxt', summary: 'llms.txt', tags: ['Agent discovery'], description: 'Concise site summary and agent rules.', responses: { 200: { description: 'Markdown', content: { 'text/plain': {} } } } } },
        '/llms-full.txt': { get: { operationId: 'getLlmsFullTxt', summary: 'llms-full.txt', tags: ['Agent discovery'], description: 'Every course, bundle, role, and FAQ as stable records.', responses: { 200: { description: 'Markdown', content: { 'text/plain': {} } } } } },
        '/sitemap.xml': { get: { operationId: 'getSitemap', summary: 'XML sitemap', tags: ['Agent discovery'], description: 'All indexable pages; lastmod is the date the page content last changed.', responses: { 200: { description: 'XML', content: { 'application/xml': {} } } } } }
      },
      page('getHomepage', '/', 'Homepage', 'Site overview with EducationalOrganization, WebSite, and FAQPage JSON-LD.'),
      page('getCourseCatalogPage', '/courses.html', 'Course catalog page', 'All 44 courses with search, sort, and filters; Course ItemList JSON-LD. Accepts ?q=, ?type=, ?track=, ?sort=.'),
      page('getBundlesPage', '/bundles.html', 'Bundles page', 'All ' + d.bundles.length + ' bundles with Product/Offer JSON-LD.'),
      page('getWhoPage', '/who.html', 'Role guide', 'Role-to-track recommendations.'),
      page('getCertificationsPage', '/certifications.html', 'Certifications page', 'Accreditation and credential transparency.'),
      page('getFaqPage', '/faq.html', 'FAQ page', 'FAQ with FAQPage JSON-LD.'),
      page('getBlogIndex', '/blog/', 'Blog', 'Field guidance articles with Blog JSON-LD.')
    ),
    components: {
      schemas: {
        CourseSummary: strip(s.courseSummary),
        Course: strip(s.course),
        Bundle: strip(s.bundle),
        Role: {
          type: 'object', required: ['id', 'label', 'track', 'bundle_id', 'description'],
          properties: { id: { type: 'string' }, label: { type: 'string' }, track: { type: 'string' }, bundle_id: { type: 'string' }, description: { type: 'string' }, keywords: { type: 'array', items: { type: 'string' } }, source_url: { type: 'string', format: 'uri' } }
        },
        Track: { type: 'object', required: ['name', 'bundle_id', 'course_ids'], properties: { name: { type: 'string' }, bundle_id: { type: 'string' }, course_ids: { type: 'array', items: { type: 'string' } }, roles: { type: 'array', items: { type: 'string' } } } },
        FaqEntry: { type: 'object', required: ['question', 'answer', 'source_url'], properties: { question: { type: 'string' }, answer: { type: 'string' }, category: { type: 'string' }, source_url: { type: 'string', format: 'uri' } } },
        Resource: strip(s.resource),
        CourseList: envelopeOf('courses', 'Course'),
        BundleList: envelopeOf('bundles', 'Bundle'),
        FaqList: envelopeOf('faqs', 'FaqEntry'),
        ResourceList: envelopeOf('resources', 'Resource'),
        RoleList: { type: 'object', required: ['roles', 'tracks'], properties: { last_updated: { type: 'string', format: 'date' }, roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } }, tracks: { type: 'array', items: { $ref: '#/components/schemas/Track' } } } },
        Credentials: { type: 'object', required: ['topics', 'do_not_claim'], properties: { last_updated: { type: 'string', format: 'date' }, source_url: { type: 'string', format: 'uri' }, topics: { type: 'object', additionalProperties: { type: 'object', properties: { summary: { type: 'string' } } } }, do_not_claim: { type: 'array', items: { type: 'string' } } } },
        ApiIndex: { type: 'object', required: ['last_updated', 'documents'], properties: { last_updated: { type: 'string', format: 'date' }, content_hash: { type: 'string' }, documents: { type: 'object', additionalProperties: { type: 'string' } }, counts: { type: 'object', additionalProperties: { type: 'integer' } }, agent_rules: { type: 'array', items: { type: 'string' } } } }
      }
    },
    'x-mcp-tools': defs.map((t) => ({ name: t.name, description: t.description, data_source: t.data_source }))
  };
  write('openapi.json', json(openapi));
}

function writeLlms(d, courses, updated) {
  const total = courses.reduce((sum, c) => sum + c.duration_hours, 0);
  const complete = d.bundles.find((b) => b.id === 'bundle-complete-catalog');
  const maxSave = Math.max(...d.bundles.map((b) => b.savings_percent));
  const intro =
    '> Data Center Training (datacentertraining.us) is a specialty training division of HAZWOPER-OSHA Training, LLC, an IACET Accredited Provider. ' +
    courses.length + ' online, self-paced data center courses (' + total + ' hours total) in design, operations, power, cooling, security, and facilities management. Every course awards a certificate of completion.';
  const rules = AGENT_RULES.map((r) => '- ' + r).join('\n');

  const llms = [
    '# Data Center Training',
    '',
    intro,
    '',
    'Last updated: ' + updated,
    '',
    'Courses start at $' + Math.min(...courses.map((c) => c.price_usd)).toFixed(2) + ' per seat, or enroll the complete ' + courses.length + '-course catalog bundle for $' + complete.price_usd.toLocaleString('en-US', { minimumFractionDigits: 2 }) + '. ' + d.bundles.length + ' bundles save up to ' + maxSave + '%. Programs are Comprehensive Programs (8 hrs each, full-discipline curriculum) or Modular Specializations (1-8 hrs, focused skills). English only.',
    '',
    '## Rules for AI agents',
    '',
    rules,
    '',
    '## Machine-readable data',
    '',
    '- [WebMCP / MCP manifest](' + ORIGIN + '/.well-known/mcp.json): 7 read-only tools (list_courses, get_course, compare_bundles, recommend_courses, get_credential_info, answer_faq, list_resources) with JSON Schemas and examples. Also registered in-page via navigator.modelContext.',
    '- [OpenAPI 3.1](' + ORIGIN + '/openapi.json): schema for every JSON document below.',
    '- [API index](' + ORIGIN + '/api/index.json), [courses](' + ORIGIN + '/api/courses.json), [bundles](' + ORIGIN + '/api/bundles.json), [roles](' + ORIGIN + '/api/roles.json), [FAQ](' + ORIGIN + '/api/faq.json), [credentials](' + ORIGIN + '/api/credentials.json), [resources](' + ORIGIN + '/api/resources.json)',
    '- [llms-full.txt](' + ORIGIN + '/llms-full.txt): every course, bundle, role, and FAQ as stable records.',
    '- [Sitemap](' + ORIGIN + '/sitemap.xml): every indexable page. lastmod is the date that page\'s content last changed.',
    '',
    '## Key Pages',
    '',
    '- [Homepage](' + ORIGIN + '/): overview and links to every section.',
    '- [Course Catalog](' + ORIGIN + '/courses.html): all ' + courses.length + ' courses; filter by track, type, duration, or price.',
    '- [Bundles](' + ORIGIN + '/bundles.html): ' + d.bundles.length + ' role-based, compliance pack, and complete-catalog bundles.',
    '- [Who It\'s For](' + ORIGIN + '/who.html): role-based course recommendations.',
    '- [Certifications & Accreditations](' + ORIGIN + '/certifications.html): IACET provider accreditation and credential transparency.',
    '- [FAQ](' + ORIGIN + '/faq.html): programs, pricing, certificates, and policies.',
    '- [Blog](' + ORIGIN + '/blog/): field guidance for data center teams.',
    '',
    '## Learning Tracks',
    '',
    d.tracks.map((t) => {
      const b = d.bundles.find((x) => x.id === t.bundle_id);
      return '- ' + t.name + ': ' + b.course_count + ' courses, ' + b.total_hours + ' hrs, bundle $' + b.price_usd.toFixed(2);
    }).join('\n'),
    '',
    '## About',
    '',
    '- Credential: certificate of completion from HAZWOPER OSHA Training, LLC. Not a license or a certification from any standards body. The parent company is IACET-accredited, but these courses do not carry IACET CEUs or any PDH/continuing education credit.',
    '- Accreditation: IACET Accredited Provider (provider-level): ' + IACET_URL,
    '- Parent organization: HAZWOPER-OSHA Training, LLC (Industrial Certified Training, LLC), https://hazwoper-osha.com/',
    '- Contact: ' + SUPPORT.email + ', ' + SUPPORT.phone,
    '- Address: 11901 Santa Monica Blvd., Suite #414, Los Angeles, CA 90025',
    '',
    '## Optional',
    '',
    '- [Privacy Policy](' + ORIGIN + '/privacy.html)',
    '- [Terms of Service](' + ORIGIN + '/terms.html)',
    '- [Accessibility](' + ORIGIN + '/accessibility.html)',
    '- [Refund Policy](https://hazwoper-osha.com/refund-policy)',
    '- [Certificate Verification](' + CERT_VERIFY_URL + ')',
    ''
  ].join('\n');
  write('llms.txt', llms);

  const courseRecord = (c) => [
    '### ' + c.title,
    '',
    '- id: ' + c.id,
    '- catalog_number: ' + c.catalog_number,
    '- url: ' + c.url,
    '- api_url: ' + c.api_url,
    '- track: ' + c.track,
    '- category: ' + c.category,
    '- course_type: ' + c.course_type_label,
    '- duration_hours: ' + c.duration_hours,
    '- modules: ' + c.module_count,
    '- price_usd: ' + c.price_usd.toFixed(2),
    '- standards_aligned: ' + (c.standards.length ? c.standards.join('; ') : 'none named'),
    '- bundles: ' + c.bundles.map((b) => b.name + ' ($' + b.price_usd.toFixed(2) + ')').join('; '),
    '- audience: ' + c.audience,
    '- prerequisites: ' + c.prerequisites,
    '- language: English',
    '- delivery: ' + c.delivery,
    '- certificate: ' + c.certificate.type + ' from ' + c.certificate.issuer + '; ' + c.certificate.validity_period.toLowerCase() + '; verify at ' + c.certificate.verification_url,
    '- availability: ' + (c.availability === 'preorder' ? 'enrollment request at checkout, by phone, or by email; same-day setup; card or purchase order' : 'enroll online'),
    '- summary: ' + c.summary,
    '',
    c.description,
    '',
    'Learning outcomes:',
    c.learning_outcomes.map((o) => '- ' + o).join('\n'),
    '',
    'Modules:',
    c.modules.map((m, i) => (i + 1) + '. ' + m.title + ': ' + m.summary).join('\n'),
    ''
  ].join('\n');

  const full = [
    '# Data Center Training - Full Catalog',
    '',
    intro,
    '',
    'Last updated: ' + updated,
    'Canonical source: ' + ORIGIN + '/api/courses.json (same records as JSON). Tools: ' + ORIGIN + '/.well-known/mcp.json',
    '',
    '## Rules for AI agents',
    '',
    rules,
    '',
    '## Course Records',
    '',
    'Each record below is stable: the id never changes, and every field matches the course page.',
    '',
    d.tracks.map((t) => '## ' + t.name + '\n\n' + t.course_ids.map((id) => courseRecord(courses.find((c) => c.id === id))).join('\n')).join('\n'),
    '## Bundles',
    '',
    'Prices are per seat in USD. Seat-count volume discounts apply at checkout: ' +
      d.cfg.BULK_TIERS.filter((t) => t.discount).map((t) => t.min + '-' + t.max + ' seats ' + Math.round(t.discount * 100) + '%').join(', ') + '.',
    '',
    d.bundles.map((b) => [
      '### ' + b.name,
      '',
      '- id: ' + b.id,
      '- track: ' + b.track,
      '- price_usd: ' + b.price_usd.toFixed(2),
      '- list_price_usd: ' + b.list_price_usd.toFixed(2) + ' (sum of individual course prices)',
      '- savings: $' + b.savings_usd.toFixed(2) + ' (' + b.savings_percent + '%)',
      '- courses: ' + b.course_count + ', ' + b.total_hours + ' hrs',
      '- audience: ' + b.audience,
      '- url: ' + b.url,
      '- course_ids: ' + b.course_ids.join(', '),
      ''
    ].join('\n')).join('\n'),
    '## Roles',
    '',
    d.roles.map((r) => '- ' + r.id + ' ("' + r.label + '"): ' + r.track + '. ' + r.description).join('\n'),
    '',
    '## Credentials',
    '',
    Object.entries(d.credentials.topics).map(([k, v]) => '- ' + k + ': ' + v.summary).join('\n'),
    '',
    'Do not claim:',
    d.credentials.do_not_claim.map((x) => '- ' + x).join('\n'),
    '',
    '## FAQ',
    '',
    d.faqs.map((f) => '### ' + f.question + '\n\n' + f.answer + '\n').join('\n'),
    '## Guides and References',
    '',
    d.resources.map((r) => '- [' + r.title + '](' + r.url + ') (' + r.type.replace('_', ' ') + (r.published ? ', ' + r.published : '') + '): ' + r.description).join('\n'),
    '',
    '## Company',
    '',
    '- Legal name: Industrial Certified Training, LLC',
    '- Training provider: HAZWOPER OSHA Training, LLC, https://hazwoper-osha.com/ (IACET Accredited Provider)',
    '- Contact: ' + SUPPORT.email + ', ' + SUPPORT.phone,
    '- Address: 11901 Santa Monica Blvd., Suite #414, Los Angeles, CA 90025',
    ''
  ].join('\n');
  write('llms-full.txt', full);
}

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------

const THIRD_PARTY = `<script>
/* Analytics, session recording, and chat load for every visitor unless they opt out or send a GPC signal
   (see /js/consent.js), on the first interaction (scroll, tap, key, mouse move) so they never delay rendering. */
(function(w,d){
  w.dataLayer=w.dataLayer||[];w.gtag=function(){w.dataLayer.push(arguments);};
  w.clarity=w.clarity||function(){(w.clarity.q=w.clarity.q||[]).push(arguments);};
  w.Tawk_API=w.Tawk_API||{};w.Tawk_API.onLoad=function(){w.Tawk_API.minimize();};
  var ev=['pointerdown','keydown','touchstart','scroll','mousemove'];
  function add(src,attrs){var s=d.createElement('script');s.async=true;s.src=src;for(var k in attrs)s.setAttribute(k,attrs[k]);d.head.appendChild(s);}
  function once(fn){var done=0;return function(now){if(done)return;function go(){if(done)return;done=1;ev.forEach(function(e){w.removeEventListener(e,go,{passive:true});});fn();}
    if(now)go();else ev.forEach(function(e){w.addEventListener(e,go,{passive:true});});};}
  w.dctLoad={
    analytics:once(function(){
      w.gtag('js',new Date());w.gtag('config','G-Z3T42KYK64');
      add('https://www.googletagmanager.com/gtag/js?id=G-Z3T42KYK64');
      add('https://analytics.ahrefs.com/analytics.js',{'data-key':'tVAd7KxwKax+pAfHx46Zgg'});
      add('https://www.clarity.ms/tag/ylza43nm4m');
    }),
    chat:once(function(){
      w.Tawk_LoadStart=new Date();add('https://embed.tawk.to/6a5a95a2096ab21d402a762c/1jtoth11r',{charset:'UTF-8',crossorigin:'*'});
    })
  };
})(window,document);
if(navigator.modelContext){var m=document.createElement('script');m.src='/js/webmcp.js';m.defer=true;document.head.appendChild(m);}
</script>
<script src="/js/consent.js" defer></script>`;

function headBlock() {
  return [
    '<!-- dct:head -->',
    '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests; object-src \'none\'; base-uri \'self\'">',
    '<meta name="referrer" content="strict-origin-when-cross-origin">',
    '<meta name="theme-color" content="#f5f5f7">',
    '<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt">',
    '<link rel="alternate" type="application/json" href="/.well-known/mcp.json" title="WebMCP manifest">',
    '<link rel="service-desc" type="application/vnd.oai.openapi+json" href="/openapi.json">',
    THIRD_PARTY,
    '<!-- /dct:head -->'
  ].join('\n');
}

const OLD_ANALYTICS = /<!-- Google tag \(gtag\.js\) -->[\s\S]*?"clarity", "script", "ylza43nm4m"\);\s*<\/script>\n?/;
const OLD_TAWK = /\n?<!--Start of Tawk\.to Script-->[\s\S]*?<!--End of Tawk\.to Script-->\n?/;

function metaContent(html, attr, key) {
  const m = html.match(new RegExp('<meta ' + attr + '="' + key + '" content="([^"]*)">'));
  return m ? m[1] : null;
}

function processHead(rel, html) {
  html = html.replace(OLD_ANALYTICS, '').replace(OLD_TAWK, '\n');
  html = html.replace(/<!-- dct:head -->[\s\S]*?<!-- \/dct:head -->\n?/, '');
  html = html.replace(/(<meta name="viewport"[^>]*>\n)/, '$1' + headBlock() + '\n');

  // X/Twitter cards mirror the Open Graph tags.
  html = html.replace(/<meta name="twitter:[^"]+" content="[^"]*">\n/g, '');
  const og = (k) => metaContent(html, 'property', 'og:' + k);
  if (og('title')) {
    const tw = [
      '<meta name="twitter:card" content="summary_large_image">',
      '<meta name="twitter:site" content="@HazwoperOsha">',
      '<meta name="twitter:title" content="' + og('title') + '">',
      '<meta name="twitter:description" content="' + og('description') + '">',
      '<meta name="twitter:image" content="' + og('image') + '">'
    ].join('\n');
    html = html.replace(/(<meta property="og:site_name"[^>]*>\n|<meta property="og:image:height"[^>]*>\n)(?![\s\S]*<meta property="og:site_name")/, '$1' + tw + '\n');
  }

  // One minified stylesheet instead of 2-3 render-blocking requests.
  html = html.replace(
    /<link rel="stylesheet" href="((?:\.\.\/)*)css\/tokens\.css">\n<link rel="stylesheet" href="\1css\/style\.css">\n<link rel="stylesheet" href="((?:\.\.\/)*)assets\/css\/blog\.css">/,
    '<link rel="stylesheet" href="$2assets/css/blog.min.css">'
  );
  html = html.replace(
    /<link rel="stylesheet" href="((?:\.\.\/)*)css\/tokens\.css">\n<link rel="stylesheet" href="\1css\/style\.css">/,
    '<link rel="stylesheet" href="$1css/site.min.css">'
  );
  return html;
}

function replaceLd(html, predicate, block) {
  const blocks = parseLdBlocks(html);
  const hit = blocks.find((b) => b.data && predicate(b.data));
  if (hit) return html.replace(hit.raw, block);
  return html.replace('</head>', block + '\n</head>');
}

const ORG_REF = { '@type': 'EducationalOrganization', '@id': ORIGIN + '/#organization', name: 'Data Center Training', url: ORIGIN + '/' };
const PROVIDER = { '@type': 'Organization', '@id': 'https://hazwoper-osha.com/#organization', name: 'HAZWOPER OSHA Training, LLC', url: 'https://hazwoper-osha.com/', sameAs: 'https://hazwoper-osha.com/' };

function courseLd(c) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': c.url + '#course',
    name: c.title,
    description: c.description,
    url: c.url,
    courseCode: 'DCT-' + c.catalog_number,
    inLanguage: 'en',
    isAccessibleForFree: false,
    timeRequired: c.duration_iso8601,
    teaches: c.learning_outcomes,
    coursePrerequisites: c.prerequisites,
    audience: { '@type': 'EducationalAudience', audienceType: c.audience },
    about: c.standards.length ? c.standards : undefined,
    educationalCredentialAwarded: { '@type': 'EducationalOccupationalCredential', name: 'Certificate of completion', credentialCategory: 'Certificate of completion' },
    provider: PROVIDER,
    publisher: ORG_REF,
    image: ORIGIN + '/images/og-image.jpg',
    offers: [{
      '@type': 'Offer',
      category: 'Paid',
      price: c.price_usd.toFixed(2),
      priceCurrency: 'USD',
      availability: c.availability === 'preorder' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
      url: c.url
    }],
    hasCourseInstance: [{ '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: c.duration_iso8601, inLanguage: 'en' }],
    syllabusSections: c.modules.map((m) => ({ '@type': 'Syllabus', name: m.title, description: m.summary }))
  };
}

function processPages(d) {
  const files = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'uploads') continue;
      const rel = dir ? dir + '/' + e.name : e.name;
      if (e.isDirectory()) walk(rel);
      else if (e.name.endsWith('.html')) files.push(rel);
    }
  })('');

  const byId = Object.fromEntries(d.courses.map((c) => [c.id, c]));
  for (const rel of files) {
    let html = read(rel);
    html = processHead(rel, html);

    const cm = rel.match(/^courses\/([a-z0-9-]+)\.html$/);
    if (cm && byId[cm[1]]) {
      html = replaceLd(html, (x) => x['@type'] === 'Course', jsonLd(courseLd(byId[cm[1]])));
    }
    if (rel === 'courses.html') {
      html = replaceLd(html, (x) => x['@type'] === 'ItemList', jsonLd({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Data Center Training Course Catalog',
        numberOfItems: d.courses.length,
        itemListElement: d.courses.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Course',
            '@id': c.url + '#course',
            url: c.url,
            name: c.title,
            description: c.summary,
            provider: PROVIDER,
            offers: [{ '@type': 'Offer', category: 'Paid', price: c.price_usd.toFixed(2), priceCurrency: 'USD' }],
            hasCourseInstance: [{ '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: c.duration_iso8601 }]
          }
        }))
      }));
    }
    if (rel === 'bundles.html') {
      html = replaceLd(html, (x) => x['@type'] === 'ItemList', jsonLd({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Data Center Training Course Bundles',
        numberOfItems: d.bundles.length,
        itemListElement: d.bundles.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            '@id': ORIGIN + '/bundles.html#' + b.id,
            name: b.name,
            description: b.audience + ' Includes ' + b.course_count + ' online courses (' + b.total_hours + ' hours).',
            sku: 'DCT-' + b.catalog_number,
            image: ORIGIN + '/images/og-image.jpg',
            url: ORIGIN + '/bundles.html',
            brand: { '@type': 'Brand', name: 'Data Center Training' },
            category: 'Online professional training',
            offers: {
              '@type': 'Offer',
              price: b.price_usd.toFixed(2),
              priceCurrency: 'USD',
              availability: b.availability === 'preorder' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
              url: ORIGIN + '/bundles.html',
              seller: PROVIDER
            }
          }
        }))
      }));
    }
    if (rel === 'index.html') {
      html = html.replace('"@type": "EducationalOrganization",\n  "name": "Data Center Training",', '"@type": "EducationalOrganization",\n  "@id": "' + ORIGIN + '/#organization",\n  "name": "Data Center Training",');
      html = html.replace('"@type": "WebSite",\n  "name": "Data Center Training",', '"@type": "WebSite",\n  "@id": "' + ORIGIN + '/#website",\n  "name": "Data Center Training",');
      if (!html.includes('"potentialAction"')) {
        html = html.replace('"inLanguage": "en-US",\n  "publisher": {\n    "@type": "EducationalOrganization",\n    "name": "Data Center Training",',
          '"inLanguage": "en-US",\n  "potentialAction": {\n    "@type": "SearchAction",\n    "target": {"@type": "EntryPoint", "urlTemplate": "' + ORIGIN + '/courses.html?q={search_term_string}"},\n    "query-input": "required name=search_term_string"\n  },\n  "publisher": {\n    "@type": "EducationalOrganization",\n    "@id": "' + ORIGIN + '/#organization",\n    "name": "Data Center Training",');
      }
    }
    write(rel, html);
  }
}

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>~])\s*/g, '$1')
    .replace(/([{;]\s*[-a-z]+)\s*:\s*/g, '$1:')
    .replace(/;}/g, '}')
    .trim() + '\n';
}

function buildCss() {
  const banner = '/* Generated by scripts/build-site.js from css/tokens.css + css/style.css - edit those, then rebuild. */\n';
  const base = read('css/tokens.css') + '\n' + read('css/style.css');
  write('css/site.min.css', banner + minifyCss(base));
  write('blog/assets/css/blog.min.css', banner.replace('css/style.css', 'css/style.css + blog/assets/css/blog.css') + minifyCss(base + '\n' + read('blog/assets/css/blog.css')));
}

// ---------------------------------------------------------------------------

function main() {
  const d = buildData();
  const out = buildOutputs(d);
  processPages(d);
  buildCss();
  if (process.argv.includes('--print-examples')) console.log(JSON.stringify(out.fullExamples, null, 2));
  if (CHECK) {
    if (changed.length) {
      console.error('Out of date (run node scripts/build-site.js):\n  ' + changed.join('\n  '));
      process.exit(1);
    }
    console.log('All generated files are up to date.');
  } else {
    console.log(changed.length ? 'Updated ' + changed.length + ' file(s):\n  ' + changed.join('\n  ') : 'Nothing to update.');
  }
}

if (require.main === module) main();

module.exports = { buildData, toolDefs, minifyCss };
