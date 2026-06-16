"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/artigos-data";
import FigmaIcon from "./FigmaIcon";

const imgArrowBlue  = "/figma-assets/icon-arrow-blue-b.svg";
const imgArrowWhite = "/figma-assets/icon-arrow-white-solid.svg";

type Props = {
  slug: string | null;
  onClose: () => void;
};

export default function TopicPopup({ slug, onClose }: Props) {
  const cat = slug ? CATEGORIAS.find((c) => c.slug === slug) ?? null : null;

  useEffect(() => {
    if (!cat) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cat, onClose]);

  useEffect(() => {
    document.body.style.overflow = cat ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cat]);

  if (!cat) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-[20px] bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[900px] max-h-[88vh] flex flex-col overflow-hidden shadow-[0_24px_80px_0_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center gap-[16px] px-[24px] py-[20px] shrink-0"
          style={{ borderBottom: `2px solid ${cat.cor}20` }}
        >
          <div
            className="flex items-center justify-center shrink-0 size-[48px] rounded-[14px]"
            style={{ backgroundColor: cat.cor }}
          >
            <FigmaIcon
              src={cat.icon}
              size={24}
              aspectW={cat.aspectW}
              aspectH={cat.aspectH}
              className="brightness-0 invert"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2
              className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[26px]"
              style={{ color: cat.cor }}
            >
              {cat.titulo}
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#777]">
              {cat.descricao}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 size-[36px] flex items-center justify-center rounded-full bg-[#f6f9fe] hover:bg-[#e8edf5] transition-colors text-[#555] text-[22px] leading-none"
          >
            ×
          </button>
        </div>

        {/* Articles */}
        <div className="overflow-y-auto flex-1 p-[24px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            {cat.artigos.map((artigo) => (
              <Link
                key={artigo.slug}
                href={`/artigos/${cat.slug}/${artigo.slug}`}
                onClick={onClose}
                className="group border border-[#e8edf5] hover:border-[#c5d4f0] hover:bg-[#f6f9fe] hover:shadow-sm transition-all rounded-[12px] p-[16px] flex flex-col gap-[8px] no-underline"
              >
                <div className="flex flex-wrap gap-[5px]">
                  {artigo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-[13px] px-[8px] py-[3px] rounded-full"
                      style={{ color: cat.cor, backgroundColor: cat.corBg }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[20px] text-[#1f2e91] group-hover:text-[#0233c3] transition-colors flex-1">
                  {artigo.titulo}
                </h3>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#666]">
                  {artigo.resumo}
                </p>
                <div className="flex gap-[4px] items-center pt-[8px] border-t border-[#f0f4fb]">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#0233c3]">Ler artigo</span>
                  <FigmaIcon src={imgArrowBlue} size={8} aspectW={11.2} aspectH={8.84} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-[24px] py-[16px] border-t border-[#e8edf5] flex flex-wrap items-center justify-between gap-[12px]">
          <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#aaa]">
            {cat.artigos.length} artigos nesta categoria
          </span>
          <Link
            href={`/artigos#${cat.slug}`}
            onClick={onClose}
            className="bg-[#0233c3] hover:bg-[#002ba8] transition-colors flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[8px] no-underline"
          >
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              Ver Base de Conhecimento
            </span>
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </Link>
        </div>
      </div>
    </div>
  );
}
