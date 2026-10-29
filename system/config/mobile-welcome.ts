// config/mobile-welcome.ts
//
// Copy of the onboarding ("Bem-vindo ao ecossistema Acquafy"): headline, the three cards and the "Saiba mais" sheet.

import { ChartNoAxesColumn, CircleDollarSign, ShieldCheck, WalletCards, type LucideIcon } from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import type { Tone } from "@/components/ui/KpiCard";

export const welcomeCopy = {
  headlineLead: "Bem-vindo ao ecossistema",
  headlineAccent: "Acquafy",
  support: "Acompanhe seus purificadores, repasses mensais em dólar e extrato financeiro, tudo em um só lugar.",
  start: "Começar",
  learnMore: "Saiba mais sobre a Acquafy",
  carouselLabel: "Destaques do portal",
} as const;

export type WelcomeCard = { id: string; icon: LucideIcon; tone: Tone; title: string; text: string };

export const welcomeCards: WelcomeCard[] = [
  { id: "income", icon: CircleDollarSign, tone: "violet", title: "Renda recorrente em dólar", text: "Receba repasses mensais do seu investimento." },
  { id: "purifiers", icon: PurifierIcon, tone: "blue", title: "Acompanhe seus purificadores", text: "Veja o status, localização e desempenho em tempo real." },
  { id: "statement", icon: ChartNoAxesColumn, tone: "violet", title: "Extrato e repasses mensais", text: "Consulte seu extrato financeiro completo e transparente." },
];

export const aboutAcquafy = {
  title: "Sobre a Acquafy",
  intro: "A Acquafy oferece Água como Serviço (WaaS): você investe em purificadores Neo UP, nós instalamos, operamos e mantemos os equipamentos em clientes finais, e você recebe a sua parte da receita de lease todo mês, em dólar.",
  points: [
    { icon: WalletCards, tone: "green" as Tone, title: "Repasses mensais", text: "Pagos todo dia 1º, direto na sua conta, com comprovante no portal." },
    { icon: PurifierIcon, tone: "blue" as Tone, title: "Operação por nossa conta", text: "Instalação, manutenção e suporte aos clientes são responsabilidade da Acquafy." },
    { icon: ShieldCheck, tone: "violet" as Tone, title: "Transparência", text: "Extrato, calendário, contrato e documentos sempre à mão, em um só lugar." },
  ],
};
