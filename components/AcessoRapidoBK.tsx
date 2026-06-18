"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading: string;
  headingAccent: string;
  subtitle: string;
  items: { title: string; desc: string }[];
}> = {
  pt: {
    heading:       "Acesso",
    headingAccent: "rápido",
    subtitle:      "Acesse diretamente as áreas mais utilizadas do suporte.",
    items: [
      { title: "Meus produtos",        desc: "Conheça a linha completa de purificadores Neo." },
      { title: "Downloads",            desc: "Manuais, guias rápidos, softwares e documentos." },
      { title: "Tutoriais e vídeos",   desc: "Aprenda passo a passo com nossos tutoriais." },
      { title: "Perguntas frequentes", desc: "Encontre respostas para as dúvidas mais comuns." },
      { title: "Políticas e garantias",desc: "Consulte nossas políticas, termos e garantias." },
    ],
  },
  "pt-pt": {
    heading:       "Acesso",
    headingAccent: "rápido",
    subtitle:      "Aceda diretamente às áreas mais utilizadas do suporte.",
    items: [
      { title: "Os meus produtos",       desc: "Conheça a linha completa de purificadores Neo." },
      { title: "Transferências",         desc: "Manuais, guias rápidos, software e documentos." },
      { title: "Tutoriais e vídeos",     desc: "Aprenda passo a passo com os nossos tutoriais." },
      { title: "Perguntas frequentes",   desc: "Encontre respostas para as dúvidas mais comuns." },
      { title: "Políticas e garantias",  desc: "Consulte as nossas políticas, termos e garantias." },
    ],
  },
  en: {
    heading:       "Quick",
    headingAccent: "access",
    subtitle:      "Go directly to the most used support areas.",
    items: [
      { title: "My products",          desc: "Explore the full Neo purifier lineup." },
      { title: "Downloads",            desc: "Manuals, quick guides, software and documents." },
      { title: "Tutorials & videos",   desc: "Learn step by step with our tutorials." },
      { title: "Frequently asked questions", desc: "Find answers to the most common questions." },
      { title: "Policies & warranties",desc: "Check our policies, terms and warranties." },
    ],
  },
  es: {
    heading:       "Acceso",
    headingAccent: "rápido",
    subtitle:      "Accede directamente a las áreas más utilizadas del soporte.",
    items: [
      { title: "Mis productos",        desc: "Conoce la línea completa de purificadores Neo." },
      { title: "Descargas",            desc: "Manuales, guías rápidas, software y documentos." },
      { title: "Tutoriales y videos",  desc: "Aprende paso a paso con nuestros tutoriales." },
      { title: "Preguntas frecuentes", desc: "Encuentra respuestas a las dudas más comunes." },
      { title: "Políticas y garantías",desc: "Consulta nuestras políticas, términos y garantías." },
    ],
  },
  fr: {
    heading:       "Accès",
    headingAccent: "rapide",
    subtitle:      "Accédez directement aux sections d'assistance les plus utilisées.",
    items: [
      { title: "Mes produits",             desc: "Découvrez la gamme complète de purificateurs Neo." },
      { title: "Téléchargements",          desc: "Manuels, guides rapides, logiciels et documents." },
      { title: "Tutoriels et vidéos",      desc: "Apprenez étape par étape avec nos tutoriels." },
      { title: "Questions fréquentes",     desc: "Trouvez des réponses aux questions les plus courantes." },
      { title: "Politiques et garanties",  desc: "Consultez nos politiques, conditions et garanties." },
    ],
  },
  de: {
    heading:       "Schnell",
    headingAccent: "zugriff",
    subtitle:      "Gehen Sie direkt zu den meistgenutzten Support-Bereichen.",
    items: [
      { title: "Meine Produkte",           desc: "Entdecken Sie die komplette Neo-Purifier-Reihe." },
      { title: "Downloads",                desc: "Handbücher, Kurzanleitungen, Software und Dokumente." },
      { title: "Tutorials & Videos",       desc: "Lernen Sie Schritt für Schritt mit unseren Tutorials." },
      { title: "Häufige Fragen",           desc: "Finden Sie Antworten auf die häufigsten Fragen." },
      { title: "Richtlinien & Garantien",  desc: "Lesen Sie unsere Richtlinien, Bedingungen und Garantien." },
    ],
  },
  it: {
    heading:       "Accesso",
    headingAccent: "rapido",
    subtitle:      "Accedi direttamente alle aree di supporto più utilizzate.",
    items: [
      { title: "I miei prodotti",          desc: "Scopri la gamma completa di purificatori Neo." },
      { title: "Download",                 desc: "Manuali, guide rapide, software e documenti." },
      { title: "Tutorial e video",         desc: "Impara passo dopo passo con i nostri tutorial." },
      { title: "Domande frequenti",        desc: "Trova risposte alle domande più comuni." },
      { title: "Politiche e garanzie",     desc: "Consulta le nostre politiche, condizioni e garanzie." },
    ],
  },
  zh: {
    heading:       "快速",
    headingAccent: "访问",
    subtitle:      "直接访问最常用的支持区域。",
    items: [
      { title: "我的产品",       desc: "了解完整的 Neo 净水器产品线。" },
      { title: "下载",           desc: "手册、快速指南、软件和文档。" },
      { title: "教程与视频",     desc: "通过我们的教程逐步学习。" },
      { title: "常见问题",       desc: "查找最常见问题的答案。" },
      { title: "政策与保修",     desc: "查看我们的政策、条款和保修信息。" },
    ],
  },
  ja: {
    heading:       "クイック",
    headingAccent: "アクセス",
    subtitle:      "最もよく使われるサポートエリアに直接アクセスします。",
    items: [
      { title: "マイ製品",             desc: "Neo 浄水器の完全なラインナップをご確認ください。" },
      { title: "ダウンロード",         desc: "マニュアル、クイックガイド、ソフトウェア、ドキュメント。" },
      { title: "チュートリアル & 動画", desc: "チュートリアルでステップごとに学びましょう。" },
      { title: "よくある質問",         desc: "最もよくある質問への回答を見つけてください。" },
      { title: "ポリシーと保証",        desc: "ポリシー、規約、保証内容をご確認ください。" },
    ],
  },
  ko: {
    heading:       "빠른",
    headingAccent: "접근",
    subtitle:      "가장 많이 사용되는 지원 영역으로 바로 이동하세요.",
    items: [
      { title: "내 제품",           desc: "Neo 정수기 전체 라인업을 확인하세요." },
      { title: "다운로드",          desc: "매뉴얼, 빠른 가이드, 소프트웨어 및 문서." },
      { title: "튜토리얼 & 동영상", desc: "튜토리얼로 단계별로 배워보세요." },
      { title: "자주 묻는 질문",    desc: "가장 흔한 질문에 대한 답변을 찾아보세요." },
      { title: "정책 및 보증",      desc: "정책, 약관 및 보증 내용을 확인하세요." },
    ],
  },
};

const imgArrowAccent = "/figma-assets/icon-arrow-accent.svg";

const imgIconProducts  = "/figma-assets/icon-products.svg";
const imgIconDownload  = "/figma-assets/icon-download.svg";
const imgIconEducation = "/figma-assets/icon-education.svg";
const imgIconFaq       = "/figma-assets/icon-faq.svg";
const imgIconDoc       = "/figma-assets/icon-doc.svg";
const imgIconWifi      = "/figma-assets/icon-wifi-list.svg";

export type QuickItem = {
  icon: string;
  aspectW: number;
  aspectH: number;
  title: string;
  desc: string;
  href: string;
  noPage?: boolean;
  sectionId?: string;
};

export const quickItems: QuickItem[] = [
  {
    icon: imgIconProducts,
    aspectW: 29, aspectH: 30,
    title: "Meus produtos",
    desc: "Conheça a linha completa de purificadores Neo.",
    href: "/linha-neo",
  },
  {
    icon: imgIconDownload,
    aspectW: 30, aspectH: 30,
    title: "Downloads",
    desc: "Manuais, guias rápidos, softwares e documentos.",
    href: "#downloads",
    sectionId: "downloads",
  },
  {
    icon: imgIconEducation,
    aspectW: 30, aspectH: 22,
    title: "Tutoriais e vídeos",
    desc: "Aprenda passo a passo com nossos tutoriais.",
    href: "#tutoriais-videos",
    sectionId: "tutoriais-videos",
  },
  {
    icon: imgIconFaq,
    aspectW: 30, aspectH: 30,
    title: "Perguntas frequentes",
    desc: "Encontre respostas para as dúvidas mais comuns.",
    href: "#faq",
    sectionId: "faq",
  },
  {
    icon: imgIconDoc,
    aspectW: 24, aspectH: 30,
    title: "Políticas e garantias",
    desc: "Consulte nossas políticas, termos e garantias.",
    href: "#politicas-garantias",
    sectionId: "politicas-garantias",
  },
];

export default function AcessoRapidoBK() {
  const { lang } = useLang();
  const t = T[lang];
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading}{" "}
            <span className="text-[#0569ff]">{t.headingAccent}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {quickItems.map((item, idx) => {
            const label = t.items[idx] ?? { title: item.title, desc: item.desc };
            const inner = (
              <>
                {/* Red dot indicator for items without a page */}
                {item.noPage && (
                  <span className="absolute top-[14px] right-[14px] size-[8px] rounded-full bg-[#ef4444]" />
                )}

                {/* Icon */}
                <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                  <FigmaIcon src={item.icon} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-[10px] items-start text-center w-full flex-1">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                    {label.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                    {label.desc}
                  </p>
                </div>

                {/* Arrow — only for items with a page */}
                {!item.noPage && (
                  <div className="shrink-0 group-hover:translate-x-1 transition-transform">
                    <FigmaIcon src={imgArrowAccent} size={12} aspectW={11.2} aspectH={8.84} />
                  </div>
                )}
              </>
            );

            return item.noPage ? (
              <div
                key={item.title}
                className="relative bg-white opacity-70 cursor-default
                  flex flex-[1_0_0] flex-col gap-[20px] items-center
                  min-w-[180px] p-[20px] rounded-[16px]"
              >
                {inner}
              </div>
            ) : (
              <a
                key={item.title}
                href={item.href}
                className="relative bg-white hover:bg-[#eaf0fd] hover:shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]
                  transition-all duration-200
                  flex flex-[1_0_0] flex-col gap-[20px] items-center
                  min-w-[180px] p-[20px] rounded-[16px] cursor-pointer no-underline group"
              >
                {inner}
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
