"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgPurif    = "/figma-assets/ts-icon-agua-intel.svg";
const imgBrain    = "/figma-assets/ts-icon-brain.svg";
const imgIot      = "/figma-assets/ts-icon-iot.svg";
const imgTela     = "/figma-assets/ts-icon-tela.svg";
const imgShield   = "/figma-assets/ts-icon-shield-agua.svg";
const imgScale    = "/figma-assets/ts-icon-scale.svg";
const imgMagnific = "/figma-assets/ts-hero-right.webp";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  features: { title: string; description: string }[];
}> = {
  pt: {
    heading1: "Tecnologia",
    heading2: " que faz a diferença",
    subtitle: "Desenvolvemos soluções completas que unem hardware avançado, software inteligente e conectividade para oferecer a melhor experiência em purificação de água e gestão de impacto.",
    features: [
      { title: "Purificação Avançada",    description: "Sistemas de filtragem multi-etapas que removem impurezas, odores, metais pesados e microrganismos, garantindo água pura e alcalina." },
      { title: "Inteligência Artificial", description: "IA integrada para monitoramento da água, manutenção preditiva, uso otimizado e insights para operação e desempenho." },
      { title: "Conectividade IoT",       description: "Dispositivos conectados em tempo real, com monitoramento remoto, atualizações e gestão centralizadas via plataforma Acquafy." },
      { title: "Interface Inteligente",   description: "Telas LCD IPS Touch com experiência intuitiva, informações em tempo real, anúncios e interatividade para usuários de marcas." },
      { title: "Segurança Total",         description: "Proteção de dados, controle de acesso, criptografia e conformidade com as principais normas internacionais de segurança e privacidade." },
      { title: "Dados e Performance",     description: "Dashboards completos com indicadores de uso, qualidade da água, receita e impacto para decisões estratégicas baseadas em dados." },
    ],
  },
  en: {
    heading1: "Technology",
    heading2: " that makes a difference",
    subtitle: "We develop complete solutions that combine advanced hardware, intelligent software and connectivity to deliver the best experience in water purification and impact management.",
    features: [
      { title: "Advanced Purification",   description: "Multi-stage filtration systems that remove impurities, odors, heavy metals and microorganisms, ensuring pure and alkaline water." },
      { title: "Artificial Intelligence", description: "Integrated AI for water monitoring, predictive maintenance, optimized usage and insights for operation and performance." },
      { title: "IoT Connectivity",        description: "Devices connected in real time, with remote monitoring, updates and centralized management via the Acquafy platform." },
      { title: "Smart Interface",         description: "LCD IPS Touch screens with an intuitive experience, real-time information, ads and interactivity for brand users." },
      { title: "Total Security",          description: "Data protection, access control, encryption and compliance with the leading international security and privacy standards." },
      { title: "Data & Performance",      description: "Complete dashboards with usage indicators, water quality, revenue and impact for data-driven strategic decisions." },
    ],
  },
  es: {
    heading1: "Tecnología",
    heading2: " que marca la diferencia",
    subtitle: "Desarrollamos soluciones completas que combinan hardware avanzado, software inteligente y conectividad para ofrecer la mejor experiencia en purificación de agua y gestión de impacto.",
    features: [
      { title: "Purificación Avanzada",    description: "Sistemas de filtración de múltiples etapas que eliminan impurezas, olores, metales pesados y microorganismos, garantizando agua pura y alcalina." },
      { title: "Inteligencia Artificial",  description: "IA integrada para monitoreo del agua, mantenimiento predictivo, uso optimizado e insights para operación y rendimiento." },
      { title: "Conectividad IoT",         description: "Dispositivos conectados en tiempo real, con monitoreo remoto, actualizaciones y gestión centralizada vía plataforma Acquafy." },
      { title: "Interfaz Inteligente",     description: "Pantallas LCD IPS Touch con experiencia intuitiva, información en tiempo real, anuncios e interactividad para usuarios de marcas." },
      { title: "Seguridad Total",          description: "Protección de datos, control de acceso, cifrado y cumplimiento con las principales normas internacionales de seguridad y privacidad." },
      { title: "Datos y Rendimiento",      description: "Dashboards completos con indicadores de uso, calidad del agua, ingresos e impacto para decisiones estratégicas basadas en datos." },
    ],
  },
  fr: {
    heading1: "Technologie",
    heading2: " qui fait la différence",
    subtitle: "Nous développons des solutions complètes combinant matériel avancé, logiciels intelligents et connectivité pour offrir la meilleure expérience en purification d'eau et gestion d'impact.",
    features: [
      { title: "Purification Avancée",      description: "Systèmes de filtration à plusieurs étapes éliminant les impuretés, odeurs, métaux lourds et micro-organismes, garantissant une eau pure et alcaline." },
      { title: "Intelligence Artificielle", description: "IA intégrée pour la surveillance de l'eau, la maintenance prédictive, l'utilisation optimisée et des insights pour l'exploitation et la performance." },
      { title: "Connectivité IoT",          description: "Appareils connectés en temps réel, avec surveillance à distance, mises à jour et gestion centralisée via la plateforme Acquafy." },
      { title: "Interface Intelligente",    description: "Écrans LCD IPS Touch avec une expérience intuitive, informations en temps réel, publicités et interactivité pour les utilisateurs de marques." },
      { title: "Sécurité Totale",           description: "Protection des données, contrôle d'accès, chiffrement et conformité aux principales normes internationales de sécurité et de confidentialité." },
      { title: "Données & Performance",     description: "Tableaux de bord complets avec indicateurs d'utilisation, qualité de l'eau, revenus et impact pour des décisions stratégiques basées sur les données." },
    ],
  },
  de: {
    heading1: "Technologie",
    heading2: ", die den Unterschied macht",
    subtitle: "Wir entwickeln vollständige Lösungen, die fortschrittliche Hardware, intelligente Software und Konnektivität kombinieren, um die beste Erfahrung bei der Wasserreinigung und Wirkungssteuerung zu bieten.",
    features: [
      { title: "Fortschrittliche Reinigung",    description: "Mehrstufige Filtersysteme, die Verunreinigungen, Gerüche, Schwermetalle und Mikroorganismen entfernen und reines, alkalisches Wasser gewährleisten." },
      { title: "Künstliche Intelligenz",        description: "Integrierte KI zur Wasserüberwachung, vorausschauenden Wartung, optimierten Nutzung und Erkenntnissen für Betrieb und Leistung." },
      { title: "IoT-Konnektivität",             description: "Geräte in Echtzeit vernetzt, mit Fernüberwachung, Updates und zentralisiertem Management über die Acquafy-Plattform." },
      { title: "Intelligentes Interface",       description: "LCD IPS Touch-Bildschirme mit intuitiver Nutzererfahrung, Echtzeit-Informationen, Werbung und Interaktivität für Markennutzer." },
      { title: "Totale Sicherheit",             description: "Datenschutz, Zugangskontrolle, Verschlüsselung und Einhaltung der wichtigsten internationalen Sicherheits- und Datenschutzstandards." },
      { title: "Daten & Performance",           description: "Vollständige Dashboards mit Nutzungskennzahlen, Wasserqualität, Umsatz und Wirkung für datengetriebene strategische Entscheidungen." },
    ],
  },
  it: {
    heading1: "Tecnologia",
    heading2: " che fa la differenza",
    subtitle: "Sviluppiamo soluzioni complete che uniscono hardware avanzato, software intelligente e connettività per offrire la migliore esperienza nella purificazione dell'acqua e nella gestione dell'impatto.",
    features: [
      { title: "Purificazione Avanzata",    description: "Sistemi di filtrazione a più stadi che rimuovono impurità, odori, metalli pesanti e microrganismi, garantendo acqua pura e alcalina." },
      { title: "Intelligenza Artificiale",  description: "IA integrata per il monitoraggio dell'acqua, la manutenzione predittiva, l'uso ottimizzato e insight per operatività e prestazioni." },
      { title: "Connettività IoT",          description: "Dispositivi connessi in tempo reale, con monitoraggio remoto, aggiornamenti e gestione centralizzata tramite la piattaforma Acquafy." },
      { title: "Interfaccia Intelligente",  description: "Schermi LCD IPS Touch con esperienza intuitiva, informazioni in tempo reale, annunci e interattività per gli utenti del brand." },
      { title: "Sicurezza Totale",          description: "Protezione dei dati, controllo degli accessi, crittografia e conformità ai principali standard internazionali di sicurezza e privacy." },
      { title: "Dati & Performance",        description: "Dashboard completi con indicatori di utilizzo, qualità dell'acqua, ricavi e impatto per decisioni strategiche basate sui dati." },
    ],
  },
  zh: {
    heading1: "技术",
    heading2: "创造不同",
    subtitle: "我们开发整合先进硬件、智能软件与连接技术的完整解决方案，提供卓越的净水体验与影响力管理。",
    features: [
      { title: "先进净化",       description: "多级过滤系统，去除杂质、异味、重金属和微生物，确保水质纯净且呈碱性。" },
      { title: "人工智能",       description: "集成AI用于水质监测、预测性维护、优化使用以及运营与性能洞察。" },
      { title: "IoT连接",        description: "设备实时联网，通过Acquafy平台实现远程监控、更新和集中管理。" },
      { title: "智能界面",       description: "LCD IPS触摸屏，提供直观体验、实时信息、广告及品牌用户互动功能。" },
      { title: "全面安全",       description: "数据保护、访问控制、加密，符合主要国际安全与隐私标准。" },
      { title: "数据与性能",     description: "完整仪表板，涵盖使用指标、水质、收入和影响，支持数据驱动的战略决策。" },
    ],
  },
  ja: {
    heading1: "テクノロジー",
    heading2: "が生む違い",
    subtitle: "高度なハードウェア、インテリジェントなソフトウェア、そして接続性を組み合わせた完全なソリューションを開発し、浄水と影響管理における最高の体験を提供します。",
    features: [
      { title: "高度な浄水",             description: "多段階フィルタリングシステムが不純物、臭い、重金属、微生物を除去し、純粋でアルカリ性の水を確保します。" },
      { title: "人工知能",               description: "水質モニタリング、予防保全、最適化された使用、そして運用・パフォーマンスのインサイトのためのAIを統合。" },
      { title: "IoTコネクティビティ",    description: "リアルタイムで接続されたデバイスが、Acquafyプラットフォームを通じてリモート監視、アップデート、一元管理を実現。" },
      { title: "スマートインターフェース", description: "直感的な操作、リアルタイム情報、広告、ブランドユーザー向けインタラクティビティを備えたLCD IPS タッチスクリーン。" },
      { title: "完全なセキュリティ",     description: "データ保護、アクセス制御、暗号化、主要な国際セキュリティ・プライバシー基準への準拠。" },
      { title: "データ＆パフォーマンス", description: "使用状況指標、水質、収益、影響を含む完全なダッシュボードで、データ駆動型の戦略的意思決定を支援。" },
    ],
  },
  ko: {
    heading1: "기술이",
    heading2: " 만드는 차이",
    subtitle: "고급 하드웨어, 지능형 소프트웨어, 연결성을 결합한 완전한 솔루션을 개발하여 정수 및 영향 관리에서 최고의 경험을 제공합니다.",
    features: [
      { title: "고급 정수",         description: "다단계 여과 시스템이 불순물, 냄새, 중금속, 미생물을 제거하여 순수하고 알칼리성인 물을 보장합니다." },
      { title: "인공지능",          description: "수질 모니터링, 예측 유지보수, 최적화된 사용, 운영 및 성능 인사이트를 위한 통합 AI." },
      { title: "IoT 연결성",        description: "Acquafy 플랫폼을 통한 원격 모니터링, 업데이트, 중앙 집중식 관리로 실시간 연결된 기기." },
      { title: "스마트 인터페이스", description: "직관적인 경험, 실시간 정보, 광고, 브랜드 사용자 상호작용을 갖춘 LCD IPS 터치 스크린." },
      { title: "완전한 보안",       description: "데이터 보호, 접근 제어, 암호화 및 주요 국제 보안·개인정보 보호 표준 준수." },
      { title: "데이터 & 성능",     description: "사용 지표, 수질, 수익 및 영향을 포함한 완전한 대시보드로 데이터 기반 전략적 의사결정 지원." },
    ],
  },
  "pt-pt": {
    heading1: "Tecnologia",
    heading2: " que faz a diferença",
    subtitle: "Desenvolvemos soluções completas que unem hardware avançado, software inteligente e conectividade para oferecer a melhor experiência em purificação de água e gestão de impacto.",
    features: [
      { title: "Purificação Avançada",    description: "Sistemas de filtragem multi-etapas que removem impurezas, odores, metais pesados e microrganismos, garantindo água pura e alcalina." },
      { title: "Inteligência Artificial", description: "IA integrada para monitorização da água, manutenção preditiva, utilização optimizada e informações para operação e desempenho." },
      { title: "Conectividade IoT",       description: "Dispositivos ligados em tempo real, com monitorização remota, actualizações e gestão centralizada através da plataforma Acquafy." },
      { title: "Interface Inteligente",   description: "Ecrãs LCD IPS Touch com experiência intuitiva, informações em tempo real, anúncios e interactividade para utilizadores de marcas." },
      { title: "Segurança Total",         description: "Protecção de dados, controlo de acesso, encriptação e conformidade com as principais normas internacionais de segurança e privacidade." },
      { title: "Dados e Desempenho",      description: "Dashboards completos com indicadores de utilização, qualidade da água, receita e impacto para decisões estratégicas baseadas em dados." },
    ],
  },
};

function FeatureCard({ icon, aspectW, aspectH, title, description }: {
  icon: string; aspectW: number; aspectH: number; title: string; description: string;
}) {
  return (
    <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[265px] min-w-[150px] px-[10px] py-[20px] rounded-[16px]">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full min-h-[36px] flex items-center justify-center">
        {title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
        {description}
      </p>
    </div>
  );
}

export default function TecnologiaFazDiferenca() {
  const { lang } = useLang();
  const t = T[lang];

  const features = t.features.map((f, i) => {
    const icons = [
      { icon: imgPurif,  aspectW: 40, aspectH: 40 },
      { icon: imgBrain,  aspectW: 30, aspectH: 30 },
      { icon: imgIot,    aspectW: 30, aspectH: 20 },
      { icon: imgTela,   aspectW: 21, aspectH: 30 },
      { icon: imgShield, aspectW: 24, aspectH: 30 },
      { icon: imgScale,  aspectW: 30, aspectH: 30 },
    ];
    return { ...icons[i], ...f };
  });

  return (
    <section className="bg-white flex flex-col gap-[20px] items-center justify-center overflow-hidden px-[20px] py-[40px] relative w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] max-w-[800px] w-full">
            <span className="text-[#0569ff]">{t.heading1}</span>
            {t.heading2}
          </h2>
          <p
            className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] max-w-[800px] w-full"
            style={{ fontFeatureSettings: '"case" 1' }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Cards + Globe — flex-col mobile / flex-row desktop */}
        <div className="
          flex flex-col gap-[100px] items-center justify-center min-w-[240px] relative w-full
          md:content-center md:flex-row md:flex-wrap md:gap-[20px]
        ">

          {/* Cards grid */}
          <div className="content-start flex flex-wrap gap-[10px] items-start justify-center min-w-[180px] overflow-clip relative w-full md:flex-[1_0_0]">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* Globe — inline flex item, overflows 135px upward from h-[265px] container */}
          <div className="flex flex-col h-[265px] items-center justify-end max-w-[260px] min-h-[250px] min-w-[260px] relative w-full md:flex-[1_0_0]">
            <div className="mix-blend-multiply relative shrink-0 size-[400px]">
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgMagnific}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
