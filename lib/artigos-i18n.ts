import type { ContentBlock } from "./artigos-data"

export type ArtigoI18n = {
  titulo: string
  tags: string[]
  resumo: string
  conteudo: ContentBlock[]
}

export type CategoriaI18n = {
  titulo: string
  descricao: string
}

export type LangNonPt = "pt-pt" | "en" | "en-gb" | "es" | "fr" | "de" | "it" | "zh" | "ja" | "ko" | "sv" | "fi" | "ru" | "ro" | "he"

// ── Per-category article translations (filled by agents) ──────────────────
import { PRODUTOS_I18N }           from "./artigos-i18n-produtos"
import { APP_AI_IOT_I18N }         from "./artigos-i18n-app-ai-iot"
import { MEDIA_NETWORK_I18N }      from "./artigos-i18n-media-network"
import { PARCEIROS_I18N }          from "./artigos-i18n-parceiros"
import { FATURAMENTO_I18N }        from "./artigos-i18n-faturamento"
import { INSTALACAO_I18N }         from "./artigos-i18n-instalacao"

// Article translations — keyed by artigo slug → lang → translated content
export const ARTIGOS_I18N: Record<string, Partial<Record<LangNonPt, ArtigoI18n>>> = {
  ...PRODUTOS_I18N,
  ...APP_AI_IOT_I18N,
  ...MEDIA_NETWORK_I18N,
  ...PARCEIROS_I18N,
  ...FATURAMENTO_I18N,
  ...INSTALACAO_I18N,
}

// Category label translations — keyed by categoria slug
export const CATEGORIAS_I18N: Record<string, Partial<Record<LangNonPt, CategoriaI18n>>> = {
  "produtos": {
    "pt-pt": { titulo: "Produtos",                  descricao: "Conheça os modelos e tecnologias da linha Neo" },
    en:       { titulo: "Products",                  descricao: "Explore Neo line models and technologies" },
    "en-gb":  { titulo: "Products",                  descricao: "Explore Neo line models and technologies" },
    es:       { titulo: "Productos",                 descricao: "Conoce los modelos y tecnologías de la línea Neo" },
    fr:       { titulo: "Produits",                  descricao: "Découvrez les modèles et technologies de la gamme Neo" },
    de:       { titulo: "Produkte",                  descricao: "Entdecken Sie die Neo-Modelle und Technologien" },
    it:       { titulo: "Prodotti",                  descricao: "Scopri i modelli e le tecnologie della linea Neo" },
    zh:       { titulo: "产品",                       descricao: "了解 Neo 系列型号和技术" },
    ja:       { titulo: "製品",                       descricao: "Neoラインのモデルと技術を確認" },
    ko:       { titulo: "제품",                       descricao: "Neo 라인 모델 및 기술 살펴보기" },
    sv:       { titulo: "Produkter",                  descricao: "Utforska Neo-linjens modeller och teknologier" },
    fi:       { titulo: "Tuotteet",                   descricao: "Tutustu Neo-linjan malleihin ja teknologioihin" },
    ru:       { titulo: "Продукты",                   descricao: "Ознакомьтесь с моделями и технологиями линейки Neo" },
    ro:       { titulo: "Produse",                    descricao: "Explorati modelele si tehnologiile liniei Neo" },
    he:       { titulo: "מוצרים",                     descricao: "גלה את הדגמים והטכנולוגיות של קו Neo" },
  },
  "app-ai-iot": {
    "pt-pt": { titulo: "App, IA & IoT",              descricao: "Conectividade, inteligência artificial e integração IoT" },
    en:       { titulo: "App, AI & IoT",              descricao: "Connectivity, artificial intelligence and IoT integration" },
    "en-gb":  { titulo: "App, AI & IoT",              descricao: "Connectivity, artificial intelligence and IoT integration" },
    es:       { titulo: "App, IA & IoT",              descricao: "Conectividad, inteligencia artificial e integración IoT" },
    fr:       { titulo: "App, IA & IoT",              descricao: "Connectivité, intelligence artificielle et intégration IoT" },
    de:       { titulo: "App, KI & IoT",              descricao: "Konnektivität, künstliche Intelligenz und IoT-Integration" },
    it:       { titulo: "App, IA & IoT",              descricao: "Connettività, intelligenza artificiale e integrazione IoT" },
    zh:       { titulo: "应用、AI & IoT",              descricao: "连接、人工智能与物联网集成" },
    ja:       { titulo: "アプリ・AI・IoT",              descricao: "接続性、人工知能、IoT統合" },
    ko:       { titulo: "앱, AI & IoT",               descricao: "연결성, 인공지능 및 IoT 통합" },
    sv:       { titulo: "App, AI & IoT",              descricao: "Anslutning, artificiell intelligens och IoT-integration" },
    fi:       { titulo: "Sovellus, AI & IoT",         descricao: "Yhteydet, tekoaly ja IoT-integraatio" },
    ru:       { titulo: "Приложение, ИИ и IoT",       descricao: "Связь, искусственный интеллект и IoT-интеграция" },
    ro:       { titulo: "App, AI & IoT",              descricao: "Conectivitate, inteligenta artificiala si integrare IoT" },
    he:       { titulo: "אפליקציה, AI ו-IoT",         descricao: "קישוריות, בינה מלאכותית ואינטגרציית IoT" },
  },
  "media-network": {
    "pt-pt": { titulo: "Media & Network",            descricao: "Publicidade, campanhas e receita recorrente na rede" },
    en:       { titulo: "Media & Network",            descricao: "Advertising, campaigns and recurring revenue on the network" },
    "en-gb":  { titulo: "Media & Network",            descricao: "Advertising, campaigns and recurring revenue on the network" },
    es:       { titulo: "Media & Network",            descricao: "Publicidad, campañas e ingresos recurrentes en la red" },
    fr:       { titulo: "Media & Network",            descricao: "Publicité, campagnes et revenus récurrents sur le réseau" },
    de:       { titulo: "Media & Network",            descricao: "Werbung, Kampagnen und wiederkehrende Einnahmen im Netzwerk" },
    it:       { titulo: "Media & Network",            descricao: "Pubblicità, campagne e ricavi ricorrenti sulla rete" },
    zh:       { titulo: "媒体与网络",                   descricao: "网络广告、营销活动与经常性收入" },
    ja:       { titulo: "メディア＆ネットワーク",          descricao: "ネットワーク上の広告、キャンペーン、継続収益" },
    ko:       { titulo: "미디어 & 네트워크",             descricao: "네트워크의 광고, 캠페인 및 반복 수익" },
    sv:       { titulo: "Media & Natverk",            descricao: "Annonsering, kampanjer och aterkommande intakter i natverket" },
    fi:       { titulo: "Media & Verkosto",           descricao: "Mainonta, kampanjat ja toistuvat tulot verkostossa" },
    ru:       { titulo: "Медиа и сеть",               descricao: "Реклама, кампании и постоянный доход в сети" },
    ro:       { titulo: "Media & Retea",              descricao: "Publicitate, campanii si venituri recurente in retea" },
    he:       { titulo: "מדיה ורשת",                  descricao: "פרסום, קמפיינים והכנסות חוזרות ברשת" },
  },
  "parceiros": {
    "pt-pt": { titulo: "Parceiros",                  descricao: "Programas Silver, Gold e Platinum para distribuidores" },
    en:       { titulo: "Partners",                   descricao: "Silver, Gold and Platinum programs for distributors" },
    "en-gb":  { titulo: "Partners",                   descricao: "Silver, Gold and Platinum programs for distributors" },
    es:       { titulo: "Socios",                     descricao: "Programas Silver, Gold y Platinum para distribuidores" },
    fr:       { titulo: "Partenaires",                descricao: "Programmes Silver, Gold et Platinum pour les distributeurs" },
    de:       { titulo: "Partner",                    descricao: "Silver-, Gold- und Platinum-Programme für Distributoren" },
    it:       { titulo: "Partner",                    descricao: "Programmi Silver, Gold e Platinum per i distributori" },
    zh:       { titulo: "合作伙伴",                     descricao: "面向经销商的 Silver、Gold 和 Platinum 计划" },
    ja:       { titulo: "パートナー",                   descricao: "ディストリビューター向けのSilver・Gold・Platinumプログラム" },
    ko:       { titulo: "파트너",                      descricao: "유통업체를 위한 Silver, Gold 및 Platinum 프로그램" },
    sv:       { titulo: "Partners",                   descricao: "Silver-, Gold- och Platinum-program for distributorer" },
    fi:       { titulo: "Kumppanit",                  descricao: "Silver, Gold ja Platinum -ohjelmat jakelijoille" },
    ru:       { titulo: "Партнеры",                   descricao: "Программы Silver, Gold и Platinum для дистрибьюторов" },
    ro:       { titulo: "Parteneri",                  descricao: "Programe Silver, Gold si Platinum pentru distribuitori" },
    he:       { titulo: "שותפים",                     descricao: "תוכניות Silver, Gold ו-Platinum עבור מפיצים" },
  },
  "faturamento": {
    "pt-pt": { titulo: "Faturação",                  descricao: "Faturas, pagamentos, comissões e documentação fiscal" },
    en:       { titulo: "Billing",                    descricao: "Invoices, payments, commissions and tax documentation" },
    "en-gb":  { titulo: "Billing",                    descricao: "Invoices, payments, commissions and tax documentation" },
    es:       { titulo: "Facturación",                descricao: "Facturas, pagos, comisiones y documentación fiscal" },
    fr:       { titulo: "Facturation",                descricao: "Factures, paiements, commissions et documentation fiscale" },
    de:       { titulo: "Abrechnung",                 descricao: "Rechnungen, Zahlungen, Provisionen und Steuerdokumentation" },
    it:       { titulo: "Fatturazione",               descricao: "Fatture, pagamenti, commissioni e documentazione fiscale" },
    zh:       { titulo: "账单",                        descricao: "发票、付款、佣金与税务文件" },
    ja:       { titulo: "請求",                        descricao: "請求書、支払い、コミッション、税務書類" },
    ko:       { titulo: "청구",                        descricao: "청구서, 결제, 수수료 및 세무 서류" },
    sv:       { titulo: "Fakturering",                descricao: "Fakturor, betalningar, provisioner och skattedokumentation" },
    fi:       { titulo: "Laskutus",                   descricao: "Laskut, maksut, provisiot ja verodokumentaatio" },
    ru:       { titulo: "Выставление счетов",          descricao: "Счета, платежи, комиссии и налоговая документация" },
    ro:       { titulo: "Facturare",                  descricao: "Facturi, plati, comisioane si documentatie fiscala" },
    he:       { titulo: "חיוב",                       descricao: "חשבוניות, תשלומים, עמלות ותיעוד מס" },
  },
  "instalacao-e-manutencao": {
    "pt-pt": { titulo: "Instalação & Manutenção",    descricao: "Guias de instalação, troca de filtros e manutenção preventiva" },
    en:       { titulo: "Installation & Maintenance", descricao: "Installation guides, filter replacement and preventive maintenance" },
    "en-gb":  { titulo: "Installation & Maintenance", descricao: "Installation guides, filter replacement and preventive maintenance" },
    es:       { titulo: "Instalación & Mantenimiento",descricao: "Guías de instalación, cambio de filtros y mantenimiento preventivo" },
    fr:       { titulo: "Installation & Maintenance", descricao: "Guides d'installation, remplacement des filtres et maintenance préventive" },
    de:       { titulo: "Installation & Wartung",     descricao: "Installationsanleitungen, Filterwechsel und vorbeugende Wartung" },
    it:       { titulo: "Installazione & Manutenzione",descricao: "Guide all'installazione, sostituzione filtri e manutenzione preventiva" },
    zh:       { titulo: "安装与维护",                   descricao: "安装指南、滤芯更换与预防性维护" },
    ja:       { titulo: "設置・メンテナンス",             descricao: "設置ガイド、フィルター交換、予防メンテナンス" },
    ko:       { titulo: "설치 및 유지보수",              descricao: "설치 가이드, 필터 교체 및 예방 유지보수" },
    sv:       { titulo: "Installation & Underhall",   descricao: "Installationsguider, filterbyte och forebyggande underhall" },
    fi:       { titulo: "Asennus & Huolto",           descricao: "Asennusohjeet, suodattimen vaihto ja ennaltaehkaiseva huolto" },
    ru:       { titulo: "Установка и техобслуживание", descricao: "Руководства по установке, замена фильтров и профилактическое обслуживание" },
    ro:       { titulo: "Instalare & Intretinere",    descricao: "Ghiduri de instalare, inlocuirea filtrelor si intretinere preventiva" },
    he:       { titulo: "התקנה ותחזוקה",               descricao: "מדריכי התקנה, החלפת מסננים ותחזוקה מניעתית" },
  },
}
