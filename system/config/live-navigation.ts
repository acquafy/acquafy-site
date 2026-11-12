// config/live-navigation.ts
//
// Side menu of the signed-in Acquafy Account. Customers (product buyers and lessees) see only their orders, leases,
// support and account; investors/partners see the investor screens too; staff add the queue; admins add administration.

import {
  BadgeCheck,
  Boxes,
  Building2,
  CalendarCheck,
  CalendarDays,
  FileText,
  Handshake,
  Headset,
  House,
  Inbox,
  LayoutDashboard,
  Repeat,
  ReceiptText,
  ScrollText,
  Settings2,
  ShoppingBag,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { SidebarItem } from "@/components/layout/SidebarNav";
import { PurifierIcon } from "@/components/ui/PurifierIcon";

/** Who is signed in: drives the side menu. */
export type LiveKind = "customer" | "partner" | "support" | "admin";

const orders: SidebarItem = { href: "/pedidos", label: "Pedidos", icon: ShoppingBag };
const leases: SidebarItem = { href: "/locacoes", label: "Locações", icon: Repeat };
const support: SidebarItem = { href: "/suporte", label: "Suporte", icon: Headset };
const account: SidebarItem = { href: "/perfil", label: "Minha conta", icon: UserRound, group: "account" };

const investor: SidebarItem[] = [
  { href: "/home", label: "Visão geral", icon: House },
  orders,
  { href: "/contrato", label: "Contratos", icon: ScrollText },
  { href: "/purificadores", label: "Purificadores", icon: PurifierIcon },
  { href: "/extrato", label: "Extrato", icon: ReceiptText },
  { href: "/calendario", label: "Calendário", icon: CalendarDays },
  { href: "/documentos", label: "Documentos", icon: FileText },
  support,
  { href: "/adesao", label: "Minha adesão", icon: BadgeCheck },
  leases,
];

const queue: SidebarItem = { href: "/equipe", label: "Fila de atendimento", icon: Inbox };

/** Administrators work across every account first; the screens under the "Conta aberta" label show the one they opened. */
const admin: SidebarItem[] = [
  { href: "/painel", label: "Painel global", icon: LayoutDashboard },
  { href: "/contas", label: "Contas", icon: Building2 },
  { href: "/investidores", label: "Investidores", icon: UsersRound },
  orders,
  { href: "/instalacoes", label: "Instalações", icon: CalendarCheck },
  { href: "/estoque", label: "Estoque", icon: Boxes },
  leases,
  queue,
  { href: "/parcerias", label: "Ofertas e adesões", icon: Handshake },
  { href: "/admin", label: "Administração", icon: Settings2 },
  ...investor.filter((item) => ![orders.href, leases.href, "/adesao"].includes(item.href)).map((item) => ({ ...item, section: "Conta aberta" })),
];

export function liveNavigation(kind: LiveKind): SidebarItem[] {
  if (kind === "customer") return [orders, leases, support, account];
  if (kind === "admin") return [...admin, account];
  return kind === "support" ? [...investor, queue, account] : [...investor, account];
}

/** First screen of the menu: where the logo leads. */
export const liveHome = (kind: LiveKind) => (kind === "customer" ? "/pedidos" : kind === "admin" ? "/painel" : "/home");
