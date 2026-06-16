import type { Metadata } from "next";
import Header from "@/components/Header";
import PoliticasPrivacidadeBanner from "@/components/PoliticasPrivacidadeBanner";
import PoliticasPrivacidadeContent from "@/components/PoliticasPrivacidadeContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Políticas de Privacidade — Acquafy",
  description:
    "Saiba como a Acquafy coleta, utiliza e protege os seus dados pessoais em conformidade com a LGPD e legislações internacionais de privacidade.",
};

export default function PoliticasPrivacidade() {
  return (
    <>
      <Header />
      <main>
        <PoliticasPrivacidadeBanner />
        <PoliticasPrivacidadeContent />
      </main>
      <Footer />
    </>
  );
}
