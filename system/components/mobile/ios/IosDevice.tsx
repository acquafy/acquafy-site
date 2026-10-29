// components/mobile/ios/IosDevice.tsx
"use client";

import type { ReactNode } from "react";
import { Wifi } from "lucide-react";
import { useDevice } from "@/components/mobile/PlatformProvider";

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
 * iPad Pro 11" (landscape) and the unfolded iPhone Fold, as drawn in the stage. Same layers as the phone (status bar and home
 * indicator over the screen, `children` = scroll area + overlay root). The bezel plus the borders add up to `bezel` of lib/mobile/devices.ts
 * (14px per side on the tablet, 12px on the foldable), so the stage scale does not change.
 */
function LargeDevice({ children, device }: { children: ReactNode; device: "tablet" | "foldable" }) {
  const tablet = device === "tablet";
  return (
    <div
      className={tablet ? "relative mx-auto w-fit rounded-[38px] border-2 border-[#3b4150] bg-(--m-bezel) p-3" : "relative mx-auto w-fit rounded-[32px] border-2 border-[#3b4150] bg-(--m-bezel) p-2.5"}
    >
      {tablet ? (
        <>
          {/* Front camera, centred on the top edge (landscape), plus the power key on the top edge. */}
          <span aria-hidden="true" className="absolute top-[4px] left-1/2 size-[6px] -translate-x-1/2 rounded-full bg-[#1b2030] ring-1 ring-[#2a3042]" />
          <span aria-hidden="true" className="absolute -top-[4px] right-[96px] h-[3px] w-10 rounded-t-sm bg-[#3b4150]" />
          <span aria-hidden="true" className="absolute top-[88px] -right-[4px] h-9 w-[3px] rounded-r-sm bg-[#3b4150]" />
          <span aria-hidden="true" className="absolute top-[140px] -right-[4px] h-9 w-[3px] rounded-r-sm bg-[#3b4150]" />
        </>
      ) : (
        <>
          <span aria-hidden="true" className="absolute top-[92px] -right-[4px] h-14 w-[3px] rounded-r-sm bg-[#3b4150]" />
          <span aria-hidden="true" className="absolute top-[170px] -right-[4px] h-9 w-[3px] rounded-r-sm bg-[#3b4150]" />
        </>
      )}
      <div data-device-screen className={`relative isolate h-(--m-frame-h) w-(--m-frame-w) overflow-hidden text-ink [background:var(--m-bg)] ${tablet ? "rounded-[24px]" : "rounded-[20px]"}`}>
        {children}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-(--m-safe-top) items-center justify-between px-7 text-ink">
          <span className="text-[13px] leading-none font-semibold tracking-[-0.1px]">9:41</span>
          <span className={tablet ? "flex items-center gap-1.5" : "mr-[26px] flex items-center gap-1.5"}>
            <SignalIcon />
            <Wifi className="size-[15px]" strokeWidth={2.75} />
            <span className="text-[12px] leading-none font-semibold">100%</span>
            <BatteryIcon />
          </span>
        </div>
        {!tablet && (
          <>
            {/* Camera inside the screen, near the top-right corner. */}
            <span aria-hidden="true" className="pointer-events-none absolute top-[7px] right-[16px] z-30 size-[10px] rounded-full bg-black" />
            {/* Hinge: a very soft vertical crease down the middle; it never takes the pointer. */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-5 -translate-x-1/2 bg-linear-to-r from-transparent via-ink/[0.03] to-transparent" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-px -translate-x-1/2 bg-ink/[0.05]" />
          </>
        )}
        <span aria-hidden="true" className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}

/**
 * The iPhone as drawn on the desktop preview (≥ 600px): thin titanium bezel, screen with the corner radius of the display
 * (≈ 55pt), Dynamic Island (126×37), status bar and home indicator (134×5). On a real phone (< 600px) it is just the full-window
 * screen. `children` is the screen content (the scroll area and the overlay layer, see DeviceFrame).
 */
export function IosDevice({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  const device = useDevice();
  if (device !== "phone") return <LargeDevice device={device}>{children}</LargeDevice>;
  return (
    <div className={bare ? undefined : "min-h-dvh min-[600px]:grid min-[600px]:place-items-center min-[600px]:p-6"}>
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
