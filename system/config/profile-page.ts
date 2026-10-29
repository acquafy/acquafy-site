// config/profile-page.ts
//
// Static copy and mock data for "Meu Perfil": section menu, notification groups, sessions, terms and FAQ.

import { Bell, CircleHelp, CreditCard, FileText, Globe, Lock, UserRound, type LucideIcon } from "lucide-react";
import type { NotificationPrefs, Profile } from "@/config/profile";
import type { Tone } from "@/components/ui/KpiCard";

export type ProfileSectionId = "pessoais" | "bancarios" | "notificacoes" | "idioma" | "seguranca" | "ajuda" | "termos";

export type ProfileSection = { id: ProfileSectionId; label: string; description: string; icon: LucideIcon; tone: Tone };

export const DEFAULT_SECTION: ProfileSectionId = "pessoais";

export const profileSections: ProfileSection[] = [
  { id: "pessoais", label: "Informações Pessoais", description: "Nome, e-mail, telefone e endereço", icon: UserRound, tone: "violet" },
  { id: "bancarios", label: "Dados Bancários", description: "Conta para recebimento dos repasses", icon: CreditCard, tone: "blue" },
  { id: "notificacoes", label: "Notificações", description: "Preferências de e-mail e alertas", icon: Bell, tone: "green" },
  { id: "idioma", label: "Idioma", description: "Português (Brasil)", icon: Globe, tone: "orange" },
  { id: "seguranca", label: "Segurança", description: "Alterar senha e autenticação", icon: Lock, tone: "pink" },
  { id: "ajuda", label: "Central de Ajuda", description: "Dúvidas e suporte", icon: CircleHelp, tone: "blue" },
  { id: "termos", label: "Termos e Condições", description: "Políticas de uso e privacidade", icon: FileText, tone: "violet" },
];

export function isSectionId(value: string | null): value is ProfileSectionId {
  return profileSections.some((s) => s.id === value);
}

export const LOGOUT_ITEM = { label: "Sair da Conta", description: "Encerrar sessão no portal" } as const;

export const languageOptions: { value: Profile["language"]; label: string }[] = [
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "en-US", label: "English (United States)" },
  { value: "es-ES", label: "Español (España)" },
];

export type NotificationItem = { key: keyof NotificationPrefs; label: string; description: string; on: string; off: string };
export type NotificationGroup = { title: string; items: NotificationItem[] };

export const notificationGroups: NotificationGroup[] = [
  {
    title: "Repasses",
    items: [
      {
        key: "payoutEmail",
        label: "Repasse por e-mail",
        description: "Aviso quando um repasse mensal for programado ou pago.",
        on: "Avisos de repasse por e-mail ativados",
        off: "Avisos de repasse por e-mail desativados",
      },
      {
        key: "payoutPush",
        label: "Repasse por notificação",
        description: "Alerta no navegador e no aplicativo no dia do pagamento.",
        on: "Notificações de repasse ativadas",
        off: "Notificações de repasse desativadas",
      },
    ],
  },
  {
    title: "Extrato",
    items: [
      {
        key: "statementMonthly",
        label: "Extrato mensal",
        description: "Receba o resumo do mês com repasses e comprovantes.",
        on: "Extrato mensal por e-mail ativado",
        off: "Extrato mensal por e-mail desativado",
      },
    ],
  },
  {
    title: "Dispositivos",
    items: [
      {
        key: "deviceAlerts",
        label: "Alertas dos purificadores",
        description: "Avisos de ativação, manutenção ou mudança de status das unidades.",
        on: "Alertas dos purificadores ativados",
        off: "Alertas dos purificadores desativados",
      },
    ],
  },
  {
    title: "Novidades",
    items: [
      {
        key: "news",
        label: "Novidades e ofertas",
        description: "Lançamentos, novos purificadores e oportunidades de investimento.",
        on: "Novidades e ofertas ativadas",
        off: "Novidades e ofertas desativadas",
      },
    ],
  },
];

export type ActiveSession = { id: string; device: string; kind: "desktop" | "mobile"; location: string; lastActive: string; current: boolean };

export const initialSecurity: { passwordChangedAt: string; sessions: ActiveSession[] } = {
  passwordChangedAt: "2026-07-14",
  sessions: [
    { id: "s1", device: "Chrome · Windows", kind: "desktop", location: "Orlando, FL", lastActive: "Agora", current: true },
    { id: "s2", device: "Safari · iPhone 15", kind: "mobile", location: "Orlando, FL", lastActive: "Há 2 horas", current: false },
    { id: "s3", device: "Edge · Windows", kind: "desktop", location: "Miami, FL", lastActive: "Ontem, 18:42", current: false },
  ],
};

/** The 2FA code the mock accepts. */
export const MOCK_TWO_FACTOR_CODE = "123456";
export const TWO_FACTOR_SECRET = "ACQF 7K2M 9XQ4 LP3D";

export const TERMS_PDF = "/docs/termos-e-condicoes.pdf";
export const TERMS_VERSION = "Versão 1.2 · atualizada em 01/10/2026";

export const termsSections: { title: string; body: string }[] = [
  {
    title: "1. Objeto",
    body: "Estes Termos regulam o uso do Portal do Investidor Acquafy, ambiente onde o investidor acompanha seus purificadores Neo UP, repasses mensais em dólar, extrato, contrato e documentos do modelo Água como Serviço (WaaS).",
  },
  {
    title: "2. Acesso e responsabilidade",
    body: "O acesso é pessoal e intransferível. O investidor é responsável pela guarda de suas credenciais e deve comunicar imediatamente qualquer uso indevido. Recomendamos ativar a autenticação em duas etapas e encerrar sessões em dispositivos que não utiliza mais.",
  },
  {
    title: "3. Repasses e valores",
    body: "Os repasses seguem o contrato vigente: parcelas mensais em dólar americano (USD), pagas no primeiro dia do mês seguinte à competência, na conta bancária cadastrada. Valores exibidos em outras moedas são apenas referências de conversão e podem variar.",
  },
  {
    title: "4. Dados bancários",
    body: "A alteração da conta de recebimento exige confirmação de segurança. A Acquafy não se responsabiliza por repasses enviados a contas informadas incorretamente pelo investidor.",
  },
  {
    title: "5. Privacidade e proteção de dados",
    body: "Tratamos seus dados pessoais e financeiros apenas para executar o contrato, cumprir obrigações legais e melhorar o serviço, com criptografia em trânsito e em repouso. Você pode solicitar acesso, correção ou exclusão dos seus dados pelo canal de suporte.",
  },
  {
    title: "6. Comunicações",
    body: "Enviamos comunicações operacionais (repasses, extratos, alertas de segurança) e, se você permitir, novidades e ofertas. As preferências podem ser alteradas a qualquer momento em Meu Perfil > Notificações.",
  },
  {
    title: "7. Disponibilidade do serviço",
    body: "Empenhamos esforços para manter o portal disponível, mas podem ocorrer janelas de manutenção e indisponibilidades pontuais. As informações do portal têm caráter informativo; o contrato assinado prevalece em caso de divergência.",
  },
  {
    title: "8. Alterações destes Termos",
    body: "Podemos atualizar estes Termos para refletir mudanças legais ou do serviço. A versão vigente fica sempre disponível nesta página, e mudanças relevantes serão comunicadas por e-mail.",
  },
];

export const helpLinks: { href: string; title: string; description: string; icon: LucideIcon; tone: Tone }[] = [
  { href: "/suporte", title: "Abrir um chamado", description: "Fale com a equipe Acquafy e acompanhe suas solicitações.", icon: CircleHelp, tone: "blue" },
  { href: "/documentos", title: "Documentos e comprovantes", description: "Contratos, comprovantes de repasse e demais arquivos.", icon: FileText, tone: "violet" },
  { href: "/contrato", title: "Meu contrato", description: "Condições, andamento e opções do seu contrato.", icon: UserRound, tone: "green" },
];

export const faqItems: { id: string; question: string; answer: string }[] = [
  { id: "faq-quando", question: "Quando recebo meus repasses?", answer: "Os repasses são pagos no primeiro dia de cada mês, em dólar, referentes ao mês anterior. Veja as datas no Calendário de Repasses." },
  { id: "faq-conta", question: "Como altero a conta de recebimento?", answer: "Vá em Dados Bancários, clique em Alterar, preencha os novos dados e confirme com a sua senha. O próximo repasse já usa a nova conta." },
  { id: "faq-moeda", question: "Posso ver os valores em reais ou euros?", answer: "Sim. Use o seletor de moeda no topo do portal. Os repasses continuam sendo pagos em dólar; a conversão é apenas informativa." },
  { id: "faq-seguranca", question: "Como deixo minha conta mais segura?", answer: "Ative a autenticação em duas etapas em Segurança, use uma senha forte e encerre sessões de dispositivos que você não reconhece." },
];
