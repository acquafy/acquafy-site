// app/(portal)/extrato/page.tsx
import type { Metadata } from "next";
import { StatementContract } from "@/components/sections/StatementContract";
import { StatementHistory } from "@/components/sections/StatementHistory";
import { StatementKpis } from "@/components/sections/StatementKpis";
import { StatementNextPayment } from "@/components/sections/StatementNextPayment";
import { StatementPayments } from "@/components/sections/StatementPayments";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Extrato Financeiro" };

export default function StatementPage() {
  const { installments } = getPortalSummary();
  return (
    <>
      <StatementKpis />
      <div className="grid items-start gap-4 @5xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-4">
          <StatementHistory installments={installments} />
          <StatementPayments installments={installments} />
        </div>
        <div className="grid items-start gap-4 @2xl:grid-cols-2 @5xl:grid-cols-1">
          <StatementNextPayment />
          <StatementContract />
        </div>
      </div>
    </>
  );
}
