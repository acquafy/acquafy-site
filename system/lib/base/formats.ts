// lib/base/formats.ts
//
// The three screen formats of /base/telas. They are different layouts, so they are never lumped together as "mobile".
export type ScreenFormat = "desktop" | "tablet" | "celular";

export const SCREEN_FORMATS: readonly ScreenFormat[] = ["desktop", "tablet", "celular"];

export const FORMAT_LABEL: Record<ScreenFormat, string> = { desktop: "Desktop", tablet: "Tablet e Foldable", celular: "Celulares" };

export const FORMAT_HINT: Record<ScreenFormat, string> = {
  desktop: "Portal no navegador",
  tablet: "iOS e Android · menu lateral, 2 colunas",
  celular: "iOS e Android · barra de abas, 1 coluna",
};

export function isScreenFormat(value: string | undefined | null): value is ScreenFormat {
  return value === "desktop" || value === "tablet" || value === "celular";
}
