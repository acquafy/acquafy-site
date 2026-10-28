// components/mobile/ui/ios/MobileSegmented.tsx
"use client";

import { useId, useRef, type KeyboardEvent } from "react";
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
 * iOS 26 segmented control: a capsule track with a glass "lens" that slides under the selected item. Radio-group
 * semantics, arrow keys move the selection. 44pt tall (touch target).
 */
export function MobileSegmented<T extends string>({ items, value, onChange, label, className }: Props<T>) {
  const group = useRef<HTMLDivElement>(null);
  const name = useId();
  const index = Math.max(
    0,
    items.findIndex((it) => it.id === value),
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const next = e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : (index + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    onChange(items[next].id);
    requestAnimationFrame(() => group.current?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus());
  };

  return (
    <div ref={group} role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className={cn("relative flex h-11 min-w-0 rounded-full bg-(--ios-fill) p-[3px]", className)}>
      <span
        aria-hidden="true"
        style={{ width: `calc((100% - 6px) / ${items.length})`, transform: `translateX(${index * 100}%)` }}
        className="ios-lens pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] rounded-full transition-transform duration-[350ms] ease-(--ios-spring)"
      />
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
              "relative z-10 min-w-0 flex-1 truncate rounded-full px-1.5 text-[15px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              on ? "font-semibold text-ink" : "font-medium text-ink-soft",
            )}
          >
            {it.label}
            {it.count !== undefined && <span className={cn("tabular ml-1 text-[13px]", on ? "text-ink-soft" : "text-ink-mute")}>{it.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
