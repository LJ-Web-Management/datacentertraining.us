// HTTP content negotiation (RFC 9110 section 12.5.1) for the handful of media
// types the edge can produce: HTML (the origin page), Markdown (the page's
// .html.md copy), and JSON (problem details).

const ALIASES = { 'text/markdown': ['text/markdown', 'text/x-markdown'] };

export function parseAccept(header) {
  if (!header || !header.trim()) return [{ type: '*', subtype: '*', q: 1, order: 0 }];
  return header.split(',').map((part, order) => {
    const [range, ...params] = part.trim().split(';');
    const [type = '', subtype = ''] = range.trim().toLowerCase().split('/');
    let q = 1;
    for (const p of params) {
      const [k, v] = p.trim().split('=');
      if (k && k.toLowerCase() === 'q') {
        const n = Number(v);
        q = Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0;
      }
    }
    return { type, subtype, q, order };
  }).filter((r) => r.type && r.subtype);
}

// How much the client wants one media type: the q of the most specific range
// that matches it, plus how specific that match was and where it appeared.
function score(ranges, mediaType) {
  const names = ALIASES[mediaType] || [mediaType];
  let best = null;
  for (const name of names) {
    const [type, subtype] = name.split('/');
    for (const r of ranges) {
      let specificity = 0;
      if (r.type === type && r.subtype === subtype) specificity = 3;
      else if (r.type === type && r.subtype === '*') specificity = 2;
      else if (r.type === '*' && r.subtype === '*') specificity = 1;
      if (!specificity) continue;
      if (!best || specificity > best.specificity || (specificity === best.specificity && r.order < best.order)) {
        best = { q: r.q, specificity, order: r.order };
      }
    }
  }
  return best || { q: 0, specificity: 0, order: Infinity };
}

// Picks the best of `offered` (listed in server preference order) for an
// Accept header. Higher q wins; on a tie, a type the client named explicitly
// beats one matched by a wildcard, then the one the client listed first, then
// server order. Returns null when the client accepts none of them.
export function preferred(acceptHeader, offered) {
  const ranges = parseAccept(acceptHeader);
  let winner = null;
  offered.forEach((mediaType, serverOrder) => {
    const s = Object.assign({ mediaType, serverOrder }, score(ranges, mediaType));
    if (s.q <= 0) return;
    if (!winner ||
      s.q > winner.q ||
      (s.q === winner.q && s.specificity > winner.specificity) ||
      (s.q === winner.q && s.specificity === winner.specificity && s.order < winner.order)) {
      winner = s;
    }
  });
  return winner ? winner.mediaType : null;
}
