import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main id="conteudo" className="mx-auto w-full max-w-3xl p-4 lg:p-6">
      <div className="card p-5">
        <p role="status" className="flex items-center justify-center gap-3 py-10 text-[15px] text-ink-soft">
          <LoaderCircle className="size-5 animate-spin text-brand" aria-hidden="true" />
          Carregando seu pedido…
        </p>
      </div>
    </main>
  );
}
