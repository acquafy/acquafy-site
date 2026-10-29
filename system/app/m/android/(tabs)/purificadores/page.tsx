// app/m/android/(tabs)/purificadores/page.tsx
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { AndroidFab } from "@/components/mobile/android/AndroidFab";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobilePurifiersCta } from "@/components/mobile/sections/MobilePurifiersCta";
import { MobilePurifiersExplorer } from "@/components/mobile/sections/MobilePurifiersExplorer";
import { purifiers } from "@/config/investor";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Purificadores" };

/** Purificadores: the units list plus an extended FAB (Material's primary action of the screen) that opens the purchase request. */
export default function AndroidPurifiersPage() {
  return (
    <AndroidScreen
      title="Purificadores"
      subtitle="Situação, número de série e localização de cada unidade."
      fab={<AndroidFab icon={<Plus strokeWidth={2} />} label="Solicitar" extended href={{ route: "request" }} />}
    >
      <MobilePurifiersExplorer purifiers={purifiers} today={portalToday()} />
      <MobilePurifiersCta />
    </AndroidScreen>
  );
}
