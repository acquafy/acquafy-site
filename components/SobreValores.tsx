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
