// components/mobile/ios/IosTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { isStackedPath } from "@/config/mobile-navigation";
import { cn } from "@/lib/cn";

/** Called by the nav bar's back button right before it navigates: the next screen is a "pop" (slides in from the left). A DOM flag, so it survives the remount. */
export function markIosPop() {
  document.documentElement.dataset.iosPop = "1";
}

/**
 * Used by `template.tsx` (remounts on every navigation). Pushed screens slide in from the right with the iOS spring; going back
 * slides the revealed screen in from slightly left (parallax); tab roots just cross-fade, as UITabBarController does.
 */
export function IosTransition({ children }: { children: ReactNode }) {
  const push = isStackedPath(usePathname());
  // Read on mount (state, so re-renders do not restart the animation) and cleared in an effect (safe under StrictMode).
  const [pop] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.iosPop === "1");
  useEffect(() => {
    delete document.documentElement.dataset.iosPop;
  }, []);
  const animation = pop ? "animate-[ios-pop-in_0.4s_var(--ios-spring)]" : push ? "animate-[ios-push-in_0.42s_var(--ios-spring)]" : "animate-[ios-tab-in_0.22s_ease-out]";
  return <div className={cn("flex flex-1 flex-col", animation)}>{children}</div>;
}
