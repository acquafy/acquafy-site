"use client";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";

const imgBg     = "/figma-assets/06a6a2b8-28b7-4f8a-b500-fea6f628ac43.png";
const imgFrame  = "/figma-assets/b3635421-87cc-4404-b02a-8a35171ad853.png";
const imgPlanet = "/figma-assets/afe49ef6-ac37-4f41-bab3-127f4dcae483.svg";

const imgPeople = "/figma-assets/6b0fc92c-b6ef-4f8d-ac5b-aa67da06e49c.svg";
const imgWater  = "/figma-assets/e3111aad-f472-422c-b8d0-33ccfaa9da5d.svg";
const imgScreen = "/figma-assets/9b404a53-31a6-42bf-bc9b-d1aee2df8a7a.svg";
const imgMoneyS = "/figma-assets/d82e7b9c-c375-4487-a934-781dfc72c028.svg";
const imgMobile = "/figma-assets/d60aa24f-5556-41f7-bd47-a70f1ea00014.svg";
const imgLocal  = "/figma-assets/e3137c73-e1fb-4514-8aee-5d5c9063b8b2.svg";

const imgPlay   = "/figma-assets/e91b43d2-d646-4fca-b01f-0312cf4ad5db.svg";
const imgQR     = "/figma-assets/78a4cc62-3b5c-448f-8a67-f195cc497b16.svg";
const imgAI     = "/figma-assets/d0fdc59a-a432-4c43-8deb-0779ba64ad9e.svg";
const imgMoneyL = "/figma-assets/157fba37-bbd5-4453-a45a-15f32ed9a05e.svg";
const imgWifi   = "/figma-assets/9ca2ced3-dc54-42a4-8851-732566c5e9f4.svg";

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
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91] flex-1">
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
          className="font-['Avenir_LT_Pro:95_Black'] text-[48px] leading-[55px] bg-clip-text text-transparent w-fit text-center"
          style={{ backgroundImage: titleGradient }}
        >
          Acquafy Media
        </h1>
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[22px] leading-[26px] text-[#1f2e91] text-center">
          Plataforma de Água Inteligente + Mídia Digital + Receita Recorrente.
        </h2>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center">
          O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios.
          Combine água gratuita, anúncios, QR Codes e venda da linha Neo para gerar receita recorrente.
        </p>
        <div className="flex flex-wrap gap-[16px] items-center justify-center w-full">
          <BtnAzulBaseArrow className="flex-[1_0_0] min-w-[190px] min-h-[50px] px-[20px]">
            Quero o Acquafy Media
          </BtnAzulBaseArrow>
          <BtnAzulOutArrow className="flex-[1_0_0] min-w-[190px] min-h-[50px] px-[20px]">
            Falar com especialista
          </BtnAzulOutArrow>
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
              className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] bg-clip-text text-transparent w-fit"
              style={{ backgroundImage: titleGradient }}
            >
              Acquafy Media
            </h1>
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91]">
              Plataforma de Água Inteligente + Mídia Digital + Receita Recorrente.
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333]">
              O Acquafy Media transforma locais públicos em pontos de hidratação, visibilidade e negócios.
              Combine fornecimento de água gratuita e acessível, exibição de anúncios, QR Codes e venda da
              linha Neo para gerar valor contínuo para sua operação e para as marcas.
            </p>
            {/* Botões — node 3258:5041 */}
            <div className="flex flex-wrap gap-[20px] items-center w-full">
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
