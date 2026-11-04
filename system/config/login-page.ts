// config/login-page.ts
//
// Copy for the investor login screen (desktop brand panel + form).

import { CircleDollarSign, Eye, ShieldCheck, type LucideIcon } from "lucide-react";

export const loginCopy = {
  headlineLead: "Bem-vindo ao",
  headlineAccent: "Acquafy Account",
  support: "Acompanhe seus pedidos, entregas, produtos e locações em um só lugar.",
  formTitle: "Acesse sua conta",
  formSubtitle: "Entre para acompanhar seus pedidos e serviços Acquafy.",
  secureTitle: "Acesso seguro",
  secureText: "Conta protegida com confirmação de e-mail e acesso aos seus próprios pedidos.",
  accessHint: "Clientes podem criar sua própria conta. Parceiros e equipe mantêm suas permissões específicas.",
  unavailable: "Não foi possível acessar o serviço de autenticação. Tente novamente mais tarde.",
  forbidden: "Sua conta não tem acesso ao portal. Entre em contato com a equipe Acquafy.",
  invalidCredentials: "E-mail ou senha inválidos. Confira os dados e tente novamente.",
} as const;

export const trustPoints: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CircleDollarSign, title: "Seus pedidos", text: "Pedidos, entrega e instalação" },
  { icon: Eye, title: "Transparência", text: "Propostas e acordos sempre à mão" },
  { icon: ShieldCheck, title: "Segurança", text: "Dados protegidos de ponta a ponta" },
];
