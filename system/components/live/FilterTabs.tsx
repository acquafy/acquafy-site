import Link from "next/link";
import { cn } from "@/lib/cn";

export type FilterTab = { href: string; label: string; count?: number; active: boolean };

/** Filters kept in the URL, so a filtered list can be linked from the panel and survives a form submission. */
export function FilterTabs({ label, tabs }: { label: string; tabs: FilterTab[] }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link
              href={tab.href}
              aria-current={tab.active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                tab.active ? "bg-brand-gradient text-white" : "bg-canvas/70 text-ink-soft hover:bg-brand-soft hover:text-brand",
              )}
            >
              {tab.label}
              {tab.count !== undefined && <span className="tabular text-[13px] font-bold">{tab.count}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
