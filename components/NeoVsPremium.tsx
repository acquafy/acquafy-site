"use client";
import FigmaIcon from "./FigmaIcon";
import { PRODUCT_IMAGES } from "@/lib/products";
import { useLang, type Lang } from "@/context/LanguageContext";

// Card background images
const imgBgEssentials = "/figma-assets/bg-essentials.webp";
const imgBgPremium    = "/figma-assets/bg-premium.webp";

// Checkin icons
const imgCheckinBlue   = "/figma-assets/icon-check-blue-essentials.svg"; // blue (essentials)
const imgCheckinPurple = "/figma-assets/icon-check-purple-premium.svg"; // purple (premium)

// Product images — catalog via fonte única (lib/products.ts)
const imgNeoFit          = PRODUCT_IMAGES["neo-fit"];
const imgInfinitySparkH2 = PRODUCT_IMAGES["neo-infinity-spark-h2"];

const T: Record<Lang, {
  essentialsFeatures: string[];
  premiumFeatures: string[];
}> = {
  pt: {
    essentialsFeatures: [
      "Painel LED Touch 10,1",
      "4 filtros de Alta Performance UF",
      "Opções de 1 até 7 funções",
      "Tanques: 400ml, 800ml. 1500ml e 3000ml",
      "Foco em praticidade e variedade para o dia a dia",
    ],
    premiumFeatures: [
      "Painel LCD IPS Touch 15.6",
      "Osmose Reversa (RO)",
      "Aço inox e design sofisticado",
      "Mini Media Network integrado",
      "Experiência premium completa",
    ],
  },
  en: {
    essentialsFeatures: [
      "10.1 LED Touch Panel",
      "4 High-Performance UF Filters",
      "Options from 1 to 7 functions",
      "Tanks: 400ml, 800ml, 1500ml and 3000ml",
      "Focus on practicality and variety for daily use",
    ],
    premiumFeatures: [
      "15.6 IPS LCD Touch Panel",
      "Reverse Osmosis (RO)",
      "Stainless steel and sophisticated design",
      "Integrated Mini Media Network",
      "Complete premium experience",
    ],
  },
  "en-gb": {
    essentialsFeatures: [
      "10.1 LED Touch Panel",
      "4 High-Performance UF Filters",
      "Options from 1 to 7 functions",
      "Tanks: 400ml, 800ml, 1500ml and 3000ml",
      "Focus on practicality and variety for daily use",
    ],
    premiumFeatures: [
      "15.6 IPS LCD Touch Panel",
      "Reverse Osmosis (RO)",
      "Stainless steel and sophisticated design",
      "Integrated Mini Media Network",
      "Complete premium experience",
    ],
  },
  es: {
    essentialsFeatures: [
      "Panel LED Touch 10,1",
      "4 filtros de Alta Performance UF",
      "Opciones de 1 hasta 7 funciones",
      "Tanques: 400ml, 800ml, 1500ml y 3000ml",
      "Enfoque en practicidad y variedad para el día a día",
    ],
    premiumFeatures: [
      "Panel LCD IPS Touch 15.6",
      "Ósmosis Inversa (RO)",
      "Acero inoxidable y diseño sofisticado",
      "Mini Media Network integrado",
      "Experiencia premium completa",
    ],
  },
  fr: {
    essentialsFeatures: [
      "Panneau LED Touch 10,1",
      "4 filtres UF haute performance",
      "Options de 1 à 7 fonctions",
      "Réservoirs : 400ml, 800ml, 1500ml et 3000ml",
      "Axé sur la praticité et la variété au quotidien",
    ],
    premiumFeatures: [
      "Panneau LCD IPS Touch 15.6",
      "Osmose Inverse (RO)",
      "Acier inoxydable et design sophistiqué",
      "Mini Media Network intégré",
      "Expérience premium complète",
    ],
  },
  de: {
    essentialsFeatures: [
      "LED Touch-Panel 10,1",
      "4 Hochleistungs-UF-Filter",
      "Optionen von 1 bis 7 Funktionen",
      "Tanks: 400ml, 800ml, 1500ml und 3000ml",
      "Fokus auf Praktikabilität und Vielfalt im Alltag",
    ],
    premiumFeatures: [
      "LCD IPS Touch-Panel 15.6",
      "Umkehrosmose (RO)",
      "Edelstahl und anspruchsvolles Design",
      "Integriertes Mini Media Network",
      "Komplettes Premium-Erlebnis",
    ],
  },
  it: {
    essentialsFeatures: [
      "Pannello LED Touch 10,1",
      "4 filtri UF ad alta prestazione",
      "Opzioni da 1 a 7 funzioni",
      "Serbatoi: 400ml, 800ml, 1500ml e 3000ml",
      "Focalizzato su praticità e varietà per il quotidiano",
    ],
    premiumFeatures: [
      "Pannello LCD IPS Touch 15.6",
      "Osmosi Inversa (RO)",
      "Acciaio inossidabile e design sofisticato",
      "Mini Media Network integrato",
      "Esperienza premium completa",
    ],
  },
  zh: {
    essentialsFeatures: [
      "LED触控面板 10.1",
      "4个高性能UF滤芯",
      "1至7种功能可选",
      "水箱：400ml、800ml、1500ml和3000ml",
      "专注日常实用性与多样化",
    ],
    premiumFeatures: [
      "LCD IPS触控面板 15.6",
      "反渗透（RO）",
      "不锈钢与精致设计",
      "集成迷你媒体网络",
      "完整高端体验",
    ],
  },
  ja: {
    essentialsFeatures: [
      "LEDタッチパネル 10.1",
      "高性能UFフィルター×4",
      "1～7機能から選択可能",
      "タンク：400ml、800ml、1500ml、3000ml",
      "日常の使いやすさと多様性に特化",
    ],
    premiumFeatures: [
      "LCD IPSタッチパネル 15.6",
      "逆浸透（RO）",
      "ステンレス素材と洗練されたデザイン",
      "ミニメディアネットワーク内蔵",
      "完全なプレミアム体験",
    ],
  },
  ko: {
    essentialsFeatures: [
      "LED 터치 패널 10.1",
      "고성능 UF 필터 4개",
      "1~7가지 기능 선택 가능",
      "탱크: 400ml, 800ml, 1500ml 및 3000ml",
      "일상의 편리함과 다양성에 집중",
    ],
    premiumFeatures: [
      "LCD IPS 터치 패널 15.6",
      "역삼투 (RO)",
      "스테인리스 스틸과 정교한 디자인",
      "미니 미디어 네트워크 통합",
      "완전한 프리미엄 경험",
    ],
  },
  sv: {
    essentialsFeatures: [
      "LED Touch-panel 10,1",
      "4 högpresterande UF-filter",
      "Alternativ från 1 till 7 funktioner",
      "Tankar: 400ml, 800ml, 1500ml och 3000ml",
      "Fokus på praktisk och varierad daglig användning",
    ],
    premiumFeatures: [
      "LCD IPS Touch-panel 15.6",
      "Omvänd osmos (RO)",
      "Rostfritt stål och sofistikerad design",
      "Integrerat Mini Media Network",
      "Komplett premiumupplevelse",
    ],
  },
  fi: {
    essentialsFeatures: [
      "LED-kosketusnäyttö 10,1",
      "4 tehokas UF-suodatin",
      "Vaihtoehdot 1–7 toimintoa",
      "Säiliöt: 400ml, 800ml, 1500ml ja 3000ml",
      "Käytännöllisyys ja monipuolisuus päivittäiseen käyttöön",
    ],
    premiumFeatures: [
      "LCD IPS -kosketusnäyttö 15.6",
      "Käänteisosmosis (RO)",
      "Ruostumaton teräs ja hienostunut muotoilu",
      "Integroitu Mini Media Network",
      "Täydellinen premium-kokemus",
    ],
  },
  ru: {
    essentialsFeatures: [
      "LED сенсорная панель 10,1",
      "4 высокопроизводительных UF-фильтра",
      "Варианты от 1 до 7 функций",
      "Баки: 400мл, 800мл, 1500мл и 3000мл",
      "Акцент на практичность и разнообразие для ежедневного использования",
    ],
    premiumFeatures: [
      "LCD IPS сенсорная панель 15.6",
      "Обратный осмос (RO)",
      "Нержавеющая сталь и изысканный дизайн",
      "Встроенная Mini Media Network",
      "Полноценный премиальный опыт",
    ],
  },
  ro: {
    essentialsFeatures: [
      "Panou LED Touch 10,1",
      "4 filtre UF de inalta performanta",
      "Optiuni de la 1 la 7 functii",
      "Rezervoare: 400ml, 800ml, 1500ml si 3000ml",
      "Accent pe practicitate si varietate pentru uz zilnic",
    ],
    premiumFeatures: [
      "Panou LCD IPS Touch 15.6",
      "Osmoza inversa (RO)",
      "Otel inoxidabil si design sofisticat",
      "Mini Media Network integrat",
      "Experienta premium completa",
    ],
  },
  he: {
    essentialsFeatures: [
      "לוח LED מגע 10.1",
      "4 מסנני UF בעלי ביצועים גבוהים",
      "אפשרויות מ-1 עד 7 פונקציות",
      "מיכלים: 400 מ\"ל, 800 מ\"ל, 1500 מ\"ל ו-3000 מ\"ל",
      "דגש על נוחות ומגוון לשימוש יומיומי",
    ],
    premiumFeatures: [
      "לוח LCD IPS מגע 15.6",
      "אוסמוזה הפוכה (RO)",
      "נירוסטה ועיצוב מתוחכם",
      "Mini Media Network משולב",
      "חוויית פרימיום מלאה",
    ],
  },
  "pt-pt": {
    essentialsFeatures: [
      "Painel LED Touch 10,1",
      "4 filtros de Alta Performance UF",
      "Opções de 1 até 7 funções",
      "Reservatórios: 400ml, 800ml, 1500ml e 3000ml",
      "Foco em praticidade e variedade para o dia a dia",
    ],
    premiumFeatures: [
      "Painel LCD IPS Touch 15.6",
      "Osmose Inversa (RO)",
      "Aço inox e design sofisticado",
      "Mini Media Network integrado",
      "Experiência premium completa",
    ],
  },
};

function CheckItem({ label, iconSrc }: { label: string; iconSrc: string }) {
  return (
    <div className="flex gap-[10px] items-center min-w-[170px] w-full">
      <FigmaIcon src={iconSrc} size={16} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-1 min-w-0">
        {label}
      </p>
    </div>
  );
}

export default function NeoVsPremium() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Title */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#0569ff]">Neo Essentials</span>
          {" vs "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            Neo Premium
          </span>
        </h2>

        {/* Cards row */}
        <div className="flex flex-wrap gap-[40px] items-center w-full">

          {/* Essentials card */}
          <div className="border border-[#cbd0d4] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] overflow-hidden p-[40px] relative rounded-[16px]">
            <img
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
              src={imgBgEssentials}
            />
            <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[200px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff] w-full">
                Neo Essentials
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {t.essentialsFeatures.map((f) => (
                  <CheckItem key={f} label={f} iconSrc={imgCheckinBlue} />
                ))}
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-center justify-center h-[260px] max-w-[200px] min-w-[140px] relative">
              <img
                alt="Neo FIT"
                className="w-auto h-full max-h-full object-contain pointer-events-none"
                src={imgNeoFit}
              />
            </div>
          </div>

          {/* Premium card */}
          <div className="border border-[#cbd0d4] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] overflow-hidden p-[40px] relative rounded-[16px]">
            <img
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
              src={imgBgPremium}
            />
            <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[200px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#9f3df5] w-full">
                Neo Premium
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {t.premiumFeatures.map((f) => (
                  <CheckItem key={f} label={f} iconSrc={imgCheckinPurple} />
                ))}
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-center justify-center h-[260px] max-w-[200px] min-w-[140px] relative">
              <img
                alt="Neo INFINITY SPARK H2"
                className="w-auto h-full max-h-full object-contain pointer-events-none"
                src={imgInfinitySparkH2}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
