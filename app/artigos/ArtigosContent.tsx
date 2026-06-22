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
  "pt-pt": {
    breadcrumbBase: "Base de Conhecimento",
    breadcrumbArtigos: "Artigos",
    h1pre: "Artigos e", h1highlight: "Guias",
    subtitle: "Tutoriais, guias e respostas detalhadas organizados por tema para encontrar exatamente o que precisa.",
    searchPlaceholder: "Pesquisar artigos e guias…",
    clearSearch: "Limpar pesquisa",
    resultsFor: "resultados para", resultSg: "resultado", resultPl: "resultados", forWord: "para",
    noResultsTitle: "Nenhum artigo encontrado",
    noResultsSub: "Experimente termos diferentes ou explore as categorias abaixo.",
    seeAll: "Ver todos os artigos",
    readArticle: "Ler artigo", minRead: "min de leitura",
    articleCount: "artigos",
    catTitles: {
      "produtos": "Produtos",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "Media Network",
      "parceiros": "Parceiros",
      "faturamento": "Faturação",
      "instalacao-e-manutencao": "Instalação e Manutenção",
    },
    catDescs: {
      "produtos": "Especificações, guias de compra e funcionalidades dos purificadores Neo.",
      "app-ai-iot": "Configuração, utilização e recursos da aplicação Acquafy com IA e IoT.",
      "media-network": "Como utilizar o sistema de anúncios, QR Code e receita recorrente.",
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
  fr: {
    breadcrumbBase: "Base de Connaissance",
    breadcrumbArtigos: "Articles",
    h1pre: "Articles &", h1highlight: "Guides",
    subtitle: "Tutoriels, guides et réponses détaillées organisés par thème pour trouver exactement ce dont vous avez besoin.",
    searchPlaceholder: "Rechercher des articles et guides…",
    clearSearch: "Effacer la recherche",
    resultsFor: "résultats pour", resultSg: "résultat", resultPl: "résultats", forWord: "pour",
    noResultsTitle: "Aucun article trouvé",
    noResultsSub: "Essayez d'autres termes ou explorez les catégories ci-dessous.",
    seeAll: "Voir tous les articles",
    readArticle: "Lire l'article", minRead: "min de lecture",
    articleCount: "articles",
    catTitles: {
      "produtos": "Produits",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "Media Network",
      "parceiros": "Partenaires",
      "faturamento": "Facturation",
      "instalacao-e-manutencao": "Installation & Maintenance",
    },
    catDescs: {
      "produtos": "Spécifications, guides d'achat et fonctionnalités des purificateurs Neo.",
      "app-ai-iot": "Configuration, utilisation et fonctionnalités de l'application Acquafy avec IA et IoT.",
      "media-network": "Comment utiliser le système de publicités, QR Code et revenus récurrents.",
      "parceiros": "Guides pour les partenaires Silver, Gold et Platinum d'Acquafy.",
      "faturamento": "Factures, commissions, paiements et documentation fiscale.",
      "instalacao-e-manutencao": "Installation, nettoyage, remplacement des filtres et maintenance préventive.",
    },
  },
  de: {
    breadcrumbBase: "Wissensdatenbank",
    breadcrumbArtigos: "Artikel",
    h1pre: "Artikel &", h1highlight: "Leitfäden",
    subtitle: "Tutorials, Leitfäden und detaillierte Antworten nach Themen geordnet, damit Sie genau das Richtige finden.",
    searchPlaceholder: "Artikel und Leitfäden suchen…",
    clearSearch: "Suche zurücksetzen",
    resultsFor: "Ergebnisse für", resultSg: "Ergebnis", resultPl: "Ergebnisse", forWord: "für",
    noResultsTitle: "Keine Artikel gefunden",
    noResultsSub: "Versuchen Sie andere Begriffe oder entdecken Sie die Kategorien unten.",
    seeAll: "Alle Artikel ansehen",
    readArticle: "Artikel lesen", minRead: "Min. Lesezeit",
    articleCount: "Artikel",
    catTitles: {
      "produtos": "Produkte",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "Media Network",
      "parceiros": "Partner",
      "faturamento": "Abrechnung",
      "instalacao-e-manutencao": "Installation & Wartung",
    },
    catDescs: {
      "produtos": "Spezifikationen, Kaufratgeber und Funktionen der Neo-Purifier.",
      "app-ai-iot": "Einrichtung, Nutzung und Funktionen der Acquafy-App mit KI und IoT.",
      "media-network": "So nutzen Sie das Werbesystem, QR-Code und wiederkehrende Einnahmen.",
      "parceiros": "Leitfäden für Acquafy Silver, Gold und Platinum Partner.",
      "faturamento": "Rechnungen, Provisionen, Zahlungen und Steuerdokumentation.",
      "instalacao-e-manutencao": "Installation, Reinigung, Filterwechsel und vorbeugende Wartung.",
    },
  },
  it: {
    breadcrumbBase: "Knowledge Base",
    breadcrumbArtigos: "Articoli",
    h1pre: "Articoli e", h1highlight: "Guide",
    subtitle: "Tutorial, guide e risposte dettagliate organizzate per argomento per trovare esattamente ciò di cui hai bisogno.",
    searchPlaceholder: "Cerca articoli e guide…",
    clearSearch: "Cancella ricerca",
    resultsFor: "risultati per", resultSg: "risultato", resultPl: "risultati", forWord: "per",
    noResultsTitle: "Nessun articolo trovato",
    noResultsSub: "Prova termini diversi o esplora le categorie qui sotto.",
    seeAll: "Vedi tutti gli articoli",
    readArticle: "Leggi l'articolo", minRead: "min di lettura",
    articleCount: "articoli",
    catTitles: {
      "produtos": "Prodotti",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "Media Network",
      "parceiros": "Partner",
      "faturamento": "Fatturazione",
      "instalacao-e-manutencao": "Installazione & Manutenzione",
    },
    catDescs: {
      "produtos": "Specifiche, guide all'acquisto e funzionalità dei purificatori Neo.",
      "app-ai-iot": "Configurazione, utilizzo e funzionalità dell'app Acquafy con IA e IoT.",
      "media-network": "Come utilizzare il sistema di annunci, QR Code e ricavi ricorrenti.",
      "parceiros": "Guide per i partner Silver, Gold e Platinum di Acquafy.",
      "faturamento": "Fatture, commissioni, pagamenti e documentazione fiscale.",
      "instalacao-e-manutencao": "Installazione, pulizia, sostituzione filtri e manutenzione preventiva.",
    },
  },
  zh: {
    breadcrumbBase: "知识库",
    breadcrumbArtigos: "文章",
    h1pre: "文章与", h1highlight: "指南",
    subtitle: "按主题整理的教程、指南和详细解答，帮助您快速找到所需内容。",
    searchPlaceholder: "搜索文章和指南…",
    clearSearch: "清除搜索",
    resultsFor: "条结果，关键词", resultSg: "条结果", resultPl: "条结果", forWord: "关键词",
    noResultsTitle: "未找到相关文章",
    noResultsSub: "请尝试不同的关键词，或浏览下方分类。",
    seeAll: "查看全部文章",
    readArticle: "阅读文章", minRead: "分钟阅读",
    articleCount: "篇文章",
    catTitles: {
      "produtos": "产品",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "媒体网络",
      "parceiros": "合作伙伴",
      "faturamento": "账单",
      "instalacao-e-manutencao": "安装与维护",
    },
    catDescs: {
      "produtos": "Neo 净水机的规格、购买指南和功能介绍。",
      "app-ai-iot": "Acquafy App 的设置、使用及 AI 与 IoT 功能说明。",
      "media-network": "广告系统、二维码和经常性收入的使用方法。",
      "parceiros": "Acquafy Silver、Gold 和 Platinum 合作伙伴指南。",
      "faturamento": "发票、佣金、付款及税务文件。",
      "instalacao-e-manutencao": "安装、清洁、滤芯更换及预防性维护。",
    },
  },
  ja: {
    breadcrumbBase: "ナレッジベース",
    breadcrumbArtigos: "記事",
    h1pre: "記事と", h1highlight: "ガイド",
    subtitle: "テーマ別に整理されたチュートリアル、ガイド、詳細な回答で、必要な情報をすぐに見つけられます。",
    searchPlaceholder: "記事とガイドを検索…",
    clearSearch: "検索をクリア",
    resultsFor: "件の結果", resultSg: "件の結果", resultPl: "件の結果", forWord: "の検索結果",
    noResultsTitle: "記事が見つかりませんでした",
    noResultsSub: "別のキーワードを試すか、下のカテゴリを探してみてください。",
    seeAll: "すべての記事を見る",
    readArticle: "記事を読む", minRead: "分で読了",
    articleCount: "件の記事",
    catTitles: {
      "produtos": "製品",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "メディアネットワーク",
      "parceiros": "パートナー",
      "faturamento": "請求",
      "instalacao-e-manutencao": "設置とメンテナンス",
    },
    catDescs: {
      "produtos": "Neo 浄水器のスペック、購入ガイドおよび機能。",
      "app-ai-iot": "Acquafy アプリの設定、使い方、AI・IoT 機能の詳細。",
      "media-network": "広告システム、QR コード、継続収益の活用方法。",
      "parceiros": "Acquafy Silver、Gold、Platinum パートナー向けガイド。",
      "faturamento": "請求書、コミッション、支払い、税務書類。",
      "instalacao-e-manutencao": "設置、清掃、フィルター交換、予防保守。",
    },
  },
  ko: {
    breadcrumbBase: "지식 베이스",
    breadcrumbArtigos: "문서",
    h1pre: "문서 및", h1highlight: "가이드",
    subtitle: "주제별로 정리된 튜토리얼, 가이드, 상세 답변으로 필요한 정보를 빠르게 찾을 수 있습니다.",
    searchPlaceholder: "문서 및 가이드 검색…",
    clearSearch: "검색 초기화",
    resultsFor: "결과", resultSg: "건", resultPl: "건", forWord: "에 대한",
    noResultsTitle: "문서를 찾을 수 없습니다",
    noResultsSub: "다른 검색어를 시도하거나 아래 카테고리를 탐색해 보세요.",
    seeAll: "모든 문서 보기",
    readArticle: "문서 읽기", minRead: "분 소요",
    articleCount: "건",
    catTitles: {
      "produtos": "제품",
      "app-ai-iot": "App + AI + IoT",
      "media-network": "미디어 네트워크",
      "parceiros": "파트너",
      "faturamento": "청구",
      "instalacao-e-manutencao": "설치 및 유지보수",
    },
    catDescs: {
      "produtos": "Neo 정수기의 사양, 구매 가이드 및 기능 설명.",
      "app-ai-iot": "Acquafy 앱 설정, 사용법 및 AI·IoT 기능 안내.",
      "media-network": "광고 시스템, QR 코드 및 반복 수익 활용 방법.",
      "parceiros": "Acquafy Silver, Gold, Platinum 파트너 가이드.",
      "faturamento": "청구서, 커미션, 결제 및 세금 문서.",
      "instalacao-e-manutencao": "설치, 청소, 필터 교체 및 예방 정비.",
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
