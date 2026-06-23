"use client";
// "Uma plataforma física de hidratação, mídia e conversão" (Figma node 3258:4218)
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgMarketing = "/figma-assets/icon-marketing-a.svg";
const imgDashboard = "/figma-assets/icon-dashboard.svg";
const imgBrain     = "/figma-assets/icon-brain-a.svg";
const imgMoney     = "/figma-assets/icon-money-d.svg";
const imgQR        = "/figma-assets/icon-qr-a.svg";
const imgLocal     = "/figma-assets/icon-local-a.svg";

// aspectW/aspectH extraídos do Figma (node 3258:4218):
// marketing → 39.76×28.46 (landscape), dashboard → 642×642 (sq),
// brain → 30×30 (sq), money → 33.33×30 (landscape), qr → 629×629 (sq), local → 24.63×30 (portrait)

const T: Record<Lang, {
  heading1: string;
  headingHighlight: string;
  features: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Uma plataforma física de ",
    headingHighlight: "hidratação, mídia e conversão",
    features: [
      { title: "Receita com anúncios",    desc: "Monetize campanhas publicitárias e aumente a visibilidade de marcas no seu ponto." },
      { title: "Dashboard do operador",   desc: "Gerencie campanhas, usuários, vendas e indicadores em um painel completo e intuitivo." },
      { title: "AI + Dados operacionais", desc: "Insights inteligentes para manutenção, performance, uso e expansão da sua rede." },
      { title: "Receita recorrente",      desc: "Modelo de negócio combinando mídia, água e vendas de produtos com recorrência." },
      { title: "QR Codes e vendas Neo",   desc: "Converta escaneamentos em vendas da linha Neo e ganhe comissões automáticas." },
      { title: "Locais ideais",           desc: "Aeroportos, shoppings, hospitais, empresas, universidades e áreas públicos de alto fluxo." },
    ],
  },
  "pt-pt": {
    heading1: "Uma plataforma física de ",
    headingHighlight: "hidratação, média e conversão",
    features: [
      { title: "Receita com anúncios",    desc: "Monetize campanhas publicitárias e aumente a visibilidade de marcas no seu ponto." },
      { title: "Dashboard do operador",   desc: "Faça a gestão de campanhas, utilizadores, vendas e indicadores num painel completo e intuitivo." },
      { title: "IA + Dados operacionais", desc: "Insights inteligentes para manutenção, performance, uso e expansão da sua rede." },
      { title: "Receita recorrente",      desc: "Modelo de negócio que combina média, água e vendas de produtos com recorrência." },
      { title: "QR Codes e vendas Neo",   desc: "Converta leituras em vendas da linha Neo e ganhe comissões automáticas." },
      { title: "Locais ideais",           desc: "Aeroportos, centros comerciais, hospitais, empresas, universidades e áreas públicas de alto fluxo." },
    ],
  },
  en: {
    heading1: "A physical platform for ",
    headingHighlight: "hydration, media and conversion",
    features: [
      { title: "Ad revenue",             desc: "Monetize advertising campaigns and increase brand visibility at your location." },
      { title: "Operator dashboard",     desc: "Manage campaigns, users, sales and indicators in a complete and intuitive panel." },
      { title: "AI + Operational data",  desc: "Intelligent insights for maintenance, performance, usage and network expansion." },
      { title: "Recurring revenue",      desc: "Business model combining media, water and recurring product sales." },
      { title: "QR Codes and Neo sales", desc: "Convert scans into Neo line sales and earn automatic commissions." },
      { title: "Ideal locations",        desc: "Airports, malls, hospitals, companies, universities and high-traffic public areas." },
    ],
  },
  "en-gb": {
    heading1: "A physical platform for ",
    headingHighlight: "hydration, media and conversion",
    features: [
      { title: "Ad revenue",             desc: "Monetise advertising campaigns and increase brand visibility at your location." },
      { title: "Operator dashboard",     desc: "Manage campaigns, users, sales and indicators in a complete and intuitive panel." },
      { title: "AI + Operational data",  desc: "Intelligent insights for maintenance, performance, usage and network expansion." },
      { title: "Recurring revenue",      desc: "Business model combining media, water and recurring product sales." },
      { title: "QR Codes and Neo sales", desc: "Convert scans into Neo line sales and earn automatic commissions." },
      { title: "Ideal locations",        desc: "Airports, shopping centres, hospitals, companies, universities and high-traffic public areas." },
    ],
  },
  es: {
    heading1: "Una plataforma física de ",
    headingHighlight: "hidratación, medios y conversión",
    features: [
      { title: "Ingresos con anuncios",    desc: "Monetiza campañas publicitarias y aumenta la visibilidad de marcas en tu punto." },
      { title: "Dashboard del operador",   desc: "Gestiona campañas, usuarios, ventas e indicadores en un panel completo e intuitivo." },
      { title: "AI + Datos operacionales", desc: "Insights inteligentes para mantenimiento, rendimiento, uso y expansión de tu red." },
      { title: "Ingresos recurrentes",     desc: "Modelo de negocio que combina medios, agua y ventas de productos con recurrencia." },
      { title: "Códigos QR y ventas Neo",  desc: "Convierte escaneos en ventas de la línea Neo y gana comisiones automáticas." },
      { title: "Ubicaciones ideales",      desc: "Aeropuertos, centros comerciales, hospitales, empresas, universidades y áreas públicas de alto tráfico." },
    ],
  },
  fr: {
    heading1: "Une plateforme physique pour ",
    headingHighlight: "l'hydratation, les médias et la conversion",
    features: [
      { title: "Revenus publicitaires",    desc: "Monétisez les campagnes publicitaires et augmentez la visibilité des marques à votre emplacement." },
      { title: "Tableau de bord opérateur", desc: "Gérez campagnes, utilisateurs, ventes et indicateurs dans un panneau complet et intuitif." },
      { title: "AI + Données opérationnelles", desc: "Informations intelligentes pour la maintenance, les performances, l'utilisation et l'expansion de votre réseau." },
      { title: "Revenus récurrents",       desc: "Modèle commercial combinant médias, eau et ventes de produits récurrentes." },
      { title: "QR Codes et ventes Neo",   desc: "Convertissez les scans en ventes de la gamme Neo et gagnez des commissions automatiques." },
      { title: "Emplacements idéaux",      desc: "Aéroports, centres commerciaux, hôpitaux, entreprises, universités et espaces publics à fort trafic." },
    ],
  },
  de: {
    heading1: "Eine physische Plattform für ",
    headingHighlight: "Hydration, Medien und Konversion",
    features: [
      { title: "Werbeeinnahmen",           desc: "Monetarisieren Sie Werbekampagnen und erhöhen Sie die Markensichtbarkeit an Ihrem Standort." },
      { title: "Betreiber-Dashboard",      desc: "Verwalten Sie Kampagnen, Nutzer, Verkäufe und Kennzahlen in einem vollständigen und intuitiven Panel." },
      { title: "KI + Betriebsdaten",       desc: "Intelligente Einblicke für Wartung, Performance, Nutzung und Netzwerkerweiterung." },
      { title: "Wiederkehrende Einnahmen", desc: "Geschäftsmodell, das Medien, Wasser und wiederkehrende Produktverkäufe kombiniert." },
      { title: "QR Codes und Neo-Verkäufe", desc: "Wandeln Sie Scans in Neo-Produktverkäufe um und verdienen Sie automatische Provisionen." },
      { title: "Ideale Standorte",         desc: "Flughäfen, Einkaufszentren, Krankenhäuser, Unternehmen, Universitäten und stark frequentierte öffentliche Bereiche." },
    ],
  },
  it: {
    heading1: "Una piattaforma fisica per ",
    headingHighlight: "idratazione, media e conversione",
    features: [
      { title: "Ricavi pubblicitari",      desc: "Monetizza le campagne pubblicitarie e aumenta la visibilità dei brand nella tua sede." },
      { title: "Dashboard dell'operatore", desc: "Gestisci campagne, utenti, vendite e indicatori in un pannello completo e intuitivo." },
      { title: "AI + Dati operativi",      desc: "Insight intelligenti per manutenzione, performance, utilizzo ed espansione della tua rete." },
      { title: "Ricavi ricorrenti",        desc: "Modello di business che combina media, acqua e vendite di prodotti con ricorrenza." },
      { title: "QR Codes e vendite Neo",   desc: "Converti le scansioni in vendite della linea Neo e guadagna commissioni automatiche." },
      { title: "Sedi ideali",              desc: "Aeroporti, centri commerciali, ospedali, aziende, università e aree pubbliche ad alto traffico." },
    ],
  },
  zh: {
    heading1: "一个专为",
    headingHighlight: "补水、媒体和转化而生的实体平台",
    features: [
      { title: "广告收入",                 desc: "通过广告活动变现，提升品牌在您所在地点的曝光度。" },
      { title: "运营商仪表板",             desc: "在一个完整直观的面板中管理活动、用户、销售和指标。" },
      { title: "AI + 运营数据",            desc: "为网络的维护、性能、使用和扩展提供智能洞察。" },
      { title: "经常性收入",               desc: "结合媒体、水资源和产品销售的商业模式，实现持续收益。" },
      { title: "QR Code 与 Neo 销售",      desc: "将扫码转化为 Neo 系列产品销售，自动赚取佣金。" },
      { title: "理想地点",                 desc: "机场、购物中心、医院、企业、大学及高流量公共区域。" },
    ],
  },
  ja: {
    heading1: "水分補給・メディア・コンバージョンのための ",
    headingHighlight: "フィジカルプラットフォーム",
    features: [
      { title: "広告収益",                 desc: "広告キャンペーンで収益化し、あなたの拠点でのブランド視認性を高めましょう。" },
      { title: "オペレーターダッシュボード", desc: "完全で直感的なパネルでキャンペーン、ユーザー、売上、指標を管理。" },
      { title: "AI + 運用データ",          desc: "ネットワークのメンテナンス、パフォーマンス、使用状況、拡張のためのインテリジェントな洞察。" },
      { title: "継続的収益",               desc: "メディア、水、製品販売を組み合わせた継続的な収益ビジネスモデル。" },
      { title: "QR Code と Neo 販売",      desc: "スキャンを Neo ラインの販売に変換し、自動コミッションを獲得。" },
      { title: "理想的な場所",             desc: "空港、ショッピングモール、病院、企業、大学、高交通量の公共エリア。" },
    ],
  },
  ko: {
    heading1: "수분 보충, 미디어 및 전환을 위한 ",
    headingHighlight: "물리적 플랫폼",
    features: [
      { title: "광고 수익",                desc: "광고 캠페인으로 수익화하고 귀하의 위치에서 브랜드 가시성을 높이세요." },
      { title: "운영자 대시보드",           desc: "완전하고 직관적인 패널에서 캠페인, 사용자, 판매 및 지표를 관리하세요." },
      { title: "AI + 운영 데이터",          desc: "네트워크의 유지 관리, 성능, 사용 및 확장을 위한 스마트 인사이트." },
      { title: "반복 수익",                desc: "미디어, 물 및 제품 판매를 결합한 반복적인 비즈니스 모델." },
      { title: "QR Code와 Neo 판매",       desc: "스캔을 Neo 라인 판매로 전환하고 자동 커미션을 획득하세요." },
      { title: "이상적인 위치",             desc: "공항, 쇼핑몰, 병원, 기업, 대학교 및 고통행량 공공 구역." },
    ],
  },
  sv: {
    heading1: "En fysisk plattform för ",
    headingHighlight: "hydrering, media och konvertering",
    features: [
      { title: "Annonsintäkter",           desc: "Monetarisera reklamkampanjer och öka varumärkens synlighet på din plats." },
      { title: "Operatörsdashboard",       desc: "Hantera kampanjer, användare, försäljning och nyckeltal i en komplett och intuitiv panel." },
      { title: "AI + Driftdata",           desc: "Smarta insikter för underhåll, prestanda, användning och expansion av ditt nätverk." },
      { title: "Återkommande intäkter",    desc: "Affärsmodell som kombinerar media, vatten och återkommande produktförsäljning." },
      { title: "QR-koder och Neo-försäljning", desc: "Omvandla skanningar till försäljning av Neo-linjen och tjäna automatiska provisioner." },
      { title: "Idealiska platser",        desc: "Flygplatser, köpcentrum, sjukhus, företag, universitet och offentliga platser med högt trafikflöde." },
    ],
  },
  fi: {
    heading1: "Fyysinen alusta ",
    headingHighlight: "hydraatiolle, medialle ja konversiolle",
    features: [
      { title: "Mainostulot",              desc: "Monetisoi mainoskampanjat ja lisää brändien näkyvyyttä toimipisteessäsi." },
      { title: "Operaattorin kojelauta",   desc: "Hallitse kampanjoita, käyttäjiä, myyntiä ja mittareita täydellisessä ja intuitiivisessa paneelissa." },
      { title: "AI + Toimintadata",        desc: "Älykkäät oivallukset verkon ylläpitoon, suorituskykyyn, käyttöön ja laajentamiseen." },
      { title: "Toistuva tuotto",          desc: "Liiketoimintamalli, joka yhdistää median, veden ja toistuvan tuotemyynnin." },
      { title: "QR-koodit ja Neo-myynti",  desc: "Muunna skannaukset Neo-linjan myynniksi ja ansaitse automaattiset provisiot." },
      { title: "Ihanteelliset sijainnit",  desc: "Lentokentät, ostoskeskukset, sairaalat, yritykset, yliopistot ja vilkkaat julkiset alueet." },
    ],
  },
  ru: {
    heading1: "Физическая платформа для ",
    headingHighlight: "гидратации, медиа и конверсии",
    features: [
      { title: "Доход от рекламы",         desc: "Монетизируйте рекламные кампании и повышайте узнаваемость брендов в вашей точке." },
      { title: "Панель оператора",         desc: "Управляйте кампаниями, пользователями, продажами и показателями в полном и интуитивном интерфейсе." },
      { title: "ИИ + Операционные данные", desc: "Интеллектуальные insights для обслуживания, производительности, использования и расширения сети." },
      { title: "Регулярный доход",         desc: "Бизнес-модель, объединяющая медиа, воду и регулярные продажи продуктов." },
      { title: "QR-коды и продажи Neo",    desc: "Конвертируйте сканирования в продажи линейки Neo и зарабатывайте автоматические комиссии." },
      { title: "Идеальные места",          desc: "Аэропорты, торговые центры, больницы, компании, университеты и общественные места с высокой проходимостью." },
    ],
  },
  ro: {
    heading1: "O platforma fizica pentru ",
    headingHighlight: "hidratare, media si conversie",
    features: [
      { title: "Venituri din publicitate",  desc: "Monetizeaza campaniile publicitare si creste vizibilitatea brandurilor la locatia ta." },
      { title: "Tabloul de bord al operatorului", desc: "Gestioneaza campanii, utilizatori, vanzari si indicatori intr-un panou complet si intuitiv." },
      { title: "AI + Date operationale",   desc: "Perspective inteligente pentru intretinere, performanta, utilizare si expansiunea retelei tale." },
      { title: "Venituri recurente",       desc: "Model de afaceri care combina media, apa si vanzari recurente de produse." },
      { title: "Coduri QR si vanzari Neo", desc: "Converteste scanarile in vanzari ale liniei Neo si castiga comisioane automate." },
      { title: "Locatii ideale",           desc: "Aeroporturi, centre comerciale, spitale, companii, universitati si zone publice cu trafic ridicat." },
    ],
  },
  he: {
    heading1: "פלטפורמה פיזית ל",
    headingHighlight: "הידרציה, מדיה והמרה",
    features: [
      { title: "הכנסות מפרסום",            desc: "ייצר הכנסות מקמפיינים פרסומיים והגדל את נראות המותגים בנקודת המכירה שלך." },
      { title: "לוח בקרה למפעיל",          desc: "נהל קמפיינים, משתמשים, מכירות ומדדים בלוח שלם ואינטואיטיבי." },
      { title: "AI + נתוני תפעול",         desc: "תובנות חכמות לתחזוקה, ביצועים, שימוש והרחבת הרשת שלך." },
      { title: "הכנסות חוזרות",            desc: "מודל עסקי המשלב מדיה, מים ומכירות חוזרות של מוצרים." },
      { title: "קודי QR ומכירות Neo",      desc: "המר סריקות למכירות קו Neo וזכה בעמלות אוטומטיות." },
      { title: "מיקומים אידיאליים",        desc: "שדות תעופה, קניונים, בתי חולים, חברות, אוניברסיטאות ואזורים ציבוריים עם תנועה גבוהה." },
    ],
  },
};

const iconSrcs  = [imgMarketing, imgDashboard, imgBrain, imgMoney, imgQR, imgLocal];
const aspectWs  = [39.76, 32, 30, 33.33, 32, 24.63];
const aspectHs  = [28.46, 32, 30, 30,    32, 30];

export default function NeoMediaFeatures() {
  const { lang } = useLang();
  const t = T[lang];

  const features = t.features.map((f, i) => ({
    icon: iconSrcs[i],
    aspectW: aspectWs[i],
    aspectH: aspectHs[i],
    title: f.title,
    desc: f.desc,
  }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading1}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <div className="flex flex-col items-center justify-center size-[40px]">
                <FigmaIcon src={f.icon} size={32} aspectW={f.aspectW} aspectH={f.aspectH} />
              </div>
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center flex items-center justify-center min-h-[44px] w-full">
                {f.title}
              </h3>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center w-full">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
