// app/m/android/(tabs)/perfil/[secao]/page.tsx
import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { AndroidScreen } from "@/components/mobile/android/AndroidScreen";
import { MobileProfileSection } from "@/components/mobile/sections/MobileProfileSection";
import { isSectionId, profileSections, TERMS_PDF } from "@/config/profile-page";
import { mobilePath } from "@/lib/mobile/platform";

type Props = { params: Promise<{ secao: string }> };

export function generateStaticParams() {
  return profileSections.map((s) => ({ secao: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { secao } = await params;
  return { title: profileSections.find((s) => s.id === secao)?.label ?? "Perfil" };
}

/** A pushed screen of the profile ("‹ Perfil"): personal data, bank, notifications, language, security, help, terms. */
export default async function AndroidProfileSectionPage({ params }: Props) {
  const { secao } = await params;
  if (!isSectionId(secao)) notFound();
  const section = profileSections.find((s) => s.id === secao)!;
  const termsPdf = existsSync(path.join(process.cwd(), "public", TERMS_PDF));

  return (
    <AndroidScreen title={section.label} subtitle={section.description} back={{ href: mobilePath("android", "profile"), label: "Perfil" }}>
      <MobileProfileSection id={secao} termsPdf={termsPdf} />
    </AndroidScreen>
  );
}
