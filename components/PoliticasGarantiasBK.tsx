"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

type Politica = {
  titulo: string;
  desc: string;
  itens: string[];
};

const T: Record<Lang, {
  heading: string;
  headingHighlight: string;
  subheading: string;
  docPending: string;
  politicas: Politica[];
}> = {
  pt: {
    heading: "Políticas e",
    headingHighlight: "garantias",
    subheading: "Transparência e clareza sobre seus direitos e as condições Acquafy.",
    docPending: "Documento em elaboração",
    politicas: [
      {
        titulo: "Política de Garantia",
        desc: "Seus produtos Acquafy possuem garantia de fábrica e cobertura completa.",
        itens: [
          "12 meses de garantia de fábrica",
          "Cobertura para defeitos de fabricação",
          "Suporte técnico especializado",
        ],
      },
      {
        titulo: "Política de Privacidade",
        desc: "Saiba como coletamos, usamos e protegemos seus dados pessoais.",
        itens: [
          "Dados coletados e finalidade",
          "Compartilhamento e segurança",
          "Seus direitos como titular de dados",
        ],
      },
      {
        titulo: "Termos de Uso",
        desc: "Regras e condições para uso da plataforma e dos produtos Acquafy.",
        itens: [
          "Condições de uso da plataforma",
          "Responsabilidades do usuário",
          "Propriedade intelectual",
        ],
      },
      {
        titulo: "Política de Devolução",
        desc: "Como solicitar troca, devolução ou reembolso de produtos.",
        itens: [
          "Prazo de 7 dias para devolução",
          "Condições para reembolso integral",
          "Como abrir um chamado de devolução",
        ],
      },
      {
        titulo: "Certificações e Normas",
        desc: "Conformidade regulatória e certificações técnicas dos produtos.",
        itens: [
          "Certificação ANATEL",
          "INMETRO e normas técnicas brasileiras",
          "Padrões internacionais de qualidade",
        ],
      },
    ],
  },
  en: {
    heading: "Policies &",
    headingHighlight: "guarantees",
    subheading: "Transparency and clarity about your rights and Acquafy conditions.",
    docPending: "Document under development",
    politicas: [
      {
        titulo: "Warranty Policy",
        desc: "Your Acquafy products come with a manufacturer warranty and full coverage.",
        itens: [
          "12-month manufacturer warranty",
          "Coverage for manufacturing defects",
          "Specialized technical support",
        ],
      },
      {
        titulo: "Privacy Policy",
        desc: "Learn how we collect, use and protect your personal data.",
        itens: [
          "Data collected and purpose",
          "Sharing and security",
          "Your rights as a data subject",
        ],
      },
      {
        titulo: "Terms of Use",
        desc: "Rules and conditions for using the Acquafy platform and products.",
        itens: [
          "Platform usage conditions",
          "User responsibilities",
          "Intellectual property",
        ],
      },
      {
        titulo: "Return Policy",
        desc: "How to request an exchange, return or refund for products.",
        itens: [
          "7-day return window",
          "Conditions for full refund",
          "How to open a return request",
        ],
      },
      {
        titulo: "Certifications & Standards",
        desc: "Regulatory compliance and technical certifications of the products.",
        itens: [
          "ANATEL Certification",
          "INMETRO and Brazilian technical standards",
          "International quality standards",
        ],
      },
    ],
  },
  es: {
    heading: "Políticas y",
    headingHighlight: "garantías",
    subheading: "Transparencia y claridad sobre sus derechos y las condiciones Acquafy.",
    docPending: "Documento en elaboración",
    politicas: [
      {
        titulo: "Política de Garantía",
        desc: "Sus productos Acquafy cuentan con garantía de fábrica y cobertura completa.",
        itens: [
          "12 meses de garantía de fábrica",
          "Cobertura para defectos de fabricación",
          "Soporte técnico especializado",
        ],
      },
      {
        titulo: "Política de Privacidad",
        desc: "Sepa cómo recopilamos, usamos y protegemos sus datos personales.",
        itens: [
          "Datos recopilados y finalidad",
          "Compartición y seguridad",
          "Sus derechos como titular de datos",
        ],
      },
      {
        titulo: "Términos de Uso",
        desc: "Reglas y condiciones para el uso de la plataforma y los productos Acquafy.",
        itens: [
          "Condiciones de uso de la plataforma",
          "Responsabilidades del usuario",
          "Propiedad intelectual",
        ],
      },
      {
        titulo: "Política de Devolución",
        desc: "Cómo solicitar cambio, devolución o reembolso de productos.",
        itens: [
          "Plazo de 7 días para devolución",
          "Condiciones para reembolso integral",
          "Cómo abrir una solicitud de devolución",
        ],
      },
      {
        titulo: "Certificaciones y Normas",
        desc: "Conformidad regulatoria y certificaciones técnicas de los productos.",
        itens: [
          "Certificación ANATEL",
          "INMETRO y normas técnicas brasileñas",
          "Estándares internacionales de calidad",
        ],
      },
    ],
  },
};

export default function PoliticasGarantiasBK() {
  const { lang, setLang } = useLang();
  const t = T[lang];

  if (lang !== "pt") {
    const isEn = lang === "en";
    return (
      <section className="flex flex-col items-center justify-center px-[20px] py-[60px] w-full bg-white">
        <div className="flex flex-col gap-[16px] items-center text-center max-w-[480px] p-[40px] bg-[#f6f9fe] rounded-[20px] border border-[#e0e8ff] shadow-sm">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91]">
            {isEn ? "Content available in Portuguese only" : "Contenido disponible solo en Portugués"}
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[22px] text-[#666]">
            {isEn
              ? "These policies and guarantees are specific to Brazilian consumer law."
              : "Estas políticas y garantías son específicas de la legislación de consumidor de Brasil."}
          </p>
          <button
            onClick={() => setLang("pt")}
            className="mt-[8px] bg-[#0233c3] hover:bg-[#002ba8] transition-colors font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-white px-[28px] py-[12px] rounded-[8px] cursor-pointer"
          >
            {isEn ? "Switch to Português" : "Cambiar a Portugués"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="politicas-garantias"
      className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]"
    >
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading}{" "}
            <span className="text-[#0569ff]">{t.headingHighlight}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[24px] w-full">
          {t.politicas.map((pol) => (
            <div
              key={pol.titulo}
              className="bg-[#f6f9fe] border border-[#e8edf5] rounded-[16px] p-[24px] flex flex-col gap-[16px]"
            >
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[17px] leading-[22px] text-[#1f2e91]">
                {pol.titulo}
              </h3>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[20px] text-[#555]">
                {pol.desc}
              </p>
              <ul className="flex flex-col gap-[8px] list-none m-0 p-0 flex-1">
                {pol.itens.map((item) => (
                  <li key={item} className="flex gap-[10px] items-start">
                    <span className="mt-[6px] shrink-0 size-[6px] rounded-full bg-[#0569ff]" />
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#444]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-[8px] pt-[8px] border-t border-[#e8edf5]">
                <span className="shrink-0 size-[6px] rounded-full bg-[#ef4444]" />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#bbb]">
                  {t.docPending}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
