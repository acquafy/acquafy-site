// lib/portal/search-index.ts
//
// Flat list of everything the top-bar search can find. Built on the server from the same config the screens use
// (so it never drifts) and passed to the client search as plain data.

import { clauses } from "@/config/contract-page";
import { officialDocuments } from "@/config/documents-page";
import { purifiers } from "@/config/investor";
import { navItems } from "@/config/navigation";
import { ARTICLES, FAQ } from "@/config/support-page";
import { formatCompetence, formatDate } from "@/lib/format";
import { locationLabel } from "./purifiers";
import { getPortalSummary } from "./schedule";

export type SearchEntry = {
  id: string;
  category: string;
  title: string;
  description: string;
  href: string;
};

const clip = (text: string, max = 110) => (text.length > max ? `${text.slice(0, max).trimEnd()}…` : text);

/** Sections of "Meu Perfil" and common actions, reachable by name. */
const SHORTCUTS: Omit<SearchEntry, "id">[] = [
  { category: "Perfil", title: "Alterar senha", description: "Segurança · senha e autenticação", href: "/perfil?secao=seguranca" },
  { category: "Perfil", title: "Autenticação em duas etapas", description: "Segurança · proteja sua conta com um código", href: "/perfil?secao=seguranca" },
  { category: "Perfil", title: "Dados bancários", description: "Conta para recebimento dos repasses", href: "/perfil?secao=bancarios" },
  { category: "Perfil", title: "Preferências de notificação", description: "E-mail e alertas de repasses e dispositivos", href: "/perfil?secao=notificacoes" },
  { category: "Perfil", title: "Idioma", description: "Português (Brasil)", href: "/perfil?secao=idioma" },
  { category: "Ações", title: "Solicitar mais purificadores", description: "Amplie seu investimento", href: "/solicitar" },
  { category: "Ações", title: "Abrir chamado de suporte", description: "Fale com a equipe Acquafy", href: "/suporte" },
  { category: "Ações", title: "Enviar documento", description: "Guarde comprovantes junto ao seu contrato", href: "/documentos" },
  { category: "Ações", title: "Exportar extrato em CSV", description: "Histórico completo de repasses", href: "/extrato#detalhamento" },
  { category: "Ações", title: "Exportar calendário de repasses", description: "Arquivo .ics para Google, Apple e Outlook", href: "/calendario" },
];

export function buildSearchIndex(): SearchEntry[] {
  const s = getPortalSummary();
  const entries: SearchEntry[] = [];

  for (const item of navItems) {
    entries.push({ id: `page:${item.href}`, category: "Páginas", title: item.label, description: item.subtitle, href: item.href });
  }

  for (const doc of officialDocuments) {
    entries.push({ id: `doc:${doc.id}`, category: "Documentos", title: doc.title, description: `${doc.description} · ${doc.kind} · ${formatDate(doc.date)}`, href: "/documentos" });
  }

  for (const p of purifiers) {
    entries.push({
      id: `purifier:${p.serial}`,
      category: "Purificadores",
      title: `${p.model} · ${p.serial}`,
      description: `${locationLabel(p)} · ${p.status === "operation" ? "Em operação" : p.status === "available" ? "Disponível" : "Em manutenção"}`,
      href: `/purificadores?q=${encodeURIComponent(p.serial)}`,
    });
  }

  for (const i of s.installments) {
    entries.push({
      id: `payout:${i.number}`,
      category: "Repasses",
      title: `Repasse ${formatCompetence(i.year, i.month)}`,
      description: `US$ ${i.amount.toFixed(2).replace(".", ",")} · pagamento em ${formatDate(i.paymentDate)} · parcela ${i.number} de ${s.installments.length}`,
      href: "/extrato#detalhamento",
    });
  }

  for (const c of clauses) {
    entries.push({ id: `clause:${c.id}`, category: "Contrato", title: c.title, description: clip(c.body), href: "/contrato" });
  }

  for (const f of FAQ) {
    entries.push({ id: `faq:${f.id}`, category: "Ajuda", title: f.question, description: clip(f.answer), href: "/suporte" });
  }
  for (const a of ARTICLES) {
    entries.push({ id: `article:${a.id}`, category: "Ajuda", title: a.title, description: clip(a.summary), href: "/suporte" });
  }

  SHORTCUTS.forEach((e, idx) => entries.push({ id: `shortcut:${idx}`, ...e }));
  return entries;
}
