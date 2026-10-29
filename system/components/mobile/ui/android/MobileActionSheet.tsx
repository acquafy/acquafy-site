// components/mobile/ui/android/MobileActionSheet.tsx
"use client";

import { useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Check, type LucideIcon } from "lucide-react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { useModalLayer } from "@/components/mobile/android/useModalLayer";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { cn } from "@/lib/cn";
import { MobileSheet } from "./MobileSheet";

export type ActionSheetItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** Error-coloured label for destructive actions. */
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

const EXIT_MS = 180;
const MENU_MARGIN = 8;

function ActionItems({ items, onClose, dense = false }: { items: ActionSheetItem[]; onClose: () => void; dense?: boolean }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <li key={it.id}>
            <button
              type="button"
              disabled={it.disabled}
              aria-current={it.selected || undefined}
              onClick={() => {
                onClose();
                it.onSelect();
              }}
              className={cn(
                "md-body-l relative flex w-full items-center gap-4 rounded-[16px] px-4 text-left",
                dense ? "min-h-12" : "min-h-14",
                " transition-colors duration-200 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-(--md-secondary) disabled:opacity-40",
                it.selected ? "bg-(--md-secondary-container) font-medium text-(--md-on-secondary-container)" : it.danger ? "text-(--md-error)" : "text-(--md-on-surface)",
              )}
            >
              <Ripple />
              {Icon && (
                <Icon
                  className={cn("relative size-6 shrink-0", it.danger ? "text-(--md-error)" : it.selected ? "text-(--md-on-secondary-container)" : "text-(--md-on-surface-variant)")}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              )}
              <span className="relative min-w-0 flex-1">{it.label}</span>
              {it.selected && <Check className="relative size-6 shrink-0" strokeWidth={2.25} aria-hidden="true" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Tablet / foldable: the actions are a floating M3 menu (`surface-container`, 16px radius, 320px) instead of a bottom sheet. It opens
 * under the element that was focused when it opened (the button that asked for it), aligned to that button's nearer edge and flipped above
 * when there is no room, always inside the device frame; with no such element it is centred. A clear scrim only catches outside clicks.
 */
function ActionMenu({ open, onClose, title, description, items }: Props) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const { root, visible, closing, trapTab } = useModalLayer({ open, onClose, exitMs: EXIT_MS, panel });

  // Runs before the layer moves the focus into the menu, so `document.activeElement` is still the button that opened it.
  useLayoutEffect(() => {
    const menu = panel.current;
    if (!visible || !menu || !root || menu.dataset.placed) return;
    // The stage scales the whole device with a transform: convert viewport px to the frame's own px.
    const frame = root.getBoundingClientRect();
    const k = frame.width / root.offsetWidth || 1;
    const W = root.offsetWidth;
    const H = root.offsetHeight;
    const w = menu.offsetWidth;
    const h = menu.offsetHeight;
    const el = document.activeElement as HTMLElement | null;
    let left = (W - w) / 2;
    let top = (H - h) / 2;
    if (el && el !== document.body && root.parentElement?.contains(el)) {
      const r = el.getBoundingClientRect();
      const a = { left: (r.left - frame.left) / k, right: (r.right - frame.left) / k, top: (r.top - frame.top) / k, bottom: (r.bottom - frame.top) / k };
      left = (a.left + a.right) / 2 > W / 2 ? a.right - w : a.left;
      top = a.bottom + 4 + h + MENU_MARGIN <= H ? a.bottom + 4 : Math.max(MENU_MARGIN, a.top - 4 - h);
    }
    menu.style.left = `${Math.min(Math.max(MENU_MARGIN, left), W - w - MENU_MARGIN)}px`;
    menu.style.top = `${top}px`;
    menu.style.visibility = "visible";
    menu.dataset.placed = "true";
  }, [visible, root]);

  if (!root || !visible) return null;

  return createPortal(
    <div className="pointer-events-auto absolute inset-0 overflow-hidden" data-platform-sheet="android">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0" />
      <div
        ref={panel}
        role="menu"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trapTab}
        style={{ visibility: "hidden" }}
        className={cn(
          "absolute flex max-h-[calc(100%-16px)] w-80 max-w-[calc(100%-16px)] flex-col overflow-hidden rounded-[16px] border border-(--md-outline-variant)/60 bg-(--md-surface-container-highest) py-2 text-(--md-on-surface) outline-none",
          closing ? "animate-[md-scrim-out_0.18s_linear_forwards]" : "animate-[md-menu-in_0.2s_var(--md-ease-decelerate)]",
        )}
      >
        <div className="px-4 pt-2 pb-2">
          <h2 id={titleId} className="md-label-l text-(--md-on-surface-variant)">
            {title}
          </h2>
          {description && <p className="md-body-s mt-0.5 text-(--md-on-surface-variant)">{description}</p>}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2">
          <ActionItems items={items} onClose={onClose} dense />
        </div>
      </div>
    </div>,
    root,
  );
}

/**
 * Material 3 bottom sheet with a list of actions (or of options, with `selected`): 56px items, leading icon, check on the chosen one.
 * Choosing one closes the sheet, then runs it. On a tablet or a foldable it is a floating menu next to the button that opened it.
 */
export function MobileActionSheet(props: Props) {
  const wide = useDevice() !== "phone";
  if (wide) return <ActionMenu {...props} />;
  return (
    <MobileSheet open={props.open} onClose={props.onClose} title={props.title} description={props.description}>
      <ActionItems items={props.items} onClose={props.onClose} />
    </MobileSheet>
  );
}
