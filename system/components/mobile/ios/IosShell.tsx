// components/mobile/ios/IosShell.tsx
"use client";

import type { ReactNode } from "react";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";

/** The iPhone: device frame (bezel on desktop, full screen on a phone) holding the scrolling screen. */
export function IosShell({ children }: { children: ReactNode }) {
  return <DeviceFrame platform="ios">{children}</DeviceFrame>;
}
