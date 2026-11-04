// Per-browser bypass of the feature flags, for testing gated flows (Buy Now, investor registration) in production
// without turning them on for everyone. An authorised person opens `/api/flags-bypass?token=<FLAGS_BYPASS_SECRET>`,
// which stores a signed, expiring, HttpOnly cookie; while it is valid every flag in lib/flags.ts evaluates to on for
// that browser only. The portal (system/lib/flags-bypass.ts) verifies the same cookie, which is shared because the site
// and /app live on one origin. Without FLAGS_BYPASS_SECRET the feature does not exist (nothing can be issued or accepted).
// Rotating the secret invalidates every issued cookie and link.

export const BYPASS_COOKIE = "acquafy-flags-bypass";
export const BYPASS_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function bypassSecret(): string | null {
  const secret = process.env.FLAGS_BYPASS_SECRET;
  return secret && secret.length >= 16 ? secret : null;
}

async function sign(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(mac), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Whether `token` (from the link) is the configured secret. */
export function isBypassToken(token: string | null | undefined): boolean {
  const secret = bypassSecret();
  return !!secret && !!token && safeEqual(token, secret);
}

/** Cookie value `<expiry>.<signature>` to hand to the browser, or null when the bypass is not configured. */
export async function createBypassCookie(now = Date.now()): Promise<string | null> {
  const secret = bypassSecret();
  if (!secret) return null;
  const expires = Math.floor(now / 1000) + BYPASS_MAX_AGE_SECONDS;
  return `${expires}.${await sign(secret, `flags-bypass:${expires}`)}`;
}

/** True when `value` is a cookie issued by createBypassCookie that has not expired. */
export async function verifyBypassCookie(value: string | undefined, now = Date.now()): Promise<boolean> {
  const secret = bypassSecret();
  if (!secret || !value) return false;
  const [expires, signature, ...rest] = value.split(".");
  if (!expires || !signature || rest.length || !/^\d+$/.test(expires) || Number(expires) * 1000 <= now) return false;
  return safeEqual(signature, await sign(secret, `flags-bypass:${expires}`));
}
