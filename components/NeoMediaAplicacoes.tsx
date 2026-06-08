// "Onde o Acquafy Media gera mais impacto" — location cards (Figma node 3258:4243)
import FigmaIcon from "./FigmaIcon";

const imgAirport   = "/figma-assets/eac0b0d0-0a21-40fc-85d3-6699467e14df.jpg";
const imgShopping  = "/figma-assets/5856d8d9-5788-4a3d-9a08-e16721ae8927.jpg";
const imgHospital  = "/figma-assets/c57d83d0-7dd2-4e08-b953-f7fc5046c1a0.jpg";
const imgOffice    = "/figma-assets/41c939d1-7471-46b8-a8b5-24d8eded655a.jpg";
const imgEducation = "/figma-assets/8b24d643-32e9-44b1-8faa-2239b9f0f6a1.jpg";
const imgCrowded   = "/figma-assets/316eb9cd-85a6-4494-aacb-ccf4facae5ea.jpg";

const imgPlane     = "/figma-assets/b79edafe-4ce0-4091-8d78-975bc0303322.svg";
const imgCart      = "/figma-assets/deb7bc58-3867-46e5-8fce-c92b3be24473.svg";
const imgCross     = "/figma-assets/0e1b34ca-cb32-4845-b5c5-7e4fc3b3d562.svg";
const imgBuilding  = "/figma-assets/69664d04-75e5-462a-a1bb-c0b5182bb2dc.svg";
const imgEdu       = "/figma-assets/1eb44019-8bf6-4957-826f-1414337185c2.svg";
const imgPeople    = "/figma-assets/4884314c-e1b3-4f0b-8374-afa69452a6c5.svg";

const locations = [
  {
    photo: imgAirport,
    icon: imgPlane,
    title: "Aeroportos",
    desc: "Alto fluxo, público qualificado e grande visibilidade para marcas.",
  },
  {
    photo: imgShopping,
    icon: imgCart,
    title: "Shoppings e Centros Comerciais",
    desc: "Presença estratégica nos maiores centros de consumo e entretenimento.",
  },
  {
    photo: imgHospital,
    icon: imgCross,
    title: "Hospitais e Clínicas",
    desc: "Hidratação e informação nos momentos em que as pessoas mais precisam.",
  },
  {
    photo: imgOffice,
    icon: imgBuilding,
    title: "Empresas e Escritórios",
    desc: "Benefício corporativo com receita: água de qualidade e mídia segmentada.",
  },
  {
    photo: imgEducation,
    icon: imgEdu,
    title: "Universidades e Escolas",
    desc: "Alcance estudantes e professores com campanhas relevantes e água pura.",
  },
  {
    photo: imgCrowded,
    icon: imgPeople,
    title: "Espaços Públicos",
    desc: "Visibilidade máxima em estações, praças e locais de alto trânsito.",
  },
];

export default function NeoMediaAplicacoes() {
  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center w-full">
          {"Onde o Acquafy Media "}
          <span className="text-[#0569ff]">gera mais impacto</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-start justify-center overflow-hidden w-full">
          {locations.map((loc) => (
            <div
              key={loc.title}
              className="bg-white flex flex-[1_0_0] flex-col items-center max-h-[300px] max-w-[500px] min-h-[160px] min-w-[200px] overflow-hidden rounded-[16px]"
            >
              {/* Photo + floating icon badge */}
              <div className="relative flex flex-col items-center justify-center w-full shrink-0">
                <div className="h-[150px] w-full mb-[-30px] relative">
                  <img
                    alt={loc.title}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src={loc.photo}
                  />
                </div>
                {/* White icon badge */}
                <div className="bg-white flex flex-col items-center justify-center p-[15px] rounded-[8px] z-10 shrink-0">
                  <div className="flex flex-col items-center justify-center size-[30px]">
                    <FigmaIcon src={loc.icon} size={30} />
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col gap-[10px] items-center justify-center p-[20px] text-center w-full">
                <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  {loc.title}
                </h3>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] w-full">
                  {loc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
