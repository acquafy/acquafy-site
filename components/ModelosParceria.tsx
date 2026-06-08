import FigmaIcon from "./FigmaIcon";

// Tier medal icons
const imgSilver   = "/figma-assets/38da40a7-26bb-4f7a-99a5-65b47e867479.png";
const imgGold     = "/figma-assets/ae409aed-f3e1-4496-bc73-e0fa23423f95.png";
const imgPlatinum = "/figma-assets/35878417-4ef7-4de9-90e1-4319485c805b.png";

// Row icons — shared across tiers (different color contexts)
const imgUser    = "/figma-assets/e7505793-af8d-4d80-bfb8-115b7aa49fca.svg";  // user profile
const imgScale   = "/figma-assets/5d31941c-3b14-47c9-af5e-4ebe03fa1722.svg";  // scale/ganho
const imgCountry = "/figma-assets/674ba37f-fb16-4d91-ac0b-6375fc97ba8d.svg";  // country/entrada
const imgShield  = "/figma-assets/e8b79a89-d96c-4bc2-aa5d-ca57735dfaba.svg";  // shield/ideal
const imgDigital = "/figma-assets/0a516811-b28e-4026-80e7-597714878028.svg";  // ecosystem digital

type TierItem = { icon: string; iW: number; iH: number; label: string; value: string };

type TierDef = {
  icon: string;
  iconW: number;
  iconH: number;
  name: string;
  nameStyle: React.CSSProperties;
  outerCls: string;
  innerCls: string;
  badgeCls: string;
  badgeStyle?: React.CSSProperties;
  labelStyle: React.CSSProperties;
  footer: string;
  items: TierItem[];
};

const tiers: TierDef[] = [
  {
    icon: imgSilver, iconW: 40, iconH: 50,
    name: "SILVER",
    nameStyle: { color: "#3e4650" },
    outerCls: "bg-[#f6f9fe] border-2 border-[#e2e7fb]",
    innerCls:  "bg-white border border-[#e2e7fb]",
    badgeCls:  "border border-[#e2e7fb] bg-gradient-to-l from-[#e2e7fb] via-[#fbfcff] to-[#e2e7fb]",
    labelStyle: { color: "#2a2a2b" },
    footer: "Indica e recebe comissão sobre vendas.",
    items: [
      { icon: imgUser,    iW: 30, iH: 30, label: "Perfil",    value: "Afiliado / Indicador" },
      { icon: imgScale,   iW: 30, iH: 30, label: "Como ganha", value: "20% sobre vendas indicadas via link ou QR Code" },
      { icon: imgCountry, iW: 30, iH: 30, label: "Entrada",   value: "Cadastro simples e operação leve" },
      { icon: imgShield,  iW: 24, iH: 30, label: "Ideal para", value: "Influenciadores, consultores, vendedores e parceiros locais." },
    ],
  },
  {
    icon: imgGold, iconW: 40, iconH: 40,
    name: "GOLD",
    nameStyle: { color: "#dfa727" },
    outerCls: "bg-[#fcfaf6] border-2 border-[#ffe7bf]",
    innerCls:  "bg-white border border-[#ffe7bf]",
    badgeCls:  "bg-[#fcfaf6] border border-[#ffe7bf]",
    labelStyle: { color: "#dfa727" },
    footer: "Opera o Acquafy Media e vende Neo",
    items: [
      { icon: imgUser,    iW: 30, iH: 30, label: "Perfil",       value: "Operador do Acquafy Media" },
      { icon: imgScale,   iW: 30, iH: 30, label: "Como ganha",   value: "20% sobre vendas Neo via QR Code / link próprio" },
      { icon: imgCountry, iW: 30, iH: 30, label: "Receita extra", value: "Monetização de mídia local e operação do ponto de hidratação" },
      { icon: imgShield,  iW: 24, iH: 30, label: "Entrada",      value: "Compra do Acquafy Media por US$ 2.000" },
      { icon: imgDigital, iW: 38, iH: 40, label: "Ideal para",   value: "Empreendedores, operadores de mídia e negócios locais" },
    ],
  },
  {
    icon: imgPlatinum, iconW: 44, iconH: 50,
    name: "PLATINUM",
    nameStyle: { color: "white" },
    outerCls: "border-2 border-[#bbcaf8]",
    innerCls:  "bg-white border border-[#e2e7fb]",
    badgeCls:  "border border-[#bbcaf8]",
    badgeStyle: { backgroundImage: "linear-gradient(94.37deg, #e0e8ff 6.19%, #fefeff 49.77%, #f5eaff 93.35%)" },
    labelStyle: { backgroundImage: "linear-gradient(148.94deg, #002ba8 0%, #6e0cc3 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } as React.CSSProperties,
    footer: "Distribui e revende em escala regional ou global.",
    items: [
      { icon: imgUser,    iW: 30, iH: 30, label: "Perfil",         value: "Distribuidor regional / master partner" },
      { icon: imgScale,   iW: 30, iH: 30, label: "Como opera",     value: "Compra com 70% de desconto sobre o preço EUA" },
      { icon: imgCountry, iW: 30, iH: 30, label: "Regra comercial", value: "Modalidade FOB. Revenda livre na sua região." },
      { icon: imgShield,  iW: 24, iH: 30, label: "Entrada",        value: "Pedido mínimo de US$ 10.000 em produtos" },
      { icon: imgDigital, iW: 38, iH: 40, label: "Ideal para",     value: "Empresas, importadores e distribuidores estratégicos." },
    ],
  },
];

export default function ModelosParceria() {
  return (
    <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {"Modelos de "}
          <span className="text-[#0569ff]">Parceria</span>
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-[1_0_0] flex-col gap-[25px] items-center min-h-[320px] min-w-[280px] px-[20px] py-[25px] rounded-[16px] ${t.outerCls}`}
              style={t.name === "PLATINUM" ? { backgroundImage: "linear-gradient(92.97deg, #0233c3 6.19%, #9f3df5 93.35%)" } : undefined}
            >
              {/* Tier header */}
              <div className="flex gap-[20px] items-center justify-center px-[20px] w-full shrink-0">
                <img src={t.icon} alt={t.name} className="object-contain shrink-0" style={{ width: t.iconW, height: t.iconH }} />
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] flex-1 min-w-0" style={t.nameStyle}>
                  {t.name}
                </p>
              </div>

              {/* Inner card */}
              <div className={`flex flex-col items-start justify-between min-h-[500px] p-[20px] rounded-[12px] w-full ${t.innerCls}`}>
                {t.items.map((item) => (
                  <div key={item.label} className="flex flex-wrap gap-[20px] items-center justify-center min-w-[160px] w-full">
                    {/* Icon badge */}
                    <div
                      className={`flex flex-col items-center justify-center p-[14px] rounded-full shrink-0 size-[60px] ${t.badgeCls}`}
                      style={t.badgeStyle}
                    >
                      <div className="flex flex-col items-center justify-center size-[30px]">
                        <FigmaIcon src={item.icon} size={24} aspectW={item.iW} aspectH={item.iH} />
                      </div>
                    </div>
                    {/* Text */}
                    <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] w-full" style={t.labelStyle}>
                        {item.label}
                      </p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#3e4650] w-full">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer summary */}
              <div className="flex items-center justify-center w-full shrink-0">
                <p
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-center w-full"
                  style={t.name === "PLATINUM" ? { color: "white" } : { color: "#3e4650" }}
                >
                  {t.footer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
