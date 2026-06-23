"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

// ── Flag assets (24px cards) ──────────────────────────────────────────────────
const FLAGS: Record<Lang, { src: string; aspectW: number; aspectH: number }> = {
  pt:      { src: "/figma-assets/flag-br.svg",       aspectW: 512,   aspectH: 512   },
  "pt-pt": { src: "/figma-assets/flag-pt.svg",       aspectW: 1,     aspectH: 1     },
  en:      { src: "/figma-assets/flag-usa-30px.svg", aspectW: 18,    aspectH: 18    },
  es:      { src: "/figma-assets/flag-es.svg",       aspectW: 22,    aspectH: 22    },
  fr:      { src: "/figma-assets/flag-fr.svg",       aspectW: 30,    aspectH: 30    },
  de:      { src: "/figma-assets/flag-de.svg",       aspectW: 306.6, aspectH: 306.7 },
  it:      { src: "/figma-assets/flag-it.svg",       aspectW: 30,    aspectH: 30    },
  zh:      { src: "/figma-assets/flag-zh.svg",       aspectW: 512,   aspectH: 512   },
  ja:      { src: "/figma-assets/flag-ja.svg",       aspectW: 512,   aspectH: 512   },
  ko:      { src: "/figma-assets/flag-ko.svg",       aspectW: 374,   aspectH: 374   },
};

// ── Translations ──────────────────────────────────────────────────────────────
const T: Record<Lang, {
  titulo: string;
  linguas: Record<Lang, string>;
}> = {
  pt: {
    titulo: "Uma experiência multilíngue para equipes globais",
    linguas: {
      pt:      "Português (Brasil)",
      "pt-pt": "Português (Portugal)",
      en:      "Inglês",
      es:      "Espanhol",
      fr:      "Francês",
      de:      "Alemão",
      it:      "Italiano",
      zh:      "中文 (China)",
      ja:      "日本語 (Japão)",
      ko:      "한국어 (Coreia)",
    },
  },
  "pt-pt": {
    titulo: "Uma experiência multilingue para equipas globais",
    linguas: {
      pt:      "Português (Brasil)",
      "pt-pt": "Português (Portugal)",
      en:      "Inglês",
      es:      "Espanhol",
      fr:      "Francês",
      de:      "Alemão",
      it:      "Italiano",
      zh:      "中文 (China)",
      ja:      "日本語 (Japão)",
      ko:      "한국어 (Coreia)",
    },
  },
  en: {
    titulo: "A multilingual experience for global teams",
    linguas: {
      pt:      "Portuguese (Brazil)",
      "pt-pt": "Portuguese (Portugal)",
      en:      "English",
      es:      "Spanish",
      fr:      "French",
      de:      "German",
      it:      "Italian",
      zh:      "Chinese (China)",
      ja:      "Japanese",
      ko:      "Korean",
    },
  },
  es: {
    titulo: "Una experiencia multilingüe para equipos globales",
    linguas: {
      pt:      "Portugués (Brasil)",
      "pt-pt": "Portugués (Portugal)",
      en:      "Inglés",
      es:      "Español",
      fr:      "Francés",
      de:      "Alemán",
      it:      "Italiano",
      zh:      "中文 (China)",
      ja:      "日本語 (Japón)",
      ko:      "한국어 (Corea)",
    },
  },
  fr: {
    titulo: "Une expérience multilingue pour les équipes mondiales",
    linguas: {
      pt:      "Portugais (Brésil)",
      "pt-pt": "Portugais (Portugal)",
      en:      "Anglais",
      es:      "Espagnol",
      fr:      "Français",
      de:      "Allemand",
      it:      "Italien",
      zh:      "中文 (Chine)",
      ja:      "日本語 (Japon)",
      ko:      "한국어 (Corée)",
    },
  },
  de: {
    titulo: "Eine mehrsprachige Erfahrung für globale Teams",
    linguas: {
      pt:      "Portugiesisch (Brasilien)",
      "pt-pt": "Portugiesisch (Portugal)",
      en:      "Englisch",
      es:      "Spanisch",
      fr:      "Französisch",
      de:      "Deutsch",
      it:      "Italienisch",
      zh:      "中文 (China)",
      ja:      "日本語 (Japan)",
      ko:      "한국어 (Korea)",
    },
  },
  it: {
    titulo: "Un'esperienza multilingue per i team globali",
    linguas: {
      pt:      "Portoghese (Brasile)",
      "pt-pt": "Portoghese (Portogallo)",
      en:      "Inglese",
      es:      "Spagnolo",
      fr:      "Francese",
      de:      "Tedesco",
      it:      "Italiano",
      zh:      "中文 (Cina)",
      ja:      "日本語 (Giappone)",
      ko:      "한국어 (Corea)",
    },
  },
  zh: {
    titulo: "面向全球团队的多语言体验",
    linguas: {
      pt:      "葡萄牙语（巴西）",
      "pt-pt": "葡萄牙语（葡萄牙）",
      en:      "英语",
      es:      "西班牙语",
      fr:      "法语",
      de:      "德语",
      it:      "意大利语",
      zh:      "中文（中国）",
      ja:      "日语（日本）",
      ko:      "韩语（韩国）",
    },
  },
  ja: {
    titulo: "グローバルチームのための多言語エクスペリエンス",
    linguas: {
      pt:      "ポルトガル語（ブラジル）",
      "pt-pt": "ポルトガル語（ポルトガル）",
      en:      "英語",
      es:      "スペイン語",
      fr:      "フランス語",
      de:      "ドイツ語",
      it:      "イタリア語",
      zh:      "中国語（中国）",
      ja:      "日本語",
      ko:      "韓国語（韓国）",
    },
  },
  ko: {
    titulo: "글로벌 팀을 위한 다국어 경험",
    linguas: {
      pt:      "포르투갈어 (브라질)",
      "pt-pt": "포르투갈어 (포르투갈)",
      en:      "영어",
      es:      "스페인어",
      fr:      "프랑스어",
      de:      "독일어",
      it:      "이탈리아어",
      zh:      "중국어 (중국)",
      ja:      "일본어 (일본)",
      ko:      "한국어",
    },
  },
};

const LANG_ORDER: Lang[] = ["pt", "pt-pt", "en", "es", "fr", "de", "it", "zh", "ja", "ko"];

// ── Flag helper (24px) ────────────────────────────────────────────────────────
function FlagImg({ code }: { code: Lang }) {
  const f = FLAGS[code];
  return (
    <div className="flex flex-col items-center justify-center overflow-clip shrink-0 size-[24px]">
      <div className="flex-[1_0_0] min-h-px relative w-full" style={{ aspectRatio: `${f.aspectW}/${f.aspectH}` }}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={f.src} />
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function IdiomasGrid() {
  const { lang, setLang } = useLang();
  const t = T[lang];

  return (
    <div className="bg-white border border-[#e6e6e6] flex flex-col gap-[20px] items-start overflow-clip p-[20px] rounded-[20px] w-full">

      <p className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[22px] text-[#07235c] w-full">
        {t.titulo}
      </p>

      <div className="flex flex-wrap gap-[10px] items-center justify-center w-full">
        {LANG_ORDER.map((code) => {
          const isActive = code === lang;
          return (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`flex flex-[1_0_0] gap-[10px] items-center min-h-[60px] min-w-[150px] p-[10px] rounded-[12px] border text-left transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#f0f4ff] border-[#0233c3]"
                  : "bg-white border-[#e6e6e6] hover:border-[#0233c3] hover:bg-[#f8faff]"
              }`}
            >
              <FlagImg code={code} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[14px] leading-[normal] text-[#333] flex-[1_0_0] min-w-px">
                {t.linguas[code]}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
