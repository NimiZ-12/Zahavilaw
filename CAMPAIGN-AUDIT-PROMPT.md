# פרומפט לבדיקת קמפיינים - להעתיק לצ'אט של קלוד

> העתק את כל מה שמתחת לקו המפריד ושלח אותו כהודעה אחת בצ'אט שבו יש לך
> חיבור ל-Google Ads / Search Console. הפרומפט מכיל את כל מפת הכתובות
> המעודכנת, כך שהוא לא צריך לנחש כלום.

---

אני מנהל אתר של משרד עורכי דין, `https://www.zahavilaw.com`. האתר עבר
היום שדרוג מבני משמעותי. אני צריך שתבצע ביקורת מלאה על כל מה שמפנה
לאתר - Google Ads, Search Console, Google Business Profile וכל מקור
תנועה אחר - ותוודא שאף אחד לא מפנה לכתובת שבורה או לא אופטימלית.

## רקע חשוב לפני שאתה מתחיל

**לא שונתה אף כתובת קיימת.** האתר החדש הוא הרחבה של הקיים: נוספו שלושה
עמודים, ואף עמוד לא נמחק ואף כתובת לא שונתה. לכן אתה **לא** אמור למצוא
קמפיינים שבורים. המטרה היא לאמת את זה, ולנצל את ההזדמנות לשפר.

## מפת הכתובות המלאה והמעודכנת

האתר דו-לשוני. עברית תחת `/he/`, אנגלית תחת `/en/`. אין כתובת תקינה
ללא קידומת שפה - פנייה ל-`/about` תופנה אוטומטית ל-`/he/about`.

### 56 הכתובות התקינות (עברית; החליפו `he` ב-`en` לאנגלית)

```
https://www.zahavilaw.com/he
https://www.zahavilaw.com/he/about
https://www.zahavilaw.com/he/practice-areas
https://www.zahavilaw.com/he/practice-areas/litigation
https://www.zahavilaw.com/he/practice-areas/labor-law
https://www.zahavilaw.com/he/practice-areas/real-estate
https://www.zahavilaw.com/he/practice-areas/commercial
https://www.zahavilaw.com/he/practice-areas/wills-estates
https://www.zahavilaw.com/he/practice-areas/family-law
https://www.zahavilaw.com/he/team
https://www.zahavilaw.com/he/team/ron-zahavi
https://www.zahavilaw.com/he/team/anat-zahavi
https://www.zahavilaw.com/he/publications
https://www.zahavilaw.com/he/publications/rulings/dismissal-in-limine
https://www.zahavilaw.com/he/publications/rulings/security-deposit
https://www.zahavilaw.com/he/publications/rulings/property-eviction
https://www.zahavilaw.com/he/publications/rulings/trademark-cancellation
https://www.zahavilaw.com/he/publications/rulings/defamation
https://www.zahavilaw.com/he/publications/rulings/monetary-claim-dismissed
https://www.zahavilaw.com/he/publications/rulings/brokerage-fee-dismissed
https://www.zahavilaw.com/he/publications/rulings/construction-defects-dismissed
https://www.zahavilaw.com/he/publications/rulings/wrongful-dismissal-compensation
https://www.zahavilaw.com/he/faq          ← חדש
https://www.zahavilaw.com/he/careers      ← חדש
https://www.zahavilaw.com/he/terms        ← חדש
https://www.zahavilaw.com/he/contact
https://www.zahavilaw.com/he/privacy
https://www.zahavilaw.com/he/accessibility
```

### כתובות ישנות שעדיין עובדות דרך הפניה 301

הן תקינות, אבל **עדיף לעדכן קמפיינים ליעד הישיר** - כל הפניה מוסיפה
זמן טעינה ופוגעת בציון האיכות של המודעה.

| כתובת ישנה בקמפיין | היעד הישיר שאליו כדאי לעדכן |
|---|---|
| `/עורך-דין-פיטורים` | `/he/practice-areas/labor-law` |
| `/פיטורים-בלי-שימוע` | `/he/practice-areas/labor-law` |
| `/עורך-דין-דיני-עבודה` | `/he/practice-areas/labor-law` |
| `/זכויות-עובדים` | `/he/practice-areas/labor-law` |
| `/זכויות-מעסיקים` | `/he/practice-areas/labor-law` |
| `/מניעת-פיטורים` | `/he/practice-areas/labor-law` |
| `/ייצוג-בבית-הדין-לעבודה` | `/he/practice-areas/labor-law` |
| `/אודות` | `/he/about` |
| `/עוד-רון-זהבי` | `/he/team/ron-zahavi` |
| `/עוד-ענת-זהבי` | `/he/team/anat-zahavi` |
| `/צור-קשר` | `/he/contact` |
| `/תחומי-התמחות` | `/he/practice-areas` |
| `/מידע-מקצועי` | `/he/publications` |
| `/סיפורי-הצלחה` | `/he/publications` |

## המשימות שלך

### 1. Google Ads - הבדיקה העיקרית
- שלוף את **כל** ה-Final URLs מכל הקמפיינים, קבוצות המודעות והמודעות,
  כולל קמפיינים מושהים.
- אל תשכח את ה-**Sitelink / Callout / Structured Snippet extensions** -
  שם נשכחות הכי הרבה כתובות ישנות.
- בדוק גם **Final URL suffix** ו-**Tracking templates**.
- לכל כתובת, סווג אותה לאחת מ:
  - ✅ תקינה וישירה (מופיעה ברשימת 56)
  - ⚠️ עובדת דרך הפניה (מהטבלה) - **המלץ על היעד הישיר**
  - ❌ לא מופיעה באף רשימה - **דגל אדום, פרט לי בדיוק איפה היא**
- בנוסף: אם יש קמפיין שמפנה לעמוד הבית בלבד אבל הוא ממוקד בנושא ספציפי
  (למשל מודעות על פיטורים), הצע להפנות אותו לעמוד תחום העיסוק המתאים.

### 2. הזדמנות חדשה בקמפיינים
נוספו שלושה עמודים שלא היו קודם. בדוק אם כדאי לנצל אותם:
- `/he/faq` - עמוד שאלות ותשובות מקיף. יעד מצוין למודעות על שאילתות
  מידע ("כמה זמן לוקח הליך", "מתי לפנות לעורך דין").
- `/he/careers` - עמוד דרושים, למי שמגייס.
- `/he/terms` - תקנון, לא יעד שיווקי.

### 3. Google Search Console
- הגש מחדש את `https://www.zahavilaw.com/sitemap.xml`.
- בדוק את דוח Pages/Coverage וסמן שגיאות קיימות ל-Validate Fix.
- בקש אינדוקס ידני (URL Inspection → Request Indexing) לשלושת החדשים:
  `/he/faq`, `/he/careers`, `/he/terms`.
- בדוק שהנכס מוגדר על הדומיין המלא ולא רק על תת-נתיב `/he/`.
- הרץ את Rich Results Test על `/he/practice-areas/labor-law` ועל
  `/he/about` - האתר מפיק כעת סכימות FAQPage, Service, Person,
  BreadcrumbList ו-AboutPage. דווח לי אם משהו לא נקלט.

### 4. Google Business Profile
- ודא שהקישור לאתר הוא `https://www.zahavilaw.com` (עם `www`).
- **שלח לי בחזרה את כתובת ה-URL של הפרופיל** - היא נכנסת לסכימת האתר
  ומחזקת את זיהוי המשרד בגוגל.

### 5. מקורות תנועה נוספים
בדוק כל מקום אחר שמפנה לאתר: לינקדאין, פייסבוק, אינדקסים של עורכי דין,
חתימות מייל, כרטיסי ביקור דיגיטליים. שלח לי רשימה של כל הפרופילים
שמצאת - גם הם נכנסים לסכימה.

## שינוי התנהגות שחייב שתדע עליו לפני שתנתח נתונים

החל מהיום, **Google Analytics ו-Google Ads נטענים רק אחרי שהגולש מאשר
בבאנר העוגיות**. זו דרישה של תיקון 13 לחוק הגנת הפרטיות.

**המשמעות המעשית: מספר המבקרים והמרות המדווחים יירדו.** זה לא אומר
שהתנועה ירדה - זה אומר שמי שלא אישר עוגיות לא נמדד. אל תפרש את הירידה
כבעיה בקמפיין, ואל תמליץ לי להגדיל תקציב בגללה. אם אתה משווה תקופות,
ציין את זה במפורש בניתוח.

## מה אני רוצה לקבל בסוף

1. טבלה של כל כתובת שמצאת, איפה היא (קמפיין/מודעה/הרחבה), והסיווג שלה.
2. רשימת פעולות מדויקת: מה לשנות, מ-מה ל-מה, לפי סדר דחיפות.
3. דגלים אדומים בלבד בראש הדוח, כדי שאראה אותם ראשונים.
4. אם הכל תקין - תגיד את זה במפורש. אל תמציא בעיות.
