// app/m/ios/(tabs)/financeiro/page.tsx
import type { Metadata } from "next";
import { IosScreen } from "@/components/mobile/ios/IosScreen";
import { MobileFinanceExplorer } from "@/components/mobile/sections/MobileFinanceExplorer";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Financeiro" };

export default function IosFinancePage() {
  return (
    <IosScreen title="Extrato Financeiro" navTitle="Financeiro" subtitle="Acompanhe seus repasses em dólar, com histórico completo.">
      <MobileFinanceExplorer summary={getPortalSummary()} />
    </IosScreen>
  );
}
