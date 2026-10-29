// app/m/ios/(tabs)/calendario/page.tsx
import type { Metadata } from "next";
import { IosScreen } from "@/components/mobile/ios/IosScreen";
import { MobileCalendarBoard } from "@/components/mobile/sections/MobileCalendarBoard";
import { mobilePath } from "@/lib/mobile/platform";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Calendário de Repasses" };

export default function IosCalendarPage() {
  return (
    <IosScreen title="Calendário de Repasses" navTitle="Calendário" subtitle="Datas dos próximos repasses e histórico do contrato." back={{ href: mobilePath("ios", "finance"), label: "Financeiro" }}>
      <MobileCalendarBoard summary={getPortalSummary()} />
    </IosScreen>
  );
}
