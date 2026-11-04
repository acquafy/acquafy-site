import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CheckinProduct from "@/components/CheckinProduct";
import { CHECKIN_FAMILIES } from "@/lib/checkin-products";
import { buyNow } from "@/lib/flags";
import { snipcartCrawlerProps } from "@/lib/snipcart";

export const metadata: Metadata = {
  title: "Neo ULTRA — Acquafy",
  description: "Neo ULTRA: alto volume, até 8 em 1, Wi-Fi 5, Bluetooth 5.3, UV LED. Escolha o seu.",
  robots: { index: false, follow: false },
};

// Evaluated per request: the Buy Now flag decides whether the purchase flow exists at all.
export const dynamic = "force-dynamic";

export default async function NeoUltraPage() {
  if (!(await buyNow())) notFound();
  const family = CHECKIN_FAMILIES.find((f) => f.slug === "neo-ultra")!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <>
      <Header />
      <main>
        <CheckinProduct family={family} showSlide />
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
