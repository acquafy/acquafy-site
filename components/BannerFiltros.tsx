import FigmaIcon from "./FigmaIcon";

const imgBg         = "/figma-assets/573ad804-6812-4faa-8b93-2bdadbb23feb.png";
// Setas: mesmas que o Hero (padrão do projeto)
const imgArrowWhite = "/figma-assets/9777bc4a-58de-46e7-8e46-08e99069f337.svg";
const imgArrowBlue  = "/figma-assets/4e468b96-c90e-4821-837b-9780c1f0b21f.svg";
const imgWater      = "/figma-assets/1bf88936-a8d9-4e4a-837c-b064c61d0cfc.svg";
const imgAI         = "/figma-assets/02893454-2abf-4b2d-8379-74ca62e14bd5.svg";
const imgFilter     = "/figma-assets/934e9b9d-e907-4428-8cb1-c0dc59caea70.svg";
const imgIntegracao = "/figma-assets/95d445db-891f-4524-b733-fcb15cefb5d3.svg";

const stats = [
  { icon: imgWater,      iconW: 40, iconH: 40, title: "Água pura e segura",                    desc: "Mais saúde e bem-estar para você e sua família." },
  { icon: imgAI,         iconW: 30, iconH: 30, title: "Tecnologia avançada",                   desc: "Filtros de alta performance e máxima eficiência" },
  { icon: imgFilter,     iconW: 30, iconH: 30, title: "Fácil instalação e manutenção",         desc: "Praticidade para o dia a dia e maior durabilidade." },
  { icon: imgIntegracao, iconW: 30, iconH: 30, title: "Compatibilidade com produtos Acquafy", desc: "Desenvolvidos para performance total do seu equipamento." },
];

export default function BannerFiltros() {
  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">
      <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgBg} />

      {/* Content — flex-1 empurra a stats bar para o rodapé da seção (igual ao Hero) */}
      <div className="relative flex flex-wrap flex-1 gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <div className="flex flex-col gap-[20px] items-start flex-1 min-w-[280px] max-w-[600px]">
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] w-full text-center lg:text-left">
            <span className="text-[#2a2a2b]">Filtros &amp; </span>
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #0233c3, #0569ff)" }}>Acessórios</span>
          </h1>
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#0233c3] w-full text-center lg:text-left">
            Performance, qualidade e proteção para cada gota
          </p>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full text-center lg:text-left">
            Os filtros e acessórios Acquafy são projetados para manter a água sempre pura, segura e com o máximo desempenho em todos os equipamentos Acquafy.
          </p>
          <div className="flex flex-wrap gap-[20px] items-center w-full">
            {/* BT AZUL BASE ARROW — padrão hero-size (50px) */}
            <button className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">Conheça os filtros</span>
              <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
            </button>
            {/* BT AZUL OUT ARROW — padrão hero-size (50px) */}
            <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">Falar com um especialista</span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} /></div>
                <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} /></div>
              </div>
            </button>
          </div>
        </div>
        {/* Espaçador direito — expõe a imagem de produto no fundo (igual ao layout do Hero) */}
        <div className="flex-1 min-w-[280px] min-h-[300px]" />
      </div>

      {/* Stats bar — pinada ao rodapé por ser o último elemento do flex-col */}
      <div className="relative bg-white border border-[#cbd0d4] flex flex-wrap gap-y-[30px] items-center justify-center max-w-[1400px] min-h-[140px] overflow-hidden py-[25px] rounded-[16px] w-full">
        {stats.map((s, i) => (
          <div key={i} className={`flex flex-1 flex-wrap gap-[10px] items-center min-w-[160px] px-[20px]${i < stats.length - 1 ? " border-r border-[#cbd0d4]" : ""}`}>
            <FigmaIcon src={s.icon} size={30} aspectW={s.iconW} aspectH={s.iconH} />
            <div className="flex flex-col gap-[10px] flex-1 min-w-[100px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{s.title}</p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
