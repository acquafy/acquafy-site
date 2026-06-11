import type { Metadata } from "next";
import Header from "@/components/Header";
import BannerBaseConhecimento from "@/components/BannerBaseConhecimento";
import CategoriasBaseConhecimento from "@/components/CategoriasBaseConhecimento";
import AcessoRapidoBK from "@/components/AcessoRapidoBK";
import DownloadsBK from "@/components/DownloadsBK";
import TutoriaisVideoBK from "@/components/TutoriaisVideoBK";
import PoliticasGarantiasBK from "@/components/PoliticasGarantiasBK";
import ArtigosBK from "@/components/ArtigosBK";
import FaqBK from "@/components/FaqBK";
import CtaBK from "@/components/CtaBK";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Base de Conhecimento — Acquafy",
  description: "Encontre respostas, tutoriais, artigos e suporte especializado sobre produtos, plataforma, parceria e muito mais. Base de Conhecimento Acquafy.",
};

export default function BaseDeConhecimentoPage() {
  return (
    <>
      <Header />
      <main>
        <BannerBaseConhecimento />
        <CategoriasBaseConhecimento />
        <AcessoRapidoBK />
        <ArtigosBK />
        <DownloadsBK />
        <TutoriaisVideoBK />
        <PoliticasGarantiasBK />
        <FaqBK />
        <CtaBK />
      </main>
      <Footer />
    </>
  );
}
