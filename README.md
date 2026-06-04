# משרד עורכי דין זהבי — אתר תדמית | Zahavi Law Offices Website

אתר תדמית דו-לשוני (עברית / אנגלית) למשרד עורכי דין, בנוי ב-**Next.js 16** עם
דגש על עיצוב מינימליסטי, נגישות, ביצועים וקידום אורגני (SEO), כולל סנכרון
פניות ל-**CRM ב-Monday.com**.

A bilingual (Hebrew / English) law-firm website built with **Next.js 16**,
focused on a minimalist design, accessibility, performance and SEO, with
contact-form leads synced to a **Monday.com CRM**.

---

## ✨ עיקרי המאפיינים / Features

- **דו-לשוני** — עברית (RTL) ואנגלית (LTR) עם ניתוב מבוסס שפה (`/he`, `/en`)
  ומתג החלפת שפה.
- **SEO מובנה** — `metadata` לכל עמוד, תגיות `hreflang`, `sitemap.xml`,
  `robots.txt`, ונתונים מובְנים (JSON-LD `LegalService`) לתוצאות עשירות בגוגל.
- **נגישות** — מבנה סמנטי, ניווט מקלדת, "דלג לתוכן", טבעות פוקוס, וכיבוד
  `prefers-reduced-motion`.
- **טופס יצירת קשר / קביעת פגישה** המסתנכרן אוטומטית ל-Monday.com.
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

## 🔌 חיבור ל-Monday.com / CRM Integration

הטופס שולח את הפנייה ל-`/api/contact`, שמעביר אותה ל-Monday דרך ה-GraphQL API
(`src/lib/monday.ts`). הגדירו את משתני הסביבה ב-`.env.local`:

| משתנה | תיאור |
| --- | --- |
| `MONDAY_API_TOKEN` | טוקן API מ-monday.com (Developers → My Access Tokens) |
| `MONDAY_BOARD_ID` | מזהה הלוח שאליו נכנסות הפניות |
| `MONDAY_GROUP_ID` | (אופציונלי) הקבוצה בלוח שבה ייווצרו הפריטים |
| `MONDAY_COLUMN_MAP` | (אופציונלי) מיפוי JSON בין שדות הטופס לעמודות הלוח |

> אם המשתנים אינם מוגדרים, הטופס עדיין יעבוד — הפנייה תתקבל אך לא תסונכרן,
> כדי לאפשר פיתוח ובדיקה ללא חשבון Monday.

**מיפוי עמודות** — `MONDAY_COLUMN_MAP` ממפה את שדות הפנייה
(`email`, `phone`, `subject`, `message`, `preferredTime`, `locale`, `source`)
למזהי העמודות בלוח שלכם. שם הלקוח נשמר כשם הפריט. דוגמה:

```json
{"email":"email","phone":"phone","subject":"text","message":"long_text"}
```

## 🗂️ מבנה הפרויקט / Project Structure

```
src/
├── app/
│   ├── layout.tsx              # שורש (pass-through)
│   ├── fonts.ts                # Heebo + Frank Ruhl Libre
│   ├── globals.css             # מערכת עיצוב (tokens, RTL, נגישות)
│   ├── sitemap.ts / robots.ts  # SEO
│   ├── not-found.tsx           # עמוד 404
│   ├── api/contact/route.ts    # קבלת פניות → Monday
│   └── [locale]/               # ניתוב לפי שפה
│       ├── layout.tsx          #   <html dir>, מטא-דאטה, Header/Footer
│       ├── page.tsx            #   דף הבית
│       ├── about/ team/ contact/
│       └── practice-areas/[slug]/
├── components/                 # Header, Footer, ContactForm, וכו'
├── i18n/                       # config + מילונים (he / en)
└── lib/                        # routes, monday
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
