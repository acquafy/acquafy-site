import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlatformHero from "@/components/PlatformHero";
import PlatformFeatures from "@/components/PlatformFeatures";
import PlatformExperience from "@/components/PlatformExperience";
import PlatformAppAiIot from "@/components/PlatformAppAiIot";
import PlatformGlobal from "@/components/PlatformGlobal";
import IdiomasGrid from "@/components/IdiomasGrid";
import PlatformProfiles from "@/components/PlatformProfiles";
import PlatformEcosystem from "@/components/PlatformEcosystem";
import PlatformCta from "@/components/PlatformCta";

export const metadata = {
  title: "Plataforma — Acquafy",
  description: "Gestão global, App + AI + IoT em uma experiência integrada para mídia, parceiros, vendas e operação da água inteligente.",
};

export default function PlataformaPage() {
  return (
    <>
      <Header />
      <main>
        <PlatformHero />
        <PlatformFeatures />
        <PlatformExperience />
        <PlatformAppAiIot />
        <PlatformGlobal />
        <section className="bg-white w-full px-[20px] py-[40px]">
          <div className="max-w-[1400px] mx-auto w-full">
            <IdiomasGrid />
          </div>
        </section>
        <PlatformProfiles />
        <PlatformEcosystem />
        <PlatformCta />
      </main>
      <Footer />
    </>
  );
}
