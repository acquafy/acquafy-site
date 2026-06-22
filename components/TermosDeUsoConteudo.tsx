"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

// ── Traduções ─────────────────────────────────────────────────────────────────

const T: Record<Lang, {
  sidebarLabel: string;
  navItems: { id: string; label: string }[];
  introP1: React.ReactNode;
  introP2: string;
  privacyPolicyLink: string;
  sections: {
    s1: { title: string; p1: string; p2: string };
    s2: { title: string; p1: string; p2: string };
    s3: { title: string; p1: string; items: string[] };
    s4: { title: string; sub1t: string; sub1p: string; sub2t: string; sub2p: string; sub3t: string; sub3p: string };
    s5: { title: string; sub1t: string; sub1p: string; sub2t: string; sub2p: string; sub3t: string; sub3p: string; sub4t: string; sub4p: string };
    s6: { title: string; p1: string; p2: string; p3: string };
    s7: { title: string; p1: string; p2: string; p3: string };
    s8: { title: string; p1: string; p2: string };
    s9: { title: string; p1pre: string; p1post: string; p2: string };
    s10: { title: string; p1: string };
    s11: { title: string; p1: string; p2: string };
    s12: { title: string; p1: string; p2: string };
    s13: { title: string; p1: string; p2: string; p3: string };
    s14: { title: string; p1: string };
  };
}> = {
  pt: {
    sidebarLabel: "Nesta página",
    navItems: [
      { id: "aceitacao",        label: "1. Aceitação dos Termos" },
      { id: "sobre",            label: "2. Sobre a Acquafy" },
      { id: "uso-permitido",    label: "3. Uso Permitido" },
      { id: "contas",           label: "4. Contas de Usuário" },
      { id: "produtos",         label: "5. Produtos e Serviços" },
      { id: "propriedade",      label: "6. Propriedade Intelectual" },
      { id: "responsabilidade", label: "7. Limitação de Responsabilidade" },
      { id: "links",            label: "8. Links de Terceiros" },
      { id: "privacidade",      label: "9. Privacidade" },
      { id: "indenizacao",      label: "10. Indenização" },
      { id: "modificacoes",     label: "11. Modificações" },
      { id: "rescisao",         label: "12. Rescisão" },
      { id: "legislacao",       label: "13. Legislação Aplicável" },
      { id: "contato",          label: "14. Contato" },
    ],
    introP1: <>Bem-vindo ao site da <strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nós&quot; ou &quot;nosso&quot;). Ao acessar ou utilizar nosso site, aplicativo, produtos ou serviços, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, pedimos que não utilize nossos serviços.</>,
    introP2: "Estes termos constituem um acordo legal entre você (o usuário) e a Acquafy Corporation, empresa constituída nos Estados Unidos e integrante do Interfy Group.",
    privacyPolicyLink: "Política de Privacidade",
    sections: {
      s1: {
        title: "1. Aceitação dos Termos",
        p1: "Ao acessar e usar o site acquafy.com (e seus subdomínios) ou qualquer produto, aplicativo ou serviço oferecido pela Acquafy, você declara ter lido, compreendido e concordado com estes Termos de Uso, bem como com nossa Política de Privacidade.",
        p2: "Caso você esteja acessando os serviços em nome de uma empresa ou organização, você declara ter autoridade para vincular essa entidade a estes termos.",
      },
      s2: {
        title: "2. Sobre a Acquafy",
        p1: "A Acquafy Corporation é uma empresa americana, fundada em 2020, especializada em soluções de purificação e gestão inteligente de água. A Acquafy desenvolve purificadores, filtros, garrafas alcalinas, uma plataforma digital (Acquafy Global Smart Water Platform) e um aplicativo integrado com tecnologia de IoT e inteligência artificial.",
        p2: "A Acquafy faz parte do Interfy Group, grupo global de tecnologia com mais de 20 anos de atuação em inovação e transformação digital.",
      },
      s3: {
        title: "3. Uso Permitido do Site",
        p1: "Você pode utilizar nosso site para fins lícitos e de acordo com estes Termos. É expressamente proibido:",
        items: [
          "Utilizar o site de forma que viole leis ou regulamentos aplicáveis",
          "Transmitir qualquer material publicitário ou promocional não solicitado",
          "Tentar obter acesso não autorizado a qualquer parte do site ou sistema",
          "Interferir ou interromper a integridade ou o desempenho do site",
          "Coletar ou colher dados de outros usuários sem consentimento",
          "Usar robôs, scrapers ou outros meios automatizados para acessar o site",
          "Fazer engenharia reversa, descompilar ou desmontar qualquer software do site",
        ],
      },
      s4: {
        title: "4. Cadastro e Contas de Usuário",
        sub1t: "4.1 Criação de conta",
        sub1p: "Alguns recursos e serviços da Acquafy podem exigir o cadastro de uma conta. Ao criar uma conta, você se compromete a fornecer informações verdadeiras, precisas e completas.",
        sub2t: "4.2 Responsabilidade pela conta",
        sub2p: "Você é responsável por manter a confidencialidade das suas credenciais de acesso e por todas as atividades realizadas com sua conta. Notifique imediatamente a Acquafy sobre qualquer uso não autorizado.",
        sub3t: "4.3 Cancelamento",
        sub3p: "A Acquafy reserva-se o direito de cancelar ou suspender contas que violem estes Termos, sem aviso prévio.",
      },
      s5: {
        title: "5. Produtos e Serviços",
        sub1t: "5.1 Disponibilidade",
        sub1p: "A Acquafy se esforça para manter seus produtos e serviços disponíveis, mas não garante disponibilidade ininterrupta. Manutenções programadas ou imprevistos técnicos podem causar indisponibilidade temporária.",
        sub2t: "5.2 Descrição dos produtos",
        sub2p: "Fazemos o possível para descrever nossos produtos com precisão. No entanto, não garantimos que as descrições, imagens ou outros conteúdos do site sejam completos, confiáveis, atuais ou livres de erros.",
        sub3t: "5.3 Preços e pagamentos",
        sub3p: "Os preços apresentados no site estão sujeitos a alterações sem aviso prévio. Em caso de erro de preço, a Acquafy reserva-se o direito de cancelar pedidos afetados, comunicando o cliente com antecedência.",
        sub4t: "5.4 Aplicativo e plataforma digital",
        sub4p: "O uso do aplicativo Acquafy e da plataforma Global Smart Water Platform está sujeito a termos específicos apresentados no momento do cadastro. Esses termos complementam os presentes Termos de Uso gerais.",
      },
      s6: {
        title: "6. Propriedade Intelectual",
        p1: "Todo o conteúdo presente no site da Acquafy — incluindo textos, imagens, logotipos, ícones, vídeos, software e design — é de propriedade exclusiva da Acquafy Corporation ou de seus licenciadores, e está protegido por leis de direito autoral, marcas registradas e outras leis de propriedade intelectual aplicáveis.",
        p2: "É proibida a reprodução, distribuição, modificação, exibição pública ou criação de obras derivadas de qualquer conteúdo do site sem autorização prévia e por escrito da Acquafy.",
        p3: "O nome Acquafy, o logotipo e outras marcas comerciais da Acquafy Corporation são marcas registradas ou em processo de registro. Seu uso não autorizado é proibido.",
      },
      s7: {
        title: "7. Limitação de Responsabilidade",
        p1: "Na máxima extensão permitida pela lei aplicável, a Acquafy não será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso ou da incapacidade de uso do site, dos produtos ou dos serviços.",
        p2: "A Acquafy não se responsabiliza por interrupções causadas por fatores fora de seu controle, incluindo falhas de infraestrutura de terceiros, desastres naturais ou ataques cibernéticos.",
        p3: "O usuário reconhece que o uso do site e dos serviços é por sua conta e risco, dentro dos limites previstos em lei.",
      },
      s8: {
        title: "8. Links para Sites de Terceiros",
        p1: "Nosso site pode conter links para sites de terceiros. Esses links são fornecidos apenas para conveniência e informação. A Acquafy não tem controle sobre o conteúdo desses sites e não se responsabiliza por seu conteúdo, práticas de privacidade ou disponibilidade.",
        p2: "O acesso a sites de terceiros é de inteira responsabilidade do usuário, devendo este verificar os termos e políticas desses sites antes de utilizá-los.",
      },
      s9: {
        title: "9. Privacidade e Proteção de Dados",
        p1pre: "O tratamento de dados pessoais coletados pela Acquafy é regido por nossa",
        p1post: ", que integra estes Termos de Uso. Ao utilizar nossos serviços, você consente com as práticas de coleta e uso de dados descritas nessa política.",
        p2: "A Acquafy está comprometida com a conformidade às legislações de proteção de dados aplicáveis, incluindo a Lei Geral de Proteção de Dados (LGPD) no Brasil e o Regulamento Geral de Proteção de Dados (GDPR) na União Europeia, onde aplicável.",
      },
      s10: {
        title: "10. Indenização",
        p1: "Você concorda em defender, indenizar e isentar a Acquafy Corporation, seus diretores, funcionários, parceiros e agentes de quaisquer reclamações, responsabilidades, danos, perdas e despesas (incluindo honorários advocatícios razoáveis) decorrentes do seu uso do site ou violação destes Termos.",
      },
      s11: {
        title: "11. Modificações dos Termos",
        p1: "A Acquafy reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site, com a atualização da data no topo desta página.",
        p2: "O uso continuado do site após a publicação de alterações constitui aceitação dos novos Termos. Recomendamos que você revise esta página periodicamente.",
      },
      s12: {
        title: "12. Rescisão",
        p1: "A Acquafy pode encerrar ou suspender seu acesso ao site e aos serviços a qualquer momento, com ou sem aviso prévio, por qualquer motivo, incluindo violação destes Termos.",
        p2: "Após a rescisão, as disposições destes Termos que por sua natureza devam sobreviver permanecerão em vigor, incluindo as seções de propriedade intelectual, isenção de garantias, limitação de responsabilidade e indenização.",
      },
      s13: {
        title: "13. Legislação Aplicável e Foro",
        p1: "Estes Termos de Uso são regidos pelas leis do Estado da Flórida, Estados Unidos, sem prejuízo das leis de proteção ao consumidor aplicáveis no país de residência do usuário.",
        p2: "No Brasil, as relações de consumo com usuários brasileiros estão também sujeitas ao Código de Defesa do Consumidor (Lei nº 8.078/1990) e à legislação brasileira aplicável.",
        p3: "Qualquer disputa decorrente destes Termos será preferencialmente resolvida por meio de mediação. Não sendo possível, fica eleito o foro da comarca de São Paulo/SP, Brasil, para usuários brasileiros, com renúncia a qualquer outro, por mais privilegiado que seja.",
      },
      s14: {
        title: "14. Contato",
        p1: "Em caso de dúvidas, sugestões ou reclamações relacionadas a estes Termos de Uso, entre em contato com a Acquafy:",
      },
    },
  },
  "pt-pt": {
    sidebarLabel: "Nesta página",
    navItems: [
      { id: "aceitacao",        label: "1. Aceitação dos Termos" },
      { id: "sobre",            label: "2. Sobre a Acquafy" },
      { id: "uso-permitido",    label: "3. Utilização Permitida" },
      { id: "contas",           label: "4. Contas de Utilizador" },
      { id: "produtos",         label: "5. Produtos e Serviços" },
      { id: "propriedade",      label: "6. Propriedade Intelectual" },
      { id: "responsabilidade", label: "7. Limitação de Responsabilidade" },
      { id: "links",            label: "8. Ligações de Terceiros" },
      { id: "privacidade",      label: "9. Privacidade" },
      { id: "indenizacao",      label: "10. Indemnização" },
      { id: "modificacoes",     label: "11. Modificações" },
      { id: "rescisao",         label: "12. Rescisão" },
      { id: "legislacao",       label: "13. Legislação Aplicável" },
      { id: "contato",          label: "14. Contacto" },
    ],
    introP1: <>Bem-vindo ao sítio da <strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nós&quot; ou &quot;nosso&quot;). Ao aceder ou utilizar o nosso sítio, aplicação, produtos ou serviços, o utilizador aceita os presentes Termos de Utilização. Caso não concorde com qualquer parte destes termos, solicitamos que não utilize os nossos serviços.</>,
    introP2: "Os presentes termos constituem um acordo legal entre o utilizador e a Acquafy Corporation, empresa constituída nos Estados Unidos e integrante do Interfy Group.",
    privacyPolicyLink: "Política de Privacidade",
    sections: {
      s1: {
        title: "1. Aceitação dos Termos",
        p1: "Ao aceder e utilizar o sítio acquafy.com (e os seus subdomínios) ou qualquer produto, aplicação ou serviço disponibilizado pela Acquafy, o utilizador declara ter lido, compreendido e aceite os presentes Termos de Utilização, bem como a nossa Política de Privacidade.",
        p2: "Caso o utilizador aceda aos serviços em nome de uma empresa ou organização, declara ter autoridade para vincular essa entidade aos presentes termos.",
      },
      s2: {
        title: "2. Sobre a Acquafy",
        p1: "A Acquafy Corporation é uma empresa americana, fundada em 2020, especializada em soluções de purificação e gestão inteligente de água. A Acquafy desenvolve purificadores, filtros, garrafas alcalinas, uma plataforma digital (Acquafy Global Smart Water Platform) e uma aplicação integrada com tecnologia de IoT e inteligência artificial.",
        p2: "A Acquafy faz parte do Interfy Group, grupo global de tecnologia com mais de 20 anos de atuação em inovação e transformação digital.",
      },
      s3: {
        title: "3. Utilização Permitida do Sítio",
        p1: "O utilizador pode utilizar o nosso sítio para fins lícitos e de acordo com os presentes Termos. É expressamente proibido:",
        items: [
          "Utilizar o sítio de forma que viole leis ou regulamentos aplicáveis",
          "Transmitir qualquer material publicitário ou promocional não solicitado",
          "Tentar obter acesso não autorizado a qualquer parte do sítio ou sistema",
          "Interferir ou interromper a integridade ou o desempenho do sítio",
          "Recolher ou extrair dados de outros utilizadores sem consentimento",
          "Utilizar robôs, scrapers ou outros meios automatizados para aceder ao sítio",
          "Efetuar engenharia reversa, descompilar ou desmontar qualquer software do sítio",
        ],
      },
      s4: {
        title: "4. Registo e Contas de Utilizador",
        sub1t: "4.1 Criação de conta",
        sub1p: "Alguns recursos e serviços da Acquafy podem exigir o registo de uma conta. Ao criar uma conta, o utilizador compromete-se a fornecer informações verdadeiras, precisas e completas.",
        sub2t: "4.2 Responsabilidade pela conta",
        sub2p: "O utilizador é responsável por manter a confidencialidade das suas credenciais de acesso e por todas as atividades realizadas com a sua conta. Notifique imediatamente a Acquafy sobre qualquer utilização não autorizada.",
        sub3t: "4.3 Cancelamento",
        sub3p: "A Acquafy reserva-se o direito de cancelar ou suspender contas que violem os presentes Termos, sem aviso prévio.",
      },
      s5: {
        title: "5. Produtos e Serviços",
        sub1t: "5.1 Disponibilidade",
        sub1p: "A Acquafy esforça-se por manter os seus produtos e serviços disponíveis, mas não garante disponibilidade ininterrupta. Manutenções programadas ou imprevistos técnicos podem causar indisponibilidade temporária.",
        sub2t: "5.2 Descrição dos produtos",
        sub2p: "Fazemos o possível para descrever os nossos produtos com rigor. Contudo, não garantimos que as descrições, imagens ou outros conteúdos do sítio sejam completos, fiáveis, atuais ou isentos de erros.",
        sub3t: "5.3 Preços e pagamentos",
        sub3p: "Os preços apresentados no sítio estão sujeitos a alterações sem aviso prévio. Em caso de erro de preço, a Acquafy reserva-se o direito de cancelar encomendas afetadas, comunicando ao cliente com antecedência.",
        sub4t: "5.4 Aplicação e plataforma digital",
        sub4p: "A utilização da aplicação Acquafy e da plataforma Global Smart Water Platform está sujeita a termos específicos apresentados no momento do registo. Esses termos complementam os presentes Termos de Utilização gerais.",
      },
      s6: {
        title: "6. Propriedade Intelectual",
        p1: "Todo o conteúdo presente no sítio da Acquafy — incluindo textos, imagens, logótipos, ícones, vídeos, software e design — é propriedade exclusiva da Acquafy Corporation ou dos seus licenciantes, e está protegido por leis de direito de autor, marcas registadas e outras leis de propriedade intelectual aplicáveis.",
        p2: "É proibida a reprodução, distribuição, modificação, exibição pública ou criação de obras derivadas de qualquer conteúdo do sítio sem autorização prévia e por escrito da Acquafy.",
        p3: "O nome Acquafy, o logótipo e outras marcas comerciais da Acquafy Corporation são marcas registadas ou em processo de registo. A sua utilização não autorizada é proibida.",
      },
      s7: {
        title: "7. Limitação de Responsabilidade",
        p1: "Na máxima extensão permitida pela lei aplicável, a Acquafy não será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes da utilização ou da incapacidade de utilização do sítio, dos produtos ou dos serviços.",
        p2: "A Acquafy não se responsabiliza por interrupções causadas por fatores fora do seu controlo, incluindo falhas de infraestrutura de terceiros, catástrofes naturais ou ataques cibernéticos.",
        p3: "O utilizador reconhece que a utilização do sítio e dos serviços é por sua conta e risco, dentro dos limites previstos na lei.",
      },
      s8: {
        title: "8. Ligações para Sítios de Terceiros",
        p1: "O nosso sítio pode conter ligações para sítios de terceiros. Essas ligações são fornecidas apenas para conveniência e informação. A Acquafy não tem controlo sobre o conteúdo desses sítios e não se responsabiliza pelo seu conteúdo, práticas de privacidade ou disponibilidade.",
        p2: "O acesso a sítios de terceiros é da inteira responsabilidade do utilizador, devendo este verificar os termos e políticas desses sítios antes de os utilizar.",
      },
      s9: {
        title: "9. Privacidade e Proteção de Dados",
        p1pre: "O tratamento de dados pessoais recolhidos pela Acquafy é regido pela nossa",
        p1post: ", que integra os presentes Termos de Utilização. Ao utilizar os nossos serviços, o utilizador consente com as práticas de recolha e utilização de dados descritas nessa política.",
        p2: "A Acquafy está comprometida com a conformidade com as legislações de proteção de dados aplicáveis, incluindo o Regulamento Geral sobre a Proteção de Dados (RGPD) na União Europeia e legislação equivalente aplicável à sua jurisdição.",
      },
      s10: {
        title: "10. Indemnização",
        p1: "O utilizador aceita defender, indemnizar e isentar a Acquafy Corporation, os seus diretores, colaboradores, parceiros e agentes de quaisquer reclamações, responsabilidades, danos, perdas e despesas (incluindo honorários de advogado razoáveis) decorrentes da sua utilização do sítio ou violação dos presentes Termos.",
      },
      s11: {
        title: "11. Modificações dos Termos",
        p1: "A Acquafy reserva-se o direito de modificar os presentes Termos de Utilização a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no sítio, com a atualização da data no topo desta página.",
        p2: "A utilização continuada do sítio após a publicação de alterações constitui aceitação dos novos Termos. Recomendamos que o utilizador consulte esta página periodicamente.",
      },
      s12: {
        title: "12. Rescisão",
        p1: "A Acquafy pode encerrar ou suspender o acesso do utilizador ao sítio e aos serviços a qualquer momento, com ou sem aviso prévio, por qualquer motivo, incluindo violação dos presentes Termos.",
        p2: "Após a rescisão, as disposições dos presentes Termos que pela sua natureza devam subsistir permanecerão em vigor, incluindo as secções de propriedade intelectual, exclusão de garantias, limitação de responsabilidade e indemnização.",
      },
      s13: {
        title: "13. Legislação Aplicável e Foro",
        p1: "Os presentes Termos de Utilização são regidos pelas leis do Estado da Florida, Estados Unidos, sem prejuízo das leis de proteção do consumidor aplicáveis no país de residência do utilizador.",
        p2: "Na União Europeia, as relações com utilizadores europeus estão igualmente sujeitas ao Regulamento Geral sobre a Proteção de Dados (RGPD) e à legislação de defesa do consumidor da União Europeia aplicável.",
        p3: "Qualquer litígio decorrente dos presentes Termos será preferencialmente resolvido por via de mediação. Não sendo possível, fica eleito o foro competente da jurisdição de residência do utilizador, nos termos da legislação aplicável.",
      },
      s14: {
        title: "14. Contacto",
        p1: "Em caso de dúvidas, sugestões ou reclamações relacionadas com os presentes Termos de Utilização, entre em contacto com a Acquafy:",
      },
    },
  },
  en: {
    sidebarLabel: "On this page",
    navItems: [
      { id: "aceitacao",        label: "1. Acceptance of Terms" },
      { id: "sobre",            label: "2. About Acquafy" },
      { id: "uso-permitido",    label: "3. Permitted Use" },
      { id: "contas",           label: "4. User Accounts" },
      { id: "produtos",         label: "5. Products and Services" },
      { id: "propriedade",      label: "6. Intellectual Property" },
      { id: "responsabilidade", label: "7. Limitation of Liability" },
      { id: "links",            label: "8. Third-Party Links" },
      { id: "privacidade",      label: "9. Privacy" },
      { id: "indenizacao",      label: "10. Indemnification" },
      { id: "modificacoes",     label: "11. Modifications" },
      { id: "rescisao",         label: "12. Termination" },
      { id: "legislacao",       label: "13. Applicable Law" },
      { id: "contato",          label: "14. Contact" },
    ],
    introP1: <>Welcome to the <strong>Acquafy Corporation</strong> website (&quot;Acquafy&quot;, &quot;we&quot; or &quot;our&quot;). By accessing or using our website, app, products or services, you agree to these Terms of Use. If you do not agree with any part of these terms, please do not use our services.</>,
    introP2: "These terms constitute a legal agreement between you (the user) and Acquafy Corporation, a company incorporated in the United States and part of the Interfy Group.",
    privacyPolicyLink: "Privacy Policy",
    sections: {
      s1: {
        title: "1. Acceptance of Terms",
        p1: "By accessing and using the acquafy.com website (and its subdomains) or any product, application, or service offered by Acquafy, you declare that you have read, understood, and agreed to these Terms of Use, as well as our Privacy Policy.",
        p2: "If you are accessing the services on behalf of a company or organization, you declare that you have the authority to bind that entity to these terms.",
      },
      s2: {
        title: "2. About Acquafy",
        p1: "Acquafy Corporation is an American company, founded in 2020, specializing in water purification and smart water management solutions. Acquafy develops purifiers, filters, alkaline bottles, a digital platform (Acquafy Global Smart Water Platform) and an app integrated with IoT technology and artificial intelligence.",
        p2: "Acquafy is part of the Interfy Group, a global technology group with over 20 years of experience in innovation and digital transformation.",
      },
      s3: {
        title: "3. Permitted Use of the Site",
        p1: "You may use our site for lawful purposes and in accordance with these Terms. The following are expressly prohibited:",
        items: [
          "Using the site in any way that violates applicable laws or regulations",
          "Transmitting any unsolicited advertising or promotional material",
          "Attempting to gain unauthorized access to any part of the site or system",
          "Interfering with or disrupting the integrity or performance of the site",
          "Collecting or harvesting data from other users without consent",
          "Using robots, scrapers or other automated means to access the site",
          "Reverse engineering, decompiling, or disassembling any software on the site",
        ],
      },
      s4: {
        title: "4. Registration and User Accounts",
        sub1t: "4.1 Account creation",
        sub1p: "Some Acquafy features and services may require account registration. When creating an account, you agree to provide true, accurate and complete information.",
        sub2t: "4.2 Account responsibility",
        sub2p: "You are responsible for maintaining the confidentiality of your login credentials and for all activities carried out with your account. Immediately notify Acquafy of any unauthorized use.",
        sub3t: "4.3 Cancellation",
        sub3p: "Acquafy reserves the right to cancel or suspend accounts that violate these Terms, without prior notice.",
      },
      s5: {
        title: "5. Products and Services",
        sub1t: "5.1 Availability",
        sub1p: "Acquafy strives to keep its products and services available, but does not guarantee uninterrupted availability. Scheduled maintenance or technical issues may cause temporary unavailability.",
        sub2t: "5.2 Product description",
        sub2p: "We do our best to describe our products accurately. However, we do not guarantee that descriptions, images or other content on the site are complete, reliable, current or error-free.",
        sub3t: "5.3 Prices and payments",
        sub3p: "Prices displayed on the site are subject to change without notice. In case of a pricing error, Acquafy reserves the right to cancel affected orders, notifying the customer in advance.",
        sub4t: "5.4 App and digital platform",
        sub4p: "The use of the Acquafy app and the Global Smart Water Platform is subject to specific terms presented at the time of registration. These terms supplement these general Terms of Use.",
      },
      s6: {
        title: "6. Intellectual Property",
        p1: "All content on the Acquafy website — including texts, images, logos, icons, videos, software and design — is the exclusive property of Acquafy Corporation or its licensors, and is protected by copyright laws, trademarks and other applicable intellectual property laws.",
        p2: "Reproduction, distribution, modification, public display or creation of derivative works from any content on the site without prior written authorization from Acquafy is prohibited.",
        p3: "The name Acquafy, the logo and other trademarks of Acquafy Corporation are registered or pending trademarks. Their unauthorized use is prohibited.",
      },
      s7: {
        title: "7. Limitation of Liability",
        p1: "To the maximum extent permitted by applicable law, Acquafy shall not be liable for indirect, incidental, special, consequential or punitive damages arising from the use or inability to use the site, products or services.",
        p2: "Acquafy is not responsible for interruptions caused by factors outside its control, including third-party infrastructure failures, natural disasters or cyberattacks.",
        p3: "The user acknowledges that use of the site and services is at their own risk, within the limits provided by law.",
      },
      s8: {
        title: "8. Links to Third-Party Sites",
        p1: "Our site may contain links to third-party websites. These links are provided for convenience and information only. Acquafy has no control over the content of these sites and is not responsible for their content, privacy practices or availability.",
        p2: "Access to third-party sites is entirely the user's responsibility, and the user should review the terms and policies of those sites before using them.",
      },
      s9: {
        title: "9. Privacy and Data Protection",
        p1pre: "The processing of personal data collected by Acquafy is governed by our",
        p1post: ", which is incorporated into these Terms of Use. By using our services, you consent to the data collection and use practices described in that policy.",
        p2: "Acquafy is committed to compliance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union, where applicable.",
      },
      s10: {
        title: "10. Indemnification",
        p1: "You agree to defend, indemnify and hold harmless Acquafy Corporation, its directors, employees, partners and agents from any claims, liabilities, damages, losses and expenses (including reasonable attorneys' fees) arising from your use of the site or violation of these Terms.",
      },
      s11: {
        title: "11. Modifications to the Terms",
        p1: "Acquafy reserves the right to modify these Terms of Use at any time. Changes will take effect immediately upon publication on the site, with the date updated at the top of this page.",
        p2: "Continued use of the site after changes are published constitutes acceptance of the new Terms. We recommend that you review this page periodically.",
      },
      s12: {
        title: "12. Termination",
        p1: "Acquafy may terminate or suspend your access to the site and services at any time, with or without notice, for any reason, including violation of these Terms.",
        p2: "After termination, the provisions of these Terms that by their nature should survive will remain in effect, including the sections on intellectual property, warranty disclaimer, limitation of liability, and indemnification.",
      },
      s13: {
        title: "13. Applicable Law and Jurisdiction",
        p1: "These Terms of Use are governed by the laws of the State of Florida, United States, without prejudice to consumer protection laws applicable in the user's country of residence.",
        p2: "In Brazil, consumer relations with Brazilian users are also subject to the Consumer Protection Code (Law No. 8,078/1990) and applicable Brazilian legislation.",
        p3: "Any dispute arising from these Terms will preferably be resolved through mediation. If not possible, the courts of São Paulo/SP, Brazil, are elected for Brazilian users, with waiver of any other, however privileged.",
      },
      s14: {
        title: "14. Contact",
        p1: "If you have questions, suggestions or complaints related to these Terms of Use, please contact Acquafy:",
      },
    },
  },
  es: {
    sidebarLabel: "En esta página",
    navItems: [
      { id: "aceitacao",        label: "1. Aceptación de los Términos" },
      { id: "sobre",            label: "2. Sobre Acquafy" },
      { id: "uso-permitido",    label: "3. Uso Permitido" },
      { id: "contas",           label: "4. Cuentas de Usuario" },
      { id: "produtos",         label: "5. Productos y Servicios" },
      { id: "propriedade",      label: "6. Propiedad Intelectual" },
      { id: "responsabilidade", label: "7. Limitación de Responsabilidad" },
      { id: "links",            label: "8. Enlaces de Terceros" },
      { id: "privacidade",      label: "9. Privacidad" },
      { id: "indenizacao",      label: "10. Indemnización" },
      { id: "modificacoes",     label: "11. Modificaciones" },
      { id: "rescisao",         label: "12. Rescisión" },
      { id: "legislacao",       label: "13. Legislación Aplicable" },
      { id: "contato",          label: "14. Contacto" },
    ],
    introP1: <>Bienvenido al sitio de <strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nosotros&quot; o &quot;nuestro&quot;). Al acceder o utilizar nuestro sitio, aplicación, productos o servicios, usted acepta estos Términos de Uso. Si no está de acuerdo con alguna parte de estos términos, le pedimos que no utilice nuestros servicios.</>,
    introP2: "Estos términos constituyen un acuerdo legal entre usted (el usuario) y Acquafy Corporation, empresa constituida en los Estados Unidos e integrante del Interfy Group.",
    privacyPolicyLink: "Política de Privacidad",
    sections: {
      s1: {
        title: "1. Aceptación de los Términos",
        p1: "Al acceder y utilizar el sitio acquafy.com (y sus subdominios) o cualquier producto, aplicación o servicio ofrecido por Acquafy, usted declara haber leído, comprendido y aceptado estos Términos de Uso, así como nuestra Política de Privacidad.",
        p2: "Si accede a los servicios en nombre de una empresa u organización, declara tener autoridad para vincular a esa entidad con estos términos.",
      },
      s2: {
        title: "2. Sobre Acquafy",
        p1: "Acquafy Corporation es una empresa estadounidense, fundada en 2020, especializada en soluciones de purificación y gestión inteligente del agua. Acquafy desarrolla purificadores, filtros, botellas alcalinas, una plataforma digital (Acquafy Global Smart Water Platform) y una aplicación integrada con tecnología IoT e inteligencia artificial.",
        p2: "Acquafy forma parte del Interfy Group, grupo tecnológico global con más de 20 años de experiencia en innovación y transformación digital.",
      },
      s3: {
        title: "3. Uso Permitido del Sitio",
        p1: "Puede utilizar nuestro sitio con fines lícitos y de acuerdo con estos Términos. Está expresamente prohibido:",
        items: [
          "Utilizar el sitio de manera que infrinja leyes o regulaciones aplicables",
          "Transmitir cualquier material publicitario o promocional no solicitado",
          "Intentar obtener acceso no autorizado a cualquier parte del sitio o sistema",
          "Interferir o interrumpir la integridad o el rendimiento del sitio",
          "Recopilar datos de otros usuarios sin consentimiento",
          "Usar robots, scrapers u otros medios automatizados para acceder al sitio",
          "Realizar ingeniería inversa, descompilar o desensamblar cualquier software del sitio",
        ],
      },
      s4: {
        title: "4. Registro y Cuentas de Usuario",
        sub1t: "4.1 Creación de cuenta",
        sub1p: "Algunas funciones y servicios de Acquafy pueden requerir el registro de una cuenta. Al crear una cuenta, usted se compromete a proporcionar información verdadera, precisa y completa.",
        sub2t: "4.2 Responsabilidad de la cuenta",
        sub2p: "Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades realizadas con su cuenta. Notifique inmediatamente a Acquafy sobre cualquier uso no autorizado.",
        sub3t: "4.3 Cancelación",
        sub3p: "Acquafy se reserva el derecho de cancelar o suspender cuentas que violen estos Términos, sin previo aviso.",
      },
      s5: {
        title: "5. Productos y Servicios",
        sub1t: "5.1 Disponibilidad",
        sub1p: "Acquafy se esfuerza por mantener sus productos y servicios disponibles, pero no garantiza disponibilidad ininterrumpida. El mantenimiento programado o imprevistos técnicos pueden causar indisponibilidad temporal.",
        sub2t: "5.2 Descripción de productos",
        sub2p: "Hacemos todo lo posible para describir nuestros productos con precisión. Sin embargo, no garantizamos que las descripciones, imágenes u otros contenidos del sitio sean completos, confiables, actuales o libres de errores.",
        sub3t: "5.3 Precios y pagos",
        sub3p: "Los precios mostrados en el sitio están sujetos a cambios sin previo aviso. En caso de error de precio, Acquafy se reserva el derecho de cancelar los pedidos afectados, notificando al cliente con anticipación.",
        sub4t: "5.4 Aplicación y plataforma digital",
        sub4p: "El uso de la aplicación Acquafy y de la plataforma Global Smart Water Platform está sujeto a términos específicos presentados en el momento del registro. Estos términos complementan los presentes Términos de Uso generales.",
      },
      s6: {
        title: "6. Propiedad Intelectual",
        p1: "Todo el contenido del sitio de Acquafy — incluyendo textos, imágenes, logotipos, íconos, videos, software y diseño — es propiedad exclusiva de Acquafy Corporation o de sus licenciantes, y está protegido por leyes de derechos de autor, marcas registradas y otras leyes de propiedad intelectual aplicables.",
        p2: "Está prohibida la reproducción, distribución, modificación, exhibición pública o creación de obras derivadas de cualquier contenido del sitio sin autorización previa y por escrito de Acquafy.",
        p3: "El nombre Acquafy, el logotipo y otras marcas comerciales de Acquafy Corporation son marcas registradas o en proceso de registro. Su uso no autorizado está prohibido.",
      },
      s7: {
        title: "7. Limitación de Responsabilidad",
        p1: "En la máxima medida permitida por la ley aplicable, Acquafy no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso o la imposibilidad de uso del sitio, productos o servicios.",
        p2: "Acquafy no se hace responsable de interrupciones causadas por factores fuera de su control, incluyendo fallas de infraestructura de terceros, desastres naturales o ataques cibernéticos.",
        p3: "El usuario reconoce que el uso del sitio y los servicios es bajo su propio riesgo, dentro de los límites previstos por la ley.",
      },
      s8: {
        title: "8. Enlaces a Sitios de Terceros",
        p1: "Nuestro sitio puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente por conveniencia e información. Acquafy no tiene control sobre el contenido de dichos sitios y no se responsabiliza por su contenido, prácticas de privacidad o disponibilidad.",
        p2: "El acceso a sitios de terceros es responsabilidad exclusiva del usuario, quien debe revisar los términos y políticas de esos sitios antes de utilizarlos.",
      },
      s9: {
        title: "9. Privacidad y Protección de Datos",
        p1pre: "El tratamiento de datos personales recopilados por Acquafy se rige por nuestra",
        p1post: ", que se incorpora a estos Términos de Uso. Al utilizar nuestros servicios, usted consiente las prácticas de recopilación y uso de datos descritas en dicha política.",
        p2: "Acquafy está comprometida con el cumplimiento de las leyes de protección de datos aplicables, incluyendo la Ley General de Protección de Datos (LGPD) en Brasil y el Reglamento General de Protección de Datos (RGPD) en la Unión Europea, donde corresponda.",
      },
      s10: {
        title: "10. Indemnización",
        p1: "Usted acepta defender, indemnizar y eximir de responsabilidad a Acquafy Corporation, sus directores, empleados, socios y agentes de cualquier reclamación, responsabilidad, daño, pérdida y gasto (incluidos honorarios legales razonables) derivados de su uso del sitio o violación de estos Términos.",
      },
      s11: {
        title: "11. Modificaciones de los Términos",
        p1: "Acquafy se reserva el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio, con la actualización de la fecha en la parte superior de esta página.",
        p2: "El uso continuado del sitio tras la publicación de cambios constituye la aceptación de los nuevos Términos. Le recomendamos que revise esta página periódicamente.",
      },
      s12: {
        title: "12. Rescisión",
        p1: "Acquafy puede terminar o suspender su acceso al sitio y a los servicios en cualquier momento, con o sin previo aviso, por cualquier motivo, incluida la violación de estos Términos.",
        p2: "Tras la rescisión, las disposiciones de estos Términos que por su naturaleza deban sobrevivir permanecerán vigentes, incluyendo las secciones de propiedad intelectual, exclusión de garantías, limitación de responsabilidad e indemnización.",
      },
      s13: {
        title: "13. Legislación Aplicable y Jurisdicción",
        p1: "Estos Términos de Uso se rigen por las leyes del Estado de Florida, Estados Unidos, sin perjuicio de las leyes de protección al consumidor aplicables en el país de residencia del usuario.",
        p2: "En Brasil, las relaciones de consumo con usuarios brasileños también están sujetas al Código de Defensa del Consumidor (Ley n.° 8.078/1990) y a la legislación brasileña aplicable.",
        p3: "Cualquier disputa derivada de estos Términos se resolverá preferentemente mediante mediación. De no ser posible, se elige el tribunal de São Paulo/SP, Brasil, para usuarios brasileños, con renuncia a cualquier otro fuero.",
      },
      s14: {
        title: "14. Contacto",
        p1: "Si tiene preguntas, sugerencias o quejas relacionadas con estos Términos de Uso, póngase en contacto con Acquafy:",
      },
    },
  },
  fr: {
    sidebarLabel: "Sur cette page",
    navItems: [
      { id: "aceitacao",        label: "1. Acceptation des Conditions" },
      { id: "sobre",            label: "2. À propos d'Acquafy" },
      { id: "uso-permitido",    label: "3. Utilisation Autorisée" },
      { id: "contas",           label: "4. Comptes Utilisateurs" },
      { id: "produtos",         label: "5. Produits et Services" },
      { id: "propriedade",      label: "6. Propriété Intellectuelle" },
      { id: "responsabilidade", label: "7. Limitation de Responsabilité" },
      { id: "links",            label: "8. Liens Tiers" },
      { id: "privacidade",      label: "9. Confidentialité" },
      { id: "indenizacao",      label: "10. Indemnisation" },
      { id: "modificacoes",     label: "11. Modifications" },
      { id: "rescisao",         label: "12. Résiliation" },
      { id: "legislacao",       label: "13. Droit Applicable" },
      { id: "contato",          label: "14. Contact" },
    ],
    introP1: <>Bienvenue sur le site d'<strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nous&quot; ou &quot;notre&quot;). En accédant ou en utilisant notre site, notre application, nos produits ou nos services, vous acceptez les présentes Conditions d'Utilisation. Si vous n'acceptez pas l'une des dispositions de ces conditions, veuillez ne pas utiliser nos services.</>,
    introP2: "Ces conditions constituent un accord juridique entre vous (l'utilisateur) et Acquafy Corporation, société constituée aux États-Unis et membre de l'Interfy Group.",
    privacyPolicyLink: "Politique de Confidentialité",
    sections: {
      s1: {
        title: "1. Acceptation des Conditions",
        p1: "En accédant et en utilisant le site acquafy.com (et ses sous-domaines) ou tout produit, application ou service proposé par Acquafy, vous déclarez avoir lu, compris et accepté les présentes Conditions d'Utilisation, ainsi que notre Politique de Confidentialité.",
        p2: "Si vous accédez aux services au nom d'une entreprise ou d'une organisation, vous déclarez avoir l'autorité pour engager cette entité envers ces conditions.",
      },
      s2: {
        title: "2. À propos d'Acquafy",
        p1: "Acquafy Corporation est une entreprise américaine, fondée en 2020, spécialisée dans les solutions de purification et de gestion intelligente de l'eau. Acquafy développe des purificateurs, des filtres, des bouteilles alcalines, une plateforme numérique (Acquafy Global Smart Water Platform) et une application intégrée à la technologie IoT et à l'intelligence artificielle.",
        p2: "Acquafy fait partie de l'Interfy Group, groupe technologique mondial fort de plus de 20 ans d'expérience dans l'innovation et la transformation numérique.",
      },
      s3: {
        title: "3. Utilisation Autorisée du Site",
        p1: "Vous pouvez utiliser notre site à des fins licites et conformément aux présentes Conditions. Les actes suivants sont expressément interdits :",
        items: [
          "Utiliser le site d'une manière qui enfreint les lois ou réglementations applicables",
          "Transmettre tout matériel publicitaire ou promotionnel non sollicité",
          "Tenter d'obtenir un accès non autorisé à toute partie du site ou du système",
          "Interférer avec ou perturber l'intégrité ou les performances du site",
          "Collecter ou récolter des données d'autres utilisateurs sans leur consentement",
          "Utiliser des robots, des scrapers ou d'autres moyens automatisés pour accéder au site",
          "Procéder à l'ingénierie inverse, décompiler ou désassembler tout logiciel du site",
        ],
      },
      s4: {
        title: "4. Inscription et Comptes Utilisateurs",
        sub1t: "4.1 Création de compte",
        sub1p: "Certaines fonctionnalités et services d'Acquafy peuvent nécessiter la création d'un compte. En créant un compte, vous vous engagez à fournir des informations véridiques, exactes et complètes.",
        sub2t: "4.2 Responsabilité du compte",
        sub2p: "Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités effectuées avec votre compte. Informez immédiatement Acquafy de toute utilisation non autorisée.",
        sub3t: "4.3 Résiliation de compte",
        sub3p: "Acquafy se réserve le droit de résilier ou de suspendre les comptes qui enfreignent les présentes Conditions, sans préavis.",
      },
      s5: {
        title: "5. Produits et Services",
        sub1t: "5.1 Disponibilité",
        sub1p: "Acquafy s'efforce de maintenir ses produits et services disponibles, mais ne garantit pas une disponibilité ininterrompue. Des opérations de maintenance programmées ou des incidents techniques peuvent entraîner une indisponibilité temporaire.",
        sub2t: "5.2 Description des produits",
        sub2p: "Nous faisons de notre mieux pour décrire nos produits avec précision. Cependant, nous ne garantissons pas que les descriptions, images ou autres contenus du site soient complets, fiables, à jour ou exempts d'erreurs.",
        sub3t: "5.3 Prix et paiements",
        sub3p: "Les prix affichés sur le site sont susceptibles d'être modifiés sans préavis. En cas d'erreur de prix, Acquafy se réserve le droit d'annuler les commandes concernées, en informant le client à l'avance.",
        sub4t: "5.4 Application et plateforme numérique",
        sub4p: "L'utilisation de l'application Acquafy et de la plateforme Global Smart Water Platform est soumise à des conditions spécifiques présentées lors de l'inscription. Ces conditions complètent les présentes Conditions d'Utilisation générales.",
      },
      s6: {
        title: "6. Propriété Intellectuelle",
        p1: "Tout le contenu présent sur le site d'Acquafy — y compris les textes, images, logos, icônes, vidéos, logiciels et la conception graphique — est la propriété exclusive d'Acquafy Corporation ou de ses concédants de licence, et est protégé par les lois sur le droit d'auteur, les marques déposées et les autres lois applicables en matière de propriété intellectuelle.",
        p2: "La reproduction, la distribution, la modification, l'affichage public ou la création d'œuvres dérivées de tout contenu du site sans autorisation préalable écrite d'Acquafy est interdite.",
        p3: "Le nom Acquafy, le logo et les autres marques commerciales d'Acquafy Corporation sont des marques déposées ou en cours d'enregistrement. Leur utilisation non autorisée est interdite.",
      },
      s7: {
        title: "7. Limitation de Responsabilité",
        p1: "Dans toute la mesure permise par la loi applicable, Acquafy ne saurait être tenue responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs découlant de l'utilisation ou de l'impossibilité d'utiliser le site, les produits ou les services.",
        p2: "Acquafy n'est pas responsable des interruptions causées par des facteurs hors de son contrôle, notamment les défaillances d'infrastructure tierce, les catastrophes naturelles ou les cyberattaques.",
        p3: "L'utilisateur reconnaît que l'utilisation du site et des services se fait à ses propres risques, dans les limites prévues par la loi.",
      },
      s8: {
        title: "8. Liens vers des Sites Tiers",
        p1: "Notre site peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement à titre de commodité et d'information. Acquafy n'a aucun contrôle sur le contenu de ces sites et n'est pas responsable de leur contenu, de leurs pratiques en matière de confidentialité ou de leur disponibilité.",
        p2: "L'accès aux sites tiers relève de l'entière responsabilité de l'utilisateur, qui doit consulter les conditions et politiques de ces sites avant de les utiliser.",
      },
      s9: {
        title: "9. Confidentialité et Protection des Données",
        p1pre: "Le traitement des données personnelles collectées par Acquafy est régi par notre",
        p1post: ", qui est intégrée aux présentes Conditions d'Utilisation. En utilisant nos services, vous consentez aux pratiques de collecte et d'utilisation des données décrites dans cette politique.",
        p2: "Acquafy s'engage à respecter les lois applicables en matière de protection des données, notamment la Loi Générale sur la Protection des Données (LGPD) au Brésil et le Règlement Général sur la Protection des Données (RGPD) dans l'Union européenne, le cas échéant.",
      },
      s10: {
        title: "10. Indemnisation",
        p1: "Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité Acquafy Corporation, ses dirigeants, employés, partenaires et agents de toute réclamation, responsabilité, dommage, perte et dépense (y compris les honoraires d'avocat raisonnables) découlant de votre utilisation du site ou de la violation des présentes Conditions.",
      },
      s11: {
        title: "11. Modifications des Conditions",
        p1: "Acquafy se réserve le droit de modifier les présentes Conditions d'Utilisation à tout moment. Les modifications prendront effet immédiatement après leur publication sur le site, avec la mise à jour de la date en haut de cette page.",
        p2: "La poursuite de l'utilisation du site après la publication des modifications vaut acceptation des nouvelles Conditions. Nous vous recommandons de consulter cette page régulièrement.",
      },
      s12: {
        title: "12. Résiliation",
        p1: "Acquafy peut mettre fin ou suspendre votre accès au site et aux services à tout moment, avec ou sans préavis, pour quelque raison que ce soit, y compris en cas de violation des présentes Conditions.",
        p2: "Après la résiliation, les dispositions des présentes Conditions qui, par leur nature, doivent survivre resteront en vigueur, notamment les sections relatives à la propriété intellectuelle, à l'exclusion de garanties, à la limitation de responsabilité et à l'indemnisation.",
      },
      s13: {
        title: "13. Droit Applicable et Juridiction",
        p1: "Les présentes Conditions d'Utilisation sont régies par les lois de l'État de Floride, États-Unis, sans préjudice des lois de protection des consommateurs applicables dans le pays de résidence de l'utilisateur.",
        p2: "Au Brésil, les relations de consommation avec les utilisateurs brésiliens sont également soumises au Code de la Protection du Consommateur (Loi n° 8 078/1990) et à la législation brésilienne applicable.",
        p3: "Tout litige découlant des présentes Conditions sera de préférence résolu par médiation. À défaut, le tribunal de São Paulo/SP, Brésil, est choisi pour les utilisateurs brésiliens, avec renonciation à tout autre tribunal, aussi privilégié soit-il.",
      },
      s14: {
        title: "14. Contact",
        p1: "Pour toute question, suggestion ou réclamation relative aux présentes Conditions d'Utilisation, veuillez contacter Acquafy :",
      },
    },
  },
  de: {
    sidebarLabel: "Auf dieser Seite",
    navItems: [
      { id: "aceitacao",        label: "1. Annahme der Bedingungen" },
      { id: "sobre",            label: "2. Über Acquafy" },
      { id: "uso-permitido",    label: "3. Zulässige Nutzung" },
      { id: "contas",           label: "4. Benutzerkonten" },
      { id: "produtos",         label: "5. Produkte und Dienste" },
      { id: "propriedade",      label: "6. Geistiges Eigentum" },
      { id: "responsabilidade", label: "7. Haftungsbeschränkung" },
      { id: "links",            label: "8. Drittanbieter-Links" },
      { id: "privacidade",      label: "9. Datenschutz" },
      { id: "indenizacao",      label: "10. Schadloshaltung" },
      { id: "modificacoes",     label: "11. Änderungen" },
      { id: "rescisao",         label: "12. Kündigung" },
      { id: "legislacao",       label: "13. Anwendbares Recht" },
      { id: "contato",          label: "14. Kontakt" },
    ],
    introP1: <>Willkommen auf der Website der <strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;wir&quot; oder &quot;unser&quot;). Durch den Zugriff auf oder die Nutzung unserer Website, App, Produkte oder Dienste stimmen Sie diesen Nutzungsbedingungen zu. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, bitten wir Sie, unsere Dienste nicht zu nutzen.</>,
    introP2: "Diese Bedingungen stellen eine rechtliche Vereinbarung zwischen Ihnen (dem Nutzer) und der Acquafy Corporation dar, einem in den Vereinigten Staaten gegründeten Unternehmen und Mitglied der Interfy Group.",
    privacyPolicyLink: "Datenschutzrichtlinie",
    sections: {
      s1: {
        title: "1. Annahme der Bedingungen",
        p1: "Durch den Zugriff auf und die Nutzung der Website acquafy.com (und ihrer Subdomains) oder eines von Acquafy angebotenen Produkts, einer Anwendung oder eines Dienstes erklären Sie, diese Nutzungsbedingungen sowie unsere Datenschutzrichtlinie gelesen, verstanden und akzeptiert zu haben.",
        p2: "Wenn Sie im Namen eines Unternehmens oder einer Organisation auf die Dienste zugreifen, erklären Sie, die Befugnis zu haben, diese Einrichtung an diese Bedingungen zu binden.",
      },
      s2: {
        title: "2. Über Acquafy",
        p1: "Acquafy Corporation ist ein amerikanisches Unternehmen, gegründet im Jahr 2020, spezialisiert auf Lösungen zur Wasserreinigung und intelligenten Wasserverwaltung. Acquafy entwickelt Wasserreiniger, Filter, alkalische Flaschen, eine digitale Plattform (Acquafy Global Smart Water Platform) sowie eine App, die mit IoT-Technologie und künstlicher Intelligenz integriert ist.",
        p2: "Acquafy ist Teil der Interfy Group, einer globalen Technologiegruppe mit über 20 Jahren Erfahrung in Innovation und digitaler Transformation.",
      },
      s3: {
        title: "3. Zulässige Nutzung der Website",
        p1: "Sie dürfen unsere Website für rechtmäßige Zwecke und in Übereinstimmung mit diesen Bedingungen nutzen. Folgendes ist ausdrücklich untersagt:",
        items: [
          "Nutzung der Website auf eine Weise, die gegen anwendbare Gesetze oder Vorschriften verstößt",
          "Übertragung unerwünschter Werbe- oder Werbematerialien",
          "Versuch, unbefugten Zugriff auf Teile der Website oder des Systems zu erlangen",
          "Beeinträchtigung oder Unterbrechung der Integrität oder Leistung der Website",
          "Sammeln oder Ernten von Daten anderer Nutzer ohne deren Zustimmung",
          "Verwendung von Bots, Scrapern oder anderen automatisierten Mitteln zum Zugriff auf die Website",
          "Reverse Engineering, Dekompilierung oder Disassemblierung von Software auf der Website",
        ],
      },
      s4: {
        title: "4. Registrierung und Benutzerkonten",
        sub1t: "4.1 Kontoerstellung",
        sub1p: "Einige Funktionen und Dienste von Acquafy können eine Kontoregistrierung erfordern. Bei der Erstellung eines Kontos verpflichten Sie sich, wahrheitsgemäße, genaue und vollständige Angaben zu machen.",
        sub2t: "4.2 Kontoverantwortung",
        sub2p: "Sie sind für die Vertraulichkeit Ihrer Anmeldedaten und alle mit Ihrem Konto durchgeführten Aktivitäten verantwortlich. Benachrichtigen Sie Acquafy unverzüglich über jede unbefugte Nutzung.",
        sub3t: "4.3 Kündigung",
        sub3p: "Acquafy behält sich das Recht vor, Konten, die gegen diese Bedingungen verstoßen, ohne vorherige Ankündigung zu kündigen oder zu sperren.",
      },
      s5: {
        title: "5. Produkte und Dienste",
        sub1t: "5.1 Verfügbarkeit",
        sub1p: "Acquafy bemüht sich, seine Produkte und Dienste verfügbar zu halten, garantiert jedoch keine ununterbrochene Verfügbarkeit. Geplante Wartungsarbeiten oder technische Probleme können zu vorübergehender Nichtverfügbarkeit führen.",
        sub2t: "5.2 Produktbeschreibung",
        sub2p: "Wir bemühen uns, unsere Produkte so präzise wie möglich zu beschreiben. Wir garantieren jedoch nicht, dass Beschreibungen, Bilder oder andere Inhalte auf der Website vollständig, zuverlässig, aktuell oder fehlerfrei sind.",
        sub3t: "5.3 Preise und Zahlungen",
        sub3p: "Die auf der Website angezeigten Preise können ohne vorherige Ankündigung geändert werden. Bei einem Preisfehler behält sich Acquafy das Recht vor, betroffene Bestellungen zu stornieren und den Kunden vorab zu benachrichtigen.",
        sub4t: "5.4 App und digitale Plattform",
        sub4p: "Die Nutzung der Acquafy-App und der Global Smart Water Platform unterliegt spezifischen Bedingungen, die zum Zeitpunkt der Registrierung dargestellt werden. Diese Bedingungen ergänzen die vorliegenden allgemeinen Nutzungsbedingungen.",
      },
      s6: {
        title: "6. Geistiges Eigentum",
        p1: "Alle Inhalte auf der Acquafy-Website — einschließlich Texte, Bilder, Logos, Icons, Videos, Software und Design — sind ausschließliches Eigentum der Acquafy Corporation oder ihrer Lizenzgeber und sind durch Urheberrechte, Markenrechte und andere anwendbare Gesetze zum Schutz des geistigen Eigentums geschützt.",
        p2: "Die Vervielfältigung, Verbreitung, Änderung, öffentliche Darstellung oder Erstellung abgeleiteter Werke aus Inhalten der Website ohne vorherige schriftliche Genehmigung von Acquafy ist untersagt.",
        p3: "Der Name Acquafy, das Logo und andere Markenzeichen der Acquafy Corporation sind eingetragene oder angemeldete Marken. Ihre unbefugte Verwendung ist untersagt.",
      },
      s7: {
        title: "7. Haftungsbeschränkung",
        p1: "Im größtmöglichen gesetzlich zulässigen Umfang haftet Acquafy nicht für mittelbare, zufällige, besondere, Folge- oder Strafschäden, die aus der Nutzung oder der Unfähigkeit zur Nutzung der Website, der Produkte oder Dienste entstehen.",
        p2: "Acquafy haftet nicht für Unterbrechungen, die durch außerhalb seiner Kontrolle liegende Faktoren verursacht werden, einschließlich Infrastrukturausfälle von Drittanbietern, Naturkatastrophen oder Cyberangriffe.",
        p3: "Der Nutzer erkennt an, dass die Nutzung der Website und der Dienste auf eigenes Risiko erfolgt, im Rahmen der gesetzlich vorgesehenen Grenzen.",
      },
      s8: {
        title: "8. Links zu Drittanbieter-Websites",
        p1: "Unsere Website kann Links zu Drittanbieter-Websites enthalten. Diese Links werden nur zur Bequemlichkeit und zur Information bereitgestellt. Acquafy hat keine Kontrolle über den Inhalt dieser Websites und ist nicht für deren Inhalt, Datenschutzpraktiken oder Verfügbarkeit verantwortlich.",
        p2: "Der Zugriff auf Drittanbieter-Websites liegt in der alleinigen Verantwortung des Nutzers, der die Bedingungen und Richtlinien dieser Websites vor der Nutzung prüfen sollte.",
      },
      s9: {
        title: "9. Datenschutz und Datensicherheit",
        p1pre: "Die Verarbeitung personenbezogener Daten, die von Acquafy erhoben werden, unterliegt unserer",
        p1post: ", die in diese Nutzungsbedingungen einbezogen ist. Durch die Nutzung unserer Dienste stimmen Sie den in dieser Richtlinie beschriebenen Praktiken zur Datenerhebung und -nutzung zu.",
        p2: "Acquafy verpflichtet sich zur Einhaltung der anwendbaren Datenschutzgesetze, einschließlich des Allgemeinen Datenschutzgesetzes (LGPD) in Brasilien und der Datenschutz-Grundverordnung (DSGVO) in der Europäischen Union, soweit anwendbar.",
      },
      s10: {
        title: "10. Schadloshaltung",
        p1: "Sie erklären sich damit einverstanden, Acquafy Corporation, ihre Direktoren, Mitarbeiter, Partner und Agenten von Ansprüchen, Verbindlichkeiten, Schäden, Verlusten und Ausgaben (einschließlich angemessener Anwaltsgebühren) freizustellen und schadlos zu halten, die aus Ihrer Nutzung der Website oder einem Verstoß gegen diese Bedingungen entstehen.",
      },
      s11: {
        title: "11. Änderungen der Bedingungen",
        p1: "Acquafy behält sich das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Änderungen treten unmittelbar nach der Veröffentlichung auf der Website in Kraft, wobei das Datum oben auf dieser Seite aktualisiert wird.",
        p2: "Die fortgesetzte Nutzung der Website nach der Veröffentlichung von Änderungen gilt als Zustimmung zu den neuen Bedingungen. Wir empfehlen Ihnen, diese Seite regelmäßig zu überprüfen.",
      },
      s12: {
        title: "12. Kündigung",
        p1: "Acquafy kann Ihren Zugang zur Website und zu den Diensten jederzeit mit oder ohne Vorankündigung aus beliebigem Grund, einschließlich eines Verstoßes gegen diese Bedingungen, beenden oder aussetzen.",
        p2: "Nach der Kündigung bleiben die Bestimmungen dieser Bedingungen, die ihrer Natur nach fortbestehen sollen, in Kraft, einschließlich der Abschnitte über geistiges Eigentum, Gewährleistungsausschluss, Haftungsbeschränkung und Schadloshaltung.",
      },
      s13: {
        title: "13. Anwendbares Recht und Gerichtsstand",
        p1: "Diese Nutzungsbedingungen unterliegen den Gesetzen des Bundesstaates Florida, USA, unbeschadet der im Wohnsitzland des Nutzers geltenden Verbraucherschutzgesetze.",
        p2: "In Brasilien unterliegen die Verbraucherbeziehungen mit brasilianischen Nutzern auch dem Verbraucherschutzgesetz (Gesetz Nr. 8.078/1990) und der anwendbaren brasilianischen Gesetzgebung.",
        p3: "Jede Streitigkeit aus diesen Bedingungen wird vorzugsweise durch Mediation beigelegt. Falls nicht möglich, wird das Gericht von São Paulo/SP, Brasilien, für brasilianische Nutzer gewählt, unter Verzicht auf jeden anderen, noch so bevorzugten Gerichtsstand.",
      },
      s14: {
        title: "14. Kontakt",
        p1: "Bei Fragen, Anregungen oder Beschwerden zu diesen Nutzungsbedingungen wenden Sie sich bitte an Acquafy:",
      },
    },
  },
  it: {
    sidebarLabel: "In questa pagina",
    navItems: [
      { id: "aceitacao",        label: "1. Accettazione dei Termini" },
      { id: "sobre",            label: "2. Su Acquafy" },
      { id: "uso-permitido",    label: "3. Uso Consentito" },
      { id: "contas",           label: "4. Account Utente" },
      { id: "produtos",         label: "5. Prodotti e Servizi" },
      { id: "propriedade",      label: "6. Proprietà Intellettuale" },
      { id: "responsabilidade", label: "7. Limitazione di Responsabilità" },
      { id: "links",            label: "8. Link di Terze Parti" },
      { id: "privacidade",      label: "9. Privacy" },
      { id: "indenizacao",      label: "10. Indennizzo" },
      { id: "modificacoes",     label: "11. Modifiche" },
      { id: "rescisao",         label: "12. Risoluzione" },
      { id: "legislacao",       label: "13. Legge Applicabile" },
      { id: "contato",          label: "14. Contatto" },
    ],
    introP1: <>Benvenuto nel sito di <strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;noi&quot; o &quot;nostro&quot;). Accedendo o utilizzando il nostro sito, l'applicazione, i prodotti o i servizi, l'utente accetta i presenti Termini di Utilizzo. In caso di disaccordo con qualsiasi parte di questi termini, si prega di non utilizzare i nostri servizi.</>,
    introP2: "I presenti termini costituiscono un accordo legale tra l'utente e Acquafy Corporation, società costituita negli Stati Uniti e parte dell'Interfy Group.",
    privacyPolicyLink: "Informativa sulla Privacy",
    sections: {
      s1: {
        title: "1. Accettazione dei Termini",
        p1: "Accedendo e utilizzando il sito acquafy.com (e i suoi sottodomini) o qualsiasi prodotto, applicazione o servizio offerto da Acquafy, l'utente dichiara di aver letto, compreso e accettato i presenti Termini di Utilizzo, nonché la nostra Informativa sulla Privacy.",
        p2: "Se si accede ai servizi per conto di un'azienda o organizzazione, si dichiara di avere l'autorità di vincolare tale entità ai presenti termini.",
      },
      s2: {
        title: "2. Su Acquafy",
        p1: "Acquafy Corporation è un'azienda americana, fondata nel 2020, specializzata in soluzioni di purificazione e gestione intelligente dell'acqua. Acquafy sviluppa purificatori, filtri, bottiglie alcaline, una piattaforma digitale (Acquafy Global Smart Water Platform) e un'applicazione integrata con tecnologia IoT e intelligenza artificiale.",
        p2: "Acquafy fa parte dell'Interfy Group, un gruppo tecnologico globale con oltre 20 anni di esperienza nell'innovazione e nella trasformazione digitale.",
      },
      s3: {
        title: "3. Uso Consentito del Sito",
        p1: "L'utente può utilizzare il nostro sito per scopi leciti e in conformità con i presenti Termini. Sono espressamente vietati:",
        items: [
          "Utilizzare il sito in modo da violare leggi o regolamenti applicabili",
          "Trasmettere materiale pubblicitario o promozionale non richiesto",
          "Tentare di ottenere accesso non autorizzato a qualsiasi parte del sito o del sistema",
          "Interferire con o interrompere l'integrità o le prestazioni del sito",
          "Raccogliere o prelevare dati di altri utenti senza consenso",
          "Utilizzare bot, scraper o altri mezzi automatizzati per accedere al sito",
          "Effettuare reverse engineering, decompilare o disassemblare qualsiasi software del sito",
        ],
      },
      s4: {
        title: "4. Registrazione e Account Utente",
        sub1t: "4.1 Creazione dell'account",
        sub1p: "Alcune funzionalità e servizi di Acquafy possono richiedere la registrazione di un account. Creando un account, ci si impegna a fornire informazioni veritiere, accurate e complete.",
        sub2t: "4.2 Responsabilità dell'account",
        sub2p: "L'utente è responsabile della riservatezza delle proprie credenziali di accesso e di tutte le attività svolte con il proprio account. Notificare immediatamente Acquafy di qualsiasi utilizzo non autorizzato.",
        sub3t: "4.3 Cancellazione",
        sub3p: "Acquafy si riserva il diritto di cancellare o sospendere gli account che violano i presenti Termini, senza preavviso.",
      },
      s5: {
        title: "5. Prodotti e Servizi",
        sub1t: "5.1 Disponibilità",
        sub1p: "Acquafy si impegna a mantenere i propri prodotti e servizi disponibili, ma non garantisce una disponibilità ininterrotta. Manutenzioni programmate o problemi tecnici imprevisti potrebbero causare indisponibilità temporanea.",
        sub2t: "5.2 Descrizione dei prodotti",
        sub2p: "Facciamo del nostro meglio per descrivere i nostri prodotti con precisione. Tuttavia, non garantiamo che le descrizioni, le immagini o altri contenuti del sito siano completi, affidabili, aggiornati o privi di errori.",
        sub3t: "5.3 Prezzi e pagamenti",
        sub3p: "I prezzi visualizzati sul sito sono soggetti a modifiche senza preavviso. In caso di errore di prezzo, Acquafy si riserva il diritto di annullare gli ordini interessati, comunicandolo al cliente in anticipo.",
        sub4t: "5.4 Applicazione e piattaforma digitale",
        sub4p: "L'utilizzo dell'applicazione Acquafy e della Global Smart Water Platform è soggetto a termini specifici presentati al momento della registrazione. Tali termini integrano i presenti Termini di Utilizzo generali.",
      },
      s6: {
        title: "6. Proprietà Intellettuale",
        p1: "Tutti i contenuti presenti sul sito di Acquafy — inclusi testi, immagini, loghi, icone, video, software e design — sono di proprietà esclusiva di Acquafy Corporation o dei suoi licenziatari, e sono protetti dalle leggi sul diritto d'autore, dai marchi registrati e da altre leggi applicabili in materia di proprietà intellettuale.",
        p2: "È vietata la riproduzione, distribuzione, modifica, esposizione pubblica o creazione di opere derivate da qualsiasi contenuto del sito senza previa autorizzazione scritta di Acquafy.",
        p3: "Il nome Acquafy, il logo e altri marchi commerciali di Acquafy Corporation sono marchi registrati o in corso di registrazione. Il loro uso non autorizzato è vietato.",
      },
      s7: {
        title: "7. Limitazione di Responsabilità",
        p1: "Nella misura massima consentita dalla legge applicabile, Acquafy non sarà responsabile per danni indiretti, incidentali, speciali, consequenziali o punitivi derivanti dall'uso o dall'impossibilità di utilizzo del sito, dei prodotti o dei servizi.",
        p2: "Acquafy non è responsabile per interruzioni causate da fattori al di fuori del suo controllo, inclusi guasti all'infrastruttura di terze parti, calamità naturali o attacchi informatici.",
        p3: "L'utente riconosce che l'utilizzo del sito e dei servizi avviene a proprio rischio, nei limiti previsti dalla legge.",
      },
      s8: {
        title: "8. Link a Siti di Terze Parti",
        p1: "Il nostro sito può contenere link a siti web di terze parti. Tali link sono forniti esclusivamente per comodità e a scopo informativo. Acquafy non ha alcun controllo sul contenuto di tali siti e non è responsabile per il loro contenuto, le pratiche sulla privacy o la disponibilità.",
        p2: "L'accesso ai siti di terze parti è di esclusiva responsabilità dell'utente, che deve verificare i termini e le politiche di tali siti prima di utilizzarli.",
      },
      s9: {
        title: "9. Privacy e Protezione dei Dati",
        p1pre: "Il trattamento dei dati personali raccolti da Acquafy è disciplinato dalla nostra",
        p1post: ", che è incorporata nei presenti Termini di Utilizzo. Utilizzando i nostri servizi, l'utente acconsente alle pratiche di raccolta e utilizzo dei dati descritte in tale informativa.",
        p2: "Acquafy si impegna al rispetto delle leggi applicabili in materia di protezione dei dati, inclusa la Legge Generale sulla Protezione dei Dati (LGPD) in Brasile e il Regolamento Generale sulla Protezione dei Dati (RGPD) nell'Unione Europea, ove applicabile.",
      },
      s10: {
        title: "10. Indennizzo",
        p1: "L'utente accetta di difendere, indennizzare e tenere indenne Acquafy Corporation, i suoi dirigenti, dipendenti, partner e agenti da qualsiasi reclamo, responsabilità, danno, perdita e spesa (compresi gli onorari legali ragionevoli) derivanti dall'utilizzo del sito o dalla violazione dei presenti Termini.",
      },
      s11: {
        title: "11. Modifiche ai Termini",
        p1: "Acquafy si riserva il diritto di modificare i presenti Termini di Utilizzo in qualsiasi momento. Le modifiche entreranno in vigore immediatamente dopo la pubblicazione sul sito, con aggiornamento della data in cima a questa pagina.",
        p2: "Il continuo utilizzo del sito dopo la pubblicazione delle modifiche costituisce accettazione dei nuovi Termini. Si consiglia di consultare questa pagina periodicamente.",
      },
      s12: {
        title: "12. Risoluzione",
        p1: "Acquafy può terminare o sospendere l'accesso al sito e ai servizi in qualsiasi momento, con o senza preavviso, per qualsiasi motivo, inclusa la violazione dei presenti Termini.",
        p2: "Dopo la risoluzione, le disposizioni dei presenti Termini che per loro natura devono sopravvivere rimarranno in vigore, incluse le sezioni sulla proprietà intellettuale, l'esclusione di garanzie, la limitazione di responsabilità e l'indennizzo.",
      },
      s13: {
        title: "13. Legge Applicabile e Foro Competente",
        p1: "I presenti Termini di Utilizzo sono disciplinati dalle leggi dello Stato della Florida, Stati Uniti, fatti salvi i diritti dei consumatori applicabili nel paese di residenza dell'utente.",
        p2: "In Brasile, i rapporti di consumo con gli utenti brasiliani sono altresì soggetti al Codice di Difesa del Consumatore (Legge n. 8.078/1990) e alla legislazione brasiliana applicabile.",
        p3: "Qualsiasi controversia derivante dai presenti Termini sarà preferibilmente risolta tramite mediazione. In mancanza, viene eletto il foro di São Paulo/SP, Brasile, per gli utenti brasiliani, con rinuncia a qualsiasi altro foro, per quanto privilegiato.",
      },
      s14: {
        title: "14. Contatto",
        p1: "Per domande, suggerimenti o reclami relativi ai presenti Termini di Utilizzo, si prega di contattare Acquafy:",
      },
    },
  },
  zh: {
    sidebarLabel: "本页内容",
    navItems: [
      { id: "aceitacao",        label: "1. 条款接受" },
      { id: "sobre",            label: "2. 关于 Acquafy" },
      { id: "uso-permitido",    label: "3. 许可使用" },
      { id: "contas",           label: "4. 用户账户" },
      { id: "produtos",         label: "5. 产品与服务" },
      { id: "propriedade",      label: "6. 知识产权" },
      { id: "responsabilidade", label: "7. 责任限制" },
      { id: "links",            label: "8. 第三方链接" },
      { id: "privacidade",      label: "9. 隐私保护" },
      { id: "indenizacao",      label: "10. 赔偿" },
      { id: "modificacoes",     label: "11. 条款修改" },
      { id: "rescisao",         label: "12. 终止" },
      { id: "legislacao",       label: "13. 适用法律" },
      { id: "contato",          label: "14. 联系我们" },
    ],
    introP1: <>欢迎访问 <strong>Acquafy Corporation</strong>（以下简称"Acquafy"、"我们"或"我方"）的网站。访问或使用我们的网站、应用程序、产品或服务，即表示您同意本使用条款。如果您不同意本条款的任何部分，请勿使用我们的服务。</>,
    introP2: "本条款构成您（用户）与 Acquafy Corporation 之间的法律协议。Acquafy Corporation 是一家在美国注册成立的公司，隶属于 Interfy Group。",
    privacyPolicyLink: "隐私政策",
    sections: {
      s1: {
        title: "1. 条款接受",
        p1: "访问并使用 acquafy.com 网站（及其子域名）或 Acquafy 提供的任何产品、应用程序或服务，即表示您声明已阅读、理解并同意本使用条款及我们的隐私政策。",
        p2: "如果您代表公司或组织访问服务，则表示您有权代表该实体接受本条款的约束。",
      },
      s2: {
        title: "2. 关于 Acquafy",
        p1: "Acquafy Corporation 是一家美国公司，成立于 2020 年，专注于水净化和智能水管理解决方案。Acquafy 开发净水器、过滤器、碱性水瓶、数字平台（Acquafy Global Smart Water Platform）以及集成了 IoT 技术和人工智能的应用程序。",
        p2: "Acquafy 是 Interfy Group 的成员，该集团是一个全球科技集团，在创新与数字化转型领域拥有逾 20 年的经验。",
      },
      s3: {
        title: "3. 网站许可使用",
        p1: "您可以出于合法目的并依照本条款使用我们的网站。以下行为被明确禁止：",
        items: [
          "以违反适用法律或法规的方式使用网站",
          "传播任何未经请求的广告或促销材料",
          "试图未经授权访问网站或系统的任何部分",
          "干扰或破坏网站的完整性或性能",
          "未经同意收集或采集其他用户的数据",
          "使用机器人、爬虫或其他自动化手段访问网站",
          "对网站上的任何软件进行逆向工程、反编译或反汇编",
        ],
      },
      s4: {
        title: "4. 注册与用户账户",
        sub1t: "4.1 账户创建",
        sub1p: "Acquafy 的某些功能和服务可能需要注册账户。创建账户时，您承诺提供真实、准确、完整的信息。",
        sub2t: "4.2 账户责任",
        sub2p: "您负责保护登录凭据的机密性，并对使用您账户进行的所有活动承担责任。如发现任何未经授权的使用，请立即通知 Acquafy。",
        sub3t: "4.3 账户注销",
        sub3p: "Acquafy 保留在不事先通知的情况下取消或暂停违反本条款的账户的权利。",
      },
      s5: {
        title: "5. 产品与服务",
        sub1t: "5.1 可用性",
        sub1p: "Acquafy 努力保持其产品和服务的可用性，但不保证服务不会中断。计划内的维护或技术故障可能导致暂时性不可用。",
        sub2t: "5.2 产品描述",
        sub2p: "我们尽力准确描述我们的产品。但我们不保证网站上的描述、图片或其他内容是完整、可靠、最新或无错误的。",
        sub3t: "5.3 价格与付款",
        sub3p: "网站上显示的价格可能随时更改，恕不另行通知。如发生价格错误，Acquafy 保留取消受影响订单的权利，并提前通知客户。",
        sub4t: "5.4 应用程序与数字平台",
        sub4p: "Acquafy 应用程序和 Global Smart Water Platform 的使用须遵守注册时提供的特定条款。这些条款是对本一般使用条款的补充。",
      },
      s6: {
        title: "6. 知识产权",
        p1: "Acquafy 网站上的所有内容——包括文本、图像、标志、图标、视频、软件和设计——均为 Acquafy Corporation 或其许可方的专有财产，并受版权法、商标法及其他适用知识产权法律的保护。",
        p2: "未经 Acquafy 事先书面授权，禁止对网站上的任何内容进行复制、分发、修改、公开展示或创作衍生作品。",
        p3: "Acquafy 名称、标志及 Acquafy Corporation 的其他商标均为注册商标或待注册商标。未经授权使用，一律禁止。",
      },
      s7: {
        title: "7. 责任限制",
        p1: "在适用法律允许的最大范围内，Acquafy 不对因使用或无法使用网站、产品或服务而产生的间接、偶然、特殊、后果性或惩罚性损害承担责任。",
        p2: "Acquafy 不对其控制范围以外的因素造成的中断承担责任，包括第三方基础设施故障、自然灾害或网络攻击。",
        p3: "用户承认，在法律规定的范围内，使用网站和服务的风险由其自行承担。",
      },
      s8: {
        title: "8. 第三方网站链接",
        p1: "我们的网站可能包含指向第三方网站的链接。这些链接仅为方便和提供信息而提供。Acquafy 无法控制这些网站的内容，对其内容、隐私惯例或可用性不承担任何责任。",
        p2: "访问第三方网站完全由用户自行负责，用户在使用前应查阅这些网站的条款和政策。",
      },
      s9: {
        title: "9. 隐私与数据保护",
        p1pre: "Acquafy 收集的个人数据的处理受我们的",
        p1post: "约束，该政策已纳入本使用条款。使用我们的服务，即表示您同意该政策中描述的数据收集和使用惯例。",
        p2: "Acquafy 致力于遵守适用的数据保护法律，包括巴西的《通用数据保护法》（LGPD）以及欧盟的《通用数据保护条例》（GDPR）（如适用）。",
      },
      s10: {
        title: "10. 赔偿",
        p1: "您同意就因您使用网站或违反本条款而产生的任何索赔、责任、损害、损失和费用（包括合理的律师费）向 Acquafy Corporation 及其董事、员工、合作伙伴和代理人进行辩护、赔偿并使其免受损害。",
      },
      s11: {
        title: "11. 条款修改",
        p1: "Acquafy 保留随时修改本使用条款的权利。修改将在网站上发布后立即生效，本页顶部的日期将相应更新。",
        p2: "在修改发布后继续使用网站，即构成对新条款的接受。建议您定期查阅本页面。",
      },
      s12: {
        title: "12. 终止",
        p1: "Acquafy 可随时以任何理由（包括违反本条款）在有无通知的情况下终止或暂停您对网站和服务的访问。",
        p2: "终止后，本条款中按其性质应继续有效的条款将继续有效，包括有关知识产权、免责声明、责任限制和赔偿的条款。",
      },
      s13: {
        title: "13. 适用法律与管辖权",
        p1: "本使用条款受美国佛罗里达州法律管辖，但不影响用户居住国适用的消费者保护法律。",
        p2: "在巴西，与巴西用户的消费关系也受《消费者保护法》（第 8,078/1990 号法律）及适用的巴西立法约束。",
        p3: "因本条款引起的任何争议将优先通过调解解决。如无法解决，巴西用户选择巴西圣保罗州/SP 法院作为管辖法院，并放弃任何其他法院的管辖权，无论该法院多么具有优先权。",
      },
      s14: {
        title: "14. 联系我们",
        p1: "如有与本使用条款相关的疑问、建议或投诉，请联系 Acquafy：",
      },
    },
  },
  ja: {
    sidebarLabel: "このページの内容",
    navItems: [
      { id: "aceitacao",        label: "1. 利用規約への同意" },
      { id: "sobre",            label: "2. Acquafy について" },
      { id: "uso-permitido",    label: "3. 許可される使用" },
      { id: "contas",           label: "4. ユーザーアカウント" },
      { id: "produtos",         label: "5. 製品とサービス" },
      { id: "propriedade",      label: "6. 知的財産" },
      { id: "responsabilidade", label: "7. 責任の制限" },
      { id: "links",            label: "8. サードパーティリンク" },
      { id: "privacidade",      label: "9. プライバシー" },
      { id: "indenizacao",      label: "10. 補償" },
      { id: "modificacoes",     label: "11. 変更" },
      { id: "rescisao",         label: "12. 解約" },
      { id: "legislacao",       label: "13. 準拠法" },
      { id: "contato",          label: "14. お問い合わせ" },
    ],
    introP1: <><strong>Acquafy Corporation</strong>（「Acquafy」、「当社」）のウェブサイトへようこそ。当サイト、アプリ、製品またはサービスにアクセスまたは使用することにより、お客様はこの利用規約に同意したものとみなされます。本規約のいずれかの部分に同意されない場合は、当社のサービスをご利用にならないようお願いいたします。</>,
    introP2: "本規約は、お客様（ユーザー）と、米国に設立された Acquafy Corporation（Interfy Group の一員）との間の法的合意を構成します。",
    privacyPolicyLink: "プライバシーポリシー",
    sections: {
      s1: {
        title: "1. 利用規約への同意",
        p1: "acquafy.com のウェブサイト（およびそのサブドメイン）または Acquafy が提供する製品、アプリケーション、サービスにアクセスして使用することにより、お客様は本利用規約およびプライバシーポリシーを読み、理解し、同意したことを宣言します。",
        p2: "企業または組織を代表してサービスにアクセスする場合は、その組織を本規約に拘束する権限を有することを宣言したものとします。",
      },
      s2: {
        title: "2. Acquafy について",
        p1: "Acquafy Corporation は、2020 年に設立されたアメリカ企業で、水の浄化およびスマート水管理ソリューションを専門としています。Acquafy は、浄水器、フィルター、アルカリ水ボトル、デジタルプラットフォーム（Acquafy Global Smart Water Platform）、および IoT 技術と人工知能を統合したアプリを開発しています。",
        p2: "Acquafy は、イノベーションとデジタル変革において 20 年以上の実績を持つグローバル技術グループ、Interfy Group の一員です。",
      },
      s3: {
        title: "3. サイトの許可される使用",
        p1: "お客様は、合法的な目的のために、本規約に従って当サイトを使用することができます。以下の行為は明示的に禁止されています：",
        items: [
          "適用される法律または規制に違反する方法でサイトを使用すること",
          "未承諾の広告または宣伝素材を送信すること",
          "サイトまたはシステムの一部への不正アクセスを試みること",
          "サイトの整合性またはパフォーマンスを妨害または中断させること",
          "同意なしに他のユーザーのデータを収集または取得すること",
          "ボット、スクレイパー、またはその他の自動化された手段を使用してサイトにアクセスすること",
          "サイト上のソフトウェアのリバースエンジニアリング、逆コンパイル、または逆アセンブルを行うこと",
        ],
      },
      s4: {
        title: "4. 登録とユーザーアカウント",
        sub1t: "4.1 アカウントの作成",
        sub1p: "Acquafy の一部の機能やサービスでは、アカウントの登録が必要な場合があります。アカウントを作成する際、お客様は真実で正確かつ完全な情報を提供することを約束します。",
        sub2t: "4.2 アカウントの責任",
        sub2p: "お客様は、ログイン認証情報の機密性を維持し、アカウントで行われたすべての活動に責任を負います。無断使用を発見した場合は、直ちに Acquafy に通知してください。",
        sub3t: "4.3 キャンセル",
        sub3p: "Acquafy は、本規約に違反したアカウントを予告なく解約または停止する権利を留保します。",
      },
      s5: {
        title: "5. 製品とサービス",
        sub1t: "5.1 可用性",
        sub1p: "Acquafy は製品とサービスを利用可能な状態に保つよう努めていますが、継続的な可用性を保証するものではありません。定期メンテナンスや予期せぬ技術的問題により、一時的に利用できない場合があります。",
        sub2t: "5.2 製品の説明",
        sub2p: "当社は製品を正確に説明するよう最善を尽くしています。ただし、サイト上の説明、画像、その他のコンテンツが完全、信頼性があり、最新または誤りがないことを保証するものではありません。",
        sub3t: "5.3 価格と支払い",
        sub3p: "サイトに表示される価格は予告なく変更される場合があります。価格に誤りがあった場合、Acquafy は影響を受けた注文をキャンセルする権利を留保し、お客様に事前に通知します。",
        sub4t: "5.4 アプリとデジタルプラットフォーム",
        sub4p: "Acquafy アプリおよび Global Smart Water Platform の使用は、登録時に提示される特定の条件に従います。これらの条件は、本一般利用規約を補完するものです。",
      },
      s6: {
        title: "6. 知的財産",
        p1: "Acquafy のウェブサイト上のすべてのコンテンツ（テキスト、画像、ロゴ、アイコン、動画、ソフトウェア、デザインを含む）は、Acquafy Corporation またはそのライセンサーの独占的財産であり、著作権法、商標法、およびその他の適用される知的財産法によって保護されています。",
        p2: "Acquafy の事前書面による承認なしに、サイト上のコンテンツの複製、配布、改変、公開表示、または派生物の作成を行うことは禁止されています。",
        p3: "Acquafy の名称、ロゴ、および Acquafy Corporation のその他の商標は、登録済みまたは登録申請中の商標です。無断使用は禁止されています。",
      },
      s7: {
        title: "7. 責任の制限",
        p1: "適用法が許す最大限の範囲で、Acquafy はサイト、製品またはサービスの使用または使用不能から生じる間接的、偶発的、特別、結果的または懲罰的損害について責任を負いません。",
        p2: "Acquafy は、第三者インフラの障害、自然災害、サイバー攻撃など、その管理外の要因によって引き起こされた中断について責任を負いません。",
        p3: "ユーザーは、法律の定める範囲内で、サイトおよびサービスの使用が自己の責任において行われることを認めます。",
      },
      s8: {
        title: "8. サードパーティサイトへのリンク",
        p1: "当サイトには、サードパーティのウェブサイトへのリンクが含まれている場合があります。これらのリンクは、利便性と情報提供のみを目的として提供されています。Acquafy はこれらのサイトのコンテンツを管理することができず、そのコンテンツ、プライバシー慣行、または可用性について責任を負いません。",
        p2: "サードパーティのサイトへのアクセスはユーザーの自己責任であり、ユーザーは利用前にそれらのサイトの利用規約とポリシーを確認する必要があります。",
      },
      s9: {
        title: "9. プライバシーとデータ保護",
        p1pre: "Acquafy が収集する個人データの処理は、本利用規約に組み込まれた当社の",
        p1post: "によって規定されます。当社のサービスを使用することにより、お客様はそのポリシーに記載されているデータ収集および使用の慣行に同意したものとみなされます。",
        p2: "Acquafy は、ブラジルの一般データ保護法（LGPD）および欧州連合の一般データ保護規則（GDPR）を含む、適用されるデータ保護法の遵守に取り組んでいます（該当する場合）。",
      },
      s10: {
        title: "10. 補償",
        p1: "お客様は、サイトの使用または本規約違反から生じる請求、責任、損害、損失、費用（合理的な弁護士費用を含む）について、Acquafy Corporation、その取締役、従業員、パートナー、代理人を弁護し、補償し、免責することに同意します。",
      },
      s11: {
        title: "11. 規約の変更",
        p1: "Acquafy は、いつでも本利用規約を変更する権利を留保します。変更はサイトへの公開後直ちに発効し、このページ上部の日付が更新されます。",
        p2: "変更公開後も当サイトを引き続き使用することは、新しい規約への同意を意味します。このページを定期的に確認することをお勧めします。",
      },
      s12: {
        title: "12. 解約",
        p1: "Acquafy は、本規約の違反を含む理由の如何を問わず、いつでも予告の有無にかかわらず、サイトおよびサービスへのアクセスを終了または停止することができます。",
        p2: "解約後も、その性質上存続すべき本規約の条項は引き続き有効であり、知的財産、保証の免責、責任の制限および補償に関する条項が含まれます。",
      },
      s13: {
        title: "13. 準拠法と管轄",
        p1: "本利用規約は、フロリダ州（米国）の法律に準拠し、ユーザーの居住国で適用される消費者保護法を妨げないものとします。",
        p2: "ブラジルでは、ブラジルのユーザーとの消費者関係は、消費者保護法（法律第 8,078/1990 号）および適用されるブラジルの法律にも従います。",
        p3: "本規約から生じる紛争は、優先的に調停によって解決されます。それが不可能な場合、ブラジルのユーザーについては、ブラジルのサンパウロ州/SP の裁判所が選択され、いかに優遇された裁判所であっても他のすべての裁判所への提訴を放棄します。",
      },
      s14: {
        title: "14. お問い合わせ",
        p1: "本利用規約に関するご質問、ご提案、またはご不満については、Acquafy までご連絡ください：",
      },
    },
  },
  ko: {
    sidebarLabel: "이 페이지에서",
    navItems: [
      { id: "aceitacao",        label: "1. 약관 동의" },
      { id: "sobre",            label: "2. Acquafy 소개" },
      { id: "uso-permitido",    label: "3. 허용된 사용" },
      { id: "contas",           label: "4. 사용자 계정" },
      { id: "produtos",         label: "5. 제품 및 서비스" },
      { id: "propriedade",      label: "6. 지적 재산권" },
      { id: "responsabilidade", label: "7. 책임 제한" },
      { id: "links",            label: "8. 제3자 링크" },
      { id: "privacidade",      label: "9. 개인정보 보호" },
      { id: "indenizacao",      label: "10. 손해배상" },
      { id: "modificacoes",     label: "11. 약관 변경" },
      { id: "rescisao",         label: "12. 해지" },
      { id: "legislacao",       label: "13. 준거법" },
      { id: "contato",          label: "14. 문의하기" },
    ],
    introP1: <><strong>Acquafy Corporation</strong>（「Acquafy」, 「당사」）의 웹사이트에 오신 것을 환영합니다. 당사의 웹사이트, 앱, 제품 또는 서비스에 접속하거나 이용함으로써 귀하는 본 이용약관에 동의하는 것으로 간주됩니다. 본 약관의 어느 부분에도 동의하지 않으시면 당사의 서비스를 이용하지 마시기 바랍니다.</>,
    introP2: "본 약관은 귀하（사용자）와 미국에 설립된 Acquafy Corporation（Interfy Group 소속）간의 법적 계약을 구성합니다.",
    privacyPolicyLink: "개인정보 처리방침",
    sections: {
      s1: {
        title: "1. 약관 동의",
        p1: "acquafy.com 웹사이트（및 그 하위 도메인）또는 Acquafy가 제공하는 제품, 애플리케이션 또는 서비스에 접속 및 이용함으로써 귀하는 본 이용약관 및 개인정보 처리방침을 읽고 이해하였으며 이에 동의한다는 것을 선언합니다.",
        p2: "귀하가 회사 또는 조직을 대표하여 서비스에 접속하는 경우, 해당 주체를 본 약관에 구속할 권한을 보유함을 선언한 것으로 간주됩니다.",
      },
      s2: {
        title: "2. Acquafy 소개",
        p1: "Acquafy Corporation은 2020년에 설립된 미국 기업으로, 수질 정화 및 스마트 수자원 관리 솔루션을 전문으로 합니다. Acquafy는 정수기, 필터, 알칼리수 병, 디지털 플랫폼（Acquafy Global Smart Water Platform）및 IoT 기술과 인공지능을 통합한 앱을 개발합니다.",
        p2: "Acquafy는 혁신과 디지털 전환 분야에서 20년 이상의 경험을 보유한 글로벌 기술 그룹인 Interfy Group의 일원입니다.",
      },
      s3: {
        title: "3. 사이트의 허용된 사용",
        p1: "귀하는 합법적인 목적과 본 약관에 따라 당사 사이트를 이용할 수 있습니다. 다음 행위는 명시적으로 금지됩니다：",
        items: [
          "적용 가능한 법률 또는 규정을 위반하는 방식으로 사이트를 이용하는 행위",
          "원치 않는 광고 또는 판촉 자료를 전송하는 행위",
          "사이트 또는 시스템의 일부에 무단으로 접근하려는 시도",
          "사이트의 무결성 또는 성능을 방해하거나 중단시키는 행위",
          "동의 없이 다른 사용자의 데이터를 수집하거나 채취하는 행위",
          "봇, 스크레이퍼 또는 기타 자동화된 수단으로 사이트에 접속하는 행위",
          "사이트의 소프트웨어를 역설계, 역컴파일 또는 역어셈블하는 행위",
        ],
      },
      s4: {
        title: "4. 가입 및 사용자 계정",
        sub1t: "4.1 계정 생성",
        sub1p: "Acquafy의 일부 기능 및 서비스를 이용하려면 계정 등록이 필요할 수 있습니다. 계정을 생성할 때 귀하는 진실되고 정확하며 완전한 정보를 제공할 것을 약속합니다.",
        sub2t: "4.2 계정 책임",
        sub2p: "귀하는 로그인 자격 증명의 기밀성을 유지하고 귀하의 계정으로 수행된 모든 활동에 대해 책임을 집니다. 무단 사용이 발견된 경우 즉시 Acquafy에 알려주시기 바랍니다.",
        sub3t: "4.3 취소",
        sub3p: "Acquafy는 사전 통보 없이 본 약관을 위반하는 계정을 취소하거나 정지할 권리를 보유합니다.",
      },
      s5: {
        title: "5. 제품 및 서비스",
        sub1t: "5.1 가용성",
        sub1p: "Acquafy는 제품과 서비스를 이용 가능한 상태로 유지하려고 노력하지만, 중단 없는 가용성을 보장하지는 않습니다. 정기 점검 또는 예기치 못한 기술적 문제로 인해 일시적으로 서비스가 중단될 수 있습니다.",
        sub2t: "5.2 제품 설명",
        sub2p: "당사는 제품을 최대한 정확하게 설명하기 위해 최선을 다합니다. 그러나 사이트의 설명, 이미지 또는 기타 콘텐츠가 완전하거나 신뢰할 수 있거나 최신이거나 오류가 없음을 보장하지는 않습니다.",
        sub3t: "5.3 가격 및 결제",
        sub3p: "사이트에 표시된 가격은 사전 통보 없이 변경될 수 있습니다. 가격 오류가 발생한 경우 Acquafy는 영향을 받은 주문을 취소할 권리를 보유하며 고객에게 사전에 통보합니다.",
        sub4t: "5.4 앱 및 디지털 플랫폼",
        sub4p: "Acquafy 앱 및 Global Smart Water Platform 사용은 가입 시 제시되는 특정 약관에 따릅니다. 이러한 약관은 본 일반 이용약관을 보완합니다.",
      },
      s6: {
        title: "6. 지적 재산권",
        p1: "텍스트, 이미지, 로고, 아이콘, 동영상, 소프트웨어 및 디자인을 포함한 Acquafy 웹사이트의 모든 콘텐츠는 Acquafy Corporation 또는 그 라이선서의 독점 재산이며, 저작권법, 상표법 및 기타 적용 가능한 지적 재산권법에 의해 보호됩니다.",
        p2: "Acquafy의 사전 서면 승인 없이 사이트의 콘텐츠를 복제, 배포, 수정, 공개 전시하거나 파생 저작물을 만드는 것은 금지됩니다.",
        p3: "Acquafy 이름, 로고 및 Acquafy Corporation의 기타 상표는 등록 상표이거나 등록 출원 중입니다. 이를 무단으로 사용하는 것은 금지됩니다.",
      },
      s7: {
        title: "7. 책임 제한",
        p1: "적용 가능한 법률이 허용하는 최대 범위 내에서, Acquafy는 사이트, 제품 또는 서비스의 이용 또는 이용 불가로 인해 발생하는 간접적, 우발적, 특별, 결과적 또는 징벌적 손해에 대해 책임을 지지 않습니다.",
        p2: "Acquafy는 제3자 인프라 장애, 자연재해 또는 사이버 공격을 포함하여 통제 범위 밖의 요인으로 인한 중단에 대해 책임을 지지 않습니다.",
        p3: "사용자는 법률이 정하는 한도 내에서 사이트 및 서비스 이용이 본인의 책임 하에 이루어짐을 인정합니다.",
      },
      s8: {
        title: "8. 제3자 사이트 링크",
        p1: "당사 사이트에는 제3자 웹사이트로 연결되는 링크가 포함될 수 있습니다. 이러한 링크는 편의와 정보 제공 목적으로만 제공됩니다. Acquafy는 이러한 사이트의 콘텐츠를 통제할 수 없으며 해당 사이트의 콘텐츠, 개인정보 보호 관행 또는 가용성에 대해 책임을 지지 않습니다.",
        p2: "제3자 사이트에 대한 접근은 전적으로 사용자의 책임이며, 사용자는 이용 전에 해당 사이트의 약관 및 정책을 검토해야 합니다.",
      },
      s9: {
        title: "9. 개인정보 보호 및 데이터 보안",
        p1pre: "Acquafy가 수집한 개인 데이터의 처리는 본 이용약관에 통합된 당사의",
        p1post: "에 의해 규율됩니다. 당사 서비스를 이용함으로써 귀하는 해당 방침에 설명된 데이터 수집 및 이용 관행에 동의하는 것으로 간주됩니다.",
        p2: "Acquafy는 브라질의 일반 데이터 보호법（LGPD）및 해당되는 경우 유럽연합의 일반 데이터 보호 규정（GDPR）을 포함한 적용 가능한 데이터 보호법 준수에 최선을 다하고 있습니다.",
      },
      s10: {
        title: "10. 손해배상",
        p1: "귀하는 사이트 이용 또는 본 약관 위반으로 인해 발생하는 청구, 책임, 손해, 손실 및 비용（합리적인 변호사 비용 포함）으로부터 Acquafy Corporation, 그 이사, 직원, 파트너 및 대리인을 방어하고 배상하며 면책하는 데 동의합니다.",
      },
      s11: {
        title: "11. 약관 변경",
        p1: "Acquafy는 언제든지 본 이용약관을 수정할 권리를 보유합니다. 변경 사항은 사이트에 게시된 직후 발효되며, 이 페이지 상단의 날짜가 업데이트됩니다.",
        p2: "변경 사항 게시 후 사이트를 계속 이용하면 새로운 약관에 동의한 것으로 간주됩니다. 정기적으로 이 페이지를 검토하시길 권장합니다.",
      },
      s12: {
        title: "12. 해지",
        p1: "Acquafy는 본 약관 위반을 포함한 어떠한 이유로도 사전 통보 여부와 관계없이 언제든지 사이트 및 서비스에 대한 귀하의 접근을 종료하거나 정지할 수 있습니다.",
        p2: "해지 후에도 성질상 존속해야 하는 본 약관의 조항은 계속 유효하며, 지적 재산권, 보증 면책, 책임 제한 및 손해배상에 관한 조항이 이에 포함됩니다.",
      },
      s13: {
        title: "13. 준거법 및 관할권",
        p1: "본 이용약관은 사용자의 거주 국가에서 적용되는 소비자 보호법을 침해하지 않는 범위 내에서 미국 플로리다 주법의 적용을 받습니다.",
        p2: "브라질에서 브라질 사용자와의 소비자 관계는 소비자 보호법（법률 제 8,078/1990 호）및 적용 가능한 브라질 법률에도 따릅니다.",
        p3: "본 약관에서 발생하는 분쟁은 우선적으로 조정을 통해 해결합니다. 불가능한 경우, 브라질 사용자에 대해서는 브라질 상파울루주/SP 법원을 관할 법원으로 선택하며 그보다 우선시되는 다른 모든 법원에 대한 권리를 포기합니다.",
      },
      s14: {
        title: "14. 문의하기",
        p1: "본 이용약관에 관한 질문, 제안 또는 불만이 있으시면 Acquafy에 문의해 주시기 바랍니다：",
      },
    },
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

export default function TermosDeUsoConteudo() {
  const { lang } = useLang();
  const t = T[lang];
  const navItems = t.navItems;
  return (
    <div className="flex flex-col items-center px-[20px] py-[80px] w-full bg-white">
      <div className="flex gap-[60px] items-start max-w-[1200px] w-full">

        {/* ── Sidebar de navegação (desktop only) ────────────────────────── */}
        <aside className="hidden xl:flex flex-col gap-[8px] shrink-0 w-[260px] sticky top-[100px] self-start">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[16px] text-[#888] uppercase tracking-[1px] mb-[8px]">
            {t.sidebarLabel}
          </p>
          {navItems.map((item) => (
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
            <P>{t.introP1}</P>
            <P>{t.introP2}</P>
          </div>

          {/* 1. Aceitação */}
          <Section id="aceitacao" title={t.sections.s1.title}>
            <P>{t.sections.s1.p1}</P>
            <P>{t.sections.s1.p2}</P>
          </Section>

          {/* 2. Sobre a Acquafy */}
          <Section id="sobre" title={t.sections.s2.title}>
            <P>{t.sections.s2.p1}</P>
            <P>{t.sections.s2.p2}</P>
          </Section>

          {/* 3. Uso Permitido */}
          <Section id="uso-permitido" title={t.sections.s3.title}>
            <P>{t.sections.s3.p1}</P>
            <UL items={t.sections.s3.items} />
          </Section>

          {/* 4. Contas */}
          <Section id="contas" title={t.sections.s4.title}>
            <Subsection title={t.sections.s4.sub1t}>
              <P>{t.sections.s4.sub1p}</P>
            </Subsection>
            <Subsection title={t.sections.s4.sub2t}>
              <P>{t.sections.s4.sub2p}</P>
            </Subsection>
            <Subsection title={t.sections.s4.sub3t}>
              <P>{t.sections.s4.sub3p}</P>
            </Subsection>
          </Section>

          {/* 5. Produtos */}
          <Section id="produtos" title={t.sections.s5.title}>
            <Subsection title={t.sections.s5.sub1t}>
              <P>{t.sections.s5.sub1p}</P>
            </Subsection>
            <Subsection title={t.sections.s5.sub2t}>
              <P>{t.sections.s5.sub2p}</P>
            </Subsection>
            <Subsection title={t.sections.s5.sub3t}>
              <P>{t.sections.s5.sub3p}</P>
            </Subsection>
            <Subsection title={t.sections.s5.sub4t}>
              <P>{t.sections.s5.sub4p}</P>
            </Subsection>
          </Section>

          {/* 6. Propriedade Intelectual */}
          <Section id="propriedade" title={t.sections.s6.title}>
            <P>{t.sections.s6.p1}</P>
            <P>{t.sections.s6.p2}</P>
            <P>{t.sections.s6.p3}</P>
          </Section>

          {/* 7. Responsabilidade */}
          <Section id="responsabilidade" title={t.sections.s7.title}>
            <P>{t.sections.s7.p1}</P>
            <P>{t.sections.s7.p2}</P>
            <P>{t.sections.s7.p3}</P>
          </Section>

          {/* 8. Links */}
          <Section id="links" title={t.sections.s8.title}>
            <P>{t.sections.s8.p1}</P>
            <P>{t.sections.s8.p2}</P>
          </Section>

          {/* 9. Privacidade */}
          <Section id="privacidade" title={t.sections.s9.title}>
            <P>
              {t.sections.s9.p1pre}{" "}
              <a
                href="/politicas-privacidade"
                className="text-[#0569ff] underline underline-offset-2 hover:text-[#0035c1] transition-colors"
              >
                {t.privacyPolicyLink}
              </a>
              {t.sections.s9.p1post}
            </P>
            <P>{t.sections.s9.p2}</P>
          </Section>

          {/* 10. Indenização */}
          <Section id="indenizacao" title={t.sections.s10.title}>
            <P>{t.sections.s10.p1}</P>
          </Section>

          {/* 11. Modificações */}
          <Section id="modificacoes" title={t.sections.s11.title}>
            <P>{t.sections.s11.p1}</P>
            <P>{t.sections.s11.p2}</P>
          </Section>

          {/* 12. Rescisão */}
          <Section id="rescisao" title={t.sections.s12.title}>
            <P>{t.sections.s12.p1}</P>
            <P>{t.sections.s12.p2}</P>
          </Section>

          {/* 13. Legislação */}
          <Section id="legislacao" title={t.sections.s13.title}>
            <P>{t.sections.s13.p1}</P>
            <P>{t.sections.s13.p2}</P>
            <P>{t.sections.s13.p3}</P>
          </Section>

          {/* 14. Contato */}
          <Section id="contato" title={t.sections.s14.title}>
            <P>{t.sections.s14.p1}</P>
            <div
              className="flex flex-col gap-[0px] p-[28px] rounded-[16px] border border-[#e0e8ff]"
              style={{ background: "linear-gradient(135deg, #f8faff, #f0f4ff)" }}
            >
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-[#1f2e91] mb-[16px]">
                Acquafy Corporation
              </p>
              {[
                ["E-mail", "info@acquafy.com"],
                ["Website", "acquafy.com/contato"],
              ].map(([label, value]) => (
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
          </Section>

        </article>
      </div>
    </div>
  );
}
