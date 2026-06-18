"use client";
import Link from "next/link";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulOutArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgMapaMundi = "/figma-assets/image-mapa-mundi.webp";
const imgPlanetWeb = "/figma-assets/icon-planetweb-30px-c.svg";  // 30×30 sq

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  regionsTitle: string;
  regions: { name: string; countries: string }[];
  cardTitle: string;
  cardDesc: string;
  cta: string;
}> = {
  pt: {
    heading1: "Presença global",
    heading2: " em crescimento",
    subtitle: "Uma rede internacional sólida, conectando pessoas, tecnologia e oportunidades.",
    regionsTitle: "Regiões em expansão",
    regions: [
      { name: "América do Norte",       countries: "EUA • Canadá • México" },
      { name: "América do Sul",         countries: "Brasil • Argentina • Colômbia • Chile • Peru e outros" },
      { name: "Europa",                 countries: "Reino Unido • Espanha • França • Alemanha • Itália e outros" },
      { name: "África e Oriente Médio", countries: "EAU • Arábia Saudita • África do Sul e outros" },
      { name: "Ásia Pacífico",          countries: "Austrália • Singapura • Índia • Japão e outros" },
    ],
    cardTitle: "Novos mercados, novas oportunidades",
    cardDesc: "Buscamos parceiros visionários para levar a Plataforma Acquafy a ainda mais cidades e comunidades, oferecendo impacto real e retorno sustentável.",
    cta: "Explore oportunidades",
  },
  "pt-pt": {
    heading1: "Presença global",
    heading2: " em crescimento",
    subtitle: "Uma rede internacional sólida, a ligar pessoas, tecnologia e oportunidades.",
    regionsTitle: "Regiões em expansão",
    regions: [
      { name: "América do Norte",       countries: "EUA • Canadá • México" },
      { name: "América do Sul",         countries: "Brasil • Argentina • Colômbia • Chile • Peru e outros" },
      { name: "Europa",                 countries: "Reino Unido • Espanha • França • Alemanha • Itália e outros" },
      { name: "África e Médio Oriente", countries: "EAU • Arábia Saudita • África do Sul e outros" },
      { name: "Ásia Pacífico",          countries: "Austrália • Singapura • Índia • Japão e outros" },
    ],
    cardTitle: "Novos mercados, novas oportunidades",
    cardDesc: "Procuramos parceiros visionários para levar a Plataforma Acquafy a ainda mais cidades e comunidades, oferecendo impacto real e retorno sustentável.",
    cta: "Explorar oportunidades",
  },
  en: {
    heading1: "Global presence",
    heading2: " in growth",
    subtitle: "A solid international network, connecting people, technology and opportunities.",
    regionsTitle: "Expanding regions",
    regions: [
      { name: "North America",          countries: "USA • Canada • Mexico" },
      { name: "South America",          countries: "Brazil • Argentina • Colombia • Chile • Peru and others" },
      { name: "Europe",                 countries: "UK • Spain • France • Germany • Italy and others" },
      { name: "Africa & Middle East",   countries: "UAE • Saudi Arabia • South Africa and others" },
      { name: "Asia Pacific",           countries: "Australia • Singapore • India • Japan and others" },
    ],
    cardTitle: "New markets, new opportunities",
    cardDesc: "We seek visionary partners to bring the Acquafy Platform to even more cities and communities, offering real impact and sustainable returns.",
    cta: "Explore opportunities",
  },
  es: {
    heading1: "Presencia global",
    heading2: " en crecimiento",
    subtitle: "Una sólida red internacional que conecta personas, tecnología y oportunidades.",
    regionsTitle: "Regiones en expansión",
    regions: [
      { name: "América del Norte",      countries: "EE.UU. • Canadá • México" },
      { name: "América del Sur",        countries: "Brasil • Argentina • Colombia • Chile • Perú y otros" },
      { name: "Europa",                 countries: "Reino Unido • España • Francia • Alemania • Italia y otros" },
      { name: "África y Oriente Medio", countries: "EAU • Arabia Saudita • Sudáfrica y otros" },
      { name: "Asia Pacífico",          countries: "Australia • Singapur • India • Japón y otros" },
    ],
    cardTitle: "Nuevos mercados, nuevas oportunidades",
    cardDesc: "Buscamos socios visionarios para llevar la Plataforma Acquafy a más ciudades y comunidades, ofreciendo impacto real y retorno sostenible.",
    cta: "Explorar oportunidades",
  },
  fr: {
    heading1: "Présence mondiale",
    heading2: " en croissance",
    subtitle: "Un réseau international solide, connectant les personnes, la technologie et les opportunités.",
    regionsTitle: "Régions en expansion",
    regions: [
      { name: "Amérique du Nord",        countries: "États-Unis • Canada • Mexique" },
      { name: "Amérique du Sud",         countries: "Brésil • Argentine • Colombie • Chili • Pérou et autres" },
      { name: "Europe",                  countries: "Royaume-Uni • Espagne • France • Allemagne • Italie et autres" },
      { name: "Afrique et Moyen-Orient", countries: "EAU • Arabie saoudite • Afrique du Sud et autres" },
      { name: "Asie-Pacifique",          countries: "Australie • Singapour • Inde • Japon et autres" },
    ],
    cardTitle: "Nouveaux marchés, nouvelles opportunités",
    cardDesc: "Nous recherchons des partenaires visionnaires pour apporter la Plateforme Acquafy à encore plus de villes et de communautés, offrant un impact réel et des retours durables.",
    cta: "Explorer les opportunités",
  },
  de: {
    heading1: "Globale Präsenz",
    heading2: " im Wachstum",
    subtitle: "Ein solides internationales Netzwerk, das Menschen, Technologie und Chancen verbindet.",
    regionsTitle: "Wachstumsregionen",
    regions: [
      { name: "Nordamerika",             countries: "USA • Kanada • Mexiko" },
      { name: "Südamerika",              countries: "Brasilien • Argentinien • Kolumbien • Chile • Peru und andere" },
      { name: "Europa",                  countries: "Vereinigtes Königreich • Spanien • Frankreich • Deutschland • Italien und andere" },
      { name: "Afrika & Naher Osten",    countries: "VAE • Saudi-Arabien • Südafrika und andere" },
      { name: "Asien-Pazifik",           countries: "Australien • Singapur • Indien • Japan und andere" },
    ],
    cardTitle: "Neue Märkte, neue Chancen",
    cardDesc: "Wir suchen visionäre Partner, um die Acquafy Plattform in noch mehr Städte und Gemeinden zu bringen und echten Impact sowie nachhaltigen Ertrag zu bieten.",
    cta: "Chancen erkunden",
  },
  it: {
    heading1: "Presenza globale",
    heading2: " in crescita",
    subtitle: "Una solida rete internazionale che connette persone, tecnologia e opportunità.",
    regionsTitle: "Regioni in espansione",
    regions: [
      { name: "Nord America",            countries: "USA • Canada • Messico" },
      { name: "Sud America",             countries: "Brasile • Argentina • Colombia • Cile • Perù e altri" },
      { name: "Europa",                  countries: "Regno Unito • Spagna • Francia • Germania • Italia e altri" },
      { name: "Africa e Medio Oriente",  countries: "EAU • Arabia Saudita • Sudafrica e altri" },
      { name: "Asia Pacifico",           countries: "Australia • Singapore • India • Giappone e altri" },
    ],
    cardTitle: "Nuovi mercati, nuove opportunità",
    cardDesc: "Cerchiamo partner visionari per portare la Piattaforma Acquafy in ancora più città e comunità, offrendo impatto reale e rendimenti sostenibili.",
    cta: "Esplora le opportunità",
  },
  zh: {
    heading1: "全球存在",
    heading2: "持续增长",
    subtitle: "坚实的国际网络，连接人员、技术与机遇。",
    regionsTitle: "扩张中的地区",
    regions: [
      { name: "北美",       countries: "美国 • 加拿大 • 墨西哥" },
      { name: "南美",       countries: "巴西 • 阿根廷 • 哥伦比亚 • 智利 • 秘鲁等" },
      { name: "欧洲",       countries: "英国 • 西班牙 • 法国 • 德国 • 意大利等" },
      { name: "非洲与中东", countries: "阿联酋 • 沙特阿拉伯 • 南非等" },
      { name: "亚太地区",   countries: "澳大利亚 • 新加坡 • 印度 • 日本等" },
    ],
    cardTitle: "新市场，新机遇",
    cardDesc: "我们寻求有远见的合作伙伴，将 Acquafy 平台带到更多城市和社区，提供真实影响与可持续回报。",
    cta: "探索机遇",
  },
  ja: {
    heading1: "グローバルプレゼンス",
    heading2: "成長中",
    subtitle: "人・技術・機会をつなぐ、強固な国際ネットワーク。",
    regionsTitle: "拡大中の地域",
    regions: [
      { name: "北米",           countries: "米国 • カナダ • メキシコ" },
      { name: "南米",           countries: "ブラジル • アルゼンチン • コロンビア • チリ • ペルーほか" },
      { name: "ヨーロッパ",     countries: "英国 • スペイン • フランス • ドイツ • イタリアほか" },
      { name: "アフリカ・中東", countries: "UAE • サウジアラビア • 南アフリカほか" },
      { name: "アジア太平洋",   countries: "オーストラリア • シンガポール • インド • 日本ほか" },
    ],
    cardTitle: "新たな市場、新たな機会",
    cardDesc: "私たちは、Acquafy プラットフォームをより多くの都市やコミュニティに届け、真のインパクトと持続可能なリターンをもたらすビジョナリーパートナーを求めています。",
    cta: "機会を探る",
  },
  ko: {
    heading1: "글로벌 존재감",
    heading2: "성장 중",
    subtitle: "사람, 기술, 기회를 연결하는 견고한 국제 네트워크.",
    regionsTitle: "확장 중인 지역",
    regions: [
      { name: "북미",        countries: "미국 • 캐나다 • 멕시코" },
      { name: "남미",        countries: "브라질 • 아르헨티나 • 콜롬비아 • 칠레 • 페루 외" },
      { name: "유럽",        countries: "영국 • 스페인 • 프랑스 • 독일 • 이탈리아 외" },
      { name: "아프리카·중동", countries: "UAE • 사우디아라비아 • 남아프리카공화국 외" },
      { name: "아시아 태평양", countries: "호주 • 싱가포르 • 인도 • 일본 외" },
    ],
    cardTitle: "새로운 시장, 새로운 기회",
    cardDesc: "더 많은 도시와 커뮤니티에 Acquafy 플랫폼을 전달하고 실질적인 영향과 지속 가능한 수익을 제공할 비전 있는 파트너를 찾고 있습니다.",
    cta: "기회 탐색하기",
  },
};

export default function ExpansaoGlobalPresenca() {
  const { lang } = useLang();
  const t = T[lang];
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Section header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] w-full">
            <span className="text-[#0569ff]">{t.heading1}</span>
            <span className="text-[#1f2e91]">{t.heading2}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-[20px] items-stretch justify-center w-full">

          {/* Map card */}
          <div className="bg-[#f6f9fe] flex w-full lg:flex-[1_0_0] flex-col items-center justify-center overflow-hidden px-[10px] py-[20px] rounded-[16px]">
            <div className="flex flex-wrap gap-[20px] items-center pl-[20px] w-full">

              {/* World map */}
              <div className="flex flex-[1_0_0] flex-col items-center justify-center min-w-[280px]">
                <img
                  alt="Mapa mundial Acquafy"
                  className="w-full max-w-[500px] max-h-[280px] object-contain mix-blend-multiply"
                  src={imgMapaMundi}
                />
              </div>

              {/* Regions list */}
              <div className="flex flex-[1_0_0] flex-col gap-[40px] items-start max-w-[360px] min-w-[280px]">
                <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">
                  {t.regionsTitle}
                </h3>
                <div className="flex flex-col gap-[20px] items-start w-full">
                  {t.regions.map((r) => (
                    <div key={r.name} className="flex gap-[10px] items-start w-full">
                      <div className="bg-[#8bbaf2] rounded-full shrink-0 size-[14px] mt-[1px]" />
                      <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] w-full">
                          {r.name}
                        </p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333] w-full">
                          {r.countries}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Opportunities card */}
          <div className="bg-[#f1f5fe] flex w-full lg:flex-[1_0_0] flex-col gap-[20px] items-center self-start lg:self-auto lg:max-w-[370px] min-w-[280px] overflow-hidden p-[20px] rounded-[16px]">
            {/* Icon */}
            <div className="bg-[#f6f9fe] border border-[#e2e7fb] flex flex-col items-center justify-center rounded-full shrink-0 size-[100px]">
              <FigmaIcon src={imgPlanetWeb} size={40} />
            </div>

            <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center min-h-[50px]">
              {t.cardTitle}
            </h3>

            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center">
              {t.cardDesc}
            </p>

            <Link href="/parceria" className="w-full">
              <BtnAzulOutArrow className="w-full min-h-[40px]">
                {t.cta}
              </BtnAzulOutArrow>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
