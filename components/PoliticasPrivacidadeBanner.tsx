"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  badge: string;
  headingMain: string;
  headingHighlight: string;
  sub: string;
  lastUpdate: string;
}> = {
  pt: {
    badge: "Privacidade & Transparência",
    headingMain: "Políticas de",
    headingHighlight: "Privacidade",
    sub: "Prezamos pela transparência no tratamento dos seus dados pessoais. Conheça como coletamos, utilizamos e protegemos as suas informações em conformidade com a LGPD e legislações internacionais de privacidade.",
    lastUpdate: "Última atualização: 16 de junho de 2026",
  },
  "pt-pt": {
    badge: "Privacidade & Transparência",
    headingMain: "Políticas de",
    headingHighlight: "Privacidade",
    sub: "Prezamos pela transparência no tratamento dos seus dados pessoais. Conheça como recolhemos, utilizamos e protegemos as suas informações em conformidade com o RGPD e demais legislações internacionais de privacidade.",
    lastUpdate: "Última actualização: 16 de junho de 2026",
  },
  en: {
    badge: "Privacy & Transparency",
    headingMain: "Privacy",
    headingHighlight: "Policy",
    sub: "We value transparency in the handling of your personal data. Learn how we collect, use and protect your information in compliance with the LGPD and international privacy laws.",
    lastUpdate: "Last updated: June 16, 2026",
  },
  es: {
    badge: "Privacidad y Transparencia",
    headingMain: "Políticas de",
    headingHighlight: "Privacidad",
    sub: "Valoramos la transparencia en el tratamiento de sus datos personales. Conozca cómo recopilamos, usamos y protegemos su información en cumplimiento con la LGPD y las legislaciones internacionales de privacidad.",
    lastUpdate: "Última actualización: 16 de junio de 2026",
  },
  fr: {
    badge: "Confidentialité & Transparence",
    headingMain: "Politique de",
    headingHighlight: "Confidentialité",
    sub: "Nous valorisons la transparence dans le traitement de vos données personnelles. Découvrez comment nous collectons, utilisons et protégeons vos informations conformément au RGPD et aux législations internationales sur la vie privée.",
    lastUpdate: "Dernière mise à jour : 16 juin 2026",
  },
  de: {
    badge: "Datenschutz & Transparenz",
    headingMain: "Datenschutz-",
    headingHighlight: "richtlinie",
    sub: "Wir legen großen Wert auf Transparenz beim Umgang mit Ihren persönlichen Daten. Erfahren Sie, wie wir Ihre Informationen gemäß der DSGVO und internationalen Datenschutzgesetzen erfassen, verwenden und schützen.",
    lastUpdate: "Zuletzt aktualisiert: 16. Juni 2026",
  },
  it: {
    badge: "Privacy & Trasparenza",
    headingMain: "Informativa sulla",
    headingHighlight: "Privacy",
    sub: "Valorizziamo la trasparenza nel trattamento dei tuoi dati personali. Scopri come raccogliamo, utilizziamo e proteggiamo le tue informazioni in conformità con il GDPR e le normative internazionali sulla privacy.",
    lastUpdate: "Ultimo aggiornamento: 16 giugno 2026",
  },
  zh: {
    badge: "隐私与透明度",
    headingMain: "隐私",
    headingHighlight: "政策",
    sub: "我们重视对您个人数据处理的透明度。了解我们如何按照 LGPD 及国际隐私法规收集、使用和保护您的信息。",
    lastUpdate: "最后更新：2026年6月16日",
  },
  ja: {
    badge: "プライバシーと透明性",
    headingMain: "プライバシー",
    headingHighlight: "ポリシー",
    sub: "私たちはお客様の個人データの取り扱いにおける透明性を重視しています。LGPDおよび国際的なプライバシー法に準拠して、情報をどのように収集・使用・保護するかをご確認ください。",
    lastUpdate: "最終更新：2026年6月16日",
  },
  ko: {
    badge: "개인정보 보호 및 투명성",
    headingMain: "개인정보",
    headingHighlight: "처리방침",
    sub: "당사는 귀하의 개인 데이터 처리에 있어 투명성을 중요시합니다. LGPD 및 국제 개인정보 보호법에 따라 정보를 수집, 사용 및 보호하는 방법을 확인하세요.",
    lastUpdate: "최종 업데이트: 2026년 6월 16일",
  },
};

export default function PoliticasPrivacidadeBanner() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section
      className="flex flex-col items-center justify-center overflow-hidden px-[20px] pt-[80px] pb-[60px] w-full"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f1fb 100%)" }}
    >
      <div className="flex flex-col gap-[20px] items-center max-w-[800px] w-full text-center">
        {/* Badge */}
        <div className="flex items-center justify-center">
          <span
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#0569ff] px-[16px] py-[8px] rounded-full border border-[#0569ff]/30"
            style={{ background: "rgba(5,105,255,0.08)" }}
          >
            {t.badge}
          </span>
        </div>

        <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[48px] leading-[56px] text-[#2a2a2b] mob:text-[32px] mob:leading-[40px]">
          {t.headingMain}{" "}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h1>

        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[28px] text-[#555] max-w-[620px]">
          {t.sub}
        </p>

        {/* Última atualização */}
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#888]">
          {t.lastUpdate}
        </p>
      </div>
    </section>
  );
}
