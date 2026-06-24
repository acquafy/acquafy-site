"use client";
// "Como funciona na prática" — 4 numbered steps (Figma node 3258:5253)
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgWater    = "/figma-assets/icon-water-c.svg";
const imgMarketing= "/figma-assets/icon-marketing-d.svg";
const imgBrain    = "/figma-assets/icon-brain-c.svg";
const imgScale    = "/figma-assets/icon-scale-a.svg";
const imgArrow    = "/figma-assets/icon-arrow-a.svg";

// aspectW/aspectH do Figma (node 3258:5253):
// water → 470×450 (landscape), marketing → 39.76×28.46 (landscape),
// brain → 30×30 (sq), scale → 30×30 (sq)
const stepMeta = [
  { num: "01", icon: imgWater,     aspectW: 470,   aspectH: 450  },
  { num: "02", icon: imgMarketing, aspectW: 39.76, aspectH: 28.46 },
  { num: "03", icon: imgBrain,     aspectW: 30,    aspectH: 30   },
  { num: "04", icon: imgScale,     aspectW: 30,    aspectH: 30   },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  steps: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Como funciona",
    heading2: " na prática",
    steps: [
      { title: "Instale o Acquafy Media",         desc: "Instalação rápida e integração à Plataforma Acquafy." },
      { title: "Exiba campanhas e QR Codes",       desc: "Mostre anúncios, ofertas e QR Codes para o público de forma inteligente." },
      { title: "Capte dados e monitore com IA",    desc: "Acompanhe uso, engajamento e performance com inteligência artificial." },
      { title: "Gere receita com mídia e vendas",  desc: "Receba por campanhas publicitárias e comissões sobre vendas da linha Neo." },
    ],
  },
  "pt-pt": {
    heading1: "Como funciona",
    heading2: " na prática",
    steps: [
      { title: "Instale o Acquafy Media",         desc: "Instalação rápida e integração à Plataforma Acquafy." },
      { title: "Exiba campanhas e QR Codes",       desc: "Mostre anúncios, ofertas e QR Codes ao público de forma inteligente." },
      { title: "Capture dados e monitorize com IA", desc: "Acompanhe o uso, envolvimento e performance com inteligência artificial." },
      { title: "Gere receita com média e vendas",  desc: "Receba por campanhas publicitárias e comissões sobre vendas da linha Neo." },
    ],
  },
  en: {
    heading1: "How it works",
    heading2: " in practice",
    steps: [
      { title: "Install Acquafy Media",               desc: "Quick installation and integration with the Acquafy Platform." },
      { title: "Display campaigns and QR Codes",      desc: "Show ads, offers and QR Codes to the audience intelligently." },
      { title: "Capture data and monitor with AI",    desc: "Track usage, engagement and performance with artificial intelligence." },
      { title: "Generate revenue with media and sales", desc: "Earn from advertising campaigns and commissions on Neo line sales." },
    ],
  },
  "en-gb": {
    heading1: "How it works",
    heading2: " in practice",
    steps: [
      { title: "Install Acquafy Media",               desc: "Quick installation and integration with the Acquafy Platform." },
      { title: "Display campaigns and QR Codes",      desc: "Show ads, offers and QR Codes to the audience intelligently." },
      { title: "Capture data and monitor with AI",    desc: "Track usage, engagement and performance with artificial intelligence." },
      { title: "Generate revenue with media and sales", desc: "Earn from advertising campaigns and commissions on Neo line sales." },
    ],
  },
  es: {
    heading1: "Cómo funciona",
    heading2: " en la práctica",
    steps: [
      { title: "Instala el Acquafy Media",              desc: "Instalación rápida e integración a la Plataforma Acquafy." },
      { title: "Muestra campañas y QR Codes",           desc: "Exhibe anuncios, ofertas y QR Codes al público de forma inteligente." },
      { title: "Captura datos y monitorea con IA",      desc: "Sigue el uso, engagement y rendimiento con inteligencia artificial." },
      { title: "Genera ingresos con medios y ventas",   desc: "Recibe por campañas publicitarias y comisiones sobre ventas de la línea Neo." },
    ],
  },
  fr: {
    heading1: "Comment ça fonctionne",
    heading2: " en pratique",
    steps: [
      { title: "Installez Acquafy Media",                  desc: "Installation rapide et intégration avec la Plateforme Acquafy." },
      { title: "Diffusez des campagnes et QR Codes",        desc: "Affichez des publicités, offres et QR Codes au public de façon intelligente." },
      { title: "Collectez des données et surveillez avec l'IA", desc: "Suivez l'utilisation, l'engagement et les performances avec l'intelligence artificielle." },
      { title: "Générez des revenus avec médias et ventes", desc: "Percevez des revenus de campagnes publicitaires et des commissions sur les ventes de la gamme Neo." },
    ],
  },
  de: {
    heading1: "So funktioniert es",
    heading2: " in der Praxis",
    steps: [
      { title: "Acquafy Media installieren",               desc: "Schnelle Installation und Integration mit der Acquafy Plattform." },
      { title: "Kampagnen und QR Codes anzeigen",           desc: "Zeigen Sie Werbung, Angebote und QR Codes intelligent dem Publikum." },
      { title: "Daten erfassen und mit KI überwachen",      desc: "Verfolgen Sie Nutzung, Engagement und Performance mit künstlicher Intelligenz." },
      { title: "Einnahmen mit Medien und Verkäufen erzielen", desc: "Verdienen Sie durch Werbekampagnen und Provisionen auf Neo-Produktverkäufe." },
    ],
  },
  it: {
    heading1: "Come funziona",
    heading2: " nella pratica",
    steps: [
      { title: "Installa Acquafy Media",                   desc: "Installazione rapida e integrazione con la Piattaforma Acquafy." },
      { title: "Mostra campagne e QR Codes",                desc: "Visualizza annunci, offerte e QR Codes al pubblico in modo intelligente." },
      { title: "Acquisisci dati e monitora con AI",         desc: "Monitora utilizzo, engagement e performance con intelligenza artificiale." },
      { title: "Genera ricavi con media e vendite",         desc: "Incassa dalle campagne pubblicitarie e commissioni sulle vendite della linea Neo." },
    ],
  },
  zh: {
    heading1: "实际操作",
    heading2: "中的运作方式",
    steps: [
      { title: "安装 Acquafy Media",                       desc: "快速安装并与 Acquafy 平台集成。" },
      { title: "展示活动和 QR Code",                        desc: "智能地向受众展示广告、优惠和 QR Code。" },
      { title: "通过 AI 采集数据并监控",                    desc: "利用人工智能追踪使用情况、参与度和绩效。" },
      { title: "通过媒体和销售创造收入",                    desc: "通过广告活动和 Neo 系列产品销售佣金获得收益。" },
    ],
  },
  ja: {
    heading1: "実際の",
    heading2: "仕組み",
    steps: [
      { title: "Acquafy Media をインストール",              desc: "迅速なインストールと Acquafy プラットフォームへの統合。" },
      { title: "キャンペーンと QR Code を表示",             desc: "広告、オファー、QR Code をオーディエンスにインテリジェントに表示。" },
      { title: "AI でデータを収集・監視",                   desc: "人工知能で使用状況、エンゲージメント、パフォーマンスを追跡。" },
      { title: "メディアと販売で収益を生む",                desc: "広告キャンペーンと Neo ライン販売のコミッションで収益を獲得。" },
    ],
  },
  ko: {
    heading1: "실제로",
    heading2: " 작동하는 방식",
    steps: [
      { title: "Acquafy Media 설치",                       desc: "빠른 설치와 Acquafy 플랫폼과의 통합." },
      { title: "캠페인과 QR Code 표시",                    desc: "광고, 오퍼 및 QR Code를 대중에게 스마트하게 표시." },
      { title: "AI로 데이터 수집 및 모니터링",              desc: "인공지능으로 사용량, 참여도 및 성과를 추적." },
      { title: "미디어와 판매로 수익 창출",                 desc: "광고 캠페인 수익과 Neo 라인 판매 커미션을 획득." },
    ],
  },
  sv: {
    heading1: "Hur det fungerar",
    heading2: " i praktiken",
    steps: [
      { title: "Installera Acquafy Media",                  desc: "Snabb installation och integration med Acquafy-plattformen." },
      { title: "Visa kampanjer och QR-koder",               desc: "Visa annonser, erbjudanden och QR-koder till publiken på ett smart sätt." },
      { title: "Samla data och övervaka med AI",             desc: "Spåra användning, engagemang och prestanda med artificiell intelligens." },
      { title: "Generera intäkter med media och försäljning", desc: "Tjäna på reklamkampanjer och provisioner på Neo-linjens försäljning." },
    ],
  },
  fi: {
    heading1: "Miten se toimii",
    heading2: " käytännössä",
    steps: [
      { title: "Asenna Acquafy Media",                      desc: "Nopea asennus ja integrointi Acquafy-alustaan." },
      { title: "Näytä kampanjoita ja QR-koodeja",           desc: "Esitä mainoksia, tarjouksia ja QR-koodeja yleisölle älykkäästi." },
      { title: "Kerää dataa ja seuraa tekoälyllä",          desc: "Seuraa käyttöä, sitoutumista ja suorituskykyä tekoälyn avulla." },
      { title: "Luo tuloja medialla ja myynnillä",          desc: "Ansaitse mainoskampanjoista ja provisioista Neo-linjan myynnistä." },
    ],
  },
  ru: {
    heading1: "Как это работает",
    heading2: " на практике",
    steps: [
      { title: "Установите Acquafy Media",                  desc: "Быстрая установка и интеграция с платформой Acquafy." },
      { title: "Показывайте кампании и QR-коды",            desc: "Демонстрируйте рекламу, предложения и QR-коды аудитории разумно." },
      { title: "Собирайте данные и следите с ИИ",           desc: "Отслеживайте использование, вовлеченность и эффективность с помощью искусственного интеллекта." },
      { title: "Генерируйте доход через медиа и продажи",   desc: "Зарабатывайте на рекламных кампаниях и комиссионных с продаж линейки Neo." },
    ],
  },
  ro: {
    heading1: "Cum functioneaza",
    heading2: " in practica",
    steps: [
      { title: "Instaleaza Acquafy Media",                  desc: "Instalare rapida si integrare cu Platforma Acquafy." },
      { title: "Afiseaza campanii si QR Codes",             desc: "Arata reclame, oferte si QR Codes publicului in mod inteligent." },
      { title: "Capteaza date si monitorizeaza cu IA",      desc: "Urmareste utilizarea, implicarea si performanta cu inteligenta artificiala." },
      { title: "Genereaza venituri cu media si vanzari",    desc: "Castiga din campanii publicitare si comisioane pe vanzarile liniei Neo." },
    ],
  },
  he: {
    heading1: "איך זה עובד",
    heading2: " בפועל",
    steps: [
      { title: "התקן את Acquafy Media",                    desc: "התקנה מהירה ואינטגרציה עם פלטפורמת Acquafy." },
      { title: "הצג קמפיינים וקודי QR",                   desc: "הצג מודעות, הצעות וקודי QR לקהל באופן חכם." },
      { title: "אסוף נתונים ועקוב עם בינה מלאכותית",     desc: "עקוב אחר שימוש, מעורבות וביצועים עם בינה מלאכותית." },
      { title: "יצור הכנסות עם מדיה ומכירות",             desc: "הרווח מקמפיינים פרסומיים ועמלות על מכירות קו Neo." },
    ],
  },
};

export default function NeoMediaHowItWorks() {
  const { lang } = useLang();
  const t = T[lang];

  const steps = t.steps.map((s, i) => ({ ...stepMeta[i], ...s }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] rounded-[16px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          <span className="text-[#0569ff]">{t.heading1}</span>
          {t.heading2}
        </h2>
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {steps.map((s, i) => (
            <div key={s.num} className="relative bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[280px] p-[20px] rounded-[16px]">
              {/* Icon circle + step number */}
              <div className="relative flex gap-[20px] items-center justify-center w-full">
                <div className="border border-[#cbd0d4] flex flex-col items-center justify-center p-[24px] rounded-full size-[100px] shrink-0">
                  <FigmaIcon src={s.icon} size={40} aspectW={s.aspectW} aspectH={s.aspectH} />
                </div>
                <span className="absolute right-0 top-0 font-['Avenir_LT_Pro:85_Heavy'] text-[40px] leading-[50px] text-[#0569ff]">
                  {s.num}
                </span>
              </div>
              {/* Title */}
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center flex items-center justify-center min-h-[44px] w-full">
                {s.title}
              </h3>
              {/* Desc */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center w-full">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
