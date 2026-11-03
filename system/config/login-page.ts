// config/login-page.ts
//
// Copy for the investor login screen (desktop brand panel + form).

import { CircleDollarSign, Eye, ShieldCheck, type LucideIcon } from "lucide-react";

export const loginCopy = {
  headlineLead: "Bem-vindo ao",
  headlineAccent: "Portal do Investidor",
  support: "Acompanhe seus investimentos em água de qualidade e seus repasses, com total transparência e segurança.",
  formTitle: "Acesse sua conta",
  formSubtitle: "Entre para acompanhar seus purificadores e repasses.",
  secureTitle: "Acesso seguro",
  secureText: "Acesso exclusivo para usuários internos e parceiros autorizados.",
  accessHint: "O acesso é liberado pela equipe Acquafy.",
  unavailable: "Não foi possível acessar o serviço de autenticação. Tente novamente mais tarde.",
  forbidden: "Sua conta não tem acesso ao portal. Entre em contato com a equipe Acquafy.",
  invalidCredentials: "E-mail ou senha inválidos. Confira os dados e tente novamente.",
} as const;

export const trustPoints: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CircleDollarSign, title: "Renda em dólar", text: "Repasses mensais em USD" },
  { icon: Eye, title: "Transparência", text: "Extrato e contrato sempre à mão" },
  { icon: ShieldCheck, title: "Segurança", text: "Dados protegidos de ponta a ponta" },
];
