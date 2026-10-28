// components/sections/HomeHelp.tsx
import Link from "next/link";
import { CircleHelp, Mail, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HELP_CHANNELS, HOME_FAQ_IDS } from "@/config/home-page";
import { FAQ } from "@/config/support-page";

/** Three common questions and the two fastest ways to reach the team. */
export function HomeHelp() {
  const questions = HOME_FAQ_IDS.map((id) => FAQ.find((f) => f.id === id)).filter((f): f is (typeof FAQ)[number] => !!f);

  return (
    <Card title="Ajuda rápida" className="h-full">
      <ul className="divide-y divide-line">
        {questions.map((q) => (
          <li key={q.id}>
            <Link
              href="/suporte"
              className="group flex items-center gap-3 py-3 text-[14.5px] font-semibold text-ink hover:text-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
            >
              <CircleHelp className="size-5 shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
              <span className="min-w-0 flex-1">{q.question}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid gap-3 @sm:grid-cols-2">
        <ButtonLink href={HELP_CHANNELS.whatsapp.href} external size="sm">
          <MessageCircle className="size-4" aria-hidden="true" />
          {HELP_CHANNELS.whatsapp.label}
        </ButtonLink>
        <ButtonLink href={HELP_CHANNELS.email.href} external variant="outline" size="sm">
          <Mail className="size-4" aria-hidden="true" />
          {HELP_CHANNELS.email.label}
        </ButtonLink>
      </div>
    </Card>
  );
}
