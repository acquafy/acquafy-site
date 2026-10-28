// components/base/previews/HomePreviews.tsx
import { MobileHomeActivity } from "@/components/mobile/sections/MobileHomeActivity";
import { MobileHomeEquipment } from "@/components/mobile/sections/MobileHomeEquipment";
import { MobileHomeGreeting } from "@/components/mobile/sections/MobileHomeGreeting";
import { MobileHomeKpis } from "@/components/mobile/sections/MobileHomeKpis";
import { MobileHomeNotice } from "@/components/mobile/sections/MobileHomeNotice";
import { MobileHomePayouts } from "@/components/mobile/sections/MobileHomePayouts";
import { MobileHomeShortcuts } from "@/components/mobile/sections/MobileHomeShortcuts";
import { MobileHomeSummary } from "@/components/mobile/sections/MobileHomeSummary";
import { HomeHelp } from "@/components/sections/HomeHelp";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeQuickActions } from "@/components/sections/HomeQuickActions";
import { HomeRecentDocuments } from "@/components/sections/HomeRecentDocuments";
import { HomeToday } from "@/components/sections/HomeToday";
import { formatDateShort } from "@/lib/mobile/format";
import { getPortalSummary } from "@/lib/portal/schedule";
import type { PreviewMap } from "./types";

export const homePreviews: PreviewMap = {
  HomeHelp: () => ({ node: <HomeHelp /> }),
  HomeHero: () => ({ node: <HomeHero /> }),
  HomeQuickActions: () => ({ node: <HomeQuickActions /> }),
  HomeRecentDocuments: () => ({ node: <HomeRecentDocuments /> }),
  HomeToday: () => ({ node: <HomeToday /> }),
  MobileHomeActivity: () => ({ node: <MobileHomeActivity summary={getPortalSummary()} /> }),
  MobileHomeEquipment: () => ({ node: <MobileHomeEquipment units={getPortalSummary().units} /> }),
  MobileHomeGreeting: () => ({ node: <MobileHomeGreeting /> }),
  MobileHomeKpis: () => ({ node: <MobileHomeKpis summary={getPortalSummary()} /> }),
  MobileHomeNotice: () => ({ node: <MobileHomeNotice /> }),
  MobileHomePayouts: () => ({ node: <MobileHomePayouts installments={getPortalSummary().installments} /> }),
  MobileHomeShortcuts: () => ({ node: <MobileHomeShortcuts /> }),
  MobileHomeSummary: () => {
    const s = getPortalSummary();
    return {
      node: (
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
      ),
    };
  },
};
