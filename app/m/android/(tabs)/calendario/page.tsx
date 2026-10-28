// app/m/android/(tabs)/calendario/page.tsx
import type { Metadata } from "next";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobileCalendarBoard } from "@/components/mobile/sections/MobileCalendarBoard";
import { mobilePath } from "@/lib/mobile/platform";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Calendário de Repasses" };

export default function AndroidCalendarPage() {
  return (
    <AndroidScreen
      title="Calendário de Repasses"
      navTitle="Calendário"
      subtitle="Datas dos próximos repasses e histórico do contrato."
      back={{ href: mobilePath("android", "finance"), label: "Financeiro" }}
    >
      <MobileCalendarBoard summary={getPortalSummary()} />
    </AndroidScreen>
  );
}
