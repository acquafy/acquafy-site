// components/sections/HomeToday.tsx
import Link from "next/link";
import { CalendarClock, ChevronRight, FileCheck2, MessageSquareReply, ScrollText } from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { Card } from "@/components/ui/Card";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { contract } from "@/config/investor";
import { formatDate } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";
import type { LucideIcon } from "lucide-react";

type Item = { id: string; icon: LucideIcon; tone: Tone; title: string; detail: string; href: string };

/** What needs attention today, derived from the same data as the rest of the portal. */
export function HomeToday() {
  const s = getPortalSummary();
  const items: Item[] = [];

  if (s.next && s.daysToNext !== null) {
    items.push({
      id: "payout",
      icon: CalendarClock,
      tone: "violet",
      title: `Próximo repasse em ${s.daysToNext} dias`,
      detail: `Pagamento previsto para ${formatDate(s.next.paymentDate)}.`,
      href: "/calendario",
    });
  }
  if (s.unitsAvailable > 0) {
    items.push({
      id: "stock",
      icon: PurifierIcon,
      tone: "green",
      title: `${s.unitsAvailable} purificadores aguardando instalação`,
      detail: "Ficam em estoque até serem ativados no cliente final.",
      href: "/purificadores",
    });
  }
  items.push({
    id: "ticket",
    icon: MessageSquareReply,
    tone: "orange",
    title: "Chamado #1042 respondido",
    detail: "A equipe Acquafy respondeu à sua solicitação.",
    href: "/suporte",
  });
  items.push({
    id: "review",
    icon: ScrollText,
    tone: "blue",
    title: "Revisão anual do contrato",
    detail: `Prevista para ${formatDate(contract.nextReview)}.`,
    href: "/contrato",
  });
  items.push({
    id: "docs",
    icon: FileCheck2,
    tone: "blue",
    title: "Contrato disponível para download",
    detail: "Guarde uma cópia assinada junto aos seus comprovantes.",
    href: "/documentos",
  });

  return (
    <Card title="Para hoje" className="h-full">
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="group flex items-center gap-3 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand">
              <IconTile icon={item.icon} tone={item.tone} className="size-10" />
              <span className="min-w-0 flex-1">
                <span className="block text-[14.5px] font-bold text-ink">{item.title}</span>
                <span className="block text-[13px] text-ink-soft">{item.detail}</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-ink-mute transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
