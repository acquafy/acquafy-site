// components/sections/CalendarBoard.tsx
"use client";

import { useState, type ReactNode } from "react";
import { parseIso } from "@/lib/format";
import type { Installment } from "@/lib/portal/schedule";
import { CalendarDetails } from "./CalendarDetails";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarUpcoming } from "./CalendarUpcoming";
import { StatementReceiptModal } from "./StatementReceiptModal";

type Props = {
  installments: Installment[];
  today: string;
  units: number;
  /** Server-rendered contract card, placed under the details in the right column. */
  children: ReactNode;
};

/** State owner of the calendar screen: visible month, selected payout, detail modal. */
export function CalendarBoard({ installments, today, units, children }: Props) {
  const next = installments.find((i) => i.status === "next") ?? installments[0];
  const start = parseIso(next.paymentDate);
  const [cursor, setCursor] = useState({ y: start.y, m: start.m });
  const [selected, setSelected] = useState<Installment>(next);
  const [detail, setDetail] = useState<Installment | null>(null);

  const show = (i: Installment) => {
    const d = parseIso(i.paymentDate);
    setCursor({ y: d.y, m: d.m });
    setSelected(i);
  };

  return (
    <div className="grid items-start gap-4 @6xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="flex min-w-0 flex-col gap-4">
        <CalendarMonth installments={installments} today={today} cursor={cursor} onCursor={setCursor} selectedNumber={selected.number} onSelect={setSelected} />
        <CalendarUpcoming installments={installments} onShow={show} onReceipt={setDetail} />
      </div>
      <div className="grid items-start gap-4 @3xl:grid-cols-2 @6xl:grid-cols-1">
        <CalendarDetails installment={selected} units={units} isNext={selected.number === next.number} onBackToNext={() => show(next)} />
        {children}
      </div>
      <StatementReceiptModal payment={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
