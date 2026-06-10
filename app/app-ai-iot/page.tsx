import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroAppAiIot from "@/components/HeroAppAiIot";
import ConectadoAppAiIot from "@/components/ConectadoAppAiIot";
import FeaturesAppAiIot from "@/components/FeaturesAppAiIot";
import CompatibilidadeAppAiIot from "@/components/CompatibilidadeAppAiIot";
import FluxoInteligenteAppAiIot from "@/components/FluxoInteligenteAppAiIot";
import RecursosAppAiIot from "@/components/RecursosAppAiIot";
import BeneficiosAppAiIot from "@/components/BeneficiosAppAiIot";
import CtaBannerAppAiIot from "@/components/CtaBannerAppAiIot";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "App + AI + IoT — Acquafy",
  description: "Controle seus purificadores, monitore dispositivos, receba alertas inteligentes e gerencie toda a operação em uma experiência integrada.",
};

export default function AppAiIotPage() {
  return (
    <>
      <Header />
      <main>
        <HeroAppAiIot />
        <ConectadoAppAiIot />
        <FeaturesAppAiIot />
        <CompatibilidadeAppAiIot />
        <FluxoInteligenteAppAiIot />
        <RecursosAppAiIot />
        <BeneficiosAppAiIot />
        <CtaBannerAppAiIot />
      </main>
      <Footer />
    </>
  );
}
