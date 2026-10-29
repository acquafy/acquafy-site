// components/mobile/ui/android/MobileActionSheet.tsx
"use client";

import { Check, type LucideIcon } from "lucide-react";
import { Ripple } from "@/components/mobile/android/Ripple";
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

/** Material 3 bottom sheet with a list of actions (or of options, with `selected`): 56px items, leading icon, check on the chosen one. Choosing one closes the sheet, then runs it. */
export function MobileActionSheet({ open, onClose, title, description, items }: Props) {
  return (
    <MobileSheet open={open} onClose={onClose} title={title} description={description}>
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
                  "md-body-l relative flex min-h-14 w-full items-center gap-4 rounded-[16px] px-4 text-left transition-colors duration-200 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-(--md-secondary) disabled:opacity-40",
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
    </MobileSheet>
  );
}
