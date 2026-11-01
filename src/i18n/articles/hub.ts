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
} as const;

export type ArticleAreaKey = keyof typeof articleAreas;
