"use client";
// "Conectado à Plataforma Acquafy" (Figma node 3265:4714)
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgAppHome     = "/figma-assets/app-home-screen.webp";
const imgAppOp       = "/figma-assets/app-operations-screen.webp";
const imgQRLinks     = "/figma-assets/icon-qr-links.svg";
const imgMediaNet    = "/figma-assets/icon-medianet-a.svg";
const imgSilver      = "/figma-assets/product-silver-a.webp";
const imgGold        = "/figma-assets/product-gold-a.webp";
const imgPlatinum    = "/figma-assets/product-platinum-a.webp";
const imgVendas      = "/figma-assets/icon-vendas-a.svg";
const imgMapaGlobal  = "/figma-assets/icon-mapa-global.svg";

const T: Record<Lang, {
  heading: string;
  headingHighlight: string;
  cards: { title: string; desc: string; visual: string }[];
}> = {
  pt: {
    heading: "Conectado à",
    headingHighlight: "Plataforma Acquafy",
    cards: [
      { title: "App + AI + IoT",                  desc: "Integração completa com app, sensores e inteligência artificial para operação autônoma e eficiente.",                   visual: "app" },
      { title: "QR Codes e Links Rastreáveis",     desc: "Campanhas com QR Codes e links rastreáveis para medir impacto, origem e conversão em vendas.",                          visual: "qr" },
      { title: "Media Network",                    desc: "Acesso ao Media Network Acquafy com marcas globais e campanhas segmentadas.",                                            visual: "media" },
      { title: "Parceiros Silver, Gold & Platinum",desc: "Ecossistema de parceiros com níveis e benefícios exclusivos para sua operação.",                                        visual: "partners" },
      { title: "Vendas e Comissões",               desc: "Venda a linha Neo e ganhe 20% de comissão por cada conversão via QR Code.",                                            visual: "vendas" },
      { title: "Plataforma Global",                desc: "Pronta para operar em mais de 180 países e 16 idiomas diferentes.",                                                    visual: "mapa" },
    ],
  },
  "pt-pt": {
    heading: "Conectado à",
    headingHighlight: "Plataforma Acquafy",
    cards: [
      { title: "App + AI + IoT",                  desc: "Integração completa com aplicação, sensores e inteligência artificial para operação autónoma e eficiente.",                visual: "app" },
      { title: "QR Codes e Links Rastreáveis",     desc: "Campanhas com QR Codes e links rastreáveis para medir impacto, origem e conversão em vendas.",                          visual: "qr" },
      { title: "Media Network",                    desc: "Acesso ao Media Network Acquafy com marcas globais e campanhas segmentadas.",                                            visual: "media" },
      { title: "Parceiros Silver, Gold & Platinum",desc: "Ecossistema de parceiros com níveis e benefícios exclusivos para a sua operação.",                                      visual: "partners" },
      { title: "Vendas e Comissões",               desc: "Venda a linha Neo e ganhe 20% de comissão por cada conversão via QR Code.",                                            visual: "vendas" },
      { title: "Plataforma Global",                desc: "Pronta para operar em mais de 180 países e 16 idiomas diferentes.",                                                    visual: "mapa" },
    ],
  },
  en: {
    heading: "Connected to the",
    headingHighlight: "Acquafy Platform",
    cards: [
      { title: "App + AI + IoT",                  desc: "Full integration with app, sensors and artificial intelligence for autonomous and efficient operation.",                  visual: "app" },
      { title: "QR Codes & Trackable Links",       desc: "Campaigns with QR Codes and trackable links to measure impact, source and conversion into sales.",                       visual: "qr" },
      { title: "Media Network",                    desc: "Access to the Acquafy Media Network with global brands and segmented campaigns.",                                        visual: "media" },
      { title: "Silver, Gold & Platinum Partners", desc: "Partner ecosystem with exclusive tiers and benefits for your operation.",                                               visual: "partners" },
      { title: "Sales & Commissions",              desc: "Sell the Neo line and earn 20% commission for each conversion via QR Code.",                                           visual: "vendas" },
      { title: "Global Platform",                  desc: "Ready to operate in more than 180 countries and 16 different languages.",                                              visual: "mapa" },
    ],
  },
  "en-gb": {
    heading: "Connected to the",
    headingHighlight: "Acquafy Platform",
    cards: [
      { title: "App + AI + IoT",                  desc: "Full integration with app, sensors and artificial intelligence for autonomous and efficient operation.",                  visual: "app" },
      { title: "QR Codes & Trackable Links",       desc: "Campaigns with QR Codes and trackable links to measure impact, source and conversion into sales.",                       visual: "qr" },
      { title: "Media Network",                    desc: "Access to the Acquafy Media Network with global brands and segmented campaigns.",                                        visual: "media" },
      { title: "Silver, Gold & Platinum Partners", desc: "Partner ecosystem with exclusive tiers and benefits for your operation.",                                               visual: "partners" },
      { title: "Sales & Commissions",              desc: "Sell the Neo line and earn 20% commission for each conversion via QR Code.",                                           visual: "vendas" },
      { title: "Global Platform",                  desc: "Ready to operate in more than 180 countries and 16 different languages.",                                              visual: "mapa" },
    ],
  },
  es: {
    heading: "Conectado a la",
    headingHighlight: "Plataforma Acquafy",
    cards: [
      { title: "App + AI + IoT",                   desc: "Integración completa con app, sensores e inteligencia artificial para una operación autónoma y eficiente.",             visual: "app" },
      { title: "Códigos QR y Enlaces Rastreables",  desc: "Campañas con códigos QR y enlaces rastreables para medir impacto, origen y conversión en ventas.",                     visual: "qr" },
      { title: "Media Network",                     desc: "Acceso a la Media Network Acquafy con marcas globales y campañas segmentadas.",                                         visual: "media" },
      { title: "Socios Silver, Gold & Platinum",    desc: "Ecosistema de socios con niveles y beneficios exclusivos para su operación.",                                          visual: "partners" },
      { title: "Ventas y Comisiones",               desc: "Vende la línea Neo y gana 20% de comisión por cada conversión vía código QR.",                                        visual: "vendas" },
      { title: "Plataforma Global",                 desc: "Lista para operar en más de 180 países y 16 idiomas diferentes.",                                                     visual: "mapa" },
    ],
  },
  fr: {
    heading: "Connecté à la",
    headingHighlight: "Plateforme Acquafy",
    cards: [
      { title: "App + AI + IoT",                   desc: "Intégration complète avec l'app, les capteurs et l'intelligence artificielle pour une opération autonome et efficace.",  visual: "app" },
      { title: "QR Codes et Liens Traçables",       desc: "Campagnes avec QR Codes et liens traçables pour mesurer l'impact, la source et la conversion en ventes.",               visual: "qr" },
      { title: "Media Network",                     desc: "Accès au Media Network Acquafy avec des marques mondiales et des campagnes segmentées.",                                 visual: "media" },
      { title: "Partenaires Silver, Gold & Platinum", desc: "Écosystème de partenaires avec des niveaux et des avantages exclusifs pour votre opération.",                         visual: "partners" },
      { title: "Ventes et Commissions",              desc: "Vendez la gamme Neo et gagnez 20% de commission pour chaque conversion via QR Code.",                                  visual: "vendas" },
      { title: "Plateforme Mondiale",               desc: "Prête à opérer dans plus de 180 pays et 16 langues différentes.",                                                       visual: "mapa" },
    ],
  },
  de: {
    heading: "Verbunden mit der",
    headingHighlight: "Acquafy Plattform",
    cards: [
      { title: "App + AI + IoT",                   desc: "Vollständige Integration mit App, Sensoren und künstlicher Intelligenz für einen autonomen und effizienten Betrieb.",    visual: "app" },
      { title: "QR Codes & Trackbare Links",        desc: "Kampagnen mit QR Codes und trackbaren Links zur Messung von Wirkung, Quelle und Konversion in Verkäufe.",               visual: "qr" },
      { title: "Media Network",                     desc: "Zugang zum Acquafy Media Network mit globalen Marken und segmentierten Kampagnen.",                                      visual: "media" },
      { title: "Silver, Gold & Platinum Partner",   desc: "Partner-Ökosystem mit exklusiven Stufen und Vorteilen für Ihren Betrieb.",                                              visual: "partners" },
      { title: "Verkäufe & Provisionen",            desc: "Verkaufen Sie die Neo-Linie und verdienen Sie 20% Provision für jede Konversion per QR Code.",                          visual: "vendas" },
      { title: "Globale Plattform",                 desc: "Bereit für den Betrieb in mehr als 180 Ländern und 16 verschiedenen Sprachen.",                                         visual: "mapa" },
    ],
  },
  it: {
    heading: "Connesso alla",
    headingHighlight: "Piattaforma Acquafy",
    cards: [
      { title: "App + AI + IoT",                   desc: "Integrazione completa con app, sensori e intelligenza artificiale per un'operazione autonoma ed efficiente.",            visual: "app" },
      { title: "QR Codes e Link Tracciabili",       desc: "Campagne con QR Codes e link tracciabili per misurare impatto, origine e conversione in vendite.",                       visual: "qr" },
      { title: "Media Network",                     desc: "Accesso alla Media Network Acquafy con brand globali e campagne segmentate.",                                            visual: "media" },
      { title: "Partner Silver, Gold & Platinum",   desc: "Ecosistema di partner con livelli e vantaggi esclusivi per la tua operazione.",                                          visual: "partners" },
      { title: "Vendite e Commissioni",             desc: "Vendi la linea Neo e guadagna il 20% di commissione per ogni conversione via QR Code.",                                  visual: "vendas" },
      { title: "Piattaforma Globale",               desc: "Pronta per operare in più di 180 paesi e 16 lingue diverse.",                                                           visual: "mapa" },
    ],
  },
  zh: {
    heading: "连接至",
    headingHighlight: "Acquafy 平台",
    cards: [
      { title: "App + AI + IoT",                   desc: "与应用程序、传感器和人工智能完全集成，实现自主高效运营。",                                                               visual: "app" },
      { title: "QR Code 和可追踪链接",              desc: "通过 QR Code 和可追踪链接开展活动，衡量影响、来源和销售转化。",                                                        visual: "qr" },
      { title: "Media Network",                     desc: "接入 Acquafy Media Network，获取全球品牌和精准定向活动资源。",                                                         visual: "media" },
      { title: "Silver、Gold 和 Platinum 合作伙伴", desc: "合作伙伴生态系统，提供专属等级和专属福利，助力您的运营。",                                                           visual: "partners" },
      { title: "销售与佣金",                        desc: "销售 Neo 系列，通过 QR Code 每次转化可获得 20% 佣金。",                                                               visual: "vendas" },
      { title: "全球平台",                          desc: "已准备好在 180 多个国家和 16 种不同语言中运营。",                                                                     visual: "mapa" },
    ],
  },
  ja: {
    heading: "つながっている",
    headingHighlight: "Acquafy プラットフォーム",
    cards: [
      { title: "App + AI + IoT",                   desc: "アプリ、センサー、人工知能との完全な統合により、自律的で効率的な運用を実現。",                                          visual: "app" },
      { title: "QR Code とトラッキングリンク",      desc: "QR Code とトラッキングリンクを使ったキャンペーンで、インパクト・出所・販売コンバージョンを計測。",                    visual: "qr" },
      { title: "Media Network",                     desc: "グローバルブランドとセグメント化されたキャンペーンを持つ Acquafy Media Network にアクセス。",                          visual: "media" },
      { title: "Silver、Gold & Platinum パートナー", desc: "あなたの事業のための独占的な階層と特典を持つパートナーエコシステム。",                                               visual: "partners" },
      { title: "販売とコミッション",                desc: "Neo ラインを販売し、QR Code 経由のコンバージョンごとに 20% のコミッションを獲得。",                                   visual: "vendas" },
      { title: "グローバルプラットフォーム",         desc: "180 か国以上、16 の異なる言語で運用可能。",                                                                           visual: "mapa" },
    ],
  },
  ko: {
    heading: "연결된",
    headingHighlight: "Acquafy 플랫폼",
    cards: [
      { title: "App + AI + IoT",                   desc: "앱, 센서 및 인공지능과의 완전한 통합으로 자율적이고 효율적인 운영 실현.",                                               visual: "app" },
      { title: "QR Code와 추적 가능한 링크",         desc: "QR Code와 추적 가능한 링크를 활용한 캠페인으로 영향, 소스 및 판매 전환 측정.",                                         visual: "qr" },
      { title: "Media Network",                     desc: "글로벌 브랜드와 세분화된 캠페인을 갖춘 Acquafy Media Network에 접근.",                                                 visual: "media" },
      { title: "Silver, Gold & Platinum 파트너",    desc: "운영을 위한 전용 등급과 혜택을 갖춘 파트너 생태계.",                                                                   visual: "partners" },
      { title: "판매 및 커미션",                    desc: "Neo 라인을 판매하고 QR Code를 통한 각 전환마다 20% 커미션 획득.",                                                      visual: "vendas" },
      { title: "글로벌 플랫폼",                     desc: "180개 이상의 국가와 16가지 언어로 운영할 준비 완료.",                                                                  visual: "mapa" },
    ],
  },
  sv: {
    heading: "Ansluten till",
    headingHighlight: "Acquafy Plattformen",
    cards: [
      { title: "App + AI + IoT",                   desc: "Fullständig integration med app, sensorer och artificiell intelligens för autonom och effektiv drift.",                  visual: "app" },
      { title: "QR-koder och spårbara länkar",      desc: "Kampanjer med QR-koder och spårbara länkar för att mäta påverkan, källa och konvertering till försäljning.",            visual: "qr" },
      { title: "Media Network",                     desc: "Tillgång till Acquafy Media Network med globala varumärken och segmenterade kampanjer.",                                 visual: "media" },
      { title: "Silver, Gold & Platinum Partners",  desc: "Partnerekosystem med exklusiva nivåer och förmåner för din verksamhet.",                                                visual: "partners" },
      { title: "Försäljning och Provisioner",       desc: "Sälj Neo-linjen och tjäna 20% provision för varje konvertering via QR-kod.",                                           visual: "vendas" },
      { title: "Global Plattform",                  desc: "Redo att verka i mer än 180 länder och 16 olika språk.",                                                               visual: "mapa" },
    ],
  },
  fi: {
    heading: "Yhdistetty",
    headingHighlight: "Acquafy-alustaan",
    cards: [
      { title: "App + AI + IoT",                   desc: "Täydellinen integraatio sovelluksen, antureiden ja tekoälyn kanssa autonomista ja tehokasta toimintaa varten.",          visual: "app" },
      { title: "QR-koodit ja seurattavat linkit",   desc: "Kampanjat QR-koodeilla ja seurattavilla linkeillä vaikutuksen, lähteen ja myyntikonversion mittaamiseksi.",             visual: "qr" },
      { title: "Media Network",                     desc: "Pääsy Acquafy Media Networkiin globaalien brändien ja segmentoitujen kampanjoiden kanssa.",                              visual: "media" },
      { title: "Silver, Gold & Platinum -kumppanit",desc: "Kumppaniekosysteemi, jossa on eksklusiiviset tasot ja edut toimintaasi varten.",                                        visual: "partners" },
      { title: "Myynti ja Provisiot",               desc: "Myy Neo-linjaa ja ansaitse 20% provisio jokaisesta konversiosta QR-koodin kautta.",                                    visual: "vendas" },
      { title: "Globaali Alusta",                   desc: "Valmis toimimaan yli 180 maassa ja 16 eri kielellä.",                                                                  visual: "mapa" },
    ],
  },
  ru: {
    heading: "Подключено к",
    headingHighlight: "Платформе Acquafy",
    cards: [
      { title: "App + AI + IoT",                   desc: "Полная интеграция с приложением, датчиками и искусственным интеллектом для автономной и эффективной работы.",           visual: "app" },
      { title: "QR-коды и отслеживаемые ссылки",   desc: "Кампании с QR-кодами и отслеживаемыми ссылками для измерения эффекта, источника и конверсии в продажи.",               visual: "qr" },
      { title: "Media Network",                     desc: "Доступ к Acquafy Media Network с глобальными брендами и сегментированными кампаниями.",                                 visual: "media" },
      { title: "Партнеры Silver, Gold & Platinum",  desc: "Партнерская экосистема с эксклюзивными уровнями и преимуществами для вашей работы.",                                    visual: "partners" },
      { title: "Продажи и Комиссии",               desc: "Продавайте линейку Neo и зарабатывайте 20% комиссии за каждую конверсию через QR-код.",                                 visual: "vendas" },
      { title: "Глобальная Платформа",              desc: "Готова работать в более чем 180 странах на 16 различных языках.",                                                      visual: "mapa" },
    ],
  },
  ro: {
    heading: "Conectat la",
    headingHighlight: "Platforma Acquafy",
    cards: [
      { title: "App + AI + IoT",                   desc: "Integrare completa cu aplicatia, senzorii si inteligenta artificiala pentru o operare autonoma si eficienta.",           visual: "app" },
      { title: "Coduri QR si linkuri trasabile",    desc: "Campanii cu coduri QR si linkuri trasabile pentru a masura impactul, sursa si conversia in vanzari.",                    visual: "qr" },
      { title: "Media Network",                     desc: "Acces la Media Network Acquafy cu branduri globale si campanii segmentate.",                                             visual: "media" },
      { title: "Parteneri Silver, Gold & Platinum", desc: "Ecosistem de parteneri cu niveluri si beneficii exclusive pentru operatiunea ta.",                                      visual: "partners" },
      { title: "Vanzari si Comisioane",             desc: "Vinde linia Neo si castiga 20% comision pentru fiecare conversie prin cod QR.",                                         visual: "vendas" },
      { title: "Platforma Globala",                 desc: "Gata sa opereze in peste 180 de tari si 16 limbi diferite.",                                                            visual: "mapa" },
    ],
  },
  he: {
    heading: "מחובר אל",
    headingHighlight: "פלטפורמת Acquafy",
    cards: [
      { title: "App + AI + IoT",                   desc: "אינטגרציה מלאה עם האפליקציה, חיישנים ובינה מלאכותית לתפעול אוטונומי ויעיל.",                                           visual: "app" },
      { title: "קודי QR וקישורים ניתנים למעקב",    desc: "קמפיינים עם קודי QR וקישורים ניתנים למעקב למדידת השפעה, מקור והמרה למכירות.",                                          visual: "qr" },
      { title: "Media Network",                     desc: "גישה ל-Acquafy Media Network עם מותגים גלובליים וקמפיינים ממוקדים.",                                                  visual: "media" },
      { title: "שותפי Silver, Gold & Platinum",     desc: "מערכת אקולוגית של שותפים עם רמות והטבות בלעדיות לפעילות שלך.",                                                        visual: "partners" },
      { title: "מכירות ועמלות",                     desc: "מכור את קו Neo והרוויח 20% עמלה על כל המרה באמצעות קוד QR.",                                                          visual: "vendas" },
      { title: "פלטפורמה גלובלית",                  desc: "מוכנה לפעול ביותר מ-180 מדינות ו-16 שפות שונות.",                                                                    visual: "mapa" },
    ],
  },
};

function CardVisual({ visual }: { visual: string }) {
  if (visual === "app") {
    return (
      <div className="flex items-end justify-center w-full h-[100px] relative">
        <div className="flex items-end justify-center w-full">
          <img
            src={imgAppHome}
            alt="App Home"
            className="flex-1 min-w-0 max-w-[100px] max-h-[100px] object-contain mr-[-18px]"
          />
          <img
            src={imgAppOp}
            alt="App Operador"
            className="flex-1 min-w-0 max-w-[100px] max-h-[100px] object-contain"
          />
        </div>
      </div>
    );
  }
  if (visual === "partners") {
    return (
      <div className="flex items-center justify-center gap-[10px] h-[100px]">
        <img src={imgPlatinum} alt="Platinum" className="flex-[1_0_0] min-w-0 h-full object-contain" />
        <img src={imgGold}     alt="Gold"     className="flex-[1_0_0] min-w-0 h-full object-contain" />
        <img src={imgSilver}   alt="Silver"   className="flex-[1_0_0] min-w-0 h-full object-contain" />
      </div>
    );
  }
  const iconMap: Record<string, string> = {
    qr:    imgQRLinks,
    media: imgMediaNet,
    vendas: imgVendas,
    mapa:  imgMapaGlobal,
  };
  const src = iconMap[visual];
  return (
    <div className="flex items-center justify-center h-[100px]">
      <FigmaIcon src={src} size={80} />
    </div>
  );
}

export default function NeoMediaPlatform() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}{" "}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {t.cards.map((c) => (
            <div
              key={c.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[320px] min-w-[180px] win-1024:min-w-[300px] win-1280:min-w-[180px] p-[20px] rounded-[16px] overflow-hidden"
            >
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#333] text-center flex items-center justify-center min-h-[44px] w-full">
                {c.title}
              </h3>
              <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                <CardVisual visual={c.visual} />
              </div>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center w-full">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
