import "server-only";

/* ----------------------------------------------------------------------------
   Minimal in-memory fixed-window rate limiter.
   ---------------------------------------------------------------------------
   Used to throttle the public contact endpoint against spam and abuse. It is
   per-instance (state lives in memory), which is enough for a single-region
   deployment. For a multi-instance / serverless setup at scale, swap the store
   for a shared one (e.g. Upstash Redis) behind the same `rateLimit` signature.
---------------------------------------------------------------------------- */

interface Window {
  count: number;
  resetAt: number;
}

const store = new Map<string, Window>();

// Opportunistic cleanup so the map can't grow unbounded.
function sweep(now: number) {
  if (store.size < 5000) return;
  for (const [key, win] of store) {
    if (win.resetAt <= now) store.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfter: number; // seconds until the window resets
}

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }
  return { ok: true, remaining: limit - existing.count, retryAfter };
}

/** Best-effort client IP from common proxy headers.
 *
 * Prefer `x-real-ip`: the hosting platform (Vercel) overwrites it with the true
 * peer address, so a client can't forge it. The left-most `x-forwarded-for`
 * entry, by contrast, is client-supplied — a caller can rotate fake values
 * there to dodge per-IP throttling — so we only fall back to it. */
export function clientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
