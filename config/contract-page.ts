// config/contract-page.ts
//
// Mock data and copy of the "Meu Contrato" screen. Figures that also appear elsewhere in the portal come
// from config/investor.ts, so the contract page always agrees with Dashboard and Extrato.

import { contract, purifiers, UNIT_PRICE } from "@/config/investor";
import { formatUsd, formatUsdWhole, type IsoDate } from "@/lib/format";

export const CONTRACT_NUMBER = "ACQ-WAAS-2026-0142";
export const CONTRACT_PDF = { href: "/docs/contrato-participacao-acquafy.pdf", filename: "contrato-participacao-acquafy.pdf" };
export const SIGNATURE_PDF = { href: "/docs/comprovante-assinatura-contrato.pdf", filename: "comprovante-assinatura-contrato.pdf" };

export const COUNTERPARTY = "Acquafy WaaS";

const pct = (share: number) => `${Math.round(share * 100)}%`;
const units = purifiers.length;
const invested = units * UNIT_PRICE;

export type Clause = { id: string; title: string; body: string };

export const clauses: Clause[] = [
  {
    id: "objeto",
    title: "1. Objeto",
    body: `O contrato tem por objeto a participação do investidor no programa Acquafy WaaS (Água como Serviço), por meio da aquisição de ${units} purificadores Neo UP, que são instalados, operados e mantidos pela Acquafy em clientes finais, sob o modelo de locação (lease).`,
  },
  {
    id: "prazo",
    title: "2. Prazo",
    body: `Vigência de ${contract.termMonths} meses, a partir da data do investimento, com término previsto na data indicada no resumo do contrato. Pode ser renovado por acordo escrito entre as partes.`,
  },
  {
    id: "repasse",
    title: "3. Repasses",
    body: `A Acquafy repassa ao investidor, no dia 1º de cada mês, o valor da competência anterior, em dólar americano, por ${contract.paymentMethod.toLowerCase()}. São ${contract.installments} parcelas mensais de ${formatUsd(contract.installmentValue)}. O primeiro repasse cobre todos os dias desde a data do investimento.`,
  },
  {
    id: "lease",
    title: "4. Participação no Lease",
    body: `O investidor tem direito a ${pct(contract.leaseShare)} da receita de lease das unidades em operação. Unidades em estoque ou em manutenção não geram receita de lease no período em que ficam indisponíveis.`,
  },
  {
    id: "recompra",
    title: "5. Recompra",
    body: `Ao término do prazo, o investidor pode solicitar a recompra de uma ou mais unidades pelo valor de ${pct(contract.buybackShare)} do valor investido nelas. O valor é indicativo e está sujeito a análise e confirmação da Acquafy.`,
  },
  {
    id: "rescisao",
    title: "6. Rescisão",
    body: "Qualquer das partes pode rescindir o contrato com aviso prévio escrito de 60 dias. Na rescisão antecipada, os repasses já vencidos são pagos integralmente e as unidades seguem as regras de recompra em vigor.",
  },
  {
    id: "confidencialidade",
    title: "7. Confidencialidade",
    body: "As partes mantêm sigilo sobre as informações comerciais e financeiras trocadas durante a vigência do contrato e por 24 meses após o seu término, salvo exigência legal.",
  },
  {
    id: "foro",
    title: "8. Foro",
    body: "Fica eleito o foro da Comarca de São Paulo/SP para dirimir controvérsias decorrentes do contrato, com renúncia a qualquer outro.",
  },
];

export const AMENDMENT_TYPES = [
  { value: "unidades", label: "Inclusão de novas unidades" },
  { value: "bancario", label: "Alteração da conta de recebimento" },
  { value: "prazo", label: "Alteração ou renovação do prazo" },
  { value: "cessao", label: "Cessão de direitos a terceiro" },
  { value: "outro", label: "Outro assunto" },
];

export type ContractEventKind = "marco" | "aditivo" | "recompra";
export type ContractEventStatus = "Concluído" | "Em análise";

export type ContractEvent = {
  id: string;
  kind: ContractEventKind;
  title: string;
  description: string;
  date: IsoDate;
  status: ContractEventStatus;
  /** Protocol of the request (amendments and buy-backs). */
  protocol?: string;
};

/** Events that exist from the start; the ones the investor creates are stored in the browser. */
export const baseEvents: ContractEvent[] = [
  {
    id: "base-assinatura",
    kind: "marco",
    title: "Contrato assinado",
    description: "Assinatura eletrônica das duas partes concluída.",
    date: contract.startDate,
    status: "Concluído",
  },
  {
    id: "base-investimento",
    kind: "marco",
    title: "Investimento confirmado",
    description: `${units} purificadores Neo UP · ${formatUsdWhole(invested)}.`,
    date: contract.startDate,
    status: "Concluído",
  },
  {
    id: "base-cronograma",
    kind: "marco",
    title: "Cronograma de repasses gerado",
    description: `${contract.installments} parcelas mensais de ${formatUsd(contract.installmentValue)}.`,
    date: contract.startDate,
    status: "Concluído",
  },
];

export const EVENT_FILTERS: { id: "todos" | ContractEventKind; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "aditivo", label: "Aditivos" },
  { id: "recompra", label: "Recompra" },
  { id: "marco", label: "Marcos" },
];

/** Digital-signature record (mock). */
export const signatures = [
  { party: "Acquafy WaaS", signer: "Marina Costa", role: "Diretora Comercial", date: contract.startDate, time: "14:28", ip: "200.147.***.**" },
  { party: "Investidor", signer: null, role: "Contratante", date: contract.startDate, time: "14:32", ip: "73.***.***.21" },
] as const;

export const DOCUMENT_HASH = "9f2c7a41d83b5e60a1c4f7d2b98e3a05c6d1f8e47b2a90c3d5e6f1a8b7c4d209";
