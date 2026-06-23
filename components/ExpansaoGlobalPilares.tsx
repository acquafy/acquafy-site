"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// Aspect ratios from Figma design
const imgParceria  = "/figma-assets/icon-parceria-large.svg";  // 1125×1078 ≈ sq
const imgEscala    = "/figma-assets/icon-escala.svg";  // 30×30 sq
const imgAdaptacao = "/figma-assets/icon-adaptacao.svg";  // 38×40 portrait
const imgEducacao  = "/figma-assets/icon-educacao.svg";  // 30×22 landscape
const imgSustent   = "/figma-assets/icon-sustent-large.svg";  // 492×475 ≈ sq

const T: Record<Lang, {
  heading: string;
  pillars: { title: string; desc: string }[];
}> = {
  pt: {
    heading: "Nossos pilares para expansão",
    pillars: [
      { title: "Parcerias estratégicas", desc: "Trabalhamos com distribuidores, integradores e investidores que compartilham nossa visão de impacto e crescimento." },
      { title: "Modelo escalável",       desc: "Tecnologia própria, operação padronizada e suporte completo para garantir crescimento consistente e rentável." },
      { title: "Adaptação local",        desc: "Soluções flexíveis que se adaptam à cultura, necessidades e regulamentações de cada mercado." },
      { title: "Capacitação contínua",   desc: "Treinamentos, marketing e suporte técnico para impulsionar nossos parceiros e garantir o sucesso da operação." },
      { title: "Impacto sustentável",    desc: "Promovemos saúde, inclusão, renda e preservação ambiental por meio do acesso a água pura e consciente." },
    ],
  },
  "pt-pt": {
    heading: "Os nossos pilares para a expansão",
    pillars: [
      { title: "Parcerias estratégicas", desc: "Trabalhamos com distribuidores, integradores e investidores que partilham a nossa visão de impacto e crescimento." },
      { title: "Modelo escalável",       desc: "Tecnologia própria, operação padronizada e suporte completo para garantir um crescimento consistente e rentável." },
      { title: "Adaptação local",        desc: "Soluções flexíveis que se adaptam à cultura, necessidades e regulamentações de cada mercado." },
      { title: "Capacitação contínua",   desc: "Formações, marketing e suporte técnico para impulsionar os nossos parceiros e garantir o sucesso da operação." },
      { title: "Impacto sustentável",    desc: "Promovemos saúde, inclusão, rendimento e preservação ambiental através do acesso a água pura e consciente." },
    ],
  },
  en: {
    heading: "Our pillars for expansion",
    pillars: [
      { title: "Strategic partnerships", desc: "We work with distributors, integrators and investors who share our vision of impact and growth." },
      { title: "Scalable model",         desc: "Proprietary technology, standardized operations and full support to ensure consistent and profitable growth." },
      { title: "Local adaptation",       desc: "Flexible solutions that adapt to the culture, needs and regulations of each market." },
      { title: "Continuous training",    desc: "Training, marketing and technical support to empower our partners and ensure operational success." },
      { title: "Sustainable impact",     desc: "We promote health, inclusion, income and environmental preservation through access to clean and conscious water." },
    ],
  },
  "en-gb": {
    heading: "Our pillars for expansion",
    pillars: [
      { title: "Strategic partnerships", desc: "We work with distributors, integrators and investors who share our vision of impact and growth." },
      { title: "Scalable model",         desc: "Proprietary technology, standardised operations and full support to ensure consistent and profitable growth." },
      { title: "Local adaptation",       desc: "Flexible solutions that adapt to the culture, needs and regulations of each market." },
      { title: "Continuous training",    desc: "Training, marketing and technical support to empower our partners and ensure operational success." },
      { title: "Sustainable impact",     desc: "We promote health, inclusion, income and environmental preservation through access to clean and conscious water." },
    ],
  },
  es: {
    heading: "Nuestros pilares para la expansión",
    pillars: [
      { title: "Alianzas estratégicas",  desc: "Trabajamos con distribuidores, integradores e inversores que comparten nuestra visión de impacto y crecimiento." },
      { title: "Modelo escalable",       desc: "Tecnología propia, operación estandarizada y soporte completo para garantizar un crecimiento consistente y rentable." },
      { title: "Adaptación local",       desc: "Soluciones flexibles que se adaptan a la cultura, necesidades y regulaciones de cada mercado." },
      { title: "Capacitación continua",  desc: "Capacitaciones, marketing y soporte técnico para impulsar a nuestros socios y garantizar el éxito de la operación." },
      { title: "Impacto sostenible",     desc: "Promovemos salud, inclusión, ingresos y preservación ambiental a través del acceso al agua pura y consciente." },
    ],
  },
  fr: {
    heading: "Nos piliers pour l'expansion",
    pillars: [
      { title: "Partenariats stratégiques", desc: "Nous travaillons avec des distributeurs, intégrateurs et investisseurs qui partagent notre vision d'impact et de croissance." },
      { title: "Modèle évolutif",           desc: "Technologie propriétaire, opérations standardisées et support complet pour assurer une croissance cohérente et rentable." },
      { title: "Adaptation locale",         desc: "Des solutions flexibles qui s'adaptent à la culture, aux besoins et aux réglementations de chaque marché." },
      { title: "Formation continue",        desc: "Formation, marketing et support technique pour renforcer nos partenaires et garantir le succès opérationnel." },
      { title: "Impact durable",            desc: "Nous promouvons la santé, l'inclusion, le revenu et la préservation de l'environnement grâce à l'accès à une eau pure et responsable." },
    ],
  },
  de: {
    heading: "Unsere Säulen für die Expansion",
    pillars: [
      { title: "Strategische Partnerschaften", desc: "Wir arbeiten mit Distributoren, Integratoren und Investoren zusammen, die unsere Vision von Wirkung und Wachstum teilen." },
      { title: "Skalierbares Modell",          desc: "Proprietäre Technologie, standardisierte Abläufe und vollständiger Support für konsistentes und profitables Wachstum." },
      { title: "Lokale Anpassung",             desc: "Flexible Lösungen, die sich an Kultur, Bedürfnisse und Vorschriften jedes Marktes anpassen." },
      { title: "Kontinuierliche Schulung",     desc: "Training, Marketing und technischer Support, um unsere Partner zu stärken und den Betriebserfolg zu sichern." },
      { title: "Nachhaltiger Impact",          desc: "Wir fördern Gesundheit, Inklusion, Einkommen und Umweltschutz durch den Zugang zu reinem und bewusstem Wasser." },
    ],
  },
  it: {
    heading: "I nostri pilastri per l'espansione",
    pillars: [
      { title: "Partnership strategiche",  desc: "Lavoriamo con distributori, integratori e investitori che condividono la nostra visione di impatto e crescita." },
      { title: "Modello scalabile",        desc: "Tecnologia proprietaria, operazioni standardizzate e supporto completo per garantire una crescita consistente e redditizia." },
      { title: "Adattamento locale",       desc: "Soluzioni flessibili che si adattano alla cultura, alle esigenze e alle normative di ogni mercato." },
      { title: "Formazione continua",      desc: "Formazione, marketing e supporto tecnico per potenziare i nostri partner e garantire il successo operativo." },
      { title: "Impatto sostenibile",      desc: "Promuoviamo salute, inclusione, reddito e preservazione ambientale attraverso l'accesso all'acqua pura e consapevole." },
    ],
  },
  zh: {
    heading: "我们的扩张支柱",
    pillars: [
      { title: "战略合作伙伴关系", desc: "我们与共享影响力与增长愿景的经销商、集成商和投资者携手合作。" },
      { title: "可扩展模式",       desc: "自有技术、标准化运营与全方位支持，确保持续稳健的盈利增长。" },
      { title: "本地化适应",       desc: "灵活的解决方案，适应每个市场的文化、需求与法规要求。" },
      { title: "持续培训",         desc: "通过培训、市场营销和技术支持赋能合作伙伴，保障运营成功。" },
      { title: "可持续影响",       desc: "通过提供纯净水的获取渠道，促进健康、包容、收入增长与环境保护。" },
    ],
  },
  ja: {
    heading: "拡大を支える私たちの柱",
    pillars: [
      { title: "戦略的パートナーシップ", desc: "インパクトと成長のビジョンを共有するディストリビューター、インテグレーター、投資家と協力します。" },
      { title: "スケーラブルなモデル",   desc: "独自技術・標準化された運用・完全サポートにより、安定した収益性の高い成長を実現します。" },
      { title: "ローカル適応",           desc: "各市場の文化・ニーズ・規制に対応する柔軟なソリューションを提供します。" },
      { title: "継続的なトレーニング",   desc: "トレーニング・マーケティング・技術サポートでパートナーを強化し、業務の成功を保証します。" },
      { title: "持続可能なインパクト",   desc: "純水へのアクセスを通じて、健康・包摂・収入・環境保全を推進します。" },
    ],
  },
  ko: {
    heading: "확장을 위한 우리의 기둥",
    pillars: [
      { title: "전략적 파트너십",   desc: "영향력과 성장에 대한 비전을 공유하는 유통업체, 통합업체, 투자자와 함께합니다." },
      { title: "확장 가능한 모델", desc: "독자적인 기술, 표준화된 운영 및 완전한 지원으로 일관되고 수익성 있는 성장을 보장합니다." },
      { title: "현지화 적응",       desc: "각 시장의 문화, 요구 사항 및 규정에 맞는 유연한 솔루션을 제공합니다." },
      { title: "지속적인 교육",     desc: "교육, 마케팅 및 기술 지원으로 파트너를 강화하고 운영 성공을 보장합니다." },
      { title: "지속 가능한 영향", desc: "순수한 물에 대한 접근을 통해 건강, 포용, 소득 창출 및 환경 보전을 촉진합니다." },
    ],
  },
  sv: {
    heading: "Vara pelare for expansion",
    pillars: [
      { title: "Strategiska partnerskap",  desc: "Vi arbetar med distributorer, integratorer och investerare som delar var vision om genomslagskraft och tillvaxt." },
      { title: "Skalbar modell",           desc: "Egen teknik, standardiserade processer och fullstandigt stod for att sakerstalla konsekvent och lonsam tillvaxt." },
      { title: "Lokal anpassning",         desc: "Flexibla losningar som anpassar sig till kulturen, behoven och reglerna pa varje marknad." },
      { title: "Kontinuerlig utbildning",  desc: "Utbildning, marknadsforing och teknisk support for att starka vara partners och sakerstalla operativ framgang." },
      { title: "Hallbart genomslag",       desc: "Vi frамjar halsa, inkludering, inkomst och miljoskydd genom tillgang till rent och medvetet vatten." },
    ],
  },
  fi: {
    heading: "Laajenemisen pilareimme",
    pillars: [
      { title: "Strategiset kumppanuudet", desc: "Teemme tyota jakelijoiden, integraattorien ja sijoittajien kanssa, jotka jakavat visiomme vaikuttavuudesta ja kasvusta." },
      { title: "Skaalautuva malli",        desc: "Oma teknologia, standardoitu toiminta ja taydellinen tuki varmistavat johdonmukaisen ja kannattavan kasvun." },
      { title: "Paikallinen sopeutuminen", desc: "Joustavat ratkaisut, jotka sopeutuvat kunkin markkinan kulttuuriin, tarpeisiin ja saantelyyn." },
      { title: "Jatkuva koulutus",         desc: "Koulutus, markkinointi ja tekninen tuki kumppaneidemme vahvistamiseksi ja operatiivisen menestyksen varmistamiseksi." },
      { title: "Kestava vaikutus",         desc: "Edistamme terveytta, osallisuutta, tuloja ja ymparistonsuojelua puhtaan ja tietoisen veden saannin avulla." },
    ],
  },
  ru: {
    heading: "Nashi osnovy dlya rasshireniya",
    pillars: [
      { title: "Strategicheskie partnerstva", desc: "My sotrudnichaem s distributorami, integratorami i investorami, kotorye razdelyayut nashu vidieniyu vliyaniya i rosta." },
      { title: "Masshtabiruyemaya model",     desc: "Sobstvennye tekhnologii, standartizirovannye operatsii i polnaya podderzhka dlya stabilnogo i pribylnogo rosta." },
      { title: "Mestnaya adaptatsiya",        desc: "Gibkie resheniya, adaptiruyushchiesya k kulture, potrebnostyam i regulirovaniyam kazhdogo rynka." },
      { title: "Nepreryvnoe obuchenie",       desc: "Obuchenie, marketing i tekhnicheskaya podderzhka dlya usileniya nashikh partnerov i obespecheniya operativnogo uspekha." },
      { title: "Ustojchivoe vozdejstvie",     desc: "My sposobstvuem zdorovyu, vklyucheniyu, dokhodu i sokhraneniyu okruzhayushchej sredy cherez dostup k chistoj vode." },
    ],
  },
  ro: {
    heading: "Pilonii nostri pentru expansiune",
    pillars: [
      { title: "Parteneriate strategice",  desc: "Lucram cu distribuitori, integratori si investitori care impartasesc viziunea noastra de impact si crestere." },
      { title: "Model scalabil",           desc: "Tehnologie proprie, operatiuni standardizate si suport complet pentru a asigura o crestere consistenta si profitabila." },
      { title: "Adaptare locala",          desc: "Solutii flexibile care se adapteaza la cultura, nevoile si reglementarile fiecarei piete." },
      { title: "Formare continua",         desc: "Formare, marketing si suport tehnic pentru a imputernici partenerii nostri si a asigura succesul operational." },
      { title: "Impact sustenabil",        desc: "Promovam sanatatea, incluziunea, venitul si protectia mediului prin accesul la apa pura si constienta." },
    ],
  },
  he: {
    heading: "העמודים שלנו להתרחבות",
    pillars: [
      { title: "שותפויות אסטרטגיות",  desc: "אנו עובדים עם מפיצים, אינטגרטורים ומשקיעים החולקים את חזוננו להשפעה וצמיחה." },
      { title: "מודל מדרגי",           desc: "טכנולוגיה קניינית, פעילות מתוקננת ותמיכה מלאה להבטחת צמיחה עקבית ורווחית." },
      { title: "התאמה מקומית",         desc: "פתרונות גמישים המתאימים לתרבות, לצרכים ולרגולציות של כל שוק." },
      { title: "הכשרה מתמשכת",         desc: "הדרכה, שיווק ותמיכה טכנית לחיזוק שותפינו והבטחת הצלחה תפעולית." },
      { title: "השפעה בת-קיימא",       desc: "אנו מקדמים בריאות, הכלה, הכנסה ושימור הסביבה באמצעות גישה למים נקיים ומודעים." },
    ],
  },
};

const iconSrcs = [imgParceria, imgEscala, imgAdaptacao, imgEducacao, imgSustent];
const iconWs   = [1125, 30, 38, 30, 492];
const iconHs   = [1078, 30, 40, 22, 475];

export default function ExpansaoGlobalPilares() {
  const { lang } = useLang();
  const t = T[lang];

  const pillars = t.pillars.map((p, i) => ({
    icon: iconSrcs[i],
    iconW: iconWs[i],
    iconH: iconHs[i],
    title: p.title,
    desc: p.desc,
  }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>

        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <FigmaIcon src={p.icon} size={40} aspectW={p.iconW} aspectH={p.iconH} />
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center flex items-center justify-center min-h-[50px]">
                {p.title}
              </h3>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
