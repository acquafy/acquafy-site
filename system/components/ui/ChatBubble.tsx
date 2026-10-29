// components/ui/ChatBubble.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChatBubbleProps = {
  /**"me" is the investor (right, brand colour);"them" is the team (left, light). */
  from: "me" | "them";
  author: string;
  /** Already formatted ("14:32","26/10/2026"). */
  time: string;
  children: ReactNode;
};

/** One message of a conversation (live chat, ticket thread). The author and time are read by screen readers too. */
export function ChatBubble({ from, author, time, children }: ChatBubbleProps) {
  const mine = from === "me";
  return (
    <li className={cn("flex flex-col gap-1", mine ? "items-end" : "items-start")}>
      <p className="px-1 text-[12.5px] text-ink-mute">
        <span className="font-semibold text-ink-soft">{author}</span> · <span className="tabular">{time}</span>
      </p>
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-4 py-2.5 text-[14.5px] leading-relaxed [overflow-wrap:anywhere] whitespace-pre-wrap",
          mine ? "rounded-br-md bg-brand-gradient text-white" : "rounded-bl-md bg-canvas text-ink",
        )}
      >
        {children}
      </div>
    </li>
  );
}
