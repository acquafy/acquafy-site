// components/base/previews/PurifiersPreviews.tsx
import { MobilePurifiersCta } from "@/components/mobile/sections/MobilePurifiersCta";
import { MobilePurifiersExplorer } from "@/components/mobile/sections/MobilePurifiersExplorer";
import { PurifiersExplorer } from "@/components/sections/PurifiersExplorer";
import { purifiers } from "@/config/investor";
import { portalToday } from "@/lib/portal/schedule";
import {
  MobilePurifierDetailDemo,
  MobilePurifierMaintenanceDemo,
  MobilePurifierRowDemo,
  PurifierDetailDemo,
  PurifierMaintenanceModalDemo,
  PurifiersFiltersDemo,
  PurifiersKpisDemo,
  PurifiersMapDemo,
  PurifiersTableDemo,
} from "./PurifiersDemos";
import type { PreviewMap } from "./types";

/** One unit in operation, so the detail shows a location, an activation date and a review date. */
const sample = () => purifiers.find((p) => p.status === "operation") ?? purifiers[0];

export const purifiersPreviews: PreviewMap = {
  PurifierDetail: () => ({ node: <PurifierDetailDemo purifier={sample()} today={portalToday()} /> }),
  PurifierMaintenanceModal: () => ({ node: <PurifierMaintenanceModalDemo purifier={sample()} today={portalToday()} /> }),
  PurifiersExplorer: () => ({ node: <PurifiersExplorer purifiers={purifiers} today={portalToday()} /> }),
  PurifiersFilters: () => ({ node: <PurifiersFiltersDemo purifiers={purifiers} /> }),
  PurifiersKpis: () => ({ node: <PurifiersKpisDemo purifiers={purifiers} /> }),
  PurifiersMap: () => ({ node: <PurifiersMapDemo purifiers={purifiers} /> }),
  PurifiersTable: () => ({ node: <PurifiersTableDemo rows={purifiers.slice(0, 5)} today={portalToday()} /> }),
  MobilePurifierDetailSheet: () => ({ node: <MobilePurifierDetailDemo purifier={sample()} today={portalToday()} />, tall: true }),
  MobilePurifierMaintenanceSheet: () => ({ node: <MobilePurifierMaintenanceDemo purifier={sample()} today={portalToday()} />, tall: true }),
  MobilePurifierRow: () => ({ node: <MobilePurifierRowDemo purifier={sample()} today={portalToday()} />, tall: true }),
  MobilePurifiersCta: () => ({ node: <MobilePurifiersCta /> }),
  MobilePurifiersExplorer: () => ({ node: <MobilePurifiersExplorer purifiers={purifiers} today={portalToday()} />, tall: true }),
};
