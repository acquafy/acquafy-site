// app/(portal)/perfil/page.tsx
import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import { ProfileWorkspace, ProfileWorkspaceSkeleton } from "@/components/sections/ProfileWorkspace";
import type { ProfileStats } from "@/components/sections/ProfileSummaryCard";
import { TERMS_PDF } from "@/config/profile-page";
import { getPortalSummary } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Meu Perfil" };

function profileStats(): ProfileStats {
  const s = getPortalSummary();
  const received = s.installments.filter((i) => i.status === "received");
  const last = received.at(-1);
  const upcoming = s.next;
  const payout = last ? { amount: last.amount, date: last.paymentDate, received: true } : upcoming ? { amount: upcoming.amount, date: upcoming.paymentDate, received: false } : null;
  return { units: s.units, unitsInOperation: s.unitsInOperation, payout, receivedTotal: s.receivedTotal };
}

export default function ProfilePage() {
  const termsPdf = existsSync(path.join(process.cwd(), "public", TERMS_PDF));
  return (
    <Suspense fallback={<ProfileWorkspaceSkeleton />}>
      <ProfileWorkspace stats={profileStats()} termsPdf={termsPdf} />
    </Suspense>
  );
}
