// components/base/previews/DashboardPreviews.tsx
import { DashboardContract } from "@/components/sections/DashboardContract";
import { DashboardKpis } from "@/components/sections/DashboardKpis";
import { DashboardPayments } from "@/components/sections/DashboardPayments";
import { DashboardPayouts } from "@/components/sections/DashboardPayouts";
import { DashboardPurifiers } from "@/components/sections/DashboardPurifiers";
import { getPortalSummary } from "@/lib/portal/schedule";
import type { PreviewMap } from "./types";

export const dashboardPreviews: PreviewMap = {
  DashboardContract: () => ({ node: <DashboardContract /> }),
  DashboardKpis: () => ({ node: <DashboardKpis /> }),
  DashboardPayments: () => {
    const s = getPortalSummary();
    return { node: <DashboardPayments installments={s.installments} monthly={s.monthlyPayout} /> };
  },
  DashboardPayouts: () => ({ node: <DashboardPayouts /> }),
  DashboardPurifiers: () => ({ node: <DashboardPurifiers /> }),
};
