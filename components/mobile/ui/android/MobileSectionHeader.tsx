// components/mobile/ui/android/MobileSectionHeader.tsx
"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { cn } from "@/lib/cn";
import type { MobileTarget } from "@/lib/mobile/platform";

type Action = { label: string; href?: MobileTarget; onClick?: () => void };

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: LucideIcon;
  tone?: Tone;
  /** "Ver todos" on the right: a link (`href`) or a button (`onClick`), drawn as a Material text button. */
  action?: Action;
  /** Heading level: 2 for page sections (Title Large), 3 inside a card (Title Medium). */
  level?: 2 | 3;
  className?: string;
};

const ACTION_CLS =
  "md-label-l relative -mr-2 inline-flex h-10 shrink-0 items-center gap-1 rounded-full px-3 text-(--md-primary) before:absolute before:inset-x-0 before:-inset-y-1 before:content-[''] focus-visible:outline-3 focus-visible:outline-(--md-secondary) active:rounded-xl transition-[border-radius] duration-300 ease-(--md-spring)";

/** Title row of a block: optional icon in a tonal circle, heading (Title Large) with optional supporting text, and a "Ver todos" text-button action. */
export function MobileSectionHeader({ title, subtitle, icon, tone = "blue", action, level = 2, className }: Props) {
  const Heading = level === 2 ? "h2" : "h3";
  const resolve = useMobileHref();
  const actionBody = (
    <>
      <Ripple />
      <span className="relative">{action?.label}</span>
      <ChevronRight className="relative -mr-1 size-[18px]" strokeWidth={2.25} aria-hidden="true" />
    </>
  );
  return (
    <div className={cn("flex min-h-12 items-center gap-3", className)}>
      {icon && <IconTile icon={icon} tone={tone} className="size-10 !rounded-full" />}
      <div className="min-w-0 flex-1">
        <Heading className={cn(level === 2 ? "md-title-l md-title-l-em" : "md-title-m md-title-m-em", "text-(--md-on-surface)")}>{title}</Heading>
        {subtitle && <p className="md-body-m text-(--md-on-surface-variant)">{subtitle}</p>}
      </div>
      {action &&
        (action.href ? (
          <Link href={resolve(action.href)} className={ACTION_CLS}>
            {actionBody}
          </Link>
        ) : (
          <button type="button" onClick={action.onClick} className={ACTION_CLS}>
            {actionBody}
          </button>
        ))}
    </div>
  );
}
