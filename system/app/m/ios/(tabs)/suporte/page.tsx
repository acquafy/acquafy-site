// app/m/ios/(tabs)/suporte/page.tsx
import type { Metadata } from "next";
import { IosScreen } from "@/components/mobile/ios/IosScreen";
import { MobileSupport } from "@/components/mobile/sections/MobileSupport";
import { mobilePath } from "@/lib/mobile/platform";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Suporte" };

export default function IosSupportPage() {
  return (
    <IosScreen title="Suporte" subtitle="Tire dúvidas, abra chamados e fale com a nossa equipe." back={{ href: mobilePath("ios", "profile"), label: "Perfil" }}>
      <MobileSupport today={portalToday()} />
    </IosScreen>
  );
}
