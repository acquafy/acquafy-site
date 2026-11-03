// components/base/previews/StatementDemos.tsx
"use client";

import { useState } from "react";
import { MobileFinanceRow } from "@/components/mobile/sections/MobileFinanceRow";
import { MobileFinanceSheet } from "@/components/mobile/sections/MobileFinanceSheet";
import { StatementReceiptModal } from "@/components/sections/StatementReceiptModal";
import type { Installment } from "@/lib/portal/schedule";
import { OpenDemo } from "./OpenDemo";

export function StatementReceiptModalDemo({ payment }: { payment: Installment }) {
  return <OpenDemo>{(open, setOpen) => <StatementReceiptModal payment={open ? payment : null} onClose={() => setOpen(false)} />}</OpenDemo>;
}

export function MobileFinanceSheetDemo({ payment }: { payment: Installment }) {
  return <OpenDemo app>{(open, setOpen) => <MobileFinanceSheet payment={open ? payment : null} onClose={() => setOpen(false)} />}</OpenDemo>;
}

/** The row on its own; tapping it opens the payout sheet, as in the list. */
export function MobileFinanceRowDemo({ payment }: { payment: Installment }) {
  const [selected, setSelected] = useState<Installment | null>(null);
  return (
    <>
      <ul className="grid gap-2.5">
        <MobileFinanceRow installment={payment} onOpen={setSelected} />
      </ul>
      <MobileFinanceSheet payment={selected} onClose={() => setSelected(null)} />
    </>
  );
}
