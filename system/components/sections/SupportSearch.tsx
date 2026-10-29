// components/sections/SupportSearch.tsx
"use client";

import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { ARTICLES, FAQ_CATEGORIES, SUPPORT_TEXT, type HelpArticle } from "@/config/support-page";

/** Lower-case, accent-free text, so "repasse" finds "Repasses" and "Recompra" finds "recompra". */
export function normalizeText(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/** Every word of the query must appear in at least one of the fields. */
export function matchesQuery(query: string, ...fields: string[]): boolean {
  const haystack = normalizeText(fields.join(" "));
  return normalizeText(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

const categoryName = (id: HelpArticle["category"]) => FAQ_CATEGORIES.find((c) => c.id === id)?.label ?? "";

type Props = { query: string; onQuery: (q: string) => void };

export function SupportSearch({ query, onQuery }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const searching = query.trim() !== "";
  const found = searching ? ARTICLES.filter((a) => matchesQuery(query, a.title, a.summary, a.body.join(" "))) : ARTICLES.slice(0, 3);
  const open = ARTICLES.find((a) => a.id === openId) ?? null;

  return (
    <Card container title="Como podemos ajudar?">
      <p className="-mt-1 mb-4 max-w-2xl text-[14.5px] text-ink-soft">Pesquise nas perguntas frequentes e nos artigos de ajuda, ou fale direto com a nossa equipe.</p>
      <SearchInput label="Buscar ajuda" value={query} onChange={(e) => onQuery(e.target.value)} placeholder={SUPPORT_TEXT.searchPlaceholder} />

      <h3 className="mt-5 mb-2.5 flex items-center gap-2 text-[15px] font-bold text-ink">
        <BookOpen className="size-[18px] text-brand" aria-hidden="true" />
        {searching ? `Artigos encontrados (${found.length})` : "Artigos populares"}
      </h3>
      {found.length === 0 ? (
        <p className="text-[14px] text-ink-soft">Nenhum artigo encontrado. Veja as perguntas frequentes abaixo ou abra um chamado.</p>
      ) : (
        <ul className="grid gap-3 @2xl:grid-cols-3">
          {found.map((a) => (
            <li key={a.id} className="min-w-0">
              <button
                type="button"
                onClick={() => setOpenId(a.id)}
                className="flex h-full w-full flex-col items-start gap-1 rounded-xl border border-line bg-card p-4 text-left transition hover:border-brand/50 hover:bg-brand-soft/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="text-[12px] font-bold tracking-wide text-brand uppercase">{categoryName(a.category)}</span>
                <span className="text-[15px] leading-snug font-bold text-ink">{a.title}</span>
                <span className="text-[13.5px] leading-snug text-ink-soft">{a.summary}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[13.5px] font-semibold text-brand">
                  Ler artigo <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={!!open}
        onClose={() => setOpenId(null)}
        title={open?.title ?? "Artigo"}
        description={open ? categoryName(open.category) : undefined}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpenId(null)}>
              Fechar
            </Button>
            {open && <ButtonLink href={open.href}>{open.hrefLabel}</ButtonLink>}
          </>
        }
      >
        {open && (
          <div className="grid gap-3 text-[15px] leading-relaxed text-ink-soft">
            {open.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        )}
      </Modal>
    </Card>
  );
}
