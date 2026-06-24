"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  quemSomosTitle: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  interfyPrefix: string;
  interfyTitle: string;
  interfyDesc: string;
  stat1Title: string;
  stat1Desc: string;
  stat2Title: string;
  stat2Desc: string;
  stat3Title: string;
  stat3Desc: string;
  stat4Title: string;
  stat4Desc: string;
}> = {
  pt: {
    quemSomosTitle: "Quem Somos",
    p1: "A Acquafy Corporation foi fundada em setembro de 2020, nos Estados Unidos, como parte do Interfy Group.",
    p2: "Há quase 6 anos desenvolvemos soluções que transformam a forma como famílias, empresas e comunidades têm acesso a água de qualidade.",
    p3: "Desde nossa fundação comercializamos purificadores, filtros, jarras, filtros de chuveiro e garrafas de água alcalina, sempre com foco em inovação, desempenho e bem-estar.",
    p4: "Em 2026 entramos em uma nova fase com o lançamento de nossas linhas exclusivas de produtos e a expansão da Acquafy Global Smart Water Platform.",
    interfyPrefix: "A Acquafy faz parte do",
    interfyTitle: "Acquafy, uma empresa Interfy Group",
    interfyDesc: "um grupo global de tecnologia com mais de 20 anos de história e experiência em inovação, transformação digital e soluções inteligentes.",
    stat1Title: "+20 anos",
    stat1Desc:  "de história e experiência global.",
    stat2Title: "Presença global",
    stat2Desc:  "operações e parceiros em vários continentes.",
    stat3Title: "Ecossistemas digitais",
    stat3Desc:  "plataformas e marcas complementares",
    stat4Title: "Inovação contínua",
    stat4Desc:  "investindo em pessoas, tecnologia e propósito",
  },
  "pt-pt": {
    quemSomosTitle: "Quem Somos",
    p1: "A Acquafy Corporation foi fundada em setembro de 2020, nos Estados Unidos, como parte do Interfy Group.",
    p2: "Há quase 6 anos desenvolvemos soluções que transformam a forma como famílias, empresas e comunidades têm acesso a água de qualidade.",
    p3: "Desde a nossa fundação comercializamos purificadores, filtros, jarras, filtros de duche e garrafas de água alcalina, sempre com foco em inovação, desempenho e bem-estar.",
    p4: "Em 2026 entrámos numa nova fase com o lançamento das nossas linhas exclusivas de produtos e a expansão da Acquafy Global Smart Water Platform.",
    interfyPrefix: "A Acquafy faz parte do",
    interfyTitle: "Acquafy, uma empresa do Interfy Group",
    interfyDesc: "um grupo global de tecnologia com mais de 20 anos de história e experiência em inovação, transformação digital e soluções inteligentes.",
    stat1Title: "+20 anos",
    stat1Desc:  "de história e experiência global.",
    stat2Title: "Presença global",
    stat2Desc:  "operações e parceiros em vários continentes.",
    stat3Title: "Ecossistemas digitais",
    stat3Desc:  "plataformas e marcas complementares",
    stat4Title: "Inovação contínua",
    stat4Desc:  "a investir em pessoas, tecnologia e propósito",
  },
  en: {
    quemSomosTitle: "About Us",
    p1: "Acquafy Corporation was founded in September 2020 in the United States as part of the Interfy Group.",
    p2: "For nearly 6 years we have developed solutions that transform the way families, businesses and communities access quality water.",
    p3: "Since our founding we have marketed purifiers, filters, pitchers, shower filters and alkaline water bottles, always focused on innovation, performance and well-being.",
    p4: "In 2026 we entered a new phase with the launch of our exclusive product lines and the expansion of the Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy is part of the",
    interfyTitle: "Acquafy, an Interfy Group company",
    interfyDesc: "a global technology group with over 20 years of history and experience in innovation, digital transformation and intelligent solutions.",
    stat1Title: "+20 years",
    stat1Desc:  "of global history and experience.",
    stat2Title: "Global presence",
    stat2Desc:  "operations and partners across multiple continents.",
    stat3Title: "Digital ecosystems",
    stat3Desc:  "complementary platforms and brands",
    stat4Title: "Continuous innovation",
    stat4Desc:  "investing in people, technology and purpose",
  },
  "en-gb": {
    quemSomosTitle: "About Us",
    p1: "Acquafy Corporation was founded in September 2020 in the United States as part of the Interfy Group.",
    p2: "For nearly 6 years we have developed solutions that transform the way families, businesses and communities access quality water.",
    p3: "Since our founding we have marketed purifiers, filters, jugs, shower filters and alkaline water bottles, always focused on innovation, performance and well-being.",
    p4: "In 2026 we entered a new phase with the launch of our exclusive product lines and the expansion of the Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy is part of the",
    interfyTitle: "Acquafy, an Interfy Group company",
    interfyDesc: "a global technology group with over 20 years of history and experience in innovation, digital transformation and intelligent solutions.",
    stat1Title: "+20 years",
    stat1Desc:  "of global history and experience.",
    stat2Title: "Global presence",
    stat2Desc:  "operations and partners across multiple continents.",
    stat3Title: "Digital ecosystems",
    stat3Desc:  "complementary platforms and brands",
    stat4Title: "Continuous innovation",
    stat4Desc:  "investing in people, technology and purpose",
  },
  es: {
    quemSomosTitle: "Quiénes Somos",
    p1: "Acquafy Corporation fue fundada en septiembre de 2020 en los Estados Unidos como parte del Interfy Group.",
    p2: "Durante casi 6 años hemos desarrollado soluciones que transforman la forma en que familias, empresas y comunidades acceden al agua de calidad.",
    p3: "Desde nuestra fundación comercializamos purificadores, filtros, jarras, filtros de ducha y botellas de agua alcalina, siempre enfocados en innovación, rendimiento y bienestar.",
    p4: "En 2026 entramos en una nueva fase con el lanzamiento de nuestras líneas exclusivas de productos y la expansión de la Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy forma parte del",
    interfyTitle: "Acquafy, una empresa del Interfy Group",
    interfyDesc: "un grupo tecnológico global con más de 20 años de historia y experiencia en innovación, transformación digital y soluciones inteligentes.",
    stat1Title: "+20 años",
    stat1Desc:  "de historia y experiencia global.",
    stat2Title: "Presencia global",
    stat2Desc:  "operaciones y socios en varios continentes.",
    stat3Title: "Ecosistemas digitales",
    stat3Desc:  "plataformas y marcas complementarias",
    stat4Title: "Innovación continua",
    stat4Desc:  "invirtiendo en personas, tecnología y propósito",
  },
  fr: {
    quemSomosTitle: "Qui Sommes-Nous",
    p1: "Acquafy Corporation a été fondée en septembre 2020 aux États-Unis dans le cadre du Interfy Group.",
    p2: "Depuis près de 6 ans, nous développons des solutions qui transforment la façon dont les familles, les entreprises et les communautés accèdent à une eau de qualité.",
    p3: "Depuis notre fondation, nous commercialisons des purificateurs, des filtres, des carafes, des filtres de douche et des bouteilles d'eau alcaline, toujours axés sur l'innovation, la performance et le bien-être.",
    p4: "En 2026, nous sommes entrés dans une nouvelle phase avec le lancement de nos gammes exclusives de produits et l'expansion de la Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy fait partie du",
    interfyTitle: "Acquafy, une entreprise du Interfy Group",
    interfyDesc: "un groupe technologique mondial avec plus de 20 ans d'histoire et d'expérience en innovation, transformation numérique et solutions intelligentes.",
    stat1Title: "+20 ans",
    stat1Desc:  "d'histoire et d'expérience mondiale.",
    stat2Title: "Présence mondiale",
    stat2Desc:  "opérations et partenaires sur plusieurs continents.",
    stat3Title: "Écosystèmes numériques",
    stat3Desc:  "plateformes et marques complémentaires",
    stat4Title: "Innovation continue",
    stat4Desc:  "investir dans les personnes, la technologie et l'objectif",
  },
  de: {
    quemSomosTitle: "Über Uns",
    p1: "Die Acquafy Corporation wurde im September 2020 in den Vereinigten Staaten als Teil der Interfy Group gegründet.",
    p2: "Seit fast 6 Jahren entwickeln wir Lösungen, die die Art und Weise verändern, wie Familien, Unternehmen und Gemeinschaften Zugang zu qualitativ hochwertigem Wasser erhalten.",
    p3: "Seit unserer Gründung vermarkten wir Wasserfilter, Filter, Karaffen, Duschfilter und alkalische Wasserflaschen – stets mit Fokus auf Innovation, Leistung und Wohlbefinden.",
    p4: "Im Jahr 2026 haben wir mit dem Launch unserer exklusiven Produktlinien und der Expansion der Acquafy Global Smart Water Platform eine neue Phase eingeläutet.",
    interfyPrefix: "Acquafy ist Teil der",
    interfyTitle: "Acquafy, ein Unternehmen der Interfy Group",
    interfyDesc: "eine globale Technologiegruppe mit über 20 Jahren Geschichte und Erfahrung in Innovation, digitaler Transformation und intelligenten Lösungen.",
    stat1Title: "+20 Jahre",
    stat1Desc:  "globale Geschichte und Erfahrung.",
    stat2Title: "Globale Präsenz",
    stat2Desc:  "Operationen und Partner auf mehreren Kontinenten.",
    stat3Title: "Digitale Ökosysteme",
    stat3Desc:  "komplementäre Plattformen und Marken",
    stat4Title: "Kontinuierliche Innovation",
    stat4Desc:  "Investitionen in Menschen, Technologie und Zweck",
  },
  it: {
    quemSomosTitle: "Chi Siamo",
    p1: "Acquafy Corporation è stata fondata nel settembre 2020 negli Stati Uniti come parte del Interfy Group.",
    p2: "Da quasi 6 anni sviluppiamo soluzioni che trasformano il modo in cui famiglie, aziende e comunità accedono all'acqua di qualità.",
    p3: "Dalla nostra fondazione commercializziamo purificatori, filtri, caraffe, filtri doccia e bottiglie di acqua alcalina, sempre focalizzati su innovazione, prestazioni e benessere.",
    p4: "Nel 2026 siamo entrati in una nuova fase con il lancio delle nostre linee esclusive di prodotti e l'espansione della Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy fa parte del",
    interfyTitle: "Acquafy, un'azienda del Interfy Group",
    interfyDesc: "un gruppo tecnologico globale con oltre 20 anni di storia ed esperienza in innovazione, trasformazione digitale e soluzioni intelligenti.",
    stat1Title: "+20 anni",
    stat1Desc:  "di storia ed esperienza globale.",
    stat2Title: "Presenza globale",
    stat2Desc:  "operazioni e partner in più continenti.",
    stat3Title: "Ecosistemi digitali",
    stat3Desc:  "piattaforme e marchi complementari",
    stat4Title: "Innovazione continua",
    stat4Desc:  "investendo in persone, tecnologia e scopo",
  },
  zh: {
    quemSomosTitle: "关于我们",
    p1: "Acquafy Corporation 于 2020 年 9 月在美国成立，隶属于 Interfy Group。",
    p2: "近 6 年来，我们持续开发解决方案，改变家庭、企业和社区获取优质水资源的方式。",
    p3: "自成立以来，我们销售净水器、滤芯、滤水壶、淤浴过滤器和碱性水瓶，始终专注于创新、性能与健康。",
    p4: "2026 年，我们以独家产品线的推出和 Acquafy Global Smart Water Platform 的扩展进入新阶段。",
    interfyPrefix: "Acquafy 是",
    interfyTitle: "Acquafy，Interfy Group 旗下企业",
    interfyDesc: "一家拥有超过 20 年历史和经验的全球技术集团，专注于创新、数字化转型与智能解决方案。",
    stat1Title: "+20 年",
    stat1Desc:  "全球历史与经验。",
    stat2Title: "全球存在",
    stat2Desc:  "跨多个大洲的运营与合作伙伴。",
    stat3Title: "数字生态系统",
    stat3Desc:  "互补平台与品牌",
    stat4Title: "持续创新",
    stat4Desc:  "投资于人、技术与使命",
  },
  ja: {
    quemSomosTitle: "私たちについて",
    p1: "Acquafy Corporation は、Interfy Group の一員として 2020 年 9 月に米国で設立されました。",
    p2: "約 6 年間、家庭・企業・コミュニティが質の高い水にアクセスする方法を変革するソリューションを開発してきました。",
    p3: "設立以来、浄水器・フィルター・ピッチャー・シャワーフィルター・アルカリウォーターボトルを販売し、常にイノベーション・パフォーマンス・ウェルネスに注力しています。",
    p4: "2026 年、独自製品ラインのローンチと Acquafy Global Smart Water Platform の拡大により、新たなフェーズに突入しました。",
    interfyPrefix: "Acquafy は",
    interfyTitle: "Acquafy、Interfy Group のグループ企業",
    interfyDesc: "20 年以上の歴史と経験を持つグローバルテクノロジーグループ。イノベーション・デジタルトランスフォーメーション・インテリジェントソリューションに精通しています。",
    stat1Title: "+20年",
    stat1Desc:  "グローバルな歴史と経験。",
    stat2Title: "グローバルプレゼンス",
    stat2Desc:  "複数の大陸での事業とパートナー。",
    stat3Title: "デジタルエコシステム",
    stat3Desc:  "補完的なプラットフォームとブランド",
    stat4Title: "継続的なイノベーション",
    stat4Desc:  "人・技術・目的への投資",
  },
  ko: {
    quemSomosTitle: "회사 소개",
    p1: "Acquafy Corporation은 Interfy Group의 일원으로 2020년 9월 미국에서 설립되었습니다.",
    p2: "약 6년간 가정, 기업, 커뮤니티가 양질의 물에 접근하는 방식을 변화시키는 솔루션을 개발해 왔습니다.",
    p3: "설립 이후 정수기, 필터, 피처, 샤워 필터, 알칼리 워터 보틀을 판매하며 항상 혁신, 성능, 웰빙에 집중해 왔습니다.",
    p4: "2026년, 독점 제품 라인 출시와 Acquafy Global Smart Water Platform 확장을 통해 새로운 단계에 돌입했습니다.",
    interfyPrefix: "Acquafy는",
    interfyTitle: "Acquafy, Interfy Group 소속 기업",
    interfyDesc: "혁신, 디지털 전환, 지능형 솔루션 분야에서 20년 이상의 역사와 경험을 보유한 글로벌 기술 그룹.",
    stat1Title: "+20년",
    stat1Desc:  "글로벌 역사와 경험.",
    stat2Title: "글로벌 존재감",
    stat2Desc:  "여러 대륙의 운영 및 파트너.",
    stat3Title: "디지털 생태계",
    stat3Desc:  "상호 보완적인 플랫폼과 브랜드",
    stat4Title: "지속적인 혁신",
    stat4Desc:  "사람, 기술, 목적에 대한 투자",
  },
  sv: {
    quemSomosTitle: "Om oss",
    p1: "Acquafy Corporation grundades i september 2020 i USA som en del av Interfy Group.",
    p2: "I nästan 6 år har vi utvecklat lösningar som förändrar sättet familjer, företag och samhällen får tillgång till kvalitetsvatten.",
    p3: "Sedan grundandet har vi marknadsfört vattenrenar, filter, kannor, duschfilter och alkaliska vattenflaskor, alltid med fokus på innovation, prestanda och välbefinnande.",
    p4: "Under 2026 gick vi in i en ny fas med lanseringen av våra exklusiva produktlinjer och expansionen av Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy ar en del av",
    interfyTitle: "Acquafy, ett företag inom Interfy Group",
    interfyDesc: "en global teknikgrupp med över 20 års historia och erfarenhet inom innovation, digital transformation och intelligenta lösningar.",
    stat1Title: "+20 år",
    stat1Desc:  "global historia och erfarenhet.",
    stat2Title: "Global närvaro",
    stat2Desc:  "verksamheter och partners på flera kontinenter.",
    stat3Title: "Digitala ekosystem",
    stat3Desc:  "kompletterande plattformar och varumärken",
    stat4Title: "Kontinuerlig innovation",
    stat4Desc:  "investerar i människor, teknik och syfte",
  },
  fi: {
    quemSomosTitle: "Tietoa meistä",
    p1: "Acquafy Corporation perustettiin syyskuussa 2020 Yhdysvalloissa osana Interfy Groupia.",
    p2: "Lähes 6 vuoden ajan olemme kehittäneet ratkaisuja, jotka muuttavat tapaa, jolla perheet, yritykset ja yhteisöt pääsevät laadukkaaseen veteen.",
    p3: "Perustamisestamme lähtien olemme myyneet vedenpuhdistimia, suodattimia, kanuja, suihkusuodattimia ja alkaalivesipulloja, aina keskittyen innovaatioon, suorituskykyyn ja hyvinvointiin.",
    p4: "Vuonna 2026 siirryimme uuteen vaiheeseen eksklusiivisten tuotelinjojen lanseerauksen ja Acquafy Global Smart Water Platform -laajennuksen myötä.",
    interfyPrefix: "Acquafy on osa",
    interfyTitle: "Acquafy, Interfy Group -konsernin yritys",
    interfyDesc: "globaali teknologiakonserni, jolla on yli 20 vuoden historia ja kokemus innovaatiosta, digitaalisesta transformaatiosta ja älykkäistä ratkaisuista.",
    stat1Title: "+20 vuotta",
    stat1Desc:  "globaalia historiaa ja kokemusta.",
    stat2Title: "Globaali läsnäolo",
    stat2Desc:  "toimintoja ja kumppaneita useilla mantereilla.",
    stat3Title: "Digitaaliset ekosysteemit",
    stat3Desc:  "toisiaan täydentävät alustat ja brandit",
    stat4Title: "Jatkuva innovaatio",
    stat4Desc:  "investoiminen ihmisiin, teknologiaan ja tarkoitukseen",
  },
  ru: {
    quemSomosTitle: "О нас",
    p1: "Acquafy Corporation была основана в сентябре 2020 года в США как часть Interfy Group.",
    p2: "Почти 6 лет мы разрабатываем решения, которые изменяют способ доступа семей, предприятий и сообществ к качественной воде.",
    p3: "С момента основания мы продаём очистители, фильтры, кувшины, душевые фильтры и бутылки с щелочной водой, всегда с фокусом на инновациях, производительности и благополучии.",
    p4: "В 2026 году мы вступили в новую фазу с запуском наших эксклюзивных продуктовых линеек и расширением Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy — часть",
    interfyTitle: "Acquafy, компания Interfy Group",
    interfyDesc: "глобальная технологическая группа с более чем 20-летней историей и опытом в инновациях, цифровой трансформации и интеллектуальных решениях.",
    stat1Title: "+20 лет",
    stat1Desc:  "глобальная история и опыт.",
    stat2Title: "Глобальное присутствие",
    stat2Desc:  "операции и партнёры на нескольких континентах.",
    stat3Title: "Цифровые экосистемы",
    stat3Desc:  "взаимодополняющие платформы и бренды",
    stat4Title: "Непрерывные инновации",
    stat4Desc:  "инвестиции в людей, технологии и миссию",
  },
  ro: {
    quemSomosTitle: "Despre noi",
    p1: "Acquafy Corporation a fost înfiinţată în septembrie 2020 în Statele Unite ca parte din Interfy Group.",
    p2: "De aproape 6 ani dezvoltăm soluţii care transformă modul în care familiile, întreprinderile şi comunităţile accesează apa de calitate.",
    p3: "Încă de la înfiinţare comercializăm purificatoare, filtre, carafele, filtre de duş şi sticle de apă alcalină, mereu cu accent pe inovaţie, performanţă şi bunăstare.",
    p4: "În 2026 am intrat într-o nouă fază cu lansarea liniilor noastre exclusive de produse şi extinderea Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy face parte din",
    interfyTitle: "Acquafy, o companie din Interfy Group",
    interfyDesc: "un grup tehnologic global cu peste 20 de ani de istorie şi experienţă în inovaţie, transformare digitală şi soluţii inteligente.",
    stat1Title: "+20 ani",
    stat1Desc:  "de istorie şi experienţă globală.",
    stat2Title: "Prezenţă globală",
    stat2Desc:  "operaţiuni şi parteneri pe mai multe continente.",
    stat3Title: "Ecosisteme digitale",
    stat3Desc:  "platforme şi mărci complementare",
    stat4Title: "Inovaţie continuă",
    stat4Desc:  "investind în oameni, tehnologie şi scop",
  },
  he: {
    quemSomosTitle: "עלינו",
    p1: "Acquafy Corporation נוסדה בספטמבר 2020 בארצות הברית כחלק מקבוצת Interfy Group.",
    p2: "כמעט 6 שנים אנו מפתחים פתרונות המשנים את האופן שבו משפחות, עסקים וקהילות נגשים למים איכותיים.",
    p3: "מאז הייסודנו משווקים מטהרי מים, מסננים, קנקנים, מסנני מקלחת ובקבוקי מים אלקליני, תמיד בדגש על חדשנות, ביצועים ורווחה.",
    p4: "בשנת 2026 נכנסנו לשלב חדש עם השקת קווי המוצרים הבלעדיים שלנו והרחבת Acquafy Global Smart Water Platform.",
    interfyPrefix: "Acquafy היא חלק מ",
    interfyTitle: "Acquafy, חברה בקבוצת Interfy Group",
    interfyDesc: "קבוצת טכנולוגיה עולמית עם יותר מ-20 שנות של היסטוריה וניסיון בחדשנות, הפיכה דיגיטלית ופתרונות חכמים.",
    stat1Title: "+20 שנים",
    stat1Desc:  "היסטוריה וניסיון עולמי.",
    stat2Title: "נוכחות עולמית",
    stat2Desc:  "פעילות ושותפים במספר יבשות.",
    stat3Title: "מערכות אקוסיסטם דיגיטליות",
    stat3Desc:  "פלטפורמות ומותגים משלימים",
    stat4Title: "חדשנות מתמשכת",
    stat4Desc:  "השקעה באנשים, טכנולוגיה ומטרה",
  },
};

// ── Assets ───────────────────────────────────────────────────────────────────
const imgInterfyGroupLogo = "/figma-assets/logo-interfy-group.svg";
const imgRatingIcon       = "/figma-assets/icon-rating-20anos.svg"; // +20 anos     sq
const imgGlobeIcon        = "/figma-assets/icon-globe-presence.svg"; // presenca     sq
const imgEcosystemIcon    = "/figma-assets/icon-ecosystem.svg"; // ecossistemas sq
const imgScaleIcon        = "/figma-assets/icon-scale-inovacao.svg"; // inovacao     sq

function StatItem({
  icon, iconAlt, title, description,
}: { icon: string; iconAlt: string; title: string; description: string }) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[150px] px-[20px]">
      <FigmaIcon src={icon} alt={iconAlt} size={40} />
      <div className="flex flex-col gap-[15px] items-start text-center w-full">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full min-h-[36px]">
          {title}
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] w-full">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SobreQuemSomos() {
  const { lang } = useLang();
  const t = T[lang];
  return (
    <section id="quem-somos" className="scroll-mt-[80px] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start justify-center max-w-[1400px] w-full win-1024:flex-row win-1024:flex-wrap">

        {/* Left: Quem Somos */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[40px] items-center max-w-[550px] min-w-[280px] px-[20px] py-[40px] rounded-[16px]">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
            {t.quemSomosTitle}
          </h2>
          <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            <p className="leading-[19px] mb-[10px]">{t.p1}</p>
            <p className="leading-[19px] mb-[10px]">{t.p2}</p>
            <p className="leading-[19px] mb-[10px]">{t.p3}</p>
            <p className="leading-[19px]">{t.p4}</p>
          </div>
        </div>

        {/* Right: Interfy Group */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[40px] items-center min-w-[280px] px-[20px] py-[40px] rounded-[16px]">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
            {t.interfyTitle}
          </h2>

          {/* Logo + description */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">

            {/* Logo column */}
            <div className="flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px] p-[15px] win-1024:max-w-[330px]">
              <div
                className="max-h-[82.47px] max-w-[300px] overflow-hidden relative w-full"
                style={{ aspectRatio: "922.6675 / 253.6643" }}
              >
                <img
                  alt="Interfy Group"
                  className="absolute inset-0 w-full h-full"
                  src={imgInterfyGroupLogo}
                />
              </div>
            </div>

            {/* Description column — border-l serves as divider */}
            <div className="flex flex-[1_0_0] flex-col items-center justify-center min-w-[280px] p-[15px] win-1024:border-l win-1024:border-solid win-1024:border-[#cbd0d4]">
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
                {t.interfyPrefix}{" "}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0569ff]">Interfy Group</span>
                ,<br />
                {t.interfyDesc}
              </p>
            </div>

          </div>

          {/* Stats — sem divisores */}
          <div className="flex flex-wrap gap-[10px] items-center w-full">
            <StatItem
              icon={imgRatingIcon}
              iconAlt={t.stat1Title}
              title={t.stat1Title}
              description={t.stat1Desc}
            />
            <StatItem
              icon={imgGlobeIcon}
              iconAlt={t.stat2Title}
              title={t.stat2Title}
              description={t.stat2Desc}
            />
            <StatItem
              icon={imgEcosystemIcon}
              iconAlt={t.stat3Title}
              title={t.stat3Title}
              description={t.stat3Desc}
            />
            <StatItem
              icon={imgScaleIcon}
              iconAlt={t.stat4Title}
              title={t.stat4Title}
              description={t.stat4Desc}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
