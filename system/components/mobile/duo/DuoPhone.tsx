// components/mobile/duo/DuoPhone.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { DEVICE_PARAM, DEVICE_SIZE, type Device } from "@/lib/mobile/devices";
import type { Platform } from "@/lib/mobile/platform";

const CAPTION_SPACE = 56;
/** Width of the stage's left column (DuoNav) plus the padding around the devices. */
const SIDE_SPACE = 240 + 64;

function outer(platform: Platform, device: Device) {
  const d = DEVICE_SIZE[platform][device]!;
  return { width: d.width + d.bezel, height: d.height + d.bezel };
}

/**
 * One zoom for every device of the stage (the real proportions are kept). Phones sit side by side, so the taller one plus its caption
 * must fit the window height; tablets and foldables are stacked, so the wider one must fit the width and the page scrolls.
 */
function useFitScale(device: Device): number {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const sizes = (["ios", "android"] as const).filter((p) => DEVICE_SIZE[p][device]).map((p) => outer(p, device));
    const tallest = Math.max(...sizes.map((s) => s.height)) + CAPTION_SPACE;
    const widest = Math.max(...sizes.map((s) => s.width));
    const update = () => {
      const byHeight = (window.innerHeight - 32) / tallest;
      const byWidth = (window.innerWidth - SIDE_SPACE) / (device === "phone" ? widest * 2 + 56 : widest);
      setScale(Math.min(1, device === "phone" ? Math.min(byHeight, byWidth) : byWidth));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [device]);
  return scale;
}

/**
 * A device of the stage: scaled with a transform (its layout box is scaled too, so the page does not overflow), and links to other
 * mobile screens are caught so they load in the stage (every device) instead of leaving it.
 */
export function DuoPhone({ platform, device, caption, embed = false, children }: { platform: Platform; device: Device; caption: string; embed?: boolean; children: ReactNode }) {
  const router = useRouter();
  const fit = useFitScale(device);
  // Embedded (a /base thumbnail): the iframe is exactly the device, so no scaling and no caption.
  const scale = embed ? 1 : fit;
  const { width, height } = outer(platform, device);

  return (
    <figure className="flex flex-col items-center gap-4">
      <div style={{ width: width * scale, height: height * scale }}>
        <div
          style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}
          onClickCapture={(e) => {
            const target = e.target as HTMLElement;
            // The minimized tab bar expands on tap (IosTabBar handles it) instead of navigating.
            if (target.closest("[data-minimized]")) return;
            const href = target.closest("a")?.getAttribute("href");
            const match = href?.match(/^\/m\/(?:ios|android)\/(.*)$/);
            if (!match) return;
            e.preventDefault();
            e.stopPropagation();
            if (embed) return;
            router.push(`/m/duo/${match[1]}${device === "phone" ? "" : `?${DEVICE_PARAM}=${device}`}`);
          }}
        >
          {children}
        </div>
      </div>
      {!embed && <figcaption className="text-[14px] font-semibold text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}
