"use client";
import FigmaIcon from "./FigmaIcon";
import Link from "next/link";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";

const imgBg     = "/figma-assets/bg-h.webp";
const imgFrame  = "/figma-assets/frame-image.webp";
const imgPlanet = "/figma-assets/icon-planet-c.svg";

const imgPeople = "/figma-assets/icon-people-b.svg";
const imgWater  = "/figma-assets/icon-water-d.svg";
const imgScreen = "/figma-assets/icon-screen.svg";
const imgMoneyS = "/figma-assets/icon-money-small-s.svg";
const imgMobile = "/figma-assets/icon-mobile-d.svg";
const imgLocal  = "/figma-assets/icon-local-b.svg";

const imgPlay   = "/figma-assets/icon-play-b.svg";
const imgQR     = "/figma-assets/icon-qr-b.svg";
const imgAI     = "/figma-assets/icon-ai-30px-e.svg";
const imgMoneyL = "/figma-assets/icon-money-large-l.svg";
const imgWifi   = "/figma-assets/icon-wifi-a.svg";

const stats = [
  { icon: imgPeople, aspectW: 40.69, aspectH: 40,  title: "Alto fluxo",  sub: "de pessoas" },
  { icon: imgWater,  aspectW: 40,    aspectH: 40,  title: "Água",         sub: "Premium" },
  { icon: imgScreen, aspectW: 21,    aspectH: 30,  title: "Tela de 43'", sub: "de alta visibilidade" },
  { icon: imgMoneyS, aspectW: 472,   aspectH: 440, title: "Receita",      sub: "Recorrente" },
  { icon: imgMobile, aspectW: 21,    aspectH: 30,  title: "Gestão",       sub: "via App" },
  { icon: imgLocal,  aspectW: 24.63, aspectH: 30,  title: "Instalação",   sub: "Estratégica" },
];

const cards = [
  { icon: imgPlay,   aspectW: 26.67, aspectH: 26.67, label: "Media Network" },
  { icon: imgQR,     aspectW: 629,   aspectH: 629,   label: "QR Code" },
  { icon: imgAI,     aspectW: 30,    aspectH: 28,    label: "AI" },
  { icon: imgMoneyL, aspectW: 33.33, aspectH: 30,    label: "Receita recorrente" },
  { icon: imgWifi,   aspectW: 30,    aspectH: 20,    label: "App + IoT" },
];

const titleGradient = "linear-gradient(130.89deg, #0233c3 6.2%, #9f3df5 93.4%)";

function Label() {
  return (
    <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center px-[12px] py-[8px] rounded-full shrink-0">
      <FigmaIcon src={imgPlanet} size={16} />
      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
        LINHA NEO MEDIA
      </span>
    </div>
  );
}

function CardItem({ c, fullWidth }: { c: typeof cards[0]; fullWidth?: boolean }) {
  return (
    <div
      className={`flex gap-[20px] items-center h-[80px] p-[20px] rounded-[16px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] shrink-0 ${fullWidth ? "w-full" : "w-[250px]"}`}
      style={{ background: "linear-gradient(to right, white, rgba(255,255,255,0.7))" }}
    >
      <div className="flex flex-col items-center justify-center size-[40px] shrink-0">
        <FigmaIcon src={c.icon} size={30} aspectW={c.aspectW} aspectH={c.aspectH} />
      </div>
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] flex-1">
        {c.label}
      </p>
    </div>
  );
}

export default function NeoMediaBanner() {
  return (
    <section className="relative flex flex-col items-center gap-[20px] px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">
      {/* BG foto — apenas >= lg (1024px) */}
      <img
        alt=""
        src={imgBg}
        className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* ── MOBILE (< lg / < 1024px) ── */}
      <div className="lg:hidden relative flex flex-col gap-[20px] items-center w-full">
        <Label />
        <h1
          className="font-['Avenir_LT_Pro:95_Black'] text-hero-md bg-clip-text text-transparent w-fit text-center"
          style={{ backgroundImage: titleGradient }}
        >
          Acquafy Media
        </h1>
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[22px] leading-[26px] text-[#1f2e91] text-center">
          Plataforma Inteligente de Água + Mídia Digital + Receita Recorrente.
        </h2>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center">
          O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios.
          Combine água gratuita, anúncios, QR Codes e venda da linha Neo para gerar receita recorrente.
        </p>
        <div className="flex flex-wrap gap-[16px] items-center justify-center w-full">
          <BtnAzulBaseArrow className="flex-[1_0_0] min-w-[190px] min-h-[50px] px-[20px]">
            Quero o Acquafy Media
          </BtnAzulBaseArrow>
          <Link href="/contato" className="flex-[1_0_0] min-w-[190px]">
            <BtnAzulOutArrow className="w-full min-h-[50px] px-[20px]">
              Falar com especialista
            </BtnAzulOutArrow>
          </Link>
        </div>
        <div className="flex flex-wrap gap-[30px_0] items-center justify-start w-full py-[25px]">
          {stats.map((s) => (
            <div key={s.title} className="flex flex-[1_0_0] gap-[10px] items-center min-w-[140px]">
              <FigmaIcon src={s.icon} size={30} aspectW={s.aspectW} aspectH={s.aspectH} />
              <div className="flex flex-col gap-[10px]">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91]">{s.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Cards + imagem do dispositivo — node 3411:6044 */}
        <div className="flex flex-wrap gap-[20px] items-center justify-end w-full">
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[280px]">
            {cards.map((c) => (
              <CardItem key={c.label} c={c} fullWidth />
            ))}
          </div>
          <div className="flex-[1_0_0] h-[482px] min-w-[280px] relative rounded-[16px] overflow-hidden">
            <img
              alt=""
              src={imgFrame}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ── TOTAL (>= lg / >= 1024px) — Figma node 3258:5155 ── */}
      <div className="hidden lg:flex relative flex-col items-center justify-center w-full xl:flex-[1_0_0] xl:min-h-px">
        <div className="flex flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full xl:flex-[1_0_0]">
          {/* Coluna esquerda — node 3258:5037 */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[280px]">
            <Label />
            <h1
              className="font-['Avenir_LT_Pro:95_Black'] text-hero bg-clip-text text-transparent w-fit"
              style={{ backgroundImage: titleGradient }}
            >
              Acquafy Media
            </h1>
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91]">
              Plataforma Inteligente de Água + Mídia Digital + Receita Recorrente.
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333]">
              O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios.
              Combine fornecimento de água gratuita e acessível, exibição de anúncios, QR Codes e venda da
              linha Neo para gerar valor contínuo para sua operação e para as marcas.
            </p>
            {/* Botões — node 3258:5041 */}
            <div className="flex flex-wrap gap-[20px] items-center justify-center xl:justify-start w-full">
              <BtnAzulBaseArrow className="min-h-[50px] px-[20px]">
                Quero o Acquafy Media
              </BtnAzulBaseArrow>
              <BtnAzulOutArrow className="min-h-[50px] px-[20px]">
                Falar com especialista
              </BtnAzulOutArrow>
            </div>
            {/* Stats — node 3410:13509 */}
            <div className="flex flex-wrap gap-[30px_0] items-center justify-center py-[25px] rounded-[16px] w-full">
              {stats.map((s) => (
                <div key={s.title} className="flex flex-[1_0_0] flex-wrap gap-[10px] items-center min-w-[200px]">
                  <div className="flex flex-col items-center justify-center shrink-0 size-[30px]">
                    <FigmaIcon src={s.icon} size={30} aspectW={s.aspectW} aspectH={s.aspectH} />
                  </div>
                  <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[100px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91]">{s.title}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Coluna direita — cards 250px — node 3258:5048 */}
          <div className="flex flex-[1_0_0] flex-col gap-[40px] items-end justify-center min-w-[280px]">
            {cards.map((c) => (
              <CardItem key={c.label} c={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
