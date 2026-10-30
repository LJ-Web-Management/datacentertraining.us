import test from 'node:test';
import assert from 'node:assert/strict';
import { preferred, parseAccept } from '../src/negotiate.js';

const PAGE = ['text/html', 'text/markdown'];

test('explicit text/markdown gets Markdown', () => {
  assert.equal(preferred('text/markdown', PAGE), 'text/markdown');
  assert.equal(preferred('text/x-markdown', PAGE), 'text/markdown');
  assert.equal(preferred('text/markdown, text/html;q=0.9', PAGE), 'text/markdown');
  assert.equal(preferred('text/markdown, text/plain;q=0.5, */*;q=0.1', PAGE), 'text/markdown');
});

test('browsers and wildcards get HTML', () => {
  assert.equal(preferred('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', PAGE), 'text/html');
  assert.equal(preferred('*/*', PAGE), 'text/html');
  assert.equal(preferred('text/*', PAGE), 'text/html');
  assert.equal(preferred('', PAGE), 'text/html');
  assert.equal(preferred(null, PAGE), 'text/html');
  assert.equal(preferred('text/html', PAGE), 'text/html');
});

test('q-values and order break ties', () => {
  assert.equal(preferred('text/html;q=0.5, text/markdown', PAGE), 'text/markdown');
  assert.equal(preferred('text/markdown;q=0.5, text/html', PAGE), 'text/html');
  assert.equal(preferred('text/markdown, text/html', PAGE), 'text/markdown');
  assert.equal(preferred('text/html, text/markdown', PAGE), 'text/html');
  // An explicitly named type beats one matched only by a wildcard at equal q.
  assert.equal(preferred('*/*, text/markdown', PAGE), 'text/markdown');
});

test('q=0 refuses a type; nothing acceptable returns null', () => {
  assert.equal(preferred('text/html;q=0, */*', PAGE), 'text/markdown');
  assert.equal(preferred('image/png', PAGE), null);
});

test('JSON preference for errors', () => {
  const ERR = ['text/html', 'text/markdown', 'application/json'];
  assert.equal(preferred('application/json', ERR), 'application/json');
  assert.equal(preferred('application/problem+json, application/json;q=0.9', ['application/json']), 'application/json');
  assert.equal(preferred('*/*', ['application/json', 'text/html']), 'application/json');
});

test('parseAccept tolerates junk', () => {
  assert.deepEqual(parseAccept('text/markdown;q=abc').map((r) => r.q), [0]);
  assert.deepEqual(parseAccept('text/markdown;q=2').map((r) => r.q), [1]);
  assert.equal(parseAccept('garbage, text/html').length, 1);
});
