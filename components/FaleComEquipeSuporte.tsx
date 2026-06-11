import FigmaIcon from "./FigmaIcon";

const imgChatIcon      = "/figma-assets/670c53d1-1537-48df-8655-d6a9ef072f14.svg";
const imgMailIcon      = "/figma-assets/84fcccc4-1a8c-4979-80f4-8d89504a03f7.svg";
const imgWhatsappIcon  = "/figma-assets/5238f1c2-3e2f-428b-a2ed-154c0b8d36e4.svg";
const imgTimeIcon      = "/figma-assets/fcd02a83-8abf-4576-a597-b2cb201790ff.svg";

export default function FaleComEquipeSuporte() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            Fale com nossa equipe
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            Escolha o canal de atendimento ideal para você.
          </p>
        </div>

        {/* Contact cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">

          {/* Chat online */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] p-[20px] rounded-[16px]">
            <div className="flex gap-[20px] items-center w-full">
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                <FigmaIcon src={imgChatIcon} size={30} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <div className="flex gap-[10px] items-center w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-1">
                    Chat online
                  </p>
                  <div className="bg-[#e1f3e7] flex flex-col items-center justify-center px-[10px] py-[6px] rounded-full shrink-0">
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#36ae5c] whitespace-nowrap">
                      Disponível
                    </span>
                  </div>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  Fale agora com um especialista em tempo real.
                </p>
              </div>
            </div>
            <button className="mt-auto bg-white border border-[#0233c3] hover:bg-[#0233c3] hover:text-white transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px]">
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] hover:text-white text-center">
                Iniciar chat
              </span>
            </button>
          </div>

          {/* E-mail */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] p-[20px] rounded-[16px]">
            <div className="flex gap-[20px] items-center w-full">
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                <FigmaIcon src={imgMailIcon} size={30} aspectW={30} aspectH={24} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  E-mail
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  Envie sua dúvida ou solicitação que responderemos em breve.
                </p>
              </div>
            </div>
            <a
              href="mailto:suporte@acquafy.com"
              className="mt-auto bg-white border border-[#0233c3] hover:bg-[#0233c3] group transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px]"
            >
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white transition-colors text-center">
                suporte@acquafy.com
              </span>
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] p-[20px] rounded-[16px]">
            <div className="flex gap-[20px] items-center w-full">
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                <FigmaIcon src={imgWhatsappIcon} size={30} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  WhatsApp
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  Atendimento rápido pelo WhatsApp.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/14072035669"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto bg-white border border-[#0233c3] hover:bg-[#0233c3] group transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px]"
            >
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white transition-colors text-center">
                +1 (407) 203-5669
              </span>
            </a>
          </div>

          {/* Horário de atendimento */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] p-[20px] rounded-[16px]">
            <div className="flex gap-[20px] items-center w-full">
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                <FigmaIcon src={imgTimeIcon} size={30} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  Horário de atendimento
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  Segunda a Sexta
                </p>
              </div>
            </div>
            <p className="mt-auto font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">
              8h às 18h (EST)
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
