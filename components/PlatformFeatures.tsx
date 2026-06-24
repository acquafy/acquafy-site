"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgHouse       = "/figma-assets/icon-house.svg";
const imgParceiros   = "/figma-assets/icon-parceiros-a.svg";
const imgQrCodes     = "/figma-assets/icon-qr-codes-a.svg";
const imgMediaNet    = "/figma-assets/icon-medianet-b.svg";
const imgProdNeo     = "/figma-assets/icon-prod-neo-a.svg";
const imgVendas      = "/figma-assets/icon-vendas-b.svg";
const imgComissoes   = "/figma-assets/icon-comissoes-a.svg";
const imgAppIotAi    = "/figma-assets/icon-app-iot-ai.svg";
const imgMapa        = "/figma-assets/icon-mapa.svg";
const imgConfig      = "/figma-assets/icon-config.svg";

const featureIcons = [
  { bg: "#0569ff", icon: imgHouse,     iconW: 22, iconH: 22 },
  { bg: "#6e54ef", icon: imgParceiros, iconW: 20, iconH: 18 },
  { bg: "#0fb3eb", icon: imgQrCodes,   iconW: 20, iconH: 20 },
  { bg: "#004afb", icon: imgMediaNet,  iconW: 20, iconH: 17 },
  { bg: "#06ae4c", icon: imgProdNeo,   iconW: 18, iconH: 20 },
  { bg: "#faad46", icon: imgVendas,    iconW: 20, iconH: 17 },
  { bg: "#0569ff", icon: imgComissoes, iconW: 20, iconH: 20 },
  { bg: "#6e54ef", icon: imgAppIotAi,  iconW: 20, iconH: 20 },
  { bg: "#0fb3eb", icon: imgMapa,      iconW: 20, iconH: 20 },
  { bg: "#8a8f97", icon: imgConfig,    iconW: 20, iconH: 20 },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  features: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Tudo em uma ",
    heading2: "única plataforma",
    features: [
      { title: "Dashboard Global",  desc: "Visão completa do negócio em tempo real." },
      { title: "Parceiros",         desc: "Gestão de parceiros e níveis." },
      { title: "QR Codes",          desc: "Criação e gestão de QR Codes." },
      { title: "Media Network",     desc: "Gestão de mídia e campanhas." },
      { title: "Produtos Neo",      desc: "Catálogo da linha Neo e acessórios." },
      { title: "Vendas",            desc: "Pedidos, clientes e faturamento." },
      { title: "Comissões",         desc: "Cálculo e pagamento de comissões." },
      { title: "App + IoT + AI",    desc: "Dispositivos, IoT e inteligência." },
      { title: "Mapa Global",       desc: "Operação global e multi-região." },
      { title: "Configurações",     desc: "Ajustes, usuários e permissões." },
    ],
  },
  "pt-pt": {
    heading1: "Tudo numa ",
    heading2: "única plataforma",
    features: [
      { title: "Dashboard Global",  desc: "Visão completa do negócio em tempo real." },
      { title: "Parceiros",         desc: "Gestão de parceiros e níveis." },
      { title: "QR Codes",          desc: "Criação e gestão de QR Codes." },
      { title: "Media Network",     desc: "Gestão de média e campanhas." },
      { title: "Produtos Neo",      desc: "Catálogo da linha Neo e acessórios." },
      { title: "Vendas",            desc: "Encomendas, clientes e faturação." },
      { title: "Comissões",         desc: "Cálculo e pagamento de comissões." },
      { title: "App + IoT + AI",    desc: "Dispositivos, IoT e inteligência." },
      { title: "Mapa Global",       desc: "Operação global e multi-região." },
      { title: "Configurações",     desc: "Ajustes, utilizadores e permissões." },
    ],
  },
  en: {
    heading1: "Everything in a ",
    heading2: "single platform",
    features: [
      { title: "Global Dashboard",  desc: "Full business overview in real time." },
      { title: "Partners",          desc: "Partner and tier management." },
      { title: "QR Codes",          desc: "QR Code creation and management." },
      { title: "Media Network",     desc: "Media and campaign management." },
      { title: "Neo Products",      desc: "Neo line catalog and accessories." },
      { title: "Sales",             desc: "Orders, customers and billing." },
      { title: "Commissions",       desc: "Commission calculation and payment." },
      { title: "App + IoT + AI",    desc: "Devices, IoT and intelligence." },
      { title: "Global Map",        desc: "Global and multi-region operation." },
      { title: "Settings",          desc: "Adjustments, users and permissions." },
    ],
  },
  "en-gb": {
    heading1: "Everything in a ",
    heading2: "single platform",
    features: [
      { title: "Global Dashboard",  desc: "Full business overview in real time." },
      { title: "Partners",          desc: "Partner and tier management." },
      { title: "QR Codes",          desc: "QR Code creation and management." },
      { title: "Media Network",     desc: "Media and campaign management." },
      { title: "Neo Products",      desc: "Neo line catalogue and accessories." },
      { title: "Sales",             desc: "Orders, customers and billing." },
      { title: "Commissions",       desc: "Commission calculation and payment." },
      { title: "App + IoT + AI",    desc: "Devices, IoT and intelligence." },
      { title: "Global Map",        desc: "Global and multi-region operation." },
      { title: "Settings",          desc: "Adjustments, users and permissions." },
    ],
  },
  es: {
    heading1: "Todo en una ",
    heading2: "única plataforma",
    features: [
      { title: "Dashboard Global",  desc: "Visión completa del negocio en tiempo real." },
      { title: "Socios",            desc: "Gestión de socios y niveles." },
      { title: "Códigos QR",        desc: "Creación y gestión de códigos QR." },
      { title: "Media Network",     desc: "Gestión de medios y campañas." },
      { title: "Productos Neo",     desc: "Catálogo de la línea Neo y accesorios." },
      { title: "Ventas",            desc: "Pedidos, clientes y facturación." },
      { title: "Comisiones",        desc: "Cálculo y pago de comisiones." },
      { title: "App + IoT + AI",    desc: "Dispositivos, IoT e inteligencia." },
      { title: "Mapa Global",       desc: "Operación global y multi-región." },
      { title: "Configuraciones",   desc: "Ajustes, usuarios y permisos." },
    ],
  },
  fr: {
    heading1: "Tout en une ",
    heading2: "seule plateforme",
    features: [
      { title: "Tableau de bord global", desc: "Vue complète de l'activité en temps réel." },
      { title: "Partenaires",            desc: "Gestion des partenaires et des niveaux." },
      { title: "Codes QR",               desc: "Création et gestion des codes QR." },
      { title: "Media Network",          desc: "Gestion des médias et des campagnes." },
      { title: "Produits Neo",           desc: "Catalogue de la gamme Neo et accessoires." },
      { title: "Ventes",                 desc: "Commandes, clients et facturation." },
      { title: "Commissions",            desc: "Calcul et paiement des commissions." },
      { title: "App + IoT + AI",         desc: "Appareils, IoT et intelligence." },
      { title: "Carte Mondiale",         desc: "Opération mondiale et multi-région." },
      { title: "Paramètres",             desc: "Réglages, utilisateurs et permissions." },
    ],
  },
  de: {
    heading1: "Alles in einer ",
    heading2: "einzigen Plattform",
    features: [
      { title: "Globales Dashboard",  desc: "Vollständiger Unternehmensüberblick in Echtzeit." },
      { title: "Partner",             desc: "Partner- und Stufenverwaltung." },
      { title: "QR-Codes",            desc: "QR-Code-Erstellung und -Verwaltung." },
      { title: "Media Network",       desc: "Medien- und Kampagnenverwaltung." },
      { title: "Neo Produkte",        desc: "Neo-Linienkatalog und Zubehör." },
      { title: "Verkauf",             desc: "Bestellungen, Kunden und Abrechnung." },
      { title: "Provisionen",         desc: "Provisionsberechnung und -zahlung." },
      { title: "App + IoT + AI",      desc: "Geräte, IoT und Intelligenz." },
      { title: "Globale Karte",       desc: "Globaler und multi-regionaler Betrieb." },
      { title: "Einstellungen",       desc: "Anpassungen, Benutzer und Berechtigungen." },
    ],
  },
  it: {
    heading1: "Tutto in un'",
    heading2: "unica piattaforma",
    features: [
      { title: "Dashboard Globale",   desc: "Visione completa del business in tempo reale." },
      { title: "Partner",             desc: "Gestione partner e livelli." },
      { title: "Codici QR",           desc: "Creazione e gestione dei codici QR." },
      { title: "Media Network",       desc: "Gestione media e campagne." },
      { title: "Prodotti Neo",        desc: "Catalogo della linea Neo e accessori." },
      { title: "Vendite",             desc: "Ordini, clienti e fatturazione." },
      { title: "Commissioni",         desc: "Calcolo e pagamento delle commissioni." },
      { title: "App + IoT + AI",      desc: "Dispositivi, IoT e intelligenza." },
      { title: "Mappa Globale",       desc: "Operazione globale e multi-regione." },
      { title: "Impostazioni",        desc: "Configurazioni, utenti e permessi." },
    ],
  },
  zh: {
    heading1: "一切尽在",
    heading2: "单一平台",
    features: [
      { title: "全球仪表盘",           desc: "实时全面了解业务状况。" },
      { title: "合作伙伴",             desc: "合作伙伴及等级管理。" },
      { title: "二维码",               desc: "二维码的创建与管理。" },
      { title: "Media Network",        desc: "媒体与活动管理。" },
      { title: "Neo 产品",             desc: "Neo 系列目录及配件。" },
      { title: "销售",                 desc: "订单、客户与开票。" },
      { title: "佣金",                 desc: "佣金计算与支付。" },
      { title: "App + IoT + AI",       desc: "设备、IoT 与智能化。" },
      { title: "全球地图",             desc: "全球及多区域运营。" },
      { title: "设置",                 desc: "调整、用户与权限。" },
    ],
  },
  ja: {
    heading1: "すべてが",
    heading2: "ひとつのプラットフォームに",
    features: [
      { title: "グローバルダッシュボード", desc: "リアルタイムでビジネス全体を把握。" },
      { title: "パートナー",              desc: "パートナーとティアの管理。" },
      { title: "QRコード",               desc: "QRコードの作成と管理。" },
      { title: "Media Network",          desc: "メディアとキャンペーンの管理。" },
      { title: "Neo製品",                desc: "Neoラインのカタログとアクセサリー。" },
      { title: "販売",                   desc: "注文、顧客、請求管理。" },
      { title: "コミッション",            desc: "コミッションの計算と支払い。" },
      { title: "App + IoT + AI",         desc: "デバイス、IoT、インテリジェンス。" },
      { title: "グローバルマップ",        desc: "グローバルおよびマルチリージョン運営。" },
      { title: "設定",                   desc: "調整、ユーザー、権限管理。" },
    ],
  },
  ko: {
    heading1: "모든 것이 담긴 ",
    heading2: "단일 플랫폼",
    features: [
      { title: "글로벌 대시보드",         desc: "실시간 비즈니스 전체 현황 파악." },
      { title: "파트너",                  desc: "파트너 및 등급 관리." },
      { title: "QR 코드",                desc: "QR 코드 생성 및 관리." },
      { title: "Media Network",          desc: "미디어 및 캠페인 관리." },
      { title: "Neo 제품",               desc: "Neo 라인 카탈로그 및 액세서리." },
      { title: "판매",                   desc: "주문, 고객 및 청구." },
      { title: "커미션",                  desc: "커미션 계산 및 지급." },
      { title: "App + IoT + AI",         desc: "기기, IoT 및 인텔리전스." },
      { title: "글로벌 지도",            desc: "글로벌 및 다지역 운영." },
      { title: "설정",                   desc: "조정, 사용자 및 권한." },
    ],
  },
  sv: {
    heading1: "Allt i en ",
    heading2: "enda plattform",
    features: [
      { title: "Global instrumentpanel", desc: "Fullständig affärsöversikt i realtid." },
      { title: "Partners",               desc: "Hantering av partners och nivå." },
      { title: "QR-koder",               desc: "Skapande och hantering av QR-koder." },
      { title: "Media Network",          desc: "Hantering av media och kampanjer." },
      { title: "Neo-produkter",          desc: "Katalog över Neo-linjen och tillbehör." },
      { title: "Försäljning",            desc: "Ordrar, kunder och fakturering." },
      { title: "Provisioner",            desc: "Beräkning och betalning av provisioner." },
      { title: "App + IoT + AI",         desc: "Enheter, IoT och intelligens." },
      { title: "Global karta",           desc: "Global och multi-regional drift." },
      { title: "Inställningar",          desc: "Justeringar, användare och behörigheter." },
    ],
  },
  fi: {
    heading1: "Kaikki yhdessä ",
    heading2: "alustassa",
    features: [
      { title: "Globaali kojelauta",     desc: "Kattava liiketoimintakatsaus reaaliajassa." },
      { title: "Kumppanit",              desc: "Kumppaneiden ja tasojen hallinta." },
      { title: "QR-koodit",              desc: "QR-koodien luominen ja hallinta." },
      { title: "Media Network",          desc: "Median ja kampanjoiden hallinta." },
      { title: "Neo-tuotteet",           desc: "Neo-linjan luettelo ja lisälaitteet." },
      { title: "Myynti",                 desc: "Tilaukset, asiakkaat ja laskutus." },
      { title: "Provisiot",              desc: "Provisioiden laskenta ja maksaminen." },
      { title: "App + IoT + AI",         desc: "Laitteet, IoT ja älykkyys." },
      { title: "Globaali kartta",        desc: "Globaali ja monen alueen toiminta." },
      { title: "Asetukset",              desc: "Säädöt, käyttäjät ja oikeudet." },
    ],
  },
  ru: {
    heading1: "Vse v odnoj ",
    heading2: "platforme",
    features: [
      { title: "Globalnyj dashboard",    desc: "Polnyj obzor biznesa v realnom vremeni." },
      { title: "Partnery",               desc: "Upravlenie partnerami i urovnyami." },
      { title: "QR-kody",                desc: "Sozdanie i upravlenie QR-kodami." },
      { title: "Media Network",          desc: "Upravlenie media i kampaniyami." },
      { title: "Produkty Neo",           desc: "Katalog linii Neo i aksessuary." },
      { title: "Prodazhi",               desc: "Zakazy, klienty i vystavlenie schetov." },
      { title: "Komissii",               desc: "Raschet i oplata komissij." },
      { title: "App + IoT + AI",         desc: "Ustrojstva, IoT i intellekt." },
      { title: "Globalnaya karta",       desc: "Globalnyj i mnogoregionalnyj rezhim." },
      { title: "Nastrojki",              desc: "Nastrojki, polzovateli i razresheniya." },
    ],
  },
  ro: {
    heading1: "Tot intr-o ",
    heading2: "singura platforma",
    features: [
      { title: "Panou global",           desc: "Prezentare completa a afacerii in timp real." },
      { title: "Parteneri",              desc: "Gestionarea partenerilor si a nivelurilor." },
      { title: "Coduri QR",              desc: "Crearea si gestionarea codurilor QR." },
      { title: "Media Network",          desc: "Gestionarea media si a campaniilor." },
      { title: "Produse Neo",            desc: "Catalogul liniei Neo si accesorii." },
      { title: "Vanzari",                desc: "Comenzi, clienti si facturare." },
      { title: "Comisioane",             desc: "Calculul si plata comisioanelor." },
      { title: "App + IoT + AI",         desc: "Dispozitive, IoT si inteligenta." },
      { title: "Harta globala",          desc: "Operatiune globala si multi-regionala." },
      { title: "Setari",                 desc: "Ajustari, utilizatori si permisiuni." },
    ],
  },
  he: {
    heading1: "הכל בפלטפורמה ",
    heading2: "אחת",
    features: [
      { title: "לוח בקרה גלובלי",        desc: "סקירה עסקית מלאה בזמן אמת." },
      { title: "שותפים",                  desc: "ניהול שותפים ורמות." },
      { title: "קודי QR",                desc: "יצירה וניהול של קודי QR." },
      { title: "Media Network",           desc: "ניהול מדיה וקמפיינים." },
      { title: "מוצרי Neo",               desc: "קטלוג קו Neo ואביזרים." },
      { title: "מכירות",                  desc: "הזמנות, לקוחות וחיוב." },
      { title: "עמלות",                   desc: "חישוב ותשלום עמלות." },
      { title: "App + IoT + AI",          desc: "מכשירים, IoT ובינה מלאכותית." },
      { title: "מפה גלובלית",             desc: "פעילות גלובלית ורב-אזורית." },
      { title: "הגדרות",                  desc: "התאמות, משתמשים והרשאות." },
    ],
  },
};

export default function PlatformFeatures() {
  const { lang } = useLang();
  const t = T[lang];

  const features = featureIcons.map((ico, i) => ({ ...ico, ...t.features[i] }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
          {features.map((f) => (
            <div key={f.title} className="bg-[#f6f9fe] flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[240px] p-[20px] rounded-[16px]">
              <div className="flex items-center justify-center p-[15px] rounded-[12px] shrink-0 size-[60px]" style={{ backgroundColor: f.bg }}>
                <FigmaIcon src={f.icon} size={30} aspectW={f.iconW} aspectH={f.iconH} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{f.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
