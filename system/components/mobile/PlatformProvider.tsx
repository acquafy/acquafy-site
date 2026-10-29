// components/mobile/PlatformProvider.tsx
"use client";

import { createContext, useContext, type ReactNode } from "react";
import { resolveTarget, type MobileTarget, type Platform } from "@/lib/mobile/platform";

const PlatformContext = createContext<Platform>("ios");

/**
 * Tells every descendant which platform's screens are on. The wrapper carries `data-platform`, the hook for CSS:
 * `ios:` / `android:` Tailwind variants and the `[data-platform="…"]` rules of app/globals.css. It sits above the
 * providers on purpose, so toasts (top layer) are also inside the scope.
 */
export function PlatformProvider({ platform, children }: { platform: Platform; children: ReactNode }) {
  return (
    <PlatformContext value={platform}>
      <div data-platform={platform} className="contents">
        {children}
      </div>
    </PlatformContext>
  );
}

export function usePlatform(): Platform {
  return useContext(PlatformContext);
}

/** `const href = useMobileHref(); href({ route: "finance" })` → "/m/ios/financeiro" (literal strings pass through). */
export function useMobileHref(): (target: MobileTarget) => string {
  const platform = useContext(PlatformContext);
  return (target) => resolveTarget(platform, target);
}
