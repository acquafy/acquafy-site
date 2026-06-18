"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  items: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Recursos",
    heading2: " em destaque",
    items: [
      { title: "Monitoramento global",              desc: "Visão completa de operações e dispositivos em qualquer lugar." },
      { title: "Manutenção preventiva",             desc: "Antecipe trocas e evite paradas inesperadas." },
      { title: "Contagem de 365 dias dos filtros",  desc: "Controle preciso de vida útil e desempenho dos filtros." },
      { title: "Controle via App",                  desc: "Funções e ajustes diretamente do seu smartphone." },
      { title: "Insights com IA",                   desc: "Decisões mais rápidas com dados e sugestões inteligentes." },
      { title: "Operação em 16 idiomas",            desc: "Histórico e acompanhamento" },
    ],
  },
  en: {
    heading1: "Featured",
    heading2: " resources",
    items: [
      { title: "Global monitoring",              desc: "Complete view of operations and devices anywhere." },
      { title: "Preventive maintenance",         desc: "Anticipate replacements and avoid unexpected downtime." },
      { title: "365-day filter countdown",       desc: "Precise control of filter lifespan and performance." },
      { title: "App control",                    desc: "Functions and adjustments directly from your smartphone." },
      { title: "AI insights",                    desc: "Faster decisions with data and intelligent suggestions." },
      { title: "Operation in 16 languages",      desc: "History and tracking" },
    ],
  },
  es: {
    heading1: "Recursos",
    heading2: " destacados",
    items: [
      { title: "Monitoreo global",                   desc: "Visión completa de operaciones y dispositivos en cualquier lugar." },
      { title: "Mantenimiento preventivo",           desc: "Anticipa cambios y evita paradas inesperadas." },
      { title: "Conteo de 365 días de los filtros",  desc: "Control preciso de vida útil y rendimiento de los filtros." },
      { title: "Control vía App",                    desc: "Funciones y ajustes directamente desde tu smartphone." },
      { title: "Insights con IA",                    desc: "Decisiones más rápidas con datos y sugerencias inteligentes." },
      { title: "Operación en 16 idiomas",            desc: "Historial y seguimiento" },
    ],
  },
  fr: {
    heading1: "Fonctionnalités",
    heading2: " en vedette",
    items: [
      { title: "Surveillance mondiale",              desc: "Vue complète des opérations et des appareils n'importe où." },
      { title: "Maintenance préventive",             desc: "Anticipez les remplacements et évitez les arrêts imprévus." },
      { title: "Compte à rebours 365 jours des filtres", desc: "Contrôle précis de la durée de vie et des performances des filtres." },
      { title: "Contrôle via App",                   desc: "Fonctions et réglages directement depuis votre smartphone." },
      { title: "Insights avec IA",                   desc: "Décisions plus rapides grâce aux données et suggestions intelligentes." },
      { title: "Opération en 16 langues",            desc: "Historique et suivi" },
    ],
  },
  de: {
    heading1: "Highlights",
    heading2: " der Funktionen",
    items: [
      { title: "Globale Überwachung",                desc: "Vollständige Übersicht über Abläufe und Geräte überall." },
      { title: "Vorbeugende Wartung",                desc: "Tauschen Sie vorausschauend und vermeiden Sie unerwartete Ausfälle." },
      { title: "365-Tage-Countdown der Filter",      desc: "Präzise Kontrolle über Filterlebensdauer und -leistung." },
      { title: "App-Steuerung",                      desc: "Funktionen und Einstellungen direkt von Ihrem Smartphone." },
      { title: "KI-Insights",                        desc: "Schnellere Entscheidungen dank Daten und intelligenten Vorschlägen." },
      { title: "Betrieb in 16 Sprachen",             desc: "Verlauf und Nachverfolgung" },
    ],
  },
  it: {
    heading1: "Funzionalità",
    heading2: " in evidenza",
    items: [
      { title: "Monitoraggio globale",               desc: "Visione completa di operazioni e dispositivi ovunque." },
      { title: "Manutenzione preventiva",            desc: "Anticipa le sostituzioni ed evita fermi imprevisti." },
      { title: "Conto alla rovescia 365 giorni dei filtri", desc: "Controllo preciso della durata e delle prestazioni dei filtri." },
      { title: "Controllo tramite App",              desc: "Funzioni e regolazioni direttamente dal tuo smartphone." },
      { title: "Insights con IA",                    desc: "Decisioni più rapide con dati e suggerimenti intelligenti." },
      { title: "Operazione in 16 lingue",            desc: "Cronologia e monitoraggio" },
    ],
  },
  zh: {
    heading1: "精选",
    heading2: "功能",
    items: [
      { title: "全球监控",                           desc: "随时随地全面了解运营和设备状况。" },
      { title: "预防性维护",                         desc: "提前安排更换，避免意外停机。" },
      { title: "滤芯 365 天倒计时",                  desc: "精确控制滤芯使用寿命和性能。" },
      { title: "App 控制",                           desc: "直接通过智能手机操控功能和调整设置。" },
      { title: "AI 洞察",                            desc: "借助数据和智能建议做出更快决策。" },
      { title: "支持 16 种语言运营",                 desc: "历史记录与追踪" },
    ],
  },
  ja: {
    heading1: "注目の",
    heading2: "機能",
    items: [
      { title: "グローバル監視",                     desc: "どこからでも運営とデバイスを包括的に把握。" },
      { title: "予防保全",                           desc: "交換を事前に計画し、予期せぬダウンタイムを回避。" },
      { title: "フィルター365日カウントダウン",       desc: "フィルターの寿命とパフォーマンスを正確に管理。" },
      { title: "Appコントロール",                    desc: "スマートフォンから直接機能を操作・調整。" },
      { title: "AIインサイト",                       desc: "データとインテリジェントな提案でより迅速な意思決定。" },
      { title: "16言語対応オペレーション",            desc: "履歴と追跡" },
    ],
  },
  ko: {
    heading1: "주요",
    heading2: " 기능",
    items: [
      { title: "글로벌 모니터링",                    desc: "어디서든 운영 및 기기를 완벽하게 파악." },
      { title: "예방 유지보수",                      desc: "교체를 미리 계획하고 예기치 않은 다운타임을 방지." },
      { title: "필터 365일 카운트다운",               desc: "필터 수명 및 성능을 정밀하게 관리." },
      { title: "App 제어",                           desc: "스마트폰에서 직접 기능과 설정을 조작." },
      { title: "AI 인사이트",                        desc: "데이터와 지능적인 제안으로 더 빠른 의사결정." },
      { title: "16개 언어 운영",                     desc: "기록 및 추적" },
    ],
  },
  "pt-pt": {
    heading1: "Recursos",
    heading2: " em destaque",
    items: [
      { title: "Monitorização global",              desc: "Visão completa de operações e dispositivos em qualquer lugar." },
      { title: "Manutenção preventiva",             desc: "Antecipe substituições e evite paragens inesperadas." },
      { title: "Contagem de 365 dias dos filtros",  desc: "Controlo preciso da vida útil e desempenho dos filtros." },
      { title: "Controlo via App",                  desc: "Funções e ajustes diretamente do seu smartphone." },
      { title: "Insights com AI",                   desc: "Decisões mais rápidas com dados e sugestões inteligentes." },
      { title: "Operação em 16 idiomas",            desc: "Histórico e acompanhamento" },
    ],
  },
};

const icons = [
  { icon: "/figma-assets/icon-global-monitoring.svg",      aspectW: 30, aspectH: 30, bg: "#0569ff" },
  { icon: "/figma-assets/icon-preventive-maintenance.svg", aspectW: 30, aspectH: 30, bg: "#36ae5c" },
  { icon: "/figma-assets/icon-filter-365days.svg",         aspectW: 36, aspectH: 40, bg: "#ffa920" },
  { icon: "/figma-assets/icon-app-control.svg",            aspectW: 21, aspectH: 30, bg: "#6e54ef" },
  { icon: "/figma-assets/icon-ai-insights-app.svg",        aspectW: 30, aspectH: 30, bg: "#6e54ef" },
  { icon: "/figma-assets/icon-16-languages.svg",           aspectW: 30, aspectH: 30, bg: "#0569ff" },
];

export default function RecursosAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const items = t.items.map((item, i) => ({ ...icons[i], ...item }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#0569ff]">{t.heading1}</span>
          <span className="text-[#1f2e91]">{t.heading2}</span>
        </h2>

        {/* 6 cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-start min-w-[200px] p-[20px] rounded-[16px]"
            >
              {/* Ícone — círculo colorido */}
              <div
                className="flex items-center justify-center size-[60px] rounded-full shrink-0"
                style={{ backgroundColor: item.bg }}
              >
                <FigmaIcon src={item.icon} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
              </div>

              {/* Texto */}
              <div className="flex flex-col gap-[20px] items-center text-center w-full">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[36px] w-full flex items-center justify-center text-center">
                  {item.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] w-full">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
