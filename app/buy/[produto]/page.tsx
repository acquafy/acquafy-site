import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FlowHeader from "@/components/flow/FlowHeader";
import CheckinProduct from "@/components/CheckinProduct";
import { CHECKIN_FAMILIES } from "@/lib/checkin-products";
import { buyNow } from "@/lib/flags";
import { snipcartCrawlerProps } from "@/lib/snipcart";

// Evaluated per request: the Buy Now flag decides whether the purchase flow exists at all.
export const dynamic = "force-dynamic";

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
  if (!(await buyNow())) notFound();
  const { produto } = await params;
  const slug = produto.replace(/^checkin-/, "");
  const family = CHECKIN_FAMILIES.find((f) => f.slug === slug);
  if (!family) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <>
      <FlowHeader step={1} />
      <main>
        <CheckinProduct family={family} />
      </main>

      {siteUrl && (
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
      )}
    </>
  );
}
