"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgScreenshot   = "/figma-assets/screenshot.webp";
const imgHeadset      = "/figma-assets/product-headset.webp";
const imgArrowBlue    = "/figma-assets/icon-arrow-blue-b.svg";

const T: Record<Lang, {
  card1Title: string;
  card1Desc: string;
  card1Btn: string;
  card1ImgAlt: string;
  card2Title: string;
  card2Desc: string;
  card2Btn: string;
  card2ImgAlt: string;
}> = {
  pt: {
    card1Title: "Base de conhecimento",
    card1Desc: "Acesse nossa biblioteca completa de artigos, tutoriais e guias para aproveitar ao máximo sua experiência Acquafy.",
    card1Btn: "Acessar base de conhecimento",
    card1ImgAlt: "Base de conhecimento Acquafy",
    card2Title: "Não encontrou o que procura?",
    card2Desc: "Nossa equipe está pronta para ajudar você com qualquer dúvida ou necessidade específica.",
    card2Btn: "Abrir chamado",
    card2ImgAlt: "Suporte Acquafy",
  },
  "pt-pt": {
    card1Title: "Base de conhecimento",
    card1Desc: "Aceda à nossa biblioteca completa de artigos, tutoriais e guias para tirar o máximo partido da sua experiência Acquafy.",
    card1Btn: "Aceder à base de conhecimento",
    card1ImgAlt: "Base de conhecimento Acquafy",
    card2Title: "Não encontrou o que procura?",
    card2Desc: "A nossa equipa está pronta para o ajudar com qualquer dúvida ou necessidade específica.",
    card2Btn: "Abrir chamado",
    card2ImgAlt: "Suporte Acquafy",
  },
  en: {
    card1Title: "Knowledge base",
    card1Desc: "Access our complete library of articles, tutorials and guides to make the most of your Acquafy experience.",
    card1Btn: "Access knowledge base",
    card1ImgAlt: "Acquafy knowledge base",
    card2Title: "Didn't find what you're looking for?",
    card2Desc: "Our team is ready to help you with any question or specific need.",
    card2Btn: "Open a ticket",
    card2ImgAlt: "Acquafy support",
  },
  es: {
    card1Title: "Base de conocimiento",
    card1Desc: "Accede a nuestra biblioteca completa de artículos, tutoriales y guías para aprovechar al máximo tu experiencia Acquafy.",
    card1Btn: "Acceder a la base de conocimiento",
    card1ImgAlt: "Base de conocimiento Acquafy",
    card2Title: "¿No encontraste lo que buscas?",
    card2Desc: "Nuestro equipo está listo para ayudarte con cualquier duda o necesidad específica.",
    card2Btn: "Abrir ticket",
    card2ImgAlt: "Soporte Acquafy",
  },
  fr: {
    card1Title: "Base de connaissances",
    card1Desc: "Accédez à notre bibliothèque complète d'articles, de tutoriels et de guides pour tirer le meilleur parti de votre expérience Acquafy.",
    card1Btn: "Accéder à la base de connaissances",
    card1ImgAlt: "Base de connaissances Acquafy",
    card2Title: "Vous n'avez pas trouvé ce que vous cherchez ?",
    card2Desc: "Notre équipe est prête à vous aider avec toute question ou besoin spécifique.",
    card2Btn: "Ouvrir un ticket",
    card2ImgAlt: "Support Acquafy",
  },
  de: {
    card1Title: "Wissensdatenbank",
    card1Desc: "Greifen Sie auf unsere vollständige Bibliothek mit Artikeln, Tutorials und Leitfäden zu, um das Beste aus Ihrer Acquafy-Erfahrung herauszuholen.",
    card1Btn: "Wissensdatenbank aufrufen",
    card1ImgAlt: "Acquafy Wissensdatenbank",
    card2Title: "Nicht gefunden, was Sie suchen?",
    card2Desc: "Unser Team steht Ihnen bei allen Fragen oder spezifischen Anliegen gerne zur Verfügung.",
    card2Btn: "Ticket erstellen",
    card2ImgAlt: "Acquafy Support",
  },
  it: {
    card1Title: "Knowledge base",
    card1Desc: "Accedi alla nostra libreria completa di articoli, tutorial e guide per sfruttare al massimo la tua esperienza Acquafy.",
    card1Btn: "Accedi alla knowledge base",
    card1ImgAlt: "Knowledge base Acquafy",
    card2Title: "Non hai trovato quello che cercavi?",
    card2Desc: "Il nostro team è pronto ad aiutarti con qualsiasi domanda o esigenza specifica.",
    card2Btn: "Apri un ticket",
    card2ImgAlt: "Supporto Acquafy",
  },
  zh: {
    card1Title: "知识库",
    card1Desc: "访问我们完整的文章、教程和指南库，充分利用您的 Acquafy 体验。",
    card1Btn: "访问知识库",
    card1ImgAlt: "Acquafy 知识库",
    card2Title: "没有找到您需要的内容？",
    card2Desc: "我们的团队随时准备帮助您解答任何问题或特定需求。",
    card2Btn: "提交工单",
    card2ImgAlt: "Acquafy 支持",
  },
  ja: {
    card1Title: "ナレッジベース",
    card1Desc: "記事、チュートリアル、ガイドの完全なライブラリにアクセスして、Acquafy の体験を最大限に活用しましょう。",
    card1Btn: "ナレッジベースにアクセス",
    card1ImgAlt: "Acquafy ナレッジベース",
    card2Title: "お探しのものが見つかりませんでしたか？",
    card2Desc: "私たちのチームは、どんな質問や特定のニーズにもお答えする準備ができています。",
    card2Btn: "チケットを開く",
    card2ImgAlt: "Acquafy サポート",
  },
  ko: {
    card1Title: "지식 베이스",
    card1Desc: "기사, 튜토리얼 및 가이드의 전체 라이브러리에 액세스하여 Acquafy 경험을 최대한 활용하세요.",
    card1Btn: "지식 베이스 접근",
    card1ImgAlt: "Acquafy 지식 베이스",
    card2Title: "찾으시는 것을 찾지 못하셨나요?",
    card2Desc: "저희 팀은 모든 질문이나 특정 요구 사항에 도움을 드릴 준비가 되어 있습니다.",
    card2Btn: "티켓 열기",
    card2ImgAlt: "Acquafy 지원",
  },
};

export default function BaseConhecimentoSuporte() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-wrap gap-[20px] items-stretch justify-center max-w-[1400px] w-full" style={{ minHeight: 280 }}>

        {/* Card 1 — Base de conhecimento */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] px-[20px] py-[40px] rounded-[16px] w-[690px]">
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[120px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff]">
              {t.card1Title}
            </p>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">
              {t.card1Desc}
            </p>
            <a href="/base-de-conhecimento" className="bg-white border border-[#0233c3] hover:bg-[#0233c3] group transition-colors flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] shrink-0">
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white transition-colors text-center whitespace-nowrap">
                {t.card1Btn}
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <img src="/figma-assets/icon-arrow-white-bk.svg" alt="" className="block max-w-none size-full" />
                </div>
              </div>
            </a>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-end justify-center min-w-[160px] overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: "3700/2112" }}>
              <img
                src={imgScreenshot}
                alt={t.card1ImgAlt}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Card 2 — Não encontrou? */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] px-[20px] py-[40px] rounded-[16px] w-[690px]">
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[120px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff]">
              {t.card2Title}
            </p>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">
              {t.card2Desc}
            </p>
            <a href="/contato" className="bg-white border border-[#0233c3] hover:bg-[#0233c3] group transition-colors flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] shrink-0">
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white transition-colors text-center whitespace-nowrap">
                {t.card2Btn}
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <img src="/figma-assets/icon-arrow-white-bk.svg" alt="" className="block max-w-none size-full" />
                </div>
              </div>
            </a>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-end justify-center min-w-[160px] overflow-hidden">
            <div className="relative shrink-0 w-full aspect-[2956/3158] max-h-[200px] max-w-[187px]">
              <img
                src={imgHeadset}
                alt={t.card2ImgAlt}
                className="absolute inset-0 size-full max-w-none object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
