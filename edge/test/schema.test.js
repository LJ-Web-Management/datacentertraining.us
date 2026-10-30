// The edge's small validator must agree with Ajv on every published example
// and on a battery of valid and invalid inputs for every tool.
import test from 'node:test';
import assert from 'node:assert/strict';
import { validate, coerceQuery } from '../src/schema.js';
import { readJson, loadAjv } from './helpers.js';

const manifest = readJson('.well-known/mcp.json');
const ajv = loadAjv();

const INVALID = {
  list_courses: [{ query: '' }, { track: 'Nope' }, { max_price_usd: -1 }, { limit: 0 }, { limit: 1.5 }, { sort: 'random' }, { extra: 1 }, { query: 5 }],
  get_course: [{}, { course_id: 'Bad Id!' }, { url: 'https://example.com/courses/x.html' }, { course_id: 5 }],
  compare_bundles: [{ bundle_ids: [] }, { bundle_ids: ['nope'] }, { bundle_ids: 'bundle-complete-catalog' }],
  recommend_courses: [{}, { role: '' }, { role: 'electrician', budget_usd: -5 }],
  get_credential_info: [{ topic: 'nope' }],
  answer_faq: [{}, { question: '' }],
  list_resources: [{ type: 'video' }, { limit: 0 }]
};
const VALID = {
  list_courses: [{}, { query: 'UPS', max_price_usd: 150, sort: 'price_asc', limit: 3 }],
  get_course: [{ course_id: 'ups-systems-fundamentals' }, { url: 'https://datacentertraining.us/courses/ups-systems-fundamentals.html' }],
  compare_bundles: [{}, { bundle_ids: ['bundle-complete-catalog'] }],
  recommend_courses: [{ role: 'electrician' }, { role: 'hvac tech', budget_usd: 300 }],
  get_credential_info: [{}],
  answer_faq: [{ question: 'Do certificates expire?' }],
  list_resources: [{}, { type: 'blog_post', limit: 3 }]
};

for (const tool of manifest.tools) {
  test(tool.name + ': validator agrees with Ajv', { skip: !ajv && 'ajv not installed (cd scripts && npm ci)' }, () => {
    const check = ajv.compile(tool.inputSchema);
    const inputs = tool.examples.map((e) => e.input).concat(VALID[tool.name] || [], INVALID[tool.name] || []);
    for (const input of inputs) {
      const ours = validate(tool.inputSchema, input).length === 0;
      assert.equal(ours, check(input), tool.name + ' ' + JSON.stringify(input) + ': ajv says ' + check(input));
    }
  });
  test(tool.name + ': known-invalid inputs are rejected with a field path', () => {
    for (const input of INVALID[tool.name] || []) {
      const errors = validate(tool.inputSchema, input);
      assert.ok(errors.length, JSON.stringify(input) + ' should be invalid');
      for (const e of errors) assert.match(e.path, /^\//);
    }
    for (const input of VALID[tool.name] || []) assert.deepEqual(validate(tool.inputSchema, input), [], JSON.stringify(input));
  });
}

test('coerceQuery converts query strings by schema type', () => {
  const schema = { properties: { q: { type: 'string' }, n: { type: 'number' }, i: { type: 'integer' }, b: { type: 'boolean' }, ids: { type: 'array', items: { type: 'string' } } } };
  const params = new URLSearchParams('q=ups&n=99.5&i=3&b=true&ids=a,b&ids=c&x=1');
  assert.deepEqual(coerceQuery(schema, params), { q: 'ups', n: 99.5, i: 3, b: true, ids: ['a', 'b', 'c'], x: '1' });
  // Non-numeric stays a string so validation reports it.
  assert.deepEqual(coerceQuery(schema, new URLSearchParams('n=cheap')), { n: 'cheap' });
});
