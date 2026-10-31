// Fixed-window rate limiting per client IP for /api/, /mcp, and the tool
// endpoints, reported with the IETF RateLimit headers. Counts live in the
// isolate (so each edge location counts on its own); when the RATE_LIMITER
// binding (Workers Rate Limiting API, see wrangler.toml) is configured, it is
// also consulted so the limit holds across isolates.
import contract from '../contract.json' with { type: 'json' };

const { policy, requests, window_seconds: windowSeconds } = contract.rate_limit;
const windows = new Map();

export function clientKey(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'anonymous';
}

export async function takeToken(request, env, now = Date.now()) {
  const key = clientKey(request);
  const windowMs = windowSeconds * 1000;
  const start = Math.floor(now / windowMs) * windowMs;
  let w = windows.get(key);
  if (!w || w.start !== start) {
    w = { start, count: 0 };
    windows.set(key, w);
  }
  w.count++;
  let limited = w.count > requests;
  if (!limited && env && env.RATE_LIMITER && typeof env.RATE_LIMITER.limit === 'function') {
    try {
      const { success } = await env.RATE_LIMITER.limit({ key });
      if (!success) limited = true;
    } catch (e) { /* the binding is an extra safeguard; the local count still applies */ }
  }
  if (windows.size > 50000) for (const [k, v] of windows) if (v.start !== start) windows.delete(k);

  const reset = Math.max(1, Math.ceil((start + windowMs - now) / 1000));
  const remaining = limited ? 0 : Math.max(0, requests - w.count);
  const headers = {
    'RateLimit-Policy': '"' + policy + '";q=' + requests + ';w=' + windowSeconds,
    RateLimit: '"' + policy + '";r=' + remaining + ';t=' + reset,
    'RateLimit-Limit': String(requests),
    'RateLimit-Remaining': String(remaining),
    'RateLimit-Reset': String(reset)
  };
  if (limited) headers['Retry-After'] = String(reset);
  return { limited, remaining, reset, headers };
}

// For tests.
export function resetRateLimits() {
  windows.clear();
}
