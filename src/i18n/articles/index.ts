/* ----------------------------------------------------------------------------
   The list of published articles. Empty until the first client-approved article
   lands; while it is empty the entire articles section stays dark - /he/articles
   404s, nothing is emitted to the sitemap or llms.txt, and no link to the
   section renders anywhere ("never publish an empty hub").

   To publish a article: add its content module in this folder, import it here,
   append it to the array, build, verify, and get the client's approval on
   the staging preview before merging.
---------------------------------------------------------------------------- */

import type { Article } from "./types";

export type { Article };

export const articles: Article[] = [];

export function getArticle(slug: string): Article | undefined {
  return articles.find((g) => g.slug === slug);
}
