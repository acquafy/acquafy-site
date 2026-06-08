import FigmaIcon from "./FigmaIcon";

const imgBg       = "/figma-assets/88a0a16f-0526-4160-9c44-0fb0d69d3f7a.png";

// Feature icons (banner left) — dimensões reais do SVG
const imgMobile   = "/figma-assets/1cb13dc4-8237-4412-bc86-c0054e02339c.svg"; // 21×30 portrait
const imgBrain    = "/figma-assets/61a9905c-e50f-4ac0-ae8d-a898152d9a92.svg"; // 30×30 square
const imgWifi     = "/figma-assets/4536729d-60c0-4f14-8af9-4b6d77bca290.svg"; // 30×20 landscape
const imgWater    = "/figma-assets/29a1a7b2-0a84-491e-aeb7-aef8afd33cfc.svg"; // 576×662 portrait
const imgShield   = "/figma-assets/c7387096-3adb-45cf-8ed4-a025f0cf4977.svg"; // 26×30 portrait
const imgPlanet   = "/figma-assets/c5be6434-1b3d-4680-8417-ec94586b134d.svg"; // 30×30 square

// Stats bar icons (bottom)
const imgAI       = "/figma-assets/a25ab8b2-d34c-41ea-83fe-759c7c10d4af.svg"; // 30×30 square
const imgWaterBub = "/figma-assets/150ab56e-e4ce-4caf-bd74-414ee625af28.svg"; // 40×40 square
const imgPlanet1  = "/figma-assets/3eef1951-d581-4bae-b075-13339ca5df63.svg"; // 30×30 square
const imgSustain  = "/figma-assets/32099c32-7bce-4601-bba7-541e216d9395.svg"; // 30×30 square

const features = [
  { icon: imgMobile, aW: 21,  aH: 30,  title: "App Acquafy",         desc: "Controle total pelo app de onde quiser." },
  { icon: imgBrain,  aW: 30,  aH: 30,  title: "Acquafy AI",           desc: "Inteligência que aprende seus hábitos." },
  { icon: imgWifi,   aW: 30,  aH: 20,  title: "IoT Inteligente",      desc: "Conectividade e dados em tempo real." },
  { icon: imgWater,  aW: 576, aH: 662, title: "Água Personalizada",   desc: "Temperaturas e funções para cada momento." },
  { icon: imgShield, aW: 26,  aH: 30,  title: "Alta Performance",     desc: "Tecnologia global e filtros de última geração." },
  { icon: imgPlanet, aW: 30,  aH: 30,  title: "Design Global",        desc: "Acabamento sofisticado e premiado." },
];

const stats = [
  { icon: imgAI,       aW: 40, aH: 40, title: "Tecnologia + IA",     desc: "Inteligência artificial aplicada à experiência da água" },
  { icon: imgWaterBub, aW: 40, aH: 40, title: "Purificação premium",  desc: "Água pura, segura e de qualidade superior" },
  { icon: imgPlanet1,  aW: 30, aH: 30, title: "Conectividade global", desc: "Soluções inteligentes com IoT e gestão em tempo real" },
  { icon: imgSustain,  aW: 30, aH: 30, title: "Sustentabilidade",     desc: "Impacto positivo para pessoas, comunidades e o planeta" },
];

export default function BannerLinhaNeo() {
  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">

      {/* Background */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Main content row — flex-1 empurra a stats bar para o rodapé */}
      <div className="relative flex flex-1 flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Left: título + features */}
        <div className="flex flex-[1_0_0] flex-col gap-[40px] items-start justify-center max-w-[640px] min-w-[280px]">
          <h1
            className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] bg-clip-text text-transparent w-full text-center lg:text-left"
            style={{ backgroundImage: "linear-gradient(129deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            Linha Neo
          </h1>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full text-center lg:text-left">
            Purificadores inteligentes para cada estilo de vida, com tecnologia global, App + AI + IoT e opções Essentials &amp; Premium.
          </p>

          {/* Feature list — 2 colunas flex-wrap */}
          <div className="flex flex-wrap gap-[20px] items-start justify-center rounded-[12px] w-full">
            {features.map((f) => (
              <div key={f.title} className="flex flex-[1_0_0] gap-[20px] items-center min-w-[180px]">
                <FigmaIcon src={f.icon} size={30} aspectW={f.aW} aspectH={f.aH} />
                <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                    {f.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333] w-full">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: vazio — produtos aparecem na imagem de fundo */}
        <div className="hidden xl:block flex-[1_0_0] min-h-[376px]" />
      </div>

      {/* Stats bar — ancorada no rodapé da seção */}
      <div
        className="relative flex flex-wrap gap-[30px_20px] items-start justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] rounded-[16px] shrink-0 w-full"
        style={{ backgroundImage: "linear-gradient(92deg, #f3faff 0%, #ceefff 100%)" }}
      >
        {stats.map((s) => (
          <div key={s.title} className="flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[160px] px-[20px]">
            <FigmaIcon src={s.icon} size={40} aspectW={s.aW} aspectH={s.aH} />
            <div className="flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-[200px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91] w-full">
                {s.title}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] w-full">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
