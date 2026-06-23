"use client";

import { useState } from "react";
import { useLang, type Lang } from "@/context/LanguageContext";
import FigmaIcon from "./FigmaIcon";
import TopicPopup from "./TopicPopup";

const imgArrowBlue = "/figma-assets/icon-arrow-blue-b.svg";

const imgAguaPura   = "/figma-assets/icon-agua-pura.svg";
const imgMobile     = "/figma-assets/icon-mobile-b.svg";
const imgMedia      = "/figma-assets/icon-media.svg";
const imgParceria   = "/figma-assets/icon-parceria-a.svg";
const imgMoney      = "/figma-assets/icon-money-b.svg";
const imgManutencao = "/figma-assets/icon-manutencao.svg";

const topicsMeta = [
  { icon: imgAguaPura,   aspectW: 642.7, aspectH: 630.7, categorySlug: "produtos" },
  { icon: imgMobile,     aspectW: 21,    aspectH: 30,    categorySlug: "app-ai-iot" },
  { icon: imgMedia,      aspectW: 30,    aspectH: 30,    categorySlug: "media-network" },
  { icon: imgParceria,   aspectW: 1125,  aspectH: 1078,  categorySlug: "parceiros" },
  { icon: imgMoney,      aspectW: 33.3,  aspectH: 30,    categorySlug: "faturamento" },
  { icon: imgManutencao, aspectW: 30,    aspectH: 30,    categorySlug: "instalacao-e-manutencao" },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  cta: string;
  topics: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Como",
    heading2: "podemos ajudar?",
    subtitle: "Escolha o assunto para encontrar as melhores soluções.",
    cta: "Ver tópicos",
    topics: [
      { title: "Produtos",                desc: "Informações sobre Linha Neo, Acquafy Media, filtros acessórios e especificações." },
      { title: "App + AI + IoT",          desc: "Suporte ao aplicativo, conectividade, sensores, IA e integração IoT." },
      { title: "Media Network",           desc: "Dúvidas sobre anúncios, QR Codes, campanhas e receita recorrente." },
      { title: "Parceiros",               desc: "Informações para parceiros, Gold Partner, contratos e materiais de apoio." },
      { title: "Faturamento",             desc: "Dúvidas sobre pedidos, faturas, pagamentos e comissões." },
      { title: "Instalação e Manutenção", desc: "Instalação, manutenção preventiva, limpeza e suporte técnico." },
    ],
  },
  en: {
    heading1: "How Can",
    heading2: "We Help You?",
    subtitle: "Choose a topic to find the best solutions.",
    cta: "View topics",
    topics: [
      { title: "Products",                 desc: "Information about the Neo Line, Acquafy Media, filter accessories and specifications." },
      { title: "App + AI + IoT",           desc: "App support, connectivity, sensors, AI and IoT integration." },
      { title: "Media Network",            desc: "Questions about ads, QR Codes, campaigns and recurring revenue." },
      { title: "Partners",                 desc: "Information for partners, Gold Partner, contracts and support materials." },
      { title: "Billing",                  desc: "Questions about orders, invoices, payments and commissions." },
      { title: "Installation & Maintenance", desc: "Installation, preventive maintenance, cleaning and technical support." },
    ],
  },
  "en-gb": {
    heading1: "How Can",
    heading2: "We Help You?",
    subtitle: "Choose a topic to find the best solutions.",
    cta: "View topics",
    topics: [
      { title: "Products",                 desc: "Information about the Neo Line, Acquafy Media, filter accessories and specifications." },
      { title: "App + AI + IoT",           desc: "App support, connectivity, sensors, AI and IoT integration." },
      { title: "Media Network",            desc: "Questions about adverts, QR Codes, campaigns and recurring revenue." },
      { title: "Partners",                 desc: "Information for partners, Gold Partner, contracts and support materials." },
      { title: "Billing",                  desc: "Questions about orders, invoices, payments and commissions." },
      { title: "Installation & Maintenance", desc: "Installation, preventive maintenance, cleaning and technical support." },
    ],
  },
  es: {
    heading1: "¿Cómo Podemos",
    heading2: "Ayudarte?",
    subtitle: "Elige el tema para encontrar las mejores soluciones.",
    cta: "Ver temas",
    topics: [
      { title: "Productos",                   desc: "Información sobre la Línea Neo, Acquafy Media, filtros accesorios y especificaciones." },
      { title: "App + AI + IoT",              desc: "Soporte a la aplicación, conectividad, sensores, IA e integración IoT." },
      { title: "Media Network",               desc: "Dudas sobre anuncios, QR Codes, campañas e ingresos recurrentes." },
      { title: "Socios",                      desc: "Información para socios, Gold Partner, contratos y materiales de apoyo." },
      { title: "Facturación",                 desc: "Dudas sobre pedidos, facturas, pagos y comisiones." },
      { title: "Instalación y Mantenimiento", desc: "Instalación, mantenimiento preventivo, limpieza y soporte técnico." },
    ],
  },
  fr: {
    heading1: "Comment Pouvons-Nous",
    heading2: "Vous Aider ?",
    subtitle: "Choisissez un sujet pour trouver les meilleures solutions.",
    cta: "Voir les sujets",
    topics: [
      { title: "Produits",                    desc: "Informations sur la gamme Neo, Acquafy Media, filtres accessoires et spécifications." },
      { title: "App + AI + IoT",              desc: "Support de l'application, connectivité, capteurs, IA et intégration IoT." },
      { title: "Media Network",               desc: "Questions sur les annonces, QR Codes, campagnes et revenus récurrents." },
      { title: "Partenaires",                 desc: "Informations pour les partenaires, Gold Partner, contrats et matériaux de support." },
      { title: "Facturation",                 desc: "Questions sur les commandes, factures, paiements et commissions." },
      { title: "Installation et Maintenance", desc: "Installation, maintenance préventive, nettoyage et support technique." },
    ],
  },
  de: {
    heading1: "Wie Können Wir",
    heading2: "Ihnen Helfen?",
    subtitle: "Wählen Sie ein Thema, um die besten Lösungen zu finden.",
    cta: "Themen anzeigen",
    topics: [
      { title: "Produkte",                    desc: "Informationen zur Neo-Linie, Acquafy Media, Filterzubehör und Spezifikationen." },
      { title: "App + AI + IoT",              desc: "App-Support, Konnektivität, Sensoren, KI und IoT-Integration." },
      { title: "Media Network",               desc: "Fragen zu Anzeigen, QR-Codes, Kampagnen und wiederkehrenden Einnahmen." },
      { title: "Partner",                     desc: "Informationen für Partner, Gold Partner, Verträge und Supportmaterialien." },
      { title: "Abrechnung",                  desc: "Fragen zu Bestellungen, Rechnungen, Zahlungen und Provisionen." },
      { title: "Installation und Wartung",    desc: "Installation, vorbeugende Wartung, Reinigung und technischer Support." },
    ],
  },
  it: {
    heading1: "Come Possiamo",
    heading2: "Aiutarti?",
    subtitle: "Scegli un argomento per trovare le migliori soluzioni.",
    cta: "Vedi argomenti",
    topics: [
      { title: "Prodotti",                    desc: "Informazioni sulla Linea Neo, Acquafy Media, filtri accessori e specifiche." },
      { title: "App + AI + IoT",              desc: "Supporto all'applicazione, connettività, sensori, IA e integrazione IoT." },
      { title: "Media Network",               desc: "Domande su annunci, QR Code, campagne e entrate ricorrenti." },
      { title: "Partner",                     desc: "Informazioni per i partner, Gold Partner, contratti e materiali di supporto." },
      { title: "Fatturazione",                desc: "Domande su ordini, fatture, pagamenti e commissioni." },
      { title: "Installazione e Manutenzione", desc: "Installazione, manutenzione preventiva, pulizia e supporto tecnico." },
    ],
  },
  zh: {
    heading1: "我们如何",
    heading2: "为您提供帮助？",
    subtitle: "选择一个主题以找到最佳解决方案。",
    cta: "查看主题",
    topics: [
      { title: "产品",                         desc: "关于 Neo 系列、Acquafy Media、滤芯配件和规格的信息。" },
      { title: "App + AI + IoT",              desc: "应用支持、连接性、传感器、AI 和物联网集成。" },
      { title: "Media Network",               desc: "关于广告、二维码、营销活动和持续收入的问题。" },
      { title: "合作伙伴",                     desc: "合作伙伴信息、Gold Partner、合同和支持材料。" },
      { title: "账单",                         desc: "关于订单、发票、付款和佣金的问题。" },
      { title: "安装与维护",                   desc: "安装、预防性维护、清洁和技术支持。" },
    ],
  },
  ja: {
    heading1: "どのように",
    heading2: "お役に立てますか？",
    subtitle: "最適なソリューションを見つけるためのトピックを選択してください。",
    cta: "トピックを見る",
    topics: [
      { title: "製品",                         desc: "Neo ライン、Acquafy Media、フィルターアクセサリー、仕様に関する情報。" },
      { title: "App + AI + IoT",              desc: "アプリサポート、接続性、センサー、AI、IoT 統合。" },
      { title: "Media Network",               desc: "広告、QR コード、キャンペーン、継続収益に関するご質問。" },
      { title: "パートナー",                   desc: "パートナー情報、Gold Partner、契約、サポート資料。" },
      { title: "請求",                         desc: "注文、請求書、支払い、コミッションに関するご質問。" },
      { title: "設置とメンテナンス",            desc: "設置、予防保守、クリーニング、技術サポート。" },
    ],
  },
  ko: {
    heading1: "어떻게",
    heading2: "도와드릴까요?",
    subtitle: "최선의 해결책을 찾기 위한 주제를 선택하세요.",
    cta: "주제 보기",
    topics: [
      { title: "제품",                          desc: "Neo 라인, Acquafy Media, 필터 액세서리 및 사양에 관한 정보." },
      { title: "App + AI + IoT",              desc: "앱 지원, 연결성, 센서, AI 및 IoT 통합." },
      { title: "Media Network",               desc: "광고, QR 코드, 캠페인 및 지속적인 수익에 관한 질문." },
      { title: "파트너",                        desc: "파트너 정보, Gold Partner, 계약 및 지원 자료." },
      { title: "청구",                          desc: "주문, 청구서, 결제 및 커미션에 관한 질문." },
      { title: "설치 및 유지보수",              desc: "설치, 예방 유지보수, 청소 및 기술 지원." },
    ],
  },
  sv: {
    heading1: "Hur Kan Vi",
    heading2: "Hjälpa Dig?",
    subtitle: "Välj ett ämne för att hitta de bästa lösningarna.",
    cta: "Visa ämnen",
    topics: [
      { title: "Produkter",                   desc: "Information om Neo-linjen, Acquafy Media, filteraccessoarer och specifikationer." },
      { title: "App + AI + IoT",              desc: "Appstöd, anslutning, sensorer, AI och IoT-integration." },
      { title: "Media Network",               desc: "Frågor om annonser, QR-koder, kampanjer och återkommande intäkter." },
      { title: "Partners",                    desc: "Information för partners, Gold Partner, kontrakt och supportmaterial." },
      { title: "Fakturering",                 desc: "Frågor om beställningar, fakturor, betalningar och provisioner." },
      { title: "Installation och Underhåll",  desc: "Installation, förebyggande underhåll, rengöring och teknisk support." },
    ],
  },
  fi: {
    heading1: "Kuinka Voimme",
    heading2: "Auttaa Sinua?",
    subtitle: "Valitse aihe löytääksesi parhaat ratkaisut.",
    cta: "Näytä aiheet",
    topics: [
      { title: "Tuotteet",                    desc: "Tietoja Neo-linjasta, Acquafy Mediasta, suodatintarvikkeista ja teknisistä tiedoista." },
      { title: "App + AI + IoT",              desc: "Sovellustuki, yhdistettavyys, anturit, tekoäly ja IoT-integraatio." },
      { title: "Media Network",               desc: "Kysymyksiä mainoksista, QR-koodeista, kampanjoista ja toistuvista tuloista." },
      { title: "Kumppanit",                   desc: "Tietoja kumppaneille, Gold Partner, sopimukset ja tukimateriaalit." },
      { title: "Laskutus",                    desc: "Kysymyksiä tilauksista, laskuista, maksuista ja provisioista." },
      { title: "Asennus ja Huolto",           desc: "Asennus, ennaltaehkäisevä huolto, puhdistus ja tekninen tuki." },
    ],
  },
  ru: {
    heading1: "Как Мы Можем",
    heading2: "Вам Помочь?",
    subtitle: "Выберите тему, чтобы найти лучшие решения.",
    cta: "Смотреть темы",
    topics: [
      { title: "Продукты",                    desc: "Информация о линейке Neo, Acquafy Media, фильтрах, аксессуарах и характеристиках." },
      { title: "App + AI + IoT",              desc: "Поддержка приложения, подключение, датчики, ИИ и интеграция IoT." },
      { title: "Media Network",               desc: "Вопросы о рекламе, QR-кодах, кампаниях и регулярном доходе." },
      { title: "Партнеры",                    desc: "Информация для партнеров, Gold Partner, контракты и вспомогательные материалы." },
      { title: "Выставление счетов",          desc: "Вопросы о заказах, счетах, платежах и комиссиях." },
      { title: "Установка и Обслуживание",    desc: "Установка, профилактическое обслуживание, чистка и техническая поддержка." },
    ],
  },
  ro: {
    heading1: "Cum Te Putem",
    heading2: "Ajuta?",
    subtitle: "Alege un subiect pentru a gasi cele mai bune solutii.",
    cta: "Vezi subiectele",
    topics: [
      { title: "Produse",                     desc: "Informatii despre Linia Neo, Acquafy Media, accesorii filtre si specificatii." },
      { title: "App + AI + IoT",              desc: "Suport aplicatie, conectivitate, senzori, AI si integrare IoT." },
      { title: "Media Network",               desc: "Intrebari despre reclame, coduri QR, campanii si venituri recurente." },
      { title: "Parteneri",                   desc: "Informatii pentru parteneri, Gold Partner, contracte si materiale de suport." },
      { title: "Facturare",                   desc: "Intrebari despre comenzi, facturi, plati si comisioane." },
      { title: "Instalare si Intretinere",    desc: "Instalare, intretinere preventiva, curatare si suport tehnic." },
    ],
  },
  he: {
    heading1: "כיצד נוכל",
    heading2: "לעזור לך?",
    subtitle: "בחר נושא כדי למצוא את הפתרונות הטובים ביותר.",
    cta: "צפה בנושאים",
    topics: [
      { title: "מוצרים",                      desc: "מידע על קו Neo, Acquafy Media, אביזרי מסנן ומפרטים טכניים." },
      { title: "App + AI + IoT",              desc: "תמיכה באפליקציה, קישוריות, חיישנים, בינה מלאכותית ואינטגרציית IoT." },
      { title: "Media Network",               desc: "שאלות על מודעות, קודי QR, קמפיינים והכנסות חוזרות." },
      { title: "שותפים",                      desc: "מידע לשותפים, Gold Partner, חוזים וחומרי תמיכה." },
      { title: "חיוב",                        desc: "שאלות על הזמנות, חשבוניות, תשלומים ועמלות." },
      { title: "התקנה ותחזוקה",               desc: "התקנה, תחזוקה מונעת, ניקוי ותמיכה טכנית." },
    ],
  },

  "pt-pt": {
    heading1: "Como",
    heading2: "podemos ajudar?",
    subtitle: "Escolha o assunto para encontrar as melhores soluções.",
    cta: "Ver tópicos",
    topics: [
      { title: "Produtos",                desc: "Informações sobre a Linha Neo, Acquafy Media, filtros, acessórios e especificações." },
      { title: "App + AI + IoT",          desc: "Suporte à aplicação, conectividade, sensores, IA e integração IoT." },
      { title: "Media Network",           desc: "Dúvidas sobre anúncios, QR Codes, campanhas e receita recorrente." },
      { title: "Parceiros",               desc: "Informações para parceiros, Gold Partner, contratos e materiais de apoio." },
      { title: "Faturação",               desc: "Dúvidas sobre encomendas, faturas, pagamentos e comissões." },
      { title: "Instalação e Manutenção", desc: "Instalação, manutenção preventiva, limpeza e suporte técnico." },
    ],
  },
};

export default function ComoPodemoAjudar() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const { lang } = useLang();
  const t = T[lang];

  return (
    <>
      <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
        <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

          {/* Header */}
          <div className="flex flex-col gap-[10px] items-start text-center w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
              {t.heading1}{" "}
              <span className="text-[#0569ff]">{t.heading2}</span>
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
              {t.subtitle}
            </p>
          </div>

          {/* Topic cards */}
          <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
            {topicsMeta.map((meta, i) => {
              const topic = t.topics[i];
              return (
                <button
                  key={meta.categorySlug}
                  onClick={() => setOpenSlug(meta.categorySlug)}
                  className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[200px] p-[20px] rounded-[16px] cursor-pointer group"
                >
                  <div className="bg-[#f6f9fe] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                    <FigmaIcon src={meta.icon} size={40} aspectW={meta.aspectW} aspectH={meta.aspectH} />
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center min-h-[32px] w-full">
                    {topic.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center min-h-[50px] w-full">
                    {topic.desc}
                  </p>
                  <div className="flex gap-[5px] items-center justify-center">
                    <span className="font-['Articulat_CF:Bold'] text-[14px] text-[#0233c3] text-center whitespace-nowrap">
                      {t.cta}
                    </span>
                    <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <TopicPopup slug={openSlug} onClose={() => setOpenSlug(null)} />
    </>
  );
}
