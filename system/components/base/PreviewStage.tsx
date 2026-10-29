// components/base/PreviewStage.tsx
"use client";

import { useMemo, useState, type ReactNode } from "react";
import { FrameContext } from "@/components/mobile/frame-context";
import { PlatformProvider } from "@/components/mobile/PlatformProvider";
import { cn } from "@/lib/cn";

/** Web organisms live in a container, like the portal's `<main>` (`@container` + `relative` + `bg-card`): their grids answer to this width, and `relative` + `overflow-x-clip` keep sr-only helpers and wide tables from stretching the page. */
export function DesktopStage({ children }: { children: ReactNode }) {
  return <div className="@container relative min-w-0 overflow-x-clip rounded-xl border border-line bg-card p-4">{children}</div>;
}

/**
 * App organisms live in a phone-wide panel (390px iOS, 412px Android) with the platform scope and the app background. The panel also provides the
 * frame's overlay layer, so sheets open inside it instead of covering the page; `tall` fixes its height for those
 * (organisms that open sheets), and the content scrolls inside, like a screen.
 */
/** The phone each platform is previewed on (same numbers as lib/mobile/devices.ts and app/m/duo.css): size and safe areas, so frame-relative organisms look as on the real screen. */
const PHONE_VARS = {
  ios: { width: 390, vars: { "--m-frame-w": "390px", "--m-frame-h": "844px", "--m-safe-top": "54px", "--m-safe-bottom": "34px" } },
  android: { width: 412, vars: { "--m-frame-w": "412px", "--m-frame-h": "915px", "--m-safe-top": "24px", "--m-safe-bottom": "24px" } },
} as const;

export function PhoneStage({ tall = false, platform = "ios", children }: { tall?: boolean; platform?: "ios" | "android"; children: ReactNode }) {
  const [overlayRoot, setOverlayRoot] = useState<HTMLElement | null>(null);
  const frame = useMemo(() => ({ overlayRoot, scrollRoot: null }), [overlayRoot]);

  return (
    <PlatformProvider platform={platform}>
      <div
        style={{ width: PHONE_VARS[platform].width, ...PHONE_VARS[platform].vars } as React.CSSProperties}
        className={cn("relative isolate max-w-full overflow-hidden rounded-[28px] text-ink [background:var(--m-bg)]", tall && "h-[700px]")}
      >
        <FrameContext value={frame}>
          <div className={cn("p-4", tall && "m-noscrollbar h-full overflow-x-hidden overflow-y-auto")}>{children}</div>
          <div ref={setOverlayRoot} className="pointer-events-none absolute inset-0 z-40" />
        </FrameContext>
      </div>
    </PlatformProvider>
  );
}
