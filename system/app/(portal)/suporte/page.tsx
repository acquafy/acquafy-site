// app/(portal)/suporte/page.tsx
import type { Metadata } from "next";
import { SupportWorkspace } from "@/components/sections/SupportWorkspace";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Suporte" };

export default function SupportPage() {
  return <SupportWorkspace today={portalToday()} />;
}
