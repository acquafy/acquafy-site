"use client";

import { useRef, useState, useCallback } from "react";
import type { CheckinFamily } from "@/lib/checkin-products";
import { formatBRL } from "@/lib/products";

type Props = { family: CheckinFamily };

export default function CheckinProduct({ family }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);

  const activeVariant = family.variants[activeVariantIdx];
  const accent = family.isPremium ? "#9f3df5" : "#0233c3";
  const accentGrad = family.isPremium
    ? "linear-gradient(135deg, #0233c3, #9f3df5)"
    : "linear-gradient(135deg, #0233c3, #0569ff)";

  /* ── Scroll → scene index ─────────────────────────────────────────────── */
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || family.scenes.length === 0) return;
    const { scrollTop } = scrollRef.current;
    let idx = 0;
    for (let i = 0; i < family.scenes.length; i++) {
      if (scrollTop >= family.scenes[i].minScroll) idx = i;
    }
    setActiveSceneIdx(idx);
  }, [family.scenes]);

  /* ── Left image ───────────────────────────────────────────────────────── */
  const leftImg =
    family.scenes.length > 0
      ? family.scenes[activeSceneIdx].img
      : activeVariant.img;

  return (
    <div className="flex w-full h-screen overflow-hidden pt-[80px]">

      {/* ── LEFT: Sticky image ──────────────────────────────────────────── */}
      <div className="flex-1 relative bg-[#f6f9fe] flex items-center justify-center overflow-hidden">
        {family.scenes.length > 0 ? (
          family.scenes.map((scene, i) => (
            <img
              key={i}
              src={scene.img}
              alt=""
              className={`absolute inset-0 w-full h-full object-contain p-[60px] transition-opacity duration-500 ${
                i === activeSceneIdx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <img
            key={activeVariant.id}
            src={leftImg}
            alt={activeVariant.name}
            className="w-full h-full object-contain p-[60px]"
          />
        )}
      </div>

      {/* ── RIGHT: Scrollable panel ─────────────────────────────────────── */}
      <div className="w-[480px] xl:w-[520px] flex flex-col border-l border-[#e8ecf4] bg-white">

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto"
        >
          <div className="px-[40px] pt-[40px] pb-[8px] flex flex-col gap-[32px]">

            {/* ── Product header ─────────────────────────────────────── */}
            <div className="flex flex-col gap-[4px]">
              <h1
                className="font-['Avenir_LT_Pro:95_Black'] text-[36px] leading-[1.1]"
                style={{ color: "#1f2e91" }}
              >
                {family.title}
              </h1>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#6b7280]">
                {family.subtitle}
              </p>
            </div>

            {/* ── Variant selector ───────────────────────────────────── */}
            {family.variants.length > 1 && (
              <div className="flex flex-col gap-[10px]">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] uppercase tracking-[0.1em] text-[#aab2bc]">
                  Modelo
                </p>
                <div className="flex flex-col gap-[6px]">
                  {family.variants.map((variant, i) => {
                    const isActive = i === activeVariantIdx;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setActiveVariantIdx(i)}
                        className="flex items-center justify-between px-[16px] py-[14px] rounded-[12px] transition-all text-left"
                        style={{
                          background: isActive
                            ? family.isPremium
                              ? "#f5eeff"
                              : "#eef2ff"
                            : "#f6f9fe",
                          border: `1.5px solid ${isActive ? accent : "transparent"}`,
                        }}
                      >
                        <div className="flex flex-col gap-[2px]">
                          <span
                            className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px]"
                            style={{ color: isActive ? accent : "#1f2e91" }}
                          >
                            {variant.name}
                          </span>
                          <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280]">
                            {variant.subLabel}
                          </span>
                        </div>
                        <span
                          className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] shrink-0 ml-[16px]"
                          style={{ color: isActive ? accent : "#9ca3af" }}
                        >
                          {formatBRL(variant.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Ficha Técnica (placeholder rows) ───────────────────── */}
            <div className="flex flex-col gap-[14px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#1f2e91]">
                Ficha Técnica
              </p>
              <div className="flex flex-col divide-y divide-[#e8ecf4]">
                {([
                  ["Tipo", "—"],
                  ["Altura", "—"],
                  ["Largura", "—"],
                  ["Profundidade", "—"],
                  ["Peso", "—"],
                  ["Temperatura", "—"],
                  ["Qtd. de Filtros", "—"],
                  ["Durabilidade dos Filtros", "—"],
                ] as [string, string][]).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-[10px]">
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#6b7280]">
                      {key}
                    </span>
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Garantias ──────────────────────────────────────────── */}
            <div className="flex flex-col gap-[10px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#1f2e91]">
                Garantias
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#6b7280] leading-[1.6]">
                1 ano de garantia de fábrica contra defeitos de fabricação.
              </p>
            </div>

            {/* ── Frete ──────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[10px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#1f2e91]">
                Frete
              </p>
              <div className="flex gap-[8px]">
                <input
                  type="text"
                  placeholder="CEP"
                  maxLength={9}
                  className="flex-1 h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none focus:ring-2 transition-all"
                  style={{ "--tw-ring-color": accent } as React.CSSProperties}
                />
                <button
                  className="h-[44px] px-[20px] rounded-[10px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white shrink-0 transition-opacity hover:opacity-90"
                  style={{ background: accentGrad }}
                >
                  Calcular
                </button>
              </div>
            </div>

            {/* ── Order form ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#1f2e91]">
                Seus dados
              </p>
              <div className="flex flex-col gap-[10px]">
                {([
                  { id: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome" },
                  { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                  { id: "tel", label: "Telefone / WhatsApp", type: "tel", placeholder: "(00) 00000-0000" },
                ] as { id: string; label: string; type: string; placeholder: string }[]).map((f) => (
                  <div key={f.id} className="flex flex-col gap-[6px]">
                    <label
                      htmlFor={`checkin-${f.id}`}
                      className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280]"
                    >
                      {f.label}
                    </label>
                    <input
                      id={`checkin-${f.id}`}
                      type={f.type}
                      placeholder={f.placeholder}
                      className="h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none focus:ring-2 transition-all"
                      style={{ "--tw-ring-color": accent } as React.CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom spacer */}
            <div className="h-[12px]" />
          </div>
        </div>

        {/* ── Sticky bottom: price + CTA ─────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-[#e8ecf4] bg-white px-[40px] py-[20px] flex items-center gap-[16px]">
          <div className="flex-1 flex flex-col gap-[2px] min-w-0">
            <span className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] uppercase tracking-[0.06em] text-[#aab2bc] truncate">
              {family.variants.length > 1 ? activeVariant.name : family.title}
            </span>
            <span
              className="font-['Avenir_LT_Pro:95_Black'] text-[24px] leading-none"
              style={{
                background: accentGrad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {formatBRL(activeVariant.price)}
            </span>
          </div>
          <button
            className="h-[48px] px-[32px] rounded-[12px] font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ background: accentGrad }}
          >
            Encomendar
          </button>
        </div>
      </div>
    </div>
  );
}
