// components/base/previews/CalendarDemos.tsx
"use client";

import { useState } from "react";
import { CalendarDetails } from "@/components/sections/CalendarDetails";
import { CalendarMonth } from "@/components/sections/CalendarMonth";
import { CalendarUpcoming } from "@/components/sections/CalendarUpcoming";
import { StatementReceiptModal } from "@/components/sections/StatementReceiptModal";
import { parseIso, type IsoDate } from "@/lib/format";
import type { Installment } from "@/lib/portal/schedule";

const nextOf = (installments: Installment[]) => installments.find((i) => i.status === "next") ?? installments[0];

/** The month grid on its own: it opens on the month of the next payout and the selection follows the clicks. */
export function CalendarMonthDemo({ installments, today }: { installments: Installment[]; today: IsoDate }) {
  const next = nextOf(installments);
  const start = parseIso(next.paymentDate);
  const [cursor, setCursor] = useState({ y: start.y, m: start.m });
  const [selected, setSelected] = useState<Installment>(next);
  return <CalendarMonth installments={installments} today={today} cursor={cursor} onCursor={setCursor} selectedNumber={selected.number} onSelect={setSelected} />;
}

export function CalendarDetailsDemo({ installments, units }: { installments: Installment[]; units: number }) {
  const next = nextOf(installments);
  const [selected, setSelected] = useState<Installment>(installments.find((i) => i.status === "received") ?? next);
  return (
    <div className="max-w-sm">
      <CalendarDetails installment={selected} units={units} isNext={selected.number === next.number} onBackToNext={() => setSelected(next)} />
    </div>
  );
}

export function CalendarUpcomingDemo({ installments }: { installments: Installment[] }) {
  const [detail, setDetail] = useState<Installment | null>(null);
  return (
    <>
      <CalendarUpcoming installments={installments} onShow={setDetail} onReceipt={setDetail} />
      <StatementReceiptModal payment={detail} onClose={() => setDetail(null)} />
    </>
  );
}
