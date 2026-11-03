// app/(base)/base/page.tsx
import { BasePageHeading } from "@/components/base/BasePageHeading";
import { BaseScreenIndex } from "@/components/base/BaseScreenIndex";
import { BaseSummary } from "@/components/base/BaseSummary";
import { organisms, uiComponents } from "@/lib/base/inventory";
import { formatCounts, resolveScreens } from "@/lib/base/screens";

export default function BasePage() {
  const screens = resolveScreens();
  return (
    <>
      <BasePageHeading title="Base" description="Índice do Portal do Investidor: telas por formato, produção, componentes e organismos. Os status vêm dos arquivos do projeto." />
      <BaseSummary counts={formatCounts(screens)} components={uiComponents().length} organisms={organisms().length} />
      <BaseScreenIndex screens={screens} />
    </>
  );
}
