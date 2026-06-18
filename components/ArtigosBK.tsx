"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrowBlue   = "/figma-assets/icon-arrow-blue-b.svg";
const imgAguaPura    = "/figma-assets/icon-agua-pura.svg";
const imgMobile      = "/figma-assets/icon-mobile-b.svg";
const imgMedia       = "/figma-assets/icon-media.svg";
const imgParceria    = "/figma-assets/icon-parceria-a.svg";
const imgMoney       = "/figma-assets/icon-money-b.svg";
const imgManutencao  = "/figma-assets/icon-manutencao.svg";

const T: Record<Lang, {
  heading: string;
  headingHighlight: string;
  subtitle: string;
  verTodos: string;
  categorias: {
    title: string;
    artigos: { titulo: string; tags: string[] }[];
  }[];
}> = {
  pt: {
    heading: "Artigos",
    headingHighlight: "em destaque",
    subtitle: "Os conteúdos mais acessados organizados por categoria.",
    verTodos: "Ver todos os artigos",
    categorias: [
      {
        title: "Produtos",
        artigos: [
          { titulo: "Qual a diferença entre Linha Neo Essentials e Premium?", tags: ["Linha Neo", "Comparativo"] },
          { titulo: "Quais tipos de água o purificador Neo fornece?",          tags: ["Água", "Filtração"] },
          { titulo: "Como verificar a garantia do meu produto?",              tags: ["Garantia", "Registro"] },
          { titulo: "O que é a tecnologia UV LED + UF no Neo?",                tags: ["Tecnologia", "Filtração"] },
          { titulo: "Especificações técnicas do painel LED 10.1\" e 15.6\"",   tags: ["Especificações", "Hardware"] },
          { titulo: "Qual modelo escolher: Neo FIT, SMART H₂ ou ULTRA?",      tags: ["Comparativo", "Guia"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "Como configurar o Wi-Fi no purificador Neo?",       tags: ["Wi-Fi", "Configuração"] },
          { titulo: "Como usar o aplicativo Acquafy no celular?",        tags: ["App", "Tutorial"] },
          { titulo: "O que é o suporte por IA 24/7?",                    tags: ["IA", "Suporte"] },
          { titulo: "Como monitorar a qualidade da água pelo app?",      tags: ["IoT", "Monitoramento"] },
          { titulo: "Compatibilidade com iOS e Android",                 tags: ["App", "Compatibilidade"] },
          { titulo: "Configuração do Bluetooth 5.3 para controle local", tags: ["Bluetooth", "Configuração"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "Como funciona o sistema de anúncios na tela?",    tags: ["Anúncios", "Receita"] },
          { titulo: "Como cadastrar uma campanha no Acquafy Media?",   tags: ["Campanha", "Tutorial"] },
          { titulo: "O que é o QR Code de campanha e como usar?",      tags: ["QR Code", "Marketing"] },
          { titulo: "Como calcular a receita recorrente com Media?",   tags: ["Receita", "Negócio"] },
          { titulo: "Formatos e dimensões aceitos para anúncios",      tags: ["Design", "Especificações"] },
          { titulo: "Relatórios de performance de campanha",           tags: ["Analytics", "Relatório"] },
        ],
      },
      {
        title: "Parceiros",
        artigos: [
          { titulo: "Como se tornar um parceiro Silver da Acquafy?",    tags: ["Silver", "Cadastro"] },
          { titulo: "Quais são os benefícios do plano Gold Partner?",   tags: ["Gold", "Benefícios"] },
          { titulo: "Modelo Platinum: distribuidor regional Acquafy",   tags: ["Platinum", "Distribuição"] },
          { titulo: "Comissões por nível de parceria (20% a 70%)",      tags: ["Comissão", "Financeiro"] },
          { titulo: "Materiais de apoio para vendas e treinamentos",    tags: ["Marketing", "Treinamento"] },
          { titulo: "Como operar a rede Silver sendo um Gold Partner?", tags: ["Gold", "Rede"] },
        ],
      },
      {
        title: "Faturamento",
        artigos: [
          { titulo: "Como emitir a segunda via de fatura?",            tags: ["Fatura", "Financeiro"] },
          { titulo: "Prazo para recebimento de comissões",             tags: ["Comissão", "Pagamento"] },
          { titulo: "Formas de pagamento aceitas pela Acquafy",        tags: ["Pagamento", "Métodos"] },
          { titulo: "Como acompanhar o status do meu pedido?",         tags: ["Pedido", "Rastreamento"] },
          { titulo: "Política de reembolso e cancelamento",            tags: ["Reembolso", "Política"] },
          { titulo: "Nota fiscal e documentação fiscal internacional", tags: ["Fiscal", "Internacional"] },
        ],
      },
      {
        title: "Instalação e Manutenção",
        artigos: [
          { titulo: "Passo a passo: instalação do purificador Neo",      tags: ["Instalação", "Tutorial"] },
          { titulo: "Com que frequência trocar o filtro? (365 dias)",    tags: ["Filtro", "Manutenção"] },
          { titulo: "Como realizar a limpeza preventiva?",               tags: ["Limpeza", "Preventiva"] },
          { titulo: "Solução de problemas: purificador sem energia",     tags: ["Problema", "Elétrico"] },
          { titulo: "Troca do filtro: reposição inteligente via app",    tags: ["Filtro", "App"] },
          { titulo: "Manutenção do reservatório e componentes internos", tags: ["Manutenção", "Hardware"] },
        ],
      },
    ],
  },
  "pt-pt": {
    heading: "Artigos",
    headingHighlight: "em destaque",
    subtitle: "Os conteúdos mais acedidos organizados por categoria.",
    verTodos: "Ver todos os artigos",
    categorias: [
      {
        title: "Produtos",
        artigos: [
          { titulo: "Qual a diferença entre a Linha Neo Essentials e Premium?",    tags: ["Linha Neo", "Comparativo"] },
          { titulo: "Que tipos de água o purificador Neo fornece?",                tags: ["Água", "Filtração"] },
          { titulo: "Como verificar a garantia do meu produto?",                  tags: ["Garantia", "Registo"] },
          { titulo: "O que é a tecnologia UV LED + UF no Neo?",                   tags: ["Tecnologia", "Filtração"] },
          { titulo: "Especificações técnicas do painel LED 10.1\" e 15.6\"",      tags: ["Especificações", "Hardware"] },
          { titulo: "Qual modelo escolher: Neo FIT, SMART H₂ ou ULTRA?",         tags: ["Comparativo", "Guia"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "Como configurar o Wi-Fi no purificador Neo?",                tags: ["Wi-Fi", "Configuração"] },
          { titulo: "Como utilizar a aplicação Acquafy no telemóvel?",            tags: ["App", "Tutorial"] },
          { titulo: "O que é o suporte por IA 24/7?",                            tags: ["IA", "Suporte"] },
          { titulo: "Como monitorizar a qualidade da água pela aplicação?",       tags: ["IoT", "Monitorização"] },
          { titulo: "Compatibilidade com iOS e Android",                         tags: ["App", "Compatibilidade"] },
          { titulo: "Configuração do Bluetooth 5.3 para controlo local",         tags: ["Bluetooth", "Configuração"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "Como funciona o sistema de anúncios no ecrã?",              tags: ["Anúncios", "Receita"] },
          { titulo: "Como registar uma campanha no Acquafy Media?",              tags: ["Campanha", "Tutorial"] },
          { titulo: "O que é o QR Code de campanha e como utilizar?",            tags: ["QR Code", "Marketing"] },
          { titulo: "Como calcular a receita recorrente com Media?",             tags: ["Receita", "Negócio"] },
          { titulo: "Formatos e dimensões aceites para anúncios",                tags: ["Design", "Especificações"] },
          { titulo: "Relatórios de desempenho de campanha",                      tags: ["Analytics", "Relatório"] },
        ],
      },
      {
        title: "Parceiros",
        artigos: [
          { titulo: "Como tornar-se parceiro Silver da Acquafy?",                tags: ["Silver", "Registo"] },
          { titulo: "Quais são os benefícios do plano Gold Partner?",            tags: ["Gold", "Benefícios"] },
          { titulo: "Modelo Platinum: distribuidor regional Acquafy",            tags: ["Platinum", "Distribuição"] },
          { titulo: "Comissões por nível de parceria (20% a 70%)",               tags: ["Comissão", "Financeiro"] },
          { titulo: "Materiais de apoio para vendas e formações",                tags: ["Marketing", "Formação"] },
          { titulo: "Como operar a rede Silver sendo um Gold Partner?",          tags: ["Gold", "Rede"] },
        ],
      },
      {
        title: "Faturação",
        artigos: [
          { titulo: "Como emitir a segunda via de fatura?",                      tags: ["Fatura", "Financeiro"] },
          { titulo: "Prazo para receção de comissões",                           tags: ["Comissão", "Pagamento"] },
          { titulo: "Formas de pagamento aceites pela Acquafy",                  tags: ["Pagamento", "Métodos"] },
          { titulo: "Como acompanhar o estado do meu pedido?",                   tags: ["Pedido", "Rastreamento"] },
          { titulo: "Política de reembolso e cancelamento",                      tags: ["Reembolso", "Política"] },
          { titulo: "Fatura e documentação fiscal internacional",                tags: ["Fiscal", "Internacional"] },
        ],
      },
      {
        title: "Instalação e Manutenção",
        artigos: [
          { titulo: "Passo a passo: instalação do purificador Neo",              tags: ["Instalação", "Tutorial"] },
          { titulo: "Com que frequência trocar o filtro? (365 dias)",            tags: ["Filtro", "Manutenção"] },
          { titulo: "Como realizar a limpeza preventiva?",                       tags: ["Limpeza", "Preventiva"] },
          { titulo: "Resolução de problemas: purificador sem energia",           tags: ["Problema", "Elétrico"] },
          { titulo: "Troca do filtro: reposição inteligente via aplicação",      tags: ["Filtro", "App"] },
          { titulo: "Manutenção do reservatório e componentes internos",         tags: ["Manutenção", "Hardware"] },
        ],
      },
    ],
  },
  en: {
    heading: "Articles",
    headingHighlight: "in focus",
    subtitle: "The most accessed content organized by category.",
    verTodos: "See all articles",
    categorias: [
      {
        title: "Products",
        artigos: [
          { titulo: "What is the difference between Neo Essentials and Premium?", tags: ["Neo Line", "Comparison"] },
          { titulo: "What types of water does the Neo purifier provide?",          tags: ["Water", "Filtration"] },
          { titulo: "How to check my product warranty?",                           tags: ["Warranty", "Registration"] },
          { titulo: "What is UV LED + UF technology in Neo?",                      tags: ["Technology", "Filtration"] },
          { titulo: "Technical specs of the 10.1\" and 15.6\" LED panel",          tags: ["Specifications", "Hardware"] },
          { titulo: "Which model to choose: Neo FIT, SMART H₂ or ULTRA?",         tags: ["Comparison", "Guide"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "How to set up Wi-Fi on the Neo purifier?",          tags: ["Wi-Fi", "Setup"] },
          { titulo: "How to use the Acquafy app on your phone?",         tags: ["App", "Tutorial"] },
          { titulo: "What is 24/7 AI support?",                          tags: ["AI", "Support"] },
          { titulo: "How to monitor water quality via the app?",         tags: ["IoT", "Monitoring"] },
          { titulo: "Compatibility with iOS and Android",                tags: ["App", "Compatibility"] },
          { titulo: "Bluetooth 5.3 setup for local control",             tags: ["Bluetooth", "Setup"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "How does the on-screen ad system work?",            tags: ["Ads", "Revenue"] },
          { titulo: "How to register a campaign in Acquafy Media?",      tags: ["Campaign", "Tutorial"] },
          { titulo: "What is the campaign QR Code and how to use it?",   tags: ["QR Code", "Marketing"] },
          { titulo: "How to calculate recurring revenue with Media?",    tags: ["Revenue", "Business"] },
          { titulo: "Accepted formats and dimensions for ads",           tags: ["Design", "Specifications"] },
          { titulo: "Campaign performance reports",                      tags: ["Analytics", "Report"] },
        ],
      },
      {
        title: "Partners",
        artigos: [
          { titulo: "How to become an Acquafy Silver partner?",          tags: ["Silver", "Registration"] },
          { titulo: "What are the benefits of the Gold Partner plan?",   tags: ["Gold", "Benefits"] },
          { titulo: "Platinum model: Acquafy regional distributor",      tags: ["Platinum", "Distribution"] },
          { titulo: "Commissions by partnership level (20% to 70%)",     tags: ["Commission", "Financial"] },
          { titulo: "Support materials for sales and training",          tags: ["Marketing", "Training"] },
          { titulo: "How to operate the Silver network as a Gold Partner?", tags: ["Gold", "Network"] },
        ],
      },
      {
        title: "Billing",
        artigos: [
          { titulo: "How to get a duplicate invoice?",                   tags: ["Invoice", "Financial"] },
          { titulo: "Commission payment timeline",                       tags: ["Commission", "Payment"] },
          { titulo: "Accepted payment methods by Acquafy",               tags: ["Payment", "Methods"] },
          { titulo: "How to track my order status?",                     tags: ["Order", "Tracking"] },
          { titulo: "Refund and cancellation policy",                    tags: ["Refund", "Policy"] },
          { titulo: "Invoice and international fiscal documentation",    tags: ["Tax", "International"] },
        ],
      },
      {
        title: "Installation & Maintenance",
        artigos: [
          { titulo: "Step by step: Neo purifier installation",           tags: ["Installation", "Tutorial"] },
          { titulo: "How often to change the filter? (365 days)",        tags: ["Filter", "Maintenance"] },
          { titulo: "How to perform preventive cleaning?",               tags: ["Cleaning", "Preventive"] },
          { titulo: "Troubleshooting: purifier without power",           tags: ["Problem", "Electrical"] },
          { titulo: "Filter replacement: smart replacement via app",     tags: ["Filter", "App"] },
          { titulo: "Maintenance of reservoir and internal components",  tags: ["Maintenance", "Hardware"] },
        ],
      },
    ],
  },
  es: {
    heading: "Artículos",
    headingHighlight: "destacados",
    subtitle: "Los contenidos más accedidos organizados por categoría.",
    verTodos: "Ver todos los artículos",
    categorias: [
      {
        title: "Productos",
        artigos: [
          { titulo: "¿Cuál es la diferencia entre la Línea Neo Essentials y Premium?", tags: ["Línea Neo", "Comparativo"] },
          { titulo: "¿Qué tipos de agua proporciona el purificador Neo?",               tags: ["Agua", "Filtración"] },
          { titulo: "¿Cómo verificar la garantía de mi producto?",                     tags: ["Garantía", "Registro"] },
          { titulo: "¿Qué es la tecnología UV LED + UF en Neo?",                       tags: ["Tecnología", "Filtración"] },
          { titulo: "Especificaciones técnicas del panel LED de 10.1\" y 15.6\"",      tags: ["Especificaciones", "Hardware"] },
          { titulo: "¿Qué modelo elegir: Neo FIT, SMART H₂ o ULTRA?",                 tags: ["Comparativo", "Guía"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "¿Cómo configurar el Wi-Fi en el purificador Neo?",       tags: ["Wi-Fi", "Configuración"] },
          { titulo: "¿Cómo usar la aplicación Acquafy en el celular?",        tags: ["App", "Tutorial"] },
          { titulo: "¿Qué es el soporte por IA 24/7?",                        tags: ["IA", "Soporte"] },
          { titulo: "¿Cómo monitorear la calidad del agua por la app?",       tags: ["IoT", "Monitoreo"] },
          { titulo: "Compatibilidad con iOS y Android",                       tags: ["App", "Compatibilidad"] },
          { titulo: "Configuración del Bluetooth 5.3 para control local",     tags: ["Bluetooth", "Configuración"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "¿Cómo funciona el sistema de anuncios en pantalla?",    tags: ["Anuncios", "Ingresos"] },
          { titulo: "¿Cómo registrar una campaña en Acquafy Media?",         tags: ["Campaña", "Tutorial"] },
          { titulo: "¿Qué es el QR Code de campaña y cómo usarlo?",          tags: ["QR Code", "Marketing"] },
          { titulo: "¿Cómo calcular los ingresos recurrentes con Media?",    tags: ["Ingresos", "Negocio"] },
          { titulo: "Formatos y dimensiones aceptados para anuncios",        tags: ["Diseño", "Especificaciones"] },
          { titulo: "Informes de rendimiento de campaña",                    tags: ["Analytics", "Informe"] },
        ],
      },
      {
        title: "Socios",
        artigos: [
          { titulo: "¿Cómo convertirse en socio Silver de Acquafy?",         tags: ["Silver", "Registro"] },
          { titulo: "¿Cuáles son los beneficios del plan Gold Partner?",     tags: ["Gold", "Beneficios"] },
          { titulo: "Modelo Platinum: distribuidor regional Acquafy",        tags: ["Platinum", "Distribución"] },
          { titulo: "Comisiones por nivel de sociedad (20% a 70%)",          tags: ["Comisión", "Financiero"] },
          { titulo: "Materiales de apoyo para ventas y entrenamientos",      tags: ["Marketing", "Entrenamiento"] },
          { titulo: "¿Cómo operar la red Silver siendo Gold Partner?",       tags: ["Gold", "Red"] },
        ],
      },
      {
        title: "Facturación",
        artigos: [
          { titulo: "¿Cómo emitir una copia de la factura?",                 tags: ["Factura", "Financiero"] },
          { titulo: "Plazo para recibir comisiones",                         tags: ["Comisión", "Pago"] },
          { titulo: "Métodos de pago aceptados por Acquafy",                 tags: ["Pago", "Métodos"] },
          { titulo: "¿Cómo hacer seguimiento al estado de mi pedido?",       tags: ["Pedido", "Seguimiento"] },
          { titulo: "Política de reembolso y cancelación",                   tags: ["Reembolso", "Política"] },
          { titulo: "Factura y documentación fiscal internacional",          tags: ["Fiscal", "Internacional"] },
        ],
      },
      {
        title: "Instalación y Mantenimiento",
        artigos: [
          { titulo: "Paso a paso: instalación del purificador Neo",          tags: ["Instalación", "Tutorial"] },
          { titulo: "¿Con qué frecuencia cambiar el filtro? (365 días)",     tags: ["Filtro", "Mantenimiento"] },
          { titulo: "¿Cómo realizar la limpieza preventiva?",                tags: ["Limpieza", "Preventiva"] },
          { titulo: "Solución de problemas: purificador sin energía",        tags: ["Problema", "Eléctrico"] },
          { titulo: "Cambio de filtro: reposición inteligente vía app",      tags: ["Filtro", "App"] },
          { titulo: "Mantenimiento del depósito y componentes internos",     tags: ["Mantenimiento", "Hardware"] },
        ],
      },
    ],
  },
  fr: {
    heading: "Articles",
    headingHighlight: "à la une",
    subtitle: "Les contenus les plus consultés organisés par catégorie.",
    verTodos: "Voir tous les articles",
    categorias: [
      {
        title: "Produits",
        artigos: [
          { titulo: "Quelle est la différence entre Neo Essentials et Premium ?", tags: ["Gamme Neo", "Comparatif"] },
          { titulo: "Quels types d'eau le purificateur Neo fournit-il ?",          tags: ["Eau", "Filtration"] },
          { titulo: "Comment vérifier la garantie de mon produit ?",              tags: ["Garantie", "Inscription"] },
          { titulo: "Qu'est-ce que la technologie UV LED + UF dans Neo ?",        tags: ["Technologie", "Filtration"] },
          { titulo: "Caractéristiques techniques des panneaux LED 10.1\" et 15.6\"", tags: ["Spécifications", "Hardware"] },
          { titulo: "Quel modèle choisir : Neo FIT, SMART H₂ ou ULTRA ?",        tags: ["Comparatif", "Guide"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "Comment configurer le Wi-Fi sur le purificateur Neo ?",    tags: ["Wi-Fi", "Configuration"] },
          { titulo: "Comment utiliser l'application Acquafy sur son téléphone ?", tags: ["App", "Tutoriel"] },
          { titulo: "Qu'est-ce que le support IA 24h/24 ?",                     tags: ["IA", "Support"] },
          { titulo: "Comment surveiller la qualité de l'eau via l'app ?",       tags: ["IoT", "Surveillance"] },
          { titulo: "Compatibilité avec iOS et Android",                        tags: ["App", "Compatibilité"] },
          { titulo: "Configuration du Bluetooth 5.3 pour le contrôle local",    tags: ["Bluetooth", "Configuration"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "Comment fonctionne le système de publicités sur écran ?",   tags: ["Publicités", "Revenus"] },
          { titulo: "Comment enregistrer une campagne dans Acquafy Media ?",     tags: ["Campagne", "Tutoriel"] },
          { titulo: "Qu'est-ce que le QR Code de campagne et comment l'utiliser ?", tags: ["QR Code", "Marketing"] },
          { titulo: "Comment calculer les revenus récurrents avec Media ?",      tags: ["Revenus", "Business"] },
          { titulo: "Formats et dimensions acceptés pour les publicités",        tags: ["Design", "Spécifications"] },
          { titulo: "Rapports de performance des campagnes",                     tags: ["Analytics", "Rapport"] },
        ],
      },
      {
        title: "Partenaires",
        artigos: [
          { titulo: "Comment devenir un partenaire Silver d'Acquafy ?",          tags: ["Silver", "Inscription"] },
          { titulo: "Quels sont les avantages du plan Gold Partner ?",           tags: ["Gold", "Avantages"] },
          { titulo: "Modèle Platinum : distributeur régional Acquafy",           tags: ["Platinum", "Distribution"] },
          { titulo: "Commissions par niveau de partenariat (20 % à 70 %)",       tags: ["Commission", "Finance"] },
          { titulo: "Supports de vente et de formation",                         tags: ["Marketing", "Formation"] },
          { titulo: "Comment gérer le réseau Silver en tant que Gold Partner ?", tags: ["Gold", "Réseau"] },
        ],
      },
      {
        title: "Facturation",
        artigos: [
          { titulo: "Comment obtenir un duplicata de facture ?",                 tags: ["Facture", "Finance"] },
          { titulo: "Délai de versement des commissions",                        tags: ["Commission", "Paiement"] },
          { titulo: "Modes de paiement acceptés par Acquafy",                   tags: ["Paiement", "Méthodes"] },
          { titulo: "Comment suivre le statut de ma commande ?",                tags: ["Commande", "Suivi"] },
          { titulo: "Politique de remboursement et d'annulation",               tags: ["Remboursement", "Politique"] },
          { titulo: "Facture et documentation fiscale internationale",           tags: ["Fiscal", "International"] },
        ],
      },
      {
        title: "Installation et Maintenance",
        artigos: [
          { titulo: "Étape par étape : installation du purificateur Neo",        tags: ["Installation", "Tutoriel"] },
          { titulo: "À quelle fréquence changer le filtre ? (365 jours)",       tags: ["Filtre", "Maintenance"] },
          { titulo: "Comment effectuer le nettoyage préventif ?",               tags: ["Nettoyage", "Préventif"] },
          { titulo: "Dépannage : purificateur sans alimentation",               tags: ["Problème", "Électrique"] },
          { titulo: "Remplacement du filtre : remplacement intelligent via app", tags: ["Filtre", "App"] },
          { titulo: "Entretien du réservoir et des composants internes",        tags: ["Maintenance", "Hardware"] },
        ],
      },
    ],
  },
  de: {
    heading: "Artikel",
    headingHighlight: "im Fokus",
    subtitle: "Die meistgenutzten Inhalte nach Kategorie geordnet.",
    verTodos: "Alle Artikel ansehen",
    categorias: [
      {
        title: "Produkte",
        artigos: [
          { titulo: "Was ist der Unterschied zwischen Neo Essentials und Premium?", tags: ["Neo-Reihe", "Vergleich"] },
          { titulo: "Welche Wasserarten liefert der Neo Purifier?",                 tags: ["Wasser", "Filtration"] },
          { titulo: "Wie prüfe ich die Garantie meines Produkts?",                 tags: ["Garantie", "Registrierung"] },
          { titulo: "Was ist die UV LED + UF-Technologie in Neo?",                  tags: ["Technologie", "Filtration"] },
          { titulo: "Technische Daten des 10,1\" und 15,6\" LED-Panels",            tags: ["Spezifikationen", "Hardware"] },
          { titulo: "Welches Modell wählen: Neo FIT, SMART H₂ oder ULTRA?",        tags: ["Vergleich", "Leitfaden"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "Wie richte ich WLAN am Neo Purifier ein?",               tags: ["WLAN", "Einrichtung"] },
          { titulo: "Wie nutze ich die Acquafy App auf dem Smartphone?",       tags: ["App", "Tutorial"] },
          { titulo: "Was ist der 24/7 KI-Support?",                           tags: ["KI", "Support"] },
          { titulo: "Wie überwache ich die Wasserqualität per App?",          tags: ["IoT", "Überwachung"] },
          { titulo: "Kompatibilität mit iOS und Android",                     tags: ["App", "Kompatibilität"] },
          { titulo: "Bluetooth 5.3 für lokale Steuerung einrichten",          tags: ["Bluetooth", "Einrichtung"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "Wie funktioniert das On-Screen-Werbesystem?",             tags: ["Werbung", "Umsatz"] },
          { titulo: "Wie registriere ich eine Kampagne in Acquafy Media?",    tags: ["Kampagne", "Tutorial"] },
          { titulo: "Was ist der Kampagnen-QR-Code und wie nutze ich ihn?",   tags: ["QR-Code", "Marketing"] },
          { titulo: "Wie berechne ich wiederkehrende Einnahmen mit Media?",   tags: ["Umsatz", "Business"] },
          { titulo: "Akzeptierte Formate und Abmessungen für Werbung",        tags: ["Design", "Spezifikationen"] },
          { titulo: "Kampagnen-Performance-Berichte",                         tags: ["Analytics", "Bericht"] },
        ],
      },
      {
        title: "Partner",
        artigos: [
          { titulo: "Wie werde ich Acquafy Silver-Partner?",                  tags: ["Silver", "Registrierung"] },
          { titulo: "Was sind die Vorteile des Gold Partner Plans?",          tags: ["Gold", "Vorteile"] },
          { titulo: "Platinum-Modell: regionaler Acquafy-Distributor",        tags: ["Platinum", "Distribution"] },
          { titulo: "Provisionen nach Partnerschaftsstufe (20 % bis 70 %)",   tags: ["Provision", "Finanzen"] },
          { titulo: "Vertriebs- und Trainingsmaterialien",                    tags: ["Marketing", "Training"] },
          { titulo: "Wie betreibe ich das Silver-Netzwerk als Gold Partner?", tags: ["Gold", "Netzwerk"] },
        ],
      },
      {
        title: "Abrechnung",
        artigos: [
          { titulo: "Wie erhalte ich ein Duplikat meiner Rechnung?",          tags: ["Rechnung", "Finanzen"] },
          { titulo: "Zeitplan für Provisionszahlungen",                       tags: ["Provision", "Zahlung"] },
          { titulo: "Von Acquafy akzeptierte Zahlungsmethoden",               tags: ["Zahlung", "Methoden"] },
          { titulo: "Wie verfolge ich meinen Bestellstatus?",                 tags: ["Bestellung", "Tracking"] },
          { titulo: "Rückgabe- und Stornierungsrichtlinie",                   tags: ["Rückgabe", "Richtlinie"] },
          { titulo: "Rechnung und internationale Steuerdokumentation",        tags: ["Steuer", "International"] },
        ],
      },
      {
        title: "Installation & Wartung",
        artigos: [
          { titulo: "Schritt für Schritt: Neo Purifier-Installation",         tags: ["Installation", "Tutorial"] },
          { titulo: "Wie oft den Filter wechseln? (365 Tage)",               tags: ["Filter", "Wartung"] },
          { titulo: "Wie führe ich die Vorbeugereinigung durch?",            tags: ["Reinigung", "Vorbeugend"] },
          { titulo: "Fehlerbehebung: Purifier ohne Strom",                   tags: ["Problem", "Elektrisch"] },
          { titulo: "Filterwechsel: intelligenter Austausch per App",         tags: ["Filter", "App"] },
          { titulo: "Wartung des Behälters und der internen Komponenten",     tags: ["Wartung", "Hardware"] },
        ],
      },
    ],
  },
  it: {
    heading: "Articoli",
    headingHighlight: "in evidenza",
    subtitle: "I contenuti più consultati organizzati per categoria.",
    verTodos: "Vedi tutti gli articoli",
    categorias: [
      {
        title: "Prodotti",
        artigos: [
          { titulo: "Qual è la differenza tra Neo Essentials e Premium?",         tags: ["Linea Neo", "Confronto"] },
          { titulo: "Che tipi di acqua eroga il purificatore Neo?",               tags: ["Acqua", "Filtrazione"] },
          { titulo: "Come verificare la garanzia del mio prodotto?",             tags: ["Garanzia", "Registrazione"] },
          { titulo: "Cos'è la tecnologia UV LED + UF in Neo?",                   tags: ["Tecnologia", "Filtrazione"] },
          { titulo: "Specifiche tecniche del pannello LED 10.1\" e 15.6\"",      tags: ["Specifiche", "Hardware"] },
          { titulo: "Quale modello scegliere: Neo FIT, SMART H₂ o ULTRA?",      tags: ["Confronto", "Guida"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "Come configurare il Wi-Fi sul purificatore Neo?",           tags: ["Wi-Fi", "Configurazione"] },
          { titulo: "Come usare l'app Acquafy sullo smartphone?",               tags: ["App", "Tutorial"] },
          { titulo: "Cos'è il supporto AI 24/7?",                               tags: ["IA", "Supporto"] },
          { titulo: "Come monitorare la qualità dell'acqua tramite l'app?",     tags: ["IoT", "Monitoraggio"] },
          { titulo: "Compatibilità con iOS e Android",                          tags: ["App", "Compatibilità"] },
          { titulo: "Configurazione del Bluetooth 5.3 per il controllo locale", tags: ["Bluetooth", "Configurazione"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "Come funziona il sistema di annunci sullo schermo?",        tags: ["Annunci", "Ricavi"] },
          { titulo: "Come registrare una campagna in Acquafy Media?",            tags: ["Campagna", "Tutorial"] },
          { titulo: "Cos'è il QR Code di campagna e come usarlo?",              tags: ["QR Code", "Marketing"] },
          { titulo: "Come calcolare i ricavi ricorrenti con Media?",            tags: ["Ricavi", "Business"] },
          { titulo: "Formati e dimensioni accettati per gli annunci",           tags: ["Design", "Specifiche"] },
          { titulo: "Report sulle performance delle campagne",                  tags: ["Analytics", "Report"] },
        ],
      },
      {
        title: "Partner",
        artigos: [
          { titulo: "Come diventare un partner Silver di Acquafy?",             tags: ["Silver", "Registrazione"] },
          { titulo: "Quali sono i vantaggi del piano Gold Partner?",            tags: ["Gold", "Vantaggi"] },
          { titulo: "Modello Platinum: distributore regionale Acquafy",         tags: ["Platinum", "Distribuzione"] },
          { titulo: "Commissioni per livello di partnership (20% a 70%)",       tags: ["Commissione", "Finanza"] },
          { titulo: "Materiali di supporto per vendite e formazione",           tags: ["Marketing", "Formazione"] },
          { titulo: "Come gestire la rete Silver come Gold Partner?",           tags: ["Gold", "Rete"] },
        ],
      },
      {
        title: "Fatturazione",
        artigos: [
          { titulo: "Come ottenere un duplicato della fattura?",                tags: ["Fattura", "Finanza"] },
          { titulo: "Tempistica di pagamento delle commissioni",               tags: ["Commissione", "Pagamento"] },
          { titulo: "Metodi di pagamento accettati da Acquafy",                tags: ["Pagamento", "Metodi"] },
          { titulo: "Come tracciare lo stato del mio ordine?",                 tags: ["Ordine", "Tracciamento"] },
          { titulo: "Politica di rimborso e cancellazione",                    tags: ["Rimborso", "Politica"] },
          { titulo: "Fattura e documentazione fiscale internazionale",         tags: ["Fiscale", "Internazionale"] },
        ],
      },
      {
        title: "Installazione e Manutenzione",
        artigos: [
          { titulo: "Passo dopo passo: installazione del purificatore Neo",    tags: ["Installazione", "Tutorial"] },
          { titulo: "Con quale frequenza sostituire il filtro? (365 giorni)", tags: ["Filtro", "Manutenzione"] },
          { titulo: "Come eseguire la pulizia preventiva?",                   tags: ["Pulizia", "Preventiva"] },
          { titulo: "Risoluzione problemi: purificatore senza alimentazione", tags: ["Problema", "Elettrico"] },
          { titulo: "Sostituzione filtro: ricambio intelligente via app",     tags: ["Filtro", "App"] },
          { titulo: "Manutenzione del serbatoio e dei componenti interni",    tags: ["Manutenzione", "Hardware"] },
        ],
      },
    ],
  },
  zh: {
    heading: "精选",
    headingHighlight: "文章",
    subtitle: "按类别整理的最多访问内容。",
    verTodos: "查看所有文章",
    categorias: [
      {
        title: "产品",
        artigos: [
          { titulo: "Neo Essentials 与 Premium 系列有何区别？",          tags: ["Neo 系列", "对比"] },
          { titulo: "Neo 净水器提供哪些类型的水？",                       tags: ["水质", "过滤"] },
          { titulo: "如何查看我的产品保修？",                             tags: ["保修", "注册"] },
          { titulo: "Neo 中的 UV LED + UF 技术是什么？",                 tags: ["技术", "过滤"] },
          { titulo: "10.1\" 和 15.6\" LED 面板技术规格",                 tags: ["规格", "硬件"] },
          { titulo: "如何选择型号：Neo FIT、SMART H₂ 还是 ULTRA？",     tags: ["对比", "指南"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "如何在 Neo 净水器上设置 Wi-Fi？",         tags: ["Wi-Fi", "设置"] },
          { titulo: "如何在手机上使用 Acquafy 应用？",         tags: ["App", "教程"] },
          { titulo: "什么是 24/7 AI 支持？",                  tags: ["AI", "支持"] },
          { titulo: "如何通过 App 监测水质？",                tags: ["IoT", "监测"] },
          { titulo: "与 iOS 和 Android 的兼容性",             tags: ["App", "兼容性"] },
          { titulo: "Bluetooth 5.3 本地控制设置",             tags: ["蓝牙", "设置"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "屏幕广告系统如何运作？",                    tags: ["广告", "收益"] },
          { titulo: "如何在 Acquafy Media 中注册广告活动？",    tags: ["活动", "教程"] },
          { titulo: "活动二维码是什么以及如何使用？",            tags: ["二维码", "营销"] },
          { titulo: "如何计算 Media 的周期性收益？",           tags: ["收益", "商业"] },
          { titulo: "广告接受的格式和尺寸",                    tags: ["设计", "规格"] },
          { titulo: "广告活动绩效报告",                        tags: ["分析", "报告"] },
        ],
      },
      {
        title: "合作伙伴",
        artigos: [
          { titulo: "如何成为 Acquafy Silver 合作伙伴？",        tags: ["Silver", "注册"] },
          { titulo: "Gold Partner 计划的好处是什么？",           tags: ["Gold", "福利"] },
          { titulo: "Platinum 模式：Acquafy 区域经销商",        tags: ["Platinum", "分销"] },
          { titulo: "按合作级别的佣金（20% 至 70%）",            tags: ["佣金", "财务"] },
          { titulo: "销售和培训支持材料",                       tags: ["营销", "培训"] },
          { titulo: "作为 Gold Partner 如何运营 Silver 网络？", tags: ["Gold", "网络"] },
        ],
      },
      {
        title: "账单",
        artigos: [
          { titulo: "如何获取发票副本？",           tags: ["发票", "财务"] },
          { titulo: "佣金支付时间表",               tags: ["佣金", "支付"] },
          { titulo: "Acquafy 接受的支付方式",       tags: ["支付", "方式"] },
          { titulo: "如何跟踪我的订单状态？",       tags: ["订单", "跟踪"] },
          { titulo: "退款和取消政策",               tags: ["退款", "政策"] },
          { titulo: "发票和国际税务文件",           tags: ["税务", "国际"] },
        ],
      },
      {
        title: "安装与维护",
        artigos: [
          { titulo: "分步说明：Neo 净水器安装",          tags: ["安装", "教程"] },
          { titulo: "多久更换一次滤芯？（365 天）",      tags: ["滤芯", "维护"] },
          { titulo: "如何进行预防性清洁？",              tags: ["清洁", "预防"] },
          { titulo: "故障排除：净水器无电源",            tags: ["问题", "电气"] },
          { titulo: "滤芯更换：通过 App 智能补货",       tags: ["滤芯", "App"] },
          { titulo: "水箱及内部部件的维护",              tags: ["维护", "硬件"] },
        ],
      },
    ],
  },
  ja: {
    heading: "注目の",
    headingHighlight: "記事",
    subtitle: "カテゴリ別に整理された最もアクセスされたコンテンツ。",
    verTodos: "すべての記事を見る",
    categorias: [
      {
        title: "製品",
        artigos: [
          { titulo: "Neo Essentials と Premium の違いは何ですか？",         tags: ["Neo ライン", "比較"] },
          { titulo: "Neo 浄水器はどのような水を提供しますか？",             tags: ["水質", "ろ過"] },
          { titulo: "製品の保証を確認する方法は？",                         tags: ["保証", "登録"] },
          { titulo: "Neo の UV LED + UF 技術とは？",                       tags: ["技術", "ろ過"] },
          { titulo: "10.1\" および 15.6\" LED パネルの技術仕様",            tags: ["仕様", "ハードウェア"] },
          { titulo: "モデルの選び方：Neo FIT、SMART H₂、ULTRA？",         tags: ["比較", "ガイド"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "Neo 浄水器で Wi-Fi を設定する方法は？",               tags: ["Wi-Fi", "設定"] },
          { titulo: "スマートフォンで Acquafy アプリを使用する方法は？",   tags: ["App", "チュートリアル"] },
          { titulo: "24/7 AI サポートとは何ですか？",                     tags: ["AI", "サポート"] },
          { titulo: "アプリで水質を監視する方法は？",                      tags: ["IoT", "監視"] },
          { titulo: "iOS および Android との互換性",                       tags: ["App", "互換性"] },
          { titulo: "ローカル制御のための Bluetooth 5.3 設定",             tags: ["Bluetooth", "設定"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "画面上の広告システムはどのように機能しますか？",       tags: ["広告", "収益"] },
          { titulo: "Acquafy Media にキャンペーンを登録する方法は？",      tags: ["キャンペーン", "チュートリアル"] },
          { titulo: "キャンペーン QR コードとは何か、使い方は？",          tags: ["QR コード", "マーケティング"] },
          { titulo: "Media で繰り返し収益を計算する方法は？",              tags: ["収益", "ビジネス"] },
          { titulo: "広告に使用できる形式とサイズ",                        tags: ["デザイン", "仕様"] },
          { titulo: "キャンペーンパフォーマンスレポート",                  tags: ["アナリティクス", "レポート"] },
        ],
      },
      {
        title: "パートナー",
        artigos: [
          { titulo: "Acquafy Silver パートナーになる方法は？",              tags: ["Silver", "登録"] },
          { titulo: "Gold Partner プランのメリットは何ですか？",            tags: ["Gold", "特典"] },
          { titulo: "Platinum モデル：Acquafy 地域ディストリビューター",   tags: ["Platinum", "流通"] },
          { titulo: "パートナーシップレベル別コミッション（20% 〜 70%）",   tags: ["コミッション", "財務"] },
          { titulo: "営業・トレーニング用サポート資料",                    tags: ["マーケティング", "トレーニング"] },
          { titulo: "Gold Partner として Silver ネットワークを運営する方法は？", tags: ["Gold", "ネットワーク"] },
        ],
      },
      {
        title: "請求",
        artigos: [
          { titulo: "請求書の再発行方法は？",              tags: ["請求書", "財務"] },
          { titulo: "コミッション支払いのスケジュール",     tags: ["コミッション", "支払い"] },
          { titulo: "Acquafy が受け付ける支払い方法",       tags: ["支払い", "方法"] },
          { titulo: "注文状況の確認方法は？",               tags: ["注文", "追跡"] },
          { titulo: "返金・キャンセルポリシー",             tags: ["返金", "ポリシー"] },
          { titulo: "請求書と国際税務書類",                 tags: ["税務", "国際"] },
        ],
      },
      {
        title: "設置とメンテナンス",
        artigos: [
          { titulo: "ステップバイステップ：Neo 浄水器の設置",            tags: ["設置", "チュートリアル"] },
          { titulo: "フィルター交換の頻度は？（365 日）",                tags: ["フィルター", "メンテナンス"] },
          { titulo: "予防清掃の方法は？",                               tags: ["清掃", "予防"] },
          { titulo: "トラブルシューティング：電源が入らない浄水器",      tags: ["問題", "電気"] },
          { titulo: "フィルター交換：App 経由のスマート補充",            tags: ["フィルター", "App"] },
          { titulo: "タンクおよび内部部品のメンテナンス",               tags: ["メンテナンス", "ハードウェア"] },
        ],
      },
    ],
  },
  ko: {
    heading: "주목할",
    headingHighlight: "기사",
    subtitle: "카테고리별로 정리된 가장 많이 액세스한 콘텐츠.",
    verTodos: "모든 기사 보기",
    categorias: [
      {
        title: "제품",
        artigos: [
          { titulo: "Neo Essentials와 Premium의 차이점은 무엇인가요?",      tags: ["Neo 라인", "비교"] },
          { titulo: "Neo 정수기는 어떤 종류의 물을 제공하나요?",             tags: ["수질", "여과"] },
          { titulo: "제품 보증을 확인하는 방법은?",                         tags: ["보증", "등록"] },
          { titulo: "Neo의 UV LED + UF 기술이란 무엇인가요?",               tags: ["기술", "여과"] },
          { titulo: "10.1\" 및 15.6\" LED 패널 기술 사양",                 tags: ["사양", "하드웨어"] },
          { titulo: "어떤 모델을 선택할까요: Neo FIT, SMART H₂ 또는 ULTRA?", tags: ["비교", "가이드"] },
        ],
      },
      {
        title: "App + AI + IoT",
        artigos: [
          { titulo: "Neo 정수기에서 Wi-Fi를 설정하는 방법은?",              tags: ["Wi-Fi", "설정"] },
          { titulo: "스마트폰에서 Acquafy 앱을 사용하는 방법은?",           tags: ["App", "튜토리얼"] },
          { titulo: "24/7 AI 지원이란 무엇인가요?",                        tags: ["AI", "지원"] },
          { titulo: "앱을 통해 수질을 모니터링하는 방법은?",               tags: ["IoT", "모니터링"] },
          { titulo: "iOS 및 Android 호환성",                              tags: ["App", "호환성"] },
          { titulo: "로컬 제어를 위한 Bluetooth 5.3 설정",                 tags: ["Bluetooth", "설정"] },
        ],
      },
      {
        title: "Media Network",
        artigos: [
          { titulo: "화면 광고 시스템은 어떻게 작동하나요?",               tags: ["광고", "수익"] },
          { titulo: "Acquafy Media에서 캠페인을 등록하는 방법은?",         tags: ["캠페인", "튜토리얼"] },
          { titulo: "캠페인 QR 코드란 무엇이며 어떻게 사용하나요?",        tags: ["QR 코드", "마케팅"] },
          { titulo: "Media로 반복 수익을 계산하는 방법은?",               tags: ["수익", "비즈니스"] },
          { titulo: "광고에 허용되는 형식 및 크기",                       tags: ["디자인", "사양"] },
          { titulo: "캠페인 성과 보고서",                                 tags: ["애널리틱스", "보고서"] },
        ],
      },
      {
        title: "파트너",
        artigos: [
          { titulo: "Acquafy Silver 파트너가 되는 방법은?",               tags: ["Silver", "등록"] },
          { titulo: "Gold Partner 플랜의 혜택은 무엇인가요?",              tags: ["Gold", "혜택"] },
          { titulo: "Platinum 모델: Acquafy 지역 유통업체",               tags: ["Platinum", "유통"] },
          { titulo: "파트너십 단계별 커미션 (20% ~ 70%)",                 tags: ["커미션", "재무"] },
          { titulo: "영업 및 교육을 위한 지원 자료",                      tags: ["마케팅", "교육"] },
          { titulo: "Gold Partner로서 Silver 네트워크를 운영하는 방법은?", tags: ["Gold", "네트워크"] },
        ],
      },
      {
        title: "청구",
        artigos: [
          { titulo: "청구서 사본을 받는 방법은?",            tags: ["청구서", "재무"] },
          { titulo: "커미션 지급 일정",                      tags: ["커미션", "결제"] },
          { titulo: "Acquafy가 허용하는 결제 방법",          tags: ["결제", "방법"] },
          { titulo: "주문 상태를 추적하는 방법은?",          tags: ["주문", "추적"] },
          { titulo: "환불 및 취소 정책",                     tags: ["환불", "정책"] },
          { titulo: "청구서 및 국제 세금 서류",              tags: ["세금", "국제"] },
        ],
      },
      {
        title: "설치 및 유지보수",
        artigos: [
          { titulo: "단계별 안내: Neo 정수기 설치",           tags: ["설치", "튜토리얼"] },
          { titulo: "필터를 얼마나 자주 교체해야 하나요? (365일)", tags: ["필터", "유지보수"] },
          { titulo: "예방 청소를 수행하는 방법은?",           tags: ["청소", "예방"] },
          { titulo: "문제 해결: 전원이 없는 정수기",          tags: ["문제", "전기"] },
          { titulo: "필터 교체: 앱을 통한 스마트 보충",       tags: ["필터", "App"] },
          { titulo: "탱크 및 내부 부품 유지보수",             tags: ["유지보수", "하드웨어"] },
        ],
      },
    ],
  },
};

type Artigo = {
  titulo: string;
  tags: string[];
  href: string;
};

type Categoria = {
  id: string;
  icon: string;
  aspectW: number;
  aspectH: number;
  title: string;
  cor: string;
  verTodosHref: string;
  artigos: Artigo[];
};

const categoriaBase = [
  {
    id: "produtos",
    icon: imgAguaPura,
    aspectW: 642.7, aspectH: 630.7,
    cor: "#0233c3",
    verTodosHref: "/artigos#produtos",
    hrefs: [
      "/artigos/produtos/diferenca-essentials-e-premium",
      "/artigos/produtos/tipos-de-agua-que-o-neo-fornece",
      "/artigos/produtos/como-verificar-garantia-do-produto",
      "/artigos/produtos/tecnologia-uv-led-uf-no-neo",
      "/artigos/produtos/especificacoes-painel-led-10-e-15",
      "/artigos/produtos/qual-modelo-escolher-fit-smart-ultra",
    ],
  },
  {
    id: "app-ai-iot",
    icon: imgMobile,
    aspectW: 21, aspectH: 30,
    cor: "#0569ff",
    verTodosHref: "/artigos#app-ai-iot",
    hrefs: [
      "/artigos/app-ai-iot/como-configurar-wifi-no-neo",
      "/artigos/app-ai-iot/como-usar-aplicativo-acquafy",
      "/artigos/app-ai-iot/o-que-e-suporte-ia-24-7",
      "/artigos/app-ai-iot/como-monitorar-qualidade-da-agua",
      "/artigos/app-ai-iot/compatibilidade-ios-android",
      "/artigos/app-ai-iot/configurar-bluetooth-5-3",
    ],
  },
  {
    id: "media-network",
    icon: imgMedia,
    aspectW: 30, aspectH: 30,
    cor: "#9f3df5",
    verTodosHref: "/artigos#media-network",
    hrefs: [
      "/artigos/media-network/como-funciona-sistema-de-anuncios",
      "/artigos/media-network/como-cadastrar-campanha-acquafy-media",
      "/artigos/media-network/o-que-e-qr-code-de-campanha",
      "/artigos/media-network/calcular-receita-recorrente-com-media",
      "/artigos/media-network/formatos-e-dimensoes-para-anuncios",
      "/artigos/media-network/relatorios-de-performance-campanha",
    ],
  },
  {
    id: "parceiros",
    icon: imgParceria,
    aspectW: 1125, aspectH: 1078,
    cor: "#1f2e91",
    verTodosHref: "/artigos#parceiros",
    hrefs: [
      "/artigos/parceiros/como-se-tornar-parceiro-silver",
      "/artigos/parceiros/beneficios-plano-gold-partner",
      "/artigos/parceiros/modelo-platinum-distribuidor-regional",
      "/artigos/parceiros/comissoes-por-nivel-de-parceria",
      "/artigos/parceiros/materiais-de-apoio-vendas-treinamentos",
      "/artigos/parceiros/operar-rede-silver-sendo-gold-partner",
    ],
  },
  {
    id: "faturamento",
    icon: imgMoney,
    aspectW: 33.3, aspectH: 30,
    cor: "#36ae5c",
    verTodosHref: "/artigos#faturamento",
    hrefs: [
      "/artigos/faturamento/como-emitir-segunda-via-de-fatura",
      "/artigos/faturamento/prazo-recebimento-comissoes",
      "/artigos/faturamento/formas-de-pagamento-aceitas",
      "/artigos/faturamento/acompanhar-status-do-pedido",
      "/artigos/faturamento/politica-de-reembolso-e-cancelamento",
      "/artigos/faturamento/nota-fiscal-documentacao-fiscal-internacional",
    ],
  },
  {
    id: "manutencao",
    icon: imgManutencao,
    aspectW: 30, aspectH: 30,
    cor: "#dfa727",
    verTodosHref: "/artigos#instalacao-e-manutencao",
    hrefs: [
      "/artigos/instalacao-e-manutencao/instalacao-passo-a-passo-purificador-neo",
      "/artigos/instalacao-e-manutencao/frequencia-troca-filtro-365-dias",
      "/artigos/instalacao-e-manutencao/como-realizar-limpeza-preventiva",
      "/artigos/instalacao-e-manutencao/solucao-problemas-purificador-sem-energia",
      "/artigos/instalacao-e-manutencao/troca-filtro-reposicao-inteligente-via-app",
      "/artigos/instalacao-e-manutencao/manutencao-reservatorio-componentes-internos",
    ],
  },
];

export default function ArtigosBK() {
  const { lang } = useLang();
  const t = T[lang];

  const categorias: Categoria[] = categoriaBase.map((base, ci) => ({
    id: base.id,
    icon: base.icon,
    aspectW: base.aspectW,
    aspectH: base.aspectH,
    cor: base.cor,
    verTodosHref: base.verTodosHref,
    title: t.categorias[ci].title,
    artigos: base.hrefs.map((href, ai) => ({
      href,
      titulo: t.categorias[ci].artigos[ai].titulo,
      tags:   t.categorias[ci].artigos[ai].tags,
    })),
  }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Section header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading}{" "}
            <span className="text-[#0569ff]">{t.headingHighlight}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[32px] w-full">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              id={cat.id}
              className="flex flex-col gap-[20px] w-full scroll-mt-[80px]"
            >
              {/* Category header */}
              <div className="flex gap-[12px] items-center border-b border-[#e8edf5] pb-[16px]">
                <div className="bg-[#f6f9fe] flex flex-col items-center justify-center p-[10px] rounded-full shrink-0 size-[44px]">
                  <FigmaIcon src={cat.icon} size={22} aspectW={cat.aspectW} aspectH={cat.aspectH} />
                </div>
                <h3
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px]"
                  style={{ color: cat.cor }}
                >
                  {cat.title}
                </h3>
              </div>

              {/* Article list */}
              <ul className="flex flex-col gap-[4px] list-none m-0 p-0">
                {cat.artigos.map((artigo) => (
                  <li key={artigo.href}>
                    <a
                      href={artigo.href}
                      className="group flex gap-[10px] items-start px-[12px] py-[10px] rounded-[8px]
                        hover:bg-[#f6f9fe] transition-colors no-underline"
                    >
                      <span
                        className="mt-[7px] shrink-0 size-[6px] rounded-full"
                        style={{ backgroundColor: cat.cor, opacity: 0.5 }}
                      />
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[20px] text-[#333] group-hover:text-[#0233c3] transition-colors flex-1">
                        {artigo.titulo}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Ver todos link */}
              <a
                href={cat.verTodosHref}
                className="flex gap-[5px] items-center mt-[4px] px-[12px] no-underline group"
              >
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
                  {t.verTodos}
                </span>
                <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
