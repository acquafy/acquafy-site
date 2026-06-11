import FigmaIcon from "./FigmaIcon";

const imgArrowBlue   = "/figma-assets/75971e6c-641c-404b-9d87-240b3150d417.svg";
const imgAguaPura    = "/figma-assets/d2eb2d02-8be8-4653-ae2c-174d7b564294.svg";
const imgMobile      = "/figma-assets/917d2d21-0553-4643-b0fc-73f9af2a9756.svg";
const imgMedia       = "/figma-assets/b509f7df-2405-4256-b220-011fd8dd5592.svg";
const imgParceria    = "/figma-assets/14a82867-83cc-431e-98b4-3603d8945aab.svg";
const imgMoney       = "/figma-assets/00faff7b-84c5-43b7-aa62-455049b87f58.svg";
const imgManutencao  = "/figma-assets/ef3ff887-7eee-4719-b173-bde7b98d9984.svg";

const categorias = [
  {
    id: "produtos",
    icon: imgAguaPura,
    aspectW: 642.7, aspectH: 630.7,
    title: "Produtos",
    cor: "#0233c3",
    artigos: [
      { titulo: "Qual a diferença entre Linha Neo Essentials e Premium?", tags: ["Linha Neo", "Comparativo"] },
      { titulo: "Quais tipos de água o purificador Neo fornece?", tags: ["Água", "Filtração"] },
      { titulo: "Como verificar a garantia do meu produto?", tags: ["Garantia", "Registro"] },
      { titulo: "O que é a tecnologia UV LED + UF no Neo?", tags: ["Tecnologia", "Filtração"] },
      { titulo: "Especificações técnicas do painel LED 10.1\" e 15.6\"", tags: ["Especificações", "Hardware"] },
      { titulo: "Qual modelo escolher: Neo FIT, SMART H₂ ou ULTRA?", tags: ["Comparativo", "Guia"] },
    ],
  },
  {
    id: "app-ai-iot",
    icon: imgMobile,
    aspectW: 21, aspectH: 30,
    title: "App + AI + IoT",
    cor: "#0569ff",
    artigos: [
      { titulo: "Como configurar o Wi-Fi no purificador Neo?", tags: ["Wi-Fi", "Configuração"] },
      { titulo: "Como usar o aplicativo Acquafy no celular?", tags: ["App", "Tutorial"] },
      { titulo: "O que é o suporte por IA 24/7?", tags: ["IA", "Suporte"] },
      { titulo: "Como monitorar a qualidade da água pelo app?", tags: ["IoT", "Monitoramento"] },
      { titulo: "Compatibilidade com iOS e Android", tags: ["App", "Compatibilidade"] },
      { titulo: "Configuração do Bluetooth 5.3 para controle local", tags: ["Bluetooth", "Configuração"] },
    ],
  },
  {
    id: "media-network",
    icon: imgMedia,
    aspectW: 30, aspectH: 30,
    title: "Media Network",
    cor: "#9f3df5",
    artigos: [
      { titulo: "Como funciona o sistema de anúncios na tela?", tags: ["Anúncios", "Receita"] },
      { titulo: "Como cadastrar uma campanha no Acquafy Media?", tags: ["Campanha", "Tutorial"] },
      { titulo: "O que é o QR Code de campanha e como usar?", tags: ["QR Code", "Marketing"] },
      { titulo: "Como calcular a receita recorrente com Media?", tags: ["Receita", "Negócio"] },
      { titulo: "Formatos e dimensões aceitos para anúncios", tags: ["Design", "Especificações"] },
      { titulo: "Relatórios de performance de campanha", tags: ["Analytics", "Relatório"] },
    ],
  },
  {
    id: "parceiros",
    icon: imgParceria,
    aspectW: 1125, aspectH: 1078,
    title: "Parceiros",
    cor: "#1f2e91",
    artigos: [
      { titulo: "Como se tornar um parceiro Silver da Acquafy?", tags: ["Silver", "Cadastro"] },
      { titulo: "Quais são os benefícios do plano Gold Partner?", tags: ["Gold", "Benefícios"] },
      { titulo: "Modelo Platinum: distribuidor regional Acquafy", tags: ["Platinum", "Distribuição"] },
      { titulo: "Comissões por nível de parceria (20% a 70%)", tags: ["Comissão", "Financeiro"] },
      { titulo: "Materiais de apoio para vendas e treinamentos", tags: ["Marketing", "Treinamento"] },
      { titulo: "Como operar a rede Silver sendo um Gold Partner?", tags: ["Gold", "Rede"] },
    ],
  },
  {
    id: "faturamento",
    icon: imgMoney,
    aspectW: 33.3, aspectH: 30,
    title: "Faturamento",
    cor: "#36ae5c",
    artigos: [
      { titulo: "Como emitir a segunda via de fatura?", tags: ["Fatura", "Financeiro"] },
      { titulo: "Prazo para recebimento de comissões", tags: ["Comissão", "Pagamento"] },
      { titulo: "Formas de pagamento aceitas pela Acquafy", tags: ["Pagamento", "Métodos"] },
      { titulo: "Como acompanhar o status do meu pedido?", tags: ["Pedido", "Rastreamento"] },
      { titulo: "Política de reembolso e cancelamento", tags: ["Reembolso", "Política"] },
      { titulo: "Nota fiscal e documentação fiscal internacional", tags: ["Fiscal", "Internacional"] },
    ],
  },
  {
    id: "manutencao",
    icon: imgManutencao,
    aspectW: 30, aspectH: 30,
    title: "Instalação e Manutenção",
    cor: "#dfa727",
    artigos: [
      { titulo: "Passo a passo: instalação do purificador Neo", tags: ["Instalação", "Tutorial"] },
      { titulo: "Com que frequência trocar o filtro? (365 dias)", tags: ["Filtro", "Manutenção"] },
      { titulo: "Como realizar a limpeza preventiva?", tags: ["Limpeza", "Preventiva"] },
      { titulo: "Solução de problemas: purificador sem energia", tags: ["Problema", "Elétrico"] },
      { titulo: "Troca do filtro: reposição inteligente via app", tags: ["Filtro", "App"] },
      { titulo: "Manutenção do reservatório e componentes internos", tags: ["Manutenção", "Hardware"] },
    ],
  },
];

export default function ArtigosBK() {
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Section header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] w-full">
            Artigos{" "}
            <span className="text-[#0569ff]">em destaque</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            Os conteúdos mais acessados organizados por categoria.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[32px] w-full">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              id={cat.id}
              className="flex flex-col gap-[20px] w-full scroll-mt-[80px]"
            >
              {/* Category header */}
              <div className="flex gap-[12px] items-center border-b border-[#e8edf5] pb-[16px]">
                <div className="bg-[#f6f9fe] flex flex-col items-center justify-center p-[10px] rounded-full shrink-0 size-[44px]">
                  <FigmaIcon src={cat.icon} size={22} aspectW={cat.aspectW} aspectH={cat.aspectH} />
                </div>
                <h3
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px]"
                  style={{ color: cat.cor }}
                >
                  {cat.title}
                </h3>
              </div>

              {/* Article list */}
              <ul className="flex flex-col gap-[4px] list-none m-0 p-0">
                {cat.artigos.map((artigo) => (
                  <li key={artigo.titulo}>
                    <a
                      href="#"
                      className="group flex gap-[10px] items-start px-[12px] py-[10px] rounded-[8px]
                        hover:bg-[#f6f9fe] transition-colors no-underline"
                    >
                      {/* Dot */}
                      <span
                        className="mt-[7px] shrink-0 size-[6px] rounded-full"
                        style={{ backgroundColor: cat.cor, opacity: 0.5 }}
                      />
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[20px] text-[#333] group-hover:text-[#0233c3] transition-colors flex-1">
                        {artigo.titulo}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Ver todos link */}
              <a
                href="#"
                className="flex gap-[5px] items-center mt-[4px] px-[12px] no-underline group"
              >
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
                  Ver todos os artigos
                </span>
                <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
