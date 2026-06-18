"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

const imgCloud  = "/figma-assets/op-cloud.svg";
const imgQR     = "/figma-assets/op-qr.svg";
const imgMoney  = "/figma-assets/op-money.svg";
const imgMobile = "/figma-assets/op-mobile.svg";
const imgMedia  = "/figma-assets/op-media.svg";
const imgPlanet = "/figma-assets/op-planet.svg";

const T: Record<Lang, {
  headingA: string;
  headingB: string;
  features: { icon: string; title: string; desc: string }[];
}> = {
  pt: {
    headingA: "Uma operação ",
    headingB: "global, simples e inteligente",
    features: [
      { icon: imgCloud,  title: "Plataforma Cloud",   desc: "Infraestrutura segura, escalável e sempre disponível." },
      { icon: imgQR,     title: "QR Codes e Links",   desc: "Gere links e QR Codes personalizados para vendas e mídia." },
      { icon: imgMoney,  title: "Vendas e Comissões", desc: "Acompanha vendas, comissões e relatórios em tempo real." },
      { icon: imgMobile, title: "App + AI + IoT",     desc: "Controle total, dados inteligentes e gestão de dispositivos." },
      { icon: imgMedia,  title: "Media Network",      desc: "Rede de conteúdo e valor para sua operação." },
      { icon: imgPlanet, title: "Plataforma Cloud",   desc: "Infraestrutura segura, escalável e sempre disponível." },
    ],
  },
  "pt-pt": {
    headingA: "Uma operação ",
    headingB: "global, simples e inteligente",
    features: [
      { icon: imgCloud,  title: "Plataforma Cloud",   desc: "Infraestrutura segura, escalável e sempre disponível." },
      { icon: imgQR,     title: "QR Codes e Links",   desc: "Gere links e QR Codes personalizados para vendas e média." },
      { icon: imgMoney,  title: "Vendas e Comissões", desc: "Acompanhe vendas, comissões e relatórios em tempo real." },
      { icon: imgMobile, title: "App + AI + IoT",     desc: "Controlo total, dados inteligentes e gestão de dispositivos." },
      { icon: imgMedia,  title: "Media Network",      desc: "Rede de conteúdo e valor para a sua operação." },
      { icon: imgPlanet, title: "Plataforma Cloud",   desc: "Infraestrutura segura, escalável e sempre disponível." },
    ],
  },
  en: {
    headingA: "One operation — ",
    headingB: "global, simple and smart",
    features: [
      { icon: imgCloud,  title: "Cloud Platform",      desc: "Secure, scalable infrastructure, always available." },
      { icon: imgQR,     title: "QR Codes & Links",    desc: "Generate custom links and QR Codes for sales and media." },
      { icon: imgMoney,  title: "Sales & Commissions", desc: "Track sales, commissions and real-time reports." },
      { icon: imgMobile, title: "App + AI + IoT",      desc: "Full control, smart data and device management." },
      { icon: imgMedia,  title: "Media Network",       desc: "Content and value network for your operation." },
      { icon: imgPlanet, title: "Cloud Platform",      desc: "Secure, scalable infrastructure, always available." },
    ],
  },
  es: {
    headingA: "Una operación ",
    headingB: "global, simple e inteligente",
    features: [
      { icon: imgCloud,  title: "Plataforma Cloud",    desc: "Infraestructura segura, escalable y siempre disponible." },
      { icon: imgQR,     title: "QR Codes y Links",    desc: "Genera links y QR Codes personalizados para ventas y medios." },
      { icon: imgMoney,  title: "Ventas y Comisiones", desc: "Sigue ventas, comisiones e informes en tiempo real." },
      { icon: imgMobile, title: "App + AI + IoT",      desc: "Control total, datos inteligentes y gestión de dispositivos." },
      { icon: imgMedia,  title: "Media Network",       desc: "Red de contenido y valor para tu operación." },
      { icon: imgPlanet, title: "Plataforma Cloud",    desc: "Infraestructura segura, escalable y siempre disponible." },
    ],
  },
  fr: {
    headingA: "Une opération — ",
    headingB: "mondiale, simple et intelligente",
    features: [
      { icon: imgCloud,  title: "Cloud Platform",       desc: "Infrastructure sécurisée, évolutive et toujours disponible." },
      { icon: imgQR,     title: "Codes QR & Liens",     desc: "Générez des liens et codes QR personnalisés pour les ventes et médias." },
      { icon: imgMoney,  title: "Ventes & Commissions", desc: "Suivez les ventes, commissions et rapports en temps réel." },
      { icon: imgMobile, title: "App + AI + IoT",       desc: "Contrôle total, données intelligentes et gestion des appareils." },
      { icon: imgMedia,  title: "Media Network",        desc: "Réseau de contenu et de valeur pour votre opération." },
      { icon: imgPlanet, title: "Cloud Platform",       desc: "Infrastructure sécurisée, évolutive et toujours disponible." },
    ],
  },
  de: {
    headingA: "Ein Betrieb — ",
    headingB: "global, einfach und intelligent",
    features: [
      { icon: imgCloud,  title: "Cloud Platform",        desc: "Sichere, skalierbare Infrastruktur, immer verfügbar." },
      { icon: imgQR,     title: "QR-Codes & Links",      desc: "Benutzerdefinierte Links und QR-Codes für Verkauf und Medien generieren." },
      { icon: imgMoney,  title: "Verkauf & Provisionen", desc: "Verkäufe, Provisionen und Echtzeitberichte verfolgen." },
      { icon: imgMobile, title: "App + AI + IoT",        desc: "Vollständige Kontrolle, intelligente Daten und Geräteverwaltung." },
      { icon: imgMedia,  title: "Media Network",         desc: "Inhalts- und Wertnetzwerk für Ihren Betrieb." },
      { icon: imgPlanet, title: "Cloud Platform",        desc: "Sichere, skalierbare Infrastruktur, immer verfügbar." },
    ],
  },
  it: {
    headingA: "Un'operazione — ",
    headingB: "globale, semplice e intelligente",
    features: [
      { icon: imgCloud,  title: "Cloud Platform",        desc: "Infrastruttura sicura, scalabile e sempre disponibile." },
      { icon: imgQR,     title: "Codici QR & Link",      desc: "Genera link e codici QR personalizzati per vendite e media." },
      { icon: imgMoney,  title: "Vendite & Commissioni", desc: "Monitora vendite, commissioni e report in tempo reale." },
      { icon: imgMobile, title: "App + AI + IoT",        desc: "Controllo totale, dati intelligenti e gestione dei dispositivi." },
      { icon: imgMedia,  title: "Media Network",         desc: "Rete di contenuti e valore per la tua operazione." },
      { icon: imgPlanet, title: "Cloud Platform",        desc: "Infrastruttura sicura, scalabile e sempre disponibile." },
    ],
  },
  zh: {
    headingA: "一个运营 — ",
    headingB: "全球化、简洁、智能",
    features: [
      { icon: imgCloud,  title: "Cloud Platform",   desc: "安全、可扩展且始终可用的基础设施。" },
      { icon: imgQR,     title: "二维码与链接",       desc: "为销售和媒体生成自定义链接和二维码。" },
      { icon: imgMoney,  title: "销售与佣金",         desc: "实时追踪销售、佣金和报告。" },
      { icon: imgMobile, title: "App + AI + IoT",   desc: "全面控制、智能数据与设备管理。" },
      { icon: imgMedia,  title: "Media Network",    desc: "为您的运营提供内容与价值网络。" },
      { icon: imgPlanet, title: "Cloud Platform",   desc: "安全、可扩展且始终可用的基础设施。" },
    ],
  },
  ja: {
    headingA: "ひとつの運営 — ",
    headingB: "グローバル、シンプル、スマート",
    features: [
      { icon: imgCloud,  title: "Cloud Platform",     desc: "安全でスケーラブル、常に利用可能なインフラ。" },
      { icon: imgQR,     title: "QRコード & リンク",   desc: "販売とメディア向けのカスタムリンクとQRコードを生成。" },
      { icon: imgMoney,  title: "販売 & コミッション", desc: "販売・コミッション・リアルタイムレポートを追跡。" },
      { icon: imgMobile, title: "App + AI + IoT",     desc: "完全なコントロール、スマートデータ、デバイス管理。" },
      { icon: imgMedia,  title: "Media Network",      desc: "運営のためのコンテンツと価値のネットワーク。" },
      { icon: imgPlanet, title: "Cloud Platform",     desc: "安全でスケーラブル、常に利用可能なインフラ。" },
    ],
  },
  ko: {
    headingA: "하나의 운영 — ",
    headingB: "글로벌, 단순, 스마트",
    features: [
      { icon: imgCloud,  title: "Cloud Platform",     desc: "안전하고 확장 가능하며 항상 사용 가능한 인프라." },
      { icon: imgQR,     title: "QR 코드 & 링크",     desc: "판매 및 미디어를 위한 맞춤형 링크와 QR 코드 생성." },
      { icon: imgMoney,  title: "판매 & 커미션",       desc: "판매, 커미션 및 실시간 보고서 추적." },
      { icon: imgMobile, title: "App + AI + IoT",     desc: "완전한 제어, 스마트 데이터, 기기 관리." },
      { icon: imgMedia,  title: "Media Network",      desc: "운영을 위한 콘텐츠 및 가치 네트워크." },
      { icon: imgPlanet, title: "Cloud Platform",     desc: "안전하고 확장 가능하며 항상 사용 가능한 인프라." },
    ],
  },
};

export default function OperacaoGlobal() {
  const { lang } = useLang();
  const t = T[lang];
  const features = t.features;

  return (
    <section className="bg-white flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[28px] text-center min-w-[240px] w-full">
          <span className="text-[#1f2e91]">{t.headingA}</span>
          <span className="text-[#0569ff]">{t.headingB}</span>
        </h2>

        <div className="flex flex-wrap gap-[10px] items-start justify-center w-full">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[110px] min-w-[200px] p-[20px] rounded-[16px]"
            >
              <img src={f.icon} alt="" className="size-[30px] object-contain shrink-0" />
              <div className="flex flex-col gap-[10px] items-start text-center w-full shrink-0">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[16px] leading-[20px] text-[#1f2e91] min-h-[32px] shrink-0 w-full">
                  {f.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] not-italic text-[14px] leading-[16px] text-[#333] shrink-0 w-full">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
