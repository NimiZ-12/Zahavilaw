/* ----------------------------------------------------------------------------
   Stock imagery (temporary placeholders)
   ---------------------------------------------------------------------------
   These are Unsplash URLs used as placeholders until the firm's own
   photography is ready. To swap one out, either change the photo id below or
   drop a real image into /public and point the value at e.g. "/images/hero.jpg".

   Every place that uses these renders the image OVER a navy background, so if a
   URL ever fails to load the section still looks intentional (never broken).
---------------------------------------------------------------------------- */

const unsplash = (id: string, w = 1600, q = 55) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  // Looking up at corporate towers — prestige, matches the reference hero.
  hero: unsplash("1486406146926-c627a92ad1ab"),
  // Classical courthouse facade with columns and statuary — behind the About page banner.
  about: unsplash("1773433392027-2dff23126d86"),
  // Grand law library / classical interior, behind the closing call-to-action.
  cta: unsplash("1521587760476-6c12a4b040da"),
  // Elegant boardroom — behind the Team page banner.
  team: unsplash("1431540015161-0bf868a2d407"),
  // Classical library with statuary — behind the Practice Areas banner.
  practiceAreas: unsplash("1505664194779-8beaceb93744"),
  // Professional handshake — behind the Contact page banner.
  contact: unsplash("1521791136064-7986c2920216"),
  // Newspapers / press — behind the Publications & Media banner.
  publications: unsplash("1504711434969-e33886168f5c"),
  // Neutral per-field illustrations for the "Articles" cards (no imagery is
  // ever copied from the news sources themselves — copyright + duplicate
  // content concerns; these are generic stock photos grouped by legal field).
  articleFields: {
    labor: unsplash("1521791136064-7986c2920216", 1200),
    realEstate: unsplash("1486406146926-c627a92ad1ab", 1200),
    family: unsplash("1517048676732-d65bc937f952", 1200),
    classAction: unsplash("1450101499163-c8848c66ca85", 1200),
    defamation: unsplash("1593115057322-e94b77572f20", 1200),
  },
  // Courthouse facade for the "Court Rulings" cards — conveys a judicial decision.
  ruling: unsplash("1773433392027-2dff23126d86", 1200),
};

