// Tests for the course catalog search box (js/courses.js) against the real
// rows in courses.html.  Run: node --test scripts/catalog-search.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const search = require('../js/courses.js');

const html = fs.readFileSync(path.join(__dirname, '..', 'courses.html'), 'utf8');
const unescape = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const rows = [...html.matchAll(/<div class="course-row"([^>]*)>/g)].map((m) => {
  const attr = (n) => { const a = m[1].match(new RegExp(' data-' + n + '="([^"]*)"')); return a ? unescape(a[1]) : ''; };
  return { name: attr('name'), keywords: attr('keywords'), haystack: search.normalize([attr('name'), attr('category'), attr('standard'), attr('tier'), attr('keywords')].join(' ')) };
});
const find = (q) => rows.filter((r) => search.matches(r.haystack, q)).map((r) => r.name);

test('every catalog row carries generated search keywords', () => {
  assert.strictEqual(rows.length, 43);
  for (const r of rows) assert.ok(r.keywords.length > 40, r.name + ' has no data-keywords');
});

test('empty and filler-only queries match everything', () => {
  assert.strictEqual(find('').length, rows.length);
  assert.strictEqual(find('   ').length, rows.length);
  assert.strictEqual(find('training courses').length, rows.length);
});

test('title, standard, and multi-word queries still work', () => {
  assert.ok(find('ups').includes('UPS Systems Fundamentals'));
  assert.ok(find('ups load test').includes('UPS Operations & Load Testing'));
  assert.ok(find('nfpa 70e').length >= 1);
  assert.ok(find('TIA-942').includes('Data Center Design Fundamentals'));
});

test('words match at word starts, not inside other words', () => {
  // "ups" must not match "groups" or "startups".
  for (const name of find('ups')) assert.match(name + ' ' + rows.find((r) => r.name === name).haystack, /(^|[^a-z])ups/i);
});

test('plurals, hyphens, case, and synonyms find courses that substring matching missed', () => {
  assert.ok(find('batteries').some((n) => /Batter/.test(n)), 'batteries');
  assert.ok(find('arc-flash').some((n) => /Arc Flash/.test(n)), 'arc-flash');
  assert.ok(find('LOTO').length >= 1, 'loto');
  assert.ok(find('lockout').length >= 1, 'lockout');
  assert.ok(find('chiller').length >= 1, 'chiller');
  assert.ok(find('technician').length >= 5, 'technician');
  assert.ok(find('beginner').length >= 5, 'beginner');
  assert.ok(find('power usage').length >= 1, 'power usage');
  assert.ok(find('Li-ion').some((n) => /Lithium/.test(n)), 'li-ion');
});

test('nonsense queries match nothing', () => {
  assert.deepStrictEqual(find('zzqx'), []);
  assert.deepStrictEqual(find('ups zzqx'), []);
});
