// components/mobile/ios/IosSidebarState.tsx
"use client";

import { createContext, useContext } from "react";

/** Is the tablet / foldable sidebar open (icons + labels) or collapsed (icons only)? Screens read it to decide how many columns fit. */
export const SidebarOpenContext = createContext(true);

export function useSidebarOpen(): boolean {
  return useContext(SidebarOpenContext);
}
