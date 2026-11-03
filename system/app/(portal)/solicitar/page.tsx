// app/(portal)/solicitar/page.tsx
import type { Metadata } from "next";
import { RequestWorkspace } from "@/components/sections/RequestWorkspace";
import { UNIT_PRICE } from "@/config/investor";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Solicitar Mais Purificadores" };

export default function RequestPage() {
  const s = getPortalSummary();

  return <RequestWorkspace today={s.today} baseline={{ units: s.units, monthlyPayout: s.monthlyPayout, installments: s.installments.length, unitPrice: UNIT_PRICE }} />;
}
