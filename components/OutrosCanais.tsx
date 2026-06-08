import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgChat      = "/figma-assets/42ea5353-8843-46d2-9697-63999c787ed4.svg"; // 42×42      sq
const imgWhatsApp  = "/figma-assets/5dabfa98-850b-481b-9adc-7a50efe0ae5f.svg"; // 41.98×42   sq
const imgPhone     = "/figma-assets/b42e3aca-077d-485d-8519-8dd743644232.svg"; // 42×42      sq
const imgCalendar  = "/figma-assets/796ff117-103a-49c0-ada5-b04a49b8cffb.svg"; // 38×42      portrait
const imgMail      = "/figma-assets/2a1a1b30-6448-4c52-a1e7-7673b9f5da29.svg"; // 42×34      landscape
const imgArrowBlue = "/figma-assets/cb40773a-2459-425f-9c0e-bae3e3e893ad.svg"; // 11.2×8.84  landscape

interface Canal {
  icon: string;
  aspectW: number;
  aspectH: number;
  title: string;
  description: string;
  cta: string;
}

const CANAIS: Canal[] = [
  { icon: imgChat,     aspectW: 42,    aspectH: 42,    title: "Chat online",     description: "Fale com nossa equipe em tempo real.",          cta: "Iniciar chat"    },
  { icon: imgWhatsApp, aspectW: 41.98, aspectH: 42,    title: "WhatsApp",        description: "Atendimento rápido pelo WhatsApp.",             cta: "Abrir WhatsApp"  },
  { icon: imgPhone,    aspectW: 42,    aspectH: 42,    title: "Ligue para nós",  description: "Entre em contato diretamente.",                 cta: "Ligar agora"     },
  { icon: imgCalendar, aspectW: 38,    aspectH: 42,    title: "Agendar reunião", description: "Agende uma conversa com um especialista.",      cta: "Agendar"         },
  { icon: imgMail,     aspectW: 42,    aspectH: 34,    title: "Newsletter",      description: "Receba novidades e atualizações Acquafy.",      cta: "Inscrever-se"    },
];

function CanalCard({ icon, aspectW, aspectH, title, description, cta }: Canal) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[160px] border border-[#cbd0d4] rounded-[16px] px-[24px] py-[28px] hover:border-[#0233c3] hover:shadow-sm transition-all">
      <FigmaIcon src={icon} size={42} aspectW={aspectW} aspectH={aspectH} />
      <div className="flex flex-col gap-[8px] w-full">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#0233c3]">
          {title}
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">
          {description}
        </p>
      </div>
      <button className="flex gap-[6px] items-center font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] hover:text-[#0569ff] transition-colors cursor-pointer">
        {cta}
        <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
      </button>
    </div>
  );
}

export default function OutrosCanais() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        {/* Header */}
        <div className="flex flex-col gap-[8px] items-center text-center">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[36px] leading-[44px] text-[#0233c3]">
            Outros canais
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b]">
            Escolha o canal que preferir para falar conosco
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch w-full">
          {CANAIS.map((canal) => (
            <CanalCard key={canal.title} {...canal} />
          ))}
        </div>
      </div>
    </section>
  );
}
