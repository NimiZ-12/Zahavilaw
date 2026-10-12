/* ----------------------------------------------------------------------------
   Fixed copy for the guides section shell (/he/guides and the guide pages):
   the hub's own headings, the byline wording, section labels and the CTA box.
   Hebrew-only, like the section itself, so it lives outside the bilingual
   dictionaries - same exception as src/i18n/lp-*.ts. Guide BODY copy never
   lives here; each guide is its own client-approved module.
---------------------------------------------------------------------------- */

export const guidesHub = {
  meta: {
    title: "מדריכים בדיני עבודה",
    description:
      "מדריכים מעשיים בדיני עבודה מאת עורכי הדין של זהבי-פריטי ושות׳: זכויות בפיטורים, שימוע, שכר ועוד - כל מדריך עונה על שאלה אחת, עם הפניות לחוק.",
  },
  breadcrumb: {
    area: "דיני עבודה",
    areaPath: "/practice-areas/labor-law",
    current: "מדריכים",
  },
  h1: "מדריכים בדיני עבודה",
  intro:
    "כל מדריך עונה על שאלה אחת, בשפה פשוטה ועם הפניות לחוק. המדריכים נכתבים על ידי עורכי הדין של המשרד ומתעדכנים כשהדין משתנה.",

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

  /** `{name}` is the guide's shortName. */
  whatsappTemplate:
    'שלום, הגעתי מהמדריך "{name}" באתר. אשמח לקבל ייעוץ ראשוני.',

  /** Label of the hub link in the Hebrew footer and on the labor-law page. */
  sectionLinkLabel: "מדריכים בדיני עבודה",

  disclaimer:
    "האמור בעמוד זה הוא מידע כללי בלבד, אינו מהווה ייעוץ משפטי ואינו תחליף לו, ואין להסתמך עליו בלי בחינה פרטנית של נסיבות המקרה. אין באמור משום התחייבות לתוצאה כלשהי.",
};
