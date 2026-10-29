// app/m/ios/(tabs)/purificadores/page.tsx
import type { Metadata } from "next";
import { IosScreen } from "@/components/mobile/ios/IosScreen";
import { MobilePurifiersCta } from "@/components/mobile/sections/MobilePurifiersCta";
import { MobilePurifiersExplorer } from "@/components/mobile/sections/MobilePurifiersExplorer";
import { purifiers } from "@/config/investor";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Purificadores" };

export default function IosPurifiersPage() {
  return (
    <IosScreen title="Purificadores" subtitle="Situação, número de série e localização de cada unidade.">
      <MobilePurifiersExplorer purifiers={purifiers} today={portalToday()} />
      <MobilePurifiersCta />
    </IosScreen>
  );
}
