"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading: string;
  products: { title: string; desc: string }[];
  cta: string;
}> = {
  pt: {
    heading: "Acessórios para Acquafy",
    products: [
      { title: "Copo Exclusivo",             desc: "Brinde para eventos e ativações" },
      { title: "Camiseta",                   desc: "Uniforme padrão para equipes e promotores" },
      { title: "Boné",                       desc: "Identidade visual para equipes de campo." },
      { title: "Squeeze de 750ml",           desc: "Prático, sustentável e ideal para ações e brindes." },
      { title: "Sacola",                     desc: "Para kits, brindes e materiais promocionais." },
      { title: "Botton (Broche)",            desc: "Divulgação e identificação da equipe." },
      { title: "Adesivo / Ticket",           desc: "Para copos, equipamentos e vitrines." },
      { title: "Cartão de Visita",           desc: "Para parceiros e anunciantes." },
      { title: "Folheto / Flyer",            desc: "Material para abordagem e divulgação." },
      { title: "Banner / Backdrop",          desc: "Ideal para eventos e ações promocionais." },
      { title: "Uniforme Promotor",          desc: "Camiseta - Boné para promotores e equipe." },
      { title: "Outros Materiais Sugeridos", desc: "Pulseira de silicone, chaveiro, caneta, bloco e outros itens." },
    ],
    cta: "Seja um Parceiro",
  },
  "pt-pt": {
    heading: "Acessórios para Acquafy",
    products: [
      { title: "Copo Exclusivo",             desc: "Brinde para eventos e ativações" },
      { title: "Camiseta",                   desc: "Uniforme padrão para equipas e promotores" },
      { title: "Boné",                       desc: "Identidade visual para equipas de campo." },
      { title: "Squeeze de 750ml",           desc: "Prático, sustentável e ideal para ações e brindes." },
      { title: "Sacola",                     desc: "Para kits, brindes e materiais promocionais." },
      { title: "Botton (Broche)",            desc: "Divulgação e identificação da equipa." },
      { title: "Adesivo / Ticket",           desc: "Para copos, equipamentos e montras." },
      { title: "Cartão de Visita",           desc: "Para parceiros e anunciantes." },
      { title: "Folheto / Flyer",            desc: "Material para abordagem e divulgação." },
      { title: "Banner / Backdrop",          desc: "Ideal para eventos e ações promocionais." },
      { title: "Uniforme Promotor",          desc: "Camiseta - Boné para promotores e equipa." },
      { title: "Outros Materiais Sugeridos", desc: "Pulseira de silicone, porta-chaves, caneta, bloco e outros itens." },
    ],
    cta: "Seja um Parceiro",
  },
  en: {
    heading: "Accessories for Acquafy",
    products: [
      { title: "Exclusive Cup",              desc: "Gift for events and activations" },
      { title: "T-Shirt",                   desc: "Standard uniform for teams and promoters" },
      { title: "Cap",                        desc: "Visual identity for field teams." },
      { title: "750ml Squeeze Bottle",       desc: "Practical, sustainable, ideal for actions and gifts." },
      { title: "Tote Bag",                   desc: "For kits, gifts and promotional materials." },
      { title: "Button (Brooch)",            desc: "Team promotion and identification." },
      { title: "Sticker / Ticket",           desc: "For cups, equipment and shop windows." },
      { title: "Business Card",              desc: "For partners and advertisers." },
      { title: "Leaflet / Flyer",            desc: "Material for outreach and promotion." },
      { title: "Banner / Backdrop",          desc: "Ideal for events and promotional actions." },
      { title: "Promoter Uniform",           desc: "T-Shirt - Cap for promoters and team." },
      { title: "Other Suggested Materials",  desc: "Silicone bracelet, keychain, pen, notepad and other items." },
    ],
    cta: "Become a Partner",
  },
  es: {
    heading: "Accesorios para Acquafy",
    products: [
      { title: "Vaso Exclusivo",             desc: "Obsequio para eventos y activaciones" },
      { title: "Camiseta",                   desc: "Uniforme estándar para equipos y promotores" },
      { title: "Gorra",                      desc: "Identidad visual para equipos de campo." },
      { title: "Botella de 750ml",           desc: "Práctica, sostenible e ideal para acciones y obsequios." },
      { title: "Bolsa",                      desc: "Para kits, obsequios y materiales promocionales." },
      { title: "Botón (Broche)",             desc: "Difusión e identificación del equipo." },
      { title: "Adhesivo / Ticket",          desc: "Para vasos, equipos y vitrinas." },
      { title: "Tarjeta de Visita",          desc: "Para socios y anunciantes." },
      { title: "Folleto / Flyer",            desc: "Material para acercamiento y difusión." },
      { title: "Banner / Backdrop",          desc: "Ideal para eventos y acciones promocionales." },
      { title: "Uniforme Promotor",          desc: "Camiseta - Gorra para promotores y equipo." },
      { title: "Otros Materiales Sugeridos", desc: "Pulsera de silicona, llavero, bolígrafo, bloc y otros artículos." },
    ],
    cta: "Ser Socio",
  },
  fr: {
    heading: "Accessoires pour Acquafy",
    products: [
      { title: "Gobelet Exclusif",           desc: "Cadeau pour événements et activations" },
      { title: "T-Shirt",                    desc: "Uniforme standard pour les équipes et promoteurs" },
      { title: "Casquette",                  desc: "Identité visuelle pour les équipes terrain." },
      { title: "Gourde de 750ml",            desc: "Pratique, durable et idéale pour les actions et cadeaux." },
      { title: "Tote Bag",                   desc: "Pour les kits, cadeaux et matériaux promotionnels." },
      { title: "Badge (Broche)",             desc: "Promotion et identification de l'équipe." },
      { title: "Autocollant / Ticket",       desc: "Pour gobelets, équipements et vitrines." },
      { title: "Carte de Visite",            desc: "Pour les partenaires et annonceurs." },
      { title: "Dépliant / Flyer",           desc: "Support de communication et de promotion." },
      { title: "Bannière / Backdrop",        desc: "Idéal pour les événements et actions promotionnelles." },
      { title: "Uniforme Promoteur",         desc: "T-Shirt - Casquette pour promoteurs et équipe." },
      { title: "Autres Matériaux Suggérés",  desc: "Bracelet silicone, porte-clés, stylo, bloc-notes et autres articles." },
    ],
    cta: "Devenir Partenaire",
  },
  de: {
    heading: "Zubehör für Acquafy",
    products: [
      { title: "Exklusiver Becher",          desc: "Geschenk für Events und Aktivierungen" },
      { title: "T-Shirt",                    desc: "Standarduniform für Teams und Promoter" },
      { title: "Cap",                        desc: "Visuelle Identität für Außendienstteams." },
      { title: "Trinkflasche 750ml",         desc: "Praktisch, nachhaltig und ideal für Aktionen und Geschenke." },
      { title: "Tragetasche",               desc: "Für Kits, Geschenke und Werbematerialien." },
      { title: "Button (Brosche)",           desc: "Team-Promotion und Identifikation." },
      { title: "Aufkleber / Ticket",         desc: "Für Becher, Geräte und Schaufenster." },
      { title: "Visitenkarte",              desc: "Für Partner und Werbetreibende." },
      { title: "Flyer / Broschüre",         desc: "Material für Outreach und Promotion." },
      { title: "Banner / Backdrop",         desc: "Ideal für Events und Promotionsaktionen." },
      { title: "Promoter-Uniform",          desc: "T-Shirt - Cap für Promoter und Team." },
      { title: "Weitere empfohlene Artikel", desc: "Silikon-Armband, Schlüsselanhänger, Stift, Notizblock und weitere Artikel." },
    ],
    cta: "Partner werden",
  },
  it: {
    heading: "Accessori per Acquafy",
    products: [
      { title: "Bicchiere Esclusivo",        desc: "Omaggio per eventi e attivazioni" },
      { title: "T-Shirt",                    desc: "Uniforme standard per team e promoter" },
      { title: "Cappellino",                 desc: "Identità visiva per i team sul campo." },
      { title: "Borraccia da 750ml",         desc: "Pratica, sostenibile e ideale per azioni e omaggi." },
      { title: "Borsa",                      desc: "Per kit, omaggi e materiali promozionali." },
      { title: "Spilla (Brooch)",            desc: "Promozione e identificazione del team." },
      { title: "Adesivo / Ticket",           desc: "Per bicchieri, attrezzature e vetrine." },
      { title: "Biglietto da Visita",        desc: "Per partner e inserzionisti." },
      { title: "Volantino / Flyer",          desc: "Materiale per comunicazione e promozione." },
      { title: "Banner / Backdrop",          desc: "Ideale per eventi e azioni promozionali." },
      { title: "Uniforme Promoter",          desc: "T-Shirt - Cappellino per promoter e team." },
      { title: "Altri Materiali Suggeriti",  desc: "Braccialetto in silicone, portachiavi, penna, blocco note e altri articoli." },
    ],
    cta: "Diventa Partner",
  },
  zh: {
    heading: "Acquafy 配件",
    products: [
      { title: "专属杯子",         desc: "活动和推广的赠品" },
      { title: "T恤",              desc: "团队和促销员的标准制服" },
      { title: "棒球帽",            desc: "外勤团队的视觉识别。" },
      { title: "750ml 运动水壶",    desc: "实用、可持续，适合活动和礼品。" },
      { title: "手提袋",            desc: "用于套装、礼品和促销材料。" },
      { title: "徽章（别针）",      desc: "团队推广和识别。" },
      { title: "贴纸 / 票券",      desc: "适用于杯子、设备和橱窗。" },
      { title: "名片",              desc: "适合合作伙伴和广告商。" },
      { title: "传单 / Flyer",     desc: "外展和推广材料。" },
      { title: "横幅 / 背景板",     desc: "适合活动和促销活动。" },
      { title: "促销员制服",        desc: "T恤 - 帽子，适合促销员和团队。" },
      { title: "其他推荐材料",      desc: "硅胶手环、钥匙扣、笔、记事本及其他物品。" },
    ],
    cta: "成为合作伙伴",
  },
  ja: {
    heading: "Acquafy アクセサリー",
    products: [
      { title: "限定カップ",              desc: "イベントやプロモーション活動向けのギフト" },
      { title: "Tシャツ",                desc: "チームとプロモーター向けの標準ユニフォーム" },
      { title: "キャップ",               desc: "フィールドチームのビジュアルアイデンティティ。" },
      { title: "750ml ボトル",           desc: "実用的で持続可能、アクションやギフトに最適。" },
      { title: "トートバッグ",            desc: "キット、ギフト、プロモーション素材に。" },
      { title: "バッジ（ブローチ）",      desc: "チームのプロモーションと識別。" },
      { title: "ステッカー / チケット",   desc: "カップ、機器、ショーウィンドウに。" },
      { title: "名刺",                   desc: "パートナーと広告主向け。" },
      { title: "チラシ / フライヤー",     desc: "アウトリーチとプロモーション素材。" },
      { title: "バナー / バックドロップ",  desc: "イベントやプロモーション活動に最適。" },
      { title: "プロモーターユニフォーム", desc: "Tシャツ - プロモーターとチーム向けキャップ。" },
      { title: "その他おすすめアイテム",  desc: "シリコンブレスレット、キーホルダー、ペン、メモ帳など。" },
    ],
    cta: "パートナーになる",
  },
  ko: {
    heading: "Acquafy 액세서리",
    products: [
      { title: "전용 컵",              desc: "이벤트 및 활성화를 위한 선물" },
      { title: "티셔츠",               desc: "팀 및 프로모터를 위한 표준 유니폼" },
      { title: "캡",                   desc: "현장 팀의 시각적 아이덴티티." },
      { title: "750ml 물병",           desc: "실용적이고 지속 가능하며 활동 및 선물에 이상적." },
      { title: "토트백",               desc: "키트, 선물 및 판촉 자재용." },
      { title: "버튼 (브로치)",         desc: "팀 홍보 및 식별." },
      { title: "스티커 / 티켓",         desc: "컵, 장비 및 쇼윈도용." },
      { title: "명함",                 desc: "파트너 및 광고주용." },
      { title: "전단지 / 플라이어",     desc: "홍보 및 커뮤니케이션 자재." },
      { title: "배너 / 배경막",         desc: "이벤트 및 프로모션 활동에 이상적." },
      { title: "프로모터 유니폼",        desc: "티셔츠 - 프로모터와 팀을 위한 캡." },
      { title: "기타 추천 자재",         desc: "실리콘 팔찌, 열쇠고리, 펜, 메모장 및 기타 아이템." },
    ],
    cta: "파트너 되기",
  },
};

const imgPartner  = "/figma-assets/icon-partner-b.svg";

const imgCopo     = "/figma-assets/product-cup.webp";
const imgCamisa1C = "/figma-assets/product-camisa-1c-b.webp";
const imgCamisa1F = "/figma-assets/product-camisa-1f-a.webp";
const imgBone     = "/figma-assets/product-bone.webp";
const imgSqueeze  = "/figma-assets/product-squeeze-b.webp";
const imgSacola   = "/figma-assets/product-sacola-b.webp";
const imgBroche   = "/figma-assets/product-broche-b.webp";
const imgAdesivo  = "/figma-assets/product-sticker-b.webp";
const imgCard     = "/figma-assets/card-b.webp";
const imgFolheto  = "/figma-assets/image-folheto.webp";
const imgBackdrop = "/figma-assets/backdrop.webp";
const imgUniforme = "/figma-assets/product-uniforme.webp";
const imgDemais   = "/figma-assets/image-demais.webp";

type Img     = { src: string; aspectW: number; aspectH: number; overlap?: boolean };
type Product = { imgs: Img[]; title: string; desc: string };

const productImgs: Img[][] = [
  [{ src: imgCopo,     aspectW: 1156, aspectH: 1625 }],
  [{ src: imgCamisa1C, aspectW: 1610, aspectH: 1824, overlap: true }, { src: imgCamisa1F, aspectW: 1621, aspectH: 1755 }],
  [{ src: imgBone,     aspectW: 1670, aspectH: 1411 }],
  [{ src: imgSqueeze,  aspectW: 1446, aspectH: 1925 }],
  [{ src: imgSacola,   aspectW: 1972, aspectH: 2166 }],
  [{ src: imgBroche,   aspectW: 1628, aspectH: 1289 }],
  [{ src: imgAdesivo,  aspectW: 4096, aspectH: 2358 }],
  [{ src: imgCard,     aspectW: 2712, aspectH: 1626 }],
  [{ src: imgFolheto,  aspectW: 3359, aspectH: 4096 }],
  [{ src: imgBackdrop, aspectW: 2711, aspectH: 2273 }],
  [{ src: imgUniforme, aspectW: 4096, aspectH: 4096 }],
  [{ src: imgDemais,   aspectW: 3801, aspectH: 2806 }],
];

function ProductCard({ product }: { product: Product }) {
  const hasOverlap = product.imgs.length > 1 && product.imgs[0].overlap;
  return (
    <div className="bg-[#f6f9fe] flex flex-[1_0_0] gap-[20px] items-center min-h-[200px] min-w-[280px] overflow-hidden p-[5px] rounded-[16px]">
      {/* Image slot */}
      <div className="flex flex-1 items-center justify-center self-stretch max-w-[160px] min-w-[100px] relative overflow-hidden rounded-[12px]">
        {hasOverlap ? (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="relative z-0" style={{ width: "55%", aspectRatio: `${product.imgs[0].aspectW}/${product.imgs[0].aspectH}` }}>
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={product.imgs[0].src} />
            </div>
            <div className="relative z-10 -ml-[20%]" style={{ width: "55%", aspectRatio: `${product.imgs[1].aspectW}/${product.imgs[1].aspectH}` }}>
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={product.imgs[1].src} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative max-h-[160px] max-w-[140px] w-full" style={{ aspectRatio: `${product.imgs[0].aspectW}/${product.imgs[0].aspectH}` }}>
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={product.imgs[0].src} />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-[10px] items-start min-w-0 pr-[10px] py-[10px]">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[40px] w-full">
          {product.title}
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] w-full">
          {product.desc}
        </p>
      </div>
    </div>
  );
}

export default function ColecaoMediaNetwork() {
  const { lang } = useLang();
  const t = T[lang];
  const products: Product[] = productImgs.map((imgs, i) => ({
    imgs,
    title: t.products[i].title,
    desc: t.products[i].desc,
  }));
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex gap-[10px] items-center justify-between w-full flex-wrap">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] flex-1 min-w-[240px] text-center lg:text-left">
            <span className="text-[#1f2e91]">{t.heading}</span>
            {" "}
            <span className="text-[#0569ff]">Media Network</span>
          </h2>
        </div>

        {/* Product grid */}
        <div className="flex flex-wrap gap-[20px] items-start w-full">
          {products.map((p) => (
            <ProductCard key={p.title} product={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center w-full">
          <a href="/parceria" className="flex bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors gap-[10px] items-center justify-center h-[40px] overflow-hidden px-[20px] rounded-[8px] shrink-0 cursor-pointer">
            <FigmaIcon src={imgPartner} size={16} aspectW={41} aspectH={40} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              {t.cta}
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
