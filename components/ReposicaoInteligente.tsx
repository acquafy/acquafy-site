import FigmaIcon from "./FigmaIcon";

const imgPhone       = "/figma-assets/0cf8ade1-fe92-4c27-b5a7-f16fbd11e75b.png";
const imgNotification = "/figma-assets/fd59420c-8ddb-48d1-a45a-08b6ceb37f89.svg";
const imgPlanos      = "/figma-assets/f3d37036-43bf-4201-b351-caebcb8f7ec2.svg";
const imgMoney       = "/figma-assets/d0bb269f-c097-4025-82c3-c64b5c0cefa3.svg";
const imgCalendar    = "/figma-assets/36a3bc78-15e3-483d-bef8-210955d1cfdf.svg";
const imgFone        = "/figma-assets/c3c0a11f-1b7f-47cc-9f22-41c97f4eeda7.svg";
const imgCertificado = "/figma-assets/04fd2c80-34fc-43d6-ab4c-7e617d39efc7.svg";

const features = [
  { icon: imgNotification, aspectW: 23, aspectH: 30, title: "Lembretes automáticos",  desc: "Alertas de troca via App + AI" },
  { icon: imgPlanos,       aspectW: 613, aspectH: 643, title: "Planos de Assinatura", desc: "Mensais, trimestrais e anuais" },
  { icon: imgMoney,        aspectW: 30,  aspectH: 30, title: "Renda recorrente",      desc: "Mais possibilidades de lucro" },
  { icon: imgCalendar,     aspectW: 36,  aspectH: 40, title: "Agendamento de serviço", desc: "Instalação e manutenção" },
  { icon: imgFone,         aspectW: 30,  aspectH: 30, title: "Suporte ao parceiro",   desc: "Materiais, treinamentos e apoio" },
  { icon: imgCertificado,  aspectW: 19,  aspectH: 30, title: "Para Silver, Gold e Platinum", desc: "Benefícios exclusivos" },
];

const stats = [
  { value: "+ 1,2M",  label: "Pedidos recorrentes/mês" },
  { value: "+ 85 mil", label: "Assinaturas ativas" },
  { value: "180 +",   label: "Países atendidos" },
  { value: "24/7",    label: "Suporte global" },
  { value: "89,6%",   label: "Satisfação dos parceiros" },
  { value: "≤ 2h",    label: "Tempo de resposta" },
];

export default function ReposicaoInteligente() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] px-[20px] py-[40px] rounded-[16px] w-full">

        {/* Phone mockup */}
        <div className="flex flex-col items-center justify-center max-w-[180px] min-w-[180px] shrink-0">
          <div className="relative shrink-0" style={{ width: 156, height: 320 }}>
            <div className="absolute inset-0" style={{ aspectRatio: "1947/4096" }}>
              <img alt="Acquafy App" className="absolute inset-0 w-full h-full object-cover" src={imgPhone} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[40px] items-start flex-1 min-w-[240px]">
          <div className="flex flex-col gap-[20px] items-center w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] w-full text-center lg:text-left">
              <span className="text-[#1f2e91]">Programação de</span>
              {" "}
              <span className="text-[#0569ff]">Reposição Inteligente</span>
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full text-center lg:text-left">
              Mais praticidade para o cliente e mais receita recorrente para o parceiro.
            </p>
          </div>

          {/* Feature icons */}
          <div className="flex flex-col gap-[20px] items-start w-full">
            <div className="flex flex-wrap gap-[20px] items-center justify-center w-full">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-[10px] items-start flex-1 min-w-[160px]">
                  <FigmaIcon src={f.icon} size={30} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <div className="flex flex-col gap-[10px] items-start w-full">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{f.title}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats cards */}
            <div className="flex flex-wrap gap-[20px_30px] items-center justify-center w-full">
              {stats.map((s) => (
                <div key={s.value} className="bg-white flex flex-col gap-[10px] items-start flex-1 min-w-[160px] px-[20px] py-[40px] rounded-[12px] text-center">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#0569ff] w-full">{s.value}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] w-full">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
