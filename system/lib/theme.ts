// lib/theme.ts
//
// Day ("light") / Night ("dark") theme. The choice lives in a cookie so the server renders <html data-theme> on the
// first paint, with no flash of the wrong theme. First visit with no cookie: Day.

export const THEME_COOKIE = "acq-theme";

export type Theme = "light" | "dark";

export function isTheme(value: string | undefined | null): value is Theme {
  return value === "light" || value === "dark";
}
