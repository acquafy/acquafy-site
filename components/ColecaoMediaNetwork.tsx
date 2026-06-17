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
