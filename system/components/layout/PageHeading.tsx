// components/layout/PageHeading.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useProfile } from "@/components/providers/ProfileProvider";
import { navItemFor } from "@/config/navigation";

/** Title and subtitle of the current page, placed on the page background (no card), as in the Interfy admin. */
export function PageHeading() {
  const pathname = usePathname();
  const secao = useSearchParams().get("secao");
  const { profile } = useProfile();
  const item = navItemFor(pathname, secao);
  if (!item) return null;

  return (
    <div className="min-w-0 pt-1">
      <h1 className="text-[clamp(1.5rem,1.1rem+0.8cqw,2rem)] leading-tight font-extrabold tracking-tight text-ink">{item.title.replace("{name}", profile.name)}</h1>
      <p className="text-[15px] text-ink-soft">{item.subtitle}</p>
    </div>
  );
}
