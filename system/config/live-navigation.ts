// config/live-navigation.ts
//
// Side menu of the signed-in Acquafy Account. Customers (product buyers and lessees) see only their orders, leases,
// support and account; investors/partners see the investor screens too; staff add the queue; admins add administration.

import {
  BadgeCheck,
  CalendarDays,
  FileText,
  Handshake,
  Headset,
  House,
  Inbox,
  Repeat,
  ReceiptText,
  ScrollText,
  Settings2,
  ShoppingBag,
  UserRound,
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

export function liveNavigation(kind: LiveKind): SidebarItem[] {
  if (kind === "customer") return [orders, leases, support, account];
  const items = [...investor];
  if (kind === "support" || kind === "admin") items.push({ href: "/equipe", label: "Fila de atendimento", icon: Inbox });
  if (kind === "admin") items.push({ href: "/admin", label: "Administração", icon: Settings2 }, { href: "/parcerias", label: "Ofertas e adesões", icon: Handshake });
  return [...items, account];
}

/** First screen of the menu: where the logo leads. */
export const liveHome = (kind: LiveKind) => (kind === "customer" ? "/pedidos" : "/home");
