// components/mobile/PlatformProvider.tsx
"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Device } from "@/lib/mobile/devices";
import { resolveTarget, type MobileTarget, type Platform } from "@/lib/mobile/platform";

const PlatformContext = createContext<Platform>("ios");
const DeviceContext = createContext<Device>("phone");

/**
 * Tells every descendant which platform's screens are on, and on which form factor (phone, tablet, foldable). The wrapper carries
 * `data-platform` and `data-device`, the hooks for CSS: `ios:` / `android:` Tailwind variants and the `[data-platform="…"]` rules of
 * app/globals.css. It sits above the providers on purpose, so toasts (top layer) are also inside the scope.
 */
export function PlatformProvider({ platform, device = "phone", children }: { platform: Platform; device?: Device; children: ReactNode }) {
  return (
    <PlatformContext value={platform}>
      <DeviceContext value={device}>
        <div data-platform={platform} data-device={device} className="contents">
          {children}
        </div>
      </DeviceContext>
    </PlatformContext>
  );
}

export function usePlatform(): Platform {
  return useContext(PlatformContext);
}

/** The form factor: `phone` (bottom bar, one column), `tablet` / `foldable` (sidebar or rail, several columns). */
export function useDevice(): Device {
  return useContext(DeviceContext);
}

/** `const href = useMobileHref(); href({ route: "finance" })` → "/m/ios/financeiro" (literal strings pass through). */
export function useMobileHref(): (target: MobileTarget) => string {
  const platform = useContext(PlatformContext);
  return (target) => resolveTarget(platform, target);
}
