"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Quick-item definition ─────────────────────────────────────────────────────
export type QuickItem = {
  icon: string;
  aspectW: number;
  aspectH: number;
  href: string;
  noPage?: boolean;
  sectionId?: string;
};

export const quickItems: QuickItem[] = [
  {
    icon: "/figma-assets/icon-check-list.svg",
    aspectW: 30,
    aspectH: 30,
    href: "/linha-neo",
  },
  {
    icon: "/figma-assets/icon-download.svg",
    aspectW: 30,
    aspectH: 30,
    href: "#downloads",
    noPage: true,
  },
  {
    icon: "/figma-assets/icon-book.svg",
    aspectW: 30,
    aspectH: 22.3,
    href: "#tutoriais",
    noPage: true,
  },
  {
    icon: "/figma-assets/icon-fone-list.svg",
    aspectW: 30,
    aspectH: 30,
    href: "/contato",
  },
  {
    icon: "/figma-assets/icon-certificate.svg",
    aspectW: 14.17,
    aspectH: 21.5,
    href: "/politicas-privacidade",
  },
];

// ── Translations ──────────────────────────────────────────────────────────────
const T: Record<Lang, {
  title1: string;
  title2: string;
  items: { title: string; desc: string }[];
}> = {
  pt: {
    title1: "Acesso", title2: "rápido",
    items: [
      { title: "Meus produtos",         desc: "Conheça a linha completa de purificadores Neo." },
      { title: "Downloads",             desc: "Manuais, guias rápidos, softwares e documentos." },
      { title: "Tutoriais e vídeos",    desc: "Aprenda passo a passo com nossos tutoriais." },
      { title: "Perguntas frequentes",  desc: "Encontre respostas para as dúvidas mais comuns." },
      { title: "Políticas e garantias", desc: "Consulte nossas políticas, termos e garantias." },
    ],
  },
  "pt-pt": {
    title1: "Acesso", title2: "rápido",
    items: [
      { title: "Os meus produtos",      desc: "Conheça a linha completa de purificadores Neo." },
      { title: "Transferências",        desc: "Manuais, guias rápidos, softwares e documentos." },
      { title: "Tutoriais e vídeos",    desc: "Aprenda passo a passo com os nossos tutoriais." },
      { title: "Perguntas frequentes",  desc: "Encontre respostas para as dúvidas mais comuns." },
      { title: "Políticas e garantias", desc: "Consulte as nossas políticas, termos e garantias." },
    ],
  },
  en: {
    title1: "Quick", title2: "Access",
    items: [
      { title: "My products",          desc: "Explore the complete Neo purifier lineup." },
      { title: "Downloads",            desc: "Manuals, quick guides, software, and documents." },
      { title: "Tutorials & videos",   desc: "Learn step by step with our tutorials." },
      { title: "FAQ",                  desc: "Find answers to the most common questions." },
      { title: "Policies & warranties",desc: "Review our policies, terms, and warranties." },
    ],
  },
  es: {
    title1: "Acceso", title2: "Rápido",
    items: [
      { title: "Mis productos",           desc: "Conoce la línea completa de purificadores Neo." },
      { title: "Descargas",               desc: "Manuales, guías rápidas, software y documentos." },
      { title: "Tutoriales y videos",     desc: "Aprende paso a paso con nuestros tutoriales." },
      { title: "Preguntas frecuentes",    desc: "Encuentra respuestas a las dudas más comunes." },
      { title: "Políticas y garantías",   desc: "Consulta nuestras políticas, términos y garantías." },
    ],
  },
  fr: {
    title1: "Accès", title2: "rapide",
    items: [
      { title: "Mes produits",            desc: "Découvrez la gamme complète de purificateurs Neo." },
      { title: "Téléchargements",         desc: "Manuels, guides rapides, logiciels et documents." },
      { title: "Tutoriels et vidéos",     desc: "Apprenez étape par étape avec nos tutoriels." },
      { title: "FAQ",                     desc: "Trouvez des réponses aux questions les plus fréquentes." },
      { title: "Politiques et garanties", desc: "Consultez nos politiques, conditions et garanties." },
    ],
  },
  de: {
    title1: "Schnell-", title2: "zugriff",
    items: [
      { title: "Meine Produkte",          desc: "Entdecken Sie die vollständige Neo-Purifier-Reihe." },
      { title: "Downloads",               desc: "Handbücher, Schnellanleitungen, Software und Dokumente." },
      { title: "Tutorials & Videos",      desc: "Lernen Sie Schritt für Schritt mit unseren Tutorials." },
      { title: "FAQ",                     desc: "Finden Sie Antworten auf die häufigsten Fragen." },
      { title: "Richtlinien & Garantien", desc: "Prüfen Sie unsere Richtlinien, Bedingungen und Garantien." },
    ],
  },
  it: {
    title1: "Accesso", title2: "rapido",
    items: [
      { title: "I miei prodotti",       desc: "Scopri la linea completa di purificatori Neo." },
      { title: "Download",              desc: "Manuali, guide rapide, software e documenti." },
      { title: "Tutorial e video",      desc: "Impara passo dopo passo con i nostri tutorial." },
      { title: "Domande frequenti",     desc: "Trova risposte alle domande più comuni." },
      { title: "Politiche e garanzie",  desc: "Consulta le nostre politiche, termini e garanzie." },
    ],
  },
  zh: {
    title1: "快速", title2: "访问",
    items: [
      { title: "我的产品",     desc: "探索完整的 Neo 净水器产品系列。" },
      { title: "下载",         desc: "手册、快速指南、软件和文档。" },
      { title: "教程与视频",   desc: "跟随我们的教程逐步学习。" },
      { title: "常见问题",     desc: "查找最常见问题的解答。" },
      { title: "政策与保修",   desc: "查阅我们的政策、条款和保修信息。" },
    ],
  },
  ja: {
    title1: "クイック", title2: "アクセス",
    items: [
      { title: "マイ製品",            desc: "Neo ピュリファイアーの完全なラインナップをご覧ください。" },
      { title: "ダウンロード",        desc: "マニュアル、クイックガイド、ソフトウェア、ドキュメント。" },
      { title: "チュートリアル＆動画",desc: "チュートリアルでステップごとに学習する。" },
      { title: "よくある質問",        desc: "最もよくある質問への回答を見つける。" },
      { title: "ポリシーと保証",      desc: "ポリシー、利用規約、保証を確認する。" },
    ],
  },
  ko: {
    title1: "빠른", title2: "접속",
    items: [
      { title: "내 제품",          desc: "Neo 정수기 전체 라인업을 살펴보세요." },
      { title: "다운로드",         desc: "매뉴얼, 빠른 가이드, 소프트웨어 및 문서." },
      { title: "튜토리얼 & 동영상",desc: "튜토리얼로 단계별 학습하기." },
      { title: "자주 묻는 질문",   desc: "가장 자주 묻는 질문에 대한 답변 찾기." },
      { title: "정책 및 보증",     desc: "정책, 약관 및 보증 정보를 확인하세요." },
    ],
  },
};

const imgArrowAccent = "/figma-assets/icon-arrow-accent.svg";

// ── Component ─────────────────────────────────────────────────────────────────
export default function AcessoRapidoBK() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col gap-[20px] items-center justify-center max-w-[1400px] mx-auto p-[20px] rounded-[16px] w-full">

      <div className="flex flex-col items-start w-full">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.title1}{" "}
          <span className="text-[#0569ff]">{t.title2}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-[20px] items-start justify-center w-full xl:items-stretch">
        {quickItems.map((item, i) => {
          const tItem = t.items[i];
          const inner = (
            <>
              <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                <FigmaIcon src={item.icon} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
              </div>
              <div className="flex flex-col gap-[10px] items-start text-center w-full flex-1">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  {tItem.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  {tItem.desc}
                </p>
              </div>
              {!item.noPage && (
                <FigmaIcon src={imgArrowAccent} size={12} aspectW={14.5333} aspectH={8.83675} />
              )}
            </>
          );

          if (item.noPage) {
            return (
              <div
                key={item.href}
                className="bg-[#f6f9fe] opacity-60 cursor-default flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[180px] p-[20px] rounded-[16px]"
              >
                {inner}
              </div>
            );
          }

          return (
            <a
              key={item.href}
              href={item.href}
              className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[180px] p-[20px] rounded-[16px] cursor-pointer no-underline"
            >
              {inner}
            </a>
          );
        })}
      </div>
    </section>
  );
}
