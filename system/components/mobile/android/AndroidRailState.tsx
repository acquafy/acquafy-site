// components/mobile/android/AndroidRailState.tsx
"use client";

import { createContext, useContext } from "react";

/** Is the tablet / foldable navigation rail expanded (icon + label side by side) or collapsed (icons with a label below)? Screens read it to decide how many columns fit. */
export const RailOpenContext = createContext(false);

export function useRailOpen(): boolean {
  return useContext(RailOpenContext);
}
