// components/base/BaseBackLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const inBase = (path: string) => path === "/base" || path.startsWith("/base/") || path.startsWith("/m/duo");

/**
 * "Voltar à Base" on any screen opened from the /base hub (desktop screens, login, the stage...), so the manual is one click away.
 * It shows only when the screen was reached from the hub (the previous page was in /base or /m/duo) and disappears in the hub itself,
 * so the product never carries it for a normal visitor.
 */
export function BaseBackLink() {
  const pathname = usePathname();
  const [previous, setPrevious] = useState<string | null>(null);
  const [fromBase, setFromBase] = useState(false);

  // Adjusted while rendering (no effect): entering a screen from the hub turns it on, entering the hub turns it off, moving inside the product keeps it.
  if (pathname !== previous) {
    setPrevious(pathname);
    setFromBase(inBase(pathname) ? false : previous !== null && inBase(previous) ? true : fromBase);
  }

  if (!fromBase || inBase(pathname)) return null;
  return (
    <Link
      href="/base"
      className="fixed top-0 left-1/2 z-[100] flex h-3.5 -translate-x-1/2 items-center gap-1 rounded-b-md bg-brand px-2.5 text-[10.5px] leading-none font-semibold text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <ArrowLeft className="size-2.5" aria-hidden="true" />
      Voltar à Base
    </Link>
  );
}
