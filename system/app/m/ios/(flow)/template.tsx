// app/m/ios/(flow)/template.tsx
import type { ReactNode } from "react";
import { IosTransition } from "@/components/mobile/ios/IosTransition";

export default function IosFlowTemplate({ children }: { children: ReactNode }) {
  return <IosTransition>{children}</IosTransition>;
}
