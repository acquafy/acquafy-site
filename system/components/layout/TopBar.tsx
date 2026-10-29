// components/layout/TopBar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/components/providers/SidebarProvider";
import type { SearchEntry } from "@/lib/portal/search-index";
import { cn } from "@/lib/cn";
import { CurrencyMenu } from "./CurrencyMenu";
import { GlobalSearch } from "./GlobalSearch";
import { NotificationsMenu } from "./NotificationsMenu";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

/**
 * Flat top bar of the content column, in the Interfy site's style: white, hairline bottom border, search pill on
 * the left, utilities on the right. It stays pinned: the content scrolls underneath it (`sticky` also covers
 * windows narrow enough for the whole page to scroll). The logo lives in the side menu; it moves here when the menu
 * is collapsed (and on windows too narrow to have a side menu).
 */
export function TopBar({ searchEntries }: { searchEntries: SearchEntry[] }) {
  const { collapsed } = useSidebar();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-between gap-4 border-b border-line bg-card px-4 lg:h-[4.5rem] lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6">
        <Link
          href="/home"
          aria-label="Acquafy, ir para o Home"
          className={cn("shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand", collapsed ? "flex" : "flex lg:hidden")}
        >
          <Image src="/brand/acquafy-logo.webp" alt="Acquafy" width={560} height={93} priority className="h-5 w-auto lg:h-[1.625rem] dark:hidden" />
          <Image src="/brand/acquafy-logo-white.webp" alt="Acquafy" width={640} height={106} priority className="hidden h-5 w-auto lg:h-[1.625rem] dark:block" />
        </Link>
      </div>

      <div className="flex shrink-0 items-center gap-2 lg:gap-3">
        <GlobalSearch entries={searchEntries} className="mr-1 hidden sm:block lg:mr-3" />
        <ThemeToggle />
        <NotificationsMenu />
        <span className="h-8 w-px bg-line" aria-hidden="true" />
        <UserMenu />
        <CurrencyMenu />
      </div>
    </header>
  );
}
