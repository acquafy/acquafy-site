// app/(portal)/dashboard/page.tsx
import type { Metadata } from "next";
import { DashboardContract } from "@/components/sections/DashboardContract";
import { DashboardKpis } from "@/components/sections/DashboardKpis";
import { DashboardPayments } from "@/components/sections/DashboardPayments";
import { DashboardPayouts } from "@/components/sections/DashboardPayouts";
import { DashboardPurifiers } from "@/components/sections/DashboardPurifiers";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Dashboard" };

/** Dashboard: the data overview of the investment. Shortcuts and daily tasks live in Home. */
export default function DashboardPage() {
  const s = getPortalSummary();
  return (
    <>
      <DashboardKpis />
      <div className="grid gap-4 @4xl:grid-cols-[1.1fr_1fr]">
        <DashboardPayments installments={s.installments} monthly={s.monthlyPayout} />
        <DashboardContract />
      </div>
      <div className="grid gap-4 @4xl:grid-cols-2">
        <DashboardPurifiers />
        <DashboardPayouts />
      </div>
    </>
  );
}
