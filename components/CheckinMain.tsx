"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { PRODUCT_PRICES_BRL, PRODUCT_IMAGES } from "@/lib/products";
import { useLang, type Lang } from "@/context/LanguageContext";

/* ─── Countdown ──────────────────────────────────────────────────────────── */
function useCountdown(startSeconds = 600) {
  const [secs, setSecs] = useState(startSeconds);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* ─── Brazilian states ───────────────────────────────────────────────────── */
const BR_STATES = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
];

/* ─── Products ───────────────────────────────────────────────────────────── */
type Product = {
  id: string;
  img: string;
  name: string;
  sub: string;
  tank: string;
  price: number;
  badge?: string;
  gas?: boolean;
  h2?: boolean;
};

type ProductGroup = {
  linha: "Essentials" | "Premium";
  formato: string;
  products: Product[];
};

const PRODUCT_GROUPS: ProductGroup[] = [
  {
    linha: "Essentials",
    formato: "Bancada",
    products: [
      { id: "neo-up",               img: "/figma-assets/neo-up-catalog.webp",      name: "Neo UP",              sub: "Apenas Natural",        tank: "—",            price: 1490 },
      { id: "neo-fit",              img: "/figma-assets/neo-fit.webp",             name: "Neo FIT",             sub: "6 em 1",                tank: "Tanque 400ml", price: 1990, badge: "Mais Vendido" },
      { id: "neo-touch",            img: "/figma-assets/neo-touch.webp",           name: "Neo TOUCH",           sub: "6 em 1",                tank: "Tanque 800ml", price: 2990 },
      { id: "neo-plus",             img: "/figma-assets/neo-plus.webp",            name: "Neo PLUS",            sub: "6 em 1",                tank: "Tanque 1500ml",price: 3490 },
      { id: "neo-smart-h2",         img: "/figma-assets/neo-smart-h2.webp",        name: "Neo SMART H₂",        sub: "7 em 1 + Hidrogenada",  tank: "Tanque 800ml", price: 2490, h2: true },
      { id: "neo-ultra",            img: "/figma-assets/neo-ultra.webp",           name: "Neo ULTRA",           sub: "6 em 1",                tank: "Tanque 3L",    price: 3990 },
      { id: "neo-ultra-spark",      img: "/figma-assets/neo-ultra-spark.webp",     name: "Neo ULTRA SPARK",     sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 4490, gas: true },
      { id: "neo-ultra-spark-h2",   img: "/figma-assets/neo-ultra-spark-h2.webp",  name: "Neo ULTRA SPARK H₂",  sub: "8 em 1 + Gás + H₂",    tank: "Tanque 3L",    price: 4990, gas: true, h2: true },
    ],
  },
  {
    linha: "Essentials",
    formato: "Coluna",
    products: [
      { id: "neo-max",              img: "/figma-assets/neo-max.webp",             name: "Neo MAX",             sub: "6 em 1",                tank: "Tanque 3L",    price: 4990 },
      { id: "neo-max-spark",        img: "/figma-assets/neo-max-spark.webp",       name: "Neo MAX SPARK",       sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 5490, gas: true },
      { id: "neo-max-spark-h2",     img: "/figma-assets/neo-max-spark-h2.webp",    name: "Neo MAX SPARK H₂",    sub: "8 em 1 + Gás + H₂",    tank: "Tanque 3L",    price: 5990, gas: true, h2: true },
    ],
  },
  {
    linha: "Premium",
    formato: "Bancada",
    products: [
      { id: "neo-infinity",         img: PRODUCT_IMAGES["neo-infinity"],         name: "Neo INFINITY",        sub: "6 em 1 · IPS 15.6″",    tank: "Tanque 3L",    price: 6990 },
      { id: "neo-infinity-spark",   img: PRODUCT_IMAGES["neo-infinity-spark"],   name: "Neo INFINITY SPARK",  sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 7490, gas: true },
      { id: "neo-infinity-spark-h2",img: PRODUCT_IMAGES["neo-infinity-spark-h2"],name: "Neo INFINITY SPARK H₂",sub: "8 em 1 + Gás + H₂",   tank: "Tanque 3L",    price: 7990, gas: true, h2: true },
      { id: "neo-prime",            img: PRODUCT_IMAGES["neo-prime"],            name: "Neo PRIME",           sub: "6 em 1",                tank: "Tanque 3L",    price: 7990 },
      { id: "neo-prime-spark",      img: PRODUCT_IMAGES["neo-prime-spark"],      name: "Neo PRIME SPARK",     sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 8490, gas: true },
      { id: "neo-prime-spark-h2",   img: PRODUCT_IMAGES["neo-prime-spark-h2"],   name: "Neo PRIME SPARK H₂",  sub: "8 em 1 + Gás + H₂",    tank: "Tanque 3L",    price: 8990, gas: true, h2: true },
    ],
  },
  {
    linha: "Premium",
    formato: "Embutido",
    products: [
      { id: "neo-prestige",         img: PRODUCT_IMAGES["neo-prestige"],         name: "Neo PRESTIGE",        sub: "6 em 1 · Aço inox",     tank: "Tanque 3L",    price: 7490 },
      { id: "neo-prestige-spark",   img: PRODUCT_IMAGES["neo-prestige-spark"],   name: "Neo PRESTIGE SPARK",  sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 7990, gas: true },
      { id: "neo-prestige-spark-h2",img: PRODUCT_IMAGES["neo-prestige-spark-h2"],name: "Neo PRESTIGE SPARK H₂",sub: "8 em 1 + Gás + H₂",   tank: "Tanque 3L",    price: 8490, gas: true, h2: true },
    ],
  },
];

const ALL_PRODUCTS: Product[] = PRODUCT_GROUPS.flatMap((g) => g.products).map((p) => ({
  ...p,
  price: PRODUCT_PRICES_BRL[p.id] ?? p.price,
}));

const FILTER_TAGS_PT = ["Todos", "Essentials", "Premium", "Bancada", "Coluna", "Embutido", "Água com Gás", "Água Hidrogenada"];

/* ─── Upsell ─────────────────────────────────────────────────────────────── */
type KitId = "essentials" | "premium";

type CheckinT = {
  filterTags: string[];
  steps: string[];
  secureLabel: string;
  step1Title: string; step1Sub: string;
  selectAtLeast: string;
  continueBtn: string; continueBtnWith: string; continueBtnSufSg: string; continueBtnSufPl: string;
  step2Title: string; step2Sub: string;
  deliveryAddr: string;
  labelNome: string; phNome: string;
  labelEmail: string; phEmail: string;
  labelTelefone: string;
  labelCep: string;
  labelRua: string; phRua: string;
  labelNumero: string;
  labelComplemento: string; phComplemento: string;
  labelBairro: string; phBairro: string;
  labelCidade: string; phCidade: string;
  labelEstado: string;
  step3Title: string; step3Sub: string;
  free: string;
  step4Title: string; step4Sub: string;
  save: string; addBtn: string;
  continuePay: string;
  termsText1: string; termsAnd: string; termsText2: string;
  step5Title: string; step5Sub: string;
  payCard: string; payPix: string; payBoleto: string;
  labelCardNum: string;
  labelExpiry: string;
  labelCvc: string;
  labelNameOnCard: string; phNameOnCard: string;
  pixTitle: string; pixDesc: string;
  boletoTitle: string; boletoDesc: string;
  finalizeBtn: string;
  summaryTitle: string;
  noModelSelected: string;
  remove: string;
  subtotalLabel: string; prodSg: string; prodPl: string;
  shippingLabel: string; totalLabel: string;
  stockWarning: string;
  reservedPre: string; reservedSuf: string;
  trustItems: { label: string; desc: string }[];
  reviewsTitle: string;
  reviewsSub: string;
  reviewRoles: string[];
  reviewQuotes: string[];
  successTitle: string;
  successMsgPre: string; successMsgSuf: string; successEmailFallback: string;
  backToSite: string;
  kits: { name: string; desc: string }[];
  shipping: { label: string; desc: string }[];
  errors: {
    nome: string; email: string; telefone: string; telefoneInvalid: string;
    cep: string; cepInvalid: string; rua: string; numero: string;
    bairro: string; cidade: string; uf: string;
    cardNumber: string; expiry: string; cvc: string; nameOnCard: string;
  };
};

const T: Record<Lang, CheckinT> = {
  pt: {
    filterTags: ["Todos", "Essentials", "Premium", "Bancada", "Coluna", "Embutido", "Água com Gás", "Água Hidrogenada"],
    steps: ["Modelo", "Dados", "Frete", "Adicional", "Pagamento"],
    secureLabel: "CHECKIN SEGURO",
    step1Title: "Escolha o seu modelo", step1Sub: "Você pode selecionar mais de um produto.",
    selectAtLeast: "Selecione ao menos um modelo para continuar.",
    continueBtn: "CONTINUAR →", continueBtnWith: "CONTINUAR COM ", continueBtnSufSg: " PRODUTO →", continueBtnSufPl: " PRODUTOS →",
    step2Title: "Dados pessoais", step2Sub: "Usaremos estas informações para enviar o seu pedido.",
    deliveryAddr: "Endereço de entrega",
    labelNome: "Nome completo", phNome: "Seu nome completo",
    labelEmail: "E-mail", phEmail: "seuemail@email.com",
    labelTelefone: "Telefone / WhatsApp",
    labelCep: "CEP",
    labelRua: "Rua / Avenida", phRua: "Rua das Águas Claras",
    labelNumero: "Número",
    labelComplemento: "Complemento", phComplemento: "Apto, sala, bloco...",
    labelBairro: "Bairro", phBairro: "Seu bairro",
    labelCidade: "Cidade", phCidade: "Sua cidade",
    labelEstado: "Estado",
    step3Title: "Opção de entrega", step3Sub: "Escolha como prefere receber o seu pedido.",
    free: "GRÁTIS",
    step4Title: "Adicione ao pedido", step4Sub: "Economize e garanta sua água pura por mais tempo.",
    save: "Economize", addBtn: "Adicionar",
    continuePay: "CONTINUAR PARA PAGAMENTO →",
    termsText1: "Ao prosseguir, você concorda com os nossos", termsAnd: "e", termsText2: ".",
    step5Title: "Forma de pagamento", step5Sub: "Todas as transações são seguras e criptografadas.",
    payCard: "Cartão de Crédito", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Número do cartão",
    labelExpiry: "Validade (MM/AA)",
    labelCvc: "CVV",
    labelNameOnCard: "Nome no cartão", phNameOnCard: "Nome como impresso no cartão",
    pixTitle: "Como funciona o PIX", pixDesc: "Após confirmar o pedido, você receberá um QR Code e a chave PIX por e-mail. O pagamento é aprovado em segundos.",
    boletoTitle: "Como funciona o Boleto", boletoDesc: "O boleto será enviado para o seu e-mail. A confirmação pode levar até 3 dias úteis após o pagamento.",
    finalizeBtn: "FINALIZAR PEDIDO",
    summaryTitle: "Resumo do pedido",
    noModelSelected: "Nenhum modelo selecionado",
    remove: "Remover",
    subtotalLabel: "Subtotal", prodSg: " produto", prodPl: " produtos",
    shippingLabel: "Frete", totalLabel: "Total",
    stockWarning: "Apenas 8 unidades em estoque!",
    reservedPre: "Seu pedido está reservado por ", reservedSuf: "",
    trustItems: [
      { label: "Compra 100% segura",              desc: "Pagamento criptografado e protegido." },
      { label: "Frete grátis para todo o Brasil", desc: "Entrega sem custo para qualquer estado." },
      { label: "Garantia de 1 ano",               desc: "Cobertura total sem burocracia" },
      { label: "Suporte especializado",           desc: "Atendimento com especialistas Acquafy" },
    ],
    reviewsTitle: "O que dizem nossos clientes",
    reviewsSub: "mais de 3.200 clientes satisfeitos",
    reviewRoles: ["Cliente", "Empresário", "Consumidora"],
    reviewQuotes: [
      "\"A qualidade da água mudou completamente. O Neo PLUS é incrível — minha família adora a água hidrogenada!\"",
      "\"Comprei o Neo INFINITY para o escritório. O painel touch de 15\" impressiona todo mundo. Suporte impecável.\"",
      "\"Instalação rápida, água gelada na hora. O app é muito prático para acompanhar a vida dos filtros.\"",
    ],
    successTitle: "Pedido confirmado!",
    successMsgPre: "Obrigado pela sua compra. Um e-mail de confirmação será enviado para",
    successMsgSuf: ".", successEmailFallback: "seu e-mail",
    backToSite: "← Voltar ao site",
    kits: [
      { name: "Kit de Filtros Essentials (1 ano)", desc: "Filtros UF — compatível com toda a linha Neo Essentials. 12 meses sem se preocupar com reposição." },
      { name: "Kit de Filtros Premium (1 ano)",    desc: "Filtros RO/Osmose Reversa — compatível com toda a linha Neo Premium. Filtros de alta performance para sistemas avançados." },
    ],
    shipping: [
      { label: "Frete Grátis",    desc: "Entrega padrão — 5 a 7 dias úteis" },
      { label: "Entrega Expressa", desc: "Chegada em 2 a 3 dias úteis" },
    ],
    errors: {
      nome: "Nome completo é obrigatório", email: "E-mail é obrigatório",
      telefone: "Telefone é obrigatório", telefoneInvalid: "Telefone inválido (DDD + número)",
      cep: "CEP é obrigatório", cepInvalid: "CEP inválido",
      rua: "Rua é obrigatória", numero: "Número é obrigatório",
      bairro: "Bairro é obrigatório", cidade: "Cidade é obrigatória", uf: "Estado é obrigatório",
      cardNumber: "Número do cartão é obrigatório", expiry: "Validade é obrigatória",
      cvc: "CVV é obrigatório", nameOnCard: "Nome no cartão é obrigatório",
    },
  },
  "pt-pt": {
    filterTags: ["Todos", "Essentials", "Premium", "Bancada", "Coluna", "Embutido", "Água com Gás", "Água Hidrogenada"],
    steps: ["Modelo", "Dados", "Envio", "Adicional", "Pagamento"],
    secureLabel: "CHECKOUT SEGURO",
    step1Title: "Escolha o seu modelo", step1Sub: "Pode selecionar mais de um produto.",
    selectAtLeast: "Selecione pelo menos um modelo para continuar.",
    continueBtn: "CONTINUAR →", continueBtnWith: "CONTINUAR COM ", continueBtnSufSg: " PRODUTO →", continueBtnSufPl: " PRODUTOS →",
    step2Title: "Dados pessoais", step2Sub: "Utilizaremos estas informações para enviar a sua encomenda.",
    deliveryAddr: "Morada de entrega",
    labelNome: "Nome completo", phNome: "O seu nome completo",
    labelEmail: "E-mail", phEmail: "seuemail@email.com",
    labelTelefone: "Telefone / WhatsApp",
    labelCep: "Código Postal",
    labelRua: "Rua / Avenida", phRua: "Rua das Águas Claras",
    labelNumero: "Número",
    labelComplemento: "Complemento", phComplemento: "Andar, frações, bloco...",
    labelBairro: "Freguesia", phBairro: "A sua freguesia",
    labelCidade: "Cidade", phCidade: "A sua cidade",
    labelEstado: "Distrito",
    step3Title: "Opção de envio", step3Sub: "Escolha como prefere receber a sua encomenda.",
    free: "GRÁTIS",
    step4Title: "Adicione à encomenda", step4Sub: "Poupe e garanta a sua água pura por mais tempo.",
    save: "Poupe", addBtn: "Adicionar",
    continuePay: "CONTINUAR PARA PAGAMENTO →",
    termsText1: "Ao prosseguir, concorda com os nossos", termsAnd: "e", termsText2: ".",
    step5Title: "Forma de pagamento", step5Sub: "Todas as transações são seguras e encriptadas.",
    payCard: "Cartão de Crédito", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Número do cartão",
    labelExpiry: "Validade (MM/AA)",
    labelCvc: "CVV",
    labelNameOnCard: "Nome no cartão", phNameOnCard: "Nome como impresso no cartão",
    pixTitle: "Como funciona o PIX", pixDesc: "Após confirmar a encomenda, receberá um QR Code e a chave PIX por e-mail. O pagamento é aprovado em segundos.",
    boletoTitle: "Como funciona o Boleto", boletoDesc: "O boleto será enviado para o seu e-mail. A confirmação pode demorar até 3 dias úteis após o pagamento.",
    finalizeBtn: "FINALIZAR ENCOMENDA",
    summaryTitle: "Resumo da encomenda",
    noModelSelected: "Nenhum modelo selecionado",
    remove: "Remover",
    subtotalLabel: "Subtotal", prodSg: " produto", prodPl: " produtos",
    shippingLabel: "Envio", totalLabel: "Total",
    stockWarning: "Apenas 8 unidades em stock!",
    reservedPre: "A sua encomenda está reservada por ", reservedSuf: "",
    trustItems: [
      { label: "Compra 100% segura",              desc: "Pagamento encriptado e protegido." },
      { label: "Envio grátis para todo o Brasil", desc: "Entrega sem custo para qualquer estado." },
      { label: "Garantia de 1 ano",               desc: "Cobertura total sem burocracia" },
      { label: "Suporte especializado",           desc: "Atendimento com especialistas Acquafy" },
    ],
    reviewsTitle: "O que dizem os nossos clientes",
    reviewsSub: "mais de 3.200 clientes satisfeitos",
    reviewRoles: ["Cliente", "Empresário", "Consumidora"],
    reviewQuotes: [
      "\"A qualidade da água mudou completamente. O Neo PLUS é incrível — a minha família adora a água hidrogenada!\"",
      "\"Comprei o Neo INFINITY para o escritório. O painel touch de 15\" impressiona toda a gente. Suporte impecável.\"",
      "\"Instalação rápida, água gelada na hora. A aplicação é muito prática para acompanhar a vida dos filtros.\"",
    ],
    successTitle: "Encomenda confirmada!",
    successMsgPre: "Obrigado pela sua compra. Um e-mail de confirmação será enviado para",
    successMsgSuf: ".", successEmailFallback: "o seu e-mail",
    backToSite: "← Voltar ao site",
    kits: [
      { name: "Kit de Filtros Essentials (1 ano)", desc: "Filtros UF — compatível com toda a linha Neo Essentials. 12 meses sem se preocupar com a reposição." },
      { name: "Kit de Filtros Premium (1 ano)",    desc: "Filtros RO/Osmose Inversa — compatível com toda a linha Neo Premium. Filtros de alta performance para sistemas avançados." },
    ],
    shipping: [
      { label: "Envio Grátis",     desc: "Entrega standard — 5 a 7 dias úteis" },
      { label: "Entrega Expresso", desc: "Chegada em 2 a 3 dias úteis" },
    ],
    errors: {
      nome: "Nome completo é obrigatório", email: "E-mail é obrigatório",
      telefone: "Telefone é obrigatório", telefoneInvalid: "Telefone inválido (indicativo + número)",
      cep: "Código postal é obrigatório", cepInvalid: "Código postal inválido",
      rua: "Rua é obrigatória", numero: "Número é obrigatório",
      bairro: "Freguesia é obrigatória", cidade: "Cidade é obrigatória", uf: "Distrito é obrigatório",
      cardNumber: "Número do cartão é obrigatório", expiry: "Validade é obrigatória",
      cvc: "CVV é obrigatório", nameOnCard: "Nome no cartão é obrigatório",
    },
  },
  en: {
    filterTags: ["All", "Essentials", "Premium", "Countertop", "Floor Stand", "Built-in", "Sparkling Water", "Hydrogen Water"],
    steps: ["Model", "Info", "Shipping", "Add-ons", "Payment"],
    secureLabel: "SECURE CHECKOUT",
    step1Title: "Choose Your Model", step1Sub: "You can select more than one product.",
    selectAtLeast: "Select at least one model to continue.",
    continueBtn: "CONTINUE →", continueBtnWith: "CONTINUE WITH ", continueBtnSufSg: " ITEM →", continueBtnSufPl: " ITEMS →",
    step2Title: "Personal Information", step2Sub: "We will use this information to ship your order.",
    deliveryAddr: "Delivery Address",
    labelNome: "Full Name", phNome: "Your full name",
    labelEmail: "E-mail", phEmail: "youremail@email.com",
    labelTelefone: "Phone / WhatsApp",
    labelCep: "ZIP Code",
    labelRua: "Street / Avenue", phRua: "123 Main Street",
    labelNumero: "Number",
    labelComplemento: "Apt, Suite, etc.", phComplemento: "Apt, suite, block...",
    labelBairro: "Neighborhood", phBairro: "Your neighborhood",
    labelCidade: "City", phCidade: "Your city",
    labelEstado: "State",
    step3Title: "Delivery Option", step3Sub: "Choose how you prefer to receive your order.",
    free: "FREE",
    step4Title: "Add to Order", step4Sub: "Save and ensure your pure water for longer.",
    save: "Save", addBtn: "Add",
    continuePay: "CONTINUE TO PAYMENT →",
    termsText1: "By proceeding, you agree to our", termsAnd: "and", termsText2: ".",
    step5Title: "Payment Method", step5Sub: "All transactions are secure and encrypted.",
    payCard: "Credit Card", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Card Number",
    labelExpiry: "Expiry (MM/YY)",
    labelCvc: "CVV",
    labelNameOnCard: "Name on Card", phNameOnCard: "Name as printed on card",
    pixTitle: "How PIX works", pixDesc: "After confirming the order, you will receive a QR Code and the PIX key by email. Payment is approved in seconds.",
    boletoTitle: "How Boleto works", boletoDesc: "The bank slip will be sent to your email. Confirmation may take up to 3 business days after payment.",
    finalizeBtn: "PLACE ORDER",
    summaryTitle: "Order Summary",
    noModelSelected: "No model selected",
    remove: "Remove",
    subtotalLabel: "Subtotal", prodSg: " item", prodPl: " items",
    shippingLabel: "Shipping", totalLabel: "Total",
    stockWarning: "Only 8 units in stock!",
    reservedPre: "Your order is reserved for ", reservedSuf: "",
    trustItems: [
      { label: "100% Secure Purchase",      desc: "Encrypted and protected payment." },
      { label: "Free Shipping Nationwide",   desc: "No cost delivery to any state." },
      { label: "1-Year Warranty",            desc: "Full coverage without hassle" },
      { label: "Specialized Support",        desc: "Service by Acquafy specialists" },
    ],
    reviewsTitle: "What Our Customers Say",
    reviewsSub: "over 3,200 satisfied customers",
    reviewRoles: ["Customer", "Business Owner", "Consumer"],
    reviewQuotes: [
      "\"The water quality changed completely. The Neo PLUS is incredible — my family loves the hydrogen water!\"",
      "\"I bought the Neo INFINITY for the office. The 15\" touch panel impresses everyone. Impeccable support.\"",
      "\"Quick installation, cold water right away. The app is very practical for tracking filter life.\"",
    ],
    successTitle: "Order confirmed!",
    successMsgPre: "Thank you for your purchase. A confirmation email will be sent to",
    successMsgSuf: ".", successEmailFallback: "your email",
    backToSite: "← Back to Site",
    kits: [
      { name: "Essentials Filter Kit (1 year)", desc: "UF Filters — compatible with the entire Neo Essentials line. 12 months without worrying about replacement." },
      { name: "Premium Filter Kit (1 year)",    desc: "RO/Reverse Osmosis Filters — compatible with the entire Neo Premium line. High-performance filters for advanced systems." },
    ],
    shipping: [
      { label: "Free Shipping",    desc: "Standard delivery — 5 to 7 business days" },
      { label: "Express Delivery", desc: "Arrives in 2 to 3 business days" },
    ],
    errors: {
      nome: "Full name is required", email: "Email is required",
      telefone: "Phone is required", telefoneInvalid: "Invalid phone (area code + number)",
      cep: "ZIP code is required", cepInvalid: "Invalid ZIP code",
      rua: "Street is required", numero: "Number is required",
      bairro: "Neighborhood is required", cidade: "City is required", uf: "State is required",
      cardNumber: "Card number is required", expiry: "Expiry date is required",
      cvc: "CVV is required", nameOnCard: "Name on card is required",
    },
  },
  es: {
    filterTags: ["Todos", "Essentials", "Premium", "Encimera", "Columna", "Empotrado", "Agua con Gas", "Agua Hidrogenada"],
    steps: ["Modelo", "Datos", "Envío", "Adicional", "Pago"],
    secureLabel: "PAGO SEGURO",
    step1Title: "Elige tu Modelo", step1Sub: "Puedes seleccionar más de un producto.",
    selectAtLeast: "Selecciona al menos un modelo para continuar.",
    continueBtn: "CONTINUAR →", continueBtnWith: "CONTINUAR CON ", continueBtnSufSg: " ARTÍCULO →", continueBtnSufPl: " ARTÍCULOS →",
    step2Title: "Datos Personales", step2Sub: "Usaremos esta información para enviar tu pedido.",
    deliveryAddr: "Dirección de Entrega",
    labelNome: "Nombre Completo", phNome: "Tu nombre completo",
    labelEmail: "E-mail", phEmail: "tuemail@email.com",
    labelTelefone: "Teléfono / WhatsApp",
    labelCep: "Código Postal",
    labelRua: "Calle / Avenida", phRua: "Calle Principal 123",
    labelNumero: "Número",
    labelComplemento: "Apto, Suite, etc.", phComplemento: "Apto, suite, bloque...",
    labelBairro: "Barrio", phBairro: "Tu barrio",
    labelCidade: "Ciudad", phCidade: "Tu ciudad",
    labelEstado: "Estado",
    step3Title: "Opción de Entrega", step3Sub: "Elige cómo prefieres recibir tu pedido.",
    free: "GRATIS",
    step4Title: "Añade al Pedido", step4Sub: "Ahorra y garantiza tu agua pura por más tiempo.",
    save: "Ahorra", addBtn: "Agregar",
    continuePay: "CONTINUAR AL PAGO →",
    termsText1: "Al continuar, aceptas nuestros", termsAnd: "y", termsText2: ".",
    step5Title: "Método de Pago", step5Sub: "Todas las transacciones son seguras y cifradas.",
    payCard: "Tarjeta de Crédito", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Número de Tarjeta",
    labelExpiry: "Vencimiento (MM/AA)",
    labelCvc: "CVV",
    labelNameOnCard: "Nombre en la Tarjeta", phNameOnCard: "Nombre tal como aparece en la tarjeta",
    pixTitle: "Cómo funciona el PIX", pixDesc: "Tras confirmar el pedido, recibirás un QR Code y la clave PIX por email. El pago se aprueba en segundos.",
    boletoTitle: "Cómo funciona el Boleto", boletoDesc: "El comprobante de pago se enviará a tu email. La confirmación puede tardar hasta 3 días hábiles.",
    finalizeBtn: "FINALIZAR PEDIDO",
    summaryTitle: "Resumen del Pedido",
    noModelSelected: "Ningún modelo seleccionado",
    remove: "Eliminar",
    subtotalLabel: "Subtotal", prodSg: " artículo", prodPl: " artículos",
    shippingLabel: "Envío", totalLabel: "Total",
    stockWarning: "¡Solo 8 unidades en stock!",
    reservedPre: "Tu pedido está reservado por ", reservedSuf: "",
    trustItems: [
      { label: "Compra 100% Segura",      desc: "Pago cifrado y protegido." },
      { label: "Envío Gratis a Todo Brasil", desc: "Entrega sin costo a cualquier estado." },
      { label: "Garantía de 1 Año",        desc: "Cobertura total sin burocracia" },
      { label: "Soporte Especializado",    desc: "Atención con especialistas Acquafy" },
    ],
    reviewsTitle: "Lo que dicen nuestros clientes",
    reviewsSub: "más de 3.200 clientes satisfechos",
    reviewRoles: ["Cliente", "Empresario", "Consumidora"],
    reviewQuotes: [
      "\"La calidad del agua cambió por completo. El Neo PLUS es increíble — ¡a mi familia le encanta el agua hidrogenada!\"",
      "\"Compré el Neo INFINITY para la oficina. El panel táctil de 15\" impresiona a todos. Soporte impecable.\"",
      "\"Instalación rápida, agua fría al instante. La app es muy práctica para seguir la vida de los filtros.\"",
    ],
    successTitle: "¡Pedido confirmado!",
    successMsgPre: "Gracias por tu compra. Se enviará un correo de confirmación a",
    successMsgSuf: ".", successEmailFallback: "tu correo electrónico",
    backToSite: "← Volver al Sitio",
    kits: [
      { name: "Kit de Filtros Essentials (1 año)", desc: "Filtros UF — compatible con toda la línea Neo Essentials. 12 meses sin preocuparte por la reposición." },
      { name: "Kit de Filtros Premium (1 año)",    desc: "Filtros RO/Ósmosis Inversa — compatible con toda la línea Neo Premium. Filtros de alto rendimiento para sistemas avanzados." },
    ],
    shipping: [
      { label: "Envío Gratis",    desc: "Envío estándar — 5 a 7 días hábiles" },
      { label: "Envío Exprés",    desc: "Llegada en 2 a 3 días hábiles" },
    ],
    errors: {
      nome: "El nombre completo es obligatorio", email: "El correo electrónico es obligatorio",
      telefone: "El teléfono es obligatorio", telefoneInvalid: "Teléfono inválido (código de área + número)",
      cep: "El código postal es obligatorio", cepInvalid: "Código postal inválido",
      rua: "La calle es obligatoria", numero: "El número es obligatorio",
      bairro: "El barrio es obligatorio", cidade: "La ciudad es obligatoria", uf: "El estado es obligatorio",
      cardNumber: "El número de tarjeta es obligatorio", expiry: "La fecha de vencimiento es obligatoria",
      cvc: "El CVV es obligatorio", nameOnCard: "El nombre en la tarjeta es obligatorio",
    },
  },
  fr: {
    filterTags: ["Tous", "Essentials", "Premium", "Plan de travail", "Colonne", "Encastré", "Eau pétillante", "Eau hydrogénée"],
    steps: ["Modèle", "Infos", "Livraison", "Options", "Paiement"],
    secureLabel: "PAIEMENT SÉCURISÉ",
    step1Title: "Choisissez votre modèle", step1Sub: "Vous pouvez sélectionner plusieurs produits.",
    selectAtLeast: "Sélectionnez au moins un modèle pour continuer.",
    continueBtn: "CONTINUER →", continueBtnWith: "CONTINUER AVEC ", continueBtnSufSg: " ARTICLE →", continueBtnSufPl: " ARTICLES →",
    step2Title: "Informations personnelles", step2Sub: "Nous utiliserons ces informations pour expédier votre commande.",
    deliveryAddr: "Adresse de livraison",
    labelNome: "Nom complet", phNome: "Votre nom complet",
    labelEmail: "E-mail", phEmail: "votreemail@email.com",
    labelTelefone: "Téléphone / WhatsApp",
    labelCep: "Code postal",
    labelRua: "Rue / Avenue", phRua: "123 rue de la Paix",
    labelNumero: "Numéro",
    labelComplemento: "Appartement, bureau, etc.", phComplemento: "Appt, bureau, bâtiment...",
    labelBairro: "Quartier", phBairro: "Votre quartier",
    labelCidade: "Ville", phCidade: "Votre ville",
    labelEstado: "État",
    step3Title: "Option de livraison", step3Sub: "Choisissez comment vous souhaitez recevoir votre commande.",
    free: "GRATUIT",
    step4Title: "Ajouter à la commande", step4Sub: "Économisez et garantissez votre eau pure plus longtemps.",
    save: "Économisez", addBtn: "Ajouter",
    continuePay: "CONTINUER VERS LE PAIEMENT →",
    termsText1: "En continuant, vous acceptez nos", termsAnd: "et", termsText2: ".",
    step5Title: "Mode de paiement", step5Sub: "Toutes les transactions sont sécurisées et chiffrées.",
    payCard: "Carte de crédit", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Numéro de carte",
    labelExpiry: "Expiration (MM/AA)",
    labelCvc: "CVV",
    labelNameOnCard: "Nom sur la carte", phNameOnCard: "Nom tel qu'imprimé sur la carte",
    pixTitle: "Comment fonctionne le PIX", pixDesc: "Après confirmation de la commande, vous recevrez un QR Code et la clé PIX par e-mail. Le paiement est approuvé en quelques secondes.",
    boletoTitle: "Comment fonctionne le Boleto", boletoDesc: "Le bon de paiement sera envoyé à votre e-mail. La confirmation peut prendre jusqu'à 3 jours ouvrés après le paiement.",
    finalizeBtn: "FINALISER LA COMMANDE",
    summaryTitle: "Récapitulatif de la commande",
    noModelSelected: "Aucun modèle sélectionné",
    remove: "Supprimer",
    subtotalLabel: "Sous-total", prodSg: " article", prodPl: " articles",
    shippingLabel: "Livraison", totalLabel: "Total",
    stockWarning: "Plus que 8 unités en stock !",
    reservedPre: "Votre commande est réservée pendant ", reservedSuf: "",
    trustItems: [
      { label: "Achat 100% sécurisé",          desc: "Paiement chiffré et protégé." },
      { label: "Livraison gratuite au Brésil",  desc: "Livraison sans frais dans tout le pays." },
      { label: "Garantie 1 an",                 desc: "Couverture totale sans tracas" },
      { label: "Support spécialisé",            desc: "Service par les spécialistes Acquafy" },
    ],
    reviewsTitle: "Ce que disent nos clients",
    reviewsSub: "plus de 3 200 clients satisfaits",
    reviewRoles: ["Client", "Chef d'entreprise", "Consommatrice"],
    reviewQuotes: [
      "\"La qualité de l'eau a complètement changé. Le Neo PLUS est incroyable — ma famille adore l'eau hydrogénée !\"",
      "\"J'ai acheté le Neo INFINITY pour le bureau. Le panneau tactile 15\" impressionne tout le monde. Support irréprochable.\"",
      "\"Installation rapide, eau froide immédiatement. L'application est très pratique pour suivre la durée de vie des filtres.\"",
    ],
    successTitle: "Commande confirmée !",
    successMsgPre: "Merci pour votre achat. Un e-mail de confirmation sera envoyé à",
    successMsgSuf: ".", successEmailFallback: "votre e-mail",
    backToSite: "← Retour au site",
    kits: [
      { name: "Kit de filtres Essentials (1 an)", desc: "Filtres UF — compatibles avec toute la gamme Neo Essentials. 12 mois sans se soucier du remplacement." },
      { name: "Kit de filtres Premium (1 an)",    desc: "Filtres RO / Osmose inverse — compatibles avec toute la gamme Neo Premium. Filtres haute performance pour systèmes avancés." },
    ],
    shipping: [
      { label: "Livraison gratuite",  desc: "Livraison standard — 5 à 7 jours ouvrés" },
      { label: "Livraison express",   desc: "Arrivée en 2 à 3 jours ouvrés" },
    ],
    errors: {
      nome: "Le nom complet est obligatoire", email: "L'e-mail est obligatoire",
      telefone: "Le téléphone est obligatoire", telefoneInvalid: "Téléphone invalide (indicatif + numéro)",
      cep: "Le code postal est obligatoire", cepInvalid: "Code postal invalide",
      rua: "La rue est obligatoire", numero: "Le numéro est obligatoire",
      bairro: "Le quartier est obligatoire", cidade: "La ville est obligatoire", uf: "L'état est obligatoire",
      cardNumber: "Le numéro de carte est obligatoire", expiry: "La date d'expiration est obligatoire",
      cvc: "Le CVV est obligatoire", nameOnCard: "Le nom sur la carte est obligatoire",
    },
  },
  de: {
    filterTags: ["Alle", "Essentials", "Premium", "Tischgerät", "Standgerät", "Einbaugerät", "Sprudelwasser", "Wasserstoffwasser"],
    steps: ["Modell", "Daten", "Versand", "Extras", "Zahlung"],
    secureLabel: "SICHERER CHECKOUT",
    step1Title: "Wählen Sie Ihr Modell", step1Sub: "Sie können mehr als ein Produkt auswählen.",
    selectAtLeast: "Wählen Sie mindestens ein Modell aus, um fortzufahren.",
    continueBtn: "WEITER →", continueBtnWith: "WEITER MIT ", continueBtnSufSg: " ARTIKEL →", continueBtnSufPl: " ARTIKELN →",
    step2Title: "Persönliche Daten", step2Sub: "Wir verwenden diese Informationen, um Ihre Bestellung zu versenden.",
    deliveryAddr: "Lieferadresse",
    labelNome: "Vollständiger Name", phNome: "Ihr vollständiger Name",
    labelEmail: "E-Mail", phEmail: "ihreemail@email.com",
    labelTelefone: "Telefon / WhatsApp",
    labelCep: "Postleitzahl",
    labelRua: "Straße / Allee", phRua: "Musterstraße 123",
    labelNumero: "Hausnummer",
    labelComplemento: "Zusatz", phComplemento: "Wohnung, Büro, Gebäude...",
    labelBairro: "Stadtteil", phBairro: "Ihr Stadtteil",
    labelCidade: "Stadt", phCidade: "Ihre Stadt",
    labelEstado: "Bundesland",
    step3Title: "Versandoption", step3Sub: "Wählen Sie, wie Sie Ihre Bestellung erhalten möchten.",
    free: "KOSTENLOS",
    step4Title: "Zur Bestellung hinzufügen", step4Sub: "Sparen Sie und sichern Sie sich Ihr reines Wasser für längere Zeit.",
    save: "Sparen", addBtn: "Hinzufügen",
    continuePay: "WEITER ZUR ZAHLUNG →",
    termsText1: "Durch Fortfahren stimmen Sie unseren", termsAnd: "und", termsText2: "zu.",
    step5Title: "Zahlungsmethode", step5Sub: "Alle Transaktionen sind sicher und verschlüsselt.",
    payCard: "Kreditkarte", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Kartennummer",
    labelExpiry: "Ablaufdatum (MM/JJ)",
    labelCvc: "CVV",
    labelNameOnCard: "Name auf der Karte", phNameOnCard: "Name wie auf der Karte aufgedruckt",
    pixTitle: "Wie PIX funktioniert", pixDesc: "Nach Bestätigung der Bestellung erhalten Sie einen QR-Code und den PIX-Schlüssel per E-Mail. Die Zahlung wird in Sekunden genehmigt.",
    boletoTitle: "Wie Boleto funktioniert", boletoDesc: "Der Zahlungsbeleg wird an Ihre E-Mail gesendet. Die Bestätigung kann bis zu 3 Werktage nach der Zahlung dauern.",
    finalizeBtn: "BESTELLUNG AUFGEBEN",
    summaryTitle: "Bestellübersicht",
    noModelSelected: "Kein Modell ausgewählt",
    remove: "Entfernen",
    subtotalLabel: "Zwischensumme", prodSg: " Artikel", prodPl: " Artikel",
    shippingLabel: "Versand", totalLabel: "Gesamt",
    stockWarning: "Nur noch 8 Einheiten auf Lager!",
    reservedPre: "Ihre Bestellung ist reserviert für ", reservedSuf: "",
    trustItems: [
      { label: "100% sicherer Kauf",           desc: "Verschlüsselte und geschützte Zahlung." },
      { label: "Kostenloser Versand",           desc: "Kostenlose Lieferung in ganz Brasilien." },
      { label: "1 Jahr Garantie",               desc: "Vollständiger Schutz ohne Bürokratie" },
      { label: "Spezialisierter Support",       desc: "Service durch Acquafy-Spezialisten" },
    ],
    reviewsTitle: "Was unsere Kunden sagen",
    reviewsSub: "über 3.200 zufriedene Kunden",
    reviewRoles: ["Kunde", "Unternehmer", "Verbraucherin"],
    reviewQuotes: [
      "\"Die Wasserqualität hat sich komplett verändert. Der Neo PLUS ist unglaublich — meine Familie liebt das Wasserstoffwasser!\"",
      "\"Ich habe den Neo INFINITY fürs Büro gekauft. Das 15\"-Touchpanel beeindruckt jeden. Einwandfreier Support.\"",
      "\"Schnelle Installation, sofort kaltes Wasser. Die App ist sehr praktisch zur Überwachung der Filterlebensdauer.\"",
    ],
    successTitle: "Bestellung bestätigt!",
    successMsgPre: "Vielen Dank für Ihren Kauf. Eine Bestätigungs-E-Mail wird gesendet an",
    successMsgSuf: ".", successEmailFallback: "Ihre E-Mail",
    backToSite: "← Zurück zur Website",
    kits: [
      { name: "Essentials Filterset (1 Jahr)", desc: "UF-Filter — kompatibel mit der gesamten Neo Essentials-Linie. 12 Monate ohne Sorgen um den Austausch." },
      { name: "Premium Filterset (1 Jahr)",    desc: "RO/Umkehrosmose-Filter — kompatibel mit der gesamten Neo Premium-Linie. Hochleistungsfilter für fortschrittliche Systeme." },
    ],
    shipping: [
      { label: "Kostenloser Versand", desc: "Standardlieferung — 5 bis 7 Werktage" },
      { label: "Expresslieferung",    desc: "Ankunft in 2 bis 3 Werktagen" },
    ],
    errors: {
      nome: "Vollständiger Name ist erforderlich", email: "E-Mail ist erforderlich",
      telefone: "Telefon ist erforderlich", telefoneInvalid: "Ungültige Telefonnummer (Vorwahl + Nummer)",
      cep: "Postleitzahl ist erforderlich", cepInvalid: "Ungültige Postleitzahl",
      rua: "Straße ist erforderlich", numero: "Hausnummer ist erforderlich",
      bairro: "Stadtteil ist erforderlich", cidade: "Stadt ist erforderlich", uf: "Bundesland ist erforderlich",
      cardNumber: "Kartennummer ist erforderlich", expiry: "Ablaufdatum ist erforderlich",
      cvc: "CVV ist erforderlich", nameOnCard: "Name auf der Karte ist erforderlich",
    },
  },
  it: {
    filterTags: ["Tutti", "Essentials", "Premium", "Da banco", "A colonna", "Da incasso", "Acqua frizzante", "Acqua idrogenata"],
    steps: ["Modello", "Dati", "Spedizione", "Extra", "Pagamento"],
    secureLabel: "CHECKOUT SICURO",
    step1Title: "Scegli il tuo modello", step1Sub: "Puoi selezionare più di un prodotto.",
    selectAtLeast: "Seleziona almeno un modello per continuare.",
    continueBtn: "CONTINUA →", continueBtnWith: "CONTINUA CON ", continueBtnSufSg: " ARTICOLO →", continueBtnSufPl: " ARTICOLI →",
    step2Title: "Dati personali", step2Sub: "Useremo queste informazioni per spedire il tuo ordine.",
    deliveryAddr: "Indirizzo di consegna",
    labelNome: "Nome completo", phNome: "Il tuo nome completo",
    labelEmail: "E-mail", phEmail: "latuaemail@email.com",
    labelTelefone: "Telefono / WhatsApp",
    labelCep: "CAP",
    labelRua: "Via / Viale", phRua: "Via Roma 123",
    labelNumero: "Numero",
    labelComplemento: "Interno, scala, ecc.", phComplemento: "Interno, scala, edificio...",
    labelBairro: "Quartiere", phBairro: "Il tuo quartiere",
    labelCidade: "Città", phCidade: "La tua città",
    labelEstado: "Stato",
    step3Title: "Opzione di consegna", step3Sub: "Scegli come preferisci ricevere il tuo ordine.",
    free: "GRATIS",
    step4Title: "Aggiungi all'ordine", step4Sub: "Risparmia e assicurati acqua pura per più tempo.",
    save: "Risparmia", addBtn: "Aggiungi",
    continuePay: "CONTINUA AL PAGAMENTO →",
    termsText1: "Procedendo, accetti i nostri", termsAnd: "e", termsText2: ".",
    step5Title: "Metodo di pagamento", step5Sub: "Tutte le transazioni sono sicure e crittografate.",
    payCard: "Carta di credito", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Numero di carta",
    labelExpiry: "Scadenza (MM/AA)",
    labelCvc: "CVV",
    labelNameOnCard: "Nome sulla carta", phNameOnCard: "Nome come stampato sulla carta",
    pixTitle: "Come funziona il PIX", pixDesc: "Dopo aver confermato l'ordine, riceverai un QR Code e la chiave PIX via e-mail. Il pagamento viene approvato in pochi secondi.",
    boletoTitle: "Come funziona il Boleto", boletoDesc: "Il bollettino di pagamento sarà inviato alla tua e-mail. La conferma può richiedere fino a 3 giorni lavorativi dopo il pagamento.",
    finalizeBtn: "EFFETTUA L'ORDINE",
    summaryTitle: "Riepilogo dell'ordine",
    noModelSelected: "Nessun modello selezionato",
    remove: "Rimuovi",
    subtotalLabel: "Subtotale", prodSg: " articolo", prodPl: " articoli",
    shippingLabel: "Spedizione", totalLabel: "Totale",
    stockWarning: "Solo 8 unità disponibili!",
    reservedPre: "Il tuo ordine è riservato per ", reservedSuf: "",
    trustItems: [
      { label: "Acquisto 100% sicuro",          desc: "Pagamento crittografato e protetto." },
      { label: "Spedizione gratuita in Brasile", desc: "Consegna senza costi in qualsiasi stato." },
      { label: "Garanzia di 1 anno",            desc: "Copertura totale senza burocrazia" },
      { label: "Supporto specializzato",        desc: "Assistenza con gli specialisti Acquafy" },
    ],
    reviewsTitle: "Cosa dicono i nostri clienti",
    reviewsSub: "oltre 3.200 clienti soddisfatti",
    reviewRoles: ["Cliente", "Imprenditore", "Consumatrice"],
    reviewQuotes: [
      "\"La qualità dell'acqua è cambiata completamente. Il Neo PLUS è incredibile — la mia famiglia ama l'acqua idrogenata!\"",
      "\"Ho acquistato il Neo INFINITY per l'ufficio. Il pannello touch da 15\" impressiona tutti. Supporto impeccabile.\"",
      "\"Installazione rapida, acqua fredda subito. L'app è molto pratica per monitorare la vita dei filtri.\"",
    ],
    successTitle: "Ordine confermato!",
    successMsgPre: "Grazie per il tuo acquisto. Un'e-mail di conferma sarà inviata a",
    successMsgSuf: ".", successEmailFallback: "la tua e-mail",
    backToSite: "← Torna al sito",
    kits: [
      { name: "Kit filtri Essentials (1 anno)", desc: "Filtri UF — compatibili con tutta la linea Neo Essentials. 12 mesi senza preoccuparsi della sostituzione." },
      { name: "Kit filtri Premium (1 anno)",    desc: "Filtri RO / Osmosi inversa — compatibili con tutta la linea Neo Premium. Filtri ad alte prestazioni per sistemi avanzati." },
    ],
    shipping: [
      { label: "Spedizione gratuita", desc: "Consegna standard — 5-7 giorni lavorativi" },
      { label: "Consegna express",    desc: "Arrivo in 2-3 giorni lavorativi" },
    ],
    errors: {
      nome: "Il nome completo è obbligatorio", email: "L'e-mail è obbligatoria",
      telefone: "Il telefono è obbligatorio", telefoneInvalid: "Telefono non valido (prefisso + numero)",
      cep: "Il CAP è obbligatorio", cepInvalid: "CAP non valido",
      rua: "La via è obbligatoria", numero: "Il numero è obbligatorio",
      bairro: "Il quartiere è obbligatorio", cidade: "La città è obbligatoria", uf: "Lo stato è obbligatorio",
      cardNumber: "Il numero di carta è obbligatorio", expiry: "La data di scadenza è obbligatoria",
      cvc: "Il CVV è obbligatorio", nameOnCard: "Il nome sulla carta è obbligatorio",
    },
  },
  zh: {
    filterTags: ["全部", "Essentials", "Premium", "台式", "立式", "嵌入式", "气泡水", "富氢水"],
    steps: ["型号", "信息", "配送", "附加", "支付"],
    secureLabel: "安全结账",
    step1Title: "选择您的型号", step1Sub: "您可以选择多个产品。",
    selectAtLeast: "请至少选择一个型号以继续。",
    continueBtn: "继续 →", continueBtnWith: "继续选择 ", continueBtnSufSg: " 件商品 →", continueBtnSufPl: " 件商品 →",
    step2Title: "个人信息", step2Sub: "我们将使用这些信息来发送您的订单。",
    deliveryAddr: "收货地址",
    labelNome: "全名", phNome: "您的全名",
    labelEmail: "电子邮件", phEmail: "youremail@email.com",
    labelTelefone: "电话 / WhatsApp",
    labelCep: "邮政编码",
    labelRua: "街道 / 大道", phRua: "主街123号",
    labelNumero: "门牌号",
    labelComplemento: "公寓、房间等", phComplemento: "公寓、房间、楼栋...",
    labelBairro: "社区", phBairro: "您的社区",
    labelCidade: "城市", phCidade: "您的城市",
    labelEstado: "省/州",
    step3Title: "配送方式", step3Sub: "选择您希望收到订单的方式。",
    free: "免费",
    step4Title: "添加到订单", step4Sub: "节省费用，确保您更长时间享用纯净水。",
    save: "节省", addBtn: "添加",
    continuePay: "继续至支付 →",
    termsText1: "继续即表示您同意我们的", termsAnd: "和", termsText2: "。",
    step5Title: "支付方式", step5Sub: "所有交易均安全加密。",
    payCard: "信用卡", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "卡号",
    labelExpiry: "有效期 (MM/YY)",
    labelCvc: "CVV",
    labelNameOnCard: "持卡人姓名", phNameOnCard: "与卡片上印刷的姓名相同",
    pixTitle: "PIX 如何运作", pixDesc: "确认订单后，您将通过电子邮件收到 QR 码和 PIX 密钥。付款在几秒钟内获批。",
    boletoTitle: "Boleto 如何运作", boletoDesc: "付款单将发送到您的电子邮件。付款后确认最多需要 3 个工作日。",
    finalizeBtn: "提交订单",
    summaryTitle: "订单摘要",
    noModelSelected: "未选择型号",
    remove: "移除",
    subtotalLabel: "小计", prodSg: " 件", prodPl: " 件",
    shippingLabel: "运费", totalLabel: "总计",
    stockWarning: "库存仅剩 8 件！",
    reservedPre: "您的订单已保留 ", reservedSuf: "",
    trustItems: [
      { label: "100% 安全购买",   desc: "加密且受保护的支付。" },
      { label: "全巴西免费配送", desc: "全国任何州均免费送货。" },
      { label: "1 年保修",        desc: "无忧全面保障" },
      { label: "专业支持",        desc: "Acquafy 专家团队服务" },
    ],
    reviewsTitle: "客户评价",
    reviewsSub: "超过 3,200 位满意客户",
    reviewRoles: ["客户", "企业家", "消费者"],
    reviewQuotes: [
      "\"水质完全改变了。Neo PLUS 令人惊叹——我的家人都爱上了富氢水！\"",
      "\"我为办公室购买了 Neo INFINITY。15 英寸触控屏让所有人印象深刻。支持无可挑剔。\"",
      "\"安装快速，立即享用冷水。App 追踪滤芯寿命非常实用。\"",
    ],
    successTitle: "订单已确认！",
    successMsgPre: "感谢您的购买。确认电子邮件将发送至",
    successMsgSuf: "。", successEmailFallback: "您的电子邮件",
    backToSite: "← 返回网站",
    kits: [
      { name: "Essentials 滤芯套装（1 年）", desc: "UF 滤芯——兼容整个 Neo Essentials 系列。12 个月无需担心更换。" },
      { name: "Premium 滤芯套装（1 年）",    desc: "RO / 反渗透滤芯——兼容整个 Neo Premium 系列。适用于高级系统的高性能滤芯。" },
    ],
    shipping: [
      { label: "免费配送", desc: "标准配送——5 至 7 个工作日" },
      { label: "快递配送", desc: "2 至 3 个工作日送达" },
    ],
    errors: {
      nome: "全名为必填项", email: "电子邮件为必填项",
      telefone: "电话为必填项", telefoneInvalid: "电话号码无效（区号 + 号码）",
      cep: "邮政编码为必填项", cepInvalid: "邮政编码无效",
      rua: "街道为必填项", numero: "门牌号为必填项",
      bairro: "社区为必填项", cidade: "城市为必填项", uf: "省/州为必填项",
      cardNumber: "卡号为必填项", expiry: "有效期为必填项",
      cvc: "CVV 为必填项", nameOnCard: "持卡人姓名为必填项",
    },
  },
  ja: {
    filterTags: ["すべて", "Essentials", "Premium", "卓上型", "スタンド型", "ビルトイン", "スパークリング", "水素水"],
    steps: ["モデル", "情報", "配送", "追加", "支払い"],
    secureLabel: "安全なチェックアウト",
    step1Title: "モデルを選択", step1Sub: "複数の商品を選択できます。",
    selectAtLeast: "続行するには少なくとも1つのモデルを選択してください。",
    continueBtn: "続ける →", continueBtnWith: "続ける（", continueBtnSufSg: " 点） →", continueBtnSufPl: " 点） →",
    step2Title: "個人情報", step2Sub: "この情報をご注文の発送に使用します。",
    deliveryAddr: "配送先住所",
    labelNome: "氏名", phNome: "氏名を入力してください",
    labelEmail: "メールアドレス", phEmail: "youremail@email.com",
    labelTelefone: "電話番号 / WhatsApp",
    labelCep: "郵便番号",
    labelRua: "番地 / 通り", phRua: "例：東京都渋谷区1-1",
    labelNumero: "建物番号",
    labelComplemento: "部屋番号など", phComplemento: "部屋番号、フロア、棟...",
    labelBairro: "地区", phBairro: "お住まいの地区",
    labelCidade: "市区町村", phCidade: "市区町村を入力してください",
    labelEstado: "都道府県",
    step3Title: "配送オプション", step3Sub: "ご注文の受け取り方法をお選びください。",
    free: "無料",
    step4Title: "注文に追加", step4Sub: "節約して、純粋な水をより長くお楽しみください。",
    save: "節約", addBtn: "追加",
    continuePay: "支払いへ進む →",
    termsText1: "続行することで、当社の", termsAnd: "および", termsText2: "に同意したことになります。",
    step5Title: "お支払い方法", step5Sub: "すべての取引は安全に暗号化されています。",
    payCard: "クレジットカード", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "カード番号",
    labelExpiry: "有効期限 (MM/YY)",
    labelCvc: "CVV",
    labelNameOnCard: "カード名義人", phNameOnCard: "カードに印刷されている名前",
    pixTitle: "PIXの仕組み", pixDesc: "注文を確認後、QRコードとPIXキーがメールで届きます。支払いは数秒で承認されます。",
    boletoTitle: "Boletoの仕組み", boletoDesc: "支払い票がメールに送信されます。支払い後の確認には最大3営業日かかる場合があります。",
    finalizeBtn: "注文を確定する",
    summaryTitle: "注文概要",
    noModelSelected: "モデルが選択されていません",
    remove: "削除",
    subtotalLabel: "小計", prodSg: " 点", prodPl: " 点",
    shippingLabel: "送料", totalLabel: "合計",
    stockWarning: "在庫残り8点！",
    reservedPre: "ご注文は ", reservedSuf: "予約されています",
    trustItems: [
      { label: "100%安全な購入",     desc: "暗号化と保護された支払い。" },
      { label: "ブラジル全国送料無料", desc: "どの州にも無料でお届け。" },
      { label: "1年保証",            desc: "面倒なし、完全カバレッジ" },
      { label: "専門サポート",        desc: "Acquafy専門スタッフによるサービス" },
    ],
    reviewsTitle: "お客様の声",
    reviewsSub: "3,200人以上の満足したお客様",
    reviewRoles: ["お客様", "経営者", "消費者"],
    reviewQuotes: [
      "\"水質が完全に変わりました。Neo PLUSは素晴らしく、家族も水素水が大好きです！\"",
      "\"Neo INFINITYをオフィス用に購入しました。15インチのタッチパネルは誰もが感動します。サポートは申し分ありません。\"",
      "\"設置が早く、すぐに冷水が出ました。アプリでフィルターの寿命を確認するのがとても便利です。\"",
    ],
    successTitle: "ご注文が確定しました！",
    successMsgPre: "ご購入ありがとうございます。確認メールを送信しました：",
    successMsgSuf: "。", successEmailFallback: "メールアドレス",
    backToSite: "← サイトに戻る",
    kits: [
      { name: "Essentials フィルターキット（1年分）", desc: "UFフィルター — Neo Essentialsシリーズ全製品に対応。12ヶ月間フィルター交換の心配なし。" },
      { name: "Premium フィルターキット（1年分）",    desc: "RO / 逆浸透フィルター — Neo Premiumシリーズ全製品に対応。高度なシステム向け高性能フィルター。" },
    ],
    shipping: [
      { label: "無料配送",       desc: "通常配送 — 5〜7営業日" },
      { label: "エクスプレス配送", desc: "2〜3営業日でお届け" },
    ],
    errors: {
      nome: "氏名は必須です", email: "メールアドレスは必須です",
      telefone: "電話番号は必須です", telefoneInvalid: "無効な電話番号（市外局番 + 番号）",
      cep: "郵便番号は必須です", cepInvalid: "無効な郵便番号",
      rua: "番地は必須です", numero: "建物番号は必須です",
      bairro: "地区は必須です", cidade: "市区町村は必須です", uf: "都道府県は必須です",
      cardNumber: "カード番号は必須です", expiry: "有効期限は必須です",
      cvc: "CVVは必須です", nameOnCard: "カード名義人は必須です",
    },
  },
  ko: {
    filterTags: ["전체", "Essentials", "Premium", "카운터탑", "스탠드형", "빌트인", "탄산수", "수소수"],
    steps: ["모델", "정보", "배송", "추가", "결제"],
    secureLabel: "안전한 결제",
    step1Title: "모델을 선택하세요", step1Sub: "여러 제품을 선택할 수 있습니다.",
    selectAtLeast: "계속하려면 최소 하나의 모델을 선택하세요.",
    continueBtn: "계속하기 →", continueBtnWith: "계속하기 (", continueBtnSufSg: "개) →", continueBtnSufPl: "개) →",
    step2Title: "개인 정보", step2Sub: "이 정보는 주문을 배송하는 데 사용됩니다.",
    deliveryAddr: "배송 주소",
    labelNome: "성명", phNome: "성명을 입력하세요",
    labelEmail: "이메일", phEmail: "youremail@email.com",
    labelTelefone: "전화번호 / WhatsApp",
    labelCep: "우편번호",
    labelRua: "도로명 / 주소", phRua: "예: 서울시 강남구 테헤란로 1",
    labelNumero: "건물 번호",
    labelComplemento: "상세 주소", phComplemento: "동, 호, 층...",
    labelBairro: "동/구", phBairro: "동/구를 입력하세요",
    labelCidade: "시/군/구", phCidade: "시/군/구를 입력하세요",
    labelEstado: "시/도",
    step3Title: "배송 옵션", step3Sub: "주문을 받을 방법을 선택하세요.",
    free: "무료",
    step4Title: "주문에 추가", step4Sub: "절약하고 더 오랫동안 순수한 물을 보장하세요.",
    save: "절약", addBtn: "추가",
    continuePay: "결제로 계속하기 →",
    termsText1: "계속함으로써 당사의", termsAnd: "및", termsText2: "에 동의합니다.",
    step5Title: "결제 방법", step5Sub: "모든 거래는 안전하게 암호화됩니다.",
    payCard: "신용카드", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "카드 번호",
    labelExpiry: "유효기간 (MM/YY)",
    labelCvc: "CVV",
    labelNameOnCard: "카드 소유자 이름", phNameOnCard: "카드에 인쇄된 이름",
    pixTitle: "PIX 작동 방식", pixDesc: "주문 확인 후 QR코드와 PIX 키가 이메일로 전송됩니다. 결제는 몇 초 안에 승인됩니다.",
    boletoTitle: "Boleto 작동 방식", boletoDesc: "결제 전표가 이메일로 전송됩니다. 결제 후 확인에는 최대 3 영업일이 소요될 수 있습니다.",
    finalizeBtn: "주문하기",
    summaryTitle: "주문 요약",
    noModelSelected: "선택된 모델 없음",
    remove: "제거",
    subtotalLabel: "소계", prodSg: "개", prodPl: "개",
    shippingLabel: "배송비", totalLabel: "합계",
    stockWarning: "재고 8개 남음!",
    reservedPre: "주문이 예약되었습니다 ", reservedSuf: "",
    trustItems: [
      { label: "100% 안전한 구매",   desc: "암호화 및 보호된 결제." },
      { label: "브라질 전국 무료 배송", desc: "모든 주에 무료 배송." },
      { label: "1년 보증",           desc: "번거로움 없는 완전한 보장" },
      { label: "전문 지원",          desc: "Acquafy 전문가 팀 서비스" },
    ],
    reviewsTitle: "고객 후기",
    reviewsSub: "3,200명 이상의 만족한 고객",
    reviewRoles: ["고객", "사업가", "소비자"],
    reviewQuotes: [
      "\"수질이 완전히 바뀌었어요. Neo PLUS는 놀랍습니다 — 가족 모두 수소수를 사랑해요!\"",
      "\"사무실에 Neo INFINITY를 구입했습니다. 15인치 터치 패널이 모든 사람을 감동시킵니다. 지원도 완벽합니다.\"",
      "\"설치가 빠르고 즉시 차가운 물이 나옵니다. 앱으로 필터 수명을 확인하는 게 매우 편리합니다.\"",
    ],
    successTitle: "주문이 확인되었습니다!",
    successMsgPre: "구매해 주셔서 감사합니다. 확인 이메일이 발송됩니다:",
    successMsgSuf: ".", successEmailFallback: "이메일 주소",
    backToSite: "← 사이트로 돌아가기",
    kits: [
      { name: "Essentials 필터 키트 (1년)", desc: "UF 필터 — Neo Essentials 전 제품 호환. 12개월 동안 교체 걱정 없음." },
      { name: "Premium 필터 키트 (1년)",    desc: "RO / 역삼투 필터 — Neo Premium 전 제품 호환. 고급 시스템을 위한 고성능 필터." },
    ],
    shipping: [
      { label: "무료 배송",  desc: "일반 배송 — 5~7 영업일" },
      { label: "빠른 배송",  desc: "2~3 영업일 내 도착" },
    ],
    errors: {
      nome: "성명은 필수입니다", email: "이메일은 필수입니다",
      telefone: "전화번호는 필수입니다", telefoneInvalid: "유효하지 않은 전화번호 (지역번호 + 번호)",
      cep: "우편번호는 필수입니다", cepInvalid: "유효하지 않은 우편번호",
      rua: "도로명은 필수입니다", numero: "건물 번호는 필수입니다",
      bairro: "동/구는 필수입니다", cidade: "시/군/구는 필수입니다", uf: "시/도는 필수입니다",
      cardNumber: "카드 번호는 필수입니다", expiry: "유효기간은 필수입니다",
      cvc: "CVV는 필수입니다", nameOnCard: "카드 소유자 이름은 필수입니다",
    },
  },
  "en-gb": {
    filterTags: ["All", "Essentials", "Premium", "Countertop", "Floor Stand", "Built-in", "Sparkling Water", "Hydrogen Water"],
    steps: ["Model", "Info", "Shipping", "Add-ons", "Payment"],
    secureLabel: "SECURE CHECKOUT",
    step1Title: "Choose Your Model", step1Sub: "You can select more than one product.",
    selectAtLeast: "Select at least one model to continue.",
    continueBtn: "CONTINUE →", continueBtnWith: "CONTINUE WITH ", continueBtnSufSg: " ITEM →", continueBtnSufPl: " ITEMS →",
    step2Title: "Personal Information", step2Sub: "We will use this information to ship your order.",
    deliveryAddr: "Delivery Address",
    labelNome: "Full Name", phNome: "Your full name",
    labelEmail: "E-mail", phEmail: "youremail@email.com",
    labelTelefone: "Phone / WhatsApp",
    labelCep: "Postcode",
    labelRua: "Street / Avenue", phRua: "1 Main Street",
    labelNumero: "Number",
    labelComplemento: "Flat, Suite, etc.", phComplemento: "Flat, suite, block...",
    labelBairro: "Neighbourhood", phBairro: "Your neighbourhood",
    labelCidade: "City", phCidade: "Your city",
    labelEstado: "County",
    step3Title: "Delivery Option", step3Sub: "Choose how you prefer to receive your order.",
    free: "FREE",
    step4Title: "Add to Order", step4Sub: "Save and ensure your pure water for longer.",
    save: "Save", addBtn: "Add",
    continuePay: "CONTINUE TO PAYMENT →",
    termsText1: "By proceeding, you agree to our", termsAnd: "and", termsText2: ".",
    step5Title: "Payment Method", step5Sub: "All transactions are secure and encrypted.",
    payCard: "Credit Card", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Card Number",
    labelExpiry: "Expiry (MM/YY)",
    labelCvc: "CVV",
    labelNameOnCard: "Name on Card", phNameOnCard: "Name as printed on card",
    pixTitle: "How PIX works", pixDesc: "After confirming the order, you will receive a QR Code and the PIX key by email. Payment is approved in seconds.",
    boletoTitle: "How Boleto works", boletoDesc: "The payment slip will be sent to your email. Confirmation may take up to 3 working days after payment.",
    finalizeBtn: "PLACE ORDER",
    summaryTitle: "Order Summary",
    noModelSelected: "No model selected",
    remove: "Remove",
    subtotalLabel: "Subtotal", prodSg: " item", prodPl: " items",
    shippingLabel: "Shipping", totalLabel: "Total",
    stockWarning: "Only 8 units in stock!",
    reservedPre: "Your order is reserved for ", reservedSuf: "",
    trustItems: [
      { label: "100% Secure Purchase",     desc: "Encrypted and protected payment." },
      { label: "Free Shipping Nationwide",  desc: "No cost delivery to any state." },
      { label: "1-Year Warranty",           desc: "Full coverage without hassle" },
      { label: "Specialised Support",       desc: "Service by Acquafy specialists" },
    ],
    reviewsTitle: "What Our Customers Say",
    reviewsSub: "over 3,200 satisfied customers",
    reviewRoles: ["Customer", "Business Owner", "Consumer"],
    reviewQuotes: [
      "\"The water quality changed completely. The Neo PLUS is incredible — my family loves the hydrogen water!\"",
      "\"I bought the Neo INFINITY for the office. The 15\" touch panel impresses everyone. Impeccable support.\"",
      "\"Quick installation, cold water right away. The app is very practical for tracking filter life.\"",
    ],
    successTitle: "Order confirmed!",
    successMsgPre: "Thank you for your purchase. A confirmation email will be sent to",
    successMsgSuf: ".", successEmailFallback: "your email",
    backToSite: "← Back to Site",
    kits: [
      { name: "Essentials Filter Kit (1 year)", desc: "UF Filters — compatible with the entire Neo Essentials line. 12 months without worrying about replacement." },
      { name: "Premium Filter Kit (1 year)",    desc: "RO/Reverse Osmosis Filters — compatible with the entire Neo Premium line. High-performance filters for advanced systems." },
    ],
    shipping: [
      { label: "Free Shipping",    desc: "Standard delivery — 5 to 7 working days" },
      { label: "Express Delivery", desc: "Arrives in 2 to 3 working days" },
    ],
    errors: {
      nome: "Full name is required", email: "Email is required",
      telefone: "Phone is required", telefoneInvalid: "Invalid phone (area code + number)",
      cep: "Postcode is required", cepInvalid: "Invalid postcode",
      rua: "Street is required", numero: "Number is required",
      bairro: "Neighbourhood is required", cidade: "City is required", uf: "County is required",
      cardNumber: "Card number is required", expiry: "Expiry date is required",
      cvc: "CVV is required", nameOnCard: "Name on card is required",
    },
  },
  sv: {
    filterTags: ["Alla", "Essentials", "Premium", "Bordsskiva", "Golvmodell", "Inbyggd", "Kolsyrat vatten", "Vätgasvatten"],
    steps: ["Modell", "Info", "Frakt", "Tillägg", "Betalning"],
    secureLabel: "SÄKER KASSA",
    step1Title: "Välj din modell", step1Sub: "Du kan välja mer än en produkt.",
    selectAtLeast: "Välj minst en modell för att fortsätta.",
    continueBtn: "FORTSÄTT →", continueBtnWith: "FORTSÄTT MED ", continueBtnSufSg: " ARTIKEL →", continueBtnSufPl: " ARTIKLAR →",
    step2Title: "Personuppgifter", step2Sub: "Vi använder denna information för att skicka din beställning.",
    deliveryAddr: "Leveransadress",
    labelNome: "Fullständigt namn", phNome: "Ditt fullständiga namn",
    labelEmail: "E-post", phEmail: "dinepost@email.com",
    labelTelefone: "Telefon / WhatsApp",
    labelCep: "Postnummer",
    labelRua: "Gata / Väg", phRua: "Storgatan 1",
    labelNumero: "Nummer",
    labelComplemento: "Lägenhet, kontor, etc.", phComplemento: "Lägenhet, kontor, byggnad...",
    labelBairro: "Stadsdel", phBairro: "Din stadsdel",
    labelCidade: "Stad", phCidade: "Din stad",
    labelEstado: "Län",
    step3Title: "Leveransalternativ", step3Sub: "Välj hur du vill ta emot din beställning.",
    free: "GRATIS",
    step4Title: "Lägg till i beställningen", step4Sub: "Spara och säkerställ ditt rena vatten längre.",
    save: "Spara", addBtn: "Lägg till",
    continuePay: "FORTSÄTT TILL BETALNING →",
    termsText1: "Genom att fortsätta godkänner du våra", termsAnd: "och", termsText2: ".",
    step5Title: "Betalningsmetod", step5Sub: "Alla transaktioner är säkra och krypterade.",
    payCard: "Kreditkort", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Kortnummer",
    labelExpiry: "Utgångsdatum (MM/ÅÅ)",
    labelCvc: "CVV",
    labelNameOnCard: "Namn på kortet", phNameOnCard: "Namn som tryckt på kortet",
    pixTitle: "Hur PIX fungerar", pixDesc: "Efter beställningsbekräftelse får du en QR-kod och PIX-nyckeln via e-post. Betalningen godkänns på några sekunder.",
    boletoTitle: "Hur Boleto fungerar", boletoDesc: "Betalningsslip skickas till din e-post. Bekräftelse kan ta upp till 3 arbetsdagar efter betalning.",
    finalizeBtn: "LÄGG BESTÄLLNING",
    summaryTitle: "Ordersammanfattning",
    noModelSelected: "Ingen modell vald",
    remove: "Ta bort",
    subtotalLabel: "Delsumma", prodSg: " artikel", prodPl: " artiklar",
    shippingLabel: "Frakt", totalLabel: "Totalt",
    stockWarning: "Bara 8 enheter i lager!",
    reservedPre: "Din beställning är reserverad i ", reservedSuf: "",
    trustItems: [
      { label: "100% säkert köp",         desc: "Krypterad och skyddad betalning." },
      { label: "Gratis frakt i Brasilien", desc: "Kostnadsfri leverans till alla stater." },
      { label: "1 års garanti",            desc: "Fullständig täckning utan krångel" },
      { label: "Specialiserad support",    desc: "Service från Acquafy-specialister" },
    ],
    reviewsTitle: "Vad våra kunder säger",
    reviewsSub: "över 3 200 nöjda kunder",
    reviewRoles: ["Kund", "Företagare", "Konsument"],
    reviewQuotes: [
      "\"Vattenkvaliteten förändrades helt. Neo PLUS är fantastisk — min familj älskar vätgasvattnet!\"",
      "\"Jag köpte Neo INFINITY till kontoret. 15\"-pekskärmen imponerar på alla. Exemplarisk support.\"",
      "\"Snabb installation, kallt vatten direkt. Appen är mycket praktisk för att följa filtrets livslängd.\"",
    ],
    successTitle: "Beställning bekräftad!",
    successMsgPre: "Tack för ditt köp. En bekräftelse-e-post skickas till",
    successMsgSuf: ".", successEmailFallback: "din e-post",
    backToSite: "← Tillbaka till webbplatsen",
    kits: [
      { name: "Essentials filterpaket (1 år)", desc: "UF-filter — kompatibla med hela Neo Essentials-linjen. 12 månader utan att behöva tänka på byte." },
      { name: "Premium filterpaket (1 år)",    desc: "RO/omvänd osmos-filter — kompatibla med hela Neo Premium-linjen. Högpresterande filter för avancerade system." },
    ],
    shipping: [
      { label: "Gratis frakt",    desc: "Standardleverans — 5 till 7 arbetsdagar" },
      { label: "Expressleverans", desc: "Anländer på 2 till 3 arbetsdagar" },
    ],
    errors: {
      nome: "Fullständigt namn krävs", email: "E-post krävs",
      telefone: "Telefon krävs", telefoneInvalid: "Ogiltigt telefonnummer (riktnummer + nummer)",
      cep: "Postnummer krävs", cepInvalid: "Ogiltigt postnummer",
      rua: "Gata krävs", numero: "Nummer krävs",
      bairro: "Stadsdel krävs", cidade: "Stad krävs", uf: "Län krävs",
      cardNumber: "Kortnummer krävs", expiry: "Utgångsdatum krävs",
      cvc: "CVV krävs", nameOnCard: "Namn på kortet krävs",
    },
  },
  fi: {
    filterTags: ["Kaikki", "Essentials", "Premium", "Pöytämalli", "Lattiamalli", "Upotettava", "Kuohuvesi", "Vetyvesi"],
    steps: ["Malli", "Tiedot", "Toimitus", "Lisäykset", "Maksu"],
    secureLabel: "TURVALLINEN KASSA",
    step1Title: "Valitse mallisi", step1Sub: "Voit valita useamman kuin yhden tuotteen.",
    selectAtLeast: "Valitse vähintään yksi malli jatkaaksesi.",
    continueBtn: "JATKA →", continueBtnWith: "JATKA ", continueBtnSufSg: " TUOTTEELLA →", continueBtnSufPl: " TUOTTEELLA →",
    step2Title: "Henkilötiedot", step2Sub: "Käytämme näitä tietoja tilauksesi toimittamiseen.",
    deliveryAddr: "Toimitusosoite",
    labelNome: "Koko nimi", phNome: "Koko nimesi",
    labelEmail: "Sähköposti", phEmail: "sinunsahkoposti@email.com",
    labelTelefone: "Puhelin / WhatsApp",
    labelCep: "Postinumero",
    labelRua: "Katu / Tie", phRua: "Pääkatu 1",
    labelNumero: "Numero",
    labelComplemento: "Huoneisto, toimisto, jne.", phComplemento: "Huoneisto, toimisto, rakennus...",
    labelBairro: "Kaupunginosa", phBairro: "Kaupunginosasi",
    labelCidade: "Kaupunki", phCidade: "Kaupunkisi",
    labelEstado: "Maakunta",
    step3Title: "Toimitusvaihtoehdot", step3Sub: "Valitse, miten haluat vastaanottaa tilauksesi.",
    free: "ILMAINEN",
    step4Title: "Lisää tilaukseen", step4Sub: "Säästä ja varmista puhdas vesi pidempään.",
    save: "Säästä", addBtn: "Lisää",
    continuePay: "JATKA MAKSUUN →",
    termsText1: "Jatkamalla hyväksyt meidän", termsAnd: "ja", termsText2: ".",
    step5Title: "Maksutapa", step5Sub: "Kaikki tapahtumat ovat turvallisia ja salattuja.",
    payCard: "Luottokortti", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Kortin numero",
    labelExpiry: "Vanhenemispäivä (KK/VV)",
    labelCvc: "CVV",
    labelNameOnCard: "Nimi kortilla", phNameOnCard: "Nimi niin kuin se on painettu kortille",
    pixTitle: "Kuinka PIX toimii", pixDesc: "Tilauksen vahvistamisen jälkeen saat QR-koodin ja PIX-avaimen sähköpostitse. Maksu hyväksytään sekunneissa.",
    boletoTitle: "Kuinka Boleto toimii", boletoDesc: "Maksulappu lähetetään sähköpostiisi. Vahvistus voi kestää jopa 3 arkipäivää maksun jälkeen.",
    finalizeBtn: "TILAA",
    summaryTitle: "Tilauksen yhteenveto",
    noModelSelected: "Ei valittua mallia",
    remove: "Poista",
    subtotalLabel: "Välisumma", prodSg: " tuote", prodPl: " tuotetta",
    shippingLabel: "Toimitus", totalLabel: "Yhteensä",
    stockWarning: "Vain 8 yksikköä varastossa!",
    reservedPre: "Tilauksesi on varattu ", reservedSuf: "",
    trustItems: [
      { label: "100% turvallinen osto",       desc: "Salattu ja suojattu maksu." },
      { label: "Ilmainen toimitus Brasiliaan", desc: "Maksuton toimitus kaikkiin osavaltioihin." },
      { label: "1 vuoden takuu",               desc: "Täyskattaus ilman byrokratiaa" },
      { label: "Erikoistunut tuki",            desc: "Palvelu Acquafy-asiantuntijoilta" },
    ],
    reviewsTitle: "Mitä asiakkaamme sanovat",
    reviewsSub: "yli 3 200 tyytyväistä asiakasta",
    reviewRoles: ["Asiakas", "Yrittäjä", "Kuluttaja"],
    reviewQuotes: [
      "\"Veden laatu muuttui täysin. Neo PLUS on upea — perheeni rakastaa vetyvettä!\"",
      "\"Ostin Neo INFINITYn toimistoon. 15\" kosketusnäyttö vaikuttaa kaikkiin. Moitteeton tuki.\"",
      "\"Nopea asennus, kylmä vesi heti. Sovellus on erittäin kätevä suodattimen käyttöiän seurantaan.\"",
    ],
    successTitle: "Tilaus vahvistettu!",
    successMsgPre: "Kiitos ostoksestasi. Vahvistussähköposti lähetetään osoitteeseen",
    successMsgSuf: ".", successEmailFallback: "sähköpostiosoitteeseesi",
    backToSite: "← Takaisin sivustolle",
    kits: [
      { name: "Essentials-suodatinpaketti (1 vuosi)", desc: "UF-suodattimet — yhteensopiva koko Neo Essentials-sarjan kanssa. 12 kuukautta ilman huolta vaihdosta." },
      { name: "Premium-suodatinpaketti (1 vuosi)",    desc: "RO/käänteisosmoosi-suodattimet — yhteensopiva koko Neo Premium-sarjan kanssa. Suorituskykyiset suodattimet kehittyneisiin järjestelmiin." },
    ],
    shipping: [
      { label: "Ilmainen toimitus", desc: "Vakiotoimitus — 5–7 arkipäivää" },
      { label: "Pikatoimitus",       desc: "Saapuu 2–3 arkipäivässä" },
    ],
    errors: {
      nome: "Koko nimi on pakollinen", email: "Sähköposti on pakollinen",
      telefone: "Puhelin on pakollinen", telefoneInvalid: "Virheellinen puhelinnumero (suuntanumero + numero)",
      cep: "Postinumero on pakollinen", cepInvalid: "Virheellinen postinumero",
      rua: "Katu on pakollinen", numero: "Numero on pakollinen",
      bairro: "Kaupunginosa on pakollinen", cidade: "Kaupunki on pakollinen", uf: "Maakunta on pakollinen",
      cardNumber: "Kortin numero on pakollinen", expiry: "Vanhenemispäivä on pakollinen",
      cvc: "CVV on pakollinen", nameOnCard: "Nimi kortilla on pakollinen",
    },
  },
  ru: {
    filterTags: ["Все", "Essentials", "Premium", "Настольный", "Напольный", "Встроенный", "Газированная вода", "Водородная вода"],
    steps: ["Модель", "Данные", "Доставка", "Дополнения", "Оплата"],
    secureLabel: "БЕЗОПАСНАЯ ОПЛАТА",
    step1Title: "Выберите модель", step1Sub: "Вы можете выбрать несколько продуктов.",
    selectAtLeast: "Выберите хотя бы одну модель для продолжения.",
    continueBtn: "ПРОДОЛЖИТЬ →", continueBtnWith: "ПРОДОЛЖИТЬ С ", continueBtnSufSg: " ТОВАРОМ →", continueBtnSufPl: " ТОВАРАМИ →",
    step2Title: "Личные данные", step2Sub: "Мы используем эту информацию для отправки вашего заказа.",
    deliveryAddr: "Адрес доставки",
    labelNome: "Полное имя", phNome: "Ваше полное имя",
    labelEmail: "Эл. почта", phEmail: "vashaemail@email.com",
    labelTelefone: "Телефон / WhatsApp",
    labelCep: "Почтовый индекс",
    labelRua: "Улица / Проспект", phRua: "ул. Главная, 1",
    labelNumero: "Номер",
    labelComplemento: "Квартира, офис и т.д.", phComplemento: "Квартира, офис, корпус...",
    labelBairro: "Район", phBairro: "Ваш район",
    labelCidade: "Город", phCidade: "Ваш город",
    labelEstado: "Регион",
    step3Title: "Способ доставки", step3Sub: "Выберите, как вы хотите получить заказ.",
    free: "БЕСПЛАТНО",
    step4Title: "Добавить к заказу", step4Sub: "Экономьте и обеспечьте чистую воду на дольше.",
    save: "Экономия", addBtn: "Добавить",
    continuePay: "ПЕРЕЙТИ К ОПЛАТЕ →",
    termsText1: "Продолжая, вы соглашаетесь с нашими", termsAnd: "и", termsText2: ".",
    step5Title: "Способ оплаты", step5Sub: "Все транзакции защищены и зашифрованы.",
    payCard: "Кредитная карта", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Номер карты",
    labelExpiry: "Срок действия (ММ/ГГ)",
    labelCvc: "CVV",
    labelNameOnCard: "Имя на карте", phNameOnCard: "Имя как напечатано на карте",
    pixTitle: "Как работает PIX", pixDesc: "После подтверждения заказа вы получите QR-код и ключ PIX на электронную почту. Оплата подтверждается за несколько секунд.",
    boletoTitle: "Как работает Boleto", boletoDesc: "Квитанция об оплате будет отправлена на вашу электронную почту. Подтверждение может занять до 3 рабочих дней после оплаты.",
    finalizeBtn: "ОФОРМИТЬ ЗАКАЗ",
    summaryTitle: "Итог заказа",
    noModelSelected: "Модель не выбрана",
    remove: "Удалить",
    subtotalLabel: "Подытог", prodSg: " товар", prodPl: " товара",
    shippingLabel: "Доставка", totalLabel: "Итого",
    stockWarning: "Только 8 единиц на складе!",
    reservedPre: "Ваш заказ зарезервирован на ", reservedSuf: "",
    trustItems: [
      { label: "100% безопасная покупка",       desc: "Зашифрованный и защищённый платёж." },
      { label: "Бесплатная доставка",           desc: "Доставка без затрат в любой штат." },
      { label: "Гарантия 1 год",                desc: "Полное покрытие без бюрократии" },
      { label: "Специализированная поддержка",  desc: "Обслуживание специалистами Acquafy" },
    ],
    reviewsTitle: "Отзывы наших клиентов",
    reviewsSub: "более 3 200 довольных клиентов",
    reviewRoles: ["Клиент", "Предприниматель", "Потребитель"],
    reviewQuotes: [
      "\"Качество воды изменилось кардинально. Neo PLUS невероятен — моя семья обожает водородную воду!\"",
      "\"Я купил Neo INFINITY для офиса. 15\" сенсорная панель поражает всех. Поддержка безупречна.\"",
      "\"Быстрая установка, холодная вода сразу. Приложение очень удобно для контроля ресурса фильтров.\"",
    ],
    successTitle: "Заказ подтверждён!",
    successMsgPre: "Спасибо за покупку. Подтверждение будет отправлено на",
    successMsgSuf: ".", successEmailFallback: "ваш адрес эл. почты",
    backToSite: "← Вернуться на сайт",
    kits: [
      { name: "Набор фильтров Essentials (1 год)", desc: "UF-фильтры — совместимы со всей линейкой Neo Essentials. 12 месяцев без забот о замене." },
      { name: "Набор фильтров Premium (1 год)",    desc: "RO / Обратный осмос — совместимы со всей линейкой Neo Premium. Высокопроизводительные фильтры для продвинутых систем." },
    ],
    shipping: [
      { label: "Бесплатная доставка", desc: "Стандартная доставка — 5–7 рабочих дней" },
      { label: "Экспресс-доставка",   desc: "Прибытие за 2–3 рабочих дня" },
    ],
    errors: {
      nome: "Полное имя обязательно", email: "Эл. почта обязательна",
      telefone: "Телефон обязателен", telefoneInvalid: "Неверный телефон (код области + номер)",
      cep: "Почтовый индекс обязателен", cepInvalid: "Неверный почтовый индекс",
      rua: "Улица обязательна", numero: "Номер обязателен",
      bairro: "Район обязателен", cidade: "Город обязателен", uf: "Регион обязателен",
      cardNumber: "Номер карты обязателен", expiry: "Срок действия обязателен",
      cvc: "CVV обязателен", nameOnCard: "Имя на карте обязательно",
    },
  },
  ro: {
    filterTags: ["Toate", "Essentials", "Premium", "Blat", "Coloană", "Încorporat", "Apă carbogazoasă", "Apă hidrogenată"],
    steps: ["Model", "Date", "Livrare", "Extra", "Plată"],
    secureLabel: "PLATĂ SECURIZATĂ",
    step1Title: "Alegeți modelul", step1Sub: "Puteți selecta mai mult de un produs.",
    selectAtLeast: "Selectați cel puțin un model pentru a continua.",
    continueBtn: "CONTINUAȚI →", continueBtnWith: "CONTINUAȚI CU ", continueBtnSufSg: " PRODUS →", continueBtnSufPl: " PRODUSE →",
    step2Title: "Date personale", step2Sub: "Vom folosi aceste informații pentru a expedia comanda dvs.",
    deliveryAddr: "Adresă de livrare",
    labelNome: "Nume complet", phNome: "Numele dvs. complet",
    labelEmail: "E-mail", phEmail: "emailuldvs@email.com",
    labelTelefone: "Telefon / WhatsApp",
    labelCep: "Cod poștal",
    labelRua: "Stradă / Bulevard", phRua: "Str. Principală 1",
    labelNumero: "Număr",
    labelComplemento: "Apart., birou, etc.", phComplemento: "Apart., birou, bloc...",
    labelBairro: "Cartier", phBairro: "Cartierul dvs.",
    labelCidade: "Oraș", phCidade: "Orașul dvs.",
    labelEstado: "Județ",
    step3Title: "Opțiune de livrare", step3Sub: "Alegeți cum preferați să primiți comanda.",
    free: "GRATUIT",
    step4Title: "Adăugați la comandă", step4Sub: "Economisiți și asigurați-vă apa pură mai mult timp.",
    save: "Economisiți", addBtn: "Adaugă",
    continuePay: "CONTINUAȚI LA PLATĂ →",
    termsText1: "Continuând, acceptați", termsAnd: "și", termsText2: "noastre.",
    step5Title: "Metodă de plată", step5Sub: "Toate tranzacțiile sunt securizate și criptate.",
    payCard: "Card de credit", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "Număr card",
    labelExpiry: "Expirare (LL/AA)",
    labelCvc: "CVV",
    labelNameOnCard: "Nume pe card", phNameOnCard: "Numele așa cum apare pe card",
    pixTitle: "Cum funcționează PIX", pixDesc: "După confirmarea comenzii, veți primi un cod QR și cheia PIX pe e-mail. Plata este aprobată în câteva secunde.",
    boletoTitle: "Cum funcționează Boleto", boletoDesc: "Bonul de plată va fi trimis pe e-mailul dvs. Confirmarea poate dura până la 3 zile lucrătoare după plată.",
    finalizeBtn: "FINALIZAȚI COMANDA",
    summaryTitle: "Sumar comandă",
    noModelSelected: "Niciun model selectat",
    remove: "Elimină",
    subtotalLabel: "Subtotal", prodSg: " produs", prodPl: " produse",
    shippingLabel: "Livrare", totalLabel: "Total",
    stockWarning: "Doar 8 unități în stoc!",
    reservedPre: "Comanda dvs. este rezervată pentru ", reservedSuf: "",
    trustItems: [
      { label: "Cumpărare 100% sigură",  desc: "Plată criptată și protejată." },
      { label: "Livrare gratuită",        desc: "Livrare fără costuri în orice stat." },
      { label: "Garanție 1 an",           desc: "Acoperire totală fără birocrație" },
      { label: "Suport specializat",      desc: "Serviciu de la specialiștii Acquafy" },
    ],
    reviewsTitle: "Ce spun clienții noștri",
    reviewsSub: "peste 3.200 de clienți mulțumiți",
    reviewRoles: ["Client", "Antreprenor", "Consumatoare"],
    reviewQuotes: [
      "\"Calitatea apei s-a schimbat complet. Neo PLUS este incredibil — familia mea adoră apa hidrogenată!\"",
      "\"Am cumpărat Neo INFINITY pentru birou. Panoul touch de 15\" impresionează pe toată lumea. Suport impecabil.\"",
      "\"Instalare rapidă, apă rece imediat. Aplicația este foarte practică pentru monitorizarea duratei de viață a filtrelor.\"",
    ],
    successTitle: "Comandă confirmată!",
    successMsgPre: "Vă mulțumim pentru achiziție. Un e-mail de confirmare va fi trimis la",
    successMsgSuf: ".", successEmailFallback: "adresa dvs. de e-mail",
    backToSite: "← Înapoi la site",
    kits: [
      { name: "Kit filtre Essentials (1 an)", desc: "Filtre UF — compatibile cu întreaga linie Neo Essentials. 12 luni fără grija înlocuirii." },
      { name: "Kit filtre Premium (1 an)",    desc: "Filtre RO / Osmoză inversă — compatibile cu întreaga linie Neo Premium. Filtre de înaltă performanță pentru sisteme avansate." },
    ],
    shipping: [
      { label: "Livrare gratuită", desc: "Livrare standard — 5 până la 7 zile lucrătoare" },
      { label: "Livrare expres",   desc: "Sosire în 2 până la 3 zile lucrătoare" },
    ],
    errors: {
      nome: "Numele complet este obligatoriu", email: "E-mailul este obligatoriu",
      telefone: "Telefonul este obligatoriu", telefoneInvalid: "Telefon invalid (prefix + număr)",
      cep: "Codul poștal este obligatoriu", cepInvalid: "Cod poștal invalid",
      rua: "Strada este obligatorie", numero: "Numărul este obligatoriu",
      bairro: "Cartierul este obligatoriu", cidade: "Orașul este obligatoriu", uf: "Județul este obligatoriu",
      cardNumber: "Numărul cardului este obligatoriu", expiry: "Data expirării este obligatorie",
      cvc: "CVV este obligatoriu", nameOnCard: "Numele pe card este obligatoriu",
    },
  },
  he: {
    filterTags: ["הכל", "Essentials", "Premium", "שולחני", "עמידה", "מוטמע", "מים מוגזים", "מים מימניים"],
    steps: ["דגם", "פרטים", "משלוח", "תוספות", "תשלום"],
    secureLabel: "תשלום מאובטח",
    step1Title: "בחרו את הדגם שלכם", step1Sub: "ניתן לבחור יותר ממוצר אחד.",
    selectAtLeast: "בחרו לפחות דגם אחד כדי להמשיך.",
    continueBtn: "המשך →", continueBtnWith: "המשך עם ", continueBtnSufSg: " פריט →", continueBtnSufPl: " פריטים →",
    step2Title: "פרטים אישיים", step2Sub: "נשתמש במידע זה לשליחת ההזמנה שלכם.",
    deliveryAddr: "כתובת למשלוח",
    labelNome: "שם מלא", phNome: "שמכם המלא",
    labelEmail: "דוא\"ל", phEmail: "hamail@email.com",
    labelTelefone: "טלפון / WhatsApp",
    labelCep: "מיקוד",
    labelRua: "רחוב / שדרה", phRua: "רחוב הראשי 1",
    labelNumero: "מספר",
    labelComplemento: "דירה, משרד וכו'", phComplemento: "דירה, משרד, בניין...",
    labelBairro: "שכונה", phBairro: "השכונה שלכם",
    labelCidade: "עיר", phCidade: "עירכם",
    labelEstado: "מחוז",
    step3Title: "אפשרות משלוח", step3Sub: "בחרו כיצד תרצו לקבל את ההזמנה.",
    free: "חינם",
    step4Title: "הוסיפו להזמנה", step4Sub: "חסכו והבטיחו מים טהורים לאורך זמן.",
    save: "חיסכון", addBtn: "הוסף",
    continuePay: "המשך לתשלום →",
    termsText1: "בהמשך, אתם מסכימים ל", termsAnd: "ול", termsText2: "שלנו.",
    step5Title: "אמצעי תשלום", step5Sub: "כל העסקאות מאובטחות ומוצפנות.",
    payCard: "כרטיס אשראי", payPix: "PIX", payBoleto: "Boleto",
    labelCardNum: "מספר כרטיס",
    labelExpiry: "תוקף (MM/YY)",
    labelCvc: "CVV",
    labelNameOnCard: "שם על הכרטיס", phNameOnCard: "שם כפי שמודפס על הכרטיס",
    pixTitle: "איך PIX עובד", pixDesc: "לאחר אישור ההזמנה, תקבלו קוד QR ומפתח PIX במייל. התשלום מאושר תוך שניות.",
    boletoTitle: "איך Boleto עובד", boletoDesc: "שובר התשלום ישלח למייל שלכם. האישור עשוי להימשך עד 3 ימי עסקים לאחר התשלום.",
    finalizeBtn: "סיום ההזמנה",
    summaryTitle: "סיכום הזמנה",
    noModelSelected: "לא נבחר דגם",
    remove: "הסר",
    subtotalLabel: "סכום ביניים", prodSg: " פריט", prodPl: " פריטים",
    shippingLabel: "משלוח", totalLabel: "סה\"כ",
    stockWarning: "רק 8 יחידות במלאי!",
    reservedPre: "הזמנתכם שמורה למשך ", reservedSuf: "",
    trustItems: [
      { label: "רכישה 100% בטוחה",    desc: "תשלום מוצפן ומוגן." },
      { label: "משלוח חינם לכל הארץ", desc: "משלוח ללא עלות לכל מדינה." },
      { label: "אחריות לשנה",          desc: "כיסוי מלא ללא בירוקרטיה" },
      { label: "תמיכה מקצועית",        desc: "שירות על ידי מומחי Acquafy" },
    ],
    reviewsTitle: "מה אומרים הלקוחות שלנו",
    reviewsSub: "מעל 3,200 לקוחות מרוצים",
    reviewRoles: ["לקוח", "יזם", "צרכנית"],
    reviewQuotes: [
      "\"איכות המים השתנתה לגמרי. Neo PLUS מדהים — המשפחה שלי אוהבת את המים המימניים!\"",
      "\"קניתי את Neo INFINITY למשרד. מסך המגע של 15\" מרשים את כולם. תמיכה ללא רבב.\"",
      "\"התקנה מהירה, מים קרים מיד. האפליקציה מאוד נוחה למעקב אחר חיי המסנן.\"",
    ],
    successTitle: "ההזמנה אושרה!",
    successMsgPre: "תודה על הרכישה. אימייל אישור יישלח אל",
    successMsgSuf: ".", successEmailFallback: "כתובת המייל שלכם",
    backToSite: "← חזרה לאתר",
    kits: [
      { name: "ערכת פילטרים Essentials (שנה)", desc: "פילטרי UF — תואמים לכל קו Neo Essentials. 12 חודשים ללא דאגה לגבי החלפה." },
      { name: "ערכת פילטרים Premium (שנה)",    desc: "פילטרי RO / אוסמוזה הפוכה — תואמים לכל קו Neo Premium. פילטרים בעלי ביצועים גבוהים למערכות מתקדמות." },
    ],
    shipping: [
      { label: "משלוח חינם", desc: "משלוח רגיל — 5 עד 7 ימי עסקים" },
      { label: "משלוח מהיר", desc: "הגעה תוך 2 עד 3 ימי עסקים" },
    ],
    errors: {
      nome: "שם מלא הוא חובה", email: "דוא\"ל הוא חובה",
      telefone: "טלפון הוא חובה", telefoneInvalid: "טלפון לא תקין (קידומת + מספר)",
      cep: "מיקוד הוא חובה", cepInvalid: "מיקוד לא תקין",
      rua: "רחוב הוא חובה", numero: "מספר הוא חובה",
      bairro: "שכונה היא חובה", cidade: "עיר היא חובה", uf: "מחוז הוא חובה",
      cardNumber: "מספר כרטיס הוא חובה", expiry: "תוקף הוא חובה",
      cvc: "CVV הוא חובה", nameOnCard: "שם על הכרטיס הוא חובה",
    },
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatBRL(v: number) {
  return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

function isPremium(p: Product) {
  const g = PRODUCT_GROUPS.find((gr) => gr.products.some((x) => x.id === p.id));
  return g?.linha === "Premium";
}

/* ─── Step badge ─────────────────────────────────────────────────────────── */
function StepBadge({ n }: { n: number }) {
  return (
    <div className="w-[50px] h-[50px] rounded-full bg-[#0233c3] flex items-center justify-center shrink-0">
      <span className="text-[22px] font-['Avenir_LT_Pro:95_Black'] text-white leading-none">{n}</span>
    </div>
  );
}

/* ─── Form field ─────────────────────────────────────────────────────────── */
function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2)  return d.length ? `(${d}` : "";
  if (d.length <= 6)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}
function maskCEP(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0,5)}-${d.slice(5)}` : d;
}
type CardBrand = "visa" | "mastercard" | "amex" | "elo" | "hipercard";
function detectCardBrand(v: string): CardBrand | null {
  const d = v.replace(/\D/g, "");
  if (!d) return null;
  if (/^3[47]/.test(d)) return "amex";
  if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(d)) return "elo";
  if (/^(606282|3841|384)/.test(d)) return "hipercard";
  if (/^5[1-5]/.test(d) || /^2[2-7]\d{2}/.test(d)) return "mastercard";
  if (/^4/.test(d)) return "visa";
  return null;
}
function maskCardNumber(v: string, brand: CardBrand | null): string {
  const d = v.replace(/\D/g, "");
  if (brand === "amex") {
    const s = d.slice(0, 15);
    if (s.length <= 4) return s;
    if (s.length <= 10) return `${s.slice(0,4)} ${s.slice(4)}`;
    return `${s.slice(0,4)} ${s.slice(4,10)} ${s.slice(10)}`;
  }
  const s = d.slice(0, 16);
  return s.replace(/(.{4})/g, "$1 ").trim();
}
function maskExpiry(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0,2)} / ${d.slice(2)}`;
}

function FormField({
  id, label, placeholder, type = "text", required = false,
  error, value, onChange, children,
}: {
  id?: string; label: string; placeholder?: string; type?: string;
  required?: boolean; error?: string; value?: string;
  onChange?: (val: string) => void; children?: React.ReactNode;
}) {
  return (
    <div id={id} className="flex flex-col gap-[10px] w-full">
      <div className="flex gap-[6px] items-center">
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-[#333]">{label}</span>
        {required && <span className="text-[#dc2626] text-[14px]">*</span>}
      </div>
      {children ?? (
        <div className={`border rounded-[12px] px-[16px] py-[14px] w-full transition-colors ${error ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"}`}>
          <input
            type={type}
            placeholder={placeholder}
            value={value ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full text-[16px] text-[#333] placeholder:text-[#aab2bc] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']"
          />
        </div>
      )}
      {error && <p className="text-[13px] text-[#dc2626]">{error}</p>}
    </div>
  );
}

/* ─── Stars ──────────────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex gap-[4px]">
      {[0,1,2,3,4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#dfa727">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Qty controls ───────────────────────────────────────────────────────── */
function QtyControl({ qty, onDec, onInc, onRemove, premium, removeLabel = "Remover" }: {
  qty: number; onDec: () => void; onInc: () => void; onRemove: () => void; premium?: boolean; removeLabel?: string;
}) {
  const accent = premium ? "#9f3df5" : "#0233c3";
  return (
    <div className="flex items-center justify-between w-full gap-[6px] mt-[2px]">
      <button type="button" onClick={onRemove}
        className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#dc2626] underline leading-none shrink-0">
        {removeLabel}
      </button>
      <div className="flex items-center gap-[4px] shrink-0">
        <button type="button" onClick={onDec}
          className="w-[24px] h-[24px] rounded-full border flex items-center justify-center text-[16px] leading-none transition-colors hover:bg-gray-50"
          style={{ borderColor: accent, color: accent }}>
          −
        </button>
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] min-w-[20px] text-center" style={{ color: accent }}>
          {qty}
        </span>
        <button type="button" onClick={onInc}
          className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[16px] leading-none text-white transition-colors"
          style={{ background: accent }}>
          +
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function CheckinMain() {
  const { lang } = useLang();
  const t = T[lang];

  const FILTER_KITS = [
    { id: "essentials" as KitId, name: t.kits[0].name, desc: t.kits[0].desc, price: 290, originalPrice: 490, color: "#0233c3", bg: "#f0f4ff" },
    { id: "premium"    as KitId, name: t.kits[1].name, desc: t.kits[1].desc, price: 390, originalPrice: 590, color: "#9f3df5", bg: "#f5f0ff" },
  ];
  const SHIPPING_OPTIONS = [
    { id: "gratis",  label: t.shipping[0].label, desc: t.shipping[0].desc, price: 0    },
    { id: "express", label: t.shipping[1].label, desc: t.shipping[1].desc, price: 4990 },
  ];

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [done, setDone] = useState(false);

  /* cart: { id, qty }[] */
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const [kitQty, setKitQty] = useState<Record<KitId, number>>({ essentials: 0, premium: 0 });
  const [shippingOption, setShippingOption] = useState("gratis");
  const [cepLoading, setCepLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | "boleto">("card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const timer = useCountdown(600);

  const [form, setForm] = useState({
    nome: "", email: "", telefone: "",
    cep: "", rua: "", numero: "", complemento: "",
    bairro: "", cidade: "", uf: "",
    cardNumber: "", expiry: "", cvc: "", nameOnCard: "",
  });

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    // ?produtos=neo-up:1,neo-fit:2 (from CartProvider "Finalizar compra")
    const produtos = params.get("produtos");
    if (produtos) {
      const items = produtos.split(",")
        .map((s) => { const [id, q] = s.split(":"); return { id, qty: parseInt(q) || 1 }; })
        .filter((i) => ALL_PRODUCTS.find((p) => p.id === i.id));
      if (items.length > 0) { setCart(items); return; }
    }
    // ?produto=neo-up (legacy single-product link)
    const produto = params.get("produto");
    if (produto && ALL_PRODUCTS.find((p) => p.id === produto)) {
      setCart([{ id: produto, qty: 1 }]);
    }
  }, []);

  /* ── Cart helpers ──────────────────────────────────────────────────────── */
  const cartItems = useMemo(
    () => cart.map(({ id, qty }) => ({ product: ALL_PRODUCTS.find((p) => p.id === id)!, qty })).filter((x) => x.product),
    [cart]
  );
  const productsSubtotal = useMemo(() => cartItems.reduce((sum, { product, qty }) => sum + product.price * qty, 0), [cartItems]);
  const kitsSubtotal = FILTER_KITS.reduce((sum, k) => sum + k.price * kitQty[k.id], 0);
  const shippingCost = SHIPPING_OPTIONS.find((o) => o.id === shippingOption)?.price ?? 0;
  const grandTotal = productsSubtotal + kitsSubtotal + shippingCost;
  const cardBrand = detectCardBrand(form.cardNumber);
  const totalQty = useMemo(() => cartItems.reduce((s, { qty }) => s + qty, 0), [cartItems]);

  function toggleCart(p: Product) {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      if (exists) return prev.filter((x) => x.id !== p.id);
      return [...prev, { id: p.id, qty: 1 }];
    });
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) => prev.map((x) => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }

  function goToStep(n: 1 | 2 | 3 | 4 | 5) {
    setStep(n);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── Filtered groups — always merged by linha (Essentials / Premium) ──── */
  const filteredGroups = useMemo(() => {
    let base = PRODUCT_GROUPS;
    if (activeFilter === "Essentials") base = base.filter((g) => g.linha === "Essentials");
    else if (activeFilter === "Premium") base = base.filter((g) => g.linha === "Premium");
    else if (activeFilter === "Bancada" || activeFilter === "Coluna" || activeFilter === "Embutido")
      base = base.filter((g) => g.formato === activeFilter);
    else if (activeFilter === "Água com Gás")
      base = base.map((g) => ({ ...g, products: g.products.filter((p) => p.gas) })).filter((g) => g.products.length > 0);
    else if (activeFilter === "Água Hidrogenada")
      base = base.map((g) => ({ ...g, products: g.products.filter((p) => p.h2) })).filter((g) => g.products.length > 0);

    /* merge groups with same linha into one */
    const merged: { linha: string; products: Product[] }[] = [];
    for (const g of base) {
      const existing = merged.find((m) => m.linha === g.linha);
      if (existing) existing.products.push(...g.products);
      else merged.push({ linha: g.linha, products: [...g.products] });
    }
    return merged;
  }, [activeFilter]);

  /* ── Validation ────────────────────────────────────────────────────────── */
  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  useEffect(() => {
    const digits = form.cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    fetch(`https://viacep.com.br/ws/${digits}/json/`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            rua:    data.logradouro || prev.rua,
            bairro: data.bairro     || prev.bairro,
            cidade: data.localidade || prev.cidade,
            uf:     data.uf         || prev.uf,
          }));
          setErrors((prev) => {
            const n = { ...prev };
            ["rua", "bairro", "cidade", "uf"].forEach((k) => delete n[k]);
            return n;
          });
        }
      })
      .catch(() => {})
      .finally(() => setCepLoading(false));
  }, [form.cep]);

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = t.errors.nome;
    if (!form.email.trim()) errs.email = t.errors.email;
    if (!form.telefone.trim()) errs.telefone = t.errors.telefone;
    else if (form.telefone.replace(/\D/g, "").length < 10) errs.telefone = t.errors.telefoneInvalid;
    if (!form.cep.trim()) errs.cep = t.errors.cep;
    else if (form.cep.replace(/\D/g, "").length !== 8) errs.cep = t.errors.cepInvalid;
    if (!form.rua.trim()) errs.rua = t.errors.rua;
    if (!form.numero.trim()) errs.numero = t.errors.numero;
    if (!form.bairro.trim()) errs.bairro = t.errors.bairro;
    if (!form.cidade.trim()) errs.cidade = t.errors.cidade;
    if (!form.uf) errs.uf = t.errors.uf;
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      document.getElementById(Object.keys(errs)[0])?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (paymentMethod !== "card") return true;
    const errs: Record<string, string> = {};
    if (!form.cardNumber.trim()) errs.cardNumber = t.errors.cardNumber;
    if (!form.expiry.trim()) errs.expiry = t.errors.expiry;
    if (!form.cvc.trim()) errs.cvc = t.errors.cvc;
    if (!form.nameOnCard.trim()) errs.nameOnCard = t.errors.nameOnCard;
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      document.getElementById(Object.keys(errs)[0])?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const STEPS = t.steps;

  if (!mounted) return null;

  /* ── Success ─────────────────────────────────────────────────────────── */
  if (done) {
    return (
      <section className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-[24px] px-5 py-20 text-center">
        <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <p className="font-['Avenir_LT_Pro:95_Black'] text-[28px] text-[#1f2e91] leading-tight">{t.successTitle}</p>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#555] mt-2 max-w-[420px] mx-auto leading-relaxed">
            {t.successMsgPre}{" "}
            <strong className="font-['Avenir_LT_Pro:85_Heavy']">{form.email || t.successEmailFallback}</strong>{t.successMsgSuf}
          </p>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-white font-['Avenir_LT_Pro:85_Heavy'] text-[16px] px-8 py-3 rounded-[12px] transition-colors" style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
          {t.backToSite}
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full bg-white pt-[40px] pb-[120px] lg:py-[40px] px-5">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-[24px]">

        {/* ── Logo strip ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-[12px]">
          <div className="flex items-center gap-[8px] bg-white border border-[#0233c3] rounded-full px-[16px] py-[8px]">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <rect x="1" y="6" width="12" height="9" rx="2" stroke="#0233c3" strokeWidth="1.5"/>
              <path d="M4 6V4.5a3 3 0 0 1 6 0V6" stroke="#0233c3" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3]">{t.secureLabel}</span>
          </div>
        </div>

        {/* ── Step bar ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap bg-[#f6f9fe] rounded-[16px] overflow-hidden">
          {STEPS.map((label, i) => {
            const n = (i + 1) as 1 | 2 | 3 | 4 | 5;
            const isActive = step === n;
            const isDone = step > n;
            return (
              <button key={n} type="button"
                onClick={() => { if (isDone) goToStep(n); }}
                className={`flex-[1_0_0] min-w-[80px] flex flex-col items-center gap-[8px] py-[16px] border-b-[3px] transition-colors ${isActive || isDone ? "border-[#0233c3]" : "border-transparent"}`}>
                <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors ${isActive ? "bg-[#0233c3]" : isDone ? "bg-[#36ae5c]" : "bg-[#e8ecf4]"}`}>
                  {isDone ? (
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <path d="M1 6l4.5 4.5L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span className={`text-[16px] font-['Avenir_LT_Pro:95_Black'] leading-none ${isActive ? "text-white" : "text-[#aab2bc]"}`}>{n}</span>
                  )}
                </div>
                <span className={`text-[13px] font-['Avenir_LT_Pro:85_Heavy'] ${isActive || isDone ? "text-[#333]" : "text-[#aab2bc]"}`}>{label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Two-column layout ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-[24px] items-start">

          {/* ══ LEFT COLUMN ════════════════════════════════════════════════ */}
          <div className="flex-[1_0_0] min-w-[300px] flex flex-col gap-[20px]">

            {/* ────────────── STEP 1: ESCOLHA O MODELO ─────────────────── */}
            {step === 1 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[20px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={1} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">{t.step1Title}</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">{t.step1Sub}</p>
                    </div>
                  </div>

                  {/* ── Filter tags ─────────────────────────────────────── */}
                  <div className="flex flex-wrap gap-[8px]">
                    {FILTER_TAGS_PT.map((tag, i) => {
                      const active = activeFilter === tag;
                      let activeBg = "#0233c3";
                      if (tag === "Premium") activeBg = "#9f3df5";
                      if (tag === "Água com Gás") activeBg = "#0569ff";
                      if (tag === "Água Hidrogenada") activeBg = "#36ae5c";
                      return (
                        <button key={tag} type="button"
                          onClick={() => setActiveFilter(active ? "Todos" : tag)}
                          className={`font-['Avenir_LT_Pro:85_Heavy'] text-[13px] px-[12px] py-[6px] rounded-full border transition-all whitespace-nowrap ${
                            active
                              ? "text-white border-transparent"
                              : "bg-white text-[#555] border-[#e8ecf4] hover:border-[#0233c3] hover:text-[#0233c3]"
                          }`}
                          style={active ? { background: activeBg } : {}}>
                          {t.filterTags[i]}
                        </button>
                      );
                    })}
                  </div>

                  {/* ── Product groups ──────────────────────────────────── */}
                  <div className="flex flex-col gap-[24px]">
                    {filteredGroups.map((group) => (
                      <div key={group.linha} className="flex flex-col gap-[12px]">
                        {/* Line header */}
                        <div className="flex items-center gap-[8px]">
                          <span className={`font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white px-[12px] py-[4px] rounded-full whitespace-nowrap ${group.linha === "Premium" ? "bg-[#9f3df5]" : "bg-[#0569ff]"}`}>
                            Neo {group.linha}
                          </span>
                          <div className="flex-1 h-px bg-[#f0f3f8]" />
                        </div>

                        {/* Cards grid */}
                        <div className="grid gap-[10px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(142px, 1fr))" }}>
                          {group.products.map((p) => {
                            const entry = cart.find((x) => x.id === p.id);
                            const selected = !!entry;
                            const prem = isPremium(p);
                            const accent = prem ? "#9f3df5" : "#0233c3";
                            const selBg = prem ? "bg-[#faf0ff]" : "bg-[#f0f4ff]";
                            return (
                              <div key={p.id}
                                className={`relative flex flex-col items-center gap-[6px] p-[12px] rounded-[14px] transition-all ${selected ? selBg : "bg-white"}`}>
                                {/* Badge */}
                                {p.badge && (
                                  <span className={`absolute top-[7px] right-[7px] text-[9px] font-['Avenir_LT_Pro:85_Heavy'] px-[6px] py-[3px] rounded-full text-white ${p.badge === "Mais Vendido" ? "bg-[#36ae5c]" : "bg-[#9f3df5]"}`}>
                                    {p.badge}
                                  </span>
                                )}
                                {/* Selected check */}
                                {selected && (
                                  <div className="absolute top-[7px] left-[7px] w-[20px] h-[20px] rounded-full flex items-center justify-center" style={{ background: accent }}>
                                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                      <path d="M1 3.5l2 2L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                )}
                                {/* Clickable image + name area */}
                                <button type="button" onClick={() => toggleCart(p)} className="w-full flex flex-col items-center gap-[4px]">
                                  <img src={p.img} alt={p.name} className="h-[100px] w-auto object-contain pointer-events-none" />
                                  <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-center leading-tight w-full`} style={{ color: selected ? accent : "#1f2e91" }}>
                                    {p.name}
                                  </p>
                                  <p className="font-['Avenir_LT_Pro:95_Black'] text-[13px] text-center w-full" style={{ color: accent }}>{formatBRL(p.price)}</p>
                                </button>
                                {/* Qty controls (only when in cart) */}
                                {selected && entry && (
                                  <QtyControl
                                    qty={entry.qty}
                                    onDec={() => updateQty(p.id, -1)}
                                    onInc={() => updateQty(p.id, +1)}
                                    onRemove={() => removeFromCart(p.id)}
                                    premium={prem}
                                    removeLabel={t.remove}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {cart.length === 0 && (
                  <p className="text-[14px] text-[#dc2626] font-['Avenir_LT_Pro:55_Roman'] text-center">{t.selectAtLeast}</p>
                )}

                <button type="button" disabled={cart.length === 0}
                  onClick={() => { if (cart.length > 0) goToStep(2); }}
                  className={`w-full h-[56px] rounded-[12px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white transition-all ${cart.length > 0 ? "hover:opacity-90" : "opacity-40 cursor-not-allowed"}`}
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  {cart.length > 0 ? `${t.continueBtnWith}${totalQty}${totalQty > 1 ? t.continueBtnSufPl : t.continueBtnSufSg}` : t.continueBtn}
                </button>
              </>
            )}

            {/* ────────────── STEP 2: DADOS DE ENTREGA ─────────────────── */}
            {step === 2 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={2} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">{t.step2Title}</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">{t.step2Sub}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <FormField id="nome" label={t.labelNome} placeholder={t.phNome} required error={errors.nome} value={form.nome} onChange={(v) => updateField("nome", v)} />
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[1_0_0] min-w-[200px]">
                        <FormField id="email" label={t.labelEmail} placeholder={t.phEmail} type="email" required error={errors.email} value={form.email} onChange={(v) => updateField("email", v)} />
                      </div>
                      <div className="flex-[1_0_0] min-w-[160px]">
                        <FormField id="telefone" label={t.labelTelefone} placeholder="(11) 99999-9999" type="tel" required error={errors.telefone} value={form.telefone} onChange={(v) => updateField("telefone", maskPhone(v))} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#1f2e91]">{t.deliveryAddr}</p>
                  <div className="flex flex-col gap-[16px]">
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[1_0_0] min-w-[160px]">
                        <FormField id="cep" label={t.labelCep} placeholder="00000-000" required error={errors.cep}>
                          <div className={`border rounded-[12px] px-[16px] py-[14px] w-full transition-colors flex items-center gap-[8px] ${errors.cep ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"}`}>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="00000-000"
                              value={form.cep}
                              onChange={(e) => updateField("cep", maskCEP(e.target.value))}
                              className="flex-1 text-[16px] text-[#333] placeholder:text-[#aab2bc] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']"
                            />
                            {cepLoading && (
                              <svg className="animate-spin size-[16px] shrink-0" style={{ color: "#0233c3" }} viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            )}
                          </div>
                        </FormField>
                      </div>
                      <div className="flex-[2_0_0] min-w-[220px]">
                        <FormField id="rua" label={t.labelRua} placeholder={t.phRua} required error={errors.rua} value={form.rua} onChange={(v) => updateField("rua", v)} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[1_0_0] min-w-[100px]">
                        <FormField id="numero" label={t.labelNumero} placeholder="123" required error={errors.numero} value={form.numero} onChange={(v) => updateField("numero", v)} />
                      </div>
                      <div className="flex-[2_0_0] min-w-[200px]">
                        <FormField id="complemento" label={t.labelComplemento} placeholder={t.phComplemento} value={form.complemento} onChange={(v) => updateField("complemento", v)} />
                      </div>
                    </div>
                    <FormField id="bairro" label={t.labelBairro} placeholder={t.phBairro} required error={errors.bairro} value={form.bairro} onChange={(v) => updateField("bairro", v)} />
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[2_0_0] min-w-[180px]">
                        <FormField id="cidade" label={t.labelCidade} placeholder={t.phCidade} required error={errors.cidade} value={form.cidade} onChange={(v) => updateField("cidade", v)} />
                      </div>
                      <div className="flex-[1_0_0] min-w-[120px]">
                        <FormField id="uf" label={t.labelEstado} required error={errors.uf}>
                          <div className={`border rounded-[12px] px-[16px] py-[14px] w-full transition-colors ${errors.uf ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"}`}>
                            <select value={form.uf} onChange={(e) => updateField("uf", e.target.value)}
                              className="w-full text-[16px] text-[#333] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']">
                              <option value="">UF</option>
                              {BR_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </FormField>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="button"
                  onClick={() => { if (validateStep2()) goToStep(3); }}
                  className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  {t.continueBtn}
                </button>
              </>
            )}

            {/* ────────────── STEP 3: FRETE ────────────────────────────── */}
            {step === 3 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={3} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">{t.step3Title}</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">{t.step3Sub}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    {SHIPPING_OPTIONS.map((opt) => {
                      const active = shippingOption === opt.id;
                      return (
                        <button key={opt.id} type="button" onClick={() => setShippingOption(opt.id)}
                          className="rounded-[14px] border-2 p-[20px] flex items-center gap-[16px] text-left transition-all"
                          style={{ borderColor: active ? "#0233c3" : "#e8ecf4", background: active ? "#f0f4ff" : "#fafbff" }}>
                          <div className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                            style={{ borderColor: active ? "#0233c3" : "#cbd0d4" }}>
                            {active && <div className="w-[11px] h-[11px] rounded-full bg-[#0233c3]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-tight" style={{ color: active ? "#0233c3" : "#1f2e91" }}>{opt.label}</p>
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#777] mt-[2px]">{opt.desc}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            {opt.price === 0
                              ? <span className="font-['Avenir_LT_Pro:95_Black'] text-[16px] text-[#36ae5c]">{t.free}</span>
                              : <span className="font-['Avenir_LT_Pro:95_Black'] text-[16px] text-[#0233c3]">{formatBRL(opt.price)}</span>
                            }
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button type="button" onClick={() => goToStep(4)}
                  className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  {t.continueBtn}
                </button>
              </>
            )}

            {/* ────────────── STEP 4: ADICIONAL ────────────────────────── */}
            {step === 4 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={4} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">{t.step4Title}</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">{t.step4Sub}</p>
                    </div>
                  </div>

                  {FILTER_KITS.map((kit) => {
                    const qty = kitQty[kit.id];
                    const active = qty > 0;
                    return (
                      <div key={kit.id}
                        className="rounded-[16px] border-2 transition-all overflow-hidden"
                        style={{ borderColor: active ? kit.color : "#e8ecf4", background: active ? kit.bg : "#fafbff" }}>
                        {/* Top row: info + price */}
                        <div className="p-[20px] flex flex-wrap gap-[16px] items-center w-full">
                          <div className="flex-1 min-w-[160px] flex flex-col gap-[3px]">
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-tight" style={{ color: active ? kit.color : "#1f2e91" }}>{kit.name}</p>
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#777] leading-normal">{kit.desc}</p>
                          </div>
                          <div className="flex flex-col items-end shrink-0 gap-[1px]">
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#aab2bc] line-through">{formatBRL(kit.originalPrice)}</p>
                            <p className="font-['Avenir_LT_Pro:95_Black'] text-[18px]" style={{ color: kit.color }}>{formatBRL(kit.price)}</p>
                          </div>
                        </div>
                        {/* Bottom row: savings badge + qty controls */}
                        <div className="px-[20px] pb-[16px] flex items-center justify-between gap-[12px]">
                          <div className="rounded-full px-[12px] py-[4px]" style={{ background: `${kit.color}18` }}>
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px]" style={{ color: kit.color }}>
                              {t.save} {formatBRL(kit.originalPrice - kit.price)}
                            </p>
                          </div>
                          {/* Qty control */}
                          {active ? (
                            <div className="flex items-center gap-[8px]">
                              <button type="button"
                                onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: Math.max(0, prev[kit.id] - 1) }))}
                                className="w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center text-[18px] leading-none transition-colors hover:bg-white"
                                style={{ borderColor: kit.color, color: kit.color }}>−</button>
                              <span className="font-['Avenir_LT_Pro:95_Black'] text-[16px] min-w-[20px] text-center" style={{ color: kit.color }}>{qty}</span>
                              <button type="button"
                                onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: prev[kit.id] + 1 }))}
                                className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[18px] leading-none text-white transition-opacity hover:opacity-80"
                                style={{ background: kit.color }}>+</button>
                            </div>
                          ) : (
                            <button type="button"
                              onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: 1 }))}
                              className="flex items-center gap-[6px] rounded-full px-[16px] py-[6px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white transition-opacity hover:opacity-85"
                              style={{ background: kit.color }}>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                              </svg>
                              {t.addBtn}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button type="button" onClick={() => goToStep(5)}
                  className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  {t.continuePay}
                </button>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#777] text-center">
                  {t.termsText1}{" "}
                  <Link href="/termos-de-uso" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0569ff] hover:underline">Termos de Uso</Link>{" "}{t.termsAnd}{" "}
                  <Link href="/politicas-privacidade" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#9f3df5] hover:underline">Política de Privacidade</Link>{t.termsText2}
                </p>
              </>
            )}

            {/* ────────────── STEP 5: PAGAMENTO ────────────────────────── */}
            {step === 5 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={5} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">{t.step5Title}</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">{t.step5Sub}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-wrap gap-[12px]">
                      {([
                        { id: "card" as const, label: t.payCard, icon: (<svg width="22" height="16" viewBox="0 0 22 16" fill="none"><rect x="1" y="1" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 5h20" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="9" width="4" height="2" rx="0.5" fill="currentColor"/></svg>) },
                        { id: "pix" as const, label: t.payPix, icon: (<svg width="22" height="22" viewBox="0 0 578.98 578.98" fill="currentColor"><path d="M464.82 446.04l-103.18 103.18c-39.68,39.68 -104.61,39.68 -144.29,0l-103.04 -103.04c19.22,-0.18 35.61,-2.5 49.17,-6.98 14.21,-4.69 25.32,-11.73 33.35,-21.13l83.19 -84.54c4.27,-3.61 8.51,-5.43 12.7,-5.45 4.19,0.02 8.43,1.84 12.7,5.45l83.19 84.54c8.03,9.4 19.15,16.44 33.35,21.13 12.05,3.97 26.34,6.25 42.86,6.84zm-350.97 -312.78l103.5 -103.5c39.68,-39.68 104.61,-39.68 144.29,0l103.62 103.62c-16.71,0.56 -31.14,2.84 -43.3,6.85 -14.21,4.69 -25.32,11.73 -33.35,21.13l-83.19 84.54c-4.27,3.61 -8.51,5.43 -12.7,5.45 -4.19,-0.02 -8.43,-1.84 -12.7,-5.45l-83.19 -84.54c-8.03,-9.4 -19.15,-16.44 -33.35,-21.13 -13.67,-4.51 -30.21,-6.84 -49.63,-6.98zm-84.09 84.09l48.18 -48.18c36.94,-5.95 61.14,-3.63 78.45,2.47 17.52,6.17 28.02,16.24 37.54,25.5l0 0c60.63,61.3 79.88,76.43 79.93,76.47l0.03 0.02c2.38,1.67 5.65,3.09 9.13,4.09 3.56,1.03 7.37,1.63 10.68,1.63 3.31,0 6.97,-0.58 10.38,-1.59 3.4,-1.01 6.58,-2.44 8.95,-4.14l0.03 -0.02c0.06,-0.04 19.31,-15.17 79.93,-76.47l0 0c9.52,-9.26 20.02,-19.33 37.54,-25.5 15.81,-5.57 37.37,-7.99 69.14,-3.83l49.55 49.55c39.68,39.68 39.68,104.61 0,144.29l-50.24 50.24c-31.39,4.03 -52.75,1.61 -68.44,-3.92 -17.52,-6.17 -28.02,-16.24 -37.54,-25.5l0 0c-60.63,-61.3 -79.88,-76.43 -79.93,-76.47l-0.03 -0.02c-2.37,-1.7 -5.55,-3.14 -8.95,-4.14 -3.41,-1.01 -7.06,-1.59 -10.38,-1.59 -3.32,0 -7.12,0.61 -10.68,1.63 -3.49,1.01 -6.76,2.43 -9.13,4.09l-0.03 0.02c-0.06,0.04 -19.31,15.17 -79.93,76.47l0 0c-9.52,9.26 -20.02,19.33 -37.54,25.5 -17.2,6.06 -41.2,8.39 -77.73,2.59l-48.9 -48.9c-39.68,-39.68 -39.68,-104.61 0,-144.29z"/></svg>) },
                        { id: "boleto" as const, label: t.payBoleto, icon: (<svg width="22" height="18" viewBox="0 0 22 18" fill="none"><rect x="1" y="1" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 5v8M7 5v8M10 5v8M13 5v8M15 5v8M17 5v8" stroke="currentColor" strokeWidth="1.5"/></svg>) },
                      ]).map((m) => (
                        <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)}
                          className={`flex-[1_0_0] min-w-[120px] flex flex-col gap-[8px] items-center justify-center px-[12px] py-[16px] rounded-[12px] border-[1.5px] transition-all ${paymentMethod === m.id ? "bg-[#f0f4ff] border-[#0233c3] text-[#0233c3]" : "bg-white border-[#e8ecf4] text-[#777] hover:border-[#0569ff]"}`}>
                          {m.icon}
                          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-center leading-tight">{m.label}</span>
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "card" && (
                      <div className="flex flex-col gap-[16px]">
                        <FormField id="cardNumber" label={t.labelCardNum} required error={errors.cardNumber}>
                          <div className={`border rounded-[12px] px-[16px] py-[14px] w-full transition-colors flex items-center gap-[10px] ${errors.cardNumber ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"}`}>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="0000 0000 0000 0000"
                              value={form.cardNumber}
                              onChange={(e) => {
                                const brand = detectCardBrand(e.target.value);
                                updateField("cardNumber", maskCardNumber(e.target.value, brand));
                              }}
                              className="flex-1 min-w-0 text-[16px] text-[#333] placeholder:text-[#aab2bc] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']"
                            />
                            <div className="flex items-center gap-[3px] shrink-0">
                              {([
                                ["visa",       "Visa"],
                                ["mastercard", "Mastercard"],
                                ["elo",        "Elo"],
                                ["amex",       "American Express"],
                                ["hipercard",  "Hipercard"],
                              ] as [CardBrand, string][]).map(([id, alt]) => (
                                <img key={id} src={`/figma-assets/brand-${id}.svg`} alt={alt} width={34} height={22}
                                  className={`rounded-[3px] transition-opacity duration-150 ${cardBrand === null || cardBrand === id ? "opacity-100" : "opacity-20"}`} />
                              ))}
                            </div>
                          </div>
                        </FormField>
                        <div className="flex flex-wrap gap-[16px]">
                          <div className="flex-[1_0_0] min-w-[160px]">
                            <FormField id="expiry" label={t.labelExpiry} placeholder="MM / AA" required error={errors.expiry} value={form.expiry} onChange={(v) => updateField("expiry", maskExpiry(v))} />
                          </div>
                          <div className="flex-[1_0_0] min-w-[120px]">
                            <FormField id="cvc" label={t.labelCvc} placeholder="123" required error={errors.cvc} value={form.cvc} onChange={(v) => updateField("cvc", v.replace(/\D/g, "").slice(0, cardBrand === "amex" ? 4 : 3))} />
                          </div>
                        </div>
                        <FormField id="nameOnCard" label={t.labelNameOnCard} placeholder={t.phNameOnCard} required error={errors.nameOnCard} value={form.nameOnCard} onChange={(v) => updateField("nameOnCard", v.toUpperCase())} />
                      </div>
                    )}
                    {paymentMethod === "pix" && (
                      <div className="bg-[#f6f9fe] border border-[#0569ff] rounded-[12px] p-[20px] flex flex-col gap-[8px]">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">{t.pixTitle}</p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555] leading-relaxed">{t.pixDesc}</p>
                      </div>
                    )}
                    {paymentMethod === "boleto" && (
                      <div className="bg-[#f6f9fe] border border-[#dfa727] rounded-[12px] p-[20px] flex flex-col gap-[8px]">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">{t.boletoTitle}</p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555] leading-relaxed">{t.boletoDesc}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button type="button" onClick={() => { if (validateStep4()) setDone(true); }}
                  className="w-full h-[60px] rounded-[12px] flex items-center justify-center gap-[10px] font-['Avenir_LT_Pro:95_Black'] text-[17px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <rect x="1" y="7" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                    <path d="M5 7V5a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {t.finalizeBtn} — {formatBRL(grandTotal)}
                </button>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#777] text-center">
                  {t.termsText1}{" "}
                  <Link href="/termos-de-uso" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0569ff] hover:underline">Termos de Uso</Link>{" "}{t.termsAnd}{" "}
                  <Link href="/politicas-privacidade" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#9f3df5] hover:underline">Política de Privacidade</Link>{t.termsText2}
                </p>
              </>
            )}
          </div>

          {/* ══ RIGHT COLUMN ════════════════════════════════════════════════ */}
          <div className="flex-[1_0_0] min-w-[280px] max-w-[480px] self-start sticky top-[100px]">

            <div className="bg-[#f6f9fe] rounded-[16px] flex flex-col">

              {/* Header fixo */}
              <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[16px] shrink-0">
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[20px] text-[#1f2e91]">{t.summaryTitle}</p>
                {totalQty > 0 && (
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white bg-[#0233c3] px-[10px] py-[4px] rounded-full">
                    {totalQty}{totalQty > 1 ? t.prodPl : t.prodSg}
                  </span>
                )}
              </div>

              {/* Lista de produtos — com scroll */}
              <div className="px-[24px] flex flex-col gap-[16px] pb-[16px]">
                {cartItems.length > 0 ? (
                  <div className="flex flex-col gap-[16px]">
                    {cartItems.map(({ product: p, qty }) => {
                      const prem = isPremium(p);
                      const accent = prem ? "#9f3df5" : "#0233c3";
                      return (
                        <div key={p.id} className="flex gap-[12px] items-center border-b border-[#f0f0f0] pb-[16px] last:border-b-0 last:pb-0">
                          <div className="w-[80px] h-[80px] shrink-0 flex items-center justify-center bg-white rounded-[10px]">
                            <img src={p.img} alt={p.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-tight" style={{ color: "#1f2e91" }}>{p.name}</p>
                            <p className="font-['Avenir_LT_Pro:95_Black'] text-[14px]" style={{ color: accent }}>{formatBRL(p.price)}</p>
                            <div className="flex items-center gap-[6px] mt-[4px]">
                              <button type="button" onClick={() => updateQty(p.id, -1)}
                                className="w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[14px] leading-none hover:bg-gray-50"
                                style={{ borderColor: accent, color: accent }}>−</button>
                              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] min-w-[18px] text-center" style={{ color: accent }}>{qty}</span>
                              <button type="button" onClick={() => updateQty(p.id, +1)}
                                className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[14px] leading-none text-white"
                                style={{ background: accent }}>+</button>
                              <button type="button" onClick={() => removeFromCart(p.id)}
                                className="ml-auto font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#dc2626] underline leading-none">{t.remove}</button>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="font-['Avenir_LT_Pro:95_Black'] text-[15px]" style={{ color: accent }}>{formatBRL(p.price * qty)}</p>
                            {qty > 1 && <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#aab2bc]">× {qty}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#aab2bc] text-center py-[16px]">{t.noModelSelected}</p>
                )}

                {FILTER_KITS.filter((k) => kitQty[k.id] > 0).map((kit) => (
                  <div key={kit.id} className="flex gap-[12px] items-center border-t border-[#f0f0f0] pt-[16px]">
                    <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-tight" style={{ color: "#1f2e91" }}>{kit.name}</p>
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[13px]" style={{ color: kit.color }}>{formatBRL(kit.price)}</p>
                      <div className="flex items-center gap-[6px] mt-[2px]">
                        <button type="button"
                          onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: Math.max(0, prev[kit.id] - 1) }))}
                          className="w-[20px] h-[20px] rounded-full border flex items-center justify-center text-[13px] leading-none hover:bg-gray-50"
                          style={{ borderColor: kit.color, color: kit.color }}>−</button>
                        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] min-w-[16px] text-center" style={{ color: kit.color }}>{kitQty[kit.id]}</span>
                        <button type="button"
                          onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: prev[kit.id] + 1 }))}
                          className="w-[20px] h-[20px] rounded-full flex items-center justify-center text-[13px] leading-none text-white"
                          style={{ background: kit.color }}>+</button>
                        <button type="button"
                          onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: 0 }))}
                          className="ml-auto font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#dc2626] underline leading-none">{t.remove}</button>
                      </div>
                    </div>
                    <p className="font-['Avenir_LT_Pro:95_Black'] text-[14px] shrink-0" style={{ color: kit.color }}>{formatBRL(kit.price * kitQty[kit.id])}</p>
                  </div>
                ))}
              </div>

              {/* Footer fixo — subtotal, total, avisos */}
              <div className="px-[24px] pb-[24px] shrink-0">
                <div className="border-t border-[#f0f0f0] pt-[16px] flex flex-col gap-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555]">{t.subtotalLabel} ({totalQty}{totalQty !== 1 ? t.prodPl : t.prodSg})</span>
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#333]">{formatBRL(productsSubtotal)}</span>
                  </div>
                  {FILTER_KITS.filter((k) => kitQty[k.id] > 0).map((kit) => (
                    <div key={kit.id} className="flex justify-between items-center">
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555]">
                        Kit {kit.id === "essentials" ? "Essentials" : "Premium"} × {kitQty[kit.id]}
                      </span>
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px]" style={{ color: kit.color }}>{formatBRL(kit.price * kitQty[kit.id])}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center">
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555]">{t.shippingLabel}</span>
                    {shippingCost === 0
                      ? <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#36ae5c]">{t.free}</span>
                      : <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#333]">{formatBRL(shippingCost)}</span>
                    }
                  </div>
                </div>

                <div className="border-t border-[#f0f0f0] pt-[16px] mt-[10px] flex justify-between items-center">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#333]">{t.totalLabel}</span>
                  <span className="font-['Avenir_LT_Pro:95_Black'] text-[22px] text-[#0233c3]">{formatBRL(grandTotal)}</span>
                </div>

                {/* CONTINUAR — coluna direita */}
                {step < 5 && (
                  <button
                    type="button"
                    disabled={step === 1 && cart.length === 0}
                    onClick={() => {
                      if (step === 1 && cart.length > 0) goToStep(2);
                      else if (step === 2) { if (validateStep2()) goToStep(3); }
                      else if (step === 3) goToStep(4);
                      else if (step === 4) goToStep(5);
                    }}
                    className={`mt-[16px] w-full h-[52px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white transition-all ${step === 1 && cart.length === 0 ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"}`}
                    style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
                  >
                    {step === 4 ? t.continuePay : t.continueBtn}
                  </button>
                )}
                {step === 5 && (
                  <button
                    type="button"
                    onClick={() => { if (validateStep4()) setDone(true); }}
                    className="mt-[16px] w-full h-[52px] rounded-[12px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
                  >
                    <svg width="16" height="18" viewBox="0 0 18 20" fill="none">
                      <rect x="1" y="7" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                      <path d="M5 7V5a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {t.finalizeBtn} — {formatBRL(grandTotal)}
                  </button>
                )}

                <div className="flex flex-col gap-[10px] mt-[16px]">
                  <div className="bg-[#fff8f0] border-2 border-[#f5c580] rounded-[10px] px-[16px] py-[10px] flex gap-[10px] items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dfa727" strokeWidth="1.8">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#b8831a]">{t.stockWarning}</p>
                  </div>
                  <div className="bg-white border-2 border-[#e8ecf4] rounded-[10px] px-[16px] py-[10px] flex gap-[10px] items-center">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="#0233c3" strokeWidth="1.5">
                      <circle cx="8" cy="9" r="7"/>
                      <path d="M8 5v4l2.5 2.5" strokeLinecap="round"/>
                    </svg>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3]">
                      {t.reservedPre}<span className="text-[#dc2626]">{timer}</span>{t.reservedSuf}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ── Trust strip ────────────────────────────────────────────────── */}
        <div className="bg-[#f6f9fe] rounded-[16px] flex flex-wrap gap-[8px] items-center justify-center p-[20px]">
            {[
              { ...t.trustItems[0], icon: "/figma-assets/checkin-icon-shield.svg"   },
              { ...t.trustItems[1], icon: "/figma-assets/checkin-icon-delivery.svg" },
              { ...t.trustItems[2], icon: "/figma-assets/checkin-icon-warranty.svg" },
              { ...t.trustItems[3], icon: "/figma-assets/checkin-icon-support.svg"  },
            ].map((badge, i) => (
              <div key={i} className="flex flex-[1_0_0] gap-[8px] items-center min-w-[180px]">
                <div className="size-[32px] flex items-center justify-center shrink-0">
                  <img src={badge.icon} alt="" className="h-[30px] w-auto" />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{badge.label}</span>
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{badge.desc}</span>
                </div>
              </div>
            ))}
        </div>

        {/* ── Depoimentos ────────────────────────── */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">{t.reviewsTitle}</p>
            <div className="flex items-center gap-[10px]">
              <div className="flex gap-[3px]">
                {[0,1,2,3,4].map((i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#dfa727">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="font-['Avenir_LT_Pro:95_Black'] text-[15px] text-[#dfa727]">4.9</span>
              <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#aab2bc]">· {t.reviewsSub}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {[
              { initials: "MC", name: "Mariana C.", city: "São Paulo, SP",       color: "#0233c3", colorB: "#0569ff" },
              { initials: "RL", name: "Rafael L.",  city: "Belo Horizonte, MG", color: "#9f3df5", colorB: "#c46cff" },
              { initials: "JS", name: "Juliana S.", city: "Curitiba, PR",        color: "#36ae5c", colorB: "#52c97a" },
            ].map((rev, i) => (
              <div key={i} className="bg-white rounded-[16px] p-[24px] flex flex-col gap-[16px] shadow-[0_2px_12px_rgba(2,51,195,0.06)]">
                <div className="flex items-center gap-[14px]">
                  <div className="shrink-0 size-[52px] rounded-full flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[18px] text-white" style={{ background: `linear-gradient(135deg, ${rev.color}, ${rev.colorB})` }}>
                    {rev.initials}
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">{rev.name}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#aab2bc]">{t.reviewRoles[i]} · {rev.city}</p>
                  </div>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#444] leading-relaxed flex-1">{t.reviewQuotes[i]}</p>
                <div className="flex gap-[3px]">
                  {[0,1,2,3,4].map((j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#dfa727">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── MOBILE STICKY CTA ─────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-[9996] lg:hidden pointer-events-none">
        <div className="px-[16px] pb-[16px] pt-[28px] pointer-events-auto" style={{ background: "linear-gradient(to top, rgba(246,249,254,1) 70%, rgba(246,249,254,0))" }}>
          {step === 1 && (
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => { if (cart.length > 0) goToStep(2); }}
              className={`w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] transition-all ${cart.length > 0 ? "active:opacity-90" : "opacity-40 cursor-not-allowed"}`}
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              {cart.length > 0 ? `${t.continueBtnWith}${totalQty}${totalQty > 1 ? t.continueBtnSufPl : t.continueBtnSufSg}` : t.continueBtn}
            </button>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={() => { if (validateStep2()) goToStep(3); }}
              className="w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] active:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              {t.continueBtn}
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] active:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              {t.continueBtn}
            </button>
          )}
          {step === 4 && (
            <button
              type="button"
              onClick={() => goToStep(5)}
              className="w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] active:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              {t.continuePay}
            </button>
          )}
          {step === 5 && (
            <button
              type="button"
              onClick={() => { if (validateStep4()) setDone(true); }}
              className="w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] active:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              <svg width="16" height="18" viewBox="0 0 18 20" fill="none">
                <rect x="1" y="7" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                <path d="M5 7V5a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {t.finalizeBtn} →
            </button>
          )}
        </div>
      </div>

    </section>
  );
}
