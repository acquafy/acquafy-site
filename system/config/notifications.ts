// config/notifications.ts
//
// Mock notification feed for the header bell. Read state is kept in localStorage (see NotificationsMenu).

import { CalendarDays, FileText, Headset, type LucideIcon } from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import type { Tone } from "@/components/ui/KpiCard";

export type PortalNotification = {
  id: string;
  title: string;
  description: string;
  /** Relative time, already formatted. */
  when: string;
  tone: Tone;
  icon: LucideIcon;
  href: string;
};

export const notifications: PortalNotification[] = [
  {
    id: "n-payout-dec",
    title: "Próximo repasse em 35 dias",
    description: "US$ 400,00 serão pagos em 01/12/2026.",
    when: "Hoje",
    tone: "violet",
    icon: CalendarDays,
    href: "/calendario",
  },
  {
    id: "n-doc-contract",
    title: "Contrato disponível",
    description: "Seu Contrato de Participação já pode ser baixado.",
    when: "Ontem",
    tone: "blue",
    icon: FileText,
    href: "/documentos",
  },
  {
    id: "n-device",
    title: "2 purificadores disponíveis",
    description: "As unidades AU2401A3570 e AU2401A3576 aguardam instalação.",
    when: "2 dias atrás",
    tone: "green",
    icon: PurifierIcon,
    href: "/purificadores",
  },
  {
    id: "n-support",
    title: "Chamado #1042 respondido",
    description: "A equipe Acquafy respondeu à sua solicitação.",
    when: "3 dias atrás",
    tone: "orange",
    icon: Headset,
    href: "/suporte",
  },
];
