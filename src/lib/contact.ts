/* ----------------------------------------------------------------------------
   Single source of truth for the firm's contact actions (WhatsApp, Waze).
   ---------------------------------------------------------------------------
   The office landline (contact.phone) and the WhatsApp mobile are different
   numbers, so WhatsApp links must never be derived from the display phone.
   Both the floating button and the contact page import from here.
---------------------------------------------------------------------------- */

/** WhatsApp mobile in E.164 (digits only) — required by the wa.me link format. */
export const WHATSAPP_NUMBER_E164 = "972544484034";

/** Human-readable form shown next to the WhatsApp action. */
export const WHATSAPP_NUMBER_DISPLAY = "054-4484034";

/** Ready-to-use deep link that opens a chat with the firm. */
export const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER_E164}`;

/** Exact coordinates of "בית גיבור ספורט" (Gibor Sport House), Menachem Begin 7,
 *  Ramat Gan. A text search for the street name alone is ambiguous — Waze
 *  resolves it to "Derech Begin" in Tel Aviv — so the deep link is built from
 *  these coordinates to guarantee navigation lands at the firm's office. */
export const OFFICE_COORDS = { lat: 32.08524, lon: 34.80006 };

/** Waze deep link that starts navigation to the office. Works on the Waze app
 *  (mobile) and falls back to the Waze web map on desktop. */
export const wazeLink = `https://waze.com/ul?ll=${OFFICE_COORDS.lat},${OFFICE_COORDS.lon}&navigate=yes`;
