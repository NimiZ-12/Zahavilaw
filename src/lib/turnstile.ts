import "server-only";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Cloudflare Turnstile token server-side. Returns false on any
 * failure (missing secret, network error, or a token Cloudflare rejects) so
 * the caller can simply gate the request on the boolean result.
 */
export async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: remoteIp });
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    if (!res.ok) return false;
    const data: { success?: boolean } = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}
