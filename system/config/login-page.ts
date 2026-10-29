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
  secureText: "Seus dados são protegidos com criptografia de nível bancário.",
  demoHint: "Demonstração: use qualquer e-mail válido e senha com 6+ caracteres.",
  invalidCredentials: "E-mail ou senha inválidos. Confira os dados e tente novamente.",
} as const;

export const trustPoints: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CircleDollarSign, title: "Renda em dólar", text: "Repasses mensais em USD" },
  { icon: Eye, title: "Transparência", text: "Extrato e contrato sempre à mão" },
  { icon: ShieldCheck, title: "Segurança", text: "Dados protegidos de ponta a ponta" },
];
