import { NextRequest, NextResponse } from "next/server";
import { createMondayLead, type Lead } from "@/lib/monday";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; humans never see them.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true });
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

  const errors: Record<string, string> = {};
  if (!lead.name) errors.name = "required";
  if (!lead.phone) errors.phone = "required";
  if (!lead.email) errors.email = "required";
  else if (!EMAIL_RE.test(lead.email)) errors.email = "invalid";
  if (body.consent !== true) errors.consent = "required";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const result = await createMondayLead(lead);

  if (!result.ok) {
    // The lead is valid; only the CRM sync failed. Surface a 502 so the client
    // can show a graceful error, but log enough to recover the lead manually.
    console.error("[contact] Lead accepted but CRM sync failed:", lead.email);
    return NextResponse.json(
      { ok: false, error: "sync_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, itemId: result.itemId ?? null });
}
