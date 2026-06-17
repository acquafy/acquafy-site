"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  quemSomosTitle: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  interfyTitle: string;
  interfyDesc: string;
  stat1Title: string;
  stat1Desc: string;
  stat2Title: string;
  stat2Desc: string;
  stat3Title: string;
  stat3Desc: string;
  stat4Title: string;
  stat4Desc: string;
}> = {
  pt: {
    quemSomosTitle: "Quem Somos",
    p1: "A Acquafy Corporation foi fundada em setembro de 2020, nos Estados Unidos, como parte do Interfy Group.",
    p2: "Há quase 6 anos desenvolvemos soluções que transformam a forma como famílias, empresas e comunidades têm acesso a água de qualidade.",
    p3: "Desde nossa fundação comercializamos purificadores, filtros, jarras, filtros de chuveiro e garrafas de água alcalina, sempre com foco em inovação, desempenho e bem-estar.",
    p4: "Em 2026 entramos em uma nova fase com o lançamento de nossas linhas exclusivas de produtos e a expansão da Acquafy Global Smart Water Platform.",
    interfyTitle: "Acquafy, uma empresa Interfy Group",
    interfyDesc: "um grupo global de tecnologia com mais de 20 anos de história e experiência em inovação, transformação digital e soluções inteligentes.",
    stat1Title: "+20 anos",
    stat1Desc:  "de história e experiência global.",
    stat2Title: "Presença global",
    stat2Desc:  "operações e parceiros em vários continentes.",
    stat3Title: "Ecossistemas digitais",
    stat3Desc:  "plataformas e marcas complementares",
    stat4Title: "Inovação contínua",
    stat4Desc:  "investindo em pessoas, tecnologia e propósito",
  },
  en: {
    quemSomosTitle: "About Us",
    p1: "Acquafy Corporation was founded in September 2020 in the United States as part of the Interfy Group.",
    p2: "For nearly 6 years we have developed solutions that transform the way families, businesses and communities access quality water.",
    p3: "Since our founding we have marketed purifiers, filters, pitchers, shower filters and alkaline water bottles, always focused on innovation, performance and well-being.",
    p4: "In 2026 we entered a new phase with the launch of our exclusive product lines and the expansion of the Acquafy Global Smart Water Platform.",
    interfyTitle: "Acquafy, an Interfy Group company",
    interfyDesc: "a global technology group with over 20 years of history and experience in innovation, digital transformation and intelligent solutions.",
    stat1Title: "+20 years",
    stat1Desc:  "of global history and experience.",
    stat2Title: "Global presence",
    stat2Desc:  "operations and partners across multiple continents.",
    stat3Title: "Digital ecosystems",
    stat3Desc:  "complementary platforms and brands",
    stat4Title: "Continuous innovation",
    stat4Desc:  "investing in people, technology and purpose",
  },
  es: {
    quemSomosTitle: "Quiénes Somos",
    p1: "Acquafy Corporation fue fundada en septiembre de 2020 en los Estados Unidos como parte del Interfy Group.",
    p2: "Durante casi 6 años hemos desarrollado soluciones que transforman la forma en que familias, empresas y comunidades acceden al agua de calidad.",
    p3: "Desde nuestra fundación comercializamos purificadores, filtros, jarras, filtros de ducha y botellas de agua alcalina, siempre enfocados en innovación, rendimiento y bienestar.",
    p4: "En 2026 entramos en una nueva fase con el lanzamiento de nuestras líneas exclusivas de productos y la expansión de la Acquafy Global Smart Water Platform.",
    interfyTitle: "Acquafy, una empresa del Interfy Group",
    interfyDesc: "un grupo tecnológico global con más de 20 años de historia y experiencia en innovación, transformación digital y soluciones inteligentes.",
    stat1Title: "+20 años",
    stat1Desc:  "de historia y experiencia global.",
    stat2Title: "Presencia global",
    stat2Desc:  "operaciones y socios en varios continentes.",
    stat3Title: "Ecosistemas digitales",
    stat3Desc:  "plataformas y marcas complementarias",
    stat4Title: "Innovación continua",
    stat4Desc:  "invirtiendo en personas, tecnología y propósito",
  },
};

// ── Assets ───────────────────────────────────────────────────────────────────
const imgInterfyGroupLogo = "/figma-assets/logo-interfy-group.svg";
const imgRatingIcon       = "/figma-assets/icon-rating-20anos.svg"; // +20 anos     sq
const imgGlobeIcon        = "/figma-assets/icon-globe-presence.svg"; // presença     sq
const imgEcosystemIcon    = "/figma-assets/icon-ecosystem.svg"; // ecossistemas sq
const imgScaleIcon        = "/figma-assets/icon-scale-inovacao.svg"; // inovação     sq

function StatItem({
  icon, iconAlt, title, description,
}: { icon: string; iconAlt: string; title: string; description: string }) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[150px] px-[20px]">
      <FigmaIcon src={icon} alt={iconAlt} size={40} />
      <div className="flex flex-col gap-[15px] items-start text-center w-full">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full min-h-[36px]">
          {title}
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] w-full">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SobreQuemSomos() {
  const { lang } = useLang();
  const t = T[lang];
  return (
    <section id="quem-somos" className="scroll-mt-[80px] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start justify-center max-w-[1400px] w-full win-1024:flex-row win-1024:flex-wrap">

        {/* Left: Quem Somos */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[40px] items-center max-w-[550px] min-w-[280px] px-[20px] py-[40px] rounded-[16px]">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
            {t.quemSomosTitle}
          </h2>
          <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            <p className="leading-[19px] mb-[10px]">{t.p1}</p>
            <p className="leading-[19px] mb-[10px]">{t.p2}</p>
            <p className="leading-[19px] mb-[10px]">{t.p3}</p>
            <p className="leading-[19px]">{t.p4}</p>
          </div>
        </div>

        {/* Right: Interfy Group */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[40px] items-center min-w-[280px] px-[20px] py-[40px] rounded-[16px]">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
            {t.interfyTitle}
          </h2>

          {/* Logo + description */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">

            {/* Logo column */}
            <div className="flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px] p-[15px] win-1024:max-w-[330px]">
              <div
                className="max-h-[82.47px] max-w-[300px] overflow-hidden relative w-full"
                style={{ aspectRatio: "922.6675 / 253.6643" }}
              >
                <img
                  alt="Interfy Group"
                  className="absolute inset-0 w-full h-full"
                  src={imgInterfyGroupLogo}
                />
              </div>
            </div>

            {/* Description column — border-l serves as divider */}
            <div className="flex flex-[1_0_0] flex-col items-center justify-center min-w-[280px] p-[15px] win-1024:border-l win-1024:border-solid win-1024:border-[#cbd0d4]">
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
                A Acquafy faz parte do{" "}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0569ff]">Interfy Group</span>
                ,<br />
                {t.interfyDesc}
              </p>
            </div>

          </div>

          {/* Stats — sem divisores */}
          <div className="flex flex-wrap gap-[10px] items-center w-full">
            <StatItem
              icon={imgRatingIcon}
              iconAlt={t.stat1Title}
              title={t.stat1Title}
              description={t.stat1Desc}
            />
            <StatItem
              icon={imgGlobeIcon}
              iconAlt={t.stat2Title}
              title={t.stat2Title}
              description={t.stat2Desc}
            />
            <StatItem
              icon={imgEcosystemIcon}
              iconAlt={t.stat3Title}
              title={t.stat3Title}
              description={t.stat3Desc}
            />
            <StatItem
              icon={imgScaleIcon}
              iconAlt={t.stat4Title}
              title={t.stat4Title}
              description={t.stat4Desc}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
