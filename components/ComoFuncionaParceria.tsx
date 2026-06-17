"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgIconUser     = "/figma-assets/como-icon-user.svg";
const imgIconMobile   = "/figma-assets/como-icon-mobile.svg";
const imgIconLocation = "/figma-assets/como-icon-location.svg";
const imgIconScale    = "/figma-assets/como-icon-scale.svg";
const imgArrow        = "/figma-assets/como-arrow.svg";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  steps: { num: string; title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Como funciona o ",
    heading2: "Programa de Parceria Global",
    steps: [
      { num: "01", title: "Escolha seu nível", desc: "Selecione o modelo de parceria que melhor se encaixa no seu perfil e na sua estratégia." },
      { num: "02", title: "Receba estrutura digital", desc: "Acesso ao App, materiais, treinamentos, links, QR Codes e suporte multilíngue." },
      { num: "03", title: "Ative vendas mídia ou distribuição", desc: "Indique, opere o Acquafy Media ou distribua a linha Neo na sua região." },
      { num: "04", title: "Escale com a Plataforma Acquafy", desc: "Acompanhe resultados, expanda sua rede e cresça com o ecossistema global." },
    ],
  },
  en: {
    heading1: "How the ",
    heading2: "Global Partnership Program works",
    steps: [
      { num: "01", title: "Choose your level", desc: "Select the partnership model that best fits your profile and strategy." },
      { num: "02", title: "Receive digital structure", desc: "Access to the App, materials, training, links, QR Codes and multilingual support." },
      { num: "03", title: "Activate media sales or distribution", desc: "Refer, operate Acquafy Media or distribute the Neo line in your region." },
      { num: "04", title: "Scale with the Acquafy Platform", desc: "Track results, expand your network and grow with the global ecosystem." },
    ],
  },
  es: {
    heading1: "Cómo funciona el ",
    heading2: "Programa de Asociación Global",
    steps: [
      { num: "01", title: "Elige tu nivel", desc: "Selecciona el modelo de asociación que mejor se adapta a tu perfil y estrategia." },
      { num: "02", title: "Recibe estructura digital", desc: "Acceso a la App, materiales, entrenamientos, enlaces, QR Codes y soporte multilingüe." },
      { num: "03", title: "Activa ventas de medios o distribución", desc: "Indica, opera el Acquafy Media o distribuye la línea Neo en tu región." },
      { num: "04", title: "Escala con la Plataforma Acquafy", desc: "Monitorea resultados, expande tu red y crece con el ecosistema global." },
    ],
  },
};

const stepIcons = [imgIconUser, imgIconMobile, imgIconLocation, imgIconScale];

export default function ComoFuncionaParceria() {
  const { lang } = useLang();
  const t = T[lang];

  const steps = t.steps.map((s, i) => ({ ...s, icon: stepIcons[i] }));

  return (
    <section className="bg-white flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[28px] text-center min-w-[240px] w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[280px] p-[20px] relative rounded-[16px]"
            >
              {/* ícone + número do passo */}
              <div className="flex gap-[20px] items-center justify-center relative shrink-0 w-full">
                <div className="border border-[#cbd0d4] flex flex-col items-center justify-center p-[24px] rounded-full shrink-0 size-[100px]">
                  <img src={s.icon} alt="" className="size-[30px] object-contain shrink-0" />
                </div>
                <p className="-translate-y-1/2 absolute font-['Avenir_LT_Pro:85_Heavy'] leading-[50px] not-italic right-[48px] text-[40px] text-[#0569ff] top-[25px] translate-x-full whitespace-nowrap">
                  {s.num}
                </p>
              </div>

              {/* título */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[18px] leading-[22px] text-[#1f2e91] text-center shrink-0 w-full">
                {s.title}
              </p>

              {/* descrição */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] not-italic text-[16px] leading-[20px] text-[#333] text-center shrink-0 w-full">
                {s.desc}
              </p>

              {/* seta conectora (exceto último card) */}
              {i < steps.length - 1 && (
                <div className="-translate-y-1/2 absolute h-0 right-[-12px] top-[calc(50%+0.5px)] w-[12px] pointer-events-none">
                  <div className="absolute" style={{ inset: "-7.36px -8.33% -7.36px 0" }}>
                    <img src={imgArrow} alt="" className="block max-w-none size-full" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
