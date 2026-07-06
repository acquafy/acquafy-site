"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { CHECKIN_FAMILIES, type CheckinFamily } from "@/lib/checkin-products";
import { formatPrice, PRODUCT_PRICES_BRL, PRODUCT_IMAGES } from "@/lib/products";
import FigmaIcon from "@/components/FigmaIcon";
import { useCart } from "@/components/CartProvider";
import { useLang } from "@/context/LanguageContext";
import type { Lang } from "@/context/LanguageContext";

type Props = { family: CheckinFamily };

/* ── Spec data per variant ─────────────────────────────────────────────────── */
type VSpec = {
  formato: string; funcoes: string; temperaturas: string;
  gas: boolean; h2: boolean;
  painel: string; app: boolean; iot: boolean; wifi: boolean; uv: boolean;
  filtragem: string; tanque: string; material: string;
};

const SPECS: Record<string, VSpec> = {
  "neo-up":                { formato: "Bancada ou Parede", funcoes: "—",      temperaturas: "Natural",                  gas: false, h2: false, painel: "—",                  app: false, iot: false, wifi: false, uv: false, filtragem: "4 Filtros UF de Alta Performance", tanque: "—",      material: "Acabamento premium" },
  "neo-fit":               { formato: "Bancada ou Parede", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "400ml",  material: "Acabamento premium" },
  "neo-smart-h2":          { formato: "Bancada",           funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: true,  painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "800ml",  material: "Acabamento premium" },
  "neo-touch":             { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "800ml",  material: "Acabamento premium" },
  "neo-plus":              { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "1500ml", material: "Acabamento premium" },
  "neo-ultra":             { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium" },
  "neo-ultra-spark":       { formato: "Bancada",           funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium" },
  "neo-ultra-spark-h2":    { formato: "Bancada",           funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Acabamento premium" },
  "neo-max":               { formato: "Coluna",            funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium" },
  "neo-max-spark":         { formato: "Coluna",            funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium" },
  "neo-max-spark-h2":      { formato: "Coluna",            funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Acabamento premium" },
  "neo-infinity":          { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-infinity-spark":    { formato: "Bancada",           funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-infinity-spark-h2": { formato: "Bancada",           funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prestige":          { formato: "Embutido",          funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prestige-spark":    { formato: "Embutido",          funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prestige-spark-h2": { formato: "Embutido",          funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prime":             { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prime-spark":       { formato: "Bancada",           funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prime-spark-h2":    { formato: "Bancada",           funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "acquafy-media":          { formato: "Totem Digital",     funcoes: "—",      temperaturas: "Natural e Gelada",          gas: false, h2: false, painel: "Samsung Business 43\" 24/7", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de Alta Performance", tanque: "5.000ml", material: "Aço inox" },
};

const SPEC_VALUES: Record<string, Record<Lang, string>> = {
  "Bancada ou Parede": { pt: "Bancada ou Parede", "pt-pt": "Bancada ou Parede", en: "Countertop or Wall", "en-gb": "Countertop or Wall", es: "Encimera o Pared", fr: "Comptoir ou Mur", de: "Arbeitsplatte oder Wand", it: "Piano o Parete", zh: "台面或墙面", ja: "カウンターまたは壁面", ko: "카운터탑 또는 벽면", sv: "Bänkskiva eller Vägg", fi: "Työtaso tai Seinä", ru: "Столешница или Стена", ro: "Blat sau Perete", he: "שיש או קיר" },
  "Bancada":           { pt: "Bancada", "pt-pt": "Bancada", en: "Countertop", "en-gb": "Countertop", es: "Encimera", fr: "Comptoir", de: "Arbeitsplatte", it: "Piano", zh: "台面", ja: "カウンター", ko: "카운터탑", sv: "Bänkskiva", fi: "Työtaso", ru: "Столешница", ro: "Blat", he: "שיש" },
  "Coluna":            { pt: "Coluna", "pt-pt": "Coluna", en: "Column", "en-gb": "Column", es: "Columna", fr: "Colonne", de: "Säule", it: "Colonna", zh: "立式", ja: "コラム型", ko: "컬럼형", sv: "Kolonn", fi: "Pylväs", ru: "Колонна", ro: "Coloană", he: "עמודה" },
  "Embutido":          { pt: "Embutido", "pt-pt": "Embutido", en: "Built-in", "en-gb": "Built-in", es: "Empotrado", fr: "Encastré", de: "Eingebaut", it: "Da incasso", zh: "嵌入式", ja: "ビルトイン", ko: "빌트인", sv: "Inbyggd", fi: "Upotettava", ru: "Встроенный", ro: "Încastrat", he: "מובנה" },
  "Totem Digital":     { pt: "Totem Digital", "pt-pt": "Totem Digital", en: "Digital Totem", "en-gb": "Digital Totem", es: "Tótem Digital", fr: "Totem Digital", de: "Digitaler Totem", it: "Totem Digitale", zh: "数字立牌", ja: "デジタルトーテム", ko: "디지털 토템", sv: "Digital Totem", fi: "Digitaalinen Totem", ru: "Цифровой Тотем", ro: "Totem Digital", he: "טוטם דיגיטלי" },
  "Natural":                       { pt: "Natural", "pt-pt": "Natural", en: "Natural", "en-gb": "Natural", es: "Natural", fr: "Naturelle", de: "Natürlich", it: "Naturale", zh: "常温", ja: "常温", ko: "상온", sv: "Naturlig", fi: "Luonnollinen", ru: "Обычная", ro: "Naturală", he: "טבעי" },
  "Natural, Gelada e Quente":      { pt: "Natural, Gelada e Quente", "pt-pt": "Natural, Fria e Quente", en: "Cold, Hot & Ambient", "en-gb": "Cold, Hot & Ambient", es: "Natural, Fría y Caliente", fr: "Naturelle, Froide et Chaude", de: "Kalt, Heiß & Raumtemperatur", it: "Naturale, Fredda e Calda", zh: "常温、冷水和热水", ja: "常温・冷水・温水", ko: "상온·냉수·온수", sv: "Naturlig, Kall och Varm", fi: "Luonnollinen, Kylmä ja Kuuma", ru: "Обычная, Холодная и Горячая", ro: "Naturală, Rece și Caldă", he: "טבעי, קר וחם" },
  "Natural e Gelada":              { pt: "Natural e Gelada", "pt-pt": "Natural e Fria", en: "Ambient & Cold", "en-gb": "Ambient & Cold", es: "Natural y Fría", fr: "Naturelle et Froide", de: "Raumtemperatur & Kalt", it: "Naturale e Fredda", zh: "常温和冷水", ja: "常温と冷水", ko: "상온 및 냉수", sv: "Naturlig och Kall", fi: "Luonnollinen ja Kylmä", ru: "Обычная и Холодная", ro: "Naturală și Rece", he: "טבעי וקר" },
  "4 Filtros UF de Alta Performance": { pt: "4 Filtros UF de Alta Performance", "pt-pt": "4 Filtros UF de Alta Performance", en: "4 High-Performance UF Filters", "en-gb": "4 High-Performance UF Filters", es: "4 Filtros UF de Alto Rendimiento", fr: "4 Filtres UF Haute Performance", de: "4 Hochleistungs-UF-Filter", it: "4 Filtri UF ad Alta Prestazione", zh: "4级高性能超滤膜", ja: "高性能UFフィルター4段", ko: "고성능 UF 필터 4단계", sv: "4 Högpresterande UF-filter", fi: "4 Suorituskykyistä UF-suodatinta", ru: "4 Высокопроизводительных UF-фильтра", ro: "4 Filtre UF de Înaltă Performanță", he: "4 מסנני UF בעלי ביצועים גבוהים" },
  "4 Filtros RO / Osmose Reversa":    { pt: "4 Filtros RO / Osmose Reversa", "pt-pt": "4 Filtros RO / Osmose Inversa", en: "4 RO / Reverse Osmosis Filters", "en-gb": "4 RO / Reverse Osmosis Filters", es: "4 Filtros RO / Ósmosis Inversa", fr: "4 Filtres RO / Osmose Inverse", de: "4 RO / Umkehrosmose-Filter", it: "4 Filtri RO / Osmosi Inversa", zh: "4级反渗透过滤", ja: "逆浸透フィルター4段", ko: "역삼투압 필터 4단계", sv: "4 RO / Omvänd Osmos-filter", fi: "4 RO / Käänteisosmoosi-suodatinta", ru: "4 РО / Фильтра обратного осмоса", ro: "4 Filtre RO / Osmoză Inversă", he: "4 מסנני RO / אוסמוזה הפוכה" },
  "Acabamento premium":  { pt: "Acabamento premium", "pt-pt": "Acabamento premium", en: "Premium finish", "en-gb": "Premium finish", es: "Acabado premium", fr: "Finition premium", de: "Premium-Oberfläche", it: "Finitura premium", zh: "高级涂装", ja: "プレミアム仕上げ", ko: "프리미엄 마감", sv: "Premium ytbehandling", fi: "Premium-viimeistely", ru: "Премиальная отделка", ro: "Finisaj premium", he: "גימור פרימיום" },
  "Aço inox":            { pt: "Aço inox", "pt-pt": "Aço inoxidável", en: "Stainless steel", "en-gb": "Stainless steel", es: "Acero inoxidable", fr: "Acier inoxydable", de: "Edelstahl", it: "Acciaio inox", zh: "不锈钢", ja: "ステンレス鋼", ko: "스테인리스 스틸", sv: "Rostfritt stål", fi: "Ruostumaton teräs", ru: "Нержавеющая сталь", ro: "Oțel inoxidabil", he: "נירוסטה" },
  "Ultra Rápido com Gestão de Mídia": { pt: "Ultra Rápido com Gestão de Mídia", "pt-pt": "Ultra Rápido com Gestão de Média", en: "Ultra Fast with Media Management", "en-gb": "Ultra Fast with Media Management", es: "Ultra Rápido con Gestión de Medios", fr: "Ultra Rapide avec Gestion des Médias", de: "Ultraschnell mit Medienverwaltung", it: "Ultra Veloce con Gestione Media", zh: "超高速媒体管理", ja: "超高速メディア管理", ko: "초고속 미디어 관리", sv: "Ultrasnabb med mediehantering", fi: "Erittäin nopea medianhallinnalla", ru: "Ультрабыстрый с управлением медиа", ro: "Ultra Rapid cu Gestionare Media", he: "מהיר במיוחד עם ניהול מדיה" },
  "Tanque de Água Natural":  { pt: "Tanque de Água Natural", "pt-pt": "Tanque de Água Natural", en: "Natural Water Tank", "en-gb": "Natural Water Tank", es: "Tanque de Agua Natural", fr: "Réservoir d'eau naturelle", de: "Naturwassertank", it: "Serbatoio d'acqua naturale", zh: "天然水箱", ja: "天然水タンク", ko: "천연수 탱크", sv: "Naturvattentank", fi: "Luonnonvesisäiliö", ru: "Резервуар для природной воды", ro: "Rezervor de apa naturala", he: "מיכל מים טבעיים" },
  "Sensores de Proximidade": { pt: "Sensores de Proximidade", "pt-pt": "Sensores de Proximidade", en: "Proximity Sensors", "en-gb": "Proximity Sensors", es: "Sensores de Proximidad", fr: "Capteurs de Proximité", de: "Näherungssensoren", it: "Sensori di Prossimità", zh: "近距离传感器", ja: "近接センサー", ko: "근접 센서", sv: "Närhetssensorer", fi: "Lähestymisanturit", ru: "Датчики приближения", ro: "Senzori de Proximitate", he: "חיישני קרבה" },
  "2 (copos e garrafas)":    { pt: "2 (copos e garrafas)", "pt-pt": "2 (copos e garrafas)", en: "2 (cups and bottles)", "en-gb": "2 (cups and bottles)", es: "2 (vasos y botellas)", fr: "2 (tasses et bouteilles)", de: "2 (Tassen und Flaschen)", it: "2 (tazze e bottiglie)", zh: "2（杯子和瓶子）", ja: "2（カップとボトル）", ko: "2 (컵 및 병)", sv: "2 (koppar och flaskor)", fi: "2 (kupit ja pullot)", ru: "2 (стаканы и бутылки)", ro: "2 (pahare si sticle)", he: "2 (כוסות ובקבוקים)" },
  "Plataforma de Mídia":     { pt: "Plataforma de Mídia", "pt-pt": "Plataforma de Media", en: "Media Platform", "en-gb": "Media Platform", es: "Plataforma de Medios", fr: "Plateforme Media", de: "Medienplattform", it: "Piattaforma Media", zh: "媒体平台", ja: "メディアプラットフォーム", ko: "미디어 플랫폼", sv: "Medieplattform", fi: "Mediapalvelu", ru: "Медиаплатформа", ro: "Platforma Media", he: "פלטפורמת מדיה" },
  "Digital + Receita Recorrente": { pt: "Digital + Receita Recorrente", "pt-pt": "Digital + Receita Recorrente", en: "Digital + Recurring Revenue", "en-gb": "Digital + Recurring Revenue", es: "Digital + Ingresos Recurrentes", fr: "Digital + Revenus Récurrents", de: "Digital + Wiederkehrender Umsatz", it: "Digitale + Ricavi Ricorrenti", zh: "数字化 + 经常性收入", ja: "デジタル + 継続収益", ko: "디지털 + 반복 수익", sv: "Digital + Återkommande Intäkter", fi: "Digitaalinen + Toistuvat Tulot", ru: "Цифровой + Регулярный доход", ro: "Digital + Venituri Recurente", he: "דיגיטלי + הכנסות חוזרות" },
};

function translateSpecValue(val: string, lang: Lang): string {
  return SPEC_VALUES[val]?.[lang] ?? val;
}

const LABELS: Record<Lang, {
  formato: string; filtragem: string; temperaturas: string; gasLabel: string; h2Label: string;
  painel: string; app: string; aiIot: string; wifi: string; tanque: string; material: string; computador: string;
  fichaTecnica: string; demaisFuncionalidades: string; ocultarFuncionalidades: string;
  garantias: string; detalhesContaTitle: string;
  navProduto: string; navCores: string; navFiltros: string; navGarantias: string; navCep: string; navConta: string;
  nomeLabel: string; emailLabel: string; email2Label: string; telLabel: string;
  cepTitle: string; calcular: string;
  consentText: string; liAceito: string; termosDeUso: string;
  payCash: string; payFinanciar: string; payRent: string;
  finNote: string; freteNote: string;
  coresLabel: string; encomendar: string;
  pedidoConfirmado: string; precisaMaisAlgo: string;
  compareProdutos: string; acquafyMedia: string; sejaUmParceiro: string; comprarOutro: string;
  errNome: string; errEmail: string; errEmail2: string; errTel: string;
  semJuros: string;
  filtrosAltaPerformance: string; tabelaBeneficios: string;
  garantiaTitulo: string; garantiaDesc: string; filtroVidaTitulo: string; filtroVidaDesc: string;
  freteGratis: string; digitarCep: string; mapaEntrega: string;
  filtrosBanner: string; imagemBanner: string;
  imagemAnterior: string; proximaImagem: string;
  termosModalTitulo: string; termosIframe: string;
  adicionadoCarrinho: string; totalLabel: string;
  buscarPais: string; cepNaoEncontrado: string; erroCep: string;
}> = {
  pt: {
    formato: "Formato", filtragem: "Sistema de Filtragem", temperaturas: "Temperaturas",
    gasLabel: "Água com Gás", h2Label: "Água Hidrogenada",
    painel: "Painel", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Tanque", material: "Material", computador: "Computador",
    fichaTecnica: "FICHA TÉCNICA", demaisFuncionalidades: "Demais funcionalidades", ocultarFuncionalidades: "Ocultar funcionalidades",
    garantias: "Garantias", detalhesContaTitle: "Detalhes de sua conta",
    navProduto: "Produto", navCores: "Cores", navFiltros: "Filtros", navGarantias: "Garantias", navCep: "Entrega", navConta: "Conta",
    nomeLabel: "Nome Completo", emailLabel: "Endereço de Email", email2Label: "Confirme Endereço de Email", telLabel: "Número de Telefone",
    cepTitle: "Adicione seu CEP", calcular: "Calcular",
    consentText: "Ao prosseguir, autorizo a Acquafy a entrar em contato comigo sobre esta solicitação e a me enviar informações sobre produtos e serviços. Posso cancelar a qualquer momento.",
    liAceito: "Li e aceito os", termosDeUso: "Termos de Uso",
    payCash: "Encomendar", payFinanciar: "Financiar", payRent: "Alugar",
    finNote: "12x sem juros. Consulte condições no momento da compra.",
    freteNote: "Frete grátis para compras acima de R$ 500,00. Entrega em todo o Brasil.",
    coresLabel: "Cores", encomendar: "Encomendar",
    pedidoConfirmado: "Adicionado ao carrinho!", precisaMaisAlgo: "Precisa de mais algo?",
    compareProdutos: "Compare produtos", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Seja um Parceiro", comprarOutro: "Comprar outro?",
    errNome: "Informe nome e sobrenome", errEmail: "Email inválido", errEmail2: "Os emails não coincidem", errTel: "Número inválido",
    semJuros: "12x sem juros · ",
    filtrosAltaPerformance: "Filtros de Alta Performance", tabelaBeneficios: "Tabela de Benefícios",
    garantiaTitulo: "Garantia do Purificador", garantiaDesc: "1 ano de garantia de fábrica contra defeitos de fabricação. Suporte técnico especializado incluso.",
    filtroVidaTitulo: "Vida útil dos Filtros", filtroVidaDesc: "Filtros com duração de 12 meses ou conforme indicação do sistema de monitoramento do APP.",
    freteGratis: "Frete grátis", digitarCep: "Digite seu CEP para ver a localização de entrega",
    mapaEntrega: "Mapa de entrega", filtrosBanner: "Filtros de Alta Performance", imagemBanner: "Imagem do banner de filtros",
    imagemAnterior: "Imagem anterior", proximaImagem: "Próxima imagem",
    termosModalTitulo: "Termos de Uso", termosIframe: "Termos de Uso",
    adicionadoCarrinho: "Adicionado ao carrinho!", totalLabel: "Total",
    buscarPais: "Buscar país...", cepNaoEncontrado: "CEP não encontrado.", erroCep: "Erro ao consultar CEP. Tente novamente.",
  },
  "pt-pt": {
    formato: "Formato", filtragem: "Sistema de Filtragem", temperaturas: "Temperaturas",
    gasLabel: "Água com Gás", h2Label: "Água Hidrogenada",
    painel: "Painel", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Tanque", material: "Material", computador: "Computador",
    fichaTecnica: "FICHA TÉCNICA", demaisFuncionalidades: "Mais funcionalidades", ocultarFuncionalidades: "Ocultar funcionalidades",
    garantias: "Garantias", detalhesContaTitle: "Detalhes da sua conta",
    navProduto: "Produto", navCores: "Cores", navFiltros: "Filtros", navGarantias: "Garantias", navCep: "Entrega", navConta: "Conta",
    nomeLabel: "Nome Completo", emailLabel: "Endereço de Email", email2Label: "Confirme Endereço de Email", telLabel: "Número de Telefone",
    cepTitle: "Introduza o seu código postal", calcular: "Calcular",
    consentText: "Ao prosseguir, autorizo a Acquafy a contactar-me sobre este pedido e a enviar-me informações sobre produtos e serviços. Posso cancelar a qualquer momento.",
    liAceito: "Li e aceito os", termosDeUso: "Termos de Utilização",
    payCash: "Encomendar", payFinanciar: "Financiar", payRent: "Alugar",
    finNote: "12x sem juros. Consulte condições no momento da compra.",
    freteNote: "Envio gratuito para compras acima de R$ 500,00. Entrega em todo o Brasil.",
    coresLabel: "Cores", encomendar: "Encomendar",
    pedidoConfirmado: "Adicionado ao carrinho!", precisaMaisAlgo: "Precisa de mais algo?",
    compareProdutos: "Comparar produtos", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Seja Parceiro", comprarOutro: "Comprar outro?",
    errNome: "Indique nome e apelido", errEmail: "Email inválido", errEmail2: "Os emails não coincidem", errTel: "Número inválido",
    semJuros: "12x sem juros · ",
    filtrosAltaPerformance: "Filtros de Alta Performance", tabelaBeneficios: "Tabela de Benefícios",
    garantiaTitulo: "Garantia do Purificador", garantiaDesc: "1 ano de garantia de fábrica contra defeitos de fabricação. Suporte técnico especializado incluído.",
    filtroVidaTitulo: "Vida útil dos Filtros", filtroVidaDesc: "Filtros com duração de 12 meses ou conforme indicação do sistema de monitorização da APP.",
    freteGratis: "Envio gratuito", digitarCep: "Introduza o código postal para ver a localização de entrega",
    mapaEntrega: "Mapa de entrega", filtrosBanner: "Filtros de Alta Performance", imagemBanner: "Imagem do banner de filtros",
    imagemAnterior: "Imagem anterior", proximaImagem: "Próxima imagem",
    termosModalTitulo: "Termos de Utilização", termosIframe: "Termos de Utilização",
    adicionadoCarrinho: "Adicionado ao carrinho!", totalLabel: "Total",
    buscarPais: "Pesquisar país...", cepNaoEncontrado: "Código postal não encontrado.", erroCep: "Erro ao consultar o código postal. Tente novamente.",
  },
  en: {
    formato: "Format", filtragem: "Filtration System", temperaturas: "Temperatures",
    gasLabel: "Sparkling Water", h2Label: "Hydrogen Water",
    painel: "Panel", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Tank", material: "Material", computador: "Computer",
    fichaTecnica: "TECH SPECS", demaisFuncionalidades: "More features", ocultarFuncionalidades: "Hide features",
    garantias: "Warranties", detalhesContaTitle: "Account details",
    navProduto: "Product", navCores: "Colors", navFiltros: "Filters", navGarantias: "Warranty", navCep: "Delivery", navConta: "Account",
    nomeLabel: "Full Name", emailLabel: "Email Address", email2Label: "Confirm Email Address", telLabel: "Phone Number",
    cepTitle: "Enter your ZIP code", calcular: "Calculate",
    consentText: "By proceeding, I authorize Acquafy to contact me about this request and to send me information about products and services. I can unsubscribe at any time.",
    liAceito: "I have read and accept the", termosDeUso: "Terms of Use",
    payCash: "Cash", payFinanciar: "Finance", payRent: "Rent",
    finNote: "12x interest-free. Check conditions at the time of purchase.",
    freteNote: "Free shipping on orders over R$ 500.00. Delivery across Brazil.",
    coresLabel: "Colors", encomendar: "Order Now",
    pedidoConfirmado: "Added to cart!", precisaMaisAlgo: "Need anything else?",
    compareProdutos: "Compare products", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Become a Partner", comprarOutro: "Buy another?",
    errNome: "Please enter your first and last name", errEmail: "Invalid email", errEmail2: "Emails do not match", errTel: "Invalid number",
    semJuros: "12x interest-free · ",
    filtrosAltaPerformance: "High-Performance Filters", tabelaBeneficios: "Benefits Table",
    garantiaTitulo: "Purifier Warranty", garantiaDesc: "1-year factory warranty against manufacturing defects. Specialized technical support included.",
    filtroVidaTitulo: "Filter Lifespan", filtroVidaDesc: "Filters lasting 12 months or as indicated by the APP monitoring system.",
    freteGratis: "Free shipping", digitarCep: "Enter your ZIP code to see the delivery location",
    mapaEntrega: "Delivery map", filtrosBanner: "High-Performance Filters", imagemBanner: "Filter banner image",
    imagemAnterior: "Previous image", proximaImagem: "Next image",
    termosModalTitulo: "Terms of Use", termosIframe: "Terms of Use",
    adicionadoCarrinho: "Added to cart!", totalLabel: "Total",
    buscarPais: "Search country...", cepNaoEncontrado: "ZIP code not found.", erroCep: "Error looking up ZIP code. Please try again.",
  },
  "en-gb": {
    formato: "Format", filtragem: "Filtration System", temperaturas: "Temperatures",
    gasLabel: "Sparkling Water", h2Label: "Hydrogen Water",
    painel: "Panel", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Tank", material: "Material", computador: "Computer",
    fichaTecnica: "TECH SPECS", demaisFuncionalidades: "More features", ocultarFuncionalidades: "Hide features",
    garantias: "Warranties", detalhesContaTitle: "Account details",
    navProduto: "Product", navCores: "Colours", navFiltros: "Filters", navGarantias: "Warranty", navCep: "Delivery", navConta: "Account",
    nomeLabel: "Full Name", emailLabel: "Email Address", email2Label: "Confirm Email Address", telLabel: "Phone Number",
    cepTitle: "Enter your postcode", calcular: "Calculate",
    consentText: "By proceeding, I authorise Acquafy to contact me about this request and send me information about products and services. I can unsubscribe at any time.",
    liAceito: "I have read and accept the", termosDeUso: "Terms of Use",
    payCash: "Cash", payFinanciar: "Finance", payRent: "Rent",
    finNote: "12x interest-free. Check conditions at the time of purchase.",
    freteNote: "Free delivery on orders over R$ 500.00. Delivery across Brazil.",
    coresLabel: "Colours", encomendar: "Order Now",
    pedidoConfirmado: "Added to basket!", precisaMaisAlgo: "Need anything else?",
    compareProdutos: "Compare products", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Become a Partner", comprarOutro: "Buy another?",
    errNome: "Please enter your first and last name", errEmail: "Invalid email", errEmail2: "Emails do not match", errTel: "Invalid number",
    semJuros: "12x interest-free · ",
    filtrosAltaPerformance: "High-Performance Filters", tabelaBeneficios: "Benefits Table",
    garantiaTitulo: "Purifier Warranty", garantiaDesc: "1-year factory warranty against manufacturing defects. Specialised technical support included.",
    filtroVidaTitulo: "Filter Lifespan", filtroVidaDesc: "Filters lasting 12 months or as indicated by the APP monitoring system.",
    freteGratis: "Free delivery", digitarCep: "Enter your postcode to see the delivery location",
    mapaEntrega: "Delivery map", filtrosBanner: "High-Performance Filters", imagemBanner: "Filter banner image",
    imagemAnterior: "Previous image", proximaImagem: "Next image",
    termosModalTitulo: "Terms of Use", termosIframe: "Terms of Use",
    adicionadoCarrinho: "Added to basket!", totalLabel: "Total",
    buscarPais: "Search country...", cepNaoEncontrado: "Postcode not found.", erroCep: "Error looking up postcode. Please try again.",
  },
  es: {
    formato: "Formato", filtragem: "Sistema de Filtración", temperaturas: "Temperaturas",
    gasLabel: "Agua con Gas", h2Label: "Agua Hidrogenada",
    painel: "Panel", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Depósito", material: "Material", computador: "Ordenador",
    fichaTecnica: "FICHA TÉCNICA", demaisFuncionalidades: "Más funciones", ocultarFuncionalidades: "Ocultar funciones",
    garantias: "Garantías", detalhesContaTitle: "Detalles de tu cuenta",
    navProduto: "Producto", navCores: "Colores", navFiltros: "Filtros", navGarantias: "Garantía", navCep: "Entrega", navConta: "Cuenta",
    nomeLabel: "Nombre Completo", emailLabel: "Correo Electrónico", email2Label: "Confirma Correo Electrónico", telLabel: "Número de Teléfono",
    cepTitle: "Ingresa tu código postal", calcular: "Calcular",
    consentText: "Al continuar, autorizo a Acquafy a contactarme sobre esta solicitud y enviarme información sobre productos y servicios. Puedo cancelar en cualquier momento.",
    liAceito: "He leído y acepto los", termosDeUso: "Términos de Uso",
    payCash: "Efectivo", payFinanciar: "Financiar", payRent: "Alquilar",
    finNote: "12 cuotas sin interés. Consulte condiciones al momento de la compra.",
    freteNote: "Envío gratis en compras superiores a R$ 500,00. Entrega en todo Brasil.",
    coresLabel: "Colores", encomendar: "Pedir Ahora",
    pedidoConfirmado: "¡Añadido al carrito!", precisaMaisAlgo: "¿Necesitas algo más?",
    compareProdutos: "Comparar productos", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Ser Socio", comprarOutro: "¿Comprar otro?",
    errNome: "Ingresa nombre y apellido", errEmail: "Email inválido", errEmail2: "Los emails no coinciden", errTel: "Número inválido",
    semJuros: "12 cuotas sin interés · ",
    filtrosAltaPerformance: "Filtros de Alto Rendimiento", tabelaBeneficios: "Tabla de Beneficios",
    garantiaTitulo: "Garantía del Purificador", garantiaDesc: "1 año de garantía de fábrica contra defectos de fabricación. Soporte técnico especializado incluido.",
    filtroVidaTitulo: "Vida útil de los Filtros", filtroVidaDesc: "Filtros con duración de 12 meses o según indicación del sistema de monitoreo de la APP.",
    freteGratis: "Envío gratis", digitarCep: "Ingresa tu código postal para ver la ubicación de entrega",
    mapaEntrega: "Mapa de entrega", filtrosBanner: "Filtros de Alto Rendimiento", imagemBanner: "Imagen del banner de filtros",
    imagemAnterior: "Imagen anterior", proximaImagem: "Imagen siguiente",
    termosModalTitulo: "Términos de Uso", termosIframe: "Términos de Uso",
    adicionadoCarrinho: "¡Añadido al carrito!", totalLabel: "Total",
    buscarPais: "Buscar país...", cepNaoEncontrado: "Código postal no encontrado.", erroCep: "Error al consultar el código postal. Inténtalo de nuevo.",
  },
  fr: {
    formato: "Format", filtragem: "Système de Filtration", temperaturas: "Températures",
    gasLabel: "Eau Pétillante", h2Label: "Eau Hydrogénée",
    painel: "Panneau", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Réservoir", material: "Matériau", computador: "Ordinateur",
    fichaTecnica: "FICHE TECHNIQUE", demaisFuncionalidades: "Plus de fonctionnalités", ocultarFuncionalidades: "Masquer les fonctionnalités",
    garantias: "Garanties", detalhesContaTitle: "Détails du compte",
    navProduto: "Produit", navCores: "Couleurs", navFiltros: "Filtres", navGarantias: "Garantie", navCep: "Livraison", navConta: "Compte",
    nomeLabel: "Nom Complet", emailLabel: "Adresse Email", email2Label: "Confirmer l'adresse Email", telLabel: "Numéro de Téléphone",
    cepTitle: "Entrez votre code postal", calcular: "Calculer",
    consentText: "En continuant, j'autorise Acquafy à me contacter au sujet de cette demande et à m'envoyer des informations sur les produits et services. Je peux me désinscrire à tout moment.",
    liAceito: "J'ai lu et j'accepte les", termosDeUso: "Conditions d'utilisation",
    payCash: "Espèces", payFinanciar: "Financer", payRent: "Louer",
    finNote: "12x sans intérêt. Vérifiez les conditions au moment de l'achat.",
    freteNote: "Livraison gratuite pour les achats supérieurs à R$ 500,00. Livraison dans tout le Brésil.",
    coresLabel: "Couleurs", encomendar: "Commander",
    pedidoConfirmado: "Ajouté au panier !", precisaMaisAlgo: "Besoin d'autre chose ?",
    compareProdutos: "Comparer les produits", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Devenir Partenaire", comprarOutro: "Acheter un autre ?",
    errNome: "Veuillez indiquer nom et prénom", errEmail: "Email invalide", errEmail2: "Les emails ne correspondent pas", errTel: "Numéro invalide",
    semJuros: "12x sans intérêt · ",
    filtrosAltaPerformance: "Filtres Haute Performance", tabelaBeneficios: "Tableau des Avantages",
    garantiaTitulo: "Garantie du Purificateur", garantiaDesc: "1 an de garantie fabricant contre les défauts de fabrication. Support technique spécialisé inclus.",
    filtroVidaTitulo: "Durée de vie des Filtres", filtroVidaDesc: "Filtres d'une durée de 12 mois ou selon l'indication du système de surveillance de l'APP.",
    freteGratis: "Livraison gratuite", digitarCep: "Entrez votre code postal pour voir le lieu de livraison",
    mapaEntrega: "Carte de livraison", filtrosBanner: "Filtres Haute Performance", imagemBanner: "Image de la bannière de filtres",
    imagemAnterior: "Image précédente", proximaImagem: "Image suivante",
    termosModalTitulo: "Conditions d'utilisation", termosIframe: "Conditions d'utilisation",
    adicionadoCarrinho: "Ajouté au panier !", totalLabel: "Total",
    buscarPais: "Rechercher un pays...", cepNaoEncontrado: "Code postal introuvable.", erroCep: "Erreur lors de la consultation du code postal. Réessayez.",
  },
  de: {
    formato: "Format", filtragem: "Filtersystem", temperaturas: "Temperaturen",
    gasLabel: "Sprudelwasser", h2Label: "Wasserstoffwasser",
    painel: "Bedienfeld", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Tank", material: "Material", computador: "Computer",
    fichaTecnica: "TECHNISCHE DATEN", demaisFuncionalidades: "Weitere Funktionen", ocultarFuncionalidades: "Funktionen ausblenden",
    garantias: "Garantien", detalhesContaTitle: "Kontodetails",
    navProduto: "Produkt", navCores: "Farben", navFiltros: "Filter", navGarantias: "Garantie", navCep: "Lieferung", navConta: "Konto",
    nomeLabel: "Vollständiger Name", emailLabel: "E-Mail-Adresse", email2Label: "E-Mail-Adresse bestätigen", telLabel: "Telefonnummer",
    cepTitle: "Postleitzahl eingeben", calcular: "Berechnen",
    consentText: "Durch Fortfahren erteile ich Acquafy die Erlaubnis, mich bezüglich dieser Anfrage zu kontaktieren und mir Informationen über Produkte und Dienstleistungen zu senden. Ich kann mich jederzeit abmelden.",
    liAceito: "Ich habe die gelesen und akzeptiere die", termosDeUso: "Nutzungsbedingungen",
    payCash: "Bargeld", payFinanciar: "Finanzieren", payRent: "Mieten",
    finNote: "12x zinslos. Konditionen zum Zeitpunkt des Kaufs prüfen.",
    freteNote: "Kostenloser Versand ab R$ 500,00. Lieferung in ganz Brasilien.",
    coresLabel: "Farben", encomendar: "Jetzt bestellen",
    pedidoConfirmado: "Zum Warenkorb hinzugefügt!", precisaMaisAlgo: "Noch etwas benötigt?",
    compareProdutos: "Produkte vergleichen", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Partner werden", comprarOutro: "Noch eines kaufen?",
    errNome: "Bitte Vor- und Nachnamen angeben", errEmail: "Ungültige E-Mail", errEmail2: "E-Mails stimmen nicht überein", errTel: "Ungültige Nummer",
    semJuros: "12x zinslos · ",
    filtrosAltaPerformance: "Hochleistungsfilter", tabelaBeneficios: "Vorteile-Tabelle",
    garantiaTitulo: "Purifier-Garantie", garantiaDesc: "1 Jahr Herstellergarantie gegen Fertigungsfehler. Spezialisierter technischer Support inklusive.",
    filtroVidaTitulo: "Filterlebensdauer", filtroVidaDesc: "Filter mit einer Laufzeit von 12 Monaten oder gemäß Anzeige des APP-Überwachungssystems.",
    freteGratis: "Kostenloser Versand", digitarCep: "Postleitzahl eingeben, um den Lieferort zu sehen",
    mapaEntrega: "Lieferkarte", filtrosBanner: "Hochleistungsfilter", imagemBanner: "Filter-Bannerbild",
    imagemAnterior: "Vorheriges Bild", proximaImagem: "Nächstes Bild",
    termosModalTitulo: "Nutzungsbedingungen", termosIframe: "Nutzungsbedingungen",
    adicionadoCarrinho: "Zum Warenkorb hinzugefügt!", totalLabel: "Gesamt",
    buscarPais: "Land suchen...", cepNaoEncontrado: "Postleitzahl nicht gefunden.", erroCep: "Fehler bei der Postleitzahlenabfrage. Bitte erneut versuchen.",
  },
  it: {
    formato: "Formato", filtragem: "Sistema di Filtrazione", temperaturas: "Temperature",
    gasLabel: "Acqua Frizzante", h2Label: "Acqua all'Idrogeno",
    painel: "Pannello", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Serbatoio", material: "Materiale", computador: "Computer",
    fichaTecnica: "SCHEDA TECNICA", demaisFuncionalidades: "Altre funzionalità", ocultarFuncionalidades: "Nascondi funzionalità",
    garantias: "Garanzie", detalhesContaTitle: "Dettagli dell'account",
    navProduto: "Prodotto", navCores: "Colori", navFiltros: "Filtri", navGarantias: "Garanzia", navCep: "Consegna", navConta: "Account",
    nomeLabel: "Nome Completo", emailLabel: "Indirizzo Email", email2Label: "Conferma Indirizzo Email", telLabel: "Numero di Telefono",
    cepTitle: "Inserisci il tuo CAP", calcular: "Calcola",
    consentText: "Procedendo, autorizzo Acquafy a contattarmi in merito a questa richiesta e a inviarmi informazioni su prodotti e servizi. Posso annullare in qualsiasi momento.",
    liAceito: "Ho letto e accetto i", termosDeUso: "Termini di Utilizzo",
    payCash: "Contante", payFinanciar: "Finanziare", payRent: "Noleggiare",
    finNote: "12 rate senza interessi. Verifica le condizioni al momento dell'acquisto.",
    freteNote: "Spedizione gratuita per acquisti superiori a R$ 500,00. Consegna in tutto il Brasile.",
    coresLabel: "Colori", encomendar: "Ordina Ora",
    pedidoConfirmado: "Aggiunto al carrello!", precisaMaisAlgo: "Hai bisogno di altro?",
    compareProdutos: "Confronta prodotti", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Diventa Partner", comprarOutro: "Comprarne un altro?",
    errNome: "Inserisci nome e cognome", errEmail: "Email non valida", errEmail2: "Le email non coincidono", errTel: "Numero non valido",
    semJuros: "12 rate senza interessi · ",
    filtrosAltaPerformance: "Filtri ad Alta Prestazione", tabelaBeneficios: "Tabella dei Benefici",
    garantiaTitulo: "Garanzia del Purificatore", garantiaDesc: "1 anno di garanzia del produttore contro i difetti di fabbricazione. Supporto tecnico specializzato incluso.",
    filtroVidaTitulo: "Durata dei Filtri", filtroVidaDesc: "Filtri con durata di 12 mesi o secondo l'indicazione del sistema di monitoraggio dell'APP.",
    freteGratis: "Spedizione gratuita", digitarCep: "Inserisci il CAP per vedere la località di consegna",
    mapaEntrega: "Mappa di consegna", filtrosBanner: "Filtri ad Alta Prestazione", imagemBanner: "Immagine del banner filtri",
    imagemAnterior: "Immagine precedente", proximaImagem: "Immagine successiva",
    termosModalTitulo: "Termini di Utilizzo", termosIframe: "Termini di Utilizzo",
    adicionadoCarrinho: "Aggiunto al carrello!", totalLabel: "Totale",
    buscarPais: "Cerca paese...", cepNaoEncontrado: "CAP non trovato.", erroCep: "Errore durante la ricerca del CAP. Riprova.",
  },
  zh: {
    formato: "形式", filtragem: "过滤系统", temperaturas: "温度",
    gasLabel: "气泡水", h2Label: "富氢水",
    painel: "面板", app: "应用", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "水箱", material: "材质", computador: "电脑",
    fichaTecnica: "技术规格", demaisFuncionalidades: "更多功能", ocultarFuncionalidades: "隐藏功能",
    garantias: "保修", detalhesContaTitle: "账户详情",
    navProduto: "产品", navCores: "颜色", navFiltros: "过滤", navGarantias: "保修", navCep: "配送", navConta: "账户",
    nomeLabel: "全名", emailLabel: "电子邮箱", email2Label: "确认电子邮箱", telLabel: "电话号码",
    cepTitle: "请输入邮政编码", calcular: "计算",
    consentText: "继续操作即表示我授权Acquafy就本请求与我联系，并向我发送有关产品和服务的信息。我可随时取消。",
    liAceito: "我已阅读并接受", termosDeUso: "使用条款",
    payCash: "现金", payFinanciar: "分期", payRent: "租赁",
    finNote: "12期免息。请在购买时查询条件。",
    freteNote: "购买满R$ 500.00免运费。配送至巴西全境。",
    coresLabel: "颜色", encomendar: "立即下单",
    pedidoConfirmado: "已加入购物车！", precisaMaisAlgo: "还需要什么？",
    compareProdutos: "比较产品", acquafyMedia: "Acquafy Media", sejaUmParceiro: "成为合作伙伴", comprarOutro: "再买一件？",
    errNome: "请输入姓名", errEmail: "无效的邮箱", errEmail2: "邮箱不匹配", errTel: "无效的号码",
    semJuros: "12期免息 · ",
    filtrosAltaPerformance: "高性能过滤", tabelaBeneficios: "优势表",
    garantiaTitulo: "净水机保修", garantiaDesc: "1年原厂保修，涵盖制造缺陷。含专业技术支持。",
    filtroVidaTitulo: "滤芯寿命", filtroVidaDesc: "滤芯使用寿命12个月，或按APP监控系统指示更换。",
    freteGratis: "免费配送", digitarCep: "输入邮政编码查看配送地点",
    mapaEntrega: "配送地图", filtrosBanner: "高性能过滤", imagemBanner: "过滤器横幅图片",
    imagemAnterior: "上一张", proximaImagem: "下一张",
    termosModalTitulo: "使用条款", termosIframe: "使用条款",
    adicionadoCarrinho: "已加入购物车！", totalLabel: "合计",
    buscarPais: "搜索国家...", cepNaoEncontrado: "未找到邮政编码。", erroCep: "查询邮政编码出错，请重试。",
  },
  ja: {
    formato: "形式", filtragem: "浄水システム", temperaturas: "温度",
    gasLabel: "炭酸水", h2Label: "水素水",
    painel: "パネル", app: "アプリ", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "タンク", material: "素材", computador: "コンピューター",
    fichaTecnica: "技術仕様", demaisFuncionalidades: "その他の機能", ocultarFuncionalidades: "機能を非表示",
    garantias: "保証", detalhesContaTitle: "アカウントの詳細",
    navProduto: "製品", navCores: "カラー", navFiltros: "フィルター", navGarantias: "保証", navCep: "配送", navConta: "アカウント",
    nomeLabel: "氏名", emailLabel: "メールアドレス", email2Label: "メールアドレス確認", telLabel: "電話番号",
    cepTitle: "郵便番号を入力", calcular: "計算する",
    consentText: "続行することで、Acquafyがこのリクエストについて私に連絡し、製品・サービスに関する情報を送信することを許可します。いつでも解除できます。",
    liAceito: "利用規約を読み、同意します", termosDeUso: "利用規約",
    payCash: "現金", payFinanciar: "分割払い", payRent: "レンタル",
    finNote: "12回無利息。購入時に条件をご確認ください。",
    freteNote: "R$ 500.00以上の購入で送料無料。ブラジル全土配送。",
    coresLabel: "カラー", encomendar: "今すぐ注文",
    pedidoConfirmado: "カートに追加しました！", precisaMaisAlgo: "他にご要望はありますか？",
    compareProdutos: "製品を比較", acquafyMedia: "Acquafy Media", sejaUmParceiro: "パートナーになる", comprarOutro: "もう一台購入？",
    errNome: "姓名を入力してください", errEmail: "無効なメール", errEmail2: "メールが一致しません", errTel: "無効な番号",
    semJuros: "12回無利息 · ",
    filtrosAltaPerformance: "高性能フィルター", tabelaBeneficios: "メリット一覧",
    garantiaTitulo: "浄水器保証", garantiaDesc: "製造上の欠陥に対する1年間のメーカー保証。専門技術サポート付き。",
    filtroVidaTitulo: "フィルター寿命", filtroVidaDesc: "フィルターの寿命は12ヶ月、またはAPPモニタリングシステムの表示に従ってください。",
    freteGratis: "送料無料", digitarCep: "配送場所を確認するには郵便番号を入力してください",
    mapaEntrega: "配送マップ", filtrosBanner: "高性能フィルター", imagemBanner: "フィルターバナー画像",
    imagemAnterior: "前の画像", proximaImagem: "次の画像",
    termosModalTitulo: "利用規約", termosIframe: "利用規約",
    adicionadoCarrinho: "カートに追加しました！", totalLabel: "合計",
    buscarPais: "国を検索...", cepNaoEncontrado: "郵便番号が見つかりません。", erroCep: "郵便番号の照会中にエラーが発生しました。もう一度お試しください。",
  },
  ko: {
    formato: "형식", filtragem: "정수 시스템", temperaturas: "온도",
    gasLabel: "탄산수", h2Label: "수소수",
    painel: "패널", app: "앱", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "탱크", material: "소재", computador: "컴퓨터",
    fichaTecnica: "기술 사양", demaisFuncionalidades: "더 많은 기능", ocultarFuncionalidades: "기능 숨기기",
    garantias: "보증", detalhesContaTitle: "계정 세부 정보",
    navProduto: "제품", navCores: "색상", navFiltros: "필터", navGarantias: "보증", navCep: "배송", navConta: "계정",
    nomeLabel: "성명", emailLabel: "이메일 주소", email2Label: "이메일 주소 확인", telLabel: "전화번호",
    cepTitle: "우편번호를 입력하세요", calcular: "계산",
    consentText: "계속 진행하면 Acquafy가 이 요청에 대해 저에게 연락하고 제품 및 서비스 정보를 보내는 것을 허용합니다. 언제든지 취소할 수 있습니다.",
    liAceito: "읽고 동의합니다", termosDeUso: "이용 약관",
    payCash: "현금", payFinanciar: "할부", payRent: "렌탈",
    finNote: "12개월 무이자. 구매 시 조건을 확인하세요.",
    freteNote: "R$ 500.00 이상 구매 시 무료 배송. 브라질 전역 배송.",
    coresLabel: "색상", encomendar: "지금 주문",
    pedidoConfirmado: "장바구니에 추가되었습니다!", precisaMaisAlgo: "더 필요한 것이 있나요?",
    compareProdutos: "제품 비교", acquafyMedia: "Acquafy Media", sejaUmParceiro: "파트너 되기", comprarOutro: "다른 것 구매?",
    errNome: "성과 이름을 입력하세요", errEmail: "유효하지 않은 이메일", errEmail2: "이메일이 일치하지 않습니다", errTel: "유효하지 않은 번호",
    semJuros: "12개월 무이자 · ",
    filtrosAltaPerformance: "고성능 필터", tabelaBeneficios: "혜택 표",
    garantiaTitulo: "정수기 보증", garantiaDesc: "제조 결함에 대한 1년 제조사 보증. 전문 기술 지원 포함.",
    filtroVidaTitulo: "필터 수명", filtroVidaDesc: "필터 수명은 12개월 또는 APP 모니터링 시스템의 표시에 따릅니다.",
    freteGratis: "무료 배송", digitarCep: "배송 위치를 보려면 우편번호를 입력하세요",
    mapaEntrega: "배송 지도", filtrosBanner: "고성능 필터", imagemBanner: "필터 배너 이미지",
    imagemAnterior: "이전 이미지", proximaImagem: "다음 이미지",
    termosModalTitulo: "이용 약관", termosIframe: "이용 약관",
    adicionadoCarrinho: "장바구니에 추가되었습니다!", totalLabel: "합계",
    buscarPais: "국가 검색...", cepNaoEncontrado: "우편번호를 찾을 수 없습니다.", erroCep: "우편번호 조회 중 오류가 발생했습니다. 다시 시도해 주세요.",
  },
  sv: {
    formato: "Format", filtragem: "Filtreringssystem", temperaturas: "Temperaturer",
    gasLabel: "Kolsyrat Vatten", h2Label: "Vätgasvatten",
    painel: "Panel", app: "App", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Tank", material: "Material", computador: "Dator",
    fichaTecnica: "TEKNISKA SPECIFIKATIONER", demaisFuncionalidades: "Fler funktioner", ocultarFuncionalidades: "Dölj funktioner",
    garantias: "Garantier", detalhesContaTitle: "Kontodetaljer",
    navProduto: "Produkt", navCores: "Färger", navFiltros: "Filter", navGarantias: "Garanti", navCep: "Leverans", navConta: "Konto",
    nomeLabel: "Fullständigt Namn", emailLabel: "E-postadress", email2Label: "Bekräfta E-postadress", telLabel: "Telefonnummer",
    cepTitle: "Ange ditt postnummer", calcular: "Beräkna",
    consentText: "Genom att fortsätta ger jag Acquafy tillstånd att kontakta mig angående denna förfrågan och skicka information om produkter och tjänster. Jag kan avregistrera mig när som helst.",
    liAceito: "Jag har läst och accepterar", termosDeUso: "Användarvillkor",
    payCash: "Kontant", payFinanciar: "Finansiera", payRent: "Hyra",
    finNote: "12x räntefritt. Kontrollera villkoren vid köptillfället.",
    freteNote: "Gratis frakt vid köp över R$ 500,00. Leverans över hela Brasilien.",
    coresLabel: "Färger", encomendar: "Beställ Nu",
    pedidoConfirmado: "Tillagd i varukorgen!", precisaMaisAlgo: "Behöver du något annat?",
    compareProdutos: "Jämför produkter", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Bli Partner", comprarOutro: "Köp en till?",
    errNome: "Ange för- och efternamn", errEmail: "Ogiltig e-post", errEmail2: "E-postadresserna stämmer inte överens", errTel: "Ogiltigt nummer",
    semJuros: "12x räntefritt · ",
    filtrosAltaPerformance: "Högpresterande Filter", tabelaBeneficios: "Fördeltabell",
    garantiaTitulo: "Purificatorgaranti", garantiaDesc: "1 års fabriksgaranti mot tillverkningsfel. Specialiserad teknisk support inkluderad.",
    filtroVidaTitulo: "Filtrets livslängd", filtroVidaDesc: "Filter med en livslängd på 12 månader eller enligt APP-övervakningssystemets indikation.",
    freteGratis: "Gratis frakt", digitarCep: "Ange ditt postnummer för att se leveransplatsen",
    mapaEntrega: "Leveranskarta", filtrosBanner: "Högpresterande Filter", imagemBanner: "Filterbannerbild",
    imagemAnterior: "Föregående bild", proximaImagem: "Nästa bild",
    termosModalTitulo: "Användarvillkor", termosIframe: "Användarvillkor",
    adicionadoCarrinho: "Tillagd i varukorgen!", totalLabel: "Totalt",
    buscarPais: "Sök land...", cepNaoEncontrado: "Postnummer hittades inte.", erroCep: "Fel vid postnummersökning. Försök igen.",
  },
  fi: {
    formato: "Muoto", filtragem: "Suodatusjärjestelmä", temperaturas: "Lämpötilat",
    gasLabel: "Hiilihapotettu Vesi", h2Label: "Vetyvesi",
    painel: "Paneeli", app: "Sovellus", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Säiliö", material: "Materiaali", computador: "Tietokone",
    fichaTecnica: "TEKNISET TIEDOT", demaisFuncionalidades: "Lisää ominaisuuksia", ocultarFuncionalidades: "Piilota ominaisuudet",
    garantias: "Takuut", detalhesContaTitle: "Tilin tiedot",
    navProduto: "Tuote", navCores: "Värit", navFiltros: "Suodattimet", navGarantias: "Takuu", navCep: "Toimitus", navConta: "Tili",
    nomeLabel: "Koko Nimi", emailLabel: "Sähköpostiosoite", email2Label: "Vahvista Sähköpostiosoite", telLabel: "Puhelinnumero",
    cepTitle: "Anna postinumerosi", calcular: "Laske",
    consentText: "Jatkamalla valtuutan Acquafyn ottamaan minuun yhteyttä tästä pyynnöstä ja lähettämään tietoja tuotteista ja palveluista. Voin peruuttaa milloin tahansa.",
    liAceito: "Olen lukenut ja hyväksyn", termosDeUso: "Käyttöehdot",
    payCash: "Käteinen", payFinanciar: "Rahoittaa", payRent: "Vuokrata",
    finNote: "12x korotonta. Tarkista ehdot ostohetkellä.",
    freteNote: "Ilmainen toimitus yli R$ 500,00 ostoksille. Toimitus koko Brasiliaan.",
    coresLabel: "Värit", encomendar: "Tilaa Nyt",
    pedidoConfirmado: "Lisätty ostoskoriin!", precisaMaisAlgo: "Tarvitsetko muuta?",
    compareProdutos: "Vertaile tuotteita", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Tule kumppaniksi", comprarOutro: "Osta toinen?",
    errNome: "Anna etu- ja sukunimi", errEmail: "Virheellinen sähköposti", errEmail2: "Sähköpostit eivät täsmää", errTel: "Virheellinen numero",
    semJuros: "12x korotonta · ",
    filtrosAltaPerformance: "Suorituskykyiset Suodattimet", tabelaBeneficios: "Etujen taulukko",
    garantiaTitulo: "Puhdistajan takuu", garantiaDesc: "1 vuoden valmistajatakuu valmistusvirheitä vastaan. Erikoistunut tekninen tuki mukana.",
    filtroVidaTitulo: "Suodattimien käyttöikä", filtroVidaDesc: "Suodattimet kestävät 12 kuukautta tai sovelluksen seurantajärjestelmän ilmoituksen mukaan.",
    freteGratis: "Ilmainen toimitus", digitarCep: "Anna postinumero toimituspaikan näkemiseksi",
    mapaEntrega: "Toimituskartta", filtrosBanner: "Suorituskykyiset Suodattimet", imagemBanner: "Suodatinbannerin kuva",
    imagemAnterior: "Edellinen kuva", proximaImagem: "Seuraava kuva",
    termosModalTitulo: "Käyttöehdot", termosIframe: "Käyttöehdot",
    adicionadoCarrinho: "Lisätty ostoskoriin!", totalLabel: "Yhteensä",
    buscarPais: "Etsi maata...", cepNaoEncontrado: "Postinumeroa ei löydy.", erroCep: "Virhe postinumeron haussa. Yritä uudelleen.",
  },
  ru: {
    formato: "Формат", filtragem: "Система фильтрации", temperaturas: "Температуры",
    gasLabel: "Газированная вода", h2Label: "Водородная вода",
    painel: "Панель", app: "Приложение", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Бак", material: "Материал", computador: "Компьютер",
    fichaTecnica: "ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ", demaisFuncionalidades: "Больше функций", ocultarFuncionalidades: "Скрыть функции",
    garantias: "Гарантии", detalhesContaTitle: "Данные аккаунта",
    navProduto: "Продукт", navCores: "Цвета", navFiltros: "Фильтры", navGarantias: "Гарантия", navCep: "Доставка", navConta: "Аккаунт",
    nomeLabel: "Полное имя", emailLabel: "Адрес электронной почты", email2Label: "Подтвердите Email", telLabel: "Номер телефона",
    cepTitle: "Введите почтовый индекс", calcular: "Рассчитать",
    consentText: "Продолжая, я разрешаю Acquafy связаться со мной по данному запросу и направлять мне информацию о продуктах и услугах. Я могу отписаться в любое время.",
    liAceito: "Я прочитал и принимаю", termosDeUso: "Условия использования",
    payCash: "Наличные", payFinanciar: "Финансирование", payRent: "Аренда",
    finNote: "12x без процентов. Уточните условия при покупке.",
    freteNote: "Бесплатная доставка при покупке от R$ 500,00. Доставка по всей Бразилии.",
    coresLabel: "Цвета", encomendar: "Заказать сейчас",
    pedidoConfirmado: "Добавлено в корзину!", precisaMaisAlgo: "Нужно ещё что-нибудь?",
    compareProdutos: "Сравнить товары", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Стать партнёром", comprarOutro: "Купить ещё?",
    errNome: "Введите имя и фамилию", errEmail: "Неверный email", errEmail2: "Email-адреса не совпадают", errTel: "Неверный номер",
    semJuros: "12x без процентов · ",
    filtrosAltaPerformance: "Высокоэффективные фильтры", tabelaBeneficios: "Таблица преимуществ",
    garantiaTitulo: "Гарантия на очиститель", garantiaDesc: "1 год заводской гарантии против производственных дефектов. Специализированная техническая поддержка включена.",
    filtroVidaTitulo: "Срок службы фильтров", filtroVidaDesc: "Фильтры со сроком службы 12 месяцев или согласно указанию системы мониторинга APP.",
    freteGratis: "Бесплатная доставка", digitarCep: "Введите индекс для просмотра места доставки",
    mapaEntrega: "Карта доставки", filtrosBanner: "Высокоэффективные фильтры", imagemBanner: "Изображение баннера фильтров",
    imagemAnterior: "Предыдущее изображение", proximaImagem: "Следующее изображение",
    termosModalTitulo: "Условия использования", termosIframe: "Условия использования",
    adicionadoCarrinho: "Добавлено в корзину!", totalLabel: "Итого",
    buscarPais: "Поиск страны...", cepNaoEncontrado: "Индекс не найден.", erroCep: "Ошибка при запросе индекса. Повторите попытку.",
  },
  ro: {
    formato: "Format", filtragem: "Sistem de Filtrare", temperaturas: "Temperaturi",
    gasLabel: "Apa Carbogazoasa", h2Label: "Apa cu Hidrogen",
    painel: "Panou", app: "Aplicatie", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "Rezervor", material: "Material", computador: "Calculator",
    fichaTecnica: "FISA TEHNICA", demaisFuncionalidades: "Mai multe functii", ocultarFuncionalidades: "Ascunde functii",
    garantias: "Garantii", detalhesContaTitle: "Detalii cont",
    navProduto: "Produs", navCores: "Culori", navFiltros: "Filtre", navGarantias: "Garantie", navCep: "Livrare", navConta: "Cont",
    nomeLabel: "Nume Complet", emailLabel: "Adresa de Email", email2Label: "Confirma Adresa de Email", telLabel: "Numar de Telefon",
    cepTitle: "Adauga codul postal", calcular: "Calculeaza",
    consentText: "Continuand, autorizez Acquafy sa ma contacteze cu privire la aceasta solicitare si sa imi trimita informatii despre produse si servicii. Pot anula oricand.",
    liAceito: "Am citit si accept", termosDeUso: "Termenii de Utilizare",
    payCash: "Numerar", payFinanciar: "Finantare", payRent: "Inchiriere",
    finNote: "12 rate fara dobanda. Verificati conditiile la momentul achizitiei.",
    freteNote: "Transport gratuit pentru achizitii peste R$ 500,00. Livrare in toata Brazilia.",
    coresLabel: "Culori", encomendar: "Comanda Acum",
    pedidoConfirmado: "Adaugat in cos!", precisaMaisAlgo: "Mai aveti nevoie de ceva?",
    compareProdutos: "Compara produse", acquafyMedia: "Acquafy Media", sejaUmParceiro: "Devino Partener", comprarOutro: "Cumpara altul?",
    errNome: "Introduceti numele si prenumele", errEmail: "Email invalid", errEmail2: "Emailurile nu coincid", errTel: "Numar invalid",
    semJuros: "12 rate fara dobanda · ",
    filtrosAltaPerformance: "Filtre de Inalta Performanta", tabelaBeneficios: "Tabel de Beneficii",
    garantiaTitulo: "Garantia Purificatorului", garantiaDesc: "1 an garantie de fabrica impotriva defectelor de fabricatie. Suport tehnic specializat inclus.",
    filtroVidaTitulo: "Durata de viata a Filtrelor", filtroVidaDesc: "Filtre cu durata de 12 luni sau conform indicatiei sistemului de monitorizare al aplicatiei.",
    freteGratis: "Transport gratuit", digitarCep: "Introduceti codul postal pentru a vedea locatia de livrare",
    mapaEntrega: "Harta de livrare", filtrosBanner: "Filtre de Inalta Performanta", imagemBanner: "Imaginea bannerului filtre",
    imagemAnterior: "Imaginea anterioara", proximaImagem: "Imaginea urmatoare",
    termosModalTitulo: "Termenii de Utilizare", termosIframe: "Termenii de Utilizare",
    adicionadoCarrinho: "Adaugat in cos!", totalLabel: "Total",
    buscarPais: "Cautare tara...", cepNaoEncontrado: "Codul postal nu a fost gasit.", erroCep: "Eroare la interogarea codului postal. Incercati din nou.",
  },
  he: {
    formato: "פורמט", filtragem: "מערכת סינון", temperaturas: "טמפרטורות",
    gasLabel: "מים מוגזים", h2Label: "מים עם מימן",
    painel: "לוח", app: "אפליקציה", aiIot: "AI + IoT", wifi: "Wi-Fi + Bluetooth 5.3",
    tanque: "מיכל", material: "חומר", computador: "מחשב",
    fichaTecnica: "מפרט טכני", demaisFuncionalidades: "עוד תכונות", ocultarFuncionalidades: "הסתר תכונות",
    garantias: "אחריות", detalhesContaTitle: "פרטי החשבון",
    navProduto: "מוצר", navCores: "צבעים", navFiltros: "מסננים", navGarantias: "אחריות", navCep: "משלוח", navConta: "חשבון",
    nomeLabel: "שם מלא", emailLabel: "כתובת אימייל", email2Label: "אשר כתובת אימייל", telLabel: "מספר טלפון",
    cepTitle: "הוסף את המיקוד שלך", calcular: "חשב",
    consentText: "בהמשך, אני מאשר לAcquafy ליצור איתי קשר בנוגע לבקשה זו ולשלוח לי מידע על מוצרים ושירותים. אני יכול לבטל בכל עת.",
    liAceito: "קראתי ומסכים ל", termosDeUso: "תנאי שימוש",
    payCash: "מזומן", payFinanciar: "מימון", payRent: "השכרה",
    finNote: "12 תשלומים ללא ריבית. בדוק תנאים בעת הרכישה.",
    freteNote: "משלוח חינם לרכישות מעל R$ 500.00. משלוח לכל ברזיל.",
    coresLabel: "צבעים", encomendar: "הזמן עכשיו",
    pedidoConfirmado: "נוסף לעגלה!", precisaMaisAlgo: "צריך עוד משהו?",
    compareProdutos: "השווה מוצרים", acquafyMedia: "Acquafy Media", sejaUmParceiro: "הפוך לשותף", comprarOutro: "לקנות עוד?",
    errNome: "נא להזין שם פרטי ושם משפחה", errEmail: "אימייל לא חוקי", errEmail2: "האימיילים אינם תואמים", errTel: "מספר לא חוקי",
    semJuros: "12 תשלומים ללא ריבית · ",
    filtrosAltaPerformance: "מסננים בעלי ביצועים גבוהים", tabelaBeneficios: "טבלת יתרונות",
    garantiaTitulo: "אחריות על המטהר", garantiaDesc: "אחריות יצרן לשנה אחת כנגד פגמי ייצור. תמיכה טכנית מקצועית כלולה.",
    filtroVidaTitulo: "אורך חיי המסנן", filtroVidaDesc: "מסננים בעלי אורך חיים של 12 חודשים או בהתאם לאינדיקציה של מערכת הניטור באפליקציה.",
    freteGratis: "משלוח חינם", digitarCep: "הזן מיקוד לצפייה במיקום המשלוח",
    mapaEntrega: "מפת משלוח", filtrosBanner: "מסננים בעלי ביצועים גבוהים", imagemBanner: "תמונת באנר מסננים",
    imagemAnterior: "תמונה קודמת", proximaImagem: "תמונה הבאה",
    termosModalTitulo: "תנאי שימוש", termosIframe: "תנאי שימוש",
    adicionadoCarrinho: "נוסף לעגלה!", totalLabel: "סה\"כ",
    buscarPais: "חפש מדינה...", cepNaoEncontrado: "מיקוד לא נמצא.", erroCep: "שגיאה בשאילתת המיקוד. נסה שוב.",
  },
};

const HAS_COMPRESSOR = new Set([
  "neo-ultra", "neo-ultra-spark", "neo-ultra-spark-h2",
  "neo-max", "neo-max-spark", "neo-max-spark-h2",
  "neo-infinity", "neo-infinity-spark", "neo-infinity-spark-h2",
  "neo-prestige", "neo-prestige-spark", "neo-prestige-spark-h2",
  "neo-prime", "neo-prime-spark", "neo-prime-spark-h2",
  "acquafy-media",
]);

const imgCheck    = "/figma-assets/icon-check-a.svg";
const imgNegative = "/figma-assets/icon-negative.svg";

/* ── Essentials color options (5 colors, same for all Essentials families) ── */
// Color swatches — images live on each variant (variant.slides[colorIdx][slideIdx])
// File convention: /images/checkin/[family-slug]/[variant-id]/[color-slug]/01.jpg … 10.jpg
// Positions: 0–6 = rotation views, 7–9 = detail close-ups
const ESSENTIALS_COLORS = [
  { gradient: "linear-gradient(133deg, #fcfcfb 8%, #dfe0db 89%)", name: "Pearl White", slug: "pearl-white" },
  { gradient: "linear-gradient(180deg, #626970, #2a3035)",         name: "Dark Gray",   slug: "dark-gray"   },
  { gradient: "linear-gradient(133deg, #cddedf 8%, #969ea3 89%)", name: "Silver Gray", slug: "silver-gray" },
  { gradient: "linear-gradient(133deg, #e7eff5 8%, #aec0cd 89%)", name: "Slate Blue",  slug: "slate-blue"  },
  { gradient: "linear-gradient(133deg, #ffffff 8%, #bac1c8 89%)", name: "Silver",      slug: "silver"      },
];

/* ── Filter data ───────────────────────────────────────────────────────────── */
type FilterInfo = { title: string; desc: string; img?: string };

const FILTER_IMGS: Record<"ppf"|"acf"|"uff"|"rof"|"aaf", string> = {
  ppf: "/images/filters/PPF.webp",
  acf: "/images/filters/ACF.webp",
  uff: "/images/filters/UFF.webp",
  rof: "/images/filters/ROF.webp",
  aaf: "/images/filters/AAF.webp",
};
type FilterSet  = {
  label: string;
  description: string;
  bullets: { bold: string; text: string }[];
  filters: FilterInfo[];
  props: { prop: string; result: string }[];
};

const FILTER_DATA: Record<Lang, {
  bullets: { bold: string; text: string }[];
  props: { prop: string; result: string }[];
  uf_label: string; uf_desc: string;
  ro_label: string; ro_desc: string;
  ppf: FilterInfo; acf: FilterInfo; uff: FilterInfo; rof: FilterInfo; aaf: FilterInfo;
}> = {
  pt: {
    bullets: [
      { bold: "Segurança Total:",       text: " Remoção de patógenos, metais e excesso de minerais inorgânicos (calcário)." },
      { bold: "Equilíbrio Metabólico:", text: " pH alcalino adaptado à fonte de entrada." },
      { bold: "Poder Antioxidante:",    text: " Água ionizada que auxilia na regeneração celular." },
    ],
    props: [
      { prop: "Purificação",     result: "20 Estágios: Retenção de vírus, bactérias e toxinas." },
      { prop: "Alcalinidade",    result: "pH > 9: Auxilia no equilíbrio ácido-base do corpo." },
      { prop: "Mineralização",   result: "Ca, Mg e K: Reposição de eletrólitos essenciais." },
      { prop: "Potencial Redox", result: "-100 a -200 mV: Ação antioxidante direta." },
    ],
    uf_label: "4 Filtros UF de Alta Performance",
    uf_desc:  "Com 4 elementos filtrantes e 20 estágios de purificação, este sistema elimina contaminantes críticos como bactérias, vírus, cloro, metais pesados e calcário.",
    ro_label: "4 Filtros RO / Osmose Reversa",
    ro_desc:  "Com Osmose Reversa de precisão e 4 elementos filtrantes, este sistema produz água com 99% de pureza, eliminando vírus, bactérias, cloro, metais pesados e compostos residuais.",
    ppf: { title: "PPF — Polipropileno",           desc: "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
    acf: { title: "ACF — Carvão Ativado Anti-Escala", desc: "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
    uff: { title: "UFF — Ultrafiltração",          desc: "Com microporos de ultraprecisão, remove organismos, substâncias macromoleculares, verme vermelho, vírus e bactérias." },
    rof: { title: "ROF — Osmose Reversa",          desc: "Sistema que produz água com 99% de pureza (livre de vírus e bactérias com até 0,5 microns), desenvolvido para atender pessoas que queiram ou necessitem do consumo de uma água extremamente pura." },
    aaf: { title: "AAF — Alcalino Antioxidante",   desc: "Ajusta a faixa de pH da água, torna a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogênio." },
  },
  "pt-pt": {
    bullets: [
      { bold: "Segurança Total:",       text: " Remoção de patógenos, metais e excesso de minerais inorgânicos (calcário)." },
      { bold: "Equilíbrio Metabólico:", text: " pH alcalino adaptado à fonte de entrada." },
      { bold: "Poder Antioxidante:",    text: " Água ionizada que auxilia na regeneração celular." },
    ],
    props: [
      { prop: "Purificação",     result: "20 Estágios: Retenção de vírus, bactérias e toxinas." },
      { prop: "Alcalinidade",    result: "pH > 9: Auxilia no equilíbrio ácido-base do corpo." },
      { prop: "Mineralização",   result: "Ca, Mg e K: Reposição de electrólitos essenciais." },
      { prop: "Potencial Redox", result: "-100 a -200 mV: Ação antioxidante direta." },
    ],
    uf_label: "4 Filtros UF de Alta Performance",
    uf_desc:  "Com 4 elementos filtrantes e 20 estágios de purificação, este sistema elimina contaminantes críticos como bactérias, vírus, cloro, metais pesados e calcário.",
    ro_label: "4 Filtros RO / Osmose Inversa",
    ro_desc:  "Com Osmose Inversa de precisão e 4 elementos filtrantes, este sistema produz água com 99% de pureza, eliminando vírus, bactérias, cloro, metais pesados e compostos residuais.",
    ppf: { title: "PPF — Polipropileno",           desc: "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água da torneira." },
    acf: { title: "ACF — Carvão Ativado Anti-Incrustante", desc: "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água da torneira." },
    uff: { title: "UFF — Ultrafiltração",          desc: "Com microporos de ultraprecisão, remove organismos, substâncias macromoleculares, verme vermelho, vírus e bactérias." },
    rof: { title: "ROF — Osmose Inversa",          desc: "Sistema que produz água com 99% de pureza (livre de vírus e bactérias com até 0,5 microns), desenvolvido para pessoas que pretendam ou necessitem de consumir uma água extremamente pura." },
    aaf: { title: "AAF — Alcalino Antioxidante",   desc: "Ajusta a gama de pH da água, tornando a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogénio." },
  },
  en: {
    bullets: [
      { bold: "Total Safety:",        text: " Removal of pathogens, metals and excess inorganic minerals (limescale)." },
      { bold: "Metabolic Balance:",   text: " Alkaline pH adapted to the inlet source." },
      { bold: "Antioxidant Power:",   text: " Ionised water that aids cellular regeneration." },
    ],
    props: [
      { prop: "Purification",    result: "20 Stages: Retention of viruses, bacteria and toxins." },
      { prop: "Alkalinity",      result: "pH > 9: Supports acid-base balance in the body." },
      { prop: "Mineralisation",  result: "Ca, Mg and K: Replenishment of essential electrolytes." },
      { prop: "Redox Potential", result: "-100 to -200 mV: Direct antioxidant action." },
    ],
    uf_label: "4 High-Performance UF Filters",
    uf_desc:  "With 4 filter elements and 20 purification stages, this system eliminates critical contaminants such as bacteria, viruses, chlorine, heavy metals and limescale.",
    ro_label: "4 RO / Reverse Osmosis Filters",
    ro_desc:  "With precision Reverse Osmosis and 4 filter elements, this system produces water with 99% purity, eliminating viruses, bacteria, chlorine, heavy metals and residual compounds.",
    ppf: { title: "PPF — Polypropylene",             desc: "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odours and flavours normally present in tap water." },
    acf: { title: "ACF — Anti-Scale Activated Carbon", desc: "Removes chlorine, chemical compounds, suspended particles, odours and flavours normally present in tap water." },
    uff: { title: "UFF — Ultrafiltration",           desc: "With ultra-precision micropores, removes organisms, macromolecular substances, red larvae, viruses and bacteria." },
    rof: { title: "ROF — Reverse Osmosis",           desc: "System that produces water with 99% purity (free from viruses and bacteria up to 0.5 microns), designed for those who want or need to consume extremely pure water." },
    aaf: { title: "AAF — Alkaline Antioxidant",      desc: "Adjusts the water pH range, makes filtered water alkaline with pH above 9, antioxidant and hydrogen-rich." },
  },
  "en-gb": {
    bullets: [
      { bold: "Total Safety:",        text: " Removal of pathogens, metals and excess inorganic minerals (limescale)." },
      { bold: "Metabolic Balance:",   text: " Alkaline pH adapted to the inlet source." },
      { bold: "Antioxidant Power:",   text: " Ionized water that aids cellular regeneration." },
    ],
    props: [
      { prop: "Purification",    result: "20 Stages: Retention of viruses, bacteria and toxins." },
      { prop: "Alkalinity",      result: "pH > 9: Supports acid-base balance in the body." },
      { prop: "Mineralization",  result: "Ca, Mg and K: Replenishment of essential electrolytes." },
      { prop: "Redox Potential", result: "-100 to -200 mV: Direct antioxidant action." },
    ],
    uf_label: "4 High-Performance UF Filters",
    uf_desc:  "With 4 filter elements and 20 purification stages, this system eliminates critical contaminants such as bacteria, viruses, chlorine, heavy metals and limescale.",
    ro_label: "4 RO / Reverse Osmosis Filters",
    ro_desc:  "With precision Reverse Osmosis and 4 filter elements, this system produces water with 99% purity, eliminating viruses, bacteria, chlorine, heavy metals and residual compounds.",
    ppf: { title: "PPF — Polypropylene",             desc: "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odors and flavors normally present in tap water." },
    acf: { title: "ACF — Anti-Scale Activated Carbon", desc: "Removes chlorine, chemical compounds, suspended particles, odors and flavors normally present in tap water." },
    uff: { title: "UFF — Ultrafiltration",           desc: "With ultra-precision micropores, removes organisms, macromolecular substances, red larvae, viruses and bacteria." },
    rof: { title: "ROF — Reverse Osmosis",           desc: "System that produces water with 99% purity (free from viruses and bacteria up to 0.5 microns), designed for those who want or need to consume extremely pure water." },
    aaf: { title: "AAF — Alkaline Antioxidant",      desc: "Adjusts the water pH range, makes filtered water alkaline with pH above 9, antioxidant and hydrogen-rich." },
  },
  es: {
    bullets: [
      { bold: "Seguridad Total:",        text: " Eliminación de patógenos, metales y exceso de minerales inorgánicos (cal)." },
      { bold: "Equilibrio Metabólico:",  text: " pH alcalino adaptado a la fuente de entrada." },
      { bold: "Poder Antioxidante:",     text: " Agua ionizada que ayuda en la regeneración celular." },
    ],
    props: [
      { prop: "Purificación",    result: "20 Etapas: Retención de virus, bacterias y toxinas." },
      { prop: "Alcalinidad",     result: "pH > 9: Ayuda en el equilibrio ácido-base del cuerpo." },
      { prop: "Mineralización",  result: "Ca, Mg y K: Reposición de electrolitos esenciales." },
      { prop: "Potencial Redox", result: "-100 a -200 mV: Acción antioxidante directa." },
    ],
    uf_label: "4 Filtros UF de Alto Rendimiento",
    uf_desc:  "Con 4 elementos filtrantes y 20 etapas de purificación, este sistema elimina contaminantes críticos como bacterias, virus, cloro, metales pesados y cal.",
    ro_label: "4 Filtros RO / Ósmosis Inversa",
    ro_desc:  "Con Ósmosis Inversa de precisión y 4 elementos filtrantes, este sistema produce agua con 99% de pureza, eliminando virus, bacterias, cloro, metales pesados y compuestos residuales.",
    ppf: { title: "PPF — Polipropileno",          desc: "Elimina yodo, suciedad, óxido, filtra impurezas, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo." },
    acf: { title: "ACF — Carbón Activado Antical", desc: "Elimina el cloro, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo." },
    uff: { title: "UFF — Ultrafiltración",         desc: "Con microporos de ultraprecisión, elimina organismos, sustancias macromoleculares, gusano rojo, virus y bacterias." },
    rof: { title: "ROF — Ósmosis Inversa",         desc: "Sistema que produce agua con 99% de pureza (libre de virus y bacterias de hasta 0,5 micras), desarrollado para personas que desean o necesitan consumir agua extremadamente pura." },
    aaf: { title: "AAF — Alcalino Antioxidante",   desc: "Ajusta el rango de pH del agua, hace que el agua filtrada sea alcalina con pH superior a 9, antioxidante y rica en hidrógeno." },
  },
  fr: {
    bullets: [
      { bold: "Sécurité Totale:",       text: " Élimination des pathogènes, métaux et excès de minéraux inorganiques (calcaire)." },
      { bold: "Équilibre Métabolique:", text: " pH alcalin adapté à la source d'entrée." },
      { bold: "Pouvoir Antioxydant:",   text: " Eau ionisée qui aide à la régénération cellulaire." },
    ],
    props: [
      { prop: "Purification",    result: "20 Étapes: Rétention des virus, bactéries et toxines." },
      { prop: "Alcalinité",      result: "pH > 9: Aide à l'équilibre acido-basique du corps." },
      { prop: "Minéralisation",  result: "Ca, Mg et K: Reconstitution des électrolytes essentiels." },
      { prop: "Potentiel Redox", result: "-100 à -200 mV: Action antioxydante directe." },
    ],
    uf_label: "4 Filtres UF Haute Performance",
    uf_desc:  "Avec 4 éléments filtrants et 20 étapes de purification, ce système élimine les contaminants critiques tels que bactéries, virus, chlore, métaux lourds et calcaire.",
    ro_label: "4 Filtres RO / Osmose Inverse",
    ro_desc:  "Avec l'Osmose Inverse de précision et 4 éléments filtrants, ce système produit de l'eau à 99% de pureté, éliminant virus, bactéries, chlore, métaux lourds et composés résiduels.",
    ppf: { title: "PPF — Polypropylène",            desc: "Élimine l'iode, la saleté, la rouille, filtre les impuretés, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présentes dans l'eau du robinet." },
    acf: { title: "ACF — Charbon Actif Antitartre",  desc: "Élimine le chlore, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présentes dans l'eau du robinet." },
    uff: { title: "UFF — Ultrafiltration",           desc: "Avec des micropores d'ultra-précision, élimine les organismes, les substances macromoléculaires, les vers rouges, les virus et les bactéries." },
    rof: { title: "ROF — Osmose Inverse",            desc: "Système qui produit de l'eau à 99% de pureté (exempte de virus et bactéries jusqu'à 0,5 microns), développé pour les personnes qui souhaitent ou ont besoin de consommer une eau extrêmement pure." },
    aaf: { title: "AAF — Alcalin Antioxydant",       desc: "Ajuste la plage de pH de l'eau, rend l'eau filtrée alcaline avec un pH supérieur à 9, antioxydante et riche en hydrogène." },
  },
  de: {
    bullets: [
      { bold: "Totale Sicherheit:",          text: " Entfernung von Pathogenen, Metallen und überschüssigen anorganischen Mineralien (Kalk)." },
      { bold: "Metabolisches Gleichgewicht:", text: " Alkalischer pH-Wert angepasst an die Eingangsquelle." },
      { bold: "Antioxidative Kraft:",         text: " Ionisiertes Wasser, das die Zellregeneration unterstützt." },
    ],
    props: [
      { prop: "Reinigung",       result: "20 Stufen: Rückhalt von Viren, Bakterien und Toxinen." },
      { prop: "Alkalität",       result: "pH > 9: Unterstützt das Säure-Basen-Gleichgewicht." },
      { prop: "Mineralisation",  result: "Ca, Mg und K: Auffüllung essenzieller Elektrolyte." },
      { prop: "Redoxpotenzial",  result: "-100 bis -200 mV: Direkte antioxidative Wirkung." },
    ],
    uf_label: "4 Hochleistungs-UF-Filter",
    uf_desc:  "Mit 4 Filterelementen und 20 Reinigungsstufen eliminiert dieses System kritische Schadstoffe wie Bakterien, Viren, Chlor, Schwermetalle und Kalk.",
    ro_label: "4 RO-Filter / Umkehrosmose",
    ro_desc:  "Mit Präzisions-Umkehrosmose und 4 Filterelementen produziert dieses System Wasser mit 99% Reinheit und eliminiert Viren, Bakterien, Chlor, Schwermetalle und Reststoffe.",
    ppf: { title: "PPF — Polypropylen",         desc: "Entfernt Jod, Schmutz, Rost, filtert Verunreinigungen, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmäcker, die normalerweise im Leitungswasser vorhanden sind." },
    acf: { title: "ACF — Antikalk-Aktivkohle",  desc: "Entfernt Chlor, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmäcker, die normalerweise im Leitungswasser vorhanden sind." },
    uff: { title: "UFF — Ultrafiltration",       desc: "Mit Ultrapräzisionsmikroporen entfernt es Organismen, makromolekulare Substanzen, Rotwürmer, Viren und Bakterien." },
    rof: { title: "ROF — Umkehrosmose",          desc: "System das Wasser mit 99% Reinheit erzeugt (frei von Viren und Bakterien bis zu 0,5 Mikron), entwickelt für Personen, die extrem reines Wasser konsumieren möchten oder müssen." },
    aaf: { title: "AAF — Alkalisch-Antioxidativ", desc: "Reguliert den pH-Bereich des Wassers, macht das gefilterte Wasser alkalisch mit einem pH-Wert über 9, antioxidativ und wasserstoffreich." },
  },
  it: {
    bullets: [
      { bold: "Sicurezza Totale:",     text: " Rimozione di patogeni, metalli e minerali inorganici in eccesso (calcare)." },
      { bold: "Equilibrio Metabolico:", text: " pH alcalino adattato alla fonte di ingresso." },
      { bold: "Potere Antiossidante:", text: " Acqua ionizzata che aiuta nella rigenerazione cellulare." },
    ],
    props: [
      { prop: "Purificazione",    result: "20 Fasi: Ritenzione di virus, batteri e tossine." },
      { prop: "Alcalinità",       result: "pH > 9: Supporto all'equilibrio acido-base del corpo." },
      { prop: "Mineralizzazione", result: "Ca, Mg e K: Ricostituzione degli elettroliti essenziali." },
      { prop: "Potenziale Redox", result: "-100 a -200 mV: Azione antiossidante diretta." },
    ],
    uf_label: "4 Filtri UF ad Alta Prestazione",
    uf_desc:  "Con 4 elementi filtranti e 20 fasi di purificazione, questo sistema elimina contaminanti critici come batteri, virus, cloro, metalli pesanti e calcare.",
    ro_label: "4 Filtri RO / Osmosi Inversa",
    ro_desc:  "Con Osmosi Inversa di precisione e 4 elementi filtranti, questo sistema produce acqua con purezza al 99%, eliminando virus, batteri, cloro, metalli pesanti e composti residui.",
    ppf: { title: "PPF — Polipropilene",            desc: "Rimuove iodio, sporco, ruggine, filtra impurità, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua di rubinetto." },
    acf: { title: "ACF — Carbone Attivo Anticalcare", desc: "Rimuove il cloro, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua di rubinetto." },
    uff: { title: "UFF — Ultrafiltrazione",          desc: "Con micropori di ultraprecisione, rimuove organismi, sostanze macromolecolari, verme rosso, virus e batteri." },
    rof: { title: "ROF — Osmosi Inversa",            desc: "Sistema che produce acqua con purezza al 99% (priva di virus e batteri fino a 0,5 micron), sviluppato per persone che desiderano o necessitano di consumare acqua estremamente pura." },
    aaf: { title: "AAF — Alcalino Antiossidante",    desc: "Regola il range di pH dell'acqua, rende l'acqua filtrata alcalina con pH superiore a 9, antiossidante e ricca di idrogeno." },
  },
  zh: {
    bullets: [
      { bold: "全面安全：", text: "去除病原体、金属和无机矿物质（水垢）的多余积累。" },
      { bold: "代谢平衡：", text: "根据进水水源调节碱性pH值。" },
      { bold: "抗氧化能力：", text: "电离水有助于细胞再生。" },
    ],
    props: [
      { prop: "净化",       result: "20级过滤：去除病毒、细菌和毒素。" },
      { prop: "碱性",       result: "pH > 9：辅助身体酸碱平衡。" },
      { prop: "矿化",       result: "Ca、Mg和K：补充必需电解质。" },
      { prop: "氧化还原电位", result: "-100至-200 mV：直接抗氧化作用。" },
    ],
    uf_label: "4个高性能超滤膜滤芯",
    uf_desc:  "配备4个滤芯和20级净化工艺，该系统可消除细菌、病毒、氯、重金属和水垢等关键污染物。",
    ro_label: "4个RO反渗透滤芯",
    ro_desc:  "采用精密反渗透技术和4个滤芯，该系统可生产99%纯度的水，消除病毒、细菌、氯、重金属和残留化合物。",
    ppf: { title: "PPF — 聚丙烯",     desc: "去除碘、污垢、铁锈，过滤水中通常含有的杂质、化学物质、悬浮颗粒、异味和异味。" },
    acf: { title: "ACF — 防水垢活性炭", desc: "去除氯气、化学物质、悬浮颗粒及水中通常含有的异味和味道。" },
    uff: { title: "UFF — 超滤膜",      desc: "采用超精密微孔，去除有机体、大分子物质、红虫、病毒和细菌。" },
    rof: { title: "ROF — 反渗透膜",    desc: "该系统生产99%纯度的水（去除0.5微米以下的病毒和细菌），专为希望或需要饮用极纯净水的人士设计。" },
    aaf: { title: "AAF — 碱性抗氧化",  desc: "调节水的pH范围，使过滤后的水pH值超过9，呈碱性、抗氧化且富含氢气。" },
  },
  ja: {
    bullets: [
      { bold: "完全な安全性：", text: "病原体、金属、無機ミネラル（石灰）の過剰分を除去。" },
      { bold: "代謝バランス：", text: "入水源に適したアルカリpH。" },
      { bold: "抗酸化力：",    text: "細胞再生を助けるイオン水。" },
    ],
    props: [
      { prop: "浄化",       result: "20段階：ウイルス、細菌、毒素の除去。" },
      { prop: "アルカリ性",  result: "pH > 9：体の酸塩基バランスをサポート。" },
      { prop: "ミネラル化",  result: "Ca、Mg、K：必須電解質の補給。" },
      { prop: "酸化還元電位", result: "-100〜-200 mV：直接的な抗酸化作用。" },
    ],
    uf_label: "4本の高性能UFフィルター",
    uf_desc:  "4つのフィルターエレメントと20段階の浄化プロセスにより、このシステムはバクテリア、ウイルス、塩素、重金属、スケールなどの重要な汚染物質を除去します。",
    ro_label: "4本のRO/逆浸透フィルター",
    ro_desc:  "精密逆浸透と4つのフィルターエレメントにより、このシステムは純度99%の水を生成し、ウイルス、バクテリア、塩素、重金属、残留物質を除去します。",
    ppf: { title: "PPF — ポリプロピレン",   desc: "水道水に通常含まれるヨウ素、汚れ、錆を除去し、不純物、化学物質、浮遊粒子、臭いや味をフィルタリングします。" },
    acf: { title: "ACF — 防スケール活性炭", desc: "水道水に通常含まれる塩素、化学物質、浮遊粒子、臭いや味を除去します。" },
    uff: { title: "UFF — 精密ろ過",         desc: "超精密マイクロポアで、微生物、高分子物質、赤虫、ウイルス、バクテリアを除去します。" },
    rof: { title: "ROF — 逆浸透",           desc: "純度99%の水を生成するシステム（0.5ミクロンまでのウイルスとバクテリアを除去）、極めて純粋な水を消費したいまたは必要とする人々のために開発されました。" },
    aaf: { title: "AAF — アルカリ抗酸化",   desc: "水のpH範囲を調整し、pH9以上のアルカリ性で抗酸化性が高く水素豊富な水を生成します。" },
  },
  ko: {
    bullets: [
      { bold: "완전한 안전성:", text: " 병원체, 금속 및 무기 미네랄(석회) 과잉 제거." },
      { bold: "대사 균형:",   text: " 입수원에 맞춘 알칼리 pH." },
      { bold: "항산화력:",    text: " 세포 재생을 돕는 이온수." },
    ],
    props: [
      { prop: "정수",       result: "20단계: 바이러스, 박테리아 및 독소 제거." },
      { prop: "알칼리성",    result: "pH > 9: 체내 산염기 균형 지원." },
      { prop: "광물화",     result: "Ca, Mg 및 K: 필수 전해질 보충." },
      { prop: "산화환원전위", result: "-100~-200 mV: 직접적인 항산화 작용." },
    ],
    uf_label: "4개의 고성능 UF 필터",
    uf_desc:  "4개의 필터 요소와 20단계 정수 공정으로 박테리아, 바이러스, 염소, 중금속, 석회 등 주요 오염 물질을 제거합니다.",
    ro_label: "4개의 RO 역삼투 필터",
    ro_desc:  "정밀 역삼투 기술과 4개의 필터 요소로 이 시스템은 순도 99%의 물을 생산하여 바이러스, 박테리아, 염소, 중금속 및 잔류 화합물을 제거합니다.",
    ppf: { title: "PPF — 폴리프로필렌",  desc: "수돗물에 일반적으로 존재하는 요오드, 먼지, 녹을 제거하고 불순물, 화학물질, 부유 입자, 냄새 및 이물질 맛을 걸러냅니다." },
    acf: { title: "ACF — 방스케일 활성탄", desc: "수돗물에 일반적으로 존재하는 염소, 화학물질, 부유 입자, 냄새 및 맛을 제거합니다." },
    uff: { title: "UFF — 한외여과",      desc: "초정밀 마이크로포어로 미생물, 고분자 물질, 붉은 유충, 바이러스 및 박테리아를 제거합니다." },
    rof: { title: "ROF — 역삼투",        desc: "순도 99%의 물을 생산하는 시스템(0.5마이크론까지의 바이러스 및 박테리아 제거)으로, 극도로 순수한 물을 마시고자 하거나 필요로 하는 사람들을 위해 개발되었습니다." },
    aaf: { title: "AAF — 알칼리 항산화",  desc: "물의 pH 범위를 조정하여 여과된 물을 pH 9 이상의 알칼리성, 항산화성, 수소 풍부한 물로 만듭니다." },
  },
  sv: {
    bullets: [
      { bold: "Total säkerhet:",   text: " Borttagning av patogener, metaller och överskott av oorganiska mineraler (kalk)." },
      { bold: "Metabolisk balans:", text: " Alkaliskt pH anpassat till inflödeskällan." },
      { bold: "Antioxidativ kraft:", text: " Joniserat vatten som hjälper till cellregenerering." },
    ],
    props: [
      { prop: "Rening",        result: "20 Stadier: Kvarhållning av virus, bakterier och toxiner." },
      { prop: "Alkalinitet",   result: "pH > 9: Stödjer syra-bas-balansen i kroppen." },
      { prop: "Mineralisering", result: "Ca, Mg och K: Återuppbyggnad av essentiella elektrolyter." },
      { prop: "Redoxpotential", result: "-100 till -200 mV: Direkt antioxidativ verkan." },
    ],
    uf_label: "4 Högpresterande UF-filter",
    uf_desc:  "Med 4 filterelement och 20 reningssteg eliminerar detta system kritiska föroreningar såsom bakterier, virus, klor, tunga metaller och kalk.",
    ro_label: "4 RO-filter / Omvänd Osmos",
    ro_desc:  "Med precision Omvänd Osmos och 4 filterelement producerar detta system vatten med 99% renhet och eliminerar virus, bakterier, klor, tunga metaller och restföreningar.",
    ppf: { title: "PPF — Polypropylen",       desc: "Tar bort jod, smuts, rost, filtrerar orenheter, kemiska föreningar, suspenderade partiklar, lukter och smaker som normalt finns i kranvatten." },
    acf: { title: "ACF — Antikalk-Aktivt kol", desc: "Tar bort klor, kemiska föreningar, suspenderade partiklar, lukter och smaker som normalt finns i kranvatten." },
    uff: { title: "UFF — Ultrafiltrering",     desc: "Med ultraprecisionsmikroporer tar den bort organismer, makromolekylära substanser, rödmask, virus och bakterier." },
    rof: { title: "ROF — Omvänd Osmos",       desc: "System som producerar vatten med 99% renhet (fritt från virus och bakterier upp till 0,5 mikron), utvecklat för personer som vill eller behöver konsumera extremt rent vatten." },
    aaf: { title: "AAF — Alkaliskt Antioxidant", desc: "Justerar vattnets pH-område, gör det filtrerade vattnet alkaliskt med pH över 9, antioxidant och väterik." },
  },
  fi: {
    bullets: [
      { bold: "Täydellinen turvallisuus:", text: " Taudinaiheuttajien, metallien ja epäorgaanisten mineraalien (kalkkisaostumat) ylimäärän poisto." },
      { bold: "Aineenvaihdunnan tasapaino:", text: " Alkaalinen pH sopeutettuna tuloveden lähteeseen." },
      { bold: "Antioksidanttinen voima:",  text: " Ionisoitu vesi, joka tukee solujen uusiutumista." },
    ],
    props: [
      { prop: "Puhdistus",       result: "20 Vaihetta: Virusten, bakteerien ja myrkkyjen pidättäminen." },
      { prop: "Alkalisuus",      result: "pH > 9: Tukee kehon happo-emästasapainoa." },
      { prop: "Mineralisointi",  result: "Ca, Mg ja K: Olennaisten elektrolyyttien täydentäminen." },
      { prop: "Redokspotentiaali", result: "-100 - -200 mV: Suora antioksidanttivaikutus." },
    ],
    uf_label: "4 Korkeatehoista UF-suodatinta",
    uf_desc:  "Neljällä suodatinelementillä ja 20 puhdistusasteella tämä järjestelmä poistaa kriittiset epäpuhtaudet, kuten bakteerit, virukset, kloorin, raskasmetallit ja kalkkisaostumat.",
    ro_label: "4 RO-suodatinta / Käänteisosmoosi",
    ro_desc:  "Tarkkuuskäänteisosmoosilla ja 4 suodatinelementillä tämä järjestelmä tuottaa 99% puhdasta vettä poistamalla virukset, bakteerit, kloorin, raskasmetallit ja jäämäaineet.",
    ppf: { title: "PPF — Polypropeeni",           desc: "Poistaa jodin, lian, ruosteen, suodattaa epäpuhtaudet, kemialliset yhdisteet, suspendoituneet hiukkaset, hajut ja maut, joita yleensä esiintyy hanavedessä." },
    acf: { title: "ACF — Antikalkkiaktiivihiili",  desc: "Poistaa kloorin, kemialliset yhdisteet, suspendoituneet hiukkaset, hajut ja maut, joita yleensä esiintyy hanavedessä." },
    uff: { title: "UFF — Ultrasuodatus",           desc: "Ultratarkkuusmikrohuokosilla poistaa organismeja, makromolekulaarisia aineita, punaisia toukkia, viruksia ja bakteereita." },
    rof: { title: "ROF — Käänteisosmoosi",         desc: "Järjestelmä, joka tuottaa 99% puhdasta vettä (vapaata viruksista ja bakteereista 0,5 mikronia asti), kehitetty henkilöille, jotka haluavat tai tarvitsevat kuluttaa äärimmäisen puhdasta vettä." },
    aaf: { title: "AAF — Alkaalinen antioksidantti", desc: "Säätää veden pH-aluetta, tekee suodatetusta vedestä emäksisen, jonka pH on yli 9, antioksidanttisen ja vedyllä rikkaan." },
  },
  ru: {
    bullets: [
      { bold: "Полная безопасность:",    text: " Удаление патогенов, металлов и избытка неорганических минералов (накипи)." },
      { bold: "Метаболический баланс:",  text: " Щелочной pH, адаптированный к источнику входящей воды." },
      { bold: "Антиоксидантная сила:",   text: " Ионизированная вода, способствующая регенерации клеток." },
    ],
    props: [
      { prop: "Очистка",           result: "20 Ступеней: Задержка вирусов, бактерий и токсинов." },
      { prop: "Щелочность",        result: "pH > 9: Поддержание кислотно-щелочного баланса." },
      { prop: "Минерализация",     result: "Ca, Mg и K: Восполнение необходимых электролитов." },
      { prop: "Редокс-потенциал",  result: "-100 до -200 мВ: Прямое антиоксидантное действие." },
    ],
    uf_label: "4 Высокопроизводительных UF-фильтра",
    uf_desc:  "Благодаря 4 фильтрующим элементам и 20 ступеням очистки эта система устраняет критические загрязнители, такие как бактерии, вирусы, хлор, тяжёлые металлы и накипь.",
    ro_label: "4 RO-фильтра / Обратный осмос",
    ro_desc:  "С прецизионным обратным осмосом и 4 фильтрующими элементами эта система производит воду с 99% чистотой, устраняя вирусы, бактерии, хлор, тяжёлые металлы и остаточные соединения.",
    ppf: { title: "PPF — Полипропилен",                    desc: "Удаляет йод, грязь, ржавчину, фильтрует примеси, химические соединения, взвешенные частицы, запахи и привкусы, обычно присутствующие в водопроводной воде." },
    acf: { title: "ACF — Противонакипной активированный уголь", desc: "Удаляет хлор, химические соединения, взвешенные частицы, запахи и привкусы, обычно присутствующие в водопроводной воде." },
    uff: { title: "UFF — Ультрафильтрация",                desc: "С ультраточными микропорами удаляет организмы, макромолекулярные вещества, красных червей, вирусы и бактерии." },
    rof: { title: "ROF — Обратный осмос",                  desc: "Система, производящая воду с 99% чистотой (свободную от вирусов и бактерий размером до 0,5 мкм), разработанная для тех, кто хочет или нуждается в потреблении исключительно чистой воды." },
    aaf: { title: "AAF — Щелочной антиоксидантный",        desc: "Регулирует диапазон pH воды, делает фильтрованную воду щелочной с pH выше 9, антиоксидантной и богатой водородом." },
  },
  ro: {
    bullets: [
      { bold: "Siguranta Totala:",    text: " Eliminarea agentilor patogeni, metalelor si excesului de minerale anorganice (calcar)." },
      { bold: "Echilibru Metabolic:", text: " pH alcalin adaptat sursei de intrare." },
      { bold: "Putere Antioxidanta:", text: " Apa ionizata care ajuta la regenerarea celulara." },
    ],
    props: [
      { prop: "Purificare",     result: "20 Etape: Retinerea virusurilor, bacteriilor si toxinelor." },
      { prop: "Alcalinitate",   result: "pH > 9: Ajuta la echilibrul acido-bazic al corpului." },
      { prop: "Mineralizare",   result: "Ca, Mg si K: Refacerea electrolitilor esentiali." },
      { prop: "Potential Redox", result: "-100 la -200 mV: Actiune antioxidanta directa." },
    ],
    uf_label: "4 Filtre UF de Inalta Performanta",
    uf_desc:  "Cu 4 elemente filtrante si 20 de etape de purificare, acest sistem elimina contaminantii critici precum bacterii, virusuri, clor, metale grele si calcar.",
    ro_label: "4 Filtre RO / Osmoza Inversa",
    ro_desc:  "Cu Osmoza Inversa de precizie si 4 elemente filtrante, acest sistem produce apa cu 99% puritate, eliminand virusuri, bacterii, clor, metale grele si compusi reziduali.",
    ppf: { title: "PPF — Polipropilena",          desc: "Elimina iodul, murdaria, rugina, filtreaza impuritatile, compusii chimici, particulele in suspensie, mirosurile si gusturile prezente de obicei in apa de la robinet." },
    acf: { title: "ACF — Carbune Activ Anticacar", desc: "Elimina clorul, compusii chimici, particulele in suspensie, mirosurile si gusturile prezente de obicei in apa de la robinet." },
    uff: { title: "UFF — Ultrafiltrare",           desc: "Cu micropori de ultraprecizie, elimina organisme, substante macromoleculare, vierme rosu, virusuri si bacterii." },
    rof: { title: "ROF — Osmoza Inversa",          desc: "Sistem care produce apa cu 99% puritate (lipsita de virusuri si bacterii de pana la 0,5 microni), dezvoltat pentru persoanele care doresc sau au nevoie sa consume apa extrem de pura." },
    aaf: { title: "AAF — Alcalin Antioxidant",     desc: "Ajusteaza intervalul de pH al apei, face apa filtrata alcalina cu pH peste 9, antioxidanta si bogata in hidrogen." },
  },
  he: {
    bullets: [
      { bold: "בטיחות מוחלטת:",      text: " הסרת פתוגנים, מתכות ועודף מינרלים אנאורגניים (אבנית)." },
      { bold: "איזון מטבולי:",       text: " pH אלקלי מותאם למקור הכניסה." },
      { bold: "כוח אנטיאוקסידנטי:", text: " מים מיונים המסייעים בהתחדשות התאים." },
    ],
    props: [
      { prop: "טיהור",              result: "20 שלבים: עצירת וירוסים, חיידקים ורעלים." },
      { prop: "אלקליניות",          result: "pH > 9: תומך באיזון חומצה-בסיס בגוף." },
      { prop: "מינרליזציה",         result: "Ca, Mg ו-K: חידוש אלקטרוליטים חיוניים." },
      { prop: "פוטנציאל חמצון-חיזור", result: "-100 עד -200 mV: פעולה אנטיאוקסידנטית ישירה." },
    ],
    uf_label: "4 מסנני UF בעלי ביצועים גבוהים",
    uf_desc:  "עם 4 אלמנטים מסננים ו-20 שלבי טיהור, מערכת זו מסלקת מזהמים קריטיים כגון חיידקים, וירוסים, כלור, מתכות כבדות ואבנית.",
    ro_label: "4 מסנני RO / אוסמוזה הפוכה",
    ro_desc:  "עם אוסמוזה הפוכה בדיוק גבוה ו-4 אלמנטים מסננים, מערכת זו מייצרת מים ב-99% טוהר, ומסלקת וירוסים, חיידקים, כלור, מתכות כבדות ותרכובות שיוריות.",
    ppf: { title: "PPF — פוליפרופילן",       desc: "מסיר יוד, לכלוך, חלודה, מסנן זיהומים, תרכובות כימיות, חלקיקים מרחפים, ריחות וטעמים שנמצאים בדרך כלל במי ברז." },
    acf: { title: "ACF — פחם פעיל נגד אבנית", desc: "מסיר כלור, תרכובות כימיות, חלקיקים מרחפים, ריחות וטעמים שנמצאים בדרך כלל במי ברז." },
    uff: { title: "UFF — אולטרה-סינון",      desc: "עם מיקרו-נקבוביות בדיוק גבוה, מסיר אורגניזמים, חומרים מקרומולקולריים, תולעים אדומים, וירוסים וחיידקים." },
    rof: { title: "ROF — אוסמוזה הפוכה",     desc: "מערכת המייצרת מים ב-99% טוהר (נקיים מוירוסים וחיידקים עד 0.5 מיקרון), שפותחה עבור אנשים שרוצים או זקוקים לצריכת מים טהורים ביותר." },
    aaf: { title: "AAF — אלקלי אנטיאוקסידנטי", desc: "מכוון את טווח ה-pH של המים, הופך את המים המסוננים לאלקליניים עם pH מעל 9, אנטיאוקסידנטי ועשיר במימן." },
  },
};

function getFilterSet(lang: Lang, isRO: boolean): FilterSet {
  const d = FILTER_DATA[lang];
  const wi = (f: FilterInfo, k: keyof typeof FILTER_IMGS): FilterInfo => ({ ...f, img: FILTER_IMGS[k] });
  return {
    label:       isRO ? d.ro_label : d.uf_label,
    description: isRO ? d.ro_desc  : d.uf_desc,
    bullets: d.bullets,
    filters: isRO
      ? [wi(d.ppf, "ppf"), wi(d.acf, "acf"), wi(d.rof, "rof"), wi(d.aaf, "aaf")]
      : [wi(d.ppf, "ppf"), wi(d.acf, "acf"), wi(d.uff, "uff"), wi(d.aaf, "aaf")],
    props: d.props,
  };
}

/* ── Bool cell ─────────────────────────────────────────────────────────────── */
function BoolCell({ value }: { value: boolean }) {
  if (value) return <FigmaIcon src={imgCheck} size={24} />;
  return <FigmaIcon src={imgNegative} size={24} />;
}

/* ── Table row ─────────────────────────────────────────────────────────────── */
function SpecRow({ label, value, isBool, isPremium }: { label: string; value: string | boolean; isBool?: boolean; isPremium: boolean }) {
  return (
    <div className="flex items-stretch border-b border-[#e8ecf4] last:border-b-0">
      <div className="w-[180px] xl:w-[200px] shrink-0 border-r border-[#e8ecf4] px-[14px] py-[12px] flex items-center">
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">{label}</span>
      </div>
      <div className="flex-1 px-[14px] py-[12px] flex items-center">
        {isBool ? (
          <BoolCell value={value as boolean} />
        ) : value === "—" ? (
          <BoolCell value={false} />
        ) : (
          <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#374151]">{value as string}</span>
        )}
      </div>
    </div>
  );
}

/* ── Separator ─────────────────────────────────────────────────────────────── */
function Sep() {
  return <div className="w-full h-px bg-[#e8ecf4] shrink-0" />;
}

/* ── Section title ─────────────────────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#1f2e91] text-center w-full">
      {children}
    </p>
  );
}

const SECTION_LABELS: Record<string, string> = {
  produto:   "Produto",
  cores:     "Cores",
  filtros:   "Filtros",
  garantias: "Garantias",
  cep:       "Entrega",
  conta:     "Conta",
};

type PhoneCountry = { code: string; name: string; dial: string; flag: string; maxDigits: number; placeholder: string; fmt: (d: string) => string };

const LANG_TO_LOCALE: Record<Lang, string> = {
  pt:      "pt-BR", "pt-pt": "pt-PT",
  en:      "en-GB", "en-gb": "en-US",
  es:      "es-ES", fr:      "fr-FR",
  de:      "de-DE", it:      "it-IT",
  zh:      "zh-CN", ja:      "ja-JP",
  ko:      "ko-KR", sv:      "sv-SE",
  fi:      "fi-FI", ru:      "ru-RU",
  ro:      "ro-RO", he:      "he-IL",
};

const fmtGen = (d: string): string =>
  d.length <= 3 ? d : d.length <= 7 ? `${d.slice(0,3)} ${d.slice(3)}` :
  d.length <= 10 ? `${d.slice(0,3)} ${d.slice(3,6)} ${d.slice(6)}` : `${d.slice(0,4)} ${d.slice(4,7)} ${d.slice(7)}`;

const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: "BR", name: "Brasil",                    dial: "+55",   flag: "🇧🇷", maxDigits: 11, placeholder: "(99) 99999-9999",
    fmt: (d) => d.length<=2?d:d.length<=7?`(${d.slice(0,2)}) ${d.slice(2)}`:`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}` },
  { code: "AF", name: "Afeganistão",               dial: "+93",   flag: "🇦🇫", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "ZA", name: "África do Sul",             dial: "+27",   flag: "🇿🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "AL", name: "Albânia",                   dial: "+355",  flag: "🇦🇱", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "DE", name: "Alemanha",                  dial: "+49",   flag: "🇩🇪", maxDigits: 11, placeholder: "999 9999 9999",  fmt: fmtGen },
  { code: "AD", name: "Andorra",                   dial: "+376",  flag: "🇦🇩", maxDigits: 6,  placeholder: "999 999",         fmt: fmtGen },
  { code: "AO", name: "Angola",                    dial: "+244",  flag: "🇦🇴", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "AI", name: "Anguila",                   dial: "+1264", flag: "🇦🇮", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "AG", name: "Antígua e Barbuda",         dial: "+1268", flag: "🇦🇬", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "SA", name: "Arábia Saudita",            dial: "+966",  flag: "🇸🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "DZ", name: "Argélia",                   dial: "+213",  flag: "🇩🇿", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "AR", name: "Argentina",                 dial: "+54",   flag: "🇦🇷", maxDigits: 10, placeholder: "(11) 9999-9999",
    fmt: (d) => d.length<=2?d:d.length<=6?`(${d.slice(0,2)}) ${d.slice(2)}`:`(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}` },
  { code: "AM", name: "Armênia",                   dial: "+374",  flag: "🇦🇲", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "AW", name: "Aruba",                     dial: "+297",  flag: "🇦🇼", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "AU", name: "Austrália",                 dial: "+61",   flag: "🇦🇺", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "AT", name: "Áustria",                   dial: "+43",   flag: "🇦🇹", maxDigits: 11, placeholder: "999 9999 9999",  fmt: fmtGen },
  { code: "AZ", name: "Azerbaijão",                dial: "+994",  flag: "🇦🇿", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "BS", name: "Bahamas",                   dial: "+1242", flag: "🇧🇸", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "BH", name: "Bahrein",                   dial: "+973",  flag: "🇧🇭", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BD", name: "Bangladesh",                dial: "+880",  flag: "🇧🇩", maxDigits: 10, placeholder: "9999 999 999",   fmt: fmtGen },
  { code: "BB", name: "Barbados",                  dial: "+1246", flag: "🇧🇧", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "BE", name: "Bélgica",                   dial: "+32",   flag: "🇧🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "BZ", name: "Belize",                    dial: "+501",  flag: "🇧🇿", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "BJ", name: "Benin",                     dial: "+229",  flag: "🇧🇯", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BM", name: "Bermudas",                  dial: "+1441", flag: "🇧🇲", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "BY", name: "Bielorrússia",              dial: "+375",  flag: "🇧🇾", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "BO", name: "Bolívia",                   dial: "+591",  flag: "🇧🇴", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BA", name: "Bósnia e Herzegovina",      dial: "+387",  flag: "🇧🇦", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "BW", name: "Botswana",                  dial: "+267",  flag: "🇧🇼", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BN", name: "Brunei",                    dial: "+673",  flag: "🇧🇳", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "BG", name: "Bulgária",                  dial: "+359",  flag: "🇧🇬", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "BF", name: "Burkina Faso",              dial: "+226",  flag: "🇧🇫", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BI", name: "Burundi",                   dial: "+257",  flag: "🇧🇮", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BT", name: "Butão",                     dial: "+975",  flag: "🇧🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "CV", name: "Cabo Verde",                dial: "+238",  flag: "🇨🇻", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "CM", name: "Camarões",                  dial: "+237",  flag: "🇨🇲", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "KH", name: "Camboja",                   dial: "+855",  flag: "🇰🇭", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "CA", name: "Canadá",                    dial: "+1",    flag: "🇨🇦", maxDigits: 10, placeholder: "(999) 999-9999",
    fmt: (d) => d.length<=3?d:d.length<=6?`(${d.slice(0,3)}) ${d.slice(3)}`:`(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` },
  { code: "QA", name: "Catar",                     dial: "+974",  flag: "🇶🇦", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "KZ", name: "Cazaquistão",               dial: "+7",    flag: "🇰🇿", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "CF", name: "Rep. Centro-Africana",      dial: "+236",  flag: "🇨🇫", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TD", name: "Chade",                     dial: "+235",  flag: "🇹🇩", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "CL", name: "Chile",                     dial: "+56",   flag: "🇨🇱", maxDigits: 9,  placeholder: "9 9999 9999",    fmt: fmtGen },
  { code: "CN", name: "China",                     dial: "+86",   flag: "🇨🇳", maxDigits: 11, placeholder: "999 9999 9999",  fmt: fmtGen },
  { code: "CY", name: "Chipre",                    dial: "+357",  flag: "🇨🇾", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "CO", name: "Colômbia",                  dial: "+57",   flag: "🇨🇴", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "KM", name: "Comores",                   dial: "+269",  flag: "🇰🇲", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "CG", name: "Congo",                     dial: "+242",  flag: "🇨🇬", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "CD", name: "Congo (RD)",                dial: "+243",  flag: "🇨🇩", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "KP", name: "Coreia do Norte",           dial: "+850",  flag: "🇰🇵", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "KR", name: "Coreia do Sul",             dial: "+82",   flag: "🇰🇷", maxDigits: 10, placeholder: "99 9999 9999",   fmt: fmtGen },
  { code: "CI", name: "Costa do Marfim",           dial: "+225",  flag: "🇨🇮", maxDigits: 10, placeholder: "99 99 999 999",  fmt: fmtGen },
  { code: "CR", name: "Costa Rica",                dial: "+506",  flag: "🇨🇷", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "HR", name: "Croácia",                   dial: "+385",  flag: "🇭🇷", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "CU", name: "Cuba",                      dial: "+53",   flag: "🇨🇺", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "CW", name: "Curaçao",                   dial: "+599",  flag: "🇨🇼", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "DK", name: "Dinamarca",                 dial: "+45",   flag: "🇩🇰", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "DJ", name: "Djibouti",                  dial: "+253",  flag: "🇩🇯", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "DM", name: "Dominica",                  dial: "+1767", flag: "🇩🇲", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "EG", name: "Egito",                     dial: "+20",   flag: "🇪🇬", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "SV", name: "El Salvador",               dial: "+503",  flag: "🇸🇻", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "AE", name: "Emirados Árabes Unidos",    dial: "+971",  flag: "🇦🇪", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "EC", name: "Equador",                   dial: "+593",  flag: "🇪🇨", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "GQ", name: "Guiné Equatorial",          dial: "+240",  flag: "🇬🇶", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "ER", name: "Eritreia",                  dial: "+291",  flag: "🇪🇷", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "SK", name: "Eslováquia",                dial: "+421",  flag: "🇸🇰", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "SI", name: "Eslovênia",                 dial: "+386",  flag: "🇸🇮", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "ES", name: "Espanha",                   dial: "+34",   flag: "🇪🇸", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "SZ", name: "Essuatíni",                 dial: "+268",  flag: "🇸🇿", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "US", name: "Estados Unidos",            dial: "+1",    flag: "🇺🇸", maxDigits: 10, placeholder: "(999) 999-9999",
    fmt: (d) => d.length<=3?d:d.length<=6?`(${d.slice(0,3)}) ${d.slice(3)}`:`(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` },
  { code: "EE", name: "Estônia",                   dial: "+372",  flag: "🇪🇪", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "ET", name: "Etiópia",                   dial: "+251",  flag: "🇪🇹", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "FJ", name: "Fiji",                      dial: "+679",  flag: "🇫🇯", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "PH", name: "Filipinas",                 dial: "+63",   flag: "🇵🇭", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "FI", name: "Finlândia",                 dial: "+358",  flag: "🇫🇮", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "FR", name: "França",                    dial: "+33",   flag: "🇫🇷", maxDigits: 9,  placeholder: "99 99 99 99 99", fmt: fmtGen },
  { code: "GA", name: "Gabão",                     dial: "+241",  flag: "🇬🇦", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "GM", name: "Gâmbia",                    dial: "+220",  flag: "🇬🇲", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "GH", name: "Gana",                      dial: "+233",  flag: "🇬🇭", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "GE", name: "Geórgia",                   dial: "+995",  flag: "🇬🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "GI", name: "Gibraltar",                 dial: "+350",  flag: "🇬🇮", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "GD", name: "Granada",                   dial: "+1473", flag: "🇬🇩", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "GR", name: "Grécia",                    dial: "+30",   flag: "🇬🇷", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "GL", name: "Groenlândia",               dial: "+299",  flag: "🇬🇱", maxDigits: 6,  placeholder: "99 99 99",        fmt: fmtGen },
  { code: "GP", name: "Guadalupe",                 dial: "+590",  flag: "🇬🇵", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "GU", name: "Guam",                      dial: "+1671", flag: "🇬🇺", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "GT", name: "Guatemala",                 dial: "+502",  flag: "🇬🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "GN", name: "Guiné",                     dial: "+224",  flag: "🇬🇳", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "GW", name: "Guiné-Bissau",              dial: "+245",  flag: "🇬🇼", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "GY", name: "Guiana",                    dial: "+592",  flag: "🇬🇾", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "GF", name: "Guiana Francesa",           dial: "+594",  flag: "🇬🇫", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "HT", name: "Haiti",                     dial: "+509",  flag: "🇭🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "HN", name: "Honduras",                  dial: "+504",  flag: "🇭🇳", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "HK", name: "Hong Kong",                 dial: "+852",  flag: "🇭🇰", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "HU", name: "Hungria",                   dial: "+36",   flag: "🇭🇺", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "YE", name: "Iêmen",                     dial: "+967",  flag: "🇾🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MH", name: "Ilhas Marshall",            dial: "+692",  flag: "🇲🇭", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "VI", name: "Ilhas Virgens (EUA)",       dial: "+1340", flag: "🇻🇮", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "VG", name: "Ilhas Virgens (RU)",        dial: "+1284", flag: "🇻🇬", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "IN", name: "Índia",                     dial: "+91",   flag: "🇮🇳", maxDigits: 10, placeholder: "99999 99999",    fmt: fmtGen },
  { code: "ID", name: "Indonésia",                 dial: "+62",   flag: "🇮🇩", maxDigits: 11, placeholder: "999 9999 9999",  fmt: fmtGen },
  { code: "IQ", name: "Iraque",                    dial: "+964",  flag: "🇮🇶", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "IR", name: "Irã",                       dial: "+98",   flag: "🇮🇷", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "IE", name: "Irlanda",                   dial: "+353",  flag: "🇮🇪", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "IS", name: "Islândia",                  dial: "+354",  flag: "🇮🇸", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "IL", name: "Israel",                    dial: "+972",  flag: "🇮🇱", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "IT", name: "Itália",                    dial: "+39",   flag: "🇮🇹", maxDigits: 11, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "JM", name: "Jamaica",                   dial: "+1876", flag: "🇯🇲", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "JP", name: "Japão",                     dial: "+81",   flag: "🇯🇵", maxDigits: 11, placeholder: "99 9999 9999",   fmt: fmtGen },
  { code: "JO", name: "Jordânia",                  dial: "+962",  flag: "🇯🇴", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "KE", name: "Quênia",                    dial: "+254",  flag: "🇰🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "KG", name: "Quirguistão",               dial: "+996",  flag: "🇰🇬", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "KI", name: "Kiribati",                  dial: "+686",  flag: "🇰🇮", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "XK", name: "Kosovo",                    dial: "+383",  flag: "🇽🇰", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "KW", name: "Kuwait",                    dial: "+965",  flag: "🇰🇼", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LA", name: "Laos",                      dial: "+856",  flag: "🇱🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "LS", name: "Lesoto",                    dial: "+266",  flag: "🇱🇸", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LV", name: "Letônia",                   dial: "+371",  flag: "🇱🇻", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LB", name: "Líbano",                    dial: "+961",  flag: "🇱🇧", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LR", name: "Libéria",                   dial: "+231",  flag: "🇱🇷", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LY", name: "Líbia",                     dial: "+218",  flag: "🇱🇾", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "LI", name: "Liechtenstein",             dial: "+423",  flag: "🇱🇮", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "LT", name: "Lituânia",                  dial: "+370",  flag: "🇱🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LU", name: "Luxemburgo",                dial: "+352",  flag: "🇱🇺", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MO", name: "Macau",                     dial: "+853",  flag: "🇲🇴", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MK", name: "Macedônia do Norte",        dial: "+389",  flag: "🇲🇰", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "MG", name: "Madagascar",                dial: "+261",  flag: "🇲🇬", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MY", name: "Malásia",                   dial: "+60",   flag: "🇲🇾", maxDigits: 10, placeholder: "99 9999 9999",   fmt: fmtGen },
  { code: "MW", name: "Malawi",                    dial: "+265",  flag: "🇲🇼", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MV", name: "Maldivas",                  dial: "+960",  flag: "🇲🇻", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "ML", name: "Mali",                      dial: "+223",  flag: "🇲🇱", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MT", name: "Malta",                     dial: "+356",  flag: "🇲🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MA", name: "Marrocos",                  dial: "+212",  flag: "🇲🇦", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MQ", name: "Martinica",                 dial: "+596",  flag: "🇲🇶", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MR", name: "Mauritânia",                dial: "+222",  flag: "🇲🇷", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MU", name: "Maurício",                  dial: "+230",  flag: "🇲🇺", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MX", name: "México",                    dial: "+52",   flag: "🇲🇽", maxDigits: 10, placeholder: "99 9999 9999",
    fmt: (d) => d.length<=2?d:d.length<=6?`${d.slice(0,2)} ${d.slice(2)}`:`${d.slice(0,2)} ${d.slice(2,6)} ${d.slice(6)}` },
  { code: "FM", name: "Micronésia",                dial: "+691",  flag: "🇫🇲", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "MZ", name: "Moçambique",                dial: "+258",  flag: "🇲🇿", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "MD", name: "Moldávia",                  dial: "+373",  flag: "🇲🇩", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MC", name: "Mônaco",                    dial: "+377",  flag: "🇲🇨", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MN", name: "Mongólia",                  dial: "+976",  flag: "🇲🇳", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "ME", name: "Montenegro",                dial: "+382",  flag: "🇲🇪", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "MS", name: "Montserrat",                dial: "+1664", flag: "🇲🇸", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "MM", name: "Myanmar",                   dial: "+95",   flag: "🇲🇲", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "NA", name: "Namíbia",                   dial: "+264",  flag: "🇳🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "NR", name: "Nauru",                     dial: "+674",  flag: "🇳🇷", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "NP", name: "Nepal",                     dial: "+977",  flag: "🇳🇵", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "NI", name: "Nicarágua",                 dial: "+505",  flag: "🇳🇮", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "NE", name: "Níger",                     dial: "+227",  flag: "🇳🇪", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "NG", name: "Nigéria",                   dial: "+234",  flag: "🇳🇬", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "NO", name: "Noruega",                   dial: "+47",   flag: "🇳🇴", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "NC", name: "Nova Caledônia",            dial: "+687",  flag: "🇳🇨", maxDigits: 6,  placeholder: "99 9999",         fmt: fmtGen },
  { code: "NZ", name: "Nova Zelândia",             dial: "+64",   flag: "🇳🇿", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "NL", name: "Países Baixos",             dial: "+31",   flag: "🇳🇱", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "PW", name: "Palau",                     dial: "+680",  flag: "🇵🇼", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "PS", name: "Palestina",                 dial: "+970",  flag: "🇵🇸", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PA", name: "Panamá",                    dial: "+507",  flag: "🇵🇦", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "PG", name: "Papua Nova Guiné",          dial: "+675",  flag: "🇵🇬", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "PK", name: "Paquistão",                 dial: "+92",   flag: "🇵🇰", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "PY", name: "Paraguai",                  dial: "+595",  flag: "🇵🇾", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PE", name: "Peru",                      dial: "+51",   flag: "🇵🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PF", name: "Polinésia Francesa",        dial: "+689",  flag: "🇵🇫", maxDigits: 6,  placeholder: "99 99 99",        fmt: fmtGen },
  { code: "PL", name: "Polônia",                   dial: "+48",   flag: "🇵🇱", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PT", name: "Portugal",                  dial: "+351",  flag: "🇵🇹", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PR", name: "Porto Rico",                dial: "+1787", flag: "🇵🇷", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "GB", name: "Reino Unido",               dial: "+44",   flag: "🇬🇧", maxDigits: 10, placeholder: "9999 999999",    fmt: fmtGen },
  { code: "DO", name: "República Dominicana",      dial: "+1809", flag: "🇩🇴", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "CZ", name: "República Tcheca",          dial: "+420",  flag: "🇨🇿", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "RE", name: "Reunião",                   dial: "+262",  flag: "🇷🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "RO", name: "Romênia",                   dial: "+40",   flag: "🇷🇴", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "RW", name: "Ruanda",                    dial: "+250",  flag: "🇷🇼", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "RU", name: "Rússia",                    dial: "+7",    flag: "🇷🇺", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "KN", name: "São Cristóvão e Nevis",     dial: "+1869", flag: "🇰🇳", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "LC", name: "Santa Lúcia",               dial: "+1758", flag: "🇱🇨", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "VC", name: "São Vicente e Granadinas",  dial: "+1784", flag: "🇻🇨", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "WS", name: "Samoa",                     dial: "+685",  flag: "🇼🇸", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "SM", name: "San Marino",                dial: "+378",  flag: "🇸🇲", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "SH", name: "Santa Helena",              dial: "+290",  flag: "🇸🇭", maxDigits: 4,  placeholder: "9999",            fmt: fmtGen },
  { code: "ST", name: "São Tomé e Príncipe",       dial: "+239",  flag: "🇸🇹", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "SN", name: "Senegal",                   dial: "+221",  flag: "🇸🇳", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SL", name: "Serra Leoa",                dial: "+232",  flag: "🇸🇱", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "RS", name: "Sérvia",                    dial: "+381",  flag: "🇷🇸", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SC", name: "Seychelles",                dial: "+248",  flag: "🇸🇨", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "SG", name: "Singapura",                 dial: "+65",   flag: "🇸🇬", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "SY", name: "Síria",                     dial: "+963",  flag: "🇸🇾", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "SO", name: "Somália",                   dial: "+252",  flag: "🇸🇴", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LK", name: "Sri Lanka",                 dial: "+94",   flag: "🇱🇰", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SD", name: "Sudão",                     dial: "+249",  flag: "🇸🇩", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SS", name: "Sudão do Sul",              dial: "+211",  flag: "🇸🇸", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "SE", name: "Suécia",                    dial: "+46",   flag: "🇸🇪", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "CH", name: "Suíça",                     dial: "+41",   flag: "🇨🇭", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SR", name: "Suriname",                  dial: "+597",  flag: "🇸🇷", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "TJ", name: "Tadjiquistão",              dial: "+992",  flag: "🇹🇯", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "TH", name: "Tailândia",                 dial: "+66",   flag: "🇹🇭", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "TW", name: "Taiwan",                    dial: "+886",  flag: "🇹🇼", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "TZ", name: "Tanzânia",                  dial: "+255",  flag: "🇹🇿", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "TL", name: "Timor-Leste",               dial: "+670",  flag: "🇹🇱", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TG", name: "Togo",                      dial: "+228",  flag: "🇹🇬", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TO", name: "Tonga",                     dial: "+676",  flag: "🇹🇴", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "TT", name: "Trinidad e Tobago",         dial: "+1868", flag: "🇹🇹", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "TN", name: "Tunísia",                   dial: "+216",  flag: "🇹🇳", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TM", name: "Turcomenistão",             dial: "+993",  flag: "🇹🇲", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TR", name: "Turquia",                   dial: "+90",   flag: "🇹🇷", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "TV", name: "Tuvalu",                    dial: "+688",  flag: "🇹🇻", maxDigits: 6,  placeholder: "999 999",         fmt: fmtGen },
  { code: "UA", name: "Ucrânia",                   dial: "+380",  flag: "🇺🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "UG", name: "Uganda",                    dial: "+256",  flag: "🇺🇬", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "UY", name: "Uruguai",                   dial: "+598",  flag: "🇺🇾", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "UZ", name: "Uzbequistão",               dial: "+998",  flag: "🇺🇿", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "VU", name: "Vanuatu",                   dial: "+678",  flag: "🇻🇺", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "VE", name: "Venezuela",                 dial: "+58",   flag: "🇻🇪", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "VN", name: "Vietnã",                    dial: "+84",   flag: "🇻🇳", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "WF", name: "Wallis e Futuna",           dial: "+681",  flag: "🇼🇫", maxDigits: 6,  placeholder: "99 9999",         fmt: fmtGen },
  { code: "ZM", name: "Zâmbia",                    dial: "+260",  flag: "🇿🇲", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "ZW", name: "Zimbábue",                  dial: "+263",  flag: "🇿🇼", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
];

export default function CheckinProduct({ family }: Props) {
  const { addToCart, cart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [payTab, setPayTab] = useState<"dinheiro" | "financiar">("dinheiro");
  const [fichaTecnicaOpen, setFichaTecnicaOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("produto");
  const [hoverSection, setHoverSection] = useState<string | null>(null);

  // Unified slide state — shared across Produto + Cores, never resets on variant/color change
  const [slideIdx, setSlideIdx] = useState(0);
  const [imageHovered, setImageHovered] = useState(false);

  // Freeze display while mouse is over the left-panel image (prevents section-row hover-leave from snapping back to activeSection).
  // lastRowHoverRef tracks the last explicitly hovered section row. prevActiveSectionRef resets it when the scroll-spy advances,
  // so wheel-scrolling from the left panel correctly follows activeSection even with imageHovered = true.
  const lastRowHoverRef = useRef<string | null>(null);
  const prevActiveSectionRef = useRef<string>(activeSection);
  if (prevActiveSectionRef.current !== activeSection) {
    prevActiveSectionRef.current = activeSection;
    lastRowHoverRef.current = null;
  }
  if (hoverSection !== null) lastRowHoverRef.current = hoverSection;
  const displaySection = imageHovered && lastRowHoverRef.current !== null
    ? lastRowHoverRef.current
    : hoverSection ?? activeSection;


  // Form state
  const [fv, setFv] = useState<Record<string, string>>({ cep: "", nome: "", email: "", email2: "", tel: "" });
  const [ft, setFt] = useState<Record<string, boolean>>({});
  const [phoneCountryIdx, setPhoneCountryIdx] = useState(0);
  const [phoneDropOpen, setPhoneDropOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const phoneDropRef = useRef<HTMLDivElement>(null);
  const [freteResult, setFreteResult] = useState<
    null | { state: "loading" } | { state: "ok"; city: string; uf: string } | { state: "err"; message: string }
  >(null);
  const [orderConfirmOpen, setOrderConfirmOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    if (!phoneDropOpen) return;
    const handler = (e: MouseEvent) => {
      if (phoneDropRef.current && !phoneDropRef.current.contains(e.target as Node)) {
        setPhoneDropOpen(false);
        setPhoneSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [phoneDropOpen]);

  const setField = (key: string, value: string) => setFv(v => ({ ...v, [key]: value }));
  const touchField = (key: string) => setFt(t => ({ ...t, [key]: true }));

  const fieldError = (key: string): string => {
    if (!ft[key]) return "";
    const val = fv[key] ?? "";
    switch (key) {
      case "cep":    return /^\d{5}-\d{3}$/.test(val) ? "" : "CEP inválido — formato esperado: 00000-000";
      case "nome":   return val.trim().split(/\s+/).length >= 2 ? "" : lb.errNome;
      case "email":  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : lb.errEmail;
      case "email2": return val === fv.email ? "" : lb.errEmail2;
      case "tel":    return val.replace(/\D/g, "").length >= 8 ? "" : lb.errTel;
      default: return "";
    }
  };

  const handleCEPChange = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 8);
    setField("cep", d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d);
    setFreteResult(null);
  };

  const handleCalcularFrete = async () => {
    const digits = fv.cep.replace(/\D/g, "");
    if (digits.length !== 8) { touchField("cep"); return; }
    setFreteResult({ state: "loading" });
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) {
        setFreteResult({ state: "err", message: lb.cepNaoEncontrado });
      } else {
        setFreteResult({ state: "ok", city: data.localidade ?? "", uf: data.uf ?? "" });
      }
    } catch {
      setFreteResult({ state: "err", message: lb.erroCep });
    }
  };

  const handleTelChange = (raw: string) => {
    const country = PHONE_COUNTRIES[phoneCountryIdx];
    const d = raw.replace(/\D/g, "").slice(0, country.maxDigits);
    setField("tel", country.fmt(d));
  };

  const isFormValid =
    /^\d{5}-\d{3}$/.test(fv.cep) &&
    fv.nome.trim().split(/\s+/).length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fv.email) &&
    fv.email2 === fv.email &&
    fv.tel.replace(/\D/g, "").length >= 8 &&
    termsChecked;

  const { lang } = useLang();
  const lb = LABELS[lang];
  const regionNames = new Intl.DisplayNames([LANG_TO_LOCALE[lang]], { type: "region" });
  const activeVariant = family.variants[activeVariantIdx];
  // Active image set: variant's slides for selected color, fallback to single hero img
  const colorOptions = family.colors ?? ESSENTIALS_COLORS;
  const activeColorImages = activeVariant.slides?.[activeColorIdx] ?? [];
  const slideCount = activeColorImages.length > 0 ? activeColorImages.length : 1;
  const specs = SPECS[activeVariant.id] ?? SPECS["neo-fit"]!;
  const accent = family.isPremium ? "#9f3df5" : "#0233c3";
  const accentGrad = family.isPremium
    ? "linear-gradient(135deg, #0233c3, #9f3df5)"
    : "linear-gradient(135deg, #0233c3, #0569ff)";

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollTop, clientHeight } = container;
    const containerTop = container.getBoundingClientRect().top;

    // Scroll-spy: pick the section whose top sits highest inside the visible area.
    // Step 1 — any section whose top is in [0, clientHeight): pick the one with the smallest top.
    // Step 2 (fallback) — if no section top is visible, pick the last one that scrolled past.
    let step1Best: string | null = null, step1Top = Infinity;
    let step2Best: string | null = null, step2Top = -Infinity;
    Object.entries(sectionRefs.current).forEach(([key, el]) => {
      if (!el) return;
      const vt = el.getBoundingClientRect().top - containerTop;
      if (vt >= 0 && vt < clientHeight) {
        if (vt < step1Top) { step1Top = vt; step1Best = key; }
      } else if (vt < 0) {
        if (vt > step2Top) { step2Top = vt; step2Best = key; }
      }
    });
    setActiveSection(step1Best ?? step2Best ?? "produto");

    // Scene transitions (when scenes are defined)
    if (family.scenes.length === 0) return;
    let idx = 0;
    for (let i = 0; i < family.scenes.length; i++) {
      if (scrollTop >= family.scenes[i].minScroll) idx = i;
    }
    setActiveSceneIdx(idx);
  }, [family.scenes]);

  const handleLeftWheel = useCallback((e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop += e.deltaY;
  }, []);

  const leftImg =
    family.scenes.length > 0
      ? family.scenes[activeSceneIdx].img
      : activeVariant.img;

  const monthlyPrice = (price: number) => Math.ceil(price / 12);

  return (
    <div className="flex flex-col md:flex-row w-full h-[calc(100vh-80px)] overflow-hidden">

      {/* ── LEFT: Sticky image ───────────────────────────────────────────── */}
      <div className="shrink-0 h-[260px] md:h-auto md:flex-1 bg-[#f6f9fe] flex flex-col md:justify-center md:items-center overflow-hidden relative" onWheel={handleLeftWheel}>

        {/* ── FILTROS / GARANTIAS: filter banner (fills full outer container) ── */}
        <div className={`absolute inset-0 transition-opacity duration-500 z-10 ${displaySection === "filtros" || displaySection === "garantias" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <img
            src={specs.filtragem === "4 Filtros RO / Osmose Reversa"
              ? "/images/checkin/banner-filtros-rof.webp"
              : "/images/checkin/banner-filtros-uff.webp"}
            alt={lb.filtrosBanner}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── CONTA: produto + filtros + mapa (fills full outer container) ── */}
        <div className={`absolute inset-0 transition-opacity duration-500 z-10 ${displaySection === "conta" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className="w-full h-full flex">
            {/* Esquerda: produto */}
            <div className="w-1/2 h-full flex items-center justify-center bg-[#f6f9fe]">
              <img src={activeVariant.img} alt={activeVariant.name} className="w-full h-1/2 object-contain" />
            </div>
            {/* Direita: filtros (cima) + mapa (baixo) */}
            <div className="w-1/2 h-full flex flex-col">
              <div className="flex-1 overflow-hidden">
                <img
                  src={specs.filtragem === "4 Filtros RO / Osmose Reversa"
                    ? "/images/checkin/banner-filtros-rof.webp"
                    : "/images/checkin/banner-filtros-uff.webp"}
                  alt={lb.filtrosBanner}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                {fv.cep.length === 9 ? (
                  <iframe
                    key={fv.cep}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(fv.cep + ", Brasil")}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    title={lb.mapaEntrega}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-[12px]"
                    style={{ background: "linear-gradient(160deg, #eef2ff 0%, #f6f9fe 100%)" }}>
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="22" r="10" stroke="#0233c3" strokeWidth="2.5"/>
                      <path d="M24 12v-4M24 32v4M14 22H10M38 22h-4" stroke="#0233c3" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                      <circle cx="24" cy="22" r="3.5" fill="#0233c3"/>
                      <path d="M16 36c0-4 3.6-7 8-7s8 3 8 7" stroke="#0233c3" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
                    </svg>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#9ca3af] text-center px-[20px]">{lb.digitarCep}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── CEP: embedded map (fills full outer container) ─────────────── */}
        <div className={`absolute inset-0 transition-opacity duration-500 z-10 ${displaySection === "cep" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {fv.cep.length === 9 ? (
            <iframe
              key={fv.cep}
              src={`https://www.google.com/maps?q=${encodeURIComponent(fv.cep + ", Brasil")}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              title={lb.mapaEntrega}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-[16px] p-[40px]"
              style={{ background: "linear-gradient(160deg, #eef2ff 0%, #f6f9fe 100%)" }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="22" r="10" stroke="#0233c3" strokeWidth="2.5"/>
                <path d="M24 12v-4M24 32v4M14 22H10M38 22h-4" stroke="#0233c3" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                <circle cx="24" cy="22" r="3.5" fill="#0233c3"/>
                <path d="M16 36c0-4 3.6-7 8-7s8 3 8 7" stroke="#0233c3" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#9ca3af] text-center">
                {lb.digitarCep}
              </p>
            </div>
          )}
        </div>

        {/* Image area */}
        <div
          className="flex-1 md:flex-none md:h-[700px] w-full md:max-w-[1400px] md:mx-auto relative flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >

          {/* ── PRODUTO / CORES: unified color+variant slide ───────────────── */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${displaySection === "produto" || displaySection === "cores" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {family.scenes.length > 0 ? (
              family.scenes.map((scene, i) => (
                <img key={i} src={scene.img} alt=""
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === activeSceneIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))
            ) : activeColorImages.length > 0 ? (
              <img src={activeVariant.img}
                alt={activeVariant.name}
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
            /* BACKUP — slideshow completo, reativar quando imagens estiverem prontas
              activeColorImages.map((img, i) => (
                <img key={i} src={img}
                  alt={`${activeVariant.name} – ${colorOptions[activeColorIdx]?.name ?? ""} – ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === slideIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))
            */
              family.variants.map((v, i) => (
                <img key={v.id} src={v.img} alt={v.name}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === activeVariantIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))
            )}
          </div>




          {/* BACKUP — setas do slide, reativar junto com o slideshow
          {family.scenes.length === 0 && (activeColorImages.length > 0 ? slideCount > 1 : family.variants.length > 1) && (
            <>
              <button aria-label={lb.imagemAnterior}
                className={`absolute left-[12px] top-1/2 -translate-y-1/2 z-10 size-[38px] rounded-full bg-white/90 backdrop-blur-sm border border-[#e8ecf4] flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 ${(displaySection === "produto" || displaySection === "cores") && imageHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => activeColorImages.length > 0 ? setSlideIdx(n => (n - 1 + slideCount) % slideCount) : setActiveVariantIdx(n => (n - 1 + family.variants.length) % family.variants.length)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="#1f2e91" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button aria-label={lb.proximaImagem}
                className={`absolute right-[12px] top-1/2 -translate-y-1/2 z-10 size-[38px] rounded-full bg-white/90 backdrop-blur-sm border border-[#e8ecf4] flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 ${(displaySection === "produto" || displaySection === "cores") && imageHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => activeColorImages.length > 0 ? setSlideIdx(n => (n + 1) % slideCount) : setActiveVariantIdx(n => (n + 1) % family.variants.length)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#1f2e91" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}
          */}

        </div>
      </div>

      {/* ── RIGHT: Scrollable panel ──────────────────────────────────────── */}
      <div className="flex-1 min-h-0 w-full md:flex-none md:w-[400px] xl:w-[440px] flex flex-col border-t md:border-t-0 md:border-l border-[#e8ecf4] bg-white">

        <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
          <div className="px-[20px] md:px-[32px] pt-[36px] pb-[8px] flex flex-col gap-[28px]">

            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[26px] leading-[1.1]"
                style={{ background: accentGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {activeVariant.name}
              </h1>
            </div>

            {/* ── Payment tabs ────────────────────────────────────────────── */}
            <div className="border-b border-[#e8ecf4] flex">
              <button onClick={() => setPayTab("dinheiro")}
                className="flex-1 pb-[12px] pt-[4px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] transition-colors relative"
                style={{ color: payTab === "dinheiro" ? accent : "#aab2bc" }}
              >
                {lb.payCash}
                {payTab === "dinheiro" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: accentGrad }} />
                )}
              </button>
              {/* FINANCIAR — standby */}
              <div className="flex-1 pb-[12px] pt-[4px] flex items-center justify-center">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#d1d5db]">
                  {lb.payFinanciar}
                </span>
              </div>
              {/* ALUGAR — standby */}
              <div className="flex-1 pb-[12px] pt-[4px] flex items-center justify-center">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#d1d5db]">
                  {lb.payRent}
                </span>
              </div>
            </div>

            {/* ── Variant selector ────────────────────────────────────────── */}
            <div className="flex flex-col gap-[8px]"
              ref={(el) => { sectionRefs.current["produto"] = el; }}
              onMouseEnter={() => setHoverSection("produto")}
              onMouseLeave={() => setHoverSection(null)}>
              {family.variants.map((variant, i) => {
                const isActive = i === activeVariantIdx;
                const displayPrice = lang === "pt" && payTab === "financiar"
                  ? `${formatPrice(monthlyPrice(variant.price), lang)}/mês`
                  : formatPrice(variant.price, lang);
                return (
                  <button key={variant.id} onClick={() => setActiveVariantIdx(i)}
                    className="flex items-center justify-between gap-[10px] px-[14px] py-[12px] rounded-[12px] text-left transition-all"
                    style={{
                      background: isActive ? (family.isPremium ? "#f5eeff" : "#eef2ff") : "#f6f9fe",
                      border: `1.5px solid ${isActive ? accent : "transparent"}`,
                    }}
                  >
                    <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px]"
                        style={{ color: isActive ? accent : "#1f2e91" }}>
                        {variant.name}
                      </span>
                    </div>
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] shrink-0 text-right"
                      style={{ color: isActive ? accent : "#9ca3af" }}>
                      {displayPrice}
                    </span>
                  </button>
                );
              })}
              {/* Financing note */}
              {payTab === "financiar" && (
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#9ca3af] px-[2px]">
                  {lb.finNote}
                </p>
              )}
            </div>

            {/* ── Ficha Técnica ────────────────────────────────────────────── */}
            <div className="border border-[#e8ecf4] rounded-[16px] overflow-hidden">
              {/* Header */}
              <div className="px-[14px] py-[12px] border-b border-[#e8ecf4]"
                style={{ background: "linear-gradient(135deg, #f6f9fe, #eef2ff)" }}>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#1f2e91] text-center uppercase tracking-[0.06em]">
                  {lb.fichaTecnica}
                </p>
              </div>
              {/* Always visible — 5 rows */}
              <SpecRow label={lb.formato}    value={translateSpecValue(specs.formato, lang)}      isPremium={family.isPremium} />
              <SpecRow label={lb.filtragem}  value={translateSpecValue(specs.filtragem, lang)} isPremium={family.isPremium} />
              <SpecRow label={lb.temperaturas} value={translateSpecValue(specs.temperaturas, lang)} isPremium={family.isPremium} />
              <SpecRow label={lb.gasLabel}   value={specs.gas}   isBool isPremium={family.isPremium} />
              <SpecRow label={lb.h2Label}    value={specs.h2}    isBool isPremium={family.isPremium} />
              {/* Collapsible rows */}
              {fichaTecnicaOpen && (
                <>
                  <SpecRow label={lb.painel}   value={specs.painel}    isPremium={family.isPremium} />
                  <SpecRow label={lb.app}      value={specs.app}  isBool isPremium={family.isPremium} />
                  <SpecRow label={lb.aiIot}    value={specs.iot}  isBool isPremium={family.isPremium} />
                  <SpecRow label={lb.wifi}     value={specs.wifi} isBool isPremium={family.isPremium} />
                  <SpecRow label="UV LED"      value={specs.uv}   isBool isPremium={family.isPremium} />
                  <SpecRow label="Compressor Inverter" value={HAS_COMPRESSOR.has(activeVariant.id)} isBool isPremium={family.isPremium} />
                  <SpecRow label={lb.tanque}   value={specs.tanque}    isPremium={family.isPremium} />
                  <SpecRow label={lb.material} value={translateSpecValue(specs.material, lang)}  isPremium={family.isPremium} />
                  {activeVariant.id === "acquafy-media" && (
                    <>
                      <SpecRow label={translateSpecValue("Tanque de Água Natural", lang)}  value="10.000ml"                                                         isPremium={family.isPremium} />
                      <SpecRow label={translateSpecValue("Sensores de Proximidade", lang)} value={translateSpecValue("2 (copos e garrafas)", lang)}               isPremium={family.isPremium} />
                      <SpecRow label={lb.computador}                                       value={translateSpecValue("Ultra Rápido com Gestão de Mídia", lang)}   isPremium={family.isPremium} />
                      <SpecRow label={translateSpecValue("Plataforma de Mídia", lang)}     value={translateSpecValue("Digital + Receita Recorrente", lang)}        isPremium={family.isPremium} />
                    </>
                  )}
                </>
              )}
              {/* Toggle */}
              <button onClick={() => setFichaTecnicaOpen((v) => !v)}
                className="w-full flex items-center justify-between px-[14px] py-[14px] border-t border-[#e8ecf4] bg-[#f6f9fe] hover:bg-[#eef2ff] transition-colors">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px]" style={{ color: accent }}>
                  {fichaTecnicaOpen ? lb.ocultarFuncionalidades : lb.demaisFuncionalidades}
                </span>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                  className={`transition-transform duration-200 ${fichaTecnicaOpen ? "rotate-180" : ""}`}>
                  <path d="M1 1L7 7L13 1" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* ── Cores — Essentials only ─────────────────────────────────── */}
            {!family.isPremium && (
              <>
                <Sep />
                <div className="flex flex-col gap-[16px] items-center"
                  ref={(el) => { sectionRefs.current["cores"] = el; }}
                  onMouseEnter={() => setHoverSection("cores")}
                  onMouseLeave={() => setHoverSection(null)}>
                  <div className="flex flex-col gap-[4px] items-center">
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#9ca3af] uppercase tracking-[0.06em]">{lb.coresLabel}</p>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#1f2e91] text-center">
                      {colorOptions[activeColorIdx]?.name ?? ""}
                    </p>
                  </div>
                  <div className="flex gap-[10px] items-center justify-center flex-wrap">
                    {colorOptions.map((color, i) => {
                      const isActive = i === activeColorIdx;
                      return (
                        <button key={i} onClick={() => setActiveColorIdx(i)}
                          title={color.name}
                          className="size-[56px] rounded-full flex items-center justify-center transition-all shrink-0"
                          style={{
                            border: isActive ? `2px solid ${accent}` : "2px solid #e8ecf4",
                            padding: "5px",
                          }}>
                          <div className="size-full rounded-full" style={{ background: color.gradient }} />
                        </button>
                      );
                    })}
                  </div>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#9ca3af] text-center">Em breve</p>
                </div>
              </>
            )}

            <Sep />

            {/* ── Filtros de Alta Performance ──────────────────────────────── */}
            {(() => {
              const fs = getFilterSet(lang, specs.filtragem.includes("RO"));
              return (
                <div className="flex flex-col gap-[14px]"
                  ref={(el) => { sectionRefs.current["filtros"] = el; }}
                  onMouseEnter={() => setHoverSection("filtros")}
                  onMouseLeave={() => setHoverSection(null)}>
                  <SectionTitle>{lb.filtrosAltaPerformance}</SectionTitle>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#374151] leading-[20px] text-center">
                    {fs.description}
                  </p>
                  <ul className="flex flex-col gap-[6px] pl-[4px]">
                    {fs.bullets.map((b, i) => (
                      <li key={i} className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px] flex gap-[6px]">
                        <span className="shrink-0 mt-[3px] size-[5px] rounded-full bg-[#9ca3af] inline-block" />
                        <span>
                          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#1f2e91]">{b.bold}</span>
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Tabela de Benefícios toggle */}
                  <div className="border border-[#e8ecf4] rounded-[16px] overflow-hidden">
                    <button onClick={() => setFilterOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-[14px] py-[14px] bg-[#f6f9fe] hover:bg-[#eef2ff] transition-colors">
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">
                        {lb.tabelaBeneficios}
                      </span>
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                        className={`transition-transform duration-200 shrink-0 ${filterOpen ? "rotate-180" : ""}`}>
                        <path d="M1 1L7 7L13 1" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {filterOpen && (
                      <>
                        {fs.filters.map((f, i) => (
                          <div key={i} className="flex flex-col gap-[6px] px-[14px] py-[14px] border-t border-[#e8ecf4] bg-white">
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">{f.title}</p>
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px]">{f.desc}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            <Sep />

            {/* ── Garantias ───────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]"
              ref={(el) => { sectionRefs.current["garantias"] = el; }}
              onMouseEnter={() => setHoverSection("garantias")}
              onMouseLeave={() => setHoverSection(null)}>
              <SectionTitle>{lb.garantias}</SectionTitle>
              <div className="border border-[#e8ecf4] rounded-[16px] overflow-hidden">
                <div className="flex gap-[12px] items-start p-[16px] border-b border-[#e8ecf4]">
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: accentGrad }}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                      <path d="M9 1L1 4.5V9.5C1 14.1 4.5 18.3 9 19.5C13.5 18.3 17 14.1 17 9.5V4.5L9 1Z"
                        stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">
                      {lb.garantiaTitulo}
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px]">
                      {lb.garantiaDesc}
                    </p>
                  </div>
                </div>
                <div className="flex gap-[12px] items-start p-[16px]">
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: accentGrad }}>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                      <path d="M10 1C10 1 3 5 3 10.5C3 14 6.1 17 10 17C13.9 17 17 14 17 10.5C17 5 10 1 10 1Z"
                        stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M7 10.5L9 12.5L13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">
                      {lb.filtroVidaTitulo}
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px]">
                      {lb.filtroVidaDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Sep />

            {/* ── CEP ─────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]"
              ref={(el) => { sectionRefs.current["cep"] = el; }}
              onMouseEnter={() => setHoverSection("cep")}
              onMouseLeave={() => setHoverSection(null)}>
              <SectionTitle>{lb.cepTitle}</SectionTitle>
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[8px]">
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="00000-000"
                    maxLength={9}
                    value={fv.cep}
                    onChange={(e) => handleCEPChange(e.target.value)}
                    onBlur={() => touchField("cep")}
                    className={`flex-1 h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border transition-colors ${fieldError("cep") ? "border-[#ef4444]" : "border-[#e8ecf4] focus:border-[#0233c3]"}`}
                  />
                  <button
                    onClick={handleCalcularFrete}
                    disabled={freteResult?.state === "loading"}
                    className="h-[44px] px-[20px] rounded-[10px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white shrink-0 transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center gap-[6px]"
                    style={{ background: accentGrad }}>
                    {freteResult?.state === "loading" && (
                      <span className="size-[13px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {lb.calcular}
                  </button>
                </div>
                {fieldError("cep") && (
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                    <span>⚠</span> {fieldError("cep")}
                  </p>
                )}
                {freteResult?.state === "ok" && (
                  <div className="flex flex-col gap-[4px] pt-[2px]">
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#6b7280]">
                      {freteResult.city}, {freteResult.uf}
                    </p>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] flex items-center gap-[5px]" style={{ color: "#16a34a" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6.5" stroke="#16a34a" strokeWidth="1"/>
                        <path d="M4 7l2.5 2.5L10 4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {lb.freteGratis}
                    </p>
                  </div>
                )}
                {freteResult?.state === "err" && (
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                    <span>⚠</span> {freteResult.message}
                  </p>
                )}
              </div>
            </div>

            <Sep />

            {/* ── Form ────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]"
              ref={(el) => { sectionRefs.current["conta"] = el; }}
              onMouseEnter={() => setHoverSection("conta")}
              onMouseLeave={() => setHoverSection(null)}>
              <SectionTitle>{lb.detalhesContaTitle}</SectionTitle>
              <div className="flex flex-col gap-[10px]">

                {/* Nome */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="checkin-nome"
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                    {lb.nomeLabel}
                  </label>
                  <input id="checkin-nome" type="text" autoComplete="name"
                    value={fv.nome}
                    onChange={(e) => setField("nome", e.target.value)}
                    onBlur={() => touchField("nome")}
                    className={`h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border transition-colors ${fieldError("nome") ? "border-[#ef4444]" : "border-[#e8ecf4] focus:border-[#0233c3]"}`}
                  />
                  {fieldError("nome") && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                      <span>⚠</span> {fieldError("nome")}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="checkin-email"
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                    {lb.emailLabel}
                  </label>
                  <input id="checkin-email" type="email" autoComplete="email"
                    value={fv.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => touchField("email")}
                    className={`h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border transition-colors ${fieldError("email") ? "border-[#ef4444]" : "border-[#e8ecf4] focus:border-[#0233c3]"}`}
                  />
                  {fieldError("email") && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                      <span>⚠</span> {fieldError("email")}
                    </p>
                  )}
                </div>

                {/* Confirm Email */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="checkin-email2"
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                    {lb.email2Label}
                  </label>
                  <input id="checkin-email2" type="email" autoComplete="off"
                    value={fv.email2}
                    onChange={(e) => setField("email2", e.target.value)}
                    onBlur={() => touchField("email2")}
                    className={`h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border transition-colors ${fieldError("email2") ? "border-[#ef4444]" : "border-[#e8ecf4] focus:border-[#0233c3]"}`}
                  />
                  {fieldError("email2") && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                      <span>⚠</span> {fieldError("email2")}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="checkin-tel"
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                    {lb.telLabel}
                  </label>
                  <div className={`flex rounded-[10px] bg-[#f6f9fe] border overflow-visible transition-colors ${fieldError("tel") ? "border-[#ef4444]" : "border-[#e8ecf4] focus-within:border-[#0233c3]"}`}>
                    <div className="relative shrink-0">
                      <button type="button"
                        className="h-[44px] px-[10px] flex items-center gap-[5px] font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#1f2e91] border-r border-[#e8ecf4] bg-transparent rounded-l-[10px]"
                        onClick={() => setPhoneDropOpen((d) => !d)}>
                        <span className="text-[15px] leading-none">{PHONE_COUNTRIES[phoneCountryIdx].flag}</span>
                        <span>{PHONE_COUNTRIES[phoneCountryIdx].dial}</span>
                        <svg className="size-[9px] text-[#9ca3af] shrink-0" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {phoneDropOpen && (
                        <div ref={phoneDropRef} className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-[10px] border border-[#e8ecf4] shadow-lg z-30 w-[260px] flex flex-col overflow-hidden">
                          <div className="p-[8px] border-b border-[#e8ecf4]">
                            <input
                              autoFocus
                              type="text"
                              value={phoneSearch}
                              onChange={(e) => setPhoneSearch(e.target.value)}
                              placeholder={lb.buscarPais}
                              className="w-full h-[32px] px-[10px] rounded-[6px] bg-[#f6f9fe] border border-[#e8ecf4] font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none"
                            />
                          </div>
                          <div className="max-h-[220px] overflow-y-auto">
                            {PHONE_COUNTRIES
                              .map((c, i) => ({ c, i, localName: regionNames.of(c.code) ?? c.name }))
                              .filter(({ c, localName }) => !phoneSearch ||
                                localName.toLowerCase().includes(phoneSearch.toLowerCase()) ||
                                c.code.toLowerCase().includes(phoneSearch.toLowerCase()) ||
                                c.dial.includes(phoneSearch))
                              .map(({ c, i, localName }) => (
                                <button key={c.code} type="button"
                                  className={`w-full px-[12px] py-[8px] flex items-center gap-[8px] hover:bg-[#f6f9fe] transition-colors text-left ${i === phoneCountryIdx ? "bg-[#f0f4ff]" : ""}`}
                                  onClick={() => {
                                    setPhoneCountryIdx(i);
                                    setPhoneDropOpen(false);
                                    setPhoneSearch("");
                                    setField("tel", "");
                                    setFt((t) => ({ ...t, tel: false }));
                                  }}>
                                  <span className="text-[16px] leading-none shrink-0">{c.flag}</span>
                                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#1f2e91] flex-1 truncate text-left">{localName}</span>
                                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] text-[#6b7280] shrink-0">{c.dial}</span>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <input id="checkin-tel" type="tel"
                      placeholder={PHONE_COUNTRIES[phoneCountryIdx].placeholder}
                      value={fv.tel}
                      onChange={(e) => handleTelChange(e.target.value)}
                      onBlur={() => touchField("tel")}
                      className="flex-1 h-[44px] px-[12px] min-w-0 bg-transparent font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none"
                    />
                  </div>
                  {fieldError("tel") && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                      <span>⚠</span> {fieldError("tel")}
                    </p>
                  )}
                </div>

              </div>
              <div className="flex flex-col gap-[10px]">
                {/* Consent checkbox */}
                <div className="flex items-start gap-[10px] cursor-pointer select-none" onClick={() => setConsentChecked(v => !v)}>
                  <div className={`shrink-0 size-[18px] mt-[1px] rounded-[5px] border-2 flex items-center justify-center transition-colors ${consentChecked ? "border-[#0233c3] bg-[#0233c3]" : "border-[#d1d5db] bg-white"}`}>
                    {consentChecked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#9ca3af] leading-[18px]">
                    {lb.consentText}
                  </p>
                </div>
                {/* Terms checkbox */}
                <div className="flex items-center gap-[10px] select-none">
                  <div className={`shrink-0 size-[18px] rounded-[5px] border-2 flex items-center justify-center transition-colors cursor-pointer ${termsChecked ? "border-[#0233c3] bg-[#0233c3]" : "border-[#d1d5db] bg-white"}`} onClick={() => setTermsChecked(v => !v)}>
                    {termsChecked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#9ca3af] leading-[18px]">
                    {lb.liAceito}{" "}
                    <button
                      type="button"
                      onClick={() => setTermsOpen(true)}
                      className="underline text-[#0233c3] hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      {lb.termosDeUso}
                    </button>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[12px]" />
          </div>
        </div>

        {/* ── Terms of use modal ─────────────────────────────────────────── */}
        {termsOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-[20px]"
            style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setTermsOpen(false); }}
          >
            <div className="bg-white rounded-[24px] w-full max-w-[680px] h-[80vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#e8ecf4] shrink-0">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">{lb.termosModalTitulo}</span>
                <button
                  onClick={() => setTermsOpen(false)}
                  className="size-[32px] rounded-full flex items-center justify-center hover:bg-[#f6f9fe] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <iframe
                src="/termos-de-uso"
                className="flex-1 border-0 w-full"
                title={lb.termosIframe}
              />
            </div>
          </div>
        )}

        {/* ── Order confirmation modal ───────────────────────────────────── */}
        {orderConfirmOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-[20px]"
            style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setOrderConfirmOpen(false); }}
          >
            <div className="bg-white rounded-[24px] w-full max-w-[420px] overflow-hidden shadow-2xl">
              {/* Header */}
              <div
                className="px-[32px] pt-[32px] pb-[28px] flex flex-col items-center gap-[14px]"
                style={{ background: "linear-gradient(160deg, #eef2ff 0%, #f0eeff 100%)" }}
              >
                <div
                  className="size-[60px] rounded-full flex items-center justify-center"
                  style={{ background: accentGrad }}
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M5 13l6 6L21 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                  <p className="font-['Avenir_LT_Pro:95_Black'] text-[20px] text-[#1f2e91] text-center">{lb.adicionadoCarrinho}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#6b7280] text-center">
                    {activeVariant.name} · {formatPrice(activeVariant.price, lang)}
                  </p>
                </div>
              </div>
              {/* Cart items with images */}
              {cart.length > 0 && (
                <div className="px-[24px] py-[14px] border-b border-[#e8ecf4] flex flex-col gap-[10px] max-h-[220px] overflow-y-auto">
                  {cart.map(item => {
                    let variantName = item.id;
                    let variantImg = PRODUCT_IMAGES[item.id] ?? "";
                    for (const fam of CHECKIN_FAMILIES) {
                      const v = fam.variants.find(v => v.id === item.id);
                      if (v) { variantName = v.name; variantImg = v.img || variantImg; break; }
                    }
                    const price = PRODUCT_PRICES_BRL[item.id] ?? 0;
                    return (
                      <div key={item.id} className="flex items-center gap-[12px]">
                        {variantImg && (
                          <div className="size-[52px] rounded-[10px] bg-[#f6f9fe] shrink-0 overflow-hidden flex items-center justify-center">
                            <img src={variantImg} alt={variantName} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
                          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91] truncate">
                            {variantName}{item.qty > 1 ? ` × ${item.qty}` : ""}
                          </span>
                          <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280]">
                            {formatPrice(price * item.qty, lang)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-[8px] border-t border-[#e8ecf4]">
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#9ca3af] uppercase tracking-[0.05em]">{lb.totalLabel}</span>
                    <span className="font-['Avenir_LT_Pro:95_Black'] text-[16px] leading-none" style={{ background: accentGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {formatPrice(cart.reduce((sum, i) => sum + (PRODUCT_PRICES_BRL[i.id] ?? 0) * i.qty, 0), lang)}
                    </span>
                  </div>
                </div>
              )}
              {/* Actions */}
              <div className="px-[24px] py-[24px] flex flex-col gap-[12px]">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#9ca3af] uppercase tracking-[0.06em] text-center">{lb.precisaMaisAlgo}</p>
                <div className="grid grid-cols-2 gap-[10px]">
                  <a
                    href="/compare"
                    className="h-[46px] rounded-[12px] border border-[#e8ecf4] flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91] hover:bg-[#f6f9fe] transition-colors text-center px-[8px]"
                  >
                    {lb.compareProdutos}
                  </a>
                  <a
                    href="/acquafy-media"
                    className="h-[46px] rounded-[12px] border border-[#e8ecf4] flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91] hover:bg-[#f6f9fe] transition-colors text-center px-[8px]"
                  >
                    {lb.acquafyMedia}
                  </a>
                  <a
                    href="/seja-um-parceiro"
                    className="h-[46px] rounded-[12px] border border-[#e8ecf4] flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91] hover:bg-[#f6f9fe] transition-colors text-center px-[8px]"
                  >
                    {lb.sejaUmParceiro}
                  </a>
                  <a
                    href="/buy"
                    className="h-[46px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white transition-opacity hover:opacity-90"
                    style={{ background: accentGrad }}
                  >
                    {lb.comprarOutro}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Sticky bottom bar ──────────────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-[#e8ecf4] bg-white px-[24px] py-[16px] flex items-center gap-[12px]">
          <div className="flex-1 flex flex-col gap-[2px] min-w-0">
            <span
              className="font-['Avenir_LT_Pro:95_Black'] text-[26px] leading-none"
              style={{ background: accentGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {lang === "pt" && payTab === "financiar"
                ? `${formatPrice(monthlyPrice(activeVariant.price), lang)}/mês`
                : formatPrice(activeVariant.price, lang)}
            </span>
            <span className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#9ca3af] truncate">
              {payTab === "financiar" ? lb.semJuros : ""}{activeVariant.name}
            </span>
          </div>
          <button
            onClick={() => {
              if (!isFormValid) {
                touchField("cep"); touchField("nome"); touchField("email"); touchField("email2"); touchField("tel");
                return;
              }
              addToCart(activeVariant.id, activeVariant.name, true);
              setOrderConfirmOpen(true);
            }}
            className="h-[48px] px-[28px] rounded-[14px] font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ background: accentGrad, opacity: isFormValid ? 1 : 0.5 }}
          >
            {lb.encomendar}
          </button>
        </div>
      </div>
    </div>
  );
}
