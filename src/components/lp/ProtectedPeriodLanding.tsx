"use client";

/* ----------------------------------------------------------------------------
   Campaign landing page body: /he/lp/protected-period
   ---------------------------------------------------------------------------
   The page has two audiences - pregnancy and reserve duty - and shows one at a
   time so a visitor reads only what applies to them. Both tracks are in the
   DOM at all times (hidden with a class, not unmounted) so search engines and
   the FAQ structured data see the whole page.

   The YouTube video links straight to a track with #herayon or #miluim; the
   effect below picks the matching track up from the fragment on load.

   Every WhatsApp CTA carries a pre-filled opener naming the track, so the firm
   can tell which half of the video produced the lead without any analytics.
   That matters here: GA4 and Google Ads only load after cookie consent, so the
   message text is the one signal that always arrives.
---------------------------------------------------------------------------- */

import { useCallback, useEffect, useRef, useState } from "react";
import { WhatsappIcon } from "@/components/Icons";
import { WHATSAPP_NUMBER_E164 } from "@/lib/contact";
import type { LpProtectedPeriod, LpTrack } from "@/i18n/lp-protected-period";

type TrackId = LpTrack["id"];

/** Disclosure chevron for the FAQ. Local to this page, so it stays out of the
 *  shared icon set until something else needs it. */
function ChevronIcon(props: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;
}

/** Gold CTA, matching the site's primary button. `whitespace-nowrap` is load
 *  bearing: the label must never wrap, however narrow the column gets. */
function WhatsappCta({
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

function PhoneLine({ label, phone }: { label: string; phone: string }) {
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

function AskBox({
  ask,
  phone,
  message,
}: {
  ask: LpProtectedPeriod["ask"];
  phone: string;
  message: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <h2 className="text-xl">{ask.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{ask.body}</p>
      <div className="mt-6">
        <WhatsappCta message={message} label={ask.cta} block />
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <PhoneLine label={ask.phoneLabel} phone={phone} />
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-gold-600">
      <span aria-hidden className="h-px w-6 bg-gold/50" />
      {children}
    </p>
  );
}

/** The whole body of one track: the law, the timeline and the first steps. */
function TrackPanel({ track }: { track: LpTrack }) {
  return (
    <>
      <Eyebrow>{track.lawEyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl">{track.lawTitle}</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">{track.lawIntro}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {track.cards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="text-base font-semibold text-navy">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
            {card.extra && (
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.extra}</p>
            )}
            {card.cite && (
              <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted">
                {card.cite}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-navy p-8">
        <p className="text-xl font-bold leading-snug text-gold-400">
          {track.callout.text}
        </p>
        <p className="mt-3 text-xs text-white/60">{track.callout.source}</p>
      </div>

      <div className="mt-5 rounded-xl border border-gold/30 bg-gold-soft p-6">
        <p className="text-sm leading-relaxed text-navy">{track.aside}</p>
      </div>

      <div className="mt-14">
        <Eyebrow>{track.timelineEyebrow}</Eyebrow>
        <h2 className="mt-3 text-2xl">{track.timelineTitle}</h2>
        {/* Logical properties, so the axis runs down the start edge - the right
            in Hebrew, the left if this is ever reused in English. */}
        <ol className="mt-8 space-y-8 border-s border-border ps-8">
          {track.steps.map((step) => (
            <li key={step.when} className="relative">
              <span
                aria-hidden
                className={`absolute -start-[2.19rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-background ${
                  step.peak ? "bg-gold" : "bg-border"
                }`}
              />
              <p className="text-xs font-semibold tracking-wide text-gold-600">
                {step.when}
              </p>
              <p className="mt-1 font-semibold text-navy">{step.what}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14">
        <Eyebrow>{track.actionsEyebrow}</Eyebrow>
        <h2 className="mt-3 text-2xl">{track.actionsTitle}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {track.actions.map((action, i) => (
            <article
              key={action.title}
              className="rounded-xl border border-border p-6"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/15 text-sm font-bold text-gold-600">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy">
                {action.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{action.body}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ProtectedPeriodLanding({
  content,
  phone,
}: {
  content: LpProtectedPeriod;
  phone: string;
}) {
  const [pregnancy, reserve] = content.tracks;
  const [active, setActive] = useState<TrackId>(pregnancy.id);
  const tabRefs = useRef<Partial<Record<TrackId, HTMLButtonElement | null>>>({});

  const current = active === pregnancy.id ? pregnancy : reserve;

  // The video links to #herayon or #miluim. Read it once on mount, and again
  // if the visitor follows another fragment link to the page.
  useEffect(() => {
    function fromHash() {
      const hash = window.location.hash.replace("#", "");
      const match = content.tracks.find((t) => t.anchor === hash);
      if (match) setActive(match.id);
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [content.tracks]);

  const select = useCallback(
    (id: TrackId) => {
      setActive(id);
      const track = content.tracks.find((t) => t.id === id);
      if (!track) return;
      // replaceState, not a hash assignment: changing the hash directly would
      // scroll the page to the top of the chooser on every tab click.
      try {
        window.history.replaceState(null, "", `#${track.anchor}`);
      } catch {
        /* Safari private mode rate-limits replaceState; the tab still works. */
      }
    },
    [content.tracks],
  );

  function onTabKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = active === pregnancy.id ? reserve.id : pregnancy.id;
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Track chooser                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-border bg-surface">
        <div className="container-x py-10">
          <p className="text-sm font-medium text-navy">{content.chooserLabel}</p>
          <div
            role="tablist"
            aria-label={content.chooserLabel}
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:max-w-3xl"
          >
            {content.tracks.map((track) => {
              const selected = track.id === active;
              return (
                <button
                  key={track.id}
                  ref={(el) => {
                    tabRefs.current[track.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`lp-tab-${track.anchor}`}
                  aria-controls={`lp-panel-${track.anchor}`}
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(track.id)}
                  onKeyDown={onTabKeyDown}
                  className={`rounded-xl border p-5 text-start transition-colors ${
                    selected
                      ? "border-gold bg-gold-soft"
                      : "border-border bg-background hover:border-gold/40"
                  }`}
                >
                  <span className="block font-semibold text-navy">
                    {track.tabTitle}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {track.tabNote}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The law, the timeline, the first steps, plus the sticky ask box   */}
      {/* ---------------------------------------------------------------- */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {content.tracks.map((track) => (
              <div
                key={track.id}
                id={`lp-panel-${track.anchor}`}
                role="tabpanel"
                aria-labelledby={`lp-tab-${track.anchor}`}
                hidden={track.id !== active}
              >
                <TrackPanel track={track} />
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <AskBox
                ask={content.ask}
                phone={phone}
                message={current.whatsappMessage}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* What a private lawyer actually adds, and what is free elsewhere   */}
      {/* ---------------------------------------------------------------- */}
      <section className="section bg-surface">
        <div className="container-x">
          <Eyebrow>{content.transparency.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl">{content.transparency.title}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            {content.transparency.lead}
          </p>

          {content.tracks.map((track) => (
            <div
              key={track.id}
              hidden={track.id !== active}
              className="mt-8 rounded-xl border border-gold/30 bg-gold-soft p-6"
            >
              <p className="font-semibold text-navy">{track.aid.lead}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy/80">
                {track.aid.body}
              </p>
            </div>
          ))}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {content.transparency.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-xl border border-border bg-background p-6"
              >
                <h3 className="text-base font-semibold text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ - both tracks stay in the DOM so the FAQPage schema matches   */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" aria-labelledby="lp-faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>{content.faqSection.eyebrow}</Eyebrow>
            <h2 id="lp-faq-title" className="mt-3 text-3xl">
              {content.faqSection.title}
            </h2>
            {content.tracks.map((track) => (
              <div key={track.id} hidden={track.id !== active} className="mt-8">
                {track.faq.map((item) => (
                  <details
                    key={item.q}
                    className="group border-b border-border first:border-t"
                  >
                    <summary className="flex cursor-pointer list-none items-start gap-3 py-4 text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">
                      <ChevronIcon
                        aria-hidden
                        className="mt-1 h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180"
                      />
                      <span>{item.q}</span>
                    </summary>
                    <p className="pb-5 ps-7 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-surface p-8">
              <h2 className="text-xl">{content.closing.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {content.closing.body}
              </p>
              <div className="mt-6">
                <WhatsappCta
                  message={current.whatsappMessage}
                  label={content.ask.cta}
                  block
                />
              </div>
              <div className="mt-6 border-t border-border pt-5">
                <PhoneLine label={content.ask.phoneLabel} phone={phone} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-x py-10">
          <p className="text-xs leading-relaxed text-muted">{content.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
