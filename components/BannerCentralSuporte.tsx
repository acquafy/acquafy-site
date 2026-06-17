"use client";

import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import BKSectionPopup from "./BKSectionPopup";
import { useChatWidget } from "./ChatWidget";
import { quickItems } from "./AcessoRapidoBK";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgBg        = "/figma-assets/bg-d.webp";
const imgMainImage = "/figma-assets/main-image.webp";

const imgIconChat    = "/figma-assets/icon-chat-list.svg";
const imgIconCheckin = "/figma-assets/icon-check-list.svg";
const imgIconBook    = "/figma-assets/icon-book.svg";
const imgIconFone    = "/figma-assets/icon-fone-list.svg";

const imgArrowWhite  = "/figma-assets/icon-arrow-white-solid.svg";
const imgArrowBlue   = "/figma-assets/icon-arrow-blue-c.svg";
const imgArrowAccent = "/figma-assets/icon-arrow-accent.svg";

// ── Translations ──────────────────────────────────────────────────────────────
const T: Record<Lang, {
  label: string;
  h1Line1: string;
  h1Brand: string;
  subtitle: string;
  description: string;
  btnChat: string;
  btnSpecialist: string;
  floatingCards: { title: string; desc: string | null }[];
  quickTitle1: string;
  quickTitle2: string;
  quickItems: { title: string; desc: string }[];
  imgAlt: string;
}> = {
  pt: {
    label: "ECOSSISTEMA DIGITAL ACQUAFY",
    h1Line1: "Central de",
    h1Brand: "Suporte Acquafy",
    subtitle: "Estamos aqui para ajudar.",
    description:
      "Nossa equipe e recursos estão prontos para oferecer a melhor experiência com os produtos e soluções Acquafy. Encontre respostas, tutoriais e suporte especializado sempre que precisar.",
    btnChat: "Abrir chat",
    btnSpecialist: "Fale com um especialista",
    floatingCards: [
      { title: "Como podemos ajudar você?",   desc: null },
      { title: "Status do Sistema",           desc: "Verifique a operação dos serviços" },
      { title: "Base de conhecimento",        desc: "Tutoriais e artigos úteis." },
      { title: "Abrir chamado",               desc: "Receba suporte da nossa equipe." },
    ],
    quickTitle1: "Acesso",
    quickTitle2: "rápido",
    quickItems: [
      { title: "Meus produtos",        desc: "Conheça a linha completa de purificadores Neo." },
      { title: "Downloads",            desc: "Manuais, guias rápidos, softwares e documentos." },
      { title: "Tutoriais e vídeos",   desc: "Aprenda passo a passo com nossos tutoriais." },
      { title: "Perguntas frequentes", desc: "Encontre respostas para as dúvidas mais comuns." },
      { title: "Políticas e garantias", desc: "Consulte nossas políticas, termos e garantias." },
    ],
    imgAlt: "Central de Suporte Acquafy",
  },
  en: {
    label: "ACQUAFY DIGITAL ECOSYSTEM",
    h1Line1: "Acquafy",
    h1Brand: "Support Center",
    subtitle: "We are here to help.",
    description:
      "Our team and resources are ready to provide the best experience with Acquafy products and solutions. Find answers, tutorials, and specialized support whenever you need.",
    btnChat: "Open chat",
    btnSpecialist: "Talk to a specialist",
    floatingCards: [
      { title: "How can we help you?",   desc: null },
      { title: "System Status",          desc: "Check the operation of services" },
      { title: "Knowledge Base",         desc: "Tutorials and helpful articles." },
      { title: "Open a ticket",          desc: "Receive support from our team." },
    ],
    quickTitle1: "Quick",
    quickTitle2: "Access",
    quickItems: [
      { title: "My products",       desc: "Explore the complete Neo purifier lineup." },
      { title: "Downloads",         desc: "Manuals, quick guides, software, and documents." },
      { title: "Tutorials & videos", desc: "Learn step by step with our tutorials." },
      { title: "FAQ",               desc: "Find answers to the most common questions." },
      { title: "Policies & warranties", desc: "Review our policies, terms, and warranties." },
    ],
    imgAlt: "Acquafy Support Center",
  },
  es: {
    label: "ECOSISTEMA DIGITAL ACQUAFY",
    h1Line1: "Centro de",
    h1Brand: "Soporte Acquafy",
    subtitle: "Estamos aquí para ayudarte.",
    description:
      "Nuestro equipo y recursos están listos para ofrecer la mejor experiencia con los productos y soluciones Acquafy. Encuentra respuestas, tutoriales y soporte especializado siempre que lo necesites.",
    btnChat: "Abrir chat",
    btnSpecialist: "Habla con un especialista",
    floatingCards: [
      { title: "¿Cómo podemos ayudarte?",  desc: null },
      { title: "Estado del Sistema",        desc: "Verifica la operación de los servicios" },
      { title: "Base de conocimiento",      desc: "Tutoriales y artículos útiles." },
      { title: "Abrir ticket",              desc: "Recibe soporte de nuestro equipo." },
    ],
    quickTitle1: "Acceso",
    quickTitle2: "Rápido",
    quickItems: [
      { title: "Mis productos",          desc: "Conoce la línea completa de purificadores Neo." },
      { title: "Descargas",              desc: "Manuales, guías rápidas, software y documentos." },
      { title: "Tutoriales y videos",    desc: "Aprende paso a paso con nuestros tutoriales." },
      { title: "Preguntas frecuentes",   desc: "Encuentra respuestas a las dudas más comunes." },
      { title: "Políticas y garantías",  desc: "Consulta nuestras políticas, términos y garantías." },
    ],
    imgAlt: "Centro de Soporte Acquafy",
  },
};

// ── Static card metadata (icons/sizes only) ───────────────────────────────────
const floatingCardsMeta = [
  { icon: imgIconChat,    aspectW: 30, aspectH: 30   },
  { icon: imgIconCheckin, aspectW: 30, aspectH: 30   },
  { icon: imgIconBook,    aspectW: 30, aspectH: 22.3 },
  { icon: imgIconFone,    aspectW: 30, aspectH: 30   },
];

// ── Componente ────────────────────────────────────────────────────────────────
//
//  Breakpoints (Figma nodes 3764-13853, 3772-13963, 3772-14308, 3772-14411):
//  • default   (≤ 620px)  "620"  → col centrado; cards empilhados; imagem full-width abaixo
//  • min-[621px] (621-767px) "767"  → col end; cards c/ mb-[-240px]; imagem 460×390 dir
//  • md:       (≥ 768px)  "1280" → imagem 471×400 esq + cards grade 2×2 dir
//  • xl:       (≥ 1280px) "TOTAL"→ texto esq + imagem flex + cards col 270px dir
//
//  Sem gap entre main-row e Acesso Rápido (section usa justify-center, sem gap).
//
export default function BannerCentralSuporte() {
  const { openChat } = useChatWidget();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="relative flex flex-col items-center justify-center px-[20px] py-[40px] w-full min-h-[calc(100vh-80px)]">

      {/* ── Background ──────────────────────────────────────────── */}
      <img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* ── Linha principal ─────────────────────────────────────── */}
      {/*
       * ≤1279px: flex-col (texto em cima, imagem+cards abaixo)
       * ≥1280px: flex-row flex-wrap (texto esq | imagem+cards dir), alinhados ao bottom
       */}
      <div className="relative flex flex-col gap-[40px] items-center max-w-[1400px] w-full shrink-0
        xl:flex-row xl:flex-wrap xl:items-end xl:justify-center">

        {/* ── Coluna de texto ─────────────────────────────────── */}
        {/*
         * ≤1279px: centrado, largura total
         * ≥1280px: flex-[1_0_0] max-w-[490px], alinhamento esquerdo, pb-[40px] pt-[20px]
         */}
        <div className="flex flex-col gap-[20px] items-center w-full
          xl:flex-[1_0_0] xl:items-start xl:justify-center xl:self-center xl:max-w-[490px] xl:min-w-[280px] xl:pb-[40px] xl:pt-[20px]">

          {/* Label */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[290px] px-[12px] py-[8px] rounded-full shrink-0">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              {t.label}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] text-center w-full xl:text-left">
            {t.h1Line1}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(107deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              {t.h1Brand}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0569ff] text-center w-full xl:text-left">
            {t.subtitle}
          </p>

          {/* Descrição */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center w-full xl:text-left">
            {t.description}
          </p>

          {/* Botões */}
          {/*
           * ≤1279px: justify-center (botões centrados)
           * ≥1280px: justify-start (botões à esquerda)
           */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center w-full xl:justify-start">
            <button
              onClick={openChat}
              className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#0569ff] transition-colors
              flex gap-[10px] items-center justify-center
              min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center leading-normal">
                {t.btnChat}
              </span>
              <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
            </button>

            <a href="/contato" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors
              flex gap-[10px] items-center justify-center
              min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white transition-colors flex-1 text-center leading-normal">
                {t.btnSpecialist}
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ── Imagem + Cards ──────────────────────────────────── */}
        {/*
         * ≤620px:    flex-col gap-[20px] items-center
         *            → cards (order-1) acima, imagem (order-2) abaixo full-width
         * 621-767px: flex-col items-end gap-0
         *            → cards (order-1) c/ mb-[-240px], imagem (order-2) 460×390 alinhada dir
         * ≥768px:    flex-row items-end justify-center
         *            → imagem (order-1) 471×400 esq c/ mr-[-40px], cards (order-2) dir
         * ≥1280px:   flex-row flex-[1_0_0] items-end max-w-[880px]
         *            → imagem flex-[1_0_0] c/ mr-[-50px], cards col 270px self-stretch
         */}
        <div className="flex flex-col gap-[20px] items-center justify-end w-full shrink-0 min-w-[280px]
          min-[621px]:items-end min-[621px]:gap-0
          md:flex-row md:items-end md:justify-center md:gap-0
          xl:flex-[1_0_0] xl:max-w-[880px] xl:min-w-[280px]">

          {/* ── Imagem ─────────────────────────────────────────── */}
          {/*
           * Container relativo com dimensões exatas do Figma:
           * ≤620px:    order-2, w-full, aspect-[4096/3477] (preenchimento natural)
           * 621-767px: order-2, 460×390 fixo (aspect é sobrescrito pelo h explícito)
           * ≥768px:    order-1, 471×400 fixo, mr-[-40px] sobreposição
           * ≥1280px:   order-1, flex-[1_0_0], h/w-auto volta ao aspect-ratio, mr-[-50px]
           * Imagem preenche container com absolute inset-0 object-cover (sem corte)
           */}
          <div className="relative order-2 w-full aspect-[4096/3477] shrink-0
            min-[621px]:w-[460px] min-[621px]:h-[390px] min-[621px]:max-w-[460px] min-[621px]:shrink-0
            md:order-1 md:w-[471px] md:h-[400px] md:max-w-[471px] md:shrink-0 md:mr-[-40px]
            xl:order-1 xl:flex-[1_0_0] xl:min-w-px xl:w-auto xl:h-auto xl:max-w-none xl:mr-[-50px]">
            <img
              src={imgMainImage}
              alt={t.imgAlt}
              className="absolute inset-0 size-full max-w-none object-cover pointer-events-none select-none"
            />
          </div>

          {/* ── Cards (self-stretch wrapper, ativo ≥768px) ─────── */}
          {/*
           * ≤767px: simples container block
           * ≥768px: flex flex-[1_0_0] items-end self-stretch (iguala altura da imagem)
           */}
          <div className="order-1 w-full
            md:order-2 md:relative md:z-[1] md:flex md:flex-[1_0_0] md:flex-row md:items-end md:self-stretch md:min-w-px
            xl:z-10 xl:max-w-[270px]">

            {/* ── Cards (inner) ───────────────────────────────── */}
            {/*
             * ≤620px:    flex-col gap-[20px] w-full
             * 621-767px: + mb-[-240px] (sobreposição com imagem)
             * ≥768px:    flex-wrap h-full items-center justify-end pb-[20px] mb-0 (grade 2×2)
             * ≥1280px:   flex-col flex-nowrap items-end justify-center max-w-[270px] pb-[20px]
             */}
            <div className="flex flex-col gap-[20px] w-full
              min-[621px]:mb-[-240px]
              md:flex-[1_0_0] md:flex-row md:flex-wrap md:content-center md:h-full md:items-center md:justify-end md:pb-[20px] md:mb-0 md:min-w-px
              xl:flex-col xl:flex-nowrap xl:items-end xl:justify-center xl:max-w-[270px] xl:min-w-px xl:pb-[14px] xl:gap-[14px]">

              {floatingCardsMeta.map((meta, i) => {
                const card = t.floatingCards[i];
                return (
                  <div
                    key={card.title}
                    className="bg-gradient-to-r from-white to-[rgba(255,255,255,0.7)]
                      flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center
                      p-[20px] rounded-[16px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]
                      w-full min-w-[150px]
                      md:min-h-[90px] md:min-w-[280px] md:w-auto
                      xl:w-full xl:min-w-[160px] xl:min-h-0 xl:p-[14px] xl:gap-[12px]">
                    <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                      <FigmaIcon src={meta.icon} size={30} aspectW={meta.aspectW} aspectH={meta.aspectH} />
                    </div>
                    <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                        {card.title}
                      </p>
                      {card.desc && (
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#1f2e91] w-full">
                          {card.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── Acesso Rápido ───────────────────────────────────────── */}
      {/* Sem gap acima: section usa justify-center (sem justify-between) */}
      <div className="relative bg-white flex flex-col gap-[20px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full shrink-0">

        {/* Título */}
        <div className="flex flex-col items-start w-full shrink-0">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
            {t.quickTitle1}{" "}
            <span className="text-[#0569ff]">{t.quickTitle2}</span>
          </p>
        </div>

        {/* Grid de itens — links espelhados de AcessoRapidoBK */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full shrink-0
          xl:items-stretch">
          {quickItems.map((item, i) => {
            const tItem = t.quickItems[i];
            const inner = (
              <>
                <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                  <FigmaIcon src={item.icon} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
                </div>
                <div className="flex flex-col gap-[10px] items-start text-center w-full flex-1">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                    {tItem.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                    {tItem.desc}
                  </p>
                </div>
                {!item.noPage && (
                  <FigmaIcon src={imgArrowAccent} size={12} aspectW={11.2} aspectH={8.84} />
                )}
              </>
            );

            if (item.noPage) {
              return (
                <div
                  key={item.href}
                  className="bg-[#f6f9fe] opacity-60 cursor-default
                    flex flex-[1_0_0] flex-col gap-[20px] items-center
                    min-w-[180px] p-[20px] rounded-[16px]">
                  {inner}
                </div>
              );
            }
            if (item.sectionId) {
              return (
                <button
                  key={item.href}
                  onClick={() => setOpenSection(item.sectionId!)}
                  className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors
                    flex flex-[1_0_0] flex-col gap-[20px] items-center
                    min-w-[180px] p-[20px] rounded-[16px] cursor-pointer text-left">
                  {inner}
                </button>
              );
            }
            return (
              <a
                key={item.href}
                href={item.href}
                className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors
                  flex flex-[1_0_0] flex-col gap-[20px] items-center
                  min-w-[180px] p-[20px] rounded-[16px] cursor-pointer no-underline">
                {inner}
              </a>
            );
          })}
        </div>

      </div>

      <BKSectionPopup sectionId={openSection} onClose={() => setOpenSection(null)} />

    </section>
  );
}
