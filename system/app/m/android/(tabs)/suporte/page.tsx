// app/m/android/(tabs)/suporte/page.tsx
import type { Metadata } from "next";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobileSupport } from "@/components/mobile/sections/MobileSupport";
import { mobilePath } from "@/lib/mobile/platform";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Suporte" };

export default function AndroidSupportPage() {
  return (
    <AndroidScreen title="Suporte" subtitle="Tire dúvidas, abra chamados e fale com a nossa equipe." back={{ href: mobilePath("android", "profile"), label: "Perfil" }}>
      <MobileSupport today={portalToday()} />
    </AndroidScreen>
  );
}
