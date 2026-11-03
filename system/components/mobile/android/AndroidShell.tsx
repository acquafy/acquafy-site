// components/mobile/android/AndroidShell.tsx
"use client";

import type { ReactNode } from "react";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";

/** The Android phone: device frame (bezel + punch-hole camera on desktop, full screen on a phone) holding the scrolling screen. */
export function AndroidShell({ children }: { children: ReactNode }) {
  return <DeviceFrame platform="android">{children}</DeviceFrame>;
}
