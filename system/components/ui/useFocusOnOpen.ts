// components/ui/useFocusOnOpen.ts
"use client";

import { useEffect, type RefObject } from "react";

const FIELD = "input:not([readonly]):not([disabled]):not([type=hidden]):not([type=checkbox]), select:not([disabled]), textarea:not([disabled])";

/** Moves focus to the first editable field inside `ref` when a modal opens (native dialogs would pick the close button). */
export function useFocusOnOpen(open: boolean, ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    if (open) ref.current?.querySelector<HTMLElement>(FIELD)?.focus();
  }, [open, ref]);
}

/** After a failed submit: focus the first field flagged `aria-invalid` so the error is announced in context. */
export function focusFirstInvalid(root: HTMLElement | null): void {
  window.setTimeout(() => root?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 30);
}
