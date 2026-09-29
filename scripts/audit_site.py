#!/usr/bin/env python3
"""Offline SEO / AI-readiness audit for datacentertraining.us.

Mirrors the checks Ahrefs Site Audit and the AI-readiness diagnostics run, so
regressions are caught before deploy. Exit code is non-zero on any error.

    python3 scripts/audit_site.py
"""
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGIN = "https://datacentertraining.us"
SKIP_DIRS = {".git", "node_modules", "scripts", "uploads"}
NOINDEX_OK = {"checkout.html"}

errors, warnings = [], []


def err(page, msg):
    errors.append(f"{page}: {msg}")


def warn(page, msg):
    warnings.append(f"{page}: {msg}")


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = None
        self._in_title = False
        self.meta = {}
        self.links = []  # (tag, attr value)
        self.canonical = None
        self.h1 = 0
        self.headings = []
        self.imgs = []
        self.jsonld = []
        self._in_jsonld = False
        self._buf = []
        self.lang = None
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "title":
            self._in_title = True
            self.title = ""
        elif tag == "meta":
            key = a.get("name") or a.get("property")
            if key:
                self.meta[key] = a.get("content", "")
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        elif tag == "a" and a.get("href") is not None:
            self.links.append(a["href"])
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._in_jsonld = True
            self._buf = []
        if re.fullmatch(r"h[1-6]", tag):
            self.headings.append(int(tag[1]))
            if tag == "h1":
                self.h1 += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag == "script" and self._in_jsonld:
            self._in_jsonld = False
            self.jsonld.append("".join(self._buf))

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_jsonld:
            self._buf.append(data)


def html_files():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for f in filenames:
            if f.endswith(".html"):
                yield os.path.relpath(os.path.join(dirpath, f), ROOT).replace(os.sep, "/")


def url_for(rel):
    if rel == "index.html":
        return ORIGIN + "/"
    if rel.endswith("/index.html"):
        return ORIGIN + "/" + rel[: -len("index.html")]
    return ORIGIN + "/" + rel


def path_for(url):
    p = urlparse(url).path
    if p.endswith("/"):
        p += "index.html"
    return p.lstrip("/")


def main():
    pages = {}
    for rel in sorted(html_files()):
        with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
            p = Page()
            p.feed(fh.read())
            pages[rel] = p

    inlinks = {rel: 0 for rel in pages}
    titles, descs = {}, {}
    for rel, p in pages.items():
        noindex = "noindex" in p.meta.get("robots", "")
        url = url_for(rel)
        t = (p.title or "").strip()
        d = p.meta.get("description", "").strip()
        if not p.lang:
            err(rel, "missing <html lang>")
        if not t:
            err(rel, "missing <title>")
        elif len(t) > 60:
            err(rel, f"title too long ({len(t)} > 60): {t}")
        elif len(t) < 25:
            warn(rel, f"title short ({len(t)}): {t}")
        if not d:
            err(rel, "missing meta description")
        elif not noindex and not (110 <= len(d) <= 160):
            err(rel, f"meta description length {len(d)} outside 110-160")
        if not noindex:
            titles.setdefault(t, []).append(rel)
            descs.setdefault(d, []).append(rel)
        if p.canonical != url:
            err(rel, f"canonical {p.canonical!r} != {url}")
        if p.h1 != 1:
            err(rel, f"{p.h1} <h1> elements")
        prev = 0
        for h in p.headings:
            if h > prev + 1 and prev:
                warn(rel, f"heading level skips h{prev} -> h{h}")
                break
            prev = h
        if not noindex:
            for k in ("og:title", "og:description", "og:url", "og:image", "og:type",
                      "twitter:card"):
                if not p.meta.get(k):
                    err(rel, f"missing {k}")
            if p.meta.get("og:url") and p.meta["og:url"] != url:
                err(rel, f"og:url {p.meta['og:url']} != canonical")
        for img in p.imgs:
            if "alt" not in img:
                err(rel, f"img missing alt: {img.get('src')}")
            if not (img.get("width") and img.get("height")):
                err(rel, f"img missing width/height: {img.get('src')}")
        for raw in p.jsonld:
            try:
                data = json.loads(raw)
            except ValueError as e:
                err(rel, f"invalid JSON-LD: {e}")
                continue
            blob = json.dumps(data)
            for u in re.findall(r"https://datacentertraining\.us[^\"#?]*", blob):
                if not os.path.exists(os.path.join(ROOT, path_for(u))):
                    err(rel, f"JSON-LD references missing URL {u}")
        for href in p.links:
            if href.startswith(("mailto:", "tel:", "javascript:")):
                continue
            if href.startswith("http://"):
                err(rel, f"insecure link {href}")
            absu = urljoin(url, href)
            pu = urlparse(absu)
            if pu.netloc != "datacentertraining.us":
                continue
            target = path_for(absu)
            if pu.path.endswith("/index.html"):
                err(rel, f"links to non-canonical index.html URL: {href}")
            if not os.path.exists(os.path.join(ROOT, target)):
                err(rel, f"broken internal link {href}")
                continue
            if pu.fragment and target.endswith(".html") and target in pages:
                if pu.fragment not in pages[target].ids and pu.fragment != "top":
                    warn(rel, f"link to missing anchor {href}")
            if target in inlinks and target != rel:
                inlinks[target] += 1

    for t, rels in titles.items():
        if len(rels) > 1:
            err(",".join(rels), f"duplicate title {t!r}")
    for d, rels in descs.items():
        if len(rels) > 1:
            err(",".join(rels), "duplicate meta description")

    sm = ET.parse(os.path.join(ROOT, "sitemap.xml")).getroot()
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sm_urls = [u.find("s:loc", ns).text.strip() for u in sm.findall("s:url", ns)]
    for u in sm.findall("s:url", ns):
        if u.find("s:lastmod", ns) is None:
            err("sitemap.xml", f"no lastmod for {u.find('s:loc', ns).text}")
    indexable = {url_for(r) for r, p in pages.items()
                 if "noindex" not in p.meta.get("robots", "") and r not in NOINDEX_OK}
    for u in sm_urls:
        if not os.path.exists(os.path.join(ROOT, path_for(u))):
            err("sitemap.xml", f"URL does not exist: {u}")
        elif u not in indexable:
            err("sitemap.xml", f"non-indexable URL listed: {u}")
    for u in sorted(indexable - set(sm_urls)):
        err("sitemap.xml", f"indexable page missing: {u}")
    for rel, n in inlinks.items():
        if n == 0 and rel != "index.html":
            err(rel, "orphan page (no internal links)")

    for w in warnings:
        print("WARN ", w)
    for e in errors:
        print("ERROR", e)
    print(f"{len(pages)} pages, {len(errors)} errors, {len(warnings)} warnings")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
