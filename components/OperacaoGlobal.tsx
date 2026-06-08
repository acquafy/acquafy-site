import FigmaIcon from "./FigmaIcon";

const imgGlobe   = "/figma-assets/8869df28-c34e-4fd2-8bc7-77d68c266451.svg";  // 30×30
const imgScale   = "/figma-assets/ae3c7ad0-7282-4ba0-b278-fe8fab1cf757.svg";  // 30×30
const imgMobile  = "/figma-assets/a9cea2bd-8708-4035-8d92-82cbfbe0f611.svg";  // 21×30
const imgPessoas = "/figma-assets/d3b3f330-1f05-436b-b8a1-eda6f97129c8.svg";  // 43.86×40.5

const stats = [
  { icon: imgGlobe,   iW: 30,    iH: 30,   number: "Até",     label: "180 países",         sub: "alcance global" },
  { icon: imgScale,   iW: 30,    iH: 30,   number: "16",      label: "idiomas",            sub: "suporte multilíngue" },
  { icon: imgMobile,  iW: 21,    iH: 30,   number: "App +",   label: "Acquafy AI",         sub: "inteligência embarcada" },
  { icon: imgPessoas, iW: 43.86, iH: 40.5, number: "+150",    label: "parceiros ativos",   sub: "Silver, Gold e Platinum" },
];

export default function OperacaoGlobal() {
  return (
    <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {"Uma operação "}
          <span className="text-[#0569ff]">global simples e inteligente</span>
        </h2>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-y-[30px] items-center justify-center overflow-hidden px-[20px] py-[40px] rounded-[16px] w-full"
          style={{ backgroundImage: "linear-gradient(104deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
        >
          {stats.map((s, i, arr) => (
            <div
              key={s.label}
              className={`flex flex-[1_0_0] flex-wrap gap-[20px] items-center min-w-[180px] px-[20px]${i < arr.length - 1 ? " border-r border-white/40" : ""}`}
            >
              <div className="flex flex-col items-center justify-center size-[60px] shrink-0">
                <FigmaIcon src={s.icon} size={40} aspectW={s.iW} aspectH={s.iH} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-[120px]">
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white">
                  {s.number}
                </p>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-white">
                  {s.label}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-white/80">
                  {s.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
