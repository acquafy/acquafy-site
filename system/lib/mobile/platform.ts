// lib/mobile/platform.ts
//
// The mobile app has one set of screens per platform (/m/ios/*, /m/android/*). Screens, organisms and primitives are
// shared; only the chrome (shell, tab bar, nav bar, sheets look) differs. This file is the single place that knows
// the platform names and how mobile URLs are built.

export type Platform = "ios" | "android";

export const PLATFORMS: readonly Platform[] = ["ios", "android"];

export function isPlatform(value: string | undefined | null): value is Platform {
  return value === "ios" || value === "android";
}

/** Route segments of the mobile screens (identical on both platforms). */
export const MOBILE_ROUTES = {
  welcome: "bem-vindo",
  login: "login",
  home: "home",
  purifiers: "purificadores",
  finance: "financeiro",
  documents: "documentos",
  profile: "perfil",
  contract: "contrato",
  calendar: "calendario",
  request: "solicitar",
  support: "suporte",
} as const;

export type MobileRoute = keyof typeof MOBILE_ROUTES;

/** `mobilePath("ios", "home")` → "/m/ios/home"; `mobilePath("ios", "profile", "seguranca")` → "/m/ios/perfil/seguranca". */
export function mobilePath(platform: Platform, route: MobileRoute, sub?: string): string {
  return `/m/${platform}/${MOBILE_ROUTES[route]}${sub ? `/${sub}` : ""}`;
}

/** Where a link goes: a mobile route (resolved with the current platform by `useMobileHref`) or a literal URL ("https://…", "/docs/x.pdf"). */
export type MobileTarget = string | { route: MobileRoute; sub?: string };

export function resolveTarget(platform: Platform, target: MobileTarget): string {
  return typeof target === "string" ? target : mobilePath(platform, target.route, target.sub);
}

/** Desktop route → mobile route (the mobile app has no separate Dashboard: Início covers it; "Extrato" is "Financeiro"). */
const DESKTOP_TO_MOBILE: Record<string, string> = {
  "/home": "home",
  "/dashboard": "home",
  "/purificadores": "purificadores",
  "/extrato": "financeiro",
  "/calendario": "calendario",
  "/documentos": "documentos",
  "/contrato": "contrato",
  "/solicitar": "solicitar",
  "/suporte": "suporte",
  "/perfil": "perfil",
};

/** Translates a desktop href ("/extrato", "/perfil?secao=seguranca") into the mobile one, so shared config keeps one set of links. */
export function mobileHref(platform: Platform, desktopHref: string): string {
  if (/^(https?:|mailto:|tel:|\/docs\/)/.test(desktopHref)) return desktopHref;
  const [path, query] = desktopHref.split("?");
  const target = DESKTOP_TO_MOBILE[path];
  if (!target) return `/m/${platform}/home`;
  const section = query ? new URLSearchParams(query).get("secao") : null;
  return `/m/${platform}/${target}${section ? `/${section}` : ""}`;
}

/** First path segment after /m/<platform>/ ("/m/ios/financeiro/x" → "financeiro"). */
export function mobileScreenOf(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  return parts[0] === "m" ? (parts[2] ?? "") : (parts[0] ?? "");
}

/** Device viewport used by the preview frame on desktop (CSS pixels of the screen, without the bezel). */
export const DEVICE_SCREEN: Record<Platform, { width: number; height: number }> = {
  ios: { width: 390, height: 844 },
  android: { width: 412, height: 915 },
};
