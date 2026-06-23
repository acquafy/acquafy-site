import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CheckinProduct from "@/components/CheckinProduct";
import { CHECKIN_FAMILIES } from "@/lib/checkin-products";

export function generateStaticParams() {
  return CHECKIN_FAMILIES.map((f) => ({ produto: `checkin-${f.slug}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ produto: string }>;
}): Promise<Metadata> {
  const { produto } = await params;
  const slug = produto.replace(/^checkin-/, "");
  const family = CHECKIN_FAMILIES.find((f) => f.slug === slug);
  if (!family) return {};
  return {
    title: `${family.title} — Acquafy`,
    description: `Compre o ${family.title}: ${family.subtitle}. Filtros premium, App Acquafy, UV LED.`,
  };
}

export default async function BuyCheckinPage({
  params,
}: {
  params: Promise<{ produto: string }>;
}) {
  const { produto } = await params;
  const slug = produto.replace(/^checkin-/, "");
  const family = CHECKIN_FAMILIES.find((f) => f.slug === slug);
  if (!family) notFound();

  return (
    <>
      <Header />
      <main>
        <CheckinProduct family={family} />
      </main>
    </>
  );
}
