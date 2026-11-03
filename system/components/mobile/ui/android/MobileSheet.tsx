// components/mobile/ui/android/MobileSheet.tsx
"use client";

import { useId, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { Ripple } from "@/components/mobile/android/Ripple";
import { useModalLayer } from "@/components/mobile/android/useModalLayer";
import { cn } from "@/lib/cn";

type MobileSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** Buttons pinned to the bottom (above the gesture area). */
  footer?: ReactNode;
  /** `auto` hugs the content (up to the screen); `full` is the tall expanded sheet. */
  size?: "auto" | "full";
};

const EXIT_MS = 250;
const DISMISS_DRAG_PX = 90;

/**
 * Material 3 modal bottom sheet, inside the device frame (portalled to the overlay layer of the frame, so it never covers the desktop page
 * around the phone): `surface-container-low`, 28px top radius, 32×4 drag handle, headline small title on the LEFT, a close icon button,
 * 32% scrim. Drag the handle/header down to dismiss. Focus moves into the sheet, Tab is trapped, Escape and the scrim close it, and focus
 * returns to what opened it.
 *
 * On a tablet or a foldable (`useDevice()`) it is the M3 modal SIDE sheet instead: a 400px panel on the right, full height, 28px radius on
 * the left corners, no handle (nothing to drag), sliding in from the right; the content, header and footer are the same.
 */
export function MobileSheet({ open, onClose, title, description, children, footer, size = "auto" }: MobileSheetProps) {
  const titleId = useId();
  const descId = useId();
  const drag = useRef<{ startY: number; dy: number } | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const side = useDevice() !== "phone";
  const { root, visible, closing, trapTab } = useModalLayer({ open, onClose, exitMs: EXIT_MS, panel });

  if (!root || !visible) return null;

  const onDragStart = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { startY: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (panel.current) panel.current.style.transition = "none";
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
    panel.current.style.transition = "";
    panel.current.style.transform = "";
    if (d.dy > DISMISS_DRAG_PX) onClose();
  };

  return createPortal(
    <div className="pointer-events-auto absolute inset-0 overflow-hidden" data-platform-sheet="android">
      <div aria-hidden="true" onClick={onClose} className={cn("absolute inset-0 bg-black/32", closing ? "animate-[md-scrim-out_0.25s_linear_forwards]" : "animate-[md-scrim-in_0.3s_linear]")} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        onKeyDown={trapTab}
        className={cn(
          "absolute flex flex-col bg-(--md-surface-container-low) text-(--md-on-surface) outline-none",
          side
            ? "inset-y-0 right-0 w-[400px] max-w-full rounded-l-[28px] pt-[calc(var(--m-safe-top)+8px)]"
            : cn("inset-x-0 bottom-0 rounded-t-[28px]", size === "full" ? "h-[calc(100%-var(--m-safe-top)-24px)]" : "max-h-[calc(100%-var(--m-safe-top)-24px)]"),
          side
            ? closing
              ? "animate-[md-side-out_0.25s_var(--md-ease-accelerate)_forwards]"
              : "animate-[md-side-in_0.4s_var(--md-ease-decelerate)]"
            : closing
              ? "animate-[md-sheet-down_0.25s_var(--md-ease-accelerate)_forwards]"
              : "animate-[md-sheet-up_0.45s_var(--md-ease-decelerate)]",
        )}
      >
        <div
          onPointerDown={side ? undefined : onDragStart}
          onPointerMove={side ? undefined : onDragMove}
          onPointerUp={side ? undefined : onDragEnd}
          onPointerCancel={side ? undefined : onDragEnd}
          className={cn("shrink-0", !side && "cursor-grab touch-none select-none")}
        >
          {!side && <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-8 rounded-full bg-(--md-on-surface-variant) opacity-40" />}
          <div className={cn("flex items-start gap-2 pr-1 pb-3", side ? "pt-1 pl-6" : "pt-3 pl-4")}>
            <div className="min-w-0 flex-1 pt-1">
              <h2 id={titleId} className="md-headline-s text-(--md-on-surface)">
                {title}
              </h2>
              {description && (
                <p id={descId} className="md-body-m mt-0.5 text-(--md-on-surface-variant)">
                  {description}
                </p>
              )}
            </div>
            <button type="button" aria-label="Fechar" onClick={onClose} className="md-icon-btn">
              <Ripple />
              <X className="relative size-6" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className={cn("min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain", side ? "px-6" : "px-4", footer ? "pb-4" : "pb-[calc(var(--m-safe-bottom)+16px)]")}>{children}</div>
        {footer && <div className={cn("shrink-0 border-t border-(--md-outline-variant)/60 pt-3 pb-[max(16px,var(--m-safe-bottom))]", side ? "px-6" : "px-4")}>{footer}</div>}
      </div>
    </div>,
    root,
  );
}
