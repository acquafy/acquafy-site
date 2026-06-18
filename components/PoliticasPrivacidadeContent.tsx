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
  "pt-pt": {
    onThisPage: "Nesta página",
    nav: [
      { id: "controlador",      label: "1. Responsável pelo Tratamento" },
      { id: "coleta",           label: "2. Dados Recolhidos" },
      { id: "finalidades",      label: "3. Finalidades do Tratamento" },
      { id: "bases-legais",     label: "4. Bases Legais" },
      { id: "compartilhamento", label: "5. Partilha de Dados" },
      { id: "cookies",          label: "6. Cookies" },
      { id: "retencao",         label: "7. Retenção" },
      { id: "seguranca",        label: "8. Segurança" },
      { id: "direitos",         label: "9. Os Seus Direitos" },
      { id: "transferencias",   label: "10. Transferências Internacionais" },
      { id: "menores",          label: "11. Menores de Idade" },
      { id: "alteracoes",       label: "12. Alterações" },
      { id: "contato",          label: "13. Contacto" },
    ],
    intro1: <>A <strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nós&quot; ou &quot;nosso&quot;) está comprometida com a protecção da sua privacidade. Esta Política de Privacidade descreve como tratamos os dados pessoais que nos fornece ou que recolhemos quando utiliza o nosso website, plataforma, aplicação e demais serviços (&quot;Serviços&quot;).</>,
    intro2: "Esta política está em conformidade com o Regulamento Geral sobre a Protecção de Dados (RGPD — Regulamento UE 2016/679) e demais legislações aplicáveis de privacidade e protecção de dados.",
    s1Title: "1. Responsável pelo Tratamento",
    s1Intro: "O responsável pelo tratamento dos seus dados pessoais é:",
    s1Labels: [["Empresa", "Acquafy Corporation"], ["E-mail", "privacidade@acquafy.com"], ["Website", "acquafy.com"]],
    s2Title: "2. Dados Pessoais que Recolhemos",
    s21Title: "2.1 Dados fornecidos por si",
    s21Items: [
      "Nome completo e endereço de e-mail ao criar uma conta ou preencher formulários de contacto",
      "Informações de morada e entrega para processamento de encomendas",
      "Dados de pagamento (processados de forma segura por prestadores certificados PCI-DSS)",
      "Mensagens, dúvidas e solicitações enviadas através dos nossos canais de suporte",
      "Preferências e configurações da sua conta na Plataforma Acquafy",
    ],
    s22Title: "2.2 Dados recolhidos automaticamente",
    s22Items: [
      "Endereço IP, tipo de navegador e sistema operativo",
      "Páginas visitadas, tempo de permanência e cliques (dados de navegação)",
      "Identificadores de dispositivo e dados de geolocalização aproximada",
      "Informações de utilização da aplicação Acquafy e dados de telemetria do purificador (IoT)",
      "Cookies e tecnologias similares (detalhados na Secção 6)",
    ],
    s23Title: "2.3 Dados recebidos de terceiros",
    s23Items: [
      "Informações de redes sociais quando opta por autenticar via login social",
      "Dados de parceiros de distribuição para suporte a revendedores e integradores",
      "Informações de verificação de identidade de prestadores de serviços autorizados",
    ],
    s3Title: "3. Finalidades do Tratamento",
    s3Intro: "Utilizamos os seus dados pessoais para as seguintes finalidades:",
    s3Items: [
      "Prestação dos Serviços: criação e gestão de conta, processamento de encomendas e entrega de produtos",
      "Suporte ao cliente: resposta a dúvidas, pedidos de manutenção e atendimento pós-venda",
      "Melhoria dos Serviços: análise de utilização da plataforma, app e dispositivos IoT para aperfeiçoar funcionalidades",
      "Comunicações de marketing: envio de newsletters, ofertas e novidades, mediante consentimento prévio",
      "Obrigações legais e regulatórias: cumprimento de exigências legais, fiscais e regulatórias aplicáveis",
      "Segurança e prevenção de fraude: detecção de actividades suspeitas e protecção da integridade dos Serviços",
      "Personalização: oferecer conteúdos, recomendações e experiências adaptadas ao seu perfil",
    ],
    s4Title: "4. Bases Legais para o Tratamento",
    s4Intro: "Tratamos os seus dados com fundamento nas seguintes bases legais previstas no RGPD:",
    s4Bases: [
      { base: "Execução de contrato", desc: "Tratamento necessário para a prestação dos Serviços por si contratados." },
      { base: "Obrigação legal", desc: "Cumprimento de obrigações previstas em lei, regulamentos ou determinações de autoridades." },
      { base: "Interesse legítimo", desc: "Melhoria dos Serviços, segurança, prevenção de fraude e comunicações institucionais, desde que não prevaleçam sobre os seus direitos." },
      { base: "Consentimento", desc: "Envio de comunicações de marketing e utilização de cookies não essenciais. Pode retirar o consentimento a qualquer momento." },
    ],
    s5Title: "5. Partilha de Dados",
    s5Intro: "Não vendemos os seus dados pessoais a terceiros. Podemos partilhá-los apenas nas seguintes situações:",
    s51Title: "5.1 Prestadores de serviços",
    s51Text: "Partilhamos dados com fornecedores que nos auxiliam na operação dos Serviços (processamento de pagamentos, alojamento em nuvem, envio de e-mails, análise de dados), sempre sob acordo de processamento de dados e com obrigações de confidencialidade e segurança.",
    s52Title: "5.2 Parceiros de distribuição",
    s52Text: "Revendedores e integradores autorizados da rede Acquafy podem receber dados necessários para a execução de encomendas, suporte técnico e instalação de dispositivos na sua região.",
    s53Title: "5.3 Obrigação legal",
    s53Text: "Podemos divulgar dados quando exigido por lei, decisão judicial ou autoridade competente, ou quando necessário para proteger direitos e segurança da Acquafy, dos nossos utilizadores ou de terceiros.",
    s54Title: "5.4 Transferências corporativas",
    s54Text: "Em caso de fusão, aquisição ou venda de activos, os dados poderão ser transferidos ao novo responsável, que ficará vinculado às obrigações desta política.",
    s6Title: "6. Cookies e Tecnologias de Rastreamento",
    s6Intro: "Utilizamos cookies e tecnologias similares para melhorar a sua experiência nos nossos Serviços. Os cookies são classificados em:",
    s6Cookies: [
      { tipo: "Essenciais", cor: "#0569ff", desc: "Necessários para o funcionamento básico do website e da plataforma (autenticação, segurança, preferências de sessão). Não podem ser desactivados." },
      { tipo: "Analíticos", cor: "#7b5ea7", desc: "Permitem-nos compreender como os visitantes utilizam o site (páginas visitadas, tempo de permanência). Utilizamos ferramentas como o Google Analytics." },
      { tipo: "Funcionais", cor: "#0ab572", desc: "Armazenam preferências como idioma, localização e configurações personalizadas para melhorar a sua experiência." },
      { tipo: "Marketing", cor: "#e05c00", desc: "Utilizados para apresentar publicidade relevante e medir a eficácia de campanhas. Requerem o seu consentimento prévio." },
    ],
    s6Outro: "Pode gerir as suas preferências de cookies a qualquer momento através das configurações do seu navegador ou do painel de consentimento disponível no nosso site.",
    s7Title: "7. Retenção de Dados",
    s7Intro: "Conservamos os seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, salvo quando a lei exija ou permita um período maior. Os critérios utilizados para determinar o prazo de retenção incluem:",
    s7Items: [
      "Período em que mantiver uma conta activa nos nossos Serviços",
      "Obrigações legais e regulatórias de retenção (ex.: dados fiscais por 5 anos)",
      "Prazo prescricional aplicável para eventuais litígios ou reclamações",
      "Necessidade de manter registos para segurança e prevenção de fraude",
    ],
    s7Outro: "Após o encerramento da relação contratual e findo o prazo de retenção aplicável, os dados são eliminados de forma segura ou anonimizados.",
    s8Title: "8. Segurança dos Dados",
    s8Intro: "Adoptamos medidas técnicas e organizacionais adequadas para proteger os seus dados contra acesso não autorizado, perda, destruição ou divulgação indevida, incluindo:",
    s8Items: [
      "Encriptação em trânsito (TLS/HTTPS) e em repouso para dados sensíveis",
      "Controlos de acesso baseados em funções (RBAC) e autenticação multifactor para sistemas internos",
      "Monitorização contínua de segurança e gestão de vulnerabilidades",
      "Programas regulares de formação e sensibilização em privacidade para colaboradores",
      "Procedimentos de resposta a incidentes de segurança com notificação às autoridades e titulares quando exigido por lei",
    ],
    s8Outro: "Nenhum sistema de transmissão ou armazenamento de dados é 100% seguro. Em caso de incidente que coloque os seus dados em risco, notificaremos as autoridades competentes e os titulares afectados nos prazos legais.",
    s9Title: "9. Os Seus Direitos como Titular",
    s9Intro: "Nos termos do RGPD e demais legislações aplicáveis, possui os seguintes direitos em relação aos seus dados pessoais:",
    s9Rights: [
      { direito: "Confirmação e acesso", desc: "Saber se tratamos os seus dados e obter cópia dos mesmos." },
      { direito: "Rectificação", desc: "Solicitar a rectificação de dados incompletos, inexactos ou desactualizados." },
      { direito: "Anonimização / Bloqueio / Eliminação", desc: "Para dados desnecessários, excessivos ou tratados em desconformidade com a lei." },
      { direito: "Portabilidade", desc: "Receber os seus dados em formato estruturado para transferência a outro fornecedor." },
      { direito: "Eliminação", desc: "Solicitar a exclusão dos dados tratados com base no seu consentimento." },
      { direito: "Revogação do consentimento", desc: "Retirar o consentimento para tratamentos baseados nessa base legal, a qualquer momento." },
      { direito: "Oposição", desc: "Opor-se a tratamentos baseados em interesse legítimo quando houver razões justificadas." },
      { direito: "Informação", desc: "Saber com que entidades partilhamos os seus dados e as bases legais utilizadas." },
    ],
    s9Outro1: "Para exercer qualquer um destes direitos, entre em contacto pelo e-mail",
    s9Outro2: ". Responderemos no prazo de até 30 dias, conforme previsto no RGPD.",
    s10Title: "10. Transferências Internacionais de Dados",
    s10Intro: "A Acquafy opera globalmente e pode transferir os seus dados pessoais para países fora do Espaço Económico Europeu. Nestes casos, garantimos que a transferência seja realizada com salvaguardas adequadas:",
    s10Items: [
      "Cláusulas contratuais padrão aprovadas pela Comissão Europeia",
      "Transferência para países que oferecem nível de protecção adequado reconhecido pela autoridade competente",
      "Certificações e códigos de conduta reconhecidos internacionalmente",
      "Consentimento explícito do titular quando aplicável",
    ],
    s11Title: "11. Menores de Idade",
    s11Text1: "Os nossos Serviços não são destinados a menores de 18 anos. Não recolhemos intencionalmente dados pessoais de crianças ou adolescentes. Se tomarmos conhecimento de que recolhemos dados de um menor sem consentimento parental verificável, eliminaremos esses dados imediatamente.",
    s11Text2: "Se for responsável por uma criança e acreditar que nos forneceu dados pessoais, contacte-nos pelo e-mail",
    s12Title: "12. Alterações a Esta Política",
    s12Intro: "Podemos actualizar esta Política de Privacidade periodicamente para reflectir alterações nos nossos Serviços, nas leis aplicáveis ou nas nossas práticas de privacidade. Quando fizermos alterações materiais, notificaremos através de:",
    s12Items: [
      "Aviso de destaque no nosso website por um período razoável",
      "Notificação por e-mail para titulares com conta activa, quando as alterações forem significativas",
      "Actualização da data de \"Última actualização\" no início desta política",
    ],
    s12Outro: "Recomendamos que reveja esta política regularmente. A utilização continuada dos Serviços após a entrada em vigor das alterações constitui aceitação das mesmas.",
    s13Title: "13. Contacto e Encarregado de Protecção de Dados (DPO)",
    s13Intro: "Para quaisquer questões, pedidos ou reclamações relacionadas com esta Política de Privacidade ou com o tratamento dos seus dados pessoais, entre em contacto com o nosso Encarregado de Protecção de Dados:",
    s13DpoTitle: "Encarregado de Protecção de Dados (DPO)",
    s13Labels: [["E-mail", "privacidade@acquafy.com"], ["Empresa", "Acquafy Corporation"], ["Website", "acquafy.com/contato"]],
    s13Outro: "Tem também o direito de apresentar reclamação à autoridade de controlo competente no seu país de residência, nomeadamente à Comissão Nacional de Protecção de Dados (CNPD) em Portugal.",
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
  fr: {
    onThisPage: "Sur cette page",
    nav: [
      { id: "controlador",      label: "1. Responsable du traitement" },
      { id: "coleta",           label: "2. Données collectées" },
      { id: "finalidades",      label: "3. Finalités du traitement" },
      { id: "bases-legais",     label: "4. Bases légales" },
      { id: "compartilhamento", label: "5. Partage des données" },
      { id: "cookies",          label: "6. Cookies" },
      { id: "retencao",         label: "7. Conservation" },
      { id: "seguranca",        label: "8. Sécurité" },
      { id: "direitos",         label: "9. Vos droits" },
      { id: "transferencias",   label: "10. Transferts internationaux" },
      { id: "menores",          label: "11. Mineurs" },
      { id: "alteracoes",       label: "12. Modifications" },
      { id: "contato",          label: "13. Contact" },
    ],
    intro1: <><strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nous&quot; ou &quot;notre&quot;) s&apos;engage à protéger votre vie privée. Cette Politique de Confidentialité décrit comment nous traitons les données personnelles que vous nous fournissez ou que nous collectons lorsque vous utilisez notre site web, notre plateforme, notre application et nos autres services (&quot;Services&quot;).</>,
    intro2: "Cette politique est conforme à la loi brésilienne de protection des données (LGPD — Loi n° 13.709/2018), au Règlement général sur la protection des données de l'Union européenne (RGPD/GDPR) et aux autres législations applicables en matière de protection des données.",
    s1Title: "1. Responsable du traitement",
    s1Intro: "Le responsable du traitement de vos données personnelles est :",
    s1Labels: [["Entreprise", "Acquafy Corporation"], ["E-mail", "privacidade@acquafy.com"], ["Site web", "acquafy.com"]],
    s2Title: "2. Données personnelles que nous collectons",
    s21Title: "2.1 Données que vous nous fournissez",
    s21Items: [
      "Nom complet et adresse e-mail lors de la création d'un compte ou du remplissage de formulaires de contact",
      "Informations d'adresse et de livraison pour le traitement des commandes",
      "Données de paiement (traitées de manière sécurisée par des prestataires certifiés PCI-DSS)",
      "Messages, questions et demandes envoyés via nos canaux d'assistance",
      "Préférences et paramètres de votre compte sur la Plateforme Acquafy",
    ],
    s22Title: "2.2 Données collectées automatiquement",
    s22Items: [
      "Adresse IP, type de navigateur et système d'exploitation",
      "Pages visitées, temps passé et clics (données de navigation)",
      "Identifiants d'appareils et données de géolocalisation approximative",
      "Informations d'utilisation de l'application Acquafy et données de télémétrie du purificateur (IoT)",
      "Cookies et technologies similaires (détaillés à la Section 6)",
    ],
    s23Title: "2.3 Données reçues de tiers",
    s23Items: [
      "Informations des réseaux sociaux lorsque vous choisissez de vous authentifier via la connexion sociale",
      "Données des partenaires de distribution pour soutenir les revendeurs et les intégrateurs",
      "Informations de vérification d'identité de prestataires de services autorisés",
    ],
    s3Title: "3. Finalités du traitement",
    s3Intro: "Nous utilisons vos données personnelles aux fins suivantes :",
    s3Items: [
      "Prestation des Services : création et gestion de compte, traitement des commandes et livraison des produits",
      "Assistance client : réponse aux questions, demandes de maintenance et service après-vente",
      "Amélioration des Services : analyse de l'utilisation de la plateforme, de l'application et des appareils IoT pour améliorer les fonctionnalités",
      "Communications marketing : envoi de newsletters, d'offres et d'actualités, avec consentement préalable",
      "Obligations légales et réglementaires : conformité aux exigences légales, fiscales et réglementaires applicables",
      "Sécurité et prévention de la fraude : détection des activités suspectes et protection de l'intégrité des Services",
      "Personnalisation : proposer des contenus, recommandations et expériences adaptés à votre profil",
    ],
    s4Title: "4. Bases légales du traitement",
    s4Intro: "Nous traitons vos données sur les bases légales suivantes prévues par la LGPD et le RGPD :",
    s4Bases: [
      { base: "Exécution du contrat", desc: "Traitement nécessaire à la fourniture des Services que vous avez contractés." },
      { base: "Obligation légale", desc: "Conformité aux obligations prévues par la loi, les réglementations ou les ordres des autorités." },
      { base: "Intérêt légitime", desc: "Amélioration des Services, sécurité, prévention de la fraude et communications institutionnelles, à condition qu'ils ne prévalent pas sur vos droits." },
      { base: "Consentement", desc: "Envoi de communications marketing et utilisation de cookies non essentiels. Vous pouvez retirer votre consentement à tout moment." },
    ],
    s5Title: "5. Partage des données",
    s5Intro: "Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons les partager uniquement dans les situations suivantes :",
    s51Title: "5.1 Prestataires de services",
    s51Text: "Nous partageons des données avec des fournisseurs qui nous aident à exploiter les Services (traitement des paiements, hébergement cloud, envoi d'e-mails, analyse des données), toujours dans le cadre d'un accord de traitement des données avec des obligations de confidentialité et de sécurité.",
    s52Title: "5.2 Partenaires de distribution",
    s52Text: "Les revendeurs et intégrateurs autorisés du réseau Acquafy peuvent recevoir les données nécessaires à l'exécution des commandes, au support technique et à l'installation des appareils dans votre région.",
    s53Title: "5.3 Obligation légale",
    s53Text: "Nous pouvons divulguer des données lorsque la loi, une décision judiciaire ou une autorité compétente l'exige, ou lorsque cela est nécessaire pour protéger les droits et la sécurité d'Acquafy, de nos utilisateurs ou de tiers.",
    s54Title: "5.4 Transferts d'entreprise",
    s54Text: "En cas de fusion, d'acquisition ou de vente d'actifs, les données pourront être transférées au nouveau responsable du traitement, qui sera lié par les obligations de cette politique.",
    s6Title: "6. Cookies et technologies de suivi",
    s6Intro: "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience avec nos Services. Les cookies sont classés comme suit :",
    s6Cookies: [
      { tipo: "Essentiels", cor: "#0569ff", desc: "Nécessaires au fonctionnement de base du site web et de la plateforme (authentification, sécurité, préférences de session). Ne peuvent pas être désactivés." },
      { tipo: "Analytiques", cor: "#7b5ea7", desc: "Nous permettent de comprendre comment les visiteurs utilisent le site (pages visitées, temps passé). Nous utilisons des outils tels que Google Analytics." },
      { tipo: "Fonctionnels", cor: "#0ab572", desc: "Enregistrent les préférences telles que la langue, la localisation et les paramètres personnalisés pour améliorer votre expérience." },
      { tipo: "Marketing", cor: "#e05c00", desc: "Utilisés pour afficher des publicités pertinentes et mesurer l'efficacité des campagnes. Nécessitent votre consentement préalable." },
    ],
    s6Outro: "Vous pouvez gérer vos préférences en matière de cookies à tout moment via les paramètres de votre navigateur ou le panneau de consentement disponible sur notre site.",
    s7Title: "7. Conservation des données",
    s7Intro: "Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités décrites dans cette politique, sauf si la loi exige ou permet une période plus longue. Les critères utilisés pour déterminer la durée de conservation comprennent :",
    s7Items: [
      "Période pendant laquelle vous maintenez un compte actif sur nos Services",
      "Obligations légales et réglementaires de conservation (ex. : données fiscales pendant 5 ans)",
      "Délais de prescription applicables pour les litiges ou réclamations éventuels",
      "Nécessité de conserver des enregistrements pour la sécurité et la prévention de la fraude",
    ],
    s7Outro: "Après la fin de la relation contractuelle et l'expiration de la période de conservation applicable, les données sont supprimées de manière sécurisée ou anonymisées.",
    s8Title: "8. Sécurité des données",
    s8Intro: "Nous adoptons des mesures techniques et organisationnelles appropriées pour protéger vos données contre les accès non autorisés, la perte, la destruction ou la divulgation inappropriée, notamment :",
    s8Items: [
      "Chiffrement en transit (TLS/HTTPS) et au repos pour les données sensibles",
      "Contrôles d'accès basés sur les rôles (RBAC) et authentification multifacteur pour les systèmes internes",
      "Surveillance continue de la sécurité et gestion des vulnérabilités",
      "Programmes réguliers de formation et de sensibilisation à la confidentialité pour les employés",
      "Procédures de réponse aux incidents de sécurité avec notification aux autorités et aux personnes concernées lorsque la loi l'exige",
    ],
    s8Outro: "Aucun système de transmission ou de stockage de données n'est sécurisé à 100 %. En cas d'incident mettant vos données en danger, nous en informerons les autorités compétentes et les personnes concernées dans les délais légaux.",
    s9Title: "9. Vos droits en tant que personne concernée",
    s9Intro: "En vertu de la LGPD et des autres législations applicables, vous disposez des droits suivants concernant vos données personnelles :",
    s9Rights: [
      { direito: "Confirmation et accès", desc: "Savoir si nous traitons vos données et en obtenir une copie." },
      { direito: "Rectification", desc: "Demander la correction de données incomplètes, inexactes ou obsolètes." },
      { direito: "Anonymisation / Blocage / Suppression", desc: "Pour les données inutiles, excessives ou traitées illégalement." },
      { direito: "Portabilité", desc: "Recevoir vos données dans un format structuré pour les transférer à un autre prestataire." },
      { direito: "Suppression", desc: "Demander la suppression des données traitées sur la base de votre consentement." },
      { direito: "Retrait du consentement", desc: "Retirer le consentement au traitement basé sur cette base légale, à tout moment." },
      { direito: "Opposition", desc: "S'opposer au traitement basé sur un intérêt légitime lorsqu'il existe des raisons justifiées." },
      { direito: "Information", desc: "Savoir avec quelles entités nous partageons vos données et les bases légales utilisées." },
    ],
    s9Outro1: "Pour exercer l'un de ces droits, contactez-nous par e-mail à",
    s9Outro2: ". Nous répondrons dans un délai de 15 jours ouvrables, conformément aux exigences de la LGPD.",
    s10Title: "10. Transferts internationaux de données",
    s10Intro: "Acquafy opère à l'échelle mondiale et peut transférer vos données personnelles vers des pays situés en dehors du Brésil ou de l'Espace économique européen. Dans ces cas, nous garantissons que le transfert est effectué avec des garanties appropriées :",
    s10Items: [
      "Clauses contractuelles types approuvées par la Commission européenne et l'ANPD",
      "Transfert vers des pays offrant un niveau de protection adéquat reconnu par l'autorité compétente",
      "Certifications et codes de conduite reconnus internationalement",
      "Consentement explicite de la personne concernée le cas échéant",
    ],
    s11Title: "11. Mineurs",
    s11Text1: "Nos Services ne sont pas destinés aux personnes de moins de 18 ans. Nous ne collectons pas intentionnellement de données personnelles d'enfants ou d'adolescents. Si nous apprenons que nous avons collecté des données d'un mineur sans consentement parental vérifiable, nous supprimerons immédiatement ces données.",
    s11Text2: "Si vous êtes le tuteur d'un enfant et pensez qu'il nous a fourni des données personnelles, veuillez nous contacter par e-mail à",
    s12Title: "12. Modifications de cette politique",
    s12Intro: "Nous pouvons mettre à jour cette Politique de Confidentialité périodiquement pour refléter des changements dans nos Services, les lois applicables ou nos pratiques de confidentialité. Lorsque nous apportons des modifications importantes, nous vous en informerons via :",
    s12Items: [
      "Un avis bien visible sur notre site web pendant une période raisonnable",
      "Une notification par e-mail aux titulaires de compte lorsque les modifications sont importantes",
      "La mise à jour de la date de « Dernière mise à jour » en haut de cette politique",
    ],
    s12Outro: "Nous vous recommandons de consulter régulièrement cette politique. La poursuite de l'utilisation des Services après l'entrée en vigueur des modifications vaut acceptation de celles-ci.",
    s13Title: "13. Contact et Délégué à la protection des données (DPO)",
    s13Intro: "Pour toute question, demande ou réclamation relative à cette Politique de Confidentialité ou au traitement de vos données personnelles, veuillez contacter notre Délégué à la protection des données :",
    s13DpoTitle: "Délégué à la protection des données (DPO)",
    s13Labels: [["E-mail", "privacidade@acquafy.com"], ["Entreprise", "Acquafy Corporation"], ["Site web", "acquafy.com/contato"]],
    s13Outro: "Vous avez également le droit de déposer une plainte auprès de l'Autorité nationale de protection des données (ANPD) du Brésil ou de l'autorité de contrôle compétente dans votre pays de résidence.",
  },
  de: {
    onThisPage: "Auf dieser Seite",
    nav: [
      { id: "controlador",      label: "1. Verantwortlicher" },
      { id: "coleta",           label: "2. Erhobene Daten" },
      { id: "finalidades",      label: "3. Verarbeitungszwecke" },
      { id: "bases-legais",     label: "4. Rechtsgrundlagen" },
      { id: "compartilhamento", label: "5. Datenweitergabe" },
      { id: "cookies",          label: "6. Cookies" },
      { id: "retencao",         label: "7. Speicherung" },
      { id: "seguranca",        label: "8. Sicherheit" },
      { id: "direitos",         label: "9. Ihre Rechte" },
      { id: "transferencias",   label: "10. Internationale Übermittlungen" },
      { id: "menores",          label: "11. Minderjährige" },
      { id: "alteracoes",       label: "12. Änderungen" },
      { id: "contato",          label: "13. Kontakt" },
    ],
    intro1: <><strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;wir&quot; oder &quot;unser&quot;) ist zum Schutz Ihrer Privatsphäre verpflichtet. Diese Datenschutzrichtlinie beschreibt, wie wir die personenbezogenen Daten verarbeiten, die Sie uns bereitstellen oder die wir erfassen, wenn Sie unsere Website, Plattform, Anwendung und sonstige Dienste (&quot;Dienste&quot;) nutzen.</>,
    intro2: "Diese Richtlinie entspricht dem brasilianischen Datenschutzgesetz (LGPD — Gesetz Nr. 13.709/2018), der Datenschutz-Grundverordnung der Europäischen Union (DSGVO/GDPR) und anderen anwendbaren Datenschutzgesetzen.",
    s1Title: "1. Verantwortlicher",
    s1Intro: "Der Verantwortliche für die Verarbeitung Ihrer personenbezogenen Daten ist:",
    s1Labels: [["Unternehmen", "Acquafy Corporation"], ["E-Mail", "privacidade@acquafy.com"], ["Website", "acquafy.com"]],
    s2Title: "2. Personenbezogene Daten, die wir erheben",
    s21Title: "2.1 Von Ihnen bereitgestellte Daten",
    s21Items: [
      "Vollständiger Name und E-Mail-Adresse bei der Kontoerstellung oder beim Ausfüllen von Kontaktformularen",
      "Adress- und Lieferinformationen zur Auftragsbearbeitung",
      "Zahlungsdaten (sicher verarbeitet von PCI-DSS-zertifizierten Anbietern)",
      "Nachrichten, Anfragen und Fragen, die über unsere Support-Kanäle gesendet werden",
      "Präferenzen und Einstellungen Ihres Kontos auf der Acquafy-Plattform",
    ],
    s22Title: "2.2 Automatisch erhobene Daten",
    s22Items: [
      "IP-Adresse, Browsertyp und Betriebssystem",
      "Besuchte Seiten, Verweildauer und Klicks (Browsing-Daten)",
      "Gerätekennungen und ungefähre Standortdaten",
      "Informationen zur Nutzung der Acquafy-App und Telemetriedaten des Wasserfilters (IoT)",
      "Cookies und ähnliche Technologien (detailliert in Abschnitt 6)",
    ],
    s23Title: "2.3 Von Dritten empfangene Daten",
    s23Items: [
      "Informationen aus sozialen Netzwerken, wenn Sie sich über Social Login authentifizieren",
      "Daten von Vertriebspartnern zur Unterstützung von Wiederverkäufern und Integratoren",
      "Identitätsverifizierungsinformationen von autorisierten Dienstleistern",
    ],
    s3Title: "3. Verarbeitungszwecke",
    s3Intro: "Wir verwenden Ihre personenbezogenen Daten für folgende Zwecke:",
    s3Items: [
      "Erbringung der Dienste: Kontoerstellung und -verwaltung, Auftragsbearbeitung und Produktlieferung",
      "Kundensupport: Beantwortung von Anfragen, Wartungsanfragen und After-Sales-Service",
      "Verbesserung der Dienste: Analyse der Nutzung von Plattform, App und IoT-Geräten zur Verbesserung der Funktionen",
      "Marketingkommunikation: Versand von Newslettern, Angeboten und Neuigkeiten mit vorheriger Einwilligung",
      "Rechtliche und regulatorische Verpflichtungen: Einhaltung der anwendbaren gesetzlichen, steuerlichen und regulatorischen Anforderungen",
      "Sicherheit und Betrugsprävention: Erkennung verdächtiger Aktivitäten und Schutz der Integrität der Dienste",
      "Personalisierung: Angebot von Inhalten, Empfehlungen und Erlebnissen, die Ihrem Profil angepasst sind",
    ],
    s4Title: "4. Rechtsgrundlagen der Verarbeitung",
    s4Intro: "Wir verarbeiten Ihre Daten auf folgenden Rechtsgrundlagen gemäß LGPD und DSGVO:",
    s4Bases: [
      { base: "Vertragserfüllung", desc: "Verarbeitung, die zur Erbringung der von Ihnen in Anspruch genommenen Dienste erforderlich ist." },
      { base: "Rechtliche Verpflichtung", desc: "Einhaltung von gesetzlichen, regulatorischen oder behördlichen Verpflichtungen." },
      { base: "Berechtigtes Interesse", desc: "Verbesserung der Dienste, Sicherheit, Betrugsprävention und institutionelle Kommunikation, sofern diese Ihre Rechte nicht überwiegen." },
      { base: "Einwilligung", desc: "Versand von Marketingkommunikation und Verwendung nicht wesentlicher Cookies. Sie können Ihre Einwilligung jederzeit widerrufen." },
    ],
    s5Title: "5. Datenweitergabe",
    s5Intro: "Wir verkaufen Ihre personenbezogenen Daten nicht an Dritte. Wir können sie nur in den folgenden Situationen weitergeben:",
    s51Title: "5.1 Dienstleister",
    s51Text: "Wir geben Daten an Anbieter weiter, die uns beim Betrieb der Dienste unterstützen (Zahlungsabwicklung, Cloud-Hosting, E-Mail-Versand, Datenanalyse), immer im Rahmen einer Datenverarbeitungsvereinbarung mit Vertraulichkeits- und Sicherheitspflichten.",
    s52Title: "5.2 Vertriebspartner",
    s52Text: "Autorisierte Wiederverkäufer und Integratoren im Acquafy-Netzwerk können Daten erhalten, die für die Auftragserfüllung, den technischen Support und die Geräteinstallation in Ihrer Region erforderlich sind.",
    s53Title: "5.3 Rechtliche Verpflichtung",
    s53Text: "Wir können Daten offenlegen, wenn dies gesetzlich, durch Gerichtsbeschluss oder durch eine zuständige Behörde verlangt wird, oder wenn es zum Schutz der Rechte und Sicherheit von Acquafy, unseren Nutzern oder Dritten erforderlich ist.",
    s54Title: "5.4 Unternehmenstransaktionen",
    s54Text: "Im Falle einer Fusion, Übernahme oder eines Verkaufs von Vermögenswerten können Daten an den neuen Verantwortlichen übertragen werden, der an die Pflichten dieser Richtlinie gebunden ist.",
    s6Title: "6. Cookies und Tracking-Technologien",
    s6Intro: "Wir verwenden Cookies und ähnliche Technologien, um Ihre Erfahrung mit unseren Diensten zu verbessern. Cookies werden wie folgt klassifiziert:",
    s6Cookies: [
      { tipo: "Wesentliche", cor: "#0569ff", desc: "Für den grundlegenden Betrieb der Website und Plattform erforderlich (Authentifizierung, Sicherheit, Sitzungseinstellungen). Können nicht deaktiviert werden." },
      { tipo: "Analytische", cor: "#7b5ea7", desc: "Ermöglichen es uns zu verstehen, wie Besucher die Website nutzen (besuchte Seiten, Verweildauer). Wir verwenden Tools wie Google Analytics." },
      { tipo: "Funktionale", cor: "#0ab572", desc: "Speichern Präferenzen wie Sprache, Standort und benutzerdefinierte Einstellungen zur Verbesserung Ihrer Erfahrung." },
      { tipo: "Marketing", cor: "#e05c00", desc: "Werden verwendet, um relevante Werbung anzuzeigen und die Wirksamkeit von Kampagnen zu messen. Erfordern Ihre vorherige Einwilligung." },
    ],
    s6Outro: "Sie können Ihre Cookie-Einstellungen jederzeit über die Einstellungen Ihres Browsers oder das auf unserer Website verfügbare Einwilligungspanel verwalten.",
    s7Title: "7. Datenspeicherung",
    s7Intro: "Wir speichern Ihre personenbezogenen Daten so lange, wie es zur Erfüllung der in dieser Richtlinie beschriebenen Zwecke erforderlich ist, es sei denn, das Gesetz schreibt einen längeren Zeitraum vor oder erlaubt ihn. Zu den Kriterien für die Festlegung der Speicherfristen gehören:",
    s7Items: [
      "Zeitraum, in dem Sie ein aktives Konto bei unseren Diensten aufrechterhalten",
      "Gesetzliche und regulatorische Aufbewahrungspflichten (z. B. Steuerdaten für 5 Jahre)",
      "Anwendbare Verjährungsfristen für mögliche Streitigkeiten oder Ansprüche",
      "Notwendigkeit, Aufzeichnungen für Sicherheit und Betrugsprävention aufzubewahren",
    ],
    s7Outro: "Nach Beendigung des Vertragsverhältnisses und Ablauf der anwendbaren Aufbewahrungsfrist werden die Daten sicher gelöscht oder anonymisiert.",
    s8Title: "8. Datensicherheit",
    s8Intro: "Wir ergreifen angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer Daten vor unbefugtem Zugriff, Verlust, Vernichtung oder unzulässiger Offenlegung, einschließlich:",
    s8Items: [
      "Verschlüsselung bei der Übertragung (TLS/HTTPS) und im Ruhezustand für sensible Daten",
      "Rollenbasierte Zugriffskontrollen (RBAC) und Multi-Faktor-Authentifizierung für interne Systeme",
      "Kontinuierliche Sicherheitsüberwachung und Schwachstellenmanagement",
      "Regelmäßige Schulungs- und Sensibilisierungsprogramme für Mitarbeiter im Bereich Datenschutz",
      "Sicherheitsvorfall-Reaktionsverfahren mit Benachrichtigung der Behörden und Betroffenen, wenn gesetzlich vorgeschrieben",
    ],
    s8Outro: "Kein Datenübertragungs- oder -speichersystem ist 100 % sicher. Im Falle eines Vorfalls, der Ihre Daten gefährdet, werden wir die zuständigen Behörden und betroffenen Personen innerhalb der gesetzlichen Fristen benachrichtigen.",
    s9Title: "9. Ihre Rechte als betroffene Person",
    s9Intro: "Gemäß der LGPD und anderen anwendbaren Gesetzen haben Sie die folgenden Rechte in Bezug auf Ihre personenbezogenen Daten:",
    s9Rights: [
      { direito: "Bestätigung und Zugang", desc: "Erfahren, ob wir Ihre Daten verarbeiten, und eine Kopie erhalten." },
      { direito: "Berichtigung", desc: "Berichtigung unvollständiger, unrichtiger oder veralteter Daten beantragen." },
      { direito: "Anonymisierung / Sperrung / Löschung", desc: "Für unnötige, übermäßige oder rechtswidrig verarbeitete Daten." },
      { direito: "Übertragbarkeit", desc: "Ihre Daten in einem strukturierten Format zur Übertragung an einen anderen Anbieter erhalten." },
      { direito: "Löschung", desc: "Löschung von Daten beantragen, die auf der Grundlage Ihrer Einwilligung verarbeitet werden." },
      { direito: "Widerruf der Einwilligung", desc: "Die Einwilligung zur Verarbeitung auf der Grundlage dieser Rechtsgrundlage jederzeit widerrufen." },
      { direito: "Widerspruch", desc: "Der Verarbeitung auf der Grundlage berechtigter Interessen widersprechen, wenn berechtigte Gründe vorliegen." },
      { direito: "Information", desc: "Erfahren, mit welchen Stellen wir Ihre Daten teilen und welche Rechtsgrundlagen verwendet werden." },
    ],
    s9Outro1: "Um eines dieser Rechte auszuüben, kontaktieren Sie uns per E-Mail unter",
    s9Outro2: ". Wir werden innerhalb von 15 Werktagen antworten, wie von der LGPD gefordert.",
    s10Title: "10. Internationale Datenübermittlungen",
    s10Intro: "Acquafy ist global tätig und kann Ihre personenbezogenen Daten in Länder außerhalb Brasiliens oder des Europäischen Wirtschaftsraums übermitteln. In solchen Fällen stellen wir sicher, dass die Übermittlung mit angemessenen Schutzmaßnahmen erfolgt:",
    s10Items: [
      "Von der Europäischen Kommission und der ANPD genehmigte Standardvertragsklauseln",
      "Übermittlung in Länder, die ein von der zuständigen Behörde anerkanntes angemessenes Schutzniveau bieten",
      "International anerkannte Zertifizierungen und Verhaltenskodizes",
      "Ausdrückliche Einwilligung der betroffenen Person, sofern zutreffend",
    ],
    s11Title: "11. Minderjährige",
    s11Text1: "Unsere Dienste richten sich nicht an Personen unter 18 Jahren. Wir erheben nicht absichtlich personenbezogene Daten von Kindern oder Jugendlichen. Wenn wir feststellen, dass wir Daten eines Minderjährigen ohne überprüfbare elterliche Einwilligung erhoben haben, werden wir diese Daten unverzüglich löschen.",
    s11Text2: "Wenn Sie Erziehungsberechtigter eines Kindes sind und glauben, dass es uns personenbezogene Daten übermittelt hat, kontaktieren Sie uns bitte per E-Mail unter",
    s12Title: "12. Änderungen dieser Richtlinie",
    s12Intro: "Wir können diese Datenschutzrichtlinie regelmäßig aktualisieren, um Änderungen unserer Dienste, der anwendbaren Gesetze oder unserer Datenschutzpraktiken widerzuspiegeln. Wenn wir wesentliche Änderungen vornehmen, werden wir Sie darüber informieren durch:",
    s12Items: [
      "Einen prominenten Hinweis auf unserer Website für einen angemessenen Zeitraum",
      "E-Mail-Benachrichtigung an Kontoinhaber, wenn die Änderungen erheblich sind",
      "Aktualisierung des Datums \"Zuletzt aktualisiert\" am Anfang dieser Richtlinie",
    ],
    s12Outro: "Wir empfehlen Ihnen, diese Richtlinie regelmäßig zu überprüfen. Die weitere Nutzung der Dienste nach Inkrafttreten der Änderungen gilt als Annahme derselben.",
    s13Title: "13. Kontakt und Datenschutzbeauftragter (DSB)",
    s13Intro: "Bei Fragen, Anfragen oder Beschwerden zu dieser Datenschutzrichtlinie oder zur Verarbeitung Ihrer personenbezogenen Daten wenden Sie sich bitte an unseren Datenschutzbeauftragten:",
    s13DpoTitle: "Datenschutzbeauftragter (DSB)",
    s13Labels: [["E-Mail", "privacidade@acquafy.com"], ["Unternehmen", "Acquafy Corporation"], ["Website", "acquafy.com/contato"]],
    s13Outro: "Sie haben auch das Recht, eine Beschwerde bei der brasilianischen Nationalen Datenschutzbehörde (ANPD) oder der zuständigen Aufsichtsbehörde in Ihrem Wohnsitzland einzureichen.",
  },
  it: {
    onThisPage: "In questa pagina",
    nav: [
      { id: "controlador",      label: "1. Titolare del trattamento" },
      { id: "coleta",           label: "2. Dati raccolti" },
      { id: "finalidades",      label: "3. Finalità del trattamento" },
      { id: "bases-legais",     label: "4. Basi giuridiche" },
      { id: "compartilhamento", label: "5. Condivisione dei dati" },
      { id: "cookies",          label: "6. Cookie" },
      { id: "retencao",         label: "7. Conservazione" },
      { id: "seguranca",        label: "8. Sicurezza" },
      { id: "direitos",         label: "9. I tuoi diritti" },
      { id: "transferencias",   label: "10. Trasferimenti internazionali" },
      { id: "menores",          label: "11. Minori" },
      { id: "alteracoes",       label: "12. Modifiche" },
      { id: "contato",          label: "13. Contatto" },
    ],
    intro1: <><strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;noi&quot; o &quot;nostro&quot;) si impegna a proteggere la tua privacy. Questa Informativa sulla Privacy descrive come trattiamo i dati personali che ci fornisci o che raccogliamo quando utilizzi il nostro sito web, la piattaforma, l&apos;applicazione e gli altri servizi (&quot;Servizi&quot;).</>,
    intro2: "Questa informativa è conforme alla Legge Generale sulla Protezione dei Dati del Brasile (LGPD — Legge n. 13.709/2018), al Regolamento Generale sulla Protezione dei Dati dell'Unione Europea (RGPD/GDPR) e alle altre normative applicabili in materia di privacy e protezione dei dati.",
    s1Title: "1. Titolare del trattamento",
    s1Intro: "Il titolare responsabile del trattamento dei tuoi dati personali è:",
    s1Labels: [["Azienda", "Acquafy Corporation"], ["E-mail", "privacidade@acquafy.com"], ["Sito web", "acquafy.com"]],
    s2Title: "2. Dati personali che raccogliamo",
    s21Title: "2.1 Dati che fornisci tu",
    s21Items: [
      "Nome completo e indirizzo e-mail durante la creazione di un account o la compilazione di moduli di contatto",
      "Informazioni di indirizzo e consegna per l'elaborazione degli ordini",
      "Dati di pagamento (elaborati in modo sicuro da fornitori certificati PCI-DSS)",
      "Messaggi, domande e richieste inviati tramite i nostri canali di supporto",
      "Preferenze e impostazioni del tuo account sulla Piattaforma Acquafy",
    ],
    s22Title: "2.2 Dati raccolti automaticamente",
    s22Items: [
      "Indirizzo IP, tipo di browser e sistema operativo",
      "Pagine visitate, tempo di permanenza e clic (dati di navigazione)",
      "Identificatori del dispositivo e dati di geolocalizzazione approssimativa",
      "Informazioni sull'utilizzo dell'app Acquafy e dati di telemetria del purificatore (IoT)",
      "Cookie e tecnologie simili (dettagliati nella Sezione 6)",
    ],
    s23Title: "2.3 Dati ricevuti da terze parti",
    s23Items: [
      "Informazioni dai social network quando scegli di autenticarti tramite social login",
      "Dati dai partner di distribuzione per supportare rivenditori e integratori",
      "Informazioni di verifica dell'identità da fornitori di servizi autorizzati",
    ],
    s3Title: "3. Finalità del trattamento",
    s3Intro: "Utilizziamo i tuoi dati personali per le seguenti finalità:",
    s3Items: [
      "Fornitura dei Servizi: creazione e gestione dell'account, elaborazione degli ordini e consegna dei prodotti",
      "Assistenza clienti: risposta a domande, richieste di manutenzione e servizio post-vendita",
      "Miglioramento dei Servizi: analisi dell'utilizzo della piattaforma, dell'app e dei dispositivi IoT per migliorare le funzionalità",
      "Comunicazioni di marketing: invio di newsletter, offerte e novità, con consenso preventivo",
      "Obblighi legali e normativi: conformità ai requisiti legali, fiscali e normativi applicabili",
      "Sicurezza e prevenzione delle frodi: rilevamento di attività sospette e protezione dell'integrità dei Servizi",
      "Personalizzazione: offrire contenuti, raccomandazioni ed esperienze adattate al tuo profilo",
    ],
    s4Title: "4. Basi giuridiche del trattamento",
    s4Intro: "Trattiamo i tuoi dati sulla base delle seguenti basi giuridiche previste dalla LGPD e dal GDPR:",
    s4Bases: [
      { base: "Esecuzione del contratto", desc: "Trattamento necessario per la fornitura dei Servizi da te contrattati." },
      { base: "Obbligo legale", desc: "Conformità agli obblighi previsti dalla legge, dai regolamenti o dalle disposizioni delle autorità." },
      { base: "Interesse legittimo", desc: "Miglioramento dei Servizi, sicurezza, prevenzione delle frodi e comunicazioni istituzionali, purché non prevalgano sui tuoi diritti." },
      { base: "Consenso", desc: "Invio di comunicazioni di marketing e utilizzo di cookie non essenziali. Puoi revocare il consenso in qualsiasi momento." },
    ],
    s5Title: "5. Condivisione dei dati",
    s5Intro: "Non vendiamo i tuoi dati personali a terze parti. Possiamo condividerli solo nelle seguenti situazioni:",
    s51Title: "5.1 Fornitori di servizi",
    s51Text: "Condividiamo dati con fornitori che ci aiutano a gestire i Servizi (elaborazione dei pagamenti, hosting cloud, invio di e-mail, analisi dei dati), sempre nell'ambito di un accordo di trattamento dei dati con obblighi di riservatezza e sicurezza.",
    s52Title: "5.2 Partner di distribuzione",
    s52Text: "I rivenditori e gli integratori autorizzati della rete Acquafy possono ricevere i dati necessari per l'evasione degli ordini, il supporto tecnico e l'installazione dei dispositivi nella tua regione.",
    s53Title: "5.3 Obbligo legale",
    s53Text: "Possiamo divulgare dati quando richiesto dalla legge, da un'ordinanza del tribunale o da un'autorità competente, o quando necessario per proteggere i diritti e la sicurezza di Acquafy, dei nostri utenti o di terze parti.",
    s54Title: "5.4 Trasferimenti aziendali",
    s54Text: "In caso di fusione, acquisizione o vendita di asset, i dati potranno essere trasferiti al nuovo titolare, che sarà vincolato dagli obblighi di questa informativa.",
    s6Title: "6. Cookie e tecnologie di tracciamento",
    s6Intro: "Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza con i nostri Servizi. I cookie sono classificati come:",
    s6Cookies: [
      { tipo: "Essenziali", cor: "#0569ff", desc: "Necessari per il funzionamento di base del sito web e della piattaforma (autenticazione, sicurezza, preferenze di sessione). Non possono essere disabilitati." },
      { tipo: "Analitici", cor: "#7b5ea7", desc: "Ci permettono di capire come i visitatori utilizzano il sito (pagine visitate, tempo di permanenza). Utilizziamo strumenti come Google Analytics." },
      { tipo: "Funzionali", cor: "#0ab572", desc: "Memorizzano preferenze come lingua, posizione e impostazioni personalizzate per migliorare la tua esperienza." },
      { tipo: "Marketing", cor: "#e05c00", desc: "Utilizzati per mostrare pubblicità pertinente e misurare l'efficacia delle campagne. Richiedono il tuo consenso preventivo." },
    ],
    s6Outro: "Puoi gestire le tue preferenze sui cookie in qualsiasi momento tramite le impostazioni del browser o il pannello di consenso disponibile sul nostro sito.",
    s7Title: "7. Conservazione dei dati",
    s7Intro: "Conserviamo i tuoi dati personali per il tempo necessario a soddisfare le finalità descritte in questa informativa, salvo che la legge richieda o consenta un periodo più lungo. I criteri utilizzati per determinare i periodi di conservazione includono:",
    s7Items: [
      "Periodo durante il quale mantieni un account attivo presso i nostri Servizi",
      "Obblighi legali e normativi di conservazione (es. dati fiscali per 5 anni)",
      "Termini di prescrizione applicabili per eventuali controversie o reclami",
      "Necessità di mantenere registri per la sicurezza e la prevenzione delle frodi",
    ],
    s7Outro: "Dopo la fine del rapporto contrattuale e scaduto il periodo di conservazione applicabile, i dati vengono eliminati in modo sicuro o anonimizzati.",
    s8Title: "8. Sicurezza dei dati",
    s8Intro: "Adottiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati da accessi non autorizzati, perdita, distruzione o divulgazione impropria, tra cui:",
    s8Items: [
      "Crittografia in transito (TLS/HTTPS) e a riposo per i dati sensibili",
      "Controlli di accesso basati sui ruoli (RBAC) e autenticazione a più fattori per i sistemi interni",
      "Monitoraggio continuo della sicurezza e gestione delle vulnerabilità",
      "Programmi regolari di formazione e sensibilizzazione sulla privacy per i dipendenti",
      "Procedure di risposta agli incidenti di sicurezza con notifica alle autorità e agli interessati quando richiesto dalla legge",
    ],
    s8Outro: "Nessun sistema di trasmissione o archiviazione dei dati è sicuro al 100%. In caso di incidente che metta a rischio i tuoi dati, notificheremo le autorità competenti e gli interessati entro i termini di legge.",
    s9Title: "9. I tuoi diritti come interessato",
    s9Intro: "Ai sensi della LGPD e delle altre leggi applicabili, hai i seguenti diritti in merito ai tuoi dati personali:",
    s9Rights: [
      { direito: "Conferma e accesso", desc: "Sapere se trattiamo i tuoi dati e ottenerne una copia." },
      { direito: "Rettifica", desc: "Richiedere la correzione di dati incompleti, inesatti o obsoleti." },
      { direito: "Anonimizzazione / Blocco / Cancellazione", desc: "Per dati non necessari, eccessivi o trattati in modo non conforme alla legge." },
      { direito: "Portabilità", desc: "Ricevere i tuoi dati in formato strutturato per il trasferimento a un altro fornitore." },
      { direito: "Cancellazione", desc: "Richiedere la cancellazione dei dati trattati sulla base del tuo consenso." },
      { direito: "Revoca del consenso", desc: "Revocare il consenso al trattamento basato su tale base giuridica, in qualsiasi momento." },
      { direito: "Opposizione", desc: "Opporsi al trattamento basato su interesse legittimo quando sussistono ragioni giustificate." },
      { direito: "Informazione", desc: "Sapere con quali entità condividiamo i tuoi dati e le basi giuridiche utilizzate." },
    ],
    s9Outro1: "Per esercitare uno di questi diritti, contattaci via e-mail a",
    s9Outro2: ". Risponderemo entro 15 giorni lavorativi, come richiesto dalla LGPD.",
    s10Title: "10. Trasferimenti internazionali di dati",
    s10Intro: "Acquafy opera a livello globale e può trasferire i tuoi dati personali in paesi al di fuori del Brasile o dello Spazio Economico Europeo. In tali casi, garantiamo che il trasferimento avvenga con le salvaguardie appropriate:",
    s10Items: [
      "Clausole contrattuali standard approvate dalla Commissione europea e dall'ANPD",
      "Trasferimento verso paesi che offrono un livello di protezione adeguato riconosciuto dall'autorità competente",
      "Certificazioni e codici di condotta riconosciuti a livello internazionale",
      "Consenso esplicito dell'interessato ove applicabile",
    ],
    s11Title: "11. Minori",
    s11Text1: "I nostri Servizi non sono destinati a persone di età inferiore ai 18 anni. Non raccogliamo intenzionalmente dati personali di bambini o adolescenti. Se veniamo a conoscenza di aver raccolto dati di un minore senza un consenso parentale verificabile, elimineremo immediatamente tali dati.",
    s11Text2: "Se sei il tutore di un bambino e ritieni che ci abbia fornito dati personali, contattaci via e-mail a",
    s12Title: "12. Modifiche alla presente informativa",
    s12Intro: "Potremmo aggiornare periodicamente questa Informativa sulla Privacy per riflettere le modifiche ai nostri Servizi, alle leggi applicabili o alle nostre pratiche sulla privacy. Quando apportiamo modifiche rilevanti, ti informeremo tramite:",
    s12Items: [
      "Un avviso ben visibile sul nostro sito web per un periodo ragionevole",
      "Notifica via e-mail ai titolari di account quando le modifiche sono significative",
      "Aggiornamento della data di \"Ultimo aggiornamento\" in cima a questa informativa",
    ],
    s12Outro: "Ti consigliamo di consultare regolarmente questa informativa. La continua utilizzazione dei Servizi dopo l'entrata in vigore delle modifiche costituisce accettazione delle stesse.",
    s13Title: "13. Contatto e Responsabile della Protezione dei Dati (DPO)",
    s13Intro: "Per qualsiasi domanda, richiesta o reclamo relativo a questa Informativa sulla Privacy o al trattamento dei tuoi dati personali, ti preghiamo di contattare il nostro Responsabile della Protezione dei Dati:",
    s13DpoTitle: "Responsabile della Protezione dei Dati (DPO)",
    s13Labels: [["E-mail", "privacidade@acquafy.com"], ["Azienda", "Acquafy Corporation"], ["Sito web", "acquafy.com/contato"]],
    s13Outro: "Hai anche il diritto di presentare un reclamo all'Autorità Nazionale per la Protezione dei Dati (ANPD) del Brasile o all'autorità di vigilanza competente nel tuo paese di residenza.",
  },
  zh: {
    onThisPage: "本页内容",
    nav: [
      { id: "controlador",      label: "1. 数据控制者" },
      { id: "coleta",           label: "2. 收集的数据" },
      { id: "finalidades",      label: "3. 处理目的" },
      { id: "bases-legais",     label: "4. 法律依据" },
      { id: "compartilhamento", label: "5. 数据共享" },
      { id: "cookies",          label: "6. Cookie" },
      { id: "retencao",         label: "7. 数据保留" },
      { id: "seguranca",        label: "8. 数据安全" },
      { id: "direitos",         label: "9. 您的权利" },
      { id: "transferencias",   label: "10. 跨境数据传输" },
      { id: "menores",          label: "11. 未成年人" },
      { id: "alteracoes",       label: "12. 政策变更" },
      { id: "contato",          label: "13. 联系方式" },
    ],
    intro1: <><strong>Acquafy Corporation</strong>（&quot;Acquafy&quot;、&quot;我们&quot;或&quot;我们的&quot;）致力于保护您的隐私。本隐私政策描述了我们如何处理您在使用我们的网站、平台、应用程序及其他服务（&quot;服务&quot;）时向我们提供或我们收集的个人数据。</>,
    intro2: "本政策遵守巴西《通用数据保护法》（LGPD — 第13.709/2018号法律）、欧盟《通用数据保护条例》（GDPR）及其他适用的隐私和数据保护法律。",
    s1Title: "1. 数据控制者",
    s1Intro: "负责处理您个人数据的控制者为：",
    s1Labels: [["公司", "Acquafy Corporation"], ["电子邮件", "privacidade@acquafy.com"], ["网站", "acquafy.com"]],
    s2Title: "2. 我们收集的个人数据",
    s21Title: "2.1 您主动提供的数据",
    s21Items: [
      "创建账户或填写联系表单时提供的全名和电子邮件地址",
      "用于处理订单的地址和交付信息",
      "支付数据（由PCI-DSS认证服务商安全处理）",
      "通过我们的支持渠道发送的消息、问题和请求",
      "您在Acquafy平台账户中的偏好和设置",
    ],
    s22Title: "2.2 自动收集的数据",
    s22Items: [
      "IP地址、浏览器类型和操作系统",
      "访问的页面、停留时间和点击次数（浏览数据）",
      "设备标识符和大致地理位置数据",
      "Acquafy应用使用信息及净水器遥测数据（IoT）",
      "Cookie及类似技术（详见第6节）",
    ],
    s23Title: "2.3 从第三方接收的数据",
    s23Items: [
      "通过社交登录进行身份验证时来自社交网络的信息",
      "来自分销合作伙伴的数据，用于支持经销商和集成商",
      "来自授权服务提供商的身份验证信息",
    ],
    s3Title: "3. 处理目的",
    s3Intro: "我们将您的个人数据用于以下目的：",
    s3Items: [
      "服务提供：账户创建与管理、订单处理和产品配送",
      "客户支持：回答疑问、处理维修申请和售后服务",
      "服务改进：分析平台、应用和IoT设备的使用情况以改进功能",
      "营销通讯：在事先获得同意的情况下发送新闻通讯、优惠和最新动态",
      "法律和监管义务：遵守适用的法律、税务和监管要求",
      "安全与防欺诈：检测可疑活动并保护服务的完整性",
      "个性化：提供根据您的档案量身定制的内容、建议和体验",
    ],
    s4Title: "4. 处理的法律依据",
    s4Intro: "我们依据LGPD和GDPR下的以下法律依据处理您的数据：",
    s4Bases: [
      { base: "合同履行", desc: "为向您提供所签订服务而必要的处理。" },
      { base: "法律义务", desc: "遵守法律、法规或主管部门规定的义务。" },
      { base: "合理利益", desc: "服务改进、安全、防欺诈和机构通讯，前提是不凌驾于您的权利之上。" },
      { base: "同意", desc: "发送营销通讯和使用非必要Cookie。您可随时撤回同意。" },
    ],
    s5Title: "5. 数据共享",
    s5Intro: "我们不向第三方出售您的个人数据。仅在以下情况下可能共享：",
    s51Title: "5.1 服务提供商",
    s51Text: "我们与帮助我们运营服务的供应商共享数据（支付处理、云托管、电子邮件发送、数据分析），始终在具有保密和安全义务的数据处理协议下进行。",
    s52Title: "5.2 分销合作伙伴",
    s52Text: "Acquafy网络中的授权经销商和集成商可能收到在您所在地区完成订单、提供技术支持和安装设备所必要的数据。",
    s53Title: "5.3 法律义务",
    s53Text: "当法律、法院命令或主管部门要求时，或在保护Acquafy、我们的用户或第三方的权利和安全所必要时，我们可能披露数据。",
    s54Title: "5.4 企业转让",
    s54Text: "在合并、收购或资产出售的情况下，数据可能转让给新的控制者，该控制者将受本政策义务的约束。",
    s6Title: "6. Cookie 及追踪技术",
    s6Intro: "我们使用Cookie和类似技术来改善您使用我们服务的体验。Cookie分为以下类别：",
    s6Cookies: [
      { tipo: "必要", cor: "#0569ff", desc: "网站和平台基本运行所必需（身份验证、安全性、会话偏好设置）。无法禁用。" },
      { tipo: "分析", cor: "#7b5ea7", desc: "帮助我们了解访客如何使用网站（访问的页面、停留时间）。我们使用Google Analytics等工具。" },
      { tipo: "功能", cor: "#0ab572", desc: "存储语言、位置和个性化设置等偏好，以改善您的体验。" },
      { tipo: "营销", cor: "#e05c00", desc: "用于展示相关广告并衡量营销活动的效果。需要您事先同意。" },
    ],
    s6Outro: "您可以随时通过浏览器设置或我们网站上提供的同意管理面板管理您的Cookie偏好。",
    s7Title: "7. 数据保留",
    s7Intro: "我们将您的个人数据保留至完成本政策所述目的所需的时间，除非法律要求或允许更长的保留期。确定保留期的标准包括：",
    s7Items: [
      "您在我们服务中保持有效账户的期间",
      "法律和监管保留义务（例如：税务数据保留5年）",
      "适用于潜在争议或索赔的诉讼时效",
      "为安全和防欺诈目的保存记录的需要",
    ],
    s7Outro: "合同关系终止且适用保留期届满后，数据将被安全删除或匿名化处理。",
    s8Title: "8. 数据安全",
    s8Intro: "我们采取适当的技术和组织措施保护您的数据免受未经授权的访问、丢失、破坏或不当披露，包括：",
    s8Items: [
      "传输中（TLS/HTTPS）和静态敏感数据的加密",
      "内部系统的基于角色的访问控制（RBAC）和多因素身份验证",
      "持续的安全监控和漏洞管理",
      "为员工定期开展隐私培训和意识提升计划",
      "安全事件响应程序，并在法律要求时向相关部门和当事人发出通知",
    ],
    s8Outro: "没有任何数据传输或存储系统是100%安全的。在发生危及您数据安全的事件时，我们将在法定时限内通知主管部门和受影响的当事人。",
    s9Title: "9. 您作为数据主体的权利",
    s9Intro: "根据LGPD及其他适用法律，您对个人数据享有以下权利：",
    s9Rights: [
      { direito: "确认与访问", desc: "了解我们是否处理您的数据并获取副本。" },
      { direito: "更正", desc: "请求更正不完整、不准确或过时的数据。" },
      { direito: "匿名化 / 封锁 / 删除", desc: "针对不必要、过度或违法处理的数据。" },
      { direito: "可携带性", desc: "以结构化格式接收您的数据，以便转移至其他服务提供商。" },
      { direito: "删除", desc: "请求删除基于您同意处理的数据。" },
      { direito: "撤回同意", desc: "随时撤回基于该法律依据处理数据的同意。" },
      { direito: "异议", desc: "在有正当理由时对基于合理利益的处理提出异议。" },
      { direito: "信息", desc: "了解我们与哪些主体共享您的数据以及所依据的法律基础。" },
    ],
    s9Outro1: "如需行使上述任一权利，请通过电子邮件联系我们：",
    s9Outro2: "。我们将按照LGPD的要求，在15个工作日内作出回复。",
    s10Title: "10. 跨境数据传输",
    s10Intro: "Acquafy在全球范围内运营，可能将您的个人数据传输至巴西或欧洲经济区以外的国家。在此类情况下，我们确保以适当的保障措施进行传输：",
    s10Items: [
      "欧盟委员会和ANPD批准的标准合同条款",
      "传输至主管部门认可的提供充分保护水平的国家",
      "国际认可的认证和行为准则",
      "在适用情况下获得数据主体的明确同意",
    ],
    s11Title: "11. 未成年人",
    s11Text1: "我们的服务不针对18岁以下的人群。我们不会故意收集儿童或青少年的个人数据。如果我们得知在未获得可核实的父母同意的情况下收集了未成年人的数据，将立即删除这些数据。",
    s11Text2: "如果您是儿童的监护人，并认为其向我们提供了个人数据，请通过电子邮件联系我们：",
    s12Title: "12. 本政策的变更",
    s12Intro: "我们可能会定期更新本隐私政策，以反映我们服务、适用法律或隐私实践的变化。当我们做出重大变更时，将通过以下方式通知您：",
    s12Items: [
      "在我们网站上以显著方式展示通知一段合理时间",
      "当变更重大时，向持有账户的用户发送电子邮件通知",
      "更新本政策顶部的「最后更新」日期",
    ],
    s12Outro: "我们建议您定期查阅本政策。变更生效后继续使用服务即视为接受相关变更。",
    s13Title: "13. 联系方式及数据保护官（DPO）",
    s13Intro: "如您对本隐私政策或个人数据处理有任何疑问、请求或投诉，请联系我们的数据保护官：",
    s13DpoTitle: "数据保护官（DPO）",
    s13Labels: [["电子邮件", "privacidade@acquafy.com"], ["公司", "Acquafy Corporation"], ["网站", "acquafy.com/contato"]],
    s13Outro: "您也有权向巴西国家数据保护局（ANPD）或您居住国的主管监管机构提出投诉。",
  },
  ja: {
    onThisPage: "このページの内容",
    nav: [
      { id: "controlador",      label: "1. データ管理者" },
      { id: "coleta",           label: "2. 収集するデータ" },
      { id: "finalidades",      label: "3. 処理の目的" },
      { id: "bases-legais",     label: "4. 法的根拠" },
      { id: "compartilhamento", label: "5. データの共有" },
      { id: "cookies",          label: "6. Cookie" },
      { id: "retencao",         label: "7. データ保持" },
      { id: "seguranca",        label: "8. データセキュリティ" },
      { id: "direitos",         label: "9. お客様の権利" },
      { id: "transferencias",   label: "10. 国際データ転送" },
      { id: "menores",          label: "11. 未成年者" },
      { id: "alteracoes",       label: "12. ポリシーの変更" },
      { id: "contato",          label: "13. お問い合わせ" },
    ],
    intro1: <><strong>Acquafy Corporation</strong>（&quot;Acquafy&quot;、&quot;私たち&quot;または&quot;当社&quot;）は、お客様のプライバシー保護に取り組んでいます。このプライバシーポリシーでは、お客様が当社のウェブサイト、プラットフォーム、アプリケーションおよびその他のサービス（&quot;サービス&quot;）をご利用になる際に、お客様からご提供いただいたか、または当社が収集した個人データの取り扱い方法を説明します。</>,
    intro2: "本ポリシーは、ブラジルの個人情報保護法（LGPD — 法律第13.709/2018号）、欧州連合の一般データ保護規則（GDPR）、およびその他の適用されるプライバシーおよびデータ保護法に準拠しています。",
    s1Title: "1. データ管理者",
    s1Intro: "お客様の個人データの処理に責任を負うデータ管理者は以下の通りです：",
    s1Labels: [["会社名", "Acquafy Corporation"], ["メール", "privacidade@acquafy.com"], ["ウェブサイト", "acquafy.com"]],
    s2Title: "2. 収集する個人データ",
    s21Title: "2.1 お客様が提供するデータ",
    s21Items: [
      "アカウント作成時またはお問い合わせフォーム記入時の氏名とメールアドレス",
      "注文処理のための住所と配送情報",
      "支払いデータ（PCI-DSS認定プロバイダーにより安全に処理）",
      "サポートチャネルを通じて送信されたメッセージ、質問、リクエスト",
      "Acquafy プラットフォームアカウントの設定と環境設定",
    ],
    s22Title: "2.2 自動的に収集されるデータ",
    s22Items: [
      "IPアドレス、ブラウザの種類、オペレーティングシステム",
      "訪問したページ、滞在時間、クリック（閲覧データ）",
      "デバイス識別子およびおおよその位置情報データ",
      "Acquafy アプリの使用情報および浄水器のテレメトリーデータ（IoT）",
      "Cookie および類似技術（セクション6に詳述）",
    ],
    s23Title: "2.3 第三者から受け取るデータ",
    s23Items: [
      "ソーシャルログインによる認証を選択した際のソーシャルネットワーク情報",
      "リセラーやインテグレーターをサポートするための販売パートナーからのデータ",
      "認定サービスプロバイダーからの本人確認情報",
    ],
    s3Title: "3. 処理の目的",
    s3Intro: "当社はお客様の個人データを以下の目的で使用します：",
    s3Items: [
      "サービス提供：アカウントの作成・管理、注文処理、製品の配送",
      "カスタマーサポート：問い合わせへの回答、メンテナンスリクエスト、アフターサービス",
      "サービス改善：機能向上のためのプラットフォーム、アプリ、IoTデバイスの利用状況分析",
      "マーケティングコミュニケーション：事前の同意を得た上でのニュースレター、オファー、最新情報の送信",
      "法的・規制上の義務：適用される法律、税務、規制要件の遵守",
      "セキュリティと不正防止：不審なアクティビティの検出とサービスの整合性保護",
      "パーソナライゼーション：お客様のプロフィールに合わせたコンテンツ、推奨事項、体験の提供",
    ],
    s4Title: "4. 処理の法的根拠",
    s4Intro: "当社はLGPDおよびGDPRに基づく以下の法的根拠に従ってお客様のデータを処理します：",
    s4Bases: [
      { base: "契約の履行", desc: "お客様がご契約されたサービスを提供するために必要な処理。" },
      { base: "法的義務", desc: "法律、規制、または当局の命令に定められた義務の遵守。" },
      { base: "正当な利益", desc: "サービスの改善、セキュリティ、不正防止および機関的なコミュニケーション（お客様の権利を侵害しない範囲で）。" },
      { base: "同意", desc: "マーケティングコミュニケーションの送信および非必須Cookieの使用。同意はいつでも撤回できます。" },
    ],
    s5Title: "5. データの共有",
    s5Intro: "当社はお客様の個人データを第三者に販売しません。以下の場合にのみ共有することがあります：",
    s51Title: "5.1 サービスプロバイダー",
    s51Text: "当社はサービスの運営を支援するサプライヤー（決済処理、クラウドホスティング、メール配信、データ分析）とデータを共有します。これは常に守秘義務とセキュリティ義務を伴うデータ処理契約の下で行われます。",
    s52Title: "5.2 販売パートナー",
    s52Text: "Acquafy ネットワークの認定リセラーおよびインテグレーターは、お客様の地域での注文履行、技術サポート、デバイスのインストールに必要なデータを受け取ることがあります。",
    s53Title: "5.3 法的義務",
    s53Text: "法律、裁判所命令、または管轄当局によって要求される場合、またはAcquafy、当社ユーザー、もしくは第三者の権利とセキュリティを保護するために必要な場合に、データを開示することがあります。",
    s54Title: "5.4 企業の移転",
    s54Text: "合併、買収、または資産売却の場合、データは本ポリシーの義務に拘束される新しいデータ管理者に移転される場合があります。",
    s6Title: "6. Cookie とトラッキング技術",
    s6Intro: "当社はサービスに関するお客様の体験を改善するためにCookieおよび類似技術を使用します。Cookieは以下のように分類されます：",
    s6Cookies: [
      { tipo: "必須", cor: "#0569ff", desc: "ウェブサイトおよびプラットフォームの基本的な機能（認証、セキュリティ、セッション設定）に必要です。無効化できません。" },
      { tipo: "分析", cor: "#7b5ea7", desc: "訪問者がサイトをどのように使用しているかを理解するために使用します（訪問したページ、滞在時間）。Google Analyticsなどのツールを使用しています。" },
      { tipo: "機能", cor: "#0ab572", desc: "言語、場所、カスタム設定などの環境設定を保存し、お客様の体験を向上させます。" },
      { tipo: "マーケティング", cor: "#e05c00", desc: "関連性の高い広告を表示し、キャンペーンの効果を測定するために使用します。お客様の事前同意が必要です。" },
    ],
    s6Outro: "Cookie の設定はブラウザの設定または当社サイトの同意管理パネルからいつでも管理できます。",
    s7Title: "7. データ保持",
    s7Intro: "当社は本ポリシーに記載された目的を達成するために必要な期間、お客様の個人データを保持します（法律がより長い期間を要求または許可する場合を除く）。保持期間を決定する基準には以下が含まれます：",
    s7Items: [
      "お客様が当社サービスのアクティブなアカウントを維持している期間",
      "法的・規制上の保持義務（例：税務データは5年間）",
      "潜在的な紛争または請求に適用される時効期間",
      "セキュリティと不正防止のための記録保持の必要性",
    ],
    s7Outro: "契約関係が終了し、適用される保持期間が経過した後、データは安全に削除または匿名化されます。",
    s8Title: "8. データセキュリティ",
    s8Intro: "当社は、不正アクセス、喪失、破壊、または不当な開示からお客様のデータを保護するために、適切な技術的・組織的措置を講じています。これには以下が含まれます：",
    s8Items: [
      "転送中（TLS/HTTPS）および機密データの保存時の暗号化",
      "内部システムのロールベースのアクセス制御（RBAC）と多要素認証",
      "継続的なセキュリティ監視と脆弱性管理",
      "従業員向けの定期的なプライバシー研修と意識向上プログラム",
      "法律で要求される場合の当局およびデータ主体への通知を含むセキュリティインシデント対応手順",
    ],
    s8Outro: "どのデータ転送または保存システムも100%安全ではありません。お客様のデータを危険にさらす事故が発生した場合、当社は法定期限内に所管当局および影響を受けるデータ主体に通知します。",
    s9Title: "9. データ主体としてのお客様の権利",
    s9Intro: "LGPDおよびその他の適用法に基づき、お客様の個人データに関して以下の権利を有します：",
    s9Rights: [
      { direito: "確認とアクセス", desc: "当社がお客様のデータを処理しているかどうかを確認し、コピーを入手する権利。" },
      { direito: "訂正", desc: "不完全、不正確または時代遅れのデータの訂正を要求する権利。" },
      { direito: "匿名化 / ブロック / 削除", desc: "不必要、過剰または違法に処理されたデータに対して。" },
      { direito: "ポータビリティ", desc: "別のプロバイダーへの転送のために構造化された形式でデータを受け取る権利。" },
      { direito: "削除", desc: "お客様の同意に基づいて処理されたデータの削除を要求する権利。" },
      { direito: "同意の撤回", desc: "その法的根拠に基づく処理の同意をいつでも撤回する権利。" },
      { direito: "異議申し立て", desc: "正当な理由がある場合に正当な利益に基づく処理に異議を申し立てる権利。" },
      { direito: "情報", desc: "当社がデータを共有する主体および使用される法的根拠を知る権利。" },
    ],
    s9Outro1: "これらの権利のいずれかを行使するには、メールでご連絡ください：",
    s9Outro2: "。LGPDの要件に従い、15営業日以内に回答いたします。",
    s10Title: "10. 国際データ転送",
    s10Intro: "Acquafy はグローバルに事業を展開しており、ブラジルまたは欧州経済領域外の国にお客様の個人データを転送することがあります。このような場合、適切な保護措置を講じた上で転送が行われることを保証します：",
    s10Items: [
      "欧州委員会およびANPDが承認した標準契約条項",
      "所管当局によって認められた適切な保護水準を提供する国への転送",
      "国際的に認められた認証と行動規範",
      "該当する場合のデータ主体による明示的な同意",
    ],
    s11Title: "11. 未成年者",
    s11Text1: "当社のサービスは18歳未満の方を対象としていません。当社は子供や青少年の個人データを意図的に収集しません。検証可能な保護者の同意なしに未成年者のデータを収集したことが判明した場合、直ちにそのデータを削除します。",
    s11Text2: "お子様の保護者で、お子様が個人データを提供した可能性があると思われる場合は、メールでご連絡ください：",
    s12Title: "12. 本ポリシーの変更",
    s12Intro: "当社はサービス、適用法、またはプライバシー慣行の変更を反映するために、このプライバシーポリシーを定期的に更新することがあります。重要な変更を行う際には、以下の方法でお知らせします：",
    s12Items: [
      "合理的な期間、当社ウェブサイト上に目立つお知らせを掲載",
      "変更が重要な場合、アカウント保有者へのメール通知",
      "本ポリシー冒頭の「最終更新日」の更新",
    ],
    s12Outro: "本ポリシーを定期的にご確認されることをお勧めします。変更の発効後にサービスを継続して利用することは、変更への同意とみなされます。",
    s13Title: "13. お問い合わせおよびデータ保護責任者（DPO）",
    s13Intro: "本プライバシーポリシーまたはお客様の個人データの処理に関するご質問、ご要望、苦情については、当社のデータ保護責任者にご連絡ください：",
    s13DpoTitle: "データ保護責任者（DPO）",
    s13Labels: [["メール", "privacidade@acquafy.com"], ["会社名", "Acquafy Corporation"], ["ウェブサイト", "acquafy.com/contato"]],
    s13Outro: "ブラジルの国家データ保護局（ANPD）またはお客様のお住まいの国の監督当局に苦情を申し立てる権利もあります。",
  },
  ko: {
    onThisPage: "이 페이지에서",
    nav: [
      { id: "controlador",      label: "1. 데이터 컨트롤러" },
      { id: "coleta",           label: "2. 수집하는 데이터" },
      { id: "finalidades",      label: "3. 처리 목적" },
      { id: "bases-legais",     label: "4. 법적 근거" },
      { id: "compartilhamento", label: "5. 데이터 공유" },
      { id: "cookies",          label: "6. 쿠키" },
      { id: "retencao",         label: "7. 데이터 보존" },
      { id: "seguranca",        label: "8. 데이터 보안" },
      { id: "direitos",         label: "9. 귀하의 권리" },
      { id: "transferencias",   label: "10. 국제 데이터 이전" },
      { id: "menores",          label: "11. 미성년자" },
      { id: "alteracoes",       label: "12. 정책 변경" },
      { id: "contato",          label: "13. 연락처" },
    ],
    intro1: <><strong>Acquafy Corporation</strong>(&quot;Acquafy&quot;, &quot;당사&quot; 또는 &quot;우리의&quot;)는 귀하의 개인정보 보호에 전념합니다. 이 개인정보 처리방침은 귀하가 당사의 웹사이트, 플랫폼, 애플리케이션 및 기타 서비스(&quot;서비스&quot;)를 이용할 때 귀하가 제공하거나 당사가 수집하는 개인 데이터를 어떻게 처리하는지 설명합니다.</>,
    intro2: "본 방침은 브라질 개인정보 보호법(LGPD — 법률 제13.709/2018호), 유럽연합 일반 데이터 보호 규정(GDPR) 및 기타 적용 가능한 개인정보 보호법을 준수합니다.",
    s1Title: "1. 데이터 컨트롤러",
    s1Intro: "귀하의 개인 데이터 처리를 책임지는 컨트롤러는 다음과 같습니다:",
    s1Labels: [["회사", "Acquafy Corporation"], ["이메일", "privacidade@acquafy.com"], ["웹사이트", "acquafy.com"]],
    s2Title: "2. 당사가 수집하는 개인 데이터",
    s21Title: "2.1 귀하가 제공하는 데이터",
    s21Items: [
      "계정 생성 또는 연락 양식 작성 시 제공하는 성명 및 이메일 주소",
      "주문 처리를 위한 주소 및 배송 정보",
      "결제 데이터 (PCI-DSS 인증 제공업체에 의해 안전하게 처리)",
      "지원 채널을 통해 전송된 메시지, 질문 및 요청",
      "Acquafy 플랫폼 계정의 기본 설정 및 환경 설정",
    ],
    s22Title: "2.2 자동으로 수집되는 데이터",
    s22Items: [
      "IP 주소, 브라우저 유형 및 운영 체제",
      "방문한 페이지, 체류 시간 및 클릭 수 (탐색 데이터)",
      "기기 식별자 및 대략적인 위치 정보 데이터",
      "Acquafy 앱 사용 정보 및 정수기 원격 측정 데이터 (IoT)",
      "쿠키 및 유사 기술 (섹션 6에 자세히 설명)",
    ],
    s23Title: "2.3 제3자로부터 수신하는 데이터",
    s23Items: [
      "소셜 로그인을 통해 인증할 때 소셜 네트워크로부터 받는 정보",
      "리셀러 및 통합업체를 지원하기 위한 유통 파트너 데이터",
      "승인된 서비스 제공업체로부터 받는 본인 인증 정보",
    ],
    s3Title: "3. 처리 목적",
    s3Intro: "당사는 다음 목적으로 귀하의 개인 데이터를 사용합니다:",
    s3Items: [
      "서비스 제공: 계정 생성 및 관리, 주문 처리 및 제품 배송",
      "고객 지원: 문의 답변, 유지보수 요청 및 애프터서비스",
      "서비스 개선: 기능 향상을 위한 플랫폼, 앱 및 IoT 기기 사용 분석",
      "마케팅 커뮤니케이션: 사전 동의를 받아 뉴스레터, 혜택 및 최신 소식 발송",
      "법적 및 규제적 의무: 적용 가능한 법적, 세무적, 규제적 요건 준수",
      "보안 및 사기 방지: 의심스러운 활동 감지 및 서비스 무결성 보호",
      "개인화: 귀하의 프로필에 맞춘 콘텐츠, 추천 및 경험 제공",
    ],
    s4Title: "4. 처리의 법적 근거",
    s4Intro: "당사는 LGPD 및 GDPR에 따른 다음 법적 근거에 따라 귀하의 데이터를 처리합니다:",
    s4Bases: [
      { base: "계약 이행", desc: "귀하가 계약한 서비스를 제공하는 데 필요한 처리." },
      { base: "법적 의무", desc: "법률, 규정 또는 당국 명령에 규정된 의무 준수." },
      { base: "정당한 이익", desc: "서비스 개선, 보안, 사기 방지 및 기관 커뮤니케이션 (귀하의 권리를 침해하지 않는 범위 내에서)." },
      { base: "동의", desc: "마케팅 커뮤니케이션 발송 및 비필수 쿠키 사용. 언제든지 동의를 철회할 수 있습니다." },
    ],
    s5Title: "5. 데이터 공유",
    s5Intro: "당사는 귀하의 개인 데이터를 제3자에게 판매하지 않습니다. 다음 상황에서만 공유할 수 있습니다:",
    s51Title: "5.1 서비스 제공업체",
    s51Text: "당사는 서비스 운영을 지원하는 공급업체(결제 처리, 클라우드 호스팅, 이메일 발송, 데이터 분석)와 데이터를 공유합니다. 이는 항상 기밀 유지 및 보안 의무가 있는 데이터 처리 계약 하에 이루어집니다.",
    s52Title: "5.2 유통 파트너",
    s52Text: "Acquafy 네트워크의 승인된 리셀러 및 통합업체는 귀하의 지역에서 주문 이행, 기술 지원 및 기기 설치에 필요한 데이터를 받을 수 있습니다.",
    s53Title: "5.3 법적 의무",
    s53Text: "법률, 법원 명령 또는 관할 당국에 의해 요구되는 경우, 또는 Acquafy, 당사 이용자 또는 제3자의 권리 및 안전을 보호하기 위해 필요한 경우 데이터를 공개할 수 있습니다.",
    s54Title: "5.4 기업 이전",
    s54Text: "합병, 인수 또는 자산 매각의 경우, 데이터는 본 방침의 의무에 구속되는 새로운 컨트롤러에게 이전될 수 있습니다.",
    s6Title: "6. 쿠키 및 추적 기술",
    s6Intro: "당사는 서비스 이용 경험을 개선하기 위해 쿠키 및 유사 기술을 사용합니다. 쿠키는 다음과 같이 분류됩니다:",
    s6Cookies: [
      { tipo: "필수", cor: "#0569ff", desc: "웹사이트 및 플랫폼의 기본 기능(인증, 보안, 세션 환경 설정)에 필요합니다. 비활성화할 수 없습니다." },
      { tipo: "분석", cor: "#7b5ea7", desc: "방문자가 사이트를 어떻게 사용하는지 이해하는 데 도움을 줍니다(방문 페이지, 체류 시간). Google Analytics 등의 도구를 사용합니다." },
      { tipo: "기능", cor: "#0ab572", desc: "언어, 위치 및 맞춤 설정과 같은 기본 설정을 저장하여 귀하의 경험을 개선합니다." },
      { tipo: "마케팅", cor: "#e05c00", desc: "관련 광고를 표시하고 캠페인 효과를 측정하는 데 사용됩니다. 귀하의 사전 동의가 필요합니다." },
    ],
    s6Outro: "브라우저 설정 또는 당사 사이트에서 제공하는 동의 관리 패널을 통해 언제든지 쿠키 설정을 관리할 수 있습니다.",
    s7Title: "7. 데이터 보존",
    s7Intro: "당사는 법률이 더 긴 기간을 요구하거나 허용하지 않는 한, 본 방침에 설명된 목적을 달성하는 데 필요한 기간 동안 귀하의 개인 데이터를 보유합니다. 보존 기간을 결정하는 기준은 다음과 같습니다:",
    s7Items: [
      "귀하가 당사 서비스에서 활성 계정을 유지하는 기간",
      "법적 및 규제적 보존 의무 (예: 세무 데이터 5년)",
      "잠재적인 분쟁 또는 청구에 적용되는 소멸시효",
      "보안 및 사기 방지를 위한 기록 유지 필요성",
    ],
    s7Outro: "계약 관계가 종료되고 적용 가능한 보존 기간이 만료된 후, 데이터는 안전하게 삭제되거나 익명화됩니다.",
    s8Title: "8. 데이터 보안",
    s8Intro: "당사는 무단 접근, 분실, 파괴 또는 부적절한 공개로부터 귀하의 데이터를 보호하기 위해 적절한 기술적 및 조직적 조치를 취합니다. 여기에는 다음이 포함됩니다:",
    s8Items: [
      "전송 중(TLS/HTTPS) 및 민감한 데이터의 저장 시 암호화",
      "내부 시스템을 위한 역할 기반 접근 제어(RBAC) 및 다중 인증",
      "지속적인 보안 모니터링 및 취약성 관리",
      "직원을 위한 정기적인 개인정보 보호 교육 및 인식 제고 프로그램",
      "법률에 의해 요구되는 경우 당국 및 데이터 주체에 대한 통지를 포함한 보안 사고 대응 절차",
    ],
    s8Outro: "어떤 데이터 전송 또는 저장 시스템도 100% 안전하지 않습니다. 귀하의 데이터를 위험에 빠뜨리는 사고 발생 시, 법정 기한 내에 관할 당국 및 영향을 받는 데이터 주체에게 통지합니다.",
    s9Title: "9. 데이터 주체로서의 귀하의 권리",
    s9Intro: "LGPD 및 기타 적용 법률에 따라 귀하는 개인 데이터에 관해 다음과 같은 권리를 가집니다:",
    s9Rights: [
      { direito: "확인 및 접근", desc: "당사가 귀하의 데이터를 처리하는지 알고 사본을 얻을 권리." },
      { direito: "정정", desc: "불완전하거나 부정확하거나 오래된 데이터의 수정을 요청할 권리." },
      { direito: "익명화 / 차단 / 삭제", desc: "불필요하거나 과도하거나 불법적으로 처리된 데이터에 대해." },
      { direito: "이동성", desc: "다른 제공업체로 이전하기 위해 구조화된 형식으로 데이터를 받을 권리." },
      { direito: "삭제", desc: "귀하의 동의를 기반으로 처리된 데이터의 삭제를 요청할 권리." },
      { direito: "동의 철회", desc: "해당 법적 근거에 기반한 처리에 대한 동의를 언제든지 철회할 권리." },
      { direito: "반대", desc: "정당한 이유가 있을 때 정당한 이익에 기반한 처리에 반대할 권리." },
      { direito: "정보", desc: "당사가 데이터를 공유하는 주체 및 사용된 법적 근거를 알 권리." },
    ],
    s9Outro1: "이러한 권리 중 하나를 행사하려면 이메일로 연락하세요:",
    s9Outro2: ". LGPD의 요건에 따라 15 영업일 이내에 답변해 드리겠습니다.",
    s10Title: "10. 국제 데이터 이전",
    s10Intro: "Acquafy는 전 세계적으로 운영되며 브라질 또는 유럽 경제 지역 외부의 국가로 귀하의 개인 데이터를 이전할 수 있습니다. 이러한 경우, 적절한 안전 장치를 갖춘 이전이 이루어지도록 보장합니다:",
    s10Items: [
      "유럽 위원회 및 ANPD가 승인한 표준 계약 조항",
      "관할 당국이 인정한 적절한 보호 수준을 제공하는 국가로의 이전",
      "국제적으로 인정받는 인증 및 행동 강령",
      "해당되는 경우 데이터 주체의 명시적 동의",
    ],
    s11Title: "11. 미성년자",
    s11Text1: "당사의 서비스는 18세 미만의 사람을 대상으로 하지 않습니다. 당사는 아동이나 청소년의 개인 데이터를 의도적으로 수집하지 않습니다. 확인 가능한 부모 동의 없이 미성년자의 데이터를 수집했음을 알게 된 경우, 즉시 해당 데이터를 삭제합니다.",
    s11Text2: "귀하가 아동의 보호자이고 아동이 당사에 개인 데이터를 제공한 것으로 판단되는 경우, 이메일로 연락해 주세요:",
    s12Title: "12. 본 방침의 변경",
    s12Intro: "당사는 서비스, 적용 법률 또는 개인정보 보호 관행의 변경 사항을 반영하기 위해 주기적으로 이 개인정보 처리방침을 업데이트할 수 있습니다. 중요한 변경을 할 때는 다음을 통해 알려드립니다:",
    s12Items: [
      "합리적인 기간 동안 당사 웹사이트에 눈에 띄는 공지 게재",
      "변경 사항이 중요할 때 계정 보유자에게 이메일 알림",
      "본 방침 상단의 '최종 업데이트' 날짜 갱신",
    ],
    s12Outro: "본 방침을 정기적으로 검토하실 것을 권장합니다. 변경 사항 발효 후 서비스를 계속 이용하는 것은 해당 변경에 동의하는 것으로 간주됩니다.",
    s13Title: "13. 연락처 및 개인정보 보호 책임자 (DPO)",
    s13Intro: "이 개인정보 처리방침 또는 귀하의 개인 데이터 처리와 관련된 질문, 요청 또는 불만이 있으시면 개인정보 보호 책임자에게 연락해 주세요:",
    s13DpoTitle: "개인정보 보호 책임자 (DPO)",
    s13Labels: [["이메일", "privacidade@acquafy.com"], ["회사", "Acquafy Corporation"], ["웹사이트", "acquafy.com/contato"]],
    s13Outro: "브라질 국가 데이터 보호 당국(ANPD) 또는 거주 국가의 관할 감독 기관에 불만을 제기할 권리도 있습니다.",
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
