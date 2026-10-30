#!/usr/bin/env node
// datacentertraining: command-line client for the Data Center Training catalog
// API (https://datacentertraining.us/developers/). Each command calls one of the
// read-only REST tool endpoints under /api/v1/tools/; nothing here can enroll,
// pay, or change anything. Node.js 18+, no dependencies, one file.
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const VERSION = '1.0.0';
const DEFAULT_BASE = 'https://datacentertraining.us';

const HELP = `datacentertraining ${VERSION}: search the Data Center Training course catalog

Usage: datacentertraining <command> [arguments] [options]

Commands
  courses [--query <words>] [--track <name>] [--role <id>] [--type comprehensive|modular]
          [--standard <name>] [--bundle <id>] [--max-price <usd>] [--max-hours <n>]
          [--sort title|price_asc|price_desc|duration_asc|duration_desc] [--limit <n>]
                                  Search and filter courses
  course <course-id | course-url> Full details for one course
  bundles [bundle-id ...]         Compare bundles (all if none given)
  recommend <role words> [--context <text>] [--budget <usd>]
                                  Recommend a track, bundle, and courses for a job role
  credentials [topic]             What the certificate is and is not (topic: all, certificate,
                                  accreditation, standards_alignment, ceu_pdh, expiration,
                                  verification, employer_responsibility)
  faq <question> [--course <id>]  Answer a question from the published FAQ
  resources [--topic <words>] [--audience <role>] [--type site_page|blog_post|standard_reference] [--limit <n>]
                                  Guides, blog posts, and standards references
  page <path-or-url>              Any page on the site as Markdown
  call <tool> [json]              Call any tool with a raw JSON input
  tools                           List the tools

Options
  --json          Print the raw JSON response
  --base <url>    API host (default ${DEFAULT_BASE}, or $DATACENTERTRAINING_BASE_URL)
  -h, --help      Show this help
  -v, --version   Show the version

Examples
  datacentertraining courses --query "NFPA 70E" --max-price 200
  datacentertraining recommend electrician --budget 500
  datacentertraining faq "Do certificates expire?"
  datacentertraining page /learn/data-center-power.html`;

const TOOLS = ['list_courses', 'get_course', 'compare_bundles', 'recommend_courses', 'get_credential_info', 'answer_faq', 'list_resources'];

export function parseArgs(argv) {
  const positional = [];
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') { positional.push(...argv.slice(i + 1)); break; }
    if (a === '-h') options.help = true;
    else if (a === '-v') options.version = true;
    else if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      const key = (eq === -1 ? a.slice(2) : a.slice(2, eq));
      if (eq !== -1) options[key] = a.slice(eq + 1);
      else if (['json', 'help', 'version'].includes(key)) options[key] = true;
      else if (i + 1 < argv.length) options[key] = argv[++i];
      else throw new UsageError('--' + key + ' needs a value');
    } else positional.push(a);
  }
  return { positional, options };
}

export class UsageError extends Error {}

function num(options, key) {
  if (options[key] === undefined) return undefined;
  const n = Number(options[key]);
  if (!Number.isFinite(n)) throw new UsageError('--' + key + ' must be a number');
  return n;
}

function clean(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ''));
}

// Turns a command line into { tool, input } (or { page } / { list }).
export function toRequest(positional, options) {
  const [command, ...rest] = positional;
  const text = rest.join(' ').trim();
  switch (command) {
    case 'courses':
      return { tool: 'list_courses', input: clean({ query: options.query || text || undefined, track: options.track, role: options.role, course_type: options.type, standard: options.standard, bundle_id: options.bundle, max_price_usd: num(options, 'max-price'), max_duration_hours: num(options, 'max-hours'), sort: options.sort, limit: num(options, 'limit') }) };
    case 'course':
      if (!text) throw new UsageError('course needs a course id or URL, e.g. datacentertraining course ups-systems-fundamentals');
      return { tool: 'get_course', input: /^https?:/.test(text) ? { url: text } : { course_id: text } };
    case 'bundles':
      return { tool: 'compare_bundles', input: rest.length ? { bundle_ids: rest } : {} };
    case 'recommend':
      if (!text) throw new UsageError('recommend needs a job role, e.g. datacentertraining recommend electrician');
      return { tool: 'recommend_courses', input: clean({ role: text, work_context: options.context, budget_usd: num(options, 'budget') }) };
    case 'credentials':
      return { tool: 'get_credential_info', input: text ? { topic: text } : {} };
    case 'faq':
      if (!text) throw new UsageError('faq needs a question, e.g. datacentertraining faq "Do certificates expire?"');
      return { tool: 'answer_faq', input: clean({ question: text, course_id: options.course }) };
    case 'resources':
      return { tool: 'list_resources', input: clean({ topic: options.topic || text || undefined, audience: options.audience, type: options.type, limit: num(options, 'limit') }) };
    case 'call': {
      const [tool, ...json] = rest;
      if (!tool) throw new UsageError('call needs a tool name: ' + TOOLS.join(', '));
      let input = {};
      if (json.length) {
        try { input = JSON.parse(json.join(' ')); } catch (e) { throw new UsageError('call input is not valid JSON: ' + e.message); }
      }
      return { tool, input };
    }
    case 'page':
      if (!text) throw new UsageError('page needs a path or URL, e.g. datacentertraining page /courses.html');
      return { page: text };
    case 'tools':
      return { list: true };
    default:
      throw new UsageError(command ? 'Unknown command "' + command + '". Run datacentertraining help.' : HELP);
  }
}

export async function callTool(base, tool, input, fetchImpl = fetch) {
  const res = await fetchImpl(base + '/api/v1/tools/' + encodeURIComponent(tool), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'datacentertraining-cli/' + VERSION },
    body: JSON.stringify(input)
  });
  const type = res.headers.get('Content-Type') || '';
  if (/json/.test(type)) {
    const body = await res.json();
    if (!res.ok) throw new ApiError(body, res);
    return body;
  }
  throw new ApiError({ title: 'Unexpected response', detail: base + ' answered ' + res.status + ' ' + (type.split(';')[0] || 'without a content type') + ' instead of JSON.' }, res);
}

export class ApiError extends Error {
  constructor(problem, res) {
    super(problem.detail || problem.title || 'Request failed');
    this.problem = problem;
    this.status = res && res.status;
    this.retryAfter = res && res.headers.get('Retry-After');
  }
}

// A page as Markdown: content negotiation first, then the .md copy.
export async function fetchPage(base, target, fetchImpl = fetch) {
  const url = new URL(target, base + '/');
  const res = await fetchImpl(url, { headers: { Accept: 'text/markdown', 'User-Agent': 'datacentertraining-cli/' + VERSION } });
  if (res.ok && /markdown/.test(res.headers.get('Content-Type') || '')) return res.text();
  const p = url.pathname;
  const md = p.endsWith('/') ? p + 'index.html.md' : p.endsWith('.html') ? p + '.md' : p + '.html.md';
  const alt = await fetchImpl(new URL(md, url), { headers: { 'User-Agent': 'datacentertraining-cli/' + VERSION } });
  if (alt.ok) return alt.text();
  throw new ApiError({ title: 'Not found', detail: 'No page at ' + url.href + '.' }, res);
}

const money = (n) => '$' + Number(n).toFixed(2);
const hrs = (h) => h + (h === 1 ? ' hr' : ' hrs');

function courseLine(c, i) {
  return (c.rank || i + 1) + '. ' + c.title + ' (' + c.id + ')\n   ' + hrs(c.duration_hours) + ' · ' + money(c.price_usd) + ' · ' + c.track + (c.standards && c.standards.length ? ' · ' + c.standards.join(', ') : '') + '\n   ' + c.url;
}

export function format(tool, out) {
  const lines = [];
  switch (tool) {
    case 'list_courses':
      lines.push(out.returned + ' of ' + out.total_matching + ' matching courses');
      out.courses.forEach((c, i) => lines.push(courseLine(c, i)));
      break;
    case 'get_course': {
      if (!out.found) { lines.push(out.message || 'Course not found.'); break; }
      const c = out.course;
      lines.push(c.title, hrs(c.duration_hours) + ' · ' + money(c.price_usd) + ' per seat · ' + c.course_type_label + ' · ' + c.track, c.url, '', c.description);
      if (c.learning_outcomes.length) lines.push('', 'You will learn:', ...c.learning_outcomes.map((o) => '  - ' + o));
      if (c.modules.length) lines.push('', 'Modules:', ...c.modules.map((m, i) => '  ' + (i + 1) + '. ' + m.title));
      if (c.bundles.length) lines.push('', 'In bundles: ' + c.bundles.map((b) => b.name + ' (' + money(b.price_usd) + ')').join('; '));
      lines.push('', 'Certificate: ' + c.certificate.type + ' from ' + c.certificate.issuer + '. Enroll: ' + (c.enroll_url || c.url));
      break;
    }
    case 'compare_bundles':
      for (const b of out.bundles) {
        lines.push(b.name + ' (' + b.id + ')', '   ' + money(b.price_usd) + ' vs ' + money(b.list_price_usd) + ' separately, save ' + money(b.savings_usd) + ' (' + b.savings_percent + '%) · ' + b.course_count + ' courses · ' + hrs(b.total_hours), '   ' + b.url);
      }
      break;
    case 'recommend_courses':
      if (!out.matched) {
        lines.push(out.message || 'No matching role.');
        if (out.available_roles) lines.push('Roles: ' + out.available_roles.map((r) => r.id).join(', '));
        break;
      }
      lines.push('Track: ' + out.track, out.reason);
      if (out.recommended_bundle) lines.push('Bundle: ' + out.recommended_bundle.name + ' · ' + money(out.recommended_bundle.price_usd) + ' · ' + out.recommended_bundle.url);
      lines.push('', 'Courses:');
      out.courses.forEach((c, i) => lines.push(courseLine(c, i)));
      if (out.caveats) lines.push('', ...out.caveats.map((x) => 'Note: ' + x));
      break;
    case 'get_credential_info':
      for (const [k, v] of Object.entries(out)) if (v && typeof v === 'object' && !Array.isArray(v) && v.summary) lines.push(k + ': ' + v.summary);
      if (out.do_not_claim) lines.push('', 'Do not claim:', ...out.do_not_claim.map((x) => '  - ' + x));
      if (out.source_url) lines.push('', 'Source: ' + out.source_url);
      break;
    case 'answer_faq':
      if (!out.answered || !out.matches.length) lines.push('No published answer matched. ' + (out.support ? 'Contact ' + [out.support.email, out.support.phone].filter(Boolean).join(' or ') + '.' : ''));
      for (const m of out.matches) lines.push('Q: ' + m.question, 'A: ' + m.answer, '   ' + m.source_url, '');
      break;
    case 'list_resources':
      lines.push(out.count + ' resources');
      for (const r of out.resources) lines.push('- ' + r.title + ' (' + r.type.replace('_', ' ') + ')\n  ' + r.url);
      break;
    default:
      return JSON.stringify(out, null, 2);
  }
  return lines.join('\n').trimEnd();
}

export async function main(argv, io = { out: (s) => process.stdout.write(s + '\n'), err: (s) => process.stderr.write(s + '\n') }, fetchImpl = fetch, environment = process.env) {
  let parsed;
  try {
    parsed = parseArgs(argv);
  } catch (e) {
    io.err(e.message);
    return 2;
  }
  const { positional, options } = parsed;
  if (options.version) { io.out(VERSION); return 0; }
  if (options.help || !positional.length || positional[0] === 'help') { io.out(HELP); return 0; }
  const base = String(options.base || environment.DATACENTERTRAINING_BASE_URL || DEFAULT_BASE).replace(/\/+$/, '');
  try {
    const req = toRequest(positional, options);
    if (req.list) { io.out(TOOLS.join('\n')); return 0; }
    if (req.page) { io.out((await fetchPage(base, req.page, fetchImpl)).trimEnd()); return 0; }
    const out = await callTool(base, req.tool, req.input, fetchImpl);
    io.out(options.json ? JSON.stringify(out, null, 2) : format(req.tool, out));
    return 0;
  } catch (e) {
    if (e instanceof UsageError) { io.err(e.message); return 2; }
    if (e instanceof ApiError) {
      const p = e.problem;
      io.err('Error' + (p.code ? ' (' + p.code + ')' : '') + ': ' + (p.detail || p.title));
      if (p.errors) for (const x of p.errors) io.err('  ' + x.path + ' ' + x.message);
      if (p.hint) io.err('Hint: ' + p.hint);
      if (e.retryAfter) io.err('Retry after ' + e.retryAfter + ' seconds.');
      return 1;
    }
    io.err('Error: ' + (e && e.message ? e.message : String(e)) + ' (could not reach ' + base + ')');
    return 1;
  }
}

// Run when executed directly (also via the npm bin symlink), not when imported.
const self = fileURLToPath(import.meta.url);
let invoked = '';
try { invoked = realpathSync(process.argv[1] || ''); } catch (e) { /* not a file */ }
if (invoked === self) main(process.argv.slice(2)).then((code) => { process.exitCode = code; });
