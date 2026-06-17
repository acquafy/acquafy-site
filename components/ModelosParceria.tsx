"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

/* ── Medal icons (55×55) ──────────────────────────────────────── */
const imgSilver   = "/figma-assets/product-silver-d.webp";
const imgGold     = "/figma-assets/product-gold-c.webp";
const imgPlatinum = "/figma-assets/product-platinum-d.webp";

/* ── SVG stroke icons (rendered via CSS mask — NOT <img>) ────── */
const svgUser      = "/figma-assets/mp-icon-user.svg";
const svgScale     = "/figma-assets/mp-icon-scale.svg";
const svgCountry   = "/figma-assets/mp-icon-country.svg";
const svgShield    = "/figma-assets/mp-icon-shield.svg";     // 24×30 (portrait)
const svgDigital   = "/figma-assets/mp-icon-digital.svg";    // 38×40 → 28.5×30
const svgMultiReg  = "/figma-assets/mp-icon-multireg.svg";

/* ─────────────────────────────────────────────────────────────────
   StrokeIcon
   Renders an SVG stroke icon using CSS mask-image so its colour
   can be overridden per-tier (solid or gradient) without touching
   the SVG file. The SVG's own colour is discarded; only its
   transparent/opaque areas (alpha) drive the mask shape.
   Renders as a <div> — never as an <img>.
───────────────────────────────────────────────────────────────── */
function StrokeIcon({ src, color, aspectW = 30, aspectH = 30 }: { src: string; color: string; aspectW?: number; aspectH?: number }) {
  const isGradient = color.startsWith("linear-gradient");
  const size = 30;
  const w = aspectW >= aspectH ? size : size * (aspectW / aspectH);
  const h = aspectH >= aspectW ? size : size * (aspectH / aspectW);
  const base: React.CSSProperties = {
    WebkitMaskImage:    `url(${src})`,
    maskImage:          `url(${src})`,
    WebkitMaskSize:     "contain",
    maskSize:           "contain",
    WebkitMaskRepeat:   "no-repeat",
    maskRepeat:         "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition:       "center",
    width:  w,
    height: h,
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
type TierItem = { icon: string; label: string; value: string; aspectW?: number; aspectH?: number };

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

/* ── Translations ────────────────────────────────────────────── */
const T: Record<Lang, {
  heading:    string;
  headingHL:  string;
  silverFooter: string;
  goldFooter:   string;
  platFooter:   string;
  silver: { profile: string; profileVal: string; earn: string; earnVal: string; entry: string; entryVal: string; idealFor: string; idealForVal: string };
  gold:   { profile: string; profileVal: string; earn: string; earnVal: string; extraIncome: string; extraIncomeVal: string; entry: string; entryVal: string; idealFor: string; idealForVal: string };
  plat:   { profile: string; profileVal: string; howOp: string; howOpVal: string; rule: string; ruleVal: string; obs: string; obsVal: string; silverNet: string; silverNetVal: string; entry: string; entryVal: string };
}> = {
  pt: {
    heading:   "Modelos de ",
    headingHL: "Parceria",
    silverFooter: "Indica e recebe comissão sobre vendas.",
    goldFooter:   "Opera o Acquafy Media e vende Neo",
    platFooter:   "Distribui Neo e expande regionalmente",
    silver: {
      profile:    "Perfil",     profileVal:    "Afiliado / Indicador",
      earn:       "Como ganha", earnVal:       "20% sobre vendas indicadas via link ou QR Code",
      entry:      "Entrada",    entryVal:      "Cadastro simples e operação leve",
      idealFor:   "Ideal para", idealForVal:   "Influenciadores, consultores, vendedores e parceiros locais.",
    },
    gold: {
      profile:      "Perfil",        profileVal:      "Operador do Acquafy Media",
      earn:         "Como ganha",    earnVal:         "20% sobre vendas Neo via QR Code / link próprio",
      extraIncome:  "Receita extra", extraIncomeVal:  "Monetização de mídia local e operação do ponto de hidratação",
      entry:        "Entrada",       entryVal:        "Compra do Acquafy Media por US$ 2.000",
      idealFor:     "Ideal para",    idealForVal:     "Empreendedores, operadores de mídia e negócios locais",
    },
    plat: {
      profile:    "Perfil",          profileVal:    "Distribuidor regional /master partner",
      howOp:      "Como opera",      howOpVal:      "Compra com 70% de desconto sobre o preço EUA",
      rule:       "Regra comercial", ruleVal:       "Modalidade FOB. Revenda livre na sua região.",
      obs:        "Observação",      obsVal:        "Sem comissão da Acquafy. Assume frete, impostos e taxas.",
      silverNet:  "Rede Silver",     silverNetVal:  "Pode operar rede própria de parceiros Silver, pagando 20% para essa rede",
      entry:      "Entrada",         entryVal:      "Estrutura regional de distribuição.",
    },
  },
  en: {
    heading:   "Partnership ",
    headingHL: "Models",
    silverFooter: "Refers customers and earns commission on sales.",
    goldFooter:   "Operates Acquafy Media and sells Neo",
    platFooter:   "Distributes Neo and expands regionally",
    silver: {
      profile:    "Profile",    profileVal:    "Affiliate / Referrer",
      earn:       "Earnings",   earnVal:       "20% on referred sales via link or QR Code",
      entry:      "Entry",      entryVal:      "Simple registration and light operation",
      idealFor:   "Ideal for",  idealForVal:   "Influencers, consultants, sales reps, and local partners.",
    },
    gold: {
      profile:      "Profile",       profileVal:      "Acquafy Media Operator",
      earn:         "Earnings",      earnVal:         "20% on Neo sales via QR Code / own link",
      extraIncome:  "Extra revenue", extraIncomeVal:  "Local media monetization and hydration point operation",
      entry:        "Entry",         entryVal:        "Purchase of Acquafy Media for US$ 2,000",
      idealFor:     "Ideal for",     idealForVal:     "Entrepreneurs, media operators, and local businesses",
    },
    plat: {
      profile:    "Profile",         profileVal:    "Regional Distributor / Master Partner",
      howOp:      "How it works",    howOpVal:      "Buy at 70% discount off the US price",
      rule:       "Commercial rule", ruleVal:       "FOB terms. Free resale in your region.",
      obs:        "Note",            obsVal:        "No commission from Acquafy. You cover freight, taxes, and fees.",
      silverNet:  "Silver Network",  silverNetVal:  "Can operate your own Silver partner network, paying 20% to that network",
      entry:      "Entry",           entryVal:      "Regional distribution structure.",
    },
  },
  es: {
    heading:   "Modelos de ",
    headingHL: "Asociación",
    silverFooter: "Refiere clientes y recibe comisión por ventas.",
    goldFooter:   "Opera el Acquafy Media y vende Neo",
    platFooter:   "Distribuye Neo y expande regionalmente",
    silver: {
      profile:    "Perfil",        profileVal:    "Afiliado / Referidor",
      earn:       "Cómo gana",     earnVal:       "20% sobre ventas referidas via enlace o QR Code",
      entry:      "Entrada",       entryVal:      "Registro simple y operación ligera",
      idealFor:   "Ideal para",    idealForVal:   "Influencers, consultores, vendedores y socios locales.",
    },
    gold: {
      profile:      "Perfil",          profileVal:      "Operador del Acquafy Media",
      earn:         "Cómo gana",       earnVal:         "20% sobre ventas Neo via QR Code / enlace propio",
      extraIncome:  "Ingreso extra",   extraIncomeVal:  "Monetización de medios locales y operación del punto de hidratación",
      entry:        "Entrada",         entryVal:        "Compra del Acquafy Media por US$ 2.000",
      idealFor:     "Ideal para",      idealForVal:     "Emprendedores, operadores de medios y negocios locales",
    },
    plat: {
      profile:    "Perfil",            profileVal:    "Distribuidor regional / socio máster",
      howOp:      "Cómo opera",        howOpVal:      "Compra con 70% de descuento sobre el precio EE.UU.",
      rule:       "Regla comercial",   ruleVal:       "Modalidad FOB. Reventa libre en su región.",
      obs:        "Observación",       obsVal:        "Sin comisión de Acquafy. Asume flete, impuestos y tasas.",
      silverNet:  "Red Silver",        silverNetVal:  "Puede operar red propia de socios Silver, pagando 20% a esa red",
      entry:      "Entrada",           entryVal:      "Estructura regional de distribución.",
    },
  },
};

/* ── Component ───────────────────────────────────────────────── */
export default function ModelosParceria() {
  const { lang } = useLang();
  const t = T[lang];

  /* ── Tier data (inside component to use translated strings) ── */
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
      footer: t.silverFooter,
      items: [
        { icon: svgUser,    label: t.silver.profile,  value: t.silver.profileVal },
        { icon: svgScale,   label: t.silver.earn,     value: t.silver.earnVal },
        { icon: svgCountry, label: t.silver.entry,    value: t.silver.entryVal },
        { icon: svgShield,  label: t.silver.idealFor, value: t.silver.idealForVal, aspectW: 24, aspectH: 30 },
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
      footer: t.goldFooter,
      items: [
        { icon: svgUser,    label: t.gold.profile,     value: t.gold.profileVal },
        { icon: svgScale,   label: t.gold.earn,        value: t.gold.earnVal },
        { icon: svgCountry, label: t.gold.extraIncome, value: t.gold.extraIncomeVal },
        { icon: svgShield,  label: t.gold.entry,       value: t.gold.entryVal },
        { icon: svgDigital, label: t.gold.idealFor,    value: t.gold.idealForVal, aspectW: 38, aspectH: 40 },
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
      footer: t.platFooter,
      footerStyle: { color: "white" },
      items: [
        { icon: svgUser,     label: t.plat.profile,   value: t.plat.profileVal },
        { icon: svgScale,    label: t.plat.howOp,     value: t.plat.howOpVal },
        { icon: svgCountry,  label: t.plat.rule,      value: t.plat.ruleVal },
        { icon: svgShield,   label: t.plat.obs,       value: t.plat.obsVal, aspectW: 24, aspectH: 30 },
        { icon: svgDigital,  label: t.plat.silverNet, value: t.plat.silverNetVal, aspectW: 38, aspectH: 40 },
        { icon: svgMultiReg, label: t.plat.entry,     value: t.plat.entryVal },
      ],
    },
  ];

  return (
    <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {t.heading}
          <span className="text-[#0569ff]">{t.headingHL}</span>
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
                      <StrokeIcon src={item.icon} color={t.iconColor} aspectW={item.aspectW} aspectH={item.aspectH} />
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
