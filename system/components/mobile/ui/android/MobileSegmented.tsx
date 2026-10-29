// components/mobile/ui/android/MobileSegmented.tsx
"use client";

import { useId, useRef, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { cn } from "@/lib/cn";

export type SegmentItem<T extends string> = { id: T; label: string; count?: number };

type Props<T extends string> = {
  items: SegmentItem<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Accessible name of the group ("Filtro de repasses"). */
  label: string;
  className?: string;
};

/**
 * Material 3 segmented button: a pill with a 1px `outline` border, equal-width segments split by dividers, the selected one filled with
 * `secondary-container` and a check mark (when the width allows it). Radio-group semantics, arrow keys move the selection.
 */
export function MobileSegmented<T extends string>({ items, value, onChange, label, className }: Props<T>) {
  const group = useRef<HTMLDivElement>(null);
  const name = useId();

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const i = items.findIndex((it) => it.id === value);
    const next = e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    onChange(items[next].id);
    requestAnimationFrame(() => group.current?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus());
  };

  return (
    <div ref={group} role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className={cn("@container flex h-12 min-w-0 overflow-hidden rounded-full border border-(--md-outline)", className)}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            role="radio"
            name={name}
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(it.id)}
            className={cn(
              "md-label-l relative flex min-w-0 flex-1 items-center justify-center gap-2 border-(--md-outline) px-2 transition-colors duration-200 not-first:border-l focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-(--md-secondary)",
              on ? "bg-(--md-secondary-container) text-(--md-on-secondary-container)" : "text-(--md-on-surface)",
            )}
          >
            <Ripple />
            {on && <Check className="relative hidden size-[18px] shrink-0 @[22rem]:block" strokeWidth={2.5} aria-hidden="true" />}
            <span className="relative min-w-0 truncate">{it.label}</span>
            {it.count !== undefined && <span className="md-label-m tabular relative shrink-0 opacity-75">{it.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
