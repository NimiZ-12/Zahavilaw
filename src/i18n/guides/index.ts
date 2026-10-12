/* ----------------------------------------------------------------------------
   The list of published guides. Empty until the first client-approved guide
   lands; while it is empty the entire guides section stays dark - /he/guides
   404s, nothing is emitted to the sitemap or llms.txt, and no link to the
   section renders anywhere ("never publish an empty hub").

   To publish a guide: add its content module in this folder, import it here,
   append it to the array, build, verify, and get the client's approval on
   the staging preview before merging.
---------------------------------------------------------------------------- */

import type { Guide } from "./types";

export type { Guide };

export const guides: Guide[] = [];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
