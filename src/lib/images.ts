/* ----------------------------------------------------------------------------
   Stock imagery (temporary placeholders)
   ---------------------------------------------------------------------------
   These are Unsplash URLs used as placeholders until the firm's own
   photography is ready. To swap one out, either change the photo id below or
   drop a real image into /public and point the value at e.g. "/images/hero.jpg".

   Every place that uses these renders the image OVER a navy background, so if a
   URL ever fails to load the section still looks intentional (never broken).
---------------------------------------------------------------------------- */

const unsplash = (id: string, w = 2000, q = 68) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  // Grand law library / classical interior — prestige.
  hero: unsplash("1521587760476-6c12a4b040da"),
  // Office desk with books and documents.
  about: unsplash("1450101499163-c8848c66ca85"),
  // Architectural lines — used behind the closing call-to-action.
  cta: unsplash("1486406146926-c627a92ad1ab"),
};
