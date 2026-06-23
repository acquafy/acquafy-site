"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/artigos-data";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  closeLabel: string;
  articleCount: (n: number) => string;
  readArticle: string;
  viewKnowledgeBase: string;
}> = {
  pt: {
    closeLabel:       "Fechar",
    articleCount:     (n) => `${n} artigos nesta categoria`,
    readArticle:      "Ler artigo",
    viewKnowledgeBase:"Ver Base de Conhecimento",
  },
  en: {
    closeLabel:       "Close",
    articleCount:     (n) => `${n} article${n !== 1 ? "s" : ""} in this category`,
    readArticle:      "Read article",
    viewKnowledgeBase:"View Knowledge Base",
  },
  "en-gb": {
    closeLabel:       "Close",
    articleCount:     (n) => `${n} article${n !== 1 ? "s" : ""} in this category`,
    readArticle:      "Read article",
    viewKnowledgeBase:"View Knowledge Base",
  },
  es: {
    closeLabel:       "Cerrar",
    articleCount:     (n) => `${n} artículo${n !== 1 ? "s" : ""} en esta categoría`,
    readArticle:      "Leer artículo",
    viewKnowledgeBase:"Ver Base de Conocimiento",
  },
  fr: {
    closeLabel:       "Fermer",
    articleCount:     (n) => `${n} article${n !== 1 ? "s" : ""} dans cette catégorie`,
    readArticle:      "Lire l'article",
    viewKnowledgeBase:"Voir la Base de Connaissances",
  },
  de: {
    closeLabel:       "Schließen",
    articleCount:     (n) => `${n} Artikel in dieser Kategorie`,
    readArticle:      "Artikel lesen",
    viewKnowledgeBase:"Wissensdatenbank anzeigen",
  },
  it: {
    closeLabel:       "Chiudi",
    articleCount:     (n) => `${n} articolo${n !== 1 ? "i" : ""} in questa categoria`,
    readArticle:      "Leggi articolo",
    viewKnowledgeBase:"Visualizza la Knowledge Base",
  },
  zh: {
    closeLabel:       "关闭",
    articleCount:     (n) => `此分类中有 ${n} 篇文章`,
    readArticle:      "阅读文章",
    viewKnowledgeBase:"查看知识库",
  },
  ja: {
    closeLabel:       "閉じる",
    articleCount:     (n) => `このカテゴリには ${n} 件の記事があります`,
    readArticle:      "記事を読む",
    viewKnowledgeBase:"ナレッジベースを見る",
  },
  ko: {
    closeLabel:       "닫기",
    articleCount:     (n) => `이 카테고리에 ${n}개의 문서가 있습니다`,
    readArticle:      "문서 읽기",
    viewKnowledgeBase:"지식 베이스 보기",
  },
  sv: {
    closeLabel:       "Stäng",
    articleCount:     (n) => `${n} artikel${n !== 1 ? "ar" : ""} i denna kategori`,
    readArticle:      "Läs artikel",
    viewKnowledgeBase:"Visa kunskapsbas",
  },
  fi: {
    closeLabel:       "Sulje",
    articleCount:     (n) => `${n} artikkeli${n !== 1 ? "a" : ""} tässä kategoriassa`,
    readArticle:      "Lue artikkeli",
    viewKnowledgeBase:"Näytä tietopankki",
  },
  ru: {
    closeLabel:       "Закрыть",
    articleCount:     (n) => `${n} статей в этой категории`,
    readArticle:      "Читать статью",
    viewKnowledgeBase:"Открыть базу знаний",
  },
  ro: {
    closeLabel:       "Inchide",
    articleCount:     (n) => `${n} articol${n !== 1 ? "e" : ""} in aceasta categorie`,
    readArticle:      "Citeste articolul",
    viewKnowledgeBase:"Vezi baza de cunostinte",
  },
  he: {
    closeLabel:       "סגור",
    articleCount:     (n) => `${n} מאמרים בקטגוריה זו`,
    readArticle:      "קרא מאמר",
    viewKnowledgeBase:"צפה בבסיס הידע",
  },

  "pt-pt": {
    closeLabel:       "Fechar",
    articleCount:     (n) => `${n} artigo${n !== 1 ? "s" : ""} nesta categoria`,
    readArticle:      "Ler artigo",
    viewKnowledgeBase:"Ver Base de Conhecimento",
  },
};

const imgArrowBlue  = "/figma-assets/icon-arrow-blue-b.svg";
const imgArrowWhite = "/figma-assets/icon-arrow-white-solid.svg";

type Props = {
  slug: string | null;
  onClose: () => void;
};

export default function TopicPopup({ slug, onClose }: Props) {
  const { lang } = useLang();
  const t = T[lang];
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
            aria-label={t.closeLabel}
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
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#0233c3]">{t.readArticle}</span>
                  <FigmaIcon src={imgArrowBlue} size={8} aspectW={11.2} aspectH={8.84} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-[24px] py-[16px] border-t border-[#e8edf5] flex flex-wrap items-center justify-between gap-[12px]">
          <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#aaa]">
            {t.articleCount(cat.artigos.length)}
          </span>
          <Link
            href={`/artigos#${cat.slug}`}
            onClick={onClose}
            className="bg-[#0233c3] hover:bg-[#002ba8] transition-colors flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[8px] no-underline"
          >
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              {t.viewKnowledgeBase}
            </span>
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </Link>
        </div>
      </div>
    </div>
  );
}
