// components/mobile/ui/ios/MobileActionSheet.tsx
"use client";

import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { useOverlay } from "./useOverlay";

export type ActionSheetItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** Red label for destructive actions. */
  danger?: boolean;
  /** Shows a check mark (a selected option of a picker). */
  selected?: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  items: ActionSheetItem[];
};

/**
 * iOS 26 action sheet: a floating glass block (title + centred actions) inset from the screen edges, and a separate glass
 * "Cancelar" button under it. Choosing an action closes the sheet, then runs it.
 */
export function MobileActionSheet({ open, onClose, title, description, items }: Props) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const { root, trapTab, visible, closing } = useOverlay({ open, onClose, panel, exitMs: 280 });
  if (!root || !visible) return null;

  return createPortal(
    <div className="pointer-events-auto absolute inset-0 overflow-hidden" data-platform-sheet="ios">
      <div aria-hidden="true" onClick={onClose} className={cn("absolute inset-0 bg-black/35", closing ? "animate-[ios-scrim-out_0.26s_ease-in_forwards]" : "animate-[ios-scrim-in_0.3s_ease-out]")} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trapTab}
        className={cn(
          "absolute inset-x-2 bottom-[max(8px,calc(var(--m-safe-bottom)-8px))] flex max-h-[calc(100%-var(--m-safe-top)-10px)] flex-col gap-2 outline-none",
          closing ? "animate-[ios-sheet-out_0.26s_cubic-bezier(0.5,0,0.75,0)_forwards]" : "animate-[ios-sheet-in_0.5s_var(--ios-spring)]",
        )}
      >
        <div className="ios-glass-thick ios-sq flex min-h-0 flex-col overflow-hidden rounded-[26px]">
          <div className="shrink-0 px-4 py-3 text-center">
            <h2 id={titleId} className="text-[13px] leading-[18px] font-semibold text-ink-soft">
              {title}
            </h2>
            {description && <p className="text-[13px] leading-[18px] text-ink-soft">{description}</p>}
          </div>
          <ul className="m-noscrollbar min-h-0 overflow-y-auto overscroll-contain">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <li key={it.id} className="border-t border-ink/10">
                  <button
                    type="button"
                    disabled={it.disabled}
                    aria-current={it.selected || undefined}
                    onClick={() => {
                      onClose();
                      it.onSelect();
                    }}
                    className={cn(
                      "ios-row relative flex min-h-14 w-full items-center justify-center gap-2.5 px-12 text-center text-[19px] leading-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand disabled:opacity-40",
                      it.danger ? "text-danger" : "text-brand",
                      it.selected && "font-semibold",
                    )}
                  >
                    {Icon && <Icon className="size-5 shrink-0" strokeWidth={2} aria-hidden="true" />}
                    <span className="min-w-0">{it.label}</span>
                    {it.selected && <Check className="absolute right-4 size-5 shrink-0" strokeWidth={2.75} aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ios-glass-thick ios-sq ios-press min-h-14 shrink-0 rounded-[26px] text-[19px] leading-6 font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Cancelar
        </button>
      </div>
    </div>,
    root,
  );
}
