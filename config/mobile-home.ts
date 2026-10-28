// config/mobile-home.ts
//
// Content of the mobile Início: greeting copy, shortcuts, the notice about the payout day and the recent activity
// (derived from the same contract/summary as every other screen, so the numbers always agree).

import { CalendarDays, FileCheck2, Headset, PlusCircle, ReceiptText, ScrollText, type LucideIcon } from "lucide-react";
import type { Tone } from "@/components/ui/KpiCard";
import { contract } from "@/config/investor";
import type { IsoDate } from "@/lib/format";
import type { MobileRoute } from "@/lib/mobile/platform";
import type { PortalSummary } from "@/lib/portal/schedule";

export const homeCopy = {
  subtitle: "Acompanhe aqui o desempenho dos seus investimentos na Acquafy.",
  notice: { title: "Pagamentos realizados todo dia 01 de cada mês.", text: "Os repasses são feitos automaticamente em sua conta." },
} as const;

export type HomeShortcut = { id: string; label: string; icon: LucideIcon; tone: Tone; route: MobileRoute };

/** The things an investor comes back for that are not a tab. */
export const homeShortcuts: HomeShortcut[] = [
  { id: "request", label: "Solicitar", icon: PlusCircle, tone: "violet", route: "request" },
  { id: "calendar", label: "Calendário", icon: CalendarDays, tone: "blue", route: "calendar" },
  { id: "contract", label: "Contrato", icon: ScrollText, tone: "orange", route: "contract" },
  { id: "support", label: "Suporte", icon: Headset, tone: "pink", route: "support" },
];

export type ActivityItem = {
  id: string;
  icon: LucideIcon;
  tone: Tone;
  title: string;
  date: IsoDate;
  /** Right-hand text; `amount` (USD) wins and is shown with <Money>. */
  label?: string;
  amount?: number;
  route: MobileRoute;
};

/** Latest events of the investment: the last (or next) payout, the contract and the receipt. */
export function homeActivity(s: PortalSummary): ActivityItem[] {
  const lastReceived = s.installments.filter((i) => i.status === "received").at(-1);
  const payout = lastReceived
    ? { title: "Repasse mensal recebido", date: lastReceived.paymentDate, amount: lastReceived.amount }
    : s.next
      ? { title: "Próximo repasse programado", date: s.next.paymentDate, amount: s.next.amount }
      : null;

  return [
    ...(payout ? [{ id: "payout", icon: ReceiptText, tone: "green" as Tone, route: "finance" as MobileRoute, ...payout }] : []),
    { id: "contract", icon: ScrollText, tone: "violet", title: "Contrato ativado", date: contract.startDate, label: `${s.units} purificadores`, route: "contract" },
    { id: "receipt", icon: FileCheck2, tone: "blue", title: "Comprovante emitido", date: contract.startDate, label: "Transferência", route: "documents" },
  ];
}
