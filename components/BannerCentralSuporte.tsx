"use client";

import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { useChatWidget } from "./ChatWidget";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgBg        = "/figma-assets/bg-d.webp";
const imgMainImage = "/figma-assets/main-image.webp";

const imgIconChat    = "/figma-assets/icon-chat-list.svg";
const imgIconCheckin = "/figma-assets/icon-check-list.svg";
const imgIconBook    = "/figma-assets/icon-book.svg";
const imgIconFone    = "/figma-assets/icon-fone-list.svg";

const imgArrowWhite  = "/figma-assets/icon-arrow-white-solid.svg";
const imgArrowBlue   = "/figma-assets/icon-arrow-blue-c.svg";
const imgArrowAccent = "/figma-assets/icon-arrow-accent.svg";

// ── Translations ──────────────────────────────────────────────────────────────
const T: Record<Lang, {
  label: string;
  h1Line1: string;
  h1Brand: string;
  subtitle: string;
  description: string;
  btnChat: string;
  btnSpecialist: string;
  floatingCards: { title: string; desc: string | null }[];
  unifiedHeading1: string;
  unifiedHeading2: string;
  quickLinks: { title: string; desc: string }[];
  faqItems: { question: string; answer: string; cta: string }[];
  imgAlt: string;
}> = {
  pt: {
    label: "ECOSSISTEMA DIGITAL ACQUAFY",
    h1Line1: "Central de",
    h1Brand: "Suporte Acquafy",
    subtitle: "Estamos aqui para ajudar.",
    description:
      "Nossa equipe e recursos estão prontos para oferecer a melhor experiência com os produtos e soluções Acquafy. Encontre respostas, tutoriais e suporte especializado sempre que precisar.",
    btnChat: "Abrir chat",
    btnSpecialist: "Fale com um especialista",
    floatingCards: [
      { title: "Como podemos ajudar você?",   desc: null },
      { title: "Status do Sistema",           desc: "Verifique a operação dos serviços" },
      { title: "Base de conhecimento",        desc: "Tutoriais e artigos úteis." },
      { title: "Abrir chamado",               desc: "Receba suporte da nossa equipe." },
    ],
    unifiedHeading1: "Como",
    unifiedHeading2: "podemos ajudar?",
    quickLinks: [
      { title: "Meus produtos",         desc: "Conheça a linha completa de purificadores Neo." },
      { title: "App + AI + IoT",        desc: "Controle, automação e IA na palma da mão." },
      { title: "Fale conosco",          desc: "Nossa equipe está pronta para ajudar você." },
      { title: "Políticas e garantias", desc: "Consulte nossas políticas, termos e garantias." },
    ],
    faqItems: [
      {
        question: "Produtos",
        answer: "A Linha Neo inclui purificadores com Painel LED Touch, App, UV LED e filtros UF premium nos modelos SMART H2, TOUCH e outros. Consulte especificações, compatibilidade de filtros e compare os modelos disponíveis.",
        cta: "Ver Linha Neo",
      },
      {
        question: "App + AI + IoT",
        answer: "O App Acquafy (iOS e Android) conecta seu purificador via Wi-Fi para monitoramento em tempo real, alertas de troca de filtro e controle remoto com IA integrada. Acesse a página do App para ver todas as funcionalidades.",
        cta: "Conhecer o App",
      },
      {
        question: "Media Network",
        answer: "O Acquafy Media é a plataforma multimídia integrada ao purificador que exibe conteúdos, anúncios e QR Codes na tela do equipamento, gerando receita recorrente para parceiros e distribuidores.",
        cta: "Saiba mais",
      },
      {
        question: "Parceiros",
        answer: "O Programa Acquafy Partner oferece suporte comercial, treinamento, materiais de marketing e comissões recorrentes. Para se tornar parceiro, preencha o formulário na página de parcerias.",
        cta: "Seja um Parceiro",
      },
      {
        question: "Faturamento",
        answer: "Faturas, relatórios de comissão e histórico de pedidos são gerenciados no portal do parceiro. Para dúvidas sobre pagamentos, NFs ou comissões, entre em contato com nossa equipe de suporte.",
        cta: "Contate o suporte",
      },
      {
        question: "Instalação e Manutenção",
        answer: "A instalação é feita por técnicos credenciados Acquafy. A manutenção preventiva — troca de filtros e verificação do UV LED — é monitorada automaticamente pelo App. Para agendar atendimento, fale com nossa equipe.",
        cta: "Falar com suporte",
      },
    ],
    imgAlt: "Central de Suporte Acquafy",
  },
  "pt-pt": {
    label: "ECOSSISTEMA DIGITAL ACQUAFY",
    h1Line1: "Central de",
    h1Brand: "Suporte Acquafy",
    subtitle: "Estamos aqui para ajudar.",
    description:
      "A nossa equipa e recursos estão prontos para oferecer a melhor experiência com os produtos e soluções Acquafy. Encontre respostas, tutoriais e suporte especializado sempre que precisar.",
    btnChat: "Abrir chat",
    btnSpecialist: "Fale com um especialista",
    floatingCards: [
      { title: "Como podemos ajudá-lo?",      desc: null },
      { title: "Estado do Sistema",           desc: "Verifique a operação dos serviços" },
      { title: "Base de conhecimento",        desc: "Tutoriais e artigos úteis." },
      { title: "Abrir chamado",               desc: "Receba suporte da nossa equipa." },
    ],
    unifiedHeading1: "Como",
    unifiedHeading2: "podemos ajudar?",
    quickLinks: [
      { title: "Os meus produtos",      desc: "Conheça a linha completa de purificadores Neo." },
      { title: "App + AI + IoT",        desc: "Controlo, automatização e IA na palma da mão." },
      { title: "Fale connosco",         desc: "A nossa equipa está pronta para ajudar." },
      { title: "Políticas e garantias", desc: "Consulte as nossas políticas, termos e garantias." },
    ],
    faqItems: [
      {
        question: "Produtos",
        answer: "A Linha Neo inclui purificadores com Painel LED Touch, Aplicação, UV LED e filtros UF premium nos modelos SMART H2, TOUCH e outros. Consulte especificações, compatibilidade de filtros e compare os modelos disponíveis.",
        cta: "Ver Linha Neo",
      },
      {
        question: "App + AI + IoT",
        answer: "A Aplicação Acquafy (iOS e Android) conecta o seu purificador via Wi-Fi para monitorização em tempo real, alertas de troca de filtro e controlo remoto com IA integrada.",
        cta: "Conhecer a Aplicação",
      },
      {
        question: "Media Network",
        answer: "O Acquafy Media é a plataforma multimédia integrada ao purificador que exibe conteúdos, anúncios e QR Codes no ecrã do equipamento, gerando receita recorrente para parceiros e distribuidores.",
        cta: "Saber mais",
      },
      {
        question: "Parceiros",
        answer: "O Programa Acquafy Partner oferece suporte comercial, formação, materiais de marketing e comissões recorrentes. Para se tornar parceiro, preencha o formulário na página de parcerias.",
        cta: "Seja um Parceiro",
      },
      {
        question: "Faturação",
        answer: "Faturas, relatórios de comissão e histórico de encomendas são geridos no portal do parceiro. Para dúvidas sobre pagamentos ou comissões, entre em contacto com a nossa equipa de suporte.",
        cta: "Contactar suporte",
      },
      {
        question: "Instalação e Manutenção",
        answer: "A instalação é realizada por técnicos credenciados Acquafy. A manutenção preventiva — troca de filtros e verificação do UV LED — é monitorizada automaticamente pela Aplicação.",
        cta: "Falar com suporte",
      },
    ],
    imgAlt: "Central de Suporte Acquafy",
  },
  en: {
    label: "ACQUAFY DIGITAL ECOSYSTEM",
    h1Line1: "Acquafy",
    h1Brand: "Support Center",
    subtitle: "We are here to help.",
    description:
      "Our team and resources are ready to provide the best experience with Acquafy products and solutions. Find answers, tutorials, and specialized support whenever you need.",
    btnChat: "Open chat",
    btnSpecialist: "Talk to a specialist",
    floatingCards: [
      { title: "How can we help you?",   desc: null },
      { title: "System Status",          desc: "Check the operation of services" },
      { title: "Knowledge Base",         desc: "Tutorials and helpful articles." },
      { title: "Open a ticket",          desc: "Receive support from our team." },
    ],
    unifiedHeading1: "How Can",
    unifiedHeading2: "We Help You?",
    quickLinks: [
      { title: "My products",           desc: "Explore the complete Neo purifier lineup." },
      { title: "App + AI + IoT",        desc: "Control, automation and AI in the palm of your hand." },
      { title: "Contact us",            desc: "Our team is ready to help you." },
      { title: "Policies & warranties", desc: "Review our policies, terms and warranties." },
    ],
    faqItems: [
      {
        question: "Products",
        answer: "The Neo Line includes purifiers with LED Touch Panel, App, UV LED and premium UF filters in SMART H2, TOUCH and other models. Check specifications, filter compatibility and compare available models.",
        cta: "See Neo Line",
      },
      {
        question: "App + AI + IoT",
        answer: "The Acquafy App (iOS & Android) connects your purifier via Wi-Fi for real-time monitoring, filter replacement alerts and remote control with integrated AI. Visit the App page to see all features.",
        cta: "Explore the App",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media is the multimedia platform integrated into the purifier, displaying content, ads and QR Codes on the device screen, generating recurring revenue for Acquafy partners and distributors.",
        cta: "Learn more",
      },
      {
        question: "Partners",
        answer: "The Acquafy Partner Program offers commercial support, training, marketing materials and recurring commissions. To become a partner, fill out the form on the partnerships page.",
        cta: "Become a Partner",
      },
      {
        question: "Billing",
        answer: "Invoices, commission reports and order history are managed in the partner portal. For questions about payments, invoices or commissions, contact our support team.",
        cta: "Contact support",
      },
      {
        question: "Installation & Maintenance",
        answer: "Installation is performed by Acquafy-certified technicians. Preventive maintenance — filter replacement and UV LED checks — is automatically monitored by the App. To schedule service, contact our team.",
        cta: "Talk to support",
      },
    ],
    imgAlt: "Acquafy Support Center",
  },
  "en-gb": {
    label: "ACQUAFY DIGITAL ECOSYSTEM",
    h1Line1: "Acquafy",
    h1Brand: "Support Centre",
    subtitle: "We are here to help.",
    description:
      "Our team and resources are ready to provide the best experience with Acquafy products and solutions. Find answers, tutorials, and specialised support whenever you need.",
    btnChat: "Open chat",
    btnSpecialist: "Talk to a specialist",
    floatingCards: [
      { title: "How can we help you?",   desc: null },
      { title: "System Status",          desc: "Check the operation of services" },
      { title: "Knowledge Base",         desc: "Tutorials and helpful articles." },
      { title: "Open a ticket",          desc: "Receive support from our team." },
    ],
    unifiedHeading1: "How Can",
    unifiedHeading2: "We Help You?",
    quickLinks: [
      { title: "My products",           desc: "Explore the complete Neo purifier lineup." },
      { title: "App + AI + IoT",        desc: "Control, automation and AI in the palm of your hand." },
      { title: "Contact us",            desc: "Our team is ready to help you." },
      { title: "Policies & warranties", desc: "Review our policies, terms and warranties." },
    ],
    faqItems: [
      {
        question: "Products",
        answer: "The Neo Line includes purifiers with LED Touch Panel, App, UV LED and premium UF filters in SMART H2, TOUCH and other models. Check specifications, filter compatibility and compare available models.",
        cta: "See Neo Line",
      },
      {
        question: "App + AI + IoT",
        answer: "The Acquafy App (iOS & Android) connects your purifier via Wi-Fi for real-time monitoring, filter replacement alerts and remote control with integrated AI. Visit the App page to see all features.",
        cta: "Explore the App",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media is the multimedia platform integrated into the purifier, displaying content, ads and QR Codes on the device screen, generating recurring revenue for Acquafy partners and distributors.",
        cta: "Learn more",
      },
      {
        question: "Partners",
        answer: "The Acquafy Partner Programme offers commercial support, training, marketing materials and recurring commissions. To become a partner, fill in the form on the partnerships page.",
        cta: "Become a Partner",
      },
      {
        question: "Billing",
        answer: "Invoices, commission reports and order history are managed in the partner portal. For questions about payments, invoices or commissions, contact our support team.",
        cta: "Contact support",
      },
      {
        question: "Installation & Maintenance",
        answer: "Installation is performed by Acquafy-certified technicians. Preventive maintenance — filter replacement and UV LED checks — is automatically monitored by the App. To arrange service, contact our team.",
        cta: "Talk to support",
      },
    ],
    imgAlt: "Acquafy Support Centre",
  },
  es: {
    label: "ECOSISTEMA DIGITAL ACQUAFY",
    h1Line1: "Centro de",
    h1Brand: "Soporte Acquafy",
    subtitle: "Estamos aqui para ayudarte.",
    description:
      "Nuestro equipo y recursos están listos para ofrecer la mejor experiencia con los productos y soluciones Acquafy. Encuentra respuestas, tutoriales y soporte especializado siempre que lo necesites.",
    btnChat: "Abrir chat",
    btnSpecialist: "Habla con un especialista",
    floatingCards: [
      { title: "Como podemos ayudarte?",  desc: null },
      { title: "Estado del Sistema",        desc: "Verifica la operación de los servicios" },
      { title: "Base de conocimiento",      desc: "Tutoriales y artículos útiles." },
      { title: "Abrir ticket",              desc: "Recibe soporte de nuestro equipo." },
    ],
    unifiedHeading1: "Como Podemos",
    unifiedHeading2: "Ayudarte?",
    quickLinks: [
      { title: "Mis productos",          desc: "Conoce la línea completa de purificadores Neo." },
      { title: "App + AI + IoT",         desc: "Control, automatización e IA en la palma de tu mano." },
      { title: "Contáctanos",            desc: "Nuestro equipo está listo para ayudarte." },
      { title: "Políticas y garantías",  desc: "Consulta nuestras políticas, términos y garantías." },
    ],
    faqItems: [
      {
        question: "Productos",
        answer: "La Línea Neo incluye purificadores con Panel LED Touch, App, UV LED y filtros UF premium en los modelos SMART H2, TOUCH y otros. Consulta especificaciones, compatibilidad de filtros y compara modelos.",
        cta: "Ver Línea Neo",
      },
      {
        question: "App + AI + IoT",
        answer: "La App Acquafy (iOS y Android) conecta tu purificador vía Wi-Fi para monitoreo en tiempo real, alertas de cambio de filtro y control remoto con IA integrada.",
        cta: "Conocer la App",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media es la plataforma multimedia integrada al purificador que muestra contenidos, anuncios y QR Codes en la pantalla, generando ingresos recurrentes para socios y distribuidores.",
        cta: "Saber más",
      },
      {
        question: "Socios",
        answer: "El Programa Acquafy Partner ofrece soporte comercial, formación, materiales de marketing y comisiones recurrentes. Para convertirte en socio, rellena el formulario en la página de asociaciones.",
        cta: "Ser un Socio",
      },
      {
        question: "Facturación",
        answer: "Facturas, informes de comisiones e historial de pedidos se gestionan en el portal del socio. Para dudas sobre pagos o comisiones, contacta a nuestro equipo de soporte.",
        cta: "Contactar soporte",
      },
      {
        question: "Instalación y Mantenimiento",
        answer: "La instalación la realizan técnicos certificados Acquafy. El mantenimiento preventivo — cambio de filtros y verificación UV LED — se monitoriza automáticamente por la App.",
        cta: "Hablar con soporte",
      },
    ],
    imgAlt: "Centro de Soporte Acquafy",
  },
  fr: {
    label: "ECOSYSTEME DIGITAL ACQUAFY",
    h1Line1: "Centre de",
    h1Brand: "Support Acquafy",
    subtitle: "Nous sommes là pour vous aider.",
    description:
      "Notre équipe et nos ressources sont prêtes à offrir la meilleure expérience avec les produits et solutions Acquafy. Trouvez des réponses, des tutoriels et un support spécialisé quand vous en avez besoin.",
    btnChat: "Ouvrir le chat",
    btnSpecialist: "Parler à un spécialiste",
    floatingCards: [
      { title: "Comment pouvons-nous vous aider ?", desc: null },
      { title: "Statut du Système",                 desc: "Vérifiez le fonctionnement des services" },
      { title: "Base de connaissances",              desc: "Tutoriels et articles utiles." },
      { title: "Ouvrir un ticket",                   desc: "Recevez le soutien de notre équipe." },
    ],
    unifiedHeading1: "Comment Pouvons-Nous",
    unifiedHeading2: "Vous Aider ?",
    quickLinks: [
      { title: "Mes produits",            desc: "Découvrez la gamme complète de purificateurs Neo." },
      { title: "App + AI + IoT",          desc: "Contrôle, automatisation et IA au bout des doigts." },
      { title: "Nous contacter",          desc: "Notre équipe est prête à vous aider." },
      { title: "Politiques et garanties", desc: "Consultez nos politiques, conditions et garanties." },
    ],
    faqItems: [
      {
        question: "Produits",
        answer: "La Gamme Neo inclut des purificateurs avec panneau LED tactile, App, UV LED et filtres UF premium dans les modèles SMART H2, TOUCH et autres. Consultez les spécifications et comparez les modèles.",
        cta: "Voir la Gamme Neo",
      },
      {
        question: "App + AI + IoT",
        answer: "L'App Acquafy (iOS et Android) connecte votre purificateur via Wi-Fi pour un monitoring en temps réel, des alertes de remplacement de filtre et un contrôle à distance avec IA intégrée.",
        cta: "Découvrir l'App",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media est la plateforme multimédia intégrée au purificateur qui affiche du contenu, des annonces et des QR Codes sur l'écran, générant des revenus récurrents pour les partenaires.",
        cta: "En savoir plus",
      },
      {
        question: "Partenaires",
        answer: "Le Programme Acquafy Partner offre un soutien commercial, une formation, des matériaux marketing et des commissions récurrentes. Pour devenir partenaire, remplissez le formulaire sur la page partenariats.",
        cta: "Devenir Partenaire",
      },
      {
        question: "Facturation",
        answer: "Les factures, rapports de commissions et historiques de commandes sont gérés dans le portail partenaire. Pour toute question sur les paiements ou commissions, contactez notre équipe de support.",
        cta: "Contacter le support",
      },
      {
        question: "Installation et Maintenance",
        answer: "L'installation est réalisée par des techniciens certifiés Acquafy. La maintenance préventive — remplacement de filtres et vérification UV LED — est automatiquement surveillée par l'App.",
        cta: "Parler au support",
      },
    ],
    imgAlt: "Centre de Support Acquafy",
  },
  de: {
    label: "ACQUAFY DIGITAL-OKOSYSTEM",
    h1Line1: "Acquafy",
    h1Brand: "Support-Center",
    subtitle: "Wir sind hier, um Ihnen zu helfen.",
    description:
      "Unser Team und unsere Ressourcen sind bereit, das beste Erlebnis mit Acquafy-Produkten und -Lösungen zu bieten. Finden Sie Antworten, Tutorials und spezialisierten Support, wann immer Sie ihn benötigen.",
    btnChat: "Chat öffnen",
    btnSpecialist: "Mit einem Spezialisten sprechen",
    floatingCards: [
      { title: "Wie können wir Ihnen helfen?", desc: null },
      { title: "Systemstatus",                 desc: "Überprüfen Sie den Betrieb der Dienste" },
      { title: "Wissensdatenbank",              desc: "Tutorials und hilfreiche Artikel." },
      { title: "Ticket erstellen",              desc: "Erhalten Sie Support von unserem Team." },
    ],
    unifiedHeading1: "Wie Können Wir",
    unifiedHeading2: "Ihnen Helfen?",
    quickLinks: [
      { title: "Meine Produkte",          desc: "Entdecken Sie die vollständige Neo-Purifier-Reihe." },
      { title: "App + AI + IoT",          desc: "Steuerung, Automatisierung und KI in Ihrer Hand." },
      { title: "Kontakt aufnehmen",       desc: "Unser Team ist bereit, Ihnen zu helfen." },
      { title: "Richtlinien & Garantien", desc: "Prüfen Sie unsere Richtlinien, Bedingungen und Garantien." },
    ],
    faqItems: [
      {
        question: "Produkte",
        answer: "Die Neo-Linie umfasst Purifier mit LED-Touch-Panel, App, UV-LED und Premium-UF-Filtern in den Modellen SMART H2, TOUCH und weiteren. Vergleichen Sie Spezifikationen und Filterkompatibilität.",
        cta: "Neo-Linie ansehen",
      },
      {
        question: "App + AI + IoT",
        answer: "Die Acquafy-App (iOS und Android) verbindet Ihren Purifier über Wi-Fi für Echtzeit-Monitoring, Filterwechsel-Erinnerungen und Fernsteuerung mit integrierter KI.",
        cta: "App entdecken",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media ist die ins Gerät integrierte Multimedia-Plattform, die Inhalte, Anzeigen und QR-Codes auf dem Display anzeigt und so für Partner und Händler wiederkehrende Einnahmen generiert.",
        cta: "Mehr erfahren",
      },
      {
        question: "Partner",
        answer: "Das Acquafy-Partnerprogramm bietet kommerziellen Support, Schulungen, Marketingmaterialien und wiederkehrende Provisionen. Füllen Sie das Formular auf der Partnerseite aus, um Partner zu werden.",
        cta: "Partner werden",
      },
      {
        question: "Abrechnung",
        answer: "Rechnungen, Provisionsberichte und Bestellhistorie werden im Partnerportal verwaltet. Bei Fragen zu Zahlungen oder Provisionen wenden Sie sich bitte an unser Support-Team.",
        cta: "Support kontaktieren",
      },
      {
        question: "Installation und Wartung",
        answer: "Die Installation erfolgt durch zertifizierte Acquafy-Techniker. Die vorbeugende Wartung — Filterwechsel und UV-LED-Überprüfung — wird automatisch von der App überwacht.",
        cta: "Support sprechen",
      },
    ],
    imgAlt: "Acquafy Support-Center",
  },
  it: {
    label: "ECOSISTEMA DIGITALE ACQUAFY",
    h1Line1: "Centro",
    h1Brand: "Supporto Acquafy",
    subtitle: "Siamo qui per aiutarti.",
    description:
      "Il nostro team e le nostre risorse sono pronti a offrire la migliore esperienza con i prodotti e le soluzioni Acquafy. Trova risposte, tutorial e supporto specializzato ogni volta che ne hai bisogno.",
    btnChat: "Apri la chat",
    btnSpecialist: "Parla con uno specialista",
    floatingCards: [
      { title: "Come possiamo aiutarti?", desc: null },
      { title: "Stato del Sistema",       desc: "Verifica il funzionamento dei servizi" },
      { title: "Base di conoscenza",      desc: "Tutorial e articoli utili." },
      { title: "Apri un ticket",          desc: "Ricevi supporto dal nostro team." },
    ],
    unifiedHeading1: "Come Possiamo",
    unifiedHeading2: "Aiutarti?",
    quickLinks: [
      { title: "I miei prodotti",      desc: "Scopri la linea completa di purificatori Neo." },
      { title: "App + AI + IoT",       desc: "Controllo, automazione e IA nel palmo della mano." },
      { title: "Contattaci",           desc: "Il nostro team è pronto ad aiutarti." },
      { title: "Politiche e garanzie", desc: "Consulta le nostre politiche, termini e garanzie." },
    ],
    faqItems: [
      {
        question: "Prodotti",
        answer: "La Linea Neo include purificatori con pannello LED Touch, App, UV LED e filtri UF premium nei modelli SMART H2, TOUCH e altri. Consulta le specifiche e confronta i modelli disponibili.",
        cta: "Vedi la Linea Neo",
      },
      {
        question: "App + AI + IoT",
        answer: "L'App Acquafy (iOS e Android) collega il tuo purificatore via Wi-Fi per il monitoraggio in tempo reale, avvisi di sostituzione filtro e controllo remoto con IA integrata.",
        cta: "Scopri l'App",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media è la piattaforma multimediale integrata nel purificatore che visualizza contenuti, annunci e QR Code sullo schermo, generando entrate ricorrenti per partner e distributori.",
        cta: "Scopri di più",
      },
      {
        question: "Partner",
        answer: "Il Programma Acquafy Partner offre supporto commerciale, formazione, materiali di marketing e commissioni ricorrenti. Per diventare partner, compila il modulo nella pagina delle partnership.",
        cta: "Diventa Partner",
      },
      {
        question: "Fatturazione",
        answer: "Fatture, report sulle commissioni e cronologia degli ordini sono gestiti nel portale partner. Per domande su pagamenti o commissioni, contatta il nostro team di supporto.",
        cta: "Contatta il supporto",
      },
      {
        question: "Installazione e Manutenzione",
        answer: "L'installazione è eseguita da tecnici certificati Acquafy. La manutenzione preventiva — sostituzione filtri e verifica UV LED — è monitorata automaticamente dall'App.",
        cta: "Parla con il supporto",
      },
    ],
    imgAlt: "Centro Supporto Acquafy",
  },
  zh: {
    label: "ACQUAFY 数字生态系统",
    h1Line1: "Acquafy",
    h1Brand: "支持中心",
    subtitle: "我们随时为您提供帮助。",
    description:
      "我们的团队和资源随时准备为您提供最佳的 Acquafy 产品和解决方案体验。无论何时需要，均可获取解答、教程和专业支持。",
    btnChat: "打开聊天",
    btnSpecialist: "联系专家",
    floatingCards: [
      { title: "我们能为您做什么？", desc: null },
      { title: "系统状态",           desc: "查看服务运行情况" },
      { title: "知识库",             desc: "教程与实用文章。" },
      { title: "提交工单",           desc: "获取我们团队的支持。" },
    ],
    unifiedHeading1: "我们如何",
    unifiedHeading2: "为您提供帮助？",
    quickLinks: [
      { title: "我的产品",   desc: "探索完整的 Neo 净水器产品系列。" },
      { title: "App + AI + IoT", desc: "掌控自动化与人工智能，尽在掌中。" },
      { title: "联系我们",   desc: "我们的团队随时准备为您提供帮助。" },
      { title: "政策与保修", desc: "查阅我们的政策、条款和保修信息。" },
    ],
    faqItems: [
      {
        question: "产品",
        answer: "Neo 系列包括配备 LED 触控面板、App、UV LED 和高级 UF 滤芯的净水器，提供 SMART H2、TOUCH 等多种型号。查看规格、滤芯兼容性并比较可用型号。",
        cta: "查看 Neo 系列",
      },
      {
        question: "App + AI + IoT",
        answer: "Acquafy App（iOS 和 Android）通过 Wi-Fi 连接您的净水器，实现实时监控、滤芯更换提醒和集成 AI 的远程控制。",
        cta: "了解 App",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media 是集成于净水器的多媒体平台，可在设备屏幕上显示内容、广告和二维码，为合作伙伴和经销商带来持续收入。",
        cta: "了解更多",
      },
      {
        question: "合作伙伴",
        answer: "Acquafy 合作伙伴计划提供商业支持、培训、营销材料和持续佣金。如需成为合作伙伴，请在合作页面填写申请表。",
        cta: "成为合作伙伴",
      },
      {
        question: "账单",
        answer: "发票、佣金报告和订单历史记录均在合作伙伴门户中管理。如有付款或佣金方面的疑问，请联系我们的支持团队。",
        cta: "联系支持",
      },
      {
        question: "安装与维护",
        answer: "安装由 Acquafy 认证技术人员进行。预防性维护（滤芯更换和 UV LED 检查）由 App 自动监控。如需安排服务，请联系我们的团队。",
        cta: "联系支持",
      },
    ],
    imgAlt: "Acquafy 支持中心",
  },
  ja: {
    label: "ACQUAFY デジタルエコシステム",
    h1Line1: "Acquafy",
    h1Brand: "サポートセンター",
    subtitle: "いつでもお手伝いします。",
    description:
      "私たちのチームとリソースは、Acquafy の製品とソリューションで最高のエクスペリエンスを提供する準備が整っています。必要なときにいつでも回答、チュートリアル、専門サポートをご利用いただけます。",
    btnChat: "チャットを開く",
    btnSpecialist: "専門家に相談する",
    floatingCards: [
      { title: "何かお手伝いできますか？", desc: null },
      { title: "システムステータス",       desc: "サービスの稼働状況を確認する" },
      { title: "ナレッジベース",           desc: "チュートリアルと役立つ記事。" },
      { title: "チケットを作成",           desc: "チームからサポートを受ける。" },
    ],
    unifiedHeading1: "どのように",
    unifiedHeading2: "お役に立てますか？",
    quickLinks: [
      { title: "マイ製品",        desc: "Neo ピュリファイアーの完全なラインナップをご覧ください。" },
      { title: "App + AI + IoT", desc: "制御、自動化、AIを手のひらで。" },
      { title: "お問い合わせ",    desc: "私たちのチームがいつでもお手伝いします。" },
      { title: "ポリシーと保証",  desc: "ポリシー、利用規約、保証を確認する。" },
    ],
    faqItems: [
      {
        question: "製品",
        answer: "Neo ラインには、LED タッチパネル、App、UV LED、プレミアム UF フィルター搭載の浄水器が SMART H2、TOUCH などのモデルで揃っています。仕様とフィルター互換性を確認し、モデルを比較してください。",
        cta: "Neo ラインを見る",
      },
      {
        question: "App + AI + IoT",
        answer: "Acquafy App（iOS・Android）は Wi-Fi 経由で浄水器に接続し、リアルタイム監視、フィルター交換アラート、AI 搭載のリモート操作を提供します。",
        cta: "App を見る",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media は浄水器に統合されたマルチメディアプラットフォームで、画面にコンテンツ、広告、QR コードを表示し、パートナーと販売代理店に継続収益をもたらします。",
        cta: "詳しく見る",
      },
      {
        question: "パートナー",
        answer: "Acquafy パートナープログラムは、商業的サポート、トレーニング、マーケティング資料、継続的なコミッションを提供します。パートナーになるには、パートナーシップページのフォームにご記入ください。",
        cta: "パートナーになる",
      },
      {
        question: "請求",
        answer: "請求書、コミッションレポート、注文履歴はパートナーポータルで管理されています。支払いやコミッションに関するご質問は、サポートチームにお問い合わせください。",
        cta: "サポートに連絡",
      },
      {
        question: "設置とメンテナンス",
        answer: "設置は Acquafy 認定技術者が行います。予防保守（フィルター交換と UV LED 確認）は App が自動的に監視します。サービスのご予約はチームにご連絡ください。",
        cta: "サポートに相談",
      },
    ],
    imgAlt: "Acquafy サポートセンター",
  },
  ko: {
    label: "ACQUAFY 디지털 에코시스템",
    h1Line1: "Acquafy",
    h1Brand: "고객 지원 센터",
    subtitle: "언제든지 도움이 필요하시면 연락주세요.",
    description:
      "저희 팀과 리소스는 Acquafy 제품 및 솔루션으로 최고의 경험을 제공할 준비가 되어 있습니다. 필요할 때마다 답변, 튜토리얼, 전문 지원을 이용하세요.",
    btnChat: "채팅 열기",
    btnSpecialist: "전문가와 상담",
    floatingCards: [
      { title: "어떻게 도와드릴까요?", desc: null },
      { title: "시스템 상태",          desc: "서비스 운영 현황 확인" },
      { title: "지식 베이스",          desc: "튜토리얼과 유용한 문서." },
      { title: "티켓 열기",            desc: "저희 팀의 지원을 받으세요." },
    ],
    unifiedHeading1: "어떻게",
    unifiedHeading2: "도와드릴까요?",
    quickLinks: [
      { title: "내 제품",          desc: "Neo 정수기 전체 라인업을 살펴보세요." },
      { title: "App + AI + IoT",  desc: "제어, 자동화, AI를 손안에서." },
      { title: "문의하기",          desc: "저희 팀이 언제든지 도움을 드립니다." },
      { title: "정책 및 보증",      desc: "정책, 약관 및 보증 정보를 확인하세요." },
    ],
    faqItems: [
      {
        question: "제품",
        answer: "Neo 라인에는 LED 터치 패널, App, UV LED, 프리미엄 UF 필터가 장착된 SMART H2, TOUCH 등 다양한 모델의 정수기가 있습니다. 사양과 필터 호환성을 확인하고 모델을 비교하세요.",
        cta: "Neo 라인 보기",
      },
      {
        question: "App + AI + IoT",
        answer: "Acquafy App(iOS 및 Android)은 Wi-Fi로 정수기에 연결하여 실시간 모니터링, 필터 교체 알림, AI 통합 원격 제어를 제공합니다.",
        cta: "App 보기",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media는 정수기에 통합된 멀티미디어 플랫폼으로, 화면에 콘텐츠, 광고, QR 코드를 표시하여 파트너와 유통업체에 지속적인 수익을 창출합니다.",
        cta: "자세히 알아보기",
      },
      {
        question: "파트너",
        answer: "Acquafy 파트너 프로그램은 상업적 지원, 교육, 마케팅 자료 및 지속적인 커미션을 제공합니다. 파트너가 되려면 파트너십 페이지의 양식을 작성하세요.",
        cta: "파트너 되기",
      },
      {
        question: "청구",
        answer: "청구서, 커미션 보고서, 주문 내역은 파트너 포털에서 관리됩니다. 결제나 커미션에 관한 문의는 지원 팀에 연락하세요.",
        cta: "지원팀 연락",
      },
      {
        question: "설치 및 유지보수",
        answer: "설치는 Acquafy 인증 기술자가 진행합니다. 예방적 유지보수(필터 교체 및 UV LED 점검)는 App이 자동으로 모니터링합니다.",
        cta: "지원팀과 상담",
      },
    ],
    imgAlt: "Acquafy 고객 지원 센터",
  },
  sv: {
    label: "ACQUAFY DIGITALT EKOSYSTEM",
    h1Line1: "Acquafy",
    h1Brand: "Supportcenter",
    subtitle: "Vi finns här för att hjälpa dig.",
    description:
      "Vårt team och våra resurser är redo att ge dig den bästa upplevelsen med Acquafys produkter och lösningar. Hitta svar, guider och specialiserat stöd när du behöver det.",
    btnChat: "Öppna chatt",
    btnSpecialist: "Prata med en specialist",
    floatingCards: [
      { title: "Hur kan vi hjälpa dig?",    desc: null },
      { title: "Systemstatus",              desc: "Kontrollera tjänsternas driftstatus" },
      { title: "Kunskapsbas",               desc: "Guider och användbara artiklar." },
      { title: "Öppna ett ärende",          desc: "Få support från vårt team." },
    ],
    unifiedHeading1: "Hur Kan Vi",
    unifiedHeading2: "Hjälpa Dig?",
    quickLinks: [
      { title: "Mina produkter",        desc: "Utforska hela Neo-sortimentet av vattenrenare." },
      { title: "App + AI + IoT",        desc: "Kontroll, automatisering och AI i din hand." },
      { title: "Kontakta oss",          desc: "Vårt team är redo att hjälpa dig." },
      { title: "Policyer och garantier", desc: "Läs våra policyer, villkor och garantier." },
    ],
    faqItems: [
      {
        question: "Produkter",
        answer: "Neo-serien inkluderar vattenrenare med LED-touchpanel, App, UV LED och premium UF-filter i modellerna SMART H2, TOUCH och andra. Kontrollera specifikationer, filterkompatibilitet och jämför tillgängliga modeller.",
        cta: "Se Neo-serien",
      },
      {
        question: "App + AI + IoT",
        answer: "Acquafy App (iOS och Android) ansluter din vattenrenare via Wi-Fi för realtidsövervakning, filterbytesvarnare och fjärrstyrning med integrerad AI.",
        cta: "Utforska appen",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media är multimediaplattformen integrerad i vattenrenaren som visar innehåll, annonser och QR-koder på enhetens skärm, och genererar återkommande intäkter för partners och distributörer.",
        cta: "Läs mer",
      },
      {
        question: "Partners",
        answer: "Acquafy Partner-programmet erbjuder kommersiellt stöd, utbildning, marknadsföringsmaterial och återkommande provisioner. För att bli partner, fyll i formuläret på partnerskapssidan.",
        cta: "Bli partner",
      },
      {
        question: "Fakturering",
        answer: "Fakturor, provisionsrapporter och orderhistorik hanteras i partnerportalen. Vid frågor om betalningar eller provisioner, kontakta vårt supportteam.",
        cta: "Kontakta support",
      },
      {
        question: "Installation och underhåll",
        answer: "Installation utförs av Acquafy-certifierade tekniker. Förebyggande underhåll — filterbyte och UV LED-kontroll — övervakas automatiskt av appen.",
        cta: "Prata med support",
      },
    ],
    imgAlt: "Acquafy Supportcenter",
  },
  fi: {
    label: "ACQUAFY DIGITAALINEN EKOSYSTEEMI",
    h1Line1: "Acquafy",
    h1Brand: "Tukikeskus",
    subtitle: "Olemme täällä auttamassa sinua.",
    description:
      "Tiimimme ja resurssimme ovat valmiita tarjoamaan parhaan kokemuksen Acquafyn tuotteiden ja ratkaisujen kanssa. Löydä vastauksia, oppaita ja erikoistunutta tukea aina tarvittaessa.",
    btnChat: "Avaa chat",
    btnSpecialist: "Puhu asiantuntijan kanssa",
    floatingCards: [
      { title: "Kuinka voimme auttaa sinua?", desc: null },
      { title: "Järjestelmän tila",            desc: "Tarkista palveluiden toiminta" },
      { title: "Tietopohja",                   desc: "Oppaat ja hyödylliset artikkelit." },
      { title: "Avaa tiketti",                 desc: "Saa tukea tiimiltämme." },
    ],
    unifiedHeading1: "Kuinka Voimme",
    unifiedHeading2: "Auttaa Sinua?",
    quickLinks: [
      { title: "Omat tuotteet",        desc: "Tutustu Neo-vedenpuhdistimien koko valikoimaan." },
      { title: "App + AI + IoT",       desc: "Hallinta, automaatio ja tekoäly kämmenelläsi." },
      { title: "Ota yhteyttä",         desc: "Tiimimme on valmis auttamaan sinua." },
      { title: "Käytännöt ja takuut",  desc: "Lue käytäntömme, ehtomme ja takuumme." },
    ],
    faqItems: [
      {
        question: "Tuotteet",
        answer: "Neo-sarja sisältää vedenpuhdistimia, joissa on LED-kosketuspaneeli, sovellus, UV LED ja premium UF -suodattimet malleissa SMART H2, TOUCH ja muissa. Tarkista tekniset tiedot, suodatinyhteensopivuus ja vertaa saatavilla olevia malleja.",
        cta: "Katso Neo-sarja",
      },
      {
        question: "App + AI + IoT",
        answer: "Acquafy-sovellus (iOS ja Android) yhdistää vedenpuhdistimesi Wi-Fi:n kautta reaaliaikaiseen seurantaan, suodattimen vaihtomuistutuksiin ja etähallintaan integroidulla tekoälyllä.",
        cta: "Tutustu sovellukseen",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media on vedenpuhdistimeen integroitu multimediaplatform, joka näyttää sisältöä, mainoksia ja QR-koodeja laitteen näytöllä tuottaen toistuvia tuloja kumppaneille ja jakelijoille.",
        cta: "Lue lisää",
      },
      {
        question: "Kumppanit",
        answer: "Acquafy-kumppaniohjelma tarjoaa kaupallista tukea, koulutusta, markkinointimateriaalia ja toistuvia provisioita. Tullaksesi kumppaniksi täytä lomake kumppanuussivulla.",
        cta: "Tule kumppaniksi",
      },
      {
        question: "Laskutus",
        answer: "Laskut, provisioraportit ja tilaushistoria hallitaan kumppaniportaalissa. Maksuja tai provisioita koskeviin kysymyksiin voit ottaa yhteyttä tukitiimiimme.",
        cta: "Ota yhteyttä tukeen",
      },
      {
        question: "Asennus ja huolto",
        answer: "Asennuksen suorittavat Acquafy-sertifioidut teknikot. Ehkäisevä huolto — suodattimen vaihto ja UV LED -tarkistus — seurataan automaattisesti sovelluksella.",
        cta: "Puhu tuen kanssa",
      },
    ],
    imgAlt: "Acquafy Tukikeskus",
  },
  ru: {
    label: "ЦИФРОВАЯ ЭКОСИСТЕМА ACQUAFY",
    h1Line1: "Acquafy",
    h1Brand: "Центр поддержки",
    subtitle: "Мы здесь, чтобы помочь вам.",
    description:
      "Наша команда и ресурсы готовы обеспечить наилучший опыт использования продуктов и решений Acquafy. Найдите ответы, руководства и специализированную поддержку в любое время.",
    btnChat: "Открыть чат",
    btnSpecialist: "Поговорить со специалистом",
    floatingCards: [
      { title: "Чем мы можем вам помочь?", desc: null },
      { title: "Статус системы",            desc: "Проверьте работу сервисов" },
      { title: "База знаний",               desc: "Руководства и полезные статьи." },
      { title: "Создать заявку",            desc: "Получите поддержку от нашей команды." },
    ],
    unifiedHeading1: "Как Мы Можем",
    unifiedHeading2: "Помочь Вам?",
    quickLinks: [
      { title: "Мои продукты",         desc: "Изучите полную линейку очистителей Neo." },
      { title: "App + AI + IoT",       desc: "Управление, автоматизация и ИИ на ладони." },
      { title: "Связаться с нами",     desc: "Наша команда готова помочь вам." },
      { title: "Политики и гарантии",  desc: "Ознакомьтесь с нашими политиками, условиями и гарантиями." },
    ],
    faqItems: [
      {
        question: "Продукты",
        answer: "Линейка Neo включает очистители с LED-сенсорной панелью, приложением, UV LED и премиальными UF-фильтрами в моделях SMART H2, TOUCH и других. Ознакомьтесь со спецификациями, совместимостью фильтров и сравните доступные модели.",
        cta: "Посмотреть линейку Neo",
      },
      {
        question: "App + AI + IoT",
        answer: "Приложение Acquafy (iOS и Android) подключает ваш очиститель через Wi-Fi для мониторинга в реальном времени, напоминаний о замене фильтра и дистанционного управления с интегрированным ИИ.",
        cta: "Узнать о приложении",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media — это мультимедийная платформа, интегрированная в очиститель, которая отображает контент, рекламу и QR-коды на экране устройства, генерируя регулярный доход для партнёров и дистрибьюторов.",
        cta: "Узнать больше",
      },
      {
        question: "Партнёры",
        answer: "Партнёрская программа Acquafy предлагает коммерческую поддержку, обучение, маркетинговые материалы и регулярные комиссии. Чтобы стать партнёром, заполните форму на странице партнёрства.",
        cta: "Стать партнёром",
      },
      {
        question: "Выставление счетов",
        answer: "Счета, отчёты о комиссиях и история заказов управляются в партнёрском портале. По вопросам оплат или комиссий обращайтесь в нашу службу поддержки.",
        cta: "Связаться с поддержкой",
      },
      {
        question: "Установка и обслуживание",
        answer: "Установку выполняют сертифицированные специалисты Acquafy. Профилактическое обслуживание — замена фильтров и проверка UV LED — автоматически контролируется приложением.",
        cta: "Написать в поддержку",
      },
    ],
    imgAlt: "Acquafy Центр поддержки",
  },
  ro: {
    label: "ECOSISTEMUL DIGITAL ACQUAFY",
    h1Line1: "Acquafy",
    h1Brand: "Centrul de Suport",
    subtitle: "Suntem aici pentru a va ajuta.",
    description:
      "Echipa si resursele noastre sunt pregatite sa ofere cea mai buna experienta cu produsele si solutiile Acquafy. Gasiti raspunsuri, tutoriale si suport specializat oricand aveti nevoie.",
    btnChat: "Deschide chat",
    btnSpecialist: "Vorbiti cu un specialist",
    floatingCards: [
      { title: "Cum va putem ajuta?",       desc: null },
      { title: "Starea sistemului",         desc: "Verificati functionarea serviciilor" },
      { title: "Baza de cunostinte",        desc: "Tutoriale si articole utile." },
      { title: "Deschide un tichet",        desc: "Primiti suport din partea echipei noastre." },
    ],
    unifiedHeading1: "Cum Va Putem",
    unifiedHeading2: "Ajuta?",
    quickLinks: [
      { title: "Produsele mele",         desc: "Explorati gama completa de purificatoare Neo." },
      { title: "App + AI + IoT",         desc: "Control, automatizare si IA in palma mainii." },
      { title: "Contactati-ne",          desc: "Echipa noastra este pregatita sa va ajute." },
      { title: "Politici si garantii",   desc: "Consultati politicile, termenii si garantiile noastre." },
    ],
    faqItems: [
      {
        question: "Produse",
        answer: "Linia Neo include purificatoare cu panou LED Touch, aplicatie, UV LED si filtre UF premium in modelele SMART H2, TOUCH si altele. Verificati specificatiile, compatibilitatea filtrelor si comparati modelele disponibile.",
        cta: "Vezi Linia Neo",
      },
      {
        question: "App + AI + IoT",
        answer: "Aplicatia Acquafy (iOS si Android) conecteaza purificatorul dvs. prin Wi-Fi pentru monitorizare in timp real, alerte de schimbare a filtrului si control de la distanta cu IA integrata.",
        cta: "Descopera aplicatia",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media este platforma multimedia integrata in purificator care afiseaza continut, reclame si coduri QR pe ecranul dispozitivului, generand venituri recurente pentru parteneri si distribuitori.",
        cta: "Afla mai multe",
      },
      {
        question: "Parteneri",
        answer: "Programul Acquafy Partner ofera suport comercial, instruire, materiale de marketing si comisioane recurente. Pentru a deveni partener, completati formularul de pe pagina de parteneriate.",
        cta: "Devino partener",
      },
      {
        question: "Facturare",
        answer: "Facturile, rapoartele de comisioane si istoricul comenzilor sunt gestionate in portalul partenerului. Pentru intrebari despre plati sau comisioane, contactati echipa noastra de suport.",
        cta: "Contactati suportul",
      },
      {
        question: "Instalare si Intretinere",
        answer: "Instalarea este efectuata de tehnicieni certificati Acquafy. Intretinerea preventiva — schimbarea filtrelor si verificarea UV LED — este monitorizata automat de aplicatie.",
        cta: "Vorbiti cu suportul",
      },
    ],
    imgAlt: "Acquafy Centrul de Suport",
  },
  he: {
    label: "ACQUAFY - ECOSISTEM DIGITAL",
    h1Line1: "Acquafy",
    h1Brand: "מרכז התמיכה",
    subtitle: "אנחנו כאן כדי לעזור לך.",
    description:
      "הצוות והמשאבים שלנו מוכנים לספק את החוויה הטובה ביותר עם מוצרי ופתרונות Acquafy. מצא תשובות, הדרכות ותמיכה מקצועית בכל עת שתזדקק לה.",
    btnChat: "פתח צ'אט",
    btnSpecialist: "דבר עם מומחה",
    floatingCards: [
      { title: "כיצד נוכל לעזור לך?",    desc: null },
      { title: "מצב המערכת",              desc: "בדוק את תפקוד השירותים" },
      { title: "בסיס ידע",                desc: "מדריכים ומאמרים שימושיים." },
      { title: "פתח כרטיס תמיכה",        desc: "קבל תמיכה מהצוות שלנו." },
    ],
    unifiedHeading1: "כיצד נוכל",
    unifiedHeading2: "לעזור לך?",
    quickLinks: [
      { title: "המוצרים שלי",         desc: "גלה את מגוון מטהרי Neo המלא." },
      { title: "App + AI + IoT",      desc: "שליטה, אוטומציה ובינה מלאכותית בכף ידך." },
      { title: "צור קשר",             desc: "הצוות שלנו מוכן לעזור לך." },
      { title: "מדיניות ואחריות",     desc: "עיין במדיניות, בתנאים ובאחריות שלנו." },
    ],
    faqItems: [
      {
        question: "מוצרים",
        answer: "סדרת Neo כוללת מטהרי מים עם לוח LED מגע, אפליקציה, UV LED ופילטרי UF פרמיום בדגמי SMART H2, TOUCH ואחרים. בדוק מפרטים, תאימות פילטרים והשווה דגמים זמינים.",
        cta: "ראה סדרת Neo",
      },
      {
        question: "App + AI + IoT",
        answer: "אפליקציית Acquafy (iOS ו-Android) מחברת את המטהר שלך דרך Wi-Fi למעקב בזמן אמת, התראות החלפת פילטר ושליטה מרחוק עם בינה מלאכותית משולבת.",
        cta: "גלה את האפליקציה",
      },
      {
        question: "Media Network",
        answer: "Acquafy Media היא פלטפורמת המולטימדיה המשולבת במטהר, המציגה תכנים, מודעות וקודי QR על מסך המכשיר, ומייצרת הכנסה חוזרת לשותפים ולמפיצים.",
        cta: "קרא עוד",
      },
      {
        question: "שותפים",
        answer: "תוכנית Acquafy Partner מציעה תמיכה מסחרית, הכשרה, חומרי שיווק ועמלות חוזרות. כדי להפוך לשותף, מלא את הטופס בדף השותפויות.",
        cta: "הפוך לשותף",
      },
      {
        question: "חיוב",
        answer: "חשבוניות, דוחות עמלות והיסטוריית הזמנות מנוהלים בפורטל השותפים. לשאלות בנוגע לתשלומים או עמלות, צור קשר עם צוות התמיכה שלנו.",
        cta: "צור קשר עם התמיכה",
      },
      {
        question: "התקנה ותחזוקה",
        answer: "ההתקנה מבוצעת על ידי טכנאים מוסמכים של Acquafy. תחזוקה מונעת — החלפת פילטרים ובדיקת UV LED — מנוטרת אוטומטית על ידי האפליקציה.",
        cta: "דבר עם התמיכה",
      },
    ],
    imgAlt: "Acquafy מרכז התמיכה",
  },
};

// ── Static metadata ───────────────────────────────────────────────────────────
const floatingCardsMeta = [
  { icon: imgIconChat,    aspectW: 30, aspectH: 30   },
  { icon: imgIconCheckin, aspectW: 30, aspectH: 30   },
  { icon: imgIconBook,    aspectW: 30, aspectH: 22.3 },
  { icon: imgIconFone,    aspectW: 30, aspectH: 30   },
];

const QUICK_LINKS_META = [
  { icon: "/figma-assets/icon-agua-pura.svg",   aspectW: 642.7, aspectH: 630.7, href: "/linha-neo"             },
  { icon: "/figma-assets/icon-mobile-b.svg",    aspectW: 21,    aspectH: 30,    href: "/app-ai-iot"            },
  { icon: imgIconFone,                           aspectW: 30,    aspectH: 30,    href: "/contact"               },
  { icon: "/figma-assets/icon-certificate.svg", aspectW: 14.17, aspectH: 21.5,  href: "/politicas-privacidade" },
];

const FAQ_META = [
  { href: "/linha-neo"  },
  { href: "/app-ai-iot" },
  { href: "/neo-media"  },
  { href: "/parceria"   },
  { href: "/contact"    },
  { href: "/contact"    },
];

// ── Componente ────────────────────────────────────────────────────────────────
export default function BannerCentralSuporte() {
  const { openChat } = useChatWidget();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="relative flex flex-col items-center justify-center px-[20px] py-[40px] w-full min-h-[calc(100vh-80px)]">

      {/* ── Background ──────────────────────────────────────────── */}
      <img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* ── Linha principal ─────────────────────────────────────── */}
      <div className="relative flex flex-col gap-[40px] items-center max-w-[1400px] w-full shrink-0
        xl:flex-row xl:flex-wrap xl:items-end xl:justify-center">

        {/* ── Coluna de texto ─────────────────────────────────── */}
        <div className="flex flex-col gap-[20px] items-center w-full
          xl:flex-[1_0_0] xl:items-start xl:justify-center xl:self-center xl:max-w-[490px] xl:min-w-[280px] xl:pb-[40px] xl:pt-[20px]">

          {/* Label */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[290px] px-[12px] py-[8px] rounded-full shrink-0">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              {t.label}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] text-center w-full xl:text-left">
            {t.h1Line1}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(107deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              {t.h1Brand}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0569ff] text-center w-full xl:text-left">
            {t.subtitle}
          </p>

          {/* Descrição */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center w-full xl:text-left">
            {t.description}
          </p>

          {/* Botões */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center w-full xl:justify-start">
            <button
              onClick={openChat}
              className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#0569ff] transition-colors
              flex gap-[10px] items-center justify-center
              min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center leading-normal">
                {t.btnChat}
              </span>
              <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
            </button>

            <a href="/contact" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors
              flex gap-[10px] items-center justify-center
              min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white transition-colors flex-1 text-center leading-normal">
                {t.btnSpecialist}
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ── Imagem + Cards ──────────────────────────────────── */}
        <div className="flex flex-col gap-[20px] items-center justify-end w-full shrink-0 min-w-[280px]
          min-[621px]:items-end min-[621px]:gap-0
          md:flex-row md:items-end md:justify-center md:gap-0
          xl:flex-[1_0_0] xl:max-w-[880px] xl:min-w-[280px]">

          {/* ── Imagem ─────────────────────────────────────────── */}
          <div className="relative order-2 w-full aspect-[4096/3477] shrink-0
            min-[621px]:w-[460px] min-[621px]:h-[390px] min-[621px]:max-w-[460px] min-[621px]:shrink-0
            md:order-1 md:w-[471px] md:h-[400px] md:max-w-[471px] md:shrink-0 md:mr-[-40px]
            xl:order-1 xl:flex-[1_0_0] xl:min-w-px xl:w-auto xl:h-auto xl:max-w-none xl:mr-[-50px]">
            <img
              src={imgMainImage}
              alt={t.imgAlt}
              className="absolute inset-0 size-full max-w-none object-cover pointer-events-none select-none"
            />
          </div>

          {/* ── Cards wrapper ───────────────────────────────────── */}
          <div className="order-1 w-full
            md:order-2 md:relative md:z-[1] md:flex md:flex-[1_0_0] md:flex-row md:items-end md:self-stretch md:min-w-px
            xl:z-10 xl:max-w-[270px]">

            <div className="flex flex-col gap-[20px] w-full
              min-[621px]:mb-[-240px]
              md:flex-[1_0_0] md:flex-row md:flex-wrap md:content-center md:h-full md:items-center md:justify-end md:pb-[20px] md:mb-0 md:min-w-px
              xl:flex-col xl:flex-nowrap xl:items-end xl:justify-center xl:max-w-[270px] xl:min-w-px xl:pb-[14px] xl:gap-[14px]">

              {floatingCardsMeta.map((meta, i) => {
                const card = t.floatingCards[i];
                return (
                  <div
                    key={card.title}
                    className="bg-gradient-to-r from-white to-[rgba(255,255,255,0.7)]
                      flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center
                      p-[20px] rounded-[16px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]
                      w-full min-w-[150px]
                      md:min-h-[90px] md:min-w-[280px] md:w-auto
                      xl:w-full xl:min-w-[160px] xl:min-h-0 xl:p-[14px] xl:gap-[12px]">
                    <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                      <FigmaIcon src={meta.icon} size={30} aspectW={meta.aspectW} aspectH={meta.aspectH} />
                    </div>
                    <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                        {card.title}
                      </p>
                      {card.desc && (
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#1f2e91] w-full">
                          {card.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── Seção unificada ─────────────────────────────────────── */}
      <div className="relative bg-white flex flex-col gap-[32px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full shrink-0">

        {/* Heading */}
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.unifiedHeading1}{" "}
          <span className="text-[#0569ff]">{t.unifiedHeading2}</span>
        </p>

        {/* Quick links */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {QUICK_LINKS_META.map((meta, i) => {
            const link = t.quickLinks[i];
            return (
              <a
                key={meta.href}
                href={meta.href}
                className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors
                  flex flex-[1_0_0] flex-col gap-[20px] items-center
                  min-w-[180px] p-[20px] rounded-[16px] cursor-pointer no-underline"
              >
                <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                  <FigmaIcon src={meta.icon} size={30} aspectW={meta.aspectW} aspectH={meta.aspectH} />
                </div>
                <div className="flex flex-col gap-[10px] items-start text-center w-full flex-1">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{link.title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{link.desc}</p>
                </div>
                <FigmaIcon src={imgArrowAccent} size={12} aspectW={11.2} aspectH={8.84} />
              </a>
            );
          })}
        </div>

        {/* FAQ accordion */}
        <div className="flex flex-col w-full gap-[4px]">
          {t.faqItems.map((item, i) => (
            <div key={i} className="border border-[#e8edf5] rounded-[12px] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between gap-[16px] w-full px-[20px] py-[16px] text-left cursor-pointer hover:bg-[#f6f9fe] transition-colors"
              >
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91]">
                  {item.question}
                </span>
                <svg
                  className={`shrink-0 transition-transform duration-150 ${openFaq === i ? "rotate-180" : ""}`}
                  width="12" height="8" viewBox="0 0 12 8" fill="none"
                >
                  <path d="M1 1l5 5 5-5" stroke="#0233c3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-[20px] pb-[20px] flex flex-col gap-[16px]">
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[22px] text-[#333]">
                    {item.answer}
                  </p>
                  <a
                    href={FAQ_META[i].href}
                    className="self-start bg-[#0233c3] hover:bg-[#002ba8] transition-colors
                      flex gap-[8px] items-center justify-center
                      h-[36px] overflow-hidden px-[16px] rounded-[8px] no-underline"
                  >
                    <span className="font-['Articulat_CF:Bold'] text-[13px] text-white leading-normal">{item.cta}</span>
                    <FigmaIcon src={imgArrowWhite} size={8} aspectW={11.2} aspectH={8.84} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
