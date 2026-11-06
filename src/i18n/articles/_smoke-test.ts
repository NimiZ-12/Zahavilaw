/* TEMPORARY smoke-test articles for the three new departments (6.11 brief,
   part 3). Staging-only: this file and its registry rows are DELETED before
   the merge; none of this text is client-approved content. */

import type { Article } from "./types";

function smoke(
  area: Article["area"],
  slug: string,
  name: string,
): Article {
  return {
    slug,
    area,
    shortName: `בדיקת ${name}`,
    meta: {
      title: `עמוד בדיקה זמני - ${name}`,
      description: `עמוד בדיקה זמני של מדור ${name}. אינו תוכן אמיתי ונמחק לפני העלייה לאוויר.`,
    },
    h1: `עמוד בדיקה זמני - ${name}`,
    answer:
      "זהו עמוד בדיקה זמני לסביבת הבדיקה בלבד. הוא בודק שהמדור החדש נבנה כראוי ונמחק לפני המיזוג לאתר החי.",
    audience: "individual",
    author: "ron-zahavi",
    published: "2026-11-06",
    updated: "2026-11-06",
    sections: [
      {
        q: "מה בודק העמוד הזה?",
        answer: "שהנתיב, פירורי הלחם, התווית וקופסת הפנייה של המדור החדש עובדים.",
        body: ["פסקת בדיקה. העמוד נמחק לפני המיזוג."],
      },
    ],
    actions: [
      { title: "צעד בדיקה 1", body: "טקסט בדיקה." },
      { title: "צעד בדיקה 2", body: "טקסט בדיקה." },
      { title: "צעד בדיקה 3", body: "טקסט בדיקה." },
    ],
    faq: [
      { q: "שאלת בדיקה 1?", a: "תשובת בדיקה." },
      { q: "שאלת בדיקה 2?", a: "תשובת בדיקה." },
      { q: "שאלת בדיקה 3?", a: "תשובת בדיקה." },
      { q: "שאלת בדיקה 4?", a: "תשובת בדיקה." },
    ],
    related: [{ label: "עמוד הבית", href: "/he" }],
    sources: [{ label: "מקור בדיקה" }],
  };
}

export const smokeWills = smoke("wills-estates", "smoke-test-wills", "צוואות וירושות");
export const smokeFamily = smoke("family-law", "smoke-test-family", "דיני משפחה");
export const smokeLitigation = smoke("litigation", "smoke-test-litigation", "ליטיגציה");
