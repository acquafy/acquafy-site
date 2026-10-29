// app/m/android/(tabs)/documentos/page.tsx
import type { Metadata } from "next";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobileDocumentsExplorer } from "@/components/mobile/sections/MobileDocumentsExplorer";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Documentos" };

export default function AndroidDocumentsPage() {
  return (
    <AndroidScreen title="Documentos" subtitle="Acesse e gerencie seus contratos, comprovantes e outros documentos.">
      <MobileDocumentsExplorer today={portalToday()} />
    </AndroidScreen>
  );
}
