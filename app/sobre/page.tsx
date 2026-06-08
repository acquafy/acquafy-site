import type { Metadata } from "next";
import Header from "@/components/Header";
import SobreBanner from "@/components/SobreBanner";
import SobreQuemSomos from "@/components/SobreQuemSomos";
import SobreEmpresas from "@/components/SobreEmpresas";
import SobreValores from "@/components/SobreValores";
import SobreHistoria from "@/components/SobreHistoria";
import SobreImpacto from "@/components/SobreImpacto";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sobre Nós — Acquafy",
  description:
    "Conheça a Acquafy: nossa história, missão, valores e o grupo Interfy ao qual pertencemos.",
};

export default function SobreNos() {
  return (
    <>
      <Header />
      <main>
        <SobreBanner />
        <SobreQuemSomos />
        <SobreEmpresas />
        <SobreValores />
        <SobreHistoria />
        <SobreImpacto />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
