// lib/portal/useContractEvents.ts
"use client";

import { useCallback } from "react";
import { baseEvents, type ContractEvent, type ContractEventKind } from "@/config/contract-page";
import type { IsoDate } from "@/lib/format";
import { usePersistentState } from "@/lib/usePersistentState";

export type NewContractEvent = { kind: Exclude<ContractEventKind, "marco">; title: string; description: string };

const PREFIX: Record<NewContractEvent["kind"], string> = { aditivo: "ADT", recompra: "REC" };

/**
 * Contract history: the milestones that always exist plus the amendments and buy-backs the investor requests (kept in
 * localStorage under the same key as the desktop, so both sides agree). `addEvent` returns the new record with its protocol.
 */
export function useContractEvents(today: IsoDate) {
  const [stored, setStored] = usePersistentState<ContractEvent[]>("contract-events", []);

  const addEvent = useCallback(
    (input: NewContractEvent): ContractEvent => {
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

  return { events: [...stored, ...baseEvents], addEvent };
}
