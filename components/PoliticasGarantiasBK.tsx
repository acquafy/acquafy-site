type Politica = {
  titulo: string;
  desc: string;
  itens: string[];
};

const politicas: Politica[] = [
  {
    titulo: "Política de Garantia",
    desc: "Seus produtos Acquafy possuem garantia de fábrica e cobertura completa.",
    itens: [
      "12 meses de garantia de fábrica",
      "Cobertura para defeitos de fabricação",
      "Suporte técnico especializado",
    ],
  },
  {
    titulo: "Política de Privacidade",
    desc: "Saiba como coletamos, usamos e protegemos seus dados pessoais.",
    itens: [
      "Dados coletados e finalidade",
      "Compartilhamento e segurança",
      "Seus direitos como titular de dados",
    ],
  },
  {
    titulo: "Termos de Uso",
    desc: "Regras e condições para uso da plataforma e dos produtos Acquafy.",
    itens: [
      "Condições de uso da plataforma",
      "Responsabilidades do usuário",
      "Propriedade intelectual",
    ],
  },
  {
    titulo: "Política de Devolução",
    desc: "Como solicitar troca, devolução ou reembolso de produtos.",
    itens: [
      "Prazo de 7 dias para devolução",
      "Condições para reembolso integral",
      "Como abrir um chamado de devolução",
    ],
  },
  {
    titulo: "Certificações e Normas",
    desc: "Conformidade regulatória e certificações técnicas dos produtos.",
    itens: [
      "Certificação ANATEL",
      "INMETRO e normas técnicas brasileiras",
      "Padrões internacionais de qualidade",
    ],
  },
];

export default function PoliticasGarantiasBK() {
  return (
    <section
      id="politicas-garantias"
      className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]"
    >
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            Políticas e{" "}
            <span className="text-[#0569ff]">garantias</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            Transparência e clareza sobre seus direitos e as condições Acquafy.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[24px] w-full">
          {politicas.map((pol) => (
            <div
              key={pol.titulo}
              className="bg-[#f6f9fe] border border-[#e8edf5] rounded-[16px] p-[24px] flex flex-col gap-[16px]"
            >
              {/* Title */}
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[17px] leading-[22px] text-[#1f2e91]">
                {pol.titulo}
              </h3>

              {/* Desc */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[20px] text-[#555]">
                {pol.desc}
              </p>

              {/* Bullet items */}
              <ul className="flex flex-col gap-[8px] list-none m-0 p-0 flex-1">
                {pol.itens.map((item) => (
                  <li key={item} className="flex gap-[10px] items-start">
                    <span className="mt-[6px] shrink-0 size-[6px] rounded-full bg-[#0569ff]" />
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#444]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="flex items-center gap-[8px] pt-[8px] border-t border-[#e8edf5]">
                <span className="shrink-0 size-[6px] rounded-full bg-[#ef4444]" />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#bbb]">
                  Documento em elaboração
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
