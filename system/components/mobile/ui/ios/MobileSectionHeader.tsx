// components/mobile/ui/ios/MobileSectionHeader.tsx
"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import type { Tone } from "@/components/ui/KpiCard";
import { cn } from "@/lib/cn";
import type { MobileTarget } from "@/lib/mobile/platform";
import { IosTile } from "./IosTile";

type Action = { label: string; href?: MobileTarget; onClick?: () => void };

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: LucideIcon;
  tone?: Tone;
  /** "Ver todos ›" on the right: a link (`href`) or a button (`onClick`). */
  action?: Action;
  /** Heading level: 2 for page sections (Headline, 17pt semibold), 3 inside a card (16pt). */
  level?: 2 | 3;
  className?: string;
};

const ACTION_CLS = "ios-press -mr-1.5 inline-flex min-h-11 shrink-0 items-center rounded-full px-1.5 text-[15px] text-brand focus-visible:outline-2 focus-visible:outline-brand active:opacity-50";

/** Title row of a block: optional icon tile, heading, and a plain "Ver todos ›" action. */
export function MobileSectionHeader({ title, subtitle, icon, tone = "blue", action, level = 2, className }: Props) {
  const Heading = level === 2 ? "h2" : "h3";
  const resolve = useMobileHref();
  return (
    <div className={cn("flex min-h-11 items-center gap-2.5", className)}>
      {icon && <IosTile icon={icon} tone={tone} size="md" />}
      <div className="min-w-0 flex-1">
        <Heading className={cn("leading-tight font-semibold text-ink", level === 2 ? "text-[17px] tracking-[-0.1px]" : "text-[16px]")}>{title}</Heading>
        {subtitle && <p className="text-[13px] leading-[18px] text-ink-soft">{subtitle}</p>}
      </div>
      {action &&
        (action.href ? (
          <Link href={resolve(action.href)} className={ACTION_CLS}>
            {action.label}
            <ChevronRight className="size-[18px]" strokeWidth={2.25} aria-hidden="true" />
          </Link>
        ) : (
          <button type="button" onClick={action.onClick} className={ACTION_CLS}>
            {action.label}
            <ChevronRight className="size-[18px]" strokeWidth={2.25} aria-hidden="true" />
          </button>
        ))}
    </div>
  );
}
