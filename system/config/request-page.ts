// config/request-page.ts
//
// Texts, options and mock records of "Solicitar Mais Purificadores". Money is always USD. Replace the
// seeded requests with an API call when the backend exists; the shapes are the contract.

import { CircleCheck, CircleX, Hammer, SearchCheck, type LucideIcon } from "lucide-react";
import type { BadgeTone } from "@/components/ui/Badge";
import type { IsoDate } from "@/lib/format";

export const REQUEST_STEPS = [
  { id: "quantity", label: "Quantidade e modelo" },
  { id: "install", label: "Instalação" },
  { id: "payment", label: "Pagamento" },
  { id: "review", label: "Revisão e envio" },
] as const;

export type RequestStepId = (typeof REQUEST_STEPS)[number]["id"];

export const QUANTITY_MIN = 1;
export const QUANTITY_MAX = 100;
export const QUANTITY_PRESETS = [5, 10, 20, 50] as const;

/** Mock environmental figure: litres of purified water one Neo UP serves per year (100 L/day). */
export const LITERS_PER_UNIT_YEAR = 36_500;

export const PRODUCT = {
  name: "Neo UP",
  tagline: "Purificador de água inteligente para o modelo Água como Serviço",
  description:
    "Filtragem em múltiplos estágios, monitoramento remoto e manutenção inclusa. A Acquafy instala, opera e aluga o equipamento; você recebe 50% do lease todo mês, em dólar.",
  highlights: ["Instalação e manutenção por conta da Acquafy", "Repasse no dia 1º de cada mês", "Recompra opcional de 30% ao final do contrato"],
  image: { src: "/brand/neo-up.webp", width: 420, height: 536 },
  thumb: { src: "/brand/neo-up-thumb.webp", width: 112, height: 143 },
} as const;

export type InstallMode = "stock" | "address";

export const INSTALL_OPTIONS: { value: InstallMode; label: string; description: string }[] = [
  { value: "stock", label: "Estoque Acquafy", description: "A Acquafy instala para mim: as unidades ficam em estoque e são alocadas a clientes finais pela nossa equipe." },
  { value: "address", label: "Endereço informado", description: "Os purificadores serão instalados no endereço que eu indicar, nos Estados Unidos." },
];

export const US_STATES: { value: string; label: string; cities: string[] }[] = [
  { value: "FL", label: "Flórida (FL)", cities: ["Orlando", "Miami", "Tampa", "Jacksonville", "Kissimmee"] },
  { value: "TX", label: "Texas (TX)", cities: ["Houston", "Dallas", "Austin", "San Antonio"] },
  { value: "CA", label: "Califórnia (CA)", cities: ["Los Angeles", "San Diego", "San Jose", "Sacramento"] },
  { value: "NY", label: "Nova York (NY)", cities: ["New York", "Buffalo", "Albany"] },
  { value: "GA", label: "Geórgia (GA)", cities: ["Atlanta", "Savannah"] },
  { value: "NC", label: "Carolina do Norte (NC)", cities: ["Charlotte", "Raleigh"] },
  { value: "AZ", label: "Arizona (AZ)", cities: ["Phoenix", "Tucson"] },
  { value: "NV", label: "Nevada (NV)", cities: ["Las Vegas", "Reno"] },
];

export type PaymentMethod = "wire" | "card" | "ach";

export const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; description: string; steps: string[] }[] = [
  {
    value: "wire",
    label: "Transferência bancária em USD",
    description: "Sem taxas adicionais. Ideal para valores mais altos.",
    steps: [
      "Após o envio, você recebe por e-mail os dados bancários da Acquafy com o protocolo como referência.",
      "Faça a transferência em dólar em até 5 dias úteis.",
      "Assim que o crédito for confirmado, a solicitação segue para instalação.",
    ],
  },
  {
    value: "card",
    label: "Cartão de crédito",
    description: "Aprovação imediata, via link de pagamento seguro.",
    steps: [
      "Após a análise, enviamos um link de pagamento seguro para o seu e-mail.",
      "Pague com Visa, Mastercard ou Amex. Pode haver taxa da operadora do cartão.",
      "A confirmação é imediata e a instalação é agendada em seguida.",
    ],
  },
  {
    value: "ach",
    label: "Boleto internacional / ACH",
    description: "Débito em conta bancária americana, com compensação em 2 a 3 dias úteis.",
    steps: [
      "Informe sua conta bancária americana no link enviado após a análise (ou use o boleto internacional).",
      "O débito ACH compensa em 2 a 3 dias úteis.",
      "Você acompanha o status da compensação pelo portal.",
    ],
  },
];

export type RequestStatus = "review" | "approved" | "installing" | "done" | "cancelled";

export const REQUEST_STATUS: Record<RequestStatus, { label: string; tone: BadgeTone; icon: LucideIcon }> = {
  review: { label: "Em análise", tone: "warn", icon: SearchCheck },
  approved: { label: "Aprovada", tone: "brand", icon: CircleCheck },
  installing: { label: "Em instalação", tone: "violet", icon: Hammer },
  done: { label: "Concluída", tone: "ok", icon: CircleCheck },
  cancelled: { label: "Cancelada", tone: "danger", icon: CircleX },
};

/** What the investor filled in across the four steps. */
export type RequestDraft = {
  quantity: number;
  install: InstallMode;
  state: string;
  city: string;
  address: string;
  zip: string;
  payment: PaymentMethod;
  accepted: boolean;
};

export const EMPTY_DRAFT: RequestDraft = {
  quantity: 5,
  install: "stock",
  state: "",
  city: "",
  address: "",
  zip: "",
  payment: "wire",
  accepted: false,
};

export type PortalRequest = {
  /** Protocol, e.g. SOL-2026-0003. */
  id: string;
  createdAt: IsoDate;
  quantity: number;
  unitPrice: number;
  install: InstallMode;
  /** Human-readable destination ("Estoque Acquafy" or the full address). */
  location: string;
  payment: PaymentMethod;
  status: RequestStatus;
};

export const SEED_REQUESTS: PortalRequest[] = [
  {
    id: "SOL-2026-0002",
    createdAt: "2026-10-26",
    quantity: 5,
    unitPrice: 400,
    install: "address",
    location: "1200 International Dr, Orlando, FL 32819",
    payment: "wire",
    status: "review",
  },
  {
    id: "SOL-2026-0001",
    createdAt: "2026-09-14",
    quantity: 10,
    unitPrice: 400,
    install: "stock",
    location: "Estoque Acquafy",
    payment: "ach",
    status: "done",
  },
];

export const NEXT_STEPS = [
  { title: "Análise da solicitação", text: "Nossa equipe confere os dados em até 1 dia útil e confirma por e-mail." },
  { title: "Confirmação do pagamento", text: "Você recebe as instruções da forma escolhida e envia o pagamento." },
  { title: "Instalação dos purificadores", text: "Após a confirmação, as unidades são instaladas e passam a gerar repasse no ciclo seguinte." },
];

export const REQUEST_TEXT = {
  disclaimer: "Simulação ilustrativa baseada no repasse atual por purificador. Valores reais seguem as condições do contrato.",
  historyEmpty: "Você ainda não fez nenhuma solicitação.",
};
