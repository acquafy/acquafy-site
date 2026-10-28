// app/m/android/(tabs)/layout.tsx
import type { ReactNode } from "react";
import { AndroidTabsLayout } from "@/components/mobile/android/AndroidBottomNav";

/** Screens with the bottom tab bar (the five tabs and the screens pushed from them). */
export default function AndroidTabsGroupLayout({ children }: { children: ReactNode }) {
  return <AndroidTabsLayout>{children}</AndroidTabsLayout>;
}
