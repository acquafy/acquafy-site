import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CheckinProduct from "@/components/CheckinProduct";
import { CHECKIN_FAMILIES } from "@/lib/checkin-products";
import { snipcartCrawlerProps } from "@/lib/snipcart";

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) throw new Error("NEXT_PUBLIC_SITE_URL is not set — required for Snipcart price verification");

  return (
    <>
      <Header />
      <main>
        <CheckinProduct family={family} />
      </main>

      {/* Snipcart price-verification elements — hidden, crawled by Snipcart to validate prices */}
      <div aria-hidden="true" style={{ display: "none" }}>
        {family.variants.map((variant) =>
          snipcartCrawlerProps(variant.id, siteUrl).map((props) => (
            <button
              key={`${variant.id}-${props["data-item-currency"]}`}
              className="snipcart-add-item"
              {...props}
            />
          ))
        )}
      </div>
    </>
  );
}
