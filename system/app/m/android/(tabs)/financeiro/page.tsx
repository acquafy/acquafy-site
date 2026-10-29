// app/m/android/(tabs)/financeiro/page.tsx
import type { Metadata } from "next";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobileFinanceExplorer } from "@/components/mobile/sections/MobileFinanceExplorer";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Financeiro" };

export default function AndroidFinancePage() {
  return (
    <AndroidScreen title="Extrato Financeiro" navTitle="Financeiro" subtitle="Acompanhe seus repasses em dólar, com histórico completo.">
      <MobileFinanceExplorer summary={getPortalSummary()} />
    </AndroidScreen>
  );
}
