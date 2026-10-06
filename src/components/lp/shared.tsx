"use client";

/* ----------------------------------------------------------------------------
   Shared building blocks for campaign landing pages (src/app/[locale]/lp/*).
   ---------------------------------------------------------------------------
   Extracted from ProtectedPeriodLanding so every landing page renders the
   exact same CTAs and section furniture. The WhatsApp CTA's pre-filled opener
   is the one lead signal that always arrives: GA4 and Google Ads only load
   after cookie consent, so the message text - not analytics - is what tells
   the firm which page produced the lead.
---------------------------------------------------------------------------- */

import Link from "next/link";
import { WhatsappIcon } from "@/components/Icons";
import { WHATSAPP_NUMBER_E164 } from "@/lib/contact";

/** Disclosure chevron for the FAQ accordions. */
export function ChevronIcon(props: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;
}

/** Gold CTA, matching the site's primary button. `whitespace-nowrap` is load
 *  bearing: the label must never wrap, however narrow the column gets. */
export function WhatsappCta({
  message,
  label,
  block = false,
}: {
  message: string;
  label: string;
  block?: boolean;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => window.gtag?.("event", "contact_lead", { method: "whatsapp" })}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gold px-6 py-3 text-sm font-medium text-white shadow-sm shadow-gold/20 transition-colors hover:bg-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        block ? "flex w-full" : ""
      }`}
    >
      <WhatsappIcon className="h-4 w-4" />
      {label}
    </a>
  );
}

export function PhoneLine({ label, phone }: { label: string; phone: string }) {
  return (
    <p className="text-sm text-muted">
      {label}{" "}
      <a
        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
        onClick={() => window.gtag?.("event", "contact_lead", { method: "phone" })}
        className="font-semibold text-navy hover:text-gold-600"
      >
        {/* dir="ltr" keeps the two digit groups in order inside RTL text. */}
        <bdi dir="ltr" className="whitespace-nowrap">
          {phone}
        </bdi>
      </a>
    </p>
  );
}

/** Navy secondary CTA linking to the contact form. The `src` query value is
 *  carried into the form as a hidden field and shows up in the lead email,
 *  so the firm can tell which landing page produced a form lead. */
export function FormCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      {label}
    </Link>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-gold-600">
      <span aria-hidden className="h-px w-6 bg-gold/50" />
      {children}
    </p>
  );
}

/** One FAQ accordion row - native <details>, so it works without JavaScript
 *  and every answer stays in the DOM for the FAQPage structured data. */
export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-border first:border-t">
      <summary className="flex cursor-pointer list-none items-start gap-3 py-4 text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">
        <ChevronIcon
          aria-hidden
          className="mt-1 h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180"
        />
        <span>{q}</span>
      </summary>
      <p className="pb-5 ps-7 text-sm leading-relaxed text-muted">{a}</p>
    </details>
  );
}
