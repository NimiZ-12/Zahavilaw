/* ----------------------------------------------------------------------------
   Shared shape for simple (single-track) campaign landing pages:
   /he/lp/severance-pay, /he/lp/hearing, /he/lp/unpaid-wages.
   ---------------------------------------------------------------------------
   Why these live outside the he/en dictionaries: the dictionaries' shared
   `Dictionary` type forces every string to exist in both locales, and these
   are Hebrew-only campaign destinations - an English twin would be dead
   weight and a broken hreflang signal. Each page keeps its copy in a typed
   module of this shape and is rendered by CampaignLanding.

   The protected-period page keeps its own two-track shape in
   lp-protected-period.ts; everything simpler uses this one.
---------------------------------------------------------------------------- */

export type LpSection = {
  /** Optional gold eyebrow above the heading (usually on the first section). */
  eyebrow?: string;
  title: string;
  /** Paragraph body. */
  body?: string;
  /** Bullet list, rendered with the gold-dot markers. */
  bullets?: string[];
};

export type LpPage = {
  meta: { title: string; description: string };
  /** ISO date (YYYY-MM-DD) of the last content change; feeds the sitemap's
   *  lastModified, so update it whenever this file's copy changes. */
  updated: string;
  breadcrumb: { area: string; areaPath: string; current: string };
  hero: { title: string; lead: string };
  sections: LpSection[];
  actionsSection: { eyebrow: string; title: string };
  actions: { title: string; body: string }[];
  /** Cross-links to related landing pages. */
  related: { text: string; links: { label: string; href: string }[] };
  faqSection: { eyebrow: string; title: string };
  faq: { q: string; a: string }[];
  ask: {
    title: string;
    body: string;
    cta: string;
    phoneLabel: string;
    formLabel: string;
    formHref: string;
  };
  closing: { lead: string };
  whatsappMessage: string;
  disclaimer: string;
};
