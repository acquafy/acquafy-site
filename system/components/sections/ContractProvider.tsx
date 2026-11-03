// components/sections/ContractProvider.tsx
"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useToast } from "@/components/providers/ToastProvider";
import { baseEvents, type ContractEvent, type ContractEventKind } from "@/config/contract-page";
import type { IsoDate } from "@/lib/format";
import { usePersistentState } from "@/lib/usePersistentState";
import { ContractAmendmentModal } from "./ContractAmendmentModal";

type NewEvent = { kind: Exclude<ContractEventKind, "marco">; title: string; description: string };

type ContractContextValue = {
  /** Every event of the contract, newest first. */
  events: ContractEvent[];
  /** Records a request (amendment or buy-back) as "Em análise" and returns its protocol. */
  addEvent: (input: NewEvent) => ContractEvent;
  openAmendment: () => void;
  today: IsoDate;
};

const ContractContext = createContext<ContractContextValue | null>(null);

export function useContract(): ContractContextValue {
  const ctx = useContext(ContractContext);
  if (!ctx) throw new Error("useContract must be used inside <ContractProvider>");
  return ctx;
}

const PREFIX: Record<NewEvent["kind"], string> = { aditivo: "ADT", recompra: "REC" };

/**
 * Owns the contract history shared by the header, the history tab and the buy-back simulator: requests are kept in
 * localStorage (mock) and the amendment dialog lives here so any button can open it.
 */
export function ContractProvider({ today, children }: { today: IsoDate; children: ReactNode }) {
  const toast = useToast();
  const [stored, setStored] = usePersistentState<ContractEvent[]>("contract-events", []);
  const [amendmentOpen, setAmendmentOpen] = useState(false);

  const addEvent = useCallback(
    (input: NewEvent): ContractEvent => {
      const sequence = stored.filter((e) => e.kind === input.kind).length + 1;
      const event: ContractEvent = {
        id: `${input.kind}-${Date.now()}`,
        kind: input.kind,
        title: input.title,
        description: input.description,
        date: today,
        status: "Em análise",
        protocol: `${PREFIX[input.kind]}-${today.slice(0, 4)}-${String(sequence).padStart(4, "0")}`,
      };
      setStored((list) => [event, ...list]);
      return event;
    },
    [stored, today, setStored],
  );

  const value = useMemo<ContractContextValue>(() => ({ events: [...stored, ...baseEvents], addEvent, openAmendment: () => setAmendmentOpen(true), today }), [stored, addEvent, today]);

  return (
    <ContractContext.Provider value={value}>
      {children}
      <ContractAmendmentModal
        open={amendmentOpen}
        onClose={() => setAmendmentOpen(false)}
        onSubmit={(type, reason) => {
          const event = addEvent({ kind: "aditivo", title: `Solicitação de aditivo: ${type}`, description: reason });
          toast({ title: "Solicitação de aditivo enviada", description: `Protocolo ${event.protocol}. Nossa equipe responde em até 2 dias úteis.` });
        }}
      />
    </ContractContext.Provider>
  );
}
