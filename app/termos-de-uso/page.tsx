import type { Metadata } from "next";
import Header from "@/components/Header";
import TermosDeUsoBanner from "@/components/TermosDeUsoBanner";
import TermosDeUsoConteudo from "@/components/TermosDeUsoConteudo";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso — Acquafy",
  description:
    "Leia os Termos de Uso da Acquafy Corporation: condições de uso do site, produtos, aplicativo e plataforma Global Smart Water.",
};

export default function TermosDeUso() {
  return (
    <>
      <Header />
      <main>
        <TermosDeUsoBanner />
        <TermosDeUsoConteudo />
      </main>
      <Footer />
    </>
  );
}
