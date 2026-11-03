// app/m/android/(tabs)/perfil/page.tsx
import type { Metadata } from "next";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobileProfileCard, type MobileProfileStats } from "@/components/mobile/sections/MobileProfileCard";
import { MobileProfileMenu } from "@/components/mobile/sections/MobileProfileMenu";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Perfil" };

function profileStats(): MobileProfileStats {
  const s = getPortalSummary();
  const last = s.installments.filter((i) => i.status === "received").at(-1);
  const payout = last ? { amount: last.amount, date: last.paymentDate, received: true } : s.next ? { amount: s.next.amount, date: s.next.paymentDate, received: false } : null;
  return { units: s.units, payout };
}

export default function AndroidProfilePage() {
  return (
    <AndroidScreen title="Meu Perfil" navTitle="Perfil" subtitle="Gerencie suas informações e preferências." secondary={<MobileProfileMenu />}>
      <MobileProfileCard stats={profileStats()} />
    </AndroidScreen>
  );
}
