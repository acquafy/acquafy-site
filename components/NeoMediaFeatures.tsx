// "Uma plataforma física de hidratação, mídia e conversão" (Figma node 3258:4218)
import FigmaIcon from "./FigmaIcon";

const imgMarketing = "/figma-assets/9b7dece2-0a8e-4cc0-b793-1c7b71987e1c.svg";
const imgDashboard = "/figma-assets/3d43f817-a1b2-4de2-9b91-ea3be3c131c1.svg";
const imgBrain     = "/figma-assets/15106c5c-9181-485c-9cf5-1a613edb5210.svg";
const imgMoney     = "/figma-assets/4b4a3d2b-a6f9-402c-a12a-a2abcae19631.svg";
const imgQR        = "/figma-assets/3830e066-a6d5-42ce-ba6a-96dc792a6011.svg";
const imgLocal     = "/figma-assets/d17a72fb-63e4-425f-a41c-4fdc2039c8af.svg";

// aspectW/aspectH extraídos do Figma (node 3258:4218):
// marketing → 39.76×28.46 (landscape), dashboard → 642×642 (sq),
// brain → 30×30 (sq), money → 33.33×30 (landscape), qr → 629×629 (sq), local → 24.63×30 (portrait)
const features = [
  {
    icon: imgMarketing, aspectW: 39.76, aspectH: 28.46,
    title: "Receita com anúncios",
    desc: "Monetize campanhas publicitárias e aumente a visibilidade de marcas no seu ponto.",
  },
  {
    icon: imgDashboard, aspectW: 32,    aspectH: 32,
    title: "Dashboard do operador",
    desc: "Gerencie campanhas, usuários, vendas e indicadores em um painel completo e intuitivo.",
  },
  {
    icon: imgBrain,     aspectW: 30,    aspectH: 30,
    title: "AI + Dados operacionais",
    desc: "Insights inteligentes para manutenção, performance, uso e expansão da sua rede.",
  },
  {
    icon: imgMoney,     aspectW: 33.33, aspectH: 30,
    title: "Receita recorrente",
    desc: "Modelo de negócio combinando mídia, água e vendas de produtos com recorrência.",
  },
  {
    icon: imgQR,        aspectW: 32,    aspectH: 32,
    title: "QR Codes e vendas Neo",
    desc: "Converta escaneamentos em vendas da linha Neo e ganhe comissões automáticas.",
  },
  {
    icon: imgLocal,     aspectW: 24.63, aspectH: 30,
    title: "Locais ideais",
    desc: "Aeroportos, shoppings, hospitais, empresas, universidades e áreas públicos de alto fluxo.",
  },
];

export default function NeoMediaFeatures() {
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center w-full">
          Uma plataforma física de{" "}
          <span className="text-[#0569ff]">hidratação, mídia e conversão</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <div className="flex flex-col items-center justify-center size-[40px]">
                <FigmaIcon src={f.icon} size={32} aspectW={f.aspectW} aspectH={f.aspectH} />
              </div>
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#1f2e91] text-center min-h-[50px] w-full">
                {f.title}
              </h3>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#333] text-center w-full">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
