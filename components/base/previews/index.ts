// components/base/previews/index.ts
//
// Name → live preview of every organism shown in /base/organismos. A new organism needs one entry in the map of its
// screen (<Screen>Previews.tsx); when it is missing, the gallery shows a visible "Sem pré-visualização" block.
import { calendarPreviews } from "./CalendarPreviews";
import { contractPreviews } from "./ContractPreviews";
import { dashboardPreviews } from "./DashboardPreviews";
import { documentsPreviews } from "./DocumentsPreviews";
import { homePreviews } from "./HomePreviews";
import { loginPreviews } from "./LoginPreviews";
import { profilePreviews } from "./ProfilePreviews";
import { purifiersPreviews } from "./PurifiersPreviews";
import { requestPreviews } from "./RequestPreviews";
import { sharedPreviews } from "./SharedPreviews";
import { statementPreviews } from "./StatementPreviews";
import { supportPreviews } from "./SupportPreviews";
import type { PreviewMap } from "./types";
import { welcomePreviews } from "./WelcomePreviews";

export const ORGANISM_PREVIEWS: PreviewMap = {
  ...welcomePreviews,
  ...loginPreviews,
  ...homePreviews,
  ...dashboardPreviews,
  ...purifiersPreviews,
  ...requestPreviews,
  ...contractPreviews,
  ...statementPreviews,
  ...calendarPreviews,
  ...documentsPreviews,
  ...supportPreviews,
  ...profilePreviews,
  ...sharedPreviews,
};
