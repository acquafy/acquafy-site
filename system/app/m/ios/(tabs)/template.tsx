// app/m/ios/(tabs)/template.tsx
import type { ReactNode } from "react";
import { IosTransition } from "@/components/mobile/ios/IosTransition";

export default function IosTabsTemplate({ children }: { children: ReactNode }) {
  return <IosTransition>{children}</IosTransition>;
}
