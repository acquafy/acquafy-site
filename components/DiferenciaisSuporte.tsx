"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg           = "/figma-assets/bg-a.webp";
const imgShield       = "/figma-assets/icon-shield-b.svg";
const imgFastSupport  = "/figma-assets/icon-fast-support.svg";
const imgRating       = "/figma-assets/icon-rating.svg";
const imgPlanet       = "/figma-assets/icon-planet-a.svg";

const T: Record<Lang, {
  diferenciais: { title: string; desc: string }[];
}> = {
  pt: {
    diferenciais: [
      { title: "Atendimento especializado", desc: "Equipe treinada e certificada para oferecer o melhor suporte." },
      { title: "Respostas rápidas",          desc: "Agilidade no atendimento e soluções eficientes." },
      { title: "Satisfação garantida",       desc: "Compromisso com a sua satisfação e sucesso." },
      { title: "Suporte global",             desc: "Atendimento para clientes e parceiros em 16 idiomas." },
    ],
  },
  en: {
    diferenciais: [
      { title: "Specialized support",    desc: "Trained and certified team to provide the best support." },
      { title: "Fast responses",         desc: "Agile service and efficient solutions." },
      { title: "Guaranteed satisfaction", desc: "Commitment to your satisfaction and success." },
      { title: "Global support",         desc: "Service for clients and partners in 16 languages." },
    ],
  },
  es: {
    diferenciais: [
      { title: "Atención especializada", desc: "Equipo capacitado y certificado para ofrecer el mejor soporte." },
      { title: "Respuestas rápidas",     desc: "Agilidad en la atención y soluciones eficientes." },
      { title: "Satisfacción garantizada", desc: "Compromiso con tu satisfacción y éxito." },
      { title: "Soporte global",         desc: "Atención para clientes y socios en 16 idiomas." },
    ],
  },
};

const icons = [imgShield, imgFastSupport, imgRating, imgPlanet];
const aspectWs = [26.14, 30, 480.3, 30];
const aspectHs = [30, 30, 453, 30];

export default function DiferenciaisSuporte() {
  const { lang } = useLang();
  const t = T[lang];

  const diferenciais = t.diferenciais.map((item, i) => ({
    icon: icons[i],
    aspectW: aspectWs[i],
    aspectH: aspectHs[i],
    title: item.title,
    desc: item.desc,
  }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="relative flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] rounded-[16px] w-full">
        {/* Background */}
        <div className="absolute inset-0 rounded-[16px] pointer-events-none" aria-hidden>
          <div className="absolute bg-[#1f2e91] inset-0 rounded-[16px]" />
          <img
            src={imgBg}
            alt=""
            className="absolute inset-0 w-full h-full max-w-none object-cover opacity-40 rounded-[16px]"
          />
        </div>

        {/* Diferencial cards */}
        {diferenciais.map((item) => (
          <div
            key={item.title}
            className="relative flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[280px]"
          >
            <div className="flex flex-col items-center justify-center shrink-0 size-[50px]">
              <FigmaIcon src={item.icon} size={40} aspectW={item.aspectW} aspectH={item.aspectH} />
            </div>
            <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px text-white">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] w-full">
                {item.title}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] w-full">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
