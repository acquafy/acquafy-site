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

  "en-gb": {
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
    video4_desc: "Create campaigns and monetise your screen.",
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
    pol1_item3: "Specialised technical support",
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
    pol4_titulo: "Returns Policy",
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

  fr: {
    // META
    downloads_titulo: "Téléchargements",
    downloads_subtitulo: "Manuels, guides, logiciels et documents disponibles en téléchargement.",
    videos_titulo: "Tutoriels et Vidéos",
    videos_subtitulo: "Apprenez étape par étape avec nos tutoriels vidéo.",
    faq_titulo: "Foire Aux Questions",
    faq_subtitulo: "Réponses rapides aux questions les plus fréquentes sur les produits et services Acquafy.",
    politicas_titulo: "Politiques et Garanties",
    politicas_subtitulo: "Transparence et clarté sur vos droits et les conditions Acquafy.",

    // Downloads categories
    cat_manuais: "Manuels Utilisateur",
    cat_guias: "Guides Rapides",
    cat_softwares: "Logiciels",
    cat_documentos: "Documents",

    // Downloads file names
    guia_instalacao_rapida: "Guide d'Installation Rapide",
    guia_manutencao: "Guide de Maintenance et Nettoyage",
    primeiros_passos_app: "Premiers Pas — Application Acquafy",
    guia_parceiro: "Guide du Partenaire Acquafy",
    guia_troca_filtros: "Guide de Remplacement des Filtres",
    ficha_tecnica: "Fiche Technique — Gamme Neo",
    certificado_conformidade: "Certificat de Conformité",
    contrato_parceria: "Modèle de Contrat de Partenariat",
    politica_garantia_dl: "Politique de Garantie Acquafy",
    declaracao_anatel: "Déclaration de Conformité ANATEL",

    // Videos section title
    videos_section_titulo: "Vidéos et Tutoriels",
    coming_soon: "Bientôt disponible",

    // Videos
    video1_titulo: "Comment installer le purificateur Neo",
    video1_desc: "Guide complet d'installation étape par étape.",
    video1_cat: "Installation",
    video2_titulo: "Premiers pas avec l'application Acquafy",
    video2_desc: "Configurez et connectez votre appareil à l'application.",
    video2_cat: "Application",
    video3_titulo: "Comment remplacer le filtre du purificateur Neo",
    video3_desc: "Remplacement simple et rapide du filtre.",
    video3_cat: "Maintenance",
    video4_titulo: "Acquafy Media : annoncez sur l'écran",
    video4_desc: "Créez des campagnes et monétisez votre écran.",
    video4_cat: "Media",
    video5_titulo: "Partenariat Acquafy : de Silver à Platinum",
    video5_desc: "Comment progresser dans le réseau de partenaires Acquafy.",
    video5_cat: "Partenariat",
    video6_titulo: "Visite complète de l'application et ses fonctionnalités",
    video6_desc: "Explorez toutes les ressources de l'écosystème.",
    video6_cat: "Application",

    // FAQ
    faq1_pergunta: "Quelle est la différence entre les modèles Neo Essentials et Neo Premium ?",
    faq1_resposta: "La gamme Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX et variantes) dispose d'un panneau LED 10,1\" et mise sur le rapport qualité-prix avec la technologie UV LED + UF. La gamme Neo Premium (INFINITY, PRESTIGE et PRIME) comprend un panneau IPS 15,6\", une filtration par Osmose Inverse (RO) et une finition haut de gamme. Tous les modèles bénéficient de la connectivité Wi-Fi 5 et Bluetooth 5.3.",
    faq2_pergunta: "Comment télécharger et configurer l'application Acquafy ?",
    faq2_resposta: "L'application Acquafy est disponible sur l'App Store (iOS) et Google Play (Android). Après l'installation, créez votre compte, approchez votre smartphone du purificateur via Bluetooth 5.3 pour l'appairer et suivez l'assistant de configuration Wi-Fi. Le processus prend moins de 5 minutes.",
    faq3_pergunta: "À quelle fréquence dois-je remplacer le filtre du purificateur ?",
    faq3_resposta: "Les filtres Neo ont une durée de vie de 365 jours ou selon la consommation d'eau. L'application Acquafy surveille le cycle du filtre en temps réel et envoie des alertes lorsque le remplacement approche. Le système de Renouvellement Intelligent peut passer la commande automatiquement via l'application.",
    faq4_pergunta: "Comment devenir partenaire Acquafy ?",
    faq4_resposta: "Il existe trois niveaux de partenariat : Silver (affilié/référent, commission de 20%, sans investissement initial), Gold (opérateur Acquafy Media, commission de 20% sur les ventes + revenus publicitaires, à partir de 2 000 USD) et Platinum (distributeur régional, remise de 70% sur le prix USA, modèle FOB). Accédez à la page Partenaires sur le site ou contactez notre équipe.",
    faq5_pergunta: "Qu'est-ce qu'Acquafy Media et comment génère-t-il des revenus récurrents ?",
    faq5_resposta: "Acquafy Media est un système de médias intégré au panneau tactile des purificateurs Neo. Les entreprises locales peuvent faire de la publicité sur l'écran et les partenaires Gold perçoivent des revenus mensuels pour chaque annonce affichée. Les utilisateurs interagissent également via QR Code dans les campagnes, générant des données d'engagement.",
    faq6_pergunta: "Le purificateur Neo fonctionne-t-il avec l'eau de puits ou uniquement l'eau du robinet ?",
    faq6_resposta: "Les modèles de la gamme Essentials sont conçus pour l'eau du robinet (avec une pression de 20 à 80 PSI). La gamme Premium avec technologie RO (Osmose Inverse) peut traiter l'eau avec une plus grande variation de qualité. Pour des situations spécifiques comme l'eau de puits, nous recommandons de contacter un spécialiste technique pour une évaluation.",
    faq7_pergunta: "Quelle est la durée de garantie des produits Acquafy ?",
    faq7_resposta: "Les purificateurs Neo bénéficient d'une garantie de 1 an contre les défauts de fabrication. L'enregistrement de la garantie doit être effectué via l'application Acquafy ou le portail d'assistance. Les défauts causés par une installation incorrecte, une utilisation inappropriée ou une maintenance négligente ne sont pas couverts par la garantie.",
    faq8_pergunta: "Dans combien de pays Acquafy opère-t-il ?",
    faq8_resposta: "Acquafy est présent dans plus de 180 pays, avec des opérations 100% mondiales et une assistance disponible en 16 langues. Le modèle commercial permet aux partenaires distributeurs régionaux d'opérer localement avec le soutien de la plateforme centrale.",

    // Policies
    pol1_titulo: "Politique de Garantie",
    pol1_desc: "Vos produits Acquafy bénéficient d'une garantie fabricant et d'une couverture complète.",
    pol1_item1: "12 mois de garantie fabricant",
    pol1_item2: "Couverture des défauts de fabrication",
    pol1_item3: "Support technique spécialisé",
    pol2_titulo: "Politique de Confidentialité",
    pol2_desc: "Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.",
    pol2_item1: "Données collectées et finalité",
    pol2_item2: "Partage et sécurité",
    pol2_item3: "Vos droits en tant que personne concernée",
    pol3_titulo: "Conditions d'Utilisation",
    pol3_desc: "Règles et conditions d'utilisation de la plateforme et des produits Acquafy.",
    pol3_item1: "Conditions d'utilisation de la plateforme",
    pol3_item2: "Responsabilités de l'utilisateur",
    pol3_item3: "Propriété intellectuelle",
    pol4_titulo: "Politique de Retour",
    pol4_desc: "Comment demander un échange, un retour ou un remboursement de produits.",
    pol4_item1: "Délai de retour de 7 jours",
    pol4_item2: "Conditions de remboursement intégral",
    pol4_item3: "Comment ouvrir une demande de retour",
    pol5_titulo: "Certifications et Normes",
    pol5_desc: "Conformité réglementaire et certifications techniques des produits.",
    pol5_item1: "Certification ANATEL",
    pol5_item2: "INMETRO et normes techniques brésiliennes",
    pol5_item3: "Normes internationales de qualité",
    doc_em_elaboracao: "Document en cours d'élaboration",

    // UI
    ver_base: "Voir la Base de Connaissances",
    fechar: "Fermer",
  },

  de: {
    // META
    downloads_titulo: "Downloads",
    downloads_subtitulo: "Handbücher, Leitfäden, Software und Dokumente zum Herunterladen.",
    videos_titulo: "Tutorials und Videos",
    videos_subtitulo: "Lernen Sie Schritt für Schritt mit unseren Video-Tutorials.",
    faq_titulo: "Häufig Gestellte Fragen",
    faq_subtitulo: "Schnelle Antworten auf die häufigsten Fragen zu Acquafy-Produkten und -Diensten.",
    politicas_titulo: "Richtlinien und Garantien",
    politicas_subtitulo: "Transparenz und Klarheit über Ihre Rechte und die Acquafy-Bedingungen.",

    // Downloads categories
    cat_manuais: "Benutzerhandbücher",
    cat_guias: "Kurzanleitungen",
    cat_softwares: "Software",
    cat_documentos: "Dokumente",

    // Downloads file names
    guia_instalacao_rapida: "Schnellinstallationsanleitung",
    guia_manutencao: "Wartungs- und Reinigungsanleitung",
    primeiros_passos_app: "Erste Schritte — Acquafy App",
    guia_parceiro: "Acquafy Partner-Leitfaden",
    guia_troca_filtros: "Filteraustauschanleitung",
    ficha_tecnica: "Technisches Datenblatt — Neo-Linie",
    certificado_conformidade: "Konformitätszertifikat",
    contrato_parceria: "Partnerschaftsvertragsvorlage",
    politica_garantia_dl: "Acquafy Garantierichtlinie",
    declaracao_anatel: "ANATEL-Konformitätserklärung",

    // Videos section title
    videos_section_titulo: "Videos und Tutorials",
    coming_soon: "Demnächst verfügbar",

    // Videos
    video1_titulo: "So installieren Sie den Neo-Wasserreiniger",
    video1_desc: "Vollständige Schritt-für-Schritt-Installationsanleitung.",
    video1_cat: "Installation",
    video2_titulo: "Erste Schritte mit der Acquafy App",
    video2_desc: "Gerät einrichten und mit der App verbinden.",
    video2_cat: "App",
    video3_titulo: "So ersetzen Sie den Filter des Neo-Reinigers",
    video3_desc: "Einfacher und schneller Filteraustausch.",
    video3_cat: "Wartung",
    video4_titulo: "Acquafy Media: Werbung auf dem Bildschirm",
    video4_desc: "Kampagnen erstellen und Ihren Bildschirm monetarisieren.",
    video4_cat: "Media",
    video5_titulo: "Acquafy-Partnerschaft: von Silver bis Platinum",
    video5_desc: "So wachsen Sie im Acquafy-Partnernetzwerk.",
    video5_cat: "Partnerschaft",
    video6_titulo: "Vollständige Tour durch App und Funktionen",
    video6_desc: "Alle Ressourcen des Ökosystems erkunden.",
    video6_cat: "App",

    // FAQ
    faq1_pergunta: "Was ist der Unterschied zwischen den Modellen Neo Essentials und Neo Premium?",
    faq1_resposta: "Die Neo Essentials-Linie (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX und Varianten) verfügt über ein 10,1\"-LED-Panel und setzt auf Preis-Leistung mit UV LED + UF-Technologie. Die Neo Premium-Linie (INFINITY, PRESTIGE und PRIME) enthält ein 15,6\"-IPS-Panel, Umkehrosmose-Filtration (RO) und hochwertige Verarbeitung. Alle Modelle verfügen über Wi-Fi 5 und Bluetooth 5.3.",
    faq2_pergunta: "Wie lade ich die Acquafy App herunter und richte sie ein?",
    faq2_resposta: "Die Acquafy App ist im App Store (iOS) und Google Play (Android) verfügbar. Nach der Installation erstellen Sie Ihr Konto, nähern Sie Ihr Smartphone über Bluetooth 5.3 an den Reiniger an, um es zu koppeln, und folgen Sie dem WLAN-Einrichtungsassistenten. Der Vorgang dauert weniger als 5 Minuten.",
    faq3_pergunta: "Wie oft sollte ich den Filter des Reinigers austauschen?",
    faq3_resposta: "Neo-Filter haben eine Lebensdauer von 365 Tagen oder je nach Wasserverbrauch. Die Acquafy App überwacht den Filterzyklus in Echtzeit und sendet Warnmeldungen, wenn ein Austausch bevorsteht. Das Smart-Nachbestellsystem kann die Bestellung automatisch über die App aufgeben.",
    faq4_pergunta: "Wie werde ich Acquafy-Partner?",
    faq4_resposta: "Es gibt drei Partnerschaftsstufen: Silver (Affiliate/Empfehler, 20% Provision, keine Anfangsinvestition), Gold (Acquafy Media-Betreiber, 20% Provision auf Verkäufe + Werbeeinnahmen, ab 2.000 USD) und Platinum (regionaler Distributor, 70% Rabatt auf den USA-Preis, FOB-Modell). Besuchen Sie die Partnerseite auf der Website oder kontaktieren Sie unser Team.",
    faq5_pergunta: "Was ist Acquafy Media und wie generiert es wiederkehrende Einnahmen?",
    faq5_resposta: "Acquafy Media ist ein in das Touchscreen-Panel der Neo-Reiniger integriertes Mediensystem. Lokale Unternehmen können auf dem Display werben, und Gold-Partner erhalten monatliche Einnahmen für jede angezeigte Anzeige. Benutzer interagieren auch über QR-Codes in Kampagnen und generieren Engagement-Daten.",
    faq6_pergunta: "Funktioniert der Neo-Reiniger mit Brunnenwasser oder nur mit Leitungswasser?",
    faq6_resposta: "Modelle der Essentials-Linie sind für Leitungswasser ausgelegt (mit einem Druck von 20 bis 80 PSI). Die Premium-Linie mit RO-Technologie (Umkehrosmose) kann Wasser mit größerer Qualitätsschwankung aufbereiten. Für spezifische Situationen wie Brunnenwasser empfehlen wir, einen Fachmann für eine Beurteilung zu kontaktieren.",
    faq7_pergunta: "Wie lange ist die Garantiezeit für Acquafy-Produkte?",
    faq7_resposta: "Neo-Reiniger werden mit einer 1-jährigen Garantie gegen Herstellungsfehler geliefert. Die Garantieregistrierung muss über die Acquafy App oder das Support-Portal erfolgen. Defekte, die durch unsachgemäße Installation, Fehlanwendung oder nachlässige Wartung verursacht wurden, sind nicht durch die Garantie abgedeckt.",
    faq8_pergunta: "In wie vielen Ländern ist Acquafy tätig?",
    faq8_resposta: "Acquafy ist in mehr als 180 Ländern präsent, mit 100% globalem Betrieb und Support in 16 Sprachen. Das Geschäftsmodell ermöglicht es regionalen Distributor-Partnern, lokal mit Unterstützung der zentralen Plattform zu operieren.",

    // Policies
    pol1_titulo: "Garantierichtlinie",
    pol1_desc: "Ihre Acquafy-Produkte sind mit einer Herstellergarantie und vollständiger Abdeckung versehen.",
    pol1_item1: "12 Monate Herstellergarantie",
    pol1_item2: "Abdeckung für Herstellungsfehler",
    pol1_item3: "Spezialisierter technischer Support",
    pol2_titulo: "Datenschutzrichtlinie",
    pol2_desc: "Erfahren Sie, wie wir Ihre persönlichen Daten erfassen, verwenden und schützen.",
    pol2_item1: "Erhobene Daten und Zweck",
    pol2_item2: "Weitergabe und Sicherheit",
    pol2_item3: "Ihre Rechte als betroffene Person",
    pol3_titulo: "Nutzungsbedingungen",
    pol3_desc: "Regeln und Bedingungen für die Nutzung der Acquafy-Plattform und -Produkte.",
    pol3_item1: "Nutzungsbedingungen der Plattform",
    pol3_item2: "Benutzerverantwortlichkeiten",
    pol3_item3: "Geistiges Eigentum",
    pol4_titulo: "Rückgaberichtlinie",
    pol4_desc: "So beantragen Sie einen Austausch, eine Rücksendung oder Rückerstattung.",
    pol4_item1: "7-Tage-Rückgabefenster",
    pol4_item2: "Bedingungen für vollständige Rückerstattung",
    pol4_item3: "Wie Sie eine Rücksendeanfrage stellen",
    pol5_titulo: "Zertifizierungen und Normen",
    pol5_desc: "Regulatorische Konformität und technische Zertifizierungen der Produkte.",
    pol5_item1: "ANATEL-Zertifizierung",
    pol5_item2: "INMETRO und brasilianische technische Normen",
    pol5_item3: "Internationale Qualitätsstandards",
    doc_em_elaboracao: "Dokument in Bearbeitung",

    // UI
    ver_base: "Wissensdatenbank anzeigen",
    fechar: "Schließen",
  },

  it: {
    // META
    downloads_titulo: "Download",
    downloads_subtitulo: "Manuali, guide, software e documenti disponibili per il download.",
    videos_titulo: "Tutorial e Video",
    videos_subtitulo: "Impara passo dopo passo con i nostri tutorial video.",
    faq_titulo: "Domande Frequenti",
    faq_subtitulo: "Risposte rapide alle domande più comuni sui prodotti e servizi Acquafy.",
    politicas_titulo: "Politiche e Garanzie",
    politicas_subtitulo: "Trasparenza e chiarezza sui tuoi diritti e le condizioni Acquafy.",

    // Downloads categories
    cat_manuais: "Manuali Utente",
    cat_guias: "Guide Rapide",
    cat_softwares: "Software",
    cat_documentos: "Documenti",

    // Downloads file names
    guia_instalacao_rapida: "Guida all'Installazione Rapida",
    guia_manutencao: "Guida alla Manutenzione e Pulizia",
    primeiros_passos_app: "Primi Passi — App Acquafy",
    guia_parceiro: "Guida del Partner Acquafy",
    guia_troca_filtros: "Guida alla Sostituzione dei Filtri",
    ficha_tecnica: "Scheda Tecnica — Linea Neo",
    certificado_conformidade: "Certificato di Conformità",
    contrato_parceria: "Modello di Contratto di Partnership",
    politica_garantia_dl: "Politica di Garanzia Acquafy",
    declaracao_anatel: "Dichiarazione di Conformità ANATEL",

    // Videos section title
    videos_section_titulo: "Video e Tutorial",
    coming_soon: "Prossimamente",

    // Videos
    video1_titulo: "Come installare il purificatore Neo",
    video1_desc: "Guida completa all'installazione passo dopo passo.",
    video1_cat: "Installazione",
    video2_titulo: "Primi passi con l'app Acquafy",
    video2_desc: "Configura e collega il tuo dispositivo all'app.",
    video2_cat: "App",
    video3_titulo: "Come sostituire il filtro del purificatore Neo",
    video3_desc: "Sostituzione del filtro semplice e rapida.",
    video3_cat: "Manutenzione",
    video4_titulo: "Acquafy Media: pubblicizza sullo schermo",
    video4_desc: "Crea campagne e monetizza il tuo schermo.",
    video4_cat: "Media",
    video5_titulo: "Partnership Acquafy: da Silver a Platinum",
    video5_desc: "Come crescere nella rete di partner Acquafy.",
    video5_cat: "Partnership",
    video6_titulo: "Tour completo dell'app e delle funzionalità",
    video6_desc: "Esplora tutte le risorse dell'ecosistema.",
    video6_cat: "App",

    // FAQ
    faq1_pergunta: "Qual è la differenza tra i modelli Neo Essentials e Neo Premium?",
    faq1_resposta: "La linea Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e varianti) dispone di un pannello LED da 10,1\" ed è focalizzata sul rapporto qualità-prezzo con tecnologia UV LED + UF. La linea Neo Premium (INFINITY, PRESTIGE e PRIME) include un pannello IPS da 15,6\", filtrazione a Osmosi Inversa (RO) e finiture di alta qualità. Tutti i modelli dispongono di connettività Wi-Fi 5 e Bluetooth 5.3.",
    faq2_pergunta: "Come posso scaricare e configurare l'app Acquafy?",
    faq2_resposta: "L'app Acquafy è disponibile nell'App Store (iOS) e su Google Play (Android). Dopo l'installazione, crea il tuo account, avvicina lo smartphone al purificatore tramite Bluetooth 5.3 per abbinarli e segui la procedura guidata di configurazione Wi-Fi. Il processo richiede meno di 5 minuti.",
    faq3_pergunta: "Con quale frequenza devo sostituire il filtro del purificatore?",
    faq3_resposta: "I filtri Neo hanno una durata di 365 giorni o in base al consumo d'acqua. L'app Acquafy monitora in tempo reale il ciclo del filtro e invia avvisi quando si avvicina la sostituzione. Il sistema di Rifornimento Intelligente può effettuare l'ordine automaticamente tramite l'app.",
    faq4_pergunta: "Come posso diventare un partner Acquafy?",
    faq4_resposta: "Esistono tre livelli di partnership: Silver (affiliato/referente, commissione del 20%, senza investimento iniziale), Gold (operatore Acquafy Media, commissione del 20% sulle vendite + entrate pubblicitarie, a partire da 2.000 USD) e Platinum (distributore regionale, sconto del 70% sul prezzo USA, modello FOB). Accedi alla pagina Partner sul sito web o contatta il nostro team.",
    faq5_pergunta: "Cos'è Acquafy Media e come genera entrate ricorrenti?",
    faq5_resposta: "Acquafy Media è un sistema multimediale integrato nel pannello touchscreen dei purificatori Neo. Le aziende locali possono fare pubblicità sul display e i partner Gold guadagnano entrate mensili per ogni annuncio visualizzato. Gli utenti interagiscono anche tramite QR Code nelle campagne, generando dati di engagement.",
    faq6_pergunta: "Il purificatore Neo funziona con l'acqua di pozzo o solo con l'acqua di rete?",
    faq6_resposta: "I modelli della linea Essentials sono indicati per l'acqua di rete (con pressione da 20 a 80 PSI). La linea Premium con tecnologia RO (Osmosi Inversa) può trattare l'acqua con maggiore variazione di qualità. Per situazioni specifiche come l'acqua di pozzo, consigliamo di contattare uno specialista tecnico per una valutazione.",
    faq7_pergunta: "Qual è il periodo di garanzia dei prodotti Acquafy?",
    faq7_resposta: "I purificatori Neo hanno una garanzia di 1 anno contro i difetti di fabbricazione. La registrazione della garanzia deve essere effettuata tramite l'app Acquafy o il portale di assistenza. I difetti causati da installazione errata, uso improprio o manutenzione negligente non sono coperti dalla garanzia.",
    faq8_pergunta: "In quanti paesi opera Acquafy?",
    faq8_resposta: "Acquafy è presente in oltre 180 paesi, con operazioni 100% globali e assistenza disponibile in 16 lingue. Il modello di business consente ai partner distributori regionali di operare localmente con il supporto della piattaforma centrale.",

    // Policies
    pol1_titulo: "Politica di Garanzia",
    pol1_desc: "I tuoi prodotti Acquafy sono dotati di garanzia del produttore e copertura completa.",
    pol1_item1: "12 mesi di garanzia del produttore",
    pol1_item2: "Copertura per difetti di fabbricazione",
    pol1_item3: "Supporto tecnico specializzato",
    pol2_titulo: "Informativa sulla Privacy",
    pol2_desc: "Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.",
    pol2_item1: "Dati raccolti e finalità",
    pol2_item2: "Condivisione e sicurezza",
    pol2_item3: "I tuoi diritti come interessato",
    pol3_titulo: "Termini di Utilizzo",
    pol3_desc: "Regole e condizioni per l'utilizzo della piattaforma e dei prodotti Acquafy.",
    pol3_item1: "Condizioni di utilizzo della piattaforma",
    pol3_item2: "Responsabilità dell'utente",
    pol3_item3: "Proprietà intellettuale",
    pol4_titulo: "Politica di Reso",
    pol4_desc: "Come richiedere uno scambio, un reso o un rimborso per i prodotti.",
    pol4_item1: "Finestra di reso di 7 giorni",
    pol4_item2: "Condizioni per il rimborso completo",
    pol4_item3: "Come aprire una richiesta di reso",
    pol5_titulo: "Certificazioni e Normative",
    pol5_desc: "Conformità normativa e certificazioni tecniche dei prodotti.",
    pol5_item1: "Certificazione ANATEL",
    pol5_item2: "INMETRO e normative tecniche brasiliane",
    pol5_item3: "Standard internazionali di qualità",
    doc_em_elaboracao: "Documento in elaborazione",

    // UI
    ver_base: "Visualizza la Knowledge Base",
    fechar: "Chiudi",
  },

  zh: {
    // META
    downloads_titulo: "下载",
    downloads_subtitulo: "提供手册、指南、软件和文档下载。",
    videos_titulo: "教程与视频",
    videos_subtitulo: "通过我们的视频教程逐步学习。",
    faq_titulo: "常见问题",
    faq_subtitulo: "关于 Acquafy 产品和服务最常见问题的快速解答。",
    politicas_titulo: "政策与保修",
    politicas_subtitulo: "关于您的权利和 Acquafy 条款的透明度与清晰度。",

    // Downloads categories
    cat_manuais: "用户手册",
    cat_guias: "快速指南",
    cat_softwares: "软件",
    cat_documentos: "文档",

    // Downloads file names
    guia_instalacao_rapida: "快速安装指南",
    guia_manutencao: "维护与清洁指南",
    primeiros_passos_app: "入门指南 — Acquafy 应用",
    guia_parceiro: "Acquafy 合作伙伴指南",
    guia_troca_filtros: "滤芯更换指南",
    ficha_tecnica: "技术规格表 — Neo 系列",
    certificado_conformidade: "合规证书",
    contrato_parceria: "合作伙伴协议模板",
    politica_garantia_dl: "Acquafy 保修政策",
    declaracao_anatel: "ANATEL 合规声明",

    // Videos section title
    videos_section_titulo: "视频与教程",
    coming_soon: "即将推出",

    // Videos
    video1_titulo: "如何安装 Neo 净水器",
    video1_desc: "完整的逐步安装演练。",
    video1_cat: "安装",
    video2_titulo: "Acquafy 应用入门",
    video2_desc: "设置并将您的设备连接到应用。",
    video2_cat: "应用",
    video3_titulo: "如何更换 Neo 净水器滤芯",
    video3_desc: "简单快速的滤芯更换。",
    video3_cat: "维护",
    video4_titulo: "Acquafy Media：在屏幕上投放广告",
    video4_desc: "创建广告活动并实现屏幕变现。",
    video4_cat: "Media",
    video5_titulo: "Acquafy 合作伙伴计划：从 Silver 到 Platinum",
    video5_desc: "如何在 Acquafy 合作伙伴网络中成长。",
    video5_cat: "合作伙伴",
    video6_titulo: "应用与功能完整导览",
    video6_desc: "探索生态系统的所有资源。",
    video6_cat: "应用",

    // FAQ
    faq1_pergunta: "Neo Essentials 和 Neo Premium 型号有什么区别？",
    faq1_resposta: "Neo Essentials 系列（Neo UP、FIT、SMART H₂、TOUCH、PLUS、ULTRA、MAX 及其变体）配备 10.1 英寸 LED 面板，以紫外线 LED + UF 技术为核心，注重性价比。Neo Premium 系列（INFINITY、PRESTIGE 和 PRIME）配备 15.6 英寸 IPS 面板、反渗透（RO）过滤系统和高端工艺。所有型号均支持 Wi-Fi 5 和蓝牙 5.3。",
    faq2_pergunta: "如何下载和设置 Acquafy 应用？",
    faq2_resposta: "Acquafy 应用可在 App Store（iOS）和 Google Play（Android）上下载。安装后，创建您的账户，通过蓝牙 5.3 将智能手机靠近净水器进行配对，然后按照 Wi-Fi 设置向导操作。整个过程不到 5 分钟。",
    faq3_pergunta: "我应该多久更换一次净水器滤芯？",
    faq3_resposta: "Neo 滤芯使用寿命为 365 天或根据用水量决定。Acquafy 应用实时监控滤芯周期，并在更换临近时发送提醒。智能补货系统可通过应用自动下单。",
    faq4_pergunta: "如何成为 Acquafy 合作伙伴？",
    faq4_resposta: "合作伙伴分三个级别：Silver（联盟/推荐，20% 佣金，无需初始投资）、Gold（Acquafy Media 运营商，销售 20% 佣金 + 广告收入，起始投入 2,000 美元）和 Platinum（区域经销商，美国售价 70% 折扣，FOB 模式）。请访问网站合作伙伴页面或联系我们的团队。",
    faq5_pergunta: "什么是 Acquafy Media，它如何产生持续收入？",
    faq5_resposta: "Acquafy Media 是集成在 Neo 净水器触摸屏面板中的媒体系统。本地企业可以在显示屏上投放广告，Gold 合作伙伴每展示一条广告即可获得月度收入。用户还可以通过活动中的二维码进行互动，产生参与数据。",
    faq6_pergunta: "Neo 净水器适用于井水还是仅适用于自来水？",
    faq6_resposta: "Essentials 系列型号适用于自来水（水压 20 至 80 PSI）。配备 RO（反渗透）技术的 Premium 系列可处理水质变化较大的水源。对于井水等特殊情况，建议联系技术专家进行评估。",
    faq7_pergunta: "Acquafy 产品的保修期是多久？",
    faq7_resposta: "Neo 净水器享有 1 年制造缺陷保修。保修注册必须通过 Acquafy 应用或支持门户完成。因安装不当、使用不当或疏于维护造成的损坏不在保修范围内。",
    faq8_pergunta: "Acquafy 在多少个国家/地区运营？",
    faq8_resposta: "Acquafy 遍布 180 多个国家/地区，全球运营，提供 16 种语言的支持服务。商业模式允许区域经销商合作伙伴在中央平台的支持下本地化运营。",

    // Policies
    pol1_titulo: "保修政策",
    pol1_desc: "您的 Acquafy 产品附带制造商保修和完整保障。",
    pol1_item1: "12 个月制造商保修",
    pol1_item2: "制造缺陷保障",
    pol1_item3: "专业技术支持",
    pol2_titulo: "隐私政策",
    pol2_desc: "了解我们如何收集、使用和保护您的个人数据。",
    pol2_item1: "收集的数据及用途",
    pol2_item2: "共享与安全",
    pol2_item3: "您作为数据主体的权利",
    pol3_titulo: "使用条款",
    pol3_desc: "使用 Acquafy 平台和产品的规则和条件。",
    pol3_item1: "平台使用条件",
    pol3_item2: "用户责任",
    pol3_item3: "知识产权",
    pol4_titulo: "退货政策",
    pol4_desc: "如何申请产品的换货、退货或退款。",
    pol4_item1: "7 天退货窗口",
    pol4_item2: "全额退款条件",
    pol4_item3: "如何提交退货申请",
    pol5_titulo: "认证与标准",
    pol5_desc: "产品的法规合规性和技术认证。",
    pol5_item1: "ANATEL 认证",
    pol5_item2: "INMETRO 及巴西技术标准",
    pol5_item3: "国际质量标准",
    doc_em_elaboracao: "文件准备中",

    // UI
    ver_base: "查看知识库",
    fechar: "关闭",
  },

  ja: {
    // META
    downloads_titulo: "ダウンロード",
    downloads_subtitulo: "マニュアル、ガイド、ソフトウェア、ドキュメントをダウンロードできます。",
    videos_titulo: "チュートリアルと動画",
    videos_subtitulo: "動画チュートリアルでステップごとに学びましょう。",
    faq_titulo: "よくあるご質問",
    faq_subtitulo: "Acquafy の製品とサービスに関する最もよくある質問への回答。",
    politicas_titulo: "ポリシーと保証",
    politicas_subtitulo: "お客様の権利と Acquafy の条件に関する透明性と明確性。",

    // Downloads categories
    cat_manuais: "ユーザーマニュアル",
    cat_guias: "クイックガイド",
    cat_softwares: "ソフトウェア",
    cat_documentos: "ドキュメント",

    // Downloads file names
    guia_instalacao_rapida: "クイックインストールガイド",
    guia_manutencao: "メンテナンス・クリーニングガイド",
    primeiros_passos_app: "はじめに — Acquafy アプリ",
    guia_parceiro: "Acquafy パートナーガイド",
    guia_troca_filtros: "フィルター交換ガイド",
    ficha_tecnica: "技術仕様書 — Neo シリーズ",
    certificado_conformidade: "適合証明書",
    contrato_parceria: "パートナーシップ契約テンプレート",
    politica_garantia_dl: "Acquafy 保証ポリシー",
    declaracao_anatel: "ANATEL 適合宣言",

    // Videos section title
    videos_section_titulo: "動画とチュートリアル",
    coming_soon: "近日公開",

    // Videos
    video1_titulo: "Neo 浄水器の設置方法",
    video1_desc: "完全なステップバイステップのインストールガイド。",
    video1_cat: "設置",
    video2_titulo: "Acquafy アプリを使い始める",
    video2_desc: "デバイスをセットアップしてアプリに接続します。",
    video2_cat: "アプリ",
    video3_titulo: "Neo 浄水器フィルターの交換方法",
    video3_desc: "簡単で素早いフィルター交換。",
    video3_cat: "メンテナンス",
    video4_titulo: "Acquafy Media：画面に広告を掲載",
    video4_desc: "キャンペーンを作成し、画面を収益化します。",
    video4_cat: "Media",
    video5_titulo: "Acquafy パートナーシップ：Silver から Platinum へ",
    video5_desc: "Acquafy パートナーネットワークで成長する方法。",
    video5_cat: "パートナーシップ",
    video6_titulo: "アプリと機能の完全ツアー",
    video6_desc: "エコシステムのすべてのリソースを探索します。",
    video6_cat: "アプリ",

    // FAQ
    faq1_pergunta: "Neo Essentials と Neo Premium モデルの違いは何ですか？",
    faq1_resposta: "Neo Essentials シリーズ（Neo UP、FIT、SMART H₂、TOUCH、PLUS、ULTRA、MAX およびバリアント）は 10.1 インチ LED パネルを搭載し、UV LED + UF 技術によるコストパフォーマンスを重視しています。Neo Premium シリーズ（INFINITY、PRESTIGE、PRIME）は 15.6 インチ IPS パネル、逆浸透（RO）ろ過、プレミアム仕上げを備えています。全モデルが Wi-Fi 5 および Bluetooth 5.3 に対応しています。",
    faq2_pergunta: "Acquafy アプリのダウンロードと設定方法を教えてください。",
    faq2_resposta: "Acquafy アプリは App Store（iOS）および Google Play（Android）で入手できます。インストール後、アカウントを作成し、Bluetooth 5.3 でスマートフォンを浄水器に近づけてペアリングし、Wi-Fi 設定ウィザードに従ってください。手順は 5 分以内で完了します。",
    faq3_pergunta: "浄水器のフィルターはどのくらいの頻度で交換すべきですか？",
    faq3_resposta: "Neo フィルターの寿命は 365 日、または水の消費量によって異なります。Acquafy アプリはフィルターサイクルをリアルタイムで監視し、交換が近づくとアラートを送信します。スマート補充システムはアプリを通じて自動的に注文することができます。",
    faq4_pergunta: "Acquafy のパートナーになるにはどうすればよいですか？",
    faq4_resposta: "パートナーシップには 3 つのレベルがあります：Silver（アフィリエイト/紹介、20% コミッション、初期投資不要）、Gold（Acquafy Media オペレーター、販売 20% コミッション + 広告収入、2,000 USD から）、Platinum（地域ディストリビューター、USA 価格から 70% 割引、FOB モデル）。ウェブサイトのパートナーページをご覧いただくか、チームにお問い合わせください。",
    faq5_pergunta: "Acquafy Media とは何ですか？どのように継続的な収益を生み出しますか？",
    faq5_resposta: "Acquafy Media は Neo 浄水器のタッチスクリーンパネルに統合されたメディアシステムです。地元の企業がディスプレイに広告を掲載でき、Gold パートナーは表示された広告ごとに月次収益を得ます。ユーザーもキャンペーンの QR コードを通じてインタラクションでき、エンゲージメントデータが生成されます。",
    faq6_pergunta: "Neo 浄水器は井戸水にも対応していますか、それとも水道水のみですか？",
    faq6_resposta: "Essentials シリーズのモデルは水道水（圧力 20〜80 PSI）向けに設計されています。RO（逆浸透）技術を備えた Premium シリーズは、品質変動の大きい水を処理できます。井戸水などの特殊な状況には、技術専門家への相談をお勧めします。",
    faq7_pergunta: "Acquafy 製品の保証期間はどのくらいですか？",
    faq7_resposta: "Neo 浄水器は製造上の欠陥に対して 1 年間の保証が付いています。保証登録は Acquafy アプリまたはサポートポータルから行う必要があります。誤った設置、不適切な使用、または不注意なメンテナンスによる欠陥は保証対象外となります。",
    faq8_pergunta: "Acquafy は何カ国で展開していますか？",
    faq8_resposta: "Acquafy は 180 カ国以上に展開し、100% グローバルな運営と 16 言語でのサポートを提供しています。このビジネスモデルにより、地域ディストリビューターパートナーが中央プラットフォームのサポートを受けながらローカルに運営できます。",

    // Policies
    pol1_titulo: "保証ポリシー",
    pol1_desc: "Acquafy 製品にはメーカー保証と完全な補償が付いています。",
    pol1_item1: "12 カ月のメーカー保証",
    pol1_item2: "製造上の欠陥の補償",
    pol1_item3: "専門技術サポート",
    pol2_titulo: "プライバシーポリシー",
    pol2_desc: "お客様の個人データの収集、使用、保護方法をご確認ください。",
    pol2_item1: "収集するデータとその目的",
    pol2_item2: "共有とセキュリティ",
    pol2_item3: "データ主体としての権利",
    pol3_titulo: "利用規約",
    pol3_desc: "Acquafy プラットフォームおよび製品の使用に関するルールと条件。",
    pol3_item1: "プラットフォームの使用条件",
    pol3_item2: "ユーザーの責任",
    pol3_item3: "知的財産",
    pol4_titulo: "返品ポリシー",
    pol4_desc: "製品の交換、返品、または返金を申請する方法。",
    pol4_item1: "7 日間の返品ウィンドウ",
    pol4_item2: "全額返金の条件",
    pol4_item3: "返品リクエストの開き方",
    pol5_titulo: "認証と規格",
    pol5_desc: "製品の規制適合性と技術認証。",
    pol5_item1: "ANATEL 認証",
    pol5_item2: "INMETRO およびブラジルの技術規格",
    pol5_item3: "国際品質基準",
    doc_em_elaboracao: "文書作成中",

    // UI
    ver_base: "ナレッジベースを見る",
    fechar: "閉じる",
  },

  ko: {
    // META
    downloads_titulo: "다운로드",
    downloads_subtitulo: "다운로드 가능한 매뉴얼, 가이드, 소프트웨어 및 문서.",
    videos_titulo: "튜토리얼 및 동영상",
    videos_subtitulo: "동영상 튜토리얼로 단계별로 배워보세요.",
    faq_titulo: "자주 묻는 질문",
    faq_subtitulo: "Acquafy 제품 및 서비스에 관한 가장 일반적인 질문에 대한 빠른 답변.",
    politicas_titulo: "정책 및 보증",
    politicas_subtitulo: "귀하의 권리와 Acquafy 조건에 대한 투명성과 명확성.",

    // Downloads categories
    cat_manuais: "사용자 매뉴얼",
    cat_guias: "빠른 가이드",
    cat_softwares: "소프트웨어",
    cat_documentos: "문서",

    // Downloads file names
    guia_instalacao_rapida: "빠른 설치 가이드",
    guia_manutencao: "유지보수 및 청소 가이드",
    primeiros_passos_app: "시작하기 — Acquafy 앱",
    guia_parceiro: "Acquafy 파트너 가이드",
    guia_troca_filtros: "필터 교체 가이드",
    ficha_tecnica: "기술 사양서 — Neo 라인",
    certificado_conformidade: "적합성 인증서",
    contrato_parceria: "파트너십 계약 템플릿",
    politica_garantia_dl: "Acquafy 보증 정책",
    declaracao_anatel: "ANATEL 적합성 선언",

    // Videos section title
    videos_section_titulo: "동영상 및 튜토리얼",
    coming_soon: "출시 예정",

    // Videos
    video1_titulo: "Neo 정수기 설치 방법",
    video1_desc: "완전한 단계별 설치 안내.",
    video1_cat: "설치",
    video2_titulo: "Acquafy 앱 시작하기",
    video2_desc: "기기를 설정하고 앱에 연결합니다.",
    video2_cat: "앱",
    video3_titulo: "Neo 정수기 필터 교체 방법",
    video3_desc: "간단하고 빠른 필터 교체.",
    video3_cat: "유지보수",
    video4_titulo: "Acquafy Media: 화면에 광고하기",
    video4_desc: "캠페인을 만들고 화면을 수익화하세요.",
    video4_cat: "Media",
    video5_titulo: "Acquafy 파트너십: Silver에서 Platinum까지",
    video5_desc: "Acquafy 파트너 네트워크에서 성장하는 방법.",
    video5_cat: "파트너십",
    video6_titulo: "앱 및 기능 전체 둘러보기",
    video6_desc: "에코시스템의 모든 리소스를 탐색하세요.",
    video6_cat: "앱",

    // FAQ
    faq1_pergunta: "Neo Essentials와 Neo Premium 모델의 차이점은 무엇인가요?",
    faq1_resposta: "Neo Essentials 라인(Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX 및 변형)은 10.1\" LED 패널을 갖추고 UV LED + UF 기술로 가성비에 초점을 맞춥니다. Neo Premium 라인(INFINITY, PRESTIGE, PRIME)은 15.6\" IPS 패널, 역삼투(RO) 필터링, 프리미엄 마감재를 포함합니다. 모든 모델은 Wi-Fi 5 및 Bluetooth 5.3 연결을 지원합니다.",
    faq2_pergunta: "Acquafy 앱을 다운로드하고 설정하는 방법은 무엇인가요?",
    faq2_resposta: "Acquafy 앱은 App Store(iOS) 및 Google Play(Android)에서 다운로드할 수 있습니다. 설치 후 계정을 만들고, Bluetooth 5.3으로 스마트폰을 정수기에 가까이 대어 페어링한 다음 Wi-Fi 설정 마법사를 따라 진행하세요. 5분 이내에 완료됩니다.",
    faq3_pergunta: "정수기 필터는 얼마나 자주 교체해야 하나요?",
    faq3_resposta: "Neo 필터의 수명은 365일 또는 물 소비량에 따라 다릅니다. Acquafy 앱은 필터 사이클을 실시간으로 모니터링하고 교체가 가까워지면 알림을 보냅니다. 스마트 보충 시스템은 앱을 통해 자동으로 주문할 수 있습니다.",
    faq4_pergunta: "Acquafy 파트너가 되려면 어떻게 해야 하나요?",
    faq4_resposta: "파트너십에는 세 가지 수준이 있습니다: Silver(제휴/추천, 20% 수수료, 초기 투자 없음), Gold(Acquafy Media 운영자, 판매 20% 수수료 + 광고 수익, 미화 2,000달러부터), Platinum(지역 유통업체, 미국 가격 70% 할인, FOB 모델). 웹사이트 파트너 페이지를 방문하거나 팀에 문의하세요.",
    faq5_pergunta: "Acquafy Media란 무엇이며 어떻게 지속적인 수익을 창출하나요?",
    faq5_resposta: "Acquafy Media는 Neo 정수기 터치스크린 패널에 통합된 미디어 시스템입니다. 지역 비즈니스가 디스플레이에 광고를 게재할 수 있으며, Gold 파트너는 각 광고 표시마다 월 수익을 얻습니다. 사용자들도 캠페인의 QR 코드를 통해 상호작용하여 참여 데이터를 생성합니다.",
    faq6_pergunta: "Neo 정수기는 우물물에서도 사용할 수 있나요, 아니면 수돗물만 가능한가요?",
    faq6_resposta: "Essentials 라인 모델은 수돗물(수압 20~80 PSI)용으로 설계되었습니다. RO(역삼투) 기술이 탑재된 Premium 라인은 품질 변동이 더 큰 물을 처리할 수 있습니다. 우물물과 같은 특수한 상황에는 기술 전문가에게 문의하여 평가를 받으시길 권장합니다.",
    faq7_pergunta: "Acquafy 제품의 보증 기간은 얼마나 되나요?",
    faq7_resposta: "Neo 정수기는 제조 결함에 대해 1년 보증이 제공됩니다. 보증 등록은 Acquafy 앱 또는 지원 포털을 통해 완료해야 합니다. 잘못된 설치, 부적절한 사용 또는 소홀한 유지보수로 인한 결함은 보증 대상에서 제외됩니다.",
    faq8_pergunta: "Acquafy는 몇 개 국가에서 운영하고 있나요?",
    faq8_resposta: "Acquafy는 180개 이상의 국가에 진출해 있으며 100% 글로벌 운영과 16개 언어로 지원을 제공합니다. 비즈니스 모델은 지역 유통업체 파트너가 중앙 플랫폼의 지원을 받아 현지에서 운영할 수 있도록 합니다.",

    // Policies
    pol1_titulo: "보증 정책",
    pol1_desc: "Acquafy 제품에는 제조사 보증과 완전한 보장이 포함됩니다.",
    pol1_item1: "12개월 제조사 보증",
    pol1_item2: "제조 결함 보장",
    pol1_item3: "전문 기술 지원",
    pol2_titulo: "개인정보 보호정책",
    pol2_desc: "개인 데이터를 수집, 사용 및 보호하는 방법을 알아보세요.",
    pol2_item1: "수집 데이터 및 목적",
    pol2_item2: "공유 및 보안",
    pol2_item3: "데이터 주체로서의 권리",
    pol3_titulo: "이용 약관",
    pol3_desc: "Acquafy 플랫폼 및 제품 사용에 관한 규칙과 조건.",
    pol3_item1: "플랫폼 사용 조건",
    pol3_item2: "사용자 책임",
    pol3_item3: "지적 재산권",
    pol4_titulo: "반품 정책",
    pol4_desc: "제품 교환, 반품 또는 환불을 요청하는 방법.",
    pol4_item1: "7일 반품 기간",
    pol4_item2: "전액 환불 조건",
    pol4_item3: "반품 요청 방법",
    pol5_titulo: "인증 및 표준",
    pol5_desc: "제품의 규제 준수 및 기술 인증.",
    pol5_item1: "ANATEL 인증",
    pol5_item2: "INMETRO 및 브라질 기술 표준",
    pol5_item3: "국제 품질 기준",
    doc_em_elaboracao: "문서 준비 중",

    // UI
    ver_base: "지식 베이스 보기",
    fechar: "닫기",
  },

  sv: {
    // META
    downloads_titulo: "Nedladdningar",
    downloads_subtitulo: "Manualer, guider, programvara och dokument tillgangliga for nedladdning.",
    videos_titulo: "Handledningar och videor",
    videos_subtitulo: "Lar dig steg for steg med vara videohandledningar.",
    faq_titulo: "Vanliga fragori",
    faq_subtitulo: "Snabba svar pa de vanligaste fragorna om Acquafys produkter och tjanster.",
    politicas_titulo: "Policyer och garantier",
    politicas_subtitulo: "Transparens och tydlighet om dina rattigheter och Acquafys villkor.",

    // Downloads categories
    cat_manuais: "Anvandarhandbocker",
    cat_guias: "Snabbguider",
    cat_softwares: "Programvara",
    cat_documentos: "Dokument",

    // Downloads file names
    guia_instalacao_rapida: "Snabbinstallationsguide",
    guia_manutencao: "Underhalls- och rengorignsguide",
    primeiros_passos_app: "Kom igang -- Acquafy-appen",
    guia_parceiro: "Acquafy partnerguide",
    guia_troca_filtros: "Guide for filterbyte",
    ficha_tecnica: "Tekniskt datablad -- Neo-serien",
    certificado_conformidade: "Konformitetsintyg",
    contrato_parceria: "Partnerskapavtalsmall",
    politica_garantia_dl: "Acquafy garantipolicy",
    declaracao_anatel: "ANATEL konformitetsforklaring",

    // Videos section title
    videos_section_titulo: "Videor och handledningar",
    coming_soon: "Kommer snart",

    // Videos
    video1_titulo: "Hur man installerar Neo-renarens",
    video1_desc: "Komplett steg-for-steg installationsguide.",
    video1_cat: "Installation",
    video2_titulo: "Kom igang med Acquafy-appen",
    video2_desc: "Installera och anslut din enhet till appen.",
    video2_cat: "App",
    video3_titulo: "Hur man byter filter pa Neo-renaren",
    video3_desc: "Enkelt och snabbt filterbyte.",
    video3_cat: "Underhall",
    video4_titulo: "Acquafy Media: annonsera pa skermen",
    video4_desc: "Skapa kampanjer och monetisera din skerm.",
    video4_cat: "Media",
    video5_titulo: "Acquafy-partnerskap: fran Silver till Platinum",
    video5_desc: "Hur man vaxer inom Acquafys partnaternatverk.",
    video5_cat: "Partnerskap",
    video6_titulo: "Fullstandig rundtur i appen och funktionerna",
    video6_desc: "Utforska alla resurser i ekosystemet.",
    video6_cat: "App",

    // FAQ
    faq1_pergunta: "Vad ar skillnaden mellan modellerna Neo Essentials och Neo Premium?",
    faq1_resposta: "Neo Essentials-serien (Neo UP, FIT, SMART H2, TOUCH, PLUS, ULTRA, MAX och varianter) har en 10,1\" LED-panel och fokuserar pa kostnadsefficiens med UV LED + UF-teknik. Neo Premium-serien (INFINITY, PRESTIGE och PRIME) inkluderar en 15,6\" IPS-panel, omvand osmosfiltrering (RO) och premiummaterial. Alla modeller har Wi-Fi 5 och Bluetooth 5.3.",
    faq2_pergunta: "Hur laddar jag ner och installerar Acquafy-appen?",
    faq2_resposta: "Acquafy-appen finns i App Store (iOS) och Google Play (Android). Efter installationen skapar du ditt konto, haller smarttelefonen nara renaren via Bluetooth 5.3 for parkoppling och foljer Wi-Fi-installationsguiden. Processen tar mindre an 5 minuter.",
    faq3_pergunta: "Hur ofta ska jag byta filter pa renaren?",
    faq3_resposta: "Neo-filter har en livslangd pa 365 dagar eller enligt vattenforbrukning. Acquafy-appen overvakar filtercykeln i realtid och skickar aviseringar nar byte narmar sig. Det smarta pafyllningssystemet kan lagga bestellningen automatiskt via appen.",
    faq4_pergunta: "Hur blir jag Acquafy-partner?",
    faq4_resposta: "Det finns tre partnerskapsniver: Silver (affiliate/referral, 20% provision, ingen startinvestering), Gold (Acquafy Media-operator, 20% provision pa forsaljning + annonsintakter, fran US$2 000) och Platinum (regional distributtor, 70% rabatt pa USA-priset, FOB-modell). Besok partnersidan pa webbplatsen eller kontakta vart team.",
    faq5_pergunta: "Vad ar Acquafy Media och hur genererar det returning intakter?",
    faq5_resposta: "Acquafy Media ar ett mediesystem integrerat i touchscreen-panelen pa Neo-renarna. Lokala foretag kan annonsera pa displayen och Gold-partners far manatliga intakter for varje annons som visas. Anvandare interagerar ocksa via QR-kod i kampanjer, vilket genererar engagemangsdata.",
    faq6_pergunta: "Fungerar Neo-renaren med brunnsvatten eller bara kranvatten?",
    faq6_resposta: "Modeller i Essentials-serien ar avsedda for kranvatten (med tryck pa 20 till 80 PSI). Premium-serien med RO-teknik (omvand osmos) kan behandla vatten med storre kvalitetsvariation. For specifika situationer som brunnsvatten rekommenderar vi att kontakta en teknisk specialist for bedamning.",
    faq7_pergunta: "Vad ar garantitiden for Acquafys produkter?",
    faq7_resposta: "Neo-renarna levereras med 1 ars garanti mot tillverkningsfel. Garantiregistrering maste goras via Acquafy-appen eller supportportalen. Fel orsakade av felaktig installation, felaktigt anvandande eller vanskotsam underhall tackts inte av garantin.",
    faq8_pergunta: "I hur manga lander verkar Acquafy?",
    faq8_resposta: "Acquafy finns i fler an 180 lander, med 100% global verksamhet och support tillganglig pa 16 sprak. Affarsmodellen gor det mojligt for regionala distributorspartners att verka lokalt med stod fran den centrala plattformen.",

    // Policies
    pol1_titulo: "Garantipolicy",
    pol1_desc: "Dina Acquafy-produkter levereras med tillverkargaranti och fullstandig tackning.",
    pol1_item1: "12 manaders tillverkargaranti",
    pol1_item2: "Tackning for tillverkningsfel",
    pol1_item3: "Specialiserad teknisk support",
    pol2_titulo: "Integritetspolicy",
    pol2_desc: "Las om hur vi samlar in, anvander och skyddar dina personuppgifter.",
    pol2_item1: "Insamlade uppgifter och andamal",
    pol2_item2: "Delning och sakerhet",
    pol2_item3: "Dina rattigheter som registrerad",
    pol3_titulo: "Anvandningsvillkor",
    pol3_desc: "Regler och villkor for anvandning av Acquafys plattform och produkter.",
    pol3_item1: "Villkor for anvandning av plattformen",
    pol3_item2: "Anvandarens ansvar",
    pol3_item3: "Immateriella rattigheter",
    pol4_titulo: "Returpolicy",
    pol4_desc: "Hur man begarer byte, retur eller aterbetalning av produkter.",
    pol4_item1: "7 dagars returfonster",
    pol4_item2: "Villkor for full aterbetalning",
    pol4_item3: "Hur man oppnar en returfofragan",
    pol5_titulo: "Certifieringar och standarder",
    pol5_desc: "Regulatorisk efterlevnad och tekniska certifieringar for produkterna.",
    pol5_item1: "ANATEL-certifiering",
    pol5_item2: "INMETRO och brasilianska tekniska standarder",
    pol5_item3: "Internationella kvalitetsstandarder",
    doc_em_elaboracao: "Dokument under utarbetande",

    // UI
    ver_base: "Visa kunskapsbas",
    fechar: "Stang",
  },

  fi: {
    // META
    downloads_titulo: "Lataukset",
    downloads_subtitulo: "Kayttooppaat, oppaat, ohjelmistot ja asiakirjat ladattavissa.",
    videos_titulo: "Opetusvideot ja videot",
    videos_subtitulo: "Opi vaihe vaiheelta videooppaidemme avulla.",
    faq_titulo: "Usein kysytyt kysymykset",
    faq_subtitulo: "Nopeat vastaukset yleisimpiin kysymyksiin Acquafyn tuotteista ja palveluista.",
    politicas_titulo: "Kaytannot ja takuut",
    politicas_subtitulo: "Avoimuutta ja selkeytta oikeuksistasi ja Acquafyn ehdoista.",

    // Downloads categories
    cat_manuais: "Kayttooppaat",
    cat_guias: "Pikaoppaat",
    cat_softwares: "Ohjelmistot",
    cat_documentos: "Asiakirjat",

    // Downloads file names
    guia_instalacao_rapida: "Pika-asennusopas",
    guia_manutencao: "Huolto- ja puhdistusopas",
    primeiros_passos_app: "Aloitusopas -- Acquafy-sovellus",
    guia_parceiro: "Acquafy-kumppaniopas",
    guia_troca_filtros: "Suodattimen vaihto-opas",
    ficha_tecnica: "Tekninen tietolehti -- Neo-sarja",
    certificado_conformidade: "Vaatimustenmukaisuustodistus",
    contrato_parceria: "Kumppanuussopimuspohja",
    politica_garantia_dl: "Acquafy-takuukaytos",
    declaracao_anatel: "ANATEL-vaatimustenmukaisuusselostus",

    // Videos section title
    videos_section_titulo: "Videot ja opetusvideot",
    coming_soon: "Tulossa pian",

    // Videos
    video1_titulo: "Neo-vedenputistimen asennus",
    video1_desc: "Taysipainoinen vaiheittainen asennusohje.",
    video1_cat: "Asennus",
    video2_titulo: "Acquafy-sovelluksen kayttonotton",
    video2_desc: "Aseta ja yhdista laitteesi sovellukseen.",
    video2_cat: "Sovellus",
    video3_titulo: "Neo-puhdistimen suodattimen vaihto",
    video3_desc: "Yksinkertainen ja nopea suodattimen vaihto.",
    video3_cat: "Huolto",
    video4_titulo: "Acquafy Media: mainosta naytolla",
    video4_desc: "Luo kampanjoita ja tienaa naytollasi.",
    video4_cat: "Media",
    video5_titulo: "Acquafy-kumppanuus: Silverista Platinumiin",
    video5_desc: "Kuinka kasvaa Acquafyn kumppaniverkostossa.",
    video5_cat: "Kumppanuus",
    video6_titulo: "Taysi kierros sovelluksessa ja ominaisuuksissa",
    video6_desc: "Tutustu ekosysteemin kaikkiin resursseihin.",
    video6_cat: "Sovellus",

    // FAQ
    faq1_pergunta: "Mika on ero Neo Essentials- ja Neo Premium -mallien valilla?",
    faq1_resposta: "Neo Essentials -sarja (Neo UP, FIT, SMART H2, TOUCH, PLUS, ULTRA, MAX ja variantit) sisaltaa 10,1\" LED-paneelin ja keskittyy kustannustehokkuuteen UV LED + UF -tekniikalla. Neo Premium -sarja (INFINITY, PRESTIGE ja PRIME) sisaltaa 15,6\" IPS-paneelin, kaanteisosmoosipuhdistuksen (RO) ja premium-viimeistelyn. Kaikissa malleissa on Wi-Fi 5 ja Bluetooth 5.3.",
    faq2_pergunta: "Kuinka lataan ja asetan Acquafy-sovelluksen?",
    faq2_resposta: "Acquafy-sovellus on saatavilla App Storesta (iOS) ja Google Playsta (Android). Asennuksen jalkeen luo tilisi, tuo alypuhelimesi lahelle puhdistinta Bluetooth 5.3 -yhteyden kautta parittamista varten ja seuraa Wi-Fi-asennusoppaan ohjeita. Prosessi kestaa alle 5 minuuttia.",
    faq3_pergunta: "Kuinka usein puhdistimen suodatin pitaa vaihtaa?",
    faq3_resposta: "Neo-suodattimilla on 365 paivan kayttóika tai vedenkulutuksen mukaan. Acquafy-sovellus seuraa suodatinkiertoa reaaliajassa ja lahettaa ilmoituksia, kun vaihto lahenee. Alykas taydennysjaarjestelma voi tilata automaattisesti sovelluksen kautta.",
    faq4_pergunta: "Kuinka tulen Acquafy-kumppaniksi?",
    faq4_resposta: "Kumppanuustasoja on kolme: Silver (affiliate/suosittelu, 20% provisio, ei alkuinvestointia), Gold (Acquafy Media -operaattori, 20% provisio myynnista + mainostulot, alkaen US$2 000) ja Platinum (alueellinen jakelija, 70% alennus USA:n hinnasta, FOB-malli). Vieraile kumppanisivulla verkkosivustolla tai ota yhteytta tiimiimme.",
    faq5_pergunta: "Mika on Acquafy Media ja miten se tuottaa jatkuvaa tuloa?",
    faq5_resposta: "Acquafy Media on Neo-puhdistimien kosketusnayttopaneeliin integroitu mediajaarjestelma. Paikalliset yritykset voivat mainostaa naytolla ja Gold-kumppanit ansaitsevat kuukausittaisia tuloja jokaisesta nakytetymesta mainoksesta. Kayttajat voivat myos olla vuorovaikutuksessa kampanjoiden QR-koodien kautta, mika tuottaa sitoutumistietoja.",
    faq6_pergunta: "Toimiiko Neo-puhdistin kaivoveden kanssa vai vain vesijohtoveden kanssa?",
    faq6_resposta: "Essentials-sarjan mallit on suunniteltu vesijohtovedelle (paineella 20-80 PSI). RO-tekniikalla (kaanteisosmoosi) varustettu Premium-sarja pystyy kasittelemaan vetta, jonka laatu vaihtelee enemmain. Erityistilanteisiin, kuten kaivovesi, suosittelemme ottamaan yhteytta tekniseen asiantuntijaan arviointia varten.",
    faq7_pergunta: "Mika on Acquafy-tuotteiden takuuaika?",
    faq7_resposta: "Neo-puhdistimilla on 1 vuoden takuu valmistusvirheita vastaan. Takuurekisterointi on tehtava Acquafy-sovelluksen tai tukiportaalin kautta. Viarein asennuksen, vaaran kayton tai huolimattoman huollon aiheuttamia vikoja ei kata takuu.",
    faq8_pergunta: "Monessako maassa Acquafy toimii?",
    faq8_resposta: "Acquafy on lasnao yli 180 maassa, 100% globaalilla toiminnalla ja tuella 16 kielella. Liiketoimintamalli mahdollistaa alueellisten jakelijakumppaneiden toimimisen paikallisesti keskusalustan tuella.",

    // Policies
    pol1_titulo: "Takuukaytos",
    pol1_desc: "Acquafy-tuotteissasi on valmistajatakuu ja taydellinen kattavuus.",
    pol1_item1: "12 kuukauden valmistajatakuu",
    pol1_item2: "Kattavuus valmistusvirheille",
    pol1_item3: "Erikoistunut tekninen tuki",
    pol2_titulo: "Tietosuojakaytos",
    pol2_desc: "Lue, miten keraamme, kaytamme ja suojelemme henkilotietojasi.",
    pol2_item1: "Kerattavat tiedot ja tarkoitus",
    pol2_item2: "Jakaminen ja turvallisuus",
    pol2_item3: "Oikeutesi rekisteroityyna",
    pol3_titulo: "Kayttoehdot",
    pol3_desc: "Saannot ja ehdot Acquafyn alustan ja tuotteiden kayttamiselle.",
    pol3_item1: "Alustan kayttoehdot",
    pol3_item2: "Kayttajan vastuut",
    pol3_item3: "Immateriaalioikeudet",
    pol4_titulo: "Palautuskaytos",
    pol4_desc: "Kuinka pyytaa tuotteiden vaihtoa, palautusta tai hyvitysta.",
    pol4_item1: "7 paivan palautusikkuna",
    pol4_item2: "Tayden hyvityksen ehdot",
    pol4_item3: "Kuinka avata palautuspyynto",
    pol5_titulo: "Sertifioinnit ja standardit",
    pol5_desc: "Tuotteiden saannostelinmukaisuus ja tekniset sertifioinnit.",
    pol5_item1: "ANATEL-sertifiointi",
    pol5_item2: "INMETRO ja Brasilian tekniset standardit",
    pol5_item3: "Kansainvaliset laatustandardit",
    doc_em_elaboracao: "Asiakirja valmisteilla",

    // UI
    ver_base: "Nayta tietopohja",
    fechar: "Sulje",
  },

  ru: {
    // META
    downloads_titulo: "Zagruzki",
    downloads_subtitulo: "Rukovodstva, gajdy, programmnoe obespechenie i dokumenty dostupny dlya skachivaniya.",
    videos_titulo: "Uchebniki i video",
    videos_subtitulo: "Uchiytes poshagovo s nashimi video-uchebnikami.",
    faq_titulo: "Chasto zadavaemye voprosy",
    faq_subtitulo: "Bystrye otvety na naibolee rasprostranennye voprosy o produktakh i uslugakh Acquafy.",
    politicas_titulo: "Politiki i garantii",
    politicas_subtitulo: "Prozrachnost i yasnost v otnoshenii vashikh prav i uslovij Acquafy.",

    // Downloads categories
    cat_manuais: "Rukovodstva polzovatelya",
    cat_guias: "Kratnye rukovodstva",
    cat_softwares: "Programmnoe obespechenie",
    cat_documentos: "Dokumenty",

    // Downloads file names
    guia_instalacao_rapida: "Rukovodstvo po bystroij ustanovke",
    guia_manutencao: "Rukovodstvo po obsluzhivaniyu i ochistke",
    primeiros_passos_app: "Nachalo raboty -- Prilozhenie Acquafy",
    guia_parceiro: "Rukovodstvo partnera Acquafy",
    guia_troca_filtros: "Rukovodstvo po zamene filtrov",
    ficha_tecnica: "Tekhnicheskij list -- Linejka Neo",
    certificado_conformidade: "Sertifikat sootvetstviya",
    contrato_parceria: "Shablon partnerskogo soglasheniya",
    politica_garantia_dl: "Garantijnaya politika Acquafy",
    declaracao_anatel: "Deklaraciya sootvetstviya ANATEL",

    // Videos section title
    videos_section_titulo: "Video i uchebniki",
    coming_soon: "Skoro budet",

    // Videos
    video1_titulo: "Kak ustanovit ochystitel Neo",
    video1_desc: "Polnoe poshagovoe rukovodstvo po ustanovke.",
    video1_cat: "Ustanovka",
    video2_titulo: "Nachalo raboty s prilozheniem Acquafy",
    video2_desc: "Nastrojte i podklyuchite ustrojstvo k prilozheniyu.",
    video2_cat: "Prilozhenie",
    video3_titulo: "Kak zamenit filtr ochistitelya Neo",
    video3_desc: "Prostaya i bystraya zamena filtra.",
    video3_cat: "Obsluzhivanie",
    video4_titulo: "Acquafy Media: reklamirujtesj na ekrane",
    video4_desc: "Sozdajte kampanii i monetizirujte vash ekran.",
    video4_cat: "Media",
    video5_titulo: "Partnerstvo Acquafy: ot Silver do Platinum",
    video5_desc: "Kak rasti v partnerskoj seti Acquafy.",
    video5_cat: "Partnerstvo",
    video6_titulo: "Polnyj obzor prilozheniya i funkcij",
    video6_desc: "Issledujte vse resursy ekosistemy.",
    video6_cat: "Prilozhenie",

    // FAQ
    faq1_pergunta: "V chem raznica mezhdu modelyami Neo Essentials i Neo Premium?",
    faq1_resposta: "Linejka Neo Essentials (Neo UP, FIT, SMART H2, TOUCH, PLUS, ULTRA, MAX i varianty) osnashhena 10,1\" LED-panelyu i orientirovana na sootnoshenie ceny i kachestva s tekhnologiej UV LED + UF. Linejka Neo Premium (INFINITY, PRESTIGE i PRIME) vklyuchaet 15,6\" IPS-panel, filtracziyu metodom obratnog osmosa (RO) i premialnuyu otdelku. Vse modeli imeyut Wi-Fi 5 i Bluetooth 5.3.",
    faq2_pergunta: "Kak skachat i nastroit prilozhenie Acquafy?",
    faq2_resposta: "Prilozhenie Acquafy dostupno v App Store (iOS) i Google Play (Android). Posle ustanovki sozdajte uchetnuyu zapis, priblizite smartfon k ochistitelyu cherez Bluetooth 5.3 dlya spairivaniya i sledujte masteru nastrojki Wi-Fi. Process zanimaet menee 5 minut.",
    faq3_pergunta: "Kak chasto sleduet menyat filtr ochistitelya?",
    faq3_resposta: "Filtry Neo imeyut srok sluzhby 365 dnej ili v sootvetstvii s potrebleniem vody. Prilozhenie Acquafy v rezhime realnogo vremeni otsledivaet cikl filtra i otpravlyaet uvedomleniya, kogda priblizhaetstya zamena. Sistema intellektualnog popolneniya mozhet avtomaticheski oformit zakaz cherez prilozhenie.",
    faq4_pergunta: "Kak stat partnerom Acquafy?",
    faq4_resposta: "Sushhestvuyut tri urovnya partnerstva: Silver (affiliate/referral, komissia 20%, bez nachalnykh investicij), Gold (operator Acquafy Media, komissia 20% s prodazh + dokhod ot reklamy, ot 2 000 USD) i Platinum (regionalnyj distributor, skidka 70% ot ceny v SShA, model FOB). Posetite stranicu dlya partnerov na sajte ili svyazhitesj s nashej komandoj.",
    faq5_pergunta: "Chto takoe Acquafy Media i kak ono generiruet postoyannuyu pribyl?",
    faq5_resposta: "Acquafy Media -- eto medijasistema, integrirovannaya v sensornuyu panel ochistitelej Neo. Mestnye predpriyatiya mogut razmeshhat reklamu na displeje, a partnery Gold poluchayut ezhemesyachnyj dokhod za kazhduyu pokazannuyu reklamu. Polzovately takzhe vzaimodejstvuyut cherez QR-kody v kampaniyakh, generiruyashchikh dannye ob aktivnosti.",
    faq6_pergunta: "Rabotaet li ochystitel Neo s kolodeznoj vodoj ili tolko s vodoprovodnoj?",
    faq6_resposta: "Modeli linejki Essentials prednaznacheny dlya vodoprovodnoj vody (davlenie ot 20 do 80 PSI). Linejka Premium s tekhnologiej RO (obratnyj osmos) mozhet obrabatyvat vodu s bolshej izmenchivostyu kachestva. Dlya specificheskikh situacij, takih kak kolodeznaya voda, rekomenduyem obratitsya k tekhnicheskomu specialistu dlya ocenki.",
    faq7_pergunta: "Kakoj srok garantii na produkty Acquafy?",
    faq7_resposta: "Ochistitely Neo postavlyayutstya s godovoj garantiej ot proizvodstvennykh defektov. Registraciya garantii dolzhna byt vypolnena cherez prilozhenie Acquafy ili portal podderzhki. Defekty, vyzannye nepravilnoj ustanovkoj, nenadlezhashim ispolzovaniem ili khalatnym obsluzhivaniem, ne pokryvayutstya garantiej.",
    faq8_pergunta: "V skolkikh stranakh rabotaet Acquafy?",
    faq8_resposta: "Acquafy prisutstvuet bolee chem v 180 stranakh, s 100% globalnoj deyatelnostyu i podderzhkoj na 16 yazykakh. Biznes-model pozvolyaet regionalnym distributor-partneram rabotat lokalno pri podderzhke centralnoj platformy.",

    // Policies
    pol1_titulo: "Garantijnaya politika",
    pol1_desc: "Vashi produkty Acquafy postavlyayutstya s garantiej proizvoditelya i polnym pokrytiem.",
    pol1_item1: "12 mesyacev garantii proizvoditelya",
    pol1_item2: "Pokrytie proizvodstvennykh defektov",
    pol1_item3: "Specializirovannaya tekhnicheskaya podderzhka",
    pol2_titulo: "Politika konfidecialnosti",
    pol2_desc: "Uznaite, kak my sobiraem, ispolzuem i zahhhhishhaem vashi lichnye dannye.",
    pol2_item1: "Sobiraemye dannye i cel",
    pol2_item2: "Peredacha i bezopasnost",
    pol2_item3: "Vashi prava kak subiekta dannykh",
    pol3_titulo: "Usloviya ispolzovaniya",
    pol3_desc: "Pravila i usloviya ispolzovaniya platformy i produktov Acquafy.",
    pol3_item1: "Usloviya ispolzovaniya platformy",
    pol3_item2: "Otvetstvennost polzovatelya",
    pol3_item3: "Intellektualnaya sobstvennost",
    pol4_titulo: "Politika vozvrata",
    pol4_desc: "Kak zaprosit zamenu, vozvrat ili vozvrat sredstv za produkty.",
    pol4_item1: "7-dnevnoe okno dlya vozvrata",
    pol4_item2: "Usloviya polnogo vozvrata sredstv",
    pol4_item3: "Kak otkryt zayavku na vozvrat",
    pol5_titulo: "Sertifikacii i standarty",
    pol5_desc: "Sootvetstvie normativnym trebovaniyam i tekhnicheskie sertifikacii produktov.",
    pol5_item1: "Sertifikaciya ANATEL",
    pol5_item2: "INMETRO i brazilskie tekhnicheskie standarty",
    pol5_item3: "Mezhdunarodnye standarty kachestva",
    doc_em_elaboracao: "Dokument v razrabotke",

    // UI
    ver_base: "Prosmotret bazu znanii",
    fechar: "Zakryt",
  },

  ro: {
    // META
    downloads_titulo: "Descarcari",
    downloads_subtitulo: "Manuale, ghiduri, software si documente disponibile pentru descarcare.",
    videos_titulo: "Tutoriale si videoclipuri",
    videos_subtitulo: "Invata pas cu pas cu tutorialele noastre video.",
    faq_titulo: "Intrebari frecvente",
    faq_subtitulo: "Raspunsuri rapide la cele mai frecvente intrebari despre produsele si serviciile Acquafy.",
    politicas_titulo: "Politici si garantii",
    politicas_subtitulo: "Transparenta si claritate cu privire la drepturile tale si conditiile Acquafy.",

    // Downloads categories
    cat_manuais: "Manuale de utilizare",
    cat_guias: "Ghiduri rapide",
    cat_softwares: "Software",
    cat_documentos: "Documente",

    // Downloads file names
    guia_instalacao_rapida: "Ghid de instalare rapida",
    guia_manutencao: "Ghid de intretinere si curatare",
    primeiros_passos_app: "Primii pasi -- Aplicatia Acquafy",
    guia_parceiro: "Ghidul partenerului Acquafy",
    guia_troca_filtros: "Ghid de inlocuire a filtrelor",
    ficha_tecnica: "Fisa tehnica -- Linia Neo",
    certificado_conformidade: "Certificat de conformitate",
    contrato_parceria: "Model de contract de parteneriat",
    politica_garantia_dl: "Politica de garantie Acquafy",
    declaracao_anatel: "Declaratie de conformitate ANATEL",

    // Videos section title
    videos_section_titulo: "Videoclipuri si tutoriale",
    coming_soon: "In curand",

    // Videos
    video1_titulo: "Cum se instaleaza purificatorul Neo",
    video1_desc: "Ghid complet de instalare pas cu pas.",
    video1_cat: "Instalare",
    video2_titulo: "Primii pasi cu aplicatia Acquafy",
    video2_desc: "Configureaza si conecteaza dispozitivul la aplicatie.",
    video2_cat: "Aplicatie",
    video3_titulo: "Cum se inlocuieste filtrul purificatorului Neo",
    video3_desc: "Inlocuire simpla si rapida a filtrului.",
    video3_cat: "Intretinere",
    video4_titulo: "Acquafy Media: anuntati pe ecran",
    video4_desc: "Creati campanii si monetizati ecranul.",
    video4_cat: "Media",
    video5_titulo: "Parteneriat Acquafy: de la Silver la Platinum",
    video5_desc: "Cum sa cresti in reteaua de parteneri Acquafy.",
    video5_cat: "Parteneriat",
    video6_titulo: "Tur complet al aplicatiei si functionalitatilor",
    video6_desc: "Explorati toate resursele ecosistemului.",
    video6_cat: "Aplicatie",

    // FAQ
    faq1_pergunta: "Care este diferenta dintre modelele Neo Essentials si Neo Premium?",
    faq1_resposta: "Linia Neo Essentials (Neo UP, FIT, SMART H2, TOUCH, PLUS, ULTRA, MAX si variante) dispune de un panou LED de 10,1\" si se concentreaza pe raportul calitate-pret cu tehnologie UV LED + UF. Linia Neo Premium (INFINITY, PRESTIGE si PRIME) include un panou IPS de 15,6\", filtrare prin osmoza inversa (RO) si finisaje premium. Toate modelele au conectivitate Wi-Fi 5 si Bluetooth 5.3.",
    faq2_pergunta: "Cum descarc si configurez aplicatia Acquafy?",
    faq2_resposta: "Aplicatia Acquafy este disponibila in App Store (iOS) si Google Play (Android). Dupa instalare, creeaza-ti contul, apropie smartphone-ul de purificator prin Bluetooth 5.3 pentru asociere si urmeaza asistentul de configurare Wi-Fi. Procesul dureaza mai putin de 5 minute.",
    faq3_pergunta: "Cat de des trebuie sa inlocuiesc filtrul purificatorului?",
    faq3_resposta: "Filtrele Neo au o durata de viata de 365 de zile sau in functie de consumul de apa. Aplicatia Acquafy monitorizeaza ciclul filtrului in timp real si trimite alerte cand se apropie inlocuirea. Sistemul de reincarcare inteligenta poate plasa comanda automat prin aplicatie.",
    faq4_pergunta: "Cum devin partener Acquafy?",
    faq4_resposta: "Exista trei niveluri de parteneriat: Silver (afiliat/referint, comision de 20%, fara investitie initiala), Gold (operator Acquafy Media, comision de 20% din vanzari + venituri din publicitate, incepand de la 2.000 USD) si Platinum (distribuitor regional, reducere de 70% fata de pretul din SUA, model FOB). Accesati pagina Parteneri de pe site sau contactati echipa noastra.",
    faq5_pergunta: "Ce este Acquafy Media si cum genereaza venituri recurente?",
    faq5_resposta: "Acquafy Media este un sistem media integrat in panoul touchscreen al purificatoarelor Neo. Companiile locale pot face publicitate pe display, iar partenerii Gold castiga venituri lunare pentru fiecare reclama afisata. Utilizatorii interactioneaza si prin coduri QR in campanii, generand date de angajament.",
    faq6_pergunta: "Purificatorul Neo functioneaza cu apa de put sau doar cu apa de la robinet?",
    faq6_resposta: "Modelele din linia Essentials sunt concepute pentru apa de la robinet (cu presiunea intre 20 si 80 PSI). Linia Premium cu tehnologie RO (osmoza inversa) poate trata apa cu o variatie mai mare a calitatii. Pentru situatii specifice, cum ar fi apa de put, recomandam contactarea unui specialist tehnic pentru evaluare.",
    faq7_pergunta: "Care este perioada de garantie pentru produsele Acquafy?",
    faq7_resposta: "Purificatoarele Neo sunt livrate cu o garantie de 1 an impotriva defectelor de fabricatie. Inregistrarea garantiei trebuie efectuata prin aplicatia Acquafy sau portalul de asistenta. Defectele cauzate de instalare incorecta, utilizare neadecvata sau intretinere neglijenta nu sunt acoperite de garantie.",
    faq8_pergunta: "In cate tari opereaza Acquafy?",
    faq8_resposta: "Acquafy este prezenta in peste 180 de tari, cu operatiuni 100% globale si asistenta disponibila in 16 limbi. Modelul de afaceri permite partenerilor distribuitori regionali sa opereze local cu sprijinul platformei centrale.",

    // Policies
    pol1_titulo: "Politica de garantie",
    pol1_desc: "Produsele Acquafy sunt insotite de garantia producatorului si acoperire completa.",
    pol1_item1: "12 luni de garantie a producatorului",
    pol1_item2: "Acoperire pentru defecte de fabricatie",
    pol1_item3: "Asistenta tehnica specializata",
    pol2_titulo: "Politica de confidentialitate",
    pol2_desc: "Afla cum colectam, utilizam si protejam datele tale personale.",
    pol2_item1: "Date colectate si scop",
    pol2_item2: "Partajare si securitate",
    pol2_item3: "Drepturile tale ca persoana vizata",
    pol3_titulo: "Termeni de utilizare",
    pol3_desc: "Reguli si conditii pentru utilizarea platformei si produselor Acquafy.",
    pol3_item1: "Conditii de utilizare a platformei",
    pol3_item2: "Responsabilitatile utilizatorului",
    pol3_item3: "Proprietate intelectuala",
    pol4_titulo: "Politica de retur",
    pol4_desc: "Cum sa solicitati schimbul, returul sau rambursarea produselor.",
    pol4_item1: "Fereastra de retur de 7 zile",
    pol4_item2: "Conditii pentru rambursare integrala",
    pol4_item3: "Cum sa deschideti o cerere de retur",
    pol5_titulo: "Certificari si standarde",
    pol5_desc: "Conformitate reglementara si certificari tehnice ale produselor.",
    pol5_item1: "Certificare ANATEL",
    pol5_item2: "INMETRO si standarde tehnice braziliene",
    pol5_item3: "Standarde internationale de calitate",
    doc_em_elaboracao: "Document in curs de elaborare",

    // UI
    ver_base: "Vizualizati baza de cunostinte",
    fechar: "Inchideti",
  },

  he: {
    // META
    downloads_titulo: "Horדot",
    downloads_subtitulo: "Madricim, merichot, tochnot u-mismachim lehoradata.",
    videos_titulo: "Hadrachot ve-videoim",
    videos_subtitulo: "Lilmod tzad achad tzad im hadrachot ha-video shelanu.",
    faq_titulo: "She'elot Nifgashot",
    faq_subtitulo: "Tshuvot meharот la-she'elot hanofahim bigeye al mivcharei Acquafy ve-sherotehem.",
    politicas_titulo: "Mediniot ve-achronot",
    politicas_subtitulo: "Skifut ve-berirut legalei hachayavot shelcha ve-tenai Acquafy.",

    // Downloads categories
    cat_manuais: "Madrichei Mishtamesh",
    cat_guias: "Madrichim Mechukarim",
    cat_softwares: "Tochnot",
    cat_documentos: "Mismachim",

    // Downloads file names
    guia_instalacao_rapida: "Madrich Hitkanut Mehuhar",
    guia_manutencao: "Madrich Achazyaha ve-Niku",
    primeiros_passos_app: "Rishonei Tzaadim -- Yishamat Acquafy",
    guia_parceiro: "Madrich Shutaf Acquafy",
    guia_troca_filtros: "Madrich Hachlafat Misnenim",
    ficha_tecnica: "Gliyon Techni -- Seder Neo",
    certificado_conformidade: "Teudat Atimata",
    contrato_parceria: "Tivnit Chozeh Shutafut",
    politica_garantia_dl: "Mediniat Achriut Acquafy",
    declaracao_anatel: "Hatzharah Atimata ANATEL",

    // Videos section title
    videos_section_titulo: "Videoim ve-Hadrachot",
    coming_soon: "Yavo Karov",

    // Videos
    video1_titulo: "Eich lehitkin et Memake Neo",
    video1_desc: "Madrich hitkanut shalem tzad be-tzad.",
    video1_cat: "Hitkanut",
    video2_titulo: "Rishonei Tzaadim im Yishamat Acquafy",
    video2_desc: "Hadar ve-chabber et ha-hachan la-yishama.",
    video2_cat: "Yishama",
    video3_titulo: "Eich lechalife et ha-misnenet shel Memake Neo",
    video3_desc: "Hachlafat misnenet pshuta ve-mehira.",
    video3_cat: "Achazyaha",
    video4_titulo: "Acquafy Media: pasem al ha-masach",
    video4_desc: "Tzor kampaniot ve-monetize et ha-masach shelcha.",
    video4_cat: "Media",
    video5_titulo: "Shutafut Acquafy: mi-Silver le-Platinum",
    video5_desc: "Eich latzmiach brechet ha-shutafim shel Acquafy.",
    video5_cat: "Shutafut",
    video6_titulo: "Siyur Malel ba-Yishama ve-ha-Tafkidim",
    video6_desc: "Chesof et kol ha-mishavim shel ha-ecosystem.",
    video6_cat: "Yishama",

    // FAQ
    faq1_pergunta: "Ma ha-hevdel bein modelei Neo Essentials ve-Neo Premium?",
    faq1_resposta: "Seder Neo Essentials (Neo UP, FIT, SMART H2, TOUCH, PLUS, ULTRA, MAX ve-variantim) kולel luach LED 10.1\" ve-mitrakez al yahas mechir-eichut im technologiat UV LED + UF. Seder Neo Premium (INFINITY, PRESTIGE ve-PRIME) kolel luach IPS 15.6\", sisud sinum hafuchi (RO) ve-gimur premium. Kol ha-modelim kollelim Wi-Fi 5 ve-Bluetooth 5.3.",
    faq2_pergunta: "Eich lehorid ve-lehagdear et yishamat Acquafy?",
    faq2_resposta: "Yishamat Acquafy zminah ba-App Store (iOS) u-va-Google Play (Android). Latar ha-hitkanut, tzor cheshbon, kariv et ha-smartphone la-memake derech Bluetooth 5.3 le-tzimuд ve-echu al ezra ha-haga'arah shel Wi-Fi. Ha-tahalich lokach pachot mi-5 dakot.",
    faq3_pergunta: "Kama pahot achshav ledaber achshav lehachalif et ha-misnenet shel ha-memake?",
    faq3_resposta: "La-misnenim shel Neo yesh chain chayim shel 365 yamim o lefi tzihlul ha-mayim. Yishamat Acquafy mesegeret et machzor ha-misnenet be-zman amiti u-mishlachat hitchabuyot kaaher ha-hachlafah mitkarebet. Ma'arechet ha-hashlamah ha-chachamah yecholah lehazmin otomatit derech ha-yishama.",
    faq4_pergunta: "Eich lehafoch le-shutaf Acquafy?",
    faq4_resposta: "Kaimim shlosha ramatei shutafut: Silver (shotef/haflaya, amla shel 20%, lelo hashkaah tachilah), Gold (mafaיل Acquafy Media, amla shel 20% mi-mechira + hachnasot ptisum, meatchil bi-2,000 USD) ve-Platinum (mechalek ezori, hanachah shel 70% mi-mechir USA, model FOB). Hiktanes le-daf ha-shutafim ba-aתar o tzor kesher im ha-tzevet shelanu.",
    faq5_pergunta: "Mah hi Acquafy Media ve-eich hi molidat hachnasah chozeret?",
    faq5_resposta: "Acquafy Media hi ma'arechet media meshukevet be-luach ha-gea shel memakei Neo. Asakim mekomiyim yecholim lifarsem al ha-tatsug ve-shutafei Gold mekablim hachnasah chodshit avur kol ptisuma mutzdeg. Mishtamshim gam mitkalelim derech QR Code ba-kampaniot, mah she-molid nitunim shel maaruvut.",
    faq6_pergunta: "Ha-im ha-memake Neo oved im mayim mi-be'er o rak im mayim mi-hav?",
    faq6_resposta: "Modelei seder Essentials miayenim le-mayim mi-hav (im lachatz shel 20 ad 80 PSI). Seder Premium im technologiat RO (sinum hafuchi) yachol letapes mayim im shikhlul eichut gadol yoter. Le-matzavim spetzifiyim ke-mo mayim mi-be'er, anu mematzim liztsor kesher im mutachem techni le-haarachah.",
    faq7_pergunta: "Mah tekufat ha-achriut al mivcharei Acquafy?",
    faq7_resposta: "Memakei Neo maturim im achriut shel shanah achat neged pgemim ba-itzur. Rashum ha-achriut חייב להיעשות derech yishamat Acquafy o portal ha-tmicha. Pgemim ha-negarim mi-hitkanut lo nachonah, shimush lo ho'em o chatzinat tachzukah lo mekulelet einam mekusim ba-achriut.",
    faq8_pergunta: "Be-kama aratzot pa'elet Acquafy?",
    faq8_resposta: "Acquafy nimtzet be-yoter mi-180 aratzot, im pe'ilut globali shel 100% ve-tmicha hametmit be-16 safot. Model ha-asakim maarich le-shutafei mechalek ezori li-paal mekomit bechisayon ha-platform ha-mercazit.",

    // Policies
    pol1_titulo: "Mediniat Achriut",
    pol1_desc: "Mivcharei Acquafy shelcha meturim im achriut yatzran ve-chipui malel.",
    pol1_item1: "12 chodshei achriut yatzran",
    pol1_item2: "Chipui le-pgimei itzur",
    pol1_item3: "Tmicha technit mitmachutit",
    pol2_titulo: "Mediniat Pirtiyut",
    pol2_desc: "Limad eich anu echoflim, meshtatfim ve-mishtamshim be-nitunim ishiyim shelcha.",
    pol2_item1: "Nitunim ha-neklevim ve-mataratan",
    pol2_item2: "Shitatifut u-vitachon",
    pol2_item3: "Zchuyotecha ke-noshei nitunim",
    pol3_titulo: "Tenai Shimush",
    pol3_desc: "Khukot ve-tenayim le-shimush ba-platform u-ba-mivcharim shel Acquafy.",
    pol3_item1: "Tenai shimush ba-platform",
    pol3_item2: "Achrayuyot ha-mishtamesh",
    pol3_item3: "Baꞌalut ruhanit",
    pol4_titulo: "Mediniat Chazarah",
    pol4_desc: "Eich livakesh hachlafah, chazarah o hazarat tashlum avur mivcharim.",
    pol4_item1: "Chalon chazarah shel 7 yamim",
    pol4_item2: "Tenayim le-hazarat tashlum malah",
    pol4_item3: "Eich liftoach bakasha le-chazarah",
    pol5_titulo: "Hasmachot ve-Takhanot",
    pol5_desc: "Atimat takhanot ve-hasmachot techniot shel ha-mivcharim.",
    pol5_item1: "Hasmachah ANATEL",
    pol5_item2: "INMETRO ve-takhanot techniot shel Brazil",
    pol5_item3: "Takhanot eichut beinleumiiot",
    doc_em_elaboracao: "Mismach be-hakanat",

    // UI
    ver_base: "Hatzeg Basisat Yeda",
    fechar: "Sagur",
  },

  "pt-pt": {
    // META
    downloads_titulo: "Downloads",
    downloads_subtitulo: "Manuais, guias, softwares e documentos disponíveis para transferência.",
    videos_titulo: "Tutoriais e Vídeos",
    videos_subtitulo: "Aprenda passo a passo com os nossos tutoriais em vídeo.",
    faq_titulo: "Perguntas Frequentes",
    faq_subtitulo: "Respostas rápidas às dúvidas mais comuns sobre produtos e serviços Acquafy.",
    politicas_titulo: "Políticas e Garantias",
    politicas_subtitulo: "Transparência e clareza sobre os seus direitos e as condições Acquafy.",

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
    guia_troca_filtros: "Guia de Substituição de Filtros",
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
    video2_titulo: "Primeiros passos com a aplicação Acquafy",
    video2_desc: "Configure e ligue o seu dispositivo à aplicação.",
    video2_cat: "App",
    video3_titulo: "Como trocar o filtro do purificador Neo",
    video3_desc: "Substituição simples e rápida do filtro.",
    video3_cat: "Manutenção",
    video4_titulo: "Acquafy Media: anuncie no ecrã",
    video4_desc: "Crie campanhas e monetize o seu ecrã.",
    video4_cat: "Media",
    video5_titulo: "Parceria Acquafy: do Silver ao Platinum",
    video5_desc: "Como crescer na rede de parceiros Acquafy.",
    video5_cat: "Parceria",
    video6_titulo: "Tour completo pela aplicação e funcionalidades",
    video6_desc: "Explore todos os recursos do ecossistema.",
    video6_cat: "App",

    // FAQ
    faq1_pergunta: "Qual é a diferença entre os modelos Neo Essentials e Neo Premium?",
    faq1_resposta: "A linha Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e variantes) possui painel LED 10.1\" e é focada em custo-benefício com tecnologia UV LED + UF. A linha Neo Premium (INFINITY, PRESTIGE e PRIME) conta com painel IPS 15.6\", filtração por Osmose Inversa (RO) e acabamento de alto padrão. Todos os modelos possuem conectividade Wi-Fi 5 e Bluetooth 5.3.",
    faq2_pergunta: "Como posso transferir e configurar a aplicação Acquafy?",
    faq2_resposta: "A aplicação Acquafy está disponível na App Store (iOS) e Google Play (Android). Após instalar, crie a sua conta, aproxime o telemóvel do purificador via Bluetooth 5.3 para emparelhar e siga o assistente de configuração de Wi-Fi. O processo demora menos de 5 minutos.",
    faq3_pergunta: "Com que frequência devo substituir o filtro do purificador?",
    faq3_resposta: "Os filtros Neo têm uma vida útil de 365 dias ou conforme o consumo de água. A aplicação Acquafy monitoriza em tempo real o ciclo do filtro e envia alertas quando a substituição se aproxima. O sistema de Reposição Inteligente pode fazer o pedido automaticamente pela aplicação.",
    faq4_pergunta: "Como me torno num parceiro Acquafy?",
    faq4_resposta: "Existem três níveis de parceria: Silver (afiliado/indicador, comissão de 20%, sem investimento inicial), Gold (operador Acquafy Media, comissão de 20% em vendas + receita de anúncios, entrada a partir de US$2.000) e Platinum (distribuidor regional, desconto de 70% no preço USA, modelo FOB). Aceda à página de Parceiros no site ou entre em contacto com a nossa equipa.",
    faq5_pergunta: "O que é a Acquafy Media e como gera receita recorrente?",
    faq5_resposta: "A Acquafy Media é um sistema de média integrado ao painel touchscreen dos purificadores Neo. Negócios locais podem anunciar no ecrã e os parceiros Gold recebem receita mensal por cada anúncio exibido. Os utilizadores também interagem via QR Code nas campanhas, gerando dados de envolvimento.",
    faq6_pergunta: "O purificador Neo funciona com água de poço ou apenas água de rede?",
    faq6_resposta: "Os modelos da linha Essentials são indicados para água de rede (com pressão de 20 a 80 PSI). A linha Premium com tecnologia RO (Osmose Inversa) pode tratar água com maior variação de qualidade. Para situações específicas como água de poço, recomendamos o contacto com um especialista técnico para avaliação.",
    faq7_pergunta: "Qual o prazo de garantia dos produtos Acquafy?",
    faq7_resposta: "Os purificadores Neo possuem garantia de 1 ano contra defeitos de fabrico. O registo de garantia deve ser feito pela aplicação Acquafy ou pelo portal de suporte. Defeitos causados por instalação incorreta, uso inadequado ou manutenção negligenciada não são cobertos pela garantia.",
    faq8_pergunta: "Em quantos países a Acquafy opera?",
    faq8_resposta: "A Acquafy está presente em mais de 180 países, com operação 100% global e suporte disponível em 16 idiomas. O modelo de negócio permite que parceiros distribuidores regionais operem localmente com suporte da plataforma central.",

    // Policies
    pol1_titulo: "Política de Garantia",
    pol1_desc: "Os seus produtos Acquafy possuem garantia de fábrica e cobertura completa.",
    pol1_item1: "12 meses de garantia de fábrica",
    pol1_item2: "Cobertura para defeitos de fabrico",
    pol1_item3: "Suporte técnico especializado",
    pol2_titulo: "Política de Privacidade",
    pol2_desc: "Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais.",
    pol2_item1: "Dados recolhidos e finalidade",
    pol2_item2: "Partilha e segurança",
    pol2_item3: "Os seus direitos como titular de dados",
    pol3_titulo: "Termos de Utilização",
    pol3_desc: "Regras e condições para utilização da plataforma e dos produtos Acquafy.",
    pol3_item1: "Condições de utilização da plataforma",
    pol3_item2: "Responsabilidades do utilizador",
    pol3_item3: "Propriedade intelectual",
    pol4_titulo: "Política de Devolução",
    pol4_desc: "Como solicitar troca, devolução ou reembolso de produtos.",
    pol4_item1: "Prazo de 7 dias para devolução",
    pol4_item2: "Condições para reembolso integral",
    pol4_item3: "Como abrir um pedido de devolução",
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

      </div>
    </div>
  );
}
