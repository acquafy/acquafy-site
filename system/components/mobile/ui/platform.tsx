// components/mobile/ui/platform.tsx
"use client";

import type { ComponentType } from "react";
import { usePlatform } from "@/components/mobile/PlatformProvider";

/** Picks the iOS or the Android implementation of a primitive from the platform scope (see PlatformProvider). */
export function byPlatform<P extends object>(ios: ComponentType<P>, android: ComponentType<P>): ComponentType<P> {
  function PlatformSwitch(props: P) {
    const Component = usePlatform() === "android" ? android : ios;
    return <Component {...props} />;
  }
  return PlatformSwitch;
}
