// lib/auth.ts
//
// Mock session: a cookie flags "signed in". This is the only seam between the screens and authentication —
// replace the bodies when the real service exists. The cookie is read by proxy.ts to gate the portal.

export const SESSION_COOKIE = "acq-session";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

/** Client-side: marks the browser as signed in. `remember` keeps it for 30 days, otherwise until the browser closes. */
export function startSession(remember: boolean): void {
  document.cookie = `${SESSION_COOKIE}=1; path=/; samesite=lax${remember ? `; max-age=${THIRTY_DAYS}` : ""}`;
}

export function endSession(): void {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}

export type SignInResult = { ok: true } | { ok: false; error: "invalid" };

/** Mock credential check: any well-formed e-mail with a password of 6+ characters signs in. */
export async function signIn(input: { email: string; password: string; remember: boolean }): Promise<SignInResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim());
  if (!emailOk || input.password.length < 6) return { ok: false, error: "invalid" };
  startSession(input.remember);
  return { ok: true };
}
