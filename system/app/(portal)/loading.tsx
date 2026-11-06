/** Skeleton of a portal screen (title, a row of figures, a list) shown while the server renders the page. */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid gap-4">
      <span className="sr-only">Carregando…</span>
      <div aria-hidden="true" className="grid gap-2 pt-1">
        <div className="h-8 w-56 max-w-full animate-pulse rounded-lg bg-brand-soft" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded bg-brand-soft/70" />
      </div>
      <div aria-hidden="true" className="grid gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3">
        {[0, 1, 2].map((n) => (
          <div key={n} className="card h-24 animate-pulse bg-brand-soft/40" />
        ))}
      </div>
      <div aria-hidden="true" className="card grid gap-3 p-5">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="h-10 animate-pulse rounded-lg bg-brand-soft/50" />
        ))}
      </div>
    </div>
  );
}
