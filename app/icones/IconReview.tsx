"use client";
import { useEffect, useState } from "react";

export type Entry = { file: string; lucide: string | null; color: string; alias?: string | null };
type Mark = { ok?: boolean; optimize?: boolean; keep?: boolean; closed?: boolean };

const STORAGE_KEY = "icones-review-v1";
const SIMILAR_KEY = "icones-review-similar-v1";
const SYNC_KEY = "icones-review-sync-v1";
const DONE_OPEN_KEY = "icones-review-done-open-v1";

function label(name: string) {
  return /[.:(]/.test(name) ? name : `hugeicons/${name}`;
}

function Tile({ e, src, text, version, marked, onToggle }: { e: Entry; src: string; text: string; version: number; marked?: boolean; onToggle?: () => void }) {
  const box = "flex h-[64px] w-[64px] items-center justify-center rounded-[10px] bg-[#6f7d89]";
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${src}?v=${version}`} alt={`${text} ${e.file}`} className="h-[44px] w-[44px] object-contain" />
  );
  return (
    <div className="flex flex-col items-center gap-[6px]">
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={!!marked}
          title="Clique para pedir um ícone mais parecido com o original"
          className={`${box} cursor-pointer border-2 transition-colors hover:border-[#7c3aed]`}
          style={{ borderColor: marked ? "#7c3aed" : "transparent" }}
        >
          {img}
        </button>
      ) : (
        <div className={box}>{img}</div>
      )}
      <span className="text-[11px] leading-[13px]" style={{ color: marked ? "#7c3aed" : "#6b7280", fontWeight: marked ? 700 : 400 }}>
        {marked ? "mais parecido" : text}
      </span>
    </div>
  );
}

function Check({ checked, onChange, text, tone }: { checked: boolean; onChange: (v: boolean) => void; text: string; tone: string }) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-[6px] text-[12px] font-bold leading-[16px]" style={{ color: checked ? tone : "#6b7280" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-[16px] cursor-pointer" style={{ accentColor: tone }} />
      {text}
    </label>
  );
}

export default function IconReview({ groups, version }: { groups: [string, Entry[]][]; version: number }) {
  const [marks, setMarks] = useState<Record<string, Mark>>({});
  const [similar, setSimilar] = useState<Record<string, boolean>>({});
  const [doneOpen, setDoneOpen] = useState(false);
  const [syncOn, setSyncOn] = useState(false);
  const [syncState, setSyncState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMarks(JSON.parse(raw));
      const sim = localStorage.getItem(SIMILAR_KEY);
      if (sim) setSimilar(JSON.parse(sim));
      setSyncOn(localStorage.getItem(SYNC_KEY) === "1");
      setDoneOpen(localStorage.getItem(DONE_OPEN_KEY) === "1");
    } catch {
      /* storage can be unavailable; the page still works without it */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
      localStorage.setItem(SIMILAR_KEY, JSON.stringify(similar));
      localStorage.setItem(DONE_OPEN_KEY, doneOpen ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [marks, similar, doneOpen, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(SYNC_KEY, syncOn ? "1" : "0");
    } catch {
      /* ignore */
    }
    if (!syncOn) {
      setSyncState("idle");
      return;
    }
    setSyncState("saving");
    const t = setTimeout(async () => {
      const payload = {
        updatedAt: new Date().toISOString(),
        ok: groups.filter(([n]) => marks[n]?.ok).map(([n]) => label(n)),
        optimize: groups
          .filter(([n]) => marks[n]?.optimize)
          .map(([n, list]) => ({ icon: label(n), files: list.map((e) => e.file) })),
        keepOriginal: groups
          .filter(([n]) => marks[n]?.keep)
          .map(([n, list]) => ({ icon: label(n), files: list.map((e) => e.file) })),
        similar: groups.flatMap(([n, list]) => list.filter((e) => similar[e.file]).map((e) => ({ file: e.file, currentIcon: label(n) }))),
      };
      try {
        const res = await fetch("/api/icones-marks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        setSyncState(res.ok ? "saved" : "error");
      } catch {
        setSyncState("error");
      }
    }, 400);
    return () => clearTimeout(t);
  }, [syncOn, marks, similar, groups, ready]);

  const set = (name: string, patch: Mark) => setMarks((m) => ({ ...m, [name]: { ...m[name], ...patch } }));
  const okCount = groups.filter(([n]) => marks[n]?.ok).length;
  const optimizeNames = groups.filter(([n]) => marks[n]?.optimize).map(([n]) => n);
  const keepNames = groups.filter(([n]) => marks[n]?.keep).map(([n]) => n);
  const allClosed = groups.every(([n]) => marks[n]?.closed);
  const similarFiles = groups.flatMap(([n, list]) => list.filter((e) => similar[e.file]).map((e) => `${e.file}  (${label(n)})`));
  const toggleSimilar = (file: string) => setSimilar((m) => ({ ...m, [file]: !m[file] }));

  const copyOptimize = async () => {
    try {
      const parts: string[] = [];
      if (optimizeNames.length) parts.push("OTIMIZE:\n" + optimizeNames.map(label).join("\n"));
      if (keepNames.length) parts.push("MANTER ORIGINAL:\n" + keepNames.map(label).join("\n"));
      if (similarFiles.length) parts.push("BUSCAR MAIS PARECIDO COM O ORIGINAL:\n" + similarFiles.join("\n"));
      await navigator.clipboard.writeText(parts.join("\n\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard can be blocked */
    }
  };

  const isDone = (n: string) => !!(marks[n]?.ok || marks[n]?.optimize);
  const pending = groups.filter(([n]) => !isDone(n));
  const done = groups.filter(([n]) => isDone(n));

  const renderSection = ([name, list]: [string, Entry[]]) => {
      const m = marks[name] ?? {};
      const border = m.keep ? "#0284c7" : m.optimize ? "#ea580c" : m.ok ? "#16a34a" : "#e5e7eb";
      return (
        <section key={name} className="rounded-[14px] border p-[16px]" style={{ borderColor: border }}>
          <div className="flex flex-wrap items-center justify-between gap-[10px]">
            <h3 className="text-[16px] font-bold leading-[20px]" title="Ícone global: trocar este ícone troca todos os usos listados">
              {label(name)} <span className="font-normal text-[#6b7280]">· {list.length} {list.length === 1 ? "uso" : "usos"}</span>
            </h3>
            <div className="flex items-center gap-[16px]">
              <Check checked={!!m.ok} onChange={(v) => set(name, { ok: v })} text="OK" tone="#16a34a" />
              <Check checked={!!m.optimize} onChange={(v) => set(name, { optimize: v })} text="OTIMIZE" tone="#ea580c" />
              <Check checked={!!m.keep} onChange={(v) => set(name, { keep: v })} text="MANTER ORIGINAL" tone="#0284c7" />
              <button
                type="button"
                aria-expanded={!m.closed}
                aria-label={m.closed ? "Abrir bloco" : "Fechar bloco"}
                title={m.closed ? "Abrir bloco" : "Fechar bloco"}
                onClick={() => set(name, { closed: !m.closed })}
                className="flex size-[28px] cursor-pointer items-center justify-center rounded-[8px] border border-[#d1d5db] hover:bg-[#f3f4f6]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ transform: m.closed ? "rotate(180deg)" : "none" }}>
                  <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          {!m.closed && (
            <div className="mt-[12px] grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[14px]">
              {list.map((e) => (
                <div key={e.file} className="flex flex-col items-center gap-[6px]">
                  <div className="flex items-center gap-[10px]">
                    <Tile e={e} src={`/icon-audit/original/${e.file}`} text="antes" version={version} />
                    <Tile e={e} src={`/figma-assets/${e.alias ?? e.file}`} text="depois" version={version} marked={!!similar[e.file]} onToggle={() => toggleSimilar(e.file)} />
                  </div>
                  <span className="break-all text-center text-[11px] leading-[13px]">{e.file}</span>
                  <span className="text-[11px] leading-[13px] text-[#6b7280]">{e.color}</span>
                      {e.alias && <span className="break-all text-center text-[10px] leading-[12px] text-[#0284c7]">= {e.alias}</span>}
                </div>
              ))}
            </div>
          )}
        </section>
      );
  };

  return (
    <>
      <div className="mt-[12px] flex flex-wrap items-center gap-[12px] text-[13px] leading-[18px]">
        <span className="font-bold text-[#16a34a]">OK: {okCount}</span>
        <span className="font-bold text-[#ea580c]">OTIMIZE: {optimizeNames.length}</span>
        <span className="font-bold text-[#0284c7]">Manter original: {keepNames.length}</span>
        <span className="font-bold text-[#7c3aed]">Mais parecido: {similarFiles.length}</span>
        <span className="text-[#6b7280]">de {groups.length} ícones globais</span>
        <button
          type="button"
          onClick={() => setMarks((m) => Object.fromEntries(groups.map(([n]) => [n, { ...m[n], closed: !allClosed }])) as Record<string, Mark>)}
          className="cursor-pointer rounded-[8px] border border-[#d1d5db] px-[10px] py-[4px] text-[12px] font-bold hover:bg-[#f3f4f6]"
        >
          {allClosed ? "Abrir todos" : "Fechar todos"}
        </button>
        <button
          type="button"
          onClick={copyOptimize}
          disabled={!optimizeNames.length && !similarFiles.length && !keepNames.length}
          className="cursor-pointer rounded-[8px] border border-[#d1d5db] px-[10px] py-[4px] text-[12px] font-bold hover:bg-[#f3f4f6] disabled:cursor-default disabled:opacity-40"
        >
          {copied ? "Copiado" : "Copiar marcações"}
        </button>
      </div>

      <div className="mt-[16px] flex flex-col gap-[20px]">{pending.map(renderSection)}</div>

      {done.length > 0 && (
        <>
          <div className="mt-[40px] flex flex-wrap items-center gap-[12px]">
            <h2 className="text-[22px] font-bold leading-[28px]">
              Concluídos (OK ou OTIMIZE) <span className="font-normal text-[#6b7280]">· {done.length} {done.length === 1 ? "ícone global" : "ícones globais"}</span>
            </h2>
            <button
              type="button"
              aria-expanded={doneOpen}
              onClick={() => setDoneOpen((v) => !v)}
              className="cursor-pointer rounded-[8px] border border-[#d1d5db] px-[10px] py-[4px] text-[12px] font-bold hover:bg-[#f3f4f6]"
            >
              {doneOpen ? "Minimizar seção" : "Expandir seção"}
            </button>
            <button
              type="button"
              onClick={() => setMarks((m) => Object.fromEntries(groups.map(([n]) => [n, { ...m[n], closed: !allClosed }])) as Record<string, Mark>)}
              className="cursor-pointer rounded-[8px] border border-[#d1d5db] px-[10px] py-[4px] text-[12px] font-bold hover:bg-[#f3f4f6]"
            >
              {allClosed ? "Abrir todos" : "Fechar todos"}
            </button>
          </div>
          {doneOpen && <div className="mt-[16px] flex flex-col gap-[20px]">{done.map(renderSection)}</div>}
        </>
      )}

      <button
        type="button"
        onClick={() => setSyncOn((v) => !v)}
        aria-pressed={syncOn}
        title={syncOn ? "Sincronização ligada: as marcações são salvas no projeto a cada mudança. Clique para desligar." : "Clique para sincronizar as marcações com o projeto"}
        className="z-50 flex cursor-pointer items-center gap-[8px] rounded-full border px-[16px] py-[10px] text-[13px] font-bold leading-[16px] shadow-lg transition-colors"
        style={{
          position: "fixed",
          right: 20,
          bottom: 100,
          background: syncOn ? "#16a34a" : "#ffffff",
          color: syncOn ? "#ffffff" : "#1f2e91",
          borderColor: syncOn ? "#16a34a" : "#d1d5db",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={syncState === "saving" ? "animate-spin" : ""}>
          <path d="M21 12a9 9 0 0 0-15-6.7L3 8m0-5v5h5M3 12a9 9 0 0 0 15 6.7L21 16m0 5v-5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {!syncOn && "Sincronizar marcações"}
        {syncOn && syncState === "saving" && "Sincronizando…"}
        {syncOn && syncState === "saved" && "Sincronizado"}
        {syncOn && syncState === "error" && "Erro ao sincronizar"}
      </button>
    </>
  );
}
