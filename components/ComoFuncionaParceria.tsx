const imgIconUser     = "/figma-assets/como-icon-user.png";
const imgIconMobile   = "/figma-assets/como-icon-mobile.png";
const imgIconLocation = "/figma-assets/como-icon-location.png";
const imgIconScale    = "/figma-assets/como-icon-scale.png";
const imgArrow        = "/figma-assets/como-arrow.png";

const steps = [
  {
    num:  "01",
    icon: imgIconUser,
    title: "Escolha seu nível",
    desc:  "Selecione o modelo de parceria que melhor se encaixa no seu perfil e na sua estratégia.",
  },
  {
    num:  "02",
    icon: imgIconMobile,
    title: "Receba estrutura digital",
    desc:  "Acesso ao App, materiais, treinamentos, links, QR Codes e suporte multilíngue.",
  },
  {
    num:  "03",
    icon: imgIconLocation,
    title: "Ative vendas mídia ou distribuição",
    desc:  "Indique, opere o Acquafy Media ou distribua a linha Neo na sua região.",
  },
  {
    num:  "04",
    icon: imgIconScale,
    title: "Escale com a Plataforma Acquafy",
    desc:  "Acompanhe resultados, expanda sua rede e cresça com o ecossistema global.",
  },
];

export default function ComoFuncionaParceria() {
  return (
    <section className="bg-white flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[26px] leading-[28px] text-center min-w-[240px] w-full">
          <span className="text-[#1f2e91]">{"Como funciona o "}</span>
          <span className="text-[#0569ff]">Programa de Parceria Global</span>
        </h2>

        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-px p-[20px] relative rounded-[16px]"
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
              <p className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[22px] text-[#1f2e91] text-center shrink-0 w-full">
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
