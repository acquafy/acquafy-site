// app/(base)/base/telas/page.tsx
import type { Metadata } from "next";
import { BaseFormatTabs } from "@/components/base/BaseFormatTabs";
import { BaseScreenBoard } from "@/components/base/BaseScreenBoard";
import { isScreenFormat } from "@/lib/base/formats";
import { productionGroups, resolveScreens } from "@/lib/base/screens";

export const metadata: Metadata = { title: "Base · Telas" };

/** Screens in production order on one long page (same pattern as /base/componentes and /base/organismos), one FORMAT at a time (`?f=`). */
export default async function BaseScreensPage({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  const { f } = await searchParams;
  const format = isScreenFormat(f) ? f : "desktop";
  const groups = productionGroups(resolveScreens());
  return (
    <>
      <header className="max-w-3xl">
        <h1 className="text-[clamp(26px,3vw,34px)] leading-[1.15] font-bold text-ink">Produção de telas</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
          As telas na ordem em que são produzidas, uma depois da outra, cada uma mostrada <b>ao vivo</b>. Escolha o formato: Desktop, Tablet e Foldable ou Celulares (cada um é um layout diferente).
          Clique numa miniatura para abrir a tela inteira.
        </p>
      </header>
      <BaseFormatTabs format={format} />
      <BaseScreenBoard groups={groups} format={format} />
    </>
  );
}
