// components/mobile/ios/IosNavBar.tsx
"use client";

import Link from "next/link";
import { forwardRef, type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { MobileLogo } from "@/components/mobile/ui/MobileLogo";
import { cn } from "@/lib/cn";
import { markIosPop } from "./IosTransition";

export type IosNavBarProps = {
  /** Small title shown in the bar once the large title has scrolled away. */
  title: string;
  /** The large title has scrolled under the bar: the inline title fades in. */
  collapsed: boolean;
  /** Content is scrolling under the bar: the scroll edge effect (soft blur + fade, no divider) fades in. */
  elevated: boolean;
  /** Pushed screen: a round glass back button (chevron only, as in iOS 26). Without it the Acquafy logo is shown (tab roots). */
  back?: { href: string; label: string };
  /** Right side: the glass capsule with bell + avatar on tab roots, or screen-specific actions. */
  actions?: ReactNode;
};

/**
 * iOS 26 navigation bar: no background and no line. Sticky at the top of the scroll area (it pads itself with the top safe
 * area); content scrolls under it with the scroll edge effect. Buttons are Liquid Glass. The large title is drawn by
 * `IosScreen` below it; this bar only cross-fades the logo and the inline title.
 */
export const IosNavBar = forwardRef<HTMLElement, IosNavBarProps>(function IosNavBar({ title, collapsed, elevated, back, actions }, ref) {
  return (
    <header ref={ref} className="sticky top-0 z-20 pt-(--m-safe-top)">
      <div
        aria-hidden="true"
        className={cn("ios-edge-top pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+18px)] transition-opacity duration-300", elevated ? "opacity-100" : "opacity-0")}
      />
      <div className="relative flex h-[52px] items-center justify-between gap-2 px-4">
        {back ? (
          <Link
            href={back.href}
            onClick={markIosPop}
            aria-label={`Voltar para ${back.label}`}
            className="ios-glass ios-press grid size-11 shrink-0 place-items-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-brand"
          >
            <ChevronLeft className="size-6 -translate-x-px" strokeWidth={2.5} aria-hidden="true" />
          </Link>
        ) : (
          <MobileLogo className={cn("h-5 transition-opacity duration-200", collapsed && "opacity-0")} priority />
        )}

        <p
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-1/2 max-w-[44%] -translate-x-1/2 truncate text-[17px] leading-[22px] font-semibold text-ink transition-[opacity,translate] duration-200",
            collapsed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
          )}
        >
          {title}
        </p>

        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      </div>
    </header>
  );
});
