"use client";
// "Onde o Acquafy Media gera mais impacto" — location cards (Figma node 3258:4243)
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgAirport   = "/figma-assets/photo-location-airport.webp";
const imgShopping  = "/figma-assets/photo-location-shopping.webp";
const imgHospital  = "/figma-assets/photo-location-hospital.webp";
const imgOffice    = "/figma-assets/photo-location-office.webp";
const imgEducation = "/figma-assets/photo-location-university.webp";
const imgCrowded   = "/figma-assets/photo-location-public.webp";

const imgPlane     = "/figma-assets/icon-plane.svg";
const imgCart      = "/figma-assets/icon-cart.svg";
const imgCross     = "/figma-assets/icon-cross.svg";
const imgBuilding  = "/figma-assets/icon-building.svg";
const imgEdu       = "/figma-assets/icon-edu.svg";
const imgPeople    = "/figma-assets/icon-people-a.svg";

const T: Record<Lang, {
  heading1: string;
  headingHighlight: string;
  locations: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Onde o Acquafy Media ",
    headingHighlight: "gera mais impacto",
    locations: [
      { title: "Aeroportos",                           desc: "Alto fluxo, público qualificado e grande visibilidade para marcas." },
      { title: "Shoppings",                            desc: "Engajamento constante e oportunidades de compras e conversão." },
      { title: "Hospitais",                            desc: "Hidratação acessível e bem-estar para pacientes, visitantes e equipes." },
      { title: "Empresas",                             desc: "Mais saúde e produtividade para colaboradores e visitantes." },
      { title: "Universidades",                        desc: "Público jovem e conectado, ideal para mídia e promoções." },
      { title: "Redes públicas e locais de alto fluxo", desc: "Estações, rodoviárias, praças e espaços urbanos com grande circulação." },
    ],
  },
  "pt-pt": {
    heading1: "Onde o Acquafy Media ",
    headingHighlight: "gera mais impacto",
    locations: [
      { title: "Aeroportos",                           desc: "Alto fluxo, público qualificado e grande visibilidade para marcas." },
      { title: "Centros Comerciais",                   desc: "Envolvimento constante e oportunidades de compras e conversão." },
      { title: "Hospitais",                            desc: "Hidratação acessível e bem-estar para doentes, visitantes e equipas." },
      { title: "Empresas",                             desc: "Mais saúde e produtividade para colaboradores e visitantes." },
      { title: "Universidades",                        desc: "Público jovem e conectado, ideal para média e promoções." },
      { title: "Redes públicas e locais de alto fluxo", desc: "Estações, rodoviárias, praças e espaços urbanos com grande circulação." },
    ],
  },
  en: {
    heading1: "Where Acquafy Media ",
    headingHighlight: "generates the most impact",
    locations: [
      { title: "Airports",                          desc: "High traffic, qualified audience and great visibility for brands." },
      { title: "Shopping Malls",                    desc: "Constant engagement and shopping and conversion opportunities." },
      { title: "Hospitals",                         desc: "Accessible hydration and well-being for patients, visitors and staff." },
      { title: "Companies",                         desc: "More health and productivity for employees and visitors." },
      { title: "Universities",                      desc: "Young and connected audience, ideal for media and promotions." },
      { title: "Public networks and high-traffic locations", desc: "Stations, bus terminals, squares and urban spaces with heavy foot traffic." },
    ],
  },
  es: {
    heading1: "Donde Acquafy Media ",
    headingHighlight: "genera más impacto",
    locations: [
      { title: "Aeropuertos",                        desc: "Alto flujo, público calificado y gran visibilidad para marcas." },
      { title: "Centros comerciales",                desc: "Compromiso constante y oportunidades de compra y conversión." },
      { title: "Hospitales",                         desc: "Hidratación accesible y bienestar para pacientes, visitantes y equipos." },
      { title: "Empresas",                           desc: "Más salud y productividad para colaboradores y visitantes." },
      { title: "Universidades",                      desc: "Público joven y conectado, ideal para medios y promociones." },
      { title: "Redes públicas y lugares de alto tráfico", desc: "Estaciones, terminales, plazas y espacios urbanos con gran circulación." },
    ],
  },
  fr: {
    heading1: "Où Acquafy Media ",
    headingHighlight: "génère le plus d'impact",
    locations: [
      { title: "Aéroports",                          desc: "Fort trafic, audience qualifiée et grande visibilité pour les marques." },
      { title: "Centres Commerciaux",                desc: "Engagement constant et opportunités d'achat et de conversion." },
      { title: "Hôpitaux",                           desc: "Hydratation accessible et bien-être pour patients, visiteurs et personnels." },
      { title: "Entreprises",                        desc: "Plus de santé et de productivité pour les employés et visiteurs." },
      { title: "Universités",                        desc: "Audience jeune et connectée, idéale pour les médias et promotions." },
      { title: "Réseaux publics et lieux à fort trafic", desc: "Gares, terminaux, places et espaces urbains à forte affluence." },
    ],
  },
  de: {
    heading1: "Wo Acquafy Media ",
    headingHighlight: "die größte Wirkung erzielt",
    locations: [
      { title: "Flughäfen",                          desc: "Hohes Verkehrsaufkommen, qualifiziertes Publikum und große Markensichtbarkeit." },
      { title: "Einkaufszentren",                    desc: "Konstantes Engagement und Einkaufs- und Konversionschancen." },
      { title: "Krankenhäuser",                      desc: "Zugängliche Hydration und Wohlbefinden für Patienten, Besucher und Personal." },
      { title: "Unternehmen",                        desc: "Mehr Gesundheit und Produktivität für Mitarbeiter und Besucher." },
      { title: "Universitäten",                      desc: "Junges und vernetztes Publikum, ideal für Medien und Promotionen." },
      { title: "Öffentliche Netzwerke und stark frequentierte Orte", desc: "Bahnhöfe, Terminals, Plätze und städtische Räume mit hohem Besucheraufkommen." },
    ],
  },
  it: {
    heading1: "Dove Acquafy Media ",
    headingHighlight: "genera più impatto",
    locations: [
      { title: "Aeroporti",                          desc: "Alto traffico, pubblico qualificato e grande visibilità per i brand." },
      { title: "Centri Commerciali",                 desc: "Coinvolgimento costante e opportunità di acquisto e conversione." },
      { title: "Ospedali",                           desc: "Idratazione accessibile e benessere per pazienti, visitatori e staff." },
      { title: "Aziende",                            desc: "Più salute e produttività per dipendenti e visitatori." },
      { title: "Università",                         desc: "Pubblico giovane e connesso, ideale per media e promozioni." },
      { title: "Reti pubbliche e luoghi ad alto traffico", desc: "Stazioni, terminal, piazze e spazi urbani con grande afflusso." },
    ],
  },
  zh: {
    heading1: "Acquafy Media ",
    headingHighlight: "产生最大影响的地方",
    locations: [
      { title: "机场",                               desc: "高流量、高质量受众，为品牌提供极大曝光度。" },
      { title: "购物中心",                           desc: "持续参与以及购物和转化机会。" },
      { title: "医院",                               desc: "为患者、访客和员工提供便捷的水分补充和健康保障。" },
      { title: "企业",                               desc: "为员工和访客带来更多健康和生产力。" },
      { title: "大学",                               desc: "年轻且互联的受众，非常适合媒体和促销活动。" },
      { title: "公共网络和高流量场所",               desc: "车站、客运站、广场和人流密集的城市空间。" },
    ],
  },
  ja: {
    heading1: "Acquafy Media が ",
    headingHighlight: "最も効果を発揮する場所",
    locations: [
      { title: "空港",                               desc: "高い交通量、質の高いオーディエンス、ブランドへの優れた視認性。" },
      { title: "ショッピングモール",                 desc: "継続的なエンゲージメントと購買・コンバージョン機会。" },
      { title: "病院",                               desc: "患者、訪問者、スタッフへのアクセスしやすい水分補給と健康管理。" },
      { title: "企業",                               desc: "従業員と訪問者のための健康増進と生産性向上。" },
      { title: "大学",                               desc: "若くて繋がりのあるオーディエンス、メディアとプロモーションに最適。" },
      { title: "公共ネットワークと高交通量スポット",  desc: "駅、ターミナル、広場、人の往来が多い都市空間。" },
    ],
  },
  ko: {
    heading1: "Acquafy Media가 ",
    headingHighlight: "가장 큰 영향을 미치는 곳",
    locations: [
      { title: "공항",                               desc: "높은 유동 인구, 우수한 타겟 고객, 브랜드의 뛰어난 가시성." },
      { title: "쇼핑몰",                             desc: "지속적인 참여와 구매 및 전환 기회." },
      { title: "병원",                               desc: "환자, 방문객, 직원을 위한 접근 가능한 수분 보충과 건강 증진." },
      { title: "기업",                               desc: "직원과 방문객을 위한 건강과 생산성 향상." },
      { title: "대학교",                             desc: "젊고 연결된 수용자, 미디어 및 프로모션에 이상적." },
      { title: "공공 네트워크 및 고통행량 장소",      desc: "역, 터미널, 광장, 유동 인구가 많은 도시 공간." },
    ],
  },
};

const photos  = [imgAirport, imgShopping, imgHospital, imgOffice, imgEducation, imgCrowded];
const iconSrcs = [imgPlane, imgCart, imgCross, imgBuilding, imgEdu, imgPeople];
const aspectWs = [32, 32, 32, 32, 32, 32];
const aspectHs = [32, 32, 32, 32, 24, 31.5];

export default function NeoMediaAplicacoes() {
  const { lang } = useLang();
  const t = T[lang];

  const locations = t.locations.map((loc, i) => ({
    photo: photos[i],
    icon: iconSrcs[i],
    aspectW: aspectWs[i],
    aspectH: aspectHs[i],
    title: loc.title,
    desc: loc.desc,
  }));

  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading1}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center overflow-hidden w-full">
          {locations.map((loc) => (
            <div
              key={loc.title}
              className="bg-white flex flex-[1_0_0] flex-col items-center max-w-[500px] min-h-[160px] min-w-[200px] overflow-hidden rounded-[16px]"
            >
              {/* Photo + floating icon badge */}
              <div className="relative flex flex-col items-center justify-center w-full shrink-0">
                <div className="h-[150px] w-full mb-[-30px] relative">
                  <img
                    alt={loc.title}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src={loc.photo}
                  />
                </div>
                {/* White icon badge */}
                <div className="bg-white flex flex-col items-center justify-center p-[15px] rounded-[8px] z-10 shrink-0">
                  <FigmaIcon src={loc.icon} size={30} aspectW={loc.aspectW} aspectH={loc.aspectH} />
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col gap-[10px] items-center justify-center p-[20px] text-center w-full">
                <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex items-center justify-center min-h-[40px] w-full">
                  {loc.title}
                </h3>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] w-full">
                  {loc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
