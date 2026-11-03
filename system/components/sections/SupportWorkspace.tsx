// components/sections/SupportWorkspace.tsx
"use client";

import { useState } from "react";
import { SEED_TICKETS, type Ticket } from "@/config/support-page";
import type { IsoDate } from "@/lib/format";
import { usePersistentState } from "@/lib/usePersistentState";
import { SupportChannels } from "./SupportChannels";
import { SupportFaq } from "./SupportFaq";
import { SupportSearch } from "./SupportSearch";
import { SupportTicketForm } from "./SupportTicketForm";
import { SupportTickets } from "./SupportTickets";

/** Holds what the blocks share: the search text and the tickets (persisted while the data is mocked). */
export function SupportWorkspace({ today }: { today: IsoDate }) {
  const [query, setQuery] = useState("");
  const [tickets, setTickets] = usePersistentState<Ticket[]>("chamados", SEED_TICKETS);
  /** Changing the key remounts the form with a new starting subject ("Abrir chamado" from an empty search). */
  const [form, setForm] = useState({ key: 0, subject: "" });

  const focusForm = (subject = "") => {
    setForm((f) => ({ key: f.key + 1, subject }));
    window.setTimeout(() => {
      const card = document.getElementById("abrir-chamado");
      card?.scrollIntoView({ behavior: "smooth", block: "start" });
      card?.querySelector<HTMLElement>("input")?.focus({ preventScroll: true });
    }, 0);
  };

  const createTicket = (ticket: Ticket) => setTickets((list) => [ticket, ...list]);
  const updateTicket = (id: string, change: (t: Ticket) => Ticket) => setTickets((list) => list.map((t) => (t.id === id ? change(t) : t)));

  return (
    // `relative` keeps the sr-only helpers inside the scrolling <main> (they would otherwise stretch the document).
    <div className="relative flex min-w-0 flex-col gap-4">
      <SupportSearch query={query} onQuery={setQuery} />
      <SupportChannels />
      <div className="grid items-start gap-4 @[880px]:grid-cols-[minmax(0,1fr)_380px]">
        <SupportFaq query={query} onClearQuery={() => setQuery("")} onOpenTicket={focusForm} />
        <SupportTicketForm key={form.key} today={today} tickets={tickets} onCreate={createTicket} initialSubject={form.subject} />
      </div>
      <SupportTickets tickets={tickets} today={today} onUpdate={updateTicket} onOpenForm={() => focusForm()} />
    </div>
  );
}
