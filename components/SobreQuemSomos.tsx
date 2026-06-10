import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgInterfyGroupLogo = "/figma-assets/2d26dd6a-d548-4a59-9c3b-80ace6151f13.svg";
const imgRatingIcon       = "/figma-assets/26bbd3dd-5a29-4c48-9212-b36ad10dba25.svg"; // +20 anos     sq
const imgGlobeIcon        = "/figma-assets/0a006afa-4d71-486f-abee-70102e0f7ea9.svg"; // presença     sq
const imgEcosystemIcon    = "/figma-assets/da874fa3-fb31-4919-b20b-ccfd606f478c.svg"; // ecossistemas sq
const imgScaleIcon        = "/figma-assets/3178faf1-efe6-43c1-a2ce-df2f2156b143.svg"; // inovação     sq

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
  return (
    <section className="flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-wrap gap-[40px] items-start justify-center max-w-[1400px] w-full">

        {/* Left: Quem Somos */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[40px] items-center max-w-[550px] min-w-[280px] px-[20px] py-[40px] rounded-[16px]">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
            Quem Somos
          </h2>
          <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            <p className="leading-[19px] mb-[10px]">
              A Acquafy Corporation foi fundada em setembro de 2020, nos Estados Unidos, como parte
              do Interfy Group.
            </p>
            <p className="leading-[19px] mb-[10px]">
              Há quase 6 anos desenvolvemos soluções que transformam a forma como famílias,
              empresas e comunidades têm acesso a água de qualidade.
            </p>
            <p className="leading-[19px] mb-[10px]">
              Desde nossa fundação comercializamos purificadores, filtros, jarras, filtros de chuveiro
              e garrafas de água alcalina, sempre com foco em inovação, desempenho e bem-estar.
            </p>
            <p className="leading-[19px]">
              Em 2026 entramos em uma nova fase com o lançamento de nossas linhas exclusivas de
              produtos e a expansão da Acquafy Global Smart Water Platform.
            </p>
          </div>
        </div>

        {/* Right: Interfy Group */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[40px] items-center min-w-[280px] px-[20px] py-[40px] rounded-[16px]">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
            Acquafy, uma empresa Interfy Group
          </h2>

          {/* Logo + description */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">

            {/* Logo column */}
            <div className="flex flex-[1_0_0] flex-col items-center justify-center max-w-[330px] min-w-[240px] p-[15px]">
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
            <div className="border-l border-solid border-[#cbd0d4] flex flex-[1_0_0] flex-col items-center justify-center min-w-[280px] p-[15px]">
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
                A Acquafy faz parte do{" "}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0569ff]">Interfy Group</span>
                ,<br />
                um grupo global de tecnologia com mais de 20 anos de história e experiência em
                inovação, transformação digital e soluções inteligentes.
              </p>
            </div>

          </div>

          {/* Stats — sem divisores */}
          <div className="flex flex-wrap gap-[10px] items-center w-full">
            <StatItem
              icon={imgRatingIcon}
              iconAlt="+20 anos"
              title="+20 anos"
              description="de história e experiência global."
            />
            <StatItem
              icon={imgGlobeIcon}
              iconAlt="Presença global"
              title="Presença global"
              description="operações e parceiros em vários continentes."
            />
            <StatItem
              icon={imgEcosystemIcon}
              iconAlt="Ecossistemas digitais"
              title="Ecossistemas digitais"
              description="plataformas e marcas complementares"
            />
            <StatItem
              icon={imgScaleIcon}
              iconAlt="Inovação contínua"
              title="Inovação contínua"
              description="investindo em pessoas, tecnologia e propósito"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
