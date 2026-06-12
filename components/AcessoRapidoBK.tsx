import FigmaIcon from "./FigmaIcon";

const imgArrowAccent = "/figma-assets/11e4753e-07db-4612-9dc9-03f33a0075de.svg";

const imgIconProducts  = "/figma-assets/43762c75-7c8a-4044-8113-69dcb9f63b86.svg";
const imgIconDownload  = "/figma-assets/0298fb46-013e-4e99-b9a3-d7d90d8218e0.svg";
const imgIconEducation = "/figma-assets/d22b56b8-0578-4f64-b011-2228a3e888e8.svg";
const imgIconFaq       = "/figma-assets/383f262b-ce1a-4bcf-956f-07aeabf9e518.svg";
const imgIconDoc       = "/figma-assets/fd0455b2-5d5a-4c6c-8533-301f8a94c68c.svg";
const imgIconWifi      = "/figma-assets/e5466ddf-14ac-49c9-908d-c23208fa39f9.svg";

export type QuickItem = {
  icon: string;
  aspectW: number;
  aspectH: number;
  title: string;
  desc: string;
  href: string;
  noPage?: boolean;
  sectionId?: string;
};

export const quickItems: QuickItem[] = [
  {
    icon: imgIconProducts,
    aspectW: 29, aspectH: 30,
    title: "Meus produtos",
    desc: "Conheça a linha completa de purificadores Neo.",
    href: "/linha-neo",
  },
  {
    icon: imgIconDownload,
    aspectW: 30, aspectH: 30,
    title: "Downloads",
    desc: "Manuais, guias rápidos, softwares e documentos.",
    href: "#downloads",
    sectionId: "downloads",
  },
  {
    icon: imgIconEducation,
    aspectW: 30, aspectH: 22,
    title: "Tutoriais e vídeos",
    desc: "Aprenda passo a passo com nossos tutoriais.",
    href: "#tutoriais-videos",
    sectionId: "tutoriais-videos",
  },
  {
    icon: imgIconFaq,
    aspectW: 30, aspectH: 30,
    title: "Perguntas frequentes",
    desc: "Encontre respostas para as dúvidas mais comuns.",
    href: "#faq",
    sectionId: "faq",
  },
  {
    icon: imgIconDoc,
    aspectW: 24, aspectH: 30,
    title: "Políticas e garantias",
    desc: "Consulte nossas políticas, termos e garantias.",
    href: "#politicas-garantias",
    sectionId: "politicas-garantias",
  },
];

export default function AcessoRapidoBK() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            Acesso{" "}
            <span className="text-[#0569ff]">rápido</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            Acesse diretamente as áreas mais utilizadas do suporte.
          </p>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {quickItems.map((item) => {
            const inner = (
              <>
                {/* Red dot indicator for items without a page */}
                {item.noPage && (
                  <span className="absolute top-[14px] right-[14px] size-[8px] rounded-full bg-[#ef4444]" />
                )}

                {/* Icon */}
                <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                  <FigmaIcon src={item.icon} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-[10px] items-start text-center w-full flex-1">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                    {item.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow — only for items with a page */}
                {!item.noPage && (
                  <div className="shrink-0 group-hover:translate-x-1 transition-transform">
                    <FigmaIcon src={imgArrowAccent} size={12} aspectW={11.2} aspectH={8.84} />
                  </div>
                )}
              </>
            );

            return item.noPage ? (
              <div
                key={item.title}
                className="relative bg-white opacity-70 cursor-default
                  flex flex-[1_0_0] flex-col gap-[20px] items-center
                  min-w-[180px] p-[20px] rounded-[16px]"
              >
                {inner}
              </div>
            ) : (
              <a
                key={item.title}
                href={item.href}
                className="relative bg-white hover:bg-[#eaf0fd] hover:shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]
                  transition-all duration-200
                  flex flex-[1_0_0] flex-col gap-[20px] items-center
                  min-w-[180px] p-[20px] rounded-[16px] cursor-pointer no-underline group"
              >
                {inner}
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
