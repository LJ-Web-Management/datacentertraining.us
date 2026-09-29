#!/usr/bin/env node
// Validates the agent layer the way the WebMCP Manifest/Schema validators do:
// every tool schema compiles as JSON Schema Draft 7, every published example
// and a battery of edge-case calls match the declared input/output schemas,
// every JSON document and JSON-LD block parses, and internal URLs resolve.
//
//     cd scripts && npm install && node validate-agent-layer.js
'use strict';

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const tools = require('../js/webmcp.js');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://datacentertraining.us';
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const errors = [];
const fail = (msg) => errors.push(msg);

const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);

const manifest = readJson('.well-known/mcp.json');
for (const key of ['name', 'description', 'version', 'homepage', 'documentation', 'tools']) {
  if (!manifest[key]) fail('manifest missing ' + key);
}
const data = {};
for (const f of ['courses', 'bundles', 'roles', 'faq', 'credentials', 'resources']) data[f] = readJson('api/' + f + '.json');

// Edge cases beyond the published examples: empty input, no matches, bad ids.
const extraCalls = {
  list_courses: [{}, { query: 'zzzz-no-match' }, { language: 'es' }, { role: 'security', sort: 'price_desc' }, { standard: 'NFPA 70E', max_price_usd: 100 }, { bundle_id: 'bundle-design-planning', course_type: 'comprehensive' }],
  get_course: [{ url: ORIGIN + '/courses/ups-systems-fundamentals.html' }, { course_id: 'no-such-course' }],
  compare_bundles: [{}],
  recommend_courses: [{ role: 'electrician' }, { role: 'Facility manager', budget_usd: 50 }, { role: 'network technician', work_context: 'fiber and DCIM' }, { role: 'xy' }],
  get_credential_info: [{}, { topic: 'all' }, { topic: 'verification' }],
  answer_faq: [{ question: 'refund' }, { question: 'qwertyuiop asdfgh' }, { question: 'Why load-bank test a UPS?', course_id: 'ups-operations-load-testing' }],
  list_resources: [{}, { type: 'blog_post', limit: 3 }, { audience: 'hvac' }]
};

const names = new Set();
for (const t of manifest.tools) {
  names.add(t.name);
  if (!/^[a-z][a-z0-9_]{2,63}$/.test(t.name)) fail(t.name + ': tool name is not snake_case');
  if (!t.description || t.description.length < 80) fail(t.name + ': description too short for an agent');
  if (!t.annotations || t.annotations.readOnlyHint !== true || t.annotations.destructiveHint !== false) fail(t.name + ': must be annotated read-only / non-destructive');
  for (const which of ['inputSchema', 'outputSchema']) {
    const s = t[which];
    if (!s || s.$schema !== 'http://json-schema.org/draft-07/schema#') fail(t.name + ': ' + which + ' must declare Draft 7');
    if (s.type !== 'object' || s.additionalProperties !== false) fail(t.name + ': ' + which + ' must be a closed object');
  }
  let vin, vout;
  try {
    vin = ajv.compile(t.inputSchema);
    vout = ajv.compile(t.outputSchema);
  } catch (e) {
    fail(t.name + ': schema does not compile: ' + e.message);
    continue;
  }
  if (!tools.names.includes(t.name)) fail(t.name + ': no implementation in js/webmcp.js');
  if (!t.examples || !t.examples.length) fail(t.name + ': no examples');
  const inputs = (t.examples || []).map((e) => e.input).concat(extraCalls[t.name] || []);
  for (const input of inputs) {
    if (!vin(input)) {
      fail(t.name + ' input ' + JSON.stringify(input) + ': ' + ajv.errorsText(vin.errors));
      continue;
    }
    const out = tools.run(t.name, input, data);
    if (!vout(out)) fail(t.name + ' output for ' + JSON.stringify(input) + ': ' + ajv.errorsText(vout.errors));
  }
  // Invalid input must be rejected by the schema.
  if (vin({ unexpected_field: true })) fail(t.name + ': inputSchema accepts unknown fields');
}
for (const n of tools.names) if (!names.has(n)) fail('js/webmcp.js implements ' + n + ' but the manifest does not declare it');

// get_course must match every course; ids and URLs must resolve to files.
for (const c of data.courses.courses) {
  const out = tools.run('get_course', { course_id: c.id }, data);
  if (!out.found) fail('get_course cannot find ' + c.id);
  if (!fs.existsSync(path.join(ROOT, 'courses', c.id + '.html'))) fail('missing page for ' + c.id);
  if (!fs.existsSync(path.join(ROOT, 'api/courses', c.id + '.json'))) fail('missing api/courses/' + c.id + '.json');
}

// Every first-party URL referenced by the agent files must exist.
const texts = ['.well-known/mcp.json', 'openapi.json', 'llms.txt', 'llms-full.txt', 'api/index.json', 'api/resources.json', '.well-known/ai-plugin.json']
  .map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
const seen = new Set();
for (const m of texts.matchAll(/https:\/\/datacentertraining\.us(\/[^\s"')\]{}]*)?/g)) {
  let p = (m[1] || '/').split(/[?#]/)[0];
  if (seen.has(p) || /^\/api\/(courses\/)?$/.test(p)) continue; // directory prefixes of templated URLs
  seen.add(p);
  if (p.endsWith('/')) p += 'index.html';
  if (!fs.existsSync(path.join(ROOT, p))) fail('agent files link to missing ' + ORIGIN + p);
}

// OpenAPI component schemas must compile and describe the documents.
const openapi = readJson('openapi.json');
const oa = new Ajv({ strict: false, allErrors: true });
addFormats(oa);
for (const [name, schema] of Object.entries(openapi.components.schemas)) oa.addSchema(schema, '#/components/schemas/' + name);
const docChecks = { 'api/courses.json': 'CourseList', 'api/bundles.json': 'BundleList', 'api/roles.json': 'RoleList', 'api/faq.json': 'FaqList', 'api/resources.json': 'ResourceList', 'api/credentials.json': 'Credentials', 'api/index.json': 'ApiIndex' };
for (const [file, ref] of Object.entries(docChecks)) {
  const v = oa.getSchema('#/components/schemas/' + ref);
  if (!v(readJson(file))) fail(file + ' does not match OpenAPI ' + ref + ': ' + oa.errorsText(v.errors));
}

// JSON-LD must parse on every page.
(function walk(dir) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    if (e.name.startsWith('.') || ['node_modules', 'uploads', 'scripts'].includes(e.name)) continue;
    const rel = dir ? dir + '/' + e.name : e.name;
    if (e.isDirectory()) walk(rel);
    else if (e.name.endsWith('.html')) {
      const html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
      for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try { JSON.parse(m[1]); } catch (err) { fail(rel + ': invalid JSON-LD: ' + err.message); }
      }
    }
  }
})('');

if (errors.length) {
  console.error(errors.map((e) => 'ERROR ' + e).join('\n'));
  console.error(errors.length + ' problem(s)');
  process.exit(1);
}
console.log('Agent layer OK: ' + manifest.tools.length + ' tools, ' + data.courses.count + ' courses, schemas and examples valid.');
