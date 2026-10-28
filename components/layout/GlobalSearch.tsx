// components/layout/GlobalSearch.tsx
"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SearchEntry } from "@/lib/portal/search-index";

const MAX_RESULTS = 8;

/** Lower-case, accent-free text so "extrato","Extrato" and "éxtrato" all match. */
function fold(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

type Indexed = SearchEntry & { haystack: string; folded: string };

function score(entry: Indexed, query: string, words: string[]): number {
  if (!words.every((w) => entry.haystack.includes(w))) return -1;
  let s = 0;
  if (entry.folded.startsWith(query)) s += 4;
  else if (entry.folded.includes(query)) s += 3;
  s += words.filter((w) => entry.folded.includes(w)).length;
  return s;
}

/**
 * Top-bar search in the Interfy site's style: outlined pill, magnifier on the right (turns into "clear" while
 * typing) and a results card under it. Press "/" or Ctrl/⌘+K anywhere to focus; ↑ ↓ move, Enter opens, Esc clears.
 */
export function GlobalSearch({ entries, className }: { entries: SearchEntry[]; className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();

  const indexed = useMemo<Indexed[]>(() => entries.map((e) => ({ ...e, folded: fold(e.title), haystack: fold(`${e.title} ${e.description} ${e.category}`) })), [entries]);

  const normalized = fold(query.trim());
  const results = useMemo(() => {
    const words = normalized.split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return indexed
      .map((e) => ({ e, s: score(e, normalized, words) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.e);
  }, [indexed, normalized]);

  const visible = results.slice(0, MAX_RESULTS);
  const showPanel = open && normalized.length > 0;
  const activeIndex = Math.min(active, Math.max(visible.length - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
      if ((e.key === "/" && !typing && !e.ctrlKey && !e.metaKey) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        input.current?.focus();
        input.current?.select();
        setOpen(true);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const clear = () => {
    setQuery("");
    setActive(0);
    input.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && visible.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (Math.min(i, visible.length - 1) + 1) % visible.length);
    } else if (e.key === "ArrowUp" && visible.length) {
      e.preventDefault();
      setActive((i) => (Math.min(i, visible.length - 1) - 1 + visible.length) % visible.length);
    } else if (e.key === "Enter" && showPanel && visible[activeIndex]) {
      e.preventDefault();
      wrapper.current?.querySelector<HTMLAnchorElement>(`[data-index="${activeIndex}"]`)?.click();
    } else if (e.key === "Escape") {
      if (query) setQuery("");
      else input.current?.blur();
      setOpen(false);
    }
  };

  return (
    <div ref={wrapper} role="search" className={cn("relative w-full max-w-[18.75rem]", className)}>
      <input
        ref={input}
        type="search"
        role="combobox"
        aria-label="Pesquisar no portal"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-activedescendant={showPanel && visible[activeIndex] ? `${listId}-${activeIndex}` : undefined}
        aria-autocomplete="list"
        autoComplete="off"
        value={query}
        placeholder="Pesquisar no portal…"
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="h-[2.375rem] w-full rounded-full border border-ink-mute/40 bg-card pr-10 pl-4 text-sm font-bold text-ink placeholder:font-semibold placeholder:text-ink-mute focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />
      {query ? (
        <button
          type="button"
          onClick={clear}
          aria-label="Limpar pesquisa"
          className="absolute top-1/2 right-3.5 grid size-5 -translate-y-1/2 place-items-center rounded-full text-ink-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : (
        <Search className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-mute" aria-hidden="true" />
      )}

      {showPanel && (
        <div className="absolute top-full right-0 z-50 mt-3 flex w-[min(21.25rem,calc(100vw-2rem))] flex-col gap-3 rounded-xl border border-line bg-card p-4">
          <p className="text-xs font-bold tracking-wider text-ink-mute uppercase" aria-live="polite">
            {results.length} {results.length === 1 ? "resultado" : "resultados"}
          </p>
          {results.length === 0 ? (
            <p className="text-sm font-medium text-ink-soft">Nada encontrado. Tente outro termo, como “extrato”, “contrato” ou o número de série.</p>
          ) : (
            <ul id={listId} role="listbox" aria-label="Resultados da pesquisa" className="flex max-h-[22rem] flex-col gap-2 overflow-y-auto py-1 pr-1">
              {visible.map((r, i) => (
                <li key={r.id} id={`${listId}-${i}`} role="option" aria-selected={i === activeIndex}>
                  <Link
                    href={r.href}
                    data-index={i}
                    tabIndex={-1}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                      input.current?.blur();
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={cn("flex w-full flex-col gap-0.5 rounded-lg border p-3 text-left transition-colors", i === activeIndex ? "border-brand bg-brand-soft/50" : "border-line bg-canvas/60")}
                  >
                    <span className="text-xs font-bold text-brand">{r.category}</span>
                    <span className="text-sm font-bold text-ink">{r.title}</span>
                    <span className="line-clamp-2 text-[13px] leading-snug text-ink-soft">{r.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {results.length > visible.length && (
            <p className="text-xs text-ink-mute">
              Mostrando {visible.length} de {results.length}. Refine a pesquisa para ver os demais.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
