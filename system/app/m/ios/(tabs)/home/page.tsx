// app/m/ios/(tabs)/home/page.tsx
import type { Metadata } from "next";
import { IosScreen } from "@/components/mobile/ios/IosScreen";
import { MobileHomeActivity } from "@/components/mobile/sections/MobileHomeActivity";
import { MobileHomeEquipment } from "@/components/mobile/sections/MobileHomeEquipment";
import { MobileHomeGreeting } from "@/components/mobile/sections/MobileHomeGreeting";
import { MobileHomeKpis } from "@/components/mobile/sections/MobileHomeKpis";
import { MobileHomeNotice } from "@/components/mobile/sections/MobileHomeNotice";
import { MobileHomePayouts } from "@/components/mobile/sections/MobileHomePayouts";
import { MobileHomeShortcuts } from "@/components/mobile/sections/MobileHomeShortcuts";
import { MobileHomeSummary } from "@/components/mobile/sections/MobileHomeSummary";
import { homeCopy } from "@/config/mobile-home";
import { formatDateShort } from "@/lib/mobile/format";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Início" };

/** Início: greeting, investment summary, KPIs, payout chart, equipment, recent activity and the payout-day notice. */
export default function IosHomePage() {
  const s = getPortalSummary();
  return (
    <IosScreen
      title={<MobileHomeGreeting />}
      navTitle="Início"
      subtitle={homeCopy.subtitle}
      aside={
        <>
          <MobileHomePayouts installments={s.installments} />
          <MobileHomeEquipment units={s.units} />
          <MobileHomeActivity summary={s} />
          <MobileHomeNotice />
        </>
      }
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
    </IosScreen>
  );
}
