"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  products: { name: string; desc: string }[];
}> = {
  pt: {
    heading1: "Compatível com todo o ",
    heading2: "ecossistema Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Compatível com toda linha Neo Essentials para uso diário." },
      { name: "Neo Premium",    desc: "Integração completa com a linha Neo Premium de alto desempenho." },
      { name: "Acquafy Media",  desc: "Conectado à plataforma de mídia para campanhas e comunicações." },
    ],
  },
  en: {
    heading1: "Compatible with the entire ",
    heading2: "Acquafy ecosystem",
    products: [
      { name: "Neo Essentials", desc: "Compatible with the entire Neo Essentials line for everyday use." },
      { name: "Neo Premium",    desc: "Full integration with the high-performance Neo Premium line." },
      { name: "Acquafy Media",  desc: "Connected to the media platform for campaigns and communications." },
    ],
  },
  "en-gb": {
    heading1: "Compatible with the entire ",
    heading2: "Acquafy ecosystem",
    products: [
      { name: "Neo Essentials", desc: "Compatible with the entire Neo Essentials line for everyday use." },
      { name: "Neo Premium",    desc: "Full integration with the high-performance Neo Premium line." },
      { name: "Acquafy Media",  desc: "Connected to the media platform for campaigns and communications." },
    ],
  },
  es: {
    heading1: "Compatible con todo el ",
    heading2: "ecosistema Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Compatible con toda la línea Neo Essentials para uso diario." },
      { name: "Neo Premium",    desc: "Integración completa con la línea Neo Premium de alto rendimiento." },
      { name: "Acquafy Media",  desc: "Conectado a la plataforma de medios para campañas y comunicaciones." },
    ],
  },
  fr: {
    heading1: "Compatible avec l'intégralité de l'",
    heading2: "écosystème Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Compatible avec toute la gamme Neo Essentials pour un usage quotidien." },
      { name: "Neo Premium",    desc: "Intégration complète avec la gamme Neo Premium haute performance." },
      { name: "Acquafy Media",  desc: "Connecté à la plateforme média pour les campagnes et communications." },
    ],
  },
  de: {
    heading1: "Kompatibel mit dem gesamten ",
    heading2: "Acquafy-Ökosystem",
    products: [
      { name: "Neo Essentials", desc: "Kompatibel mit der gesamten Neo Essentials-Linie für den täglichen Gebrauch." },
      { name: "Neo Premium",    desc: "Vollständige Integration mit der leistungsstarken Neo Premium-Linie." },
      { name: "Acquafy Media",  desc: "Verbunden mit der Mediaplattform für Kampagnen und Kommunikation." },
    ],
  },
  it: {
    heading1: "Compatibile con l'intero ",
    heading2: "ecosistema Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Compatibile con l'intera linea Neo Essentials per uso quotidiano." },
      { name: "Neo Premium",    desc: "Integrazione completa con la linea Neo Premium ad alte prestazioni." },
      { name: "Acquafy Media",  desc: "Connesso alla piattaforma media per campagne e comunicazioni." },
    ],
  },
  zh: {
    heading1: "兼容整个 ",
    heading2: "Acquafy 生态系统",
    products: [
      { name: "Neo Essentials", desc: "兼容整个 Neo Essentials 系列，适合日常使用。" },
      { name: "Neo Premium",    desc: "与高性能 Neo Premium 系列完全集成。" },
      { name: "Acquafy Media",  desc: "连接媒体平台，用于营销活动和通讯。" },
    ],
  },
  ja: {
    heading1: "Acquafy エコシステム全体と",
    heading2: "互換性があります",
    products: [
      { name: "Neo Essentials", desc: "日常使用に最適な Neo Essentials ライン全体に対応。" },
      { name: "Neo Premium",    desc: "高性能 Neo Premium ラインと完全統合。" },
      { name: "Acquafy Media",  desc: "キャンペーンとコミュニケーションのためのメディアプラットフォームに接続。" },
    ],
  },
  ko: {
    heading1: "전체 ",
    heading2: "Acquafy 생태계와 호환",
    products: [
      { name: "Neo Essentials", desc: "일상적인 사용을 위한 전체 Neo Essentials 라인과 호환됩니다." },
      { name: "Neo Premium",    desc: "고성능 Neo Premium 라인과 완벽하게 통합됩니다." },
      { name: "Acquafy Media",  desc: "캠페인 및 커뮤니케이션을 위한 미디어 플랫폼에 연결됩니다." },
    ],
  },
  sv: {
    heading1: "Kompatibel med hela ",
    heading2: "Acquafy-ekosystemet",
    products: [
      { name: "Neo Essentials", desc: "Kompatibel med hela Neo Essentials-serien för dagligt bruk." },
      { name: "Neo Premium",    desc: "Full integration med den högpresterande Neo Premium-serien." },
      { name: "Acquafy Media",  desc: "Ansluten till mediaplattformen för kampanjer och kommunikation." },
    ],
  },
  fi: {
    heading1: "Yhteensopiva koko ",
    heading2: "Acquafy-ekosysteemin kanssa",
    products: [
      { name: "Neo Essentials", desc: "Yhteensopiva koko Neo Essentials -sarjan kanssa jokapäiväiseen käyttöön." },
      { name: "Neo Premium",    desc: "Täydellinen integraatio suorituskykyisen Neo Premium -sarjan kanssa." },
      { name: "Acquafy Media",  desc: "Yhdistetty mediapalveluun kampanjoita ja viestintää varten." },
    ],
  },
  ru: {
    heading1: "Совместимо со всей ",
    heading2: "экосистемой Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Совместимо со всей линейкой Neo Essentials для ежедневного использования." },
      { name: "Neo Premium",    desc: "Полная интеграция с высокопроизводительной линейкой Neo Premium." },
      { name: "Acquafy Media",  desc: "Подключено к медиаплатформе для кампаний и коммуникаций." },
    ],
  },
  ro: {
    heading1: "Compatibil cu întregul ",
    heading2: "ecosistem Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Compatibil cu întreaga linie Neo Essentials pentru utilizare zilnică." },
      { name: "Neo Premium",    desc: "Integrare completă cu linia Neo Premium de înaltă performanță." },
      { name: "Acquafy Media",  desc: "Conectat la platforma media pentru campanii și comunicări." },
    ],
  },
  he: {
    heading1: "תואם לכל ",
    heading2: "המערכת האקולוגית של Acquafy",
    products: [
      { name: "Neo Essentials", desc: "תואם לכל קו Neo Essentials לשימוש יומיומי." },
      { name: "Neo Premium",    desc: "אינטגרציה מלאה עם קו Neo Premium בעל הביצועים הגבוהים." },
      { name: "Acquafy Media",  desc: "מחובר לפלטפורמת המדיה לקמפיינים ותקשורת." },
    ],
  },
  "pt-pt": {
    heading1: "Compatível com todo o ",
    heading2: "ecossistema Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Compatível com toda a linha Neo Essentials para uso diário." },
      { name: "Neo Premium",    desc: "Integração completa com a linha Neo Premium de alto desempenho." },
      { name: "Acquafy Media",  desc: "Ligado à plataforma de média para campanhas e comunicações." },
    ],
  },
};

const productImgs = [
  "/figma-assets/neo-ultra-spark-h2.webp",
  "/figma-assets/compat-neo-premium.webp",
  "/figma-assets/acquafy-media-totem.webp",
];

export default function CompatibilidadeAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        {/* Cards de produto */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {t.products.map((p, i) => (
            <div
              key={p.name}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] overflow-clip px-[20px] py-[40px] rounded-[16px]"
            >
              {/* Nome */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full">
                {p.name}
              </p>

              {/* Imagem do produto */}
              <div className="flex items-center justify-center overflow-clip size-[300px] shrink-0">
                <img
                  src={productImgs[i]}
                  alt={p.name}
                  className="max-h-[280px] max-w-[280px] object-contain"
                />
              </div>

              {/* Descrição */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] text-center w-full">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
