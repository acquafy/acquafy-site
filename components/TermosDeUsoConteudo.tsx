"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

// ── Traduções ─────────────────────────────────────────────────────────────────

const T: Record<Lang, {
  sidebarLabel: string;
  navItems: { id: string; label: string }[];
  introP1: React.ReactNode;
  introP2: string;
  privacyPolicyLink: string;
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
          <Section id="aceitacao" title="1. Aceitação dos Termos">
            <P>
              Ao acessar e usar o site <strong>acquafy.com</strong> (e seus subdomínios) ou qualquer
              produto, aplicativo ou serviço oferecido pela Acquafy, você declara ter lido,
              compreendido e concordado com estes Termos de Uso, bem como com nossa Política de
              Privacidade.
            </P>
            <P>
              Caso você esteja acessando os serviços em nome de uma empresa ou organização, você
              declara ter autoridade para vincular essa entidade a estes termos.
            </P>
          </Section>

          {/* 2. Sobre a Acquafy */}
          <Section id="sobre" title="2. Sobre a Acquafy">
            <P>
              A Acquafy Corporation é uma empresa americana, fundada em 2020, especializada em
              soluções de purificação e gestão inteligente de água. A Acquafy desenvolve purificadores,
              filtros, garrafas alcalinas, uma plataforma digital (Acquafy Global Smart Water Platform)
              e um aplicativo integrado com tecnologia de IoT e inteligência artificial.
            </P>
            <P>
              A Acquafy faz parte do <strong>Interfy Group</strong>, grupo global de tecnologia com
              mais de 20 anos de atuação em inovação e transformação digital.
            </P>
          </Section>

          {/* 3. Uso Permitido */}
          <Section id="uso-permitido" title="3. Uso Permitido do Site">
            <P>
              Você pode utilizar nosso site para fins lícitos e de acordo com estes Termos. É
              expressamente proibido:
            </P>
            <UL items={[
              "Utilizar o site de forma que viole leis ou regulamentos aplicáveis",
              "Transmitir qualquer material publicitário ou promocional não solicitado",
              "Tentar obter acesso não autorizado a qualquer parte do site ou sistema",
              "Interferir ou interromper a integridade ou o desempenho do site",
              "Coletar ou colher dados de outros usuários sem consentimento",
              "Usar robôs, scrapers ou outros meios automatizados para acessar o site",
              "Fazer engenharia reversa, descompilar ou desmontar qualquer software do site",
            ]} />
          </Section>

          {/* 4. Contas */}
          <Section id="contas" title="4. Cadastro e Contas de Usuário">
            <Subsection title="4.1 Criação de conta">
              <P>
                Alguns recursos e serviços da Acquafy podem exigir o cadastro de uma conta. Ao
                criar uma conta, você se compromete a fornecer informações verdadeiras, precisas e
                completas.
              </P>
            </Subsection>
            <Subsection title="4.2 Responsabilidade pela conta">
              <P>
                Você é responsável por manter a confidencialidade das suas credenciais de acesso e
                por todas as atividades realizadas com sua conta. Notifique imediatamente a Acquafy
                sobre qualquer uso não autorizado.
              </P>
            </Subsection>
            <Subsection title="4.3 Cancelamento">
              <P>
                A Acquafy reserva-se o direito de cancelar ou suspender contas que violem estes
                Termos, sem aviso prévio.
              </P>
            </Subsection>
          </Section>

          {/* 5. Produtos */}
          <Section id="produtos" title="5. Produtos e Serviços">
            <Subsection title="5.1 Disponibilidade">
              <P>
                A Acquafy se esforça para manter seus produtos e serviços disponíveis, mas não
                garante disponibilidade ininterrupta. Manutenções programadas ou imprevistos técnicos
                podem causar indisponibilidade temporária.
              </P>
            </Subsection>
            <Subsection title="5.2 Descrição dos produtos">
              <P>
                Fazemos o possível para descrever nossos produtos com precisão. No entanto, não
                garantimos que as descrições, imagens ou outros conteúdos do site sejam completos,
                confiáveis, atuais ou livres de erros.
              </P>
            </Subsection>
            <Subsection title="5.3 Preços e pagamentos">
              <P>
                Os preços apresentados no site estão sujeitos a alterações sem aviso prévio. Em caso
                de erro de preço, a Acquafy reserva-se o direito de cancelar pedidos afetados,
                comunicando o cliente com antecedência.
              </P>
            </Subsection>
            <Subsection title="5.4 Aplicativo e plataforma digital">
              <P>
                O uso do aplicativo Acquafy e da plataforma Global Smart Water Platform está sujeito
                a termos específicos apresentados no momento do cadastro. Esses termos complementam
                os presentes Termos de Uso gerais.
              </P>
            </Subsection>
          </Section>

          {/* 6. Propriedade Intelectual */}
          <Section id="propriedade" title="6. Propriedade Intelectual">
            <P>
              Todo o conteúdo presente no site da Acquafy — incluindo textos, imagens, logotipos,
              ícones, vídeos, software e design — é de propriedade exclusiva da Acquafy Corporation
              ou de seus licenciadores, e está protegido por leis de direito autoral, marcas
              registradas e outras leis de propriedade intelectual aplicáveis.
            </P>
            <P>
              É proibida a reprodução, distribuição, modificação, exibição pública ou criação de
              obras derivadas de qualquer conteúdo do site sem autorização prévia e por escrito
              da Acquafy.
            </P>
            <P>
              O nome <strong>Acquafy</strong>, o logotipo e outras marcas comerciais da Acquafy
              Corporation são marcas registradas ou em processo de registro. Seu uso não autorizado
              é proibido.
            </P>
          </Section>

          {/* 7. Responsabilidade */}
          <Section id="responsabilidade" title="7. Limitação de Responsabilidade">
            <P>
              Na máxima extensão permitida pela lei aplicável, a Acquafy não será responsável por
              danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do
              uso ou da incapacidade de uso do site, dos produtos ou dos serviços.
            </P>
            <P>
              A Acquafy não se responsabiliza por interrupções causadas por fatores fora de seu
              controle, incluindo falhas de infraestrutura de terceiros, desastres naturais ou
              ataques cibernéticos.
            </P>
            <P>
              O usuário reconhece que o uso do site e dos serviços é por sua conta e risco, dentro
              dos limites previstos em lei.
            </P>
          </Section>

          {/* 8. Links */}
          <Section id="links" title="8. Links para Sites de Terceiros">
            <P>
              Nosso site pode conter links para sites de terceiros. Esses links são fornecidos
              apenas para conveniência e informação. A Acquafy não tem controle sobre o conteúdo
              desses sites e não se responsabiliza por seu conteúdo, práticas de privacidade ou
              disponibilidade.
            </P>
            <P>
              O acesso a sites de terceiros é de inteira responsabilidade do usuário, devendo este
              verificar os termos e políticas desses sites antes de utilizá-los.
            </P>
          </Section>

          {/* 9. Privacidade */}
          <Section id="privacidade" title="9. Privacidade e Proteção de Dados">
            <P>
              O tratamento de dados pessoais coletados pela Acquafy é regido por nossa{" "}
              <a
                href="/politicas-privacidade"
                className="text-[#0569ff] underline underline-offset-2 hover:text-[#0035c1] transition-colors"
              >
                {t.privacyPolicyLink}
              </a>
              , que integra estes Termos de Uso. Ao utilizar nossos serviços, você consente com
              as práticas de coleta e uso de dados descritas nessa política.
            </P>
            <P>
              A Acquafy está comprometida com a conformidade às legislações de proteção de dados
              aplicáveis, incluindo a Lei Geral de Proteção de Dados (LGPD) no Brasil e o
              Regulamento Geral de Proteção de Dados (GDPR) na União Europeia, onde aplicável.
            </P>
          </Section>

          {/* 10. Indenização */}
          <Section id="indenizacao" title="10. Indenização">
            <P>
              Você concorda em defender, indenizar e isentar a Acquafy Corporation, seus diretores,
              funcionários, parceiros e agentes de quaisquer reclamações, responsabilidades, danos,
              perdas e despesas (incluindo honorários advocatícios razoáveis) decorrentes do seu uso
              do site ou violação destes Termos.
            </P>
          </Section>

          {/* 11. Modificações */}
          <Section id="modificacoes" title="11. Modificações dos Termos">
            <P>
              A Acquafy reserva-se o direito de modificar estes Termos de Uso a qualquer momento.
              As alterações entrarão em vigor imediatamente após a publicação no site, com a
              atualização da data no topo desta página.
            </P>
            <P>
              O uso continuado do site após a publicação de alterações constitui aceitação dos
              novos Termos. Recomendamos que você revise esta página periodicamente.
            </P>
          </Section>

          {/* 12. Rescisão */}
          <Section id="rescisao" title="12. Rescisão">
            <P>
              A Acquafy pode encerrar ou suspender seu acesso ao site e aos serviços a qualquer
              momento, com ou sem aviso prévio, por qualquer motivo, incluindo violação destes Termos.
            </P>
            <P>
              Após a rescisão, as disposições destes Termos que por sua natureza devam sobreviver
              permanecerão em vigor, incluindo as seções de propriedade intelectual, isenção de
              garantias, limitação de responsabilidade e indenização.
            </P>
          </Section>

          {/* 13. Legislação */}
          <Section id="legislacao" title="13. Legislação Aplicável e Foro">
            <P>
              Estes Termos de Uso são regidos pelas leis do Estado da Flórida, Estados Unidos,
              sem prejuízo das leis de proteção ao consumidor aplicáveis no país de residência
              do usuário.
            </P>
            <P>
              No Brasil, as relações de consumo com usuários brasileiros estão também sujeitas
              ao Código de Defesa do Consumidor (Lei nº 8.078/1990) e à legislação brasileira
              aplicável.
            </P>
            <P>
              Qualquer disputa decorrente destes Termos será preferencialmente resolvida por
              meio de mediação. Não sendo possível, fica eleito o foro da comarca de São Paulo/SP,
              Brasil, para usuários brasileiros, com renúncia a qualquer outro, por mais privilegiado
              que seja.
            </P>
          </Section>

          {/* 14. Contato */}
          <Section id="contato" title="14. Contato">
            <P>
              Em caso de dúvidas, sugestões ou reclamações relacionadas a estes Termos de Uso,
              entre em contato com a Acquafy:
            </P>
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
