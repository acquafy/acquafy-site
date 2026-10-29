// components/mobile/ios/IosDevice.tsx
"use client";

import type { ReactNode } from "react";
import { Wifi } from "lucide-react";

/** Cellular signal: four bars (as in the iOS status bar). */
function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

/** Battery at full charge: outline at 40%, fill and the small terminal. */
function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="currentColor" aria-hidden="true">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="20" height="9" rx="2.5" />
      <path d="M25 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2z" opacity="0.45" />
    </svg>
  );
}

/**
 * The iPhone as drawn on the desktop preview (≥ 600px): thin titanium bezel, screen with the corner radius of the display
 * (≈ 55pt), Dynamic Island (126×37), status bar and home indicator (134×5). On a real phone (< 600px) it is just the full-window
 * screen. `children` is the screen content (the scroll area and the overlay layer, see DeviceFrame).
 */
export function IosDevice({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh min-[600px]:grid min-[600px]:place-items-center min-[600px]:p-6">
      <div className="relative mx-auto w-full min-[600px]:w-auto min-[600px]:rounded-[65px] min-[600px]:border-2 min-[600px]:border-[#3b4150] min-[600px]:bg-(--m-bezel) min-[600px]:p-2">
        {/* Side keys: action + volume (left), power (right). */}
        <span aria-hidden="true" className="absolute top-[104px] -left-[4px] hidden h-7 w-[3px] rounded-l-sm bg-[#3b4150] min-[600px]:block" />
        <span aria-hidden="true" className="absolute top-[158px] -left-[4px] hidden h-12 w-[3px] rounded-l-sm bg-[#3b4150] min-[600px]:block" />
        <span aria-hidden="true" className="absolute top-[222px] -left-[4px] hidden h-12 w-[3px] rounded-l-sm bg-[#3b4150] min-[600px]:block" />
        <span aria-hidden="true" className="absolute top-[176px] -right-[4px] hidden h-[76px] w-[3px] rounded-r-sm bg-[#3b4150] min-[600px]:block" />
        <div data-device-screen className="relative isolate h-(--m-frame-h) w-full overflow-hidden text-ink [background:var(--m-bg)] min-[600px]:w-(--m-frame-w) min-[600px]:rounded-[55px]">
          {children}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden h-(--m-safe-top) min-[600px]:block">
            <span className="absolute top-[11px] left-1/2 h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
            <span className="absolute top-[18px] left-[36px] text-[17px] leading-[22px] font-semibold tracking-[-0.2px] text-ink">9:41</span>
            <span className="absolute top-[20px] right-[30px] flex items-center gap-[7px] text-ink">
              <SignalIcon />
              <Wifi className="size-[17px]" strokeWidth={2.75} />
              <BatteryIcon />
            </span>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-1/2 z-30 hidden h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink min-[600px]:block" />
        </div>
      </div>
    </div>
  );
}
