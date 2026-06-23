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
    badge: "Informações Legais",
    headingMain: "Termos de",
    headingHighlight: "Uso",
    sub: "Leia com atenção os termos e condições que regem o uso do nosso site e dos nossos produtos e serviços.",
    lastUpdate: "Última atualização: 16 de junho de 2026",
  },
  "pt-pt": {
    badge: "Informações Legais",
    headingMain: "Termos de",
    headingHighlight: "Utilização",
    sub: "Leia com atenção os termos e condições que regem a utilização do nosso site e dos nossos produtos e serviços.",
    lastUpdate: "Última actualização: 16 de junho de 2026",
  },
  en: {
    badge: "Legal Information",
    headingMain: "Terms of",
    headingHighlight: "Use",
    sub: "Please read carefully the terms and conditions governing the use of our website and our products and services.",
    lastUpdate: "Last updated: June 16, 2026",
  },
  "en-gb": {
    badge: "Legal Information",
    headingMain: "Terms of",
    headingHighlight: "Use",
    sub: "Please read carefully the terms and conditions governing the use of our website and our products and services.",
    lastUpdate: "Last updated: 16 June 2026",
  },
  es: {
    badge: "Información Legal",
    headingMain: "Términos de",
    headingHighlight: "Uso",
    sub: "Lea detenidamente los términos y condiciones que rigen el uso de nuestro sitio web y de nuestros productos y servicios.",
    lastUpdate: "Última actualización: 16 de junio de 2026",
  },
  fr: {
    badge: "Informations Légales",
    headingMain: "Conditions",
    headingHighlight: "d'Utilisation",
    sub: "Veuillez lire attentivement les termes et conditions régissant l'utilisation de notre site web, de nos produits et services.",
    lastUpdate: "Dernière mise à jour : 16 juin 2026",
  },
  de: {
    badge: "Rechtliche Informationen",
    headingMain: "Nutzungs-",
    headingHighlight: "bedingungen",
    sub: "Bitte lesen Sie sorgfältig die Allgemeinen Geschäftsbedingungen, die die Nutzung unserer Website sowie unserer Produkte und Dienstleistungen regeln.",
    lastUpdate: "Zuletzt aktualisiert: 16. Juni 2026",
  },
  it: {
    badge: "Informazioni Legali",
    headingMain: "Termini di",
    headingHighlight: "Utilizzo",
    sub: "Leggete attentamente i termini e le condizioni che regolano l'utilizzo del nostro sito web e dei nostri prodotti e servizi.",
    lastUpdate: "Ultimo aggiornamento: 16 giugno 2026",
  },
  zh: {
    badge: "法律信息",
    headingMain: "使用",
    headingHighlight: "条款",
    sub: "请仔细阅读管理我们网站及产品和服务使用的条款和条件。",
    lastUpdate: "最后更新：2026年6月16日",
  },
  ja: {
    badge: "法的情報",
    headingMain: "利用",
    headingHighlight: "規約",
    sub: "当社のウェブサイト、製品およびサービスの利用を規定する利用規約をよくお読みください。",
    lastUpdate: "最終更新：2026年6月16日",
  },
  ko: {
    badge: "법적 정보",
    headingMain: "이용",
    headingHighlight: "약관",
    sub: "당사 웹사이트 및 제품과 서비스의 이용을 규정하는 이용 약관을 주의 깊게 읽어 주세요.",
    lastUpdate: "최종 업데이트: 2026년 6월 16일",
  },
  sv: {
    badge: "Juridisk Information",
    headingMain: "Användnings-",
    headingHighlight: "villkor",
    sub: "Läs noggrant de villkor som styr användningen av vår webbplats samt våra produkter och tjänster.",
    lastUpdate: "Senast uppdaterad: 16 juni 2026",
  },
  fi: {
    badge: "Oikeudellinen Tieto",
    headingMain: "Käyttö-",
    headingHighlight: "ehdot",
    sub: "Lue huolellisesti ehdot, jotka säätelevät verkkosivustomme sekä tuotteidemme ja palveluidemme käyttöä.",
    lastUpdate: "Viimeksi päivitetty: 16. kesäkuuta 2026",
  },
  ru: {
    badge: "Правовая Информация",
    headingMain: "Условия",
    headingHighlight: "Использования",
    sub: "Пожалуйста, внимательно прочитайте условия и положения, регулирующие использование нашего сайта, продуктов и услуг.",
    lastUpdate: "Последнее обновление: 16 июня 2026 г.",
  },
  ro: {
    badge: "Informații Legale",
    headingMain: "Termeni de",
    headingHighlight: "Utilizare",
    sub: "Vă rugăm să citiți cu atenție termenii și condițiile care reglementează utilizarea site-ului nostru și a produselor și serviciilor noastre.",
    lastUpdate: "Ultima actualizare: 16 iunie 2026",
  },
  he: {
    badge: "מידע משפטי",
    headingMain: "תנאי",
    headingHighlight: "שימוש",
    sub: "אנא קראו בעיון את התנאים וההגבלות המסדירים את השימוש באתר שלנו ובמוצרים ובשירותים שלנו.",
    lastUpdate: "עדכון אחרון: 16 ביוני 2026",
  },
};

export default function TermosDeUsoBanner() {
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
