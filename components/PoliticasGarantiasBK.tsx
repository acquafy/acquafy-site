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
  fr: {
    heading: "Politiques et",
    headingHighlight: "garanties",
    subheading: "Transparence et clarté sur vos droits et les conditions Acquafy.",
    docPending: "Document en cours d'élaboration",
    politicas: [
      {
        titulo: "Politique de Garantie",
        desc: "Vos produits Acquafy bénéficient d'une garantie fabricant et d'une couverture complète.",
        itens: [
          "12 mois de garantie fabricant",
          "Couverture des défauts de fabrication",
          "Support technique spécialisé",
        ],
      },
      {
        titulo: "Politique de Confidentialité",
        desc: "Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.",
        itens: [
          "Données collectées et finalité",
          "Partage et sécurité",
          "Vos droits en tant que personne concernée",
        ],
      },
      {
        titulo: "Conditions d'Utilisation",
        desc: "Règles et conditions d'utilisation de la plateforme et des produits Acquafy.",
        itens: [
          "Conditions d'utilisation de la plateforme",
          "Responsabilités de l'utilisateur",
          "Propriété intellectuelle",
        ],
      },
      {
        titulo: "Politique de Retour",
        desc: "Comment demander un échange, un retour ou un remboursement de produits.",
        itens: [
          "Délai de retour de 7 jours",
          "Conditions de remboursement intégral",
          "Comment ouvrir une demande de retour",
        ],
      },
      {
        titulo: "Certifications et Normes",
        desc: "Conformité réglementaire et certifications techniques des produits.",
        itens: [
          "Certification ANATEL",
          "INMETRO et normes techniques brésiliennes",
          "Normes internationales de qualité",
        ],
      },
    ],
  },
  de: {
    heading: "Richtlinien und",
    headingHighlight: "Garantien",
    subheading: "Transparenz und Klarheit über Ihre Rechte und die Acquafy-Bedingungen.",
    docPending: "Dokument in Bearbeitung",
    politicas: [
      {
        titulo: "Garantierichtlinie",
        desc: "Ihre Acquafy-Produkte sind mit einer Herstellergarantie und vollständiger Abdeckung versehen.",
        itens: [
          "12 Monate Herstellergarantie",
          "Abdeckung für Herstellungsfehler",
          "Spezialisierter technischer Support",
        ],
      },
      {
        titulo: "Datenschutzrichtlinie",
        desc: "Erfahren Sie, wie wir Ihre persönlichen Daten erfassen, verwenden und schützen.",
        itens: [
          "Erhobene Daten und Zweck",
          "Weitergabe und Sicherheit",
          "Ihre Rechte als betroffene Person",
        ],
      },
      {
        titulo: "Nutzungsbedingungen",
        desc: "Regeln und Bedingungen für die Nutzung der Acquafy-Plattform und -Produkte.",
        itens: [
          "Nutzungsbedingungen der Plattform",
          "Benutzerverantwortlichkeiten",
          "Geistiges Eigentum",
        ],
      },
      {
        titulo: "Rückgaberichtlinie",
        desc: "So beantragen Sie einen Austausch, eine Rücksendung oder Rückerstattung.",
        itens: [
          "7-Tage-Rückgabefenster",
          "Bedingungen für vollständige Rückerstattung",
          "Wie Sie eine Rücksendeanfrage stellen",
        ],
      },
      {
        titulo: "Zertifizierungen und Normen",
        desc: "Regulatorische Konformität und technische Zertifizierungen der Produkte.",
        itens: [
          "ANATEL-Zertifizierung",
          "INMETRO und brasilianische technische Normen",
          "Internationale Qualitätsstandards",
        ],
      },
    ],
  },
  it: {
    heading: "Politiche e",
    headingHighlight: "garanzie",
    subheading: "Trasparenza e chiarezza sui tuoi diritti e le condizioni Acquafy.",
    docPending: "Documento in elaborazione",
    politicas: [
      {
        titulo: "Politica di Garanzia",
        desc: "I tuoi prodotti Acquafy sono dotati di garanzia del produttore e copertura completa.",
        itens: [
          "12 mesi di garanzia del produttore",
          "Copertura per difetti di fabbricazione",
          "Supporto tecnico specializzato",
        ],
      },
      {
        titulo: "Informativa sulla Privacy",
        desc: "Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.",
        itens: [
          "Dati raccolti e finalità",
          "Condivisione e sicurezza",
          "I tuoi diritti come interessato",
        ],
      },
      {
        titulo: "Termini di Utilizzo",
        desc: "Regole e condizioni per l'utilizzo della piattaforma e dei prodotti Acquafy.",
        itens: [
          "Condizioni di utilizzo della piattaforma",
          "Responsabilità dell'utente",
          "Proprietà intellettuale",
        ],
      },
      {
        titulo: "Politica di Reso",
        desc: "Come richiedere uno scambio, un reso o un rimborso per i prodotti.",
        itens: [
          "Finestra di reso di 7 giorni",
          "Condizioni per il rimborso completo",
          "Come aprire una richiesta di reso",
        ],
      },
      {
        titulo: "Certificazioni e Normative",
        desc: "Conformità normativa e certificazioni tecniche dei prodotti.",
        itens: [
          "Certificazione ANATEL",
          "INMETRO e normative tecniche brasiliane",
          "Standard internazionali di qualità",
        ],
      },
    ],
  },
  zh: {
    heading: "政策与",
    headingHighlight: "保修",
    subheading: "关于您的权利和 Acquafy 条款的透明度与清晰度。",
    docPending: "文件准备中",
    politicas: [
      {
        titulo: "保修政策",
        desc: "您的 Acquafy 产品附带制造商保修和完整保障。",
        itens: [
          "12 个月制造商保修",
          "制造缺陷保障",
          "专业技术支持",
        ],
      },
      {
        titulo: "隐私政策",
        desc: "了解我们如何收集、使用和保护您的个人数据。",
        itens: [
          "收集的数据及用途",
          "共享与安全",
          "您作为数据主体的权利",
        ],
      },
      {
        titulo: "使用条款",
        desc: "使用 Acquafy 平台和产品的规则和条件。",
        itens: [
          "平台使用条件",
          "用户责任",
          "知识产权",
        ],
      },
      {
        titulo: "退货政策",
        desc: "如何申请产品的换货、退货或退款。",
        itens: [
          "7 天退货窗口",
          "全额退款条件",
          "如何提交退货申请",
        ],
      },
      {
        titulo: "认证与标准",
        desc: "产品的法规合规性和技术认证。",
        itens: [
          "ANATEL 认证",
          "INMETRO 及巴西技术标准",
          "国际质量标准",
        ],
      },
    ],
  },
  ja: {
    heading: "ポリシーと",
    headingHighlight: "保証",
    subheading: "お客様の権利と Acquafy の条件に関する透明性と明確性。",
    docPending: "文書作成中",
    politicas: [
      {
        titulo: "保証ポリシー",
        desc: "Acquafy 製品にはメーカー保証と完全な補償が付いています。",
        itens: [
          "12 カ月のメーカー保証",
          "製造上の欠陥の補償",
          "専門技術サポート",
        ],
      },
      {
        titulo: "プライバシーポリシー",
        desc: "お客様の個人データの収集、使用、保護方法をご確認ください。",
        itens: [
          "収集するデータとその目的",
          "共有とセキュリティ",
          "データ主体としての権利",
        ],
      },
      {
        titulo: "利用規約",
        desc: "Acquafy プラットフォームおよび製品の使用に関するルールと条件。",
        itens: [
          "プラットフォームの使用条件",
          "ユーザーの責任",
          "知的財産",
        ],
      },
      {
        titulo: "返品ポリシー",
        desc: "製品の交換、返品、または返金を申請する方法。",
        itens: [
          "7 日間の返品ウィンドウ",
          "全額返金の条件",
          "返品リクエストの開き方",
        ],
      },
      {
        titulo: "認証と規格",
        desc: "製品の規制適合性と技術認証。",
        itens: [
          "ANATEL 認証",
          "INMETRO およびブラジルの技術規格",
          "国際品質基準",
        ],
      },
    ],
  },
  ko: {
    heading: "정책 및",
    headingHighlight: "보증",
    subheading: "귀하의 권리와 Acquafy 조건에 대한 투명성과 명확성.",
    docPending: "문서 준비 중",
    politicas: [
      {
        titulo: "보증 정책",
        desc: "Acquafy 제품에는 제조사 보증과 완전한 보장이 포함됩니다.",
        itens: [
          "12개월 제조사 보증",
          "제조 결함 보장",
          "전문 기술 지원",
        ],
      },
      {
        titulo: "개인정보 보호정책",
        desc: "개인 데이터를 수집, 사용 및 보호하는 방법을 알아보세요.",
        itens: [
          "수집 데이터 및 목적",
          "공유 및 보안",
          "데이터 주체로서의 권리",
        ],
      },
      {
        titulo: "이용 약관",
        desc: "Acquafy 플랫폼 및 제품 사용에 관한 규칙과 조건.",
        itens: [
          "플랫폼 사용 조건",
          "사용자 책임",
          "지적 재산권",
        ],
      },
      {
        titulo: "반품 정책",
        desc: "제품 교환, 반품 또는 환불을 요청하는 방법.",
        itens: [
          "7일 반품 기간",
          "전액 환불 조건",
          "반품 요청 방법",
        ],
      },
      {
        titulo: "인증 및 표준",
        desc: "제품의 규제 준수 및 기술 인증.",
        itens: [
          "ANATEL 인증",
          "INMETRO 및 브라질 기술 표준",
          "국제 품질 기준",
        ],
      },
    ],
  },

  "pt-pt": {
    heading: "Políticas e",
    headingHighlight: "garantias",
    subheading: "Transparência e clareza sobre os seus direitos e as condições Acquafy.",
    docPending: "Documento em elaboração",
    politicas: [
      {
        titulo: "Política de Garantia",
        desc: "Os seus produtos Acquafy possuem garantia de fábrica e cobertura completa.",
        itens: [
          "12 meses de garantia de fábrica",
          "Cobertura para defeitos de fabrico",
          "Suporte técnico especializado",
        ],
      },
      {
        titulo: "Política de Privacidade",
        desc: "Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais.",
        itens: [
          "Dados recolhidos e finalidade",
          "Partilha e segurança",
          "Os seus direitos como titular de dados",
        ],
      },
      {
        titulo: "Termos de Utilização",
        desc: "Regras e condições para utilização da plataforma e dos produtos Acquafy.",
        itens: [
          "Condições de utilização da plataforma",
          "Responsabilidades do utilizador",
          "Propriedade intelectual",
        ],
      },
      {
        titulo: "Política de Devolução",
        desc: "Como solicitar troca, devolução ou reembolso de produtos.",
        itens: [
          "Prazo de 7 dias para devolução",
          "Condições para reembolso integral",
          "Como abrir um pedido de devolução",
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
};

export default function PoliticasGarantiasBK() {
  const { lang } = useLang();
  const t = T[lang];

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
