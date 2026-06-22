"use client";
import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { BtnFalaAcquafy } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";
import { PartnerModal, FORM_T } from "./ModelosParceria";

const imgPessoas = "/figma-assets/icon-pessoas-b.svg";

const imgBg = "/figma-assets/bg-o.webp";

const T: Record<Lang, { title: string; btnGold: string }> = {
  pt:      { title: "Leve a Acquafy para sua família, sua empresa ou seu país.",                    btnGold: "Quero ser parceiro Gold" },
  "pt-pt": { title: "Leve a Acquafy para a sua família, a sua empresa ou o seu país.",             btnGold: "Quero ser parceiro Gold" },
  en:      { title: "Bring Acquafy to your family, your company or your country.",                 btnGold: "I want to be a Gold Partner" },
  es:      { title: "Lleva Acquafy a tu familia, tu empresa o tu país.",                           btnGold: "Quiero ser socio Gold" },
  fr:      { title: "Amenez Acquafy dans votre famille, votre entreprise ou votre pays.",          btnGold: "Je veux être partenaire Gold" },
  de:      { title: "Bringen Sie Acquafy in Ihre Familie, Ihr Unternehmen oder Ihr Land.",        btnGold: "Ich möchte Gold-Partner sein" },
  it:      { title: "Porta Acquafy nella tua famiglia, nella tua azienda o nel tuo paese.",       btnGold: "Voglio essere partner Gold" },
  zh:      { title: "将 Acquafy 带给您的家庭、企业或您的国家。",                                       btnGold: "成为 Gold 合作伙伴" },
  ja:      { title: "Acquafy を、ご家族、企業、そして国へ。",                                          btnGold: "Gold パートナーになる" },
  ko:      { title: "Acquafy를 당신의 가족, 기업, 그리고 나라에 데려오세요.",                           btnGold: "Gold 파트너 되기" },
};

export default function CtaBanner() {
  const { lang } = useLang();
  const t = T[lang];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col lg:flex-row gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] lg:px-[80px] py-[40px] relative rounded-[16px] w-full">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        <div className="relative flex flex-1 flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            {t.title}
          </h2>
        </div>

        <div className="relative flex flex-1 flex-wrap gap-[10px] items-center justify-center xl:justify-end max-w-[500px] min-w-[240px]">
          <BtnFalaAcquafy className="flex-1 min-w-[200px]" />
          <button
            onClick={() => setModalOpen(true)}
            className="flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden p-[20px] rounded-[8px] border border-white transition-colors cursor-pointer bg-[#9f3df5] hover:bg-[#7a16d2] active:bg-[#b25efb] flex-1 min-w-[200px]"
          >
            <div className="flex flex-col items-center justify-center shrink-0 size-[16px]">
              <FigmaIcon src={imgPessoas} size={16} aspectW={43.86} aspectH={40.5} />
            </div>
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-center whitespace-nowrap shrink-0 text-white">
              {t.btnGold}
            </span>
          </button>
        </div>
      </div>
      {modalOpen && (
        <PartnerModal tier="gold" ft={FORM_T[lang]} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
}
