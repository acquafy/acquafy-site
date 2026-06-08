import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NeoMediaBanner from "@/components/NeoMediaBanner";
import NeoMediaFeatures from "@/components/NeoMediaFeatures";
import NeoMediaPlatform from "@/components/NeoMediaPlatform";
import NeoMediaHowItWorks from "@/components/NeoMediaHowItWorks";
import NeoMediaAplicacoes from "@/components/NeoMediaAplicacoes";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Neo Media — Acquafy",
  description: "O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios. Combine fornecimento de água, exibição de anúncios e QR Codes para gerar receita recorrente.",
};

export default function NeoMediaPage() {
  return (
    <>
      <Header />
      <main>
        <NeoMediaBanner />
        <NeoMediaFeatures />
        <NeoMediaPlatform />
        <NeoMediaHowItWorks />
        <NeoMediaAplicacoes />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
