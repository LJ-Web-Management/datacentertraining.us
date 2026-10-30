// The CLI against the real edge Worker in front of the repository files (no
// network), plus the command-line parsing on its own.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { main, parseArgs, toRequest, UsageError } from '../datacentertraining.mjs';
import worker from '../../edge/src/worker.js';
import { createLocalOrigin } from '../../edge/local-origin.js';
import { resetRateLimits } from '../../edge/src/ratelimit.js';

const BASE = 'https://datacentertraining.us';
const env = { ORIGIN: createLocalOrigin() };
const viaEdge = (url, init = {}) => worker.fetch(new Request(url, Object.assign({}, init, { headers: Object.assign({ 'CF-Connecting-IP': '192.0.2.10' }, init.headers || {}) })), env);
// GitHub Pages alone: no negotiation, no tool endpoints.
const pagesOnly = (url, init = {}) => env.ORIGIN.fetch(new Request(url, init));

async function run(argv, fetchImpl = viaEdge) {
  const out = [];
  const err = [];
  const code = await main(argv, { out: (s) => out.push(s), err: (s) => err.push(s) }, fetchImpl, {});
  return { code, out: out.join('\n'), err: err.join('\n') };
}

test.beforeEach(() => resetRateLimits());

test('parseArgs handles flags, --key=value, and --', () => {
  assert.deepEqual(parseArgs(['courses', '--query', 'UPS', '--limit=3', '--json']), { positional: ['courses'], options: { query: 'UPS', limit: '3', json: true } });
  assert.deepEqual(parseArgs(['faq', '--', '--weird question']).positional, ['faq', '--weird question']);
  assert.throws(() => parseArgs(['courses', '--query']), UsageError);
});

test('every command maps to the right tool input', () => {
  const r = (argv) => { const p = parseArgs(argv); return toRequest(p.positional, p.options); };
  assert.deepEqual(r(['courses', '--query', 'NFPA 70E', '--max-price', '200', '--type', 'modular']), { tool: 'list_courses', input: { query: 'NFPA 70E', course_type: 'modular', max_price_usd: 200 } });
  assert.deepEqual(r(['course', 'ups-systems-fundamentals']), { tool: 'get_course', input: { course_id: 'ups-systems-fundamentals' } });
  assert.deepEqual(r(['course', BASE + '/courses/ups-systems-fundamentals.html']), { tool: 'get_course', input: { url: BASE + '/courses/ups-systems-fundamentals.html' } });
  assert.deepEqual(r(['bundles', 'bundle-complete-catalog']), { tool: 'compare_bundles', input: { bundle_ids: ['bundle-complete-catalog'] } });
  assert.deepEqual(r(['recommend', 'hvac', 'tech', '--budget', '300', '--context', 'chillers']), { tool: 'recommend_courses', input: { role: 'hvac tech', work_context: 'chillers', budget_usd: 300 } });
  assert.deepEqual(r(['credentials', 'ceu_pdh']), { tool: 'get_credential_info', input: { topic: 'ceu_pdh' } });
  assert.deepEqual(r(['faq', 'Do', 'certificates', 'expire?']), { tool: 'answer_faq', input: { question: 'Do certificates expire?' } });
  assert.deepEqual(r(['resources', '--type', 'blog_post', '--limit', '2']), { tool: 'list_resources', input: { type: 'blog_post', limit: 2 } });
  assert.deepEqual(r(['call', 'list_courses', '{"role":"hvac"}']), { tool: 'list_courses', input: { role: 'hvac' } });
  assert.throws(() => r(['courses', '--max-price', 'cheap']), UsageError);
  assert.throws(() => r(['nope']), UsageError);
});

test('courses: human output and --json', async () => {
  const human = await run(['courses', '--query', 'UPS', '--limit', '2']);
  assert.equal(human.code, 0, human.err);
  assert.match(human.out, /^2 of \d+ matching courses/);
  assert.match(human.out, /https:\/\/datacentertraining\.us\/courses\/[a-z0-9-]+\.html/);
  const raw = await run(['courses', '--query', 'UPS', '--limit', '2', '--json']);
  assert.equal(JSON.parse(raw.out).returned, 2);
});

test('course, bundles, recommend, credentials, faq, resources all succeed', async () => {
  for (const argv of [['course', 'ups-systems-fundamentals'], ['bundles'], ['recommend', 'electrician', '--budget', '500'], ['credentials'], ['faq', 'Do certificates expire?'], ['resources', '--limit', '3']]) {
    const r = await run(argv);
    assert.equal(r.code, 0, argv.join(' ') + ': ' + r.err);
    assert.ok(r.out.length > 20, argv.join(' '));
  }
});

test('API errors print the problem code, field errors, and hint', async () => {
  const r = await run(['courses', '--limit', '0']);
  assert.equal(r.code, 1);
  assert.match(r.err, /^Error \(invalid_input\)/);
  assert.match(r.err, /\/limit/);
  assert.match(r.err, /Hint: /);
  const unknown = await run(['call', 'enroll_me']);
  assert.equal(unknown.code, 1);
  assert.match(unknown.err, /unknown_tool/);
});

test('usage errors exit 2; help and version exit 0', async () => {
  assert.equal((await run(['frobnicate'])).code, 2);
  assert.equal((await run(['course'])).code, 2);
  assert.match((await run(['help'])).out, /^datacentertraining /);
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal((await run(['--version'])).out, pkg.version);
});

test('page: Markdown through negotiation, and through the .md copy on plain GitHub Pages', async () => {
  const edge = await run(['page', '/learn/']);
  assert.equal(edge.code, 0, edge.err);
  assert.match(edge.out, /^# /);
  const pages = await run(['page', '/learn/'], pagesOnly);
  assert.equal(pages.out, edge.out);
  const missing = await run(['page', '/nope.html'], pagesOnly);
  assert.equal(missing.code, 1);
});

test('without the edge Worker, tool commands fail with a clear message', async () => {
  const r = await run(['courses'], pagesOnly);
  assert.equal(r.code, 1);
  assert.match(r.err, /instead of JSON/);
});

test('runs as an executable', () => {
  const bin = fileURLToPath(new URL('../datacentertraining.mjs', import.meta.url));
  assert.match(execFileSync(process.execPath, [bin, '--help'], { encoding: 'utf8' }), /Usage: datacentertraining/);
});
