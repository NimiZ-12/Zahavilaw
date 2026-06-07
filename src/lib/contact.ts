/* ----------------------------------------------------------------------------
   Single source of truth for the firm's WhatsApp line.
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
