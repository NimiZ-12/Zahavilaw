import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail, type Lead } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 16 * 1024; // 16 KB is ample for a contact form.

function asString(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * CSRF defense: a genuine browser submission carries an Origin (or at least a
 * Referer) whose host matches the site. Reject cross-site posts. We compare
 * against the request's own host so it works on any domain it's deployed to.
 */
function sameOrigin(request: NextRequest): boolean {
  const host = request.headers.get("host");
  if (!host) return false;
  const source = request.headers.get("origin") || request.headers.get("referer");
  if (!source) return false; // Browsers always send one on a cross-origin POST.
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // 1. Reject cross-site submissions.
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  // 2. Throttle per IP (2 requests / minute).
  const ip = clientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, 2, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  // 3. Reject oversized payloads before parsing.
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // 4. Honeypot — bots fill hidden fields; humans never see them. Pretend success.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true });
  }

  // 5. CAPTCHA — verify the Cloudflare Turnstile token before doing anything else.
  // When Turnstile isn't configured yet, skip verification rather than reject
  // every submission; the honeypot, CSRF check and rate limit still apply.
  if (process.env.TURNSTILE_SECRET_KEY) {
    const captchaOk = await verifyTurnstile(asString(body.captchaToken, 4000), ip);
    if (!captchaOk) {
      return NextResponse.json({ ok: false, error: "captcha_failed" }, { status: 403 });
    }
  } else {
    console.warn("contact: TURNSTILE_SECRET_KEY not set — captcha verification skipped");
  }

  const lead: Lead = {
    name: asString(body.name, 120),
    email: asString(body.email, 160),
    phone: asString(body.phone, 40),
    subject: asString(body.subject, 160),
    message: asString(body.message, 4000),
    preferredTime: asString(body.preferredTime, 160) || undefined,
    locale: asString(body.locale, 5) || "he",
    source: "website-contact-form",
  };

  // 6. Validate.
  const errors: Record<string, string> = {};
  if (!lead.name) errors.name = "required";
  if (!lead.phone) errors.phone = "required";
  if (!lead.email) errors.email = "required";
  else if (!EMAIL_RE.test(lead.email)) errors.email = "invalid";
  if (body.consent !== true) errors.consent = "required";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // 7. Send email notification.
  const email = await sendLeadEmail(lead);

  if (!email.ok) {
    console.error("[contact] Lead accepted but email delivery failed:", lead.email);
    // Named for what actually happens. "sync_failed" was a leftover from an
    // earlier CRM integration that this route no longer performs.
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
