// components/layout/SidebarNav.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSidebar } from "@/components/providers/SidebarProvider";
import { isNavActive, navItems } from "@/config/navigation";
import { cn } from "@/lib/cn";

/** Hover/focus label shown next to an icon-only item. */
export function RailTooltip({ children }: { children: string }) {
  return (
    <span
      role="presentation"
      className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 rounded-lg bg-navy-950 px-2.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {children}
    </span>
  );
}

const visibleItems = navItems.filter((item) => !item.hidden);

/** Side-menu links. The "account" group (security, help) is drawn after a divider. */
export function SidebarNav() {
  const pathname = usePathname();
  const secao = useSearchParams().get("secao");
  const { collapsed } = useSidebar();

  return (
    <nav aria-label="Navegação principal">
      <ul className="flex flex-col gap-1">
        {visibleItems.map((item, index) => {
          const { href, label, icon: Icon } = item;
          const active = isNavActive(item, pathname, secao);
          const startsAccount = item.group === "account" && visibleItems[index - 1]?.group !== "account";
          return (
            <li key={href} className={cn(startsAccount && "mt-2 border-t border-line pt-3")}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                aria-label={collapsed ? label : undefined}
                className={cn(
                  "group relative flex items-center rounded-lg py-2.5 text-[14.5px] leading-tight font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  collapsed ? "justify-center px-0" : "gap-3 px-3.5",
                  active ? "bg-brand-gradient text-white" : "text-ink-soft hover:bg-card hover:text-brand",
                )}
              >
                <Icon className="size-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {collapsed ? <RailTooltip>{label}</RailTooltip> : <span>{label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
