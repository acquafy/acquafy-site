// components/ui/validate.ts
//
// Small field validators shared by forms (login, profile). Pure functions, no I/O.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export const digitsOnly = (value: string): string => value.replace(/\D/g, "");

/** Accepts "+1 (407) 555-0123"-style input: only phone punctuation and 8–15 digits. */
export function isPhone(value: string): boolean {
  const v = value.trim();
  const n = digitsOnly(v).length;
  return /^\+?[\d\s().-]+$/.test(v) && n >= 8 && n <= 15;
}
