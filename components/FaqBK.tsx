"use client";

import { useState } from "react";

const faqs = [
  {
    pergunta: "Qual é a diferença entre os modelos Neo Essentials e Neo Premium?",
    resposta: "A linha Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e variantes) possui painel LED 10.1\" e é focada em custo-benefício com tecnologia UV LED + UF. A linha Neo Premium (INFINITY, PRESTIGE e PRIME) conta com painel IPS 15.6\", filtração por Osmose Reversa (RO) e acabamento de alto padrão. Todos os modelos possuem conectividade Wi-Fi 5 e Bluetooth 5.3.",
  },
  {
    pergunta: "Como faço para baixar e configurar o aplicativo Acquafy?",
    resposta: "O aplicativo Acquafy está disponível na App Store (iOS) e Google Play (Android). Após instalar, crie sua conta, aproxime o smartphone do purificador via Bluetooth 5.3 para emparelhar e siga o assistente de configuração de Wi-Fi. O processo leva menos de 5 minutos.",
  },
  {
    pergunta: "Com que frequência devo trocar o filtro do purificador?",
    resposta: "Os filtros Neo têm vida útil de 365 dias ou conforme o consumo de água. O aplicativo Acquafy monitora em tempo real o ciclo do filtro e envia alertas quando a troca se aproxima. O sistema de Reposição Inteligente pode fazer o pedido automaticamente pelo app.",
  },
  {
    pergunta: "Como me tornar um parceiro Acquafy?",
    resposta: "Existem três níveis de parceria: Silver (afiliado/indicador, comissão de 20%, sem investimento inicial), Gold (operador Acquafy Media, comissão de 20% em vendas + receita de anúncios, entrada a partir de US$2.000) e Platinum (distribuidor regional, desconto de 70% no preço USA, modelo FOB). Acesse a página de Parceiros no site ou entre em contato com nossa equipe.",
  },
  {
    pergunta: "O que é a Acquafy Media e como gera receita recorrente?",
    resposta: "A Acquafy Media é um sistema de mídia integrado ao painel touchscreen dos purificadores Neo. Negócios locais podem anunciar no display e os parceiros Gold ganham receita mensal por cada anúncio exibido. Os usuários também interagem via QR Code nas campanhas, gerando dados de engajamento.",
  },
  {
    pergunta: "O purificador Neo funciona com água de poço ou apenas água de rede?",
    resposta: "Os modelos da linha Essentials são indicados para água de rede (com pressão de 20 a 80 PSI). A linha Premium com tecnologia RO (Osmose Reversa) pode tratar água com maior variação de qualidade. Para situações específicas como água de poço, recomendamos contato com um especialista técnico para avaliação.",
  },
  {
    pergunta: "Qual o prazo de garantia dos produtos Acquafy?",
    resposta: "Os purificadores Neo possuem garantia de 1 ano contra defeitos de fabricação. O registro de garantia deve ser feito pelo aplicativo Acquafy ou pelo portal de suporte. Defeitos causados por instalação incorreta, uso inadequado ou manutenção negligenciada não são cobertos pela garantia.",
  },
  {
    pergunta: "Em quantos países a Acquafy opera?",
    resposta: "A Acquafy está presente em mais de 180 países, com operação 100% global e suporte disponível em 16 idiomas. O modelo de negócio permite que parceiros distribuidores regionais operem localmente com suporte da plataforma central.",
  },
];

export default function FaqBK() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            Perguntas{" "}
            <span className="text-[#0569ff]">frequentes</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            Respostas rápidas para as dúvidas mais comuns sobre os produtos e serviços Acquafy.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-[12px] w-full">
          {faqs.map((faq, i) => {
            const isOpen = aberto === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-[12px] overflow-hidden transition-shadow duration-200
                  ${isOpen ? "shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]" : "shadow-none"}`}
              >
                <button
                  onClick={() => setAberto(isOpen ? null : i)}
                  className="flex gap-[16px] items-center justify-between w-full px-[24px] py-[20px] cursor-pointer text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-1 pr-[8px]">
                    {faq.pergunta}
                  </span>
                  {/* Chevron */}
                  <span
                    className={`shrink-0 flex items-center justify-center size-[28px] rounded-full border-2 transition-all duration-200
                      ${isOpen
                        ? "border-[#0233c3] bg-[#0233c3] text-white rotate-180"
                        : "border-[#cbd0d4] bg-transparent text-[#333] rotate-0"
                      }`}
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[22px] text-[#333] px-[24px] pb-[20px]">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
