/* ── Medal icons (55×55) ──────────────────────────────────────── */
const imgSilver   = "/figma-assets/fc77e73a-6af6-4239-a007-70775393e1d8.png";
const imgGold     = "/figma-assets/52cce9b5-c0bf-452a-94fd-8f2ead4a089c.png";
const imgPlatinum = "/figma-assets/9149cb94-288c-4f50-992b-3fdd6369b4cd.png";

/* ── SVG stroke icons (rendered via CSS mask — NOT <img>) ────── */
const svgUser      = "/figma-assets/e7505793-af8d-4d80-bfb8-115b7aa49fca.svg";
const svgScale     = "/figma-assets/5d31941c-3b14-47c9-af5e-4ebe03fa1722.svg";
const svgCountry   = "/figma-assets/674ba37f-fb16-4d91-ac0b-6375fc97ba8d.svg";
const svgShield    = "/figma-assets/e8b79a89-d96c-4bc2-aa5d-ca57735dfaba.svg";
const svgDigital   = "/figma-assets/0a516811-b28e-4026-80e7-597714878028.svg";
const svgMultiReg  = "/figma-assets/3828bea1-96ec-4ec9-a053-b46db37afc45.svg";

/* ─────────────────────────────────────────────────────────────────
   StrokeIcon
   Renders an SVG stroke icon using CSS mask-image so its colour
   can be overridden per-tier (solid or gradient) without touching
   the SVG file. The SVG's own colour is discarded; only its
   transparent/opaque areas (alpha) drive the mask shape.
   Renders as a <div> — never as an <img>.
───────────────────────────────────────────────────────────────── */
function StrokeIcon({ src, color }: { src: string; color: string }) {
  const isGradient = color.startsWith("linear-gradient");
  const base: React.CSSProperties = {
    WebkitMaskImage:    `url(${src})`,
    maskImage:          `url(${src})`,
    WebkitMaskSize:     "contain",
    maskSize:           "contain",
    WebkitMaskRepeat:   "no-repeat",
    maskRepeat:         "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition:       "center",
    width:  30,
    height: 30,
    flexShrink: 0,
  };
  return (
    <div
      style={
        isGradient
          ? { ...base, backgroundImage: color }
          : { ...base, backgroundColor: color }
      }
    />
  );
}

/* ── Types ───────────────────────────────────────────────────── */
type TierItem = { icon: string; label: string; value: string };

type TierDef = {
  medal:       string;
  name:        string;
  nameStyle:   React.CSSProperties;
  outerCls:    string;
  innerCls:    string;
  badgeCls:    string;
  badgeStyle?: React.CSSProperties;
  iconColor:   string;
  labelStyle:  React.CSSProperties;
  footer:      string;
  footerStyle?: React.CSSProperties;
  items:       TierItem[];
};

/* ── Platinum shared tokens ──────────────────────────────────── */
const platGradient = "linear-gradient(148.94deg, #002ba8 0%, #6e0cc3 100%)";

const platLabelStyle: React.CSSProperties = {
  backgroundImage:      platGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor:  "transparent",
  backgroundClip:       "text",
};

const platBadgeStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(94.37deg, #e0e8ff 6.19%, #fefeff 49.77%, #f5eaff 93.35%)",
};

/* ── Tier data ───────────────────────────────────────────────── */
const tiers: TierDef[] = [
  /* ── SILVER ── */
  {
    medal:     imgSilver,
    name:      "SILVER",
    nameStyle: { color: "#3e4650" },
    outerCls:  "bg-[#f6f9fe] border-2 border-[#e2e7fb]",
    innerCls:  "bg-white border border-[#e2e7fb]",
    badgeCls:  "border border-[#e2e7fb] bg-gradient-to-l from-[#e2e7fb] via-[#fbfcff] to-[#e2e7fb]",
    iconColor: "#0569ff",
    labelStyle: { color: "#2a2a2b" },
    footer: "Indica e recebe comissão sobre vendas.",
    items: [
      { icon: svgUser,    label: "Perfil",     value: "Afiliado / Indicador" },
      { icon: svgScale,   label: "Como ganha", value: "20% sobre vendas indicadas via link ou QR Code" },
      { icon: svgCountry, label: "Entrada",    value: "Cadastro simples e operação leve" },
      { icon: svgShield,  label: "Ideal para", value: "Influenciadores, consultores, vendedores e parceiros locais." },
    ],
  },

  /* ── GOLD ── */
  {
    medal:     imgGold,
    name:      "GOLD",
    nameStyle: { color: "#dfa727" },
    outerCls:  "bg-[#fcfaf6] border-2 border-[#ffe7bf]",
    innerCls:  "bg-white border border-[#ffe7bf]",
    badgeCls:  "bg-[#fcfaf6] border border-[#ffe7bf]",
    iconColor: "#dfa727",
    labelStyle: { color: "#dfa727" },
    footer: "Opera o Acquafy Media e vende Neo",
    items: [
      { icon: svgUser,    label: "Perfil",        value: "Operador do Acquafy Media" },
      { icon: svgScale,   label: "Como ganha",    value: "20% sobre vendas Neo via QR Code / link próprio" },
      { icon: svgCountry, label: "Receita extra", value: "Monetização de mídia local e operação do ponto de hidratação" },
      { icon: svgShield,  label: "Entrada",       value: "Compra do Acquafy Media por US$ 2.000" },
      { icon: svgDigital, label: "Ideal para",    value: "Empreendedores, operadores de mídia e negócios locais" },
    ],
  },

  /* ── PLATINUM ── */
  {
    medal:      imgPlatinum,
    name:       "PLATINUM",
    nameStyle:  { color: "white" },
    outerCls:   "border-2 border-[#bbcaf8]",
    innerCls:   "bg-white border border-[#e2e7fb]",
    badgeCls:   "border border-[#bbcaf8]",
    badgeStyle: platBadgeStyle,
    iconColor:  platGradient,
    labelStyle: platLabelStyle,
    footer: "Distribui Neo e expande regionalmente",
    footerStyle: { color: "white" },
    items: [
      { icon: svgUser,    label: "Perfil",          value: "Distribuidor regional /master partner" },
      { icon: svgScale,   label: "Como opera",      value: "Compra com 70% de desconto sobre o preço EUA" },
      { icon: svgCountry, label: "Regra comercial", value: "Modalidade FOB. Revenda livre na sua região." },
      { icon: svgShield,  label: "Observação",      value: "Sem comissão da Acquafy. Assume frete, impostos e taxas." },
      { icon: svgDigital, label: "Rede Silver",     value: "Pode operar rede própria de parceiros Silver, pagando 20% para essa rede" },
      { icon: svgMultiReg,label: "Entrada",         value: "Estrutura regional de distribuição." },
    ],
  },
];

/* ── Component ───────────────────────────────────────────────── */
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
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-[1_0_0] flex-col gap-[25px] items-center min-h-[320px] min-w-[280px] px-[20px] py-[25px] rounded-[16px] ${t.outerCls}`}
              style={t.name === "PLATINUM" ? { backgroundImage: "linear-gradient(92.97deg, #0233c3 6.19%, #9f3df5 93.35%)" } : undefined}
            >
              {/* Medal + tier name */}
              <div className="flex gap-[20px] items-center justify-center px-[20px] shrink-0 w-full">
                <img
                  src={t.medal}
                  alt={t.name}
                  className="object-contain shrink-0 size-[55px]"
                />
                <p
                  className="font-['Avenir_LT_Pro:95_Black'] flex-[1_0_0] min-w-px text-[32px] leading-[39px]"
                  style={t.nameStyle}
                >
                  {t.name}
                </p>
              </div>

              {/* Inner card — fixed 500px, items spread via justify-between */}
              <div className={`flex flex-1 flex-col gap-[20px] items-start justify-between p-[20px] rounded-[12px] w-full ${t.innerCls}`}>
                {t.items.map((item) => (
                  <div key={item.label} className="flex flex-wrap gap-[20px] items-center justify-center min-w-[160px] shrink-0 w-full">
                    {/* Icon badge — StrokeIcon renders as <div>, NOT <img> */}
                    <div
                      className={`flex items-center justify-center rounded-[9999px] shrink-0 size-[60px] ${t.badgeCls}`}
                      style={t.badgeStyle}
                    >
                      <StrokeIcon src={item.icon} color={t.iconColor} />
                    </div>
                    {/* Text block */}
                    <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                      <p
                        className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] shrink-0 w-full"
                        style={t.labelStyle}
                      >
                        {item.label}
                      </p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#3e4650] shrink-0 w-full">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center shrink-0 w-full">
                <div className="flex flex-[1_0_0] flex-col items-start min-w-px">
                  <p
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] shrink-0 text-center w-full"
                    style={t.footerStyle ?? { color: "#3e4650" }}
                  >
                    {t.footer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
