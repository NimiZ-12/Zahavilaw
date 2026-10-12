/* ----------------------------------------------------------------------------
   Campaign landing page body for the single-track pages:
   /he/lp/severance-pay, /he/lp/hearing, /he/lp/unpaid-wages.
   ---------------------------------------------------------------------------
   One component renders all of them from an LpPage content module, so the
   pages cannot drift apart visually. Deliberately a server component: a
   linear story needs no tabs and no client state, so only the shared CTA
   components' JS is shipped.

   Three lead paths per page, by design: WhatsApp with a pre-filled opener
   naming the page (the one signal that arrives regardless of cookie
   consent), the office phone, and the contact form carrying ?src=<page> so
   the lead email names the page too.
---------------------------------------------------------------------------- */

import {
  Eyebrow,
  FaqItem,
  FormCta,
  PhoneLine,
  WhatsappCta,
} from "@/components/lp/shared";
import type { LpPage } from "@/i18n/lp-page";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

function AskBox({ content, phone }: { content: LpPage; phone: string }) {
  const { ask } = content;
  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <h2 className="text-xl">{ask.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{ask.body}</p>
      <div className="mt-6 flex flex-col gap-3">
        <WhatsappCta message={content.whatsappMessage} label={ask.cta} block />
        <FormCta href={ask.formHref} label={ask.formLabel} />
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <PhoneLine label={ask.phoneLabel} phone={phone} />
      </div>
    </div>
  );
}

export default function CampaignLanding({
  content,
  phone,
}: {
  content: LpPage;
  phone: string;
}) {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Content sections and first steps + sticky ask box                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {content.sections.map((s, i) => (
              <div key={s.title} className={i === 0 ? undefined : "mt-14"}>
                {s.eyebrow && <Eyebrow>{s.eyebrow}</Eyebrow>}
                <h2
                  className={`${s.eyebrow ? "mt-3 " : ""}${
                    i === 0 ? "text-3xl" : "text-2xl"
                  }`}
                >
                  {s.title}
                </h2>
                {s.body && (
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {s.body}
                  </p>
                )}
                {s.bullets && (
                  <ul className="mt-8 space-y-4">
                    {s.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                        />
                        <span className="text-base leading-relaxed text-muted">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="mt-14">
              <Eyebrow>{content.actionsSection.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-2xl">{content.actionsSection.title}</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {content.actions.map((action, i) => (
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
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {action.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Cross-links to the sibling landing pages. */}
            <div className="mt-14 rounded-xl border border-gold/30 bg-gold-soft p-6">
              <p className="font-semibold text-navy">{content.related.text}</p>
              <ul className="mt-2 space-y-1.5">
                {content.related.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline underline-offset-2 hover:text-gold-600"
                    >
                      {link.label}
                      <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <AskBox content={content} phone={phone} />
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ + closing box with all three lead paths                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="section bg-surface" aria-labelledby="lp-faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>{content.faqSection.eyebrow}</Eyebrow>
            <h2 id="lp-faq-title" className="mt-3 text-3xl">
              {content.faqSection.title}
            </h2>
            <div className="mt-8">
              {content.faq.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-background p-8">
              <p className="text-sm leading-relaxed text-muted">
                {content.closing.lead}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <WhatsappCta
                  message={content.whatsappMessage}
                  label={content.ask.cta}
                  block
                />
                <FormCta
                  href={content.ask.formHref}
                  label={content.ask.formLabel}
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
          <p className="text-xs leading-relaxed text-muted">
            {content.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
