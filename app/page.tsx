import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CheckoutUp from "@/components/CheckoutUp";
import LinhaNeo from "@/components/LinhaNeo";
import FiltrosNeo from "@/components/FiltrosNeo";
import TransformaVidas from "@/components/TransformaVidas";
import LinhaPremium from "@/components/LinhaPremium";
import FiltrosPremium from "@/components/FiltrosPremium";
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
        <TransformaVidas />
        <LinhaPremium />
        <FiltrosPremium />
        <NeoMedia />
        <Parceria />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
