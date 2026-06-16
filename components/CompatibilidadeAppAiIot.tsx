const products = [
  {
    img: "/figma-assets/neo-ultra-spark-h2.webp",
    name: "Neo Essentials",
    desc: "Compatível com toda linha Neo Essentials para uso diário.",
  },
  {
    img: "/figma-assets/compat-neo-premium.webp",
    name: "Neo Premium",
    desc: "Integração completa com a linha Neo Premium de alto desempenho.",
  },
  {
    img: "/figma-assets/acquafy-media-totem.webp",
    name: "Acquafy Media",
    desc: "Conectado à plataforma de mídia para campanhas e comunicações.",
  },
];

export default function CompatibilidadeAppAiIot() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">Compatível com todo o </span>
          <span className="text-[#0569ff]">ecossistema Acquafy</span>
        </h2>

        {/* Cards de produto */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {products.map((p) => (
            <div
              key={p.name}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] overflow-clip px-[20px] py-[40px] rounded-[16px]"
            >
              {/* Nome */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full">
                {p.name}
              </p>

              {/* Imagem do produto */}
              <div className="flex items-center justify-center overflow-clip size-[300px] shrink-0">
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-h-[280px] max-w-[280px] object-contain"
                />
              </div>

              {/* Descrição */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] text-center w-full">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
