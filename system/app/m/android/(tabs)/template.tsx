// app/m/android/(tabs)/template.tsx
import type { ReactNode } from "react";
import { AndroidTransition } from "@/components/mobile/android/AndroidTransition";

export default function AndroidTabsTemplate({ children }: { children: ReactNode }) {
  return <AndroidTransition>{children}</AndroidTransition>;
}
