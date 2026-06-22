"use client";
import { useState } from "react";
import { useLang, type Lang } from "@/context/LanguageContext";
import FigmaIcon from "./FigmaIcon";

/* ── Assets ──────────────────────────────────────────────────────── */
const imgArrowWhite = "/figma-assets/icon-arrow-white-small.svg";
const imgSilver     = "/figma-assets/product-silver-d.webp";
const imgGold       = "/figma-assets/product-gold-c.webp";
const imgPlatinum   = "/figma-assets/product-platinum-d.webp";

/* ── SVG stroke icons (rendered via CSS mask — NOT <img>) ────────── */
const svgUser      = "/figma-assets/mp-icon-user.svg";
const svgScale     = "/figma-assets/mp-icon-scale.svg";
const svgCountry   = "/figma-assets/mp-icon-country.svg";
const svgShield    = "/figma-assets/mp-icon-shield.svg";
const svgDigital   = "/figma-assets/mp-icon-digital.svg";
const svgMultiReg  = "/figma-assets/mp-icon-multireg.svg";

/* ─────────────────────────────────────────────────────────────────
   StrokeIcon — renders SVG via CSS mask so colour can be overridden
───────────────────────────────────────────────────────────────── */
function StrokeIcon({ src, color, aspectW = 30, aspectH = 30 }: { src: string; color: string; aspectW?: number; aspectH?: number }) {
  const isGradient = color.startsWith("linear-gradient");
  const size = 30;
  const w = aspectW >= aspectH ? size : size * (aspectW / aspectH);
  const h = aspectH >= aspectW ? size : size * (aspectH / aspectW);
  const base: React.CSSProperties = {
    WebkitMaskImage:    `url(${src})`,
    maskImage:          `url(${src})`,
    WebkitMaskSize:     "contain",
    maskSize:           "contain",
    WebkitMaskRepeat:   "no-repeat",
    maskRepeat:         "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition:       "center",
    width:  w,
    height: h,
    flexShrink: 0,
  };
  return (
    <div
      style={isGradient ? { ...base, backgroundImage: color } : { ...base, backgroundColor: color }}
    />
  );
}

/* ── Types ───────────────────────────────────────────────────────── */
type TierItem = { icon: string; label: string; value: string; aspectW?: number; aspectH?: number };

type TierDef = {
  key:         "silver" | "gold" | "platinum";
  medal:       string;
  name:        string;
  nameStyle:   React.CSSProperties;
  outerCls:    string;
  innerCls:    string;
  badgeCls:    string;
  badgeStyle?: React.CSSProperties;
  iconColor:   string;
  labelStyle:  React.CSSProperties;
  footer:      string;
  footerStyle?: React.CSSProperties;
  btnCls:      string;
  btnStyle?:   React.CSSProperties;
  items:       TierItem[];
};

/* ── Platinum shared tokens ──────────────────────────────────────── */
const platGradient = "linear-gradient(148.94deg, #002ba8 0%, #6e0cc3 100%)";

const platLabelStyle: React.CSSProperties = {
  backgroundImage:      platGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor:  "transparent",
  backgroundClip:       "text",
};

const platBadgeStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(94.37deg, #e0e8ff 6.19%, #fefeff 49.77%, #f5eaff 93.35%)",
};

/* ── Tier translations ───────────────────────────────────────────── */
const T: Record<Lang, {
  heading:    string;
  headingHL:  string;
  silverFooter: string;
  goldFooter:   string;
  platFooter:   string;
  silver: { profile: string; profileVal: string; earn: string; earnVal: string; entry: string; entryVal: string; idealFor: string; idealForVal: string };
  gold:   { profile: string; profileVal: string; earn: string; earnVal: string; extraIncome: string; extraIncomeVal: string; entry: string; entryVal: string; idealFor: string; idealForVal: string };
  plat:   { profile: string; profileVal: string; howOp: string; howOpVal: string; rule: string; ruleVal: string; obs: string; obsVal: string; silverNet: string; silverNetVal: string; entry: string; entryVal: string };
}> = {
  pt: {
    heading:   "Modelos de ",
    headingHL: "Parceria",
    silverFooter: "Indica e recebe comissão sobre vendas.",
    goldFooter:   "Opera o Acquafy Media e vende Neo",
    platFooter:   "Distribui Neo e expande regionalmente",
    silver: {
      profile:    "Perfil",     profileVal:    "Afiliado / Indicador",
      earn:       "Como ganha", earnVal:       "20% sobre vendas indicadas via link ou QR Code",
      entry:      "Entrada",    entryVal:      "Cadastro simples e operação leve",
      idealFor:   "Ideal para", idealForVal:   "Influenciadores, consultores, vendedores e parceiros locais.",
    },
    gold: {
      profile:      "Perfil",        profileVal:      "Operador do Acquafy Media",
      earn:         "Como ganha",    earnVal:         "20% sobre vendas Neo via QR Code / link próprio",
      extraIncome:  "Receita extra", extraIncomeVal:  "Monetização de mídia local e operação do ponto de hidratação",
      entry:        "Entrada",       entryVal:        "Compra do Acquafy Media por US$ 2.000",
      idealFor:     "Ideal para",    idealForVal:     "Empreendedores, operadores de mídia e negócios locais",
    },
    plat: {
      profile:    "Perfil",          profileVal:    "Distribuidor regional /master partner",
      howOp:      "Como opera",      howOpVal:      "Compra com 70% de desconto sobre o preço EUA",
      rule:       "Regra comercial", ruleVal:       "Modalidade FOB. Revenda livre na sua região.",
      obs:        "Observação",      obsVal:        "Sem comissão da Acquafy. Assume frete, impostos e taxas.",
      silverNet:  "Rede Silver",     silverNetVal:  "Pode operar rede própria de parceiros Silver, pagando 20% para essa rede",
      entry:      "Entrada",         entryVal:      "Estrutura regional de distribuição.",
    },
  },
  "pt-pt": {
    heading:   "Modelos de ",
    headingHL: "Parceria",
    silverFooter: "Indica e recebe comissão sobre vendas.",
    goldFooter:   "Opera o Acquafy Media e vende Neo",
    platFooter:   "Distribui Neo e expande regionalmente",
    silver: {
      profile:    "Perfil",     profileVal:    "Afiliado / Indicador",
      earn:       "Como ganha", earnVal:       "20% sobre vendas indicadas via link ou QR Code",
      entry:      "Entrada",    entryVal:      "Registo simples e operação ligeira",
      idealFor:   "Ideal para", idealForVal:   "Influenciadores, consultores, vendedores e parceiros locais.",
    },
    gold: {
      profile:      "Perfil",        profileVal:      "Operador do Acquafy Media",
      earn:         "Como ganha",    earnVal:         "20% sobre vendas Neo via QR Code / link próprio",
      extraIncome:  "Receita extra", extraIncomeVal:  "Monetização de média local e operação do ponto de hidratação",
      entry:        "Entrada",       entryVal:        "Compra do Acquafy Media por US$ 2.000",
      idealFor:     "Ideal para",    idealForVal:     "Empreendedores, operadores de média e negócios locais",
    },
    plat: {
      profile:    "Perfil",          profileVal:    "Distribuidor regional / master partner",
      howOp:      "Como opera",      howOpVal:      "Compra com 70% de desconto sobre o preço EUA",
      rule:       "Regra comercial", ruleVal:       "Modalidade FOB. Revenda livre na sua região.",
      obs:        "Observação",      obsVal:        "Sem comissão da Acquafy. Assume frete, impostos e taxas.",
      silverNet:  "Rede Silver",     silverNetVal:  "Pode operar rede própria de parceiros Silver, pagando 20% para essa rede",
      entry:      "Entrada",         entryVal:      "Estrutura regional de distribuição.",
    },
  },
  en: {
    heading:   "Partnership ",
    headingHL: "Models",
    silverFooter: "Refers customers and earns commission on sales.",
    goldFooter:   "Operates Acquafy Media and sells Neo",
    platFooter:   "Distributes Neo and expands regionally",
    silver: {
      profile:    "Profile",    profileVal:    "Affiliate / Referrer",
      earn:       "Earnings",   earnVal:       "20% on referred sales via link or QR Code",
      entry:      "Entry",      entryVal:      "Simple registration and light operation",
      idealFor:   "Ideal for",  idealForVal:   "Influencers, consultants, sales reps, and local partners.",
    },
    gold: {
      profile:      "Profile",       profileVal:      "Acquafy Media Operator",
      earn:         "Earnings",      earnVal:         "20% on Neo sales via QR Code / own link",
      extraIncome:  "Extra revenue", extraIncomeVal:  "Local media monetization and hydration point operation",
      entry:        "Entry",         entryVal:        "Purchase of Acquafy Media for US$ 2,000",
      idealFor:     "Ideal for",     idealForVal:     "Entrepreneurs, media operators, and local businesses",
    },
    plat: {
      profile:    "Profile",         profileVal:    "Regional Distributor / Master Partner",
      howOp:      "How it works",    howOpVal:      "Buy at 70% discount off the US price",
      rule:       "Commercial rule", ruleVal:       "FOB terms. Free resale in your region.",
      obs:        "Note",            obsVal:        "No commission from Acquafy. You cover freight, taxes, and fees.",
      silverNet:  "Silver Network",  silverNetVal:  "Can operate your own Silver partner network, paying 20% to that network",
      entry:      "Entry",           entryVal:      "Regional distribution structure.",
    },
  },
  es: {
    heading:   "Modelos de ",
    headingHL: "Asociación",
    silverFooter: "Refiere clientes y recibe comisión por ventas.",
    goldFooter:   "Opera el Acquafy Media y vende Neo",
    platFooter:   "Distribuye Neo y expande regionalmente",
    silver: {
      profile:    "Perfil",        profileVal:    "Afiliado / Referidor",
      earn:       "Cómo gana",     earnVal:       "20% sobre ventas referidas via enlace o QR Code",
      entry:      "Entrada",       entryVal:      "Registro simple y operación ligera",
      idealFor:   "Ideal para",    idealForVal:   "Influencers, consultores, vendedores y socios locales.",
    },
    gold: {
      profile:      "Perfil",          profileVal:      "Operador del Acquafy Media",
      earn:         "Cómo gana",       earnVal:         "20% sobre ventas Neo via QR Code / enlace propio",
      extraIncome:  "Ingreso extra",   extraIncomeVal:  "Monetización de medios locales y operación del punto de hidratación",
      entry:        "Entrada",         entryVal:        "Compra del Acquafy Media por US$ 2.000",
      idealFor:     "Ideal para",      idealForVal:     "Emprendedores, operadores de medios y negocios locales",
    },
    plat: {
      profile:    "Perfil",            profileVal:    "Distribuidor regional / socio máster",
      howOp:      "Cómo opera",        howOpVal:      "Compra con 70% de descuento sobre el precio EE.UU.",
      rule:       "Regla comercial",   ruleVal:       "Modalidad FOB. Reventa libre en su región.",
      obs:        "Observación",       obsVal:        "Sin comisión de Acquafy. Asume flete, impuestos y tasas.",
      silverNet:  "Red Silver",        silverNetVal:  "Puede operar red propia de socios Silver, pagando 20% a esa red",
      entry:      "Entrada",           entryVal:      "Estructura regional de distribución.",
    },
  },
  fr: {
    heading:   "Modèles de ",
    headingHL: "Partenariat",
    silverFooter: "Recommande des clients et perçoit une commission sur les ventes.",
    goldFooter:   "Opère l'Acquafy Media et vend Neo",
    platFooter:   "Distribue Neo et s'étend régionalement",
    silver: {
      profile:    "Profil",       profileVal:    "Affilié / Recommandeur",
      earn:       "Revenus",      earnVal:       "20 % sur les ventes recommandées via lien ou QR Code",
      entry:      "Entrée",       entryVal:      "Inscription simple et opération légère",
      idealFor:   "Idéal pour",   idealForVal:   "Influenceurs, consultants, commerciaux et partenaires locaux.",
    },
    gold: {
      profile:      "Profil",          profileVal:      "Opérateur Acquafy Media",
      earn:         "Revenus",         earnVal:         "20 % sur les ventes Neo via QR Code / lien propre",
      extraIncome:  "Revenu extra",    extraIncomeVal:  "Monétisation des médias locaux et exploitation du point d'hydratation",
      entry:        "Entrée",          entryVal:        "Achat de l'Acquafy Media pour US$ 2 000",
      idealFor:     "Idéal pour",      idealForVal:     "Entrepreneurs, opérateurs médias et commerces locaux",
    },
    plat: {
      profile:    "Profil",              profileVal:    "Distributeur régional / Partenaire Master",
      howOp:      "Fonctionnement",      howOpVal:      "Achat à 70 % de réduction sur le prix américain",
      rule:       "Règle commerciale",   ruleVal:       "Conditions FOB. Revente libre dans votre région.",
      obs:        "Remarque",            obsVal:        "Pas de commission d'Acquafy. Vous prenez en charge le fret, les taxes et les frais.",
      silverNet:  "Réseau Silver",       silverNetVal:  "Peut gérer son propre réseau de partenaires Silver, en versant 20 % à ce réseau",
      entry:      "Entrée",              entryVal:      "Structure régionale de distribution.",
    },
  },
  de: {
    heading:   "Partnerschafts-",
    headingHL: "Modelle",
    silverFooter: "Empfiehlt Kunden und erhält Provision auf Verkäufe.",
    goldFooter:   "Betreibt Acquafy Media und verkauft Neo",
    platFooter:   "Vertreibt Neo und expandiert regional",
    silver: {
      profile:    "Profil",       profileVal:    "Affiliate / Empfehler",
      earn:       "Verdienst",    earnVal:       "20 % auf empfohlene Verkäufe via Link oder QR-Code",
      entry:      "Einstieg",     entryVal:      "Einfache Registrierung und leichter Betrieb",
      idealFor:   "Ideal für",    idealForVal:   "Influencer, Berater, Vertriebsmitarbeiter und lokale Partner.",
    },
    gold: {
      profile:      "Profil",           profileVal:      "Acquafy Media Betreiber",
      earn:         "Verdienst",        earnVal:         "20 % auf Neo-Verkäufe via QR-Code / eigener Link",
      extraIncome:  "Zusatzeinnahmen",  extraIncomeVal:  "Lokale Medienmonetarisierung und Betrieb des Hydrationspunkts",
      entry:        "Einstieg",         entryVal:        "Kauf von Acquafy Media für US$ 2.000",
      idealFor:     "Ideal für",        idealForVal:     "Unternehmer, Medienbetreiber und lokale Unternehmen",
    },
    plat: {
      profile:    "Profil",               profileVal:    "Regionaler Distributor / Master Partner",
      howOp:      "Funktionsweise",       howOpVal:      "Kauf mit 70 % Rabatt auf den US-Preis",
      rule:       "Handelsregel",         ruleVal:       "FOB-Bedingungen. Freier Weiterverkauf in Ihrer Region.",
      obs:        "Hinweis",              obsVal:        "Keine Provision von Acquafy. Sie übernehmen Fracht, Steuern und Gebühren.",
      silverNet:  "Silver-Netzwerk",      silverNetVal:  "Kann eigenes Silver-Partnernetzwerk betreiben und zahlt 20 % an dieses Netzwerk",
      entry:      "Einstieg",             entryVal:      "Regionale Vertriebsstruktur.",
    },
  },
  it: {
    heading:   "Modelli di ",
    headingHL: "Partnership",
    silverFooter: "Segnala clienti e riceve una commissione sulle vendite.",
    goldFooter:   "Gestisce Acquafy Media e vende Neo",
    platFooter:   "Distribuisce Neo ed espande regionalmente",
    silver: {
      profile:    "Profilo",      profileVal:    "Affiliato / Referente",
      earn:       "Guadagno",     earnVal:       "20% sulle vendite segnalate via link o QR Code",
      entry:      "Ingresso",     entryVal:      "Registrazione semplice e operazione leggera",
      idealFor:   "Ideale per",   idealForVal:   "Influencer, consulenti, agenti di vendita e partner locali.",
    },
    gold: {
      profile:      "Profilo",          profileVal:      "Operatore Acquafy Media",
      earn:         "Guadagno",         earnVal:         "20% sulle vendite Neo via QR Code / link proprio",
      extraIncome:  "Entrata extra",    extraIncomeVal:  "Monetizzazione dei media locali e gestione del punto di idratazione",
      entry:        "Ingresso",         entryVal:        "Acquisto di Acquafy Media per US$ 2.000",
      idealFor:     "Ideale per",       idealForVal:     "Imprenditori, operatori media e attività locali",
    },
    plat: {
      profile:    "Profilo",             profileVal:    "Distributore regionale / Master Partner",
      howOp:      "Come funziona",       howOpVal:      "Acquisto con il 70% di sconto sul prezzo USA",
      rule:       "Regola commerciale",  ruleVal:       "Condizioni FOB. Rivendita libera nella propria regione.",
      obs:        "Nota",                obsVal:        "Nessuna commissione da Acquafy. Si assumono spese di trasporto, tasse e oneri.",
      silverNet:  "Rete Silver",         silverNetVal:  "Può gestire una propria rete di partner Silver, pagando il 20% a questa rete",
      entry:      "Ingresso",            entryVal:      "Struttura di distribuzione regionale.",
    },
  },
  zh: {
    heading:   "合作",
    headingHL: "模式",
    silverFooter: "推荐客户并赚取销售佣金。",
    goldFooter:   "运营 Acquafy Media 并销售 Neo",
    platFooter:   "分销 Neo 并拓展区域市场",
    silver: {
      profile:    "定位",       profileVal:    "联盟会员 / 推荐人",
      earn:       "收益方式",   earnVal:       "通过链接或二维码推荐销售，获得20%佣金",
      entry:      "入门",       entryVal:      "简单注册，轻量运营",
      idealFor:   "适合",       idealForVal:   "网红、顾问、销售人员及本地合作伙伴。",
    },
    gold: {
      profile:      "定位",         profileVal:      "Acquafy Media 运营商",
      earn:         "收益方式",     earnVal:         "通过二维码/专属链接销售 Neo，获得20%佣金",
      extraIncome:  "额外收入",     extraIncomeVal:  "本地媒体变现及水站运营收入",
      entry:        "入门",         entryVal:        "购买 Acquafy Media，售价 US$ 2,000",
      idealFor:     "适合",         idealForVal:     "创业者、媒体运营商及本地商业机构",
    },
    plat: {
      profile:    "定位",           profileVal:    "区域分销商 / 主要合作伙伴",
      howOp:      "运营方式",       howOpVal:      "按美国价格享受70%折扣采购",
      rule:       "商业规则",       ruleVal:       "FOB 条款。在您的区域内自由转售。",
      obs:        "注意",           obsVal:        "无 Acquafy 佣金。自行承担运费、税款及相关费用。",
      silverNet:  "Silver 网络",    silverNetVal:  "可运营自有 Silver 合作伙伴网络，向该网络支付20%",
      entry:      "入门",           entryVal:      "区域分销结构。",
    },
  },
  ja: {
    heading:   "パートナーシップ",
    headingHL: "モデル",
    silverFooter: "顧客を紹介し、販売に応じたコミッションを受け取ります。",
    goldFooter:   "Acquafy Media を運営し、Neo を販売します",
    platFooter:   "Neo を流通させ、地域的に拡大します",
    silver: {
      profile:    "プロフィール",   profileVal:    "アフィリエイト / 紹介者",
      earn:       "収益",           earnVal:       "リンクまたはQRコード経由の紹介販売で20%",
      entry:      "参加方法",       entryVal:      "簡単な登録と軽量オペレーション",
      idealFor:   "最適対象",       idealForVal:   "インフルエンサー、コンサルタント、営業担当者、ローカルパートナー。",
    },
    gold: {
      profile:      "プロフィール",   profileVal:      "Acquafy Media オペレーター",
      earn:         "収益",           earnVal:         "QRコード/専用リンク経由のNeo販売で20%",
      extraIncome:  "追加収益",       extraIncomeVal:  "ローカルメディアの収益化と給水ポイントの運営",
      entry:        "参加方法",       entryVal:        "Acquafy Media を US$ 2,000 で購入",
      idealFor:     "最適対象",       idealForVal:     "起業家、メディアオペレーター、ローカルビジネス",
    },
    plat: {
      profile:    "プロフィール",   profileVal:    "地域ディストリビューター / マスターパートナー",
      howOp:      "運営方法",       howOpVal:      "米国価格から70%割引で購入",
      rule:       "商業ルール",     ruleVal:       "FOB条件。ご自身の地域で自由に再販可能。",
      obs:        "備考",           obsVal:        "Acquafy からのコミッションなし。送料、税金、手数料はご自身の負担。",
      silverNet:  "Silverネットワーク", silverNetVal: "独自の Silver パートナーネットワークを運営し、そのネットワークに20%を支払う",
      entry:      "参加方法",       entryVal:      "地域流通構造。",
    },
  },
  ko: {
    heading:   "파트너십 ",
    headingHL: "모델",
    silverFooter: "고객을 추천하고 판매에 대한 커미션을 받습니다.",
    goldFooter:   "Acquafy Media를 운영하고 Neo를 판매합니다",
    platFooter:   "Neo를 유통하고 지역적으로 확장합니다",
    silver: {
      profile:    "프로필",       profileVal:    "제휴사 / 추천인",
      earn:       "수익",         earnVal:       "링크 또는 QR 코드를 통한 추천 판매로 20%",
      entry:      "가입",         entryVal:      "간단한 등록 및 가벼운 운영",
      idealFor:   "이상적 대상",  idealForVal:   "인플루언서, 컨설턴트, 영업 담당자 및 로컬 파트너.",
    },
    gold: {
      profile:      "프로필",        profileVal:      "Acquafy Media 운영자",
      earn:         "수익",          earnVal:         "QR 코드 / 전용 링크를 통한 Neo 판매로 20%",
      extraIncome:  "추가 수익",     extraIncomeVal:  "로컬 미디어 수익화 및 수화 포인트 운영",
      entry:        "가입",          entryVal:        "Acquafy Media를 US$ 2,000에 구매",
      idealFor:     "이상적 대상",   idealForVal:     "기업가, 미디어 운영자 및 로컬 비즈니스",
    },
    plat: {
      profile:    "프로필",          profileVal:    "지역 유통사 / 마스터 파트너",
      howOp:      "운영 방식",       howOpVal:      "미국 가격의 70% 할인으로 구매",
      rule:       "상업적 규칙",     ruleVal:       "FOB 조건. 귀하의 지역에서 자유롭게 재판매.",
      obs:        "참고",            obsVal:        "Acquafy로부터 커미션 없음. 운임, 세금 및 수수료는 직접 부담.",
      silverNet:  "Silver 네트워크", silverNetVal:  "자체 Silver 파트너 네트워크를 운영하고 해당 네트워크에 20% 지급 가능",
      entry:      "가입",            entryVal:      "지역 유통 구조.",
    },
  },
};

/* ── Form translations ───────────────────────────────────────────── */
type FormLang = {
  titleSilver: string; titleGold: string; titlePlatinum: string;
  labelNome: string; placeholderNome: string;
  labelEmail: string; placeholderEmail: string;
  labelEmpresa: string; placeholderEmpresa: string;
  labelRegiao: string; placeholderRegiao: string;
  labelMensagem: string; placeholderMensagem: string;
  submitBtn: string;
  btnSilver: string; btnGold: string; btnPlatinum: string;
  privacyPre: string; privacyTerms: string; privacyMid: string; privacyPolicy: string; privacyPost: string;
};

const FORM_T: Record<Lang, FormLang> = {
  pt: {
    titleSilver: "Parceria Silver", titleGold: "Parceria Gold", titlePlatinum: "Parceria Platinum",
    labelNome: "Nome completo", placeholderNome: "Seu nome",
    labelEmail: "E-mail", placeholderEmail: "seu@email.com",
    labelEmpresa: "Nome da empresa", placeholderEmpresa: "Nome da sua empresa",
    labelRegiao: "País / Região", placeholderRegiao: "Ex.: Brasil, Portugal, EUA…",
    labelMensagem: "Mensagem", placeholderMensagem: "Como podemos ajudar você",
    submitBtn: "Enviar",
    btnSilver: "Seja um parceiro Silver", btnGold: "Seja um parceiro Gold", btnPlatinum: "Seja um parceiro Platinum",
    privacyPre: "Li e concordo com os ", privacyTerms: "Termos de Uso", privacyMid: " e a ", privacyPolicy: "Política de Privacidade", privacyPost: " da Acquafy",
  },
  "pt-pt": {
    titleSilver: "Parceria Silver", titleGold: "Parceria Gold", titlePlatinum: "Parceria Platinum",
    labelNome: "Nome completo", placeholderNome: "O seu nome",
    labelEmail: "E-mail", placeholderEmail: "o.seu@email.com",
    labelEmpresa: "Nome da empresa", placeholderEmpresa: "Nome da sua empresa",
    labelRegiao: "País / Região", placeholderRegiao: "Ex.: Brasil, Portugal, EUA…",
    labelMensagem: "Mensagem", placeholderMensagem: "Como podemos ajudá-lo",
    submitBtn: "Enviar",
    btnSilver: "Seja um parceiro Silver", btnGold: "Seja um parceiro Gold", btnPlatinum: "Seja um parceiro Platinum",
    privacyPre: "Li e concordo com os ", privacyTerms: "Termos de Utilização", privacyMid: " e a ", privacyPolicy: "Política de Privacidade", privacyPost: " da Acquafy",
  },
  en: {
    titleSilver: "Silver Partnership", titleGold: "Gold Partnership", titlePlatinum: "Platinum Partnership",
    labelNome: "Full Name", placeholderNome: "Your name",
    labelEmail: "E-mail", placeholderEmail: "your@email.com",
    labelEmpresa: "Company Name", placeholderEmpresa: "Your company name",
    labelRegiao: "Country / Region", placeholderRegiao: "E.g.: USA, Brazil, Portugal…",
    labelMensagem: "Message", placeholderMensagem: "How can we help you",
    submitBtn: "Send",
    btnSilver: "Become a Silver Partner", btnGold: "Become a Gold Partner", btnPlatinum: "Become a Platinum Partner",
    privacyPre: "I have read and agree to the ", privacyTerms: "Terms of Use", privacyMid: " and ", privacyPolicy: "Privacy Policy", privacyPost: " of Acquafy",
  },
  es: {
    titleSilver: "Asociación Silver", titleGold: "Asociación Gold", titlePlatinum: "Asociación Platinum",
    labelNome: "Nombre completo", placeholderNome: "Tu nombre",
    labelEmail: "E-mail", placeholderEmail: "tu@email.com",
    labelEmpresa: "Nombre de la empresa", placeholderEmpresa: "Nombre de tu empresa",
    labelRegiao: "País / Región", placeholderRegiao: "Ej.: España, México, Argentina…",
    labelMensagem: "Mensaje", placeholderMensagem: "¿Cómo podemos ayudarte?",
    submitBtn: "Enviar",
    btnSilver: "Ser Socio Silver", btnGold: "Ser Socio Gold", btnPlatinum: "Ser Socio Platinum",
    privacyPre: "He leído y acepto los ", privacyTerms: "Términos de Uso", privacyMid: " y la ", privacyPolicy: "Política de Privacidad", privacyPost: " de Acquafy",
  },
  fr: {
    titleSilver: "Partenariat Silver", titleGold: "Partenariat Gold", titlePlatinum: "Partenariat Platinum",
    labelNome: "Nom complet", placeholderNome: "Votre nom",
    labelEmail: "E-mail", placeholderEmail: "votre@email.com",
    labelEmpresa: "Nom de l'entreprise", placeholderEmpresa: "Nom de votre entreprise",
    labelRegiao: "Pays / Région", placeholderRegiao: "Ex. : France, Belgique, Canada…",
    labelMensagem: "Message", placeholderMensagem: "Comment pouvons-nous vous aider ?",
    submitBtn: "Envoyer",
    btnSilver: "Devenir Partenaire Silver", btnGold: "Devenir Partenaire Gold", btnPlatinum: "Devenir Partenaire Platinum",
    privacyPre: "J'ai lu et j'accepte les ", privacyTerms: "Conditions d'Utilisation", privacyMid: " et la ", privacyPolicy: "Politique de Confidentialité", privacyPost: " d'Acquafy",
  },
  de: {
    titleSilver: "Silver-Partnerschaft", titleGold: "Gold-Partnerschaft", titlePlatinum: "Platinum-Partnerschaft",
    labelNome: "Vollständiger Name", placeholderNome: "Ihr Name",
    labelEmail: "E-Mail", placeholderEmail: "ihre@email.com",
    labelEmpresa: "Firmenname", placeholderEmpresa: "Name Ihres Unternehmens",
    labelRegiao: "Land / Region", placeholderRegiao: "z. B.: Deutschland, Österreich, Schweiz…",
    labelMensagem: "Nachricht", placeholderMensagem: "Wie können wir Ihnen helfen?",
    submitBtn: "Senden",
    btnSilver: "Silver-Partner werden", btnGold: "Gold-Partner werden", btnPlatinum: "Platinum-Partner werden",
    privacyPre: "Ich habe die ", privacyTerms: "Nutzungsbedingungen", privacyMid: " und die ", privacyPolicy: "Datenschutzrichtlinie", privacyPost: " von Acquafy gelesen und stimme zu",
  },
  it: {
    titleSilver: "Partnership Silver", titleGold: "Partnership Gold", titlePlatinum: "Partnership Platinum",
    labelNome: "Nome completo", placeholderNome: "Il tuo nome",
    labelEmail: "E-mail", placeholderEmail: "tua@email.com",
    labelEmpresa: "Nome dell'azienda", placeholderEmpresa: "Nome della tua azienda",
    labelRegiao: "Paese / Regione", placeholderRegiao: "Es.: Italia, Svizzera, USA…",
    labelMensagem: "Messaggio", placeholderMensagem: "Come possiamo aiutarti?",
    submitBtn: "Invia",
    btnSilver: "Diventa Partner Silver", btnGold: "Diventa Partner Gold", btnPlatinum: "Diventa Partner Platinum",
    privacyPre: "Ho letto e accetto i ", privacyTerms: "Termini di Utilizzo", privacyMid: " e la ", privacyPolicy: "Politica sulla Privacy", privacyPost: " di Acquafy",
  },
  zh: {
    titleSilver: "Silver 合作伙伴", titleGold: "Gold 合作伙伴", titlePlatinum: "Platinum 合作伙伴",
    labelNome: "全名", placeholderNome: "您的姓名",
    labelEmail: "电子邮件", placeholderEmail: "您的@邮箱.com",
    labelEmpresa: "公司名称", placeholderEmpresa: "您的公司名称",
    labelRegiao: "国家 / 地区", placeholderRegiao: "例：中国、新加坡、美国…",
    labelMensagem: "消息", placeholderMensagem: "我们如何为您提供帮助？",
    submitBtn: "发送",
    btnSilver: "成为 Silver 合作伙伴", btnGold: "成为 Gold 合作伙伴", btnPlatinum: "成为 Platinum 合作伙伴",
    privacyPre: "我已阅读并同意 Acquafy 的 ", privacyTerms: "使用条款", privacyMid: " 和 ", privacyPolicy: "隐私政策", privacyPost: "",
  },
  ja: {
    titleSilver: "Silver パートナーシップ", titleGold: "Gold パートナーシップ", titlePlatinum: "Platinum パートナーシップ",
    labelNome: "氏名", placeholderNome: "お名前",
    labelEmail: "メールアドレス", placeholderEmail: "your@email.com",
    labelEmpresa: "会社名", placeholderEmpresa: "会社名を入力してください",
    labelRegiao: "国 / 地域", placeholderRegiao: "例：日本、アメリカ、オーストラリア…",
    labelMensagem: "メッセージ", placeholderMensagem: "どのようにお手伝いできますか？",
    submitBtn: "送信",
    btnSilver: "Silver パートナーになる", btnGold: "Gold パートナーになる", btnPlatinum: "Platinum パートナーになる",
    privacyPre: "Acquafy の ", privacyTerms: "利用規約", privacyMid: " および ", privacyPolicy: "プライバシーポリシー", privacyPost: " を読み、同意します",
  },
  ko: {
    titleSilver: "Silver 파트너십", titleGold: "Gold 파트너십", titlePlatinum: "Platinum 파트너십",
    labelNome: "전체 이름", placeholderNome: "이름을 입력하세요",
    labelEmail: "이메일", placeholderEmail: "your@email.com",
    labelEmpresa: "회사명", placeholderEmpresa: "회사명을 입력하세요",
    labelRegiao: "국가 / 지역", placeholderRegiao: "예: 한국, 미국, 일본…",
    labelMensagem: "메시지", placeholderMensagem: "어떻게 도와드릴까요?",
    submitBtn: "보내기",
    btnSilver: "Silver 파트너 신청", btnGold: "Gold 파트너 신청", btnPlatinum: "Platinum 파트너 신청",
    privacyPre: "Acquafy 의 ", privacyTerms: "이용약관", privacyMid: " 및 ", privacyPolicy: "개인정보 처리방침", privacyPost: "을 읽고 동의합니다",
  },
};

/* ── Shared styles ───────────────────────────────────────────────── */
const inputCls =
  "bg-white border-[0.5px] border-[#cbd0d4] flex gap-[10px] items-start overflow-clip p-[20px] rounded-[12px] w-full " +
  "font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] placeholder:text-[#c8cfd8] " +
  "outline-none focus:border-[#0233c3] transition-colors";

function FormField({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[12px] items-start w-full">
      <div className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#2a2a2b] w-full">
        {label}
      </div>
      {children}
    </div>
  );
}

/* ── Partner Modal ───────────────────────────────────────────────── */
function PartnerModal({ tier, ft, onClose }: {
  tier: "silver" | "gold" | "platinum";
  ft: FormLang;
  onClose: () => void;
}) {
  const [nome, setNome]         = useState("");
  const [email, setEmail]       = useState("");
  const [empresa, setEmpresa]   = useState("");
  const [regiao, setRegiao]     = useState("");
  const [mensagem, setMensagem] = useState("");
  const [aceito, setAceito]     = useState(false);

  const isCompany  = tier !== "silver";
  const isPlatinum = tier === "platinum";
  const title = tier === "silver" ? ft.titleSilver : tier === "gold" ? ft.titleGold : ft.titlePlatinum;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-[20px]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal card */}
      <div
        className="relative bg-white rounded-[16px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto p-[30px] lg:p-[40px] flex flex-col gap-[24px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <p
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #0233c3, #0569ff)" }}
          >
            {title}
          </p>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-[36px] rounded-full hover:bg-[#f0f0f0] transition-colors shrink-0 cursor-pointer"
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#3e4650" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[20px]">

          {/* Nome + Email */}
          <div className="flex flex-wrap gap-[16px] items-start">
            <div className="flex-1 min-w-[200px]">
              <FormField label={<>{ft.labelNome}<span className="text-[#d74b4d]">*</span></>}>
                <input
                  type="text"
                  placeholder={ft.placeholderNome}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputCls}
                />
              </FormField>
            </div>
            <div className="flex-1 min-w-[200px]">
              <FormField label={<>{ft.labelEmail}<span className="text-[#d74b4d]">*</span></>}>
                <input
                  type="email"
                  placeholder={ft.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </FormField>
            </div>
          </div>

          {/* Empresa (Gold + Platinum) */}
          {isCompany && (
            <FormField label={<>{ft.labelEmpresa}<span className="text-[#d74b4d]">*</span></>}>
              <input
                type="text"
                placeholder={ft.placeholderEmpresa}
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className={inputCls}
              />
            </FormField>
          )}

          {/* País / Região (Platinum only) */}
          {isPlatinum && (
            <FormField label={<>{ft.labelRegiao}<span className="text-[#d74b4d]">*</span></>}>
              <input
                type="text"
                placeholder={ft.placeholderRegiao}
                value={regiao}
                onChange={(e) => setRegiao(e.target.value)}
                className={inputCls}
              />
            </FormField>
          )}

          {/* Mensagem */}
          <FormField label={<>{ft.labelMensagem}<span className="text-[#d74b4d]">*</span></>}>
            <textarea
              placeholder={ft.placeholderMensagem}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={5}
              className={`${inputCls} resize-none`}
            />
          </FormField>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#0233c3] flex gap-[10px] items-center justify-center min-h-[50px] overflow-hidden px-[20px] py-[10px] rounded-[8px] w-full hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors cursor-pointer shrink-0"
          >
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white text-center whitespace-nowrap">
              {ft.submitBtn}
            </span>
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </button>

          {/* Checkbox privacidade */}
          <label className="flex gap-[9px] items-center w-full cursor-pointer shrink-0">
            <div className="relative shrink-0">
              <input
                type="checkbox"
                className="sr-only"
                checked={aceito}
                onChange={(e) => setAceito(e.target.checked)}
              />
              <div className="bg-white border-[0.5px] border-[#cbd0d4] flex flex-col items-center justify-center size-[24px] overflow-hidden p-[6px] rounded-[5px]">
                <div className={`bg-[#0569ff] rounded-full w-full aspect-square transition-opacity ${aceito ? "opacity-100" : "opacity-0"}`} />
              </div>
            </div>
            <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#2a2a2b]">
              {ft.privacyPre}
              <a href="/termos-de-uso" className="text-[#0569ff] hover:underline" onClick={(e) => e.stopPropagation()}>{ft.privacyTerms}</a>
              {ft.privacyMid}
              <a href="/politicas-privacidade" className="text-[#9f3df5] hover:underline" onClick={(e) => e.stopPropagation()}>{ft.privacyPolicy}</a>
              {ft.privacyPost}
            </span>
          </label>

        </div>
      </div>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────────────── */
export default function ModelosParceria() {
  const { lang } = useLang();
  const t  = T[lang];
  const ft = FORM_T[lang];
  const [openModal, setOpenModal] = useState<"silver" | "gold" | "platinum" | null>(null);

  /* ── Tier data (inside component to use translated strings) ────── */
  const tiers: TierDef[] = [
    /* ── SILVER ── */
    {
      key:       "silver",
      medal:     imgSilver,
      name:      "SILVER",
      nameStyle: { color: "#3e4650" },
      outerCls:  "bg-[#f6f9fe] border-2 border-[#e2e7fb]",
      innerCls:  "bg-white border border-[#e2e7fb]",
      badgeCls:  "border border-[#e2e7fb] bg-gradient-to-l from-[#e2e7fb] via-[#fbfcff] to-[#e2e7fb]",
      iconColor: "#0569ff",
      labelStyle: { color: "#2a2a2b" },
      footer: t.silverFooter,
      btnCls: "bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] text-white",
      items: [
        { icon: svgUser,    label: t.silver.profile,  value: t.silver.profileVal },
        { icon: svgScale,   label: t.silver.earn,     value: t.silver.earnVal },
        { icon: svgCountry, label: t.silver.entry,    value: t.silver.entryVal },
        { icon: svgShield,  label: t.silver.idealFor, value: t.silver.idealForVal, aspectW: 24, aspectH: 30 },
      ],
    },

    /* ── GOLD ── */
    {
      key:       "gold",
      medal:     imgGold,
      name:      "GOLD",
      nameStyle: { color: "#dfa727" },
      outerCls:  "bg-[#fcfaf6] border-2 border-[#ffe7bf]",
      innerCls:  "bg-white border border-[#ffe7bf]",
      badgeCls:  "bg-[#fcfaf6] border border-[#ffe7bf]",
      iconColor: "#dfa727",
      labelStyle: { color: "#dfa727" },
      footer: t.goldFooter,
      btnCls: "hover:opacity-90 active:opacity-80 text-white",
      btnStyle: { backgroundColor: "#dfa727" },
      items: [
        { icon: svgUser,    label: t.gold.profile,     value: t.gold.profileVal },
        { icon: svgScale,   label: t.gold.earn,        value: t.gold.earnVal },
        { icon: svgCountry, label: t.gold.extraIncome, value: t.gold.extraIncomeVal },
        { icon: svgShield,  label: t.gold.entry,       value: t.gold.entryVal },
        { icon: svgDigital, label: t.gold.idealFor,    value: t.gold.idealForVal, aspectW: 38, aspectH: 40 },
      ],
    },

    /* ── PLATINUM ── */
    {
      key:        "platinum",
      medal:      imgPlatinum,
      name:       "PLATINUM",
      nameStyle:  { color: "white" },
      outerCls:   "border-2 border-[#bbcaf8]",
      innerCls:   "bg-white border border-[#e2e7fb]",
      badgeCls:   "border border-[#bbcaf8]",
      badgeStyle: platBadgeStyle,
      iconColor:  platGradient,
      labelStyle: platLabelStyle,
      footer: t.platFooter,
      footerStyle: { color: "white" },
      btnCls: "hover:opacity-90 active:opacity-80 text-white",
      btnStyle: { backgroundImage: "linear-gradient(90deg, #0233c3, #9f3df5)" },
      items: [
        { icon: svgUser,     label: t.plat.profile,   value: t.plat.profileVal },
        { icon: svgScale,    label: t.plat.howOp,     value: t.plat.howOpVal },
        { icon: svgCountry,  label: t.plat.rule,      value: t.plat.ruleVal },
        { icon: svgShield,   label: t.plat.obs,       value: t.plat.obsVal, aspectW: 24, aspectH: 30 },
        { icon: svgDigital,  label: t.plat.silverNet, value: t.plat.silverNetVal, aspectW: 38, aspectH: 40 },
        { icon: svgMultiReg, label: t.plat.entry,     value: t.plat.entryVal },
      ],
    },
  ];

  const btnLabel = (key: "silver" | "gold" | "platinum") =>
    key === "silver" ? ft.btnSilver : key === "gold" ? ft.btnGold : ft.btnPlatinum;

  return (
    <>
      <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
        <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

          {/* Header */}
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
            {t.heading}
            <span className="text-[#0569ff]">{t.headingHL}</span>
          </h2>

          {/* Cards */}
          <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-[1_0_0] flex-col gap-[25px] items-center min-h-[320px] min-w-[280px] px-[20px] py-[25px] rounded-[16px] ${tier.outerCls}`}
                style={tier.name === "PLATINUM" ? { backgroundImage: "linear-gradient(92.97deg, #0233c3 6.19%, #9f3df5 93.35%)" } : undefined}
              >
                {/* Medal + tier name */}
                <div className="flex gap-[20px] items-center justify-center px-[20px] shrink-0 w-full">
                  <img src={tier.medal} alt={tier.name} className="object-contain shrink-0 size-[55px]" />
                  <p className="font-['Avenir_LT_Pro:95_Black'] flex-[1_0_0] min-w-px text-[32px] leading-[39px]" style={tier.nameStyle}>
                    {tier.name}
                  </p>
                </div>

                {/* Inner card */}
                <div className={`flex flex-1 flex-col gap-[20px] items-start justify-between p-[20px] rounded-[12px] w-full ${tier.innerCls}`}>
                  {tier.items.map((item) => (
                    <div key={item.label} className="flex flex-wrap gap-[20px] items-center justify-center min-w-[160px] shrink-0 w-full">
                      <div className={`flex items-center justify-center rounded-[9999px] shrink-0 size-[60px] ${tier.badgeCls}`} style={tier.badgeStyle}>
                        <StrokeIcon src={item.icon} color={tier.iconColor} aspectW={item.aspectW} aspectH={item.aspectH} />
                      </div>
                      <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] shrink-0 w-full" style={tier.labelStyle}>
                          {item.label}
                        </p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#3e4650] shrink-0 w-full">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center shrink-0 w-full">
                  <p
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] shrink-0 text-center w-full"
                    style={tier.footerStyle ?? { color: "#3e4650" }}
                  >
                    {tier.footer}
                  </p>
                </div>

                {/* Partner button */}
                <button
                  onClick={() => setOpenModal(tier.key)}
                  className={`flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] py-[12px] rounded-[8px] w-full shrink-0 transition-opacity cursor-pointer ${tier.btnCls}`}
                  style={tier.btnStyle}
                >
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-center whitespace-nowrap">
                    {btnLabel(tier.key)}
                  </span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {openModal && (
        <PartnerModal
          tier={openModal}
          ft={ft}
          onClose={() => setOpenModal(null)}
        />
      )}
    </>
  );
}
