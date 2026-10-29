// components/mobile/ios/IosTabBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollRoot } from "@/components/mobile/frame-context";
import { mobileTabs, tabOfScreen } from "@/config/mobile-navigation";
import { cn } from "@/lib/cn";
import { mobilePath, mobileScreenOf } from "@/lib/mobile/platform";

/** Scroll distance (pt) before the bar reacts to a change of direction. */
const DIRECTION_THRESHOLD = 8;
/** Below this scroll offset the bar is always expanded. */
const TOP_ZONE = 24;

/**
 * iOS 26 tab bar: a floating Liquid Glass capsule inset from the screen edges and lifted off the bottom (above the home
 * indicator). The selected tab has a glass "lens" behind its icon and label that slides between tabs. Content scrolls underneath
 * it (the layout reserves `--ios-tab-space`). `tabBarMinimizeBehavior`: scrolling down shrinks it to the selected tab only,
 * scrolling up (or tapping it) expands it again.
 */
export function IosTabBar() {
  const pathname = usePathname();
  const scrollRoot = useScrollRoot();
  const active = tabOfScreen(mobileScreenOf(pathname));
  const activeIndex = Math.max(
    0,
    mobileTabs.findIndex((t) => t.id === active),
  );
  const [minimized, setMinimized] = useState(false);
  const reference = useRef(0);

  useEffect(() => {
    if (!scrollRoot) return;
    reference.current = scrollRoot.scrollTop;
    const onScroll = () => {
      const y = scrollRoot.scrollTop;
      if (y < TOP_ZONE) {
        reference.current = y;
        setMinimized(false);
        return;
      }
      const delta = y - reference.current;
      if (delta > DIRECTION_THRESHOLD) {
        reference.current = y;
        setMinimized(true);
      } else if (delta < -DIRECTION_THRESHOLD) {
        reference.current = y;
        setMinimized(false);
      }
    };
    scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollRoot.removeEventListener("scroll", onScroll);
  }, [scrollRoot]);

  return (
    <div className="pointer-events-none sticky bottom-0 z-30 h-0">
      <div aria-hidden="true" className="ios-edge-bottom absolute inset-x-0 bottom-0 h-[calc(var(--ios-tabbar-bottom)+var(--ios-tabbar-h)+30px)]" />
      <nav
        aria-label="Navegação principal"
        data-minimized={minimized || undefined}
        onClickCapture={(e) => {
          // Tapping the minimized capsule expands it instead of navigating.
          if (!minimized) return;
          e.preventDefault();
          reference.current = scrollRoot?.scrollTop ?? 0;
          setMinimized(false);
        }}
        className={cn(
          "ios-glass pointer-events-auto absolute bottom-(--ios-tabbar-bottom) left-4 h-(--ios-tabbar-h) overflow-hidden rounded-full transition-[width] duration-[450ms] ease-(--ios-spring)",
          minimized ? "w-[68px]" : "w-[calc(100%-32px)]",
        )}
      >
        <span
          aria-hidden="true"
          style={{ width: minimized ? "calc(100% - 8px)" : "calc((100% - 8px) / 5)", transform: minimized ? "none" : `translateX(${activeIndex * 100}%)` }}
          className="ios-lens-tint absolute top-1 bottom-1 left-1 rounded-full transition-[transform,width] duration-[450ms] ease-(--ios-spring)"
        />
        <ul className="relative flex h-full p-1">
          {mobileTabs.map((tab) => {
            const on = tab.id === active;
            const hidden = minimized && !on;
            const Icon = tab.icon;
            return (
              <li
                key={tab.id}
                inert={hidden}
                style={{ flexGrow: hidden ? 0 : 1 }}
                className={cn("relative min-w-0 basis-0 transition-[flex-grow,opacity] duration-[450ms] ease-(--ios-spring)", hidden && "opacity-0")}
              >
                <Link
                  href={mobilePath("ios", tab.route)}
                  aria-label={tab.label}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "ios-press flex h-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-full px-0 text-[10px] leading-[12px] font-medium tracking-[0] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                    on ? "text-brand" : "text-ink-soft",
                  )}
                >
                  <Icon className="size-[26px] shrink-0" strokeWidth={on ? 2 : 1.75} aria-hidden="true" />
                  <span className={cn("whitespace-nowrap transition-[opacity,height] duration-300", minimized ? "h-0 opacity-0" : "h-3")}>{tab.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/** Layout of the screens that have the tab bar: content grows (with room for the floating capsule) and the bar sticks to the bottom of the viewport. */
export function IosTabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col pb-(--ios-tab-space)">{children}</div>
      <IosTabBar />
    </div>
  );
}
