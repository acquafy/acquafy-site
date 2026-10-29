// app/m/android/layout.tsx
import type { ReactNode } from "react";
import { AndroidShell } from "@/components/mobile/android/AndroidShell";
import { MobileRoot } from "@/components/mobile/MobileRoot";

/** Android app: platform scope + providers (MobileRoot), then the Android shell (frame + scrolling screen). */
export default function AndroidLayout({ children }: { children: ReactNode }) {
  return (
    <MobileRoot platform="android">
      <AndroidShell>{children}</AndroidShell>
    </MobileRoot>
  );
}
