"use client";

import Link from "next/link";
import FigmaIcon from "@/components/FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";
import { ARTIGOS_I18N, CATEGORIAS_I18N, type LangNonPt } from "@/lib/artigos-i18n";
import type { ArtigoData, CategoriaData, ContentBlock } from "@/lib/artigos-data";

const imgArrowBlue = "/figma-assets/icon-arrow-blue-b.svg";

// ── UI string translations ─────────────────────────────────────────────────
const T: Record<Lang, {
  baseConhecimento: string;
  artigos: string;
  minLeitura: string;
  nestaCategoria: string;
  artigosPopulares: string;
  outrosArtigos: string;
  verTodos: string;
}> = {
  pt:      { baseConhecimento: "Base de Conhecimento", artigos: "Artigos",   minLeitura: "min de leitura",  nestaCategoria: "Nesta categoria",       artigosPopulares: "Artigos populares",    outrosArtigos: "Outros artigos em", verTodos: "Ver todos"     },
  "pt-pt": { baseConhecimento: "Base de Conhecimento", artigos: "Artigos",   minLeitura: "min de leitura",  nestaCategoria: "Nesta categoria",       artigosPopulares: "Artigos populares",    outrosArtigos: "Outros artigos em", verTodos: "Ver todos"     },
  en:      { baseConhecimento: "Knowledge Base",        artigos: "Articles",  minLeitura: "min read",        nestaCategoria: "In this category",      artigosPopulares: "Popular articles",     outrosArtigos: "Other articles in", verTodos: "View all"      },
  es:      { baseConhecimento: "Base de Conocimiento",  artigos: "Artículos", minLeitura: "min de lectura",  nestaCategoria: "En esta categoría",     artigosPopulares: "Artículos populares",  outrosArtigos: "Otros artículos en",verTodos: "Ver todos"     },
  fr:      { baseConhecimento: "Base de Connaissances", artigos: "Articles",  minLeitura: "min de lecture",  nestaCategoria: "Dans cette catégorie",  artigosPopulares: "Articles populaires",  outrosArtigos: "Autres articles en",verTodos: "Voir tout"     },
  de:      { baseConhecimento: "Wissensdatenbank",      artigos: "Artikel",   minLeitura: "Min Lesezeit",    nestaCategoria: "In dieser Kategorie",   artigosPopulares: "Beliebte Artikel",     outrosArtigos: "Andere Artikel in", verTodos: "Alle anzeigen" },
  it:      { baseConhecimento: "Base di Conoscenza",    artigos: "Articoli",  minLeitura: "min di lettura",  nestaCategoria: "In questa categoria",   artigosPopulares: "Articoli popolari",    outrosArtigos: "Altri articoli in", verTodos: "Vedi tutti"    },
  zh:      { baseConhecimento: "知识库",                 artigos: "文章",      minLeitura: "分钟阅读",         nestaCategoria: "本类别中",               artigosPopulares: "热门文章",             outrosArtigos: "更多文章：",         verTodos: "查看全部"      },
  ja:      { baseConhecimento: "ナレッジベース",          artigos: "記事",      minLeitura: "分で読める",       nestaCategoria: "このカテゴリの記事",      artigosPopulares: "人気記事",             outrosArtigos: "他の記事：",          verTodos: "すべて見る"    },
  ko:      { baseConhecimento: "지식 베이스",             artigos: "기사",      minLeitura: "분 읽기",          nestaCategoria: "이 카테고리의 글",       artigosPopulares: "인기 기사",            outrosArtigos: "다른 기사：",         verTodos: "모두 보기"     },
};

// ── Content block renderer ────────────────────────────────────────────────
function RenderBlock({ block, cor }: { block: ContentBlock; cor: string }) {
  switch (block.type) {
    case "p":
      return (
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[28px] text-[#444]">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <div className="flex items-start gap-[12px] mt-[8px]">
          <div className="mt-[5px] shrink-0 w-[4px] h-[20px] rounded-full" style={{ backgroundColor: cor }} />
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91]">
            {block.text}
          </h2>
        </div>
      );
    case "h3":
      return (
        <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[22px] text-[#1f2e91] mt-[4px]">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="flex flex-col gap-[10px] list-none m-0 p-0 pl-[4px]">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-[12px] items-start">
              <span className="mt-[9px] shrink-0 size-[6px] rounded-full" style={{ backgroundColor: cor }} />
              <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[24px] text-[#444]">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="flex flex-col gap-[10px] list-none m-0 p-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-[12px] items-start">
              <span className="shrink-0 font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[24px] w-[20px] text-right" style={{ color: cor }}>
                {i + 1}.
              </span>
              <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[24px] text-[#444]">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <div className="flex flex-col gap-0">
          {block.items.map((step, i) => (
            <div key={i} className="flex gap-[16px] items-start">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="size-[34px] rounded-full flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-white shadow-sm"
                  style={{ backgroundColor: cor }}
                >
                  {i + 1}
                </div>
                {i < block.items.length - 1 && (
                  <div className="w-[2px] flex-1 min-h-[24px] opacity-20 my-[4px]" style={{ backgroundColor: cor }} />
                )}
              </div>
              <div className={`flex flex-col gap-[4px] flex-1 pt-[5px] ${i < block.items.length - 1 ? "pb-[20px]" : ""}`}>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-[20px] text-[#1f2e91]">{step.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[22px] text-[#666]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "tip":
      return (
        <div
          className="flex gap-[14px] items-start p-[18px] rounded-[12px] border-l-4"
          style={{ backgroundColor: cor + "0d", borderColor: cor }}
        >
          <div className="shrink-0 mt-[1px] size-[22px] rounded-full flex items-center justify-center" style={{ backgroundColor: cor + "20" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 5v4M6 3.5v.5" stroke={cor} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[22px]" style={{ color: cor }}>
            {block.text}
          </p>
        </div>
      );
    case "warning":
      return (
        <div className="flex gap-[14px] items-start p-[18px] rounded-[12px] bg-[#fffbf0] border-l-4 border-[#f59e0b]">
          <div className="shrink-0 mt-[1px] size-[22px] rounded-full flex items-center justify-center bg-[#fef3c7]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1.5L11 10.5H1L6 1.5Z" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M6 5v2.5M6 9v.5" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[22px] text-[#92400e]">
            {block.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

// ── Props ─────────────────────────────────────────────────────────────────
type Props = {
  artigo: ArtigoData;
  cat: CategoriaData;
  relacionados: ArtigoData[];
  popularArticles: { artigo: ArtigoData; cat: CategoriaData }[];
};

// ── Component ─────────────────────────────────────────────────────────────
export default function ArtigoPageContent({ artigo, cat, relacionados, popularArticles }: Props) {
  const { lang } = useLang();
  const ui = T[lang];

  // Resolve translated article content (fall back to PT base)
  const tArtigo = lang !== "pt" ? (ARTIGOS_I18N[artigo.slug]?.[lang as LangNonPt] ?? null) : null;
  const titulo  = tArtigo?.titulo  ?? artigo.titulo;
  const tags    = tArtigo?.tags    ?? artigo.tags;
  const resumo  = tArtigo?.resumo  ?? artigo.resumo;
  const conteudo = tArtigo?.conteudo ?? artigo.conteudo;

  // Resolve translated category name
  const tCat = lang !== "pt" ? (CATEGORIAS_I18N[cat.slug]?.[lang as LangNonPt] ?? null) : null;
  const catTitulo = tCat?.titulo ?? cat.titulo;

  // Helper: resolve a related article's title
  function relTitulo(a: ArtigoData) {
    if (lang === "pt") return a.titulo;
    return ARTIGOS_I18N[a.slug]?.[lang as LangNonPt]?.titulo ?? a.titulo;
  }

  return (
    <>
      {/* ── Header do artigo ─────────────────────────────────────────── */}
      <section className="bg-[#1f2e91] relative overflow-hidden w-full px-[20px] py-[40px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[160px] right-[-80px] w-[520px] h-[520px] rounded-full opacity-[0.18]"
            style={{ background: `radial-gradient(circle, ${cat.cor} 0%, transparent 70%)` }} />
          <div className="absolute bottom-[-100px] -left-[100px] w-[360px] h-[360px] rounded-full opacity-[0.10]"
            style={{ background: `radial-gradient(circle, ${cat.cor} 0%, transparent 70%)` }} />
          <div className="absolute top-[50%] left-[40%] w-[200px] h-[200px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col gap-[22px]">

            {/* Breadcrumb */}
            <nav className="flex flex-wrap gap-[6px] items-center">
              <Link href="/artigos" className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-white/40 hover:text-white/70 transition-colors no-underline">
                {ui.artigos}
              </Link>
              <span className="text-white/25 text-[12px]">/</span>
              <Link href={`/artigos#${cat.slug}`} className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-white/70 hover:text-white/90 transition-colors no-underline">
                {catTitulo}
              </Link>
              <span className="text-white/25 text-[12px]">/</span>
              <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-white/30 truncate max-w-[200px]">
                {titulo}
              </span>
            </nav>

            {/* Category badge */}
            <div className="flex items-center gap-[10px]">
              <div className="flex items-center justify-center shrink-0 size-[42px] rounded-[12px]" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                <FigmaIcon src={cat.icon} size={20} aspectW={cat.aspectW} aspectH={cat.aspectH} className="brightness-0 invert" />
              </div>
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[15px] px-[12px] py-[5px] rounded-full border text-white/90"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.20)" }}>
                {catTitulo}
              </span>
              <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-white/40">
                · {artigo.tempoLeitura} {ui.minLeitura}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[clamp(24px,2.6vw+12px,42px)] leading-[1.13] text-white">
              {titulo}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-[6px]">
              {tags.map((tag) => (
                <span key={tag} className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] leading-[14px] px-[10px] py-[4px] rounded-full text-white/90"
                  style={{ backgroundColor: "rgba(255,255,255,0.14)" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Resumo */}
            <div className="flex items-stretch">
              <div className="w-[4px] shrink-0 rounded-full mr-[16px]" style={{ backgroundColor: "rgba(255,255,255,0.40)" }} />
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[26px] text-white/75">
                {resumo}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Conteúdo + Sidebar esquerdo ──────────────────────────────── */}
      <section className="bg-white w-full">
        <div className="flex gap-[36px] max-w-[1400px] mx-auto w-full px-[20px] py-[56px] items-start">

          {/* Sidebar esquerdo sticky — 300px */}
          <aside className="hidden lg:flex flex-col gap-[20px] w-[300px] shrink-0 sticky top-[108px] self-start">

            {/* Nesta categoria */}
            <div className="border border-[#e8edf5] rounded-[14px] p-[18px] flex flex-col gap-[12px]">
              <div className="flex items-center gap-[8px] pb-[10px]" style={{ borderBottom: `1px solid ${cat.cor}20` }}>
                <div className="flex items-center justify-center shrink-0 size-[26px] rounded-[7px]" style={{ backgroundColor: cat.corBg }}>
                  <FigmaIcon src={cat.icon} size={12} aspectW={cat.aspectW} aspectH={cat.aspectH} />
                </div>
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-[13px] tracking-[0.09em] uppercase" style={{ color: cat.cor }}>
                  {ui.nestaCategoria}
                </span>
              </div>
              <nav className="flex flex-col gap-[2px]">
                {cat.artigos.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/artigos/${cat.slug}/${a.slug}`}
                    className={`block text-[12px] leading-[16px] px-[8px] py-[6px] rounded-[7px] transition-colors no-underline ${
                      a.slug === artigo.slug
                        ? "font-['Avenir_LT_Pro:85_Heavy'] bg-[#f0f4ff]"
                        : "font-['Avenir_LT_Pro:55_Roman'] text-[#666] hover:bg-[#f6f9fe] hover:text-[#0233c3]"
                    }`}
                    style={a.slug === artigo.slug ? { color: cat.cor } : undefined}
                  >
                    {relTitulo(a)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Artigos populares */}
            <div className="flex flex-col gap-[10px]">
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-[13px] text-[#aaa] uppercase tracking-[0.09em] px-[2px]">
                {ui.artigosPopulares}
              </h3>
              {popularArticles.map(({ artigo: a, cat: c }) => {
                const tPopCat = lang !== "pt" ? (CATEGORIAS_I18N[c.slug]?.[lang as LangNonPt] ?? null) : null;
                return (
                  <Link
                    key={`${c.slug}/${a.slug}`}
                    href={`/artigos/${c.slug}/${a.slug}`}
                    className="group bg-[#f6f9fe] hover:bg-[#edf2fd] flex gap-[16px] items-center p-[16px] rounded-[16px] no-underline transition-colors"
                  >
                    <div className="flex items-center justify-center shrink-0 size-[52px] rounded-[12px]" style={{ backgroundColor: c.cor }}>
                      <FigmaIcon src={c.icon} size={24} aspectW={c.aspectW} aspectH={c.aspectH} className="brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[6px] flex-1 min-w-0">
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[18px] text-[#1f2e91] group-hover:text-[#0233c3] transition-colors">
                        {relTitulo(a)}
                      </span>
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[15px] text-[#888]">
                        {tPopCat?.titulo ?? c.titulo} · {a.tempoLeitura} {ui.minLeitura}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </aside>

          {/* Conteúdo principal */}
          <div className="flex flex-col gap-[22px] flex-1 min-w-0">
            {conteudo.map((block, i) => (
              <RenderBlock key={i} block={block} cor={cat.cor} />
            ))}
          </div>

        </div>
      </section>

      {/* ── Artigos relacionados — visível apenas sem sidebar (< lg) ──── */}
      {relacionados.length > 0 && (
        <section className="lg:hidden bg-[#f6f9fe] flex flex-col items-center px-[20px] py-[56px] w-full">
          <div className="flex flex-col gap-[28px] max-w-[860px] w-full">

            <div className="flex items-center justify-between flex-wrap gap-[12px]">
              <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[24px] text-[#1f2e91]">
                {ui.outrosArtigos}{" "}
                <span style={{ color: cat.cor }}>{catTitulo}</span>
              </h2>
              <Link href={`/artigos#${cat.slug}`} className="flex gap-[5px] items-center no-underline group">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3] group-hover:underline">{ui.verTodos}</span>
                <FigmaIcon src={imgArrowBlue} size={8} aspectW={11.2} aspectH={8.84} />
              </Link>
            </div>

            <div className="flex flex-col gap-[10px]">
              {relacionados.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/artigos/${cat.slug}/${rel.slug}`}
                  className="group bg-white hover:bg-white border border-[#e8edf5] hover:border-[#c5d4f0] hover:shadow-[0_4px_14px_0_rgba(2,51,195,0.08)] transition-all duration-200 flex gap-[14px] items-center p-[16px] rounded-[12px] no-underline overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity rounded-l-[12px]"
                    style={{ backgroundColor: cat.cor }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[20px] text-[#333] group-hover:text-[#0233c3] transition-colors truncate">
                      {relTitulo(rel)}
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#aaa] mt-[2px]">
                      {rel.tempoLeitura} {ui.minLeitura}
                    </p>
                  </div>
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} className="shrink-0 opacity-30 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}
    </>
  );
}
