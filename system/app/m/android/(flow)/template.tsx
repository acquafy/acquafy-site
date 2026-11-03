// app/m/android/(flow)/template.tsx
import type { ReactNode } from "react";
import { AndroidTransition } from "@/components/mobile/android/AndroidTransition";

export default function AndroidFlowTemplate({ children }: { children: ReactNode }) {
  return <AndroidTransition>{children}</AndroidTransition>;
}
