"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="live-card">
      <h1>Não foi possível carregar os dados</h1>
      <p>
        Nenhuma informação de demonstração será exibida. Tente novamente em
        instantes.
      </p>
      <button className="live-button" onClick={reset}>
        Tentar novamente
      </button>
    </div>
  );
}
