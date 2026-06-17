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
                ["E-mail", "legal@acquafy.com"],
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
