import type { Metadata } from "next";
import Header from "@/components/Header";
import CheckinMain from "@/components/CheckinMain";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Checkin — Acquafy",
  description: "Escolha o seu purificador Acquafy e finalize o pedido com segurança.",
};

export default function CheckinPage() {
  return (
    <>
      <Header />
      <main>
        <CheckinMain />
      </main>
      <Footer />
    </>
  );
}
