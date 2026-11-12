// Rules of the global administrator view. Pure so they can be unit tested without a session or a database.

export type StaffRole = "admin" | "support" | undefined;

/**
 * Account shown by the account-scoped screens. Administrators can read every account, so falling back to the first
 * row would show a stranger's data as if it had been chosen: they stay in the global view until they open one.
 */
export function selectAccount<T extends { id: string }>(visible: T[], chosen: string | undefined, staff: StaffRole): T | null {
  const match = visible.find((a) => a.id === chosen);
  if (match) return match;
  return staff === "admin" ? null : (visible[0] ?? null);
}

export type Stage = { key: string; label: string; statuses: string[] };

/** "cadastros" is not an enrollment status: it lists website applications that have no invitation yet. */
export const APPLICATIONS_STAGE = "cadastros";

export const enrollmentStages: Stage[] = [
  { key: "analise", label: "Para análise", statuses: ["details_submitted"] },
  { key: "andamento", label: "Em andamento", statuses: ["invited", "changes_requested", "approved", "accepted", "payment_pending"] },
  { key: "pagamento", label: "Pagamento em análise", statuses: ["payment_review"] },
  { key: "ativos", label: "Ativos", statuses: ["active"] },
  { key: "cancelados", label: "Cancelados", statuses: ["cancelled"] },
];

export const orderStages: Stage[] = [
  // "proposta" is what staff must act on: quote requests (old flow) and placed orders to confirm (fixed price).
  { key: "proposta", label: "Para confirmar", statuses: ["requested", "placed"] },
  { key: "cliente", label: "Com o cliente", statuses: ["quoted", "accepted", "awaiting_fee", "confirmed"] },
  { key: "entrega", label: "Em entrega", statuses: ["paid", "processing", "shipped", "installed"] },
  { key: "pagamento", label: "Pagamento em análise", statuses: ["review"] },
  { key: "encerrados", label: "Encerrados", statuses: ["completed", "cancelled"] },
];

export const stageFor = (stages: Stage[], key: string | undefined) => stages.find((s) => s.key === key);

export type QueueCounts = {
  applications: number;
  enrollmentReview: number;
  enrollmentPayment: number;
  ordersToQuote: number;
  ordersToFulfill: number;
  ordersPayment: number;
  leasesToAllocate: number;
  leasesToInstall: number;
  leasesWithIssues: number;
  ticketsOpen: number;
};

export type WorkQueue = { key: keyof QueueCounts; label: string; description: string; href: string; count: number };

/** The administrator's to-do list, most urgent money and approval items first. */
export function workQueues(counts: QueueCounts): WorkQueue[] {
  const queue = (key: keyof QueueCounts, label: string, description: string, href: string): WorkQueue => ({ key, label, description, href, count: counts[key] });
  return [
    queue("enrollmentPayment", "Pagamentos de adesão em análise", "Reembolso ou disputa no Stripe. Confira antes de reativar.", "/investidores?etapa=pagamento"),
    queue("ordersPayment", "Pagamentos de pedido em análise", "Pedidos com pagamento que exige conferência.", "/pedidos?etapa=pagamento"),
    queue("leasesWithIssues", "Locações com pendência", "Mensalidade em atraso ou em análise.", "/locacoes"),
    queue("enrollmentReview", "Investidores para aprovar", "Dados enviados, aguardando liberação do acordo.", "/investidores?etapa=analise"),
    queue("applications", "Cadastros do site sem convite", "Interesse recebido, aguardando contato e convite.", `/investidores?etapa=${APPLICATIONS_STAGE}`),
    queue("ordersToQuote", "Pedidos para confirmar", "Pedidos novos aguardando confirmação ou proposta.", "/pedidos?etapa=proposta"),
    queue("ordersToFulfill", "Pedidos em entrega", "Pagos, em preparação, enviados ou instalados, sem conclusão.", "/pedidos?etapa=entrega"),
    queue("leasesToAllocate", "Locações sem equipamento", "Oferecidas, aguardando alocação de unidade.", "/locacoes"),
    queue("leasesToInstall", "Instalações a confirmar", "Locações pagas sem instalação confirmada.", "/locacoes"),
    queue("ticketsOpen", "Chamados abertos", "Aguardando resposta da equipe.", "/equipe"),
  ];
}

/** Escapes LIKE wildcards, so searching for "50%" finds that text instead of matching everything. */
export function literalSearch(term: string): string {
  return term
    .trim()
    .slice(0, 160)
    .replace(/[\\%_]/g, (c) => "\\" + c);
}

export const pageNumber = (value: string | undefined) => Math.max(0, Math.min(100000, Number.parseInt(value || "0", 10) || 0));
