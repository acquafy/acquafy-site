// components/ui/Popover.tsx
"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";

export type PopoverTriggerProps = {
  ref: RefObject<HTMLButtonElement | null>;
  "aria-haspopup": "menu" | "dialog";
  "aria-expanded": boolean;
  "aria-controls": string;
  onClick: () => void;
};

type PopoverProps = {
  /** Renders the trigger; spread `props` onto a <button>. */
  trigger: (props: PopoverTriggerProps, state: { open: boolean }) => ReactNode;
  children: ReactNode | ((api: { close: () => void }) => ReactNode);
  role?: "menu" | "dialog";
  /** Accessible name of the panel. */
  label: string;
  align?: "start" | "end";
  className?: string;
  panelClassName?: string;
};

/**
 * Anchored panel: closes on outside click, on Escape (returning focus to the trigger) and on focus leaving.
 * Menu, notifications, currency and user menus are all built on it.
 */
export function Popover({ trigger, children, role = "dialog", label, align = "end", className, panelClassName }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapper = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className={cn("relative", className)}
      onBlur={(e) => {
        if (open && !wrapper.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      {trigger({ ref: triggerRef, "aria-haspopup": role, "aria-expanded": open, "aria-controls": id, onClick: () => setOpen((v) => !v) }, { open })}
      {open && (
        <div
          id={id}
          role={role}
          aria-label={label}
          className={cn("absolute top-[calc(100%+0.5rem)] z-40 min-w-56 rounded-xl border border-line bg-card p-1.5", align === "end" ? "right-0" : "left-0", panelClassName)}
        >
          {typeof children === "function" ? children({ close }) : children}
        </div>
      )}
    </div>
  );
}
