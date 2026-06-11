import FigmaIcon from "./FigmaIcon";

// Background panorama — xl+ apenas (variante TOTAL)
const imgBg       = "/figma-assets/947d57e0-fb06-43d4-84bf-75b2e012218a.png";
// Montagem de produtos — inline (default) e coluna direita (lg)
const imgProducts = "/figma-assets/25093727-4f9a-4532-aacf-a92049eb825d.png";

// Feature icons
const imgMobile   = "/figma-assets/621b62cb-9c11-4f9c-929d-2f0f2f05df2e.svg"; // 21×30
const imgBrain    = "/figma-assets/21c27aa2-c251-4d21-b072-d097cab8ada9.svg"; // 30×30
const imgWifi     = "/figma-assets/1e5028c4-ce12-4d6a-9c7c-2c4a282a8abe.svg"; // 30×20
const imgWater    = "/figma-assets/b9ae65e9-ab56-4b66-8ac4-2cc0713bc87c.svg"; // 576×662
const imgShield   = "/figma-assets/620ebd35-ffd3-413c-b1e1-badd50994293.svg"; // 26×30
const imgPlanet   = "/figma-assets/3a6ceadc-3f10-4216-a944-e52a683d16ce.svg"; // 30×30

// Stats bar icons
const imgAI       = "/figma-assets/fc3ef7bd-af62-45f6-aa26-7a48faee67bd.svg"; // 30×30 em slot 40px
const imgWaterBub = "/figma-assets/c82d8ece-24c3-48a5-af88-93915e0ad0c7.svg"; // 40×40
const imgPlanet1  = "/figma-assets/cc8e5973-e053-480a-bdc3-e6c6fa961113.svg"; // 30×30 em slot 40px
const imgSustain  = "/figma-assets/eb4caabf-aa80-4a16-9b77-15b840bc7593.svg"; // 40×40

const features = [
  { icon: imgMobile, aW: 21,  aH: 30,  title: "App Acquafy",       desc: "Controle total pelo app de onde quiser." },
  { icon: imgBrain,  aW: 30,  aH: 30,  title: "Acquafy AI",         desc: "Inteligência que aprende seus hábitos." },
  { icon: imgWifi,   aW: 30,  aH: 20,  title: "IoT Inteligente",    desc: "Conectividade e dados em tempo real." },
  { icon: imgWater,  aW: 576, aH: 662, title: "Água Personalizada", desc: "Temperaturas e funções para cada momento." },
  { icon: imgShield, aW: 26,  aH: 30,  title: "Alta Performance",   desc: "Tecnologia global e filtros de última geração." },
  { icon: imgPlanet, aW: 30,  aH: 30,  title: "Design Global",      desc: "Acabamento sofisticado e premiado." },
];

const stats = [
  { icon: imgAI,       title: "Tecnologia + IA",     desc: "Inteligência artificial aplicada à experiência da água" },
  { icon: imgWaterBub, title: "Purificação premium",  desc: "Água pura, segura e de qualidade superior" },
  { icon: imgPlanet1,  title: "Conectividade global", desc: "Soluções inteligentes com IoT e gestão em tempo real" },
  { icon: imgSustain,  title: "Sustentabilidade",     desc: "Impacto positivo para pessoas, comunidades e o planeta" },
];

export default function BannerLinhaNeo() {
  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden bg-[#f1f5fe] win-1280:bg-transparent win-1280:h-[calc(100vh-80px)]">

      {/* Imagem de fundo — win-1280+ apenas (variante TOTAL) */}
      <img
        alt=""
        className="hidden win-1280:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Linha principal de conteúdo */}
      <div className="relative flex flex-col gap-[20px] items-center max-w-[1400px] w-full win-1024:flex-row win-1024:flex-wrap win-1024:gap-[40px] win-1024:items-center win-1280:flex-[1_0_0] win-1280:min-h-px">

        {/* Coluna esquerda: título + descrição + img inline (mobile) + features */}
        <div className="flex flex-col gap-[20px] items-center w-full win-1024:flex-[1_0_0] win-1024:gap-[40px] win-1024:items-start win-1024:justify-center win-1024:max-w-[500px] win-1024:min-w-[280px]">

          <h1
            className="font-['Avenir_LT_Pro:95_Black'] text-hero bg-clip-text text-transparent text-center w-full win-1024:text-left"
            style={{ backgroundImage: "linear-gradient(129deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            Linha Neo
          </h1>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] text-center w-full win-1024:text-left">
            Purificadores inteligentes para cada estilo de vida, com tecnologia global, App + AI + IoT e opções Essentials &amp; Premium.
          </p>

          {/* Imagem de produto inline — visível apenas abaixo de win-1024 (variante 1024) */}
          <div className="win-1024:hidden aspect-[960/450] relative rounded-[16px] overflow-hidden shrink-0 w-full">
            <img
              alt="Linha Neo — produtos"
              className="absolute inset-0 w-full h-full object-cover"
              src={imgProducts}
            />
          </div>

          {/* Lista de features */}
          <div className="flex flex-wrap gap-[20px] items-start justify-center rounded-[12px] w-full">
            {features.map((f) => (
              <div key={f.title} className="flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[180px] win-1024:justify-start">
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

        {/* Coluna direita: imagem de produto — win-1024 apenas (variante 1280, oculta em win-1280+) */}
        <div className="hidden win-1024:flex win-1280:hidden flex-[1_0_0] items-stretch min-h-[480px] min-w-[280px] relative rounded-[16px] overflow-hidden">
          <img
            alt="Linha Neo — produtos"
            className="absolute inset-0 w-full h-full object-cover"
            src={imgProducts}
          />
        </div>

        {/* Coluna direita: espaço vazio — win-1280+ (produtos estão na imagem de fundo) */}
        <div className="hidden win-1280:block flex-[1_0_0] min-h-[376px] min-w-[280px]" />
      </div>

      {/* Barra de stats */}
      <div
        className="relative flex flex-wrap gap-[30px_20px] items-start justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] rounded-[16px] shrink-0 w-full"
        style={{ backgroundImage: "linear-gradient(92deg, #f3faff 0%, #ceefff 100%)" }}
      >
        {stats.map((s) => (
          <div key={s.title} className="flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[160px] px-[20px]">
            <FigmaIcon src={s.icon} size={40} />
            <div className="flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-[200px] text-center win-1280:text-left">
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
