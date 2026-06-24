"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Imagens de card ───────────────────────────────────────────────────────────
const imgFrame10    = "/figma-assets/frame-10-bg-blend.webp"; // bg mix-blend
const imgCheckin    = "/figma-assets/icon-check-bullet.svg"; // bullet 14px

// ── Ícones dos cards (todos com preserveAspectRatio="none") ───────────────────
const imgMobile     = "/figma-assets/icon-mobile-20px.svg";  // 20.2×28
const imgBrain      = "/figma-assets/icon-brain-32px.svg";  // 32×32
const imgWifi       = "/figma-assets/icon-wifi-32px.svg";  // 32×22
const imgPessoas    = "/figma-assets/icon-pessoas-32px.svg";  // 32×29.7

// ── Imagens bottom dos cards ──────────────────────────────────────────────────
const imgAppPhone   = "/figma-assets/app-phone-mockup-a.webp";
const imgAiApp      = "/figma-assets/app-ai-screenshot.webp";
const imgIotApp     = "/figma-assets/app-iot-screen.webp";
const imgCloudApp   = "/figma-assets/app-cloud-screen.webp";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  cards: { icon: string; aspectW: number; aspectH: number; title: string; items: string[]; img: string }[];
}> = {
  pt: {
    heading1: "O que você pode fazer com o ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Visualizar equipamento e status",
          "Histórico de consumo e uso",
          "Recursos e informações técnicas",
          "Suporte e manuais",
          "Notificações e alertas",
          "Preferências e configurações",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Insights automáticos e preditivos",
          "Recomendações personalizadas",
          "Detecção de padrões e anomalias",
          "Resumo inteligente da operação",
          "Assistente de operação com IA",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Dispositivos",
        items: [
          "Sensores conectados e telemetria",
          "Status online / offline",
          "Dados em tempo real",
          "Manutenção preventiva",
          "Alertas críticos de operação",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Operação integrada",
        items: [
          "Integração com a Plataforma Acquafy",
          "Rede de parceiros e instaladores",
          "Gestão de vendas e pedidos",
          "Mídia, campanhas e conteúdos",
          "Gestão global e multi-idioma",
        ],
        img: imgCloudApp,
      },
    ],
  },
  en: {
    heading1: "What you can do with the ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "View equipment and status",
          "Consumption and usage history",
          "Resources and technical information",
          "Support and manuals",
          "Notifications and alerts",
          "Preferences and settings",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Automatic and predictive insights",
          "Personalized recommendations",
          "Pattern and anomaly detection",
          "Smart operation summary",
          "AI-powered operation assistant",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Devices",
        items: [
          "Connected sensors and telemetry",
          "Online / offline status",
          "Real-time data",
          "Preventive maintenance",
          "Critical operation alerts",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Integrated operation",
        items: [
          "Integration with the Acquafy Platform",
          "Partner and installer network",
          "Sales and order management",
          "Media, campaigns and content",
          "Global and multi-language management",
        ],
        img: imgCloudApp,
      },
    ],
  },
  "en-gb": {
    heading1: "What you can do with the ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "View equipment and status",
          "Consumption and usage history",
          "Resources and technical information",
          "Support and manuals",
          "Notifications and alerts",
          "Preferences and settings",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Automatic and predictive insights",
          "Personalised recommendations",
          "Pattern and anomaly detection",
          "Smart operation summary",
          "AI-powered operation assistant",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Devices",
        items: [
          "Connected sensors and telemetry",
          "Online / offline status",
          "Real-time data",
          "Preventive maintenance",
          "Critical operation alerts",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Integrated operation",
        items: [
          "Integration with the Acquafy Platform",
          "Partner and installer network",
          "Sales and order management",
          "Media, campaigns and content",
          "Global and multi-language management",
        ],
        img: imgCloudApp,
      },
    ],
  },
  es: {
    heading1: "Lo que puedes hacer con la ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Visualizar equipo y estado",
          "Historial de consumo y uso",
          "Recursos e información técnica",
          "Soporte y manuales",
          "Notificaciones y alertas",
          "Preferencias y configuración",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Insights automáticos y predictivos",
          "Recomendaciones personalizadas",
          "Detección de patrones y anomalías",
          "Resumen inteligente de la operación",
          "Asistente de operación con IA",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Dispositivos",
        items: [
          "Sensores conectados y telemetría",
          "Estado online / offline",
          "Datos en tiempo real",
          "Mantenimiento preventivo",
          "Alertas críticas de operación",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Operación integrada",
        items: [
          "Integración con la Plataforma Acquafy",
          "Red de socios e instaladores",
          "Gestión de ventas y pedidos",
          "Medios, campañas y contenidos",
          "Gestión global y multi-idioma",
        ],
        img: imgCloudApp,
      },
    ],
  },
  fr: {
    heading1: "Ce que vous pouvez faire avec l'",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Visualiser l'équipement et l'état",
          "Historique de consommation et d'utilisation",
          "Ressources et informations techniques",
          "Support et manuels",
          "Notifications et alertes",
          "Préférences et paramètres",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Insights automatiques et prédictifs",
          "Recommandations personnalisées",
          "Détection de modèles et d'anomalies",
          "Résumé intelligent des opérations",
          "Assistant d'exploitation basé sur l'IA",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Appareils",
        items: [
          "Capteurs connectés et télémétrie",
          "État en ligne / hors ligne",
          "Données en temps réel",
          "Maintenance préventive",
          "Alertes critiques d'exploitation",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Opération intégrée",
        items: [
          "Intégration avec la Plateforme Acquafy",
          "Réseau de partenaires et d'installateurs",
          "Gestion des ventes et des commandes",
          "Médias, campagnes et contenus",
          "Gestion mondiale et multilingue",
        ],
        img: imgCloudApp,
      },
    ],
  },
  de: {
    heading1: "Was Sie mit der ",
    heading2: "App + AI + IoT machen können",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Gerät und Status anzeigen",
          "Verbrauchs- und Nutzungsverlauf",
          "Ressourcen und technische Informationen",
          "Support und Handbücher",
          "Benachrichtigungen und Alarme",
          "Einstellungen und Präferenzen",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Automatische und prädiktive Insights",
          "Personalisierte Empfehlungen",
          "Muster- und Anomalieerkennung",
          "Intelligente Betriebszusammenfassung",
          "KI-gestützter Betriebsassistent",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Geräte",
        items: [
          "Vernetzte Sensoren und Telemetrie",
          "Online- / Offline-Status",
          "Echtzeit-Daten",
          "Vorbeugende Wartung",
          "Kritische Betriebsmeldungen",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Integrierter Betrieb",
        items: [
          "Integration mit der Acquafy-Plattform",
          "Partner- und Installateurnetzwerk",
          "Vertriebs- und Auftragsverwaltung",
          "Medien, Kampagnen und Inhalte",
          "Globales und mehrsprachiges Management",
        ],
        img: imgCloudApp,
      },
    ],
  },
  it: {
    heading1: "Cosa puoi fare con ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Visualizzare attrezzatura e stato",
          "Storico dei consumi e dell'utilizzo",
          "Risorse e informazioni tecniche",
          "Supporto e manuali",
          "Notifiche e avvisi",
          "Preferenze e impostazioni",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Insights automatici e predittivi",
          "Raccomandazioni personalizzate",
          "Rilevamento di modelli e anomalie",
          "Riepilogo intelligente delle operazioni",
          "Assistente operativo con IA",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Dispositivi",
        items: [
          "Sensori connessi e telemetria",
          "Stato online / offline",
          "Dati in tempo reale",
          "Manutenzione preventiva",
          "Avvisi critici di operazione",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Operazione integrata",
        items: [
          "Integrazione con la Piattaforma Acquafy",
          "Rete di partner e installatori",
          "Gestione vendite e ordini",
          "Media, campagne e contenuti",
          "Gestione globale e multilingua",
        ],
        img: imgCloudApp,
      },
    ],
  },
  zh: {
    heading1: "您可以通过 ",
    heading2: "App + AI + IoT 实现什么",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "查看设备和状态",
          "消耗和使用历史记录",
          "资源和技术信息",
          "支持与手册",
          "通知和提醒",
          "偏好设置",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "自动和预测性洞察",
          "个性化推荐",
          "模式和异常检测",
          "智能运营摘要",
          "AI 驱动的运营助手",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & 设备",
        items: [
          "连接传感器和遥测",
          "在线 / 离线状态",
          "实时数据",
          "预防性维护",
          "关键运营提醒",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "集成运营",
        items: [
          "与 Acquafy 平台集成",
          "合作伙伴和安装商网络",
          "销售和订单管理",
          "媒体、活动和内容",
          "全球多语言管理",
        ],
        img: imgCloudApp,
      },
    ],
  },
  ja: {
    heading1: "",
    heading2: "App + AI + IoT でできること",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "機器とステータスの確認",
          "消費・使用履歴",
          "リソースと技術情報",
          "サポートとマニュアル",
          "通知とアラート",
          "設定と環境設定",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "自動および予測インサイト",
          "パーソナライズされた推奨事項",
          "パターンと異常の検出",
          "スマートな運営サマリー",
          "AI搭載の運営アシスタント",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & デバイス",
        items: [
          "接続センサーとテレメトリー",
          "オンライン / オフラインステータス",
          "リアルタイムデータ",
          "予防保全",
          "重要な運営アラート",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "統合運営",
        items: [
          "Acquafy プラットフォームとの統合",
          "パートナーおよびインストーラーネットワーク",
          "販売および注文管理",
          "メディア、キャンペーン、コンテンツ",
          "グローバルおよび多言語管理",
        ],
        img: imgCloudApp,
      },
    ],
  },
  ko: {
    heading1: "",
    heading2: "App + AI + IoT 로 할 수 있는 것",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "장비 및 상태 확인",
          "소비 및 사용 내역",
          "리소스 및 기술 정보",
          "지원 및 매뉴얼",
          "알림 및 경고",
          "환경 설정",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "자동 및 예측 인사이트",
          "개인화된 추천",
          "패턴 및 이상 감지",
          "스마트 운영 요약",
          "AI 기반 운영 어시스턴트",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & 기기",
        items: [
          "연결된 센서 및 원격 측정",
          "온라인 / 오프라인 상태",
          "실시간 데이터",
          "예방 유지보수",
          "중요 운영 경고",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "통합 운영",
        items: [
          "Acquafy 플랫폼과 통합",
          "파트너 및 설치업체 네트워크",
          "판매 및 주문 관리",
          "미디어, 캠페인 및 콘텐츠",
          "글로벌 및 다국어 관리",
        ],
        img: imgCloudApp,
      },
    ],
  },
  sv: {
    heading1: "Vad du kan göra med ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Visa utrustning och status",
          "Förbruknings- och användarhistorik",
          "Resurser och teknisk information",
          "Support och manualer",
          "Aviseringar och larm",
          "Inställningar och preferenser",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Automatiska och prediktiva insikter",
          "Personliga rekommendationer",
          "Mönster- och avvikelsedetektering",
          "Smart driftssammanfattning",
          "AI-driven driftsassistent",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Enheter",
        items: [
          "Anslutna sensorer och telemetri",
          "Online- / offlinestatus",
          "Realtidsdata",
          "Förebyggande underhåll",
          "Kritiska driftslarm",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Integrerad drift",
        items: [
          "Integration med Acquafy-plattformen",
          "Partner- och installatörsnätverk",
          "Försäljnings- och orderhantering",
          "Media, kampanjer och innehåll",
          "Global och flerspråkig hantering",
        ],
        img: imgCloudApp,
      },
    ],
  },
  fi: {
    heading1: "Mitä voit tehdä ",
    heading2: "App + AI + IoT:lla",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Tarkastele laitteita ja tilaa",
          "Kulutus- ja käyttöhistoria",
          "Resurssit ja tekniset tiedot",
          "Tuki ja käyttöoppaat",
          "Ilmoitukset ja hälytykset",
          "Asetukset ja mieltymykset",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Automaattiset ja ennakoivat oivallukset",
          "Personoidut suositukset",
          "Kuvioiden ja poikkeamien tunnistus",
          "Älykäs toimintayhteenveto",
          "Tekoälypohjainen toiminta-assistentti",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Laitteet",
        items: [
          "Yhdistetyt anturit ja telemetria",
          "Online- / offline-tila",
          "Reaaliaikaiset tiedot",
          "Ennaltaehkäisevä huolto",
          "Kriittiset toimintahälytykset",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Integroitu toiminta",
        items: [
          "Integraatio Acquafy-alustaan",
          "Kumppani- ja asentajaverkosto",
          "Myynti- ja tilaustenhallinta",
          "Media, kampanjat ja sisällöt",
          "Globaali ja monikielinen hallinta",
        ],
        img: imgCloudApp,
      },
    ],
  },
  ru: {
    heading1: "Что вы можете делать с ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Просматривать оборудование и статус",
          "История потребления и использования",
          "Ресурсы и техническая информация",
          "Поддержка и руководства",
          "Уведомления и оповещения",
          "Настройки и предпочтения",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Автоматические и предиктивные инсайты",
          "Персонализированные рекомендации",
          "Обнаружение паттернов и аномалий",
          "Умная сводка операций",
          "Операционный ассистент на базе ИИ",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Устройства",
        items: [
          "Подключенные датчики и телеметрия",
          "Статус онлайн / офлайн",
          "Данные в реальном времени",
          "Профилактическое обслуживание",
          "Критические операционные оповещения",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Интегрированная операция",
        items: [
          "Интеграция с платформой Acquafy",
          "Сеть партнеров и установщиков",
          "Управление продажами и заказами",
          "Медиа, кампании и контент",
          "Глобальное и многоязычное управление",
        ],
        img: imgCloudApp,
      },
    ],
  },
  ro: {
    heading1: "Ce poti face cu ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Vizualizeaza echipamente si status",
          "Istoricul consumului si utilizarii",
          "Resurse si informatii tehnice",
          "Suport si manuale",
          "Notificari si alerte",
          "Preferinte si setari",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Informatii automate si predictive",
          "Recomandari personalizate",
          "Detectarea tiparelor si anomaliilor",
          "Rezumat inteligent al operatiunii",
          "Asistent de operare bazat pe AI",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Dispozitive",
        items: [
          "Senzori conectati si telemetrie",
          "Status online / offline",
          "Date in timp real",
          "Intretinere preventiva",
          "Alerte critice de operare",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Operatiune integrata",
        items: [
          "Integrare cu Platforma Acquafy",
          "Retea de parteneri si instalatori",
          "Gestionarea vanzarilor si comenzilor",
          "Media, campanii si continut",
          "Gestionare globala si multilingva",
        ],
        img: imgCloudApp,
      },
    ],
  },
  he: {
    heading1: "מה אתה יכול לעשות עם ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "צפייה בציוד וסטטוס",
          "היסטוריית צריכה ושימוש",
          "משאבים ומידע טכני",
          "תמיכה ומדריכים",
          "התראות והודעות",
          "העדפות והגדרות",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "תובנות אוטומטיות וחזויות",
          "המלצות מותאמות אישית",
          "זיהוי דפוסים וחריגות",
          "סיכום תפעולי חכם",
          "עוזר תפעולי מבוסס בינה מלאכותית",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & מכשירים",
        items: [
          "חיישנים מחוברים וטלמטריה",
          "סטטוס מקוון / לא מקוון",
          "נתונים בזמן אמת",
          "תחזוקה מונעת",
          "התראות תפעוליות קריטיות",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "פעולה משולבת",
        items: [
          "אינטגרציה עם פלטפורמת Acquafy",
          "רשת שותפים ומתקינים",
          "ניהול מכירות והזמנות",
          "מדיה, קמפיינים ותכנים",
          "ניהול גלובלי ורב-לשוני",
        ],
        img: imgCloudApp,
      },
    ],
  },
  "pt-pt": {
    heading1: "O que pode fazer com a ",
    heading2: "App + AI + IoT",
    cards: [
      {
        icon: imgMobile, aspectW: 20.2, aspectH: 28,
        title: "App Acquafy",
        items: [
          "Visualizar equipamento e estado",
          "Histórico de consumo e utilização",
          "Recursos e informações técnicas",
          "Suporte e manuais",
          "Notificações e alertas",
          "Preferências e configurações",
        ],
        img: imgAppPhone,
      },
      {
        icon: imgBrain, aspectW: 32, aspectH: 32,
        title: "Acquafy AI",
        items: [
          "Insights automáticos e preditivos",
          "Recomendações personalizadas",
          "Deteção de padrões e anomalias",
          "Resumo inteligente da operação",
          "Assistente de operação com AI",
        ],
        img: imgAiApp,
      },
      {
        icon: imgWifi, aspectW: 32, aspectH: 22,
        title: "IoT & Dispositivos",
        items: [
          "Sensores conectados e telemetria",
          "Estado online / offline",
          "Dados em tempo real",
          "Manutenção preventiva",
          "Alertas críticos de operação",
        ],
        img: imgIotApp,
      },
      {
        icon: imgPessoas, aspectW: 32, aspectH: 29.7,
        title: "Operação integrada",
        items: [
          "Integração com a Plataforma Acquafy",
          "Rede de parceiros e instaladores",
          "Gestão de vendas e encomendas",
          "Média, campanhas e conteúdos",
          "Gestão global e multi-idioma",
        ],
        img: imgCloudApp,
      },
    ],
  },
};

export default function FeaturesAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];
  const cards = t.cards;

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        {/* Grid de cards */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col items-center min-h-[540px] min-w-[280px] overflow-clip rounded-[16px]"
            >
              {/* Conteúdo superior */}
              <div className="flex flex-col gap-[20px] items-start p-[20px] w-full">

                {/* Header: ícone + título */}
                <div className="flex gap-[20px] items-center w-full shrink-0">
                  <div className="flex items-center justify-center size-[60px] rounded-[12px] bg-[#0569ff] shrink-0">
                    <FigmaIcon src={card.icon} size={30} aspectW={card.aspectW} aspectH={card.aspectH} />
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] flex-1 min-h-[44px] flex items-center">
                    {card.title}
                  </p>
                </div>

                {/* Checklist */}
                <div className="flex flex-col gap-[20px] items-start w-full">
                  {card.items.map((text) => (
                    <div key={text} className="flex gap-[10px] items-center w-full">
                      <div className="size-[14px] shrink-0 flex items-center justify-center">
                        <img src={imgCheckin} alt="" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] flex-1">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Imagem inferior com mix-blend-multiply */}
              <div className="relative flex flex-col items-center justify-center min-h-[220px] overflow-clip w-full flex-1 mix-blend-multiply">
                <img
                  src={imgFrame10}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <img
                  src={card.img}
                  alt={card.title}
                  className="relative max-h-[200px] max-w-[195px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
