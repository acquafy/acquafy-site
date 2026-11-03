// config/navigation.ts

import {
  CalendarDays,
  FileText,
  Headset,
  House,
  LayoutDashboard,
  LifeBuoy,
  type LucideIcon,
  ReceiptText,
  ScrollText,
  ShieldCheck,
  UserPlus,
  UserRound,
} from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Header title; `{name}` is replaced by the investor's first name. */
  title: string;
  subtitle: string;
  /** Items of the "account" group are drawn after a divider at the end of the side menu. */
  group?: "account";
  /** Not drawn in the side menu (reached another way, e.g. the user chip in the top bar) but still resolves title and active state. */
  hidden?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/home", label: "Home", icon: House, title: "Olá, {name}", subtitle: "Atalhos e ações rápidas para o seu dia a dia." },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, title: "Dashboard", subtitle: "Visão geral dos dados do seu investimento." },
  {
    href: "/purificadores",
    label: "Meus Purificadores",
    icon: PurifierIcon,
    title: "Meus Purificadores",
    subtitle: "Acompanhe todos os seus purificadores, números de série, situação e localização.",
  },
  {
    href: "/extrato",
    label: "Extrato Financeiro",
    icon: ReceiptText,
    title: "Extrato Financeiro",
    subtitle: "Acompanhe seus repasses mensais em dólar, com histórico completo e comprovantes.",
  },
  {
    href: "/calendario",
    label: "Calendário de Repasses",
    icon: CalendarDays,
    title: "Calendário de Repasses",
    subtitle: "Veja as datas dos próximos repasses e o histórico completo do seu contrato.",
  },
  { href: "/documentos", label: "Documentos", icon: FileText, title: "Documentos", subtitle: "Acesse e gerencie seus contratos, comprovantes e outros documentos." },
  { href: "/contrato", label: "Meu Contrato", icon: ScrollText, title: "Meu Contrato", subtitle: "Consulte as condições, o andamento e as opções do seu contrato." },
  {
    href: "/solicitar",
    label: "Solicitar Purificadores",
    icon: UserPlus,
    title: "Solicitar Mais Purificadores",
    subtitle: "Amplie seu investimento e aumente seus repasses mensais.",
  },
  { href: "/suporte", label: "Suporte", icon: Headset, title: "Suporte", subtitle: "Tire dúvidas, abra chamados e fale com a nossa equipe." },
  { href: "/perfil", label: "Meu Perfil", icon: UserRound, title: "Meu Perfil", subtitle: "Gerencie suas informações e preferências.", hidden: true },
  {
    href: "/perfil?secao=seguranca",
    label: "Segurança",
    icon: ShieldCheck,
    title: "Segurança",
    subtitle: "Senha, autenticação em duas etapas e sessões ativas.",
    group: "account",
  },
  {
    href: "/perfil?secao=ajuda",
    label: "Central de Ajuda",
    icon: LifeBuoy,
    title: "Central de Ajuda",
    subtitle: "Dúvidas frequentes, documentos e contato com a equipe.",
    group: "account",
  },
];

/** Path and (optional)  query value of a menu entry: "/perfil?secao=seguranca" → ["/perfil", "seguranca"]. */
function split(href: string): [string, string | null] {
  const [path, query] = href.split("?");
  return [path, query ? new URLSearchParams(query).get("secao") : null];
}

/** Sections of /perfil that have their own menu entry; the plain "Meu Perfil" entry covers every other one. */
const CLAIMED_SECTIONS = new Set(navItems.map((i) => split(i.href)[1]).filter((s): s is string => !!s));

/** Is `item` the current page? `secao` is the "?secao=" value of the URL (only /perfil uses it). */
export function isNavActive(item: NavItem, pathname: string, secao: string | null): boolean {
  const [path, itemSection] = split(item.href);
  if (pathname !== path && !pathname.startsWith(`${path}/`)) return false;
  if (itemSection) return secao === itemSection;
  return !(secao && CLAIMED_SECTIONS.has(secao));
}

/** Entry for the current URL (title/subtitle of the page), or undefined for routes outside the side menu. */
export function navItemFor(pathname: string, secao: string | null = null): NavItem | undefined {
  return navItems.find((i) => isNavActive(i, pathname, secao));
}
