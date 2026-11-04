import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bePartner } from "@/lib/flags";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParceriaBanner from "@/components/ParceriaBanner";
import PorqueParceiro from "@/components/PorqueParceiro";
import ModelosParceria from "@/components/ModelosParceria";
import ProdutosParceria from "@/components/ProdutosParceria";
import ComoFuncionaParceria from "@/components/ComoFuncionaParceria";
import OperacaoGlobal from "@/components/OperacaoGlobal";
import CtaBannerParceria from "@/components/CtaBannerParceria";

export const metadata: Metadata = {
  title: "Programa de Parceria Global — Acquafy",
  description:
    "Três níveis para crescer com a Acquafy em escala global: Silver, Gold e Platinum. Indique, opere ou distribua com suporte completo e receita recorrente.",
};

export default async function ParceriaPage() {
  // Be a Partner is a feature flag: while it is off the program page does not exist.
  if (!(await bePartner())) notFound();
  return (
    <>
      <Header />
      <main>
        <ParceriaBanner />
        <PorqueParceiro />
        <ModelosParceria />
        <ProdutosParceria />
        <ComoFuncionaParceria />
        <OperacaoGlobal />
        <CtaBannerParceria />
      </main>
      <Footer />
    </>
  );
}
