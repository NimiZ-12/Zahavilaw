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
}

export interface TeamMember {
  /** URL-safe identifier used for the member's individual profile page. */
  slug: string;
  name: string;
  role: string;
  /** Short summary shown on the team grid card. */
  bio: string;
  /** Fuller biography shown on the member's individual profile page. */
  about: string;
  /** Practice-area slugs this member specializes in, shown on their profile page. */
  practiceAreaSlugs: string[];
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
    needHelp: string;
    items: PracticeArea[];
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string[];
    valuesTitle: string;
    values: Feature[];
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
    /** Optional section groupings. Items live under each group. */
    groups: { heading: string; items: PublicationItem[] }[];
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
      consent: string;
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
    /** Label for the "SSL secured site" trust badge. */
    secure: string;
  };
  legal: {
    privacy: LegalPage;
    accessibility: LegalPage;
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
