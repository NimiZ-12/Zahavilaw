# משרד עורכי דין זהבי-פריטי ושות׳ — אתר תדמית | Zahavi - Pretty & Co. Law Offices Website

אתר תדמית דו-לשוני (עברית / אנגלית) למשרד עורכי דין, בנוי ב-**Next.js 16** עם
דגש על עיצוב מינימליסטי, נגישות, ביצועים וקידום אורגני (SEO/AEO/GEO).
פניות מהטופס נשלחות לתיבת הדוא”ל של המשרד.

A bilingual (Hebrew / English) law-firm website built with **Next.js 16**,
focused on a minimalist design, accessibility, performance and SEO/AEO/GEO.
Contact-form leads are delivered to the firm's inbox by email.

---

## ✨ עיקרי המאפיינים / Features

- **דו-לשוני** — עברית (RTL) ואנגלית (LTR) עם ניתוב מבוסס שפה (`/he`, `/en`)
  ומתג החלפת שפה.
- **SEO מובנה** — `metadata` לכל עמוד, תגיות `hreflang`, `sitemap.xml`,
  `robots.txt`, ונתונים מובְנים (JSON-LD `LegalService`) לתוצאות עשירות בגוגל.
- **נגישות** — מבנה סמנטי, ניווט מקלדת, "דלג לתוכן", טבעות פוקוס, וכיבוד
  `prefers-reduced-motion`.
- **טופס יצירת קשר / קביעת פגישה** שנשלח לתיבת הדוא”ל של המשרד.
- **עיצוב מינימליסטי** — פלטת נייבי + זהב, טיפוגרפיה Heebo / Frank Ruhl Libre,
  Tailwind CSS v4.

## 🚀 הרצה מקומית / Getting Started

```bash
npm install
cp .env.example .env.local   # מלאו ערכים אמיתיים / fill in real values
npm run dev                  # http://localhost:3000  → מפנה ל-/he
```

פקודות נוספות / Other commands:

```bash
npm run build   # בניית production
npm run start   # הרצת production build
npm run lint    # בדיקת ESLint
```

## 📬 מסירת פניות / Lead delivery

הטופס שולח את הפנייה ל-`/api/contact`, שמאמת אותה ושולח אותה בדוא"ל לתיבת
המשרד דרך Resend (`src/lib/email.ts`). הגדירו ב-`.env.local`:

| משתנה | תיאור |
| --- | --- |
| `RESEND_API_KEY` | מפתח API מ-resend.com |
| `LEAD_EMAIL_FROM` | כתובת שולח מאומתת, למשל `"Website <leads@zahavilaw.com>"` |
| `LEAD_EMAIL_TO` | (אופציונלי) נמענים מופרדים בפסיק |

> בפיתוח, אם המשתנים אינם מוגדרים הפנייה מתקבלת ולא נשלחת - כדי לאפשר עבודה
> מקומית בלי חשבון דוא"ל. **בפרודקשן זו שגיאה מכוונת (502)**, כדי שפנייה לא
> תיבלע בשקט בלי שאיש ידע.

## 🔐 אבטחה / Security

- **כותרות אבטחה** על כל בקשה (`next.config.ts`): Content-Security-Policy,
  HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy. כותרת
  `X-Powered-By` מוסתרת.
- **הגנת CSRF** — נקודת הקצה `/api/contact` דוחה בקשות חוצות-מקור (בדיקת Origin).
- **הגבלת קצב** — עד 5 פניות לדקה לכל כתובת IP (`src/lib/rate-limit.ts`),
  למניעת ספאם וניצול לרעה.
- **ולידציה והגבלות** — בדיקת קלט, הגבלת גודל גוף הבקשה, ומלכודת ספאם (honeypot).
- **סודות בצד השרת בלבד** — מפתחות ה-API נטענים בצד השרת בלבד ולעולם לא
  נחשפים לדפדפן.

> CSP מוגדר כעת במצב **סטטי-ידידותי** (האתר נשאר סטטי — מהיר ועמיד יותר לעומסים).
> אם בעתיד יתווסף אזור אישי ללקוחות, ניתן לשדרג ל-CSP מבוסס nonce.

## 🗂️ מבנה הפרויקט / Project Structure

```
src/
├── app/
│   ├── layout.tsx              # שורש (pass-through)
│   ├── fonts.ts                # Heebo
│   ├── globals.css             # מערכת עיצוב (tokens, RTL, נגישות)
│   ├── sitemap.ts / robots.ts  # SEO
│   ├── not-found.tsx           # עמוד 404
│   ├── api/contact/route.ts    # קבלת פניות → דוא”ל
│   └── [locale]/               # ניתוב לפי שפה
│       ├── layout.tsx          #   <html dir>, מטא-דאטה, Header/Footer
│       ├── page.tsx            #   דף הבית
│       ├── about/ team/ contact/
│       └── practice-areas/[slug]/
├── components/                 # Header, Footer, ContactForm, וכו'
├── i18n/                       # config + מילונים (he / en)
└── lib/                        # routes, schema, email, images
```

## 📝 עריכת תוכן / Editing Content

כל הטקסטים מרוכזים במילונים `src/i18n/dictionaries/he.ts` ו-`en.ts`. עריכת
תחומי עיסוק, פרטי צוות, פרטי קשר וכותרות נעשית שם בלבד — שני הקבצים חולקים
טיפוס משותף (`Dictionary`) כך שכל שינוי נבדק בזמן ה-build.

עדכנו פרטי קשר אמיתיים תחת `contact` (טלפון, אימייל, כתובת) ואת
`NEXT_PUBLIC_SITE_URL` לכתובת הסופית של האתר.

## ☁️ פריסה / Deployment

מומלץ לפרוס ב-[Vercel](https://vercel.com). הגדירו את משתני הסביבה בלוח
הבקרה, ולאחר הפריסה שלחו את `sitemap.xml` ל-Google Search Console כדי לזרז
את האינדוקס.
