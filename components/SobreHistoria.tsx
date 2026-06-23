"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Timeline icon assets ──────────────────────────────────────────────────────
const imgWater     = "/figma-assets/icon-water-fundacao-2020.svg"; // 2020 Fundação
const imgContainer = "/figma-assets/icon-container.svg"; // 2021 Desenvolvimento
const imgBpmPlay   = "/figma-assets/icon-bpm-play.svg"; // 2024 Ecossistema Neo
const imgWifi      = "/figma-assets/icon-wifi-2025.svg"; // 2025 Conectividade
const imgGlobe     = "/figma-assets/icon-globe-nova-fase.svg"; // 2026+ Nova fase
const imgArrow     = "/figma-assets/icon-arrow-connector.svg"; // connector arrow (not last)
const imgArrowEnd  = "/figma-assets/icon-arrow-end.svg"; // last item arrow

type TimelineItem = {
  icon: string; year: string; phase: string; description: string;
  isLast: boolean; aspectW?: number; aspectH?: number;
};

const T: Record<Lang, {
  heading: string;
  items: { phase: string; description: string }[];
}> = {
  pt: {
    heading: "Nossa Historia",
    items: [
      { phase: "Fundacao",        description: "A Acquafy e fundada nos EUA com o proposito de transformar e formar como o mundo cuida da agua." },
      { phase: "Desenvolvimento", description: "Desenvolvimento da linha inicial de produtos e da plataforma de gestao inteligente." },
      { phase: "Ecossistema Neo", description: "Lancamento do ecossistema Neo e do Acquafy Media Network para educacao, conteudo e engajamento." },
      { phase: "Conectividade",   description: "Expansao da plataforma com App + IA + IoT conectando dispositivos e pessoas." },
      { phase: "Nova fase global",description: "Nova fase de crescimento com presenca global escalavel e expansao da rede de parceiros." },
    ],
  },
  "pt-pt": {
    heading: "A Nossa Historia",
    items: [
      { phase: "Fundacao",        description: "A Acquafy e fundada nos EUA com o proposito de transformar a forma como o mundo cuida da agua." },
      { phase: "Desenvolvimento", description: "Desenvolvimento da linha inicial de produtos e da plataforma de gestao inteligente." },
      { phase: "Ecossistema Neo", description: "Lancamento do ecossistema Neo e do Acquafy Media Network para educacao, conteudo e envolvimento." },
      { phase: "Conectividade",   description: "Expansao da plataforma com App + IA + IoT a ligar dispositivos e pessoas." },
      { phase: "Nova fase global",description: "Nova fase de crescimento com presenca global escalavel e expansao da rede de parceiros." },
    ],
  },
  en: {
    heading: "Our History",
    items: [
      { phase: "Foundation",      description: "Acquafy is founded in the USA with the purpose of transforming how the world cares for water." },
      { phase: "Development",     description: "Development of the initial product line and the intelligent management platform." },
      { phase: "Neo Ecosystem",   description: "Launch of the Neo ecosystem and Acquafy Media Network for education, content and engagement." },
      { phase: "Connectivity",    description: "Platform expansion with App + AI + IoT connecting devices and people." },
      { phase: "New global phase",description: "New growth phase with scalable global presence and expansion of the partner network." },
    ],
  },
  "en-gb": {
    heading: "Our History",
    items: [
      { phase: "Foundation",      description: "Acquafy is founded in the USA with the purpose of transforming how the world cares for water." },
      { phase: "Development",     description: "Development of the initial product line and the intelligent management platform." },
      { phase: "Neo Ecosystem",   description: "Launch of the Neo ecosystem and Acquafy Media Network for education, content and engagement." },
      { phase: "Connectivity",    description: "Platform expansion with App + AI + IoT connecting devices and people." },
      { phase: "New global phase",description: "New growth phase with scalable global presence and expansion of the partner network." },
    ],
  },
  es: {
    heading: "Nuestra Historia",
    items: [
      { phase: "Fundacion",        description: "Acquafy es fundada en EE.UU. con el proposito de transformar la manera en que el mundo cuida el agua." },
      { phase: "Desarrollo",       description: "Desarrollo de la linea inicial de productos y de la plataforma de gestion inteligente." },
      { phase: "Ecosistema Neo",   description: "Lanzamiento del ecosistema Neo y del Acquafy Media Network para educacion, contenido y engagement." },
      { phase: "Conectividad",     description: "Expansion de la plataforma con App + IA + IoT conectando dispositivos y personas." },
      { phase: "Nueva fase global",description: "Nueva fase de crecimiento con presencia global escalable y expansion de la red de socios." },
    ],
  },
  fr: {
    heading: "Notre Histoire",
    items: [
      { phase: "Fondation",          description: "Acquafy est fondee aux Etats-Unis avec pour mission de transformer la facon dont le monde prend soin de l'eau." },
      { phase: "Developpement",      description: "Developpement de la gamme initiale de produits et de la plateforme de gestion intelligente." },
      { phase: "Ecosysteme Neo",     description: "Lancement de l'ecosysteme Neo et du Acquafy Media Network pour l'education, le contenu et l'engagement." },
      { phase: "Connectivite",       description: "Expansion de la plateforme avec App + IA + IoT connectant appareils et personnes." },
      { phase: "Nouvelle phase mondiale", description: "Nouvelle phase de croissance avec une presence mondiale evolutive et l'expansion du reseau de partenaires." },
    ],
  },
  de: {
    heading: "Unsere Geschichte",
    items: [
      { phase: "Grundung",           description: "Acquafy wird in den USA gegrundet mit dem Ziel, die Art und Weise zu verandern, wie die Welt mit Wasser umgeht." },
      { phase: "Entwicklung",        description: "Entwicklung der ersten Produktlinie und der intelligenten Managementplattform." },
      { phase: "Neo-Okosystem",      description: "Launch des Neo-Okosystems und des Acquafy Media Network fur Bildung, Content und Engagement." },
      { phase: "Konnektivitat",      description: "Plattformerweiterung mit App + KI + IoT, die Gerate und Menschen verbindet." },
      { phase: "Neue globale Phase", description: "Neue Wachstumsphase mit skalierbarer globaler Prasenz und Ausbau des Partnernetzwerks." },
    ],
  },
  it: {
    heading: "La Nostra Storia",
    items: [
      { phase: "Fondazione",         description: "Acquafy viene fondata negli USA con lo scopo di trasformare il modo in cui il mondo si prende cura dell'acqua." },
      { phase: "Sviluppo",           description: "Sviluppo della linea iniziale di prodotti e della piattaforma di gestione intelligente." },
      { phase: "Ecosistema Neo",     description: "Lancio dell'ecosistema Neo e di Acquafy Media Network per educazione, contenuti e engagement." },
      { phase: "Connettivita",       description: "Espansione della piattaforma con App + IA + IoT che collegano dispositivi e persone." },
      { phase: "Nuova fase globale", description: "Nuova fase di crescita con presenza globale scalabile ed espansione della rete di partner." },
    ],
  },
  zh: {
    heading: "我们的历史",
    items: [
      { phase: "成立",       description: "Acquafy 在美国成立，致力于改变全世界对水资源的管理方式。" },
      { phase: "研发",       description: "开发初始产品线及智能管理平台。" },
      { phase: "Neo 生态系统", description: "推出 Neo 生态系统及 Acquafy Media Network，服务于教育、内容与互动。" },
      { phase: "连接性",     description: "通过 App + AI + IoT 扩展平台，连接设备与用户。" },
      { phase: "全球新阶段", description: "以可扩展的全球存在开启新增长阶段，并扩大合作伙伴网络。" },
    ],
  },
  ja: {
    heading: "私たちの歴史",
    items: [
      { phase: "設立",             description: "Acquafy は、世界が水と向き合う方法を変革するという目的のもと、米国で設立されました。" },
      { phase: "開発",             description: "初期製品ラインとインテリジェント管理プラットフォームの開発。" },
      { phase: "Neo エコシステム", description: "Neoエコシステムと Acquafy Media Network を教育・コンテンツ・エンゲージメント向けにローンチ。" },
      { phase: "コネクティビティ", description: "App + AI + IoT でデバイスと人をつなぐプラットフォームの拡張。" },
      { phase: "新たなグローバルフェーズ", description: "スケーラブルなグローバル展開とパートナーネットワーク拡大による新成長フェーズ。" },
    ],
  },
  ko: {
    heading: "우리의 역사",
    items: [
      { phase: "설립",          description: "Acquafy 는 세계가 물을 관리하는 방식을 변화시키려는 목적으로 미국에서 설립되었습니다." },
      { phase: "개발",          description: "초기 제품 라인 및 지능형 관리 플랫폼 개발." },
      { phase: "Neo 생태계",    description: "교육, 콘텐츠, 참여를 위한 Neo 생태계 및 Acquafy Media Network 런칭." },
      { phase: "연결성",        description: "App + AI + IoT로 기기와 사람을 연결하는 플랫폼 확장." },
      { phase: "새로운 글로벌 단계", description: "확장 가능한 글로벌 존재감과 파트너 네트워크 확대를 통한 새로운 성장 단계." },
    ],
  },
  sv: {
    heading: "Var historia",
    items: [
      { phase: "Grundande",          description: "Acquafy grundas i USA med syftet att forandras hur varlden tar hand om vatten." },
      { phase: "Utveckling",         description: "Utveckling av den initiala produktlinjen och den intelligenta hanteringsplattformen." },
      { phase: "Neo-ekosystem",      description: "Lansering av Neo-ekosystemet och Acquafy Media Network for utbildning, innehall och engagemang." },
      { phase: "Uppkoppling",        description: "Plattformsutbyggnad med App + AI + IoT som kopplar samman enheter och manniskor." },
      { phase: "Ny global fas",      description: "Ny tillvaxtfas med skalbar global narvaro och expansion av partnernatverket." },
    ],
  },
  fi: {
    heading: "Historiamme",
    items: [
      { phase: "Perustaminen",        description: "Acquafy perustetaan Yhdysvalloissa tarkoituksena muuttaa tapaa, jolla maailma huolehtii vedesta." },
      { phase: "Kehitys",             description: "Alkuperaisen tuotesarjan ja alykkaan hallinta-alustan kehittaminen." },
      { phase: "Neo-ekosysteemi",     description: "Neo-ekosysteemin ja Acquafy Media Networkin lanseeraus koulutusta, sisaltoa ja sitoutumista varten." },
      { phase: "Yhdistyvyys",         description: "Alustan laajentaminen App + AI + IoT:lla yhdistamalla laitteet ja ihmiset." },
      { phase: "Uusi globaali vaihe", description: "Uusi kasvuvaihe skaalautuvalla globaalilla lasnaololla ja kumppaniverkoston laajentamisella." },
    ],
  },
  ru: {
    heading: "Nasha istoriya",
    items: [
      { phase: "Osnovanie",              description: "Acquafy osnovana v SShA s tselyu izmenit to, kak mir zabotitsya o vode." },
      { phase: "Razrabotka",             description: "Razrabotka pervonachalnoy lineyky produktov i intellektualnoy platformy upravleniya." },
      { phase: "Ekosistema Neo",         description: "Zapusk ekosistemy Neo i Acquafy Media Network dlya obrazovaniya, kontenta i vovlechennosti." },
      { phase: "Podklyuchennost",        description: "Rasshireniye platformy s pomoshchyu App + iskusstvennyy intellekt + IoT, soyedinyayushchikh ustroystva i lyudey." },
      { phase: "Novyy globalnyy etap",   description: "Novyy etap rosta s masshtabiruyemym globalnym prisutstviyem i rasshireniyem partnerskoy seti." },
    ],
  },
  ro: {
    heading: "Istoria noastra",
    items: [
      { phase: "Infiintare",         description: "Acquafy este infiintata in SUA cu scopul de a transforma modul in care lumea are grija de apa." },
      { phase: "Dezvoltare",         description: "Dezvoltarea liniei initiale de produse si a platformei de management inteligent." },
      { phase: "Ecosistem Neo",      description: "Lansarea ecosistemului Neo si a Acquafy Media Network pentru educatie, continut si implicare." },
      { phase: "Conectivitate",      description: "Extinderea platformei cu App + IA + IoT conectand dispozitive si oameni." },
      { phase: "Noua faza globala",  description: "Noua faza de crestere cu prezenta globala scalabila si extinderea retelei de parteneri." },
    ],
  },
  he: {
    heading: "ההיסטוריה שלנו",
    items: [
      { phase: "יסוד",               description: "Acquafy הוקמת בארצות הברית במטרה לשנות את האופן שבו העולם דואג למים." },
      { phase: "פיתוח",              description: "פיתוח קו המוצרים הראשוני ופלטפורמת הניהול החכם." },
      { phase: "מערכת Neo",          description: "השקת מערכת Neo ושל Acquafy Media Network לחינוך, תוכן ומעורבות." },
      { phase: "קישוריות",           description: "הרחבת הפלטפורמה עם App + בינה מלאכותית + IoT המחברים מכשירים ואנשים." },
      { phase: "שלב גלובלי חדש",    description: "שלב צמיחה חדש עם נוכחות גלובלית ניתנת להרחבה והרחבת רשת השותפים." },
    ],
  },
};

export default function SobreHistoria() {
  const { lang } = useLang();
  const t = T[lang];
  const timeline: TimelineItem[] = [
    { icon: imgWater,     year: "2020",  phase: t.items[0].phase, description: t.items[0].description, isLast: false },
    { icon: imgContainer, year: "2021",  phase: t.items[1].phase, description: t.items[1].description, isLast: false },
    { icon: imgBpmPlay,   year: "2024",  phase: t.items[2].phase, description: t.items[2].description, isLast: false },
    { icon: imgWifi,      year: "2025",  phase: t.items[3].phase, description: t.items[3].description, isLast: false, aspectW: 31.5, aspectH: 21.5 },
    { icon: imgGlobe,     year: "2026+", phase: t.items[4].phase, description: t.items[4].description, isLast: true },
  ];
  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>
        <div className="flex flex-wrap gap-[40px] items-start justify-center w-full">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[160px] rounded-[12px]"
            >
              {/* Icon + connector */}
              <div className="flex gap-[10px] items-center justify-center relative w-full">
                <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[10px] rounded-full shrink-0 size-[50px]">
                  {/* 50px circle – p-10 → 30px content area */}
                  <FigmaIcon src={item.icon} alt={item.phase} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
                </div>
                {/* Connector arrow line */}
                <div className="flex-[1_0_0] h-[9px] min-w-px relative">
                  <img
                    alt=""
                    className="absolute inset-0 w-full h-full"
                    src={item.isLast ? imgArrowEnd : imgArrow}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-[20px] items-start w-full">
                <div className="flex flex-col gap-[10px] items-start w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0233c3]">
                    {item.year}
                  </p>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#0569ff]">
                    {item.phase}
                  </p>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
