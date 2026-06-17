import FigmaIcon from "./FigmaIcon";

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

const values: ValueItem[] = [
  {
    icon: imgLamp,
    alt: "Inovação",
    aspectW: 29.51, aspectH: 41.50,  // viewBox 29.51×41.50 — portrait
    title: "Inovação",
    description: "Criamos soluções que antecipam o futuro e resolve problemas reais.",
  },
  {
    icon: imgShield,
    alt: "Integridade",
    aspectW: 33.5, aspectH: 41.71,   // viewBox 33.5×41.71 — portrait
    title: "Integridade",
    description: "Agimos com ética, transparência e responsabilidade.",
  },
  {
    icon: imgPessoas,
    alt: "Foco no cliente",
    aspectW: 41.5, aspectH: 38.43,   // viewBox 41.5×38.43 — landscape
    title: "Foco no cliente",
    description: "Entendemos necessidades e entregamos experiências excepcionais.",
  },
  {
    icon: imgSustent,
    alt: "Sustentabilidade",
    // viewBox 41.5×41.5 — square, no aspectW/H needed
    title: "Sustentabilidade",
    description: "Desenvolvemos tecnologias que promovem a água e promovem vida.",
  },
  {
    icon: imgParceria,
    alt: "Parceria",
    aspectW: 41.5, aspectH: 39.83,   // viewBox 41.5×39.83 — landscape
    title: "Parceria",
    description: "Acreditamos que juntos vamos mais longe e geramos mais impacto.",
  },
  {
    icon: imgGlobeWorld,
    alt: "Expansão global",
    // viewBox 41.5×41.5 — square, no aspectW/H needed
    title: "Expansão global",
    description: "Levamos soluções inteligentes para o mundo todo.",
  },
];

export default function SobreValores() {
  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[40px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[25px] rounded-[16px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          Nossos Valores
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
