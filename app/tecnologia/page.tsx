import type { Metadata } from "next";
import Header from "@/components/Header";
import TecnologiaBanner from "@/components/TecnologiaBanner";
import TecnologiaFazDiferenca from "@/components/TecnologiaFazDiferenca";
import TecnologiaSustentSection from "@/components/TecnologiaSustentSection";
import TecnologiaCtaBanner from "@/components/TecnologiaCtaBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tecnologia & Sustentabilidade — Acquafy",
  description:
    "Inovação que transforma água em qualidade de vida e preserva o planeta para as futuras gerações. Conheça a tecnologia Acquafy.",
};

export default function TecnologiaSustentabilidade() {
  return (
    <>
      <Header />
      <main>
        <TecnologiaBanner />
        <TecnologiaFazDiferenca />
        <TecnologiaSustentSection />
        <TecnologiaCtaBanner />
      </main>
      <Footer />
    </>
  );
}
