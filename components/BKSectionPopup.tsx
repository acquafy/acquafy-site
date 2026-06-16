"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── types ────────────────────────────────────────────────────────────────────

type SectionId = "downloads" | "tutoriais-videos" | "faq" | "politicas-garantias";

type Props = { sectionId: string | null; onClose: () => void };

// ─── metadata ─────────────────────────────────────────────────────────────────

const META: Record<SectionId, { titulo: string; subtitulo: string; anchor: string }> = {
  "downloads": {
    titulo: "Downloads",
    subtitulo: "Manuais, guias, softwares e documentos disponíveis para download.",
    anchor: "#downloads",
  },
  "tutoriais-videos": {
    titulo: "Tutoriais e Vídeos",
    subtitulo: "Aprenda passo a passo com nossos tutoriais em vídeo.",
    anchor: "#tutoriais-videos",
  },
  "faq": {
    titulo: "Perguntas Frequentes",
    subtitulo: "Respostas rápidas para as dúvidas mais comuns sobre produtos e serviços Acquafy.",
    anchor: "#faq",
  },
  "politicas-garantias": {
    titulo: "Políticas e Garantias",
    subtitulo: "Transparência e clareza sobre seus direitos e as condições Acquafy.",
    anchor: "#politicas-garantias",
  },
};

const IDS = Object.keys(META) as SectionId[];
function isSectionId(id: string): id is SectionId { return IDS.includes(id as SectionId); }

// ─── Downloads ────────────────────────────────────────────────────────────────

const TIPO_BADGE: Record<string, { bg: string; color: string }> = {
  PDF: { bg: "#fee2e2", color: "#b91c1c" },
  ZIP: { bg: "#e0e7ff", color: "#4338ca" },
  APP: { bg: "#dcfce7", color: "#15803d" },
};

const DOWNLOADS = [
  {
    titulo: "Manuais", scroll: true,
    arquivos: [
      { nome: "Manual do Usuário — Neo UP",                 tipo: "PDF", tamanho: "7 MB"  },
      { nome: "Manual do Usuário — Neo FIT",                tipo: "PDF", tamanho: "8 MB"  },
      { nome: "Manual do Usuário — Neo SMART H₂",          tipo: "PDF", tamanho: "9 MB"  },
      { nome: "Manual do Usuário — Neo TOUCH",              tipo: "PDF", tamanho: "8 MB"  },
      { nome: "Manual do Usuário — Neo PLUS",               tipo: "PDF", tamanho: "9 MB"  },
      { nome: "Manual do Usuário — Neo ULTRA",              tipo: "PDF", tamanho: "10 MB" },
      { nome: "Manual do Usuário — Neo ULTRA SPARK",        tipo: "PDF", tamanho: "10 MB" },
      { nome: "Manual do Usuário — Neo ULTRA SPARK H₂",    tipo: "PDF", tamanho: "10 MB" },
      { nome: "Manual do Usuário — Neo MAX",                tipo: "PDF", tamanho: "11 MB" },
      { nome: "Manual do Usuário — Neo MAX SPARK",         tipo: "PDF", tamanho: "11 MB" },
      { nome: "Manual do Usuário — Neo MAX SPARK H₂",      tipo: "PDF", tamanho: "11 MB" },
      { nome: "Manual do Usuário — Neo INFINITY",           tipo: "PDF", tamanho: "12 MB" },
      { nome: "Manual do Usuário — Neo INFINITY SPARK",     tipo: "PDF", tamanho: "12 MB" },
      { nome: "Manual do Usuário — Neo INFINITY SPARK H₂", tipo: "PDF", tamanho: "12 MB" },
      { nome: "Manual do Usuário — Neo PRESTIGE",           tipo: "PDF", tamanho: "12 MB" },
      { nome: "Manual do Usuário — Neo PRESTIGE SPARK",     tipo: "PDF", tamanho: "12 MB" },
      { nome: "Manual do Usuário — Neo PRESTIGE SPARK H₂", tipo: "PDF", tamanho: "12 MB" },
      { nome: "Manual do Usuário — Neo PRIME",              tipo: "PDF", tamanho: "12 MB" },
      { nome: "Manual do Usuário — Neo PRIME SPARK",        tipo: "PDF", tamanho: "12 MB" },
      { nome: "Manual do Usuário — Neo PRIME SPARK H₂",    tipo: "PDF", tamanho: "12 MB" },
    ],
  },
  {
    titulo: "Guias Rápidos",
    arquivos: [
      { nome: "Guia de Instalação Rápida",       tipo: "PDF", tamanho: "2 MB" },
      { nome: "Guia de Manutenção e Limpeza",    tipo: "PDF", tamanho: "3 MB" },
      { nome: "Primeiros Passos — App Acquafy",  tipo: "PDF", tamanho: "4 MB" },
      { nome: "Guia do Parceiro Acquafy",        tipo: "PDF", tamanho: "5 MB" },
      { nome: "Guia de Troca de Filtros",        tipo: "PDF", tamanho: "2 MB" },
    ],
  },
  {
    titulo: "Softwares",
    arquivos: [
      { nome: "App Acquafy — iOS",     tipo: "APP", tamanho: "App Store"  },
      { nome: "App Acquafy — Android", tipo: "APP", tamanho: "Play Store" },
      { nome: "Firmware Neo v2.4.1",   tipo: "ZIP", tamanho: "15 MB"      },
    ],
  },
  {
    titulo: "Documentos",
    arquivos: [
      { nome: "Ficha Técnica — Linha Neo",         tipo: "PDF", tamanho: "3 MB"   },
      { nome: "Certificado de Conformidade",       tipo: "PDF", tamanho: "1 MB"   },
      { nome: "Contrato Modelo de Parceria",       tipo: "PDF", tamanho: "2 MB"   },
      { nome: "Política de Garantia Acquafy",      tipo: "PDF", tamanho: "1 MB"   },
      { nome: "Declaração de Conformidade ANATEL", tipo: "PDF", tamanho: "500 KB" },
    ],
  },
];

function IconDl() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v8M5.5 7.5L8 10l2.5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12v.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SectionDownloads() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
      {DOWNLOADS.map((cat) => (
        <div key={cat.titulo} className="border border-[#e8edf5] rounded-[12px] overflow-hidden">
          <div className="bg-[#f6f9fe] px-[16px] py-[12px] border-b border-[#e8edf5]">
            <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[18px] text-[#1f2e91]">
              {cat.titulo}
            </h3>
          </div>
          <ul className={`list-none m-0 p-0 divide-y divide-[#f0f3f9]${cat.scroll ? " max-h-[200px] overflow-y-auto" : ""}`}>
            {cat.arquivos.map((arq) => {
              const b = TIPO_BADGE[arq.tipo];
              return (
                <li key={arq.nome}>
                  <a
                    href="#"
                    className="group flex gap-[10px] items-center px-[16px] py-[11px] hover:bg-[#f6f9fe] transition-colors no-underline"
                  >
                    <span
                      className="shrink-0 font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-none px-[6px] py-[3px] rounded-[4px] w-[32px] text-center"
                      style={{ backgroundColor: b.bg, color: b.color }}
                    >
                      {arq.tipo}
                    </span>
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#333] group-hover:text-[#0233c3] transition-colors flex-1 min-w-0">
                      {arq.nome}
                    </span>
                    <span className="shrink-0 font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#999] whitespace-nowrap">
                      {arq.tamanho}
                    </span>
                    <div className="shrink-0 flex items-center justify-center size-[28px] rounded-[6px] bg-[#f0f4ff] group-hover:bg-[#0233c3] transition-colors text-[#0233c3] group-hover:text-white">
                      <IconDl />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Vídeos ───────────────────────────────────────────────────────────────────

const VIDEOS = [
  { titulo: "Como instalar o purificador Neo",          desc: "Passo a passo completo de instalação.",       categoria: "Instalação", duracao: "8 min"  },
  { titulo: "Primeiros passos com o app Acquafy",       desc: "Configure e conecte seu dispositivo ao app.", categoria: "App",        duracao: "5 min"  },
  { titulo: "Como trocar o filtro do purificador Neo",  desc: "Reposição simples e rápida do filtro.",       categoria: "Manutenção", duracao: "4 min"  },
  { titulo: "Acquafy Media: anuncie na tela",           desc: "Crie campanhas e monetize sua tela.",         categoria: "Media",      duracao: "10 min" },
  { titulo: "Parceria Acquafy: do Silver ao Platinum",  desc: "Como crescer na rede de parceiros Acquafy.",  categoria: "Parceria",   duracao: "12 min" },
  { titulo: "Tour completo pelo app e funcionalidades", desc: "Explore todos os recursos do ecossistema.",   categoria: "App",        duracao: "15 min" },
];

const CAT_COLORS: Record<string, string> = {
  "Instalação": "#dfa727",
  "App":        "#0569ff",
  "Manutenção": "#36ae5c",
  "Media":      "#9f3df5",
  "Parceria":   "#1f2e91",
};

function SectionVideos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      {VIDEOS.map((v) => {
        const c = CAT_COLORS[v.categoria] ?? "#0233c3";
        return (
          <div key={v.titulo} className="bg-white rounded-[12px] overflow-hidden border border-[#e8edf5] flex flex-col">
            <div className="w-full bg-[#1f2e91] flex flex-col items-center justify-center gap-[10px] py-[28px]">
              <div className="w-[50px] h-[36px] bg-[#ff0000] rounded-[10px] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <polygon points="7,4 17,10 7,16" fill="white" />
                </svg>
              </div>
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[10px] tracking-[0.08em] uppercase text-[rgba(255,255,255,0.4)]">
                Em breve
              </span>
            </div>
            <div className="flex flex-col gap-[8px] p-[16px] flex-1">
              <div className="flex gap-[8px] items-center">
                <span
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] leading-none px-[8px] py-[4px] rounded-full"
                  style={{ color: c, backgroundColor: c + "18" }}
                >
                  {v.categoria}
                </span>
                <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#999]">{v.duracao}</span>
              </div>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[19px] text-[#1f2e91]">{v.titulo}</p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#666]">{v.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    pergunta: "Qual é a diferença entre os modelos Neo Essentials e Neo Premium?",
    resposta: "A linha Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e variantes) possui painel LED 10.1\" e é focada em custo-benefício com tecnologia UV LED + UF. A linha Neo Premium (INFINITY, PRESTIGE e PRIME) conta com painel IPS 15.6\", filtração por Osmose Reversa (RO) e acabamento de alto padrão. Todos os modelos possuem conectividade Wi-Fi 5 e Bluetooth 5.3.",
  },
  {
    pergunta: "Como faço para baixar e configurar o aplicativo Acquafy?",
    resposta: "O aplicativo Acquafy está disponível na App Store (iOS) e Google Play (Android). Após instalar, crie sua conta, aproxime o smartphone do purificador via Bluetooth 5.3 para emparelhar e siga o assistente de configuração de Wi-Fi. O processo leva menos de 5 minutos.",
  },
  {
    pergunta: "Com que frequência devo trocar o filtro do purificador?",
    resposta: "Os filtros Neo têm vida útil de 365 dias ou conforme o consumo de água. O aplicativo Acquafy monitora em tempo real o ciclo do filtro e envia alertas quando a troca se aproxima. O sistema de Reposição Inteligente pode fazer o pedido automaticamente pelo app.",
  },
  {
    pergunta: "Como me tornar um parceiro Acquafy?",
    resposta: "Existem três níveis de parceria: Silver (afiliado/indicador, comissão de 20%, sem investimento inicial), Gold (operador Acquafy Media, comissão de 20% em vendas + receita de anúncios, entrada a partir de US$2.000) e Platinum (distribuidor regional, desconto de 70% no preço USA, modelo FOB). Acesse a página de Parceiros no site ou entre em contato com nossa equipe.",
  },
  {
    pergunta: "O que é a Acquafy Media e como gera receita recorrente?",
    resposta: "A Acquafy Media é um sistema de mídia integrado ao painel touchscreen dos purificadores Neo. Negócios locais podem anunciar no display e os parceiros Gold ganham receita mensal por cada anúncio exibido. Os usuários também interagem via QR Code nas campanhas, gerando dados de engajamento.",
  },
  {
    pergunta: "O purificador Neo funciona com água de poço ou apenas água de rede?",
    resposta: "Os modelos da linha Essentials são indicados para água de rede (com pressão de 20 a 80 PSI). A linha Premium com tecnologia RO (Osmose Reversa) pode tratar água com maior variação de qualidade. Para situações específicas como água de poço, recomendamos contato com um especialista técnico para avaliação.",
  },
  {
    pergunta: "Qual o prazo de garantia dos produtos Acquafy?",
    resposta: "Os purificadores Neo possuem garantia de 1 ano contra defeitos de fabricação. O registro de garantia deve ser feito pelo aplicativo Acquafy ou pelo portal de suporte. Defeitos causados por instalação incorreta, uso inadequado ou manutenção negligenciada não são cobertos pela garantia.",
  },
  {
    pergunta: "Em quantos países a Acquafy opera?",
    resposta: "A Acquafy está presente em mais de 180 países, com operação 100% global e suporte disponível em 16 idiomas. O modelo de negócio permite que parceiros distribuidores regionais operem localmente com suporte da plataforma central.",
  },
];

function SectionFaq({
  aberto,
  setAberto,
}: {
  aberto: number | null;
  setAberto: (i: number | null) => void;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      {FAQS.map((faq, i) => {
        const isOpen = aberto === i;
        return (
          <div
            key={i}
            className={`bg-white rounded-[10px] overflow-hidden transition-shadow ${
              isOpen ? "shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]" : ""
            }`}
          >
            <button
              onClick={() => setAberto(isOpen ? null : i)}
              className="flex gap-[14px] items-center justify-between w-full px-[20px] py-[16px] cursor-pointer text-left"
              aria-expanded={isOpen}
            >
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[19px] text-[#1f2e91] flex-1 pr-[8px]">
                {faq.pergunta}
              </span>
              <span
                className={`shrink-0 flex items-center justify-center size-[24px] rounded-full border-2 transition-all duration-200 ${
                  isOpen
                    ? "border-[#0233c3] bg-[#0233c3] text-white rotate-180"
                    : "border-[#cbd0d4] bg-transparent text-[#333] rotate-0"
                }`}
              >
                <svg width="10" height="6" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[20px] text-[#333] px-[20px] pb-[16px]">
                {faq.resposta}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Políticas ────────────────────────────────────────────────────────────────

const POLITICAS = [
  {
    titulo: "Política de Garantia",
    desc: "Seus produtos Acquafy possuem garantia de fábrica e cobertura completa.",
    itens: ["12 meses de garantia de fábrica", "Cobertura para defeitos de fabricação", "Suporte técnico especializado"],
  },
  {
    titulo: "Política de Privacidade",
    desc: "Saiba como coletamos, usamos e protegemos seus dados pessoais.",
    itens: ["Dados coletados e finalidade", "Compartilhamento e segurança", "Seus direitos como titular de dados"],
  },
  {
    titulo: "Termos de Uso",
    desc: "Regras e condições para uso da plataforma e dos produtos Acquafy.",
    itens: ["Condições de uso da plataforma", "Responsabilidades do usuário", "Propriedade intelectual"],
  },
  {
    titulo: "Política de Devolução",
    desc: "Como solicitar troca, devolução ou reembolso de produtos.",
    itens: ["Prazo de 7 dias para devolução", "Condições para reembolso integral", "Como abrir um chamado de devolução"],
  },
  {
    titulo: "Certificações e Normas",
    desc: "Conformidade regulatória e certificações técnicas dos produtos.",
    itens: ["Certificação ANATEL", "INMETRO e normas técnicas brasileiras", "Padrões internacionais de qualidade"],
  },
];

function SectionPoliticas() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      {POLITICAS.map((pol) => (
        <div
          key={pol.titulo}
          className="bg-[#f6f9fe] border border-[#e8edf5] rounded-[12px] p-[20px] flex flex-col gap-[12px]"
        >
          <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-[20px] text-[#1f2e91]">{pol.titulo}</h3>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#555]">{pol.desc}</p>
          <ul className="flex flex-col gap-[6px] list-none m-0 p-0 flex-1">
            {pol.itens.map((item) => (
              <li key={item} className="flex gap-[8px] items-start">
                <span className="mt-[6px] shrink-0 size-[5px] rounded-full bg-[#0569ff]" />
                <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#444]">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-[6px] pt-[8px] border-t border-[#e8edf5]">
            <span className="shrink-0 size-[5px] rounded-full bg-[#ef4444]" />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] text-[#bbb]">Documento em elaboração</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BKSectionPopup({ sectionId, onClose }: Props) {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  useEffect(() => { setFaqAberto(null); }, [sectionId]);

  useEffect(() => {
    if (!sectionId) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [sectionId, onClose]);

  useEffect(() => {
    document.body.style.overflow = sectionId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sectionId]);

  if (!sectionId || !isSectionId(sectionId)) return null;

  const m = META[sectionId];

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-[20px] bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[900px] max-h-[88vh] flex flex-col overflow-hidden shadow-[0_24px_80px_0_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-[16px] px-[24px] py-[20px] shrink-0 border-b border-[#e8edf5]">
          <div className="flex-1 min-w-0">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[26px] text-[#1f2e91]">
              {m.titulo}
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#777]">
              {m.subtitulo}
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

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-[24px]">
          {sectionId === "downloads"           && <SectionDownloads />}
          {sectionId === "tutoriais-videos"    && <SectionVideos />}
          {sectionId === "faq"                 && <SectionFaq aberto={faqAberto} setAberto={setFaqAberto} />}
          {sectionId === "politicas-garantias" && <SectionPoliticas />}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-[24px] py-[16px] border-t border-[#e8edf5] flex items-center justify-end">
          <Link
            href={`/base-de-conhecimento${m.anchor}`}
            onClick={onClose}
            className="bg-[#0233c3] hover:bg-[#002ba8] transition-colors flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[8px] no-underline"
          >
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              Ver Base de Conhecimento
            </span>
            <svg width="9" height="9" viewBox="0 0 11.2 8.84" fill="none">
              <path d="M0 4.42h9.5M6.2 1l3.5 3.42L6.2 7.84" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
