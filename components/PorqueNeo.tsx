import FigmaIcon from "./FigmaIcon";

const imgMobile  = "/figma-assets/a2eb6e1c-8e5e-44d1-b255-9f545aa2bb9d.svg"; // 21×30
const imgBrain   = "/figma-assets/f81826e2-5f76-4485-92b2-9f483f762d68.svg"; // 30×30
const imgWifi    = "/figma-assets/d258c863-a8b6-428e-bd92-aeda78929186.svg"; // 30×20
const imgWater   = "/figma-assets/03477969-23e9-4f1f-af09-da450f920605.svg"; // 576×662
const imgShield  = "/figma-assets/fbc6dbf6-e504-4f0e-81f8-9823e6b65a49.svg"; // 26×30
const imgPlanet  = "/figma-assets/9752eb0a-fafb-4775-a0b6-48219c46620f.svg"; // 30×30

const items = [
  { icon: imgMobile, aW: 21,  aH: 30,  title: "App Acquafy",         desc: "Controle total pelo app de onde quiser." },
  { icon: imgBrain,  aW: 30,  aH: 30,  title: "Acquafy AI",           desc: "Inteligência que aprende seus hábitos." },
  { icon: imgWifi,   aW: 30,  aH: 20,  title: "IoT Inteligente",      desc: "Conectividade e dados em tempo real." },
  { icon: imgWater,  aW: 576, aH: 662, title: "Água Personalizada",   desc: "Temperaturas e funções para cada momento." },
  { icon: imgShield, aW: 26,  aH: 30,  title: "Alta Performance",     desc: "Tecnologia global e filtros de última geração." },
  { icon: imgPlanet, aW: 30,  aH: 30,  title: "Design Global",        desc: "Acabamento sofisticado e premiado." },
];

export default function PorqueNeo() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col items-center justify-center max-w-[1400px] px-[20px] py-[40px] rounded-[16px] w-full">
        <div className="flex flex-col gap-[40px] items-start w-full">

          {/* Title */}
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
            <span className="text-[#1f2e91]">{"Porque escolher a "}</span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              Linha Neo
            </span>
          </h2>

          {/* Cards grid */}
          <div className="bg-white flex flex-wrap gap-[20px] items-start justify-center overflow-hidden p-[20px] rounded-[12px] w-full">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[180px] rounded-[14px]"
              >
                {/* Circle icon */}
                <div className="border border-[#cbd0d4] flex flex-col items-center justify-center p-[14px] rounded-full shrink-0 size-[60px]">
                  <FigmaIcon src={item.icon} size={30} aspectW={item.aW} aspectH={item.aH} />
                </div>

                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center w-full min-h-[35px] flex items-center justify-center">
                  {item.title}
                </p>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333] text-center w-full">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
