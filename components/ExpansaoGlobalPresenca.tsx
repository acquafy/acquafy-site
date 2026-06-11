import Link from "next/link";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulOutArrow } from "./ui/Buttons";

const imgMapaMundi = "/figma-assets/c0ebaa80-dd91-4825-8f8d-29198d06ee3f.png";
const imgPlanetWeb = "/figma-assets/e7e03953-b6e3-4625-ae26-f2578dc2665b.svg";  // 30×30 sq

const regions = [
  { name: "América do Norte",      countries: "EUA • Canadá • México" },
  { name: "América do Sul",        countries: "Brasil • Argentina • Colômbia • Chile • Peru e outros" },
  { name: "Europa",                countries: "Reino Unido • Espanha • França • Alemanha • Itália e outros" },
  { name: "África e Oriente Médio",countries: "EAU • Arábia Saudita • África do Sul e outros" },
  { name: "Ásia Pacífico",         countries: "Austrália • Singapura • Índia • Japão e outros" },
];

export default function ExpansaoGlobalPresenca() {
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Section header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] w-full">
            <span className="text-[#0569ff]">Presença global</span>
            <span className="text-[#1f2e91]"> em crescimento</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            Uma rede internacional sólida, conectando pessoas, tecnologia e oportunidades.
          </p>
        </div>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-[20px] items-stretch justify-center w-full">

          {/* Map card */}
          <div className="bg-[#f6f9fe] flex w-full lg:flex-[1_0_0] flex-col items-center justify-center overflow-hidden px-[10px] py-[20px] rounded-[16px]">
            <div className="flex flex-wrap gap-[20px] items-center pl-[20px] w-full">

              {/* World map */}
              <div className="flex flex-[1_0_0] flex-col items-center justify-center min-w-[280px]">
                <img
                  alt="Mapa mundial Acquafy"
                  className="w-full max-w-[500px] max-h-[280px] object-contain mix-blend-multiply"
                  src={imgMapaMundi}
                />
              </div>

              {/* Regions list */}
              <div className="flex flex-[1_0_0] flex-col gap-[40px] items-start max-w-[360px] min-w-[280px]">
                <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">
                  Regiões em expansão
                </h3>
                <div className="flex flex-col gap-[20px] items-start w-full">
                  {regions.map((r) => (
                    <div key={r.name} className="flex gap-[10px] items-start w-full">
                      <div className="bg-[#8bbaf2] rounded-full shrink-0 size-[14px] mt-[1px]" />
                      <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] w-full">
                          {r.name}
                        </p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333] w-full">
                          {r.countries}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Opportunities card */}
          <div className="bg-[#f1f5fe] flex w-full lg:flex-[1_0_0] flex-col gap-[20px] items-center self-start lg:self-auto lg:max-w-[370px] min-w-[280px] overflow-hidden p-[20px] rounded-[16px]">
            {/* Icon */}
            <div className="bg-[#f6f9fe] border border-[#e2e7fb] flex flex-col items-center justify-center rounded-full shrink-0 size-[100px]">
              <FigmaIcon src={imgPlanetWeb} size={40} />
            </div>

            <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center min-h-[50px]">
              Novos mercados, novas oportunidades
            </h3>

            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center">
              Buscamos parceiros visionários para levar a Plataforma Acquafy a ainda mais cidades e comunidades, oferecendo impacto real e retorno sustentável.
            </p>

            <Link href="/parceria" className="w-full">
              <BtnAzulOutArrow className="w-full min-h-[40px]">
                Explore oportunidades
              </BtnAzulOutArrow>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
