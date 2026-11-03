// components/mobile/sections/MobileSupport.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, MessagesSquare, Phone, SearchX } from "lucide-react";
import { usePlatform } from "@/components/mobile/PlatformProvider";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileChip, MobileChipRow } from "@/components/mobile/ui/MobileChip";
import { MobileDisclosureGroup } from "@/components/mobile/ui/MobileDisclosure";
import { MobileEmptyState } from "@/components/mobile/ui/MobileEmptyState";
import { MobileSearchField } from "@/components/mobile/ui/MobileFields";
import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { FAQ, FAQ_CATEGORIES, SEED_TICKETS, SUPPORT_EMAIL, SUPPORT_HOURS, SUPPORT_PHONE, SUPPORT_TEXT, SUPPORT_WHATSAPP, type FaqCategory, type FaqItem, type Ticket } from "@/config/support-page";
import type { IsoDate } from "@/lib/format";
import { mobileHref } from "@/lib/mobile/platform";
import { matchesQuery } from "@/lib/portal/text-search";
import { usePersistentState } from "@/lib/usePersistentState";
import { MobileSupportChat } from "./MobileSupportChat";
import { MobileSupportTickets } from "./MobileSupportTickets";

/** Suporte: search, contact channels, FAQ by category and the tickets. Owns the search text and the tickets (persisted while mocked). */
export function MobileSupport({ today }: { today: IsoDate }) {
  const platform = usePlatform();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory>("payouts");
  const [chatOpen, setChatOpen] = useState(false);
  const [tickets, setTickets] = usePersistentState<Ticket[]>("chamados", SEED_TICKETS);
  const [newTicket, setNewTicket] = useState({ open: false, subject: "" });

  const searching = query.trim() !== "";
  const results = searching ? FAQ.filter((f) => matchesQuery(query, f.question, f.answer)) : FAQ.filter((f) => f.category === category);

  const toItems = (list: FaqItem[]) =>
    list.map((f) => ({
      id: f.id,
      title: f.question,
      content: (
        <>
          <p>{f.answer}</p>
          {f.link && (
            <Link href={mobileHref(platform, f.link.href)} className="mt-2 inline-flex min-h-11 items-center font-semibold text-brand focus-visible:outline-2 focus-visible:outline-brand">
              {f.link.label} →
            </Link>
          )}
        </>
      ),
    }));

  return (
    <>
      <MobileSearchField label="Buscar ajuda" value={query} onValueChange={setQuery} placeholder="Buscar nas perguntas frequentes" />

      {!searching && (
        <MobileListGroup header="Canais de atendimento" aria-label="Canais de atendimento">
          <MobileListRow icon={MessagesSquare} tone="blue" title="Chat ao vivo" subtitle={`Online agora · ${SUPPORT_HOURS.chat}`} onClick={() => setChatOpen(true)} />
          <MobileListRow icon={Mail} tone="violet" title="E-mail" subtitle={`${SUPPORT_EMAIL} · ${SUPPORT_HOURS.email}`} href={`mailto:${SUPPORT_EMAIL}`} external />
          <MobileListRow icon={MessageCircle} tone="green" title="WhatsApp" subtitle={`+1 (407) 555-0123 · ${SUPPORT_HOURS.whatsapp}`} href={SUPPORT_WHATSAPP} external />
          <MobileListRow icon={Phone} tone="orange" title="Telefone" subtitle={`${SUPPORT_PHONE.label} · ${SUPPORT_HOURS.phone}`} href={SUPPORT_PHONE.href} external />
        </MobileListGroup>
      )}

      <section aria-label="Perguntas frequentes" className="grid grid-cols-[minmax(0,1fr)] gap-2.5">
        <h2 className="px-1 text-[18px] font-bold tracking-tight text-ink">{searching ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"} para “${query.trim()}”` : "Perguntas frequentes"}</h2>
        {!searching && (
          <MobileChipRow label="Categorias de perguntas frequentes">
            {FAQ_CATEGORIES.map((c) => (
              <MobileChip key={c.id} selected={category === c.id} count={FAQ.filter((f) => f.category === c.id).length} onClick={() => setCategory(c.id)}>
                {c.label}
              </MobileChip>
            ))}
          </MobileChipRow>
        )}
        {results.length === 0 ? (
          <MobileEmptyState
            icon={SearchX}
            title={SUPPORT_TEXT.emptySearchTitle}
            description={SUPPORT_TEXT.emptySearchDescription}
            action={<MobileButton onClick={() => setNewTicket({ open: true, subject: query.trim() })}>Abrir chamado</MobileButton>}
          />
        ) : (
          <MobileDisclosureGroup key={searching ? "search" : category} label="Perguntas frequentes" items={toItems(results)} />
        )}
        {searching && (
          <MobileButton variant="ghost" onClick={() => setQuery("")}>
            Limpar busca
          </MobileButton>
        )}
      </section>

      <MobileSupportTickets
        tickets={tickets}
        today={today}
        onCreate={(t) => setTickets((list) => [t, ...list])}
        onUpdate={(id, change) => setTickets((list) => list.map((t) => (t.id === id ? change(t) : t)))}
        newTicket={newTicket}
        onNewTicket={(open, subject = "") => setNewTicket({ open, subject })}
      />
      <MobileSupportChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
