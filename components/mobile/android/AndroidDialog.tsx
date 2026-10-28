// components/mobile/android/AndroidDialog.tsx
"use client";

import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useModalLayer } from "./useModalLayer";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Extra content between the description and the actions. */
  children?: ReactNode;
  /** Text buttons, right-aligned (`MobileButton variant="ghost"`). */
  actions: ReactNode;
};

const EXIT_MS = 180;

/**
 * Material 3 basic dialog: centred over a 32% scrim, 28px radius, `surface-container-high`, headline 24, body medium and text buttons
 * aligned to the right. Portalled to the device frame's overlay layer like the sheets; same focus handling.
 */
export function AndroidDialog({ open, onClose, title, description, children, actions }: Props) {
  const titleId = useId();
  const descId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const { root, visible, closing, trapTab } = useModalLayer({ open, onClose, exitMs: EXIT_MS, panel });
  if (!root || !visible) return null;

  return createPortal(
    <div className="pointer-events-auto absolute inset-0 grid place-items-center overflow-hidden p-6" data-platform-sheet="android">
      <div aria-hidden="true" onClick={onClose} className={cn("absolute inset-0 bg-black/32", closing ? "animate-[md-scrim-out_0.18s_linear_forwards]" : "animate-[md-scrim-in_0.2s_linear]")} />
      <div
        ref={panel}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        onKeyDown={trapTab}
        className={cn(
          "relative flex max-h-full w-full max-w-[312px] flex-col rounded-[28px] bg-(--md-surface-container-high) p-6 text-(--md-on-surface) outline-none",
          closing ? "animate-[md-dialog-out_0.18s_var(--md-ease-accelerate)_forwards]" : "animate-[md-dialog-in_0.3s_var(--md-ease-decelerate)]",
        )}
      >
        <h2 id={titleId} className="md-headline-s">
          {title}
        </h2>
        {description && (
          <p id={descId} className="md-body-m mt-4 text-(--md-on-surface-variant)">
            {description}
          </p>
        )}
        {children && <div className="mt-4 min-h-0 overflow-y-auto overscroll-contain">{children}</div>}
        <div className="mt-6 flex flex-wrap justify-end gap-2">{actions}</div>
      </div>
    </div>,
    root,
  );
}
