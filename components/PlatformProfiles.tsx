"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgAdmin    = "/figma-assets/icon-admin.svg";
const imgSilver   = "/figma-assets/product-silver-c.webp";
const imgGold     = "/figma-assets/product-gold-d.webp";
const imgPlatinum = "/figma-assets/product-platinum-c.webp";
const imgMegaphone= "/figma-assets/icon-megaphone.svg";

const T: Record<Lang, {
  heading: string;
  profiles: { title: string; desc: string }[];
}> = {
  pt: {
    heading: "Perfis de acesso",
    profiles: [
      { title: "Admin Acquafy",    desc: "Acesso total à plataforma e gestão global." },
      { title: "Parceiro Silver",  desc: "Vendas, comissões e acompanhamento." },
      { title: "Parceiro Gold",    desc: "Gestão de equipe, vendas, comissões e relatórios." },
      { title: "Parceiro Platinum", desc: "Gestão avançada, regras FOB e performance." },
      { title: "Anunciante",       desc: "Criação e gestão de campanhas e mídia." },
    ],
  },
  "pt-pt": {
    heading: "Perfis de acesso",
    profiles: [
      { title: "Admin Acquafy",    desc: "Acesso total à plataforma e gestão global." },
      { title: "Parceiro Silver",  desc: "Vendas, comissões e acompanhamento." },
      { title: "Parceiro Gold",    desc: "Gestão de equipa, vendas, comissões e relatórios." },
      { title: "Parceiro Platinum", desc: "Gestão avançada, regras FOB e performance." },
      { title: "Anunciante",       desc: "Criação e gestão de campanhas e média." },
    ],
  },
  en: {
    heading: "Access profiles",
    profiles: [
      { title: "Admin Acquafy",    desc: "Full platform access and global management." },
      { title: "Silver Partner",   desc: "Sales, commissions and tracking." },
      { title: "Gold Partner",     desc: "Team management, sales, commissions and reports." },
      { title: "Platinum Partner", desc: "Advanced management, FOB rules and performance." },
      { title: "Advertiser",       desc: "Campaign and media creation and management." },
    ],
  },
  "en-gb": {
    heading: "Access profiles",
    profiles: [
      { title: "Admin Acquafy",    desc: "Full platform access and global management." },
      { title: "Silver Partner",   desc: "Sales, commissions and tracking." },
      { title: "Gold Partner",     desc: "Team management, sales, commissions and reports." },
      { title: "Platinum Partner", desc: "Advanced management, FOB rules and performance." },
      { title: "Advertiser",       desc: "Campaign and media creation and management." },
    ],
  },
  es: {
    heading: "Perfiles de acceso",
    profiles: [
      { title: "Admin Acquafy",    desc: "Acceso total a la plataforma y gestión global." },
      { title: "Socio Silver",     desc: "Ventas, comisiones y seguimiento." },
      { title: "Socio Gold",       desc: "Gestión de equipo, ventas, comisiones e informes." },
      { title: "Socio Platinum",   desc: "Gestión avanzada, reglas FOB y rendimiento." },
      { title: "Anunciante",       desc: "Creación y gestión de campañas y medios." },
    ],
  },
  fr: {
    heading: "Profils d'accès",
    profiles: [
      { title: "Admin Acquafy",    desc: "Accès total à la plateforme et gestion mondiale." },
      { title: "Partenaire Silver", desc: "Ventes, commissions et suivi." },
      { title: "Partenaire Gold",  desc: "Gestion d'équipe, ventes, commissions et rapports." },
      { title: "Partenaire Platinum", desc: "Gestion avancée, règles FOB et performance." },
      { title: "Annonceur",        desc: "Création et gestion de campagnes et médias." },
    ],
  },
  de: {
    heading: "Zugriffsprofile",
    profiles: [
      { title: "Admin Acquafy",    desc: "Vollständiger Plattformzugriff und globales Management." },
      { title: "Silver Partner",   desc: "Verkauf, Provisionen und Tracking." },
      { title: "Gold Partner",     desc: "Teamverwaltung, Verkauf, Provisionen und Berichte." },
      { title: "Platinum Partner", desc: "Erweitertes Management, FOB-Regeln und Performance." },
      { title: "Werbetreibender",  desc: "Kampagnen- und Medienerstellung und -verwaltung." },
    ],
  },
  it: {
    heading: "Profili di accesso",
    profiles: [
      { title: "Admin Acquafy",    desc: "Accesso completo alla piattaforma e gestione globale." },
      { title: "Partner Silver",   desc: "Vendite, commissioni e monitoraggio." },
      { title: "Partner Gold",     desc: "Gestione del team, vendite, commissioni e report." },
      { title: "Partner Platinum", desc: "Gestione avanzata, regole FOB e performance." },
      { title: "Inserzionista",    desc: "Creazione e gestione di campagne e media." },
    ],
  },
  zh: {
    heading: "访问权限",
    profiles: [
      { title: "Admin Acquafy",    desc: "完整平台访问权限与全球管理。" },
      { title: "Silver 合作伙伴",  desc: "销售、佣金与追踪。" },
      { title: "Gold 合作伙伴",    desc: "团队管理、销售、佣金与报告。" },
      { title: "Platinum 合作伙伴", desc: "高级管理、FOB 规则与绩效。" },
      { title: "广告商",            desc: "活动和媒体的创建与管理。" },
    ],
  },
  ja: {
    heading: "アクセスプロファイル",
    profiles: [
      { title: "Admin Acquafy",    desc: "プラットフォームへの完全アクセスとグローバル管理。" },
      { title: "Silver パートナー", desc: "販売、コミッション、トラッキング。" },
      { title: "Gold パートナー",   desc: "チーム管理、販売、コミッション、レポート。" },
      { title: "Platinum パートナー", desc: "高度な管理、FOBルール、パフォーマンス。" },
      { title: "広告主",            desc: "キャンペーンとメディアの作成・管理。" },
    ],
  },
  ko: {
    heading: "접근 프로필",
    profiles: [
      { title: "Admin Acquafy",    desc: "플랫폼 전체 접근 및 글로벌 관리." },
      { title: "Silver 파트너",    desc: "판매, 커미션 및 추적." },
      { title: "Gold 파트너",      desc: "팀 관리, 판매, 커미션 및 보고서." },
      { title: "Platinum 파트너",  desc: "고급 관리, FOB 규칙 및 성과." },
      { title: "광고주",            desc: "캠페인 및 미디어 생성과 관리." },
    ],
  },
  sv: {
    heading: "Åtkomstprofiler",
    profiles: [
      { title: "Admin Acquafy",    desc: "Full plattformsåtkomst och global hantering." },
      { title: "Silver Partner",   desc: "Försäljning, provisioner och uppföljning." },
      { title: "Gold Partner",     desc: "Teamhantering, försäljning, provisioner och rapporter." },
      { title: "Platinum Partner", desc: "Avancerad hantering, FOB-regler och prestanda." },
      { title: "Annonsör",         desc: "Skapande och hantering av kampanjer och media." },
    ],
  },
  fi: {
    heading: "Käyttöprofiilit",
    profiles: [
      { title: "Admin Acquafy",    desc: "Täysi pääsy alustalle ja globaali hallinta." },
      { title: "Silver-kumppani",  desc: "Myynti, provisiot ja seuranta." },
      { title: "Gold-kumppani",    desc: "Tiimin hallinta, myynti, provisiot ja raportit." },
      { title: "Platinum-kumppani", desc: "Edistynyt hallinta, FOB-säännöt ja suorituskyky." },
      { title: "Mainostaja",       desc: "Kampanjoiden ja median luominen ja hallinta." },
    ],
  },
  ru: {
    heading: "Профили доступа",
    profiles: [
      { title: "Admin Acquafy",    desc: "Полный доступ к платформе и глобальное управление." },
      { title: "Silver партнёр",   desc: "Продажи, комиссии и отслеживание." },
      { title: "Gold партнёр",     desc: "Управление командой, продажи, комиссии и отчёты." },
      { title: "Platinum партнёр", desc: "Расширенное управление, правила FOB и производительность." },
      { title: "Рекламодатель",    desc: "Создание и управление кампаниями и медиа." },
    ],
  },
  ro: {
    heading: "Profiluri de acces",
    profiles: [
      { title: "Admin Acquafy",    desc: "Acces complet la platformă și management global." },
      { title: "Partener Silver",  desc: "Vânzări, comisioane și urmărire." },
      { title: "Partener Gold",    desc: "Managementul echipei, vânzări, comisioane și rapoarte." },
      { title: "Partener Platinum", desc: "Management avansat, reguli FOB și performanță." },
      { title: "Anunțător",        desc: "Creare și gestionare de campanii și media." },
    ],
  },
  he: {
    heading: "פרופילי גישה",
    profiles: [
      { title: "Admin Acquafy",    desc: "גישה מלאה לפלטפורמה וניהול גלובלי." },
      { title: "שותף Silver",      desc: "מכירות, עמלות ומעקב." },
      { title: "שותף Gold",        desc: "ניהול צוות, מכירות, עמלות ודוחות." },
      { title: "שותף Platinum",    desc: "ניהול מתקדם, כללי FOB וביצועים." },
      { title: "מפרסם",            desc: "יצירה וניהול של קמפיינים ומדיה." },
    ],
  },
};

const iconSrcs  = [imgAdmin, imgSilver, imgGold, imgPlatinum, imgMegaphone];
const iconTypes = ["svg", "png", "png", "png", "svg"] as const;
const iconWs    = [440, 40, 40, 40, 185];
const iconHs    = [512, 40, 40, 40, 185];

export default function PlatformProfiles() {
  const { lang } = useLang();
  const t = T[lang];

  const profiles = t.profiles.map((p, i) => ({
    iconType: iconTypes[i],
    icon: iconSrcs[i],
    iconW: iconWs[i],
    iconH: iconHs[i],
    title: p.title,
    desc: p.desc,
  }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>

        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
          {profiles.map((p) => (
            <div key={p.title} className="bg-[#f6f9fe] flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[240px] p-[20px] rounded-[16px]">
              <div className="flex items-center justify-center shrink-0 size-[40px]">
                {p.iconType === "png" ? (
                  <img alt={p.title} className="size-full object-contain" src={p.icon} />
                ) : (
                  <FigmaIcon src={p.icon} size={40} aspectW={p.iconW} aspectH={p.iconH} />
                )}
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{p.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
