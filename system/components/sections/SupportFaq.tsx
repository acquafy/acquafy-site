// components/sections/SupportFaq.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchX, X } from "lucide-react";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { TabPanel, Tabs, type TabItem } from "@/components/ui/Tabs";
import { FAQ, FAQ_CATEGORIES, SUPPORT_TEXT, type FaqCategory, type FaqItem } from "@/config/support-page";
import { matchesQuery } from "./SupportSearch";

type Props = { query: string; onClearQuery: () => void; onOpenTicket: (subject: string) => void };

function toAccordion(items: FaqItem[]): AccordionItem[] {
  return items.map((f) => ({
    id: f.id,
    question: f.question,
    answer: (
      <>
        <p>{f.answer}</p>
        {f.link && (
          <Link href={f.link.href} className="mt-2 inline-block font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand">
            {f.link.label} →
          </Link>
        )}
      </>
    ),
  }));
}

export function SupportFaq({ query, onClearQuery, onOpenTicket }: Props) {
  const [category, setCategory] = useState<FaqCategory>("payouts");
  const searching = query.trim() !== "";
  const results = searching ? FAQ.filter((f) => matchesQuery(query, f.question, f.answer)) : [];

  const tabs: TabItem<FaqCategory>[] = FAQ_CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: FAQ.filter((f) => f.category === c.id).length }));

  return (
    <Card container title="Perguntas frequentes">
      {!searching && (
        <>
          <Tabs items={tabs} value={category} onChange={setCategory} label="Categorias de perguntas frequentes" idPrefix="faq" className="mb-2" />
          <TabPanel idPrefix="faq" value={category}>
            <Accordion key={category} items={toAccordion(FAQ.filter((f) => f.category === category))} />
          </TabPanel>
        </>
      )}

      {searching && (
        <div>
          <div className="mb-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="text-[14.5px] text-ink-soft" aria-live="polite">
              {results.length} {results.length === 1 ? "resultado" : "resultados"} para <strong className="text-ink">“{query.trim()}”</strong>
            </p>
            <Button variant="ghost" size="sm" onClick={onClearQuery}>
              <X className="size-4" aria-hidden="true" />
              Limpar busca
            </Button>
          </div>
          {results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={SUPPORT_TEXT.emptySearchTitle}
              description={SUPPORT_TEXT.emptySearchDescription}
              action={<Button onClick={() => onOpenTicket(query.trim())}>Abrir chamado</Button>}
            />
          ) : (
            FAQ_CATEGORIES.map((c) => {
              const inCategory = results.filter((f) => f.category === c.id);
              if (inCategory.length === 0) return null;
              return (
                <section key={c.id} aria-label={c.label} className="mt-2">
                  <h3 className="mt-3 text-[12.5px] font-bold tracking-wide text-brand uppercase">{c.label}</h3>
                  <Accordion items={toAccordion(inCategory)} />
                </section>
              );
            })
          )}
        </div>
      )}
    </Card>
  );
}
