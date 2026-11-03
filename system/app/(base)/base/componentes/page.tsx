// app/(base)/base/componentes/page.tsx
import type { Metadata } from "next";
import { BaseComponentDemos } from "@/components/base/BaseComponentDemos";
import { BaseFileList } from "@/components/base/BaseFileList";
import { BasePageHeading } from "@/components/base/BasePageHeading";
import { layoutComponents, uiComponents } from "@/lib/base/inventory";

export const metadata: Metadata = { title: "Base · Componentes" };

export default function BaseComponentsPage() {
  const ui = uiComponents();
  return (
    <>
      <BasePageHeading title="Componentes" description="Átomos e moléculas reutilizáveis (components/ui), com exemplos ao vivo. Use o botão de tema para conferir em Dia e Noite." />
      <BaseComponentDemos />
      <BaseFileList title="UI web" count items={ui.filter((u) => u.scope === "web").map((u) => ({ name: u.name, file: u.file }))} />
      <BaseFileList title="UI do app" count items={ui.filter((u) => u.scope === "mobile").map((u) => ({ name: u.name, file: u.file }))} />
      <BaseFileList title="Shell e navegação" count items={layoutComponents().map((f) => ({ name: f.split("/").pop()!.replace(".tsx", ""), file: f }))} />
    </>
  );
}
