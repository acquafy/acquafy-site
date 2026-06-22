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

export type LangNonPt = "pt-pt" | "en" | "es" | "fr" | "de" | "it" | "zh" | "ja" | "ko"

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
    es:       { titulo: "Productos",                 descricao: "Conoce los modelos y tecnologías de la línea Neo" },
    fr:       { titulo: "Produits",                  descricao: "Découvrez les modèles et technologies de la gamme Neo" },
    de:       { titulo: "Produkte",                  descricao: "Entdecken Sie die Neo-Modelle und Technologien" },
    it:       { titulo: "Prodotti",                  descricao: "Scopri i modelli e le tecnologie della linea Neo" },
    zh:       { titulo: "产品",                       descricao: "了解 Neo 系列型号和技术" },
    ja:       { titulo: "製品",                       descricao: "Neoラインのモデルと技術を確認" },
    ko:       { titulo: "제품",                       descricao: "Neo 라인 모델 및 기술 살펴보기" },
  },
  "app-ai-iot": {
    "pt-pt": { titulo: "App, IA & IoT",              descricao: "Conectividade, inteligência artificial e integração IoT" },
    en:       { titulo: "App, AI & IoT",              descricao: "Connectivity, artificial intelligence and IoT integration" },
    es:       { titulo: "App, IA & IoT",              descricao: "Conectividad, inteligencia artificial e integración IoT" },
    fr:       { titulo: "App, IA & IoT",              descricao: "Connectivité, intelligence artificielle et intégration IoT" },
    de:       { titulo: "App, KI & IoT",              descricao: "Konnektivität, künstliche Intelligenz und IoT-Integration" },
    it:       { titulo: "App, IA & IoT",              descricao: "Connettività, intelligenza artificiale e integrazione IoT" },
    zh:       { titulo: "应用、AI & IoT",              descricao: "连接、人工智能与物联网集成" },
    ja:       { titulo: "アプリ・AI・IoT",              descricao: "接続性、人工知能、IoT統合" },
    ko:       { titulo: "앱, AI & IoT",               descricao: "연결성, 인공지능 및 IoT 통합" },
  },
  "media-network": {
    "pt-pt": { titulo: "Media & Network",            descricao: "Publicidade, campanhas e receita recorrente na rede" },
    en:       { titulo: "Media & Network",            descricao: "Advertising, campaigns and recurring revenue on the network" },
    es:       { titulo: "Media & Network",            descricao: "Publicidad, campañas e ingresos recurrentes en la red" },
    fr:       { titulo: "Media & Network",            descricao: "Publicité, campagnes et revenus récurrents sur le réseau" },
    de:       { titulo: "Media & Network",            descricao: "Werbung, Kampagnen und wiederkehrende Einnahmen im Netzwerk" },
    it:       { titulo: "Media & Network",            descricao: "Pubblicità, campagne e ricavi ricorrenti sulla rete" },
    zh:       { titulo: "媒体与网络",                   descricao: "网络广告、营销活动与经常性收入" },
    ja:       { titulo: "メディア＆ネットワーク",          descricao: "ネットワーク上の広告、キャンペーン、継続収益" },
    ko:       { titulo: "미디어 & 네트워크",             descricao: "네트워크의 광고, 캠페인 및 반복 수익" },
  },
  "parceiros": {
    "pt-pt": { titulo: "Parceiros",                  descricao: "Programas Silver, Gold e Platinum para distribuidores" },
    en:       { titulo: "Partners",                   descricao: "Silver, Gold and Platinum programs for distributors" },
    es:       { titulo: "Socios",                     descricao: "Programas Silver, Gold y Platinum para distribuidores" },
    fr:       { titulo: "Partenaires",                descricao: "Programmes Silver, Gold et Platinum pour les distributeurs" },
    de:       { titulo: "Partner",                    descricao: "Silver-, Gold- und Platinum-Programme für Distributoren" },
    it:       { titulo: "Partner",                    descricao: "Programmi Silver, Gold e Platinum per i distributori" },
    zh:       { titulo: "合作伙伴",                     descricao: "面向经销商的 Silver、Gold 和 Platinum 计划" },
    ja:       { titulo: "パートナー",                   descricao: "ディストリビューター向けのSilver・Gold・Platinumプログラム" },
    ko:       { titulo: "파트너",                      descricao: "유통업체를 위한 Silver, Gold 및 Platinum 프로그램" },
  },
  "faturamento": {
    "pt-pt": { titulo: "Faturação",                  descricao: "Faturas, pagamentos, comissões e documentação fiscal" },
    en:       { titulo: "Billing",                    descricao: "Invoices, payments, commissions and tax documentation" },
    es:       { titulo: "Facturación",                descricao: "Facturas, pagos, comisiones y documentación fiscal" },
    fr:       { titulo: "Facturation",                descricao: "Factures, paiements, commissions et documentation fiscale" },
    de:       { titulo: "Abrechnung",                 descricao: "Rechnungen, Zahlungen, Provisionen und Steuerdokumentation" },
    it:       { titulo: "Fatturazione",               descricao: "Fatture, pagamenti, commissioni e documentazione fiscale" },
    zh:       { titulo: "账单",                        descricao: "发票、付款、佣金与税务文件" },
    ja:       { titulo: "請求",                        descricao: "請求書、支払い、コミッション、税務書類" },
    ko:       { titulo: "청구",                        descricao: "청구서, 결제, 수수료 및 세무 서류" },
  },
  "instalacao-e-manutencao": {
    "pt-pt": { titulo: "Instalação & Manutenção",    descricao: "Guias de instalação, troca de filtros e manutenção preventiva" },
    en:       { titulo: "Installation & Maintenance", descricao: "Installation guides, filter replacement and preventive maintenance" },
    es:       { titulo: "Instalación & Mantenimiento",descricao: "Guías de instalación, cambio de filtros y mantenimiento preventivo" },
    fr:       { titulo: "Installation & Maintenance", descricao: "Guides d'installation, remplacement des filtres et maintenance préventive" },
    de:       { titulo: "Installation & Wartung",     descricao: "Installationsanleitungen, Filterwechsel und vorbeugende Wartung" },
    it:       { titulo: "Installazione & Manutenzione",descricao: "Guide all'installazione, sostituzione filtri e manutenzione preventiva" },
    zh:       { titulo: "安装与维护",                   descricao: "安装指南、滤芯更换与预防性维护" },
    ja:       { titulo: "設置・メンテナンス",             descricao: "設置ガイド、フィルター交換、予防メンテナンス" },
    ko:       { titulo: "설치 및 유지보수",              descricao: "설치 가이드, 필터 교체 및 예방 유지보수" },
  },
}
