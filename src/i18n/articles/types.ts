/* ----------------------------------------------------------------------------
   The content contract for a labor-law article (/he/articles/<slug>).
   ---------------------------------------------------------------------------
   One file per article under src/i18n/articles/, written by the marketing agent
   to this exact shape and approved by the client word for word BEFORE it is
   added here. The developer agent never writes or rewords legal copy.

   Articles are Hebrew-only (client-approved deviation from the bilingual rule,
   same as the /lp/ landing pages): the route builds for `he` only, carries a
   self-canonical and no hreflang alternates.

   The field-by-field submission format for the marketing agent is documented
   in docs/seo/articles-content-format.md - keep the two in sync.
---------------------------------------------------------------------------- */

export type Article = {
  /** URL segment under /he/articles/. Permanent: never change after publish. */
  slug: string;
  /** Short display name for breadcrumbs and the WhatsApp opener. */
  shortName: string;
  /** Title up to 60 characters, description up to 155. */
  meta: { title: string; description: string };
  h1: string;
  /** The direct answer shown at the top of the page, 40-60 words. The first
   *  text Google reads - it is what gets a page cited in AI overviews. */
  answer: string;
  audience: "employee" | "employer" | "both";
  /** Team-member slug; becomes the Article's author and the byline link. */
  author: "anat-zahavi" | "ron-zahavi";
  /** ISO date (YYYY-MM-DD). */
  published: string;
  /** ISO date (YYYY-MM-DD); feeds the sitemap and the visible byline. */
  updated: string;
  sections: {
    /** Subheading phrased as a question. */
    q: string;
    /** One or two sentences of direct answer, shown before the body. */
    answer: string;
    /** Explanation paragraphs. */
    body: string[];
    bullets?: string[];
  }[];
  /** "What to do now" - exactly 3 steps. */
  actions: { title: string; body: string }[];
  /** 4-6 questions; rendered as the accordion and the FAQPage schema. */
  faq: { q: string; a: string }[];
  /** Links to the relevant landing pages and the labor-law page. */
  related: { label: string; href: string }[];
  /** Statute sections and case law this article relies on. */
  sources: { label: string; href?: string }[];
};
