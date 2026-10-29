// components/ui/Tabs.tsx
"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type TabItem<T extends string> = { id: T; label: string; icon?: LucideIcon; count?: number };

type TabsProps<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Accessible name of the tablist. */
  label: string;
  /** Prefix that links tabs to their panel: render `<TabPanel idPrefix=… value=…>` with the same one. */
  idPrefix: string;
  variant?: "pill" | "segment" | "stack";
  className?: string;
};

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string) => `${prefix}-panel`;

const LIST = {
  pill: "flex flex-wrap gap-2",
  segment: "grid auto-cols-fr grid-flow-col overflow-hidden rounded-lg border border-line bg-card",
  stack: "grid auto-cols-fr grid-flow-col border-y border-line bg-canvas/50",
} as const;

const TAB = {
  pill: (on: boolean) => cn("flex items-center gap-2 rounded-full px-5 py-2 text-[14.5px] font-semibold", on ? "bg-brand text-white" : "bg-canvas text-ink-soft hover:bg-brand-soft"),
  segment: (on: boolean) => cn("flex items-center justify-center gap-2 px-4 py-2.5 text-[14.5px] font-semibold", on ? "bg-brand text-white" : "text-ink-soft hover:bg-brand-soft"),
  stack: (on: boolean) => cn("flex flex-col items-center gap-1 px-1 py-2.5 text-[12.5px] font-semibold", on ? "bg-brand text-white" : "text-ink-soft hover:bg-brand-soft"),
} as const;

/** Accessible tablist (arrow keys / Home / End move between tabs). */
export function Tabs<T extends string>({ items, value, onChange, label, idPrefix, variant = "pill", className }: TabsProps<T>) {
  const list = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    const i = items.findIndex((t) => t.id === value);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(items[next].id);
    list.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div ref={list} role="tablist" aria-label={label} onKeyDown={onKeyDown} className={cn(LIST[variant], className)}>
      {items.map(({ id, label: text, icon: Icon, count }) => {
        const on = id === value;
        return (
          <button
            key={id}
            id={tabId(idPrefix, id)}
            role="tab"
            type="button"
            aria-selected={on}
            aria-controls={panelId(idPrefix)}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(id)}
            className={cn("transition focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand", TAB[variant](on))}
          >
            {Icon && <Icon className={variant === "stack" ? "size-[18px]" : "size-5"} aria-hidden="true" />}
            {text}
            {count !== undefined && <span className="tabular opacity-80">({count})</span>}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ idPrefix, value, children, className }: { idPrefix: string; value: string; children: ReactNode; className?: string }) {
  return (
    <div id={panelId(idPrefix)} role="tabpanel" aria-labelledby={tabId(idPrefix, value)} tabIndex={0} className={cn("focus-visible:outline-2 focus-visible:outline-brand", className)}>
      {children}
    </div>
  );
}
