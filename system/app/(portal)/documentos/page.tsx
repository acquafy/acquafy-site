// app/(portal)/documentos/page.tsx
import type { Metadata } from "next";
import { DocumentsLibrary } from "@/components/sections/DocumentsLibrary";
import { portalToday } from "@/lib/portal/schedule";

export const metadata: Metadata = { title: "Documentos" };

export default function DocumentsPage() {
  return <DocumentsLibrary today={portalToday()} />;
}
