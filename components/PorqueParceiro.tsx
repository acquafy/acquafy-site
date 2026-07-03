"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgScale  = "/figma-assets/icon-scale-b.svg";  // 30×30
const imgMoney  = "/figma-assets/icon-money-33px.svg";  // 33×30
const imgGlobe  = "/figma-assets/icon-globe-30px-b.svg";  // 30×30
const imgBrain  = "/figma-assets/icon-brain-30px-c.svg";  // 30×30
const imgCrown  = "/figma-assets/icon-crown-30px.svg";  // 30×30
const imgPhone  = "/figma-assets/icon-phone-30px.svg";  // 30×30

const T: Record<Lang, {
  heading1: string;
  headingHighlight: string;
  cards: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Porque se tornar um ",
    headingHighlight: "parceiro Acquafy?",
    cards: [
      { title: "Modelo escalável",      desc: "Atue localmente com estrutura global e grande potencial de crescimento." },
      { title: "Receita recorrente",    desc: "Ganhos contínuos com vendas, mídia ou distribuição do ecossistema Neo." },
      { title: "Expansão global",       desc: "Presença em + de 180 países e 6 regiões comerciais." },
      { title: "Tecnologia inteligente", desc: "Plataforma com App, IA e IoT para mais eficiência e controle total." },
      { title: "Produtos Premium",      desc: "Purificadores Neo de alta performance para todos os perfis de mercado." },
      { title: "Suporte comercial",     desc: "Acompanhamento global com materiais, treinamentos e suporte multilíngue." },
    ],
  },
  "pt-pt": {
    heading1: "Porque tornar-se um ",
    headingHighlight: "parceiro Acquafy?",
    cards: [
      { title: "Modelo escalável",      desc: "Actue localmente com estrutura global e grande potencial de crescimento." },
      { title: "Receita recorrente",    desc: "Ganhos contínuos com vendas, média ou distribuição do ecossistema Neo." },
      { title: "Expansão global",       desc: "Presença em + de 180 países e 6 regiões comerciais." },
      { title: "Tecnologia inteligente", desc: "Plataforma com App, IA e IoT para mais eficiência e controlo total." },
      { title: "Produtos Premium",      desc: "Purificadores Neo de alta performance para todos os perfis de mercado." },
      { title: "Suporte comercial",     desc: "Acompanhamento global com materiais, formações e suporte multilingue." },
    ],
  },
  en: {
    heading1: "Why become an ",
    headingHighlight: "Acquafy partner?",
    cards: [
      { title: "Scalable model",        desc: "Act locally with a global structure and great growth potential." },
      { title: "Recurring revenue",     desc: "Continuous earnings from sales, media or distribution of the Neo ecosystem." },
      { title: "Global expansion",      desc: "Presence in more than 180 countries and 6 commercial regions." },
      { title: "Smart technology",      desc: "Platform with App, AI and IoT for more efficiency and total control." },
      { title: "Premium products",      desc: "High-performance Neo purifiers for all market profiles." },
      { title: "Commercial support",    desc: "Global support with materials, training and multilingual assistance." },
    ],
  },
  "en-gb": {
    heading1: "Why become an ",
    headingHighlight: "Acquafy partner?",
    cards: [
      { title: "Scalable model",        desc: "Act locally with a global structure and great growth potential." },
      { title: "Recurring revenue",     desc: "Continuous earnings from sales, media or distribution of the Neo ecosystem." },
      { title: "Global expansion",      desc: "Presence in more than 180 countries and 6 commercial regions." },
      { title: "Smart technology",      desc: "Platform with App, AI and IoT for greater efficiency and total control." },
      { title: "Premium products",      desc: "High-performance Neo purifiers for all market profiles." },
      { title: "Commercial support",    desc: "Global support with materials, training and multilingual assistance." },
    ],
  },
  es: {
    heading1: "¿Por qué convertirse en ",
    headingHighlight: "socio de Acquafy?",
    cards: [
      { title: "Modelo escalable",       desc: "Actúa localmente con estructura global y gran potencial de crecimiento." },
      { title: "Ingresos recurrentes",   desc: "Ganancias continuas con ventas, medios o distribución del ecosistema Neo." },
      { title: "Expansión global",       desc: "Presencia en + de 180 países y 6 regiones comerciales." },
      { title: "Tecnología inteligente", desc: "Plataforma con App, IA e IoT para más eficiencia y control total." },
      { title: "Productos Premium",      desc: "Purificadores Neo de alto rendimiento para todos los perfiles de mercado." },
      { title: "Soporte comercial",      desc: "Acompañamiento global con materiales, capacitaciones y soporte multilingüe." },
    ],
  },
  fr: {
    heading1: "Pourquoi devenir un ",
    headingHighlight: "partenaire Acquafy ?",
    cards: [
      { title: "Modèle évolutif",         desc: "Agissez localement avec une structure mondiale et un fort potentiel de croissance." },
      { title: "Revenus récurrents",       desc: "Gains continus grâce aux ventes, aux médias ou à la distribution de l'écosystème Neo." },
      { title: "Expansion mondiale",       desc: "Présence dans + de 180 pays et 6 régions commerciales." },
      { title: "Technologie intelligente", desc: "Plateforme avec App, IA et IoT pour plus d'efficacité et un contrôle total." },
      { title: "Produits Premium",         desc: "Purificateurs Neo haute performance pour tous les profils de marché." },
      { title: "Support commercial",       desc: "Accompagnement mondial avec supports, formations et assistance multilingue." },
    ],
  },
  de: {
    heading1: "Warum Acquafy-",
    headingHighlight: "Partner werden?",
    cards: [
      { title: "Skalierbares Modell",      desc: "Lokal agieren mit globaler Struktur und großem Wachstumspotenzial." },
      { title: "Wiederkehrende Einnahmen", desc: "Kontinuierliche Gewinne durch Verkäufe, Medien oder Vertrieb des Neo-Ökosystems." },
      { title: "Globale Expansion",        desc: "Präsenz in mehr als 180 Ländern und 6 Handelsregionen." },
      { title: "Intelligente Technologie", desc: "Plattform mit App, KI und IoT für mehr Effizienz und totale Kontrolle." },
      { title: "Premium-Produkte",         desc: "Hochleistungs-Neo-Wasserfilter für alle Marktsegmente." },
      { title: "Kommerzieller Support",    desc: "Globale Begleitung mit Materialien, Schulungen und mehrsprachigem Support." },
    ],
  },
  it: {
    heading1: "Perché diventare un ",
    headingHighlight: "partner Acquafy?",
    cards: [
      { title: "Modello scalabile",        desc: "Agisci localmente con una struttura globale e un grande potenziale di crescita." },
      { title: "Entrate ricorrenti",       desc: "Guadagni continui con vendite, media o distribuzione dell'ecosistema Neo." },
      { title: "Espansione globale",       desc: "Presenza in + di 180 paesi e 6 regioni commerciali." },
      { title: "Tecnologia intelligente",  desc: "Piattaforma con App, IA e IoT per maggiore efficienza e controllo totale." },
      { title: "Prodotti Premium",         desc: "Purificatori Neo ad alte prestazioni per tutti i profili di mercato." },
      { title: "Supporto commerciale",     desc: "Accompagnamento globale con materiali, formazione e supporto multilingue." },
    ],
  },
  zh: {
    heading1: "为什么成为 ",
    headingHighlight: "Acquafy 合作伙伴？",
    cards: [
      { title: "可扩展模式",    desc: "依托全球化架构本地化运营，具备巨大的增长潜力。" },
      { title: "持续性收入",    desc: "通过 Neo 生态系统的销售、媒体或分销持续获利。" },
      { title: "全球扩张",      desc: "覆盖超过180个国家和6个商业区域。" },
      { title: "智能技术",      desc: "集成应用、AI 和物联网的平台，实现更高效率与全面管控。" },
      { title: "高端产品",      desc: "适用于各类市场细分的 Neo 高性能净水器。" },
      { title: "商业支持",      desc: "提供全球性支持，包括资料、培训及多语言服务。" },
    ],
  },
  ja: {
    heading1: "なぜ Acquafy の",
    headingHighlight: "パートナーになるのか？",
    cards: [
      { title: "スケーラブルなモデル",    desc: "グローバルな体制でローカルに活動し、大きな成長可能性を秘めています。" },
      { title: "継続的な収益",            desc: "Neoエコシステムの販売、メディア、または流通で継続的な利益を得られます。" },
      { title: "グローバル展開",          desc: "180カ国以上、6つの商業地域でのプレゼンス。" },
      { title: "スマートテクノロジー",    desc: "App、AI、IoTを備えたプラットフォームで効率と完全なコントロールを実現。" },
      { title: "プレミアム製品",          desc: "あらゆる市場プロフィールに対応した高性能Neoピュリファイアー。" },
      { title: "商業サポート",            desc: "資料、トレーニング、多言語サポートによるグローバルな支援。" },
    ],
  },
  ko: {
    heading1: "왜 Acquafy ",
    headingHighlight: "파트너가 되어야 할까요?",
    cards: [
      { title: "확장 가능한 모델",    desc: "글로벌 구조로 로컬에서 활동하며 높은 성장 잠재력을 갖추고 있습니다." },
      { title: "반복 수익",           desc: "Neo 생태계의 판매, 미디어 또는 유통을 통한 지속적인 수익." },
      { title: "글로벌 확장",         desc: "180개국 이상 및 6개 상업 지역에 진출." },
      { title: "스마트 기술",         desc: "앱, AI 및 IoT를 갖춘 플랫폼으로 더 높은 효율성과 완전한 제어." },
      { title: "프리미엄 제품",       desc: "모든 시장 프로필을 위한 고성능 Neo 정수기." },
      { title: "상업적 지원",         desc: "자료, 교육 및 다국어 지원을 통한 글로벌 지원." },
    ],
  },
  sv: {
    heading1: "Varför bli en ",
    headingHighlight: "Acquafy-partner?",
    cards: [
      { title: "Skalbar modell",          desc: "Agera lokalt med en global struktur och stor tillväxtpotential." },
      { title: "Återkommande intäkter",   desc: "Kontinuerliga intäkter från försäljning, media eller distribution av Neo-ekosystemet." },
      { title: "Global expansion",        desc: "Närvaro i + av 180 länder och 6 kommersiella regioner." },
      { title: "Smart teknologi",         desc: "Plattform med App, AI och IoT för ökad effektivitet och full kontroll." },
      { title: "Premiumprodukter",        desc: "Högpresterande Neo-reningsverk för alla marknadsprofiler." },
      { title: "Kommersiellt stöd",       desc: "Globalt stöd med material, utbildning och flerspråkig assistans." },
    ],
  },
  fi: {
    heading1: "Miksi ryhtyä ",
    headingHighlight: "Acquafy-kumppaniksi?",
    cards: [
      { title: "Skaalautuva malli",       desc: "Toimi paikallisesti globaalilla rakenteella ja suurella kasvupotentiaalilla." },
      { title: "Toistuva tulonlähde",     desc: "Jatkuvat tulot Neo-ekosysteemin myynnistä, mediasta tai jakelusta." },
      { title: "Globaali laajentuminen",  desc: "Läsnäolo + kuin 180 maassa ja 6 kaupallisella alueella." },
      { title: "Älykäs teknologia",       desc: "Alusta, jossa on sovellus, tekoäly ja IoT tehostamaan toimintaa ja hallintaa." },
      { title: "Premium-tuotteet",        desc: "Tehokkaat Neo-puhdistajat kaikille markkinaprofiileille." },
      { title: "Kaupallinen tuki",        desc: "Globaali tuki materiaaleilla, koulutuksella ja monikielisellä avulla." },
    ],
  },
  ru: {
    heading1: "Почему стоит стать ",
    headingHighlight: "партнёром Acquafy?",
    cards: [
      { title: "Масштабируемая модель",   desc: "Действуйте локально с глобальной структурой и огромным потенциалом роста." },
      { title: "Постоянный доход",        desc: "Непрерывная прибыль от продаж, медиа или дистрибуции экосистемы Neo." },
      { title: "Глобальная экспансия",    desc: "Присутствие в + 180 странах и 6 коммерческих регионах." },
      { title: "Умные технологии",        desc: "Платформа с приложением, ИИ и IoT для большей эффективности и полного контроля." },
      { title: "Премиум-продукты",        desc: "Высокопроизводительные очистители Neo для всех сегментов рынка." },
      { title: "Коммерческая поддержка",  desc: "Глобальное сопровождение с материалами, обучением и многоязычной поддержкой." },
    ],
  },
  ro: {
    heading1: "De ce sa devii un ",
    headingHighlight: "partener Acquafy?",
    cards: [
      { title: "Model scalabil",          desc: "Actioneaza local cu o structura globala si un potential de crestere ridicat." },
      { title: "Venituri recurente",      desc: "Castiguri continue din vanzari, media sau distributia ecosistemului Neo." },
      { title: "Expansiune globala",      desc: "Prezenta in + de 180 de tari si 6 regiuni comerciale." },
      { title: "Tehnologie inteligenta",  desc: "Platforma cu aplicatie, IA si IoT pentru eficienta sporita si control total." },
      { title: "Produse Premium",         desc: "Purificatoare Neo de inalta performanta pentru toate profilurile de piata." },
      { title: "Suport comercial",        desc: "Acompaniere globala cu materiale, training si asistenta multilingva." },
    ],
  },
  he: {
    heading1: "למה להפוך ל",
    headingHighlight: "שותף Acquafy?",
    cards: [
      { title: "מודל סקלאבילי",           desc: "פעל מקומית עם מבנה גלובלי ופוטנציאל צמיחה גבוה." },
      { title: "הכנסה חוזרת",             desc: "רווחים מתמשכים ממכירות, מדיה או הפצה של מערכת Neo." },
      { title: "התרחבות גלובלית",          desc: "נוכחות ביותר מ-180 מדינות ו-6 אזורים מסחריים." },
      { title: "טכנולוגיה חכמה",           desc: "פלטפורמה עם אפליקציה, בינה מלאכותית ו-IoT ליעילות גבוהה ושליטה מלאה." },
      { title: "מוצרי פרמיום",             desc: "מטהרי Neo בעלי ביצועים גבוהים לכל פרופילי השוק." },
      { title: "תמיכה מסחרית",             desc: "ליווי גלובלי עם חומרים, הכשרות ותמיכה רב-לשונית." },
    ],
  },
};

const iconSrcs = [imgScale, imgMoney, imgGlobe, imgBrain, imgCrown, imgPhone];
const iWs      = [30, 33.33, 30, 30, 30, 30];
const iHs      = [30, 30,    30, 30, 30, 30];

export default function PorqueParceiro() {
  const { lang } = useLang();
  const t = T[lang];

  const cards = t.cards.map((c, i) => ({
    icon: iconSrcs[i],
    iW: iWs[i],
    iH: iHs[i],
    title: c.title,
    desc: c.desc,
  }));

  return (
    <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        {/* Header */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {t.heading1}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <div className="flex flex-col items-center justify-center size-[40px] shrink-0">
                <FigmaIcon src={c.icon} size={30} aspectW={c.iW} aspectH={c.iH} />
              </div>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center min-h-[50px] w-full">
                {c.title}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center w-full">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
