/**
 * Analytics-cookie consent, stored per browser.
 *
 * The Privacy Protection Law (including Amendment 13, in force since August
 * 2025) treats analytics and advertising cookies as non-essential: they may
 * only be set after the visitor actively agrees. So nothing is loaded until
 * `getConsent()` returns "granted" — there is no pre-ticked default and no
 * "by continuing to browse you agree".
 */

export type ConsentState = "granted" | "denied" | "unset";

export const CONSENT_KEY = "zl-analytics-consent";
/** Fired on window when the choice changes, so listeners react immediately. */
export const CONSENT_EVENT = "zl-consent-change";

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    // Private mode or blocked storage: treat as no decision, which means
    // nothing non-essential loads.
    return "unset";
  }
}

export function setConsent(state: Exclude<ConsentState, "unset">): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, state);
  } catch {
    // Storage unavailable: the choice applies to this page view only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

/* --------------------------------------------------------------------------
   useSyncExternalStore plumbing.

   The stored choice is external state, so components subscribe to it rather
   than copying it into their own state inside an effect. `getServerSnapshot`
   returns "unset" so the server HTML matches the first client render and the
   banner never flashes for a visitor who already chose.
-------------------------------------------------------------------------- */

export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, onChange);
  // Another tab may change the choice.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getServerConsent(): ConsentState {
  return "unset";
}
