// components/sections/ContractTabs.tsx
"use client";

import { useState, type ComponentProps } from "react";
import { FileText, History, ListChecks, PenLine } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tabs, TabPanel, type TabItem } from "@/components/ui/Tabs";
import { ContractClauses } from "./ContractClauses";
import { ContractHistory } from "./ContractHistory";
import { ContractSignature } from "./ContractSignature";
import { ContractSummaryPanel } from "./ContractSummaryPanel";

type TabId = "resumo" | "clausulas" | "historico" | "assinatura";

const TABS: TabItem<TabId>[] = [
  { id: "resumo", label: "Resumo", icon: FileText },
  { id: "clausulas", label: "Cláusulas", icon: ListChecks },
  { id: "historico", label: "Aditivos e histórico", icon: History },
  { id: "assinatura", label: "Assinatura", icon: PenLine },
];

/** Detail card of the contract: summary, clauses, amendments/history and signature. */
export function ContractTabs(props: ComponentProps<typeof ContractSummaryPanel>) {
  const [tab, setTab] = useState<TabId>("resumo");
  return (
    <Card container>
      <Tabs items={TABS} value={tab} onChange={setTab} label="Detalhes do contrato" idPrefix="contract" />
      <TabPanel idPrefix="contract" value={tab} className="mt-4">
        {tab === "resumo" && <ContractSummaryPanel {...props} />}
        {tab === "clausulas" && <ContractClauses />}
        {tab === "historico" && <ContractHistory />}
        {tab === "assinatura" && <ContractSignature />}
      </TabPanel>
    </Card>
  );
}
