import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CheckoutUp from "@/components/CheckoutUp";
import LinhaNeo from "@/components/LinhaNeo";
import FiltrosNeo from "@/components/FiltrosNeo";
import Features from "@/components/Features";
import TransformaVidas from "@/components/TransformaVidas";
import LinhaPremium from "@/components/LinhaPremium";
import NeoMedia from "@/components/NeoMedia";
import Parceria from "@/components/Parceria";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CheckoutUp />
        <LinhaNeo />
        <FiltrosNeo />
        <Features />
        <TransformaVidas />
        <LinhaPremium />
        <NeoMedia />
        <Parceria />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
