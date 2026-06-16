/**
 * SlideDot — componente de paginação / indicador de slide
 *
 * Estados (Figma node 3124:5669):
 *   ATIVO   → círculo azul preenchido (não interativo)
 *   INATIVO → círculo cinza; transiciona para HOVER ao passar o mouse
 *   HOVER   → anel transparente 24×24px (inset-[-50%] sobre dot 12×12)
 *
 * O HOVER é implementado via Tailwind group-hover — zero JS, zero useState.
 * O anel se expande 6px além do dot em todos os lados (visualmente 24×24).
 */

// ── Assets (SVG, 12×12 viewBox) ────────────────────────────────────────────
const imgAtivo   = "/figma-assets/icon-ativos.svg";
const imgHover   = "/figma-assets/icon-hover.svg";
const imgInativo = "/figma-assets/icon-inativo.svg";

// ── DotAtivo — estado ativo, não interativo ─────────────────────────────────
export function DotAtivo({ className }: { className?: string }) {
  return (
    <div
      className={`relative shrink-0 ${className ?? ""}`}
      style={{ width: 12, height: 12 }}
    >
      <img
        alt="slide ativo"
        className="absolute block inset-0 max-w-none size-full"
        src={imgAtivo}
      />
    </div>
  );
}

// ── DotInativo — estado inativo + hover ring em CSS puro ────────────────────
export function DotInativo({
  onClick,
  "aria-label": ariaLabel = "ir para slide",
  className,
}: {
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`group relative shrink-0 cursor-pointer ${className ?? ""}`}
      style={{ width: 12, height: 12 }}
    >
      {/* INATIVO: visível por padrão, some no hover */}
      <img
        alt=""
        className="absolute block inset-0 max-w-none size-full
                   transition-opacity duration-150
                   opacity-100 group-hover:opacity-0"
        src={imgInativo}
      />

      {/* HOVER ring: 24×24 (inset -50% do dot 12×12 = -6px cada lado)
          invisível por padrão, aparece no hover                        */}
      <div
        className="absolute
                   transition-opacity duration-150
                   opacity-0 group-hover:opacity-100"
        style={{ inset: "-50%" }}
      >
        <img alt="" className="block max-w-none size-full" src={imgHover} />
      </div>
    </button>
  );
}
