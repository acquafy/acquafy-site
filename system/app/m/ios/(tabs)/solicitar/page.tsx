// app/m/ios/(tabs)/solicitar/page.tsx
import type { Metadata } from "next";
import { IosScreen } from "@/components/mobile/ios/IosScreen";
import { MobileRequest } from "@/components/mobile/sections/MobileRequest";
import { UNIT_PRICE } from "@/config/investor";
import { mobilePath } from "@/lib/mobile/platform";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Solicitar Purificadores" };

export default function IosRequestPage() {
  const s = getPortalSummary();
  return (
    <IosScreen
      title="Solicitar Purificadores"
      navTitle="Solicitar"
      subtitle="Amplie seu investimento e aumente seus repasses mensais."
      back={{ href: mobilePath("ios", "purifiers"), label: "Purificadores" }}
    >
      <MobileRequest today={s.today} baseline={{ units: s.units, monthlyPayout: s.monthlyPayout, installments: s.installments.length, unitPrice: UNIT_PRICE }} />
    </IosScreen>
  );
}
