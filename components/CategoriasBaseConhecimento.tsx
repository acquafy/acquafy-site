"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrowBlue = "/figma-assets/icon-arrow-blue-b.svg";

const imgAguaPura   = "/figma-assets/icon-agua-pura.svg";
const imgMobile     = "/figma-assets/icon-mobile-b.svg";
const imgMedia      = "/figma-assets/icon-media.svg";
const imgParceria   = "/figma-assets/icon-parceria-a.svg";
const imgMoney      = "/figma-assets/icon-money-b.svg";
const imgManutencao = "/figma-assets/icon-manutencao.svg";

// Icon metadata (static, not translated)
const iconMeta = [
  { icon: imgAguaPura,   aspectW: 642.7, aspectH: 630.7, href: "/artigos#produtos" },
  { icon: imgMobile,     aspectW: 21,    aspectH: 30,    href: "/artigos#app-ai-iot" },
  { icon: imgMedia,      aspectW: 30,    aspectH: 30,    href: "/artigos#media-network" },
  { icon: imgParceria,   aspectW: 1125,  aspectH: 1078,  href: "/artigos#parceiros" },
  { icon: imgMoney,      aspectW: 33.3,  aspectH: 30,    href: "/artigos#faturamento" },
  { icon: imgManutencao, aspectW: 30,    aspectH: 30,    href: "/artigos#instalacao-e-manutencao" },
];

const T: Record<Lang, {
  heading: string;
  headingHighlight: string;
  subheading: string;
  viewTopics: string;
  categorias: { title: string; desc: string }[];
}> = {
  pt: {
    heading: "Como",
    headingHighlight: "podemos ajudar?",
    subheading: "Escolha o assunto para encontrar as melhores soluções.",
    viewTopics: "Ver tópicos",
    categorias: [
      { title: "Produtos",                desc: "Informações sobre Linha Neo, Acquafy Media, filtros, acessórios e especificações." },
      { title: "App + AI + IoT",          desc: "Suporte ao aplicativo, conectividade, sensores, IA e integração IoT." },
      { title: "Media Network",           desc: "Dúvidas sobre anúncios, QR Codes, campanhas e receita recorrente." },
      { title: "Parceiros",               desc: "Informações para parceiros, Gold Partner, contratos e materiais de apoio." },
      { title: "Faturamento",             desc: "Dúvidas sobre pedidos, faturas, pagamentos e comissões." },
      { title: "Instalação e Manutenção", desc: "Instalação, manutenção preventiva, limpeza e suporte técnico." },
    ],
  },
  "pt-pt": {
    heading: "Como",
    headingHighlight: "podemos ajudar?",
    subheading: "Escolha o assunto para encontrar as melhores soluções.",
    viewTopics: "Ver tópicos",
    categorias: [
      { title: "Produtos",                desc: "Informações sobre a Linha Neo, Acquafy Media, filtros, acessórios e especificações." },
      { title: "App + AI + IoT",          desc: "Suporte à aplicação, conectividade, sensores, IA e integração IoT." },
      { title: "Media Network",           desc: "Dúvidas sobre anúncios, QR Codes, campanhas e receita recorrente." },
      { title: "Parceiros",               desc: "Informações para parceiros, Gold Partner, contratos e materiais de apoio." },
      { title: "Faturação",               desc: "Dúvidas sobre pedidos, faturas, pagamentos e comissões." },
      { title: "Instalação e Manutenção", desc: "Instalação, manutenção preventiva, limpeza e suporte técnico." },
    ],
  },
  en: {
    heading: "How can",
    headingHighlight: "we help you?",
    subheading: "Choose a topic to find the best solutions.",
    viewTopics: "View topics",
    categorias: [
      { title: "Products",                  desc: "Information about the Neo Line, Acquafy Media, filters, accessories and specifications." },
      { title: "App + AI + IoT",            desc: "App support, connectivity, sensors, AI and IoT integration." },
      { title: "Media Network",             desc: "Questions about ads, QR Codes, campaigns and recurring revenue." },
      { title: "Partners",                  desc: "Information for partners, Gold Partner, contracts and support materials." },
      { title: "Billing",                   desc: "Questions about orders, invoices, payments and commissions." },
      { title: "Installation & Maintenance",desc: "Installation, preventive maintenance, cleaning and technical support." },
    ],
  },
  es: {
    heading: "¿Cómo",
    headingHighlight: "podemos ayudarte?",
    subheading: "Elige el tema para encontrar las mejores soluciones.",
    viewTopics: "Ver temas",
    categorias: [
      { title: "Productos",                    desc: "Información sobre la Línea Neo, Acquafy Media, filtros, accesorios y especificaciones." },
      { title: "App + AI + IoT",               desc: "Soporte a la aplicación, conectividad, sensores, IA e integración IoT." },
      { title: "Media Network",                desc: "Dudas sobre anuncios, códigos QR, campañas e ingresos recurrentes." },
      { title: "Socios",                       desc: "Información para socios, Gold Partner, contratos y materiales de apoyo." },
      { title: "Facturación",                  desc: "Dudas sobre pedidos, facturas, pagos y comisiones." },
      { title: "Instalación y Mantenimiento",  desc: "Instalación, mantenimiento preventivo, limpieza y soporte técnico." },
    ],
  },
  fr: {
    heading: "Comment",
    headingHighlight: "pouvons-nous vous aider ?",
    subheading: "Choisissez un sujet pour trouver les meilleures solutions.",
    viewTopics: "Voir les sujets",
    categorias: [
      { title: "Produits",                      desc: "Informations sur la gamme Neo, Acquafy Media, filtres, accessoires et spécifications." },
      { title: "App + AI + IoT",                desc: "Support applicatif, connectivité, capteurs, IA et intégration IoT." },
      { title: "Media Network",                 desc: "Questions sur les publicités, QR Codes, campagnes et revenus récurrents." },
      { title: "Partenaires",                   desc: "Informations pour les partenaires, Gold Partner, contrats et supports marketing." },
      { title: "Facturation",                   desc: "Questions sur les commandes, factures, paiements et commissions." },
      { title: "Installation et Maintenance",   desc: "Installation, maintenance préventive, nettoyage et support technique." },
    ],
  },
  de: {
    heading: "Wie können",
    headingHighlight: "wir Ihnen helfen?",
    subheading: "Wählen Sie ein Thema, um die besten Lösungen zu finden.",
    viewTopics: "Themen anzeigen",
    categorias: [
      { title: "Produkte",                      desc: "Informationen zur Neo-Reihe, Acquafy Media, Filtern, Zubehör und Spezifikationen." },
      { title: "App + AI + IoT",                desc: "App-Support, Konnektivität, Sensoren, KI und IoT-Integration." },
      { title: "Media Network",                 desc: "Fragen zu Werbung, QR-Codes, Kampagnen und wiederkehrenden Einnahmen." },
      { title: "Partner",                       desc: "Informationen für Partner, Gold Partner, Verträge und Marketingmaterialien." },
      { title: "Abrechnung",                    desc: "Fragen zu Bestellungen, Rechnungen, Zahlungen und Provisionen." },
      { title: "Installation & Wartung",        desc: "Installation, vorbeugende Wartung, Reinigung und technischer Support." },
    ],
  },
  it: {
    heading: "Come possiamo",
    headingHighlight: "aiutarti?",
    subheading: "Scegli un argomento per trovare le migliori soluzioni.",
    viewTopics: "Vedi argomenti",
    categorias: [
      { title: "Prodotti",                      desc: "Informazioni sulla Linea Neo, Acquafy Media, filtri, accessori e specifiche." },
      { title: "App + AI + IoT",                desc: "Supporto all'app, connettività, sensori, IA e integrazione IoT." },
      { title: "Media Network",                 desc: "Domande su annunci, QR Code, campagne e ricavi ricorrenti." },
      { title: "Partner",                       desc: "Informazioni per partner, Gold Partner, contratti e materiali di supporto." },
      { title: "Fatturazione",                  desc: "Domande su ordini, fatture, pagamenti e commissioni." },
      { title: "Installazione e Manutenzione",  desc: "Installazione, manutenzione preventiva, pulizia e supporto tecnico." },
    ],
  },
  zh: {
    heading: "我们如何",
    headingHighlight: "为您提供帮助？",
    subheading: "选择主题以找到最佳解决方案。",
    viewTopics: "查看主题",
    categorias: [
      { title: "产品",        desc: "关于 Neo 系列、Acquafy Media、滤芯、配件和规格的信息。" },
      { title: "App + AI + IoT", desc: "应用支持、连接性、传感器、AI 和 IoT 集成。" },
      { title: "Media Network",  desc: "关于广告、QR 码、活动和周期性收益的问题。" },
      { title: "合作伙伴",   desc: "合作伙伴、Gold Partner、合同和营销支持材料的相关信息。" },
      { title: "账单",        desc: "关于订单、发票、付款和佣金的问题。" },
      { title: "安装与维护", desc: "安装、预防性维护、清洁和技术支持。" },
    ],
  },
  ja: {
    heading: "どのように",
    headingHighlight: "お手伝いできますか？",
    subheading: "最適なソリューションを見つけるためにトピックを選択してください。",
    viewTopics: "トピックを見る",
    categorias: [
      { title: "製品",              desc: "Neo ライン、Acquafy Media、フィルター、アクセサリー、仕様に関する情報。" },
      { title: "App + AI + IoT",   desc: "アプリサポート、接続性、センサー、AI、IoT 統合。" },
      { title: "Media Network",    desc: "広告、QR コード、キャンペーン、定期収益に関するご質問。" },
      { title: "パートナー",        desc: "パートナー、Gold Partner、契約、マーケティング資料の情報。" },
      { title: "請求",              desc: "注文、請求書、支払い、コミッションに関するご質問。" },
      { title: "設置とメンテナンス", desc: "設置、予防保守、清掃、テクニカルサポート。" },
    ],
  },
  ko: {
    heading: "어떻게",
    headingHighlight: "도와드릴까요?",
    subheading: "최선의 솔루션을 찾기 위해 주제를 선택하세요.",
    viewTopics: "주제 보기",
    categorias: [
      { title: "제품",          desc: "Neo 라인, Acquafy Media, 필터, 액세서리 및 사양에 관한 정보." },
      { title: "App + AI + IoT", desc: "앱 지원, 연결성, 센서, AI 및 IoT 통합." },
      { title: "Media Network",  desc: "광고, QR 코드, 캠페인 및 반복 수익에 관한 질문." },
      { title: "파트너",        desc: "파트너, Gold Partner, 계약 및 마케팅 지원 자료에 관한 정보." },
      { title: "청구",          desc: "주문, 청구서, 결제 및 커미션에 관한 질문." },
      { title: "설치 및 유지보수", desc: "설치, 예방 유지보수, 청소 및 기술 지원." },
    ],
  },
};

export default function CategoriasBaseConhecimento() {
  const { lang } = useLang();
  const t = T[lang];

  const categorias = t.categorias.map((cat, i) => ({
    ...cat,
    icon: iconMeta[i].icon,
    aspectW: iconMeta[i].aspectW,
    aspectH: iconMeta[i].aspectH,
    href: iconMeta[i].href,
  }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading}{" "}
            <span className="text-[#0569ff]">{t.headingHighlight}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subheading}
          </p>
        </div>

        {/* Category cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {categorias.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="bg-[#f6f9fe] hover:bg-[#eaf0fd] hover:shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]
                transition-all duration-200
                flex flex-[1_0_0] flex-col gap-[20px] items-center justify-between
                min-w-[200px] p-[20px] rounded-[16px] cursor-pointer group no-underline"
            >
              {/* Icon circle */}
              <div className="bg-[#f6f9fe] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px] group-hover:bg-[#e0e9fc] transition-colors">
                <FigmaIcon src={cat.icon} size={40} aspectW={cat.aspectW} aspectH={cat.aspectH} />
              </div>

              {/* Title */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center min-h-[32px] w-full">
                {cat.title}
              </p>

              {/* Description */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center min-h-[50px] w-full flex-1">
                {cat.desc}
              </p>

              {/* Link */}
              <div className="flex gap-[5px] items-center justify-center shrink-0">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] text-center whitespace-nowrap">
                  {t.viewTopics}
                </span>
                <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
