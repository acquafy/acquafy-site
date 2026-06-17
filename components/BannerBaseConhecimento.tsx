"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import FigmaIcon from "./FigmaIcon";
import { useChatWidget } from "./ChatWidget";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrowWhite = "/figma-assets/icon-arrow-white-solid.svg";
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-c.svg";

// ── Translations ─────────────────────────────────────────────────────────────

const T: Record<Lang, {
  title: string;
  subtitle: string;
  description: string;
  placeholder: string;
  clearLabel: string;
  noResultPrefix: string;
  showing: string;
  of: string;
  results: string;
  for: string;
  openChat: string;
  talkExpert: string;
  viewArticles: string;
}> = {
  pt: {
    title:         "Bem vindo à Base de Conhecimento Acquafy",
    subtitle:      "Estamos aqui para ajudar.",
    description:   "Nossa equipe e recursos estão prontos para oferecer a melhor experiência com os produtos e soluções Acquafy. Encontre respostas, tutoriais e suporte especializado sempre que precisar.",
    placeholder:   "Buscar parceiros, vendas, produtos...",
    clearLabel:    "Limpar busca",
    noResultPrefix: "Nenhum resultado para",
    showing:       "Mostrando",
    of:            "de",
    results:       "resultados",
    for:           "para",
    openChat:      "Abrir chat",
    talkExpert:    "Fale com um especialista",
    viewArticles:  "Ver artigos",
  },
  en: {
    title:         "Welcome to the Acquafy Knowledge Base",
    subtitle:      "We are here to help.",
    description:   "Our team and resources are ready to provide the best experience with Acquafy products and solutions. Find answers, tutorials, and specialized support whenever you need.",
    placeholder:   "Search partners, sales, products...",
    clearLabel:    "Clear search",
    noResultPrefix: "No results for",
    showing:       "Showing",
    of:            "of",
    results:       "results",
    for:           "for",
    openChat:      "Open chat",
    talkExpert:    "Talk to a specialist",
    viewArticles:  "View articles",
  },
  es: {
    title:         "Bienvenido a la Base de Conocimiento Acquafy",
    subtitle:      "Estamos aquí para ayudar.",
    description:   "Nuestro equipo y recursos están listos para ofrecer la mejor experiencia con los productos y soluciones Acquafy. Encuentra respuestas, tutoriales y soporte especializado siempre que lo necesites.",
    placeholder:   "Buscar socios, ventas, productos...",
    clearLabel:    "Limpiar búsqueda",
    noResultPrefix: "Sin resultados para",
    showing:       "Mostrando",
    of:            "de",
    results:       "resultados",
    for:           "para",
    openChat:      "Abrir chat",
    talkExpert:    "Habla con un especialista",
    viewArticles:  "Ver artículos",
  },
};

// ── Search index ────────────────────────────────────────────────────────────

type Item = {
  titulo: string;
  tags: string[];
  categoria: string;
  cor: string;
  href: string;
};

const ITEMS: Item[] = [
  // Produtos
  { titulo: "Qual a diferença entre Linha Neo Essentials e Premium?",  tags: ["Linha Neo","Comparativo"],        categoria: "Produtos",               cor: "#0233c3", href: "/artigos/produtos/diferenca-essentials-e-premium"                          },
  { titulo: "Quais tipos de água o purificador Neo fornece?",           tags: ["Água","Filtração"],               categoria: "Produtos",               cor: "#0233c3", href: "/artigos/produtos/tipos-de-agua-que-o-neo-fornece"                          },
  { titulo: "Como verificar a garantia do meu produto?",               tags: ["Garantia","Registro"],            categoria: "Produtos",               cor: "#0233c3", href: "/artigos/produtos/como-verificar-garantia-do-produto"                       },
  { titulo: "O que é a tecnologia UV LED + UF no Neo?",                 tags: ["Tecnologia","Filtração"],         categoria: "Produtos",               cor: "#0233c3", href: "/artigos/produtos/tecnologia-uv-led-uf-no-neo"                              },
  { titulo: "Especificações técnicas do painel LED 10.1\" e 15.6\"",    tags: ["Especificações","Hardware"],      categoria: "Produtos",               cor: "#0233c3", href: "/artigos/produtos/especificacoes-painel-led-10-e-15"                        },
  { titulo: "Qual modelo escolher: Neo FIT, SMART H₂ ou ULTRA?",       tags: ["Comparativo","Guia"],             categoria: "Produtos",               cor: "#0233c3", href: "/artigos/produtos/qual-modelo-escolher-fit-smart-ultra"                     },
  // App + AI + IoT
  { titulo: "Como configurar o Wi-Fi no purificador Neo?",             tags: ["Wi-Fi","Configuração"],           categoria: "App + AI + IoT",         cor: "#0569ff", href: "/artigos/app-ai-iot/como-configurar-wifi-no-neo"                            },
  { titulo: "Como usar o aplicativo Acquafy no celular?",              tags: ["App","Tutorial"],                 categoria: "App + AI + IoT",         cor: "#0569ff", href: "/artigos/app-ai-iot/como-usar-aplicativo-acquafy"                           },
  { titulo: "O que é o suporte por IA 24/7?",                          tags: ["IA","Suporte"],                   categoria: "App + AI + IoT",         cor: "#0569ff", href: "/artigos/app-ai-iot/o-que-e-suporte-ia-24-7"                               },
  { titulo: "Como monitorar a qualidade da água pelo app?",            tags: ["IoT","Monitoramento"],            categoria: "App + AI + IoT",         cor: "#0569ff", href: "/artigos/app-ai-iot/como-monitorar-qualidade-da-agua"                       },
  { titulo: "Compatibilidade com iOS e Android",                       tags: ["App","Compatibilidade"],          categoria: "App + AI + IoT",         cor: "#0569ff", href: "/artigos/app-ai-iot/compatibilidade-ios-android"                           },
  { titulo: "Configuração do Bluetooth 5.3 para controle local",       tags: ["Bluetooth","Configuração"],       categoria: "App + AI + IoT",         cor: "#0569ff", href: "/artigos/app-ai-iot/configurar-bluetooth-5-3"                              },
  // Media Network
  { titulo: "Como funciona o sistema de anúncios na tela?",            tags: ["Anúncios","Receita"],             categoria: "Media Network",          cor: "#9f3df5", href: "/artigos/media-network/como-funciona-sistema-de-anuncios"                  },
  { titulo: "Como cadastrar uma campanha no Acquafy Media?",           tags: ["Campanha","Tutorial"],            categoria: "Media Network",          cor: "#9f3df5", href: "/artigos/media-network/como-cadastrar-campanha-acquafy-media"             },
  { titulo: "O que é o QR Code de campanha e como usar?",              tags: ["QR Code","Marketing"],            categoria: "Media Network",          cor: "#9f3df5", href: "/artigos/media-network/o-que-e-qr-code-de-campanha"                       },
  { titulo: "Como calcular a receita recorrente com Media?",           tags: ["Receita","Negócio"],              categoria: "Media Network",          cor: "#9f3df5", href: "/artigos/media-network/calcular-receita-recorrente-com-media"             },
  { titulo: "Formatos e dimensões aceitos para anúncios",              tags: ["Design","Especificações"],        categoria: "Media Network",          cor: "#9f3df5", href: "/artigos/media-network/formatos-e-dimensoes-para-anuncios"                },
  { titulo: "Relatórios de performance de campanha",                   tags: ["Analytics","Relatório"],          categoria: "Media Network",          cor: "#9f3df5", href: "/artigos/media-network/relatorios-de-performance-campanha"               },
  // Parceiros
  { titulo: "Como se tornar um parceiro Silver da Acquafy?",           tags: ["Silver","Cadastro"],              categoria: "Parceiros",              cor: "#1f2e91", href: "/artigos/parceiros/como-se-tornar-parceiro-silver"                         },
  { titulo: "Quais são os benefícios do plano Gold Partner?",          tags: ["Gold","Benefícios"],              categoria: "Parceiros",              cor: "#1f2e91", href: "/artigos/parceiros/beneficios-plano-gold-partner"                          },
  { titulo: "Modelo Platinum: distribuidor regional Acquafy",          tags: ["Platinum","Distribuição"],        categoria: "Parceiros",              cor: "#1f2e91", href: "/artigos/parceiros/modelo-platinum-distribuidor-regional"                  },
  { titulo: "Comissões por nível de parceria (20% a 70%)",             tags: ["Comissão","Financeiro"],          categoria: "Parceiros",              cor: "#1f2e91", href: "/artigos/parceiros/comissoes-por-nivel-de-parceria"                        },
  { titulo: "Materiais de apoio para vendas e treinamentos",           tags: ["Marketing","Treinamento"],        categoria: "Parceiros",              cor: "#1f2e91", href: "/artigos/parceiros/materiais-de-apoio-vendas-treinamentos"                },
  { titulo: "Como operar a rede Silver sendo um Gold Partner?",        tags: ["Gold","Rede"],                    categoria: "Parceiros",              cor: "#1f2e91", href: "/artigos/parceiros/operar-rede-silver-sendo-gold-partner"                  },
  // Faturamento
  { titulo: "Como emitir a segunda via de fatura?",                    tags: ["Fatura","Financeiro"],            categoria: "Faturamento",            cor: "#36ae5c", href: "/artigos/faturamento/como-emitir-segunda-via-de-fatura"                   },
  { titulo: "Prazo para recebimento de comissões",                     tags: ["Comissão","Pagamento"],           categoria: "Faturamento",            cor: "#36ae5c", href: "/artigos/faturamento/prazo-recebimento-comissoes"                         },
  { titulo: "Formas de pagamento aceitas pela Acquafy",                tags: ["Pagamento","Métodos"],            categoria: "Faturamento",            cor: "#36ae5c", href: "/artigos/faturamento/formas-de-pagamento-aceitas"                         },
  { titulo: "Como acompanhar o status do meu pedido?",                 tags: ["Pedido","Rastreamento"],          categoria: "Faturamento",            cor: "#36ae5c", href: "/artigos/faturamento/acompanhar-status-do-pedido"                         },
  { titulo: "Política de reembolso e cancelamento",                    tags: ["Reembolso","Política"],           categoria: "Faturamento",            cor: "#36ae5c", href: "/artigos/faturamento/politica-de-reembolso-e-cancelamento"                },
  { titulo: "Nota fiscal e documentação fiscal internacional",         tags: ["Fiscal","Internacional"],         categoria: "Faturamento",            cor: "#36ae5c", href: "/artigos/faturamento/nota-fiscal-documentacao-fiscal-internacional"       },
  // Instalação e Manutenção
  { titulo: "Passo a passo: instalação do purificador Neo",            tags: ["Instalação","Tutorial"],          categoria: "Instalação e Manutenção", cor: "#dfa727", href: "/artigos/instalacao-e-manutencao/instalacao-passo-a-passo-purificador-neo"      },
  { titulo: "Com que frequência trocar o filtro? (365 dias)",          tags: ["Filtro","Manutenção"],            categoria: "Instalação e Manutenção", cor: "#dfa727", href: "/artigos/instalacao-e-manutencao/frequencia-troca-filtro-365-dias"              },
  { titulo: "Como realizar a limpeza preventiva?",                     tags: ["Limpeza","Preventiva"],           categoria: "Instalação e Manutenção", cor: "#dfa727", href: "/artigos/instalacao-e-manutencao/como-realizar-limpeza-preventiva"             },
  { titulo: "Solução de problemas: purificador sem energia",           tags: ["Problema","Elétrico"],            categoria: "Instalação e Manutenção", cor: "#dfa727", href: "/artigos/instalacao-e-manutencao/solucao-problemas-purificador-sem-energia"     },
  { titulo: "Troca do filtro: reposição inteligente via app",          tags: ["Filtro","App"],                   categoria: "Instalação e Manutenção", cor: "#dfa727", href: "/artigos/instalacao-e-manutencao/troca-filtro-reposicao-inteligente-via-app"    },
  { titulo: "Manutenção do reservatório e componentes internos",       tags: ["Manutenção","Hardware"],          categoria: "Instalação e Manutenção", cor: "#dfa727", href: "/artigos/instalacao-e-manutencao/manutencao-reservatorio-componentes-internos" },
  // Perguntas Frequentes
  { titulo: "Qual a diferença entre Neo Essentials e Neo Premium?",    tags: ["FAQ","Comparativo"],              categoria: "Perguntas Frequentes",   cor: "#6b7280", href: "#faq" },
  { titulo: "Como baixar e configurar o aplicativo Acquafy?",          tags: ["FAQ","App"],                      categoria: "Perguntas Frequentes",   cor: "#6b7280", href: "#faq" },
  { titulo: "Com que frequência devo trocar o filtro?",                tags: ["FAQ","Filtro","Manutenção"],      categoria: "Perguntas Frequentes",   cor: "#6b7280", href: "#faq" },
  { titulo: "Como me tornar um parceiro Acquafy?",                     tags: ["FAQ","Parceiros"],                categoria: "Perguntas Frequentes",   cor: "#6b7280", href: "#faq" },
  { titulo: "O que é a Acquafy Media e como gera receita recorrente?", tags: ["FAQ","Media","Receita"],          categoria: "Perguntas Frequentes",   cor: "#6b7280", href: "#faq" },
  { titulo: "O purificador Neo funciona com água de poço?",            tags: ["FAQ","Instalação"],               categoria: "Perguntas Frequentes",   cor: "#6b7280", href: "#faq" },
  { titulo: "Qual o prazo de garantia dos produtos Acquafy?",          tags: ["FAQ","Garantia"],                 categoria: "Perguntas Frequentes",   cor: "#6b7280", href: "#faq" },
  { titulo: "Em quantos países a Acquafy opera?",                      tags: ["FAQ","Global","Expansão"],        categoria: "Perguntas Frequentes",   cor: "#6b7280", href: "#faq" },
];

const MAX_VISIBLE = 7;

// ── Normalização e sinônimos ─────────────────────────────────────────────────

// Remove acentos, subscripts, pontuação especial e padroniza abreviações
function nrm(text: string): string {
  return text
    .toLowerCase()
    // dígitos subscrito (₀–₉) → dígito normal
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, c => String(c.codePointAt(0)! - 0x2080))
    // abreviações comuns
    .replace(/wi-fi/g, "wifi")
    // grau e aspas tipográficas → espaço (para "10.1\"" encontrar "10.1")
    .replace(/[°"""]/g, " ")
    // remove acentos (NFD decompõe, depois remove combining marks)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Expande a query com sinônimos, para que termos alternativos também pontuem
const SYNONYMS: Array<[RegExp, string[]]> = [
  // H₂ / h2 / hidrogenada
  [/\bh2\b/,                       ["hidrogenada", "hidrogenado", "hydrogen"]],
  [/\bhidrogenad/,                  ["h2", "spark h2"]],
  // SPARK / gás
  [/\bspark\b/,                     ["gas", "com gas", "gasosa", "carbonatada"]],
  [/\b(gas|gasosa|carbonatada)\b/,  ["spark", "com gas"]],
  // Wi-Fi / wireless
  [/\bwifi\b/,                      ["wireless", "wi-fi", "internet", "rede", "configuracao"]],
  [/\bwireless\b/,                  ["wifi", "internet"]],
  // App / aplicativo / celular
  [/\bapp\b/,                       ["aplicativo", "celular", "smartphone", "mobile"]],
  [/\baplicativ/,                   ["app", "celular", "smartphone"]],
  [/\b(celular|smartphone|mobile)\b/, ["app", "aplicativo"]],
  // IA / AI / inteligência
  [/\b(ia|ai)\b/,                   ["inteligencia artificial", "inteligencia", "artificial"]],
  [/\binteligenci/,                 ["ia", "ai"]],
  // IoT / sensores
  [/\biot\b/,                       ["sensores", "conectividade", "internet das coisas", "telemetria"]],
  [/\bsensores?\b/,                 ["iot", "conectividade"]],
  // Filtro / filtragem / UF / manutenção
  [/\bfiltro\b/,                    ["filtragem", "uf", "purificacao", "manutencao", "troca"]],
  [/\bfiltragem\b/,                 ["filtro", "uf"]],
  [/\buf\b/,                        ["filtro", "filtragem", "ultrafiltracao"]],
  // Osmose Reversa / RO
  [/\bosmose\b/,                    ["reversa", "ro", "alcalina", "purificacao"]],
  [/\bro\b/,                        ["osmose", "osmose reversa"]],
  // Purificador / bebedouro / Neo
  [/\bpurificador\b/,               ["bebedouro", "neo", "filtro de agua"]],
  [/\bbebedouro\b/,                 ["purificador", "neo"]],
  // Parceiro / partner / distribuidor
  [/\bparceiro\b/,                  ["partner", "revendedor", "distribuidor", "silver", "gold", "platinum"]],
  [/\bpartner\b/,                   ["parceiro", "revendedor"]],
  [/\b(revendedor|distribuidor)\b/, ["parceiro", "partner"]],
  // Garantia / warranty
  [/\bgarantia\b/,                  ["warranty", "suporte", "assistencia"]],
  [/\bwarranty\b/,                  ["garantia"]],
  // Fatura / boleto / nota fiscal / cobrança
  [/\b(fatura|boleto|cobranca)\b/,  ["nota fiscal", "pagamento", "financeiro"]],
  [/\bnota fiscal\b/,               ["fatura", "boleto", "cobranca"]],
  // Comissão / receita / ganhos
  [/\bcomissao\b/,                  ["receita", "ganhos", "renda", "pagamento"]],
  [/\b(receita|ganhos|renda)\b/,    ["comissao", "monetizacao"]],
  // Suporte / atendimento / chamado
  [/\b(suporte|atendimento|chamado)\b/, ["suporte", "atendimento", "chamado", "ajuda", "contato"]],
  // Instalação / setup
  [/\binstalac/,                    ["setup", "configurar", "montar"]],
  [/\bsetup\b/,                     ["instalacao", "configuracao"]],
  // Monitoramento / status
  [/\b(monitorar|monitoramento)\b/, ["acompanhar", "status", "telemetria"]],
  // UV LED / ultravioleta
  [/\buv\b/,                        ["ultravioleta", "uv led", "desinfecao"]],
  [/\bultravioleta\b/,              ["uv", "uv led"]],
  // Anúncio / campanha / mídia
  [/\b(anuncio|anuncios)\b/,        ["campanha", "midia", "publicidade"]],
  [/\bcampanha\b/,                  ["anuncio", "anuncios", "midia"]],
  // QR Code
  [/\bqr\b/,                        ["qr code", "qrcode", "codigo"]],
  // Bluetooth
  [/\bbluetooth\b/,                 ["bt", "emparelhamento", "conexao local"]],
  [/\bbt\b/,                        ["bluetooth"]],
];

function expandQuery(q: string): string[] {
  const extra: string[] = [];
  for (const [pattern, synonyms] of SYNONYMS) {
    if (pattern.test(q)) extra.push(...synonyms);
  }
  return [q, ...extra];
}

function runSearch(query: string): Item[] {
  const q = nrm(query);
  if (q.length < 2) return [];
  const terms = expandQuery(q);

  return ITEMS
    .map(item => {
      const t    = nrm(item.titulo);
      const c    = nrm(item.categoria);
      const tags = nrm(item.tags.join(" "));
      let score  = 0;
      for (const term of terms) {
        if (t.startsWith(term))    score += 6;
        else if (t.includes(term)) score += 4;
        if (tags.includes(term))   score += 2;
        if (c.includes(term))      score += 1;
      }
      return { item, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.item);
}

// Destaca a ocorrência do query no texto original (com fallback normalizado)
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.toLowerCase().trim();
  if (!q) return <>{text}</>;
  // Tenta match direto primeiro
  let idx = text.toLowerCase().indexOf(q);
  let len = q.length;
  // Fallback: tenta match com texto normalizado (para H₂ ↔ H2, etc.)
  if (idx === -1) {
    const nText = nrm(text);
    const nQ    = nrm(query);
    idx = nText.indexOf(nQ);
    len = nQ.length;
  }
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-[#0233c3] font-['Avenir_LT_Pro:85_Heavy']">
        {text.slice(idx, idx + len)}
      </span>
      {text.slice(idx + len)}
    </>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function BannerBaseConhecimento() {
  const { openChat } = useChatWidget();
  const { lang } = useLang();
  const t = T[lang];

  const [query, setQuery]     = useState("");
  const [open, setOpen]       = useState(false);
  const [active, setActive]   = useState(-1);   // keyboard-selected index
  const containerRef          = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);

  const results = runSearch(query);
  const visible = results.slice(0, MAX_VISIBLE);
  const showPopup = open && query.length >= 2;

  // Close on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActive(-1);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
    setActive(-1);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showPopup) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(a => Math.min(a + 1, visible.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(a => Math.max(a - 1, -1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      const href = visible[active].href;
      if (href.startsWith("/")) {
        window.location.href = href;
      } else {
        window.location.hash = href;
      }
      setOpen(false);
      setActive(-1);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }, [showPopup, visible, active]);

  const handleSelect = useCallback((href: string) => {
    setOpen(false);
    setActive(-1);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    // anchor-only: smooth scroll with header offset
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    setOpen(false);
    setActive(-1);
    inputRef.current?.focus();
  }, []);

  return (
    <section className="bg-[#1f2e91] border-b border-[#0569ff] px-[20px] py-[40px] w-full lg:min-h-screen lg:flex lg:items-center">
      <div className="flex flex-col gap-[32px] items-center max-w-[1400px] mx-auto w-full">

        {/* Title */}
        <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[clamp(32px,3.7vw+16px,56px)] leading-[1.07] text-white text-center w-full">
          {t.title}
        </h1>

        {/* Subtitle */}
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white text-center w-full">
          {t.subtitle}
        </p>

        {/* Description */}
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-white text-center w-full max-w-[800px]">
          {t.description}
        </p>

        {/* Search wrapper — position:relative so the popup anchors here */}
        <div ref={containerRef} className="relative max-w-[800px] w-full">

          {/* Search bar */}
          <div className={`bg-white flex gap-[10px] items-center min-h-[60px] overflow-visible px-[20px] py-[16px] w-full transition-all duration-150
            ${showPopup
              ? "rounded-t-[12px] border border-b-0 border-[#0233c3] shadow-[0_0_0_3px_rgba(2,51,195,0.12)]"
              : "rounded-[12px] border border-[#cbd0d4]"
            }`}
          >
            <svg className="shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="8.5" cy="8.5" r="6.5" stroke={showPopup ? "#0233c3" : "#c8cfd8"} strokeWidth="2" />
              <path d="M13.5 13.5L17 17" stroke={showPopup ? "#0233c3" : "#c8cfd8"} strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={() => query.length >= 2 && setOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="flex-1 font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] placeholder:text-[#c8cfd8] outline-none bg-transparent min-w-0"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={handleClear}
                className="shrink-0 size-[22px] flex items-center justify-center rounded-full bg-[#e8edf5] hover:bg-[#d0d7e2] transition-colors text-[#666] text-[14px] leading-none"
                aria-label={t.clearLabel}
              >
                ×
              </button>
            )}
          </div>

          {/* Results popup */}
          {showPopup && (
            <div className="absolute left-0 right-0 top-full bg-white border border-t-0 border-[#0233c3] rounded-b-[12px] shadow-[0_12px_32px_rgba(2,51,195,0.14)] z-50 overflow-hidden">

              {results.length === 0 ? (
                <div className="flex flex-col gap-[6px] items-center justify-center py-[28px] px-[20px]">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="14" cy="14" r="9" stroke="#c8cfd8" strokeWidth="2" />
                    <path d="M21 21L28 28" stroke="#c8cfd8" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11 14h6M14 11v6" stroke="#c8cfd8" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#999] text-center">
                    {t.noResultPrefix} <strong className="font-['Avenir_LT_Pro:85_Heavy'] text-[#333]">"{query}"</strong>
                  </p>
                </div>
              ) : (
                <>
                  <ul className="list-none m-0 p-0 divide-y divide-[#f0f3f9]">
                    {visible.map((item, i) => (
                      <li key={i}>
                        <button
                          onMouseDown={(e) => { e.preventDefault(); handleSelect(item.href); }}
                          onMouseEnter={() => setActive(i)}
                          className={`flex gap-[12px] items-start w-full px-[20px] py-[12px] text-left transition-colors cursor-pointer
                            ${active === i ? "bg-[#f0f4ff]" : "bg-white hover:bg-[#f6f9fe]"}`}
                        >
                          {/* Color dot */}
                          <span
                            className="mt-[5px] shrink-0 size-[8px] rounded-full"
                            style={{ backgroundColor: item.cor }}
                          />
                          <div className="flex flex-col gap-[3px] flex-1 min-w-0">
                            <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#222] truncate">
                              <Highlight text={item.titulo} query={query} />
                            </span>
                            <div className="flex gap-[6px] items-center flex-wrap">
                              {/* Category pill */}
                              <span
                                className="font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-[13px] px-[6px] py-[2px] rounded-full"
                                style={{ color: item.cor, backgroundColor: item.cor + "18" }}
                              >
                                {item.categoria}
                              </span>
                              {/* Tags */}
                              {item.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="font-['Avenir_LT_Pro:55_Roman'] text-[10px] leading-[13px] text-[#999]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          {/* Arrow */}
                          <svg className="shrink-0 mt-[4px] opacity-30" width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5h6M5.5 2l3 3-3 3" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  {results.length > MAX_VISIBLE && (
                    <div className="border-t border-[#e8edf5] px-[20px] py-[10px]">
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#999] text-center">
                        {t.showing} {MAX_VISIBLE} {t.of}{" "}
                        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0233c3]">{results.length} {t.results}</span>
                        {" "}{t.for} <span className="text-[#333]">"{query}"</span>
                      </p>
                    </div>
                  )}
                </>
              )}

            </div>
          )}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-[16px] items-center justify-center w-full">
          <button onClick={openChat} className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#0569ff] transition-colors flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
            <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center leading-normal">
              {t.openChat}
            </span>
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </button>

          <a href="/contato" className="group bg-white border border-white hover:border-[#e2e8f0] hover:bg-[rgba(255,255,255,0.9)] active:bg-white transition-colors flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
            <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] flex-1 text-center leading-normal">
              {t.talkExpert}
            </span>
            <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
          </a>

          <a href="/artigos" className="group border-2 border-white hover:bg-white active:bg-[rgba(255,255,255,0.9)] transition-colors flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
            <span className="font-['Articulat_CF:Bold'] text-[16px] text-white group-hover:text-[#0233c3] transition-colors flex-1 text-center leading-normal">
              {t.viewArticles}
            </span>
            <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
              <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
              <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
