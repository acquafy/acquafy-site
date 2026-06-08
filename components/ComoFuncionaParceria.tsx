const steps = [
  {
    num:   "01",
    title: "Realize seu cadastro",
    desc:  "Acesse o site ou o App Acquafy, preencha seus dados e escolha o modelo de parceria ideal para você.",
  },
  {
    num:   "02",
    title: "Acesso à plataforma digital",
    desc:  "Receba acesso imediato ao painel de parceiro com materiais, produtos, dados e links exclusivos.",
  },
  {
    num:   "03",
    title: "Receba seus materiais de treinamento",
    desc:  "Onboarding completo com vídeos, guias e suporte multilíngue para você começar com segurança.",
  },
  {
    num:   "04",
    title: "Comece a vender — a Plataforma acompanha tudo",
    desc:  "Gestão total de vendas, comissões, metas e desempenho em tempo real direto no App.",
  },
];

export default function ComoFuncionaParceria() {
  return (
    <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {"Como funciona o "}
          <span className="text-[#0569ff]">Programa de Parceria Global</span>
        </h2>

        {/* Steps */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[220px] p-[20px] rounded-[16px]"
            >
              {/* Number circle */}
              <div
                className="flex items-center justify-center size-[56px] rounded-full shrink-0"
                style={{ backgroundImage: "linear-gradient(110deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
              >
                <span className="font-['Avenir_LT_Pro:95_Black'] text-[22px] leading-[28px] text-white">
                  {s.num}
                </span>
              </div>

              {/* Title */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">
                {s.title}
              </p>

              {/* Description */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#333] w-full">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
