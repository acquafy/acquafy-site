"use client";

import React from "react";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Traduções ─────────────────────────────────────────────────────────────────

const T: Record<Lang, {
  onThisPage: string;
  nav: { id: string; label: string }[];
  intro1: React.ReactNode;
  intro2: string;
  s1Title: string;
  s1Intro: string;
  s1Labels: [string, string][];
  s2Title: string;
  s21Title: string;
  s21Items: string[];
  s22Title: string;
  s22Items: string[];
  s23Title: string;
  s23Items: string[];
  s3Title: string;
  s3Intro: string;
  s3Items: string[];
  s4Title: string;
  s4Intro: string;
  s4Bases: { base: string; desc: string }[];
  s5Title: string;
  s5Intro: string;
  s51Title: string;
  s51Text: string;
  s52Title: string;
  s52Text: string;
  s53Title: string;
  s53Text: string;
  s54Title: string;
  s54Text: string;
  s6Title: string;
  s6Intro: string;
  s6Cookies: { tipo: string; cor: string; desc: string }[];
  s6Outro: string;
  s7Title: string;
  s7Intro: string;
  s7Items: string[];
  s7Outro: string;
  s8Title: string;
  s8Intro: string;
  s8Items: string[];
  s8Outro: string;
  s9Title: string;
  s9Intro: string;
  s9Rights: { direito: string; desc: string }[];
  s9Outro1: string;
  s9Outro2: string;
  s10Title: string;
  s10Intro: string;
  s10Items: string[];
  s11Title: string;
  s11Text1: string;
  s11Text2: string;
  s12Title: string;
  s12Intro: string;
  s12Items: string[];
  s12Outro: string;
  s13Title: string;
  s13Intro: string;
  s13DpoTitle: string;
  s13Labels: [string, string][];
  s13Outro: string;
}> = {
  pt: {
    onThisPage: "Nesta página",
    nav: [
      { id: "controlador",      label: "1. Controlador de Dados" },
      { id: "coleta",           label: "2. Dados Coletados" },
      { id: "finalidades",      label: "3. Finalidades do Tratamento" },
      { id: "bases-legais",     label: "4. Bases Legais" },
      { id: "compartilhamento", label: "5. Compartilhamento" },
      { id: "cookies",          label: "6. Cookies" },
      { id: "retencao",         label: "7. Retenção" },
      { id: "seguranca",        label: "8. Segurança" },
      { id: "direitos",         label: "9. Seus Direitos" },
      { id: "transferencias",   label: "10. Transferências Internacionais" },
      { id: "menores",          label: "11. Menores de Idade" },
      { id: "alteracoes",       label: "12. Alterações" },
      { id: "contato",          label: "13. Contato" },
    ],
    intro1: <>A <strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nós&quot; ou &quot;nosso&quot;) está comprometida com a proteção da sua privacidade. Esta Política de Privacidade descreve como tratamos os dados pessoais que você nos fornece ou que coletamos quando você utiliza nosso website, plataforma, aplicativo e demais serviços (&quot;Serviços&quot;).</>,
    intro2: "Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), o Regulamento Geral de Proteção de Dados da União Europeia (RGPD/GDPR) e demais legislações aplicáveis de privacidade e proteção de dados.",
    s1Title: "1. Controlador de Dados",
    s1Intro: "O controlador responsável pelo tratamento dos seus dados pessoais é:",
    s1Labels: [["Empresa", "Acquafy Corporation"], ["E-mail", "privacidade@acquafy.com"], ["Website", "acquafy.com"]],
    s2Title: "2. Dados Pessoais que Coletamos",
    s21Title: "2.1 Dados fornecidos por você",
    s21Items: [
      "Nome completo e endereço de e-mail ao criar uma conta ou preencher formulários de contato",
      "Informações de endereço e entrega para processamento de pedidos",
      "Dados de pagamento (processados de forma segura por provedores certificados PCI-DSS)",
      "Mensagens, dúvidas e solicitações enviadas por meio dos nossos canais de suporte",
      "Preferências e configurações da sua conta na Plataforma Acquafy",
    ],
    s22Title: "2.2 Dados coletados automaticamente",
    s22Items: [
      "Endereço IP, tipo de navegador e sistema operacional",
      "Páginas visitadas, tempo de permanência e cliques (dados de navegação)",
      "Identificadores de dispositivo e dados de geolocalização aproximada",
      "Informações de uso do aplicativo Acquafy e dados de telemetria do purificador (IoT)",
      "Cookies e tecnologias similares (detalhados na Seção 6)",
    ],
    s23Title: "2.3 Dados recebidos de terceiros",
    s23Items: [
      "Informações de redes sociais quando você opta por autenticar via login social",
      "Dados de parceiros de distribuição para suporte a revendedores e integradores",
      "Informações de verificação de identidade de prestadores de serviços autorizados",
    ],
    s3Title: "3. Finalidades do Tratamento",
    s3Intro: "Utilizamos os seus dados pessoais para as seguintes finalidades:",
    s3Items: [
      "Prestação dos Serviços: criação e gerenciamento de conta, processamento de pedidos e entrega de produtos",
      "Suporte ao cliente: resposta a dúvidas, solicitações de manutenção e atendimento pós-venda",
      "Melhoria dos Serviços: análise de uso da plataforma, app e dispositivos IoT para aprimorar funcionalidades",
      "Comunicações de marketing: envio de newsletters, ofertas e novidades, mediante consentimento prévio",
      "Obrigações legais e regulatórias: cumprimento de exigências legais, fiscais e regulatórias aplicáveis",
      "Segurança e prevenção a fraudes: detecção de atividades suspeitas e proteção da integridade dos Serviços",
      "Personalização: oferecer conteúdos, recomendações e experiências adaptadas ao seu perfil",
    ],
    s4Title: "4. Bases Legais para o Tratamento",
    s4Intro: "Tratamos os seus dados com fundamento nas seguintes bases legais previstas na LGPD e no RGPD:",
    s4Bases: [
      { base: "Execução de contrato", desc: "Tratamento necessário para a prestação dos Serviços contratados por você." },
      { base: "Obrigação legal", desc: "Cumprimento de obrigações previstas em lei, regulamentos ou determinações de autoridades." },
      { base: "Legítimo interesse", desc: "Melhoria dos Serviços, segurança, prevenção a fraudes e comunicações institucionais, desde que não prevaleçam sobre os seus direitos." },
      { base: "Consentimento", desc: "Envio de comunicações de marketing e uso de cookies não essenciais. Você pode retirar o consentimento a qualquer momento." },
    ],
    s5Title: "5. Compartilhamento de Dados",
    s5Intro: "Não vendemos os seus dados pessoais a terceiros. Podemos compartilhá-los apenas nas seguintes situações:",
    s51Title: "5.1 Prestadores de serviços",
    s51Text: "Compartilhamos dados com fornecedores que nos auxiliam na operação dos Serviços (processamento de pagamentos, hospedagem em nuvem, envio de e-mails, análise de dados), sempre sob acordo de processamento de dados e com obrigações de confidencialidade e segurança.",
    s52Title: "5.2 Parceiros de distribuição",
    s52Text: "Revendedores e integradores autorizados da rede Acquafy podem receber dados necessários para a execução de pedidos, suporte técnico e instalação de dispositivos na sua região.",
    s53Title: "5.3 Obrigação legal",
    s53Text: "Podemos divulgar dados quando exigido por lei, decisão judicial ou autoridade competente, ou quando necessário para proteger direitos e segurança da Acquafy, dos nossos usuários ou de terceiros.",
    s54Title: "5.4 Transferências corporativas",
    s54Text: "Em caso de fusão, aquisição ou venda de ativos, os dados poderão ser transferidos ao novo controlador, que ficará vinculado às obrigações desta política.",
    s6Title: "6. Cookies e Tecnologias de Rastreamento",
    s6Intro: "Utilizamos cookies e tecnologias similares para melhorar a sua experiência nos nossos Serviços. Os cookies são classificados em:",
    s6Cookies: [
      { tipo: "Essenciais", cor: "#0569ff", desc: "Necessários para o funcionamento básico do website e da plataforma (autenticação, segurança, preferências de sessão). Não podem ser desativados." },
      { tipo: "Analíticos", cor: "#7b5ea7", desc: "Permitem-nos entender como os visitantes utilizam o site (páginas visitadas, tempo de permanência). Utilizamos ferramentas como Google Analytics." },
      { tipo: "Funcionais", cor: "#0ab572", desc: "Armazenam preferências como idioma, localização e configurações personalizadas para melhorar a sua experiência." },
      { tipo: "Marketing", cor: "#e05c00", desc: "Utilizados para exibir publicidade relevante e medir a eficácia de campanhas. Requerem o seu consentimento prévio." },
    ],
    s6Outro: "Pode gerir as suas preferências de cookies a qualquer momento através das configurações do seu navegador ou do painel de consentimento disponível no nosso site.",
    s7Title: "7. Retenção de Dados",
    s7Intro: "Conservamos os seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, salvo quando a lei exija ou permita um período maior. Os critérios utilizados para determinar o prazo de retenção incluem:",
    s7Items: [
      "Período em que você mantiver uma conta ativa nos nossos Serviços",
      "Obrigações legais e regulatórias de retenção (ex.: dados fiscais por 5 anos)",
      "Prazo prescricional aplicável para eventuais disputas ou reclamações",
      "Necessidade de manter registros para segurança e prevenção a fraudes",
    ],
    s7Outro: "Após o encerramento da relação contratual e findo o prazo de retenção aplicável, os dados são eliminados de forma segura ou anonimizados.",
    s8Title: "8. Segurança dos Dados",
    s8Intro: "Adotamos medidas técnicas e organizacionais apropriadas para proteger os seus dados contra acesso não autorizado, perda, destruição ou divulgação indevida, incluindo:",
    s8Items: [
      "Criptografia em trânsito (TLS/HTTPS) e em repouso para dados sensíveis",
      "Controles de acesso baseados em funções (RBAC) e autenticação multifator para sistemas internos",
      "Monitoramento contínuo de segurança e gestão de vulnerabilidades",
      "Programas regulares de treinamento e conscientização em privacidade para colaboradores",
      "Procedimentos de resposta a incidentes de segurança com notificação às autoridades e titulares quando exigido por lei",
    ],
    s8Outro: "Nenhum sistema de transmissão ou armazenamento de dados é 100% seguro. Em caso de incidente que coloque seus dados em risco, notificaremos as autoridades competentes e os titulares afetados nos prazos legais.",
    s9Title: "9. Seus Direitos como Titular",
    s9Intro: "Nos termos da LGPD e demais legislações aplicáveis, você possui os seguintes direitos em relação aos seus dados pessoais:",
    s9Rights: [
      { direito: "Confirmação e acesso", desc: "Saber se tratamos seus dados e obter cópia deles." },
      { direito: "Correção", desc: "Solicitar a correção de dados incompletos, inexatos ou desatualizados." },
      { direito: "Anonimização / Bloqueio / Eliminação", desc: "Para dados desnecessários, excessivos ou tratados em desconformidade com a lei." },
      { direito: "Portabilidade", desc: "Receber seus dados em formato estruturado para transferência a outro fornecedor." },
      { direito: "Eliminação", desc: "Solicitar a exclusão dos dados tratados com base no seu consentimento." },
      { direito: "Revogação do consentimento", desc: "Retirar o consentimento para tratamentos baseados nessa base legal, a qualquer momento." },
      { direito: "Oposição", desc: "Opor-se a tratamentos baseados em legítimo interesse quando houver razões justificadas." },
      { direito: "Informação", desc: "Saber com quais entidades compartilhamos seus dados e as bases legais utilizadas." },
    ],
    s9Outro1: "Para exercer qualquer um desses direitos, entre em contato pelo e-mail",
    s9Outro2: ". Responderemos no prazo de até 15 dias úteis, conforme exigido pela LGPD.",
    s10Title: "10. Transferências Internacionais de Dados",
    s10Intro: "A Acquafy opera globalmente e pode transferir os seus dados pessoais para países fora do Brasil ou do Espaço Económico Europeu. Nestes casos, garantimos que a transferência seja realizada com salvaguardas adequadas:",
    s10Items: [
      "Cláusulas contratuais padrão aprovadas pela Comissão Europeia e pela ANPD",
      "Transferência para países que oferecem nível de proteção adequado reconhecido pela autoridade competente",
      "Certificações e códigos de conduta reconhecidos internacionalmente",
      "Consentimento explícito do titular quando aplicável",
    ],
    s11Title: "11. Menores de Idade",
    s11Text1: "Os nossos Serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente dados pessoais de crianças ou adolescentes. Se tomarmos conhecimento de que recolhemos dados de um menor sem consentimento parental verificável, eliminaremos esses dados imediatamente.",
    s11Text2: "Se for responsável por uma criança e acreditar que nos forneceu dados pessoais, contacte-nos pelo e-mail",
    s12Title: "12. Alterações a Esta Política",
    s12Intro: "Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações nos nossos Serviços, nas leis aplicáveis ou nas nossas práticas de privacidade. Quando fizermos alterações materiais, notificaremos através de:",
    s12Items: [
      "Aviso de destaque no nosso website por um período razoável",
      "Notificação por e-mail para titulares com conta ativa, quando as alterações forem significativas",
      "Atualização da data de \"Última atualização\" no início desta política",
    ],
    s12Outro: "Recomendamos que reveja esta política regularmente. A utilização continuada dos Serviços após a entrada em vigor das alterações constitui aceitação das mesmas.",
    s13Title: "13. Contacto e Encarregado de Dados (DPO)",
    s13Intro: "Para quaisquer questões, pedidos ou reclamações relacionadas com esta Política de Privacidade ou com o tratamento dos seus dados pessoais, entre em contacto com o nosso Encarregado de Proteção de Dados:",
    s13DpoTitle: "Encarregado de Proteção de Dados (DPO)",
    s13Labels: [["E-mail", "privacidade@acquafy.com"], ["Empresa", "Acquafy Corporation"], ["Website", "acquafy.com/contato"]],
    s13Outro: "Tem também o direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) no Brasil ou à autoridade de supervisão competente no seu país de residência.",
  },
  en: {
    onThisPage: "On this page",
    nav: [
      { id: "controlador",      label: "1. Data Controller" },
      { id: "coleta",           label: "2. Data Collected" },
      { id: "finalidades",      label: "3. Processing Purposes" },
      { id: "bases-legais",     label: "4. Legal Bases" },
      { id: "compartilhamento", label: "5. Sharing" },
      { id: "cookies",          label: "6. Cookies" },
      { id: "retencao",         label: "7. Retention" },
      { id: "seguranca",        label: "8. Security" },
      { id: "direitos",         label: "9. Your Rights" },
      { id: "transferencias",   label: "10. International Transfers" },
      { id: "menores",          label: "11. Minors" },
      { id: "alteracoes",       label: "12. Changes" },
      { id: "contato",          label: "13. Contact" },
    ],
    intro1: <><strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;we&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy describes how we process the personal data you provide to us or that we collect when you use our website, platform, application and other services (&quot;Services&quot;).</>,
    intro2: "This policy complies with the Brazilian General Data Protection Law (LGPD — Law No. 13.709/2018), the European Union General Data Protection Regulation (GDPR) and other applicable privacy and data protection laws.",
    s1Title: "1. Data Controller",
    s1Intro: "The controller responsible for processing your personal data is:",
    s1Labels: [["Company", "Acquafy Corporation"], ["E-mail", "privacidade@acquafy.com"], ["Website", "acquafy.com"]],
    s2Title: "2. Personal Data We Collect",
    s21Title: "2.1 Data you provide",
    s21Items: [
      "Full name and email address when creating an account or filling in contact forms",
      "Address and delivery information for order processing",
      "Payment data (securely processed by PCI-DSS certified providers)",
      "Messages, questions and requests sent through our support channels",
      "Preferences and settings of your account on the Acquafy Platform",
    ],
    s22Title: "2.2 Automatically collected data",
    s22Items: [
      "IP address, browser type and operating system",
      "Pages visited, time on page and clicks (browsing data)",
      "Device identifiers and approximate geolocation data",
      "Acquafy app usage information and purifier telemetry data (IoT)",
      "Cookies and similar technologies (detailed in Section 6)",
    ],
    s23Title: "2.3 Data received from third parties",
    s23Items: [
      "Social network information when you choose to authenticate via social login",
      "Data from distribution partners to support resellers and integrators",
      "Identity verification information from authorised service providers",
    ],
    s3Title: "3. Processing Purposes",
    s3Intro: "We use your personal data for the following purposes:",
    s3Items: [
      "Service provision: account creation and management, order processing and product delivery",
      "Customer support: responding to queries, maintenance requests and after-sales service",
      "Service improvement: analysis of platform, app and IoT device usage to improve features",
      "Marketing communications: sending newsletters, offers and news, with prior consent",
      "Legal and regulatory obligations: compliance with applicable legal, tax and regulatory requirements",
      "Security and fraud prevention: detection of suspicious activity and protection of service integrity",
      "Personalisation: offering content, recommendations and experiences tailored to your profile",
    ],
    s4Title: "4. Legal Bases for Processing",
    s4Intro: "We process your data on the following legal bases under the LGPD and GDPR:",
    s4Bases: [
      { base: "Contract performance", desc: "Processing necessary to provide the Services you have contracted." },
      { base: "Legal obligation", desc: "Compliance with obligations set out in law, regulations or authority orders." },
      { base: "Legitimate interest", desc: "Service improvement, security, fraud prevention and institutional communications, provided they do not override your rights." },
      { base: "Consent", desc: "Sending marketing communications and use of non-essential cookies. You may withdraw consent at any time." },
    ],
    s5Title: "5. Data Sharing",
    s5Intro: "We do not sell your personal data to third parties. We may share it only in the following situations:",
    s51Title: "5.1 Service providers",
    s51Text: "We share data with suppliers that help us operate the Services (payment processing, cloud hosting, email delivery, data analytics), always under a data processing agreement with confidentiality and security obligations.",
    s52Title: "5.2 Distribution partners",
    s52Text: "Authorised resellers and integrators in the Acquafy network may receive data necessary for order fulfilment, technical support and device installation in your region.",
    s53Title: "5.3 Legal obligation",
    s53Text: "We may disclose data when required by law, court order or competent authority, or when necessary to protect the rights and security of Acquafy, our users or third parties.",
    s54Title: "5.4 Corporate transfers",
    s54Text: "In the event of a merger, acquisition or sale of assets, data may be transferred to the new controller, who will be bound by the obligations of this policy.",
    s6Title: "6. Cookies and Tracking Technologies",
    s6Intro: "We use cookies and similar technologies to improve your experience with our Services. Cookies are classified as:",
    s6Cookies: [
      { tipo: "Essential", cor: "#0569ff", desc: "Required for the basic functioning of the website and platform (authentication, security, session preferences). Cannot be disabled." },
      { tipo: "Analytical", cor: "#7b5ea7", desc: "Allow us to understand how visitors use the site (pages visited, time on page). We use tools such as Google Analytics." },
      { tipo: "Functional", cor: "#0ab572", desc: "Store preferences such as language, location and custom settings to improve your experience." },
      { tipo: "Marketing", cor: "#e05c00", desc: "Used to display relevant advertising and measure campaign effectiveness. Require your prior consent." },
    ],
    s6Outro: "You can manage your cookie preferences at any time through your browser settings or the consent panel available on our site.",
    s7Title: "7. Data Retention",
    s7Intro: "We retain your personal data for as long as necessary to fulfil the purposes described in this policy, unless the law requires or permits a longer period. The criteria used to determine retention periods include:",
    s7Items: [
      "Period during which you maintain an active account with our Services",
      "Legal and regulatory retention obligations (e.g. tax data for 5 years)",
      "Applicable statute of limitations for potential disputes or claims",
      "Need to maintain records for security and fraud prevention",
    ],
    s7Outro: "After the contractual relationship ends and the applicable retention period expires, data is securely deleted or anonymised.",
    s8Title: "8. Data Security",
    s8Intro: "We adopt appropriate technical and organisational measures to protect your data against unauthorised access, loss, destruction or improper disclosure, including:",
    s8Items: [
      "Encryption in transit (TLS/HTTPS) and at rest for sensitive data",
      "Role-based access controls (RBAC) and multi-factor authentication for internal systems",
      "Continuous security monitoring and vulnerability management",
      "Regular privacy training and awareness programmes for employees",
      "Security incident response procedures with notification to authorities and data subjects when required by law",
    ],
    s8Outro: "No data transmission or storage system is 100% secure. In the event of an incident that puts your data at risk, we will notify the competent authorities and affected data subjects within the legal timeframes.",
    s9Title: "9. Your Rights as a Data Subject",
    s9Intro: "Under the LGPD and other applicable laws, you have the following rights regarding your personal data:",
    s9Rights: [
      { direito: "Confirmation and access", desc: "Know whether we process your data and obtain a copy." },
      { direito: "Correction", desc: "Request correction of incomplete, inaccurate or outdated data." },
      { direito: "Anonymisation / Blocking / Deletion", desc: "For unnecessary, excessive or unlawfully processed data." },
      { direito: "Portability", desc: "Receive your data in a structured format for transfer to another provider." },
      { direito: "Deletion", desc: "Request deletion of data processed based on your consent." },
      { direito: "Withdrawal of consent", desc: "Withdraw consent for processing based on that legal basis, at any time." },
      { direito: "Objection", desc: "Object to processing based on legitimate interest when there are justified reasons." },
      { direito: "Information", desc: "Know which entities we share your data with and the legal bases used." },
    ],
    s9Outro1: "To exercise any of these rights, contact us by email at",
    s9Outro2: ". We will respond within 15 business days, as required by the LGPD.",
    s10Title: "10. International Data Transfers",
    s10Intro: "Acquafy operates globally and may transfer your personal data to countries outside Brazil or the European Economic Area. In such cases, we ensure the transfer is carried out with appropriate safeguards:",
    s10Items: [
      "Standard contractual clauses approved by the European Commission and the ANPD",
      "Transfer to countries offering an adequate level of protection recognised by the competent authority",
      "Internationally recognised certifications and codes of conduct",
      "Explicit consent of the data subject where applicable",
    ],
    s11Title: "11. Minors",
    s11Text1: "Our Services are not directed at persons under 18 years of age. We do not intentionally collect personal data from children or adolescents. If we become aware that we have collected data from a minor without verifiable parental consent, we will delete that data immediately.",
    s11Text2: "If you are the guardian of a child and believe they have provided us with personal data, please contact us by email at",
    s12Title: "12. Changes to This Policy",
    s12Intro: "We may update this Privacy Policy periodically to reflect changes in our Services, applicable laws or our privacy practices. When we make material changes, we will notify you through:",
    s12Items: [
      "A prominent notice on our website for a reasonable period",
      "Email notification to account holders when changes are significant",
      "Updating the \"Last updated\" date at the top of this policy",
    ],
    s12Outro: "We recommend that you review this policy regularly. Continued use of the Services after changes take effect constitutes acceptance of those changes.",
    s13Title: "13. Contact and Data Protection Officer (DPO)",
    s13Intro: "For any questions, requests or complaints relating to this Privacy Policy or the processing of your personal data, please contact our Data Protection Officer:",
    s13DpoTitle: "Data Protection Officer (DPO)",
    s13Labels: [["E-mail", "privacidade@acquafy.com"], ["Company", "Acquafy Corporation"], ["Website", "acquafy.com/contato"]],
    s13Outro: "You also have the right to lodge a complaint with the Brazilian National Data Protection Authority (ANPD) or the supervisory authority in your country of residence.",
  },
  es: {
    onThisPage: "En esta página",
    nav: [
      { id: "controlador",      label: "1. Responsable del Tratamiento" },
      { id: "coleta",           label: "2. Datos Recopilados" },
      { id: "finalidades",      label: "3. Finalidades del Tratamiento" },
      { id: "bases-legais",     label: "4. Bases Legales" },
      { id: "compartilhamento", label: "5. Compartición" },
      { id: "cookies",          label: "6. Cookies" },
      { id: "retencao",         label: "7. Retención" },
      { id: "seguranca",        label: "8. Seguridad" },
      { id: "direitos",         label: "9. Sus Derechos" },
      { id: "transferencias",   label: "10. Transferencias Internacionales" },
      { id: "menores",          label: "11. Menores de Edad" },
      { id: "alteracoes",       label: "12. Cambios" },
      { id: "contato",          label: "13. Contacto" },
    ],
    intro1: <><strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nosotros&quot; o &quot;nuestro&quot;) está comprometida con la protección de su privacidad. Esta Política de Privacidad describe cómo tratamos los datos personales que usted nos proporciona o que recopilamos cuando utiliza nuestro sitio web, plataforma, aplicación y demás servicios (&quot;Servicios&quot;).</>,
    intro2: "Esta política cumple con la Ley General de Protección de Datos de Brasil (LGPD — Ley N.º 13.709/2018), el Reglamento General de Protección de Datos de la Unión Europea (RGPD/GDPR) y demás legislaciones aplicables de privacidad y protección de datos.",
    s1Title: "1. Responsable del Tratamiento",
    s1Intro: "El responsable del tratamiento de sus datos personales es:",
    s1Labels: [["Empresa", "Acquafy Corporation"], ["E-mail", "privacidade@acquafy.com"], ["Sitio web", "acquafy.com"]],
    s2Title: "2. Datos Personales que Recopilamos",
    s21Title: "2.1 Datos proporcionados por usted",
    s21Items: [
      "Nombre completo y dirección de correo electrónico al crear una cuenta o completar formularios de contacto",
      "Información de dirección y entrega para el procesamiento de pedidos",
      "Datos de pago (procesados de forma segura por proveedores certificados PCI-DSS)",
      "Mensajes, consultas y solicitudes enviadas a través de nuestros canales de soporte",
      "Preferencias y configuraciones de su cuenta en la Plataforma Acquafy",
    ],
    s22Title: "2.2 Datos recopilados automáticamente",
    s22Items: [
      "Dirección IP, tipo de navegador y sistema operativo",
      "Páginas visitadas, tiempo de permanencia y clics (datos de navegación)",
      "Identificadores de dispositivo y datos de geolocalización aproximada",
      "Información de uso de la aplicación Acquafy y datos de telemetría del purificador (IoT)",
      "Cookies y tecnologías similares (detallados en la Sección 6)",
    ],
    s23Title: "2.3 Datos recibidos de terceros",
    s23Items: [
      "Información de redes sociales cuando elige autenticarse mediante inicio de sesión social",
      "Datos de socios de distribución para apoyar a revendedores e integradores",
      "Información de verificación de identidad de proveedores de servicios autorizados",
    ],
    s3Title: "3. Finalidades del Tratamiento",
    s3Intro: "Utilizamos sus datos personales para las siguientes finalidades:",
    s3Items: [
      "Prestación de los Servicios: creación y gestión de cuenta, procesamiento de pedidos y entrega de productos",
      "Soporte al cliente: respuesta a consultas, solicitudes de mantenimiento y atención posventa",
      "Mejora de los Servicios: análisis del uso de la plataforma, app y dispositivos IoT para mejorar funcionalidades",
      "Comunicaciones de marketing: envío de boletines, ofertas y novedades, con consentimiento previo",
      "Obligaciones legales y regulatorias: cumplimiento de requisitos legales, fiscales y regulatorios aplicables",
      "Seguridad y prevención del fraude: detección de actividades sospechosas y protección de la integridad de los Servicios",
      "Personalización: ofrecer contenidos, recomendaciones y experiencias adaptadas a su perfil",
    ],
    s4Title: "4. Bases Legales del Tratamiento",
    s4Intro: "Tratamos sus datos con fundamento en las siguientes bases legales previstas en la LGPD y el RGPD:",
    s4Bases: [
      { base: "Ejecución del contrato", desc: "Tratamiento necesario para la prestación de los Servicios contratados por usted." },
      { base: "Obligación legal", desc: "Cumplimiento de obligaciones previstas en la ley, reglamentos o disposiciones de las autoridades." },
      { base: "Interés legítimo", desc: "Mejora de los Servicios, seguridad, prevención del fraude y comunicaciones institucionales, siempre que no prevalezcan sobre sus derechos." },
      { base: "Consentimiento", desc: "Envío de comunicaciones de marketing y uso de cookies no esenciales. Puede retirar el consentimiento en cualquier momento." },
    ],
    s5Title: "5. Compartición de Datos",
    s5Intro: "No vendemos sus datos personales a terceros. Podemos compartirlos únicamente en las siguientes situaciones:",
    s51Title: "5.1 Proveedores de servicios",
    s51Text: "Compartimos datos con proveedores que nos ayudan a operar los Servicios (procesamiento de pagos, alojamiento en la nube, envío de correos electrónicos, análisis de datos), siempre bajo un acuerdo de procesamiento de datos con obligaciones de confidencialidad y seguridad.",
    s52Title: "5.2 Socios de distribución",
    s52Text: "Los revendedores e integradores autorizados de la red Acquafy pueden recibir los datos necesarios para la ejecución de pedidos, soporte técnico e instalación de dispositivos en su región.",
    s53Title: "5.3 Obligación legal",
    s53Text: "Podemos divulgar datos cuando lo exija la ley, una resolución judicial o una autoridad competente, o cuando sea necesario para proteger los derechos y la seguridad de Acquafy, de nuestros usuarios o de terceros.",
    s54Title: "5.4 Transferencias corporativas",
    s54Text: "En caso de fusión, adquisición o venta de activos, los datos podrán ser transferidos al nuevo responsable, quien quedará vinculado por las obligaciones de esta política.",
    s6Title: "6. Cookies y Tecnologías de Seguimiento",
    s6Intro: "Utilizamos cookies y tecnologías similares para mejorar su experiencia con nuestros Servicios. Las cookies se clasifican en:",
    s6Cookies: [
      { tipo: "Esenciales", cor: "#0569ff", desc: "Necesarias para el funcionamiento básico del sitio web y la plataforma (autenticación, seguridad, preferencias de sesión). No pueden desactivarse." },
      { tipo: "Analíticas", cor: "#7b5ea7", desc: "Nos permiten entender cómo los visitantes utilizan el sitio (páginas visitadas, tiempo de permanencia). Usamos herramientas como Google Analytics." },
      { tipo: "Funcionales", cor: "#0ab572", desc: "Almacenan preferencias como idioma, ubicación y configuraciones personalizadas para mejorar su experiencia." },
      { tipo: "Marketing", cor: "#e05c00", desc: "Utilizadas para mostrar publicidad relevante y medir la eficacia de las campañas. Requieren su consentimiento previo." },
    ],
    s6Outro: "Puede gestionar sus preferencias de cookies en cualquier momento a través de la configuración de su navegador o del panel de consentimiento disponible en nuestro sitio.",
    s7Title: "7. Retención de Datos",
    s7Intro: "Conservamos sus datos personales durante el tiempo necesario para cumplir las finalidades descritas en esta política, salvo que la ley exija o permita un período mayor. Los criterios utilizados para determinar el plazo de retención incluyen:",
    s7Items: [
      "Período durante el cual mantenga una cuenta activa en nuestros Servicios",
      "Obligaciones legales y regulatorias de retención (p. ej.: datos fiscales durante 5 años)",
      "Plazo de prescripción aplicable para posibles disputas o reclamaciones",
      "Necesidad de mantener registros para la seguridad y prevención del fraude",
    ],
    s7Outro: "Tras la finalización de la relación contractual y vencido el plazo de retención aplicable, los datos se eliminan de forma segura o se anonimizan.",
    s8Title: "8. Seguridad de los Datos",
    s8Intro: "Adoptamos medidas técnicas y organizativas adecuadas para proteger sus datos contra el acceso no autorizado, la pérdida, la destrucción o la divulgación indebida, que incluyen:",
    s8Items: [
      "Cifrado en tránsito (TLS/HTTPS) y en reposo para datos sensibles",
      "Controles de acceso basados en roles (RBAC) y autenticación multifactor para sistemas internos",
      "Monitoreo continuo de seguridad y gestión de vulnerabilidades",
      "Programas regulares de formación y sensibilización en privacidad para empleados",
      "Procedimientos de respuesta a incidentes de seguridad con notificación a las autoridades y titulares cuando lo exige la ley",
    ],
    s8Outro: "Ningún sistema de transmisión o almacenamiento de datos es 100% seguro. En caso de incidente que ponga en riesgo sus datos, notificaremos a las autoridades competentes y a los titulares afectados en los plazos legales.",
    s9Title: "9. Sus Derechos como Titular",
    s9Intro: "De acuerdo con la LGPD y demás legislaciones aplicables, usted tiene los siguientes derechos sobre sus datos personales:",
    s9Rights: [
      { direito: "Confirmación y acceso", desc: "Saber si tratamos sus datos y obtener una copia de ellos." },
      { direito: "Corrección", desc: "Solicitar la corrección de datos incompletos, inexactos o desactualizados." },
      { direito: "Anonimización / Bloqueo / Eliminación", desc: "Para datos innecesarios, excesivos o tratados en incumplimiento de la ley." },
      { direito: "Portabilidad", desc: "Recibir sus datos en formato estructurado para transferirlos a otro proveedor." },
      { direito: "Eliminación", desc: "Solicitar la supresión de los datos tratados con base en su consentimiento." },
      { direito: "Revocación del consentimiento", desc: "Retirar el consentimiento para tratamientos basados en esa base legal, en cualquier momento." },
      { direito: "Oposición", desc: "Oponerse a tratamientos basados en interés legítimo cuando existan razones justificadas." },
      { direito: "Información", desc: "Saber con qué entidades compartimos sus datos y las bases legales utilizadas." },
    ],
    s9Outro1: "Para ejercer cualquiera de estos derechos, contáctenos por correo electrónico en",
    s9Outro2: ". Responderemos en un plazo de hasta 15 días hábiles, según lo exigido por la LGPD.",
    s10Title: "10. Transferencias Internacionales de Datos",
    s10Intro: "Acquafy opera globalmente y puede transferir sus datos personales a países fuera de Brasil o del Espacio Económico Europeo. En tales casos, garantizamos que la transferencia se realice con las salvaguardas adecuadas:",
    s10Items: [
      "Cláusulas contractuales estándar aprobadas por la Comisión Europea y la ANPD",
      "Transferencia a países que ofrecen un nivel de protección adecuado reconocido por la autoridad competente",
      "Certificaciones y códigos de conducta reconocidos internacionalmente",
      "Consentimiento explícito del titular cuando corresponda",
    ],
    s11Title: "11. Menores de Edad",
    s11Text1: "Nuestros Servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente datos personales de niños o adolescentes. Si tomamos conocimiento de que hemos recopilado datos de un menor sin consentimiento parental verificable, eliminaremos esos datos de inmediato.",
    s11Text2: "Si es responsable de un menor y cree que nos ha proporcionado datos personales, contáctenos por correo electrónico en",
    s12Title: "12. Cambios a Esta Política",
    s12Intro: "Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestros Servicios, en las leyes aplicables o en nuestras prácticas de privacidad. Cuando realicemos cambios materiales, notificaremos a través de:",
    s12Items: [
      "Aviso destacado en nuestro sitio web durante un período razonable",
      "Notificación por correo electrónico a los titulares con cuenta activa cuando los cambios sean significativos",
      "Actualización de la fecha de \"Última actualización\" al inicio de esta política",
    ],
    s12Outro: "Recomendamos que revise esta política regularmente. El uso continuado de los Servicios tras la entrada en vigor de los cambios constituye aceptación de los mismos.",
    s13Title: "13. Contacto y Delegado de Protección de Datos (DPO)",
    s13Intro: "Para cualquier pregunta, solicitud o reclamación relacionada con esta Política de Privacidad o con el tratamiento de sus datos personales, póngase en contacto con nuestro Delegado de Protección de Datos:",
    s13DpoTitle: "Delegado de Protección de Datos (DPO)",
    s13Labels: [["E-mail", "privacidade@acquafy.com"], ["Empresa", "Acquafy Corporation"], ["Sitio web", "acquafy.com/contato"]],
    s13Outro: "También tiene derecho a presentar una reclamación ante la Autoridad Nacional de Protección de Datos (ANPD) de Brasil o ante la autoridad supervisora competente en su país de residencia.",
  },
};

// ── Tipos ─────────────────────────────────────────────────────────────────────

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

type SubsectionProps = {
  title: string;
  children: React.ReactNode;
};

// ── Componentes internos ──────────────────────────────────────────────────────

function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="flex flex-col gap-[24px] scroll-mt-[100px]">
      <div className="flex flex-col gap-[12px]">
        <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[28px] leading-[34px] text-[#2a2a2b] mob:text-[22px] mob:leading-[28px]">
          {title}
        </h2>
        <div
          className="h-[3px] w-[48px] rounded-full"
          style={{ background: "linear-gradient(90deg, #0569ff, #0035c1)" }}
        />
      </div>
      <div className="flex flex-col gap-[16px]">{children}</div>
    </section>
  );
}

function Subsection({ title, children }: SubsectionProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[24px] text-[#1f2e91]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[26px] text-[#444]">
      {children}
    </p>
  );
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-[10px] pl-[4px]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-[12px] items-start">
          <span
            className="mt-[8px] shrink-0 size-[6px] rounded-full"
            style={{ background: "linear-gradient(135deg, #0569ff, #0035c1)" }}
          />
          <span className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[26px] text-[#444]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function PoliticasPrivacidadeContent() {
  const { lang } = useLang();
  const t = T[lang];
  return (
    <div className="px-[20px] py-[80px] w-full bg-white">
      <div className="max-w-[1200px] mx-auto w-full xl:grid xl:grid-cols-[260px_1fr] xl:gap-[60px]">

        {/* ── Sidebar de navegação (desktop only) ────────────────────────── */}
        <aside className="hidden xl:flex flex-col gap-[8px] sticky top-[100px] self-start">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[16px] text-[#888] uppercase tracking-[1px] mb-[8px]">
            {t.onThisPage}
          </p>
          {t.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[20px] text-[#555] hover:text-[#0569ff] transition-colors py-[4px] border-l-[2px] border-transparent hover:border-[#0569ff] pl-[12px]"
            >
              {item.label}
            </a>
          ))}
        </aside>

        {/* ── Conteúdo principal ─────────────────────────────────────────── */}
        <article className="flex flex-col gap-[56px] flex-1 min-w-0">

          {/* Intro */}
          <div
            className="flex flex-col gap-[16px] p-[32px] rounded-[16px] border border-[#e0e8ff]"
            style={{ background: "linear-gradient(135deg, #f8faff, #f0f4ff)" }}
          >
            <P>{t.intro1}</P>
            <P>{t.intro2}</P>
          </div>

          {/* 1. Controlador de Dados */}
          <Section id="controlador" title={t.s1Title}>
            <P>{t.s1Intro}</P>
            <div className="flex flex-col gap-[8px] p-[24px] rounded-[12px] bg-[#f8faff] border border-[#e0e8ff]">
              {t.s1Labels.map(([label, value]) => (
                <div key={label} className="flex gap-[12px] items-center">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#1f2e91] w-[80px] shrink-0">
                    {label}:
                  </span>
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#444]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* 2. Dados Coletados */}
          <Section id="coleta" title={t.s2Title}>
            <Subsection title={t.s21Title}>
              <UL items={t.s21Items} />
            </Subsection>
            <Subsection title={t.s22Title}>
              <UL items={t.s22Items} />
            </Subsection>
            <Subsection title={t.s23Title}>
              <UL items={t.s23Items} />
            </Subsection>
          </Section>

          {/* 3. Finalidades */}
          <Section id="finalidades" title={t.s3Title}>
            <P>{t.s3Intro}</P>
            <UL items={t.s3Items} />
          </Section>

          {/* 4. Bases Legais */}
          <Section id="bases-legais" title={t.s4Title}>
            <P>{t.s4Intro}</P>
            {t.s4Bases.map(({ base, desc }) => (
              <div key={base} className="flex gap-[16px] items-start p-[20px] rounded-[12px] bg-[#f8faff] border border-[#e0e8ff]">
                <div className="shrink-0 mt-[2px] size-[8px] rounded-full bg-[#0569ff] mt-[9px]" />
                <div className="flex flex-col gap-[4px]">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">{base}</span>
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[22px] text-[#555]">{desc}</span>
                </div>
              </div>
            ))}
          </Section>

          {/* 5. Compartilhamento */}
          <Section id="compartilhamento" title={t.s5Title}>
            <P>{t.s5Intro}</P>
            <Subsection title={t.s51Title}>
              <P>{t.s51Text}</P>
            </Subsection>
            <Subsection title={t.s52Title}>
              <P>{t.s52Text}</P>
            </Subsection>
            <Subsection title={t.s53Title}>
              <P>{t.s53Text}</P>
            </Subsection>
            <Subsection title={t.s54Title}>
              <P>{t.s54Text}</P>
            </Subsection>
          </Section>

          {/* 6. Cookies */}
          <Section id="cookies" title={t.s6Title}>
            <P>{t.s6Intro}</P>
            {t.s6Cookies.map(({ tipo, cor, desc }) => (
              <div key={tipo} className="flex gap-[16px] items-start">
                <span
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] px-[10px] py-[4px] rounded-full shrink-0 mt-[2px]"
                  style={{ color: cor, background: `${cor}18`, border: `1px solid ${cor}40` }}
                >
                  {tipo}
                </span>
                <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[24px] text-[#444]">
                  {desc}
                </span>
              </div>
            ))}
            <P>{t.s6Outro}</P>
          </Section>

          {/* 7. Retenção */}
          <Section id="retencao" title={t.s7Title}>
            <P>{t.s7Intro}</P>
            <UL items={t.s7Items} />
            <P>{t.s7Outro}</P>
          </Section>

          {/* 8. Segurança */}
          <Section id="seguranca" title={t.s8Title}>
            <P>{t.s8Intro}</P>
            <UL items={t.s8Items} />
            <P>{t.s8Outro}</P>
          </Section>

          {/* 9. Direitos */}
          <Section id="direitos" title={t.s9Title}>
            <P>{t.s9Intro}</P>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
              {t.s9Rights.map(({ direito, desc }) => (
                <div key={direito} className="flex flex-col gap-[8px] p-[20px] rounded-[12px] bg-[#f8faff] border border-[#e0e8ff]">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#0569ff]">{direito}</span>
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[22px] text-[#555]">{desc}</span>
                </div>
              ))}
            </div>
            <P>
              {t.s9Outro1}{" "}
              <a href="mailto:privacidade@acquafy.com" className="text-[#0569ff] underline underline-offset-2">
                privacidade@acquafy.com
              </a>
              {t.s9Outro2}
            </P>
          </Section>

          {/* 10. Transferências Internacionais */}
          <Section id="transferencias" title={t.s10Title}>
            <P>{t.s10Intro}</P>
            <UL items={t.s10Items} />
          </Section>

          {/* 11. Menores */}
          <Section id="menores" title={t.s11Title}>
            <P>{t.s11Text1}</P>
            <P>
              {t.s11Text2}{" "}
              <a href="mailto:privacidade@acquafy.com" className="text-[#0569ff] underline underline-offset-2">
                privacidade@acquafy.com
              </a>
              .
            </P>
          </Section>

          {/* 12. Alterações */}
          <Section id="alteracoes" title={t.s12Title}>
            <P>{t.s12Intro}</P>
            <UL items={t.s12Items} />
            <P>{t.s12Outro}</P>
          </Section>

          {/* 13. Contato */}
          <Section id="contato" title={t.s13Title}>
            <P>{t.s13Intro}</P>
            <div className="flex flex-col gap-[0px] p-[28px] rounded-[16px] border border-[#e0e8ff]"
              style={{ background: "linear-gradient(135deg, #f8faff, #f0f4ff)" }}
            >
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-[#1f2e91] mb-[16px]">
                {t.s13DpoTitle}
              </p>
              {t.s13Labels.map(([label, value]) => (
                <div key={label} className="flex gap-[12px] items-center py-[8px] border-b border-[#e0e8ff] last:border-0">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#1f2e91] w-[80px] shrink-0">
                    {label}:
                  </span>
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#444]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <P>{t.s13Outro}</P>
          </Section>

        </article>
      </div>
    </div>
  );
}
