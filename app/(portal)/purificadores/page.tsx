// app/(portal)/purificadores/page.tsx
import type { Metadata } from "next";
import { PurifiersExplorer } from "@/components/sections/PurifiersExplorer";
import { purifiers } from "@/config/investor";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Meus Purificadores" };

export default async function PurifiersPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  // `?q=<serial>` comes from the top-bar search: it opens the list already filtered.
  const initialQuery = typeof q === "string" ? q.slice(0, 60) : "";

  return <PurifiersExplorer key={initialQuery} purifiers={purifiers} today={portalToday()} initialQuery={initialQuery} />;
}
