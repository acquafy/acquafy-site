// "Onde o Acquafy Media gera mais impacto" — location cards (Figma node 3258:4243)
import FigmaIcon from "./FigmaIcon";

const imgAirport   = "/figma-assets/photo-location-airport.webp";
const imgShopping  = "/figma-assets/photo-location-shopping.webp";
const imgHospital  = "/figma-assets/photo-location-hospital.webp";
const imgOffice    = "/figma-assets/photo-location-office.webp";
const imgEducation = "/figma-assets/photo-location-university.webp";
const imgCrowded   = "/figma-assets/photo-location-public.webp";

const imgPlane     = "/figma-assets/icon-plane.svg";
const imgCart      = "/figma-assets/icon-cart.svg";
const imgCross     = "/figma-assets/icon-cross.svg";
const imgBuilding  = "/figma-assets/icon-building.svg";
const imgEdu       = "/figma-assets/icon-edu.svg";
const imgPeople    = "/figma-assets/icon-people-a.svg";

const locations = [
  { photo: imgAirport,   icon: imgPlane,    aspectW: 32, aspectH: 32,   title: "Aeroportos",                          desc: "Alto fluxo, público qualificado e grande visibilidade para marcas." },
  { photo: imgShopping,  icon: imgCart,     aspectW: 32, aspectH: 32,   title: "Shoppings",                           desc: "Engajamento constante e oportunidades de compras e conversão." },
  { photo: imgHospital,  icon: imgCross,    aspectW: 32, aspectH: 32,   title: "Hospitais",                           desc: "Hidratação acessível e bem-estar para pacientes, visitantes e equipes." },
  { photo: imgOffice,    icon: imgBuilding, aspectW: 32, aspectH: 32,   title: "Empresas",                            desc: "Mais saúde e produtividade para colaboradores e visitantes." },
  { photo: imgEducation, icon: imgEdu,      aspectW: 32, aspectH: 24,   title: "Universidades",                       desc: "Público jovem e conectado, ideal para mídia e promoções." },
  { photo: imgCrowded,   icon: imgPeople,   aspectW: 32, aspectH: 31.5, title: "Redes públicas e locais de alto fluxo", desc: "Estações, rodoviárias, praças e espaços urbanos com grande circulação." },
];

export default function NeoMediaAplicacoes() {
  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {"Onde o Acquafy Media "}
          <span className="text-[#0569ff]">gera mais impacto</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center overflow-hidden w-full">
          {locations.map((loc) => (
            <div
              key={loc.title}
              className="bg-white flex flex-[1_0_0] flex-col items-center max-w-[500px] min-h-[160px] min-w-[200px] overflow-hidden rounded-[16px]"
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
                  <FigmaIcon src={loc.icon} size={30} aspectW={loc.aspectW} aspectH={loc.aspectH} />
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col gap-[10px] items-center justify-center p-[20px] text-center w-full">
                <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex items-center justify-center min-h-[40px] w-full">
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
