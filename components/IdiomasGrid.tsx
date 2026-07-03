"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

// ── Flag assets (24px cards) ──────────────────────────────────────────────────
const FLAGS: Record<Lang, { src: string; aspectW: number; aspectH: number }> = {
  pt:      { src: "/figma-assets/flag-br.svg",       aspectW: 512,   aspectH: 512   },
  "pt-pt": { src: "/figma-assets/flag-pt.svg",       aspectW: 1,     aspectH: 1     },
  en:      { src: "/figma-assets/flag-usa-30px.svg", aspectW: 18,    aspectH: 18    },
  "en-gb": { src: "/figma-assets/flag-uk.svg",       aspectW: 20,    aspectH: 20    },
  es:      { src: "/figma-assets/flag-es.svg",       aspectW: 22,    aspectH: 22    },
  fr:      { src: "/figma-assets/flag-fr.svg",       aspectW: 30,    aspectH: 30    },
  de:      { src: "/figma-assets/flag-de.svg",       aspectW: 306.6, aspectH: 306.7 },
  it:      { src: "/figma-assets/flag-it.svg",       aspectW: 30,    aspectH: 30    },
  zh:      { src: "/figma-assets/flag-zh.svg",       aspectW: 512,   aspectH: 512   },
  ja:      { src: "/figma-assets/flag-ja.svg",       aspectW: 512,   aspectH: 512   },
  ko:      { src: "/figma-assets/flag-ko.svg",       aspectW: 374,   aspectH: 374   },
  sv:      { src: "/figma-assets/flag-sv.svg",       aspectW: 512,   aspectH: 512   },
  fi:      { src: "/figma-assets/flag-fi.svg",       aspectW: 512,   aspectH: 512   },
  ru:      { src: "/figma-assets/flag-ru.svg",       aspectW: 512,   aspectH: 512   },
  ro:      { src: "/figma-assets/flag-ro.svg",       aspectW: 326,   aspectH: 326   },
  he:      { src: "/figma-assets/flag-he.svg",       aspectW: 512,   aspectH: 512   },
};

// ── Native labels (fixed — always shown in the language's own script) ─────────
const NATIVE_LABELS: Record<Lang, string> = {
  pt:      "Português (Brasil)",
  "pt-pt": "Português (Portugal)",
  en:      "English (Global)",
  "en-gb": "English (England)",
  es:      "Español",
  fr:      "Français",
  de:      "Deutsch",
  it:      "Italiano",
  zh:      "中文",
  ja:      "日本語 (日本)",
  ko:      "한국어 (한국)",
  sv:      "Svenska (Sverige)",
  fi:      "Suomi",
  ru:      "Русский",
  ro:      "Română (România)",
  he:      "עברית (ישראל)",
};

// ── Translations ──────────────────────────────────────────────────────────────
const T: Record<Lang, { titulo: string }> = {
  pt:      { titulo: "Uma experiência multilíngue para equipes globais" },
  "pt-pt": { titulo: "Uma experiência multilingue para equipas globais" },
  en:      { titulo: "A multilingual experience for global teams" },
  "en-gb": { titulo: "A multilingual experience for global teams" },
  es:      { titulo: "Una experiencia multilingüe para equipos globales" },
  fr:      { titulo: "Une expérience multilingue pour les équipes mondiales" },
  de:      { titulo: "Eine mehrsprachige Erfahrung für globale Teams" },
  it:      { titulo: "Un'esperienza multilingue per i team globali" },
  zh:      { titulo: "面向全球团队的多语言体验" },
  ja:      { titulo: "グローバルチームのための多言語エクスペリエンス" },
  ko:      { titulo: "글로벌 팀을 위한 다국어 경험" },
  sv:      { titulo: "En flerspråkig upplevelse för globala team" },
  fi:      { titulo: "Monikielinen kokemus globaaleille tiimeille" },
  ru:      { titulo: "Многоязычный опыт для глобальных команд" },
  ro:      { titulo: "O experiență multilingvă pentru echipe globale" },
  he:      { titulo: "חוויה רב-לשונית לצוותים גלובליים" },
};

const LANG_ORDER: Lang[] = ["pt", "pt-pt", "en", "en-gb", "es", "fr", "de", "it", "zh", "ja", "ko", "sv", "fi", "ru", "ro", "he"];

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
    <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-start p-[20px] rounded-[20px] w-full">

      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#07235c]">
        {t.titulo}
      </p>

      <div className="flex flex-wrap gap-[10px] items-center justify-center w-full">
        {LANG_ORDER.map((code) => {
          const isActive = code === lang;
          return (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`flex flex-[1_0_0] gap-[10px] items-center min-h-[60px] min-w-[150px] p-[10px] rounded-[12px] text-left transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#f0f4ff]"
                  : "bg-white hover:bg-[#f8faff]"
              }`}
            >
              <FlagImg code={code} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[14px] leading-[normal] text-[#333] flex-[1_0_0] min-w-px">
                {NATIVE_LABELS[code]}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
