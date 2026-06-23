import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckinCatalog from "@/components/CheckinCatalog";

export const metadata: Metadata = {
  title: "Comprar — Acquafy",
  description: "Escolha o seu purificador Acquafy.",
};

export default function BuyPage() {
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
