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
  name: string;
  role: string;
  bio: string;
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
    members: TeamMember[];
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
