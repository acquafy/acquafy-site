"use client";

import Link from "next/link";
import { BtnAzulOutArrow, BtnAzulBaseArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg = "/figma-assets/cta-banner-bg.webp";

const T: Record<Lang, { heading: string; sub: string; btnPresentation: string; btnPartner: string }> = {
  pt: {
    heading: "Pronto pra crescer com a Acquafy?",
    sub: "Junte-se ao ecossistema de gestão inteligente de água que mais cresce no mundo.",
    btnPresentation: "Solicitar apresentação",
    btnPartner: "Quero ser parceiro",
  },
  "pt-pt": {
    heading: "Pronto para crescer com a Acquafy?",
    sub: "Junte-se ao ecossistema de gestão inteligente de água que mais cresce no mundo.",
    btnPresentation: "Solicitar apresentação",
    btnPartner: "Quero ser parceiro",
  },
  en: {
    heading: "Ready to grow with Acquafy?",
    sub: "Join the fastest-growing smart water management ecosystem in the world.",
    btnPresentation: "Request a presentation",
    btnPartner: "I want to be a partner",
  },
  es: {
    heading: "¿Listo para crecer con Acquafy?",
    sub: "Únete al ecosistema de gestión inteligente del agua que más crece en el mundo.",
    btnPresentation: "Solicitar presentación",
    btnPartner: "Quiero ser socio",
  },
  fr: {
    heading: "Prêt à grandir avec Acquafy ?",
    sub: "Rejoignez l'écosystème de gestion intelligente de l'eau qui connaît la plus forte croissance dans le monde.",
    btnPresentation: "Demander une présentation",
    btnPartner: "Je veux devenir partenaire",
  },
  de: {
    heading: "Bereit, mit Acquafy zu wachsen?",
    sub: "Treten Sie dem am schnellsten wachsenden intelligenten Wassermanagement-Ökosystem der Welt bei.",
    btnPresentation: "Präsentation anfordern",
    btnPartner: "Ich möchte Partner werden",
  },
  it: {
    heading: "Pronto a crescere con Acquafy?",
    sub: "Unisciti all'ecosistema di gestione intelligente dell'acqua in più rapida crescita al mondo.",
    btnPresentation: "Richiedi una presentazione",
    btnPartner: "Voglio diventare partner",
  },
  zh: {
    heading: "准备好与 Acquafy 共同成长了吗？",
    sub: "加入全球增长最快的智慧水务管理生态系统。",
    btnPresentation: "申请演示",
    btnPartner: "我想成为合作伙伴",
  },
  ja: {
    heading: "Acquafy と共に成長する準備はできていますか？",
    sub: "世界で最も急成長しているスマート水管理エコシステムに参加しましょう。",
    btnPresentation: "プレゼンをリクエスト",
    btnPartner: "パートナーになりたい",
  },
  ko: {
    heading: "Acquafy와 함께 성장할 준비가 되셨나요?",
    sub: "세계에서 가장 빠르게 성장하는 스마트 수관리 에코시스템에 참여하세요.",
    btnPresentation: "프레젠테이션 요청",
    btnPartner: "파트너가 되고 싶습니다",
  },
};

export default function CtaBannerParceria() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col lg:flex-row gap-[20px] items-center justify-center max-w-[1400px] overflow-clip px-[20px] xl:px-[80px] py-[40px] relative rounded-[16px] w-full">

        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full"
          src={imgBg}
        />

        {/* texto esquerdo */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <div className="font-['Avenir_LT_Pro:95_Black'] text-[0px] text-white w-full text-center xl:text-left">
            <p className="text-[32px] leading-[39px]">
              {t.heading}
            </p>
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px]">
              {t.sub}
            </p>
          </div>
        </div>

        {/* botões direita */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center xl:justify-end max-w-[500px] min-w-[240px]">
          <Link href="/contato" className="flex-1 min-w-[200px]">
            <BtnAzulOutArrow className="w-full min-h-[56px]">
              {t.btnPresentation}
            </BtnAzulOutArrow>
          </Link>
          <Link href="#modelos-parceria" className="flex-1 min-w-[200px]">
            <BtnAzulBaseArrow className="w-full min-h-[56px]">
              {t.btnPartner}
            </BtnAzulBaseArrow>
          </Link>
        </div>

      </div>
    </section>
  );
}
