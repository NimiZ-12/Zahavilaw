import "server-only";
import type { Locale } from "./config";

/* ----------------------------------------------------------------------------
   Shared shape for both language dictionaries. Keeping the type here means the
   `he` and `en` files are checked against each other at build time.
---------------------------------------------------------------------------- */

export interface Feature {
  title: string;
  body: string;
}

export interface PracticeArea {
  slug: string;
  title: string;
  summary: string;
  description: string;
  points: string[];
  faq?: { q: string; a: string }[];
}

export interface TeamMember {
  /** URL-safe identifier used for the member's individual profile page. */
  slug: string;
  name: string;
  role: string;
  /** Short summary shown on the team grid card. */
  bio: string;
  /** Fuller biography shown on the member's individual profile page, one entry per paragraph. */
  about: string[];
  /** Practice-area slugs this member specializes in, shown on their profile page. */
  practiceAreaSlugs: string[];

  /* --- Credentials. Feed the Person schema and the authority block on the
     About and profile pages. All optional: a member is rendered correctly
     with none of them set. --- */

  /** Year admitted to the Israel Bar, e.g. "1996". */
  barAdmission?: string;
  education?: { institution: string; degree: string; year?: string }[];
  /** Certifications and professional qualifications, one per entry. */
  credentials?: string[];
  /** Bar committees, professional associations. */
  memberships?: string[];
  /** Languages the member practises in. */
  languages?: string[];
}

/** A role the firm is hiring for. Drives the JobPosting schema. */
export interface JobOpening {
  title: string;
  /** Plain-language summary shown on the page and used as the schema description. */
  description: string;
  /** e.g. "משרה מלאה" / "Full-time". */
  employmentType?: string;
  requirements: string[];
  /** ISO date (YYYY-MM-DD) — required by Google for JobPosting. */
  datePosted: string;
  /** ISO date the listing expires. Google downranks postings without one. */
  validThrough?: string;
}

/** A single press article, media mention, or court decision. */
export interface PublicationItem {
  /** Headline / case name as it should appear. */
  title: string;
  /** Where it was published, e.g. "פסקדין", "נבו", a newspaper, etc. */
  source: string;
  /** Legal field label used to classify the item, e.g. "דיני עבודה". Optional. */
  field?: string;
  /** Free-text date label, e.g. "מרץ 2024". Optional. */
  date?: string;
  /** Short summary / excerpt. Optional. */
  excerpt?: string;
  /** External link to the full article / decision. Optional. */
  href?: string;
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalPage {
  title: string;
  metaDescription: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export interface Dictionary {
  brand: {
    name: string;
    short: string;
    tagline: string;
    /** Official profiles (LinkedIn, Google Business, Facebook). Emitted as
     *  `sameAs` so answer engines can corroborate the firm's identity. */
    sameAs?: string[];
  };
  meta: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
  };
  nav: {
    home: string;
    about: string;
    practiceAreas: string;
    team: string;
    publications: string;
    contact: string;
    cta: string;
    skipToContent: string;
    menu: string;
    faq: string;
    careers: string;
    /** Accessible label for the breadcrumb navigation landmark. */
    breadcrumb: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    stats: { value: string; label: string }[];
    clients: {
      title: string;
      /** Each client: display name plus an optional logo image path in /public. */
      items: { name: string; logo?: string }[];
    };
    intro: {
      eyebrow: string;
      title: string;
      body: string;
      features: Feature[];
    };
    practiceTeaser: {
      eyebrow: string;
      title: string;
      body: string;
      cta: string;
    };
    ctaBand: {
      title: string;
      body: string;
      cta: string;
    };
  };
  practiceAreas: {
    eyebrow: string;
    title: string;
    subtitle: string;
    learnMore: string;
    backToAll: string;
    inThisArea: string;
    faqTitle: string;
    needHelp: string;
    items: PracticeArea[];
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Section 1: the firm's story, one entry per paragraph. */
    storyTitle: string;
    body: string[];
    /** Section 2: headline figures (years practising, areas, languages). */
    milestonesTitle: string;
    milestones: { value: string; label: string }[];
    /** Section 3: the attorneys and their qualifications. */
    teamTitle: string;
    teamIntro: string;
    barAdmissionLabel: string;
    educationLabel: string;
    credentialsLabel: string;
    membershipsLabel: string;
    languagesLabel: string;
    /** Section 4: what the firm handles, linking through to practice areas. */
    practiceTitle: string;
    practiceIntro: string;
    /** Section 5: how the firm works. */
    valuesTitle: string;
    values: Feature[];
    /** Section 6: questions about the firm itself. Emits FAQPage schema. */
    faqTitle: string;
    faq: { q: string; a: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Label for the link/button on each team card leading to the member's profile. */
    viewProfile: string;
    /** Link text on a member's profile page back to the team grid. */
    backToTeam: string;
    /** Heading for the practice-area badges on a member's profile page. */
    areasOfPractice: string;
    members: TeamMember[];
  };
  publications: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Shown when there are no items yet. */
    empty: string;
    /** Call-to-action label on each card linking out. */
    readMore: string;
    /** Label for the link to read a court ruling PDF inside the site. */
    readRuling: string;
    /** Accessible name for the play button on a video card. `{title}` is
     *  replaced with the video's title. */
    playVideo: string;
    /** Credit line under a video the firm did not produce. `{source}` is
     *  replaced with the outlet's name. */
    videoCredit: string;
    /** The individual court-ruling reader page. Without this copy the page is
     *  an h1 plus a PDF iframe, which gives crawlers nothing to index. */
    rulingPage: {
      aboutTitle: string;
      /** Sentence explaining what the reader is looking at. */
      about: string;
      disclaimer: string;
      documentTitle: string;
      openInNewTab: string;
      download: string;
      /** Wraps the ruling title into a meta description. */
      metaPrefix: string;
      metaSuffix: string;
    };
    /** Optional section groupings. Items live under each group. */
    groups: {
      heading: string;
      items: PublicationItem[];
      videos?: {
        id: string;
        title: string;
        date?: string;
        /** Name of the outlet that produced and published the video, for
         *  interviews filmed by someone else. Shown on the card and used as
         *  the schema publisher, so the firm is not credited as the author of
         *  a work it did not make. Omit for the firm's own videos. */
        credit?: string;
      }[];
      /** Court rulings shown as in-site PDF readers. `slug` maps to /rulings/{slug}.pdf. */
      rulings?: { slug: string; title: string }[];
    }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    detailsTitle: string;
    phoneLabel: string;
    phone: string;
    whatsappLabel: string;
    whatsappFloatingLabel: string;
    emailLabel: string;
    email: string;
    addressLabel: string;
    addressLines: string[];
    /** Machine-readable form of the same address, for the PostalAddress schema.
     *  Kept separate from `addressLines` so display formatting stays free. */
    postalAddress: {
      street: string;
      city: string;
      postalCode: string;
    };
    hoursLabel: string;
    hours: string;
    form: {
      title: string;
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      preferredTime: string;
      preferredTimePlaceholder: string;
      preferredTimeNote: string;
      preferredTimeWeekendError: string;
      /* The consent sentence is split so "privacy policy" and "terms of use"
         can be rendered as real links to their pages without putting markup
         inside the dictionary. Reads:
         consentPrefix + [consentPrivacy] + consentAnd + [consentTerms] + consentSuffix */
      consentPrefix: string;
      consentPrivacy: string;
      consentAnd: string;
      consentTerms: string;
      consentSuffix: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorTitle: string;
      errorBody: string;
      required: string;
      invalidEmail: string;
      consentRequired: string;
      captchaRequired: string;
      captchaError: string;
    };
  };
  footer: {
    tagline: string;
    quickLinks: string;
    practiceAreas: string;
    contact: string;
    rights: string;
    disclaimer: string;
    privacy: string;
    accessibility: string;
    terms: string;
    careers: string;
    /** Accessible label for the legal-links nav at the foot of the page.
     *  Distinct from `quickLinks` so the two nav landmarks are told apart. */
    legalLinks: string;
    /** Label for the "SSL secured site" trust badge. */
    secure: string;
  };
  /** Standalone questions-and-answers page. Aggregates every practice-area
   *  Q&A plus general questions about working with the firm. */
  faqPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    generalTitle: string;
    general: { q: string; a: string }[];
    byAreaTitle: string;
    stillHaveQuestions: string;
    stillHaveQuestionsBody: string;
  };
  careers: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** The firm as an employer: what it is like to work here. */
    cultureTitle: string;
    culture: string[];
    offerTitle: string;
    offer: Feature[];
    openingsTitle: string;
    /** Empty array renders the "no current openings" message instead. */
    openings: JobOpening[];
    noOpenings: string;
    requirementsLabel: string;
    applyTitle: string;
    applyBody: string;
    applyCta: string;
    applyEmail: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  /** Cookie banner. Analytics and advertising tags load only after the
   *  visitor accepts, as the Privacy Protection Law requires. */
  cookies: {
    title: string;
    body: string;
    accept: string;
    decline: string;
    policyLink: string;
  };
  legal: {
    privacy: LegalPage;
    accessibility: LegalPage;
    terms: LegalPage;
  };
}

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  he: () => import("./dictionaries/he"),
  en: () => import("./dictionaries/en"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await loaders[locale]();
  return mod.default;
}
