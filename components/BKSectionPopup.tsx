"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang, type Lang } from "@/context/LanguageContext";

// ─── types ────────────────────────────────────────────────────────────────────

type SectionId = "downloads" | "tutoriais-videos" | "faq" | "politicas-garantias";

type Props = { sectionId: string | null; onClose: () => void };

// ─── translations ─────────────────────────────────────────────────────────────

const T: Record<Lang, {
  // META titles / subtitles
  downloads_titulo: string;
  downloads_subtitulo: string;
  videos_titulo: string;
  videos_subtitulo: string;
  faq_titulo: string;
  faq_subtitulo: string;
  politicas_titulo: string;
  politicas_subtitulo: string;

  // Downloads category labels
  cat_manuais: string;
  cat_guias: string;
  cat_softwares: string;
  cat_documentos: string;

  // Downloads file names (translatable)
  guia_instalacao_rapida: string;
  guia_manutencao: string;
  primeiros_passos_app: string;
  guia_parceiro: string;
  guia_troca_filtros: string;
  ficha_tecnica: string;
  certificado_conformidade: string;
  contrato_parceria: string;
  politica_garantia_dl: string;
  declaracao_anatel: string;

  // Videos section title
  videos_section_titulo: string;
  coming_soon: string;

  // Video entries
  video1_titulo: string;
  video1_desc: string;
  video1_cat: string;
  video2_titulo: string;
  video2_desc: string;
  video2_cat: string;
  video3_titulo: string;
  video3_desc: string;
  video3_cat: string;
  video4_titulo: string;
  video4_desc: string;
  video4_cat: string;
  video5_titulo: string;
  video5_desc: string;
  video5_cat: string;
  video6_titulo: string;
  video6_desc: string;
  video6_cat: string;

  // FAQ
  faq1_pergunta: string;
  faq1_resposta: string;
  faq2_pergunta: string;
  faq2_resposta: string;
  faq3_pergunta: string;
  faq3_resposta: string;
  faq4_pergunta: string;
  faq4_resposta: string;
  faq5_pergunta: string;
  faq5_resposta: string;
  faq6_pergunta: string;
  faq6_resposta: string;
  faq7_pergunta: string;
  faq7_resposta: string;
  faq8_pergunta: string;
  faq8_resposta: string;

  // Policies
  pol1_titulo: string;
  pol1_desc: string;
  pol1_item1: string;
  pol1_item2: string;
  pol1_item3: string;
  pol2_titulo: string;
  pol2_desc: string;
  pol2_item1: string;
  pol2_item2: string;
  pol2_item3: string;
  pol3_titulo: string;
  pol3_desc: string;
  pol3_item1: string;
  pol3_item2: string;
  pol3_item3: string;
  pol4_titulo: string;
  pol4_desc: string;
  pol4_item1: string;
  pol4_item2: string;
  pol4_item3: string;
  pol5_titulo: string;
  pol5_desc: string;
  pol5_item1: string;
  pol5_item2: string;
  pol5_item3: string;
  doc_em_elaboracao: string;

  // Footer / UI
  ver_base: string;
  fechar: string;
}> = {
  pt: {
    // META
    downloads_titulo: "Downloads",
    downloads_subtitulo: "Manuais, guias, softwares e documentos disponíveis para download.",
    videos_titulo: "Tutoriais e Vídeos",
    videos_subtitulo: "Aprenda passo a passo com nossos tutoriais em vídeo.",
    faq_titulo: "Perguntas Frequentes",
    faq_subtitulo: "Respostas rápidas para as dúvidas mais comuns sobre produtos e serviços Acquafy.",
    politicas_titulo: "Políticas e Garantias",
    politicas_subtitulo: "Transparência e clareza sobre seus direitos e as condições Acquafy.",

    // Downloads categories
    cat_manuais: "Manuais",
    cat_guias: "Guias Rápidos",
    cat_softwares: "Softwares",
    cat_documentos: "Documentos",

    // Downloads file names
    guia_instalacao_rapida: "Guia de Instalação Rápida",
    guia_manutencao: "Guia de Manutenção e Limpeza",
    primeiros_passos_app: "Primeiros Passos — App Acquafy",
    guia_parceiro: "Guia do Parceiro Acquafy",
    guia_troca_filtros: "Guia de Troca de Filtros",
    ficha_tecnica: "Ficha Técnica — Linha Neo",
    certificado_conformidade: "Certificado de Conformidade",
    contrato_parceria: "Contrato Modelo de Parceria",
    politica_garantia_dl: "Política de Garantia Acquafy",
    declaracao_anatel: "Declaração de Conformidade ANATEL",

    // Videos section title
    videos_section_titulo: "Vídeos & Tutoriais",
    coming_soon: "Em breve",

    // Videos
    video1_titulo: "Como instalar o purificador Neo",
    video1_desc: "Passo a passo completo de instalação.",
    video1_cat: "Instalação",
    video2_titulo: "Primeiros passos com o app Acquafy",
    video2_desc: "Configure e conecte seu dispositivo ao app.",
    video2_cat: "App",
    video3_titulo: "Como trocar o filtro do purificador Neo",
    video3_desc: "Reposição simples e rápida do filtro.",
    video3_cat: "Manutenção",
    video4_titulo: "Acquafy Media: anuncie na tela",
    video4_desc: "Crie campanhas e monetize sua tela.",
    video4_cat: "Media",
    video5_titulo: "Parceria Acquafy: do Silver ao Platinum",
    video5_desc: "Como crescer na rede de parceiros Acquafy.",
    video5_cat: "Parceria",
    video6_titulo: "Tour completo pelo app e funcionalidades",
    video6_desc: "Explore todos os recursos do ecossistema.",
    video6_cat: "App",

    // FAQ
    faq1_pergunta: "Qual é a diferença entre os modelos Neo Essentials e Neo Premium?",
    faq1_resposta: "A linha Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e variantes) possui painel LED 10.1\" e é focada em custo-benefício com tecnologia UV LED + UF. A linha Neo Premium (INFINITY, PRESTIGE e PRIME) conta com painel IPS 15.6\", filtração por Osmose Reversa (RO) e acabamento de alto padrão. Todos os modelos possuem conectividade Wi-Fi 5 e Bluetooth 5.3.",
    faq2_pergunta: "Como faço para baixar e configurar o aplicativo Acquafy?",
    faq2_resposta: "O aplicativo Acquafy está disponível na App Store (iOS) e Google Play (Android). Após instalar, crie sua conta, aproxime o smartphone do purificador via Bluetooth 5.3 para emparelhar e siga o assistente de configuração de Wi-Fi. O processo leva menos de 5 minutos.",
    faq3_pergunta: "Com que frequência devo trocar o filtro do purificador?",
    faq3_resposta: "Os filtros Neo têm vida útil de 365 dias ou conforme o consumo de água. O aplicativo Acquafy monitora em tempo real o ciclo do filtro e envia alertas quando a troca se aproxima. O sistema de Reposição Inteligente pode fazer o pedido automaticamente pelo app.",
    faq4_pergunta: "Como me tornar um parceiro Acquafy?",
    faq4_resposta: "Existem três níveis de parceria: Silver (afiliado/indicador, comissão de 20%, sem investimento inicial), Gold (operador Acquafy Media, comissão de 20% em vendas + receita de anúncios, entrada a partir de US$2.000) e Platinum (distribuidor regional, desconto de 70% no preço USA, modelo FOB). Acesse a página de Parceiros no site ou entre em contato com nossa equipe.",
    faq5_pergunta: "O que é a Acquafy Media e como gera receita recorrente?",
    faq5_resposta: "A Acquafy Media é um sistema de mídia integrado ao painel touchscreen dos purificadores Neo. Negócios locais podem anunciar no display e os parceiros Gold ganham receita mensal por cada anúncio exibido. Os usuários também interagem via QR Code nas campanhas, gerando dados de engajamento.",
    faq6_pergunta: "O purificador Neo funciona com água de poço ou apenas água de rede?",
    faq6_resposta: "Os modelos da linha Essentials são indicados para água de rede (com pressão de 20 a 80 PSI). A linha Premium com tecnologia RO (Osmose Reversa) pode tratar água com maior variação de qualidade. Para situações específicas como água de poço, recomendamos contato com um especialista técnico para avaliação.",
    faq7_pergunta: "Qual o prazo de garantia dos produtos Acquafy?",
    faq7_resposta: "Os purificadores Neo possuem garantia de 1 ano contra defeitos de fabricação. O registro de garantia deve ser feito pelo aplicativo Acquafy ou pelo portal de suporte. Defeitos causados por instalação incorreta, uso inadequado ou manutenção negligenciada não são cobertos pela garantia.",
    faq8_pergunta: "Em quantos países a Acquafy opera?",
    faq8_resposta: "A Acquafy está presente em mais de 180 países, com operação 100% global e suporte disponível em 16 idiomas. O modelo de negócio permite que parceiros distribuidores regionais operem localmente com suporte da plataforma central.",

    // Policies
    pol1_titulo: "Política de Garantia",
    pol1_desc: "Seus produtos Acquafy possuem garantia de fábrica e cobertura completa.",
    pol1_item1: "12 meses de garantia de fábrica",
    pol1_item2: "Cobertura para defeitos de fabricação",
    pol1_item3: "Suporte técnico especializado",
    pol2_titulo: "Política de Privacidade",
    pol2_desc: "Saiba como coletamos, usamos e protegemos seus dados pessoais.",
    pol2_item1: "Dados coletados e finalidade",
    pol2_item2: "Compartilhamento e segurança",
    pol2_item3: "Seus direitos como titular de dados",
    pol3_titulo: "Termos de Uso",
    pol3_desc: "Regras e condições para uso da plataforma e dos produtos Acquafy.",
    pol3_item1: "Condições de uso da plataforma",
    pol3_item2: "Responsabilidades do usuário",
    pol3_item3: "Propriedade intelectual",
    pol4_titulo: "Política de Devolução",
    pol4_desc: "Como solicitar troca, devolução ou reembolso de produtos.",
    pol4_item1: "Prazo de 7 dias para devolução",
    pol4_item2: "Condições para reembolso integral",
    pol4_item3: "Como abrir um chamado de devolução",
    pol5_titulo: "Certificações e Normas",
    pol5_desc: "Conformidade regulatória e certificações técnicas dos produtos.",
    pol5_item1: "Certificação ANATEL",
    pol5_item2: "INMETRO e normas técnicas brasileiras",
    pol5_item3: "Padrões internacionais de qualidade",
    doc_em_elaboracao: "Documento em elaboração",

    // UI
    ver_base: "Ver Base de Conhecimento",
    fechar: "Fechar",
  },

  en: {
    // META
    downloads_titulo: "Downloads",
    downloads_subtitulo: "Manuals, guides, software and documents available for download.",
    videos_titulo: "Tutorials & Videos",
    videos_subtitulo: "Learn step by step with our video tutorials.",
    faq_titulo: "Frequently Asked Questions",
    faq_subtitulo: "Quick answers to the most common questions about Acquafy products and services.",
    politicas_titulo: "Policies & Warranties",
    politicas_subtitulo: "Transparency and clarity about your rights and Acquafy conditions.",

    // Downloads categories
    cat_manuais: "User Manuals",
    cat_guias: "Quick Guides",
    cat_softwares: "Software",
    cat_documentos: "Documents",

    // Downloads file names
    guia_instalacao_rapida: "Quick Installation Guide",
    guia_manutencao: "Maintenance & Cleaning Guide",
    primeiros_passos_app: "Getting Started — Acquafy App",
    guia_parceiro: "Acquafy Partner Guide",
    guia_troca_filtros: "Filter Replacement Guide",
    ficha_tecnica: "Technical Sheet — Neo Line",
    certificado_conformidade: "Certificate of Conformity",
    contrato_parceria: "Partnership Agreement Template",
    politica_garantia_dl: "Acquafy Warranty Policy",
    declaracao_anatel: "ANATEL Declaration of Conformity",

    // Videos section title
    videos_section_titulo: "Videos & Tutorials",
    coming_soon: "Coming soon",

    // Videos
    video1_titulo: "How to install the Neo purifier",
    video1_desc: "Complete step-by-step installation walkthrough.",
    video1_cat: "Installation",
    video2_titulo: "Getting started with the Acquafy app",
    video2_desc: "Set up and connect your device to the app.",
    video2_cat: "App",
    video3_titulo: "How to replace the Neo purifier filter",
    video3_desc: "Simple and quick filter replacement.",
    video3_cat: "Maintenance",
    video4_titulo: "Acquafy Media: advertise on the screen",
    video4_desc: "Create campaigns and monetize your screen.",
    video4_cat: "Media",
    video5_titulo: "Acquafy Partnership: from Silver to Platinum",
    video5_desc: "How to grow within the Acquafy partner network.",
    video5_cat: "Partnership",
    video6_titulo: "Full tour of the app and features",
    video6_desc: "Explore all the resources of the ecosystem.",
    video6_cat: "App",

    // FAQ
    faq1_pergunta: "What is the difference between the Neo Essentials and Neo Premium models?",
    faq1_resposta: "The Neo Essentials line (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX and variants) features a 10.1\" LED panel and focuses on cost-efficiency with UV LED + UF technology. The Neo Premium line (INFINITY, PRESTIGE and PRIME) includes a 15.6\" IPS panel, Reverse Osmosis (RO) filtration and premium finish. All models have Wi-Fi 5 and Bluetooth 5.3 connectivity.",
    faq2_pergunta: "How do I download and set up the Acquafy app?",
    faq2_resposta: "The Acquafy app is available on the App Store (iOS) and Google Play (Android). After installing, create your account, bring your smartphone close to the purifier via Bluetooth 5.3 to pair, and follow the Wi-Fi setup wizard. The process takes less than 5 minutes.",
    faq3_pergunta: "How often should I replace the purifier filter?",
    faq3_resposta: "Neo filters have a lifespan of 365 days or according to water consumption. The Acquafy app monitors the filter cycle in real time and sends alerts when replacement is approaching. The Smart Replenishment system can place the order automatically through the app.",
    faq4_pergunta: "How do I become an Acquafy partner?",
    faq4_resposta: "There are three partnership levels: Silver (affiliate/referral, 20% commission, no initial investment), Gold (Acquafy Media operator, 20% commission on sales + ad revenue, starting at US$2,000) and Platinum (regional distributor, 70% discount on USA price, FOB model). Visit the Partners page on the website or contact our team.",
    faq5_pergunta: "What is Acquafy Media and how does it generate recurring revenue?",
    faq5_resposta: "Acquafy Media is a media system integrated into the touchscreen panel of Neo purifiers. Local businesses can advertise on the display and Gold partners earn monthly revenue for each ad shown. Users also interact via QR Code in campaigns, generating engagement data.",
    faq6_pergunta: "Does the Neo purifier work with well water or only tap water?",
    faq6_resposta: "Essentials line models are designed for tap water (with pressure of 20 to 80 PSI). The Premium line with RO (Reverse Osmosis) technology can treat water with greater quality variation. For specific situations such as well water, we recommend contacting a technical specialist for assessment.",
    faq7_pergunta: "What is the warranty period for Acquafy products?",
    faq7_resposta: "Neo purifiers come with a 1-year warranty against manufacturing defects. Warranty registration must be done through the Acquafy app or the support portal. Defects caused by incorrect installation, improper use or negligent maintenance are not covered by the warranty.",
    faq8_pergunta: "How many countries does Acquafy operate in?",
    faq8_resposta: "Acquafy is present in more than 180 countries, with 100% global operations and support available in 16 languages. The business model allows regional distributor partners to operate locally with support from the central platform.",

    // Policies
    pol1_titulo: "Warranty Policy",
    pol1_desc: "Your Acquafy products come with a manufacturer's warranty and full coverage.",
    pol1_item1: "12-month manufacturer's warranty",
    pol1_item2: "Coverage for manufacturing defects",
    pol1_item3: "Specialized technical support",
    pol2_titulo: "Privacy Policy",
    pol2_desc: "Learn how we collect, use and protect your personal data.",
    pol2_item1: "Data collected and purpose",
    pol2_item2: "Sharing and security",
    pol2_item3: "Your rights as a data subject",
    pol3_titulo: "Terms of Use",
    pol3_desc: "Rules and conditions for using the Acquafy platform and products.",
    pol3_item1: "Platform usage conditions",
    pol3_item2: "User responsibilities",
    pol3_item3: "Intellectual property",
    pol4_titulo: "Return Policy",
    pol4_desc: "How to request an exchange, return or refund for products.",
    pol4_item1: "7-day return window",
    pol4_item2: "Conditions for full refund",
    pol4_item3: "How to open a return request",
    pol5_titulo: "Certifications & Standards",
    pol5_desc: "Regulatory compliance and technical certifications for the products.",
    pol5_item1: "ANATEL certification",
    pol5_item2: "INMETRO and Brazilian technical standards",
    pol5_item3: "International quality standards",
    doc_em_elaboracao: "Document in preparation",

    // UI
    ver_base: "View Knowledge Base",
    fechar: "Close",
  },

  es: {
    // META
    downloads_titulo: "Descargas",
    downloads_subtitulo: "Manuales, guías, software y documentos disponibles para descargar.",
    videos_titulo: "Tutoriales y Videos",
    videos_subtitulo: "Aprende paso a paso con nuestros tutoriales en video.",
    faq_titulo: "Preguntas Frecuentes",
    faq_subtitulo: "Respuestas rápidas a las dudas más comunes sobre productos y servicios Acquafy.",
    politicas_titulo: "Políticas y Garantías",
    politicas_subtitulo: "Transparencia y claridad sobre tus derechos y las condiciones Acquafy.",

    // Downloads categories
    cat_manuais: "Manuales del Usuario",
    cat_guias: "Guías Rápidas",
    cat_softwares: "Software",
    cat_documentos: "Documentos",

    // Downloads file names
    guia_instalacao_rapida: "Guía de Instalación Rápida",
    guia_manutencao: "Guía de Mantenimiento y Limpieza",
    primeiros_passos_app: "Primeros Pasos — App Acquafy",
    guia_parceiro: "Guía del Socio Acquafy",
    guia_troca_filtros: "Guía de Cambio de Filtros",
    ficha_tecnica: "Ficha Técnica — Línea Neo",
    certificado_conformidade: "Certificado de Conformidad",
    contrato_parceria: "Contrato Modelo de Asociación",
    politica_garantia_dl: "Política de Garantía Acquafy",
    declaracao_anatel: "Declaración de Conformidad ANATEL",

    // Videos section title
    videos_section_titulo: "Videos y Tutoriales",
    coming_soon: "Próximamente",

    // Videos
    video1_titulo: "Cómo instalar el purificador Neo",
    video1_desc: "Instalación completa paso a paso.",
    video1_cat: "Instalación",
    video2_titulo: "Primeros pasos con la app Acquafy",
    video2_desc: "Configura y conecta tu dispositivo a la app.",
    video2_cat: "App",
    video3_titulo: "Cómo cambiar el filtro del purificador Neo",
    video3_desc: "Reposición simple y rápida del filtro.",
    video3_cat: "Mantenimiento",
    video4_titulo: "Acquafy Media: anuncia en la pantalla",
    video4_desc: "Crea campañas y monetiza tu pantalla.",
    video4_cat: "Media",
    video5_titulo: "Sociedad Acquafy: de Silver a Platinum",
    video5_desc: "Cómo crecer en la red de socios Acquafy.",
    video5_cat: "Sociedad",
    video6_titulo: "Tour completo por la app y funcionalidades",
    video6_desc: "Explora todos los recursos del ecosistema.",
    video6_cat: "App",

    // FAQ
    faq1_pergunta: "¿Cuál es la diferencia entre los modelos Neo Essentials y Neo Premium?",
    faq1_resposta: "La línea Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX y variantes) cuenta con panel LED 10.1\" y está enfocada en la relación costo-beneficio con tecnología UV LED + UF. La línea Neo Premium (INFINITY, PRESTIGE y PRIME) cuenta con panel IPS 15.6\", filtración por Ósmosis Inversa (RO) y acabado de alta gama. Todos los modelos tienen conectividad Wi-Fi 5 y Bluetooth 5.3.",
    faq2_pergunta: "¿Cómo descargo y configuro la aplicación Acquafy?",
    faq2_resposta: "La aplicación Acquafy está disponible en la App Store (iOS) y Google Play (Android). Después de instalarla, crea tu cuenta, acerca el smartphone al purificador vía Bluetooth 5.3 para emparejarlo y sigue el asistente de configuración de Wi-Fi. El proceso tarda menos de 5 minutos.",
    faq3_pergunta: "¿Con qué frecuencia debo cambiar el filtro del purificador?",
    faq3_resposta: "Los filtros Neo tienen una vida útil de 365 días o según el consumo de agua. La aplicación Acquafy monitorea en tiempo real el ciclo del filtro y envía alertas cuando se acerca el cambio. El sistema de Reposición Inteligente puede realizar el pedido automáticamente desde la app.",
    faq4_pergunta: "¿Cómo me convierto en socio Acquafy?",
    faq4_resposta: "Existen tres niveles de sociedad: Silver (afiliado/referidor, comisión del 20%, sin inversión inicial), Gold (operador Acquafy Media, comisión del 20% en ventas + ingresos por publicidad, desde US$2.000) y Platinum (distribuidor regional, descuento del 70% sobre el precio USA, modelo FOB). Accede a la página de Socios en el sitio web o contacta a nuestro equipo.",
    faq5_pergunta: "¿Qué es Acquafy Media y cómo genera ingresos recurrentes?",
    faq5_resposta: "Acquafy Media es un sistema de medios integrado al panel touchscreen de los purificadores Neo. Los negocios locales pueden anunciar en el display y los socios Gold obtienen ingresos mensuales por cada anuncio mostrado. Los usuarios también interactúan vía QR Code en las campañas, generando datos de engagement.",
    faq6_pergunta: "¿El purificador Neo funciona con agua de pozo o solo con agua de red?",
    faq6_resposta: "Los modelos de la línea Essentials están indicados para agua de red (con presión de 20 a 80 PSI). La línea Premium con tecnología RO (Ósmosis Inversa) puede tratar agua con mayor variación de calidad. Para situaciones específicas como agua de pozo, recomendamos contactar a un especialista técnico para evaluación.",
    faq7_pergunta: "¿Cuál es el plazo de garantía de los productos Acquafy?",
    faq7_resposta: "Los purificadores Neo tienen garantía de 1 año contra defectos de fabricación. El registro de la garantía debe realizarse a través de la aplicación Acquafy o del portal de soporte. Los defectos causados por instalación incorrecta, uso inadecuado o mantenimiento negligente no están cubiertos por la garantía.",
    faq8_pergunta: "¿En cuántos países opera Acquafy?",
    faq8_resposta: "Acquafy está presente en más de 180 países, con operación 100% global y soporte disponible en 16 idiomas. El modelo de negocio permite que los socios distribuidores regionales operen localmente con el respaldo de la plataforma central.",

    // Policies
    pol1_titulo: "Política de Garantía",
    pol1_desc: "Tus productos Acquafy cuentan con garantía de fábrica y cobertura completa.",
    pol1_item1: "12 meses de garantía de fábrica",
    pol1_item2: "Cobertura para defectos de fabricación",
    pol1_item3: "Soporte técnico especializado",
    pol2_titulo: "Política de Privacidad",
    pol2_desc: "Descubre cómo recopilamos, usamos y protegemos tus datos personales.",
    pol2_item1: "Datos recopilados y finalidad",
    pol2_item2: "Compartición y seguridad",
    pol2_item3: "Tus derechos como titular de datos",
    pol3_titulo: "Términos de Uso",
    pol3_desc: "Reglas y condiciones para el uso de la plataforma y los productos Acquafy.",
    pol3_item1: "Condiciones de uso de la plataforma",
    pol3_item2: "Responsabilidades del usuario",
    pol3_item3: "Propiedad intelectual",
    pol4_titulo: "Política de Devolución",
    pol4_desc: "Cómo solicitar cambio, devolución o reembolso de productos.",
    pol4_item1: "Plazo de 7 días para devolución",
    pol4_item2: "Condiciones para reembolso completo",
    pol4_item3: "Cómo abrir una solicitud de devolución",
    pol5_titulo: "Certificaciones y Normas",
    pol5_desc: "Conformidad regulatoria y certificaciones técnicas de los productos.",
    pol5_item1: "Certificación ANATEL",
    pol5_item2: "INMETRO y normas técnicas brasileñas",
    pol5_item3: "Estándares internacionales de calidad",
    doc_em_elaboracao: "Documento en elaboración",

    // UI
    ver_base: "Ver Base de Conocimiento",
    fechar: "Cerrar",
  },
};

// ─── metadata ─────────────────────────────────────────────────────────────────

const META_ANCHORS: Record<SectionId, string> = {
  "downloads": "#downloads",
  "tutoriais-videos": "#tutoriais-videos",
  "faq": "#faq",
  "politicas-garantias": "#politicas-garantias",
};

const IDS = Object.keys(META_ANCHORS) as SectionId[];
function isSectionId(id: string): id is SectionId { return IDS.includes(id as SectionId); }

// ─── Downloads ────────────────────────────────────────────────────────────────

const TIPO_BADGE: Record<string, { bg: string; color: string }> = {
  PDF: { bg: "#fee2e2", color: "#b91c1c" },
  ZIP: { bg: "#e0e7ff", color: "#4338ca" },
  APP: { bg: "#dcfce7", color: "#15803d" },
};

function IconDl() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v8M5.5 7.5L8 10l2.5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12v.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SectionDownloads({ t }: { t: typeof T["pt"] }) {
  const DOWNLOADS = [
    {
      titulo: t.cat_manuais, scroll: true,
      arquivos: [
        { nome: "Manual do Usuário — Neo UP",                 tipo: "PDF", tamanho: "7 MB"  },
        { nome: "Manual do Usuário — Neo FIT",                tipo: "PDF", tamanho: "8 MB"  },
        { nome: "Manual do Usuário — Neo SMART H₂",          tipo: "PDF", tamanho: "9 MB"  },
        { nome: "Manual do Usuário — Neo TOUCH",              tipo: "PDF", tamanho: "8 MB"  },
        { nome: "Manual do Usuário — Neo PLUS",               tipo: "PDF", tamanho: "9 MB"  },
        { nome: "Manual do Usuário — Neo ULTRA",              tipo: "PDF", tamanho: "10 MB" },
        { nome: "Manual do Usuário — Neo ULTRA SPARK",        tipo: "PDF", tamanho: "10 MB" },
        { nome: "Manual do Usuário — Neo ULTRA SPARK H₂",    tipo: "PDF", tamanho: "10 MB" },
        { nome: "Manual do Usuário — Neo MAX",                tipo: "PDF", tamanho: "11 MB" },
        { nome: "Manual do Usuário — Neo MAX SPARK",         tipo: "PDF", tamanho: "11 MB" },
        { nome: "Manual do Usuário — Neo MAX SPARK H₂",      tipo: "PDF", tamanho: "11 MB" },
        { nome: "Manual do Usuário — Neo INFINITY",           tipo: "PDF", tamanho: "12 MB" },
        { nome: "Manual do Usuário — Neo INFINITY SPARK",     tipo: "PDF", tamanho: "12 MB" },
        { nome: "Manual do Usuário — Neo INFINITY SPARK H₂", tipo: "PDF", tamanho: "12 MB" },
        { nome: "Manual do Usuário — Neo PRESTIGE",           tipo: "PDF", tamanho: "12 MB" },
        { nome: "Manual do Usuário — Neo PRESTIGE SPARK",     tipo: "PDF", tamanho: "12 MB" },
        { nome: "Manual do Usuário — Neo PRESTIGE SPARK H₂", tipo: "PDF", tamanho: "12 MB" },
        { nome: "Manual do Usuário — Neo PRIME",              tipo: "PDF", tamanho: "12 MB" },
        { nome: "Manual do Usuário — Neo PRIME SPARK",        tipo: "PDF", tamanho: "12 MB" },
        { nome: "Manual do Usuário — Neo PRIME SPARK H₂",    tipo: "PDF", tamanho: "12 MB" },
      ],
    },
    {
      titulo: t.cat_guias,
      arquivos: [
        { nome: t.guia_instalacao_rapida,  tipo: "PDF", tamanho: "2 MB" },
        { nome: t.guia_manutencao,         tipo: "PDF", tamanho: "3 MB" },
        { nome: t.primeiros_passos_app,    tipo: "PDF", tamanho: "4 MB" },
        { nome: t.guia_parceiro,           tipo: "PDF", tamanho: "5 MB" },
        { nome: t.guia_troca_filtros,      tipo: "PDF", tamanho: "2 MB" },
      ],
    },
    {
      titulo: t.cat_softwares,
      arquivos: [
        { nome: "App Acquafy — iOS",     tipo: "APP", tamanho: "App Store"  },
        { nome: "App Acquafy — Android", tipo: "APP", tamanho: "Play Store" },
        { nome: "Firmware Neo v2.4.1",   tipo: "ZIP", tamanho: "15 MB"      },
      ],
    },
    {
      titulo: t.cat_documentos,
      arquivos: [
        { nome: t.ficha_tecnica,          tipo: "PDF", tamanho: "3 MB"   },
        { nome: t.certificado_conformidade, tipo: "PDF", tamanho: "1 MB"   },
        { nome: t.contrato_parceria,      tipo: "PDF", tamanho: "2 MB"   },
        { nome: t.politica_garantia_dl,   tipo: "PDF", tamanho: "1 MB"   },
        { nome: t.declaracao_anatel,      tipo: "PDF", tamanho: "500 KB" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
      {DOWNLOADS.map((cat) => (
        <div key={cat.titulo} className="border border-[#e8edf5] rounded-[12px] overflow-hidden">
          <div className="bg-[#f6f9fe] px-[16px] py-[12px] border-b border-[#e8edf5]">
            <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[18px] text-[#1f2e91]">
              {cat.titulo}
            </h3>
          </div>
          <ul className={`list-none m-0 p-0 divide-y divide-[#f0f3f9]${"scroll" in cat && cat.scroll ? " max-h-[200px] overflow-y-auto" : ""}`}>
            {cat.arquivos.map((arq) => {
              const b = TIPO_BADGE[arq.tipo];
              return (
                <li key={arq.nome}>
                  <a
                    href="#"
                    className="group flex gap-[10px] items-center px-[16px] py-[11px] hover:bg-[#f6f9fe] transition-colors no-underline"
                  >
                    <span
                      className="shrink-0 font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-none px-[6px] py-[3px] rounded-[4px] w-[32px] text-center"
                      style={{ backgroundColor: b.bg, color: b.color }}
                    >
                      {arq.tipo}
                    </span>
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#333] group-hover:text-[#0233c3] transition-colors flex-1 min-w-0">
                      {arq.nome}
                    </span>
                    <span className="shrink-0 font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#999] whitespace-nowrap">
                      {arq.tamanho}
                    </span>
                    <div className="shrink-0 flex items-center justify-center size-[28px] rounded-[6px] bg-[#f0f4ff] group-hover:bg-[#0233c3] transition-colors text-[#0233c3] group-hover:text-white">
                      <IconDl />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Vídeos ───────────────────────────────────────────────────────────────────

const CAT_COLORS_EN: Record<string, string> = {
  "Installation": "#dfa727",
  "App":          "#0569ff",
  "Maintenance":  "#36ae5c",
  "Media":        "#9f3df5",
  "Partnership":  "#1f2e91",
  // PT
  "Instalação":   "#dfa727",
  "Manutenção":   "#36ae5c",
  "Parceria":     "#1f2e91",
  // ES
  "Mantenimiento": "#36ae5c",
  "Sociedad":      "#1f2e91",
};

function SectionVideos({ t }: { t: typeof T["pt"] }) {
  const VIDEOS = [
    { titulo: t.video1_titulo, desc: t.video1_desc, categoria: t.video1_cat, duracao: "8 min"  },
    { titulo: t.video2_titulo, desc: t.video2_desc, categoria: t.video2_cat, duracao: "5 min"  },
    { titulo: t.video3_titulo, desc: t.video3_desc, categoria: t.video3_cat, duracao: "4 min"  },
    { titulo: t.video4_titulo, desc: t.video4_desc, categoria: t.video4_cat, duracao: "10 min" },
    { titulo: t.video5_titulo, desc: t.video5_desc, categoria: t.video5_cat, duracao: "12 min" },
    { titulo: t.video6_titulo, desc: t.video6_desc, categoria: t.video6_cat, duracao: "15 min" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      {VIDEOS.map((v) => {
        const c = CAT_COLORS_EN[v.categoria] ?? "#0233c3";
        return (
          <div key={v.titulo} className="bg-white rounded-[12px] overflow-hidden border border-[#e8edf5] flex flex-col">
            <div className="w-full bg-[#1f2e91] flex flex-col items-center justify-center gap-[10px] py-[28px]">
              <div className="w-[50px] h-[36px] bg-[#ff0000] rounded-[10px] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <polygon points="7,4 17,10 7,16" fill="white" />
                </svg>
              </div>
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[10px] tracking-[0.08em] uppercase text-[rgba(255,255,255,0.4)]">
                {t.coming_soon}
              </span>
            </div>
            <div className="flex flex-col gap-[8px] p-[16px] flex-1">
              <div className="flex gap-[8px] items-center">
                <span
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] leading-none px-[8px] py-[4px] rounded-full"
                  style={{ color: c, backgroundColor: c + "18" }}
                >
                  {v.categoria}
                </span>
                <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#999]">{v.duracao}</span>
              </div>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[19px] text-[#1f2e91]">{v.titulo}</p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#666]">{v.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function SectionFaq({
  aberto,
  setAberto,
  t,
}: {
  aberto: number | null;
  setAberto: (i: number | null) => void;
  t: typeof T["pt"];
}) {
  const FAQS = [
    { pergunta: t.faq1_pergunta, resposta: t.faq1_resposta },
    { pergunta: t.faq2_pergunta, resposta: t.faq2_resposta },
    { pergunta: t.faq3_pergunta, resposta: t.faq3_resposta },
    { pergunta: t.faq4_pergunta, resposta: t.faq4_resposta },
    { pergunta: t.faq5_pergunta, resposta: t.faq5_resposta },
    { pergunta: t.faq6_pergunta, resposta: t.faq6_resposta },
    { pergunta: t.faq7_pergunta, resposta: t.faq7_resposta },
    { pergunta: t.faq8_pergunta, resposta: t.faq8_resposta },
  ];

  return (
    <div className="flex flex-col gap-[10px]">
      {FAQS.map((faq, i) => {
        const isOpen = aberto === i;
        return (
          <div
            key={i}
            className={`bg-white rounded-[10px] overflow-hidden transition-shadow ${
              isOpen ? "shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]" : ""
            }`}
          >
            <button
              onClick={() => setAberto(isOpen ? null : i)}
              className="flex gap-[14px] items-center justify-between w-full px-[20px] py-[16px] cursor-pointer text-left"
              aria-expanded={isOpen}
            >
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[19px] text-[#1f2e91] flex-1 pr-[8px]">
                {faq.pergunta}
              </span>
              <span
                className={`shrink-0 flex items-center justify-center size-[24px] rounded-full border-2 transition-all duration-200 ${
                  isOpen
                    ? "border-[#0233c3] bg-[#0233c3] text-white rotate-180"
                    : "border-[#cbd0d4] bg-transparent text-[#333] rotate-0"
                }`}
              >
                <svg width="10" height="6" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[20px] text-[#333] px-[20px] pb-[16px]">
                {faq.resposta}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Políticas ────────────────────────────────────────────────────────────────

function SectionPoliticas({ t }: { t: typeof T["pt"] }) {
  const POLITICAS = [
    {
      titulo: t.pol1_titulo,
      desc: t.pol1_desc,
      itens: [t.pol1_item1, t.pol1_item2, t.pol1_item3],
    },
    {
      titulo: t.pol2_titulo,
      desc: t.pol2_desc,
      itens: [t.pol2_item1, t.pol2_item2, t.pol2_item3],
    },
    {
      titulo: t.pol3_titulo,
      desc: t.pol3_desc,
      itens: [t.pol3_item1, t.pol3_item2, t.pol3_item3],
    },
    {
      titulo: t.pol4_titulo,
      desc: t.pol4_desc,
      itens: [t.pol4_item1, t.pol4_item2, t.pol4_item3],
    },
    {
      titulo: t.pol5_titulo,
      desc: t.pol5_desc,
      itens: [t.pol5_item1, t.pol5_item2, t.pol5_item3],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      {POLITICAS.map((pol) => (
        <div
          key={pol.titulo}
          className="bg-[#f6f9fe] border border-[#e8edf5] rounded-[12px] p-[20px] flex flex-col gap-[12px]"
        >
          <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-[20px] text-[#1f2e91]">{pol.titulo}</h3>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#555]">{pol.desc}</p>
          <ul className="flex flex-col gap-[6px] list-none m-0 p-0 flex-1">
            {pol.itens.map((item) => (
              <li key={item} className="flex gap-[8px] items-start">
                <span className="mt-[6px] shrink-0 size-[5px] rounded-full bg-[#0569ff]" />
                <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#444]">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-[6px] pt-[8px] border-t border-[#e8edf5]">
            <span className="shrink-0 size-[5px] rounded-full bg-[#ef4444]" />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] text-[#bbb]">{t.doc_em_elaboracao}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BKSectionPopup({ sectionId, onClose }: Props) {
  const { lang } = useLang();
  const t = T[lang];

  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  useEffect(() => { setFaqAberto(null); }, [sectionId]);

  useEffect(() => {
    if (!sectionId) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [sectionId, onClose]);

  useEffect(() => {
    document.body.style.overflow = sectionId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sectionId]);

  if (!sectionId || !isSectionId(sectionId)) return null;

  const metaTitulos: Record<SectionId, string> = {
    "downloads":             t.downloads_titulo,
    "tutoriais-videos":      t.videos_titulo,
    "faq":                   t.faq_titulo,
    "politicas-garantias":   t.politicas_titulo,
  };

  const metaSubtitulos: Record<SectionId, string> = {
    "downloads":             t.downloads_subtitulo,
    "tutoriais-videos":      t.videos_subtitulo,
    "faq":                   t.faq_subtitulo,
    "politicas-garantias":   t.politicas_subtitulo,
  };

  const anchor = META_ANCHORS[sectionId];

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-[20px] bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[900px] max-h-[88vh] flex flex-col overflow-hidden shadow-[0_24px_80px_0_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-[16px] px-[24px] py-[20px] shrink-0 border-b border-[#e8edf5]">
          <div className="flex-1 min-w-0">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[26px] text-[#1f2e91]">
              {metaTitulos[sectionId]}
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#777]">
              {metaSubtitulos[sectionId]}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t.fechar}
            className="shrink-0 size-[36px] flex items-center justify-center rounded-full bg-[#f6f9fe] hover:bg-[#e8edf5] transition-colors text-[#555] text-[22px] leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-[24px]">
          {sectionId === "downloads"           && <SectionDownloads t={t} />}
          {sectionId === "tutoriais-videos"    && <SectionVideos t={t} />}
          {sectionId === "faq"                 && <SectionFaq aberto={faqAberto} setAberto={setFaqAberto} t={t} />}
          {sectionId === "politicas-garantias" && <SectionPoliticas t={t} />}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-[24px] py-[16px] border-t border-[#e8edf5] flex items-center justify-end">
          <Link
            href={`/base-de-conhecimento${anchor}`}
            onClick={onClose}
            className="bg-[#0233c3] hover:bg-[#002ba8] transition-colors flex gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[8px] no-underline"
          >
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              {t.ver_base}
            </span>
            <svg width="9" height="9" viewBox="0 0 11.2 8.84" fill="none">
              <path d="M0 4.42h9.5M6.2 1l3.5 3.42L6.2 7.84" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
