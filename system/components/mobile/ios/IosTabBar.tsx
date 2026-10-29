// components/mobile/ios/IosTabBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LifeBuoy, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useScrollRoot } from "@/components/mobile/frame-context";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { MobileLogo } from "@/components/mobile/ui/MobileLogo";
import { mobileTabs, tabOfScreen } from "@/config/mobile-navigation";
import { cn } from "@/lib/cn";
import { mobilePath, mobileScreenOf } from "@/lib/mobile/platform";
import { usePersistentState } from "@/lib/usePersistentState";
import { SidebarOpenContext } from "./IosSidebarState";

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
          minimized ? "w-(--ios-tabbar-h)" : "w-[calc(100%-32px)]",
        )}
      >
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
                  <span className={cn("grid h-7 w-12 place-items-center rounded-full transition-colors duration-300", on && !minimized && "ios-lens-tint")}>
                    <Icon className="size-[24px] shrink-0" strokeWidth={on ? 2 : 1.75} aria-hidden="true" />
                  </span>
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

/**
 * iPadOS 26 sidebar: a floating Liquid Glass panel inset from the screen edges, sticky with the height of the frame.
 * Tablet: 280pt wide, with the logo on top, the five tabs (icon + 17pt label) and the support link at the bottom. Foldable (940pt
 * wide, two panels need the room): the compact version, a 72pt rail of icons (name in the tooltip / `aria-label`; the logo moves to the
 * nav bar). The selected item gets a tinted glass highlight over its whole row (never a circle behind the text).
 */
export function IosSidebar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const screen = mobileScreenOf(pathname);
  const onSupport = screen === "suporte";
  const active = onSupport ? null : tabOfScreen(screen);
  const rail = !open;
  const row = cn(
    "ios-press flex items-center rounded-[16px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
    rail ? "h-12 w-full justify-center" : "h-11 w-full gap-3 px-3 text-[17px] leading-[22px]",
  );

  return (
    <aside className={cn("sticky top-0 z-10 h-(--m-frame-h) shrink-0 self-start pt-(--m-safe-top) pb-3 pl-3 transition-[width] duration-300 ease-(--ios-spring)", rail ? "w-[76px]" : "w-[240px]")}>
      <nav aria-label="Navegação principal" className={cn("ios-glass-thick ios-sq flex h-full flex-col overflow-y-auto rounded-[26px]", rail ? "p-2 pt-3" : "p-3")}>
        <div className={cn("flex items-center", rail ? "justify-center pb-3" : "justify-between px-3 pt-1 pb-5")}>
          {!rail && <MobileLogo className="h-6" priority />}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-label={open ? "Fechar menu lateral" : "Abrir menu lateral"}
            title={open ? "Fechar menu lateral" : "Abrir menu lateral"}
            className="ios-press grid size-10 shrink-0 place-items-center rounded-[14px] text-ink-soft hover:bg-(--ios-fill) focus-visible:outline-2 focus-visible:outline-brand"
          >
            {open ? <PanelLeftClose className="size-5" strokeWidth={1.75} aria-hidden="true" /> : <PanelLeftOpen className="size-5" strokeWidth={1.75} aria-hidden="true" />}
          </button>
        </div>
        <ul className="grid gap-1">
          {mobileTabs.map((tab) => {
            const on = tab.id === active;
            const Icon = tab.icon;
            return (
              <li key={tab.id}>
                <Link
                  href={mobilePath("ios", tab.route)}
                  title={tab.label}
                  aria-label={rail ? tab.label : undefined}
                  aria-current={on ? "page" : undefined}
                  className={cn(row, on ? "ios-lens-tint font-semibold text-brand" : "text-ink hover:bg-(--ios-fill)")}
                >
                  <Icon className="size-6 shrink-0" strokeWidth={on ? 2 : 1.75} aria-hidden="true" />
                  {!rail && <span className="min-w-0 flex-1 whitespace-nowrap">{tab.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto border-t border-line/50 pt-2">
          <Link
            href={mobilePath("ios", "support")}
            title="Ajuda e suporte"
            aria-label={rail ? "Ajuda e suporte" : undefined}
            aria-current={onSupport ? "page" : undefined}
            className={cn(row, onSupport ? "ios-lens-tint font-semibold text-brand" : "text-ink-soft hover:bg-(--ios-fill)")}
          >
            <LifeBuoy className="size-6 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {!rail && <span className="min-w-0 flex-1 whitespace-nowrap">Ajuda e suporte</span>}
          </Link>
        </div>
      </nav>
    </aside>
  );
}

/**
 * Layout of the screens that have navigation. Phone: content grows (with room for the floating capsule) and the tab bar sticks to the
 * bottom of the viewport. Tablet / foldable: the sidebar on the left, and the content column (a `@container`, so screens adapt to
 * ITS width) takes the rest; no bottom bar and no `--ios-tab-space`.
 */
export function IosTabsLayout({ children }: { children: ReactNode }) {
  const device = useDevice();
  // Open on the tablet (room for labels), collapsed to icons on the foldable; the choice is remembered per device.
  const [open, setOpen] = usePersistentState<boolean>(`mobile:ios:sidebar:${device}`, device === "tablet");
  if (device !== "phone") {
    return (
      <SidebarOpenContext value={open}>
        <div className="flex min-h-full">
          <IosSidebar open={open} onToggle={() => setOpen((v) => !v)} />
          <div className="@container flex min-w-0 flex-1 flex-col">{children}</div>
        </div>
      </SidebarOpenContext>
    );
  }
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col pb-(--ios-tab-space)">{children}</div>
      <IosTabBar />
    </div>
  );
}
