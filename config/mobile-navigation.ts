// config/mobile-navigation.ts
//
// The five tabs of the mobile app (same on iOS and Android) and which tab each screen belongs to, so stacked
// screens (Calendário, Contrato…) keep their parent tab highlighted.

import { CircleDollarSign, FileText, House, UserRound, type LucideIcon } from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import type { MobileRoute } from "@/lib/mobile/platform";

export type MobileTabId = "home" | "purifiers" | "finance" | "documents" | "profile";

export type MobileTab = { id: MobileTabId; route: MobileRoute; label: string; icon: LucideIcon };

export const mobileTabs: MobileTab[] = [
  { id: "home", route: "home", label: "Início", icon: House },
  { id: "purifiers", route: "purifiers", label: "Purificadores", icon: PurifierIcon },
  { id: "finance", route: "finance", label: "Financeiro", icon: CircleDollarSign },
  { id: "documents", route: "documents", label: "Documentos", icon: FileText },
  { id: "profile", route: "profile", label: "Perfil", icon: UserRound },
];

/** Route segment ("calendario") → tab it lives under. */
const TAB_OF_SCREEN: Record<string, MobileTabId> = {
  home: "home",
  purificadores: "purifiers",
  solicitar: "purifiers",
  financeiro: "finance",
  calendario: "finance",
  documentos: "documents",
  contrato: "documents",
  perfil: "profile",
  suporte: "profile",
};

/** Screens that are pushed on top of a tab (back button on the left) instead of being a tab root. */
const STACKED_SCREENS = new Set(["calendario", "contrato", "solicitar", "suporte"]);

/** Is this pathname a pushed screen? ("/m/ios/calendario", "/m/ios/perfil/seguranca"). */
export function isStackedPath(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  const screen = parts[0] === "m" ? (parts[2] ?? "") : (parts[0] ?? "");
  const depth = parts[0] === "m" ? parts.length - 2 : parts.length;
  return STACKED_SCREENS.has(screen) || depth > 1;
}

export function tabOfScreen(screen: string): MobileTabId | null {
  return TAB_OF_SCREEN[screen] ?? null;
}
