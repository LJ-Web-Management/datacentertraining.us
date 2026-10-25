#!/usr/bin/env node
// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) which pages
// changed, so they recrawl them right away instead of on their own schedule.
//
//   node scripts/indexnow.js <from-sha> <to-sha>   pages whose HTML changed in that range
//   node scripts/indexnow.js --all                 every URL in sitemap.xml
//   add --dry-run to print the list without sending it
//
// Only URLs listed in sitemap.xml are sent, so noindex pages (cart, checkout)
// and redirect stubs never go out. The key is public by design: IndexNow
// proves ownership by fetching https://datacentertraining.us/<KEY>.txt.
// .github/workflows/indexnow.yml runs this after each GitHub Pages deploy.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const HOST = 'datacentertraining.us';
const ORIGIN = 'https://' + HOST;
const KEY = '47dc0a274417ffac423a26dcc4089056';
const KEY_FILE = KEY + '.txt';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const ALL = args.includes('--all');
const [from, to] = args.filter((a) => !a.startsWith('--'));

function sitemapUrls() {
  const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

// https://datacentertraining.us/learn/ -> learn/index.html
function fileFor(url) {
  let rel = url.slice(ORIGIN.length).replace(/^\//, '');
  if (rel === '' || rel.endsWith('/')) rel += 'index.html';
  return rel;
}

function changedFiles(a, b) {
  return execFileSync('git', ['diff', '--name-only', a, b], { cwd: ROOT, encoding: 'utf8' })
    .split('\n').filter(Boolean);
}

async function main() {
  if (fs.readFileSync(path.join(ROOT, KEY_FILE), 'utf8').trim() !== KEY) {
    throw new Error(KEY_FILE + ' must contain exactly the key');
  }
  const urls = sitemapUrls();
  let list;
  if (ALL) {
    list = urls;
  } else {
    if (!from || !to) throw new Error('usage: indexnow.js <from-sha> <to-sha> | --all [--dry-run]');
    const changed = new Set(changedFiles(from, to));
    // The first deploy with the key file announces the whole site once.
    list = changed.has(KEY_FILE) ? urls : urls.filter((u) => changed.has(fileFor(u)));
  }
  console.log(list.length + ' URL(s)' + (list.length ? ':\n  ' + list.join('\n  ') : ''));
  if (!list.length || DRY) return;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: ORIGIN + '/' + KEY_FILE, urlList: list.slice(0, 10000) })
  });
  const body = await res.text();
  console.log('IndexNow responded ' + res.status + (body ? ': ' + body.slice(0, 300) : ''));
  // 200 = accepted, 202 = accepted while the key is still being verified.
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
