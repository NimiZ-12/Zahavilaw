/* ----------------------------------------------------------------------------
   Structured data (Schema.org) for the whole site.
   ---------------------------------------------------------------------------
   Every page emits ONE `<script type="application/ld+json">` holding a
   `@graph` array. Nodes reference each other by `@id`, so search engines and
   answer engines (AEO/GEO) resolve the firm, its website, its attorneys and
   its services as a single connected entity rather than as unrelated blobs
   repeated on each page.

   Stable `@id` values live in `ID` below. They are absolute URLs with a
   fragment, per Google's guidance, and must not change once indexed.
---------------------------------------------------------------------------- */

import type { Locale } from "@/i18n/config";
import type { Dictionary, PracticeArea, TeamMember } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "./routes";
import { OFFICE_COORDS, WHATSAPP_NUMBER_E164 } from "./contact";

export type JsonLdNode = Record<string, unknown>;

/** Absolute URL for a locale-prefixed path. */
export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/** Stable entity identifiers. Changing these breaks entity continuity in
 *  Google's Knowledge Graph, so treat them as permanent. */
export const ID = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  person: (slug: string) => `${SITE_URL}/#person-${slug}`,
  service: (slug: string) => `${SITE_URL}/#service-${slug}`,
  page: (locale: Locale, path: string) => `${absoluteUrl(locale, path)}#webpage`,
  breadcrumb: (locale: Locale, path: string) =>
    `${absoluteUrl(locale, path)}#breadcrumb`,
  faq: (locale: Locale, path: string) => `${absoluteUrl(locale, path)}#faq`,
} as const;

const LANGUAGE: Record<Locale, string> = { he: "he-IL", en: "en-US" };

/** Drops keys whose value is undefined or an empty array so the emitted JSON
 *  never carries empty properties (Google warns on those). */
function clean(node: JsonLdNode): JsonLdNode {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0),
    ),
  );
}

/* -------------------------------------------------------------------------- */
/* Core entities — present on every page                                      */
/* -------------------------------------------------------------------------- */

/** The firm itself: `LegalService` (a `LocalBusiness`) so Google can show
 *  address, phone, hours and map placement for local search. */
export function organizationNode(locale: Locale, dict: Dictionary): JsonLdNode {
  const { brand, contact, practiceAreas, team } = dict;
  const addr = contact.postalAddress;

  return clean({
    "@type": ["LegalService", "Organization"],
    "@id": ID.organization,
    name: brand.name,
    alternateName: brand.short,
    description: dict.meta.defaultDescription,
    url: absoluteUrl(locale, "/"),
    telephone: contact.phone,
    email: contact.email,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.webp`,
      caption: brand.name,
    },
    image: `${SITE_URL}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: addr.street,
      addressLocality: addr.city,
      postalCode: addr.postalCode,
      addressCountry: "IL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OFFICE_COORDS.lat,
      longitude: OFFICE_COORDS.lon,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${OFFICE_COORDS.lat},${OFFICE_COORDS.lon}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Sunday",
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: contact.phone,
        email: contact.email,
        availableLanguage: ["he", "en"],
        areaServed: "IL",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: `https://wa.me/${WHATSAPP_NUMBER_E164}`,
        name: contact.whatsappLabel,
        availableLanguage: ["he", "en"],
      },
    ],
    areaServed: { "@type": "Country", name: "Israel" },
    knowsLanguage: ["he", "en"],
    knowsAbout: practiceAreas.items.map((a) => a.title),
    founder: team.members.map((m) => ({ "@id": ID.person(m.slug) })),
    employee: team.members.map((m) => ({ "@id": ID.person(m.slug) })),
    sameAs: dict.brand.sameAs,
  });
}

/** The website as an entity, so sitelinks and language variants resolve. */
export function websiteNode(locale: Locale, dict: Dictionary): JsonLdNode {
  return clean({
    "@type": "WebSite",
    "@id": ID.website,
    url: `${SITE_URL}/`,
    name: dict.brand.name,
    description: dict.meta.defaultDescription,
    publisher: { "@id": ID.organization },
    inLanguage: LANGUAGE[locale],
  });
}

/* -------------------------------------------------------------------------- */
/* Page-level nodes                                                            */
/* -------------------------------------------------------------------------- */

export type WebPageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "FAQPage"
  | "ProfilePage";

export function webPageNode({
  locale,
  path,
  type = "WebPage",
  name,
  description,
  primaryImage,
}: {
  locale: Locale;
  path: string;
  type?: WebPageType;
  name: string;
  description: string;
  primaryImage?: string;
}): JsonLdNode {
  return clean({
    "@type": type,
    "@id": ID.page(locale, path),
    url: absoluteUrl(locale, path),
    name,
    description,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.organization },
    publisher: { "@id": ID.organization },
    inLanguage: LANGUAGE[locale],
    primaryImageOfPage: primaryImage
      ? { "@type": "ImageObject", url: primaryImage }
      : undefined,
    breadcrumb: path === "/" ? undefined : { "@id": ID.breadcrumb(locale, path) },
  });
}

/** Trail of ancestors for an inner page. Pass the crumbs without the current
 *  page's own locale prefix; "Home" is prepended automatically. */
export function breadcrumbNode(
  locale: Locale,
  path: string,
  dict: Dictionary,
  trail: { name: string; path: string }[],
): JsonLdNode {
  const items = [{ name: dict.nav.home, path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    "@id": ID.breadcrumb(locale, path),
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.path),
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* Domain entities                                                             */
/* -------------------------------------------------------------------------- */

/** An attorney. `Attorney` is not a Schema.org type, so we use `Person` with
 *  `jobTitle` — which is what Google actually understands. */
export function personNode(
  locale: Locale,
  member: TeamMember,
  dict: Dictionary,
): JsonLdNode {
  const areas = dict.practiceAreas.items.filter((a) =>
    member.practiceAreaSlugs.includes(a.slug),
  );

  return clean({
    "@type": "Person",
    "@id": ID.person(member.slug),
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: absoluteUrl(locale, `/team/${member.slug}`),
    image: `${SITE_URL}/team/${member.slug}.webp`,
    worksFor: { "@id": ID.organization },
    knowsAbout: areas.map((a) => a.title),
    knowsLanguage: member.languages,
    alumniOf: member.education?.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
    hasCredential: member.credentials?.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c,
    })),
    memberOf: member.memberships?.map((m) => ({
      "@type": "Organization",
      name: m,
    })),
  });
}

/** A practice area offered by the firm. */
export function serviceNode(
  locale: Locale,
  area: PracticeArea,
  dict: Dictionary,
): JsonLdNode {
  return clean({
    "@type": "Service",
    "@id": ID.service(area.slug),
    name: area.title,
    description: area.description,
    url: absoluteUrl(locale, `/practice-areas/${area.slug}`),
    serviceType: area.title,
    provider: { "@id": ID.organization },
    areaServed: { "@type": "Country", name: "Israel" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.practiceAreas.inThisArea,
      itemListElement: area.points.map((point) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: point },
      })),
    },
  });
}

/** Questions and answers. Every Q&A block on the site must emit one of these. */
export function faqNode(
  locale: Locale,
  path: string,
  faq: { q: string; a: string }[],
): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": ID.faq(locale, path),
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function videoNode(video: {
  id: string;
  title: string;
  date?: string;
  uploadDate?: string;
}): JsonLdNode {
  return clean({
    "@type": "VideoObject",
    name: video.title,
    description: video.title,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    publisher: { "@id": ID.organization },
  });
}

/** A published court ruling, presented as an article so its text is indexable. */
export function articleNode({
  locale,
  path,
  headline,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  headline: string;
  description: string;
  image?: string;
}): JsonLdNode {
  return clean({
    "@type": "Article",
    headline,
    description,
    url: absoluteUrl(locale, path),
    image,
    author: { "@id": ID.organization },
    publisher: { "@id": ID.organization },
    isPartOf: { "@id": ID.website },
    inLanguage: LANGUAGE[locale],
  });
}

export function jobPostingNode(
  locale: Locale,
  dict: Dictionary,
  opening: {
    title: string;
    description: string;
    employmentType?: string;
    datePosted: string;
    validThrough?: string;
  },
): JsonLdNode {
  const addr = dict.contact.postalAddress;
  return clean({
    "@type": "JobPosting",
    title: opening.title,
    description: opening.description,
    employmentType: opening.employmentType,
    datePosted: opening.datePosted,
    validThrough: opening.validThrough,
    url: absoluteUrl(locale, "/careers"),
    directApply: true,
    hiringOrganization: { "@id": ID.organization },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: addr.street,
        addressLocality: addr.city,
        postalCode: addr.postalCode,
        addressCountry: "IL",
      },
    },
    applicantLocationRequirements: { "@type": "Country", name: "Israel" },
  });
}

/* -------------------------------------------------------------------------- */
/* Assembly                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Builds the complete `@graph` for a page: the shared organization and website
 * entities, the page node, its breadcrumb trail, plus any page-specific nodes.
 */
export function buildGraph({
  locale,
  dict,
  path,
  pageType,
  name,
  description,
  primaryImage,
  trail = [],
  nodes = [],
}: {
  locale: Locale;
  dict: Dictionary;
  path: string;
  pageType?: WebPageType;
  name: string;
  description: string;
  primaryImage?: string;
  trail?: { name: string; path: string }[];
  nodes?: JsonLdNode[];
}) {
  const graph: JsonLdNode[] = [
    organizationNode(locale, dict),
    websiteNode(locale, dict),
    webPageNode({ locale, path, type: pageType, name, description, primaryImage }),
  ];

  if (path !== "/") {
    graph.push(breadcrumbNode(locale, path, dict, trail));
  }

  graph.push(...nodes);

  return { "@context": "https://schema.org", "@graph": graph };
}
