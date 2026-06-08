import FigmaIcon from "./FigmaIcon";

const imgLocation  = "/figma-assets/953ce407-44ff-4042-98de-3fd2411b6e5b.svg";
const imgLanguage  = "/figma-assets/8ff7d31e-756e-4544-81be-c75b55d9a2f0.svg";
const imgEcossist  = "/figma-assets/805d1355-429a-486d-9e4a-2a6e210f9aeb.svg";
const imgMoney     = "/figma-assets/6f338561-bc46-4182-86d7-72784ed01190.svg";
const imgCountries = "/figma-assets/ce9cc96f-91f4-4eea-8ded-e2da00d3db3f.svg";
const imgPerfil    = "/figma-assets/f1dfb3b0-84fd-43f3-971a-3fa7e089b5ef.png";

const stats = [
  { icon: imgLocation,  iconW: 20, iconH: 18, value: "180+",   desc: "Presente em + de 180 países" },
  { icon: imgLanguage,  iconW: 70, iconH: 70, value: "16",      desc: "Disponível em 16 idiomas" },
  { icon: imgEcossist,  iconW: 38, iconH: 40, value: "100%",   desc: "Operação 100% global" },
  { icon: imgMoney,     iconW: 33, iconH: 30, value: "100%",   desc: "Modelo de receita 100% recorrente" },
  { icon: imgCountries, iconW: 30, iconH: 30, value: "Multi",  desc: "Gestão multi-região e multi-moeda" },
];

export default function PlatformGlobal() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col gap-[20px] items-center justify-center overflow-hidden px-[20px] py-[40px] relative w-full">

      {/* Decorative image */}
      <img
        alt=""
        className="absolute -translate-y-1/2 h-[298px] mix-blend-multiply opacity-70 right-[29px] top-[calc(50%+0.5px)] pointer-events-none object-contain"
        style={{ width: "471px" }}
        src={imgPerfil}
      />

      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] relative w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">Operação </span>
          <span className="text-[#0569ff]">global e escalável</span>
        </h2>

        <div className="flex flex-wrap gap-[20px] items-center w-full">
          <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-center min-w-px">
            {stats.map((s) => (
              <div key={s.desc} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-px p-[20px] rounded-[16px]">
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
        </div>
      </div>
    </section>
  );
}
