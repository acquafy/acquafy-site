// components/mobile/ui/ios/MobileStatTile.tsx
"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import type { Tone } from "@/components/ui/KpiCard";
import { cn } from "@/lib/cn";
import type { MobileTarget } from "@/lib/mobile/platform";
import { IosTile } from "./IosTile";

type Props = {
  icon: LucideIcon;
  tone: Tone;
  label: string;
  /** Pass a node (`<Money />`) so the figure follows the selected currency. */
  value: ReactNode;
  caption?: ReactNode;
  /** Pressable: a link (mobile route or literal URL)… */
  href?: MobileTarget;
  /** …or a button (filters). */
  onClick?: () => void;
  selected?: boolean;
  className?: string;
};

/** Headline figure (widget-like): icon tile, label, value. It is its own size container, so the number scales with the tile (`cqw`). */
export function MobileStatTile({ icon, tone, label, value, caption, href, onClick, selected, className }: Props) {
  const resolve = useMobileHref();
  const pressable = !!href || !!onClick;
  const body = (
    <span className="@container block p-3.5">
      <span className="flex items-center justify-between">
        <IosTile icon={icon} tone={tone} size="md" />
        {pressable && <ChevronRight className="size-[18px] text-ink-mute/70" strokeWidth={2.5} aria-hidden="true" />}
      </span>
      <span className="mt-2.5 block text-[13px] leading-[18px] font-medium text-ink-soft">{label}</span>
      <span className="tabular block text-[clamp(1.125rem,10.5cqw,1.5rem)] leading-tight font-bold tracking-tight whitespace-nowrap text-ink">{value}</span>
      {caption && <span className="block text-[12px] leading-4 text-ink-mute">{caption}</span>}
    </span>
  );
  const cls = cn(
    "ios-sq block min-w-0 rounded-[22px] border text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    selected ? "border-brand bg-brand-soft" : "border-transparent bg-card",
    pressable && "ios-press",
    className,
  );

  if (href)
    return (
      <Link href={resolve(href)} className={cls}>
        {body}
      </Link>
    );
  if (onClick)
    return (
      <button type="button" onClick={onClick} aria-pressed={selected} className={cn(cls, "w-full")}>
        {body}
      </button>
    );
  return <div className={cls}>{body}</div>;
}
