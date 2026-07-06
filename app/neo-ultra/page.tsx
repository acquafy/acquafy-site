import type { Metadata } from "next";
import Header from "@/components/Header";
import CheckinProduct from "@/components/CheckinProduct";
import { CHECKIN_FAMILIES } from "@/lib/checkin-products";
import { snipcartCrawlerProps } from "@/lib/snipcart";

export const metadata: Metadata = {
  title: "Neo ULTRA — Acquafy",
  description: "Neo ULTRA: alto volume, até 8 em 1, Wi-Fi 5, Bluetooth 5.3, UV LED. Escolha o seu.",
  robots: { index: false, follow: false },
};

export default function NeoUltraPage() {
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
