// components/mobile/android/AndroidTopBar.tsx
"use client";

import Link from "next/link";
import { forwardRef, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { MobileLogo } from "@/components/mobile/ui/MobileLogo";
import { cn } from "@/lib/cn";
import { Ripple } from "./Ripple";

export type AndroidTopBarProps = {
  /** Title of the small bar: always visible on pushed screens, faded in on tab roots once the large headline has scrolled away. */
  title: string;
  /** Pushed screen, or the headline has scrolled under the bar: the small title is shown (and the logo hidden). */
  collapsed: boolean;
  /** Content is scrolling under the bar: the container turns from `surface` to `surface-container` (tonal, no shadow). */
  elevated: boolean;
  /** Pushed screen: back arrow on the left. Without it the Acquafy logo is shown (tab roots). */
  back?: { href: string; label: string };
  /** Right side: bell + avatar on tab roots, or screen-specific actions. */
  actions?: ReactNode;
};

/**
 * Material 3 top app bar, small (64px + status bar). Sticky at the top of the scroll area. On a tab root the headline below it is the
 * "large flexible" title and this bar cross-fades the logo into the small title as it collapses; on a pushed screen the bar carries the
 * back arrow and the title directly.
 */
export const AndroidTopBar = forwardRef<HTMLElement, AndroidTopBarProps>(function AndroidTopBar({ title, collapsed, elevated, back, actions }, ref) {
  return (
    <header ref={ref} className={cn("sticky top-0 z-20 pt-(--m-safe-top) transition-colors duration-200", elevated ? "bg-(--md-surface-container)" : "bg-(--md-surface)")}>
      <div className="relative flex h-16 items-center gap-1 pr-1 pl-4 text-(--md-on-surface)">
        {back ? (
          <>
            <Link href={back.href} aria-label={`Voltar para ${back.label}`} className="md-icon-btn -ml-3 text-(--md-on-surface)">
              <Ripple />
              <ArrowLeft className="relative size-6" strokeWidth={2} aria-hidden="true" />
            </Link>
            <p className="md-title-l min-w-0 flex-1 truncate">{title}</p>
          </>
        ) : (
          <>
            <MobileLogo className={cn("h-6 transition-opacity duration-200", collapsed && "opacity-0")} priority />
            <p
              aria-hidden="true"
              className={cn(
                "md-title-l pointer-events-none absolute left-4 max-w-[55%] truncate transition-[opacity,transform] duration-300 ease-(--md-ease-emphasized)",
                collapsed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              )}
            >
              {title}
            </p>
            <span className="flex-1" />
          </>
        )}
        <div className="flex shrink-0 items-center">{actions}</div>
      </div>
    </header>
  );
});
