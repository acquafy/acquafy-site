// app/m/android/(tabs)/contrato/page.tsx
import type { Metadata } from "next";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobileContract } from "@/components/mobile/sections/MobileContract";
import { mobilePath } from "@/lib/mobile/platform";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Meu Contrato" };

export default function AndroidContractPage() {
  return (
    <AndroidScreen title="Meu Contrato" subtitle="Condições, andamento e opções do seu contrato." back={{ href: mobilePath("android", "home"), label: "Início" }}>
      <MobileContract summary={getPortalSummary()} />
    </AndroidScreen>
  );
}
