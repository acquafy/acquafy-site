"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg          = "/figma-assets/bg-c.webp";
const imgProduct     = "/figma-assets/acquafy-media-totem.webp";
const imgArrowBlue   = "/figma-assets/icon-arrow-blue-outline-b.svg";
const imgArrowWhite  = "/figma-assets/icon-arrow-white-hover.svg";

const imgMarketing  = "/figma-assets/icon-marketing-landscape.svg";
const imgDivLine1   = "/figma-assets/divider-line-1.svg";
const imgDashboard  = "/figma-assets/icon-dashboard-large.svg";
const imgDivLine2   = "/figma-assets/divider-line-2.svg";
const imgAI         = "/figma-assets/icon-ai-30px-a.svg";
const imgMoney      = "/figma-assets/icon-money-large-a.svg";
const imgLocations  = "/figma-assets/icon-locations.svg";

const imgWifi       = "/figma-assets/icon-wifi-30px-a.svg";
const imgTime       = "/figma-assets/icon-time-30px.svg";
const imgBatimentos = "/figma-assets/icon-batimentos.svg";
const imgLock       = "/figma-assets/icon-lock-b.svg";

const BENEFIT_ICONS = [
  { icon: imgMarketing,  aspectW: 39.76, aspectH: 28.46 },
  { icon: imgDashboard,  aspectW: 0,     aspectH: 0 },
  { icon: imgAI,         aspectW: 0,     aspectH: 0 },
  { icon: imgMoney,      aspectW: 472,   aspectH: 440 },
  { icon: imgLocations,  aspectW: 0,     aspectH: 0 },
];

const BOTTOM_ICONS = [
  { icon: imgWifi,       aspectW: 30, aspectH: 20 },
  { icon: imgTime,       aspectW: 0,  aspectH: 0 },
  { icon: imgBatimentos, aspectW: 30, aspectH: 29 },
  { icon: imgLock,       aspectW: 27, aspectH: 30 },
];

const T: Record<Lang, {
  descLine1: string; descLine2: string;
  btnInvest: string;
  benefits: { title: string; desc: string }[];
  bottomFeatures: { title: string; desc: string }[];
}> = {
  pt: {
    descLine1: "Plataforma Inteligente de Água + Media Digital + Receita Recorrente.",
    descLine2: "Transforme locais públicos em pontos de hidratação, mídia e negócios. Ganhe com anúncios e venda dos produtos Acquafy Neo.",
    btnInvest: "Quero investir no Media Network",
    benefits: [
      { title: "Receita com Anúncios",    desc: "Monetize com companhias de alta viabilidade e marcas relevantes." },
      { title: "Dashboard do Operador",   desc: "Gestão completa de campanhas, usuários, vendas e indicadores." },
      { title: "IA + Dados Operacionais", desc: "Insights inteligentes para manutenção performance e expansão." },
      { title: "Receita Recorrente",      desc: "Modelo de receita contínua com mídia e venda de água." },
      { title: "Locais Ideais",           desc: "Aeroportos, shoppings, hospitais, empresas, universidades e muito mais." },
    ],
    bottomFeatures: [
      { title: "Conectividade Avançada",    desc: "4G/5G + Wi-Fi" },
      { title: "Suporte 24h",              desc: "Atendimento dedicado" },
      { title: "Monitoramento Inteligente", desc: "Uso, filtros e consumo" },
      { title: "Segurança de Dados",       desc: "Conformidade e LGPD" },
    ],
  },
  "pt-pt": {
    descLine1: "Plataforma Inteligente de Água + Media Digital + Receita Recorrente.",
    descLine2: "Transforme locais públicos em pontos de hidratação, média e negócios. Ganhe com anúncios e venda dos produtos Acquafy Neo.",
    btnInvest: "Quero investir no Media Network",
    benefits: [
      { title: "Receita com Anúncios",    desc: "Monetize com empresas de alta viabilidade e marcas relevantes." },
      { title: "Dashboard do Operador",   desc: "Gestão completa de campanhas, utilizadores, vendas e indicadores." },
      { title: "IA + Dados Operacionais", desc: "Insights inteligentes para manutenção, performance e expansão." },
      { title: "Receita Recorrente",      desc: "Modelo de receita contínua com média e venda de água." },
      { title: "Locais Ideais",           desc: "Aeroportos, centros comerciais, hospitais, empresas, universidades e muito mais." },
    ],
    bottomFeatures: [
      { title: "Conectividade Avançada",    desc: "4G/5G + Wi-Fi" },
      { title: "Suporte 24h",              desc: "Atendimento dedicado" },
      { title: "Monitorização Inteligente", desc: "Uso, filtros e consumo" },
      { title: "Segurança de Dados",       desc: "Conformidade e RGPD" },
    ],
  },
  en: {
    descLine1: "Smart Water + Digital Media + Recurring Revenue Platform.",
    descLine2: "Transform public spaces into hydration, media and business hubs. Earn with ads and sales of Acquafy Neo products.",
    btnInvest: "I want to invest in Media Network",
    benefits: [
      { title: "Ad Revenue",            desc: "Monetize with high-viability companies and relevant brands." },
      { title: "Operator Dashboard",    desc: "Full management of campaigns, users, sales and indicators." },
      { title: "AI + Operational Data", desc: "Smart insights for maintenance, performance and expansion." },
      { title: "Recurring Revenue",     desc: "Continuous revenue model with media and water sales." },
      { title: "Ideal Locations",       desc: "Airports, malls, hospitals, businesses, universities and much more." },
    ],
    bottomFeatures: [
      { title: "Advanced Connectivity", desc: "4G/5G + Wi-Fi" },
      { title: "24h Support",           desc: "Dedicated service" },
      { title: "Smart Monitoring",      desc: "Usage, filters and consumption" },
      { title: "Data Security",         desc: "Compliance and GDPR" },
    ],
  },
  es: {
    descLine1: "Plataforma Inteligente de Agua + Media Digital + Ingresos Recurrentes.",
    descLine2: "Transforma espacios públicos en puntos de hidratación, medios y negocios. Gana con anuncios y venta de productos Acquafy Neo.",
    btnInvest: "Quiero invertir en Media Network",
    benefits: [
      { title: "Ingresos por Anuncios",  desc: "Monetiza con empresas de alta viabilidad y marcas relevantes." },
      { title: "Panel del Operador",     desc: "Gestión completa de campañas, usuarios, ventas e indicadores." },
      { title: "IA + Datos Operativos",  desc: "Insights inteligentes para mantenimiento, rendimiento y expansión." },
      { title: "Ingresos Recurrentes",   desc: "Modelo de ingresos continuos con medios y venta de agua." },
      { title: "Ubicaciones Ideales",    desc: "Aeropuertos, centros comerciales, hospitales, empresas, universidades y más." },
    ],
    bottomFeatures: [
      { title: "Conectividad Avanzada",   desc: "4G/5G + Wi-Fi" },
      { title: "Soporte 24h",             desc: "Atención dedicada" },
      { title: "Monitoreo Inteligente",   desc: "Uso, filtros y consumo" },
      { title: "Seguridad de Datos",      desc: "Conformidad y RGPD" },
    ],
  },
  fr: {
    descLine1: "Plateforme intelligente Eau + Médias Digitaux + Revenus Récurrents.",
    descLine2: "Transformez les espaces publics en points d'hydratation, de médias et d'affaires. Gagnez avec des publicités et la vente de produits Acquafy Neo.",
    btnInvest: "Je veux investir dans Media Network",
    benefits: [
      { title: "Revenus Publicitaires",   desc: "Monétisez avec des entreprises à forte viabilité et des marques pertinentes." },
      { title: "Tableau de Bord Opérateur", desc: "Gestion complète des campagnes, utilisateurs, ventes et indicateurs." },
      { title: "IA + Données Opérationnelles", desc: "Informations intelligentes pour la maintenance, la performance et l'expansion." },
      { title: "Revenus Récurrents",      desc: "Modèle de revenus continus avec médias et vente d'eau." },
      { title: "Emplacements Idéaux",     desc: "Aéroports, centres commerciaux, hôpitaux, entreprises, universités et bien plus." },
    ],
    bottomFeatures: [
      { title: "Connectivité Avancée",    desc: "4G/5G + Wi-Fi" },
      { title: "Support 24h",            desc: "Service dédié" },
      { title: "Surveillance Intelligente", desc: "Utilisation, filtres et consommation" },
      { title: "Sécurité des Données",    desc: "Conformité et RGPD" },
    ],
  },
  de: {
    descLine1: "Intelligente Wasser + Digitale Medien + Wiederkehrende Einnahmen Plattform.",
    descLine2: "Verwandeln Sie öffentliche Räume in Hydrations-, Medien- und Geschäftszentren. Verdienen Sie mit Werbung und dem Verkauf von Acquafy Neo-Produkten.",
    btnInvest: "Ich möchte in Media Network investieren",
    benefits: [
      { title: "Werbeeinnahmen",          desc: "Monetarisieren Sie mit hochrentablen Unternehmen und relevanten Marken." },
      { title: "Betreiber-Dashboard",     desc: "Vollständige Verwaltung von Kampagnen, Nutzern, Verkäufen und Kennzahlen." },
      { title: "KI + Betriebsdaten",      desc: "Intelligente Einblicke für Wartung, Performance und Expansion." },
      { title: "Wiederkehrende Einnahmen", desc: "Kontinuierliches Umsatzmodell mit Medien und Wasserverkäufen." },
      { title: "Ideale Standorte",        desc: "Flughäfen, Einkaufszentren, Krankenhäuser, Unternehmen, Universitäten und mehr." },
    ],
    bottomFeatures: [
      { title: "Erweiterte Konnektivität", desc: "4G/5G + Wi-Fi" },
      { title: "24h-Support",             desc: "Dedizierter Service" },
      { title: "Intelligentes Monitoring", desc: "Nutzung, Filter und Verbrauch" },
      { title: "Datensicherheit",         desc: "Compliance und DSGVO" },
    ],
  },
  it: {
    descLine1: "Piattaforma intelligente Acqua + Media Digitali + Ricavi Ricorrenti.",
    descLine2: "Trasforma gli spazi pubblici in punti di idratazione, media e business. Guadagna con annunci e vendita di prodotti Acquafy Neo.",
    btnInvest: "Voglio investire in Media Network",
    benefits: [
      { title: "Ricavi Pubblicitari",     desc: "Monetizza con aziende ad alta redditività e brand rilevanti." },
      { title: "Dashboard dell'Operatore", desc: "Gestione completa di campagne, utenti, vendite e indicatori." },
      { title: "AI + Dati Operativi",     desc: "Insight intelligenti per manutenzione, performance ed espansione." },
      { title: "Ricavi Ricorrenti",       desc: "Modello di ricavi continui con media e vendita d'acqua." },
      { title: "Sedi Ideali",             desc: "Aeroporti, centri commerciali, ospedali, aziende, università e molto altro." },
    ],
    bottomFeatures: [
      { title: "Connettività Avanzata",   desc: "4G/5G + Wi-Fi" },
      { title: "Supporto 24h",           desc: "Servizio dedicato" },
      { title: "Monitoraggio Intelligente", desc: "Utilizzo, filtri e consumo" },
      { title: "Sicurezza dei Dati",      desc: "Conformità e GDPR" },
    ],
  },
  zh: {
    descLine1: "智能水 + 数字媒体 + 经常性收入平台。",
    descLine2: "将公共空间转变为补水、媒体和商业枢纽。通过广告和销售 Acquafy Neo 产品获得收益。",
    btnInvest: "我想投资 Media Network",
    benefits: [
      { title: "广告收入",               desc: "与高可行性企业和相关品牌合作变现。" },
      { title: "运营商仪表板",           desc: "全面管理活动、用户、销售和指标。" },
      { title: "AI + 运营数据",          desc: "为维护、性能和扩展提供智能洞察。" },
      { title: "经常性收入",             desc: "结合媒体和水销售的持续收入模式。" },
      { title: "理想地点",               desc: "机场、购物中心、医院、企业、大学及更多场所。" },
    ],
    bottomFeatures: [
      { title: "高级连接",               desc: "4G/5G + Wi-Fi" },
      { title: "24小时支持",             desc: "专属服务" },
      { title: "智能监控",               desc: "使用情况、过滤器和消耗" },
      { title: "数据安全",               desc: "合规与 GDPR" },
    ],
  },
  ja: {
    descLine1: "スマートウォーター + デジタルメディア + 継続的収益プラットフォーム。",
    descLine2: "公共スペースを水分補給・メディア・ビジネスのハブに変えましょう。広告と Acquafy Neo 製品の販売で収益を得てください。",
    btnInvest: "Media Network に投資したい",
    benefits: [
      { title: "広告収益",               desc: "高い実行可能性を持つ企業や関連ブランドで収益化。" },
      { title: "オペレーターダッシュボード", desc: "キャンペーン、ユーザー、売上、指標の一元管理。" },
      { title: "AI + 運用データ",         desc: "メンテナンス、パフォーマンス、拡張のためのインテリジェントな洞察。" },
      { title: "継続的収益",             desc: "メディアと水の販売を組み合わせた継続的な収益モデル。" },
      { title: "理想的な場所",           desc: "空港、ショッピングモール、病院、企業、大学など多数。" },
    ],
    bottomFeatures: [
      { title: "高度な接続性",            desc: "4G/5G + Wi-Fi" },
      { title: "24時間サポート",          desc: "専任サービス" },
      { title: "スマートモニタリング",     desc: "使用状況、フィルター、消費量" },
      { title: "データセキュリティ",       desc: "コンプライアンスと GDPR" },
    ],
  },
  ko: {
    descLine1: "스마트 워터 + 디지털 미디어 + 반복 수익 플랫폼.",
    descLine2: "공공 공간을 수분 보충, 미디어 및 비즈니스 허브로 변환하세요. 광고와 Acquafy Neo 제품 판매로 수익을 창출하세요.",
    btnInvest: "Media Network에 투자하고 싶습니다",
    benefits: [
      { title: "광고 수익",               desc: "높은 실행 가능성을 가진 기업과 관련 브랜드로 수익화." },
      { title: "운영자 대시보드",          desc: "캠페인, 사용자, 판매 및 지표의 완전한 관리." },
      { title: "AI + 운영 데이터",         desc: "유지 관리, 성능 및 확장을 위한 스마트 인사이트." },
      { title: "반복 수익",               desc: "미디어 및 물 판매를 결합한 지속적인 수익 모델." },
      { title: "이상적인 위치",            desc: "공항, 쇼핑몰, 병원, 기업, 대학교 및 더 많은 곳." },
    ],
    bottomFeatures: [
      { title: "고급 연결성",              desc: "4G/5G + Wi-Fi" },
      { title: "24시간 지원",             desc: "전담 서비스" },
      { title: "스마트 모니터링",           desc: "사용량, 필터 및 소비" },
      { title: "데이터 보안",              desc: "컴플라이언스 및 GDPR" },
    ],
  },
};

function BenefitIcon({ icon, aspectW, aspectH }: { icon: string; aspectW: number; aspectH: number }) {
  if (aspectW && aspectH) {
    return <FigmaIcon src={icon} size={20} aspectW={aspectW} aspectH={aspectH} />;
  }
  return <FigmaIcon src={icon} size={20} />;
}

export default function NeoMedia() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white relative flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="
        border border-[#cbd0d4] flex max-w-[1400px] p-[20px] relative rounded-[16px] w-full overflow-hidden
        flex-col gap-[20px] items-center justify-center
        lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-[20px]
      ">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px] z-0"
          src={imgBg}
        />

        <div className="relative z-10 flex flex-col gap-[20px] items-start min-w-[240px] w-full lg:flex-[1_0_0]">

          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[240px] pt-[20px]">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white w-full text-center lg:text-left">
              Neo Media
            </h2>
            <div className="flex flex-wrap gap-y-[20px] items-center w-full">
              <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[210px] lg:items-start">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-white w-full text-center lg:text-left">
                  {t.descLine1}
                  <br />
                  {t.descLine2}
                </p>

                <a href="/contato" className="
                  group bg-white border border-[#0233c3]
                  hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors
                  flex gap-[10px] items-center justify-center
                  min-h-[30px] px-[20px] py-[10px] rounded-[8px] shrink-0
                  w-full lg:w-fit cursor-pointer
                ">
                  <span className="
                    font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px]
                    text-[#0233c3] group-hover:text-white group-active:text-white
                    transition-colors text-center
                  ">
                    {t.btnInvest}
                  </span>
                  <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
                      <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                    </div>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
                      <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[20px] items-start min-w-[240px] shrink-0 w-full">

            <div className="bg-white border border-[#cbd0d4] flex flex-wrap gap-[20px_10px] items-start justify-center overflow-hidden p-[20px] rounded-[16px] shrink-0 w-full">
              {BENEFIT_ICONS.map((b, i) => (
                <div key={i} className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[150px]">
                  <div className="flex flex-col gap-[20px] h-[65px] items-start justify-center w-full shrink-0">
                    <BenefitIcon icon={b.icon} aspectW={b.aspectW} aspectH={b.aspectH} />
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] min-h-[25px] w-full">
                      {t.benefits[i].title}
                    </p>
                  </div>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] min-h-[75px] w-full">
                    {t.benefits[i].desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#cbd0d4] flex flex-wrap gap-[10px] items-center justify-center overflow-hidden p-[20px] rounded-[16px] shrink-0 w-full">
              {BOTTOM_ICONS.map((f, i) => (
                <div key={i} className="flex flex-[1_0_0] gap-[10px] items-center min-w-[120px]">
                  <BenefitIcon icon={f.icon} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[15px] text-[#1f2e91] w-full">
                      {t.bottomFeatures[i].title}
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[16px] text-[#2a2a2b] w-full">
                      {t.bottomFeatures[i].desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="
          relative flex flex-wrap gap-y-[40px] items-center justify-center
          min-w-[240px] max-w-[350px] max-h-[430px]
          w-full lg:flex-[1_0_0] lg:aspect-[350/430] relative z-10
        ">
          <div className="flex flex-col items-center justify-center h-[430px] w-[151px] shrink-0">
            <div className="flex-[1_0_0] min-h-px relative" style={{ aspectRatio: "1441 / 4096" }}>
              <img
                alt="Acquafy Neo Media"
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgProduct}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
