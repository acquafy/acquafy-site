// components/mobile/DeviceFrame.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { AndroidDevice } from "@/components/mobile/android/AndroidDevice";
import { IosDevice } from "@/components/mobile/ios/IosDevice";
import type { Platform } from "@/lib/mobile/platform";
import { FrameContext } from "./frame-context";

const DESKTOP_QUERY = "(min-width: 600px)";

/** sessionStorage flag: stay on ONE phone (/m/<platform>/…) instead of going to the two-phone stage (/m/duo/…). */
export const SOLO_KEY = "acq-solo";
const soloListeners = new Set<() => void>();
export function setSolo(on: boolean) {
  try {
    if (on) sessionStorage.setItem(SOLO_KEY, "1");
    else sessionStorage.removeItem(SOLO_KEY);
  } catch {}
  soloListeners.forEach((l) => l());
}
function isSolo(): boolean {
  try {
    return sessionStorage.getItem(SOLO_KEY) === "1";
  } catch {
    return false;
  }
}

function useSolo(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      soloListeners.add(onChange);
      return () => soloListeners.delete(onChange);
    },
    isSolo,
    () => false,
  );
}

/** True on a desktop-sized window (≥ 600px): there the app is drawn as phones; below it, the screen is the whole window. */
function useDesktop(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/**
 * Device viewport. From 600px up it draws the platform's phone (IosDevice / AndroidDevice: bezel, camera, status bar, home
 * indicator) for reviewing on a desktop; on a real phone (< 600px) there is no frame and the screen is full window, using
 * `env(safe-area-inset-*)`. Inside, `--m-safe-top` / `--m-safe-bottom` always hold the safe areas (real or simulated).
 *
 * Opening /m/<platform>/… on a desktop goes to the two-phone stage (/m/duo/…, iOS and Android side by side, both real pages, no
 * iframes) unless the "só um celular" flag is set. The stage itself renders this component with `bare` (just the phone).
 *
 * This component only owns what is common to both: the scroll root, the overlay root (sheets) and scroll-to-top on navigation.
 * Layers: scrolling content (z-0, pinned chrome such as nav/tab bars are sticky inside it), device chrome (z-30), overlay root
 * (z-40: sheets). The tab bar is NOT here: tab layouts render it as a sticky child of the scroll area.
 */
export function DeviceFrame({ platform, children, bare = false }: { platform: Platform; children: ReactNode; bare?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const desktop = useDesktop();
  const solo = useSolo();
  const [scrollRoot, setScrollRoot] = useState<HTMLElement | null>(null);
  const [overlayRoot, setOverlayRoot] = useState<HTMLElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);

  // Both elements are published once they exist (callback refs → state, so consumers re-render with them).
  const value = useMemo(() => ({ overlayRoot, scrollRoot }), [overlayRoot, scrollRoot]);

  const toStage = !bare && desktop && !solo;
  useEffect(() => {
    if (toStage) router.replace(`/m/duo/${pathname.split("/").filter(Boolean).slice(2).join("/") || "home"}`);
  }, [toStage, pathname, router]);

  // A new screen starts at the top.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [pathname]);

  if (toStage) return null;

  const Device = platform === "android" ? AndroidDevice : IosDevice;

  return (
    <Device bare={bare}>
      {!bare && desktop && solo && (
        <button
          type="button"
          onClick={() => {
            setSolo(false);
            router.replace(`/m/duo/${pathname.split("/").filter(Boolean).slice(2).join("/") || "home"}`);
          }}
          className="fixed top-4 left-4 z-50 rounded-full bg-card px-3.5 py-1.5 text-[13px] font-semibold text-brand ring-1 ring-line hover:bg-brand-soft"
        >
          ← Dois celulares
        </button>
      )}
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
