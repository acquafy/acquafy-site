// app/(portal)/calendario/page.tsx
import type { Metadata } from "next";
import { CalendarBoard } from "@/components/sections/CalendarBoard";
import { CalendarContract } from "@/components/sections/CalendarContract";
import { CalendarKpis } from "@/components/sections/CalendarKpis";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Calendário de Repasses" };

export default function PayoutCalendarPage() {
  const s = getPortalSummary();
  return (
    <>
      <CalendarKpis />
      <CalendarBoard installments={s.installments} today={s.today} units={s.units}>
        <CalendarContract />
      </CalendarBoard>
    </>
  );
}
