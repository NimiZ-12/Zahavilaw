import "server-only";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
  preferredTime?: string;
  locale: string;
  source: string;
}

/* ----------------------------------------------------------------------------
   Email notification for new leads, sent through the Resend HTTP API
   (https://resend.com). Required environment variables (see .env.example):
     RESEND_API_KEY      – API key from resend.com
     LEAD_EMAIL_FROM     – verified sender, e.g. "Website <leads@zahavilaw.com>"
   Optional:
     LEAD_EMAIL_TO       – comma-separated recipients (defaults below)
---------------------------------------------------------------------------- */

const DEFAULT_RECIPIENTS = [
  "office@zahavilaw.com",
  "ron@zahavilaw.com",
];

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function leadHtml(lead: Lead): string {
  const rows: [string, string][] = [
    ["שם", lead.name],
    ["טלפון", lead.phone],
    ["אימייל", lead.email],
    ["נושא", lead.subject || "-"],
    ["הודעה", lead.message || "-"],
    ["מועד מועדף לשיחה", lead.preferredTime || "-"],
    ["שפת הפנייה", lead.locale === "he" ? "עברית" : "English"],
  ];
  const tr = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:700;color:#1a2336;white-space:nowrap;vertical-align:top">${label}</td>` +
        `<td style="padding:8px 12px;color:#333">${escapeHtml(value).replaceAll("\n", "<br/>")}</td></tr>`,
    )
    .join("");
  return (
    `<div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;max-width:560px">` +
    `<h2 style="color:#1a2336;border-bottom:2px solid #b08433;padding-bottom:8px">פנייה חדשה מאתר המשרד</h2>` +
    `<table style="border-collapse:collapse;width:100%">${tr}</table>` +
    `<p style="color:#888;font-size:12px;margin-top:16px">נשלח אוטומטית מטופס יצירת הקשר ב-zahavilaw.com</p>` +
    `</div>`
  );
}

export interface EmailResult {
  ok: boolean;
  /** True when env vars are missing — the lead was accepted but not emailed. */
  skipped?: boolean;
  error?: string;
}

export async function sendLeadEmail(lead: Lead): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_EMAIL_FROM;

  if (!apiKey || !from) {
    // In development, skip quietly so local work needs no mail credentials.
    // In production this must fail: silently accepting a lead the firm never
    // receives, while telling the visitor it was sent, is the worst outcome
    // for both. Failing makes the visitor call instead and surfaces the
    // misconfiguration on the first submission rather than months later.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[email] RESEND_API_KEY / LEAD_EMAIL_FROM not set in production - lead NOT delivered",
      );
      return { ok: false, error: "email_not_configured" };
    }
    console.info(
      "[email] Skipping lead email - RESEND_API_KEY / LEAD_EMAIL_FROM not set (development)",
    );
    return { ok: true, skipped: true };
  }

  const to = (process.env.LEAD_EMAIL_TO || DEFAULT_RECIPIENTS.join(","))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email,
        subject: `פנייה חדשה מהאתר - ${lead.name}`,
        html: leadHtml(lead),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[email] Lead email failed:", response.status, text);
      return { ok: false, error: `Resend responded with ${response.status}` };
    }
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[email] Lead email threw:", message);
    return { ok: false, error: message };
  }
}
