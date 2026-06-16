import FigmaIcon from "./FigmaIcon";

const imgLocation  = "/figma-assets/icon-location-a.svg";
const imgLanguage  = "/figma-assets/icon-language-b.svg";
const imgEcossist  = "/figma-assets/icon-ecossistema.svg";
const imgMoney     = "/figma-assets/icon-money-e.svg";
const imgCountries = "/figma-assets/icon-countries.svg";
const imgMap       = "/figma-assets/map-image.webp";

const stats = [
  { icon: imgLocation,  iconW: 42,    iconH: 42, value: "180+",  desc: "Presente em + de 180 países" },
  { icon: imgLanguage,  iconW: 70,    iconH: 70, value: "16",    desc: "Disponível em 16 idiomas" },
  { icon: imgEcossist,  iconW: 38,    iconH: 40, value: "100%",  desc: "Operação 100% global" },
  { icon: imgMoney,     iconW: 33.33, iconH: 30, value: "100%",  desc: "Modelo de receita 100% recorrente" },
  { icon: imgCountries, iconW: 42,    iconH: 42, value: "Multi", desc: "Gestão multi-região e multi-moeda" },
];

export default function PlatformGlobal() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] relative w-full">
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] relative w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">Operação </span>
          <span className="text-[#0569ff]">global e escalável</span>
        </h2>

        <div className="flex flex-col win-1280:flex-row win-1280:flex-wrap gap-[20px] items-center justify-center w-full">

          {/* Cards */}
          <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-stretch min-w-px">
            {stats.map((s) => (
              <div key={s.desc} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[170px] min-w-[160px] p-[20px] rounded-[16px]">
                <div className="flex items-center justify-center shrink-0 size-[40px]">
                  <FigmaIcon src={s.icon} size={40} aspectW={s.iconW} aspectH={s.iconH} />
                </div>
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#1f2e91] text-center w-full">
                  {s.value}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mapa mundial */}
          <div className="flex flex-[1_0_0] items-center justify-end max-w-[400px] min-w-px">
            <img
              alt=""
              className="h-[253px] mix-blend-multiply opacity-70 object-contain pointer-events-none"
              style={{ width: "400px" }}
              src={imgMap}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
