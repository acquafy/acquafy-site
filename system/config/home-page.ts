// config/home-page.ts
//
// Content of the Home screen: quick actions and the contact channels shown under "Ajuda rápida".

import { CalendarDays, FileDown, FileUp, Headset, Landmark, PlusCircle, ReceiptText } from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import type { Tone } from "@/components/ui/KpiCard";
import type { LucideIcon } from "lucide-react";
import { CONTRACT_PDF } from "@/config/contract-page";

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: Tone;
  download?: boolean;
};

/** The things an investor comes back for, most frequent first. */
export const quickActions: QuickAction[] = [
  { id: "request", title: "Solicitar purificadores", description: "Amplie seu investimento", href: "/solicitar", icon: PlusCircle, tone: "violet" },
  { id: "statement", title: "Ver extrato", description: "Repasses e comprovantes", href: "/extrato", icon: ReceiptText, tone: "green" },
  { id: "calendar", title: "Próximos repasses", description: "Datas e valores", href: "/calendario", icon: CalendarDays, tone: "blue" },
  { id: "purifiers", title: "Meus purificadores", description: "Situação e localização", href: "/purificadores", icon: PurifierIcon, tone: "blue" },
  { id: "contract", title: "Baixar contrato", description: "PDF assinado", href: CONTRACT_PDF.href, icon: FileDown, tone: "orange", download: true },
  { id: "upload", title: "Enviar documento", description: "Guarde junto ao contrato", href: "/documentos", icon: FileUp, tone: "violet" },
  { id: "bank", title: "Dados bancários", description: "Conta de recebimento", href: "/perfil?secao=bancarios", icon: Landmark, tone: "green" },
  { id: "support", title: "Abrir chamado", description: "Fale com a equipe", href: "/suporte", icon: Headset, tone: "pink" },
];

export const HELP_CHANNELS = {
  whatsapp: { label: "WhatsApp", href: "https://wa.me/14075550123" },
  email: { label: "E-mail", href: "mailto:suporte@acquafy.com" },
};

/** Questions surfaced on Home (ids of config/support-page FAQ). */
export const HOME_FAQ_IDS = ["pay-quando", "pay-valor", "pay-primeiro"] as const;
