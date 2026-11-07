/* ----------------------------------------------------------------------------
   Fixed copy for the articles section shell (/he/articles and the article pages):
   the hub's own headings, the byline wording, section labels and the CTA box.
   Hebrew-only, like the section itself, so it lives outside the bilingual
   dictionaries - same exception as src/i18n/lp-*.ts. Article BODY copy never
   lives here; each article is its own client-approved module.
---------------------------------------------------------------------------- */

export const articlesHub = {
  meta: {
    title: "מאמרים בדיני עבודה",
    description:
      "מאמרים בדיני עבודה מאת עורכי הדין של זהבי-פריטי ושות׳: זכויות בפיטורים, שימוע, שכר ועוד - כל מאמר עונה על שאלה אחת, עם הפניות לחוק.",
  },
  breadcrumb: {
    area: "דיני עבודה",
    areaPath: "/practice-areas/labor-law",
    current: "מאמרים",
  },
  h1: "מאמרים בדיני עבודה",
  /** Kicker label above every article's h1, client-specified wording. */
  kicker: "מאמר - דיני עבודה",
  intro:
    "כל מאמר עונה על שאלה אחת, בשפה פשוטה ועם הפניות לחוק. המאמרים נכתבים על ידי עורכי הדין של המשרד ומתעדכנים כשהדין משתנה.",

  /** Byline: "מאת {author} · עודכן לאחרונה ב-{date}". */
  bylinePrefix: "מאת ",
  bylineUpdated: "עודכן לאחרונה ב-",
  authors: {
    "anat-zahavi": 'עו"ד ענת זהבי',
    "ron-zahavi": 'עו"ד רון זהבי',
  } as Record<string, string>,

  actionsEyebrow: "מה לעשות עכשיו",
  actionsTitle: "מה כדאי לעשות עכשיו",
  faqEyebrow: "שאלות שחוזרות",
  faqTitle: "שאלות נפוצות",
  sourcesTitle: "מקורות",
  relatedTitle: "נושאים קשורים",

  /** The click-to-play video card under the answer box (5.11 brief).
   *  The lead line and the aria prefix are the client-approved wording. */
  videoCard: {
    lead: "רוצים את העיקר בדקה? צפו בסרטון",
    playAriaPrefix: "הפעלת הסרטון: ",
    seconds: "שניות",
    minutes: "דקות",
  },

  ask: {
    title: "רוצים לבדוק איפה אתם עומדים?",
    body: "משרד זהבי-פריטי ושות׳ מלווה עובדים ומעסיקים בדיני עבודה. לבירור ראשוני ללא התחייבות:",
    cta: "שליחת הודעה בוואטסאפ",
    phoneLabel: "או בטלפון",
    formLabel: "פנייה מקוונת",
  },

  /** `{name}` is the article's shortName. */
  whatsappTemplate:
    'שלום, הגעתי מהמאמר "{name}" באתר. אשמח לקבל ייעוץ ראשוני.',

  /** Label of the hub link in the Hebrew footer and on the labor-law page. */
  sectionLinkLabel: "מאמרים בדיני עבודה",

  /** The "Articles" section on the publications page (7.11 brief): one card
   *  per department that has articles. Client-approved wording; `{n}` in the
   *  link template is the department's article count. */
  publicationsSection: {
    heading: "מאמרים",
    allTemplate: "לכל {n} המאמרים",
  },

  disclaimer:
    "האמור בעמוד זה הוא מידע כללי בלבד, אינו מהווה ייעוץ משפטי ואינו תחליף לו, ואין להסתמך עליו בלי בחינה פרטנית של נסיבות המקרה. אין באמור משום התחייבות לתוצאה כלשהי.",
};

/* ----------------------------------------------------------------------------
   Per-department shell data for the articles sections (1.11.2026 brief).
   ---------------------------------------------------------------------------
   Labor-law keeps its original section at /he/articles, wordings unchanged;
   real-estate and commercial each get their own articles page under their
   practice-area path. Every Hebrew string below is the client-approved
   wording from the brief - never reword it here.
---------------------------------------------------------------------------- */
export const articleAreas = {
  "labor-law": {
    name: "דיני עבודה",
    path: "/practice-areas/labor-law",
    articlesPath: "/articles",
    kicker: "מאמר - דיני עבודה",
    sectionLinkLabel: "מאמרים בדיני עבודה",
    ask: { title: articlesHub.ask.title, body: articlesHub.ask.body },
    hub: null,
  },
  "real-estate": {
    name: "מקרקעין ונדל״ן",
    path: "/practice-areas/real-estate",
    articlesPath: "/practice-areas/real-estate/articles",
    kicker: "מאמר - מקרקעין ונדל״ן",
    sectionLinkLabel: "מאמרים במקרקעין ונדל״ן",
    ask: {
      title: "רוצים לבדוק את המצב שלכם בנכס?",
      body: "משרד זהבי-פריטי ושות׳ מלווה רוכשים, מוכרים ובעלי נכסים בעסקאות ובסכסוכי מקרקעין. לבירור ראשוני ללא התחייבות:",
    },
    hub: {
      title: "מאמרים במקרקעין ונדל״ן",
      description:
        "מאמרים במקרקעין ונדל״ן מאת עורכי הדין של זהבי-פריטי ושות׳: עסקאות מכר ורכישה, פירוק שיתוף ועוד. כל מאמר עונה על שאלה אחת, עם הפניות לחוק.",
      h1: "מאמרים במקרקעין ונדל״ן",
      intro:
        "כל מאמר עונה על שאלה אחת, בשפה פשוטה ועם הפניות לחוק. המאמרים נכתבים על ידי עורכי הדין של המשרד ומתעדכנים כשהדין משתנה.",
    },
  },
  commercial: {
    name: "מסחרי ודיני חברות",
    path: "/practice-areas/commercial",
    articlesPath: "/practice-areas/commercial/articles",
    kicker: "מאמר - מסחרי ודיני חברות",
    sectionLinkLabel: "מאמרים במשפט מסחרי ודיני חברות",
    ask: {
      title: "רוצים לבדוק חוזה או סכסוך עסקי?",
      body: "משרד זהבי-פריטי ושות׳ מלווה חברות, יזמים ובעלי עסקים בחוזים, בהקמת חברות ובסכסוכים מסחריים. לבירור ראשוני ללא התחייבות:",
    },
    hub: {
      title: "מאמרים במשפט מסחרי ודיני חברות",
      description:
        "מאמרים במשפט מסחרי ודיני חברות מאת עורכי הדין של זהבי-פריטי ושות׳: חוזים, הקמת חברות והסכמי מייסדים. כל מאמר עונה על שאלה אחת, עם הפניות לחוק.",
      h1: "מאמרים במשפט מסחרי ודיני חברות",
      intro:
        "כל מאמר עונה על שאלה אחת, בשפה פשוטה ועם הפניות לחוק. המאמרים נכתבים על ידי עורכי הדין של המשרד ומתעדכנים כשהדין משתנה.",
    },
  },
  "wills-estates": {
    name: "צוואות וירושות",
    path: "/practice-areas/wills-estates",
    articlesPath: "/practice-areas/wills-estates/articles",
    kicker: "מאמר - צוואות וירושות",
    sectionLinkLabel: "מאמרים בצוואות וירושות",
    ask: {
      title: "רוצים לבדוק צוואה, ירושה או ייפוי כוח מתמשך?",
      body: "משרד זהבי-פריטי ושות׳ מלווה משפחות בעריכת צוואות וייפוי כוח מתמשך, בצווי ירושה ובסכסוכי ירושה. לבירור ראשוני ללא התחייבות:",
    },
    hub: {
      title: "מאמרים בצוואות וירושות",
      description:
        "מאמרים בצוואות וירושות מאת עורכי הדין של זהבי-פריטי ושות׳: עריכת צוואה, ייפוי כוח מתמשך, צו ירושה והתנגדות לצוואה. כל מאמר עונה על שאלה אחת, עם הפניות לחוק.",
      h1: "מאמרים בצוואות וירושות",
      intro:
        "כל מאמר עונה על שאלה אחת, בשפה פשוטה ועם הפניות לחוק. המאמרים נכתבים על ידי עורכי הדין של המשרד ומתעדכנים כשהדין משתנה.",
    },
  },
  "family-law": {
    name: "דיני משפחה",
    path: "/practice-areas/family-law",
    articlesPath: "/practice-areas/family-law/articles",
    kicker: "מאמר - דיני משפחה",
    sectionLinkLabel: "מאמרים בדיני משפחה",
    ask: {
      title: "רוצים לבדוק הסכם ממון או חלוקת רכוש?",
      body: "משרד זהבי-פריטי ושות׳ מלווה בני זוג בהסכמי ממון, בחלוקת רכוש ובהליכי גירושין, בדיסקרטיות מלאה. לבירור ראשוני ללא התחייבות:",
    },
    hub: {
      title: "מאמרים בדיני משפחה",
      description:
        "מאמרים בדיני משפחה מאת עורכי הדין של זהבי-פריטי ושות׳: הסכם ממון, חלוקת רכוש, ידועים בציבור ומזונות. כל מאמר עונה על שאלה אחת, עם הפניות לחוק.",
      h1: "מאמרים בדיני משפחה",
      intro:
        "כל מאמר עונה על שאלה אחת, בשפה פשוטה ועם הפניות לחוק. המאמרים נכתבים על ידי עורכי הדין של המשרד ומתעדכנים כשהדין משתנה.",
    },
  },
  litigation: {
    name: "ליטיגציה אזרחית-מסחרית",
    path: "/practice-areas/litigation",
    articlesPath: "/practice-areas/litigation/articles",
    kicker: "מאמר - ליטיגציה אזרחית-מסחרית",
    sectionLinkLabel: "מאמרים בליטיגציה אזרחית-מסחרית",
    ask: {
      title: "נתבעתם, או שוקלים להגיש תביעה?",
      body: "משרד זהבי-פריטי ושות׳ מייצג תובעים ונתבעים בתביעות אזרחיות ומסחריות, בלשון הרע, בהוצאה לפועל ובבוררות. לבירור ראשוני ללא התחייבות:",
    },
    hub: {
      title: "מאמרים בליטיגציה אזרחית-מסחרית",
      description:
        "מאמרים בליטיגציה אזרחית-מסחרית מאת עורכי הדין של זהבי-פריטי ושות׳: לשון הרע, הוצאה לפועל, בוררות ותובענות ייצוגיות. כל מאמר עונה על שאלה אחת, עם הפניות לחוק.",
      h1: "מאמרים בליטיגציה אזרחית-מסחרית",
      intro:
        "כל מאמר עונה על שאלה אחת, בשפה פשוטה ועם הפניות לחוק. המאמרים נכתבים על ידי עורכי הדין של המשרד ומתעדכנים כשהדין משתנה.",
    },
  },
} as const;

export type ArticleAreaKey = keyof typeof articleAreas;
