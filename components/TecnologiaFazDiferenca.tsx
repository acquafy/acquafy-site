"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgPurif    = "/figma-assets/ts-icon-agua-intel.svg";
const imgBrain    = "/figma-assets/ts-icon-brain.svg";
const imgIot      = "/figma-assets/ts-icon-iot.svg";
const imgTela     = "/figma-assets/ts-icon-tela.svg";
const imgShield   = "/figma-assets/ts-icon-shield-agua.svg";
const imgScale    = "/figma-assets/ts-icon-scale.svg";
const imgMagnific = "/figma-assets/ts-hero-right.webp";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  features: { title: string; description: string }[];
}> = {
  pt: {
    heading1: "Tecnologia",
    heading2: " que faz a diferença",
    subtitle: "Desenvolvemos soluções completas que unem hardware avançado, software inteligente e conectividade para oferecer a melhor experiência em purificação de água e gestão de impacto.",
    features: [
      { title: "Purificação Avançada",    description: "Sistemas de filtragem multi-etapas que removem impurezas, odores, metais pesados e microrganismos, garantindo água pura e alcalina." },
      { title: "Inteligência Artificial", description: "IA integrada para monitoramento da água, manutenção preditiva, uso otimizado e insights para operação e desempenho." },
      { title: "Conectividade IoT",       description: "Dispositivos conectados em tempo real, com monitoramento remoto, atualizações e gestão centralizadas via plataforma Acquafy." },
      { title: "Interface Inteligente",   description: "Telas LCD IPS Touch com experiência intuitiva, informações em tempo real, anúncios e interatividade para usuários de marcas." },
      { title: "Segurança Total",         description: "Proteção de dados, controle de acesso, criptografia e conformidade com as principais normas internacionais de segurança e privacidade." },
      { title: "Dados e Performance",     description: "Dashboards completos com indicadores de uso, qualidade da água, receita e impacto para decisões estratégicas baseadas em dados." },
    ],
  },
  en: {
    heading1: "Technology",
    heading2: " that makes a difference",
    subtitle: "We develop complete solutions that combine advanced hardware, intelligent software and connectivity to deliver the best experience in water purification and impact management.",
    features: [
      { title: "Advanced Purification",   description: "Multi-stage filtration systems that remove impurities, odors, heavy metals and microorganisms, ensuring pure and alkaline water." },
      { title: "Artificial Intelligence", description: "Integrated AI for water monitoring, predictive maintenance, optimized usage and insights for operation and performance." },
      { title: "IoT Connectivity",        description: "Devices connected in real time, with remote monitoring, updates and centralized management via the Acquafy platform." },
      { title: "Smart Interface",         description: "LCD IPS Touch screens with an intuitive experience, real-time information, ads and interactivity for brand users." },
      { title: "Total Security",          description: "Data protection, access control, encryption and compliance with the leading international security and privacy standards." },
      { title: "Data & Performance",      description: "Complete dashboards with usage indicators, water quality, revenue and impact for data-driven strategic decisions." },
    ],
  },
  es: {
    heading1: "Tecnología",
    heading2: " que marca la diferencia",
    subtitle: "Desarrollamos soluciones completas que combinan hardware avanzado, software inteligente y conectividad para ofrecer la mejor experiencia en purificación de agua y gestión de impacto.",
    features: [
      { title: "Purificación Avanzada",    description: "Sistemas de filtración de múltiples etapas que eliminan impurezas, olores, metales pesados y microorganismos, garantizando agua pura y alcalina." },
      { title: "Inteligencia Artificial",  description: "IA integrada para monitoreo del agua, mantenimiento predictivo, uso optimizado e insights para operación y rendimiento." },
      { title: "Conectividad IoT",         description: "Dispositivos conectados en tiempo real, con monitoreo remoto, actualizaciones y gestión centralizada vía plataforma Acquafy." },
      { title: "Interfaz Inteligente",     description: "Pantallas LCD IPS Touch con experiencia intuitiva, información en tiempo real, anuncios e interactividad para usuarios de marcas." },
      { title: "Seguridad Total",          description: "Protección de datos, control de acceso, cifrado y cumplimiento con las principales normas internacionales de seguridad y privacidad." },
      { title: "Datos y Rendimiento",      description: "Dashboards completos con indicadores de uso, calidad del agua, ingresos e impacto para decisiones estratégicas basadas en datos." },
    ],
  },
};

function FeatureCard({ icon, aspectW, aspectH, title, description }: {
  icon: string; aspectW: number; aspectH: number; title: string; description: string;
}) {
  return (
    <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[265px] min-w-[150px] px-[10px] py-[20px] rounded-[16px]">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full min-h-[36px] flex items-center justify-center">
        {title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
        {description}
      </p>
    </div>
  );
}

export default function TecnologiaFazDiferenca() {
  const { lang } = useLang();
  const t = T[lang];

  const features = t.features.map((f, i) => {
    const icons = [
      { icon: imgPurif,  aspectW: 40, aspectH: 40 },
      { icon: imgBrain,  aspectW: 30, aspectH: 30 },
      { icon: imgIot,    aspectW: 30, aspectH: 20 },
      { icon: imgTela,   aspectW: 21, aspectH: 30 },
      { icon: imgShield, aspectW: 24, aspectH: 30 },
      { icon: imgScale,  aspectW: 30, aspectH: 30 },
    ];
    return { ...icons[i], ...f };
  });

  return (
    <section className="bg-white flex flex-col gap-[20px] items-center justify-center overflow-hidden px-[20px] py-[40px] relative w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] max-w-[800px] w-full">
            <span className="text-[#0569ff]">{t.heading1}</span>
            {t.heading2}
          </h2>
          <p
            className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] max-w-[800px] w-full"
            style={{ fontFeatureSettings: '"case" 1' }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Cards + Globe — flex-col mobile / flex-row desktop */}
        <div className="
          flex flex-col gap-[100px] items-center justify-center min-w-[240px] relative w-full
          md:content-center md:flex-row md:flex-wrap md:gap-[20px]
        ">

          {/* Cards grid */}
          <div className="content-start flex flex-wrap gap-[10px] items-start justify-center min-w-[180px] overflow-clip relative w-full md:flex-[1_0_0]">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* Globe — inline flex item, overflows 135px upward from h-[265px] container */}
          <div className="flex flex-col h-[265px] items-center justify-end max-w-[260px] min-h-[250px] min-w-[260px] relative w-full md:flex-[1_0_0]">
            <div className="mix-blend-multiply relative shrink-0 size-[400px]">
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgMagnific}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
