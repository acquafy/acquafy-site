"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgMobile  = "/figma-assets/icon-mobile-21px-c.svg"; // 21×30
const imgBrain   = "/figma-assets/icon-brain-30px-b.svg"; // 30×30
const imgWifi    = "/figma-assets/icon-wifi-30px-c.svg"; // 30×20
const imgWater   = "/figma-assets/icon-water-large-b.svg"; // 576×662
const imgShield  = "/figma-assets/icon-shield-26px-c.svg"; // 26×30
const imgPlanet  = "/figma-assets/icon-planet-30px-b.svg"; // 30×30

const itemIcons = [
  { icon: imgMobile, aW: 21,  aH: 30  },
  { icon: imgBrain,  aW: 30,  aH: 30  },
  { icon: imgWifi,   aW: 30,  aH: 20  },
  { icon: imgWater,  aW: 576, aH: 662 },
  { icon: imgShield, aW: 26,  aH: 30  },
  { icon: imgPlanet, aW: 30,  aH: 30  },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  items: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Porque escolher a ",
    heading2: "Linha Neo",
    items: [
      { title: "App Acquafy",         desc: "Controle total pelo app de onde quiser." },
      { title: "Acquafy AI",          desc: "Inteligência que aprende seus hábitos." },
      { title: "IoT Inteligente",     desc: "Conectividade e dados em tempo real." },
      { title: "Água Personalizada",  desc: "Temperaturas e funções para cada momento." },
      { title: "Alta Performance",    desc: "Tecnologia global e filtros de última geração." },
      { title: "Design Global",       desc: "Acabamento sofisticado e premiado." },
    ],
  },
  en: {
    heading1: "Why choose the ",
    heading2: "Neo Line",
    items: [
      { title: "App Acquafy",         desc: "Full control via the app from anywhere." },
      { title: "Acquafy AI",          desc: "Intelligence that learns your habits." },
      { title: "Smart IoT",           desc: "Connectivity and real-time data." },
      { title: "Personalized Water",  desc: "Temperatures and functions for every moment." },
      { title: "High Performance",    desc: "Global technology and next-generation filters." },
      { title: "Global Design",       desc: "Sophisticated and award-winning finish." },
    ],
  },
  es: {
    heading1: "Por qué elegir la ",
    heading2: "Línea Neo",
    items: [
      { title: "App Acquafy",         desc: "Control total desde la app donde quieras." },
      { title: "Acquafy AI",          desc: "Inteligencia que aprende tus hábitos." },
      { title: "IoT Inteligente",     desc: "Conectividad y datos en tiempo real." },
      { title: "Agua Personalizada",  desc: "Temperaturas y funciones para cada momento." },
      { title: "Alto Rendimiento",    desc: "Tecnología global y filtros de última generación." },
      { title: "Diseño Global",       desc: "Acabado sofisticado y premiado." },
    ],
  },
  fr: {
    heading1: "Pourquoi choisir la ",
    heading2: "Gamme Neo",
    items: [
      { title: "App Acquafy",          desc: "Contrôle total via l'application où que vous soyez." },
      { title: "Acquafy AI",           desc: "Intelligence qui apprend vos habitudes." },
      { title: "IoT Intelligent",      desc: "Connectivité et données en temps réel." },
      { title: "Eau Personnalisée",    desc: "Températures et fonctions pour chaque instant." },
      { title: "Haute Performance",    desc: "Technologie mondiale et filtres de dernière génération." },
      { title: "Design Global",        desc: "Finition sophistiquée et primée." },
    ],
  },
  de: {
    heading1: "Warum die ",
    heading2: "Neo-Linie wählen",
    items: [
      { title: "App Acquafy",          desc: "Vollständige Steuerung über die App von überall." },
      { title: "Acquafy AI",           desc: "Intelligenz, die Ihre Gewohnheiten erlernt." },
      { title: "Smartes IoT",          desc: "Konnektivität und Echtzeitdaten." },
      { title: "Personalisiertes Wasser", desc: "Temperaturen und Funktionen für jeden Moment." },
      { title: "Hochleistung",         desc: "Globale Technologie und Filter der neuesten Generation." },
      { title: "Globales Design",      desc: "Anspruchsvolle und preisgekrönte Verarbeitung." },
    ],
  },
  it: {
    heading1: "Perché scegliere la ",
    heading2: "Linea Neo",
    items: [
      { title: "App Acquafy",          desc: "Controllo totale tramite l'app da qualsiasi luogo." },
      { title: "Acquafy AI",           desc: "Intelligenza che impara le tue abitudini." },
      { title: "IoT Intelligente",     desc: "Connettività e dati in tempo reale." },
      { title: "Acqua Personalizzata", desc: "Temperature e funzioni per ogni momento." },
      { title: "Alta Prestazione",     desc: "Tecnologia globale e filtri di ultima generazione." },
      { title: "Design Globale",       desc: "Finitura sofisticata e premiata." },
    ],
  },
  zh: {
    heading1: "为什么选择",
    heading2: "Neo系列",
    items: [
      { title: "Acquafy App",   desc: "随时随地通过应用程序全面掌控。" },
      { title: "Acquafy AI",    desc: "学习您的习惯的智能人工智能。" },
      { title: "智能物联网",    desc: "实时连接与数据。" },
      { title: "个性化水质",    desc: "适合每个时刻的温度和功能。" },
      { title: "高性能",        desc: "全球技术与新一代滤芯。" },
      { title: "全球设计",      desc: "精致且荣获奖项的工艺。" },
    ],
  },
  ja: {
    heading1: "なぜ",
    heading2: "Neoラインを選ぶのか",
    items: [
      { title: "App Acquafy",      desc: "どこからでもアプリで完全コントロール。" },
      { title: "Acquafy AI",       desc: "あなたの習慣を学ぶ人工知能。" },
      { title: "スマートIoT",      desc: "リアルタイムの接続とデータ。" },
      { title: "パーソナライズ水", desc: "あらゆる場面に合わせた温度と機能。" },
      { title: "高性能",           desc: "グローバル技術と次世代フィルター。" },
      { title: "グローバルデザイン", desc: "洗練された受賞歴のある仕上がり。" },
    ],
  },
  ko: {
    heading1: "왜 ",
    heading2: "Neo 라인을 선택해야 할까요",
    items: [
      { title: "App Acquafy",      desc: "어디서나 앱으로 완전한 제어." },
      { title: "Acquafy AI",       desc: "당신의 습관을 배우는 인공지능." },
      { title: "스마트 IoT",       desc: "실시간 연결 및 데이터." },
      { title: "맞춤형 물",        desc: "모든 순간에 맞는 온도와 기능." },
      { title: "고성능",           desc: "글로벌 기술과 차세대 필터." },
      { title: "글로벌 디자인",    desc: "정교하고 수상 경력에 빛나는 마감." },
    ],
  },
  "pt-pt": {
    heading1: "Porque escolher a ",
    heading2: "Linha Neo",
    items: [
      { title: "App Acquafy",         desc: "Controlo total pela app a partir de qualquer lugar." },
      { title: "Acquafy AI",          desc: "Inteligência que aprende os seus hábitos." },
      { title: "IoT Inteligente",     desc: "Conectividade e dados em tempo real." },
      { title: "Água Personalizada",  desc: "Temperaturas e funções para cada momento." },
      { title: "Alta Performance",    desc: "Tecnologia global e filtros de última geração." },
      { title: "Design Global",       desc: "Acabamento sofisticado e premiado." },
    ],
  },
};

export default function PorqueNeo() {
  const { lang } = useLang();
  const t = T[lang];

  const items = itemIcons.map((ico, i) => ({ ...ico, ...t.items[i] }));

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col items-center justify-center max-w-[1400px] px-[20px] py-[40px] rounded-[16px] w-full">
        <div className="flex flex-col gap-[40px] items-start w-full">

          {/* Title */}
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
            <span className="text-[#1f2e91]">{t.heading1}</span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              {t.heading2}
            </span>
          </h2>

          {/* Cards grid */}
          <div className="bg-white flex flex-wrap gap-[20px] items-start justify-center overflow-hidden p-[20px] rounded-[12px] w-full">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[180px] rounded-[14px]"
              >
                {/* Circle icon */}
                <div className="border border-[#cbd0d4] flex flex-col items-center justify-center p-[14px] rounded-full shrink-0 size-[60px]">
                  <FigmaIcon src={item.icon} size={30} aspectW={item.aW} aspectH={item.aH} />
                </div>

                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center w-full min-h-[35px] flex items-center justify-center">
                  {item.title}
                </p>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333] text-center w-full">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
