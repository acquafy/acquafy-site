"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgMonitor   = "/figma-assets/icon-monitor.svg";
const imgFiltros   = "/figma-assets/icon-filtros-b.svg";
const img365       = "/figma-assets/icon-365.svg";
const imgWater     = "/figma-assets/icon-water-b.svg";
const imgNotif     = "/figma-assets/icon-notif.svg";
const imgGear      = "/figma-assets/icon-gear.svg";
const imgBrain     = "/figma-assets/icon-brain-b.svg";
const imgMobile    = "/figma-assets/icon-mobile-c.svg";

const itemIcons = [
  { icon: imgMonitor, iconW: 30, iconH: 30 },
  { icon: imgFiltros, iconW: 40, iconH: 40 },
  { icon: img365,     iconW: 30, iconH: 30 },
  { icon: imgWater,   iconW: 40, iconH: 40 },
  { icon: imgNotif,   iconW: 23, iconH: 30 },
  { icon: imgGear,    iconW: 30, iconH: 30 },
  { icon: imgBrain,   iconW: 30, iconH: 30 },
  { icon: imgMobile,  iconW: 21, iconH: 30 },
];

const T: Record<Lang, { labels: string[] }> = {
  pt: {
    labels: [
      "Monitoramento em tempo real",
      "Status dos filtros",
      "Contagem regressiva 365 dias",
      "Qualidade da água",
      "Alertas automáticos",
      "Manutenção preventiva",
      "Acquafy AI Insights",
      "App para dispositivos Neo e Acquafy Media",
    ],
  },
  en: {
    labels: [
      "Real-time monitoring",
      "Filter status",
      "365-day countdown",
      "Water quality",
      "Automatic alerts",
      "Preventive maintenance",
      "Acquafy AI Insights",
      "App for Neo and Acquafy Media devices",
    ],
  },
  es: {
    labels: [
      "Monitoreo en tiempo real",
      "Estado de los filtros",
      "Cuenta regresiva 365 días",
      "Calidad del agua",
      "Alertas automáticas",
      "Mantenimiento preventivo",
      "Acquafy AI Insights",
      "App para dispositivos Neo y Acquafy Media",
    ],
  },
  fr: {
    labels: [
      "Surveillance en temps réel",
      "État des filtres",
      "Compte à rebours 365 jours",
      "Qualité de l'eau",
      "Alertes automatiques",
      "Maintenance préventive",
      "Acquafy AI Insights",
      "App pour les appareils Neo et Acquafy Media",
    ],
  },
  de: {
    labels: [
      "Echtzeit-Überwachung",
      "Filterstatus",
      "365-Tage-Countdown",
      "Wasserqualität",
      "Automatische Alarme",
      "Vorbeugende Wartung",
      "Acquafy AI Insights",
      "App für Neo- und Acquafy Media-Geräte",
    ],
  },
  it: {
    labels: [
      "Monitoraggio in tempo reale",
      "Stato dei filtri",
      "Conto alla rovescia 365 giorni",
      "Qualità dell'acqua",
      "Avvisi automatici",
      "Manutenzione preventiva",
      "Acquafy AI Insights",
      "App per dispositivi Neo e Acquafy Media",
    ],
  },
  zh: {
    labels: [
      "实时监控",
      "滤芯状态",
      "365 天倒计时",
      "水质检测",
      "自动提醒",
      "预防性维护",
      "Acquafy AI Insights",
      "适用于 Neo 和 Acquafy Media 设备的 App",
    ],
  },
  ja: {
    labels: [
      "リアルタイム監視",
      "フィルター状態",
      "365日カウントダウン",
      "水質管理",
      "自動アラート",
      "予防保全",
      "Acquafy AI Insights",
      "Neo および Acquafy Media デバイス対応 App",
    ],
  },
  ko: {
    labels: [
      "실시간 모니터링",
      "필터 상태",
      "365일 카운트다운",
      "수질 관리",
      "자동 알림",
      "예방 유지보수",
      "Acquafy AI Insights",
      "Neo 및 Acquafy Media 기기용 App",
    ],
  },
  "pt-pt": {
    labels: [
      "Monitorização em tempo real",
      "Estado dos filtros",
      "Contagem decrescente de 365 dias",
      "Qualidade da água",
      "Alertas automáticos",
      "Manutenção preventiva",
      "Acquafy AI Insights",
      "App para dispositivos Neo e Acquafy Media",
    ],
  },
};

export default function PlatformAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const items = itemIcons.map((ico, i) => ({ ...ico, label: t.labels[i] }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[40px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#2a2a2b]">App + </span>
          <span className="text-[#6e54ef]">AI</span>
          <span className="text-[#2a2a2b]"> + </span>
          <span className="text-[#0569ff]">IoT</span>
        </h2>

        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {items.map((item) => (
            <div key={item.label} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[135px] min-w-[140px] p-[20px] rounded-[12px]">
              <div className="flex items-center justify-center shrink-0 size-[30px]">
                <FigmaIcon src={item.icon} size={30} aspectW={item.iconW} aspectH={item.iconH} />
              </div>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center min-h-[45px] w-full flex items-center justify-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
