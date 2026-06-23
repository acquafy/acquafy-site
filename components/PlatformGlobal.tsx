"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgLocation  = "/figma-assets/icon-location-a.svg";
const imgLanguage  = "/figma-assets/icon-language-b.svg";
const imgEcossist  = "/figma-assets/icon-ecossistema.svg";
const imgMoney     = "/figma-assets/icon-money-e.svg";
const imgMap       = "/figma-assets/map-image.webp";

const statIcons = [
  { icon: imgLocation,  iconW: 42,    iconH: 42, value: "180+" },
  { icon: imgLanguage,  iconW: 70,    iconH: 70, value: "16"   },
  { icon: imgEcossist,  iconW: 38,    iconH: 40, value: "100%" },
  { icon: imgMoney,     iconW: 33.33, iconH: 30, value: "100%" },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  descs: string[];
}> = {
  pt: {
    heading1: "Operação ",
    heading2: "global e escalável",
    descs: [
      "Presente em + de 180 países",
      "Disponível em 16 idiomas",
      "Operação 100% global",
      "Modelo de receita 100% recorrente",
    ],
  },
  "pt-pt": {
    heading1: "Operação ",
    heading2: "global e escalável",
    descs: [
      "Presente em mais de 180 países",
      "Disponível em 16 idiomas",
      "Operação 100% global",
      "Modelo de receita 100% recorrente",
    ],
  },
  en: {
    heading1: "Global and ",
    heading2: "scalable operation",
    descs: [
      "Present in 180+ countries",
      "Available in 16 languages",
      "100% global operation",
      "100% recurring revenue model",
    ],
  },
  "en-gb": {
    heading1: "Global and ",
    heading2: "scalable operation",
    descs: [
      "Present in 180+ countries",
      "Available in 16 languages",
      "100% global operation",
      "100% recurring revenue model",
    ],
  },
  es: {
    heading1: "Operación ",
    heading2: "global y escalable",
    descs: [
      "Presente en más de 180 países",
      "Disponible en 16 idiomas",
      "Operación 100% global",
      "Modelo de ingresos 100% recurrente",
    ],
  },
  fr: {
    heading1: "Opération ",
    heading2: "mondiale et évolutive",
    descs: [
      "Présent dans 180+ pays",
      "Disponible en 16 langues",
      "Opération 100% mondiale",
      "Modèle de revenus 100% récurrent",
    ],
  },
  de: {
    heading1: "Globaler und ",
    heading2: "skalierbarer Betrieb",
    descs: [
      "Präsent in 180+ Ländern",
      "Verfügbar in 16 Sprachen",
      "100% globaler Betrieb",
      "100% wiederkehrendes Umsatzmodell",
    ],
  },
  it: {
    heading1: "Operazione ",
    heading2: "globale e scalabile",
    descs: [
      "Presente in 180+ paesi",
      "Disponibile in 16 lingue",
      "Operazione 100% globale",
      "Modello di ricavi 100% ricorrente",
    ],
  },
  zh: {
    heading1: "全球化",
    heading2: "可扩展运营",
    descs: [
      "覆盖 180+ 个国家",
      "支持 16 种语言",
      "100% 全球化运营",
      "100% 经常性收入模式",
    ],
  },
  ja: {
    heading1: "グローバルで",
    heading2: "スケーラブルな運営",
    descs: [
      "180か国以上に展開",
      "16言語対応",
      "100%グローバル運営",
      "100%リカーリング収益モデル",
    ],
  },
  ko: {
    heading1: "글로벌하고 ",
    heading2: "확장 가능한 운영",
    descs: [
      "180개국 이상 진출",
      "16개 언어 지원",
      "100% 글로벌 운영",
      "100% 반복 수익 모델",
    ],
  },
  sv: {
    heading1: "Global och ",
    heading2: "skalbar verksamhet",
    descs: [
      "Närvarande i 180+ länder",
      "Tillgänglig på 16 språk",
      "100% global verksamhet",
      "100% återkommande intäktsmodell",
    ],
  },
  fi: {
    heading1: "Globaali ja ",
    heading2: "skaalautuva toiminta",
    descs: [
      "Läsnä yli 180 maassa",
      "Saatavilla 16 kielellä",
      "100% globaali toiminta",
      "100% toistuva tuottomalli",
    ],
  },
  ru: {
    heading1: "Глобальная и ",
    heading2: "масштабируемая работа",
    descs: [
      "Присутствие в 180+ странах",
      "Доступно на 16 языках",
      "100% глобальная работа",
      "100% модель повторяющегося дохода",
    ],
  },
  ro: {
    heading1: "Operatiune ",
    heading2: "globala si scalabila",
    descs: [
      "Prezent in 180+ tari",
      "Disponibil in 16 limbi",
      "Operatiune 100% globala",
      "Model de venituri 100% recurente",
    ],
  },
  he: {
    heading1: "פעולה ",
    heading2: "גלובלית וניתנת להרחבה",
    descs: [
      "נוכחות ב-180+ מדינות",
      "זמין ב-16 שפות",
      "פעולה 100% גלובלית",
      "מודל הכנסה חוזרת 100%",
    ],
  },
};

export default function PlatformGlobal() {
  const { lang } = useLang();
  const t = T[lang];

  const stats = statIcons.map((ico, i) => ({ ...ico, desc: t.descs[i] }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] relative w-full">
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] relative w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        <div className="flex flex-col win-1280:flex-row win-1280:flex-wrap gap-[20px] items-center justify-center w-full">

          {/* Cards */}
          <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-stretch min-w-px">
            {stats.map((s) => (
              <div key={s.desc} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[170px] min-w-[160px] p-[20px] rounded-[16px]">
                <div className="flex items-center justify-center shrink-0 size-[40px]">
                  <FigmaIcon src={s.icon} size={40} aspectW={s.iconW} aspectH={s.iconH} />
                </div>
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#1f2e91] text-center w-full">
                  {s.value}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mapa mundial */}
          <div className="flex flex-[1_0_0] items-center justify-end max-w-[400px] min-w-px">
            <img
              alt=""
              className="h-[253px] mix-blend-multiply opacity-70 object-contain pointer-events-none"
              style={{ width: "400px" }}
              src={imgMap}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
