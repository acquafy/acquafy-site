// Verifier for the per-browser feature-flag bypass cookie. The cookie is issued by the website
// (lib/flags-bypass.ts at the repository root, route /api/flags-bypass) and shared with the portal because both live on
// one origin. Keep BYPASS_COOKIE and the signed payload identical to the website copy. Without FLAGS_BYPASS_SECRET
// nothing is ever accepted.
import "server-only";

export const BYPASS_COOKIE = "acquafy-flags-bypass";

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

/** True when `value` is an unexpired cookie issued by the website for this deployment's secret. */
export async function verifyBypassCookie(value: string | undefined, now = Date.now()): Promise<boolean> {
  const secret = process.env.FLAGS_BYPASS_SECRET;
  if (!secret || secret.length < 16 || !value) return false;
  const [expires, signature, ...rest] = value.split(".");
  if (!expires || !signature || rest.length || !/^\d+$/.test(expires) || Number(expires) * 1000 <= now) return false;
  return safeEqual(signature, await sign(secret, `flags-bypass:${expires}`));
}
