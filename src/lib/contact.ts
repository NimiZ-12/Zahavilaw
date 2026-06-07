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

/** The office address as a single search query for map/navigation links. */
export const OFFICE_ADDRESS_QUERY = "דרך מנחם בגין 7, רמת גן";

/** Waze deep link that starts navigation to the office. Works on the Waze app
 *  (mobile) and falls back to the Waze web map on desktop. */
export const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(
  OFFICE_ADDRESS_QUERY,
)}&navigate=yes`;
