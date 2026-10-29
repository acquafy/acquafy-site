// components/mobile/DeviceFrame.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { DuoStage } from "./DuoStage";
import { AndroidDevice } from "@/components/mobile/android/AndroidDevice";
import { IosDevice } from "@/components/mobile/ios/IosDevice";
import type { Platform } from "@/lib/mobile/platform";
import { FrameContext } from "./frame-context";

/**
 * Device viewport. From 600px up it draws the platform's phone (IosDevice / AndroidDevice: bezel, camera, status bar, home
 * indicator) centred on the page, for reviewing on a desktop; on a real phone (< 600px) there is no frame and the screen is
 * full window, using `env(safe-area-inset-*)`. Inside, `--m-safe-top` / `--m-safe-bottom` always hold the safe areas (real or
 * simulated).
 *
 * This component only owns what is common to both: the scroll root, the overlay root (sheets) and scroll-to-top on navigation.
 * Layers: scrolling content (z-0, pinned chrome such as nav/tab bars are sticky inside it), device chrome (z-30), overlay root
 * (z-40: sheets). The tab bar is NOT here: tab layouts render it as a sticky child of the scroll area.
 */
const DESKTOP_QUERY = "(min-width: 600px)";

/** True on a desktop-sized window that is the top page (not inside the stage's iframes): there the app is shown as two phones. */
function useDuoMode(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches && window.self === window.top,
    () => false,
  );
}

export function DeviceFrame({ platform, children }: { platform: Platform; children: ReactNode }) {
  const duo = useDuoMode();
  const pathname = usePathname();
  const [scrollRoot, setScrollRoot] = useState<HTMLElement | null>(null);
  const [overlayRoot, setOverlayRoot] = useState<HTMLElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);

  // Both elements are published once they exist (callback refs → state, so consumers re-render with them).
  const value = useMemo(() => ({ overlayRoot, scrollRoot }), [overlayRoot, scrollRoot]);

  // A new screen starts at the top.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [pathname]);

  if (duo) return <DuoStage />;

  const Device = platform === "android" ? AndroidDevice : IosDevice;

  return (
    <Device>
      <FrameContext value={value}>
        <div
          ref={(el) => {
            scroller.current = el;
            setScrollRoot(el);
          }}
          className="m-noscrollbar absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain"
        >
          {children}
        </div>
        <div ref={setOverlayRoot} className="pointer-events-none absolute inset-0 z-40" />
      </FrameContext>
    </Device>
  );
}
