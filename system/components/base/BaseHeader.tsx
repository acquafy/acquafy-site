// components/base/BaseHeader.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/base", label: "Visão geral" },
  { href: "/base/telas", label: "Telas" },
  { href: "/base/componentes", label: "Componentes" },
  { href: "/base/organismos", label: "Organismos Desktop" },
  { href: "/base/organismos-mobile", label: "Organismos Mobile" },
];

/** Top bar of the /base hub: logo, section links and the Dia/Noite switch. */
export function BaseHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-6 border-b border-line bg-card px-4 lg:px-6">
      <Link href="/base" aria-label="Acquafy · Base" className="shrink-0 focus-visible:outline-2 focus-visible:outline-brand">
        <Image src="/brand/acquafy-logo.webp" alt="Acquafy" width={560} height={93} priority sizes="140px" className="h-auto w-32 dark:hidden" />
        <Image src="/brand/acquafy-logo-white.webp" alt="Acquafy" width={640} height={106} priority sizes="140px" className="hidden h-auto w-32 dark:block" />
      </Link>
      <span className="hidden rounded-md bg-brand-soft px-2 py-1 text-[12px] font-bold tracking-wide text-brand uppercase sm:inline">Base</span>
      <nav aria-label="Base" className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {LINKS.map((l) => {
          const active = l.href === "/base" || l.href.startsWith("/base/organismos") ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-[14.5px] font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-brand",
                active ? "bg-brand-soft text-brand" : "text-ink-soft hover:bg-brand-soft hover:text-brand",
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <ThemeToggle />
    </header>
  );
}
