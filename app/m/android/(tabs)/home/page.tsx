// app/m/android/(tabs)/home/page.tsx
import type { Metadata } from "next";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobileHomeActivity } from "@/components/mobile/sections/MobileHomeActivity";
import { MobileHomeEquipment } from "@/components/mobile/sections/MobileHomeEquipment";
import { MobileHomeGreeting } from "@/components/mobile/sections/MobileHomeGreeting";
import { MobileHomeKpis } from "@/components/mobile/sections/MobileHomeKpis";
import { MobileHomeNotice } from "@/components/mobile/sections/MobileHomeNotice";
import { MobileHomePayouts } from "@/components/mobile/sections/MobileHomePayouts";
import { MobileHomeShortcuts } from "@/components/mobile/sections/MobileHomeShortcuts";
import { MobileHomeSummary } from "@/components/mobile/sections/MobileHomeSummary";
import { MobilePurifierShowcase } from "@/components/mobile/ui/MobilePurifierShowcase";
import { homeCopy } from "@/config/mobile-home";
import { formatDateShort } from "@/lib/mobile/format";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Início" };

/** Início: greeting, investment summary, KPIs, payout chart, equipment, recent activity and the payout-day notice. */
export default function AndroidHomePage() {
  const s = getPortalSummary();
  return (
    <AndroidScreen
      title={<MobileHomeGreeting />}
      navTitle="Início"
      subtitle={homeCopy.subtitle}
      accessory={<MobilePurifierShowcase priority ripples={false} className="absolute top-1 right-0 -z-0 h-[142px] w-[34%] overflow-hidden" />}
    >
      <MobileHomeSummary
        data={{
          units: s.units,
          invested: s.invested,
          monthlyPayout: s.monthlyPayout,
          nextPayout: s.next ? formatDateShort(s.next.paymentDate) : null,
          inOperation: s.unitsInOperation,
          available: s.unitsAvailable,
          inMaintenance: s.unitsInMaintenance,
          totalForecast: s.totalForecast,
          installments: s.installments.length,
        }}
      />
      <MobileHomeKpis summary={s} />
      <MobileHomeShortcuts />
      <MobileHomePayouts installments={s.installments} />
      <MobileHomeEquipment units={s.units} />
      <MobileHomeActivity summary={s} />
      <MobileHomeNotice />
    </AndroidScreen>
  );
}
