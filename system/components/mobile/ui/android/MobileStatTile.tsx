// components/mobile/ui/android/MobileStatTile.tsx
"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { cn } from "@/lib/cn";
import type { MobileTarget } from "@/lib/mobile/platform";

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

/**
 * Headline figure as a Material card: tonal container (20px), icon in a circle, Label Large caption, the number in an emphasized headline. It is
 * its own size container, so the number scales with the tile (`cqw`). A selected filter tile takes `secondary-container`.
 */
export function MobileStatTile({ icon, tone, label, value, caption, href, onClick, selected, className }: Props) {
  const resolve = useMobileHref();
  const pressable = !!href || !!onClick;
  const body = (
    <>
      {pressable && <Ripple />}
      <span className="@container relative block p-3">
        <span className="flex items-center justify-between">
          <IconTile icon={icon} tone={tone} className="size-[clamp(2.25rem,24cqw,2.75rem)] !rounded-full" />
          {pressable && <ChevronRight className="size-5 text-(--md-on-surface-variant)" aria-hidden="true" />}
        </span>
        <span className="md-label-l mt-2 block text-(--md-on-surface-variant)">{label}</span>
        <span className="tabular block text-[clamp(1.125rem,10.5cqw,1.5rem)] leading-tight font-bold tracking-tight whitespace-nowrap text-(--md-on-surface)">{value}</span>
        {caption && <span className="md-body-s block text-(--md-on-surface-variant)">{caption}</span>}
      </span>
    </>
  );
  const cls = cn(
    "relative block min-w-0 rounded-[20px] text-left transition-[border-radius,background-color] duration-300 ease-(--md-spring) focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--md-secondary)",
    selected ? "bg-(--md-secondary-container) text-(--md-on-secondary-container)" : "bg-(--md-surface-container) text-(--md-on-surface)",
    pressable && "active:rounded-[12px]",
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
