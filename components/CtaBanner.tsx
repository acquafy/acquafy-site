"use client";
import FigmaIcon from "./FigmaIcon";
import { BtnFalaAcquafy } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrowWhite = "/figma-assets/icon-arrow-white-hover.svg";
const imgBg = "/figma-assets/bg-o.webp";

const T: Record<Lang, { title: string; btnBuy: string }> = {
  pt:      { title: "Leve a Acquafy para sua família, sua empresa ou seu país.",                    btnBuy: "Comprar agora" },
  "pt-pt": { title: "Leve a Acquafy para a sua família, a sua empresa ou o seu país.",             btnBuy: "Comprar agora" },
  en:      { title: "Bring Acquafy to your family, your company or your country.",                 btnBuy: "Buy now" },
  "en-gb": { title: "Bring Acquafy to your family, your company or your country.",                 btnBuy: "Buy now" },
  es:      { title: "Lleva Acquafy a tu familia, tu empresa o tu país.",                           btnBuy: "Comprar ahora" },
  fr:      { title: "Amenez Acquafy dans votre famille, votre entreprise ou votre pays.",          btnBuy: "Acheter maintenant" },
  de:      { title: "Bringen Sie Acquafy in Ihre Familie, Ihr Unternehmen oder Ihr Land.",        btnBuy: "Jetzt kaufen" },
  it:      { title: "Porta Acquafy nella tua famiglia, nella tua azienda o nel tuo paese.",       btnBuy: "Acquista ora" },
  zh:      { title: "将 Acquafy 带给您的家庭、企业或您的国家。",                                       btnBuy: "立即购买" },
  ja:      { title: "Acquafy を、ご家族、企業、そして国へ。",                                          btnBuy: "今すぐ購入" },
  ko:      { title: "Acquafy를 당신의 가족, 기업, 그리고 나라에 데려오세요.",                           btnBuy: "지금 구매" },
  sv:      { title: "Ta med Acquafy till din familj, ditt företag eller ditt land.",               btnBuy: "Köp nu" },
  fi:      { title: "Tuo Acquafy perheellesi, yrityksellesi tai maallesi.",                        btnBuy: "Osta nyt" },
  ru:      { title: "Принесите Acquafy своей семье, компании или стране.",                         btnBuy: "Купить сейчас" },
  ro:      { title: "Aduci Acquafy familiei tale, companiei tale sau tarii tale.",                 btnBuy: "Cumpara acum" },
  he:      { title: "הביאו את Acquafy למשפחה, לעסק או למדינה שלכם.",                              btnBuy: "קנה עכשיו" },
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
          <a
            href="/buy"
            className="flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden p-[20px] rounded-[8px] transition-colors cursor-pointer bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] flex-1 min-w-[200px] no-underline"
          >
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-center whitespace-nowrap shrink-0 text-white">
              {t.btnBuy}
            </span>
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11} aspectH={9} />
          </a>
        </div>
      </div>
    </section>
  );
}
