// components/mobile/ui/ios/MobileConfirmSheet.tsx
"use client";

import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useOverlay } from "./useOverlay";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  /** Extra content between the description and the buttons (the document being deleted…). */
  children?: ReactNode;
  confirmLabel: string;
  /** Red button, for destructive confirmations. */
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const BTN = "ios-row flex min-h-11 items-center justify-center px-3 text-[17px] leading-[22px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

/**
 * iOS alert: a centred glass panel (≈ 300pt) with the title, message and text buttons separated by hairlines (side by side
 * when both labels are short, stacked otherwise). The confirm button is bold, red when `danger`.
 */
export function MobileConfirmSheet({ open, title, description, children, confirmLabel, danger = false, onConfirm, onCancel }: Props) {
  const titleId = useId();
  const descId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const { root, trapTab, visible, closing } = useOverlay({ open, onClose: onCancel, panel, exitMs: 220 });
  if (!root || !visible) return null;
  const stacked = confirmLabel.length > 12 || !!children;

  return createPortal(
    <div className="pointer-events-auto absolute inset-0 grid place-items-center overflow-hidden px-6" data-platform-sheet="ios">
      <div aria-hidden="true" onClick={onCancel} className={cn("absolute inset-0 bg-black/35", closing ? "animate-[ios-scrim-out_0.2s_ease-in_forwards]" : "animate-[ios-scrim-in_0.25s_ease-out]")} />
      <div
        ref={panel}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        onKeyDown={trapTab}
        className={cn(
          "ios-glass-thick ios-sq relative w-full max-w-[300px] overflow-hidden rounded-[26px] text-ink outline-none",
          closing ? "animate-[ios-alert-out_0.2s_ease-in_forwards]" : "animate-[ios-alert-in_0.35s_var(--ios-spring)]",
        )}
      >
        <div className="px-5 pt-5 pb-4 text-center">
          <h2 id={titleId} className="text-[17px] leading-[22px] font-semibold">
            {title}
          </h2>
          {description && (
            <p id={descId} className="mt-1 text-[13px] leading-[18px] text-ink-soft">
              {description}
            </p>
          )}
          {children && <div className="mt-3 text-center [&_p]:text-[13px]">{children}</div>}
        </div>
        <div className={cn("border-t border-ink/10", stacked ? "grid" : "grid grid-cols-2")}>
          <button type="button" onClick={onCancel} className={cn(BTN, "text-brand", stacked ? "order-2 border-t border-ink/10" : "border-r border-ink/10")}>
            Cancelar
          </button>
          <button type="button" onClick={onConfirm} className={cn(BTN, "font-semibold", danger ? "text-danger" : "text-brand")}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    root,
  );
}
