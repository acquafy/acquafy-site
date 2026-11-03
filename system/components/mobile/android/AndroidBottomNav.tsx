// components/mobile/android/AndroidBottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LifeBuoy, Menu, PanelLeftClose } from "lucide-react";
import type { ReactNode } from "react";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { mobileTabs, tabOfScreen } from "@/config/mobile-navigation";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/usePersistentState";
import { mobilePath, mobileScreenOf } from "@/lib/mobile/platform";
import { RailOpenContext } from "./AndroidRailState";
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
    <nav aria-label="Navegação principal" className="sticky bottom-0 z-30 mt-auto bg-(--md-surface-container-lowest) pb-(--m-safe-bottom)">
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

/**
 * Material 3 navigation rail (Expanded window size class: tablet, unfolded foldable): 80px, `surface-container-low` (a different tone from
 * the content, so it never reads as part of it), the 56×32 pill indicator behind the ICON only and a Label Medium below it. Sticky to the
 * height of the frame, padded by the status bar. Same destinations and active state as the bottom bar.
 */
export function AndroidNavRail({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const active = tabOfScreen(mobileScreenOf(pathname));
  const onSupport = mobileScreenOf(pathname) === "suporte";

  // Collapsed: icon with the label below (80px). Expanded: icon + label side by side, the indicator is the whole row (220px).
  const item = (on: boolean) =>
    cn(
      "md-nav-item relative flex focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-(--md-secondary)",
      open ? "h-14 w-full items-center gap-3 rounded-full px-4" : "w-full flex-col items-center gap-1 py-1",
      open && on && "bg-(--md-secondary-container)",
    );
  const icon = (on: boolean) =>
    cn("relative grid place-items-center rounded-full transition-colors duration-200", open ? "size-6" : "h-8 w-14", on ? "text-(--md-on-secondary-container)" : "text-(--md-on-surface-variant)");
  const label = (on: boolean) =>
    cn("md-label-m text-[11px]! tracking-normal! whitespace-nowrap", open && "text-[14px]! flex-1", on ? "font-bold text-(--md-on-surface)" : "font-medium text-(--md-on-surface-variant)");

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "sticky top-0 z-30 flex h-(--m-frame-h) shrink-0 flex-col self-start bg-(--md-surface-container-low) pt-[calc(var(--m-safe-top)+12px)] pb-[calc(var(--m-safe-bottom)+12px)] transition-[width] duration-300 ease-(--md-ease-emphasized)",
        open ? "w-[220px] px-3" : "w-20",
      )}
    >
      <div className={cn("mb-4 flex", open ? "justify-start px-1" : "justify-center")}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={open ? "Fechar menu lateral" : "Abrir menu lateral"}
          title={open ? "Fechar menu lateral" : "Abrir menu lateral"}
          className="md-nav-item relative grid size-12 place-items-center rounded-full text-(--md-on-surface-variant) focus-visible:outline-3 focus-visible:outline-(--md-secondary)"
        >
          <Ripple follow />
          {open ? <PanelLeftClose className="relative size-6" strokeWidth={1.75} aria-hidden="true" /> : <Menu className="relative size-6" strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </div>
      <ul className={cn("flex flex-col gap-3", !open && "items-center")}>
        {mobileTabs.map((tab) => {
          const on = tab.id === active && !onSupport;
          const Icon = tab.icon;
          return (
            <li key={tab.id} className="w-full">
              <Link href={mobilePath("android", tab.route)} aria-label={tab.label} aria-current={on ? "page" : undefined} className={item(on)}>
                <span className={icon(on)}>
                  {!open && <span aria-hidden="true" className="md-nav-indicator" />}
                  <Ripple follow />
                  <Icon className="relative size-6" strokeWidth={on ? 2.25 : 1.75} aria-hidden="true" />
                </span>
                <span className={label(on)}>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href={mobilePath("android", "support")} aria-label="Ajuda e suporte" aria-current={onSupport ? "page" : undefined} className={cn(item(onSupport), "mt-auto")}>
        <span className={icon(onSupport)}>
          {!open && onSupport && <span aria-hidden="true" className="md-nav-indicator" />}
          <Ripple follow />
          <LifeBuoy className="relative size-6" strokeWidth={onSupport ? 2.25 : 1.75} aria-hidden="true" />
        </span>
        <span className={label(onSupport)}>{open ? "Ajuda e suporte" : "Ajuda"}</span>
      </Link>
    </nav>
  );
}

/**
 * Layout of the screens that have the navigation: on a phone the content grows and the bar sticks to the bottom of the viewport; on a
 * tablet or an unfolded foldable (Expanded window class) there is no bottom bar, the rail takes the left 80px and the content the rest.
 */
export function AndroidTabsLayout({ children }: { children: ReactNode }) {
  const device = useDevice();
  // Expanded on the tablet (room for labels), collapsed on the foldable; the choice is remembered per device.
  const [open, setOpen] = usePersistentState<boolean>(`mobile:android:rail:${device}`, device === "tablet");
  if (device !== "phone") {
    return (
      <RailOpenContext value={open}>
        <div className="flex min-h-full">
          <AndroidNavRail open={open} onToggle={() => setOpen((v) => !v)} />
          <div className="flex min-w-0 flex-1 flex-col">{children}</div>
        </div>
      </RailOpenContext>
    );
  }
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
      <AndroidBottomNav />
    </div>
  );
}
