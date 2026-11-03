// app/(portal)/contrato/page.tsx
import type { Metadata } from "next";
import { ContractBuyback } from "@/components/sections/ContractBuyback";
import { ContractHeader } from "@/components/sections/ContractHeader";
import { ContractKpis } from "@/components/sections/ContractKpis";
import { ContractProvider } from "@/components/sections/ContractProvider";
import { ContractShortcuts } from "@/components/sections/ContractShortcuts";
import { ContractTabs } from "@/components/sections/ContractTabs";
import { ContractTimeline } from "@/components/sections/ContractTimeline";
import { contract, UNIT_PRICE } from "@/config/investor";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Meu Contrato" };

export default function ContractPage() {
  const s = getPortalSummary();

  return (
    <ContractProvider today={s.today}>
      <ContractHeader />
      <ContractKpis />
      <div className="grid items-start gap-4 @[1000px]:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-4">
          <ContractTimeline />
          <ContractTabs units={s.units} invested={s.invested} installments={s.installments.length} firstPayout={s.installments[0].paymentDate} receivedCount={s.receivedCount} />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <ContractBuyback units={s.units} unitPrice={UNIT_PRICE} buybackShare={contract.buybackShare} endDate={contract.endDate} />
          <ContractShortcuts />
        </div>
      </div>
    </ContractProvider>
  );
}
