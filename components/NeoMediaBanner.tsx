"use client";
import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import Link from "next/link";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";
import { PartnerModal, FORM_T } from "./ModelosParceria";

const imgBg     = "/figma-assets/bg-h.webp";
const imgFrame  = "/figma-assets/frame-image.webp";
const imgPlanet = "/figma-assets/icon-planet-c.svg";

const imgPeople = "/figma-assets/icon-people-b.svg";
const imgWater  = "/figma-assets/icon-water-d.svg";
const imgScreen = "/figma-assets/icon-screen.svg";
const imgMoneyS = "/figma-assets/icon-money-small-s.svg";
const imgMobile = "/figma-assets/icon-mobile-d.svg";
const imgLocal  = "/figma-assets/icon-local-b.svg";

const imgPlay   = "/figma-assets/icon-play-b.svg";
const imgQR     = "/figma-assets/icon-qr-b.svg";
const imgAI     = "/figma-assets/icon-ai-30px-e.svg";
const imgMoneyL = "/figma-assets/icon-money-large-l.svg";
const imgWifi   = "/figma-assets/icon-wifi-a.svg";

const T: Record<Lang, {
  h2: string;
  pMobile: string;
  pDesktop: string;
  btnPrimary: string;
  btnSecondary: string;
  stats: { title: string; sub: string }[];
  cards: { label: string }[];
}> = {
  pt: {
    h2: "Plataforma Inteligente de Água + Mídia Digital + Receita Recorrente.",
    pMobile: "O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios. Combine água gratuita, anúncios, QR Codes e venda da linha Neo para gerar receita recorrente.",
    pDesktop: "O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios. Combine fornecimento de água gratuita e acessível, exibição de anúncios, QR Codes e venda da linha Neo para gerar valor contínuo para sua operação e para as marcas.",
    btnPrimary: "Quero ser parceiro Gold",
    btnSecondary: "Comprar o Neo Media",
    stats: [
      { title: "Alto fluxo",  sub: "de pessoas" },
      { title: "Água",        sub: "Premium" },
      { title: "Tela de 43'", sub: "de alta visibilidade" },
      { title: "Receita",     sub: "Recorrente" },
      { title: "Gestão",      sub: "via App" },
      { title: "Instalação",  sub: "Estratégica" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Receita recorrente" },
      { label: "App + IoT" },
    ],
  },
  "pt-pt": {
    h2: "Plataforma Inteligente de Água + Média Digital + Receita Recorrente.",
    pMobile: "O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios. Combine água gratuita, anúncios, QR Codes e venda da linha Neo para gerar receita recorrente.",
    pDesktop: "O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios. Combine fornecimento de água gratuita e acessível, exibição de anúncios, QR Codes e venda da linha Neo para gerar valor contínuo para a sua operação e para as marcas.",
    btnPrimary: "Quero ser parceiro Gold",
    btnSecondary: "Comprar o Neo Media",
    stats: [
      { title: "Alto fluxo",   sub: "de pessoas" },
      { title: "Água",         sub: "Premium" },
      { title: "Ecrã de 43'", sub: "de alta visibilidade" },
      { title: "Receita",      sub: "Recorrente" },
      { title: "Gestão",       sub: "via Aplicação" },
      { title: "Instalação",   sub: "Estratégica" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Receita recorrente" },
      { label: "App + IoT" },
    ],
  },
  en: {
    h2: "Smart Water Platform + Digital Media + Recurring Revenue.",
    pMobile: "Acquafy Media transforms public spaces into hydration, visibility, and business hubs. Combine free water, ads, QR Codes, and Neo line sales to generate recurring revenue.",
    pDesktop: "Acquafy Media transforms public spaces into hydration, visibility, and business hubs. Combine free and accessible water supply, ad display, QR Codes, and Neo line sales to continuously generate value for your operation and brands.",
    btnPrimary: "Become a Gold Partner",
    btnSecondary: "Buy Neo Media",
    stats: [
      { title: "High traffic",    sub: "of people" },
      { title: "Water",           sub: "Premium" },
      { title: "43\" screen",     sub: "high visibility" },
      { title: "Revenue",         sub: "Recurring" },
      { title: "Management",      sub: "via App" },
      { title: "Installation",    sub: "Strategic" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Recurring revenue" },
      { label: "App + IoT" },
    ],
  },
  "en-gb": {
    h2: "Smart Water Platform + Digital Media + Recurring Revenue.",
    pMobile: "Acquafy Media transforms public spaces into hydration, visibility, and business hubs. Combine free water, ads, QR Codes, and Neo line sales to generate recurring revenue.",
    pDesktop: "Acquafy Media transforms public spaces into hydration, visibility, and business hubs. Combine free and accessible water supply, ad display, QR Codes, and Neo line sales to continuously generate value for your operation and brands.",
    btnPrimary: "Become a Gold Partner",
    btnSecondary: "Buy Neo Media",
    stats: [
      { title: "High footfall",   sub: "of people" },
      { title: "Water",           sub: "Premium" },
      { title: "43\" screen",     sub: "high visibility" },
      { title: "Revenue",         sub: "Recurring" },
      { title: "Management",      sub: "via App" },
      { title: "Installation",    sub: "Strategic" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Recurring revenue" },
      { label: "App + IoT" },
    ],
  },
  es: {
    h2: "Plataforma Inteligente de Agua + Medios Digitales + Ingresos Recurrentes.",
    pMobile: "Acquafy Media transforma espacios públicos en puntos de hidratación, visibilidad y negocios. Combina agua gratuita, anuncios, códigos QR y ventas de la línea Neo para generar ingresos recurrentes.",
    pDesktop: "Acquafy Media transforma espacios públicos en puntos de hidratación, visibilidad y negocios. Combina suministro de agua gratuita y accesible, exhibición de anuncios, códigos QR y ventas de la línea Neo para generar valor continuo para tu operación y las marcas.",
    btnPrimary: "Quiero ser socio Gold",
    btnSecondary: "Comprar Neo Media",
    stats: [
      { title: "Alto tráfico",    sub: "de personas" },
      { title: "Agua",            sub: "Premium" },
      { title: "Pantalla de 43\"", sub: "alta visibilidad" },
      { title: "Ingresos",        sub: "Recurrentes" },
      { title: "Gestión",         sub: "vía App" },
      { title: "Instalación",     sub: "Estratégica" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Ingresos recurrentes" },
      { label: "App + IoT" },
    ],
  },
  fr: {
    h2: "Plateforme intelligente Eau + Médias Digitaux + Revenus Récurrents.",
    pMobile: "Acquafy Media transforme les espaces publics en points d'hydratation, de visibilité et d'affaires. Combinez eau gratuite, publicités, QR Codes et ventes de la gamme Neo pour générer des revenus récurrents.",
    pDesktop: "Acquafy Media transforme les espaces publics en points d'hydratation, de visibilité et d'affaires. Combinez fourniture d'eau gratuite et accessible, diffusion de publicités, QR Codes et ventes de la gamme Neo pour créer de la valeur continue pour votre opération et les marques.",
    btnPrimary: "Devenir partenaire Gold",
    btnSecondary: "Acheter Neo Media",
    stats: [
      { title: "Fort trafic",     sub: "de personnes" },
      { title: "Eau",             sub: "Premium" },
      { title: "Écran 43\"",      sub: "haute visibilité" },
      { title: "Revenus",         sub: "Récurrents" },
      { title: "Gestion",         sub: "via App" },
      { title: "Installation",    sub: "Stratégique" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Revenus récurrents" },
      { label: "App + IoT" },
    ],
  },
  de: {
    h2: "Intelligente Wasser + Digitale Medien + Wiederkehrende Einnahmen Plattform.",
    pMobile: "Acquafy Media verwandelt öffentliche Räume in Hydrations-, Sichtbarkeits- und Geschäftspunkte. Kombinieren Sie kostenloses Wasser, Werbung, QR Codes und Neo-Produktverkäufe, um wiederkehrende Einnahmen zu erzielen.",
    pDesktop: "Acquafy Media verwandelt öffentliche Räume in Hydrations-, Sichtbarkeits- und Geschäftspunkte. Kombinieren Sie kostenlosen und zugänglichen Wasserversorgung, Werbeanzeigen, QR Codes und Neo-Produktverkäufe, um kontinuierlichen Mehrwert für Ihren Betrieb und Marken zu schaffen.",
    btnPrimary: "Gold-Partner werden",
    btnSecondary: "Neo Media kaufen",
    stats: [
      { title: "Hohes Aufkommen", sub: "von Personen" },
      { title: "Wasser",          sub: "Premium" },
      { title: "43\"-Bildschirm", sub: "hohe Sichtbarkeit" },
      { title: "Einnahmen",       sub: "Wiederkehrend" },
      { title: "Verwaltung",      sub: "über App" },
      { title: "Installation",    sub: "Strategisch" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Wiederkehrende Einnahmen" },
      { label: "App + IoT" },
    ],
  },
  it: {
    h2: "Piattaforma intelligente Acqua + Media Digitali + Ricavi Ricorrenti.",
    pMobile: "Acquafy Media trasforma gli spazi pubblici in punti di idratazione, visibilità e business. Combina acqua gratuita, annunci, QR Codes e vendite della linea Neo per generare ricavi ricorrenti.",
    pDesktop: "Acquafy Media trasforma gli spazi pubblici in punti di idratazione, visibilità e business. Combina fornitura d'acqua gratuita e accessibile, visualizzazione di annunci, QR Codes e vendite della linea Neo per generare valore continuo per la tua operazione e i brand.",
    btnPrimary: "Diventa partner Gold",
    btnSecondary: "Acquista Neo Media",
    stats: [
      { title: "Alto traffico",   sub: "di persone" },
      { title: "Acqua",           sub: "Premium" },
      { title: "Schermo da 43\"", sub: "alta visibilità" },
      { title: "Ricavi",          sub: "Ricorrenti" },
      { title: "Gestione",        sub: "via App" },
      { title: "Installazione",   sub: "Strategica" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Ricavi ricorrenti" },
      { label: "App + IoT" },
    ],
  },
  zh: {
    h2: "智能水 + 数字媒体 + 经常性收入平台。",
    pMobile: "Acquafy Media 将公共空间转变为补水、可见度和商业节点。结合免费用水、广告、QR Code 和 Neo 系列销售，创造经常性收入。",
    pDesktop: "Acquafy Media 将公共空间转变为补水、可见度和商业节点。结合免费且便捷的供水、广告展示、QR Code 和 Neo 系列销售，为您的运营和品牌持续创造价值。",
    btnPrimary: "成为 Gold 合作伙伴",
    btnSecondary: "购买 Neo Media",
    stats: [
      { title: "高流量",           sub: "人群" },
      { title: "水",               sub: "Premium" },
      { title: "43英寸屏幕",       sub: "高曝光度" },
      { title: "收入",             sub: "经常性" },
      { title: "管理",             sub: "通过 App" },
      { title: "安装",             sub: "战略性" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "经常性收入" },
      { label: "App + IoT" },
    ],
  },
  ja: {
    h2: "スマートウォーター + デジタルメディア + 継続的収益プラットフォーム。",
    pMobile: "Acquafy Media は公共スペースを水分補給・視認性・ビジネスのポイントに変えます。無料の水、広告、QR Code、Neo ラインの販売を組み合わせて継続的な収益を生み出しましょう。",
    pDesktop: "Acquafy Media は公共スペースを水分補給・視認性・ビジネスのポイントに変えます。無料でアクセスしやすい給水、広告表示、QR Code、Neo ラインの販売を組み合わせて、あなたの事業とブランドに継続的な価値をもたらしましょう。",
    btnPrimary: "Gold パートナーになる",
    btnSecondary: "Neo Media を購入する",
    stats: [
      { title: "高い交通量",       sub: "人々の" },
      { title: "ウォーター",       sub: "プレミアム" },
      { title: "43インチスクリーン", sub: "高視認性" },
      { title: "収益",             sub: "継続的" },
      { title: "管理",             sub: "App 経由" },
      { title: "設置",             sub: "戦略的" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "継続的収益" },
      { label: "App + IoT" },
    ],
  },
  ko: {
    h2: "스마트 워터 + 디지털 미디어 + 반복 수익 플랫폼.",
    pMobile: "Acquafy Media는 공공 공간을 수분 보충, 가시성 및 비즈니스 포인트로 변환합니다. 무료 물, 광고, QR Code, Neo 라인 판매를 결합하여 반복 수익을 창출하세요.",
    pDesktop: "Acquafy Media는 공공 공간을 수분 보충, 가시성 및 비즈니스 포인트로 변환합니다. 무료이고 접근 가능한 물 공급, 광고 표시, QR Code, Neo 라인 판매를 결합하여 운영 및 브랜드에 지속적인 가치를 창출하세요.",
    btnPrimary: "Gold 파트너 되기",
    btnSecondary: "Neo Media 구매하기",
    stats: [
      { title: "높은 유동인구", sub: "사람들의" },
      { title: "물",            sub: "Premium" },
      { title: "43인치 화면",   sub: "높은 가시성" },
      { title: "수익",          sub: "반복적" },
      { title: "관리",          sub: "App을 통해" },
      { title: "설치",          sub: "전략적" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "반복 수익" },
      { label: "App + IoT" },
    ],
  },
  sv: {
    h2: "Smart vattenplattform + digital media + återkommande intäkter.",
    pMobile: "Acquafy Media omvandlar offentliga platser till hydrerings-, synlighets- och affärspunkter. Kombinera gratis vatten, annonser, QR-koder och Neo-linjeförsäljning för att generera återkommande intäkter.",
    pDesktop: "Acquafy Media omvandlar offentliga platser till hydrerings-, synlighets- och affärspunkter. Kombinera gratis och tillgänglig vattenförsörjning, annonsvisning, QR-koder och Neo-linjeförsäljning för att kontinuerligt skapa värde för din verksamhet och varumärken.",
    btnPrimary: "Bli Gold-partner",
    btnSecondary: "Köp Neo Media",
    stats: [
      { title: "Hög trafik",      sub: "av människor" },
      { title: "Vatten",          sub: "Premium" },
      { title: "43\"-skärm",      sub: "hög synlighet" },
      { title: "Intäkter",        sub: "Återkommande" },
      { title: "Hantering",       sub: "via App" },
      { title: "Installation",    sub: "Strategisk" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Återkommande intäkter" },
      { label: "App + IoT" },
    ],
  },
  fi: {
    h2: "Älykäs vesiympäristö + digitaalinen media + toistuva tuotto.",
    pMobile: "Acquafy Media muuttaa julkiset tilat nesteytys-, näkyvyys- ja liiketoimintapisteiksi. Yhdistä ilmainen vesi, mainokset, QR-koodit ja Neo-linjamyynti toistuvien tuottojen luomiseksi.",
    pDesktop: "Acquafy Media muuttaa julkiset tilat nesteytys-, näkyvyys- ja liiketoimintapisteiksi. Yhdistä ilmainen ja helposti saatavilla oleva vedentoimitus, mainosnäyttö, QR-koodit ja Neo-linjamyynti jatkuvan arvon luomiseksi toiminnallesi ja brändeille.",
    btnPrimary: "Liity Gold-kumppaniksi",
    btnSecondary: "Osta Neo Media",
    stats: [
      { title: "Korkea liikenne",  sub: "ihmisiä" },
      { title: "Vesi",             sub: "Premium" },
      { title: "43\"-näyttö",      sub: "korkea näkyvyys" },
      { title: "Tuotot",           sub: "Toistuvat" },
      { title: "Hallinta",         sub: "App:n kautta" },
      { title: "Asennus",          sub: "Strateginen" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Toistuvat tuotot" },
      { label: "App + IoT" },
    ],
  },
  ru: {
    h2: "Умная водная платформа + цифровые медиа + регулярный доход.",
    pMobile: "Acquafy Media превращает общественные пространства в точки гидратации, видимости и бизнеса. Объедините бесплатную воду, рекламу, QR-коды и продажи линейки Neo для получения регулярного дохода.",
    pDesktop: "Acquafy Media превращает общественные пространства в точки гидратации, видимости и бизнеса. Объедините бесплатное и доступное водоснабжение, показ рекламы, QR-коды и продажи линейки Neo для постоянного создания ценности для вашей операции и брендов.",
    btnPrimary: "Стать Gold-партнёром",
    btnSecondary: "Купить Neo Media",
    stats: [
      { title: "Высокий поток",   sub: "людей" },
      { title: "Вода",            sub: "Premium" },
      { title: "Экран 43\"",      sub: "высокая видимость" },
      { title: "Доход",           sub: "Регулярный" },
      { title: "Управление",      sub: "через App" },
      { title: "Установка",       sub: "Стратегическая" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Регулярный доход" },
      { label: "App + IoT" },
    ],
  },
  ro: {
    h2: "Platformă inteligentă de apă + media digitală + venituri recurente.",
    pMobile: "Acquafy Media transformă spațiile publice în puncte de hidratare, vizibilitate şi afaceri. Combină apă gratuită, reclame, coduri QR şi vânzări din linia Neo pentru a genera venituri recurente.",
    pDesktop: "Acquafy Media transformă spațiile publice în puncte de hidratare, vizibilitate şi afaceri. Combină furnizarea de apă gratuită şi accesibilă, afişarea reclamelor, coduri QR şi vânzări din linia Neo pentru a genera valoare continuă pentru operațiunea ta şi pentru branduri.",
    btnPrimary: "Devino partener Gold",
    btnSecondary: "Cumpără Neo Media",
    stats: [
      { title: "Trafic ridicat",   sub: "de persoane" },
      { title: "Apă",              sub: "Premium" },
      { title: "Ecran de 43\"",    sub: "vizibilitate ridicată" },
      { title: "Venituri",         sub: "Recurente" },
      { title: "Gestionare",       sub: "prin App" },
      { title: "Instalare",        sub: "Strategică" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "Venituri recurente" },
      { label: "App + IoT" },
    ],
  },
  he: {
    h2: "פלטפורמת מים חכמה + מדיה דיגיטלית + הכנסה חוזרת.",
    pMobile: "Acquafy Media הופכת מרחבים ציבוריים לנקודות הידרציה, נראות ועסקים. שלבו מים חינם, מודעות, קודי QR ומכירות קו Neo כדי לייצר הכנסה חוזרת.",
    pDesktop: "Acquafy Media הופכת מרחבים ציבוריים לנקודות הידרציה, נראות ועסקים. שלבו אספקת מים חינמית ונגישה, הצגת מודעות, קודי QR ומכירות קו Neo כדי לייצר ערך מתמשך לפעילות שלכם ולמותגים.",
    btnPrimary: "הפוך לשותף Gold",
    btnSecondary: "קנה Neo Media",
    stats: [
      { title: "תנועה גבוהה",     sub: "של אנשים" },
      { title: "מים",              sub: "Premium" },
      { title: "מסך 43\"",        sub: "נראות גבוהה" },
      { title: "הכנסה",           sub: "חוזרת" },
      { title: "ניהול",            sub: "דרך App" },
      { title: "התקנה",           sub: "אסטרטגית" },
    ],
    cards: [
      { label: "Media Network" },
      { label: "QR Code" },
      { label: "AI" },
      { label: "הכנסה חוזרת" },
      { label: "App + IoT" },
    ],
  },
};

const titleGradient = "linear-gradient(130.89deg, #0233c3 6.2%, #9f3df5 93.4%)";

function Label() {
  return (
    <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center px-[12px] py-[8px] rounded-full shrink-0">
      <FigmaIcon src={imgPlanet} size={16} />
      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
        LINHA NEO MEDIA
      </span>
    </div>
  );
}

type CardItemData = { icon: string; aspectW: number; aspectH: number; label: string };
function CardItem({ c, fullWidth }: { c: CardItemData; fullWidth?: boolean }) {
  return (
    <div
      className={`flex gap-[20px] items-center h-[80px] p-[20px] rounded-[16px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] shrink-0 ${fullWidth ? "w-full" : "w-[250px]"}`}
      style={{ background: "linear-gradient(to right, white, rgba(255,255,255,0.7))" }}
    >
      <div className="flex flex-col items-center justify-center size-[40px] shrink-0">
        <FigmaIcon src={c.icon} size={30} aspectW={c.aspectW} aspectH={c.aspectH} />
      </div>
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] flex-1">
        {c.label}
      </p>
    </div>
  );
}

export default function NeoMediaBanner() {
  const { lang } = useLang();
  const t = T[lang];
  const [modalOpen, setModalOpen] = useState(false);

  const stats = [
    { icon: imgPeople, aspectW: 40.69, aspectH: 40,  ...t.stats[0] },
    { icon: imgWater,  aspectW: 40,    aspectH: 40,  ...t.stats[1] },
    { icon: imgScreen, aspectW: 21,    aspectH: 30,  ...t.stats[2] },
    { icon: imgMoneyS, aspectW: 472,   aspectH: 440, ...t.stats[3] },
    { icon: imgMobile, aspectW: 21,    aspectH: 30,  ...t.stats[4] },
    { icon: imgLocal,  aspectW: 24.63, aspectH: 30,  ...t.stats[5] },
  ];

  const cards = [
    { icon: imgPlay,   aspectW: 26.67, aspectH: 26.67, ...t.cards[0] },
    { icon: imgQR,     aspectW: 629,   aspectH: 629,   ...t.cards[1] },
    { icon: imgAI,     aspectW: 30,    aspectH: 28,    ...t.cards[2] },
    { icon: imgMoneyL, aspectW: 33.33, aspectH: 30,    ...t.cards[3] },
    { icon: imgWifi,   aspectW: 30,    aspectH: 20,    ...t.cards[4] },
  ];

  return (
    <section className="relative flex flex-col items-center gap-[20px] px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">
      {/* BG foto — apenas >= lg (1024px) */}
      <img
        alt=""
        src={imgBg}
        className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* ── MOBILE (< lg / < 1024px) ── */}
      <div className="lg:hidden relative flex flex-col gap-[20px] items-center w-full">
        <Label />
        <h1
          className="font-['Avenir_LT_Pro:95_Black'] text-hero-md bg-clip-text text-transparent w-fit text-center"
          style={{ backgroundImage: titleGradient }}
        >
          Acquafy Media
        </h1>
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[22px] leading-[26px] text-[#1f2e91] text-center">
          {t.h2}
        </h2>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center">
          {t.pMobile}
        </p>
        <div className="flex flex-wrap gap-[16px] items-center justify-center w-full">
          <BtnAzulBaseArrow className="flex-[1_0_0] min-w-[190px] min-h-[50px] px-[20px]" onClick={() => setModalOpen(true)}>
            {t.btnPrimary}
          </BtnAzulBaseArrow>
          <Link href="/buy/checkin-acquafy-media" className="flex-[1_0_0] min-w-[190px]">
            <BtnAzulOutArrow className="w-full min-h-[50px] px-[20px]">
              {t.btnSecondary}
            </BtnAzulOutArrow>
          </Link>
        </div>
        <div className="flex flex-wrap gap-[30px_0] items-center justify-start w-full py-[25px]">
          {stats.map((s) => (
            <div key={s.title} className="flex flex-[1_0_0] gap-[10px] items-center min-w-[140px]">
              <FigmaIcon src={s.icon} size={30} aspectW={s.aspectW} aspectH={s.aspectH} />
              <div className="flex flex-col gap-[10px]">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91]">{s.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Cards + imagem do dispositivo — node 3411:6044 */}
        <div className="flex flex-wrap gap-[20px] items-center justify-end w-full">
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[280px]">
            {cards.map((c) => (
              <CardItem key={c.label} c={c} fullWidth />
            ))}
          </div>
          <div className="flex-[1_0_0] h-[482px] min-w-[280px] relative rounded-[16px] overflow-hidden">
            <img
              alt=""
              src={imgFrame}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ── TOTAL (>= lg / >= 1024px) — Figma node 3258:5155 ── */}
      <div className="hidden lg:flex relative flex-col items-center justify-center w-full xl:flex-[1_0_0] xl:min-h-px">
        <div className="flex flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full xl:flex-[1_0_0]">
          {/* Coluna esquerda — node 3258:5037 */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[280px]">
            <Label />
            <h1
              className="font-['Avenir_LT_Pro:95_Black'] text-hero bg-clip-text text-transparent w-fit"
              style={{ backgroundImage: titleGradient }}
            >
              Acquafy Media
            </h1>
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91]">
              {t.h2}
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333]">
              {t.pDesktop}
            </p>
            {/* Botões — node 3258:5041 */}
            <div className="flex flex-wrap gap-[20px] items-center justify-center xl:justify-start w-full">
              <BtnAzulBaseArrow className="min-h-[50px] px-[20px]" onClick={() => setModalOpen(true)}>
                {t.btnPrimary}
              </BtnAzulBaseArrow>
              <Link href="/buy/checkin-acquafy-media">
                <BtnAzulOutArrow className="min-h-[50px] px-[20px]">
                  {t.btnSecondary}
                </BtnAzulOutArrow>
              </Link>
            </div>
            {/* Stats — node 3410:13509 */}
            <div className="flex flex-wrap gap-[30px_0] items-center justify-center py-[25px] rounded-[16px] w-full">
              {stats.map((s) => (
                <div key={s.title} className="flex flex-[1_0_0] flex-wrap gap-[10px] items-center min-w-[200px]">
                  <div className="flex flex-col items-center justify-center shrink-0 size-[30px]">
                    <FigmaIcon src={s.icon} size={30} aspectW={s.aspectW} aspectH={s.aspectH} />
                  </div>
                  <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[100px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91]">{s.title}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Coluna direita — cards 250px — node 3258:5048 */}
          <div className="flex flex-[1_0_0] flex-col gap-[40px] items-end justify-center min-w-[280px]">
            {cards.map((c) => (
              <CardItem key={c.label} c={c} />
            ))}
          </div>
        </div>
      </div>
      {modalOpen && (
        <PartnerModal tier="gold" ft={FORM_T[lang]} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
}
