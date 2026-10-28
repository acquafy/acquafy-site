// lib/sidebar.ts
//
// The collapsed/expanded choice of the side menu is kept in a cookie so the server renders the right width on
// the first paint (no flash when someone who collapsed it reloads the page).

export const SIDEBAR_COOKIE = "acq-sidebar";

export type SidebarMode = "expanded" | "collapsed";

export function isSidebarMode(value: string | undefined | null): value is SidebarMode {
  return value === "expanded" || value === "collapsed";
}
