// components/base/previews/CalendarPreviews.tsx
import { MobileCalendarBoard } from "@/components/mobile/sections/MobileCalendarBoard";
import { CalendarBoard } from "@/components/sections/CalendarBoard";
import { CalendarContract } from "@/components/sections/CalendarContract";
import { CalendarExportButton } from "@/components/sections/CalendarExportButton";
import { CalendarKpis } from "@/components/sections/CalendarKpis";
import { getPortalSummary } from "@/lib/portal/schedule";
import { CalendarDetailsDemo, CalendarMonthDemo, CalendarUpcomingDemo } from "./CalendarDemos";
import type { PreviewMap } from "./types";

export const calendarPreviews: PreviewMap = {
  CalendarBoard: () => {
    const s = getPortalSummary();
    return {
      node: (
        <CalendarBoard installments={s.installments} today={s.today} units={s.units}>
          <CalendarContract />
        </CalendarBoard>
      ),
    };
  },
  CalendarContract: () => ({ node: <CalendarContract /> }),
  CalendarDetails: () => {
    const s = getPortalSummary();
    return { node: <CalendarDetailsDemo installments={s.installments} units={s.units} /> };
  },
  CalendarExportButton: () => ({ node: <CalendarExportButton installments={getPortalSummary().installments} /> }),
  CalendarKpis: () => ({ node: <CalendarKpis /> }),
  CalendarMonth: () => {
    const s = getPortalSummary();
    return { node: <CalendarMonthDemo installments={s.installments} today={s.today} /> };
  },
  CalendarUpcoming: () => ({ node: <CalendarUpcomingDemo installments={getPortalSummary().installments} /> }),
  MobileCalendarBoard: () => ({ node: <MobileCalendarBoard summary={getPortalSummary()} />, tall: true }),
};
