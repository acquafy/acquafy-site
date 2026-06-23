"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading: string;
  subtitle: string;
  tiers: { desc: string }[];
  benefits: { title: string; desc: string }[];
}> = {
  pt: {
    heading:  "Para parceiros, eventos e ações promocionais",
    subtitle: "Os acessórios Acquafy podem ser utilizados por parceiros Silver, Gold e Platinum em feiras, ativações de showroom, lançamentos de produtos, campanhas de aquisições e operações da Media Network.",
    tiers: [
      { desc: "Acessórios essenciais para apresentar sua marca com qualidade Acquafy." },
      { desc: "Materiais premium para experiências com diferenciação e sofisticação." },
      { desc: "Soluções exclusivas e personalizações para destacar sua liderança de mercado." },
    ],
    benefits: [
      { title: "Identidade Consistente",    desc: "Padronização global com a identidade visual Acquafy." },
      { title: "Qualidade Premium",          desc: "Materiais selecionados e acabamento de excelência." },
      { title: "Merchandising Estratégico", desc: "Fortalece sua marca em todos os pontos de contato." },
      { title: "Ideal para Showrooms",       desc: "Acessórios que valorizam o ambiente e a experiência." },
      { title: "Ativação de Eventos",        desc: "Perfeito para feiras, ações promocionais e ativações." },
    ],
  },
  "pt-pt": {
    heading:  "Para parceiros, eventos e ações promocionais",
    subtitle: "Os acessórios Acquafy podem ser utilizados por parceiros Silver, Gold e Platinum em feiras, ativações de showroom, lançamentos de produtos, campanhas de aquisição e operações da Media Network.",
    tiers: [
      { desc: "Acessórios essenciais para apresentar a sua marca com qualidade Acquafy." },
      { desc: "Materiais premium para experiências com diferenciação e sofisticação." },
      { desc: "Soluções exclusivas e personalizações para destacar a sua liderança de mercado." },
    ],
    benefits: [
      { title: "Identidade Consistente",    desc: "Padronização global com a identidade visual Acquafy." },
      { title: "Qualidade Premium",          desc: "Materiais selecionados e acabamento de excelência." },
      { title: "Merchandising Estratégico", desc: "Fortalece a sua marca em todos os pontos de contacto." },
      { title: "Ideal para Showrooms",       desc: "Acessórios que valorizam o ambiente e a experiência." },
      { title: "Ativação de Eventos",        desc: "Perfeito para feiras, ações promocionais e ativações." },
    ],
  },
  en: {
    heading:  "For partners, events and promotional actions",
    subtitle: "Acquafy accessories can be used by Silver, Gold and Platinum partners at trade shows, showroom activations, product launches, acquisition campaigns and Media Network operations.",
    tiers: [
      { desc: "Essential accessories to present your brand with Acquafy quality." },
      { desc: "Premium materials for experiences with differentiation and sophistication." },
      { desc: "Exclusive solutions and customizations to highlight your market leadership." },
    ],
    benefits: [
      { title: "Consistent Identity",       desc: "Global standardization with the Acquafy visual identity." },
      { title: "Premium Quality",            desc: "Selected materials and excellent finishing." },
      { title: "Strategic Merchandising",   desc: "Strengthens your brand at every touchpoint." },
      { title: "Ideal for Showrooms",        desc: "Accessories that enhance the environment and experience." },
      { title: "Event Activation",           desc: "Perfect for trade shows, promotional actions and activations." },
    ],
  },
  "en-gb": {
    heading:  "For partners, events and promotional actions",
    subtitle: "Acquafy accessories can be used by Silver, Gold and Platinum partners at trade shows, showroom activations, product launches, acquisition campaigns and Media Network operations.",
    tiers: [
      { desc: "Essential accessories to present your brand with Acquafy quality." },
      { desc: "Premium materials for experiences with differentiation and sophistication." },
      { desc: "Exclusive solutions and customisations to highlight your market leadership." },
    ],
    benefits: [
      { title: "Consistent Identity",       desc: "Global standardisation with the Acquafy visual identity." },
      { title: "Premium Quality",            desc: "Selected materials and excellent finishing." },
      { title: "Strategic Merchandising",   desc: "Strengthens your brand at every touchpoint." },
      { title: "Ideal for Showrooms",        desc: "Accessories that enhance the environment and experience." },
      { title: "Event Activation",           desc: "Perfect for trade shows, promotional actions and activations." },
    ],
  },
  es: {
    heading:  "Para socios, eventos y acciones promocionales",
    subtitle: "Los accesorios Acquafy pueden ser utilizados por socios Silver, Gold y Platinum en ferias, activaciones de showroom, lanzamientos de productos, campañas de adquisición y operaciones de la Media Network.",
    tiers: [
      { desc: "Accesorios esenciales para presentar tu marca con la calidad Acquafy." },
      { desc: "Materiales premium para experiencias con diferenciación y sofisticación." },
      { desc: "Soluciones exclusivas y personalizaciones para destacar tu liderazgo de mercado." },
    ],
    benefits: [
      { title: "Identidad Consistente",     desc: "Estandarización global con la identidad visual Acquafy." },
      { title: "Calidad Premium",            desc: "Materiales seleccionados y acabado de excelencia." },
      { title: "Merchandising Estratégico", desc: "Fortalece tu marca en todos los puntos de contacto." },
      { title: "Ideal para Showrooms",       desc: "Accesorios que valorizan el ambiente y la experiencia." },
      { title: "Activación de Eventos",      desc: "Perfecto para ferias, acciones promocionales y activaciones." },
    ],
  },
  fr: {
    heading:  "Pour les partenaires, événements et actions promotionnelles",
    subtitle: "Les accessoires Acquafy peuvent être utilisés par les partenaires Silver, Gold et Platinum lors de salons, activations de showroom, lancements de produits, campagnes d'acquisition et opérations Media Network.",
    tiers: [
      { desc: "Accessoires essentiels pour présenter votre marque avec la qualité Acquafy." },
      { desc: "Matériaux premium pour des expériences avec différenciation et sophistication." },
      { desc: "Solutions exclusives et personnalisations pour mettre en avant votre leadership sur le marché." },
    ],
    benefits: [
      { title: "Identité Cohérente",         desc: "Standardisation mondiale avec l'identité visuelle Acquafy." },
      { title: "Qualité Premium",             desc: "Matériaux sélectionnés et finition d'excellence." },
      { title: "Merchandising Stratégique",  desc: "Renforce votre marque à chaque point de contact." },
      { title: "Idéal pour les Showrooms",   desc: "Accessoires qui valorisent l'environnement et l'expérience." },
      { title: "Activation d'Événements",    desc: "Parfait pour les salons, actions promotionnelles et activations." },
    ],
  },
  de: {
    heading:  "Für Partner, Events und Promotionsaktionen",
    subtitle: "Acquafy-Zubehör kann von Silver-, Gold- und Platinum-Partnern bei Messen, Showroom-Aktivierungen, Produkteinführungen, Akquisitionskampagnen und Media Network-Operationen eingesetzt werden.",
    tiers: [
      { desc: "Unverzichtbares Zubehör, um Ihre Marke mit Acquafy-Qualität zu präsentieren." },
      { desc: "Premium-Materialien für Erlebnisse mit Differenzierung und Anspruch." },
      { desc: "Exklusive Lösungen und Individualisierungen, um Ihre Marktführerschaft hervorzuheben." },
    ],
    benefits: [
      { title: "Konsistente Identität",      desc: "Globale Standardisierung mit der visuellen Identität von Acquafy." },
      { title: "Premium-Qualität",            desc: "Ausgewählte Materialien und exzellente Verarbeitung." },
      { title: "Strategisches Merchandising", desc: "Stärkt Ihre Marke an jedem Berührungspunkt." },
      { title: "Ideal für Showrooms",         desc: "Zubehör, das das Umfeld und das Erlebnis aufwertet." },
      { title: "Event-Aktivierung",           desc: "Perfekt für Messen, Promotionsaktionen und Aktivierungen." },
    ],
  },
  it: {
    heading:  "Per partner, eventi e azioni promozionali",
    subtitle: "Gli accessori Acquafy possono essere utilizzati dai partner Silver, Gold e Platinum in fiere, attivazioni showroom, lanci di prodotti, campagne di acquisizione e operazioni Media Network.",
    tiers: [
      { desc: "Accessori essenziali per presentare il tuo brand con la qualità Acquafy." },
      { desc: "Materiali premium per esperienze con differenziazione e sofisticazione." },
      { desc: "Soluzioni esclusive e personalizzazioni per valorizzare la tua leadership di mercato." },
    ],
    benefits: [
      { title: "Identità Coerente",          desc: "Standardizzazione globale con l'identità visiva Acquafy." },
      { title: "Qualità Premium",             desc: "Materiali selezionati e finitura di eccellenza." },
      { title: "Merchandising Strategico",   desc: "Rafforza il tuo brand in ogni punto di contatto." },
      { title: "Ideale per Showroom",         desc: "Accessori che valorizzano l'ambiente e l'esperienza." },
      { title: "Attivazione di Eventi",       desc: "Perfetto per fiere, azioni promozionali e attivazioni." },
    ],
  },
  zh: {
    heading:  "适用于合作伙伴、活动和促销活动",
    subtitle: "Acquafy 配件可供 Silver、Gold 和 Platinum 合作伙伴在贸易展览、展厅激活、产品发布、客户开发活动和 Media Network 运营中使用。",
    tiers: [
      { desc: "向您的品牌展示 Acquafy 品质所必需的核心配件。" },
      { desc: "用于差异化和精致体验的高级材料。" },
      { desc: "专属解决方案和定制化服务，彰显您的市场领导力。" },
    ],
    benefits: [
      { title: "统一的品牌形象",              desc: "与 Acquafy 视觉标识的全球标准化。" },
      { title: "Premium 品质",               desc: "精选材料和卓越工艺。" },
      { title: "战略性商品推广",              desc: "在每个接触点强化您的品牌。" },
      { title: "适合展厅使用",               desc: "提升环境和体验的配件。" },
      { title: "活动激活",                   desc: "非常适合贸易展览、促销活动和激活。" },
    ],
  },
  ja: {
    heading:  "パートナー、イベント、プロモーション活動向け",
    subtitle: "Acquafy のアクセサリーは、Silver・Gold・Platinum パートナーが展示会、ショールームアクティベーション、製品発表、新規顧客獲得キャンペーン、Media Network の運営で活用できます。",
    tiers: [
      { desc: "Acquafy クオリティでブランドを提示するための必須アクセサリー。" },
      { desc: "差別化と洗練を演出するプレミアム素材。" },
      { desc: "市場リーダーシップをアピールする独占的なソリューションとカスタマイズ。" },
    ],
    benefits: [
      { title: "一貫したアイデンティティ",   desc: "Acquafy ビジュアルアイデンティティによるグローバルな標準化。" },
      { title: "プレミアム品質",             desc: "厳選された素材と卓越した仕上がり。" },
      { title: "戦略的マーチャンダイジング", desc: "すべてのタッチポイントでブランドを強化。" },
      { title: "ショールームに最適",         desc: "環境と体験を高めるアクセサリー。" },
      { title: "イベントアクティベーション", desc: "展示会、プロモーション活動、アクティベーションに最適。" },
    ],
  },
  ko: {
    heading:  "파트너, 이벤트 및 프로모션 활동을 위한",
    subtitle: "Acquafy 액세서리는 Silver, Gold 및 Platinum 파트너가 무역 박람회, 쇼룸 활성화, 제품 출시, 고객 확보 캠페인 및 Media Network 운영에서 활용할 수 있습니다.",
    tiers: [
      { desc: "Acquafy 품질로 브랜드를 소개하기 위한 필수 액세서리." },
      { desc: "차별화와 세련됨을 갖춘 경험을 위한 프리미엄 소재." },
      { desc: "시장 리더십을 강조하는 독점 솔루션 및 커스터마이징." },
    ],
    benefits: [
      { title: "일관된 아이덴티티",           desc: "Acquafy 비주얼 아이덴티티로 글로벌 표준화." },
      { title: "프리미엄 품질",               desc: "엄선된 소재와 탁월한 마감." },
      { title: "전략적 머천다이징",            desc: "모든 접점에서 브랜드를 강화." },
      { title: "쇼룸에 이상적",               desc: "환경과 경험을 향상시키는 액세서리." },
      { title: "이벤트 활성화",               desc: "무역 박람회, 프로모션 활동 및 활성화에 완벽." },
    ],
  },
  sv: {
    heading:  "For partners, evenemang och kampanjaktioner",
    subtitle: "Acquafy-tillbehor kan anvandas av Silver-, Gold- och Platinum-partners pa massor, showroom-aktiveringar, produktlanseringar, kundforvarvskampanjer och Media Network-operationer.",
    tiers: [
      { desc: "Viktiga tillbehor for att presentera ditt varumarke med Acquafy-kvalitet." },
      { desc: "Premiummaterial for upplevelser med differentiering och sofistikering." },
      { desc: "Exklusiva losningar och anpassningar for att framhava din marknadsledarskap." },
    ],
    benefits: [
      { title: "Konsekvent identitet",        desc: "Global standardisering med Acquafys visuella identitet." },
      { title: "Premiumkvalitet",             desc: "Utvalda material och utmarkt finish." },
      { title: "Strategisk merchandising",    desc: "Starker ditt varumarke vid varje kontaktpunkt." },
      { title: "Idealiskt for showrooms",     desc: "Tillbehor som forbattrar miljon och upplevelsen." },
      { title: "Evenemangsaktivering",        desc: "Perfekt for massor, kampanjaktioner och aktiveringar." },
    ],
  },
  fi: {
    heading:  "Kumppaneille, tapahtumille ja kampanjatoimille",
    subtitle: "Acquafy-tarvikkeita voivat kayttaa Silver-, Gold- ja Platinum-kumppanit messuilla, showroom-aktivoinneissa, tuotelanseerauksissa, asiakashankintakampanjoissa ja Media Network -toiminnoissa.",
    tiers: [
      { desc: "Valttamattomat tarvikkeet brандisi esittelemiseksi Acquafy-laadulla." },
      { desc: "Premium-materiaalit kokemuksiin, joissa on erottuvuutta ja hienostuneisuutta." },
      { desc: "Eksklusiiviset ratkaisut ja raataloinnnit markkina-johtajuutesi korostamiseksi." },
    ],
    benefits: [
      { title: "Yhtenenainen identiteetti",   desc: "Globaali standardointi Acquafyn visuaalisella identiteetilla." },
      { title: "Premiumlaatu",                desc: "Valitut materiaalit ja erinomainen viimeistely." },
      { title: "Strateginen myynninedistaminen", desc: "Vahvistaa brandisi jokaisessa kontaktipisteessa." },
      { title: "Ihanteellinen showroomeihin", desc: "Tarvikkeet, jotka parantavat ymparistoa ja kokemusta." },
      { title: "Tapahtumaaktivointi",         desc: "Taydellinen messuille, kampanjatoimille ja aktivoinneille." },
    ],
  },
  ru: {
    heading:  "Dlya partnerov, meropriyatiy i promoactsiy",
    subtitle: "Aksessuary Acquafy mogut ispolzovatsya partnerami Silver, Gold i Platinum na vystavkakh, aktivatsiyakh showroom, zapuskakh produktov, kampaniyakh privlecheniya klientov i operatsiyakh Media Network.",
    tiers: [
      { desc: "Neobkhodimye aksessuary dlya predstavleniya vashego brenda s kachestvom Acquafy." },
      { desc: "Premium-materialy dlya vpechatleniy s differentsiatsiyey i izyskannostyu." },
      { desc: "Eksklyuzivnye resheniya i nastroyki dlya podcherkivaniya vashego liderstva na rynke." },
    ],
    benefits: [
      { title: "Posledovatelnaya identichnost",  desc: "Globalnaya standartizatsiya s vizualnoy identichnostyu Acquafy." },
      { title: "Premium kachestvo",              desc: "Vybrannnye materialy i otlichnaya otdelka." },
      { title: "Strategicheskiy merchandayzing", desc: "Ukreplyaet vash brend v kazhdoy tochke kontakta." },
      { title: "Idealno dlya showrumov",         desc: "Aksessuary, kotorye uluchshayut sredu i opyt." },
      { title: "Aktivatsiya meropriyatiy",       desc: "Idealno dlya vystavok, promoactsiy i aktivatsiy." },
    ],
  },
  ro: {
    heading:  "Pentru parteneri, evenimente si actiuni promotionale",
    subtitle: "Accesoriile Acquafy pot fi utilizate de partenerii Silver, Gold si Platinum la targuri, activari de showroom, lansari de produse, campanii de achizitie si operatiuni Media Network.",
    tiers: [
      { desc: "Accesorii esentiale pentru a prezenta brandul dvs. cu calitatea Acquafy." },
      { desc: "Materiale premium pentru experiente cu diferentiere si sofisticare." },
      { desc: "Solutii exclusive si personalizari pentru a evidentia leadership-ul dvs. pe piata." },
    ],
    benefits: [
      { title: "Identitate Consecventa",      desc: "Standardizare globala cu identitatea vizuala Acquafy." },
      { title: "Calitate Premium",             desc: "Materiale selectate si finisaj de excelenta." },
      { title: "Merchandising Strategic",     desc: "Intareste brandul dvs. la fiecare punct de contact." },
      { title: "Ideal pentru Showroom-uri",   desc: "Accesorii care valorizeaza mediul si experienta." },
      { title: "Activare de Evenimente",      desc: "Perfect pentru targuri, actiuni promotionale si activari." },
    ],
  },
  he: {
    heading:  "לשותפים, אירועים ופעולות קידום מכירות",
    subtitle: "אביזרי Acquafy יכולים לשמש שותפי Silver, Gold ו-Platinum בתערוכות, הפעלות שורום, השקות מוצרים, קמפיינים לרכישת לקוחות ותפעול Media Network.",
    tiers: [
      { desc: "אביזרים חיוניים להצגת המותג שלך עם איכות Acquafy." },
      { desc: "חומרים פרימיום לחוויות עם בידול ותחכום." },
      { desc: "פתרונות בלעדיים והתאמות אישיות להדגשת המנהיגות שלך בשוק." },
    ],
    benefits: [
      { title: "זהות עקבית",                  desc: "תקינה גלובלית עם הזהות החזותית של Acquafy." },
      { title: "איכות פרימיום",               desc: "חומרים נבחרים וגימור מעולה." },
      { title: "מרצ'נדייזינג אסטרטגי",        desc: "מחזק את המותג שלך בכל נקודת מגע." },
      { title: "אידיאלי לשורומים",            desc: "אביזרים המשדרגים את הסביבה והחוויה." },
      { title: "הפעלת אירועים",               desc: "מושלם לתערוכות, פעולות קידום מכירות והפעלות." },
    ],
  },
};

const imgSilver    = "/figma-assets/product-silver-b.webp";
const imgGold      = "/figma-assets/product-gold-b.webp";
const imgPlatinum  = "/figma-assets/product-platinum-b.webp";
const imgLayout    = "/figma-assets/icon-layout.svg";
const imgCrown     = "/figma-assets/icon-crown-a.svg";
const imgMarketing = "/figma-assets/icon-marketing-c.svg";
const imgPlay      = "/figma-assets/icon-play-a.svg";
const imgCheckin   = "/figma-assets/icon-check-c.svg";

const tiersBase = [
  { img: imgSilver,   imgAspect: 1, name: "Silver"   },
  { img: imgGold,     imgAspect: 1, name: "Gold"     },
  { img: imgPlatinum, imgAspect: 1, name: "Platinum" },
];

const benefitsBase = [
  { icon: imgLayout,    iconW: 629, iconH: 629 },
  { icon: imgCrown,     iconW: 353, iconH: 353 },
  { icon: imgMarketing, iconW: 40,  iconH: 28  },
  { icon: imgPlay,      iconW: 27,  iconH: 27  },
  { icon: imgCheckin,   iconW: 30,  iconH: 30  },
];

export default function ParceirosAcessorios() {
  const { lang } = useLang();
  const t = T[lang];

  const tiers = tiersBase.map((base, i) => ({
    ...base,
    desc: t.tiers[i].desc,
  }));

  const benefits = benefitsBase.map((base, i) => ({
    ...base,
    title: t.benefits[i].title,
    desc:  t.benefits[i].desc,
  }));

  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[20px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] min-w-[240px] w-full">
            {t.heading}
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-[20px] items-start w-full">
          {/* Tier cards */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center overflow-hidden w-full">
            {tiers.map((tier) => (
              <div key={tier.name} className="bg-white flex flex-1 flex-col items-start min-w-[280px] p-[20px] rounded-[16px]">
                <div className="flex gap-[20px] items-center justify-center w-full">
                  <div className="flex flex-col items-center justify-center shrink-0" style={{ width: 46, height: 50 }}>
                    <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                      <img alt={tier.name} className="absolute inset-0 w-full h-full object-cover" src={tier.img} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff]">{tier.name}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">{tier.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits row */}
          <div className="bg-white flex flex-wrap gap-[20px_10px] items-center justify-center p-[20px] rounded-[16px] w-full">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-1 gap-[20px] items-center justify-center min-w-[200px]">
                <div className="flex items-center justify-center shrink-0 size-[30px]">
                  <FigmaIcon src={b.icon} size={30} aspectW={b.iconW} aspectH={b.iconH} />
                </div>
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{b.title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
