/* ----------------------------------------------------------------------------
   The list of published articles. Every entry is client-approved content;
   see docs/seo/articles-content-format.md for the submission flow.

   To publish an article: add its content module in this folder, import it
   here, append it to the array, build, verify, and get the client's
   approval on the staging preview before merging.
---------------------------------------------------------------------------- */

import type { Article } from "./types";
import { resignationAsDismissal } from "./resignation-as-dismissal";
import { rightsAfterDismissal } from "./rights-after-dismissal";
import { dismissalDuringSickLeave } from "./dismissal-during-sick-leave";
import { hearingTimelineAndDocuments } from "./hearing-timeline-and-documents";
import { workplaceBullying } from "./workplace-bullying";
import { howToDismissAnEmployee } from "./how-to-dismiss-an-employee";

export type { Article };

export const articles: Article[] = [
  resignationAsDismissal,
  rightsAfterDismissal,
  dismissalDuringSickLeave,
  hearingTimelineAndDocuments,
  workplaceBullying,
  howToDismissAnEmployee,
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
