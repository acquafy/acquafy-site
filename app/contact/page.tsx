import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import BannerContato from "@/components/BannerContato";
import ContatoInfoForm from "@/components/ContatoInfoForm";
import OutrosCanais from "@/components/OutrosCanais";
import CtaBannerContato from "@/components/CtaBannerContato";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contato — Acquafy",
  description:
    "Entre em contato com a Acquafy. Fale com nossa equipe, envie uma mensagem ou encontre o canal ideal para você.",
};

export default function Contato() {
  return (
    <>
      <Header />
      <main>
        <BannerContato />
        <Suspense>
          <ContatoInfoForm />
        </Suspense>
        <OutrosCanais />
        <CtaBannerContato />
      </main>
      <Footer />
    </>
  );
}
