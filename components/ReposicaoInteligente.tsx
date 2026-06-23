"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgPhone        = "/figma-assets/photo-phone.webp";
const imgNotification = "/figma-assets/icon-notification.svg";
const imgPlanos       = "/figma-assets/icon-planos.svg";
const imgMoney        = "/figma-assets/icon-money-c.svg";
const imgCalendar     = "/figma-assets/icon-calendar-a.svg";
const imgFone         = "/figma-assets/icon-fone-a.svg";
const imgCertificado  = "/figma-assets/icon-certificado-a.svg";

const featureIcons = [
  { icon: imgNotification, aspectW: 23,  aspectH: 30  },
  { icon: imgPlanos,       aspectW: 613, aspectH: 643 },
  { icon: imgMoney,        aspectW: 30,  aspectH: 30  },
  { icon: imgCalendar,     aspectW: 36,  aspectH: 40  },
  { icon: imgFone,         aspectW: 30,  aspectH: 30  },
  { icon: imgCertificado,  aspectW: 19,  aspectH: 30  },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  features: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
}> = {
  pt: {
    heading1: "Programação de",
    heading2: "Reposição Inteligente",
    subtitle: "Mais praticidade para o cliente e mais receita recorrente para o parceiro.",
    features: [
      { title: "Lembretes automáticos",        desc: "Alertas de troca via App + AI" },
      { title: "Planos de Assinatura",          desc: "Mensais, trimestrais e anuais" },
      { title: "Renda recorrente",              desc: "Mais possibilidades de lucro" },
      { title: "Agendamento de serviço",        desc: "Instalação e manutenção" },
      { title: "Suporte ao parceiro",           desc: "Materiais, treinamentos e apoio" },
      { title: "Para Silver, Gold e Platinum",  desc: "Benefícios exclusivos" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Pedidos recorrentes/mês" },
      { value: "+ 85 mil", label: "Assinaturas ativas" },
      { value: "180 +",    label: "Países atendidos" },
      { value: "24/7",     label: "Suporte global" },
      { value: "89,6%",    label: "Satisfação dos parceiros" },
      { value: "≤ 2h",     label: "Tempo de resposta" },
    ],
  },
  en: {
    heading1: "Smart",
    heading2: "Replenishment Schedule",
    subtitle: "More convenience for the customer and more recurring revenue for the partner.",
    features: [
      { title: "Automatic reminders",           desc: "Replacement alerts via App + AI" },
      { title: "Subscription Plans",             desc: "Monthly, quarterly and annual" },
      { title: "Recurring income",               desc: "More profit opportunities" },
      { title: "Service scheduling",             desc: "Installation and maintenance" },
      { title: "Partner support",                desc: "Materials, training and assistance" },
      { title: "For Silver, Gold and Platinum",  desc: "Exclusive benefits" },
    ],
    stats: [
      { value: "+ 1.2M",   label: "Recurring orders/month" },
      { value: "+ 85K",    label: "Active subscriptions" },
      { value: "180 +",    label: "Countries served" },
      { value: "24/7",     label: "Global support" },
      { value: "89.6%",    label: "Partner satisfaction" },
      { value: "≤ 2h",     label: "Response time" },
    ],
  },
  "en-gb": {
    heading1: "Smart",
    heading2: "Replenishment Schedule",
    subtitle: "More convenience for the customer and more recurring revenue for the partner.",
    features: [
      { title: "Automatic reminders",           desc: "Replacement alerts via App + AI" },
      { title: "Subscription Plans",             desc: "Monthly, quarterly and annual" },
      { title: "Recurring income",               desc: "More profit opportunities" },
      { title: "Service scheduling",             desc: "Installation and maintenance" },
      { title: "Partner support",                desc: "Materials, training and assistance" },
      { title: "For Silver, Gold and Platinum",  desc: "Exclusive benefits" },
    ],
    stats: [
      { value: "+ 1.2M",   label: "Recurring orders/month" },
      { value: "+ 85K",    label: "Active subscriptions" },
      { value: "180 +",    label: "Countries served" },
      { value: "24/7",     label: "Global support" },
      { value: "89.6%",    label: "Partner satisfaction" },
      { value: "≤ 2h",     label: "Response time" },
    ],
  },
  es: {
    heading1: "Programación de",
    heading2: "Reposición Inteligente",
    subtitle: "Más comodidad para el cliente y más ingresos recurrentes para el socio.",
    features: [
      { title: "Recordatorios automáticos",         desc: "Alertas de cambio vía App + AI" },
      { title: "Planes de Suscripción",             desc: "Mensuales, trimestrales y anuales" },
      { title: "Ingresos recurrentes",              desc: "Más posibilidades de ganancia" },
      { title: "Programación de servicio",          desc: "Instalación y mantenimiento" },
      { title: "Soporte al socio",                  desc: "Materiales, entrenamientos y apoyo" },
      { title: "Para Silver, Gold y Platinum",      desc: "Beneficios exclusivos" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Pedidos recurrentes/mes" },
      { value: "+ 85 mil", label: "Suscripciones activas" },
      { value: "180 +",    label: "Países atendidos" },
      { value: "24/7",     label: "Soporte global" },
      { value: "89,6%",    label: "Satisfacción de los socios" },
      { value: "≤ 2h",     label: "Tiempo de respuesta" },
    ],
  },
  fr: {
    heading1: "Planification de",
    heading2: "Réapprovisionnement Intelligent",
    subtitle: "Plus de commodité pour le client et plus de revenus récurrents pour le partenaire.",
    features: [
      { title: "Rappels automatiques",              desc: "Alertes de remplacement via App + IA" },
      { title: "Plans d'abonnement",                desc: "Mensuels, trimestriels et annuels" },
      { title: "Revenus récurrents",                desc: "Plus d'opportunités de profit" },
      { title: "Planification de service",          desc: "Installation et maintenance" },
      { title: "Support partenaire",                desc: "Matériaux, formations et assistance" },
      { title: "Pour Silver, Gold et Platinum",     desc: "Avantages exclusifs" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Commandes récurrentes/mois" },
      { value: "+ 85K",    label: "Abonnements actifs" },
      { value: "180 +",    label: "Pays desservis" },
      { value: "24/7",     label: "Support mondial" },
      { value: "89,6%",    label: "Satisfaction des partenaires" },
      { value: "≤ 2h",     label: "Temps de réponse" },
    ],
  },
  de: {
    heading1: "Intelligente",
    heading2: "Nachbestellungsplanung",
    subtitle: "Mehr Komfort für den Kunden und mehr wiederkehrende Einnahmen für den Partner.",
    features: [
      { title: "Automatische Erinnerungen",         desc: "Austauschmeldungen per App + KI" },
      { title: "Abonnementpläne",                   desc: "Monatlich, vierteljährlich und jährlich" },
      { title: "Wiederkehrende Einnahmen",          desc: "Mehr Gewinnmöglichkeiten" },
      { title: "Serviceplanung",                    desc: "Installation und Wartung" },
      { title: "Partner-Support",                   desc: "Materialien, Schulungen und Unterstützung" },
      { title: "Für Silver, Gold und Platinum",     desc: "Exklusive Vorteile" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Wiederkehrende Bestellungen/Monat" },
      { value: "+ 85K",    label: "Aktive Abonnements" },
      { value: "180 +",    label: "Bediente Länder" },
      { value: "24/7",     label: "Globaler Support" },
      { value: "89,6%",    label: "Partnerzufriedenheit" },
      { value: "≤ 2h",     label: "Antwortzeit" },
    ],
  },
  it: {
    heading1: "Pianificazione del",
    heading2: "Rifornimento Intelligente",
    subtitle: "Più praticità per il cliente e maggiori entrate ricorrenti per il partner.",
    features: [
      { title: "Promemoria automatici",             desc: "Avvisi di sostituzione via App + IA" },
      { title: "Piani di Abbonamento",              desc: "Mensili, trimestrali e annuali" },
      { title: "Entrate ricorrenti",                desc: "Più opportunità di profitto" },
      { title: "Pianificazione del servizio",       desc: "Installazione e manutenzione" },
      { title: "Supporto al partner",               desc: "Materiali, formazioni e assistenza" },
      { title: "Per Silver, Gold e Platinum",       desc: "Vantaggi esclusivi" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Ordini ricorrenti/mese" },
      { value: "+ 85K",    label: "Abbonamenti attivi" },
      { value: "180 +",    label: "Paesi serviti" },
      { value: "24/7",     label: "Supporto globale" },
      { value: "89,6%",    label: "Soddisfazione dei partner" },
      { value: "≤ 2h",     label: "Tempo di risposta" },
    ],
  },
  zh: {
    heading1: "智能",
    heading2: "补货计划",
    subtitle: "为客户提供更多便利，为合作伙伴带来更多经常性收入。",
    features: [
      { title: "自动提醒",              desc: "通过App + AI发送更换提醒" },
      { title: "订阅计划",              desc: "按月、按季、按年订阅" },
      { title: "经常性收入",            desc: "更多盈利机会" },
      { title: "服务预约",              desc: "安装与维护" },
      { title: "合作伙伴支持",          desc: "材料、培训与支持" },
      { title: "适用于Silver、Gold和Platinum", desc: "专属权益" },
    ],
    stats: [
      { value: "+ 120万", label: "每月经常性订单" },
      { value: "+ 8.5万", label: "活跃订阅" },
      { value: "180 +",   label: "服务国家" },
      { value: "24/7",    label: "全球支持" },
      { value: "89.6%",   label: "合作伙伴满意度" },
      { value: "≤ 2h",    label: "响应时间" },
    ],
  },
  ja: {
    heading1: "スマート",
    heading2: "補充スケジュール",
    subtitle: "お客様の利便性を高め、パートナーの安定収益を増やします。",
    features: [
      { title: "自動リマインダー",          desc: "App + AIによる交換アラート" },
      { title: "サブスクリプションプラン",   desc: "月次、四半期、年次" },
      { title: "安定収益",                  desc: "より多くの利益機会" },
      { title: "サービス予約",              desc: "設置とメンテナンス" },
      { title: "パートナーサポート",        desc: "資材、研修、サポート" },
      { title: "Silver、Gold、Platinum向け", desc: "独占特典" },
    ],
    stats: [
      { value: "+ 120万", label: "月間定期注文数" },
      { value: "+ 8.5万", label: "アクティブサブスクリプション" },
      { value: "180 +",   label: "対応国数" },
      { value: "24/7",    label: "グローバルサポート" },
      { value: "89.6%",   label: "パートナー満足度" },
      { value: "≤ 2h",    label: "応答時間" },
    ],
  },
  ko: {
    heading1: "스마트",
    heading2: "재충전 일정",
    subtitle: "고객에게 더 많은 편의를 제공하고 파트너에게 더 많은 반복 수익을 창출합니다.",
    features: [
      { title: "자동 알림",                desc: "App + AI를 통한 교체 알림" },
      { title: "구독 플랜",                desc: "월간, 분기별, 연간" },
      { title: "반복 수익",                desc: "더 많은 수익 기회" },
      { title: "서비스 예약",              desc: "설치 및 유지보수" },
      { title: "파트너 지원",              desc: "자료, 교육 및 지원" },
      { title: "Silver, Gold 및 Platinum용", desc: "독점 혜택" },
    ],
    stats: [
      { value: "+ 120만", label: "월 반복 주문" },
      { value: "+ 8.5만", label: "활성 구독" },
      { value: "180 +",   label: "서비스 국가" },
      { value: "24/7",    label: "글로벌 지원" },
      { value: "89.6%",   label: "파트너 만족도" },
      { value: "≤ 2h",    label: "응답 시간" },
    ],
  },
  sv: {
    heading1: "Smart",
    heading2: "Påfyllningsschema",
    subtitle: "Mer bekvämlighet för kunden och mer återkommande intäkter för partnern.",
    features: [
      { title: "Automatiska påminnelser",           desc: "Bytesaviseringar via App + AI" },
      { title: "Prenumerationsplaner",              desc: "Månatliga, kvartalsvisa och årliga" },
      { title: "Återkommande intäkter",             desc: "Fler vinstmöjligheter" },
      { title: "Servicebokning",                    desc: "Installation och underhåll" },
      { title: "Partnersupport",                    desc: "Material, utbildning och stöd" },
      { title: "För Silver, Gold och Platinum",     desc: "Exklusiva förmåner" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Återkommande beställningar/månad" },
      { value: "+ 85K",    label: "Aktiva prenumerationer" },
      { value: "180 +",    label: "Betjänade länder" },
      { value: "24/7",     label: "Global support" },
      { value: "89,6%",    label: "Partnertillfredsställelse" },
      { value: "≤ 2h",     label: "Svarstid" },
    ],
  },
  fi: {
    heading1: "Älykäs",
    heading2: "Täydennysaikataulu",
    subtitle: "Enemmän mukavuutta asiakkaalle ja enemmän toistuvia tuloja kumppanille.",
    features: [
      { title: "Automaattiset muistutukset",        desc: "Vaihtohälytykset App + AI:n kautta" },
      { title: "Tilaussuunnitelmat",                desc: "Kuukausi-, neljännesvuosi- ja vuositilaukset" },
      { title: "Toistuvat tulot",                   desc: "Enemmän voittomahdollisuuksia" },
      { title: "Palvelun ajoitus",                  desc: "Asennus ja huolto" },
      { title: "Kumppanin tuki",                    desc: "Materiaalit, koulutukset ja tuki" },
      { title: "Silver, Gold ja Platinum -tasoille", desc: "Eksklusiiviset edut" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Toistuvat tilaukset/kuukausi" },
      { value: "+ 85K",    label: "Aktiiviset tilaukset" },
      { value: "180 +",    label: "Palveltavat maat" },
      { value: "24/7",     label: "Globaali tuki" },
      { value: "89,6%",    label: "Kumppaneiden tyytyväisyys" },
      { value: "≤ 2h",     label: "Vasteaika" },
    ],
  },
  ru: {
    heading1: "Умное",
    heading2: "Расписание пополнения",
    subtitle: "Больше удобства для клиента и больше регулярного дохода для партнёра.",
    features: [
      { title: "Автоматические напоминания",        desc: "Оповещения о замене через App + AI" },
      { title: "Планы подписки",                    desc: "Ежемесячные, квартальные и годовые" },
      { title: "Регулярный доход",                  desc: "Больше возможностей для прибыли" },
      { title: "Запись на обслуживание",            desc: "Установка и техническое обслуживание" },
      { title: "Поддержка партнёра",                desc: "Материалы, обучение и помощь" },
      { title: "Для Silver, Gold и Platinum",       desc: "Эксклюзивные преимущества" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Повторных заказов/месяц" },
      { value: "+ 85K",    label: "Активных подписок" },
      { value: "180 +",    label: "Обслуживаемых стран" },
      { value: "24/7",     label: "Глобальная поддержка" },
      { value: "89,6%",    label: "Удовлетворённость партнёров" },
      { value: "≤ 2h",     label: "Время ответа" },
    ],
  },
  ro: {
    heading1: "Programare",
    heading2: "Inteligenta de Reaprovizionare",
    subtitle: "Mai multa comoditate pentru client si mai multe venituri recurente pentru partener.",
    features: [
      { title: "Remindere automate",                desc: "Alerte de inlocuire prin App + AI" },
      { title: "Planuri de abonament",              desc: "Lunare, trimestriale si anuale" },
      { title: "Venituri recurente",                desc: "Mai multe oportunitati de profit" },
      { title: "Programarea serviciului",           desc: "Instalare si intretinere" },
      { title: "Suport pentru parteneri",           desc: "Materiale, traininguri si asistenta" },
      { title: "Pentru Silver, Gold si Platinum",   desc: "Beneficii exclusive" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Comenzi recurente/luna" },
      { value: "+ 85K",    label: "Abonamente active" },
      { value: "180 +",    label: "Tari deservite" },
      { value: "24/7",     label: "Suport global" },
      { value: "89,6%",    label: "Satisfactia partenerilor" },
      { value: "≤ 2h",     label: "Timp de raspuns" },
    ],
  },
  he: {
    heading1: "לוח זמנים",
    heading2: "לאספקה חכמה",
    subtitle: "יותר נוחות ללקוח ויותר הכנסה חוזרת לשותף.",
    features: [
      { title: "תזכורות אוטומטיות",               desc: "התראות החלפה דרך App + AI" },
      { title: "תוכניות מנוי",                     desc: "חודשי, רבעוני ושנתי" },
      { title: "הכנסה חוזרת",                      desc: "יותר הזדמנויות לרווח" },
      { title: "תזמון שירות",                      desc: "התקנה ותחזוקה" },
      { title: "תמיכה לשותף",                      desc: "חומרים, הכשרות וסיוע" },
      { title: "עבור Silver, Gold ו-Platinum",     desc: "הטבות בלעדיות" },
    ],
    stats: [
      { value: "+ 1.2M",   label: "הזמנות חוזרות לחודש" },
      { value: "+ 85K",    label: "מנויים פעילים" },
      { value: "180 +",    label: "מדינות משרתות" },
      { value: "24/7",     label: "תמיכה גלובלית" },
      { value: "89.6%",    label: "שביעות רצון שותפים" },
      { value: "≤ 2h",     label: "זמן תגובה" },
    ],
  },
  "pt-pt": {
    heading1: "Programação de",
    heading2: "Reposição Inteligente",
    subtitle: "Mais praticidade para o cliente e mais receita recorrente para o parceiro.",
    features: [
      { title: "Lembretes automáticos",        desc: "Alertas de troca via App + IA" },
      { title: "Planos de Subscrição",         desc: "Mensais, trimestrais e anuais" },
      { title: "Receita recorrente",           desc: "Mais possibilidades de lucro" },
      { title: "Agendamento de serviço",       desc: "Instalação e manutenção" },
      { title: "Suporte ao parceiro",          desc: "Materiais, formações e apoio" },
      { title: "Para Silver, Gold e Platinum", desc: "Benefícios exclusivos" },
    ],
    stats: [
      { value: "+ 1,2M",   label: "Pedidos recorrentes/mês" },
      { value: "+ 85 mil", label: "Subscrições ativas" },
      { value: "180 +",    label: "Países servidos" },
      { value: "24/7",     label: "Suporte global" },
      { value: "89,6%",    label: "Satisfação dos parceiros" },
      { value: "≤ 2h",     label: "Tempo de resposta" },
    ],
  },
};

export default function ReposicaoInteligente() {
  const { lang } = useLang();
  const t = T[lang];

  const features = t.features.map((f, i) => ({ ...featureIcons[i], ...f }));

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col md:flex-row flex-wrap gap-[20px] items-center justify-center max-w-[1400px] px-[20px] py-[40px] rounded-[16px] w-full">

        {/* Phone mockup */}
        <div className="flex flex-col items-center justify-center max-w-[180px] min-w-[180px] shrink-0">
          <div className="relative shrink-0" style={{ width: 156, height: 320 }}>
            <div className="absolute inset-0" style={{ aspectRatio: "1947/4096" }}>
              <img alt="Acquafy App" className="absolute inset-0 w-full h-full object-cover" src={imgPhone} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[40px] items-start flex-1 min-w-[240px]">
          <div className="flex flex-col gap-[20px] items-center w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] w-full text-center lg:text-left">
              <span className="text-[#1f2e91]">{t.heading1}</span>
              {" "}
              <span className="text-[#0569ff]">{t.heading2}</span>
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full text-center lg:text-left">
              {t.subtitle}
            </p>
          </div>

          {/* Feature icons */}
          <div className="flex flex-col gap-[20px] items-start w-full">
            <div className="flex flex-wrap gap-[20px] items-center justify-center w-full">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-[10px] items-start flex-1 min-w-[160px]">
                  <FigmaIcon src={f.icon} size={30} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <div className="flex flex-col gap-[10px] items-start w-full">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{f.title}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats cards */}
            <div className="flex flex-wrap gap-[20px_30px] items-center justify-center w-full">
              {t.stats.map((s) => (
                <div key={s.value} className="bg-white flex flex-col gap-[10px] items-start flex-1 min-w-[160px] px-[20px] py-[40px] rounded-[12px] text-center">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0569ff] w-full">{s.value}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] w-full">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
