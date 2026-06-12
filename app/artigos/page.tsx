import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtigosContent from "./ArtigosContent";

export const metadata: Metadata = {
  title: "Artigos e Guias — Base de Conhecimento Acquafy",
  description: "Encontre artigos, guias e tutoriais sobre produtos Neo, App + AI + IoT, Media Network, parceria, faturamento e manutenção.",
};

export default function ArtigosPage() {
  return (
    <>
      <Header />
      <ArtigosContent />
      <Footer />
    </>
  );
}
