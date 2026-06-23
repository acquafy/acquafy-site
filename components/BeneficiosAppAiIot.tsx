"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Ícones dos cartões ────────────────────────────────────────────────────────
const imgProfile   = "/figma-assets/icon-profile-consumer.svg"; // consumidor
const imgParceria  = "/figma-assets/icon-parceiro.svg"; // parceiro
const imgPlanetWeb = "/figma-assets/icon-planetweb-operacao-global.svg"; // operação global

// ── Fotos dos cartões ─────────────────────────────────────────────────────────
const imgConsum1   = "/figma-assets/photo-consumer-woman.webp"; // mulher c/ phone
const imgConsum2   = "/figma-assets/photo-consumer-man.webp"; // homem
const imgGlobal    = "/figma-assets/image-global-map.webp"; // mapa global

type PersonCard = {
  layout: "person";
  icon: string;
  borderColor: string;
  titleColor: string;
  title: string;
  subtitle: string;
  desc: string;
  photo: string;
};

type MapCard = {
  layout: "map";
  icon: string;
  borderColor: string;
  titleColor: string;
  title: string;
  subtitle: string;
  desc: string;
  photo: string;
};

type CardDef = PersonCard | MapCard;

const T: Record<Lang, {
  heading: string;
  cards: { title: string; subtitle: string; desc: string }[];
}> = {
  pt: {
    heading: "Benefícios para clientes, parceiros e operadores",
    cards: [
      {
        title: "Consumidor",
        subtitle: "Facilidade, controle e tranquilidade",
        desc: "Tenha o controle total do seu purificador, receba alertas e garanta água pura com mais conforto e segurança.",
      },
      {
        title: "Parceiro",
        subtitle: "Visibilidade, suporte e operação conectada",
        desc: "Acompanhe seus clientes, receba insights e ofereça um atendimento mais ágil e eficiente.",
      },
      {
        title: "Operação Global",
        subtitle: "Padronização, escalabilidade e dados centralizados",
        desc: "Gerencie múltiplas unidades e mercados com dados unificados e processos padronizados.",
      },
    ],
  },
  en: {
    heading: "Benefits for customers, partners and operators",
    cards: [
      {
        title: "Consumer",
        subtitle: "Ease, control and peace of mind",
        desc: "Take full control of your purifier, receive alerts and ensure pure water with greater comfort and safety.",
      },
      {
        title: "Partner",
        subtitle: "Visibility, support and connected operations",
        desc: "Monitor your customers, receive insights and offer faster, more efficient service.",
      },
      {
        title: "Global Operations",
        subtitle: "Standardization, scalability and centralized data",
        desc: "Manage multiple units and markets with unified data and standardized processes.",
      },
    ],
  },
  "en-gb": {
    heading: "Benefits for customers, partners and operators",
    cards: [
      {
        title: "Consumer",
        subtitle: "Ease, control and peace of mind",
        desc: "Take full control of your purifier, receive alerts and ensure pure water with greater comfort and safety.",
      },
      {
        title: "Partner",
        subtitle: "Visibility, support and connected operations",
        desc: "Monitor your customers, receive insights and offer faster, more efficient service.",
      },
      {
        title: "Global Operations",
        subtitle: "Standardisation, scalability and centralised data",
        desc: "Manage multiple units and markets with unified data and standardised processes.",
      },
    ],
  },
  es: {
    heading: "Beneficios para clientes, socios y operadores",
    cards: [
      {
        title: "Consumidor",
        subtitle: "Facilidad, control y tranquilidad",
        desc: "Ten el control total de tu purificador, recibe alertas y garantiza agua pura con mayor comodidad y seguridad.",
      },
      {
        title: "Socio",
        subtitle: "Visibilidad, soporte y operación conectada",
        desc: "Acompaña a tus clientes, recibe insights y ofrece una atención más ágil y eficiente.",
      },
      {
        title: "Operación Global",
        subtitle: "Estandarización, escalabilidad y datos centralizados",
        desc: "Gestiona múltiples unidades y mercados con datos unificados y procesos estandarizados.",
      },
    ],
  },
  fr: {
    heading: "Avantages pour les clients, partenaires et opérateurs",
    cards: [
      {
        title: "Consommateur",
        subtitle: "Facilité, contrôle et tranquillité d'esprit",
        desc: "Prenez le contrôle total de votre purificateur, recevez des alertes et garantissez une eau pure avec plus de confort et de sécurité.",
      },
      {
        title: "Partenaire",
        subtitle: "Visibilité, support et opérations connectées",
        desc: "Suivez vos clients, recevez des insights et offrez un service plus rapide et plus efficace.",
      },
      {
        title: "Opérations Mondiales",
        subtitle: "Standardisation, évolutivité et données centralisées",
        desc: "Gérez plusieurs unités et marchés avec des données unifiées et des processus standardisés.",
      },
    ],
  },
  de: {
    heading: "Vorteile für Kunden, Partner und Betreiber",
    cards: [
      {
        title: "Verbraucher",
        subtitle: "Einfachheit, Kontrolle und Sicherheit",
        desc: "Behalten Sie die volle Kontrolle über Ihren Reiniger, erhalten Sie Benachrichtigungen und gewährleisten Sie reines Wasser mit mehr Komfort und Sicherheit.",
      },
      {
        title: "Partner",
        subtitle: "Transparenz, Support und vernetzte Abläufe",
        desc: "Beobachten Sie Ihre Kunden, erhalten Sie Insights und bieten Sie einen schnelleren, effizienteren Service.",
      },
      {
        title: "Globaler Betrieb",
        subtitle: "Standardisierung, Skalierbarkeit und zentralisierte Daten",
        desc: "Verwalten Sie mehrere Standorte und Märkte mit einheitlichen Daten und standardisierten Prozessen.",
      },
    ],
  },
  it: {
    heading: "Vantaggi per clienti, partner e operatori",
    cards: [
      {
        title: "Consumatore",
        subtitle: "Semplicità, controllo e tranquillità",
        desc: "Hai il pieno controllo del tuo purificatore, ricevi avvisi e garantisci acqua pura con maggiore comfort e sicurezza.",
      },
      {
        title: "Partner",
        subtitle: "Visibilità, supporto e operazioni connesse",
        desc: "Monitora i tuoi clienti, ricevi insights e offri un servizio più rapido ed efficiente.",
      },
      {
        title: "Operazioni Globali",
        subtitle: "Standardizzazione, scalabilità e dati centralizzati",
        desc: "Gestisci più unità e mercati con dati unificati e processi standardizzati.",
      },
    ],
  },
  zh: {
    heading: "为客户、合作伙伴和运营商带来的优势",
    cards: [
      {
        title: "消费者",
        subtitle: "便捷、掌控与安心",
        desc: "全面掌控您的净水器，接收提醒，以更高的舒适度和安全性确保饮水纯净。",
      },
      {
        title: "合作伙伴",
        subtitle: "可见性、支持与互联运营",
        desc: "监控您的客户，获取洞察，提供更快速、更高效的服务。",
      },
      {
        title: "全球运营",
        subtitle: "标准化、可扩展性与集中数据",
        desc: "通过统一数据和标准化流程管理多个业务单元和市场。",
      },
    ],
  },
  ja: {
    heading: "お客様、パートナー、オペレーターへのメリット",
    cards: [
      {
        title: "消費者",
        subtitle: "利便性、制御、そして安心感",
        desc: "浄水器を完全にコントロールし、アラートを受け取り、より快適で安全な純水をお届けします。",
      },
      {
        title: "パートナー",
        subtitle: "可視性、サポート、連携した運営",
        desc: "顧客を監視し、インサイトを受け取り、より迅速で効率的なサービスを提供します。",
      },
      {
        title: "グローバル運営",
        subtitle: "標準化、スケーラビリティ、集中データ管理",
        desc: "統一されたデータと標準化されたプロセスで複数の拠点と市場を管理します。",
      },
    ],
  },
  ko: {
    heading: "고객, 파트너 및 운영자를 위한 혜택",
    cards: [
      {
        title: "소비자",
        subtitle: "편리함, 제어, 그리고 안심",
        desc: "정수기를 완전히 제어하고, 알림을 받으며, 더 높은 편의성과 안전성으로 순수한 물을 보장하세요.",
      },
      {
        title: "파트너",
        subtitle: "가시성, 지원 및 연결된 운영",
        desc: "고객을 모니터링하고, 인사이트를 받으며, 더 빠르고 효율적인 서비스를 제공하세요.",
      },
      {
        title: "글로벌 운영",
        subtitle: "표준화, 확장성 및 중앙 집중식 데이터",
        desc: "통합된 데이터와 표준화된 프로세스로 여러 단위와 시장을 관리하세요.",
      },
    ],
  },
  sv: {
    heading: "Fördelar för kunder, partners och operatörer",
    cards: [
      {
        title: "Konsument",
        subtitle: "Enkelhet, kontroll och sinnesro",
        desc: "Ta full kontroll över din reningsapparat, ta emot varningar och säkerställ rent vatten med större komfort och säkerhet.",
      },
      {
        title: "Partner",
        subtitle: "Synlighet, support och sammankopplade operationer",
        desc: "Övervaka dina kunder, ta emot insikter och erbjud snabbare och mer effektiv service.",
      },
      {
        title: "Global Verksamhet",
        subtitle: "Standardisering, skalbarhet och centraliserad data",
        desc: "Hantera flera enheter och marknader med enhetliga data och standardiserade processer.",
      },
    ],
  },
  fi: {
    heading: "Hyödyt asiakkaille, kumppaneille ja operaattoreille",
    cards: [
      {
        title: "Kuluttaja",
        subtitle: "Helppous, hallinta ja mielenrauha",
        desc: "Hallitse puhdistintasi täysin, vastaanota hälytyksiä ja varmista puhdas vesi suuremmalla mukavuudella ja turvallisuudella.",
      },
      {
        title: "Kumppani",
        subtitle: "Näkyvyys, tuki ja yhdistetyt toiminnot",
        desc: "Seuraa asiakkaitasi, vastaanota oivalluksia ja tarjoa nopeampaa ja tehokkaampaa palvelua.",
      },
      {
        title: "Globaali Toiminta",
        subtitle: "Standardointi, skaalautuvuus ja keskitetty data",
        desc: "Hallitse useita yksiköitä ja markkinoita yhtenäisellä datalla ja standardoiduilla prosesseilla.",
      },
    ],
  },
  ru: {
    heading: "Преимущества для клиентов, партнёров и операторов",
    cards: [
      {
        title: "Потребитель",
        subtitle: "Простота, контроль и спокойствие",
        desc: "Полностью контролируйте свой очиститель, получайте оповещения и обеспечивайте чистую воду с большим комфортом и безопасностью.",
      },
      {
        title: "Партнёр",
        subtitle: "Видимость, поддержка и связанные операции",
        desc: "Отслеживайте своих клиентов, получайте аналитику и предоставляйте более быстрый и эффективный сервис.",
      },
      {
        title: "Глобальная Операция",
        subtitle: "Стандартизация, масштабируемость и централизованные данные",
        desc: "Управляйте несколькими подразделениями и рынками с единой базой данных и стандартизированными процессами.",
      },
    ],
  },
  ro: {
    heading: "Beneficii pentru clienti, parteneri si operatori",
    cards: [
      {
        title: "Consumator",
        subtitle: "Usurinta, control si liniste sufleteasca",
        desc: "Preia controlul deplin asupra purificatorului tau, primeste alerte si asigura apa pura cu mai mult confort si siguranta.",
      },
      {
        title: "Partener",
        subtitle: "Vizibilitate, suport si operatiuni conectate",
        desc: "Monitorizeaza-ti clientii, primeste informatii valoroase si ofera servicii mai rapide si mai eficiente.",
      },
      {
        title: "Operatiuni Globale",
        subtitle: "Standardizare, scalabilitate si date centralizate",
        desc: "Gestioneaza mai multe unitati si piete cu date unificate si procese standardizate.",
      },
    ],
  },
  he: {
    heading: "יתרונות ללקוחות, שותפים ומפעילים",
    cards: [
      {
        title: "צרכן",
        subtitle: "קלות, שליטה ושקט נפשי",
        desc: "קח שליטה מלאה על המטהר שלך, קבל התראות והבטח מים טהורים עם נוחות ובטיחות רבה יותר.",
      },
      {
        title: "שותף",
        subtitle: "נראות, תמיכה ופעילות מחוברת",
        desc: "עקוב אחר לקוחותיך, קבל תובנות והצע שירות מהיר ויעיל יותר.",
      },
      {
        title: "פעילות גלובלית",
        subtitle: "סטנדרטיזציה, מדרגיות ונתונים מרכזיים",
        desc: "נהל יחידות ושווקים מרובים עם נתונים מאוחדים ותהליכים מתוקננים.",
      },
    ],
  },
  "pt-pt": {
    heading: "Benefícios para clientes, parceiros e operadores",
    cards: [
      {
        title: "Consumidor",
        subtitle: "Facilidade, controlo e tranquilidade",
        desc: "Tenha o controlo total do seu purificador, receba alertas e garanta água pura com mais conforto e segurança.",
      },
      {
        title: "Parceiro",
        subtitle: "Visibilidade, suporte e operação conectada",
        desc: "Acompanhe os seus clientes, receba insights e ofereça um atendimento mais ágil e eficiente.",
      },
      {
        title: "Operação Global",
        subtitle: "Padronização, escalabilidade e dados centralizados",
        desc: "Gira múltiplas unidades e mercados com dados unificados e processos padronizados.",
      },
    ],
  },
};

function CardContent({ card }: { card: CardDef }) {
  return (
    <>
      {/* Ícone com borda colorida */}
      <div
        className="bg-white flex items-center justify-center size-[60px] rounded-[12px] shrink-0"
        style={{ border: `2px solid ${card.borderColor}` }}
      >
        <div className="size-[30px] flex items-center justify-center">
          <img src={card.icon} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      {/* Título + subtítulo */}
      <div className="flex flex-col gap-[10px] w-full">
        <p
          className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] w-full"
          style={{ color: card.titleColor }}
        >
          {card.title}
        </p>
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full min-h-[40px] flex items-center">
          {card.subtitle}
        </p>
      </div>

      {/* Descrição */}
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] w-full">
        {card.desc}
      </p>
    </>
  );
}

export default function BeneficiosAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const cards: CardDef[] = [
    {
      layout: "person",
      icon: imgProfile,
      borderColor: "#0569ff",
      titleColor: "#0569ff",
      title: t.cards[0].title,
      subtitle: t.cards[0].subtitle,
      desc: t.cards[0].desc,
      photo: imgConsum1,
    },
    {
      layout: "person",
      icon: imgParceria,
      borderColor: "#6e54ef",
      titleColor: "#6e54ef",
      title: t.cards[1].title,
      subtitle: t.cards[1].subtitle,
      desc: t.cards[1].desc,
      photo: imgConsum2,
    },
    {
      layout: "map",
      icon: imgPlanetWeb,
      borderColor: "#06ae4c",
      titleColor: "#06ae4c",
      title: t.cards[2].title,
      subtitle: t.cards[2].subtitle,
      desc: t.cards[2].desc,
      photo: imgGlobal,
    },
  ];

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
          {t.heading}
        </h2>

        {/* 3 cartões — flex-col abaixo de 1220px; flex-row a partir de 1220px
            Breakpoint: 3×380 + 2×20(gaps) + 2×20(padding) = 1220px */}
        <div className="flex flex-col gap-[20px] items-stretch w-full 1220:flex-row 1220:flex-wrap 1220:justify-center">
          {cards.map((card) => {
            if (card.layout === "person") {
              return (
                <div
                  key={card.title}
                  className="bg-white flex min-h-[260px] rounded-[16px] relative 1220:flex-[1_0_0] 1220:min-w-[380px]"
                >
                  {/* Conteúdo — pr-[180px] reserva espaço para a foto absoluta (160px + 20px gap) */}
                  <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start pl-[20px] py-[20px] pr-[180px]">
                    <CardContent card={card} />
                  </div>

                  {/* Foto — contida no bloco, pt-[10px], imagem alinhada ao rodapé com object-contain */}
                  <div
                    className="absolute right-0 inset-y-0 overflow-hidden pt-[10px]"
                    style={{ width: 160 }}
                  >
                    <img
                      src={card.photo}
                      alt={card.title}
                      className="w-full h-full object-contain object-bottom"
                    />
                  </div>
                </div>
              );
            }

            // layout === "map" — Operação Global (mantém layout original)
            return (
              <div
                key={card.title}
                className="bg-white flex flex-[1_0_0] flex-wrap gap-y-0 items-start min-w-[280px] relative rounded-[16px] 1220:min-w-[380px]"
              >
                {/* Conteúdo — mr-[-90px] faz o bloco do mapa iniciar 90px antes do fim do conteúdo */}
                <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] pl-[20px] py-[20px] mr-[-90px] relative z-[1]">
                  <CardContent card={card} />
                </div>

                {/* Mapa — self-stretch iguala a altura do card; justify-center centraliza verticalmente */}
                <div className="flex flex-[1_0_0] flex-col self-stretch items-end justify-center min-w-px py-[20px] relative">
                  <div
                    className="aspect-[4096/2591] max-h-[220px] mix-blend-multiply relative shrink-0 w-full"
                    style={{ maxWidth: 348, opacity: 0.49 }}
                  >
                    <img
                      src={card.photo}
                      alt=""
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
