// lib/cn.ts
//
// Class-name joiner: drops falsy values so conditional classes stay readable. No dependency needed.

export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
