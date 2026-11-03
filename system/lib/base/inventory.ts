// lib/base/inventory.ts
import "server-only";
import inventory from "@/config/base-inventory.json";

function list(dir: string, filter: (name: string) => boolean): string[] {
  return (inventory.files[dir as keyof typeof inventory.files] ?? []).filter(filter);
}

/** Build-time inventory keeps source and reference images out of serverless functions. */
export function mobileScreenExists(platform: "ios" | "android", group: "tabs" | "flow", route: string): boolean {
  return inventory.mobileScreens.includes(`app/m/${platform}/(${group})/${route}/page.tsx`);
}

export type OrganismFile = { name: string; file: string; kind: "desktop" | "mobile"; prefix: string };

/** Splits "MobileHomeKpis" / "StatementPayments" into the screen prefix ("Home" / "Statement"). */
function prefixOf(base: string, mobile: boolean): string {
  const words = base.match(/[A-Z][a-z0-9]+/g) ?? [base];
  return (mobile ? words[1] : words[0]) ?? base;
}

export function organisms(): OrganismFile[] {
  const desktop = list("components/sections", (n) => n.endsWith(".tsx")).map((n) => {
    const name = n.replace(/\.tsx$/, "");
    return { name, file: `components/sections/${n}`, kind: "desktop" as const, prefix: prefixOf(name, false) };
  });
  const mobile = list("components/mobile/sections", (n) => n.endsWith(".tsx")).map((n) => {
    const name = n.replace(/\.tsx$/, "");
    return { name, file: `components/mobile/sections/${n}`, kind: "mobile" as const, prefix: prefixOf(name, true) };
  });
  return [...desktop, ...mobile];
}

export type UiFile = { name: string; file: string; scope: "web" | "mobile" };

export function uiComponents(): UiFile[] {
  const web = list("components/ui", (n) => /\.tsx?$/.test(n) && !/^use/.test(n)).map((n) => ({ name: n.replace(/\.tsx?$/, ""), file: `components/ui/${n}`, scope: "web" as const }));
  const mobile = list("components/mobile/ui", (n) => n.endsWith(".tsx")).map((n) => ({ name: n.replace(/\.tsx$/, ""), file: `components/mobile/ui/${n}`, scope: "mobile" as const }));
  return [...web, ...mobile];
}

export function layoutComponents(): string[] {
  return [
    ...list("components/layout", (n) => n.endsWith(".tsx")).map((n) => `components/layout/${n}`),
    ...list("components/mobile/ios", (n) => n.endsWith(".tsx")).map((n) => `components/mobile/ios/${n}`),
    ...list("components/mobile/android", (n) => n.endsWith(".tsx")).map((n) => `components/mobile/android/${n}`),
  ];
}

export function referenceExists(name: string): boolean {
  return inventory.references.includes(name);
}
