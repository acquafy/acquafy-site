// app/m/ios/(tabs)/layout.tsx
import type { ReactNode } from "react";
import { IosTabsLayout } from "@/components/mobile/ios/IosTabBar";

/** Screens with the bottom tab bar (the five tabs and the screens pushed from them). */
export default function IosTabsGroupLayout({ children }: { children: ReactNode }) {
  return <IosTabsLayout>{children}</IosTabsLayout>;
}
