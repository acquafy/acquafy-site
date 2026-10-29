// components/mobile/ui/ios/MobileActionSheet.tsx
"use client";

import { useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Check, type LucideIcon } from "lucide-react";
import { useDevice } from "@/components/mobile/PlatformProvider";
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
 * "Cancelar" button under it. Choosing an action closes the sheet, then runs it. On a tablet / foldable it is a popover: a floating
 * glass panel (320pt) anchored under the control that opened it (centred when there is no such control), with no Cancelar
 * (tapping outside dismisses), left-aligned rows and the icon / check on the right.
 */
const POPOVER_W = 320;
const POPOVER_EDGE = 12;

/**
 * Places the popover (inline style, no state): under the element that was focused when it opened (above it when there is no room),
 * in the frame's own (unscaled) pixels; centred when nothing in the page opened it. Runs in a layout effect, before `useOverlay`
 * moves the focus into the panel.
 */
function placePopover(panel: HTMLElement, root: HTMLElement) {
  const opener = document.activeElement as HTMLElement | null;
  const frame = root.getBoundingClientRect();
  const scale = frame.width / root.offsetWidth || 1;
  const { offsetWidth: W, offsetHeight: H } = root;
  const set = (left: number, top: string, maxHeight: number) => Object.assign(panel.style, { left: `${left}px`, top, bottom: "auto", maxHeight: `${maxHeight}px` });
  if (!opener || opener === document.body || root.contains(opener) || panel.contains(opener)) {
    set((W - POPOVER_W) / 2, `${Math.max(POPOVER_EDGE, (H - panel.offsetHeight) / 2)}px`, H - 2 * POPOVER_EDGE);
    return;
  }
  const r = opener.getBoundingClientRect();
  const [x, y, w, h] = [(r.left - frame.left) / scale, (r.top - frame.top) / scale, r.width / scale, r.height / scale];
  const left = Math.min(Math.max(x + w / 2 - POPOVER_W / 2, POPOVER_EDGE), W - POPOVER_W - POPOVER_EDGE);
  const below = y + h + 8;
  if (below < H * 0.55) set(left, `${below}px`, H - below - POPOVER_EDGE);
  else {
    // Above: as tall as it needs, bottom edge 8px over the control.
    const room = y - 8 - POPOVER_EDGE;
    set(left, `${Math.max(POPOVER_EDGE, y - 8 - Math.min(panel.offsetHeight, room))}px`, room);
  }
}

export function MobileActionSheet({ open, onClose, title, description, items }: Props) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const large = useDevice() !== "phone";
  const { root, trapTab, visible, closing } = useOverlay({ open, onClose, panel, exitMs: 280 });
  useLayoutEffect(() => {
    if (large && open && visible && root && panel.current) placePopover(panel.current, root);
  }, [large, open, visible, root]);
  if (!root || !visible) return null;

  if (large) {
    return createPortal(
      <div className="pointer-events-auto absolute inset-0 overflow-hidden" data-platform-sheet="ios">
        <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/10" />
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          onKeyDown={trapTab}
          style={{ width: POPOVER_W }}
          className={cn(
            "ios-glass-thick ios-sq absolute flex flex-col overflow-hidden rounded-[26px] text-ink outline-none",
            closing ? "animate-[ios-form-out_0.18s_ease-in_forwards]" : "animate-[ios-popover-in_0.3s_var(--ios-spring)]",
          )}
        >
          <div className="shrink-0 px-4 pt-3.5 pb-2.5">
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
                      "ios-row flex min-h-11 w-full items-center gap-2.5 px-4 text-left text-[17px] leading-[22px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand disabled:opacity-40",
                      it.danger ? "text-danger" : "text-ink",
                      it.selected && "font-semibold",
                    )}
                  >
                    <span className="min-w-0 flex-1">{it.label}</span>
                    {it.selected ? (
                      <Check className="size-5 shrink-0 text-brand" strokeWidth={2.75} aria-hidden="true" />
                    ) : (
                      Icon && <Icon className="size-5 shrink-0" strokeWidth={2} aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>,
      root,
    );
  }

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
