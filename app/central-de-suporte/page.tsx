import type { Metadata } from "next";
import Header from "@/components/Header";
import BannerCentralSuporte from "@/components/BannerCentralSuporte";
import FaleComEquipeSuporte from "@/components/FaleComEquipeSuporte";
import DiferenciaisSuporte from "@/components/DiferenciaisSuporte";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Central de Suporte — Acquafy",
  description: "Encontre respostas, tutoriais e suporte especializado para produtos e soluções Acquafy. Nossa equipe está pronta para ajudar sempre que precisar.",
};

export default function CentralDeSuportePage() {
  return (
    <>
      <Header />
      <main>
        <BannerCentralSuporte />
        <FaleComEquipeSuporte />
        <DiferenciaisSuporte />
      </main>
      <Footer />
    </>
  );
}
