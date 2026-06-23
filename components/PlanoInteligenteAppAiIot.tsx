"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgFrame35 = "/figma-assets/frame-35.webp";
const imgFrame36 = "/figma-assets/frame-36-b.webp";
const imgFrame37 = "/figma-assets/frame-37.webp";
const imgFrame38 = "/figma-assets/frame-38.webp";
const imgFrame39 = "/figma-assets/frame-39.webp";

const stepImgs = [imgFrame35, imgFrame36, imgFrame37, imgFrame38, imgFrame39];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  steps: { label: string; sub: string }[];
}> = {
  pt: {
    heading1: "Plano Inteligente de ",
    heading2: "assinatura",
    subtitle: "Uma jornada completa do equipamento até a experiência digital mais avançada.",
    steps: [
      { label: "Purificador Neo",    sub: "Adquira seu purificador" },
      { label: "App Acquafy",        sub: "Baixe e conecte" },
      { label: "AI & Recursos",      sub: "Inteligência ativada" },
      { label: "Plataforma Acquafy", sub: "Gestão integrada" },
      { label: "Acquafy X",          sub: "Experiência completa" },
    ],
  },
  en: {
    heading1: "Smart ",
    heading2: "Subscription Plan",
    subtitle: "A complete journey from the equipment to the most advanced digital experience.",
    steps: [
      { label: "Neo Purifier",       sub: "Get your purifier" },
      { label: "Acquafy App",        sub: "Download and connect" },
      { label: "AI & Features",      sub: "Intelligence activated" },
      { label: "Acquafy Platform",   sub: "Integrated management" },
      { label: "Acquafy X",          sub: "Complete experience" },
    ],
  },
  "en-gb": {
    heading1: "Smart ",
    heading2: "Subscription Plan",
    subtitle: "A complete journey from the equipment to the most advanced digital experience.",
    steps: [
      { label: "Neo Purifier",       sub: "Get your purifier" },
      { label: "Acquafy App",        sub: "Download and connect" },
      { label: "AI & Features",      sub: "Intelligence activated" },
      { label: "Acquafy Platform",   sub: "Integrated management" },
      { label: "Acquafy X",          sub: "Complete experience" },
    ],
  },
  es: {
    heading1: "Plan Inteligente de ",
    heading2: "suscripción",
    subtitle: "Un recorrido completo desde el equipo hasta la experiencia digital más avanzada.",
    steps: [
      { label: "Purificador Neo",    sub: "Adquiere tu purificador" },
      { label: "App Acquafy",        sub: "Descarga y conecta" },
      { label: "AI & Recursos",      sub: "Inteligencia activada" },
      { label: "Plataforma Acquafy", sub: "Gestión integrada" },
      { label: "Acquafy X",          sub: "Experiencia completa" },
    ],
  },
  fr: {
    heading1: "Plan d'abonnement ",
    heading2: "intelligent",
    subtitle: "Un parcours complet depuis l'équipement jusqu'à l'expérience numérique la plus avancée.",
    steps: [
      { label: "Purificateur Neo",    sub: "Obtenez votre purificateur" },
      { label: "App Acquafy",         sub: "Téléchargez et connectez" },
      { label: "AI & Fonctionnalités", sub: "Intelligence activée" },
      { label: "Plateforme Acquafy",  sub: "Gestion intégrée" },
      { label: "Acquafy X",           sub: "Expérience complète" },
    ],
  },
  de: {
    heading1: "Intelligenter ",
    heading2: "Abonnementplan",
    subtitle: "Eine vollständige Reise vom Gerät bis hin zum modernsten digitalen Erlebnis.",
    steps: [
      { label: "Neo Reiniger",         sub: "Holen Sie sich Ihren Reiniger" },
      { label: "App Acquafy",          sub: "Herunterladen und verbinden" },
      { label: "AI & Funktionen",      sub: "Intelligenz aktiviert" },
      { label: "Acquafy-Plattform",    sub: "Integriertes Management" },
      { label: "Acquafy X",            sub: "Vollständiges Erlebnis" },
    ],
  },
  it: {
    heading1: "Piano di abbonamento ",
    heading2: "intelligente",
    subtitle: "Un percorso completo dall'attrezzatura all'esperienza digitale più avanzata.",
    steps: [
      { label: "Purificatore Neo",    sub: "Acquista il tuo purificatore" },
      { label: "App Acquafy",         sub: "Scarica e connetti" },
      { label: "AI & Funzionalità",   sub: "Intelligenza attivata" },
      { label: "Piattaforma Acquafy", sub: "Gestione integrata" },
      { label: "Acquafy X",           sub: "Esperienza completa" },
    ],
  },
  zh: {
    heading1: "智能",
    heading2: "订阅计划",
    subtitle: "从设备到最先进数字体验的完整旅程。",
    steps: [
      { label: "Neo 净水器",         sub: "获取您的净水器" },
      { label: "App Acquafy",        sub: "下载并连接" },
      { label: "AI & 功能",          sub: "智能已激活" },
      { label: "Acquafy 平台",       sub: "集成管理" },
      { label: "Acquafy X",          sub: "完整体验" },
    ],
  },
  ja: {
    heading1: "スマート",
    heading2: "サブスクリプションプラン",
    subtitle: "機器から最先端のデジタル体験までの完全なジャーニー。",
    steps: [
      { label: "Neo 浄水器",         sub: "浄水器を手に入れる" },
      { label: "App Acquafy",        sub: "ダウンロードして接続" },
      { label: "AI & 機能",          sub: "インテリジェンス有効化" },
      { label: "Acquafy プラットフォーム", sub: "統合管理" },
      { label: "Acquafy X",          sub: "完全な体験" },
    ],
  },
  ko: {
    heading1: "스마트 ",
    heading2: "구독 플랜",
    subtitle: "장비에서 가장 진보된 디지털 경험까지의 완전한 여정.",
    steps: [
      { label: "Neo 정수기",         sub: "정수기 구매하기" },
      { label: "App Acquafy",        sub: "다운로드 및 연결" },
      { label: "AI & 기능",          sub: "인텔리전스 활성화" },
      { label: "Acquafy 플랫폼",     sub: "통합 관리" },
      { label: "Acquafy X",          sub: "완전한 경험" },
    ],
  },
  sv: {
    heading1: "Smart ",
    heading2: "prenumerationsplan",
    subtitle: "En komplett resa från utrustningen till den mest avancerade digitala upplevelsen.",
    steps: [
      { label: "Neo Reningsverk",     sub: "Skaffa din reningsverk" },
      { label: "App Acquafy",         sub: "Ladda ner och anslut" },
      { label: "AI & Funktioner",     sub: "Intelligens aktiverad" },
      { label: "Acquafy Plattform",   sub: "Integrerad hantering" },
      { label: "Acquafy X",           sub: "Komplett upplevelse" },
    ],
  },
  fi: {
    heading1: "Älykäs ",
    heading2: "tilaussuunnitelma",
    subtitle: "Täydellinen matka laitteistosta kehittyneimpään digitaaliseen kokemukseen.",
    steps: [
      { label: "Neo Puhdistin",       sub: "Hanki puhdistimesi" },
      { label: "App Acquafy",         sub: "Lataa ja yhdistä" },
      { label: "AI & Ominaisuudet",   sub: "Tekoäly aktivoitu" },
      { label: "Acquafy Alusta",      sub: "Integroitu hallinta" },
      { label: "Acquafy X",           sub: "Täydellinen kokemus" },
    ],
  },
  ru: {
    heading1: "Умный ",
    heading2: "план подписки",
    subtitle: "Полный путь от оборудования до самого передового цифрового опыта.",
    steps: [
      { label: "Neo Очиститель",      sub: "Приобретите очиститель" },
      { label: "App Acquafy",         sub: "Скачайте и подключите" },
      { label: "AI & Функции",        sub: "Интеллект активирован" },
      { label: "Платформа Acquafy",   sub: "Интегрированное управление" },
      { label: "Acquafy X",           sub: "Полный опыт" },
    ],
  },
  ro: {
    heading1: "Plan inteligent de ",
    heading2: "abonament",
    subtitle: "O calatorie completa de la echipament la cea mai avansata experienta digitala.",
    steps: [
      { label: "Purificator Neo",     sub: "Achizitioneaza purificatorul" },
      { label: "App Acquafy",         sub: "Descarca si conecteaza" },
      { label: "AI & Functii",        sub: "Inteligenta activata" },
      { label: "Platforma Acquafy",   sub: "Management integrat" },
      { label: "Acquafy X",           sub: "Experienta completa" },
    ],
  },
  he: {
    heading1: "תוכנית מנוי ",
    heading2: "חכמה",
    subtitle: "מסע מלא מהציוד עד לחוויה הדיגיטלית המתקדמת ביותר.",
    steps: [
      { label: "מטהר Neo",            sub: "רכוש את המטהר שלך" },
      { label: "App Acquafy",         sub: "הורד וחבר" },
      { label: "AI & תכונות",         sub: "בינה מלאכותית מופעלת" },
      { label: "פלטפורמת Acquafy",    sub: "ניהול משולב" },
      { label: "Acquafy X",           sub: "חוויה מלאה" },
    ],
  },
  "pt-pt": {
    heading1: "Plano Inteligente de ",
    heading2: "subscrição",
    subtitle: "Uma jornada completa do equipamento até à experiência digital mais avançada.",
    steps: [
      { label: "Purificador Neo",    sub: "Adquira o seu purificador" },
      { label: "App Acquafy",        sub: "Transfira e conecte" },
      { label: "AI & Recursos",      sub: "Inteligência ativada" },
      { label: "Plataforma Acquafy", sub: "Gestão integrada" },
      { label: "Acquafy X",          sub: "Experiência completa" },
    ],
  },
};

export default function PlanoInteligenteAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const steps = t.steps.map((s, i) => ({ ...s, img: stepImgs[i] }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Title */}
        <div className="flex flex-col gap-[10px] items-center w-full">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#333] text-center w-full">
            {t.heading1}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              {t.heading2}
            </span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center max-w-[660px]">
            {t.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap gap-[10px] items-start justify-center w-full">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-wrap items-center gap-[10px]">
              <div className="flex flex-[1_0_0] flex-col gap-[12px] items-center min-w-[120px] max-w-[180px]">
                {/* Step number badge */}
                <div className="relative">
                  <div className="flex items-center justify-center w-full h-[80px]">
                    <img
                      src={step.img}
                      alt={step.label}
                      className="max-h-[80px] max-w-[80px] object-contain"
                    />
                  </div>
                  <div
                    className="absolute -top-[8px] -right-[8px] flex items-center justify-center size-[22px] rounded-full text-white font-['Avenir_LT_Pro:85_Heavy'] text-[11px]"
                    style={{ backgroundColor: "#0233c3" }}
                  >
                    {i + 1}
                  </div>
                </div>

                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center w-full">
                  {step.label}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[16px] text-[#333] text-center w-full">
                  {step.sub}
                </p>
              </div>

              {/* Connector dot between steps */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex gap-[4px] items-center shrink-0">
                  {[0, 1, 2].map((d) => (
                    <div
                      key={d}
                      className="size-[4px] rounded-full bg-[#0233c3] opacity-40"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
