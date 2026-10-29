// components/mobile/android/AndroidDevice.tsx
"use client";

import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { cn } from "@/lib/cn";

/**
 * The Android device as drawn on the desktop preview, per form factor (`useDevice()`):
 * - phone (≥ 600px): a Pixel, thin bezel, display corner radius, punch-hole camera, 24dp status bar, gesture pill. On a real phone
 *   (< 600px) it is just the full-window screen.
 * - tablet: a Pixel Tablet held landscape, uniform 14px bezel, 24px corners, the small camera sits in the bezel (top centre of the long edge).
 * - foldable: a Galaxy Z Fold unfolded like a book, 12px bezel, punch-hole at the top right and the hinge as a faint vertical crease in the
 *   middle (two light gradients, no shadow, pointer-events none, so it never gets in the way of the content).
 * `children` is the screen content (the scroll area and the overlay layer, see DeviceFrame). Outer size = screen + `bezel` of lib/mobile/devices.ts.
 */
export function AndroidDevice({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  const device = useDevice();
  const phone = device === "phone";
  const foldable = device === "foldable";
  // Big screens are only shown on the desktop stage, so their chrome is always drawn; the phone's only from 600px up.
  const chromeOn = phone ? "z-30 hidden min-[600px]:block" : "z-50 block"; // on big screens the system bars stay above a side sheet

  return (
    <div className={bare ? undefined : "min-h-dvh min-[600px]:grid min-[600px]:place-items-center min-[600px]:p-6"}>
      <div
        className={cn(
          "relative mx-auto",
          phone && "w-full min-[600px]:w-auto min-[600px]:rounded-[54px] min-[600px]:border min-[600px]:border-white/10 min-[600px]:bg-(--m-bezel) min-[600px]:p-[9px]",
          device === "tablet" && "w-fit rounded-[38px] border border-white/10 bg-(--m-bezel) p-[13px]",
          foldable && "w-fit rounded-[32px] border border-white/10 bg-(--m-bezel) p-[11px]",
        )}
      >
        {/* Side keys (a phone has them on the edge; the tablet and the fold are held by the hinge/edge, so they are left out) */}
        {phone && (
          <>
            <span aria-hidden="true" className="absolute top-[180px] -right-[3px] hidden h-[56px] w-[3px] rounded-r-sm bg-(--m-bezel) min-[600px]:block" />
            <span aria-hidden="true" className="absolute top-[260px] -right-[3px] hidden h-[96px] w-[3px] rounded-r-sm bg-(--m-bezel) min-[600px]:block" />
          </>
        )}
        {/* Tablet camera: a small lens in the top bezel, centred on the long edge */}
        {device === "tablet" && <span aria-hidden="true" className="absolute top-[4px] left-1/2 size-[6px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/15" />}
        <div
          data-device-screen
          className={cn(
            "relative isolate h-(--m-frame-h) overflow-hidden text-(--md-on-surface) [background:var(--m-bg)]",
            phone && "w-full min-[600px]:w-(--m-frame-w) min-[600px]:rounded-[44px]",
            device === "tablet" && "w-(--m-frame-w) rounded-[24px]",
            foldable && "w-(--m-frame-w) rounded-[20px]",
          )}
        >
          {children}
          {foldable && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-5 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(0_0_0/0.06)_42%,rgb(255_255_255/0.07)_58%,transparent)]"
            />
          )}
          <div aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 top-0 h-(--m-safe-top) text-(--md-on-surface)", chromeOn)}>
            {phone && <span className="absolute top-[7px] left-1/2 size-[11px] -translate-x-1/2 rounded-full bg-black ring-[1.5px] ring-black/40" />}
            {foldable && <span className="absolute top-[7px] right-[14px] size-[10px] rounded-full bg-black ring-[1.5px] ring-black/40" />}
            <span className="absolute top-0 left-[22px] flex h-6 items-center text-[13px] leading-none font-medium tracking-[0.2px]">9:41</span>
            <span className={cn("absolute top-0 flex h-6 items-center gap-1", foldable ? "right-[38px]" : "right-[18px]")}>
              <Wifi className="size-[14px]" strokeWidth={2.5} />
              <Signal className="size-[14px]" strokeWidth={2.5} />
              <BatteryFull className="size-[18px]" strokeWidth={2} />
            </span>
          </div>
          <span aria-hidden="true" className={cn("pointer-events-none absolute bottom-2 left-1/2 h-1 w-[108px] -translate-x-1/2 rounded-full bg-(--md-on-surface) opacity-80", chromeOn)} />
        </div>
      </div>
    </div>
  );
}
