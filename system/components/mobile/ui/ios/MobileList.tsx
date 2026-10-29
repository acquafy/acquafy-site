// components/mobile/ui/ios/MobileList.tsx
"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import type { Tone } from "@/components/ui/KpiCard";
import { cn } from "@/lib/cn";
import type { MobileTarget } from "@/lib/mobile/platform";
import { IosTile } from "./IosTile";

/** iOS inset-grouped list: an opaque rounded block (26pt corners) with hairline separators. Children are `MobileListRow`s. */
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
      {header && <h3 className="mb-1.5 px-4 text-[13px] leading-[18px] tracking-[0.01em] text-ink-mute uppercase">{header}</h3>}
      <ul aria-label={ariaLabel} className="ios-sq overflow-hidden rounded-[26px] border border-line/70 bg-card">
        {children}
      </ul>
      {footer && <p className="mt-1.5 px-4 text-[13px] leading-[18px] text-ink-soft">{footer}</p>}
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
  /** Red title, for "Sair". */
  destructive?: boolean;
  disabled?: boolean;
  className?: string;
};

/** One row of a `MobileListGroup`: icon tile + title/subtitle + value/control + chevron. The hairline starts after the icon. Pressable with `href` or `onClick`. */
export function MobileListRow({ title, subtitle, icon, tone = "blue", leading, value, trailing, href, external, onClick, chevron = true, destructive, disabled, className }: RowProps) {
  const resolve = useMobileHref();
  const hasLead = !!(leading ?? icon);
  const body = (
    <>
      {leading ?? (icon && <IosTile icon={icon} tone={destructive ? "pink" : tone} size="sm" />)}
      <span className="min-w-0 flex-1">
        <span className={cn("block text-[17px] leading-[22px]", destructive ? "text-danger" : "text-ink")}>{title}</span>
        {subtitle && <span className="block text-[13px] leading-[18px] text-ink-soft">{subtitle}</span>}
      </span>
      {value && <span className="max-w-[45%] min-w-0 text-right text-[17px] leading-[22px] text-ink-soft">{value}</span>}
      {trailing}
    </>
  );
  const rowCls = cn("flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left", className);
  const pressCls = "ios-row focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand disabled:opacity-50";
  const chev = chevron && <ChevronRight className="-mr-1 size-[18px] shrink-0 text-ink-mute/70" strokeWidth={2.5} aria-hidden="true" />;
  // Separator: a hairline under every row but the last, starting after the icon (16 + 29 + 12 = 57pt) or at the text edge.
  const liCls = "relative after:absolute after:right-0 after:bottom-0 after:left-(--sep) after:h-px after:bg-line last:after:hidden";
  const liStyle = { "--sep": hasLead ? "57px" : "16px" } as CSSProperties;

  if (href) {
    const Comp = external ? "a" : Link;
    const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <li className={liCls} style={liStyle}>
        <Comp href={resolve(href)} className={cn(rowCls, pressCls)} {...extra}>
          {body}
          {chev}
        </Comp>
      </li>
    );
  }
  if (onClick) {
    return (
      <li className={liCls} style={liStyle}>
        <button type="button" onClick={onClick} disabled={disabled} className={cn(rowCls, pressCls)}>
          {body}
          {chev}
        </button>
      </li>
    );
  }
  return (
    <li className={liCls} style={liStyle}>
      <div className={rowCls}>{body}</div>
    </li>
  );
}
