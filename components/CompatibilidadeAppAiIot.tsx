const imgNeoPremium  = "/figma-assets/5b6eb9ea-13f7-4600-bcea-0861f4862738.png";
const imgSparkH22    = "/figma-assets/d0753b06-62ad-43c3-be8d-a5562b35cf1b.png";
const imgMedia       = "/figma-assets/c8c8fd7f-80e9-4177-94a7-bf452c986b03.png";

const products = [
  {
    img: imgNeoPremium,
    name: "Neo Premium",
    desc: "Integração completa com a linha Neo Premium de alto desempenho com App, AI e IoT nativos.",
  },
  {
    img: imgSparkH22,
    name: "Neo Ultra Spark H²",
    desc: "Conectividade avançada com suporte a WiFi 5, Bluetooth 5.3 e monitoramento em tempo real.",
  },
  {
    img: imgMedia,
    name: "Acquafy Media",
    desc: "Conectado à plataforma de mídia para campanhas, comunicações e conteúdo personalizado.",
  },
];

export default function CompatibilidadeAppAiIot() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Title */}
        <div className="flex flex-col gap-[10px] items-center w-full">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#333] text-center w-full">
            Compatível com toda a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              linha Acquafy
            </span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center max-w-[660px]">
            O ecossistema App + AI + IoT funciona com toda a linha de produtos Acquafy.
          </p>
        </div>

        {/* Product cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {products.map((p) => (
            <div
              key={p.name}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] p-[20px] rounded-[16px]"
            >
              <div className="flex items-center justify-center w-full h-[200px] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-h-[200px] max-w-full object-contain"
                />
              </div>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91] text-center w-full">
                {p.name}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
