"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgSilver = "/figma-assets/product-silver-e.webp";
const imgGold = "/figma-assets/product-gold-e.webp";
const imgPlatinum = "/figma-assets/product-platinum-e.webp";
const imgCheckin = "/figma-assets/icon-check-d.svg";

const imgPartner      = "/figma-assets/icon-partner-a.svg";
const imgCertificado  = "/figma-assets/icon-certificado-b.svg";
const imgMarketing    = "/figma-assets/icon-marketing-b.svg";
const imgFone         = "/figma-assets/icon-fone-b.svg";

const TIER_ICONS = [
  { icon: imgSilver,   name: "Silver",   nameColor: "#3e4650" },
  { icon: imgGold,     name: "Gold",     nameColor: "#dfa727" },
  { icon: imgPlatinum, name: "Platinum", nameColor: "#0569ff" },
];

const BENEFIT_ICONS = [
  { icon: imgPartner,     aspectW: 43,    aspectH: 42 },
  { icon: imgCertificado, aspectW: 14.17, aspectH: 21.5 },
  { icon: imgMarketing,   aspectW: 21.5,  aspectH: 15.82 },
  { icon: imgFone,        aspectW: 21.5,  aspectH: 21.5 },
];

const T: Record<Lang, {
  h2a: string; h2b: string;
  sub: string;
  tiers: { checks: string[] }[];
  cta: string;
  benefits: string[];
}> = {
  pt: {
    h2a: "Programa de",
    h2b: " Parceria Global Acquafy",
    sub: "Cresça conosco e conquiste o mundo com a Acquafy.",
    tiers: [
      { checks: ["Suporte dedicado", "Treinamento e materiais", "Condições exclusivas", "Acesso ao App + IA"] },
      { checks: ["Operação com Media Network", "Suporte avançado", "Material de marketing", "Receita recorrente"] },
      { checks: ["Distribuição em larga escala", "Suporte premium 24h", "Soluções personalizadas", "Projetos estratégicos"] },
    ],
    cta: "Ver mais!",
    benefits: [
      "Rede global de parceiros",
      "Treinamento e certificações",
      "Marketing e campanhas exclusivas",
      "Suporte e acompanhamento contínuo",
    ],
  },
  "pt-pt": {
    h2a: "Programa de",
    h2b: " Parceria Global Acquafy",
    sub: "Cresça connosco e conquiste o mundo com a Acquafy.",
    tiers: [
      { checks: ["Suporte dedicado", "Formação e materiais", "Condições exclusivas", "Acesso à App + IA"] },
      { checks: ["Operação com Media Network", "Suporte avançado", "Material de marketing", "Receita recorrente"] },
      { checks: ["Distribuição em larga escala", "Suporte premium 24h", "Soluções personalizadas", "Projectos estratégicos"] },
    ],
    cta: "Ver mais!",
    benefits: [
      "Rede global de parceiros",
      "Formação e certificações",
      "Marketing e campanhas exclusivas",
      "Suporte e acompanhamento contínuo",
    ],
  },
  en: {
    h2a: "Global",
    h2b: " Acquafy Partnership Program",
    sub: "Grow with us and conquer the world with Acquafy.",
    tiers: [
      { checks: ["Dedicated support", "Training and materials", "Exclusive conditions", "App + AI access"] },
      { checks: ["Media Network operation", "Advanced support", "Marketing materials", "Recurring revenue"] },
      { checks: ["Large-scale distribution", "24h premium support", "Customized solutions", "Strategic projects"] },
    ],
    cta: "Learn more!",
    benefits: [
      "Global partner network",
      "Training and certifications",
      "Marketing and exclusive campaigns",
      "Ongoing support and follow-up",
    ],
  },
  "en-gb": {
    h2a: "Global",
    h2b: " Acquafy Partnership Programme",
    sub: "Grow with us and conquer the world with Acquafy.",
    tiers: [
      { checks: ["Dedicated support", "Training and materials", "Exclusive conditions", "App + AI access"] },
      { checks: ["Media Network operation", "Advanced support", "Marketing materials", "Recurring revenue"] },
      { checks: ["Large-scale distribution", "24h premium support", "Customised solutions", "Strategic projects"] },
    ],
    cta: "Learn more!",
    benefits: [
      "Global partner network",
      "Training and certifications",
      "Marketing and exclusive campaigns",
      "Ongoing support and follow-up",
    ],
  },
  es: {
    h2a: "Programa de",
    h2b: " Alianza Global Acquafy",
    sub: "Crece con nosotros y conquista el mundo con Acquafy.",
    tiers: [
      { checks: ["Soporte dedicado", "Formación y materiales", "Condiciones exclusivas", "Acceso a App + IA"] },
      { checks: ["Operación con Media Network", "Soporte avanzado", "Material de marketing", "Ingresos recurrentes"] },
      { checks: ["Distribución a gran escala", "Soporte premium 24h", "Soluciones personalizadas", "Proyectos estratégicos"] },
    ],
    cta: "¡Ver más!",
    benefits: [
      "Red global de socios",
      "Formación y certificaciones",
      "Marketing y campañas exclusivas",
      "Soporte y seguimiento continuo",
    ],
  },
  fr: {
    h2a: "Programme de",
    h2b: " Partenariat Mondial Acquafy",
    sub: "Grandissez avec nous et conquérez le monde avec Acquafy.",
    tiers: [
      { checks: ["Support dédié", "Formation et supports", "Conditions exclusives", "Accès App + IA"] },
      { checks: ["Opération avec Media Network", "Support avancé", "Supports marketing", "Revenus récurrents"] },
      { checks: ["Distribution à grande échelle", "Support premium 24h", "Solutions personnalisées", "Projets stratégiques"] },
    ],
    cta: "En savoir plus !",
    benefits: [
      "Réseau mondial de partenaires",
      "Formation et certifications",
      "Marketing et campagnes exclusives",
      "Support et suivi continu",
    ],
  },
  de: {
    h2a: "Globales",
    h2b: " Acquafy Partnerschaftsprogramm",
    sub: "Wachsen Sie mit uns und erobern Sie die Welt mit Acquafy.",
    tiers: [
      { checks: ["Dedizierter Support", "Schulungen und Materialien", "Exklusive Konditionen", "App + KI Zugang"] },
      { checks: ["Media Network Betrieb", "Erweiterter Support", "Marketingmaterialien", "Wiederkehrende Einnahmen"] },
      { checks: ["Großflächiger Vertrieb", "24h Premium-Support", "Maßgeschneiderte Lösungen", "Strategische Projekte"] },
    ],
    cta: "Mehr erfahren!",
    benefits: [
      "Globales Partnernetzwerk",
      "Schulungen und Zertifizierungen",
      "Marketing und exklusive Kampagnen",
      "Kontinuierlicher Support und Begleitung",
    ],
  },
  it: {
    h2a: "Programma di",
    h2b: " Partnership Globale Acquafy",
    sub: "Cresci con noi e conquista il mondo con Acquafy.",
    tiers: [
      { checks: ["Supporto dedicato", "Formazione e materiali", "Condizioni esclusive", "Accesso App + IA"] },
      { checks: ["Operazione con Media Network", "Supporto avanzato", "Materiale di marketing", "Entrate ricorrenti"] },
      { checks: ["Distribuzione su larga scala", "Supporto premium 24h", "Soluzioni personalizzate", "Progetti strategici"] },
    ],
    cta: "Scopri di più!",
    benefits: [
      "Rete globale di partner",
      "Formazione e certificazioni",
      "Marketing e campagne esclusive",
      "Supporto e follow-up continuo",
    ],
  },
  zh: {
    h2a: "全球",
    h2b: " Acquafy 合作伙伴计划",
    sub: "与我们共同成长，携手 Acquafy 征服全球市场。",
    tiers: [
      { checks: ["专属支持", "培训与资料", "专属条件", "App + AI 访问"] },
      { checks: ["媒体网络运营", "高级支持", "营销素材", "持续性收入"] },
      { checks: ["大规模分销", "24小时高级支持", "定制化解决方案", "战略性项目"] },
    ],
    cta: "了解更多！",
    benefits: [
      "全球合作伙伴网络",
      "培训与认证",
      "营销与专属活动",
      "持续支持与跟踪",
    ],
  },
  ja: {
    h2a: "グローバル",
    h2b: " Acquafy パートナーシッププログラム",
    sub: "私たちと一緒に成長し、Acquafy で世界を制覇しましょう。",
    tiers: [
      { checks: ["専任サポート", "トレーニングと資料", "独占的条件", "App + AI アクセス"] },
      { checks: ["Media Network 運営", "高度なサポート", "マーケティング素材", "継続的な収益"] },
      { checks: ["大規模流通", "24時間プレミアムサポート", "カスタマイズソリューション", "戦略的プロジェクト"] },
    ],
    cta: "詳細を見る！",
    benefits: [
      "グローバルパートナーネットワーク",
      "トレーニングと認定資格",
      "マーケティングと独占キャンペーン",
      "継続的なサポートとフォローアップ",
    ],
  },
  ko: {
    h2a: "글로벌",
    h2b: " Acquafy 파트너십 프로그램",
    sub: "우리와 함께 성장하고 Acquafy로 세계를 정복하세요.",
    tiers: [
      { checks: ["전담 지원", "교육 및 자료", "독점 조건", "App + AI 접근"] },
      { checks: ["Media Network 운영", "고급 지원", "마케팅 자료", "반복 수익"] },
      { checks: ["대규모 유통", "24시간 프리미엄 지원", "맞춤형 솔루션", "전략적 프로젝트"] },
    ],
    cta: "더 알아보기!",
    benefits: [
      "글로벌 파트너 네트워크",
      "교육 및 인증",
      "마케팅 및 독점 캠페인",
      "지속적인 지원 및 팔로우업",
    ],
  },
  sv: {
    h2a: "Globalt",
    h2b: " Acquafy Partnerprogram",
    sub: "Väx med oss och erövra världen med Acquafy.",
    tiers: [
      { checks: ["Dedikerad support", "Utbildning och material", "Exklusiva villkor", "App + AI-åtkomst"] },
      { checks: ["Media Network-drift", "Avancerad support", "Marknadsföringsmaterial", "Återkommande intäkter"] },
      { checks: ["Storskalig distribution", "24h premiumsupport", "Anpassade lösningar", "Strategiska projekt"] },
    ],
    cta: "Läs mer!",
    benefits: [
      "Globalt partnernätverk",
      "Utbildning och certifieringar",
      "Marknadsföring och exklusiva kampanjer",
      "Löpande support och uppföljning",
    ],
  },
  fi: {
    h2a: "Globaali",
    h2b: " Acquafy-kumppanuusohjelma",
    sub: "Kasva kanssamme ja valloita maailma Acquafyn avulla.",
    tiers: [
      { checks: ["Omistettu tuki", "Koulutus ja materiaalit", "Eksklusiiviset ehdot", "Sovellus + tekoäly-pääsy"] },
      { checks: ["Media Network -toiminta", "Edistynyt tuki", "Markkinointimateriaalit", "Toistuva tuotto"] },
      { checks: ["Laajamittainen jakelu", "24h premium-tuki", "Räätälöidyt ratkaisut", "Strategiset projektit"] },
    ],
    cta: "Lue lisää!",
    benefits: [
      "Globaali kumppaniverkosto",
      "Koulutus ja sertifioinnit",
      "Markkinointi ja eksklusiiviset kampanjat",
      "Jatkuva tuki ja seuranta",
    ],
  },
  ru: {
    h2a: "Глобальная",
    h2b: " партнёрская программа Acquafy",
    sub: "Растите вместе с нами и завоёвывайте мир с Acquafy.",
    tiers: [
      { checks: ["Выделенная поддержка", "Обучение и материалы", "Эксклюзивные условия", "Доступ к App + ИИ"] },
      { checks: ["Работа с Media Network", "Расширенная поддержка", "Маркетинговые материалы", "Регулярный доход"] },
      { checks: ["Крупномасштабное распределение", "Премиум-поддержка 24ч", "Персонализированные решения", "Стратегические проекты"] },
    ],
    cta: "Узнать больше!",
    benefits: [
      "Глобальная партнёрская сеть",
      "Обучение и сертификации",
      "Маркетинг и эксклюзивные кампании",
      "Постоянная поддержка и сопровождение",
    ],
  },
  ro: {
    h2a: "Program de",
    h2b: " Parteneriat Global Acquafy",
    sub: "Creste cu noi si cucereste lumea cu Acquafy.",
    tiers: [
      { checks: ["Suport dedicat", "Instruire si materiale", "Conditii exclusive", "Acces la App + IA"] },
      { checks: ["Operare cu Media Network", "Suport avansat", "Materiale de marketing", "Venituri recurente"] },
      { checks: ["Distributie la scara larga", "Suport premium 24h", "Solutii personalizate", "Proiecte strategice"] },
    ],
    cta: "Afla mai multe!",
    benefits: [
      "Retea globala de parteneri",
      "Instruire si certificari",
      "Marketing si campanii exclusive",
      "Suport si monitorizare continua",
    ],
  },
  he: {
    h2a: "תוכנית",
    h2b: " השותפות הגלובלית של Acquafy",
    sub: "צמחו איתנו וכבשו את העולם עם Acquafy.",
    tiers: [
      { checks: ["תמיכה ייעודית", "הדרכה וחומרים", "תנאים בלעדיים", "גישה לאפליקציה + AI"] },
      { checks: ["הפעלת Media Network", "תמיכה מתקדמת", "חומרי שיווק", "הכנסה חוזרת"] },
      { checks: ["הפצה בהיקף נרחב", "תמיכת פרמיום 24 שעות", "פתרונות מותאמים אישית", "פרויקטים אסטרטגיים"] },
    ],
    cta: "למד עוד!",
    benefits: [
      "רשת שותפים גלובלית",
      "הדרכה והסמכות",
      "שיווק וקמפיינים בלעדיים",
      "תמיכה ומעקב מתמשכים",
    ],
  },
};

export default function Parceria() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col gap-[20px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[5px] items-center max-w-[1400px] overflow-hidden w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] min-w-[240px] w-full text-center lg:text-left">
          <span className="text-[#2a2a2b]">{t.h2a}</span>
          <span className="text-[#0233c3]">{t.h2b}</span>
        </h2>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full text-center lg:text-left">
          {t.sub}
        </p>
      </div>

      <div className="flex flex-wrap gap-[10px] items-stretch justify-center max-w-[1400px] overflow-hidden w-full">
        {TIER_ICONS.map((tier, ti) => (
          <div
            key={tier.name}
            className="bg-[#f6f9fe] flex flex-1 flex-wrap gap-y-[20px] items-start min-w-[280px] p-[20px] rounded-[16px]"
          >
            <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[280px]">
              <div className="flex flex-col gap-[20px] items-start w-full">
                <div className="flex gap-[10px] items-center w-full">
                  <div className="flex flex-col items-center justify-center size-[46px] shrink-0">
                    <img alt={tier.name} className="w-full h-full object-contain" src={tier.icon} />
                  </div>
                  <p
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] flex-1 min-w-0"
                    style={{ color: tier.nameColor }}
                  >
                    {tier.name}
                  </p>
                </div>
                <div className="flex flex-col gap-[10px] items-start w-full">
                  {t.tiers[ti].checks.map((check) => (
                    <div key={check} className="flex gap-[8px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={8} aspectW={9} aspectH={6.44} />
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[15px] text-[#2a2a2b] flex-1 min-w-0">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="/parceria" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] w-full cursor-pointer">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center flex-1 min-w-0">
                  {t.cta}
                </span>
              </a>
            </div>
          </div>
        ))}

        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-center justify-between min-h-[206px] min-w-[280px] p-[20px] rounded-[16px]">
          {BENEFIT_ICONS.map((item, bi) => (
            <div key={bi} className="flex gap-[10px] items-center w-full">
              <FigmaIcon src={item.icon} size={20} aspectW={item.aspectW} aspectH={item.aspectH} />
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-1 min-w-0">
                {t.benefits[bi]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
