// components/ui/Menu.tsx
"use client";

import Link from "next/link";
import { useRef, type KeyboardEvent } from "react";
import { MoreHorizontal, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "./IconButton";
import { Popover } from "./Popover";

export type MenuItem = {
  label: string;
  icon?: LucideIcon;
  /** Runs when chosen. Use `href` instead for navigation. */
  onSelect?: () => void;
  href?: string;
  /** Opens `href` in a new tab. */
  external?: boolean;
  tone?: "danger";
  disabled?: boolean;
  /** Draws a divider above this item. */
  separatorBefore?: boolean;
};

const ITEM = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[14.5px] font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

export function MenuItems({ items, close }: { items: MenuItem[]; close: () => void }) {
  const list = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    const nodes = Array.from(list.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? []);
    const i = nodes.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") nodes[(i + 1) % nodes.length]?.focus();
    else if (e.key === "ArrowUp") nodes[(i - 1 + nodes.length) % nodes.length]?.focus();
    else if (e.key === "Home") nodes[0]?.focus();
    else if (e.key === "End") nodes[nodes.length - 1]?.focus();
    else return;
    e.preventDefault();
  };

  return (
    <div ref={list} onKeyDown={onKeyDown}>
      {items.map((item) => {
        const Icon = item.icon;
        const cls = cn(ITEM, item.tone === "danger" ? "text-danger hover:bg-danger-soft" : "text-ink hover:bg-brand-soft", item.disabled && "pointer-events-none opacity-45");
        const inner = (
          <>
            {Icon && <Icon className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />}
            {item.label}
          </>
        );
        return (
          <div key={item.label}>
            {item.separatorBefore && <hr className="my-1 border-line" />}
            {item.href ? (
              item.external ? (
                <a role="menuitem" href={item.href} target="_blank" rel="noopener noreferrer" aria-disabled={item.disabled} className={cls} onClick={close}>
                  {inner}
                </a>
              ) : (
                <Link role="menuitem" href={item.href} aria-disabled={item.disabled} className={cls} onClick={close}>
                  {inner}
                </Link>
              )
            ) : (
              <button
                type="button"
                role="menuitem"
                aria-disabled={item.disabled}
                className={cls}
                onClick={() => {
                  close();
                  item.onSelect?.();
                }}
              >
                {inner}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

type MenuProps = {
  /** Accessible name of the trigger, e.g."Ações do purificador AU2401A3567". */
  label: string;
  items: MenuItem[];
  icon?: LucideIcon;
  bordered?: boolean;
  align?: "start" | "end";
};

/** The "…" row-actions menu. */
export function Menu({ label, items, icon = MoreHorizontal, bordered = true, align = "end" }: MenuProps) {
  return (
    <Popover role="menu" label={label} align={align} panelClassName="min-w-52" trigger={(props) => <IconButton icon={icon} label={label} bordered={bordered} {...props} />}>
      {({ close }) => <MenuItems items={items} close={close} />}
    </Popover>
  );
}
