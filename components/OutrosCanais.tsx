import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgChat      = "/figma-assets/42ea5353-8843-46d2-9697-63999c787ed4.svg"; // 42×42      sq
const imgWhatsApp  = "/figma-assets/5dabfa98-850b-481b-9adc-7a50efe0ae5f.svg"; // 41.98×42   ~sq
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
  { icon: imgChat,     aspectW: 42,    aspectH: 42,   title: "Chat online",     description: "Fale com nossa equipe em tempo real.",       cta: "Iniciar chat"   },
  { icon: imgWhatsApp, aspectW: 41.98, aspectH: 42,   title: "WhatsApp",        description: "Atendimento rápido pelo WhatsApp.",          cta: "Abrir WhatsApp" },
  { icon: imgPhone,    aspectW: 42,    aspectH: 42,   title: "Ligue para nós",  description: "Entre em contato diretamente.",              cta: "Ligar agora"    },
  { icon: imgCalendar, aspectW: 38,    aspectH: 42,   title: "Agendar reunião", description: "Agende uma conversa com um especialista.",   cta: "Agendar"        },
  { icon: imgMail,     aspectW: 42,    aspectH: 34,   title: "Newsletter",      description: "Receba novidades e atualizações Acquafy.",   cta: "Inscreve-se"    },
];

function CanalCard({ icon, aspectW, aspectH, title, description, cta }: Canal) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[200px] p-[20px] rounded-[16px]">
      {/* Ícone centrado */}
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />

      {/* Textos + CTA centrados */}
      <div className="flex flex-col gap-[20px] items-start w-full">
        <div className="flex items-center justify-center w-full min-h-[30px]">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center flex-1">
            {title}
          </p>
        </div>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center min-h-[30px] w-full">
          {description}
        </p>
        <div className="flex gap-[5px] items-center justify-center w-full">
          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] text-center whitespace-nowrap">
            {cta}
          </span>
          <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
        </div>
      </div>
    </div>
  );
}

export default function OutrosCanais() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Cabeçalho */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            Outros canais
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            Escola o canal que preferir para falar conosco
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {CANAIS.map((canal) => (
            <CanalCard key={canal.title} {...canal} />
          ))}
        </div>

      </div>
    </section>
  );
}
