import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExpansaoGlobalBanner from "@/components/ExpansaoGlobalBanner";
import ExpansaoGlobalPresenca from "@/components/ExpansaoGlobalPresenca";
import ExpansaoGlobalPilares from "@/components/ExpansaoGlobalPilares";
import ExpansaoGlobalCta from "@/components/ExpansaoGlobalCta";

export const metadata: Metadata = {
  title: "Expansão Global — Acquafy",
  description:
    "A Acquafy está construindo a maior rede global de hidratação inteligente, conectando parceiros, tecnologia e oportunidades em todos os continentes.",
};

export default function ExpansaoGlobalPage() {
  return (
    <>
      <Header />
      <main>
        <ExpansaoGlobalBanner />
        <ExpansaoGlobalPresenca />
        <ExpansaoGlobalPilares />
        <ExpansaoGlobalCta />
      </main>
      <Footer />
    </>
  );
}
