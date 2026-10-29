// components/ui/useDraft.ts
"use client";

import { useCallback, useState } from "react";

/**
 * Edit buffer over a stored record. Only the fields the user touched are kept, so the form always reflects the
 * latest stored values (even ones that load from localStorage after mount) until the user changes them.
 */
export function useDraft<T extends Record<string, string>>(base: T) {
  const [edits, setEdits] = useState<Partial<T>>({});
  const values = { ...base, ...edits } as T;
  const set = useCallback(<K extends keyof T>(key: K, value: T[K]) => setEdits((e) => ({ ...e, [key]: value })), []);
  const reset = useCallback(() => setEdits({}), []);
  const dirty = (Object.keys(edits) as (keyof T)[]).some((k) => edits[k] !== base[k]);
  return { values, edits, set, reset, dirty };
}
