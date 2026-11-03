// components/mobile/ui/android/MobileList.tsx
"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { cn } from "@/lib/cn";
import type { MobileTarget } from "@/lib/mobile/platform";

/**
 * Material 3 Expressive "segmented list": every row is its own tonal container, 2px apart, with 4px inner corners and 20px outer corners
 * (first/last row). A coloured Label Large header above and a Body Small footer below. Children are `MobileListRow`s.
 */
export function MobileListGroup({
  header,
  footer,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <section className={cn("min-w-0", className)}>
      {header && <h3 className="md-label-l mb-2 px-4 text-(--md-primary)">{header}</h3>}
      <ul aria-label={ariaLabel} className="flex flex-col gap-0.5 [&>li:first-child>*]:rounded-t-[20px] [&>li:last-child>*]:rounded-b-[20px]">
        {children}
      </ul>
      {footer && <p className="md-body-s mt-2 px-4 text-(--md-on-surface-variant)">{footer}</p>}
    </section>
  );
}

type RowProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: LucideIcon;
  tone?: Tone;
  /** Replaces the icon tile (an avatar, a flag…). */
  leading?: ReactNode;
  /** Secondary text on the right ("Português (Brasil)"). */
  value?: ReactNode;
  /** Control on the right (a switch, a badge). A row with `trailing` controls is not itself pressable. */
  trailing?: ReactNode;
  /** A mobile route (`{ route: "calendar" }`) or a literal URL. */
  href?: MobileTarget;
  external?: boolean;
  onClick?: () => void;
  /** Chevron on a pressable row (default true). */
  chevron?: boolean;
  /** Error-coloured title, for "Sair". */
  destructive?: boolean;
  disabled?: boolean;
  className?: string;
};

/** One row of a `MobileListGroup`: leading icon/avatar + headline/supporting text + value/control + chevron. Pressable with `href` or `onClick`. */
export function MobileListRow({ title, subtitle, icon, tone = "blue", leading, value, trailing, href, external, onClick, chevron = true, destructive, disabled, className }: RowProps) {
  const resolve = useMobileHref();
  const pressable = !!href || !!onClick;
  const body = (
    <>
      {pressable && <Ripple />}
      {leading ? <span className="relative shrink-0">{leading}</span> : icon && <IconTile icon={icon} tone={destructive ? "pink" : tone} className="relative size-10 !rounded-full" />}
      <span className="relative min-w-0 flex-1">
        <span className={cn("md-body-l block", destructive ? "text-(--md-error)" : "text-(--md-on-surface)")}>{title}</span>
        {subtitle && <span className="md-body-m block text-(--md-on-surface-variant)">{subtitle}</span>}
      </span>
      {value && <span className="md-label-l relative max-w-[45%] min-w-0 text-right text-(--md-on-surface-variant)">{value}</span>}
      {trailing && <span className="relative shrink-0">{trailing}</span>}
      {pressable && chevron && <ChevronRight className="relative size-6 shrink-0 text-(--md-on-surface-variant)" aria-hidden="true" />}
    </>
  );
  const rowCls = cn("relative flex min-h-14 w-full items-center gap-4 rounded-[4px] bg-(--md-surface-container) px-4 py-2 text-left text-(--md-on-surface)", className);
  const pressCls = "focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-(--md-secondary) disabled:opacity-40";

  if (href) {
    const Comp = external ? "a" : Link;
    const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <li>
        <Comp href={resolve(href)} className={cn(rowCls, pressCls)} {...extra}>
          {body}
        </Comp>
      </li>
    );
  }
  if (onClick) {
    return (
      <li>
        <button type="button" onClick={onClick} disabled={disabled} className={cn(rowCls, pressCls)}>
          {body}
        </button>
      </li>
    );
  }
  return (
    <li>
      <div className={rowCls}>{body}</div>
    </li>
  );
}
