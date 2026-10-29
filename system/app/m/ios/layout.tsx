// app/m/ios/layout.tsx
import type { ReactNode } from "react";
import { IosShell } from "@/components/mobile/ios/IosShell";
import { MobileRoot } from "@/components/mobile/MobileRoot";

/** iOS app: platform scope + providers (MobileRoot), then the iPhone shell (frame + scrolling screen). */
export default function IosLayout({ children }: { children: ReactNode }) {
  return (
    <MobileRoot platform="ios">
      <IosShell>{children}</IosShell>
    </MobileRoot>
  );
}
