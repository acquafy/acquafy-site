"use client";
import { useEffect } from "react";
// Remove legacy business drafts, including unscoped bank details, on entry to the real portal.
export function ClearDemo() {
  useEffect(() => {
    try {
      for (const key of Object.keys(localStorage))
        if (key.startsWith("acquafy:")) localStorage.removeItem(key);
    } catch {
      /* Storage may be disabled. */
    }
  }, []);
  return null;
}
