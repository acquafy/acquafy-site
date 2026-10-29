// components/layout/Sidebar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/components/providers/SidebarProvider";
import { cn } from "@/lib/cn";
import { LogoutButton } from "./LogoutButton";
import { SidebarNav } from "./SidebarNav";

/**
 * Full-height side menu, flush with the left and bottom edges. Expanded: logo (centred, same height as the top bar)
 * and icons + labels. Collapsed: a 76 px rail with icons only and hover/focus tooltips; the logo then
 * moves to the top bar. The open/close toggle lives in the menu header (no divider line under it). The nav area
 * scrolls only when expanded, because a scroll container would clip the tooltips.
 */
export function Sidebar() {
  const { collapsed, toggle } = useSidebar();
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside
      id="menu-lateral"
      aria-label="Menu lateral"
      data-collapsed={collapsed}
      className={cn(
        "bg-sidebar-gradient relative z-30 hidden min-h-0 shrink-0 flex-col justify-between border-r border-line text-ink transition-[width] duration-200 motion-reduce:transition-none lg:flex",
        collapsed ? "w-[4.75rem]" : "w-[264px] xl:w-[288px]",
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Header (same height as the top bar). Expanded: logo left-aligned with the menu icons, toggle at the right. Collapsed:
 just the toggle, centred in the rail. */}
        <div className={cn("grid h-[4.5rem] shrink-0 items-center", collapsed ? "place-items-center" : "grid-cols-[minmax(0,1fr)_2.25rem] gap-3 pr-3 pl-[1.875rem]")}>
          {!collapsed && (
            <Link
              href="/home"
              aria-label="Acquafy, ir para o Home"
              className="block w-full max-w-[10.5rem] justify-self-start rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <Image src="/brand/acquafy-logo.webp" alt="Acquafy" width={560} height={93} priority sizes="200px" className="h-auto w-full dark:hidden" />
              <Image src="/brand/acquafy-logo-white.webp" alt="Acquafy" width={640} height={106} priority sizes="200px" className="hidden h-auto w-full dark:block" />
            </Link>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            aria-expanded={!collapsed}
            aria-controls="menu-lateral"
            title={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            className="grid size-9 place-items-center rounded-lg text-ink-soft transition hover:bg-brand-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <ToggleIcon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <div className={cn("flex min-h-0 flex-col", collapsed ? "p-3 pt-4" : "overflow-y-auto p-4 [scrollbar-width:none]")}>
          <SidebarNav />
        </div>
      </div>

      <div className="border-t border-line p-3">
        <LogoutButton />
      </div>
    </aside>
  );
}
