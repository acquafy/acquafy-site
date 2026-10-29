// components/base/previews/ContractPreviews.tsx
import type { ReactNode } from "react";
import { MobileContract } from "@/components/mobile/sections/MobileContract";
import { ContractBuyback } from "@/components/sections/ContractBuyback";
import { ContractClauses } from "@/components/sections/ContractClauses";
import { ContractHeader } from "@/components/sections/ContractHeader";
import { ContractHistory } from "@/components/sections/ContractHistory";
import { ContractKpis } from "@/components/sections/ContractKpis";
import { ContractProvider } from "@/components/sections/ContractProvider";
import { ContractShortcuts } from "@/components/sections/ContractShortcuts";
import { ContractSignature } from "@/components/sections/ContractSignature";
import { ContractSummaryPanel } from "@/components/sections/ContractSummaryPanel";
import { ContractTabs } from "@/components/sections/ContractTabs";
import { ContractTimeline } from "@/components/sections/ContractTimeline";
import { contract, UNIT_PRICE } from "@/config/investor";
import { getPortalSummary } from "@/lib/portal/schedule";
import { ContractAmendmentModalDemo, MobileContractAmendmentSheetDemo, MobileContractBuybackDemo, MobileContractDetailsDemo } from "./ContractDemos";
import type { PreviewMap } from "./types";

/** ContractHeader, ContractHistory and ContractBuyback read the contract history from <ContractProvider>, so they are shown inside it. */
function Provided({ children }: { children: ReactNode }) {
  return <ContractProvider today={getPortalSummary().today}>{children}</ContractProvider>;
}

export const contractPreviews: PreviewMap = {
  ContractAmendmentModal: () => ({ node: <ContractAmendmentModalDemo /> }),
  ContractBuyback: () => {
    const s = getPortalSummary();
    return {
      node: (
        <Provided>
          <div className="max-w-md">
            <ContractBuyback units={s.units} unitPrice={UNIT_PRICE} buybackShare={contract.buybackShare} endDate={contract.endDate} />
          </div>
        </Provided>
      ),
      note: "Usa o histórico do ContractProvider (mostrado dentro dele).",
    };
  },
  ContractClauses: () => ({ node: <ContractClauses /> }),
  ContractHeader: () => ({
    node: (
      <Provided>
        <ContractHeader />
      </Provided>
    ),
    note: "Usa o ContractProvider (aditivo abre o modal que ele guarda).",
  }),
  ContractHistory: () => ({
    node: (
      <Provided>
        <ContractHistory />
      </Provided>
    ),
    note: "Usa o histórico do ContractProvider (mostrado dentro dele).",
  }),
  ContractKpis: () => ({ node: <ContractKpis /> }),
  ContractProvider: () => ({
    node: (
      <Provided>
        <ContractHeader />
      </Provided>
    ),
    note: "Provider, não tem visual próprio: guarda o histórico e o modal de aditivo. Aqui envolve ContractHeader.",
  }),
  ContractShortcuts: () => ({
    node: (
      <div className="max-w-sm">
        <ContractShortcuts />
      </div>
    ),
  }),
  ContractSignature: () => ({ node: <ContractSignature /> }),
  ContractSummaryPanel: () => {
    const s = getPortalSummary();
    return { node: <ContractSummaryPanel units={s.units} invested={s.invested} installments={s.installments.length} firstPayout={s.installments[0].paymentDate} receivedCount={s.receivedCount} /> };
  },
  ContractTabs: () => {
    const s = getPortalSummary();
    return {
      node: (
        <Provided>
          <ContractTabs units={s.units} invested={s.invested} installments={s.installments.length} firstPayout={s.installments[0].paymentDate} receivedCount={s.receivedCount} />
        </Provided>
      ),
      note: "A aba de histórico usa o ContractProvider (mostrado dentro dele).",
    };
  },
  ContractTimeline: () => ({ node: <ContractTimeline /> }),
  MobileContract: () => ({ node: <MobileContract summary={getPortalSummary()} />, tall: true }),
  MobileContractAmendmentSheet: () => ({ node: <MobileContractAmendmentSheetDemo />, tall: true }),
  MobileContractBuyback: () => {
    const s = getPortalSummary();
    return { node: <MobileContractBuybackDemo today={s.today} units={s.units} unitPrice={UNIT_PRICE} buybackShare={contract.buybackShare} endDate={contract.endDate} />, tall: true };
  },
  MobileContractDetails: () => {
    const s = getPortalSummary();
    return {
      node: (
        <MobileContractDetailsDemo
          today={s.today}
          units={s.units}
          invested={s.invested}
          installments={s.installments.length}
          firstPayout={s.installments[0].paymentDate}
          receivedCount={s.receivedCount}
        />
      ),
      tall: true,
    };
  },
};
