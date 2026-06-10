import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerFiltros from "@/components/BannerFiltros";
import LinhasFiltros from "@/components/LinhasFiltros";
import ReposicaoInteligente from "@/components/ReposicaoInteligente";
import ColecaoAcessorios from "@/components/ColecaoAcessorios";
import ColecaoMediaNetwork from "@/components/ColecaoMediaNetwork";
import ParceirosAcessorios from "@/components/ParceirosAcessorios";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Filtros & Acessórios — Acquafy",
  description: "Performance, qualidade e proteção para cada gota. Conheça os filtros e acessórios Acquafy para seus equipamentos.",
};

export default function FiltrosPage() {
  return (
    <>
      <Header />
      <main>
        <BannerFiltros />
        <LinhasFiltros />
        <ReposicaoInteligente />
        <ColecaoAcessorios />
        <ColecaoMediaNetwork />
        <ParceirosAcessorios />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
