"use client";

import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import TopicPopup from "./TopicPopup";

const imgArrowBlue = "/figma-assets/75971e6c-641c-404b-9d87-240b3150d417.svg";

const imgAguaPura   = "/figma-assets/d2eb2d02-8be8-4653-ae2c-174d7b564294.svg";
const imgMobile     = "/figma-assets/917d2d21-0553-4643-b0fc-73f9af2a9756.svg";
const imgMedia      = "/figma-assets/b509f7df-2405-4256-b220-011fd8dd5592.svg";
const imgParceria   = "/figma-assets/14a82867-83cc-431e-98b4-3603d8945aab.svg";
const imgMoney      = "/figma-assets/00faff7b-84c5-43b7-aa62-455049b87f58.svg";
const imgManutencao = "/figma-assets/ef3ff887-7eee-4719-b173-bde7b98d9984.svg";

const topics = [
  {
    icon: imgAguaPura,
    aspectW: 642.7, aspectH: 630.7,
    title: "Produtos",
    desc: "Informações sobre Linha Neo, Acquafy Media, filtros acessórios e especificações.",
    categorySlug: "produtos",
  },
  {
    icon: imgMobile,
    aspectW: 21, aspectH: 30,
    title: "App + AI + IoT",
    desc: "Suporte ao aplicativo, conectividade, sensores, IA e integração IoT.",
    categorySlug: "app-ai-iot",
  },
  {
    icon: imgMedia,
    aspectW: 30, aspectH: 30,
    title: "Media Network",
    desc: "Dúvidas sobre anúncios, QR Codes, campanhas e receita recorrente.",
    categorySlug: "media-network",
  },
  {
    icon: imgParceria,
    aspectW: 1125, aspectH: 1078,
    title: "Parceiros",
    desc: "Informações para parceiros, Gold Partner, contratos e materiais de apoio.",
    categorySlug: "parceiros",
  },
  {
    icon: imgMoney,
    aspectW: 33.3, aspectH: 30,
    title: "Faturamento",
    desc: "Dúvidas sobre pedidos, faturas, pagamentos e comissões.",
    categorySlug: "faturamento",
  },
  {
    icon: imgManutencao,
    aspectW: 30, aspectH: 30,
    title: "Instalação e Manutenção",
    desc: "Instalação, manutenção preventiva, limpeza e suporte técnico.",
    categorySlug: "instalacao-e-manutencao",
  },
];

export default function ComoPodemoAjudar() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <>
      <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
        <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

          {/* Header */}
          <div className="flex flex-col gap-[10px] items-start text-center w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
              Como{" "}
              <span className="text-[#0569ff]">podemos ajudar?</span>
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
              Escolha o assunto para encontrar as melhores soluções.
            </p>
          </div>

          {/* Topic cards */}
          <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
            {topics.map((topic) => (
              <button
                key={topic.title}
                onClick={() => setOpenSlug(topic.categorySlug)}
                className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[200px] p-[20px] rounded-[16px] cursor-pointer group"
              >
                <div className="bg-[#f6f9fe] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                  <FigmaIcon src={topic.icon} size={40} aspectW={topic.aspectW} aspectH={topic.aspectH} />
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center min-h-[32px] w-full">
                  {topic.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center min-h-[50px] w-full">
                  {topic.desc}
                </p>
                <div className="flex gap-[5px] items-center justify-center">
                  <span className="font-['Articulat_CF:Bold'] text-[14px] text-[#0233c3] text-center whitespace-nowrap">
                    Ver tópicos
                  </span>
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <TopicPopup slug={openSlug} onClose={() => setOpenSlug(null)} />
    </>
  );
}
