// node --test scripts/html-to-markdown.test.js
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { pageToMarkdown } = require('./html-to-markdown.js');

const URL_ = 'https://datacentertraining.us/learn/page.html';
const md = (main, head = '') => pageToMarkdown('<!DOCTYPE html><html><head>' + head + '</head><body><header>Menu</header><main id="main">' + main + '</main><footer>Footer</footer></body></html>', URL_);

test('only <main> is converted; no main returns null', () => {
  const out = md('<h1>Title</h1><p>Body</p>');
  assert.equal(out, '# Title\n\nBody\n');
  assert.equal(pageToMarkdown('<html><body><p>x</p></body></html>', URL_), null);
});

test('headings, emphasis, entities, and relative links', () => {
  const out = md('<h2>Power &amp; Cooling</h2><p>Use <strong>NFPA&nbsp;70E</strong> and <em>verify</em> &mdash; see <a href="../courses.html">the catalog</a> or <a href="mailto:info@hazwoper-osha.com">email</a>.</p>');
  assert.equal(out, '## Power & Cooling\n\nUse **NFPA 70E** and *verify* — see [the catalog](https://datacentertraining.us/courses.html) or [email](mailto:info@hazwoper-osha.com).\n');
});

test('nested lists and ordered lists', () => {
  const out = md('<ul><li>One</li><li>Two<ul><li>Two A</li></ul></li></ul><ol start="3"><li>Three</li><li>Four</li></ol>');
  assert.equal(out, '- One\n- Two\n\n  - Two A\n\n3. Three\n4. Four\n');
});

test('tables with captions become GFM tables, pipes escaped', () => {
  const out = md('<table class="data-table"><caption>Topologies</caption><thead><tr><th>Type</th><th>Note</th></tr></thead><tbody><tr><td>Online</td><td>A | B</td></tr></tbody></table>');
  assert.equal(out, '**Topologies**\n\n| Type | Note |\n| --- | --- |\n| Online | A \\| B |\n');
});

test('scripts, SVG icons, form controls, breadcrumbs, and aria-hidden content are dropped', () => {
  const out = md('<nav class="breadcrumb"><a href="/">Home</a></nav><h1>T</h1><script>var x = "<p>no</p>";</script><p><svg><path d="M0"/></svg>Text<span aria-hidden="true">hidden</span></p><button type="button">Click</button><input type="text">');
  assert.equal(out, '# T\n\nText\n');
});

test('card links wrapping a heading link the heading; rows of links become lists', () => {
  const out = md('<a class="card" href="/courses.html"><h3>Course Catalog</h3><p>All courses.</p></a><div><a href="a.html">A</a> <a href="b.html">B</a></div>');
  assert.equal(out, '### [Course Catalog](https://datacentertraining.us/courses.html)\n\nAll courses.\n\n- [A](https://datacentertraining.us/learn/a.html)\n- [B](https://datacentertraining.us/learn/b.html)\n');
});

test('FAQ accordion questions and quiz options are kept', () => {
  const faq = md('<div class="faq-item"><button class="faq-q">Do certificates expire?<svg></svg></button><div class="faq-a"><p>No.</p></div></div>');
  assert.equal(faq, '**Do certificates expire?**\n\nNo.\n');
  const quiz = md('<ol><li><fieldset><legend>Question 1</legend><label><input type="radio"><span>Yes</span></label><label><input type="radio"><span>No</span></label></fieldset></li></ol>');
  assert.equal(quiz, '1. Question 1\n\n   - Yes\n   - No\n');
});

test('side-by-side labels get a space; definition lists and details render', () => {
  assert.equal(md('<p><span>Design</span><span>8 hrs</span></p>'), 'Design 8 hrs\n');
  assert.equal(md('<dl><dt>PUE</dt><dd>Power usage effectiveness.</dd></dl>'), '**PUE**\n\nPower usage effectiveness.\n');
  assert.equal(md('<details><summary>Show answer</summary><p>C</p></details>'), '**Show answer**\n\nC\n');
});
