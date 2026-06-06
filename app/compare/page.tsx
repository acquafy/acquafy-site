import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import CompareProductos from "@/components/CompareProductos";

export const metadata: Metadata = {
  title: "Compare os Produtos — Acquafy",
  description: "Compare as linhas Neo Essentials & Neo Premium e encontre o modelo ideal para você.",
};

export default function ComparePage() {
  return (
    <>
      <Header />
      <main>
        <CompareProductos />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
