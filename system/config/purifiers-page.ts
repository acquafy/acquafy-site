// config/purifiers-page.ts

import type { PurifierStatus } from "@/config/investor";

export const PURIFIERS_PAGE_SIZE = 10;

export const statusFilterOptions: { value: "all" | PurifierStatus; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "operation", label: "Em operação" },
  { value: "available", label: "Disponível" },
  { value: "maintenance", label: "Em manutenção" },
];

/** Stylised positions (0–100 on a 300×340 Florida outline) of the cities where units are installed. */
export const cityPoints: Record<string, { x: number; y: number }> = {
  Orlando: { x: 196, y: 128 },
  Tampa: { x: 150, y: 150 },
  Miami: { x: 262, y: 270 },
  Estoque: { x: 120, y: 90 },
};

/** Outline of Florida (viewBox 0 0 300 340), simplified. */
export const FLORIDA_PATH =
  "M12 44 L118 38 L150 50 L178 54 L194 74 L204 104 L218 134 L236 172 L256 212 L276 256 L284 292 L266 304 L250 276 L232 264 L214 236 L194 212 L176 188 L166 152 L150 122 L128 94 L100 82 L60 76 L28 72 Z";

export const maintenanceReasons = [
  { value: "no-water", label: "Sem saída de água" },
  { value: "leak", label: "Vazamento" },
  { value: "noise", label: "Ruído ou funcionamento anormal" },
  { value: "filter", label: "Troca de filtro" },
  { value: "other", label: "Outro motivo" },
];
