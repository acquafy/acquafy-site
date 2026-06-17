"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FigmaIcon from "@/components/FigmaIcon";
import CtaBK from "@/components/CtaBK";
import { CATEGORIAS, type ArtigoData, type CategoriaData } from "@/lib/artigos-data";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrowBlue  = "/figma-assets/icon-arrow-blue-b.svg";
const imgArrowWhite = "/figma-assets/icon-arrow-white-solid.svg";

// ── Translations ──────────────────────────────────────────────────────────────
const T: Record<Lang, {
  breadcrumbBase: string;
  breadcrumbArtigos: string;
  h1pre: string; h1highlight: string;
  subtitle: string;
  searchPlaceholder: string;
  clearSearch: string;
  resultsFor: string; resultSg: string; resultPl: string; forWord: string;
  noResultsTitle: string; noResultsSub: string; seeAll: string;
  readArticle: string; minRead: string;
  articleCount: string;
  catTitles: Record<string, string>;
  catDescs: Record<string, string>;
}> = {
  pt: {
    breadcrumbBase: "Base de Conhecimento",
    breadcrumbArtigos: "Artigos",
    h1pre: "Artigos e", h1highlight: "Guias",
    subtitle: "Tutoriais, guias e respostas detalhadas organizados por tema para você encontrar exatamente o que precisa.",
    searchPlaceholder: "Buscar artigos e guias…",
    clearSearch: "Limpar busca",
    resultsFor: "resultados para", resultSg: "resultado", resultPl: "resultados", forWord: "para",
    noResultsTitle: "Nenhum artigo encontrado",
    noResultsSub: "Tente termos diferentes ou explore as categorias abaixo.",
    seeAll: "Ver todos os artigos",
    readArticle: "Ler artigo", minRead: "min de leitura",
    articleCount: "artigos",
    catTitles: {
      "produtos": "Produtos",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "Media Network",
      "parceiros": "Parceiros",
      "faturamento": "Faturamento",
      "instalacao-e-manutencao": "Instalação e Manutenção",
    },
    catDescs: {
      "produtos": "Especificações, guias de compra e funcionalidades dos purificadores Neo.",
      "app-ai-iot": "Configuração, uso e recursos do aplicativo Acquafy com IA e IoT.",
      "media-network": "Como usar o sistema de anúncios, QR Code e receita recorrente.",
      "parceiros": "Guias para parceiros Silver, Gold e Platinum da Acquafy.",
      "faturamento": "Faturas, comissões, pagamentos e documentação fiscal.",
      "instalacao-e-manutencao": "Instalação, limpeza, troca de filtros e manutenção preventiva.",
    },
  },
  en: {
    breadcrumbBase: "Knowledge Base",
    breadcrumbArtigos: "Articles",
    h1pre: "Articles &", h1highlight: "Guides",
    subtitle: "Tutorials, guides and detailed answers organized by topic so you can find exactly what you need.",
    searchPlaceholder: "Search articles and guides…",
    clearSearch: "Clear search",
    resultsFor: "results for", resultSg: "result", resultPl: "results", forWord: "for",
    noResultsTitle: "No articles found",
    noResultsSub: "Try different terms or explore the categories below.",
    seeAll: "See all articles",
    readArticle: "Read article", minRead: "min read",
    articleCount: "articles",
    catTitles: {
      "produtos": "Products",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "Media Network",
      "parceiros": "Partners",
      "faturamento": "Billing",
      "instalacao-e-manutencao": "Installation & Maintenance",
    },
    catDescs: {
      "produtos": "Specs, buying guides and features of Neo purifiers.",
      "app-ai-iot": "Setup, usage and features of the Acquafy app with AI and IoT.",
      "media-network": "How to use the ad system, QR Code and recurring revenue.",
      "parceiros": "Guides for Acquafy Silver, Gold and Platinum partners.",
      "faturamento": "Invoices, commissions, payments and tax documentation.",
      "instalacao-e-manutencao": "Installation, cleaning, filter replacement and preventive maintenance.",
    },
  },
  es: {
    breadcrumbBase: "Base de Conocimiento",
    breadcrumbArtigos: "Artículos",
    h1pre: "Artículos y", h1highlight: "Guías",
    subtitle: "Tutoriales, guías y respuestas detalladas organizadas por tema para que encuentres exactamente lo que necesitas.",
    searchPlaceholder: "Buscar artículos y guías…",
    clearSearch: "Borrar búsqueda",
    resultsFor: "resultados para", resultSg: "resultado", resultPl: "resultados", forWord: "para",
    noResultsTitle: "Ningún artículo encontrado",
    noResultsSub: "Prueba términos diferentes o explora las categorías a continuación.",
    seeAll: "Ver todos los artículos",
    readArticle: "Leer artículo", minRead: "min de lectura",
    articleCount: "artículos",
    catTitles: {
      "produtos": "Productos",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "Media Network",
      "parceiros": "Socios",
      "faturamento": "Facturación",
      "instalacao-e-manutencao": "Instalación y Mantenimiento",
    },
    catDescs: {
      "produtos": "Especificaciones, guías de compra y funcionalidades de los purificadores Neo.",
      "app-ai-iot": "Configuración, uso y recursos de la aplicación Acquafy con IA e IoT.",
      "media-network": "Cómo usar el sistema de anuncios, QR Code e ingresos recurrentes.",
      "parceiros": "Guías para socios Silver, Gold y Platinum de Acquafy.",
      "faturamento": "Facturas, comisiones, pagos y documentación fiscal.",
      "instalacao-e-manutencao": "Instalación, limpieza, cambio de filtros y mantenimiento preventivo.",
    },
  },
};

// ── search helpers ─────────────────────────────────────────────────────────────

function nrm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

type Hit = { artigo: ArtigoData; cat: CategoriaData; score: number };

function runSearch(query: string): Hit[] {
  const q = nrm(query.trim());
  if (q.length < 2) return [];
  const hits: Hit[] = [];
  for (const cat of CATEGORIAS) {
    for (const artigo of cat.artigos) {
      const t    = nrm(artigo.titulo);
      const tags = nrm(artigo.tags.join(" "));
      const res  = nrm(artigo.resumo);
      const c    = nrm(cat.titulo);
      let score  = 0;
      if (t.startsWith(q))    score += 8;
      else if (t.includes(q)) score += 5;
      if (tags.includes(q))   score += 3;
      if (c.includes(q))      score += 2;
      if (res.includes(q))    score += 1;
      if (score > 0) hits.push({ artigo, cat, score });
    }
  }
  return hits.sort((a, b) => b.score - a.score);
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.toLowerCase().trim();
  if (!q) return <>{text}</>;
  let idx = text.toLowerCase().indexOf(q);
  let len = q.length;
  if (idx === -1) {
    const ni = nrm(text).indexOf(nrm(q));
    if (ni === -1) return <>{text}</>;
    idx = ni; len = q.length;
  }
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#fff3b0] not-italic rounded-[2px] px-[1px] text-inherit">{text.slice(idx, idx + len)}</mark>
      {text.slice(idx + len)}
    </>
  );
}

// ── article card ───────────────────────────────────────────────────────────────

function ArticleCard({ artigo, cat, query, showCategory, readLabel = "Ler artigo", minReadLabel = "min de leitura", catLabel }: {
  artigo: ArtigoData;
  cat: CategoriaData;
  query?: string;
  showCategory?: boolean;
  readLabel?: string;
  minReadLabel?: string;
  catLabel?: string;
}) {
  return (
    <Link
      href={`/artigos/${cat.slug}/${artigo.slug}`}
      className="group relative bg-white hover:bg-[#f6f9fe] border border-[#e8edf5] hover:border-[#c5d4f0] hover:shadow-[0_8px_24px_0_rgba(2,51,195,0.10)] transition-all duration-200 flex flex-col gap-[14px] p-[20px] rounded-[14px] no-underline overflow-hidden"
    >
      {/* Category color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: `linear-gradient(90deg, ${cat.cor}, ${cat.cor}80)` }}
      />

      {showCategory && (
        <div className="flex items-center gap-[6px]">
          <div
            className="flex items-center justify-center shrink-0 size-[24px] rounded-[7px]"
            style={{ backgroundColor: cat.corBg }}
          >
            <FigmaIcon src={cat.icon} size={12} aspectW={cat.aspectW} aspectH={cat.aspectH} />
          </div>
          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] leading-[14px]" style={{ color: cat.cor }}>
            {catLabel ?? cat.titulo}
          </span>
        </div>
      )}

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

      <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-[21px] text-[#1f2e91] group-hover:text-[#0233c3] transition-colors flex-1">
        {query ? <Highlight text={artigo.titulo} query={query} /> : artigo.titulo}
      </h3>

      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#666]">
        {query ? <Highlight text={artigo.resumo} query={query} /> : artigo.resumo}
      </p>

      <div className="flex gap-[6px] items-center justify-between pt-[8px] border-t border-[#f0f4fb]">
        <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#aaa]">
          {artigo.tempoLeitura} {minReadLabel}
        </span>
        <div className="flex gap-[4px] items-center opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[15px] text-[#0233c3]">{readLabel}</span>
          <FigmaIcon src={imgArrowBlue} size={8} aspectW={11.2} aspectH={8.84} />
        </div>
      </div>
    </Link>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

export default function ArtigosContent() {
  const [query, setQuery] = useState("");
  const { lang } = useLang();
  const t = T[lang];
  const hits   = useMemo(() => runSearch(query), [query]);
  const active = query.trim().length >= 2;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#1f2e91] border-b border-[#0569ff]/40 relative overflow-hidden w-full px-[20px] py-[40px]">

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[120px] -right-[120px] w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #0569ff 0%, transparent 70%)" }} />
          <div className="absolute -bottom-[80px] -left-[80px] w-[300px] h-[300px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #9f3df5 0%, transparent 70%)" }} />
          <div className="absolute top-[40%] right-[15%] w-[180px] h-[180px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 flex flex-col gap-[24px] items-start max-w-[1400px] mx-auto w-full">

          {/* Eyebrow badge */}
          <div className="flex items-center gap-[8px] w-full">
            <Link
              href="/base-de-conhecimento"
              className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] leading-[14px] tracking-[0.08em] uppercase text-white/50 hover:text-white/80 transition-colors no-underline"
            >
              {t.breadcrumbBase}
            </Link>
            <span className="text-white/30 text-[11px]">/</span>
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] leading-[14px] tracking-[0.08em] uppercase text-[#0569ff]">
              {t.breadcrumbArtigos}
            </span>
          </div>

          <div className="flex flex-col gap-[14px] w-full">
            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[clamp(28px,3vw+14px,52px)] leading-[1.06] text-white w-full">
              {t.h1pre}{" "}
              <span style={{ background: "linear-gradient(90deg, #0569ff, #9f3df5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t.h1highlight}
              </span>
            </h1>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[17px] leading-[26px] text-white/70 w-full max-w-[620px]">
              {t.subtitle}
            </p>
          </div>

          {/* Search bar — estilo branco como o BannerBaseConhecimento */}
          <div className="relative max-w-[720px] w-full">
            <div className={`bg-white flex gap-[10px] items-center min-h-[58px] overflow-visible px-[20px] py-[14px] w-full transition-all duration-150 ${active ? "rounded-[14px] border-2 border-[#0233c3] shadow-[0_0_0_4px_rgba(2,51,195,0.12)]" : "rounded-[14px] border border-[#cbd0d4] shadow-[0_2px_12px_0_rgba(0,0,0,0.06)]"}`}>
              <svg className="shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="8.5" cy="8.5" r="6.5" stroke={active ? "#0233c3" : "#b8c3d0"} strokeWidth="1.8" />
                <path d="M13.5 13.5L17 17" stroke={active ? "#0233c3" : "#b8c3d0"} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                autoComplete="off"
                spellCheck={false}
                className="flex-1 font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[20px] text-[#1f2e91] placeholder:text-[#c0c8d4] outline-none bg-transparent min-w-0"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label={t.clearSearch}
                  className="shrink-0 size-[22px] flex items-center justify-center rounded-full bg-[#e8edf5] hover:bg-[#d0d7e2] transition-colors text-[#666] text-[15px] leading-none"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Category pills */}
          {!active && (
            <div className="flex flex-wrap gap-[8px] w-full mt-[4px]">
              {CATEGORIAS.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[15px] px-[14px] py-[8px] rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all no-underline whitespace-nowrap"
                >
                  {t.catTitles[cat.slug] ?? cat.titulo}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Conteúdo ─────────────────────────────────────────────────────── */}
      {active ? (
        /* ── Resultados de busca ─────────────────────────────────────── */
        <section className="bg-[#f6f9fe] flex flex-col items-center px-[20px] py-[48px] w-full min-h-[400px]">
          <div className="flex flex-col gap-[28px] max-w-[1400px] w-full">

            <div className="flex flex-wrap gap-[12px] items-center">
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555]">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#1f2e91]">{hits.length}</span>
                {" "}{hits.length === 1 ? t.resultSg : t.resultPl} {t.forWord}{" "}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0233c3]">&ldquo;{query}&rdquo;</span>
              </p>
              <button
                onClick={() => setQuery("")}
                className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#aaa] hover:text-[#0233c3] transition-colors underline"
              >
                {t.clearSearch}
              </button>
            </div>

            {hits.length === 0 ? (
              <div className="flex flex-col gap-[14px] items-center py-[56px] text-center">
                <div className="size-[64px] rounded-[20px] bg-white border border-[#e8edf5] flex items-center justify-center shadow-sm">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#c0c8d4" strokeWidth="1.8" />
                    <path d="M19 19l7 7" stroke="#c0c8d4" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M9 12h6M12 9v6" stroke="#d0d7e0" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#888]">
                  {t.noResultsTitle}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#aaa] max-w-[300px]">
                  {t.noResultsSub}
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-[8px] bg-[#0233c3] hover:bg-[#002ba8] transition-colors font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-white px-[22px] py-[10px] rounded-[8px]"
                >
                  {t.seeAll}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
                {hits.map(({ artigo, cat }) => (
                  <ArticleCard
                    key={`${cat.slug}/${artigo.slug}`}
                    artigo={artigo}
                    cat={cat}
                    query={query}
                    showCategory
                    readLabel={t.readArticle}
                    minReadLabel={t.minRead}
                    catLabel={t.catTitles[cat.slug]}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        /* ── Seções de categorias ────────────────────────────────────── */
        <section className="bg-white flex flex-col items-center px-[20px] py-[64px] w-full">
          <div className="flex flex-col gap-[80px] max-w-[1400px] w-full">
            {CATEGORIAS.map((cat) => (
              <div key={cat.slug} id={cat.slug} className="flex flex-col gap-[32px] scroll-mt-[88px]">

                {/* Cabeçalho da categoria */}
                <div className="flex flex-wrap gap-[16px] items-center justify-between pb-[24px]" style={{ borderBottom: `2px solid ${cat.cor}25` }}>
                  <div className="flex gap-[16px] items-center">
                    <div
                      className="flex items-center justify-center shrink-0 size-[54px] rounded-[16px]"
                      style={{ backgroundColor: cat.cor }}
                    >
                      <FigmaIcon src={cat.icon} size={27} aspectW={cat.aspectW} aspectH={cat.aspectH} className="brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[22px] leading-[28px]" style={{ color: cat.cor }}>
                        {t.catTitles[cat.slug] ?? cat.titulo}
                      </h2>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#777]">
                        {t.catDescs[cat.slug] ?? cat.descricao}
                      </p>
                    </div>
                  </div>
                  <span
                    className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] px-[10px] py-[4px] rounded-full border"
                    style={{ color: cat.cor, borderColor: cat.cor + "30", backgroundColor: cat.corBg }}
                  >
                    {cat.artigos.length} {t.articleCount}
                  </span>
                </div>

                {/* Grid de artigos */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
                  {cat.artigos.map((artigo) => (
                    <ArticleCard key={artigo.slug} artigo={artigo} cat={cat} readLabel={t.readArticle} minReadLabel={t.minRead} />
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBK />
    </main>
  );
}
