// components/mobile/sections/MobileHomeNotice.tsx
"use client";

import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import { homeCopy } from "@/config/mobile-home";

/** The reminder about the payout day (every 1st); tapping it opens the calendar. */
export function MobileHomeNotice() {
  const href = useMobileHref();
  return (
    <Link
      href={href({ route: "calendar" })}
      className="flex items-center gap-3 rounded-[14px] border border-brand/25 bg-brand-soft/60 p-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-soft"
    >
      <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-card text-brand">
        <CalendarCheck2 className="size-6" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] leading-snug font-bold text-brand">{homeCopy.notice.title}</span>
        <span className="block text-[13px] leading-snug text-ink-soft">{homeCopy.notice.text}</span>
      </span>
    </Link>
  );
}
