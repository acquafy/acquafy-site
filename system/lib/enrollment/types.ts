export type Offer = {
  id: string;
  title: string;
  version: string;
  agreement_text: string;
  agreement_hash: string;
  unit_model: string;
  unit_amount_minor: number;
  currency: string;
  term_months: number;
  min_quantity: number;
  max_quantity: number;
  enabled: boolean;
  published_at: string;
};
export type Enrollment = {
  id: string;
  account_id: string;
  user_id: string;
  offer_id: string;
  quantity: number;
  amount_minor: number;
  currency: string;
  status: string;
  details: Record<string, string>;
  review_note: string;
  contract_id: string | null;
  created_at: string;
};
export type Acceptance = {
  id: string;
  enrollment_id: string;
  signer_name: string;
  agreement_text: string;
  commercial_terms: Record<string, unknown>;
  evidence_hash: string;
  accepted_at: string;
};
export type Checkout = {
  id: string;
  enrollment_id: string;
  stripe_session_id: string | null;
  state: string;
  amount_minor: number;
  currency: string;
  created_at: string;
};
export type ActionResult = { error?: string; link?: string; success?: string };
export const enrollmentLabels: Record<string, string> = {
  invited: "Preencha seus dados",
  details_submitted: "Dados em análise",
  changes_requested: "Ajustes solicitados",
  approved: "Acordo disponível para aceite",
  accepted: "Acordo aceito · aguardando pagamento",
  payment_pending: "Pagamento em andamento",
  active: "Parceria ativa",
  payment_review: "Pagamento em análise",
  cancelled: "Adesão cancelada",
};
