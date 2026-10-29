// components/sections/HomeQuickActions.tsx
import { ActionTile } from "@/components/ui/ActionTile";
import { quickActions } from "@/config/home-page";

export function HomeQuickActions() {
  return (
    <section aria-labelledby="home-quick-title">
      <h2 id="home-quick-title" className="mb-3 text-[18px] font-extrabold tracking-tight text-ink">
        Ações rápidas
      </h2>
      <ul className="grid grid-cols-1 gap-3 @xl:grid-cols-2 @4xl:grid-cols-4">
        {quickActions.map((a) => (
          <li key={a.id} className="flex">
            <ActionTile icon={a.icon} tone={a.tone} title={a.title} description={a.description} href={a.href} download={a.download} className="w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
