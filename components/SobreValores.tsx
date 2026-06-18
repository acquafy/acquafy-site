"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Value icon assets ─────────────────────────────────────────────────────────
// aspectW/H only when clearly non-square; all others treated as square
const imgLamp        = "/figma-assets/icon-lamp-inovacao.svg"; // Inovação      21×30 portrait
const imgShield      = "/figma-assets/icon-shield-integridade.svg"; // Integridade   sq
const imgPessoas     = "/figma-assets/icon-pessoas-foco-cliente.svg"; // Foco cliente  sq
const imgSustent     = "/figma-assets/icon-sustent-a.svg"; // Sustent.      sq
const imgParceria    = "/figma-assets/icon-parceria-b.svg"; // Parceria      sq
const imgGlobeWorld  = "/figma-assets/icon-globe-world.svg"; // Expansão      sq

type ValueItem = {
  icon: string;
  alt: string;
  title: string;
  description: string;
  aspectW?: number;
  aspectH?: number;
};

const T: Record<Lang, {
  heading: string;
  values: Omit<ValueItem, "icon" | "aspectW" | "aspectH">[];
}> = {
  pt: {
    heading: "Nossos Valores",
    values: [
      { alt: "Inovação",         title: "Inovação",         description: "Criamos soluções que antecipam o futuro e resolve problemas reais." },
      { alt: "Integridade",      title: "Integridade",      description: "Agimos com ética, transparência e responsabilidade." },
      { alt: "Foco no cliente",  title: "Foco no cliente",  description: "Entendemos necessidades e entregamos experiências excepcionais." },
      { alt: "Sustentabilidade", title: "Sustentabilidade", description: "Desenvolvemos tecnologias que promovem a água e promovem vida." },
      { alt: "Parceria",         title: "Parceria",         description: "Acreditamos que juntos vamos mais longe e geramos mais impacto." },
      { alt: "Expansão global",  title: "Expansão global",  description: "Levamos soluções inteligentes para o mundo todo." },
    ],
  },
  "pt-pt": {
    heading: "Os Nossos Valores",
    values: [
      { alt: "Inovação",         title: "Inovação",         description: "Criamos soluções que antecipam o futuro e resolvem problemas reais." },
      { alt: "Integridade",      title: "Integridade",      description: "Agimos com ética, transparência e responsabilidade." },
      { alt: "Foco no cliente",  title: "Foco no cliente",  description: "Compreendemos as necessidades e entregamos experiências excepcionais." },
      { alt: "Sustentabilidade", title: "Sustentabilidade", description: "Desenvolvemos tecnologias que protegem a água e promovem a vida." },
      { alt: "Parceria",         title: "Parceria",         description: "Acreditamos que juntos chegamos mais longe e geramos mais impacto." },
      { alt: "Expansão global",  title: "Expansão global",  description: "Levamos soluções inteligentes para todo o mundo." },
    ],
  },
  en: {
    heading: "Our Values",
    values: [
      { alt: "Innovation",       title: "Innovation",       description: "We create solutions that anticipate the future and solve real problems." },
      { alt: "Integrity",        title: "Integrity",        description: "We act with ethics, transparency and responsibility." },
      { alt: "Customer focus",   title: "Customer focus",   description: "We understand needs and deliver exceptional experiences." },
      { alt: "Sustainability",   title: "Sustainability",   description: "We develop technologies that protect water and promote life." },
      { alt: "Partnership",      title: "Partnership",      description: "We believe that together we go further and generate more impact." },
      { alt: "Global expansion", title: "Global expansion", description: "We bring smart solutions to the entire world." },
    ],
  },
  es: {
    heading: "Nuestros Valores",
    values: [
      { alt: "Innovación",         title: "Innovación",         description: "Creamos soluciones que anticipan el futuro y resuelven problemas reales." },
      { alt: "Integridad",         title: "Integridad",         description: "Actuamos con ética, transparencia y responsabilidad." },
      { alt: "Enfoque en cliente", title: "Enfoque en cliente", description: "Entendemos necesidades y entregamos experiencias excepcionales." },
      { alt: "Sostenibilidad",     title: "Sostenibilidad",     description: "Desarrollamos tecnologías que protegen el agua y promueven la vida." },
      { alt: "Alianza",            title: "Alianza",            description: "Creemos que juntos llegamos más lejos y generamos más impacto." },
      { alt: "Expansión global",   title: "Expansión global",   description: "Llevamos soluciones inteligentes a todo el mundo." },
    ],
  },
  fr: {
    heading: "Nos Valeurs",
    values: [
      { alt: "Innovation",         title: "Innovation",         description: "Nous créons des solutions qui anticipent l'avenir et résolvent de vrais problèmes." },
      { alt: "Intégrité",          title: "Intégrité",          description: "Nous agissons avec éthique, transparence et responsabilité." },
      { alt: "Orientation client", title: "Orientation client", description: "Nous comprenons les besoins et offrons des expériences exceptionnelles." },
      { alt: "Durabilité",         title: "Durabilité",         description: "Nous développons des technologies qui protègent l'eau et favorisent la vie." },
      { alt: "Partenariat",        title: "Partenariat",        description: "Nous croyons qu'ensemble nous allons plus loin et générons plus d'impact." },
      { alt: "Expansion mondiale", title: "Expansion mondiale", description: "Nous apportons des solutions intelligentes au monde entier." },
    ],
  },
  de: {
    heading: "Unsere Werte",
    values: [
      { alt: "Innovation",         title: "Innovation",         description: "Wir schaffen Lösungen, die die Zukunft antizipieren und echte Probleme lösen." },
      { alt: "Integrität",         title: "Integrität",         description: "Wir handeln mit Ethik, Transparenz und Verantwortung." },
      { alt: "Kundenfokus",        title: "Kundenfokus",        description: "Wir verstehen Bedürfnisse und liefern außergewöhnliche Erlebnisse." },
      { alt: "Nachhaltigkeit",     title: "Nachhaltigkeit",     description: "Wir entwickeln Technologien, die Wasser schützen und Leben fördern." },
      { alt: "Partnerschaft",      title: "Partnerschaft",      description: "Wir glauben, dass wir gemeinsam weiter kommen und mehr Impact erzeugen." },
      { alt: "Globale Expansion",  title: "Globale Expansion",  description: "Wir bringen intelligente Lösungen in die ganze Welt." },
    ],
  },
  it: {
    heading: "I Nostri Valori",
    values: [
      { alt: "Innovazione",        title: "Innovazione",        description: "Creiamo soluzioni che anticipano il futuro e risolvono problemi reali." },
      { alt: "Integrità",          title: "Integrità",          description: "Agiamo con etica, trasparenza e responsabilità." },
      { alt: "Focalizzazione cliente", title: "Focalizzazione cliente", description: "Capiamo le esigenze e offriamo esperienze eccezionali." },
      { alt: "Sostenibilità",      title: "Sostenibilità",      description: "Sviluppiamo tecnologie che proteggono l'acqua e promuovono la vita." },
      { alt: "Partnership",        title: "Partnership",        description: "Crediamo che insieme andiamo più lontano e generiamo più impatto." },
      { alt: "Espansione globale", title: "Espansione globale", description: "Portiamo soluzioni intelligenti in tutto il mondo." },
    ],
  },
  zh: {
    heading: "我们的价值观",
    values: [
      { alt: "创新",     title: "创新",     description: "我们创造预见未来、解决实际问题的解决方案。" },
      { alt: "诚信",     title: "诚信",     description: "我们以道德、透明和责任感行事。" },
      { alt: "以客户为中心", title: "以客户为中心", description: "我们理解需求，提供卓越体验。" },
      { alt: "可持续性", title: "可持续性", description: "我们开发保护水资源、促进生命的技术。" },
      { alt: "合作伙伴关系", title: "合作伙伴关系", description: "我们相信携手共进，走得更远，产生更大影响。" },
      { alt: "全球扩张", title: "全球扩张", description: "我们将智能解决方案带到全世界。" },
    ],
  },
  ja: {
    heading: "私たちの価値観",
    values: [
      { alt: "イノベーション",     title: "イノベーション",     description: "未来を先取りし、現実の問題を解決するソリューションを創造します。" },
      { alt: "誠実さ",             title: "誠実さ",             description: "倫理・透明性・責任を持って行動します。" },
      { alt: "顧客中心主義",       title: "顧客中心主義",       description: "ニーズを理解し、卓越した体験を提供します。" },
      { alt: "サステナビリティ",   title: "サステナビリティ",   description: "水を守り、生命を育む技術を開発します。" },
      { alt: "パートナーシップ",   title: "パートナーシップ",   description: "共に進むことでより遠くへ行き、より大きなインパクトを生み出すと信じています。" },
      { alt: "グローバル展開",     title: "グローバル展開",     description: "スマートなソリューションを世界中に届けます。" },
    ],
  },
  ko: {
    heading: "우리의 가치관",
    values: [
      { alt: "혁신",           title: "혁신",           description: "미래를 예측하고 실제 문제를 해결하는 솔루션을 만듭니다." },
      { alt: "진실성",         title: "진실성",         description: "윤리, 투명성, 책임감을 가지고 행동합니다." },
      { alt: "고객 중심",      title: "고객 중심",      description: "요구를 이해하고 탁월한 경험을 제공합니다." },
      { alt: "지속 가능성",    title: "지속 가능성",    description: "물을 보호하고 생명을 증진하는 기술을 개발합니다." },
      { alt: "파트너십",       title: "파트너십",       description: "함께하면 더 멀리 가고 더 큰 영향을 만들 수 있다고 믿습니다." },
      { alt: "글로벌 확장",    title: "글로벌 확장",    description: "스마트 솔루션을 전 세계에 전달합니다." },
    ],
  },
};

// Icon metadata (static, not translated)
const iconMeta = [
  { icon: imgLamp,       aspectW: 29.51, aspectH: 41.50 },
  { icon: imgShield,     aspectW: 33.5,  aspectH: 41.71 },
  { icon: imgPessoas,    aspectW: 41.5,  aspectH: 38.43 },
  { icon: imgSustent,    aspectW: undefined, aspectH: undefined },
  { icon: imgParceria,   aspectW: 41.5,  aspectH: 39.83 },
  { icon: imgGlobeWorld, aspectW: undefined, aspectH: undefined },
];

export default function SobreValores() {
  const { lang } = useLang();
  const t = T[lang];

  const values: ValueItem[] = t.values.map((v, i) => ({
    ...v,
    icon: iconMeta[i].icon,
    aspectW: iconMeta[i].aspectW,
    aspectH: iconMeta[i].aspectH,
  }));

  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[40px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[25px] rounded-[16px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[25px] items-center min-h-[240px] min-w-[180px] px-[10px] py-[20px] rounded-[16px]"
            >
              <FigmaIcon src={v.icon} alt={v.alt} size={40} aspectW={v.aspectW} aspectH={v.aspectH} />
              <div className="flex flex-col gap-[20px] items-center text-center w-full">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">
                  {v.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] w-full">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
