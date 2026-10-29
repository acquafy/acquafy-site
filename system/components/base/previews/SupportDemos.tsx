// components/base/previews/SupportDemos.tsx
"use client";

import { useState } from "react";
import { MobileSupportChat } from "@/components/mobile/sections/MobileSupportChat";
import { MobileSupportTickets } from "@/components/mobile/sections/MobileSupportTickets";
import { useToast } from "@/components/providers/ToastProvider";
import { SupportChat } from "@/components/sections/SupportChat";
import { SupportFaq } from "@/components/sections/SupportFaq";
import { SupportSearch } from "@/components/sections/SupportSearch";
import { SupportTicketForm } from "@/components/sections/SupportTicketForm";
import { SupportTickets } from "@/components/sections/SupportTickets";
import { SEED_TICKETS, type Ticket } from "@/config/support-page";
import type { IsoDate } from "@/lib/format";
import { OpenDemo } from "./OpenDemo";

/** Tickets kept in local state (not localStorage), so the gallery never touches the portal's "chamados". */
function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(SEED_TICKETS);
  const create = (ticket: Ticket) => setTickets((list) => [ticket, ...list]);
  const update = (id: string, change: (t: Ticket) => Ticket) => setTickets((list) => list.map((t) => (t.id === id ? change(t) : t)));
  return { tickets, create, update };
}

export function SupportChatDemo() {
  return <OpenDemo>{(open, setOpen) => <SupportChat open={open} onClose={() => setOpen(false)} openedAt="14:05" />}</OpenDemo>;
}

export function SupportFaqDemo() {
  const toast = useToast();
  const [query, setQuery] = useState("");
  return (
    <>
      <input
        aria-label="Filtrar perguntas (exemplo)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Texto da busca (vem do SupportSearch)"
        className="mb-4 w-full max-w-sm rounded-lg border border-line bg-card px-3 py-2 text-[14.5px] text-ink"
      />
      <SupportFaq query={query} onClearQuery={() => setQuery("")} onOpenTicket={(subject) => toast({ tone: "info", title: "Abrir chamado", description: subject || "Sem assunto." })} />
    </>
  );
}

export function SupportSearchDemo() {
  const [query, setQuery] = useState("");
  return <SupportSearch query={query} onQuery={setQuery} />;
}

export function SupportTicketFormDemo({ today }: { today: IsoDate }) {
  const { tickets, create } = useTickets();
  return (
    <div className="max-w-md">
      <SupportTicketForm today={today} tickets={tickets} onCreate={create} />
    </div>
  );
}

export function SupportTicketsDemo({ today }: { today: IsoDate }) {
  const toast = useToast();
  const { tickets, update } = useTickets();
  return (
    <SupportTickets tickets={tickets} today={today} onUpdate={update} onOpenForm={() => toast({ tone: "info", title: "Abrir chamado", description: "Leva ao formulário (veja SupportTicketForm)." })} />
  );
}

export function MobileSupportChatDemo() {
  return <OpenDemo app>{(open, setOpen) => <MobileSupportChat open={open} onClose={() => setOpen(false)} />}</OpenDemo>;
}

export function MobileSupportTicketsDemo({ today }: { today: IsoDate }) {
  const { tickets, create, update } = useTickets();
  const [newTicket, setNewTicket] = useState({ open: false, subject: "" });
  return <MobileSupportTickets tickets={tickets} today={today} onCreate={create} onUpdate={update} newTicket={newTicket} onNewTicket={(open, subject = "") => setNewTicket({ open, subject })} />;
}
