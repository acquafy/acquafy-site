"use client";
import { BtnFalaAcquafy, BtnDistribuidor } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg = "/figma-assets/bg-o.webp";

const T: Record<Lang, { title: string }> = {
  pt: { title: "Leve a Acquafy para sua família, sua empresa ou seu país." },
  "pt-pt": { title: "Leve a Acquafy para a sua família, a sua empresa ou o seu país." },
  en: { title: "Bring Acquafy to your family, your company or your country." },
  es: { title: "Lleva Acquafy a tu familia, tu empresa o tu país." },
  fr: { title: "Amenez Acquafy dans votre famille, votre entreprise ou votre pays." },
  de: { title: "Bringen Sie Acquafy in Ihre Familie, Ihr Unternehmen oder Ihr Land." },
  it: { title: "Porta Acquafy nella tua famiglia, nella tua azienda o nel tuo paese." },
  zh: { title: "将 Acquafy 带给您的家庭、企业或您的国家。" },
  ja: { title: "Acquafy を、ご家族、企業、そして国へ。" },
  ko: { title: "Acquafy를 당신의 가족, 기업, 그리고 나라에 데려오세요." },
};

export default function CtaBanner() {
  const { lang } = useLang();
  const t = T[lang];

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
          <BtnDistribuidor className="flex-1 min-w-[200px]" />
        </div>
      </div>
    </section>
  );
}
