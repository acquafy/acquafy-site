import type { ReactNode } from "react";
import { IosTransition } from "@/components/mobile/ios/IosTransition";

/** Perfil → Perfil/<seção> stays inside the same top-level segment, so the tabs template does not remount: animate the push/pop here. */
export default function IosProfileTemplate({ children }: { children: ReactNode }) {
  return <IosTransition>{children}</IosTransition>;
}
