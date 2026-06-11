import FigmaIcon from "./FigmaIcon";
import Link from "next/link";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";

/* ── Assets ───────────────────────────────────────────────────── */
// Tela total (≥1280px) — BG image fills the whole section
const imgBgPadrao = "/figma-assets/ddb7b9ae-5269-49c5-9935-ed285ed394fa.png";

// 1024–1279px right column + mobile bottom — product image
const imgFrame1024 = "/figma-assets/405a21e8-227a-4c26-8bcd-c7ad33247447.png";

// Badge & tier icons
const imgPlanet   = "/figma-assets/225f4766-3b68-4083-80f9-8bda33dbe7e3.svg";
const imgSilver   = "/figma-assets/fc77e73a-6af6-4239-a007-70775393e1d8.png";
const imgGold     = "/figma-assets/52cce9b5-c0bf-452a-94fd-8f2ead4a089c.png";
const imgPlatinum = "/figma-assets/9149cb94-288c-4f50-992b-3fdd6369b4cd.png";

/* ── Tier badge data ─────────────────────────────────────────── */
const tiers = [
  {
    key:       "silver",
    src:       imgSilver,
    alt:       "Silver",
    label:     "Silver",
    imgCls:    "size-[40px] object-contain shrink-0",
    labelCls:  "font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#3e4650]",
    labelStyle: undefined as React.CSSProperties | undefined,
  },
  {
    key:       "gold",
    src:       imgGold,
    alt:       "Gold",
    label:     "Gold",
    imgCls:    "size-[40px] object-contain shrink-0",
    labelCls:  "font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#dfa727]",
    labelStyle: undefined as React.CSSProperties | undefined,
  },
  {
    key:       "platinum",
    src:       imgPlatinum,
    alt:       "Platinum",
    label:     "Platinum",
    imgCls:    "size-[40px] object-contain shrink-0",
    labelCls:  "font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] bg-clip-text text-transparent",
    labelStyle: { backgroundImage: "linear-gradient(117.65deg, #0233c3 6.19%, #9f3df5 93.35%)" } as React.CSSProperties,
  },
];

export default function ParceriaBanner() {
  return (
    <section className="relative bg-white w-full px-[20px] py-[40px] flex items-center justify-center overflow-hidden xl:bg-transparent xl:min-h-[875px]">

      {/* ── BG image — tela total (≥1280px) ──────────────────── */}
      <img
        alt=""
        className="hidden xl:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBgPadrao}
      />

      {/* ── Content wrapper ────────────────────────────────────── */}
      {/* mobile: flex-col | 1024–1279px: flex-row flex-wrap | ≥1280px: flex-row + BG */}
      <div className="relative flex flex-col lg:flex-row lg:flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full xl:min-h-[795px]">

        {/* ══ LEFT COLUMN ══════════════════════════════════════ */}
        <div className="flex flex-col gap-[20px] lg:gap-[40px] items-center w-full lg:items-start lg:flex-[1_0_0] lg:max-w-[450px] lg:min-w-[280px]">

          {/* "Nova fase global" pill */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgPlanet} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#0233c3]">
              NOVA FASE GLOBAL
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-['Avenir_LT_Pro:95_Black'] text-hero bg-clip-text text-transparent w-full text-center lg:text-left"
            style={{ backgroundImage: "linear-gradient(110.27deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            Programa de Parceria Global Acquafy
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[24px] lg:text-[18px] lg:leading-[26px] text-[#333] text-center lg:text-left">
            Três níveis para crescer com a marca em escala global: indicar, operar ou distribuir.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center xl:justify-start w-full">
            <Link href="/contato">
              <BtnAzulOutArrow className="min-h-[50px]">
                Falar com especialista
              </BtnAzulOutArrow>
            </Link>
          </div>

          {/* Tier badges */}
          <div className="flex flex-row gap-[20px] items-stretch justify-center xl:justify-start w-full">
            {tiers.map((t) => (
              <div
                key={t.key}
                className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center p-[10px] rounded-[16px]"
              >
                <img src={t.src} alt={t.alt} className={t.imgCls} />
                <span className={`${t.labelCls} text-center`} style={t.labelStyle}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PRODUCT IMAGE ════════════════════════════════════ */}
        {/* mobile: abaixo do conteúdo (flex-col) | 1024–1279px: coluna direita | ≥1280px: oculto */}
        <div className="xl:hidden relative aspect-[750/745] min-h-[278px] min-w-[280px] rounded-[16px] shrink-0 w-full lg:flex-[1_0_0] lg:w-auto overflow-hidden">
          <img
            src={imgFrame1024}
            alt="Produto Acquafy"
            className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
          />
        </div>

        {/* ══ RIGHT PLACEHOLDER — tela total (≥1280px) ════════ */}
        {/* BG image provê o visual; este div equilibra o flex row */}
        <div className="hidden xl:flex flex-[1_0_0] min-w-[280px] h-[795px]" />

      </div>
    </section>
  );
}
