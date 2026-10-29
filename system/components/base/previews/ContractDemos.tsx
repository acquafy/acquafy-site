// components/base/previews/ContractDemos.tsx
"use client";

import { useState } from "react";
import { MobileContractAmendmentSheet } from "@/components/mobile/sections/MobileContractAmendmentSheet";
import { MobileContractBuyback } from "@/components/mobile/sections/MobileContractBuyback";
import { MobileContractDetails } from "@/components/mobile/sections/MobileContractDetails";
import { useToast } from "@/components/providers/ToastProvider";
import { ContractAmendmentModal } from "@/components/sections/ContractAmendmentModal";
import type { IsoDate } from "@/lib/format";
import { useContractEvents } from "@/lib/portal/useContractEvents";
import { OpenDemo } from "./OpenDemo";

export function ContractAmendmentModalDemo() {
  const toast = useToast();
  return <OpenDemo>{(open, setOpen) => <ContractAmendmentModal open={open} onClose={() => setOpen(false)} onSubmit={(type) => toast({ title: "Aditivo solicitado", description: type })} />}</OpenDemo>;
}

export function MobileContractAmendmentSheetDemo() {
  const toast = useToast();
  return (
    <OpenDemo app>
      {(open, setOpen) => <MobileContractAmendmentSheet open={open} onClose={() => setOpen(false)} onSubmit={(type) => toast({ title: "Aditivo solicitado", description: type })} />}
    </OpenDemo>
  );
}

type BuybackProps = { today: IsoDate; units: number; unitPrice: number; buybackShare: number; endDate: string };

/** The buy-back simulator with the same history hook the screen uses (kept in localStorage, shared with the desktop). */
export function MobileContractBuybackDemo({ today, units, unitPrice, buybackShare, endDate }: BuybackProps) {
  const { addEvent } = useContractEvents(today);
  return <MobileContractBuyback units={units} unitPrice={unitPrice} buybackShare={buybackShare} endDate={endDate} addEvent={addEvent} />;
}

type DetailsProps = { today: IsoDate; units: number; invested: number; installments: number; firstPayout: string; receivedCount: number };

export function MobileContractDetailsDemo({ today, ...rest }: DetailsProps) {
  const { events } = useContractEvents(today);
  const [amendment, setAmendment] = useState(false);
  const toast = useToast();
  return (
    <>
      <MobileContractDetails {...rest} events={events} onAmendment={() => setAmendment(true)} />
      <MobileContractAmendmentSheet open={amendment} onClose={() => setAmendment(false)} onSubmit={(type) => toast({ title: "Aditivo solicitado", description: type })} />
    </>
  );
}
