import type { Lang } from "@/context/LanguageContext";
import { PRODUCT_PRICING_USD } from "@/lib/products";

// ─── Slide 2 (WaaS · Neo UP) ─────────────────────────────────────────────────
export type S2Text = {
  label: string;
  h1a: string; h1b: string;
  sub: string;
  buy: string; lease: string; perMonth: string;
  cards: [string, string, string, string];
  bar: [string, string, string, string];
};

export const S2: Record<Lang, S2Text> = {
  pt: {
    label: "ACQUAFY WAAS | ÁGUA COMO SERVIÇO",
    h1a: "Água de qualidade por compra ou assinatura.", h1b: "Acquafy Neo UP",
    sub: "Leve água pura, prática e inteligente para sua casa com o modelo Acquafy WaaS. Escolha entre compra imediata ou Lease mensal, com tecnologia premium e mais comodidade para o dia a dia.",
    buy: "Compra:", lease: "Lease:", perMonth: "/mês",
    cards: ["4 filtros de alta performance", "20 estágios de tratamento", "Plug & Play", "Integração com geladeira"],
    bar: ["Água pura todos os dias", "Mais praticidade", "Menos garrafas plásticas", "Opção de compra ou Lease"],
  },
  "pt-pt": {
    label: "ACQUAFY WAAS | ÁGUA COMO SERVIÇO",
    h1a: "Água de qualidade por compra ou subscrição.", h1b: "Acquafy Neo UP",
    sub: "Leve água pura, prática e inteligente para a sua casa com o modelo Acquafy WaaS. Escolha entre compra imediata ou Lease mensal, com tecnologia premium e mais comodidade no dia a dia.",
    buy: "Compra:", lease: "Lease:", perMonth: "/mês",
    cards: ["4 filtros de alta performance", "20 estágios de tratamento", "Plug & Play", "Integração com frigorífico"],
    bar: ["Água pura todos os dias", "Mais praticidade", "Menos garrafas de plástico", "Opção de compra ou Lease"],
  },
  en: {
    label: "ACQUAFY WAAS | WATER AS A SERVICE",
    h1a: "Quality water by purchase or subscription.", h1b: "Acquafy Neo UP",
    sub: "Bring pure, practical and smart water to your home with the Acquafy WaaS model. Choose between immediate purchase or monthly Lease, with premium technology and more convenience every day.",
    buy: "Purchase:", lease: "Lease:", perMonth: "/month",
    cards: ["4 high-performance filters", "20 treatment stages", "Plug & Play", "Refrigerator integration"],
    bar: ["Pure water every day", "More convenience", "Fewer plastic bottles", "Purchase or Lease option"],
  },
  "en-gb": {
    label: "ACQUAFY WAAS | WATER AS A SERVICE",
    h1a: "Quality water by purchase or subscription.", h1b: "Acquafy Neo UP",
    sub: "Bring pure, practical and smart water to your home with the Acquafy WaaS model. Choose between immediate purchase or monthly Lease, with premium technology and more convenience every day.",
    buy: "Purchase:", lease: "Lease:", perMonth: "/month",
    cards: ["4 high-performance filters", "20 treatment stages", "Plug & Play", "Fridge integration"],
    bar: ["Pure water every day", "More convenience", "Fewer plastic bottles", "Purchase or Lease option"],
  },
  es: {
    label: "ACQUAFY WAAS | AGUA COMO SERVICIO",
    h1a: "Agua de calidad por compra o suscripción.", h1b: "Acquafy Neo UP",
    sub: "Lleve agua pura, práctica e inteligente a su hogar con el modelo Acquafy WaaS. Elija entre compra inmediata o Lease mensual, con tecnología premium y más comodidad en el día a día.",
    buy: "Compra:", lease: "Lease:", perMonth: "/mes",
    cards: ["4 filtros de alto rendimiento", "20 etapas de tratamiento", "Plug & Play", "Integración con refrigerador"],
    bar: ["Agua pura todos los días", "Más practicidad", "Menos botellas de plástico", "Opción de compra o Lease"],
  },
  fr: {
    label: "ACQUAFY WAAS | L'EAU COMME SERVICE",
    h1a: "Une eau de qualité à l'achat ou par abonnement.", h1b: "Acquafy Neo UP",
    sub: "Apportez une eau pure, pratique et intelligente chez vous avec le modèle Acquafy WaaS. Choisissez entre l'achat immédiat ou le Lease mensuel, avec une technologie premium et plus de confort au quotidien.",
    buy: "Achat :", lease: "Lease :", perMonth: "/mois",
    cards: ["4 filtres haute performance", "20 étapes de traitement", "Plug & Play", "Intégration avec le réfrigérateur"],
    bar: ["De l'eau pure chaque jour", "Plus de praticité", "Moins de bouteilles en plastique", "Option d'achat ou de Lease"],
  },
  de: {
    label: "ACQUAFY WAAS | WASSER ALS SERVICE",
    h1a: "Hochwertiges Wasser per Kauf oder Abo.", h1b: "Acquafy Neo UP",
    sub: "Bringen Sie reines, praktisches und intelligentes Wasser mit dem Acquafy-WaaS-Modell in Ihr Zuhause. Wählen Sie zwischen Sofortkauf oder monatlichem Lease – mit Premium-Technologie und mehr Komfort im Alltag.",
    buy: "Kauf:", lease: "Lease:", perMonth: "/Monat",
    cards: ["4 Hochleistungsfilter", "20 Aufbereitungsstufen", "Plug & Play", "Kühlschrank-Integration"],
    bar: ["Reines Wasser jeden Tag", "Mehr Komfort", "Weniger Plastikflaschen", "Kauf- oder Lease-Option"],
  },
  it: {
    label: "ACQUAFY WAAS | L'ACQUA COME SERVIZIO",
    h1a: "Acqua di qualità con acquisto o abbonamento.", h1b: "Acquafy Neo UP",
    sub: "Porta acqua pura, pratica e intelligente a casa tua con il modello Acquafy WaaS. Scegli tra acquisto immediato o Lease mensile, con tecnologia premium e più comodità ogni giorno.",
    buy: "Acquisto:", lease: "Lease:", perMonth: "/mese",
    cards: ["4 filtri ad alte prestazioni", "20 fasi di trattamento", "Plug & Play", "Integrazione con il frigorifero"],
    bar: ["Acqua pura ogni giorno", "Più praticità", "Meno bottiglie di plastica", "Opzione di acquisto o Lease"],
  },
  zh: {
    label: "ACQUAFY WAAS | 水即服务",
    h1a: "购买或订阅，享优质水。", h1b: "Acquafy Neo UP",
    sub: "通过 Acquafy WaaS 模式，将纯净、便捷、智能的水带入您的家。可选择立即购买或按月租赁（Lease），搭载高端技术，让日常生活更便利。",
    buy: "购买：", lease: "Lease：", perMonth: "/月",
    cards: ["4 级高性能滤芯", "20 道处理工序", "即插即用", "冰箱集成"],
    bar: ["每天纯净好水", "更加便捷", "更少塑料瓶", "购买或 Lease 可选"],
  },
  ja: {
    label: "ACQUAFY WAAS | サービスとしての水",
    h1a: "購入またはサブスクリプションで、高品質な水を。", h1b: "Acquafy Neo UP",
    sub: "Acquafy WaaSモデルで、ピュアで手軽でスマートな水をご家庭へ。すぐに購入するか、月額リース（Lease）かをお選びいただけます。プレミアム技術で毎日をより快適に。",
    buy: "購入：", lease: "Lease：", perMonth: "/月",
    cards: ["高性能フィルター4本", "20段階の浄水処理", "プラグ＆プレイ", "冷蔵庫との連携"],
    bar: ["毎日、ピュアな水", "より便利に", "ペットボトルを削減", "購入またはLeaseを選択可"],
  },
  ko: {
    label: "ACQUAFY WAAS | 서비스형 물",
    h1a: "구매 또는 구독으로 만나는 고품질 물.", h1b: "Acquafy Neo UP",
    sub: "Acquafy WaaS 모델로 깨끗하고 편리하며 스마트한 물을 집으로 가져가세요. 즉시 구매 또는 월 Lease 중에서 선택하세요. 프리미엄 기술로 일상이 더 편리해집니다.",
    buy: "구매:", lease: "Lease:", perMonth: "/월",
    cards: ["고성능 필터 4개", "20단계 정수 처리", "플러그 앤 플레이", "냉장고 연동"],
    bar: ["매일 깨끗한 물", "더 편리하게", "플라스틱 병 줄이기", "구매 또는 Lease 선택"],
  },
  sv: {
    label: "ACQUAFY WAAS | VATTEN SOM TJÄNST",
    h1a: "Vatten av hög kvalitet genom köp eller prenumeration.", h1b: "Acquafy Neo UP",
    sub: "Ta hem rent, smidigt och smart vatten med Acquafy WaaS-modellen. Välj mellan direktköp eller månatlig Lease, med premiumteknik och mer bekvämlighet i vardagen.",
    buy: "Köp:", lease: "Lease:", perMonth: "/mån",
    cards: ["4 högpresterande filter", "20 reningssteg", "Plug & Play", "Integration med kylskåp"],
    bar: ["Rent vatten varje dag", "Mer bekvämlighet", "Färre plastflaskor", "Köp eller Lease"],
  },
  fi: {
    label: "ACQUAFY WAAS | VESI PALVELUNA",
    h1a: "Laadukasta vettä ostamalla tai tilaamalla.", h1b: "Acquafy Neo UP",
    sub: "Tuo puhdasta, käytännöllistä ja älykästä vettä kotiisi Acquafy WaaS -mallilla. Valitse välittömän oston tai kuukausittaisen Leasen välillä – premium-teknologialla ja enemmän mukavuutta arkeen.",
    buy: "Osto:", lease: "Lease:", perMonth: "/kk",
    cards: ["4 tehokasta suodatinta", "20 käsittelyvaihetta", "Plug & Play", "Jääkaappi-integraatio"],
    bar: ["Puhdasta vettä joka päivä", "Enemmän käytännöllisyyttä", "Vähemmän muovipulloja", "Osto tai Lease"],
  },
  ru: {
    label: "ACQUAFY WAAS | ВОДА КАК УСЛУГА",
    h1a: "Качественная вода по покупке или подписке.", h1b: "Acquafy Neo UP",
    sub: "Подарите своему дому чистую, удобную и умную воду с моделью Acquafy WaaS. Выберите немедленную покупку или ежемесячный Lease — с премиальными технологиями и большим комфортом каждый день.",
    buy: "Покупка:", lease: "Lease:", perMonth: "/мес.",
    cards: ["4 высокопроизводительных фильтра", "20 ступеней очистки", "Plug & Play", "Интеграция с холодильником"],
    bar: ["Чистая вода каждый день", "Больше удобства", "Меньше пластиковых бутылок", "Покупка или Lease"],
  },
  ro: {
    label: "ACQUAFY WAAS | APA CA SERVICIU",
    h1a: "Apa de calitate prin cumparare sau abonament.", h1b: "Acquafy Neo UP",
    sub: "Adu apa pura, practica si inteligenta in casa ta cu modelul Acquafy WaaS. Alege intre cumparare imediata sau Lease lunar, cu tehnologie premium si mai mult confort in fiecare zi.",
    buy: "Cumparare:", lease: "Lease:", perMonth: "/luna",
    cards: ["4 filtre de inalta performanta", "20 de etape de tratare", "Plug & Play", "Integrare cu frigiderul"],
    bar: ["Apa pura in fiecare zi", "Mai multa practicitate", "Mai putine sticle de plastic", "Optiune de cumparare sau Lease"],
  },
  he: {
    label: "ACQUAFY WAAS | מים כשירות",
    h1a: "מים איכותיים ברכישה או במנוי.", h1b: "Acquafy Neo UP",
    sub: "הביאו מים טהורים, נוחים וחכמים לביתכם עם מודל Acquafy WaaS. בחרו בין רכישה מיידית לבין Lease חודשי, עם טכנולוגיה פרימיום ויותר נוחות בכל יום.",
    buy: "רכישה:", lease: "Lease:", perMonth: "/חודש",
    cards: ["4 מסנני ביצועים גבוהים", "20 שלבי טיפול", "Plug & Play", "שילוב עם מקרר"],
    bar: ["מים טהורים בכל יום", "יותר נוחות", "פחות בקבוקי פלסטיק", "אפשרות רכישה או Lease"],
  },
};

export const NEO_UP = PRODUCT_PRICING_USD["neo-up"];

// ─── Banner "Chega de carregar água" (CheckoutUp) ────────────────────────────
export type WaasBannerText = {
  h1a: string; h1b: string;
  sub: string;
  cards: [string, string, string, string];
  moreA: string; moreB: string; moreC: string;
};

export const WAAS_BANNER: Record<Lang, WaasBannerText> = {
  pt: {
    h1a: "Chega de carregar", h1b: "água toda semana.",
    sub: "Com o Acquafy WaaS, sua família tem água de qualidade para beber, cozinhar e lavar frutas e legumes — com integração com a geladeira para água e gelo com mais praticidade.",
    cards: ["Menos gasto com garrafinhas", "Integração com a geladeira", "Água e gelo com qualidade", "Mais comodidade no dia a dia"],
    moreA: "Conheça o ", moreB: "Acquafy WaaS", moreC: "",
  },
  "pt-pt": {
    h1a: "Chega de carregar", h1b: "água toda a semana.",
    sub: "Com o Acquafy WaaS, a sua família tem água de qualidade para beber, cozinhar e lavar frutas e legumes — com integração com o frigorífico para água e gelo com mais praticidade.",
    cards: ["Menos gasto com garrafas", "Integração com o frigorífico", "Água e gelo com qualidade", "Mais comodidade no dia a dia"],
    moreA: "Conheça o ", moreB: "Acquafy WaaS", moreC: "",
  },
  en: {
    h1a: "No more carrying", h1b: "water every week.",
    sub: "With Acquafy WaaS, your family gets quality water to drink, cook and wash fruit and vegetables — with refrigerator integration for water and ice, more conveniently.",
    cards: ["Less spent on bottled water", "Refrigerator integration", "Quality water and ice", "More convenience every day"],
    moreA: "Discover ", moreB: "Acquafy WaaS", moreC: "",
  },
  "en-gb": {
    h1a: "No more carrying", h1b: "water every week.",
    sub: "With Acquafy WaaS, your family gets quality water to drink, cook and wash fruit and vegetables — with fridge integration for water and ice, more conveniently.",
    cards: ["Less spent on bottled water", "Fridge integration", "Quality water and ice", "More convenience every day"],
    moreA: "Discover ", moreB: "Acquafy WaaS", moreC: "",
  },
  es: {
    h1a: "Basta de cargar", h1b: "agua toda la semana.",
    sub: "Con Acquafy WaaS, su familia tiene agua de calidad para beber, cocinar y lavar frutas y verduras — con integración con el refrigerador para agua y hielo con más practicidad.",
    cards: ["Menos gasto en botellas", "Integración con el refrigerador", "Agua y hielo con calidad", "Más comodidad en el día a día"],
    moreA: "Conozca ", moreB: "Acquafy WaaS", moreC: "",
  },
  fr: {
    h1a: "Fini de porter", h1b: "l'eau chaque semaine.",
    sub: "Avec Acquafy WaaS, votre famille dispose d'une eau de qualité pour boire, cuisiner et laver fruits et légumes — avec intégration au réfrigérateur pour de l'eau et des glaçons en toute simplicité.",
    cards: ["Moins de dépenses en bouteilles", "Intégration avec le réfrigérateur", "Eau et glaçons de qualité", "Plus de confort au quotidien"],
    moreA: "Découvrez ", moreB: "Acquafy WaaS", moreC: "",
  },
  de: {
    h1a: "Schluss mit dem", h1b: "Wasserschleppen jede Woche.",
    sub: "Mit Acquafy WaaS hat Ihre Familie Wasser in bester Qualität zum Trinken, Kochen und zum Waschen von Obst und Gemüse – mit Kühlschrank-Integration für Wasser und Eis, ganz bequem.",
    cards: ["Weniger Kosten für Flaschen", "Kühlschrank-Integration", "Wasser und Eis in Qualität", "Mehr Komfort im Alltag"],
    moreA: "Entdecken Sie ", moreB: "Acquafy WaaS", moreC: "",
  },
  it: {
    h1a: "Basta trasportare", h1b: "acqua ogni settimana.",
    sub: "Con Acquafy WaaS la tua famiglia ha acqua di qualità per bere, cucinare e lavare frutta e verdura — con integrazione con il frigorifero per acqua e ghiaccio, con più praticità.",
    cards: ["Meno spese per le bottiglie", "Integrazione con il frigorifero", "Acqua e ghiaccio di qualità", "Più comodità ogni giorno"],
    moreA: "Scopri ", moreB: "Acquafy WaaS", moreC: "",
  },
  zh: {
    h1a: "不必再每周", h1b: "扛水回家。",
    sub: "有了 Acquafy WaaS，全家都能喝上优质水，用于饮用、烹饪以及清洗蔬果——并与冰箱集成，随取随用的水和冰更加便捷。",
    cards: ["减少瓶装水开支", "与冰箱集成", "优质的水与冰", "日常生活更便利"],
    moreA: "了解 ", moreB: "Acquafy WaaS", moreC: "",
  },
  ja: {
    h1a: "毎週の水運びは", h1b: "もう終わり。",
    sub: "Acquafy WaaSなら、ご家族は飲用、調理、野菜や果物の洗浄に使える高品質な水を手に入れられます。冷蔵庫との連携で、水も氷もさらに手軽に。",
    cards: ["ボトル代を節約", "冷蔵庫との連携", "高品質な水と氷", "毎日をもっと快適に"],
    moreA: "", moreB: "Acquafy WaaS", moreC: "を見る",
  },
  ko: {
    h1a: "매주 물 나르는 일,", h1b: "이제 그만.",
    sub: "Acquafy WaaS와 함께라면 온 가족이 마시고, 요리하고, 과일과 채소를 씻을 수 있는 고품질의 물을 사용할 수 있습니다. 냉장고 연동으로 물과 얼음까지 더 편리하게.",
    cards: ["생수 비용 절감", "냉장고 연동", "고품질 물과 얼음", "더 편리한 일상"],
    moreA: "", moreB: "Acquafy WaaS", moreC: " 알아보기",
  },
  sv: {
    h1a: "Slut på att bära", h1b: "vatten varje vecka.",
    sub: "Med Acquafy WaaS får din familj vatten av hög kvalitet att dricka, laga mat med och tvätta frukt och grönsaker i — med kylskåpsintegration för vatten och is, ännu smidigare.",
    cards: ["Mindre kostnad för flaskor", "Integration med kylskåp", "Vatten och is av hög kvalitet", "Mer bekvämlighet i vardagen"],
    moreA: "Upptäck ", moreB: "Acquafy WaaS", moreC: "",
  },
  fi: {
    h1a: "Ei enää vesien", h1b: "kantamista joka viikko.",
    sub: "Acquafy WaaS:n avulla perheesi saa laadukasta vettä juomiseen, ruoanlaittoon sekä hedelmien ja vihannesten pesuun – jääkaappi-integraatiolla vettä ja jäätä vielä helpommin.",
    cards: ["Vähemmän kuluja pulloista", "Jääkaappi-integraatio", "Laadukasta vettä ja jäätä", "Enemmän mukavuutta arkeen"],
    moreA: "Tutustu ", moreB: "Acquafy WaaS", moreC: "",
  },
  ru: {
    h1a: "Хватит носить", h1b: "воду каждую неделю.",
    sub: "С Acquafy WaaS ваша семья получает качественную воду для питья, готовки и мытья фруктов и овощей — с интеграцией с холодильником для воды и льда с большим удобством.",
    cards: ["Меньше трат на бутылки", "Интеграция с холодильником", "Качественные вода и лёд", "Больше удобства каждый день"],
    moreA: "Узнайте об ", moreB: "Acquafy WaaS", moreC: "",
  },
  ro: {
    h1a: "Gata cu carat", h1b: "apa in fiecare saptamana.",
    sub: "Cu Acquafy WaaS, familia ta are apa de calitate pentru baut, gatit si spalat fructe si legume — cu integrare cu frigiderul pentru apa si gheata, mai practic.",
    cards: ["Mai putine cheltuieli cu sticle", "Integrare cu frigiderul", "Apa si gheata de calitate", "Mai mult confort zilnic"],
    moreA: "Descopera ", moreB: "Acquafy WaaS", moreC: "",
  },
  he: {
    h1a: "די לסחוב", h1b: "מים כל שבוע.",
    sub: "עם Acquafy WaaS, המשפחה שלכם נהנית ממים איכותיים לשתייה, לבישול ולשטיפת פירות וירקות — עם שילוב במקרר למים וקרח בנוחות רבה יותר.",
    cards: ["פחות הוצאות על בקבוקים", "שילוב עם מקרר", "מים וקרח איכותיים", "יותר נוחות בכל יום"],
    moreA: "הכירו את ", moreB: "Acquafy WaaS", moreC: "",
  },
};
