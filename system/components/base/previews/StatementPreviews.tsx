// components/base/previews/StatementPreviews.tsx
import { MobileFinanceExplorer } from "@/components/mobile/sections/MobileFinanceExplorer";
import { StatementContract } from "@/components/sections/StatementContract";
import { StatementHistory } from "@/components/sections/StatementHistory";
import { StatementKpis } from "@/components/sections/StatementKpis";
import { StatementNextPayment } from "@/components/sections/StatementNextPayment";
import { StatementPayments } from "@/components/sections/StatementPayments";
import { getPortalSummary } from "@/lib/portal/schedule";
import { MobileFinanceRowDemo, MobileFinanceSheetDemo, StatementReceiptModalDemo } from "./StatementDemos";
import type { PreviewMap } from "./types";

/** A payout already received (it has a receipt), or the first one when nothing was received yet. */
const sample = () => {
  const { installments } = getPortalSummary();
  return installments.find((i) => i.status === "received") ?? installments[0];
};

export const statementPreviews: PreviewMap = {
  StatementContract: () => ({ node: <StatementContract /> }),
  StatementHistory: () => ({ node: <StatementHistory installments={getPortalSummary().installments} /> }),
  StatementKpis: () => ({ node: <StatementKpis /> }),
  StatementNextPayment: () => ({ node: <StatementNextPayment /> }),
  StatementPayments: () => ({ node: <StatementPayments installments={getPortalSummary().installments} /> }),
  StatementReceiptModal: () => ({ node: <StatementReceiptModalDemo payment={sample()} /> }),
  MobileFinanceExplorer: () => ({ node: <MobileFinanceExplorer summary={getPortalSummary()} />, tall: true }),
  MobileFinanceRow: () => ({ node: <MobileFinanceRowDemo payment={sample()} />, tall: true }),
  MobileFinanceSheet: () => ({ node: <MobileFinanceSheetDemo payment={sample()} />, tall: true }),
};
