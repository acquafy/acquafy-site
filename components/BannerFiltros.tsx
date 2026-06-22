"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Backgrounds ──────────────────────────────────────────────────────────────
// "Padrão" (xl+): background hero com splash de água + produtos visíveis ao fundo
const imgBg      = "/figma-assets/bg-g.webp";
// "120" (lg) + "1000" (mobile): foto explícita dos filtros no card lateral/stacked
const imgFilters = "/figma-assets/image-filters.webp";

// ── Setas: mesmas do Hero (padrão do projeto) ─────────────────────────────────
const imgArrowWhite = "/figma-assets/icon-arrow-white-a.svg";
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-outline-a.svg";

// ── Stats icons ───────────────────────────────────────────────────────────────
const imgWater      = "/figma-assets/icon-water-a.svg";
const imgAI         = "/figma-assets/icon-ai.svg";
const imgFilter     = "/figma-assets/icon-filter-a.svg";
const imgIntegracao = "/figma-assets/icon-integracao.svg";

const T: Record<Lang, {
  title1: string;
  title2: string;
  subtitle: string;
  desc: string;
  btn1: string;
  btn2: string;
  stats: { title: string; desc: string }[];
}> = {
  pt: {
    title1: "Filtros & ",
    title2: "Acessórios",
    subtitle: "Performance, qualidade e proteção para cada gota",
    desc: "Os filtros e acessórios Acquafy são projetados para manter a água sempre pura, segura e com o máximo desempenho em todos os equipamentos Acquafy.",
    btn1: "Conheça os filtros",
    btn2: "Falar com um especialista",
    stats: [
      { title: "Água pura e segura",                   desc: "Mais saúde e bem-estar para você e sua família." },
      { title: "Tecnologia avançada",                  desc: "Filtros de alta performance e máxima eficiência" },
      { title: "Fácil instalação e manutenção",        desc: "Praticidade para o dia a dia e maior durabilidade." },
      { title: "Compatibilidade com produtos Acquafy", desc: "Desenvolvidos para performance total do seu equipamento." },
    ],
  },
  "pt-pt": {
    title1: "Filtros & ",
    title2: "Acessórios",
    subtitle: "Desempenho, qualidade e proteção para cada gota",
    desc: "Os filtros e acessórios Acquafy são concebidos para manter a água sempre pura, segura e com o máximo desempenho em todos os equipamentos Acquafy.",
    btn1: "Conheça os filtros",
    btn2: "Falar com um especialista",
    stats: [
      { title: "Água pura e segura",                   desc: "Mais saúde e bem-estar para si e para a sua família." },
      { title: "Tecnologia avançada",                  desc: "Filtros de alto desempenho e máxima eficiência" },
      { title: "Instalação e manutenção fáceis",       desc: "Praticidade no dia a dia e maior durabilidade." },
      { title: "Compatibilidade com produtos Acquafy", desc: "Desenvolvidos para o desempenho total do seu equipamento." },
    ],
  },
  en: {
    title1: "Filters & ",
    title2: "Accessories",
    subtitle: "Performance, quality and protection for every drop",
    desc: "Acquafy filters and accessories are designed to keep water always pure, safe and at peak performance across all Acquafy equipment.",
    btn1: "Discover the filters",
    btn2: "Talk to a specialist",
    stats: [
      { title: "Pure and safe water",              desc: "More health and well-being for you and your family." },
      { title: "Advanced technology",              desc: "High-performance filters with maximum efficiency" },
      { title: "Easy installation and maintenance",desc: "Convenience for everyday life and greater durability." },
      { title: "Acquafy product compatibility",    desc: "Developed for total performance of your equipment." },
    ],
  },
  es: {
    title1: "Filtros & ",
    title2: "Accesorios",
    subtitle: "Rendimiento, calidad y protección para cada gota",
    desc: "Los filtros y accesorios Acquafy están diseñados para mantener el agua siempre pura, segura y con el máximo rendimiento en todos los equipos Acquafy.",
    btn1: "Conoce los filtros",
    btn2: "Hablar con un especialista",
    stats: [
      { title: "Agua pura y segura",                  desc: "Más salud y bienestar para usted y su familia." },
      { title: "Tecnología avanzada",                 desc: "Filtros de alto rendimiento y máxima eficiencia" },
      { title: "Fácil instalación y mantenimiento",   desc: "Practicidad para el día a día y mayor durabilidad." },
      { title: "Compatibilidad con productos Acquafy",desc: "Desarrollados para el rendimiento total de su equipo." },
    ],
  },
  fr: {
    title1: "Filtres & ",
    title2: "Accessoires",
    subtitle: "Performance, qualité et protection pour chaque goutte",
    desc: "Les filtres et accessoires Acquafy sont conçus pour maintenir l'eau toujours pure, sûre et avec des performances maximales sur tous les équipements Acquafy.",
    btn1: "Découvrir les filtres",
    btn2: "Parler à un spécialiste",
    stats: [
      { title: "Eau pure et sûre",                       desc: "Plus de santé et de bien-être pour vous et votre famille." },
      { title: "Technologie avancée",                    desc: "Filtres haute performance à efficacité maximale" },
      { title: "Installation et entretien faciles",      desc: "Praticité au quotidien et plus grande durabilité." },
      { title: "Compatibilité avec les produits Acquafy",desc: "Développés pour les performances totales de votre équipement." },
    ],
  },
  de: {
    title1: "Filter & ",
    title2: "Zubehör",
    subtitle: "Leistung, Qualität und Schutz für jeden Tropfen",
    desc: "Acquafy Filter und Zubehör sind darauf ausgelegt, Wasser in allen Acquafy-Geräten stets rein, sicher und mit maximaler Leistung zu halten.",
    btn1: "Filter entdecken",
    btn2: "Mit einem Spezialisten sprechen",
    stats: [
      { title: "Reines und sicheres Wasser",            desc: "Mehr Gesundheit und Wohlbefinden für Sie und Ihre Familie." },
      { title: "Fortschrittliche Technologie",           desc: "Hochleistungsfilter mit maximaler Effizienz" },
      { title: "Einfache Installation und Wartung",      desc: "Bequemlichkeit im Alltag und längere Haltbarkeit." },
      { title: "Kompatibilität mit Acquafy-Produkten",   desc: "Entwickelt für die volle Leistung Ihres Geräts." },
    ],
  },
  it: {
    title1: "Filtri & ",
    title2: "Accessori",
    subtitle: "Prestazioni, qualità e protezione per ogni goccia",
    desc: "I filtri e gli accessori Acquafy sono progettati per mantenere l'acqua sempre pura, sicura e con le massime prestazioni su tutte le apparecchiature Acquafy.",
    btn1: "Scopri i filtri",
    btn2: "Parla con uno specialista",
    stats: [
      { title: "Acqua pura e sicura",                    desc: "Più salute e benessere per te e la tua famiglia." },
      { title: "Tecnologia avanzata",                    desc: "Filtri ad alte prestazioni e massima efficienza" },
      { title: "Installazione e manutenzione facili",    desc: "Praticità per la vita quotidiana e maggiore durata." },
      { title: "Compatibilità con i prodotti Acquafy",   desc: "Sviluppati per le prestazioni totali della tua apparecchiatura." },
    ],
  },
  zh: {
    title1: "滤芯 & ",
    title2: "配件",
    subtitle: "每一滴水的性能、品质与保护",
    desc: "Acquafy 滤芯和配件专为所有 Acquafy 设备保持水质纯净、安全和最佳性能而设计。",
    btn1: "了解滤芯",
    btn2: "联系专家",
    stats: [
      { title: "纯净安全的水",         desc: "为您和家人带来更多健康与幸福。" },
      { title: "先进技术",             desc: "高性能滤芯，效率最大化" },
      { title: "安装与维护简便",       desc: "日常便利性更强，使用寿命更长。" },
      { title: "与 Acquafy 产品兼容",  desc: "专为设备全性能运行而研发。" },
    ],
  },
  ja: {
    title1: "フィルター & ",
    title2: "アクセサリー",
    subtitle: "一滴一滴のためのパフォーマンス、品質、そして保護",
    desc: "Acquafy のフィルターとアクセサリーは、すべての Acquafy 機器で水を常に純粋で安全、かつ最高のパフォーマンスに保つよう設計されています。",
    btn1: "フィルターを見る",
    btn2: "専門家に相談する",
    stats: [
      { title: "純粋で安全な水",              desc: "あなたとご家族の健康とウェルビーイングをサポート。" },
      { title: "高度な技術",                  desc: "最大効率の高性能フィルター" },
      { title: "簡単な設置とメンテナンス",    desc: "日常の利便性と長い耐久性。" },
      { title: "Acquafy 製品との互換性",      desc: "機器の総合的なパフォーマンスのために開発。" },
    ],
  },
  ko: {
    title1: "필터 & ",
    title2: "액세서리",
    subtitle: "모든 한 방울을 위한 성능, 품질, 보호",
    desc: "Acquafy 필터와 액세서리는 모든 Acquafy 장비에서 물을 항상 순수하고 안전하며 최고의 성능으로 유지하도록 설계되었습니다.",
    btn1: "필터 알아보기",
    btn2: "전문가와 상담",
    stats: [
      { title: "순수하고 안전한 물",         desc: "당신과 가족의 건강과 웰빙을 위해." },
      { title: "첨단 기술",                   desc: "최대 효율의 고성능 필터" },
      { title: "쉬운 설치 및 유지 관리",     desc: "일상의 편의성과 더 긴 내구성." },
      { title: "Acquafy 제품과의 호환성",    desc: "장비의 완전한 성능을 위해 개발되었습니다." },
    ],
  },
};

export default function BannerFiltros() {
  const { lang } = useLang();
  const t = T[lang];
  const stats = [
    { icon: imgWater,      iconW: 40, iconH: 40, title: t.stats[0].title, desc: t.stats[0].desc },
    { icon: imgAI,         iconW: 30, iconH: 30, title: t.stats[1].title, desc: t.stats[1].desc },
    { icon: imgFilter,     iconW: 30, iconH: 30, title: t.stats[2].title, desc: t.stats[2].desc },
    { icon: imgIntegracao, iconW: 30, iconH: 30, title: t.stats[3].title, desc: t.stats[3].desc },
  ];
  return (
    <section
      className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden
                 bg-[#f1f5fe] xl:bg-transparent xl:h-[calc(100vh-80px)]"
    >
      {/* ─── Background "Padrão" — visível apenas em xl+ ──────────────────────── */}
      <img
        alt=""
        className="hidden xl:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* ─── Área de conteúdo ─────────────────────────────────────────────────────
          flex-1 empurra a stats bar ao rodapé da seção (padrão Hero)
          "1000" (mobile) : flex-col (empilhado, texto centralizado)
          "120"  (lg+)    : flex-row flex-wrap (lado a lado, texto à esquerda)   */}
      <div className="relative flex-1 flex flex-col lg:flex-row flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* ── Coluna de texto ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-[20px] items-center lg:items-start flex-1 min-w-[280px] lg:max-w-[500px] xl:max-w-[600px]">

          {/* Título */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero w-full text-center lg:text-left">
            <span className="text-[#2a2a2b]">{t.title1}</span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, #0233c3, #0569ff)" }}
            >
              {t.title2}
            </span>
          </h1>

          {/* Subtítulo azul */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0233c3] w-full text-center lg:text-left">
            {t.subtitle}
          </p>

          {/* Descrição */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] w-full text-center lg:text-left">
            {t.desc}
          </p>

          {/* Botões CTA — hero-size (50px, Articulat CF Bold 16px), mesmo padrão do Hero
              "1000" (mobile): centralizados | "120"+"Padrão" (lg+): à esquerda       */}
          <div className="flex flex-col md:flex-row flex-wrap gap-[20px] items-center w-full justify-center xl:justify-start">
            {/* BT AZUL BASE ARROW */}
            <a href="#filtros-lista" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex w-full md:flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] md:min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">{t.btn1}</span>
              <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
            </a>
            {/* BT AZUL OUT ARROW */}
            <a href="/contato" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex w-full md:flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] md:min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">{t.btn2}</span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
                  <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ── Foto do produto ──────────────────────────────────────────────────────
            "1000" (mobile) : full-width, 500px de altura, empilhada abaixo do texto
            "120"  (lg)     : coluna à direita, flex-[1_0_0], aspect 700×480
            "Padrão" (xl+)  : oculta — os filtros aparecem pelo background image     */}
        <div
          className="relative rounded-[16px] overflow-hidden xl:hidden
                     w-full
                     lg:flex-[1_0_0] lg:min-w-[280px] lg:min-h-[192px] lg:[aspect-ratio:700/480]"
        >
          <img
            alt="Filtros Acquafy — linha completa"
            className="block w-full h-auto lg:absolute lg:inset-0 lg:h-full lg:object-cover"
            src={imgFilters}
          />
        </div>

        {/* ── Espaçador — xl+ only ("Padrão")
             Mantém o texto à esquerda enquanto o background image
             expõe os produtos no lado direito da seção                            */}
        <div className="hidden xl:flex flex-1 min-w-[280px] min-h-[300px]" />
      </div>

      {/* ─── Stats bar — pinada ao rodapé (último elemento do flex-col da section) */}
      <div className="relative bg-white flex flex-wrap gap-y-[30px] items-center justify-center max-w-[1400px] min-h-[140px] overflow-hidden py-[25px] rounded-[16px] w-full">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-1 flex-wrap gap-[10px] items-center min-w-[160px] px-[20px]"
          >
            <FigmaIcon src={s.icon} size={30} aspectW={s.iconW} aspectH={s.iconH} />
            <div className="flex flex-col gap-[5px] flex-1 min-w-[100px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{s.title}</p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
