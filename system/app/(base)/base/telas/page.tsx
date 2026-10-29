// app/(base)/base/telas/page.tsx
import type { Metadata } from "next";
import { BasePageHeading } from "@/components/base/BasePageHeading";
import { BaseProductionQueue } from "@/components/base/BaseProductionQueue";
import { BaseScreenTable } from "@/components/base/BaseScreenTable";
import { platformCounts, productionGroups, resolveScreens } from "@/lib/base/screens";

export const metadata: Metadata = { title: "Base · Telas" };

export default function BaseScreensPage() {
  const screens = resolveScreens();
  return (
    <>
      <BasePageHeading
        title="Produção de telas"
        description="As telas na ordem em que são produzidas, em seções: acesso, visão geral, investimento, financeiro, suporte e conta. Cada uma com as três plataformas, a referência de design e os organismos."
      />
      <BaseProductionQueue screens={screens} counts={platformCounts(screens)} />
      <BaseScreenTable groups={productionGroups(screens)} />
    </>
  );
}
