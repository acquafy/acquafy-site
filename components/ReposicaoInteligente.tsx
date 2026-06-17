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
