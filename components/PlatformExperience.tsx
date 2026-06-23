"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgParceiros  = "/figma-assets/icon-parceiros-b.svg";
const imgQrCodes    = "/figma-assets/icon-qr-codes-b.svg";
const imgMediaNet   = "/figma-assets/icon-medianet-c.svg";
const imgVendas     = "/figma-assets/icon-vendas-c.svg";
const imgComissoes  = "/figma-assets/icon-comissoes-c.svg";

const cardIcons = [
  { bgIcon: "bg-[#e9e5fd]", icon: imgParceiros,  iconW: 40, iconH: 36 },
  { bgIcon: "bg-[#dbf4f5]", icon: imgQrCodes,    iconW: 20, iconH: 20 },
  { bgIcon: "bg-[#dae9ff]", icon: imgMediaNet,   iconW: 20, iconH: 17 },
  { bgIcon: "bg-[#fef3e3]", icon: imgVendas,     iconW: 20, iconH: 17 },
  { bgIcon: "bg-[#e1f3e7]", icon: imgComissoes,  iconW: 20, iconH: 20 },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  cards: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Tudo conectado em uma ",
    heading2: "única experiência",
    cards: [
      { title: "Parceiros",         desc: "Gestão completa de parceiros Gold, Silver e Platinum. Rede Silver e regras comerciais estratégicas." },
      { title: "QR Codes & Links",  desc: "Geração, rastreio, origem das vendas, performance e conversão em tempo real." },
      { title: "Media Network",     desc: "Gestão de anunciantes, campanhas, criativos e exibição em Acquafy Media e Neo Premium." },
      { title: "Produtos & Vendas", desc: "Catálogo da linha Neo, preços EUA, pedidos, clientes, faturamento e devoluções." },
      { title: "Comissões",         desc: "Cálculo e pagamento de comissões para Gold e Silver. Regra FOB do Platinum." },
    ],
  },
  "pt-pt": {
    heading1: "Tudo ligado numa ",
    heading2: "experiência única",
    cards: [
      { title: "Parceiros",         desc: "Gestão completa de parceiros Gold, Silver e Platinum. Rede Silver e regras comerciais estratégicas." },
      { title: "QR Codes & Links",  desc: "Geração, rastreio, origem das vendas, performance e conversão em tempo real." },
      { title: "Media Network",     desc: "Gestão de anunciantes, campanhas, criativos e exibição na Acquafy Media e Neo Premium." },
      { title: "Produtos & Vendas", desc: "Catálogo da linha Neo, preços EUA, encomendas, clientes, faturação e devoluções." },
      { title: "Comissões",         desc: "Cálculo e pagamento de comissões para Gold e Silver. Regra FOB do Platinum." },
    ],
  },
  en: {
    heading1: "Everything connected in a ",
    heading2: "single experience",
    cards: [
      { title: "Partners",          desc: "Full management of Gold, Silver and Platinum partners. Silver network and strategic commercial rules." },
      { title: "QR Codes & Links",  desc: "Generation, tracking, sales origin, performance and real-time conversion." },
      { title: "Media Network",     desc: "Management of advertisers, campaigns, creatives and display on Acquafy Media and Neo Premium." },
      { title: "Products & Sales",  desc: "Neo line catalog, US prices, orders, customers, billing and returns." },
      { title: "Commissions",       desc: "Commission calculation and payment for Gold and Silver. Platinum FOB rule." },
    ],
  },
  "en-gb": {
    heading1: "Everything connected in a ",
    heading2: "single experience",
    cards: [
      { title: "Partners",          desc: "Full management of Gold, Silver and Platinum partners. Silver network and strategic commercial rules." },
      { title: "QR Codes & Links",  desc: "Generation, tracking, sales origin, performance and real-time conversion." },
      { title: "Media Network",     desc: "Management of advertisers, campaigns, creatives and display on Acquafy Media and Neo Premium." },
      { title: "Products & Sales",  desc: "Neo line catalogue, US prices, orders, customers, billing and returns." },
      { title: "Commissions",       desc: "Commission calculation and payment for Gold and Silver. Platinum FOB rule." },
    ],
  },
  es: {
    heading1: "Todo conectado en una ",
    heading2: "única experiencia",
    cards: [
      { title: "Socios",             desc: "Gestión completa de socios Gold, Silver y Platinum. Red Silver y reglas comerciales estratégicas." },
      { title: "Códigos QR & Links", desc: "Generación, rastreo, origen de ventas, rendimiento y conversión en tiempo real." },
      { title: "Media Network",      desc: "Gestión de anunciantes, campañas, creativos y visualización en Acquafy Media y Neo Premium." },
      { title: "Productos & Ventas", desc: "Catálogo de la línea Neo, precios EUA, pedidos, clientes, facturación y devoluciones." },
      { title: "Comisiones",         desc: "Cálculo y pago de comisiones para Gold y Silver. Regla FOB del Platinum." },
    ],
  },
  fr: {
    heading1: "Tout connecté en une ",
    heading2: "expérience unique",
    cards: [
      { title: "Partenaires",         desc: "Gestion complète des partenaires Gold, Silver et Platinum. Réseau Silver et règles commerciales stratégiques." },
      { title: "Codes QR & Liens",    desc: "Génération, suivi, origine des ventes, performance et conversion en temps réel." },
      { title: "Media Network",       desc: "Gestion des annonceurs, campagnes, créatifs et diffusion sur Acquafy Media et Neo Premium." },
      { title: "Produits & Ventes",   desc: "Catalogue de la gamme Neo, prix États-Unis, commandes, clients, facturation et retours." },
      { title: "Commissions",         desc: "Calcul et paiement des commissions pour Gold et Silver. Règle FOB Platinum." },
    ],
  },
  de: {
    heading1: "Alles verbunden in einer ",
    heading2: "einzigen Erfahrung",
    cards: [
      { title: "Partner",             desc: "Vollständige Verwaltung von Gold-, Silver- und Platinum-Partnern. Silver-Netzwerk und strategische Handelsregeln." },
      { title: "QR-Codes & Links",    desc: "Erstellung, Tracking, Verkaufsherkunft, Performance und Echtzeit-Konversion." },
      { title: "Media Network",       desc: "Verwaltung von Werbetreibenden, Kampagnen, Creatives und Anzeige auf Acquafy Media und Neo Premium." },
      { title: "Produkte & Verkauf",  desc: "Neo-Linienkatalog, US-Preise, Bestellungen, Kunden, Abrechnung und Retouren." },
      { title: "Provisionen",         desc: "Berechnung und Zahlung von Provisionen für Gold und Silver. Platinum-FOB-Regel." },
    ],
  },
  it: {
    heading1: "Tutto connesso in un'",
    heading2: "unica esperienza",
    cards: [
      { title: "Partner",             desc: "Gestione completa dei partner Gold, Silver e Platinum. Rete Silver e regole commerciali strategiche." },
      { title: "Codici QR & Link",    desc: "Generazione, tracciamento, origine delle vendite, performance e conversione in tempo reale." },
      { title: "Media Network",       desc: "Gestione di inserzionisti, campagne, creativi e visualizzazione su Acquafy Media e Neo Premium." },
      { title: "Prodotti & Vendite",  desc: "Catalogo della linea Neo, prezzi USA, ordini, clienti, fatturazione e resi." },
      { title: "Commissioni",         desc: "Calcolo e pagamento delle commissioni per Gold e Silver. Regola FOB Platinum." },
    ],
  },
  zh: {
    heading1: "一切尽在",
    heading2: "统一体验",
    cards: [
      { title: "合作伙伴",             desc: "全面管理 Gold、Silver 和 Platinum 合作伙伴。Silver 网络和战略商业规则。" },
      { title: "二维码与链接",          desc: "生成、追踪、销售来源、绩效及实时转化。" },
      { title: "Media Network",        desc: "管理广告商、活动、创意，并在 Acquafy Media 和 Neo Premium 上展示。" },
      { title: "产品与销售",            desc: "Neo 系列目录、美国价格、订单、客户、开票和退货。" },
      { title: "佣金",                  desc: "为 Gold 和 Silver 计算及支付佣金。Platinum FOB 规则。" },
    ],
  },
  ja: {
    heading1: "すべてつながる、",
    heading2: "ひとつの体験",
    cards: [
      { title: "パートナー",            desc: "Gold、Silver、Platinum パートナーの包括管理。Silverネットワークと戦略的商業ルール。" },
      { title: "QRコード & リンク",     desc: "生成、追跡、販売元、パフォーマンス、リアルタイムコンバージョン。" },
      { title: "Media Network",        desc: "広告主、キャンペーン、クリエイティブの管理および Acquafy Media・Neo Premium への配信。" },
      { title: "製品 & 販売",          desc: "Neoラインカタログ、米国価格、注文、顧客、請求、返品。" },
      { title: "コミッション",          desc: "GoldおよびSilverのコミッション計算と支払い。Platinum FOBルール。" },
    ],
  },
  ko: {
    heading1: "모든 것이 연결된 ",
    heading2: "단일 경험",
    cards: [
      { title: "파트너",               desc: "Gold, Silver, Platinum 파트너의 완전한 관리. Silver 네트워크 및 전략적 상업 규칙." },
      { title: "QR 코드 & 링크",       desc: "생성, 추적, 판매 출처, 성과 및 실시간 전환." },
      { title: "Media Network",        desc: "광고주, 캠페인, 크리에이티브 관리 및 Acquafy Media, Neo Premium 게재." },
      { title: "제품 & 판매",          desc: "Neo 라인 카탈로그, 미국 가격, 주문, 고객, 청구 및 반품." },
      { title: "커미션",               desc: "Gold 및 Silver 커미션 계산 및 지급. Platinum FOB 규칙." },
    ],
  },
  sv: {
    heading1: "Allt anslutet i en ",
    heading2: "enda upplevelse",
    cards: [
      { title: "Partners",             desc: "Fullstandig hantering av Gold-, Silver- och Platinum-partners. Silver-natverk och strategiska affarsregler." },
      { title: "QR-koder & Lankar",    desc: "Generering, sparning, forsaljningskalla, prestanda och realtidskonvertering." },
      { title: "Media Network",        desc: "Hantering av annonsorer, kampanjer, kreativt material och visning pa Acquafy Media och Neo Premium." },
      { title: "Produkter & Forsaljning", desc: "Neo-linjekatalog, amerikanska priser, bestallningar, kunder, fakturering och returer." },
      { title: "Provisioner",          desc: "Berakning och betalning av provisioner for Gold och Silver. Platinum FOB-regel." },
    ],
  },
  fi: {
    heading1: "Kaikki yhdistetty yhteen ",
    heading2: "kokemukseen",
    cards: [
      { title: "Kumppanit",            desc: "Gold-, Silver- ja Platinum-kumppanien taydellinen hallinta. Silver-verkosto ja strategiset kaupalliset saannot." },
      { title: "QR-koodit & Linkit",   desc: "Luonti, seuranta, myynnin alkupera, suorituskyky ja reaaliaikainen konversio." },
      { title: "Media Network",        desc: "Mainostajien, kampanjoiden, luovien materiaalien hallinta ja nakyvyys Acquafy Mediassa ja Neo Premiumissa." },
      { title: "Tuotteet & Myynti",    desc: "Neo-linjan katalogi, Yhdysvaltojen hinnat, tilaukset, asiakkaat, laskutus ja palautukset." },
      { title: "Provisiot",            desc: "Provisioiden laskenta ja maksaminen Gold- ja Silver-tasoille. Platinum FOB -saanto." },
    ],
  },
  ru: {
    heading1: "Vsyo svyazano v ",
    heading2: "edinom opyte",
    cards: [
      { title: "Partnery",             desc: "Polnoye upravleniye partnyorami Gold, Silver i Platinum. Set Silver i strategicheskiye kommercheskiye pravila." },
      { title: "QR-kody & Ssylki",     desc: "Generatsiya, otslezhivaniye, istochnik prodazh, proizvoditelnost i konversiya v realnom vremeni." },
      { title: "Media Network",        desc: "Upravleniye reklamodatelyami, kampaniyami, kreativami i pokaz na Acquafy Media i Neo Premium." },
      { title: "Tovary & Prodazhi",    desc: "Katalog lineyki Neo, tseny dlya SSHA, zakazy, klienty, vstavleniye schetov i vozvraty." },
      { title: "Komissii",             desc: "Raschet i vyplata komissiy dlya Gold i Silver. Pravilo FOB dlya Platinum." },
    ],
  },
  ro: {
    heading1: "Totul conectat intr-o ",
    heading2: "experienta unica",
    cards: [
      { title: "Parteneri",            desc: "Gestionare completa a partenerilor Gold, Silver si Platinum. Retea Silver si reguli comerciale strategice." },
      { title: "Coduri QR & Linkuri",  desc: "Generare, urmarire, origine vanzari, performanta si conversie in timp real." },
      { title: "Media Network",        desc: "Gestionarea agentilor de publicitate, campaniilor, materialelor creative si afisarea pe Acquafy Media si Neo Premium." },
      { title: "Produse & Vanzari",    desc: "Catalogul liniei Neo, preturi SUA, comenzi, clienti, facturare si retururi." },
      { title: "Comisioane",           desc: "Calculul si plata comisioanelor pentru Gold si Silver. Regula FOB Platinum." },
    ],
  },
  he: {
    heading1: "hakol mechubur be-nishyon ",
    heading2: "yachid",
    cards: [
      { title: "Shutafim",             desc: "Nihul male shel shutafei Gold, Silver ve-Platinum. Reshet Silver ve-chukei mischar estrategiim." },
      { title: "Kodei QR ve-Kishurim", desc: "Yetsira, maakav, mekor mechirot, biTsuim ve-hamara be-zman amiti." },
      { title: "Media Network",        desc: "Nihul mefarsamim, kampaniyot, kre-ativim ve-hatsaga be-Acquafy Media u-ve-Neo Premium." },
      { title: "Mutsarim u-Mechirot",  desc: "Katalog kav Neo, mechire ARTZOT HABRIT, hazmamot, lekochot, chiyuv ve-hachzarot." },
      { title: "Amalot",               desc: "Chishuve ve-tashlume amalot le-Gold ve-le-Silver. Klal FOB le-Platinum." },
    ],
  },
};

export default function PlatformExperience() {
  const { lang } = useLang();
  const t = T[lang];

  const cards = cardIcons.map((ico, i) => ({ ...ico, ...t.cards[i] }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
          {cards.map((c) => (
            <div key={c.title} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[240px] p-[20px] rounded-[16px]">
              <div className={`${c.bgIcon} flex items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]`}>
                <FigmaIcon src={c.icon} size={40} aspectW={c.iconW} aspectH={c.iconH} />
              </div>
              <div className="flex flex-col gap-[10px] items-start text-center w-full">
                <div className="flex items-center min-h-[40px] w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{c.title}</p>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
