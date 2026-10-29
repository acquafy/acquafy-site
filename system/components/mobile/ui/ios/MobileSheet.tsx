// components/mobile/ui/ios/MobileSheet.tsx
"use client";

import { useId, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { cn } from "@/lib/cn";
import { useOverlay } from "./useOverlay";

type MobileSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** Buttons pinned to the bottom (above the home indicator). */
  footer?: ReactNode;
  /** `auto` hugs the content (the floating glass "medium" sheet); `full` is the tall, opaque "large" detent. */
  size?: "auto" | "full";
};

const EXIT_MS = 280;
const DISMISS_DRAG_PX = 90;

/**
 * iOS 26 sheet, inside the device frame (portalled to the frame's overlay layer, so it never covers the desktop page around the
 * phone). Partial detent: a Liquid Glass panel floating 8pt off the edges with large continuous corners; `full`: opaque, edge to
 * edge, smaller corners. Grabber, inline centred title, round close button; drag the header down to dismiss. Focus moves into the
 * sheet, Tab is trapped, Escape and the scrim close it, and focus returns to what opened it.
 * Tablet / foldable: a centred form sheet (540pt wide, 28pt corners, no grabber), as iPadOS presents sheets; `full` is the
 * taller, opaque page sheet.
 */
export function MobileSheet({ open, onClose, title, description, children, footer, size = "auto" }: MobileSheetProps) {
  const titleId = useId();
  const descId = useId();
  const drag = useRef<{ startY: number; dy: number } | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const { root, trapTab, visible, closing } = useOverlay({ open, onClose, panel, exitMs: EXIT_MS });
  const large = useDevice() !== "phone";

  if (!root || !visible) return null;
  const full = size === "full";

  const onDragStart = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { startY: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (panel.current) panel.current.style.animation = "none";
  };
  const onDragMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !panel.current) return;
    d.dy = Math.max(0, e.clientY - d.startY);
    panel.current.style.transform = `translateY(${d.dy}px)`;
  };
  const onDragEnd = () => {
    const d = drag.current;
    drag.current = null;
    if (!d || !panel.current) return;
    panel.current.style.transform = "";
    panel.current.style.animation = "";
    if (d.dy > DISMISS_DRAG_PX) onClose();
  };

  return createPortal(
    <div className="pointer-events-auto absolute inset-0 overflow-hidden" data-platform-sheet="ios">
      <div aria-hidden="true" onClick={onClose} className={cn("absolute inset-0 bg-black/35", closing ? "animate-[ios-scrim-out_0.26s_ease-in_forwards]" : "animate-[ios-scrim-in_0.3s_ease-out]")} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        onKeyDown={trapTab}
        className={cn(
          "ios-sq absolute flex flex-col text-ink outline-none",
          large
            ? cn(
                "inset-0 m-auto w-[540px] max-w-[calc(100%-32px)] rounded-[28px]",
                full ? "h-[calc(100%-var(--m-safe-top)-32px)] bg-(--ios-bg)" : "ios-glass-thick h-fit max-h-[calc(100%-var(--m-safe-top)-32px)]",
              )
            : full
              ? "inset-x-0 bottom-0 h-[calc(100%-var(--m-safe-top)-8px)] rounded-t-[34px] border border-b-0 border-line/70 bg-(--ios-bg)"
              : "ios-glass-thick inset-x-2 bottom-2 max-h-[calc(100%-var(--m-safe-top)-10px)] rounded-[38px]",
          closing
            ? large
              ? "animate-[ios-form-out_0.22s_ease-in_forwards]"
              : "animate-[ios-sheet-out_0.26s_cubic-bezier(0.5,0,0.75,0)_forwards]"
            : large
              ? "animate-[ios-form-in_0.45s_var(--ios-spring)]"
              : "animate-[ios-sheet-in_0.5s_var(--ios-spring)]",
        )}
      >
        <div onPointerDown={onDragStart} onPointerMove={onDragMove} onPointerUp={onDragEnd} onPointerCancel={onDragEnd} className="shrink-0 cursor-grab touch-none select-none">
          {large ? <span className="block h-2" aria-hidden="true" /> : <span aria-hidden="true" className="mx-auto mt-2 block h-[5px] w-9 rounded-full bg-ink-mute/40" />}
          <div className="flex items-center gap-2 px-3 pt-1.5 pb-2.5">
            <span className="size-11 shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1 text-center">
              <h2 id={titleId} className="text-[17px] leading-[22px] font-semibold text-ink">
                {title}
              </h2>
              {description && (
                <p id={descId} className="text-[13px] leading-[18px] text-ink-soft">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              className={cn("ios-press grid size-11 shrink-0 place-items-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-brand", full ? "ios-glass" : "")}
            >
              {full ? (
                <X className="size-5" strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <span className="grid size-8 place-items-center rounded-full bg-(--ios-fill-strong) text-ink-soft">
                  <X className="size-[17px]" strokeWidth={2.75} aria-hidden="true" />
                </span>
              )}
            </button>
          </div>
        </div>
        <div className={cn("min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4", footer ? "pb-4" : large ? "pb-5" : "pb-[max(16px,calc(var(--m-safe-bottom)-8px))]")}>
          {children}
        </div>
        {footer && <div className={cn("shrink-0 px-4 pt-1", large ? "pb-5" : "pb-[max(14px,calc(var(--m-safe-bottom)-8px))]")}>{footer}</div>}
      </div>
    </div>,
    root,
  );
}
