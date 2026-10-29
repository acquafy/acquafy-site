// app/m/ios/(tabs)/contrato/page.tsx
import type { Metadata } from "next";
import { IosScreen } from "@/components/mobile/ios/IosScreen";
import { MobileContract } from "@/components/mobile/sections/MobileContract";
import { mobilePath } from "@/lib/mobile/platform";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Meu Contrato" };

export default function IosContractPage() {
  return (
    <IosScreen title="Meu Contrato" subtitle="Condições, andamento e opções do seu contrato." back={{ href: mobilePath("ios", "home"), label: "Início" }}>
      <MobileContract summary={getPortalSummary()} />
    </IosScreen>
  );
}
