import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckinCatalog from "@/components/CheckinCatalog";
import { buyNow } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Comprar — Acquafy",
  description: "Escolha o seu purificador Acquafy.",
};

// Evaluated per request: the Buy Now flag decides whether the purchase flow exists at all.
export const dynamic = "force-dynamic";

export default async function BuyPage() {
  if (!(await buyNow())) notFound();
  return (
    <>
      <Header />
      <main>
        <CheckinCatalog />
      </main>
      <Footer />
    </>
  );
}
