// components/sections/ContractClauses.tsx
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { clauses } from "@/config/contract-page";

const ITEMS: AccordionItem[] = clauses.map((c) => ({ id: c.id, question: c.title, answer: c.body }));

/** Main clauses of the contract, one open at a time. */
export function ContractClauses() {
  return (
    <div>
      <p className="mb-1 text-[14px] text-ink-soft">Resumo das cláusulas principais. O texto completo e vinculante está no PDF do contrato.</p>
      <Accordion items={ITEMS} />
    </div>
  );
}
