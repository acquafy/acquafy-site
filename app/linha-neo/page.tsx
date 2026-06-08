import type { Metadata } from "next";
import Header from "@/components/Header";
import BannerLinhaNeo from "@/components/BannerLinhaNeo";
import LinhaNeo from "@/components/LinhaNeo";
import LinhaPremium from "@/components/LinhaPremium";
import NeoVsPremium from "@/components/NeoVsPremium";
import PorqueNeo from "@/components/PorqueNeo";
import CtaBannerNeo from "@/components/CtaBannerNeo";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Linha Neo — Acquafy",
  description: "Conheça a Linha Neo da Acquafy: purificadores inteligentes com tecnologia global, App + AI + IoT nas versões Essentials e Premium.",
};

export default function LinhaNeoPagina() {
  return (
    <>
      <Header />
      <main>
        <BannerLinhaNeo />
        <LinhaNeo />
        <LinhaPremium />
        <NeoVsPremium />
        <PorqueNeo />
        <CtaBannerNeo />
      </main>
      <Footer />
    </>
  );
}
