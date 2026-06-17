"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgBg       = "/figma-assets/banner-contato-bg.webp";
const imgProdutos = "/figma-assets/banner-contato-products.webp";

// Feature icons — viewBox 0 0 42 42 (todos quadrados)
const imgFone      = "/figma-assets/icon-headset.svg"; // FONE / headset
const imgTime      = "/figma-assets/icon-time-relogio.svg"; // TIME / relógio
const imgPlanetWeb = "/figma-assets/icon-planetweb-globo.svg"; // PLANET WEB / globo

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  body: string;
  features: { title: string; description: string }[];
  imgAlt: string;
}> = {
  pt: {
    heading1: "Fale com a ",
    heading2: "Acquafy",
    body: "Tem dúvidas, quer saber mais sobre nossas soluções ou se tornar um parceiro? Estamos prontos para ouvir você e encontrar a melhor solução juntos.",
    features: [
      { title: "Atendimento especializado", description: "Nossa equipe está pronta para ajudar você." },
      { title: "Resposta rápida",           description: "Retornamos o mais rápido possível." },
      { title: "Atuação global",            description: "Presente em mais de 16 idiomas com suporte local." },
    ],
    imgAlt: "Linha Neo Acquafy",
  },
  en: {
    heading1: "Talk to ",
    heading2: "Acquafy",
    body: "Have questions, want to learn more about our solutions or become a partner? We're ready to listen and find the best solution together.",
    features: [
      { title: "Specialized support",  description: "Our team is ready to help you." },
      { title: "Quick response",       description: "We get back to you as fast as possible." },
      { title: "Global reach",         description: "Present in more than 16 languages with local support." },
    ],
    imgAlt: "Neo Acquafy Line",
  },
  es: {
    heading1: "Habla con ",
    heading2: "Acquafy",
    body: "¿Tienes dudas, quieres saber más sobre nuestras soluciones o convertirte en socio? Estamos listos para escucharte y encontrar la mejor solución juntos.",
    features: [
      { title: "Atención especializada", description: "Nuestro equipo está listo para ayudarte." },
      { title: "Respuesta rápida",       description: "Respondemos lo más rápido posible." },
      { title: "Actuación global",       description: "Presente en más de 16 idiomas con soporte local." },
    ],
    imgAlt: "Línea Neo Acquafy",
  },
};

const featureIcons = [imgFone, imgTime, imgPlanetWeb];

// ── Feature item ──────────────────────────────────────────────────────────────
// Layout Figma (3560:12637): ícone + título na MESMA LINHA, descrição abaixo
function Feature({
  icon, title, description,
}: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[180px]">
      {/* linha: ícone + título */}
      <div className="flex gap-[20px] items-center w-full">
        <FigmaIcon src={icon} size={40} aspectW={42} aspectH={42} />
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-1 min-w-0">
          {title}
        </p>
      </div>
      {/* descrição */}
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
        {description}
      </p>
    </div>
  );
}

export default function BannerContato() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-[20px] pt-[80px] pb-[40px] w-full min-h-[506px]">
      {/* Background */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Content */}
      <div className="relative flex flex-col xl:flex-row gap-[40px] items-center max-w-[1400px] w-full">

        {/* Left */}
        <div className="flex flex-[1_0_0] flex-col gap-[40px] items-center xl:items-start min-w-[280px] max-w-[640px]">
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] text-center xl:text-left">
            {t.heading1}
            <span className="text-[#0569ff]">{t.heading2}</span>
          </h1>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center xl:text-left w-full">
            {t.body}
          </p>

          {/* Features — 3 ícones diferentes, layout horizontal */}
          <div className="flex flex-wrap gap-[20px] items-start w-full">
            {t.features.map((f, i) => (
              <Feature
                key={f.title}
                icon={featureIcons[i]}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>
        </div>

        {/* Right — product image */}
        <div className="flex flex-[1_0_0] items-end justify-end min-w-[280px]">
          <img
            alt={t.imgAlt}
            className="w-full max-w-[680px] h-auto object-contain"
            src={imgProdutos}
          />
        </div>

      </div>
    </section>
  );
}
