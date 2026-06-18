"use client";

import { useState } from "react";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  h2plain: string;
  h2highlight: string;
  subtitle: string;
  faqs: { pergunta: string; resposta: string }[];
}> = {
  pt: {
    h2plain: "Perguntas ",
    h2highlight: "frequentes",
    subtitle: "Respostas rápidas para as dúvidas mais comuns sobre os produtos e serviços Acquafy.",
    faqs: [
      {
        pergunta: "Qual é a diferença entre os modelos Neo Essentials e Neo Premium?",
        resposta: "A linha Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e variantes) possui painel LED 10.1\" e é focada em custo-benefício com tecnologia UV LED + UF. A linha Neo Premium (INFINITY, PRESTIGE e PRIME) conta com painel IPS 15.6\", filtração por Osmose Reversa (RO) e acabamento de alto padrão. Todos os modelos possuem conectividade Wi-Fi 5 e Bluetooth 5.3.",
      },
      {
        pergunta: "Como faço para baixar e configurar o aplicativo Acquafy?",
        resposta: "O aplicativo Acquafy está disponível na App Store (iOS) e Google Play (Android). Após instalar, crie sua conta, aproxime o smartphone do purificador via Bluetooth 5.3 para emparelhar e siga o assistente de configuração de Wi-Fi. O processo leva menos de 5 minutos.",
      },
      {
        pergunta: "Com que frequência devo trocar o filtro do purificador?",
        resposta: "Os filtros Neo têm vida útil de 365 dias ou conforme o consumo de água. O aplicativo Acquafy monitora em tempo real o ciclo do filtro e envia alertas quando a troca se aproxima. O sistema de Reposição Inteligente pode fazer o pedido automaticamente pelo app.",
      },
      {
        pergunta: "Como me tornar um parceiro Acquafy?",
        resposta: "Existem três níveis de parceria: Silver (afiliado/indicador, comissão de 20%, sem investimento inicial), Gold (operador Acquafy Media, comissão de 20% em vendas + receita de anúncios, entrada a partir de US$2.000) e Platinum (distribuidor regional, desconto de 70% no preço USA, modelo FOB). Acesse a página de Parceiros no site ou entre em contato com nossa equipe.",
      },
      {
        pergunta: "O que é a Acquafy Media e como gera receita recorrente?",
        resposta: "A Acquafy Media é um sistema de mídia integrado ao painel touchscreen dos purificadores Neo. Negócios locais podem anunciar no display e os parceiros Gold ganham receita mensal por cada anúncio exibido. Os usuários também interagem via QR Code nas campanhas, gerando dados de engajamento.",
      },
      {
        pergunta: "O purificador Neo funciona com água de poço ou apenas água de rede?",
        resposta: "Os modelos da linha Essentials são indicados para água de rede (com pressão de 20 a 80 PSI). A linha Premium com tecnologia RO (Osmose Reversa) pode tratar água com maior variação de qualidade. Para situações específicas como água de poço, recomendamos contato com um especialista técnico para avaliação.",
      },
      {
        pergunta: "Qual o prazo de garantia dos produtos Acquafy?",
        resposta: "Os purificadores Neo possuem garantia de 1 ano contra defeitos de fabricação. O registro de garantia deve ser feito pelo aplicativo Acquafy ou pelo portal de suporte. Defeitos causados por instalação incorreta, uso inadequado ou manutenção negligenciada não são cobertos pela garantia.",
      },
      {
        pergunta: "Em quantos países a Acquafy opera?",
        resposta: "A Acquafy está presente em mais de 180 países, com operação 100% global e suporte disponível em 16 idiomas. O modelo de negócio permite que parceiros distribuidores regionais operem localmente com suporte da plataforma central.",
      },
    ],
  },
  "pt-pt": {
    h2plain: "Perguntas ",
    h2highlight: "frequentes",
    subtitle: "Respostas rápidas para as dúvidas mais comuns sobre os produtos e serviços Acquafy.",
    faqs: [
      {
        pergunta: "Qual é a diferença entre os modelos Neo Essentials e Neo Premium?",
        resposta: "A linha Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e variantes) possui painel LED 10.1\" e está focada na relação qualidade-preço com tecnologia UV LED + UF. A linha Neo Premium (INFINITY, PRESTIGE e PRIME) conta com painel IPS 15.6\", filtração por Osmose Inversa (RO) e acabamento de alto padrão. Todos os modelos possuem conectividade Wi-Fi 5 e Bluetooth 5.3.",
      },
      {
        pergunta: "Como posso transferir e configurar a aplicação Acquafy?",
        resposta: "A aplicação Acquafy está disponível na App Store (iOS) e no Google Play (Android). Após instalar, crie a sua conta, aproxime o telemóvel do purificador via Bluetooth 5.3 para emparelhar e siga o assistente de configuração de Wi-Fi. O processo demora menos de 5 minutos.",
      },
      {
        pergunta: "Com que frequência devo trocar o filtro do purificador?",
        resposta: "Os filtros Neo têm uma vida útil de 365 dias ou de acordo com o consumo de água. A aplicação Acquafy monitoriza em tempo real o ciclo do filtro e envia alertas quando a troca se aproxima. O sistema de Reposição Inteligente pode efetuar o pedido automaticamente através da aplicação.",
      },
      {
        pergunta: "Como me tornar parceiro Acquafy?",
        resposta: "Existem três níveis de parceria: Silver (afiliado/indicador, comissão de 20%, sem investimento inicial), Gold (operador Acquafy Media, comissão de 20% em vendas + receita de anúncios, entrada a partir de US$2.000) e Platinum (distribuidor regional, desconto de 70% no preço USA, modelo FOB). Aceda à página de Parceiros no site ou entre em contacto com a nossa equipa.",
      },
      {
        pergunta: "O que é a Acquafy Media e como gera receita recorrente?",
        resposta: "A Acquafy Media é um sistema de media integrado no painel touchscreen dos purificadores Neo. Negócios locais podem anunciar no ecrã e os parceiros Gold recebem receita mensal por cada anúncio exibido. Os utilizadores interagem também via QR Code nas campanhas, gerando dados de envolvimento.",
      },
      {
        pergunta: "O purificador Neo funciona com água de furo ou apenas com água de rede?",
        resposta: "Os modelos da linha Essentials são indicados para água de rede (com pressão de 20 a 80 PSI). A linha Premium com tecnologia RO (Osmose Inversa) pode tratar água com maior variação de qualidade. Para situações específicas como água de furo, recomendamos o contacto com um especialista técnico para avaliação.",
      },
      {
        pergunta: "Qual o prazo de garantia dos produtos Acquafy?",
        resposta: "Os purificadores Neo possuem garantia de 1 ano contra defeitos de fabrico. O registo de garantia deve ser efetuado através da aplicação Acquafy ou do portal de suporte. Defeitos causados por instalação incorreta, uso inadequado ou manutenção negligenciada não são abrangidos pela garantia.",
      },
      {
        pergunta: "Em quantos países a Acquafy opera?",
        resposta: "A Acquafy está presente em mais de 180 países, com operação 100% global e suporte disponível em 16 idiomas. O modelo de negócio permite que parceiros distribuidores regionais operem localmente com o suporte da plataforma central.",
      },
    ],
  },
  en: {
    h2plain: "Frequently ",
    h2highlight: "Asked Questions",
    subtitle: "Quick answers to the most common questions about Acquafy products and services.",
    faqs: [
      {
        pergunta: "What is the difference between the Neo Essentials and Neo Premium models?",
        resposta: "The Neo Essentials line (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX and variants) features a 10.1\" LED panel and focuses on cost-effectiveness with UV LED + UF technology. The Neo Premium line (INFINITY, PRESTIGE and PRIME) comes with a 15.6\" IPS panel, Reverse Osmosis (RO) filtration and premium finish. All models have Wi-Fi 5 and Bluetooth 5.3 connectivity.",
      },
      {
        pergunta: "How do I download and set up the Acquafy app?",
        resposta: "The Acquafy app is available on the App Store (iOS) and Google Play (Android). After installing, create your account, bring your smartphone close to the purifier via Bluetooth 5.3 to pair, and follow the Wi-Fi setup wizard. The process takes less than 5 minutes.",
      },
      {
        pergunta: "How often should I replace the purifier filter?",
        resposta: "Neo filters have a lifespan of 365 days or according to water consumption. The Acquafy app monitors the filter cycle in real time and sends alerts when replacement is approaching. The Smart Replenishment system can automatically place the order through the app.",
      },
      {
        pergunta: "How do I become an Acquafy partner?",
        resposta: "There are three partnership levels: Silver (affiliate/referral, 20% commission, no initial investment), Gold (Acquafy Media operator, 20% commission on sales + ad revenue, starting from US$2,000) and Platinum (regional distributor, 70% discount on US price, FOB model). Visit the Partners page on the website or contact our team.",
      },
      {
        pergunta: "What is Acquafy Media and how does it generate recurring revenue?",
        resposta: "Acquafy Media is a media system integrated into the touchscreen panel of Neo purifiers. Local businesses can advertise on the display and Gold partners earn monthly revenue for each ad shown. Users also interact via QR Code in campaigns, generating engagement data.",
      },
      {
        pergunta: "Does the Neo purifier work with well water or only tap water?",
        resposta: "Essentials line models are designed for tap water (with pressure from 20 to 80 PSI). The Premium line with RO (Reverse Osmosis) technology can treat water with greater quality variation. For specific situations such as well water, we recommend contacting a technical specialist for evaluation.",
      },
      {
        pergunta: "What is the warranty period for Acquafy products?",
        resposta: "Neo purifiers have a 1-year warranty against manufacturing defects. Warranty registration must be done through the Acquafy app or the support portal. Defects caused by incorrect installation, improper use or neglected maintenance are not covered by the warranty.",
      },
      {
        pergunta: "In how many countries does Acquafy operate?",
        resposta: "Acquafy is present in more than 180 countries, with 100% global operations and support available in 16 languages. The business model allows regional distributor partners to operate locally with support from the central platform.",
      },
    ],
  },
  es: {
    h2plain: "Preguntas ",
    h2highlight: "Frecuentes",
    subtitle: "Respuestas rápidas a las dudas más comunes sobre los productos y servicios Acquafy.",
    faqs: [
      {
        pergunta: "¿Cuál es la diferencia entre los modelos Neo Essentials y Neo Premium?",
        resposta: "La línea Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX y variantes) tiene panel LED 10.1\" y se centra en la relación calidad-precio con tecnología UV LED + UF. La línea Neo Premium (INFINITY, PRESTIGE y PRIME) cuenta con panel IPS 15.6\", filtración por Ósmosis Inversa (RO) y acabado premium. Todos los modelos tienen conectividad Wi-Fi 5 y Bluetooth 5.3.",
      },
      {
        pergunta: "¿Cómo descargo y configuro la aplicación Acquafy?",
        resposta: "La aplicación Acquafy está disponible en la App Store (iOS) y Google Play (Android). Después de instalarla, crea tu cuenta, acerca el smartphone al purificador mediante Bluetooth 5.3 para emparejarlo y sigue el asistente de configuración Wi-Fi. El proceso tarda menos de 5 minutos.",
      },
      {
        pergunta: "¿Con qué frecuencia debo cambiar el filtro del purificador?",
        resposta: "Los filtros Neo tienen una vida útil de 365 días o según el consumo de agua. La aplicación Acquafy monitorea en tiempo real el ciclo del filtro y envía alertas cuando se acerca el cambio. El sistema de Reposición Inteligente puede realizar el pedido automáticamente a través de la app.",
      },
      {
        pergunta: "¿Cómo me convierto en socio de Acquafy?",
        resposta: "Existen tres niveles de asociación: Silver (afiliado/referido, comisión del 20%, sin inversión inicial), Gold (operador de Acquafy Media, comisión del 20% en ventas + ingresos por publicidad, entrada desde US$2,000) y Platinum (distribuidor regional, descuento del 70% en el precio USA, modelo FOB). Accede a la página de Socios en el sitio web o contacta con nuestro equipo.",
      },
      {
        pergunta: "¿Qué es Acquafy Media y cómo genera ingresos recurrentes?",
        resposta: "Acquafy Media es un sistema de medios integrado en el panel táctil de los purificadores Neo. Los negocios locales pueden anunciarse en el display y los socios Gold obtienen ingresos mensuales por cada anuncio mostrado. Los usuarios también interactúan mediante código QR en las campañas, generando datos de participación.",
      },
      {
        pergunta: "¿El purificador Neo funciona con agua de pozo o solo con agua de red?",
        resposta: "Los modelos de la línea Essentials están diseñados para agua de red (con presión de 20 a 80 PSI). La línea Premium con tecnología RO (Ósmosis Inversa) puede tratar agua con mayor variación de calidad. Para situaciones específicas como agua de pozo, recomendamos contactar a un especialista técnico para evaluación.",
      },
      {
        pergunta: "¿Cuál es el período de garantía de los productos Acquafy?",
        resposta: "Los purificadores Neo tienen garantía de 1 año contra defectos de fabricación. El registro de garantía debe realizarse a través de la aplicación Acquafy o el portal de soporte. Los defectos causados por instalación incorrecta, uso inadecuado o mantenimiento negligente no están cubiertos por la garantía.",
      },
      {
        pergunta: "¿En cuántos países opera Acquafy?",
        resposta: "Acquafy está presente en más de 180 países, con operación 100% global y soporte disponible en 16 idiomas. El modelo de negocio permite que los socios distribuidores regionales operen localmente con el soporte de la plataforma central.",
      },
    ],
  },
  fr: {
    h2plain: "Questions ",
    h2highlight: "fréquentes",
    subtitle: "Réponses rapides aux questions les plus courantes sur les produits et services Acquafy.",
    faqs: [
      {
        pergunta: "Quelle est la différence entre les modèles Neo Essentials et Neo Premium ?",
        resposta: "La gamme Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX et variantes) dispose d'un panneau LED 10,1\" et mise sur le rapport qualité-prix avec la technologie UV LED + UF. La gamme Neo Premium (INFINITY, PRESTIGE et PRIME) est équipée d'un panneau IPS 15,6\", d'une filtration par osmose inverse (RO) et d'une finition haut de gamme. Tous les modèles disposent de la connectivité Wi-Fi 5 et Bluetooth 5.3.",
      },
      {
        pergunta: "Comment télécharger et configurer l'application Acquafy ?",
        resposta: "L'application Acquafy est disponible sur l'App Store (iOS) et Google Play (Android). Après l'installation, créez votre compte, approchez votre smartphone du purificateur via Bluetooth 5.3 pour le jumeler, puis suivez l'assistant de configuration Wi-Fi. Le processus prend moins de 5 minutes.",
      },
      {
        pergunta: "À quelle fréquence dois-je remplacer le filtre du purificateur ?",
        resposta: "Les filtres Neo ont une durée de vie de 365 jours ou selon la consommation d'eau. L'application Acquafy surveille le cycle du filtre en temps réel et envoie des alertes à l'approche du remplacement. Le système de Remplacement Intelligent peut passer commande automatiquement via l'app.",
      },
      {
        pergunta: "Comment devenir un partenaire Acquafy ?",
        resposta: "Il existe trois niveaux de partenariat : Silver (affilié/prescripteur, commission de 20 %, sans investissement initial), Gold (opérateur Acquafy Media, commission de 20 % sur les ventes + revenus publicitaires, entrée à partir de 2 000 $) et Platinum (distributeur régional, remise de 70 % sur le prix USA, modèle FOB). Consultez la page Partenaires du site ou contactez notre équipe.",
      },
      {
        pergunta: "Qu'est-ce qu'Acquafy Media et comment génère-t-il des revenus récurrents ?",
        resposta: "Acquafy Media est un système de médias intégré au panneau tactile des purificateurs Neo. Les entreprises locales peuvent diffuser des publicités sur l'écran et les partenaires Gold perçoivent des revenus mensuels pour chaque annonce affichée. Les utilisateurs interagissent également via QR Code dans les campagnes, générant des données d'engagement.",
      },
      {
        pergunta: "Le purificateur Neo fonctionne-t-il avec l'eau de puits ou uniquement avec l'eau du robinet ?",
        resposta: "Les modèles de la gamme Essentials sont conçus pour l'eau du robinet (avec une pression de 20 à 80 PSI). La gamme Premium avec technologie RO (Osmose Inverse) peut traiter une eau de qualité plus variable. Pour des situations spécifiques comme l'eau de puits, nous recommandons de contacter un spécialiste technique pour une évaluation.",
      },
      {
        pergunta: "Quelle est la durée de garantie des produits Acquafy ?",
        resposta: "Les purificateurs Neo bénéficient d'une garantie de 1 an contre les défauts de fabrication. L'enregistrement de la garantie doit être effectué via l'application Acquafy ou le portail d'assistance. Les défauts causés par une installation incorrecte, une utilisation inappropriée ou un entretien négligé ne sont pas couverts par la garantie.",
      },
      {
        pergunta: "Dans combien de pays Acquafy opère-t-il ?",
        resposta: "Acquafy est présent dans plus de 180 pays, avec une exploitation 100 % mondiale et un support disponible en 16 langues. Le modèle commercial permet aux partenaires distributeurs régionaux d'opérer localement avec le soutien de la plateforme centrale.",
      },
    ],
  },
  de: {
    h2plain: "Häufig gestellte ",
    h2highlight: "Fragen",
    subtitle: "Schnelle Antworten auf die häufigsten Fragen zu Acquafy-Produkten und -Dienstleistungen.",
    faqs: [
      {
        pergunta: "Was ist der Unterschied zwischen den Modellen Neo Essentials und Neo Premium?",
        resposta: "Die Neo Essentials-Reihe (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX und Varianten) verfügt über ein 10,1\" LED-Panel und bietet ein hervorragendes Preis-Leistungs-Verhältnis mit UV LED + UF-Technologie. Die Neo Premium-Reihe (INFINITY, PRESTIGE und PRIME) kommt mit einem 15,6\" IPS-Panel, Umkehrosmose (RO)-Filtration und Premium-Verarbeitung. Alle Modelle verfügen über Wi-Fi 5 und Bluetooth 5.3.",
      },
      {
        pergunta: "Wie lade ich die Acquafy App herunter und richte sie ein?",
        resposta: "Die Acquafy App ist im App Store (iOS) und bei Google Play (Android) verfügbar. Erstellen Sie nach der Installation Ihr Konto, halten Sie Ihr Smartphone via Bluetooth 5.3 an den Purifier zum Koppeln und folgen Sie dem WLAN-Einrichtungsassistenten. Der Vorgang dauert weniger als 5 Minuten.",
      },
      {
        pergunta: "Wie oft sollte ich den Filter des Purifiers wechseln?",
        resposta: "Neo-Filter haben eine Lebensdauer von 365 Tagen oder gemäß dem Wasserverbrauch. Die Acquafy App überwacht den Filterzyklus in Echtzeit und sendet Benachrichtigungen, wenn der Wechsel bevorsteht. Das intelligente Nachbestellsystem kann die Bestellung automatisch über die App aufgeben.",
      },
      {
        pergunta: "Wie werde ich Acquafy-Partner?",
        resposta: "Es gibt drei Partnerschaftsstufen: Silver (Affiliate/Empfehler, 20 % Provision, ohne Anfangsinvestition), Gold (Acquafy Media-Betreiber, 20 % Provision auf Verkäufe + Werbeeinnahmen, ab US$ 2.000) und Platinum (regionaler Distributor, 70 % Rabatt auf den US-Preis, FOB-Modell). Besuchen Sie die Partner-Seite auf der Website oder kontaktieren Sie unser Team.",
      },
      {
        pergunta: "Was ist Acquafy Media und wie generiert es wiederkehrende Einnahmen?",
        resposta: "Acquafy Media ist ein Mediensystem, das in das Touchscreen-Panel der Neo-Purifier integriert ist. Lokale Unternehmen können auf dem Display werben und Gold-Partner erhalten monatliche Einnahmen für jede angezeigte Anzeige. Nutzer interagieren auch per QR-Code in Kampagnen, wodurch Engagement-Daten generiert werden.",
      },
      {
        pergunta: "Funktioniert der Neo Purifier mit Brunnenwasser oder nur mit Leitungswasser?",
        resposta: "Die Essentials-Modelle sind für Leitungswasser ausgelegt (mit einem Druck von 20 bis 80 PSI). Die Premium-Reihe mit RO-Technologie (Umkehrosmose) kann Wasser mit größerer Qualitätsschwankung aufbereiten. Für spezielle Situationen wie Brunnenwasser empfehlen wir die Kontaktaufnahme mit einem Fachspezialisten zur Bewertung.",
      },
      {
        pergunta: "Wie lange ist die Garantiezeit für Acquafy-Produkte?",
        resposta: "Neo-Purifier haben eine 1-jährige Garantie gegen Herstellungsfehler. Die Garantieregistrierung muss über die Acquafy App oder das Support-Portal erfolgen. Defekte, die durch unsachgemäße Installation, falsche Bedienung oder vernachlässigte Wartung verursacht werden, sind nicht durch die Garantie abgedeckt.",
      },
      {
        pergunta: "In wie vielen Ländern ist Acquafy tätig?",
        resposta: "Acquafy ist in mehr als 180 Ländern präsent, mit 100 % globalem Betrieb und Support in 16 Sprachen. Das Geschäftsmodell ermöglicht regionalen Distributor-Partnern, mit Unterstützung der zentralen Plattform lokal zu agieren.",
      },
    ],
  },
  it: {
    h2plain: "Domande ",
    h2highlight: "frequenti",
    subtitle: "Risposte rapide alle domande più comuni sui prodotti e servizi Acquafy.",
    faqs: [
      {
        pergunta: "Qual è la differenza tra i modelli Neo Essentials e Neo Premium?",
        resposta: "La linea Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e varianti) dispone di un pannello LED 10,1\" e si concentra sul rapporto qualità-prezzo con tecnologia UV LED + UF. La linea Neo Premium (INFINITY, PRESTIGE e PRIME) è dotata di un pannello IPS 15,6\", filtrazione ad osmosi inversa (RO) e finitura premium. Tutti i modelli hanno connettività Wi-Fi 5 e Bluetooth 5.3.",
      },
      {
        pergunta: "Come scarico e configuro l'app Acquafy?",
        resposta: "L'app Acquafy è disponibile sull'App Store (iOS) e su Google Play (Android). Dopo l'installazione, crea il tuo account, avvicina lo smartphone al purificatore tramite Bluetooth 5.3 per abbinarlo e segui la procedura guidata di configurazione Wi-Fi. Il processo richiede meno di 5 minuti.",
      },
      {
        pergunta: "Con quale frequenza devo sostituire il filtro del purificatore?",
        resposta: "I filtri Neo hanno una durata di 365 giorni o in base al consumo d'acqua. L'app Acquafy monitora il ciclo del filtro in tempo reale e invia avvisi quando si avvicina la sostituzione. Il sistema di Ricarica Intelligente può effettuare l'ordine automaticamente tramite l'app.",
      },
      {
        pergunta: "Come diventare un partner Acquafy?",
        resposta: "Esistono tre livelli di partnership: Silver (affiliato/referral, commissione del 20%, senza investimento iniziale), Gold (operatore Acquafy Media, commissione del 20% sulle vendite + ricavi pubblicitari, a partire da US$ 2.000) e Platinum (distributore regionale, sconto del 70% sul prezzo USA, modello FOB). Visita la pagina Partner sul sito o contatta il nostro team.",
      },
      {
        pergunta: "Cos'è Acquafy Media e come genera ricavi ricorrenti?",
        resposta: "Acquafy Media è un sistema multimediale integrato nel pannello touchscreen dei purificatori Neo. Le aziende locali possono pubblicizzarsi sul display e i partner Gold guadagnano ricavi mensili per ogni annuncio mostrato. Gli utenti interagiscono anche tramite QR Code nelle campagne, generando dati di coinvolgimento.",
      },
      {
        pergunta: "Il purificatore Neo funziona con acqua di pozzo o solo con acqua di rete?",
        resposta: "I modelli della linea Essentials sono progettati per l'acqua di rete (con pressione da 20 a 80 PSI). La linea Premium con tecnologia RO (Osmosi Inversa) può trattare acqua con maggiore variazione di qualità. Per situazioni specifiche come l'acqua di pozzo, consigliamo di contattare uno specialista tecnico per una valutazione.",
      },
      {
        pergunta: "Qual è il periodo di garanzia dei prodotti Acquafy?",
        resposta: "I purificatori Neo hanno una garanzia di 1 anno contro i difetti di fabbricazione. La registrazione della garanzia deve essere effettuata tramite l'app Acquafy o il portale di supporto. I difetti causati da installazione errata, uso improprio o manutenzione trascurata non sono coperti dalla garanzia.",
      },
      {
        pergunta: "In quanti paesi opera Acquafy?",
        resposta: "Acquafy è presente in oltre 180 paesi, con operatività 100% globale e supporto disponibile in 16 lingue. Il modello di business consente ai partner distributori regionali di operare localmente con il supporto della piattaforma centrale.",
      },
    ],
  },
  zh: {
    h2plain: "常见",
    h2highlight: "问题",
    subtitle: "关于 Acquafy 产品和服务最常见问题的快速解答。",
    faqs: [
      {
        pergunta: "Neo Essentials 和 Neo Premium 型号有什么区别？",
        resposta: "Neo Essentials 系列（Neo UP、FIT、SMART H₂、TOUCH、PLUS、ULTRA、MAX 及变体）配备 10.1\" LED 面板，采用 UV LED + UF 技术，注重性价比。Neo Premium 系列（INFINITY、PRESTIGE 和 PRIME）配备 15.6\" IPS 面板、反渗透（RO）过滤和高级工艺。所有型号均支持 Wi-Fi 5 和 Bluetooth 5.3。",
      },
      {
        pergunta: "如何下载和配置 Acquafy 应用程序？",
        resposta: "Acquafy 应用程序可在 App Store（iOS）和 Google Play（Android）下载。安装后，创建您的账户，通过 Bluetooth 5.3 将智能手机靠近净水器进行配对，然后按照 Wi-Fi 设置向导操作。整个过程不到 5 分钟。",
      },
      {
        pergunta: "我应该多久更换一次净水器滤芯？",
        resposta: "Neo 滤芯的使用寿命为 365 天或根据用水量而定。Acquafy 应用程序实时监测滤芯周期，并在更换日期临近时发送提醒。智能补货系统可通过 App 自动下单。",
      },
      {
        pergunta: "如何成为 Acquafy 合作伙伴？",
        resposta: "共有三个合作级别：Silver（联盟/推荐，佣金 20%，无需初始投资）、Gold（Acquafy Media 运营商，销售佣金 20% + 广告收益，入门费用从 US$2,000 起）和 Platinum（区域经销商，美国价格七折，FOB 模式）。请访问网站上的合作伙伴页面或联系我们的团队。",
      },
      {
        pergunta: "什么是 Acquafy Media？它如何产生周期性收益？",
        resposta: "Acquafy Media 是集成在 Neo 净水器触摸屏面板中的媒体系统。本地企业可以在显示屏上投放广告，Gold 合作伙伴每显示一条广告即可获得月度收益。用户还可以通过广告活动中的 QR 码进行互动，从而生成参与度数据。",
      },
      {
        pergunta: "Neo 净水器适用于井水还是仅适用于自来水？",
        resposta: "Essentials 系列型号专为自来水设计（水压 20 至 80 PSI）。配备 RO（反渗透）技术的 Premium 系列可处理水质变化较大的水。对于井水等特殊情况，我们建议联系技术专家进行评估。",
      },
      {
        pergunta: "Acquafy 产品的保修期是多长时间？",
        resposta: "Neo 净水器提供 1 年制造缺陷保修。保修注册须通过 Acquafy 应用程序或支持门户完成。因安装不当、使用不当或维护疏忽造成的故障不在保修范围之内。",
      },
      {
        pergunta: "Acquafy 在多少个国家运营？",
        resposta: "Acquafy 遍布 180 多个国家，以 100% 全球化方式运营，提供 16 种语言的支持。该商业模式允许区域经销商合作伙伴在中央平台的支持下进行本地运营。",
      },
    ],
  },
  ja: {
    h2plain: "よくある",
    h2highlight: "質問",
    subtitle: "Acquafy の製品とサービスに関する最も一般的な質問への素早い回答。",
    faqs: [
      {
        pergunta: "Neo Essentials と Neo Premium モデルの違いは何ですか？",
        resposta: "Neo Essentials ライン（Neo UP、FIT、SMART H₂、TOUCH、PLUS、ULTRA、MAX および派生モデル）は 10.1\" LED パネルを搭載し、UV LED + UF 技術でコストパフォーマンスに優れています。Neo Premium ライン（INFINITY、PRESTIGE、PRIME）は 15.6\" IPS パネル、逆浸透（RO）ろ過、プレミアム仕上げを備えています。全モデルに Wi-Fi 5 と Bluetooth 5.3 が搭載されています。",
      },
      {
        pergunta: "Acquafy アプリのダウンロードと設定方法は？",
        resposta: "Acquafy アプリは App Store（iOS）と Google Play（Android）でご利用いただけます。インストール後、アカウントを作成し、Bluetooth 5.3 でスマートフォンを浄水器に近づけてペアリングし、Wi-Fi 設定ウィザードに従ってください。手順は 5 分以内に完了します。",
      },
      {
        pergunta: "浄水器のフィルターはどのくらいの頻度で交換すべきですか？",
        resposta: "Neo フィルターの寿命は 365 日または使用水量によります。Acquafy アプリがフィルターサイクルをリアルタイムで監視し、交換が近づくとアラートを送信します。スマート補充システムがアプリ経由で自動的に注文を行うこともできます。",
      },
      {
        pergunta: "Acquafy パートナーになるにはどうすればよいですか？",
        resposta: "パートナーシップには 3 つのレベルがあります：Silver（アフィリエイト/紹介、コミッション 20%、初期投資不要）、Gold（Acquafy Media オペレーター、販売コミッション 20% + 広告収益、US$ 2,000 から）、Platinum（地域ディストリビューター、米国価格から 70% 割引、FOB モデル）。ウェブサイトのパートナーページをご覧になるか、チームにお問い合わせください。",
      },
      {
        pergunta: "Acquafy Media とは何か、どのように継続収益を生み出しますか？",
        resposta: "Acquafy Media は Neo 浄水器のタッチスクリーンパネルに統合されたメディアシステムです。地元企業がディスプレイに広告を出稿でき、Gold パートナーは表示された広告ごとに月次収益を得られます。ユーザーはキャンペーンの QR コードを通じてインタラクションを行い、エンゲージメントデータが生成されます。",
      },
      {
        pergunta: "Neo 浄水器は井戸水でも使えますか？それとも水道水のみですか？",
        resposta: "Essentials ラインのモデルは水道水（20〜80 PSI の水圧）向けに設計されています。RO（逆浸透）技術を搭載した Premium ラインはより品質のばらつきが大きい水にも対応できます。井戸水などの特殊な状況については、技術専門家への評価依頼をお勧めします。",
      },
      {
        pergunta: "Acquafy 製品の保証期間はどのくらいですか？",
        resposta: "Neo 浄水器には製造上の欠陥に対して 1 年間の保証が付いています。保証登録は Acquafy アプリまたはサポートポータルから行う必要があります。誤った設置、不適切な使用、または怠慢なメンテナンスによる欠陥は保証の対象外となります。",
      },
      {
        pergunta: "Acquafy は何カ国で事業を展開していますか？",
        resposta: "Acquafy は 180 カ国以上に展開し、100% グローバルな運営を行い、16 言語でサポートを提供しています。このビジネスモデルにより、地域ディストリビューターパートナーが中央プラットフォームのサポートのもとでローカルに事業運営できます。",
      },
    ],
  },
  ko: {
    h2plain: "자주 묻는",
    h2highlight: "질문",
    subtitle: "Acquafy 제품 및 서비스에 관한 가장 일반적인 질문에 대한 빠른 답변.",
    faqs: [
      {
        pergunta: "Neo Essentials와 Neo Premium 모델의 차이점은 무엇인가요?",
        resposta: "Neo Essentials 라인(Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX 및 변형 모델)은 10.1\" LED 패널을 탑재하고 UV LED + UF 기술로 가성비에 중점을 둡니다. Neo Premium 라인(INFINITY, PRESTIGE, PRIME)은 15.6\" IPS 패널, 역삼투압(RO) 여과 및 프리미엄 마감재를 갖추고 있습니다. 모든 모델은 Wi-Fi 5 및 Bluetooth 5.3을 지원합니다.",
      },
      {
        pergunta: "Acquafy 앱을 다운로드하고 설정하는 방법은?",
        resposta: "Acquafy 앱은 App Store(iOS) 및 Google Play(Android)에서 이용 가능합니다. 설치 후 계정을 만들고, Bluetooth 5.3을 통해 스마트폰을 정수기에 가까이 대어 페어링한 다음 Wi-Fi 설정 마법사를 따르세요. 전체 과정은 5분 미만입니다.",
      },
      {
        pergunta: "정수기 필터를 얼마나 자주 교체해야 하나요?",
        resposta: "Neo 필터의 수명은 365일 또는 물 사용량에 따라 다릅니다. Acquafy 앱은 필터 사이클을 실시간으로 모니터링하고 교체 시기가 다가오면 알림을 보냅니다. 스마트 보충 시스템이 앱을 통해 자동으로 주문할 수 있습니다.",
      },
      {
        pergunta: "Acquafy 파트너가 되는 방법은?",
        resposta: "파트너십에는 세 가지 레벨이 있습니다: Silver(제휴/추천, 수수료 20%, 초기 투자 없음), Gold(Acquafy Media 운영자, 판매 수수료 20% + 광고 수익, US$2,000부터 시작), Platinum(지역 유통업체, 미국 가격 70% 할인, FOB 모델). 웹사이트의 파트너 페이지를 방문하거나 저희 팀에 연락하세요.",
      },
      {
        pergunta: "Acquafy Media란 무엇이며 어떻게 반복 수익을 창출하나요?",
        resposta: "Acquafy Media는 Neo 정수기의 터치스크린 패널에 통합된 미디어 시스템입니다. 지역 기업들이 디스플레이에 광고를 게재할 수 있으며, Gold 파트너는 표시되는 각 광고에 대해 월간 수익을 얻습니다. 사용자들도 캠페인의 QR 코드를 통해 상호작용하여 참여 데이터가 생성됩니다.",
      },
      {
        pergunta: "Neo 정수기는 우물물에서도 작동하나요, 아니면 수도물만 가능한가요?",
        resposta: "Essentials 라인 모델은 수도물(20~80 PSI 수압)용으로 설계되었습니다. RO(역삼투압) 기술이 탑재된 Premium 라인은 품질 변동이 큰 물도 처리할 수 있습니다. 우물물과 같은 특수한 상황에는 기술 전문가에게 평가를 문의하는 것을 권장합니다.",
      },
      {
        pergunta: "Acquafy 제품의 보증 기간은 얼마나 되나요?",
        resposta: "Neo 정수기에는 제조 결함에 대한 1년 보증이 제공됩니다. 보증 등록은 Acquafy 앱 또는 지원 포털을 통해 이루어져야 합니다. 잘못된 설치, 부적절한 사용 또는 소홀한 유지보수로 인한 결함은 보증 대상에 포함되지 않습니다.",
      },
      {
        pergunta: "Acquafy는 몇 개국에서 운영되나요?",
        resposta: "Acquafy는 180개국 이상에 진출해 있으며, 100% 글로벌 운영 체제로 16개 언어의 지원을 제공합니다. 이 비즈니스 모델은 지역 유통업체 파트너들이 중앙 플랫폼의 지원을 받아 현지에서 운영할 수 있도록 합니다.",
      },
    ],
  },
};

export default function FaqBK() {
  const { lang } = useLang();
  const t = T[lang];
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.h2plain}
            <span className="text-[#0569ff]">{t.h2highlight}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-[12px] w-full">
          {t.faqs.map((faq, i) => {
            const isOpen = aberto === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-[12px] overflow-hidden transition-shadow duration-200
                  ${isOpen ? "shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]" : "shadow-none"}`}
              >
                <button
                  onClick={() => setAberto(isOpen ? null : i)}
                  className="flex gap-[16px] items-center justify-between w-full px-[24px] py-[20px] cursor-pointer text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-1 pr-[8px]">
                    {faq.pergunta}
                  </span>
                  {/* Chevron */}
                  <span
                    className={`shrink-0 flex items-center justify-center size-[28px] rounded-full border-2 transition-all duration-200
                      ${isOpen
                        ? "border-[#0233c3] bg-[#0233c3] text-white rotate-180"
                        : "border-[#cbd0d4] bg-transparent text-[#333] rotate-0"
                      }`}
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[22px] text-[#333] px-[24px] pb-[20px]">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
