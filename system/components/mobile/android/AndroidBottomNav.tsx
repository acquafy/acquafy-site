// components/mobile/android/AndroidBottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { mobileTabs, tabOfScreen } from "@/config/mobile-navigation";
import { cn } from "@/lib/cn";
import { mobilePath, mobileScreenOf } from "@/lib/mobile/platform";
import { Ripple } from "./Ripple";

/**
 * Material 3 navigation bar: 80px, `surface-container`, five destinations. The active one shows the 64×32 pill indicator
 * (`secondary-container`, grows from the centre with a spring) behind the icon and a bold label. Sticky at the bottom of the scroll
 * area, padded by the gesture area.
 */
export function AndroidBottomNav() {
  const pathname = usePathname();
  const active = tabOfScreen(mobileScreenOf(pathname));

  return (
    <nav aria-label="Navegação principal" className="sticky bottom-0 z-30 mt-auto bg-(--md-surface-container) pb-(--m-safe-bottom)">
      <ul className="flex h-20">
        {mobileTabs.map((tab) => {
          const on = tab.id === active;
          const Icon = tab.icon;
          return (
            <li key={tab.id} className="min-w-0 flex-1">
              <Link
                href={mobilePath("android", tab.route)}
                aria-label={tab.label}
                aria-current={on ? "page" : undefined}
                className="md-nav-item flex h-full w-full flex-col items-center gap-1 pt-3 focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-(--md-secondary)"
              >
                <span
                  className={cn("relative grid h-8 w-16 place-items-center rounded-full transition-colors duration-200", on ? "text-(--md-on-secondary-container)" : "text-(--md-on-surface-variant)")}
                >
                  <span aria-hidden="true" className="md-nav-indicator" />
                  <Ripple follow />
                  <Icon className="relative size-6" strokeWidth={on ? 2.25 : 1.75} aria-hidden="true" />
                </span>
                <span
                  className={cn(
                    "md-label-m whitespace-nowrap tracking-[0.3px] max-[380px]:text-[11px] max-[380px]:tracking-normal",
                    on ? "font-bold text-(--md-on-surface)" : "font-medium text-(--md-on-surface-variant)",
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Layout of the screens that have the navigation bar: content grows, the bar sticks to the bottom of the viewport. */
export function AndroidTabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
      <AndroidBottomNav />
    </div>
  );
}
