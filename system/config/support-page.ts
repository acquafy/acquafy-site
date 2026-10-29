// config/support-page.ts
//
// Texts and mock records of the Support screen: channels, FAQ, help articles and the seeded tickets.
// Dates are ISO strings; the tickets are kept in localStorage while there is no backend.

import type { BadgeTone } from "@/components/ui/Badge";
import type { IsoDate } from "@/lib/format";

export const SUPPORT_EMAIL = "suporte@acquafy.com";
export const SUPPORT_WHATSAPP = "https://wa.me/14075550123";
export const SUPPORT_PHONE = { href: "tel:+14075550123", label: "+1 (407) 555-0123" };

export const SUPPORT_HOURS = {
  chat: "Seg a Sex, das 9h às 18h (horário de Orlando, ET)",
  email: "Respondemos em até 1 dia útil",
  whatsapp: "Seg a Sáb, das 8h às 20h (ET)",
  phone: "Seg a Sex, das 9h às 18h (ET)",
};

export const ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;

/* ---------------------------------------------------------------- categories */

export type FaqCategory = "payouts" | "purifiers" | "contract" | "account";

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "payouts", label: "Repasses" },
  { id: "purifiers", label: "Purificadores" },
  { id: "contract", label: "Contrato" },
  { id: "account", label: "Conta" },
];

export type TicketCategory = FaqCategory | "other";

export const TICKET_CATEGORIES: { value: TicketCategory | ""; label: string }[] = [
  { value: "", label: "Selecione a categoria" },
  ...FAQ_CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
  { value: "other", label: "Outro assunto" },
];

export const categoryLabel = (c: TicketCategory): string => TICKET_CATEGORIES.find((x) => x.value === c)?.label ?? "Outro assunto";

/* ----------------------------------------------------------------------- FAQ */

export type FaqItem = { id: string; category: FaqCategory; question: string; answer: string; link?: { href: string; label: string } };

export const FAQ: FaqItem[] = [
  {
    id: "pay-quando",
    category: "payouts",
    question: "Quando recebo meus repasses?",
    answer:
      "O repasse de cada competência é pago no dia 1º do mês seguinte. Por exemplo, o repasse de novembro de 2026 é pago em 01/12/2026. Você acompanha todas as datas no Calendário de Repasses.",
    link: { href: "/calendario", label: "Ver calendário de repasses" },
  },
  {
    id: "pay-valor",
    category: "payouts",
    question: "Como é calculado o valor do repasse mensal?",
    answer:
      "No modelo Água como Serviço, a Acquafy aluga seus purificadores a clientes finais e repassa a você 50% da receita de lease. No seu contrato atual isso resulta em parcelas mensais de US$ 400,00, pagas em dólar.",
    link: { href: "/extrato", label: "Ver extrato financeiro" },
  },
  {
    id: "pay-primeiro",
    category: "payouts",
    question: "Por que o primeiro repasse cobre dias a mais?",
    answer:
      "A primeira parcela considera também os dias entre a data do seu investimento (26/10/2026) e o início da primeira competência. Assim, você é remunerado desde o primeiro dia do contrato.",
  },
  {
    id: "pay-moeda",
    category: "payouts",
    question: "Em qual moeda recebo e posso ver os valores em reais?",
    answer:
      "Os repasses são pagos em dólar (US$) por transferência bancária. No cabeçalho você pode alternar a exibição para R$ ou € apenas para consulta, usando uma taxa de referência. O valor contratual continua sendo em dólar.",
  },
  {
    id: "pur-waas",
    category: "purifiers",
    question: "O que é Água como Serviço (WaaS)?",
    answer:
      "É o modelo em que a Acquafy instala, opera e faz a manutenção dos purificadores Neo UP em clientes finais, que pagam um aluguel (lease) mensal. Você investe nos equipamentos e recebe uma parte dessa receita todos os meses.",
  },
  {
    id: "pur-disponivel",
    category: "purifiers",
    question: "O que significa um purificador estar “Disponível”?",
    answer:
      "A unidade está em estoque da Acquafy, ainda sem cliente final. Assim que for instalada em um cliente, passa a “Em operação” e começa a gerar lease. Você acompanha a situação de cada unidade em Meus Purificadores.",
    link: { href: "/purificadores", label: "Ver meus purificadores" },
  },
  {
    id: "pur-manutencao",
    category: "purifiers",
    question: "E se um purificador precisar de manutenção?",
    answer:
      "A manutenção é por conta da Acquafy e já está incluída no modelo. A unidade aparece como “Em manutenção” no portal enquanto é reparada ou substituída, sem custo adicional para você.",
  },
  {
    id: "pur-mais",
    category: "purifiers",
    question: "Como compro mais purificadores?",
    answer:
      "Acesse Solicitar Mais Purificadores, escolha a quantidade (de 1 a 100), o local de instalação e a forma de pagamento. Nossa equipe analisa o pedido em até 1 dia útil e você acompanha o andamento pelo portal.",
    link: { href: "/solicitar", label: "Solicitar mais purificadores" },
  },
  {
    id: "con-prazo",
    category: "contract",
    question: "Qual é o prazo do contrato?",
    answer:
      "O Contrato de Participação Acquafy WaaS tem prazo de 36 meses, de 26/10/2026 a 25/10/2029, com 35 parcelas mensais de repasse. A primeira revisão do contrato está prevista para 10/11/2027.",
    link: { href: "/contrato", label: "Ver meu contrato" },
  },
  {
    id: "con-lease",
    category: "contract",
    question: "O que é o lease de 50%?",
    answer:
      "É a parcela da receita de aluguel dos purificadores que é repassada a você: 50%. Os outros 50% cobrem a operação da Acquafy, incluindo instalação, monitoramento, manutenção e atendimento ao cliente final.",
  },
  {
    id: "con-recompra",
    category: "contract",
    question: "Como funciona a recompra opcional de 30%?",
    answer:
      "Ao final do contrato, a Acquafy oferece a opção de recomprar seus purificadores por 30% do valor investido. É uma opção sua: você decide se quer exercê-la ou manter os equipamentos conforme as condições vigentes.",
  },
  {
    id: "con-baixar",
    category: "contract",
    question: "Onde baixo meu contrato e os comprovantes?",
    answer: "Em Documentos você encontra o contrato assinado, comprovantes de repasse e demais arquivos, com opção de baixar ou visualizar cada um.",
    link: { href: "/documentos", label: "Ir para documentos" },
  },
  {
    id: "acc-dados",
    category: "account",
    question: "Como atualizo meus dados cadastrais e minha foto?",
    answer: "Vá em Meu Perfil, edite nome, contatos e foto e salve. As alterações valem imediatamente para o portal.",
    link: { href: "/perfil", label: "Abrir meu perfil" },
  },
  {
    id: "acc-notificacoes",
    category: "account",
    question: "Onde vejo avisos de repasses, documentos e chamados?",
    answer:
      "No sino do cabeçalho. Ele reúne avisos de próximos repasses, documentos novos, purificadores disponíveis e respostas da nossa equipe, e você pode marcar todos como lidos.",
  },
  {
    id: "acc-seguranca",
    category: "account",
    question: "Esqueci minha senha ou suspeito de acesso indevido. O que faço?",
    answer: "Abra um chamado com prioridade Alta na categoria Conta, ou ligue para a nossa central. Nunca compartilhe sua senha: a equipe Acquafy não pede senhas por e-mail, chat ou telefone.",
  },
];

/* ------------------------------------------------------------------ articles */

export type HelpArticle = { id: string; category: FaqCategory; title: string; summary: string; body: string[]; href: string; hrefLabel: string };

export const ARTICLES: HelpArticle[] = [
  {
    id: "art-extrato",
    category: "payouts",
    title: "Como ler o seu extrato financeiro",
    summary: "Entenda competência, período, dias e data de pagamento de cada repasse.",
    body: [
      "Cada linha do extrato é um repasse mensal. A competência é o mês a que o valor se refere; a data de pagamento é sempre o dia 1º do mês seguinte.",
      "A coluna Período mostra os dias cobertos. Na primeira parcela, o período começa na data do investimento, por isso ela pode cobrir mais dias.",
      "Você pode filtrar por status (recebido ou pendente) e exportar a lista em CSV para a sua contabilidade.",
    ],
    href: "/extrato",
    hrefLabel: "Abrir extrato financeiro",
  },
  {
    id: "art-lease",
    category: "contract",
    title: "Entendendo o lease de 50% e a recompra de 30%",
    summary: "De onde vem o seu retorno e o que acontece no fim dos 36 meses.",
    body: [
      "Os purificadores são alugados a clientes finais. Do valor do aluguel, 50% é repassado a você mensalmente, em dólar, durante o contrato.",
      "Ao final dos 36 meses você tem a opção de vender os equipamentos de volta à Acquafy por 30% do valor investido. A recompra é opcional.",
    ],
    href: "/contrato",
    hrefLabel: "Ver condições do contrato",
  },
  {
    id: "art-instalacao",
    category: "purifiers",
    title: "Instalação e manutenção do Neo UP",
    summary: "Quem instala, quanto tempo leva e como acompanhar a situação de cada unidade.",
    body: [
      "A instalação e a manutenção são feitas pela equipe Acquafy, sem custo adicional. Unidades em estoque aparecem como Disponível até serem alocadas.",
      "Em Meus Purificadores você vê número de série, situação, data de ativação e localização de cada equipamento.",
    ],
    href: "/purificadores",
    hrefLabel: "Ver meus purificadores",
  },
  {
    id: "art-ampliar",
    category: "purifiers",
    title: "Como ampliar o seu investimento",
    summary: "Passo a passo para solicitar mais purificadores e acompanhar o pedido.",
    body: [
      "Em Solicitar Mais Purificadores, informe a quantidade, escolha onde instalar e como pagar. O resumo ao lado mostra o investimento e o repasse mensal projetado.",
      "Depois do envio você recebe um protocolo (SOL-AAAA-NNNN) e pode acompanhar o status em Minhas solicitações.",
    ],
    href: "/solicitar",
    hrefLabel: "Solicitar mais purificadores",
  },
  {
    id: "art-calendario",
    category: "payouts",
    title: "Calendário de repasses e exportação",
    summary: "Veja as 35 datas de pagamento e leve-as para a sua agenda.",
    body: [
      "O calendário mostra o mês de cada repasse, o valor e o status. O próximo pagamento fica em destaque.",
      "Use Exportar para adicionar as datas ao seu calendário pessoal.",
    ],
    href: "/calendario",
    hrefLabel: "Abrir calendário",
  },
  {
    id: "art-perfil",
    category: "account",
    title: "Mantendo seu cadastro e preferências em dia",
    summary: "Atualize contatos, foto e a moeda de exibição do portal.",
    body: [
      "Dados atualizados garantem que avisos de repasse e documentos cheguem ao canal certo.",
      "A moeda de exibição (US$, R$ ou €) muda só a forma de ver os valores; os repasses continuam em dólar.",
    ],
    href: "/perfil",
    hrefLabel: "Abrir meu perfil",
  },
];

/* ---------------------------------------------------------------------- chat */

export const CHAT_AGENT = { name: "Marina · Acquafy", firstName: "Marina" };
export const CHAT_WELCOME = "Olá! Eu sou a Marina, da equipe Acquafy. Como posso ajudar você hoje?";
export const CHAT_FALLBACK = "Obrigada pela mensagem! Vou verificar isso para você. Se preferir, abra um chamado abaixo para acompanharmos com histórico e anexos.";

export const CHAT_REPLIES: { keywords: string[]; reply: string }[] = [
  { keywords: ["repasse", "pagamento", "receber", "dia 1"], reply: "Os repasses são pagos no dia 1º do mês seguinte à competência, em dólar. O próximo está no Calendário de Repasses." },
  { keywords: ["contrato", "prazo", "recompra", "lease"], reply: "Seu contrato tem prazo de 36 meses, com lease de 50% e recompra opcional de 30% ao final. Os detalhes estão em Meu Contrato." },
  { keywords: ["purificador", "instal", "manuten", "estoque"], reply: "Posso verificar isso! A situação de cada unidade aparece em Meus Purificadores. Se uma unidade está aguardando instalação, nossa equipe já está agendando." },
  { keywords: ["senha", "acesso", "login"], reply: "Por segurança, não pedimos senhas por aqui. Abra um chamado na categoria Conta e nossa equipe de segurança entra em contato." },
  { keywords: ["obrigad", "valeu", "tchau"], reply: "Por nada! Estou à disposição sempre que precisar. Tenha um ótimo dia!" },
];

/* ------------------------------------------------------------------- tickets */

export type TicketStatus = "open" | "progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high";

export const TICKET_STATUS: Record<TicketStatus, { label: string; tone: BadgeTone }> = {
  open: { label: "Aberto", tone: "warn" },
  progress: { label: "Em andamento", tone: "brand" },
  resolved: { label: "Resolvido", tone: "ok" },
};

export const TICKET_PRIORITY: Record<TicketPriority, { label: string; tone: BadgeTone }> = {
  low: { label: "Baixa", tone: "neutral" },
  medium: { label: "Média", tone: "violet" },
  high: { label: "Alta", tone: "danger" },
};

export const PRIORITY_OPTIONS = (Object.keys(TICKET_PRIORITY) as TicketPriority[]).map((value) => ({ value, label: TICKET_PRIORITY[value].label }));

export type TicketMessage = { id: string; from: "me" | "team"; author: string; date: IsoDate; text: string; attachment?: string };

export type Ticket = {
  /** Protocol number without the "#": "1042". */
  id: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: IsoDate;
  updatedAt: IsoDate;
  messages: TicketMessage[];
};

export const TEAM_AUTHOR = "Equipe Acquafy";

export const SEED_TICKETS: Ticket[] = [
  {
    id: "1042",
    subject: "Dúvida sobre a data do primeiro repasse",
    category: "payouts",
    priority: "medium",
    status: "progress",
    createdAt: "2026-10-24",
    updatedAt: "2026-10-25",
    messages: [
      {
        id: "1042-1",
        from: "me",
        author: "Você",
        date: "2026-10-24",
        text: "Olá! Meu investimento foi feito em 26/10. Quando será pago o primeiro repasse e ele considera os dias antes de novembro?",
      },
      {
        id: "1042-2",
        from: "team",
        author: TEAM_AUTHOR,
        date: "2026-10-25",
        text: "Olá, Carlos! O primeiro repasse (competência novembro/2026) será pago em 01/12/2026 e inclui os dias entre 26/10 e 31/10, então a parcela já considera o período desde a data do seu investimento. Ficou alguma dúvida?",
      },
    ],
  },
  {
    id: "1040",
    subject: "Previsão de instalação do purificador AU2401A3570",
    category: "purifiers",
    priority: "high",
    status: "open",
    createdAt: "2026-10-23",
    updatedAt: "2026-10-23",
    messages: [
      {
        id: "1040-1",
        from: "me",
        author: "Você",
        date: "2026-10-23",
        text: "A unidade AU2401A3570 aparece como Disponível. Existe uma previsão para ela ser instalada em um cliente?",
      },
    ],
  },
  {
    id: "1038",
    subject: "Segunda via do Contrato de Participação",
    category: "contract",
    priority: "low",
    status: "resolved",
    createdAt: "2026-10-20",
    updatedAt: "2026-10-21",
    messages: [
      { id: "1038-1", from: "me", author: "Você", date: "2026-10-20", text: "Preciso de uma segunda via do contrato assinado para o meu contador." },
      {
        id: "1038-2",
        from: "team",
        author: TEAM_AUTHOR,
        date: "2026-10-21",
        text: "Enviamos a segunda via para o seu e-mail e ela também está disponível em Documentos. Vamos encerrar este chamado; se precisar, é só reabri-lo.",
      },
    ],
  },
];

export const SUPPORT_TEXT = {
  searchPlaceholder: "Busque por repasse, contrato, purificador…",
  emptySearchTitle: "Nenhum resultado para a sua busca",
  emptySearchDescription: "Tente outras palavras ou abra um chamado e nossa equipe responde para você.",
};
