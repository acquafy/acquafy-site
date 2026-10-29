// components/mobile/android/AndroidDevice.tsx
"use client";

import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";

/**
 * The Android phone as drawn on the desktop preview (≥ 600px), modelled on a Pixel: thin bezel, screen with the display corner radius,
 * punch-hole camera, a 24dp status bar (clock left, icons right, no side notch) and the gesture-navigation pill. On a real phone
 * (< 600px) it is just the full-window screen. `children` is the screen content (the scroll area and the overlay layer, see DeviceFrame).
 */
export function AndroidDevice({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh min-[600px]:grid min-[600px]:place-items-center min-[600px]:p-6">
      <div className="relative mx-auto w-full min-[600px]:w-auto min-[600px]:rounded-[54px] min-[600px]:border min-[600px]:border-white/10 min-[600px]:bg-(--m-bezel) min-[600px]:p-[9px]">
        {/* Side keys */}
        <span aria-hidden="true" className="absolute top-[180px] -right-[3px] hidden h-[56px] w-[3px] rounded-r-sm bg-(--m-bezel) min-[600px]:block" />
        <span aria-hidden="true" className="absolute top-[260px] -right-[3px] hidden h-[96px] w-[3px] rounded-r-sm bg-(--m-bezel) min-[600px]:block" />
        <div
          data-device-screen
          className="relative isolate h-(--m-frame-h) w-full overflow-hidden text-(--md-on-surface) [background:var(--m-bg)] min-[600px]:w-(--m-frame-w) min-[600px]:rounded-[44px]"
        >
          {children}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden h-(--m-safe-top) text-(--md-on-surface) min-[600px]:block">
            <span className="absolute top-[7px] left-1/2 size-[11px] -translate-x-1/2 rounded-full bg-black ring-[1.5px] ring-black/40" />
            <span className="absolute top-0 left-[22px] flex h-6 items-center text-[13px] leading-none font-medium tracking-[0.2px]">9:41</span>
            <span className="absolute top-0 right-[18px] flex h-6 items-center gap-1">
              <Wifi className="size-[14px]" strokeWidth={2.5} />
              <Signal className="size-[14px]" strokeWidth={2.5} />
              <BatteryFull className="size-[18px]" strokeWidth={2} />
            </span>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-1/2 z-30 hidden h-1 w-[108px] -translate-x-1/2 rounded-full bg-(--md-on-surface) opacity-80 min-[600px]:block"
          />
        </div>
      </div>
    </div>
  );
}
