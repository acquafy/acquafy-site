"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgBg     = "/figma-assets/bg-i.webp";
const imgMockup = "/figma-assets/mockup-a.webp";
const imgMobile = "/figma-assets/icon-mobile-20px.svg";
const imgBrain  = "/figma-assets/icon-brain-d.svg";
const imgIoT    = "/figma-assets/icon-iot-main.svg";
const imgArrowW = "/figma-assets/icon-arrow-white-a.svg";
const imgArrowB = "/figma-assets/icon-arrow-blue-outline-a.svg";

// ── Traduções ─────────────────────────────────────────────────────────────────
const T: Record<Lang, {
  label: string;
  description: string;
  badges: { title: string; desc: string }[];
  btnPrimary: string;
  btnSecondary: string;
  mockupAlt: string;
}> = {
  pt: {
    label: "ECOSSISTEMA CONECTADO ACQUAFY",
    description: "Controle seus purificadores, monitore dispositivos, receba alertas inteligentes e gerencie toda a operação em uma experiência integrada.",
    badges: [
      { title: "App Acquafy", desc: "Controle remoto, status do equipamento e suporte na palma da mão." },
      { title: "Acquafy AI", desc: "Inteligência artificial para insights, automações e decisões mais rápidas." },
      { title: "IoT & Dispositivos", desc: "Sensores, conectividade e monitoramento em tempo real." },
    ],
    btnPrimary: "Baixar o App",
    btnSecondary: "Explorar recursos",
    mockupAlt: "App Acquafy — tablet e smartphone",
  },
  en: {
    label: "ACQUAFY CONNECTED ECOSYSTEM",
    description: "Control your purifiers, monitor devices, receive smart alerts and manage the entire operation in an integrated experience.",
    badges: [
      { title: "App Acquafy", desc: "Remote control, equipment status and support at your fingertips." },
      { title: "Acquafy AI", desc: "Artificial intelligence for insights, automation and faster decisions." },
      { title: "IoT & Devices", desc: "Sensors, connectivity and real-time monitoring." },
    ],
    btnPrimary: "Download the App",
    btnSecondary: "Explore features",
    mockupAlt: "App Acquafy — tablet and smartphone",
  },
  es: {
    label: "ECOSISTEMA CONECTADO ACQUAFY",
    description: "Controla tus purificadores, monitorea dispositivos, recibe alertas inteligentes y gestiona toda la operación en una experiencia integrada.",
    badges: [
      { title: "App Acquafy", desc: "Control remoto, estado del equipo y soporte en la palma de la mano." },
      { title: "Acquafy AI", desc: "Inteligencia artificial para insights, automatizaciones y decisiones más rápidas." },
      { title: "IoT & Dispositivos", desc: "Sensores, conectividad y monitoreo en tiempo real." },
    ],
    btnPrimary: "Descargar la App",
    btnSecondary: "Explorar recursos",
    mockupAlt: "App Acquafy — tablet y smartphone",
  },
  fr: {
    label: "ÉCOSYSTÈME CONNECTÉ ACQUAFY",
    description: "Contrôlez vos purificateurs, surveillez vos appareils, recevez des alertes intelligentes et gérez l'ensemble de l'opération dans une expérience intégrée.",
    badges: [
      { title: "App Acquafy", desc: "Contrôle à distance, état de l'équipement et support à portée de main." },
      { title: "Acquafy AI", desc: "Intelligence artificielle pour les insights, l'automatisation et des décisions plus rapides." },
      { title: "IoT & Appareils", desc: "Capteurs, connectivité et surveillance en temps réel." },
    ],
    btnPrimary: "Télécharger l'App",
    btnSecondary: "Explorer les fonctionnalités",
    mockupAlt: "App Acquafy — tablette et smartphone",
  },
  de: {
    label: "VERNETZTES ACQUAFY-ÖKOSYSTEM",
    description: "Steuern Sie Ihre Reiniger, überwachen Sie Geräte, empfangen Sie intelligente Benachrichtigungen und verwalten Sie den gesamten Betrieb in einem integrierten Erlebnis.",
    badges: [
      { title: "App Acquafy", desc: "Fernsteuerung, Gerätestatus und Support immer griffbereit." },
      { title: "Acquafy AI", desc: "Künstliche Intelligenz für Insights, Automatisierungen und schnellere Entscheidungen." },
      { title: "IoT & Geräte", desc: "Sensoren, Konnektivität und Echtzeit-Überwachung." },
    ],
    btnPrimary: "App herunterladen",
    btnSecondary: "Funktionen entdecken",
    mockupAlt: "App Acquafy — Tablet und Smartphone",
  },
  it: {
    label: "ECOSISTEMA CONNESSO ACQUAFY",
    description: "Controlla i tuoi purificatori, monitora i dispositivi, ricevi avvisi intelligenti e gestisci l'intera operazione in un'esperienza integrata.",
    badges: [
      { title: "App Acquafy", desc: "Controllo remoto, stato dell'attrezzatura e supporto a portata di mano." },
      { title: "Acquafy AI", desc: "Intelligenza artificiale per insights, automazioni e decisioni più rapide." },
      { title: "IoT & Dispositivi", desc: "Sensori, connettività e monitoraggio in tempo reale." },
    ],
    btnPrimary: "Scarica l'App",
    btnSecondary: "Esplora le funzionalità",
    mockupAlt: "App Acquafy — tablet e smartphone",
  },
  zh: {
    label: "ACQUAFY 互联生态系统",
    description: "控制您的净水器，监控设备，接收智能提醒，并在一体化体验中管理整个运营。",
    badges: [
      { title: "App Acquafy", desc: "远程控制、设备状态和支持触手可及。" },
      { title: "Acquafy AI", desc: "人工智能助力洞察、自动化和更快决策。" },
      { title: "IoT & 设备", desc: "传感器、连接性和实时监控。" },
    ],
    btnPrimary: "下载 App",
    btnSecondary: "探索功能",
    mockupAlt: "App Acquafy — 平板电脑和智能手机",
  },
  ja: {
    label: "ACQUAFY コネクテッドエコシステム",
    description: "浄水器をコントロールし、デバイスを監視し、スマートアラートを受け取り、一体化された体験で全体の運営を管理します。",
    badges: [
      { title: "App Acquafy", desc: "手のひらでリモートコントロール、機器の状態確認とサポートを。" },
      { title: "Acquafy AI", desc: "インサイト、自動化、迅速な意思決定のための人工知能。" },
      { title: "IoT & デバイス", desc: "センサー、コネクティビティ、リアルタイム監視。" },
    ],
    btnPrimary: "App をダウンロード",
    btnSecondary: "機能を見る",
    mockupAlt: "App Acquafy — タブレットとスマートフォン",
  },
  ko: {
    label: "ACQUAFY 연결 생태계",
    description: "정수기를 제어하고, 기기를 모니터링하며, 스마트 알림을 받고, 통합된 경험으로 전체 운영을 관리하세요.",
    badges: [
      { title: "App Acquafy", desc: "원격 제어, 장비 상태 및 지원을 손끝에서." },
      { title: "Acquafy AI", desc: "인사이트, 자동화, 더 빠른 결정을 위한 인공지능." },
      { title: "IoT & 기기", desc: "센서, 연결성 및 실시간 모니터링." },
    ],
    btnPrimary: "App 다운로드",
    btnSecondary: "기능 탐색",
    mockupAlt: "App Acquafy — 태블릿 및 스마트폰",
  },
  "pt-pt": {
    label: "ECOSSISTEMA CONECTADO ACQUAFY",
    description: "Controle os seus purificadores, monitorize dispositivos, receba alertas inteligentes e gira toda a operação numa experiência integrada.",
    badges: [
      { title: "App Acquafy", desc: "Controlo remoto, estado do equipamento e suporte na palma da mão." },
      { title: "Acquafy AI", desc: "Inteligência artificial para insights, automatizações e decisões mais rápidas." },
      { title: "IoT & Dispositivos", desc: "Sensores, conectividade e monitorização em tempo real." },
    ],
    btnPrimary: "Transferir a App",
    btnSecondary: "Explorar recursos",
    mockupAlt: "App Acquafy — tablet e smartphone",
  },
};

/*
  BREAKPOINTS (tailwind.config.ts)
  ─────────────────────────────────
  win-1024  min-width: 1024px   →  Breakpoint 2 (2 colunas)
  win-1280  min-width: 1280px   →  TELA TOTAL (bg-image)

  MAPEAMENTO
  ─────────────────────────────────
  Base      (< 1024px): Figma Breakpoint 3 — coluna única centrada, mockup abaixo
  win-1024 (≥ 1024px) : Figma Breakpoint 2 — 2 colunas, mockup à direita
  win-1280 (≥ 1280px) : Figma TELA TOTAL   — bg-image, h-[875px], badges h-[217px]
*/
export default function HeroAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const badges = [
    { icon: imgMobile, aspectW: 21, aspectH: 30, bg: "#0233c3", title: t.badges[0].title, desc: t.badges[0].desc },
    { icon: imgBrain,  aspectW: 30, aspectH: 30, bg: "#6e54ef", title: t.badges[1].title, desc: t.badges[1].desc },
    { icon: imgIoT,    aspectW: 27.5, aspectH: 18.8, bg: "#36ae5c", title: t.badges[2].title, desc: t.badges[2].desc },
  ];

  return (
    // ── SECTION ──────────────────────────────────────────────────────────────
    // Base    : bg cinza, padding, altura automática
    // win-1280: bg transparente, altura fixa 875px (imagem de fundo toma conta)
    <section className={[
      "relative overflow-hidden",
      "flex flex-col items-center justify-center",
      "px-[20px] py-[40px] w-full",
      "bg-[#f6f9fe] win-1280:bg-transparent",
      "win-1280:h-[875px]",
    ].join(" ")}>

      {/* Imagem de fundo — apenas win-1280+ */}
      <img
        src={imgBg} alt="" aria-hidden="true"
        className="hidden win-1280:block absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* ── WRAPPER INTERNO ──────────────────────────────────────────────────
          Base     : flex-col gap-[40px] items-start
          win-1024 : flex-row flex-wrap gap-y-[40px] gap-x-[20px] items-center
          win-1280 : gap-x-[40px] (mantém 2 colunas com gap maior)
      */}
      <div className={[
        "relative max-w-[1400px] w-full",
        "flex flex-col gap-[40px] items-start",
        "win-1024:flex-row win-1024:flex-wrap win-1024:gap-y-[40px] win-1024:gap-x-[20px] win-1024:items-center",
        "win-1280:gap-x-[40px]",
      ].join(" ")}>

        {/* ── BLOCO DE CONTEÚDO ──────────────────────────────────────────────
            Base     : w-full, items-center (centrado)
            win-1024 : flex-[1_0_0] max-w-[660px] min-w-[280px], items-start (alinhado à esq.)
        */}
        <div className={[
          "flex flex-col gap-[20px] justify-center",
          "items-center win-1024:items-start",
          "w-full win-1024:flex-[1_0_0] win-1024:max-w-[660px] win-1024:min-w-[280px]",
        ].join(" ")}>

          {/* Label pill */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[290px] px-[12px] py-[8px] rounded-full shrink-0 w-full">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              {t.label}
            </span>
          </div>

          {/* Título
              Base     : centrado
              win-1024 : alinhado à esquerda
          */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] w-full text-center win-1024:text-left">
            {"App + "}
            <span className="text-[#6e54ef]">AI</span>
            {" "}
            <span className="text-[#1f2e91]">+</span>
            {" "}
            <span className="text-[#0569ff]">IoT</span>
          </h1>

          {/* Descrição
              Base     : centrada
              win-1024 : alinhada à esquerda
          */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] w-full text-center win-1024:text-left">
            {t.description}
          </p>

          {/* ── BADGE-CARDS ────────────────────────────────────────────────
              Base     : flex-wrap, items-start, justify-center
                         cada card: min-w-[280px] flex-[1_0_0]
              win-1024 : flex-nowrap (linha única), items-start, justify-center
                         cada card: min-w-px (pode diminuir)
              win-1280 : items-center (TELA TOTAL); cada card h-[217px]
          */}
          <div className={[
            "flex flex-wrap gap-[10px] w-full",
            "items-stretch",
            "justify-center",
            "win-1024:flex-nowrap",
          ].join(" ")}>
            {badges.map((b) => (
              <div
                key={b.title}
                className={[
                  "bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start",
                  "p-[20px] rounded-[16px]",
                  "min-w-[280px] win-1024:min-w-px",
                ].join(" ")}
              >
                {/* Ícone */}
                <div
                  className="flex items-center justify-center size-[50px] rounded-[12px] shrink-0 p-[12px]"
                  style={{ backgroundColor: b.bg }}
                >
                  <FigmaIcon src={b.icon} size={26} aspectW={b.aspectW} aspectH={b.aspectH} />
                </div>

                {/* Título do card */}
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">
                  {b.title}
                </p>

                {/* Descrição do card */}
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] w-full">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── BOTÕES ─────────────────────────────────────────────────────
              Base     : flex-wrap justify-center, cada botão flex-[1_0_0]
              win-1024 : justify-start, cada botão shrink-0 (tamanho fixo)
          */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center win-1280:justify-start w-full">

            {/* Primário */}
            <button className={[
              "bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#0569ff] transition-colors",
              "flex flex-[1_0_0] win-1024:flex-none gap-[10px] items-center justify-center",
              "min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer",
            ].join(" ")}>
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">
                {t.btnPrimary}
              </span>
              <FigmaIcon src={imgArrowW} size={9} aspectW={11.2} aspectH={8.84} />
            </button>

            {/* Secundário */}
            <button className={[
              "group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors",
              "flex flex-[1_0_0] win-1024:flex-none gap-[10px] items-center justify-center",
              "min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer",
            ].join(" ")}>
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white transition-colors flex-1 text-center">
                {t.btnSecondary}
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-150">
                  <FigmaIcon src={imgArrowB} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <FigmaIcon src={imgArrowW} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ── MOCKUP ─────────────────────────────────────────────────────────
            Base     : w-full h-[481px] abaixo do conteúdo (flex-col)
            win-1024 : flex-[1_0_0] min-w-[280px] à direita (flex-row)
            win-1280 : oculto — a imagem de fundo já mostra o mockup
        */}
        <div className="win-1280:hidden rounded-[16px] overflow-clip h-[481px] min-w-[280px] w-full win-1024:flex-[1_0_0]">
          <img
            src={imgMockup}
            alt={t.mockupAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── ESPAÇADOR TELA TOTAL ────────────────────────────────────────────
            Visível apenas em win-1280+. Ocupa o lado direito para que o
            bloco de conteúdo fique restrito aos seus 660px enquanto o
            mockup da imagem de fundo aparece ao fundo nesse espaço.
        */}
        <div className="hidden win-1280:flex flex-[1_0_0]" />

      </div>
    </section>
  );
}
