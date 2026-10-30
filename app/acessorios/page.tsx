import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerFiltros from "@/components/BannerFiltros";
import ColecaoAcessorios from "@/components/ColecaoAcessorios";
import ColecaoMediaNetwork from "@/components/ColecaoMediaNetwork";
import ParceirosAcessorios from "@/components/ParceirosAcessorios";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Acessórios — Acquafy",
  description: "Copos, camisetas, garrafas e brindes com a marca Acquafy para equipes, eventos e parceiros.",
};

export default function AcessoriosPage() {
  return (
    <>
      <Header />
      <main>
        <BannerFiltros variant="acessorios" />
        <ColecaoAcessorios />
        <ColecaoMediaNetwork />
        <ParceirosAcessorios />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
