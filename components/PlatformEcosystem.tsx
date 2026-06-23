"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgProdNeo    = "/figma-assets/icon-prod-neo-b.svg";
const imgPhone      = "/figma-assets/icon-phone-b.svg";
const imgCloud      = "/figma-assets/icon-cloud-a.svg";
const imgAiInsights = "/figma-assets/icon-ai-insights.svg";
const imgQr         = "/figma-assets/icon-qr-c.svg";
const imgComissoes  = "/figma-assets/icon-comissoes-b.svg";
const imgArrowLine  = "/figma-assets/icon-arrow-line.svg";
const imgArrowHead  = "/figma-assets/icon-arrow-head.svg";

const stepIcons = [
  { icon: imgProdNeo,    iconW: 18,  iconH: 20  },
  { icon: imgPhone,      iconW: 98,  iconH: 179 },
  { icon: imgCloud,      iconW: 30,  iconH: 22  },
  { icon: imgAiInsights, iconW: 20,  iconH: 20  },
  { icon: imgQr,         iconW: 20,  iconH: 20  },
  { icon: imgComissoes,  iconW: 20,  iconH: 20  },
];

const T: Record<Lang, { heading: string; labels: string[] }> = {
  pt: {
    heading: "Como a plataforma conecta o ecossistema",
    labels: [
      "Produtos Neo / Acquafy Media",
      "App + IoT",
      "Plataforma Cloud",
      "AI Insights",
      "QR Codes + Vendas",
      "Comissões + Operação Global",
    ],
  },
  "pt-pt": {
    heading: "Como a plataforma conecta o ecossistema",
    labels: [
      "Produtos Neo / Acquafy Media",
      "App + IoT",
      "Plataforma Cloud",
      "AI Insights",
      "QR Codes + Vendas",
      "Comissões + Operação Global",
    ],
  },
  en: {
    heading: "How the platform connects the ecosystem",
    labels: [
      "Neo Products / Acquafy Media",
      "App + IoT",
      "Cloud Platform",
      "AI Insights",
      "QR Codes + Sales",
      "Commissions + Global Operation",
    ],
  },
  "en-gb": {
    heading: "How the platform connects the ecosystem",
    labels: [
      "Neo Products / Acquafy Media",
      "App + IoT",
      "Cloud Platform",
      "AI Insights",
      "QR Codes + Sales",
      "Commissions + Global Operation",
    ],
  },
  es: {
    heading: "Cómo la plataforma conecta el ecosistema",
    labels: [
      "Productos Neo / Acquafy Media",
      "App + IoT",
      "Plataforma Cloud",
      "AI Insights",
      "Códigos QR + Ventas",
      "Comisiones + Operación Global",
    ],
  },
  fr: {
    heading: "Comment la plateforme connecte l'écosystème",
    labels: [
      "Produits Neo / Acquafy Media",
      "App + IoT",
      "Cloud Platform",
      "AI Insights",
      "Codes QR + Ventes",
      "Commissions + Opération Mondiale",
    ],
  },
  de: {
    heading: "Wie die Plattform das Ökosystem verbindet",
    labels: [
      "Neo Produkte / Acquafy Media",
      "App + IoT",
      "Cloud Platform",
      "AI Insights",
      "QR-Codes + Verkauf",
      "Provisionen + Globaler Betrieb",
    ],
  },
  it: {
    heading: "Come la piattaforma connette l'ecosistema",
    labels: [
      "Prodotti Neo / Acquafy Media",
      "App + IoT",
      "Cloud Platform",
      "AI Insights",
      "Codici QR + Vendite",
      "Commissioni + Operazione Globale",
    ],
  },
  zh: {
    heading: "平台如何连接生态系统",
    labels: [
      "Neo 产品 / Acquafy Media",
      "App + IoT",
      "Cloud Platform",
      "AI Insights",
      "二维码 + 销售",
      "佣金 + 全球运营",
    ],
  },
  ja: {
    heading: "プラットフォームがエコシステムを繋ぐ仕組み",
    labels: [
      "Neo製品 / Acquafy Media",
      "App + IoT",
      "Cloud Platform",
      "AI Insights",
      "QRコード + 販売",
      "コミッション + グローバル運営",
    ],
  },
  ko: {
    heading: "플랫폼이 생태계를 연결하는 방법",
    labels: [
      "Neo 제품 / Acquafy Media",
      "App + IoT",
      "Cloud Platform",
      "AI Insights",
      "QR 코드 + 판매",
      "커미션 + 글로벌 운영",
    ],
  },
  sv: {
    heading: "Hur plattformen kopplar samman ekosystemet",
    labels: [
      "Neo-produkter / Acquafy Media",
      "App + IoT",
      "Molnplattform",
      "AI Insights",
      "QR-koder + Försäljning",
      "Provisioner + Global drift",
    ],
  },
  fi: {
    heading: "Miten alusta yhdistää ekosysteemin",
    labels: [
      "Neo-tuotteet / Acquafy Media",
      "App + IoT",
      "Pilvialusta",
      "AI Insights",
      "QR-koodit + Myynti",
      "Provisiot + Globaali toiminta",
    ],
  },
  ru: {
    heading: "Как платформа связывает экосистему",
    labels: [
      "Продукты Neo / Acquafy Media",
      "App + IoT",
      "Облачная платформа",
      "AI Insights",
      "QR-коды + Продажи",
      "Комиссии + Глобальная операция",
    ],
  },
  ro: {
    heading: "Cum platforma conectează ecosistemul",
    labels: [
      "Produse Neo / Acquafy Media",
      "App + IoT",
      "Platformă Cloud",
      "AI Insights",
      "Coduri QR + Vânzări",
      "Comisioane + Operațiune Globală",
    ],
  },
  he: {
    heading: "איך הפלטפורמה מחברת את המוסד",
    labels: [
      "מוצרי Neo / Acquafy Media",
      "App + IoT",
      "פלטפורמת ענן",
      "AI Insights",
      "קודי QR + מכירות",
      "עמלות + פעילות גלובלית",
    ],
  },
};

function ArrowConnector() {
  return (
    <div className="flex flex-[1_0_0] items-center max-w-[50px] min-h-[22px] min-w-px">
      <div className="flex-[1_0_0] h-[10px] min-w-px mr-[-8px] relative">
        <img alt="" className="absolute inset-0 max-w-none size-full" src={imgArrowLine} />
      </div>
      <div className="flex items-center self-stretch">
        <div className="relative shrink-0" style={{ aspectRatio: "38.65/73.3", height: "100%" }}>
          <img alt="" className="absolute inset-0 max-w-none size-full" src={imgArrowHead} />
        </div>
      </div>
    </div>
  );
}

export default function PlatformEcosystem() {
  const { lang } = useLang();
  const t = T[lang];

  const steps = stepIcons.map((ico, i) => ({ ...ico, label: t.labels[i] }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>

        <div className="flex flex-wrap gap-[10px] items-center justify-center w-full">
          {steps.map((step, i) => (
            <div key={step.label} className="contents">
              <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[135px] min-w-[200px] p-[20px] rounded-[16px]">
                <div className="bg-[#dae9ff] flex items-center justify-center p-[16px] rounded-full shrink-0 size-[64px]">
                  <FigmaIcon src={step.icon} size={32} aspectW={step.iconW} aspectH={step.iconH} />
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center min-h-[32px] w-full flex items-center justify-center">
                  {step.label}
                </p>
              </div>
              {i < steps.length - 1 && <ArrowConnector />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
