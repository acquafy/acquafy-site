"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg           = "/figma-assets/bg-a.webp";
const imgShield       = "/figma-assets/icon-shield-b.svg";
const imgFastSupport  = "/figma-assets/icon-fast-support.svg";
const imgRating       = "/figma-assets/icon-rating.svg";
const imgPlanet       = "/figma-assets/icon-planet-a.svg";

const T: Record<Lang, {
  diferenciais: { title: string; desc: string }[];
}> = {
  pt: {
    diferenciais: [
      { title: "Atendimento especializado", desc: "Equipe treinada e certificada para oferecer o melhor suporte." },
      { title: "Respostas rápidas",          desc: "Agilidade no atendimento e soluções eficientes." },
      { title: "Satisfação garantida",       desc: "Compromisso com a sua satisfação e sucesso." },
      { title: "Suporte global",             desc: "Atendimento para clientes e parceiros em 16 idiomas." },
    ],
  },
  "pt-pt": {
    diferenciais: [
      { title: "Atendimento especializado", desc: "Equipa treinada e certificada para oferecer o melhor suporte." },
      { title: "Respostas rápidas",          desc: "Agilidade no atendimento e soluções eficientes." },
      { title: "Satisfação garantida",       desc: "Compromisso com a sua satisfação e sucesso." },
      { title: "Suporte global",             desc: "Atendimento para clientes e parceiros em 16 idiomas." },
    ],
  },
  en: {
    diferenciais: [
      { title: "Specialized support",    desc: "Trained and certified team to provide the best support." },
      { title: "Fast responses",         desc: "Agile service and efficient solutions." },
      { title: "Guaranteed satisfaction", desc: "Commitment to your satisfaction and success." },
      { title: "Global support",         desc: "Service for clients and partners in 16 languages." },
    ],
  },
  "en-gb": {
    diferenciais: [
      { title: "Specialised support",    desc: "Trained and certified team to provide the best support." },
      { title: "Fast responses",         desc: "Agile service and efficient solutions." },
      { title: "Guaranteed satisfaction", desc: "Commitment to your satisfaction and success." },
      { title: "Global support",         desc: "Service for clients and partners in 16 languages." },
    ],
  },
  es: {
    diferenciais: [
      { title: "Atención especializada", desc: "Equipo capacitado y certificado para ofrecer el mejor soporte." },
      { title: "Respuestas rápidas",     desc: "Agilidad en la atención y soluciones eficientes." },
      { title: "Satisfacción garantizada", desc: "Compromiso con tu satisfacción y éxito." },
      { title: "Soporte global",         desc: "Atención para clientes y socios en 16 idiomas." },
    ],
  },
  fr: {
    diferenciais: [
      { title: "Support spécialisé",       desc: "Équipe formée et certifiée pour offrir le meilleur support." },
      { title: "Réponses rapides",         desc: "Service agile et solutions efficaces." },
      { title: "Satisfaction garantie",    desc: "Engagement envers votre satisfaction et votre succès." },
      { title: "Support mondial",          desc: "Service pour les clients et partenaires en 16 langues." },
    ],
  },
  de: {
    diferenciais: [
      { title: "Spezialisierter Support",  desc: "Geschultes und zertifiziertes Team für den besten Support." },
      { title: "Schnelle Antworten",       desc: "Agiler Service und effiziente Lösungen." },
      { title: "Zufriedenheitsgarantie",   desc: "Engagement für Ihre Zufriedenheit und Ihren Erfolg." },
      { title: "Globaler Support",         desc: "Service für Kunden und Partner in 16 Sprachen." },
    ],
  },
  it: {
    diferenciais: [
      { title: "Supporto specializzato",   desc: "Team formato e certificato per offrire il miglior supporto." },
      { title: "Risposte rapide",          desc: "Servizio agile e soluzioni efficienti." },
      { title: "Soddisfazione garantita",  desc: "Impegno per la tua soddisfazione e il tuo successo." },
      { title: "Supporto globale",         desc: "Assistenza per clienti e partner in 16 lingue." },
    ],
  },
  zh: {
    diferenciais: [
      { title: "专业支持",   desc: "经过培训和认证的团队，提供最佳支持。" },
      { title: "快速响应",   desc: "敏捷的服务和高效的解决方案。" },
      { title: "满意度保障", desc: "致力于您的满意度和成功。" },
      { title: "全球支持",   desc: "以 16 种语言为客户和合作伙伴提供服务。" },
    ],
  },
  ja: {
    diferenciais: [
      { title: "専門サポート",       desc: "最高のサポートを提供するための訓練・認定チーム。" },
      { title: "迅速な対応",         desc: "迅速なサービスと効率的なソリューション。" },
      { title: "満足度保証",         desc: "あなたの満足と成功へのコミットメント。" },
      { title: "グローバルサポート", desc: "16 言語でお客様とパートナーにサービスを提供。" },
    ],
  },
  ko: {
    diferenciais: [
      { title: "전문 지원",     desc: "최고의 지원을 제공하기 위해 훈련되고 인증된 팀." },
      { title: "빠른 응답",     desc: "신속한 서비스와 효율적인 솔루션." },
      { title: "만족도 보장",   desc: "고객의 만족과 성공에 대한 헌신." },
      { title: "글로벌 지원",   desc: "16개 언어로 고객과 파트너에게 서비스 제공." },
    ],
  },
  sv: {
    diferenciais: [
      { title: "Specialiserad support",    desc: "Utbildat och certifierat team för att ge det bästa stödet." },
      { title: "Snabba svar",              desc: "Snabb service och effektiva lösningar." },
      { title: "Garanterad nöjdhet",       desc: "Engagemang för din tillfredställelse och framgång." },
      { title: "Globalt stöd",             desc: "Service för kunder och partners på 16 språk." },
    ],
  },
  fi: {
    diferenciais: [
      { title: "Erikoistunut tuki",        desc: "Koulutettu ja sertifioitu tiimi parhaaseen tukeen." },
      { title: "Nopeat vastaukset",        desc: "Ketterä palvelu ja tehokkaat ratkaisut." },
      { title: "Taattu tyytyväisyys",      desc: "Sitoutuminen tyytyväisyyteesi ja menestykseesi." },
      { title: "Globaali tuki",            desc: "Palvelu asiakkaille ja kumppaneille 16 kielellä." },
    ],
  },
  ru: {
    diferenciais: [
      { title: "Специализированная поддержка", desc: "Обученная и сертифицированная команда для лучшей поддержки." },
      { title: "Быстрые ответы",               desc: "Оперативное обслуживание и эффективные решения." },
      { title: "Гарантированное удовлетворение", desc: "Приверженность вашему удовлетворению и успеху." },
      { title: "Глобальная поддержка",          desc: "Обслуживание клиентов и партнёров на 16 языках." },
    ],
  },
  ro: {
    diferenciais: [
      { title: "Suport specializat",       desc: "Echipa instruita si certificata pentru cel mai bun suport." },
      { title: "Raspunsuri rapide",        desc: "Servicii agile si solutii eficiente." },
      { title: "Satisfactie garantata",    desc: "Angajament fata de satisfactia si succesul tau." },
      { title: "Suport global",            desc: "Servicii pentru clienti si parteneri in 16 limbi." },
    ],
  },
  he: {
    diferenciais: [
      { title: "תמיכה מתמחה",             desc: "צוות מאומן ומוסמך לספק את התמיכה הטובה ביותר." },
      { title: "תגובות מהירות",           desc: "שירות זריז ופתרונות יעילים." },
      { title: "שביעות רצון מובטחת",      desc: "מחויבות לשביעות רצונך ולהצלחתך." },
      { title: "תמיכה גלובלית",           desc: "שירות ללקוחות ושותפים ב-16 שפות." },
    ],
  },
};

const icons = [imgShield, imgFastSupport, imgRating, imgPlanet];
const aspectWs = [26.14, 30, 480.3, 30];
const aspectHs = [30, 30, 453, 30];

export default function DiferenciaisSuporte() {
  const { lang } = useLang();
  const t = T[lang];

  const diferenciais = t.diferenciais.map((item, i) => ({
    icon: icons[i],
    aspectW: aspectWs[i],
    aspectH: aspectHs[i],
    title: item.title,
    desc: item.desc,
  }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="relative flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] rounded-[16px] w-full">
        {/* Background */}
        <div className="absolute inset-0 rounded-[16px] pointer-events-none" aria-hidden>
          <div className="absolute bg-[#1f2e91] inset-0 rounded-[16px]" />
          <img
            src={imgBg}
            alt=""
            className="absolute inset-0 w-full h-full max-w-none object-cover opacity-40 rounded-[16px]"
          />
        </div>

        {/* Diferencial cards */}
        {diferenciais.map((item) => (
          <div
            key={item.title}
            className="relative flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[280px]"
          >
            <div className="flex flex-col items-center justify-center shrink-0 size-[50px]">
              <FigmaIcon src={item.icon} size={40} aspectW={item.aspectW} aspectH={item.aspectH} />
            </div>
            <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px text-white">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] w-full">
                {item.title}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] w-full">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
