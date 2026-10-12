/* ----------------------------------------------------------------------------
   Article article body: /he/articles/<slug>.
   ---------------------------------------------------------------------------
   Server component built from a client-approved Article module, reusing the
   landing pages' shared CTA/FAQ primitives so the section matches the rest
   of the site. Layout, top to bottom, per the content brief: byline, the
   highlighted answer paragraph (the first thing Google reads), the Q-shaped
   sections, three steps, FAQ, sources, related links - with the three lead
   paths in a sticky ask box and repeated after the FAQ.
---------------------------------------------------------------------------- */

import Link from "next/link";
import {
  Eyebrow,
  FaqItem,
  FormCta,
  PhoneLine,
  WhatsappCta,
} from "@/components/lp/shared";
import { ArrowIcon } from "@/components/Icons";
import type { Article } from "@/i18n/articles";
import { articlesHub } from "@/i18n/articles/hub";

function formatHebrewDate(iso: string): string {
  return new Intl.DateTimeFormat("he-IL", { dateStyle: "long" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

function AskBox({ article, phone }: { article: Article; phone: string }) {
  const { ask } = articlesHub;
  const message = articlesHub.whatsappTemplate.replace("{name}", article.shortName);
  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <h2 className="text-xl">{ask.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{ask.body}</p>
      <div className="mt-6 flex flex-col gap-3">
        <WhatsappCta message={message} label={ask.cta} block />
        <FormCta
          href={`/he/contact?src=article-${article.slug}`}
          label={ask.formLabel}
        />
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <PhoneLine label={ask.phoneLabel} phone={phone} />
      </div>
    </div>
  );
}

export default function ArticleView({
  article,
  phone,
}: {
  article: Article;
  phone: string;
}) {
  return (
    <>
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            {/* Byline: author links to their profile page, the date is the
                visible twin of the Article schema's dateModified. */}
            <p className="text-sm text-muted">
              {articlesHub.bylinePrefix}
              <Link
                href={`/he/team/${article.author}`}
                className="font-semibold text-navy underline underline-offset-2 hover:text-gold-600"
              >
                {articlesHub.authors[article.author]}
              </Link>
              {" · "}
              {articlesHub.bylineUpdated}
              <time dateTime={article.updated}>
                {formatHebrewDate(article.updated)}
              </time>
            </p>

            {/* The direct answer, visually prominent, no heading above it. */}
            <div className="mt-6 rounded-xl border border-gold/30 bg-gold-soft p-6">
              <p className="text-base font-semibold leading-relaxed text-navy">
                {article.answer}
              </p>
            </div>

            {article.sections.map((s) => (
              <div key={s.q} className="mt-12">
                <h2 className="text-2xl">{s.q}</h2>
                <p className="mt-4 text-base font-semibold leading-relaxed text-navy">
                  {s.answer}
                </p>
                {s.body.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="mt-4 text-base leading-relaxed text-muted"
                  >
                    {para}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-6 space-y-4">
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
              <Eyebrow>{articlesHub.actionsEyebrow}</Eyebrow>
              <h2 className="mt-3 text-2xl">{articlesHub.actionsTitle}</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {article.actions.map((action, i) => (
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

            <div className="mt-14">
              <Eyebrow>{articlesHub.faqEyebrow}</Eyebrow>
              <h2 className="mt-3 text-2xl">{articlesHub.faqTitle}</h2>
              <div className="mt-8">
                {article.faq.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h2 className="text-2xl">{articlesHub.sourcesTitle}</h2>
              <ul className="mt-6 space-y-2">
                {article.sources.map((src) => (
                  <li key={src.label} className="text-sm leading-relaxed text-muted">
                    {src.href ? (
                      <a
                        href={src.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-gold-600"
                      >
                        {src.label}
                      </a>
                    ) : (
                      src.label
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 rounded-xl border border-gold/30 bg-gold-soft p-6">
              <p className="font-semibold text-navy">{articlesHub.relatedTitle}</p>
              <ul className="mt-2 space-y-1.5">
                {article.related.map((link) => (
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
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <AskBox article={article} phone={phone} />
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-x py-10">
          <p className="text-xs leading-relaxed text-muted">
            {articlesHub.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
