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
