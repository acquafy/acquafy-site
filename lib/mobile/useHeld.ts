// lib/mobile/useHeld.ts
"use client";

import { useState } from "react";

/**
 * Keeps showing the last non-null value after it becomes null. A sheet is "open" while its record is set and closes when
 * the record is cleared; holding the record lets the content stay on screen during the slide-out animation.
 */
export function useHeld<T>(value: T | null): T | null {
  const [held, setHeld] = useState<T | null>(value);
  if (value !== null && value !== held) setHeld(value);
  return value ?? held;
}
