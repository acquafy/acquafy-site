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

// ── Dados da navegação lateral ────────────────────────────────────────────────

const navItems = [
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
];

// ── Componente principal ──────────────────────────────────────────────────────

export default function PoliticasPrivacidadeContent() {
  return (
    <div className="px-[20px] py-[80px] w-full bg-white">
      <div className="max-w-[1200px] mx-auto w-full xl:grid xl:grid-cols-[260px_1fr] xl:gap-[60px]">

        {/* ── Sidebar de navegação (desktop only) ────────────────────────── */}
        <aside className="hidden xl:flex flex-col gap-[8px] sticky top-[100px] self-start">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[16px] text-[#888] uppercase tracking-[1px] mb-[8px]">
            Nesta página
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
            <P>
              A <strong>Acquafy Corporation</strong> (&quot;Acquafy&quot;, &quot;nós&quot; ou &quot;nosso&quot;)
              está comprometida com a proteção da sua privacidade. Esta Política de
              Privacidade descreve como tratamos os dados pessoais que você nos fornece
              ou que coletamos quando você utiliza nosso website, plataforma, aplicativo
              e demais serviços (&quot;Serviços&quot;).
            </P>
            <P>
              Esta política está em conformidade com a Lei Geral de Proteção de Dados
              (LGPD — Lei nº 13.709/2018), o Regulamento Geral de Proteção de Dados da
              União Europeia (RGPD/GDPR) e demais legislações aplicáveis de privacidade
              e proteção de dados.
            </P>
          </div>

          {/* 1. Controlador de Dados */}
          <Section id="controlador" title="1. Controlador de Dados">
            <P>
              O controlador responsável pelo tratamento dos seus dados pessoais é:
            </P>
            <div className="flex flex-col gap-[8px] p-[24px] rounded-[12px] bg-[#f8faff] border border-[#e0e8ff]">
              {[
                ["Empresa", "Acquafy Corporation"],
                ["E-mail", "privacidade@acquafy.com"],
                ["Website", "acquafy.com"],
              ].map(([label, value]) => (
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
          <Section id="coleta" title="2. Dados Pessoais que Coletamos">
            <Subsection title="2.1 Dados fornecidos por você">
              <UL items={[
                "Nome completo e endereço de e-mail ao criar uma conta ou preencher formulários de contato",
                "Informações de endereço e entrega para processamento de pedidos",
                "Dados de pagamento (processados de forma segura por provedores certificados PCI-DSS)",
                "Mensagens, dúvidas e solicitações enviadas por meio dos nossos canais de suporte",
                "Preferências e configurações da sua conta na Plataforma Acquafy",
              ]} />
            </Subsection>
            <Subsection title="2.2 Dados coletados automaticamente">
              <UL items={[
                "Endereço IP, tipo de navegador e sistema operacional",
                "Páginas visitadas, tempo de permanência e cliques (dados de navegação)",
                "Identificadores de dispositivo e dados de geolocalização aproximada",
                "Informações de uso do aplicativo Acquafy e dados de telemetria do purificador (IoT)",
                "Cookies e tecnologias similares (detalhados na Seção 6)",
              ]} />
            </Subsection>
            <Subsection title="2.3 Dados recebidos de terceiros">
              <UL items={[
                "Informações de redes sociais quando você opta por autenticar via login social",
                "Dados de parceiros de distribuição para suporte a revendedores e integradores",
                "Informações de verificação de identidade de prestadores de serviços autorizados",
              ]} />
            </Subsection>
          </Section>

          {/* 3. Finalidades */}
          <Section id="finalidades" title="3. Finalidades do Tratamento">
            <P>Utilizamos os seus dados pessoais para as seguintes finalidades:</P>
            <UL items={[
              "Prestação dos Serviços: criação e gerenciamento de conta, processamento de pedidos e entrega de produtos",
              "Suporte ao cliente: resposta a dúvidas, solicitações de manutenção e atendimento pós-venda",
              "Melhoria dos Serviços: análise de uso da plataforma, app e dispositivos IoT para aprimorar funcionalidades",
              "Comunicações de marketing: envio de newsletters, ofertas e novidades, mediante consentimento prévio",
              "Obrigações legais e regulatórias: cumprimento de exigências legais, fiscais e regulatórias aplicáveis",
              "Segurança e prevenção a fraudes: detecção de atividades suspeitas e proteção da integridade dos Serviços",
              "Personalização: oferecer conteúdos, recomendações e experiências adaptadas ao seu perfil",
            ]} />
          </Section>

          {/* 4. Bases Legais */}
          <Section id="bases-legais" title="4. Bases Legais para o Tratamento">
            <P>
              Tratamos os seus dados com fundamento nas seguintes bases legais previstas
              na LGPD e no RGPD:
            </P>
            {[
              {
                base: "Execução de contrato",
                desc: "Tratamento necessário para a prestação dos Serviços contratados por você.",
              },
              {
                base: "Obrigação legal",
                desc: "Cumprimento de obrigações previstas em lei, regulamentos ou determinações de autoridades.",
              },
              {
                base: "Legítimo interesse",
                desc: "Melhoria dos Serviços, segurança, prevenção a fraudes e comunicações institucionais, desde que não prevaleçam sobre os seus direitos.",
              },
              {
                base: "Consentimento",
                desc: "Envio de comunicações de marketing e uso de cookies não essenciais. Você pode retirar o consentimento a qualquer momento.",
              },
            ].map(({ base, desc }) => (
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
          <Section id="compartilhamento" title="5. Compartilhamento de Dados">
            <P>
              Não vendemos os seus dados pessoais a terceiros. Podemos compartilhá-los
              apenas nas seguintes situações:
            </P>
            <Subsection title="5.1 Prestadores de serviços">
              <P>
                Compartilhamos dados com fornecedores que nos auxiliam na operação dos
                Serviços (processamento de pagamentos, hospedagem em nuvem, envio de
                e-mails, análise de dados), sempre sob acordo de processamento de dados
                e com obrigações de confidencialidade e segurança.
              </P>
            </Subsection>
            <Subsection title="5.2 Parceiros de distribuição">
              <P>
                Revendedores e integradores autorizados da rede Acquafy podem receber
                dados necessários para a execução de pedidos, suporte técnico e
                instalação de dispositivos na sua região.
              </P>
            </Subsection>
            <Subsection title="5.3 Obrigação legal">
              <P>
                Podemos divulgar dados quando exigido por lei, decisão judicial ou
                autoridade competente, ou quando necessário para proteger direitos e
                segurança da Acquafy, dos nossos usuários ou de terceiros.
              </P>
            </Subsection>
            <Subsection title="5.4 Transferências corporativas">
              <P>
                Em caso de fusão, aquisição ou venda de ativos, os dados poderão ser
                transferidos ao novo controlador, que ficará vinculado às obrigações
                desta política.
              </P>
            </Subsection>
          </Section>

          {/* 6. Cookies */}
          <Section id="cookies" title="6. Cookies e Tecnologias de Rastreamento">
            <P>
              Utilizamos cookies e tecnologias similares para melhorar a sua experiência
              nos nossos Serviços. Os cookies são classificados em:
            </P>
            {[
              {
                tipo: "Essenciais",
                cor: "#0569ff",
                desc: "Necessários para o funcionamento básico do website e da plataforma (autenticação, segurança, preferências de sessão). Não podem ser desativados.",
              },
              {
                tipo: "Analíticos",
                cor: "#7b5ea7",
                desc: "Permitem-nos entender como os visitantes utilizam o site (páginas visitadas, tempo de permanência). Utilizamos ferramentas como Google Analytics.",
              },
              {
                tipo: "Funcionais",
                cor: "#0ab572",
                desc: "Armazenam preferências como idioma, localização e configurações personalizadas para melhorar a sua experiência.",
              },
              {
                tipo: "Marketing",
                cor: "#e05c00",
                desc: "Utilizados para exibir publicidade relevante e medir a eficácia de campanhas. Requerem o seu consentimento prévio.",
              },
            ].map(({ tipo, cor, desc }) => (
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
            <P>
              Pode gerir as suas preferências de cookies a qualquer momento através das
              configurações do seu navegador ou do painel de consentimento disponível no
              nosso site.
            </P>
          </Section>

          {/* 7. Retenção */}
          <Section id="retencao" title="7. Retenção de Dados">
            <P>
              Conservamos os seus dados pessoais pelo tempo necessário para cumprir as
              finalidades descritas nesta política, salvo quando a lei exija ou permita
              um período maior. Os critérios utilizados para determinar o prazo de
              retenção incluem:
            </P>
            <UL items={[
              "Período em que você mantiver uma conta ativa nos nossos Serviços",
              "Obrigações legais e regulatórias de retenção (ex.: dados fiscais por 5 anos)",
              "Prazo prescricional aplicável para eventuais disputas ou reclamações",
              "Necessidade de manter registros para segurança e prevenção a fraudes",
            ]} />
            <P>
              Após o encerramento da relação contratual e findo o prazo de retenção
              aplicável, os dados são eliminados de forma segura ou anonimizados.
            </P>
          </Section>

          {/* 8. Segurança */}
          <Section id="seguranca" title="8. Segurança dos Dados">
            <P>
              Adotamos medidas técnicas e organizacionais apropriadas para proteger os
              seus dados contra acesso não autorizado, perda, destruição ou divulgação
              indevida, incluindo:
            </P>
            <UL items={[
              "Criptografia em trânsito (TLS/HTTPS) e em repouso para dados sensíveis",
              "Controles de acesso baseados em funções (RBAC) e autenticação multifator para sistemas internos",
              "Monitoramento contínuo de segurança e gestão de vulnerabilidades",
              "Programas regulares de treinamento e conscientização em privacidade para colaboradores",
              "Procedimentos de resposta a incidentes de segurança com notificação às autoridades e titulares quando exigido por lei",
            ]} />
            <P>
              Nenhum sistema de transmissão ou armazenamento de dados é 100% seguro.
              Em caso de incidente que coloque seus dados em risco, notificaremos as
              autoridades competentes e os titulares afetados nos prazos legais.
            </P>
          </Section>

          {/* 9. Direitos */}
          <Section id="direitos" title="9. Seus Direitos como Titular">
            <P>
              Nos termos da LGPD e demais legislações aplicáveis, você possui os
              seguintes direitos em relação aos seus dados pessoais:
            </P>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
              {[
                { direito: "Confirmação e acesso", desc: "Saber se tratamos seus dados e obter cópia deles." },
                { direito: "Correção", desc: "Solicitar a correção de dados incompletos, inexatos ou desatualizados." },
                { direito: "Anonimização / Bloqueio / Eliminação", desc: "Para dados desnecessários, excessivos ou tratados em desconformidade com a lei." },
                { direito: "Portabilidade", desc: "Receber seus dados em formato estruturado para transferência a outro fornecedor." },
                { direito: "Eliminação", desc: "Solicitar a exclusão dos dados tratados com base no seu consentimento." },
                { direito: "Revogação do consentimento", desc: "Retirar o consentimento para tratamentos baseados nessa base legal, a qualquer momento." },
                { direito: "Oposição", desc: "Opor-se a tratamentos baseados em legítimo interesse quando houver razões justificadas." },
                { direito: "Informação", desc: "Saber com quais entidades compartilhamos seus dados e as bases legais utilizadas." },
              ].map(({ direito, desc }) => (
                <div key={direito} className="flex flex-col gap-[8px] p-[20px] rounded-[12px] bg-[#f8faff] border border-[#e0e8ff]">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#0569ff]">{direito}</span>
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[22px] text-[#555]">{desc}</span>
                </div>
              ))}
            </div>
            <P>
              Para exercer qualquer um desses direitos, entre em contato pelo e-mail{" "}
              <a href="mailto:privacidade@acquafy.com" className="text-[#0569ff] underline underline-offset-2">
                privacidade@acquafy.com
              </a>
              . Responderemos no prazo de até 15 dias úteis, conforme exigido pela LGPD.
            </P>
          </Section>

          {/* 10. Transferências Internacionais */}
          <Section id="transferencias" title="10. Transferências Internacionais de Dados">
            <P>
              A Acquafy opera globalmente e pode transferir os seus dados pessoais para
              países fora do Brasil ou do Espaço Económico Europeu. Nestes casos,
              garantimos que a transferência seja realizada com salvaguardas adequadas:
            </P>
            <UL items={[
              "Cláusulas contratuais padrão aprovadas pela Comissão Europeia e pela ANPD",
              "Transferência para países que oferecem nível de proteção adequado reconhecido pela autoridade competente",
              "Certificações e códigos de conduta reconhecidos internacionalmente",
              "Consentimento explícito do titular quando aplicável",
            ]} />
          </Section>

          {/* 11. Menores */}
          <Section id="menores" title="11. Menores de Idade">
            <P>
              Os nossos Serviços não são direcionados a menores de 18 anos. Não
              coletamos intencionalmente dados pessoais de crianças ou adolescentes. Se
              tomarmos conhecimento de que recolhemos dados de um menor sem
              consentimento parental verificável, eliminaremos esses dados imediatamente.
            </P>
            <P>
              Se for responsável por uma criança e acreditar que nos forneceu dados
              pessoais, contacte-nos pelo e-mail{" "}
              <a href="mailto:privacidade@acquafy.com" className="text-[#0569ff] underline underline-offset-2">
                privacidade@acquafy.com
              </a>
              .
            </P>
          </Section>

          {/* 12. Alterações */}
          <Section id="alteracoes" title="12. Alterações a Esta Política">
            <P>
              Podemos atualizar esta Política de Privacidade periodicamente para
              refletir alterações nos nossos Serviços, nas leis aplicáveis ou nas nossas
              práticas de privacidade. Quando fizermos alterações materiais,
              notificaremos através de:
            </P>
            <UL items={[
              "Aviso de destaque no nosso website por um período razoável",
              "Notificação por e-mail para titulares com conta ativa, quando as alterações forem significativas",
              "Atualização da data de &quot;Última atualização&quot; no início desta política",
            ]} />
            <P>
              Recomendamos que reveja esta política regularmente. A utilização continuada
              dos Serviços após a entrada em vigor das alterações constitui aceitação
              das mesmas.
            </P>
          </Section>

          {/* 13. Contato */}
          <Section id="contato" title="13. Contacto e Encarregado de Dados (DPO)">
            <P>
              Para quaisquer questões, pedidos ou reclamações relacionadas com esta
              Política de Privacidade ou com o tratamento dos seus dados pessoais,
              entre em contacto com o nosso Encarregado de Proteção de Dados:
            </P>
            <div className="flex flex-col gap-[0px] p-[28px] rounded-[16px] border border-[#e0e8ff]"
              style={{ background: "linear-gradient(135deg, #f8faff, #f0f4ff)" }}
            >
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-[#1f2e91] mb-[16px]">
                Encarregado de Proteção de Dados (DPO)
              </p>
              {[
                ["E-mail", "privacidade@acquafy.com"],
                ["Empresa", "Acquafy Corporation"],
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
            <P>
              Tem também o direito de apresentar reclamação à Autoridade Nacional de
              Proteção de Dados (ANPD) no Brasil ou à autoridade de supervisão competente
              no seu país de residência.
            </P>
          </Section>

        </article>
      </div>
    </div>
  );
}
