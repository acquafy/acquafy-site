// components/mobile/android/AndroidTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isStackedPath } from "@/config/mobile-navigation";
import { cn } from "@/lib/cn";

/**
 * Used by `template.tsx` (remounts on every navigation). Material motion: a pushed screen enters with a "shared axis X" (30px slide + fade,
 * emphasized easing); tab screens use "fade through" (fade + scale from 92%).
 */
export function AndroidTransition({ children }: { children: ReactNode }) {
  const push = isStackedPath(usePathname());
  return <div className={cn("flex flex-1 flex-col", push ? "animate-[md-axis-x-in_0.4s_var(--md-ease-emphasized)]" : "animate-[md-fade-through-in_0.35s_var(--md-ease-emphasized)]")}>{children}</div>;
}
