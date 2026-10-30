import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerFiltros from "@/components/BannerFiltros";
import LinhasFiltros from "@/components/LinhasFiltros";
import FiltrosQualidadeAgua from "@/components/FiltrosQualidadeAgua";
import ReposicaoInteligente from "@/components/ReposicaoInteligente";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Filtros — Acquafy",
  description: "Performance, qualidade e proteção para cada gota. Conheça os filtros Acquafy para seus equipamentos.",
};

export default function FiltrosPage() {
  return (
    <>
      <Header />
      <main>
        <BannerFiltros variant="filtros" />
        <LinhasFiltros />
        <FiltrosQualidadeAgua />
        <ReposicaoInteligente />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
