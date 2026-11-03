// app/m/ios/(tabs)/documentos/page.tsx
import type { Metadata } from "next";
import { IosScreen } from "@/components/mobile/ios/IosScreen";
import { MobileDocumentsExplorer } from "@/components/mobile/sections/MobileDocumentsExplorer";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Documentos" };

export default function IosDocumentsPage() {
  return (
    <IosScreen title="Documentos" subtitle="Acesse e gerencie seus contratos, comprovantes e outros documentos.">
      <MobileDocumentsExplorer today={portalToday()} />
    </IosScreen>
  );
}
