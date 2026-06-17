"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

const imgCloud  = "/figma-assets/op-cloud.svg";
const imgQR     = "/figma-assets/op-qr.svg";
const imgMoney  = "/figma-assets/op-money.svg";
const imgMobile = "/figma-assets/op-mobile.svg";
const imgMedia  = "/figma-assets/op-media.svg";
const imgPlanet = "/figma-assets/op-planet.svg";

const T: Record<Lang, {
  headingA: string;
  headingB: string;
  features: { icon: string; title: string; desc: string }[];
}> = {
  pt: {
    headingA: "Uma operação ",
    headingB: "global, simples e inteligente",
    features: [
      { icon: imgCloud,  title: "Plataforma Cloud",   desc: "Infraestrutura segura, escalável e sempre disponível." },
      { icon: imgQR,     title: "QR Codes e Links",   desc: "Gere links e QR Codes personalizados para vendas e mídia." },
      { icon: imgMoney,  title: "Vendas e Comissões", desc: "Acompanha vendas, comissões e relatórios em tempo real." },
      { icon: imgMobile, title: "App + AI + IoT",     desc: "Controle total, dados inteligentes e gestão de dispositivos." },
      { icon: imgMedia,  title: "Media Network",      desc: "Rede de conteúdo e valor para sua operação." },
      { icon: imgPlanet, title: "Plataforma Cloud",   desc: "Infraestrutura segura, escalável e sempre disponível." },
    ],
  },
  en: {
    headingA: "One operation — ",
    headingB: "global, simple and smart",
    features: [
      { icon: imgCloud,  title: "Cloud Platform",      desc: "Secure, scalable infrastructure, always available." },
      { icon: imgQR,     title: "QR Codes & Links",    desc: "Generate custom links and QR Codes for sales and media." },
      { icon: imgMoney,  title: "Sales & Commissions", desc: "Track sales, commissions and real-time reports." },
      { icon: imgMobile, title: "App + AI + IoT",      desc: "Full control, smart data and device management." },
      { icon: imgMedia,  title: "Media Network",       desc: "Content and value network for your operation." },
      { icon: imgPlanet, title: "Cloud Platform",      desc: "Secure, scalable infrastructure, always available." },
    ],
  },
  es: {
    headingA: "Una operación ",
    headingB: "global, simple e inteligente",
    features: [
      { icon: imgCloud,  title: "Plataforma Cloud",    desc: "Infraestructura segura, escalable y siempre disponible." },
      { icon: imgQR,     title: "QR Codes y Links",    desc: "Genera links y QR Codes personalizados para ventas y medios." },
      { icon: imgMoney,  title: "Ventas y Comisiones", desc: "Sigue ventas, comisiones e informes en tiempo real." },
      { icon: imgMobile, title: "App + AI + IoT",      desc: "Control total, datos inteligentes y gestión de dispositivos." },
      { icon: imgMedia,  title: "Media Network",       desc: "Red de contenido y valor para tu operación." },
      { icon: imgPlanet, title: "Plataforma Cloud",    desc: "Infraestructura segura, escalable y siempre disponible." },
    ],
  },
};

export default function OperacaoGlobal() {
  const { lang } = useLang();
  const t = T[lang];
  const features = t.features;

  return (
    <section className="bg-white flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[28px] text-center min-w-[240px] w-full">
          <span className="text-[#1f2e91]">{t.headingA}</span>
          <span className="text-[#0569ff]">{t.headingB}</span>
        </h2>

        <div className="flex flex-wrap gap-[10px] items-start justify-center w-full">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[110px] min-w-[200px] p-[20px] rounded-[16px]"
            >
              <img src={f.icon} alt="" className="size-[30px] object-contain shrink-0" />
              <div className="flex flex-col gap-[10px] items-start text-center w-full shrink-0">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[16px] leading-[20px] text-[#1f2e91] min-h-[32px] shrink-0 w-full">
                  {f.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] not-italic text-[14px] leading-[16px] text-[#333] shrink-0 w-full">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
