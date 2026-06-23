"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  items: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Tudo conectado em uma ",
    heading2: "única experiência",
    items: [
      { title: "Monitoramento em tempo real", desc: "Acompanhe seus dispositivos 24/7 de qualquer lugar." },
      { title: "Alertas inteligentes", desc: "Notificações automáticas para agir antes de qualquer problema." },
      { title: "Qualidade da água", desc: "Dados precisos para garantir água pura e confiável." },
      { title: "Status dos filtros", desc: "Verifique vida útil, trocas e desempenho dos filtros." },
      { title: "Controle remoto", desc: "Gerencie funções e operações direto do seu App." },
      { title: "Atualizações e suporte", desc: "Software sempre atualizado e suporte especializado." },
    ],
  },
  en: {
    heading1: "Everything connected in a ",
    heading2: "single experience",
    items: [
      { title: "Real-time monitoring", desc: "Track your devices 24/7 from anywhere." },
      { title: "Smart alerts", desc: "Automatic notifications to act before any problem." },
      { title: "Water quality", desc: "Accurate data to ensure pure and reliable water." },
      { title: "Filter status", desc: "Check lifespan, replacements and filter performance." },
      { title: "Remote control", desc: "Manage functions and operations directly from your App." },
      { title: "Updates and support", desc: "Always up-to-date software and specialized support." },
    ],
  },
  "en-gb": {
    heading1: "Everything connected in a ",
    heading2: "single experience",
    items: [
      { title: "Real-time monitoring", desc: "Track your devices 24/7 from anywhere." },
      { title: "Smart alerts", desc: "Automatic notifications to act before any problem." },
      { title: "Water quality", desc: "Accurate data to ensure pure and reliable water." },
      { title: "Filter status", desc: "Check lifespan, replacements and filter performance." },
      { title: "Remote control", desc: "Manage functions and operations directly from your App." },
      { title: "Updates and support", desc: "Always up-to-date software and specialised support." },
    ],
  },
  es: {
    heading1: "Todo conectado en una ",
    heading2: "única experiencia",
    items: [
      { title: "Monitoreo en tiempo real", desc: "Sigue tus dispositivos 24/7 desde cualquier lugar." },
      { title: "Alertas inteligentes", desc: "Notificaciones automáticas para actuar antes de cualquier problema." },
      { title: "Calidad del agua", desc: "Datos precisos para garantizar agua pura y confiable." },
      { title: "Estado de los filtros", desc: "Verifica la vida útil, cambios y rendimiento de los filtros." },
      { title: "Control remoto", desc: "Gestiona funciones y operaciones directamente desde tu App." },
      { title: "Actualizaciones y soporte", desc: "Software siempre actualizado y soporte especializado." },
    ],
  },
  fr: {
    heading1: "Tout connecté en une ",
    heading2: "expérience unique",
    items: [
      { title: "Surveillance en temps réel", desc: "Suivez vos appareils 24h/24 et 7j/7 depuis n'importe où." },
      { title: "Alertes intelligentes", desc: "Notifications automatiques pour agir avant tout problème." },
      { title: "Qualité de l'eau", desc: "Données précises pour garantir une eau pure et fiable." },
      { title: "État des filtres", desc: "Vérifiez la durée de vie, les remplacements et les performances des filtres." },
      { title: "Contrôle à distance", desc: "Gérez les fonctions et opérations directement depuis votre App." },
      { title: "Mises à jour et support", desc: "Logiciel toujours à jour et support spécialisé." },
    ],
  },
  de: {
    heading1: "Alles verbunden in einem ",
    heading2: "einzigen Erlebnis",
    items: [
      { title: "Echtzeit-Überwachung", desc: "Verfolgen Sie Ihre Geräte rund um die Uhr von überall." },
      { title: "Intelligente Benachrichtigungen", desc: "Automatische Meldungen, um vor jedem Problem handeln zu können." },
      { title: "Wasserqualität", desc: "Präzise Daten zur Gewährleistung von reinem und zuverlässigem Wasser." },
      { title: "Filterstatus", desc: "Überprüfen Sie Lebensdauer, Austausch und Filterleistung." },
      { title: "Fernsteuerung", desc: "Verwalten Sie Funktionen und Abläufe direkt aus Ihrer App." },
      { title: "Updates und Support", desc: "Stets aktuelle Software und spezialisierter Support." },
    ],
  },
  it: {
    heading1: "Tutto connesso in un'",
    heading2: "unica esperienza",
    items: [
      { title: "Monitoraggio in tempo reale", desc: "Tieni traccia dei tuoi dispositivi 24/7 da qualsiasi luogo." },
      { title: "Avvisi intelligenti", desc: "Notifiche automatiche per agire prima di qualsiasi problema." },
      { title: "Qualità dell'acqua", desc: "Dati precisi per garantire acqua pura e affidabile." },
      { title: "Stato dei filtri", desc: "Verifica la durata, le sostituzioni e le prestazioni dei filtri." },
      { title: "Controllo remoto", desc: "Gestisci funzioni e operazioni direttamente dalla tua App." },
      { title: "Aggiornamenti e supporto", desc: "Software sempre aggiornato e supporto specializzato." },
    ],
  },
  zh: {
    heading1: "一切连接于",
    heading2: "一体化体验",
    items: [
      { title: "实时监控", desc: "随时随地全天候追踪您的设备。" },
      { title: "智能提醒", desc: "自动通知，让您在任何问题发生前及时行动。" },
      { title: "水质监测", desc: "精确数据，确保纯净可靠的饮用水。" },
      { title: "滤芯状态", desc: "查看滤芯使用寿命、更换情况和性能表现。" },
      { title: "远程控制", desc: "直接通过您的 App 管理功能和操作。" },
      { title: "更新与支持", desc: "软件始终保持最新，并提供专业支持。" },
    ],
  },
  ja: {
    heading1: "すべてが一つの",
    heading2: "体験でつながる",
    items: [
      { title: "リアルタイム監視", desc: "どこからでも24時間365日デバイスを追跡。" },
      { title: "スマートアラート", desc: "問題が発生する前に行動できる自動通知。" },
      { title: "水質管理", desc: "純粋で信頼性の高い水を確保するための正確なデータ。" },
      { title: "フィルター状態", desc: "フィルターの寿命、交換、パフォーマンスを確認。" },
      { title: "リモートコントロール", desc: "Appから直接機能と操作を管理。" },
      { title: "アップデートとサポート", desc: "常に最新のソフトウェアと専門的なサポート。" },
    ],
  },
  ko: {
    heading1: "모든 것이 연결된 ",
    heading2: "하나의 경험",
    items: [
      { title: "실시간 모니터링", desc: "어디서든 24/7 기기를 추적하세요." },
      { title: "스마트 알림", desc: "문제가 발생하기 전에 조치할 수 있는 자동 알림." },
      { title: "수질 관리", desc: "순수하고 신뢰할 수 있는 물을 보장하는 정확한 데이터." },
      { title: "필터 상태", desc: "필터 수명, 교체 및 성능을 확인하세요." },
      { title: "원격 제어", desc: "App에서 직접 기능과 작업을 관리하세요." },
      { title: "업데이트 및 지원", desc: "항상 최신 소프트웨어와 전문적인 지원." },
    ],
  },
  sv: {
    heading1: "Allt anslutet i en ",
    heading2: "enda upplevelse",
    items: [
      { title: "Realtidsövervakning", desc: "Spåra dina enheter dygnet runt från var som helst." },
      { title: "Smarta aviseringar", desc: "Automatiska notifieringar för att agera innan problem uppstår." },
      { title: "Vattenkvalitet", desc: "Exakta data för att säkerställa rent och tillförlitligt vatten." },
      { title: "Filterstatus", desc: "Kontrollera livslängd, byten och filterprestanda." },
      { title: "Fjärrstyrning", desc: "Hantera funktioner och operationer direkt från din App." },
      { title: "Uppdateringar och support", desc: "Alltid uppdaterad mjukvara och specialiserad support." },
    ],
  },
  fi: {
    heading1: "Kaikki yhdistettynä ",
    heading2: "yhteen kokemukseen",
    items: [
      { title: "Reaaliaikainen seuranta", desc: "Seuraa laitteitasi 24/7 mistä tahansa." },
      { title: "Älykkäät hälytykset", desc: "Automaattiset ilmoitukset, jotta voit toimia ennen ongelmia." },
      { title: "Veden laatu", desc: "Tarkat tiedot puhtaan ja luotettavan veden varmistamiseksi." },
      { title: "Suodattimen tila", desc: "Tarkista käyttöikä, vaihdot ja suodattimen suorituskyky." },
      { title: "Kauko-ohjaus", desc: "Hallitse toimintoja ja toimenpiteitä suoraan sovelluksestasi." },
      { title: "Päivitykset ja tuki", desc: "Aina ajan tasalla oleva ohjelmisto ja erikoistunut tuki." },
    ],
  },
  ru: {
    heading1: "Всё связано в ",
    heading2: "едином опыте",
    items: [
      { title: "Мониторинг в реальном времени", desc: "Отслеживайте ваши устройства 24/7 из любой точки мира." },
      { title: "Умные оповещения", desc: "Автоматические уведомления для действий до возникновения проблем." },
      { title: "Качество воды", desc: "Точные данные для обеспечения чистой и надёжной воды." },
      { title: "Статус фильтров", desc: "Проверяйте срок службы, замены и производительность фильтров." },
      { title: "Дистанционное управление", desc: "Управляйте функциями и операциями прямо из вашего приложения." },
      { title: "Обновления и поддержка", desc: "Всегда актуальное программное обеспечение и специализированная поддержка." },
    ],
  },
  ro: {
    heading1: "Totul conectat intr-o ",
    heading2: "singura experienta",
    items: [
      { title: "Monitorizare in timp real", desc: "Urmariti-va dispozitivele 24/7 de oriunde." },
      { title: "Alerte inteligente", desc: "Notificari automate pentru a actiona inainte de orice problema." },
      { title: "Calitatea apei", desc: "Date precise pentru a garanta apa pura si fiabila." },
      { title: "Starea filtrelor", desc: "Verificati durata de viata, inlocuirile si performanta filtrelor." },
      { title: "Control de la distanta", desc: "Gestionati functiile si operatiunile direct din aplicatia dvs." },
      { title: "Actualizari si suport", desc: "Software mereu actualizat si suport specializat." },
    ],
  },
  he: {
    heading1: "הכל מחובר בחוויה ",
    heading2: "אחת ויחידה",
    items: [
      { title: "ניטור בזמן אמת", desc: "עקוב אחר המכשירים שלך 24/7 מכל מקום." },
      { title: "התראות חכמות", desc: "התראות אוטומטיות לפעולה לפני כל תקלה." },
      { title: "איכות המים", desc: "נתונים מדויקים להבטחת מים נקיים ואמינים." },
      { title: "מצב הפילטרים", desc: "בדוק את תוחלת החיים, ההחלפות וביצועי הפילטרים." },
      { title: "שליטה מרחוק", desc: "נהל פונקציות ופעולות ישירות מהאפליקציה שלך." },
      { title: "עדכונים ותמיכה", desc: "תוכנה תמיד מעודכנת ותמיכה מקצועית." },
    ],
  },
  "pt-pt": {
    heading1: "Tudo conectado numa ",
    heading2: "única experiência",
    items: [
      { title: "Monitorização em tempo real", desc: "Acompanhe os seus dispositivos 24/7 a partir de qualquer lugar." },
      { title: "Alertas inteligentes", desc: "Notificações automáticas para agir antes de qualquer problema." },
      { title: "Qualidade da água", desc: "Dados precisos para garantir água pura e fiável." },
      { title: "Estado dos filtros", desc: "Verifique a vida útil, substituições e desempenho dos filtros." },
      { title: "Controlo remoto", desc: "Gira funções e operações diretamente a partir da sua App." },
      { title: "Atualizações e suporte", desc: "Software sempre atualizado e suporte especializado." },
    ],
  },
};

const icons = [
  { icon: "/figma-assets/icon-monitoring-realtime.svg", aspectW: 30, aspectH: 30, bg: "#0569ff" },
  { icon: "/figma-assets/icon-smart-alerts.svg",        aspectW: 23, aspectH: 30, bg: "#6e54ef" },
  { icon: "/figma-assets/icon-water-quality-app.svg",   aspectW: 30, aspectH: 30, bg: "#36ae5c" },
  { icon: "/figma-assets/icon-filter-status.svg",       aspectW: 30, aspectH: 30, bg: "#ffa920" },
  { icon: "/figma-assets/icon-remote-control.svg",      aspectW: 21, aspectH: 30, bg: "#6e54ef" },
  { icon: "/figma-assets/icon-updates-support.svg",     aspectW: 30, aspectH: 30, bg: "#0569ff" },
];

export default function ConectadoAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const items = t.items.map((item, i) => ({ ...icons[i], ...item }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        {/* 6 cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[200px] p-[20px] rounded-[16px]"
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
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[36px] w-full flex items-center justify-center">
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
