import FigmaIcon from "./FigmaIcon";

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

const products: Product[] = [
  { imgs: [{ src: imgCopo,     aspectW: 1156, aspectH: 1625 }],                                                                         title: "Copo Exclusivo",              desc: "Brinde para eventos e ativações" },
  { imgs: [{ src: imgCamisa1C, aspectW: 1610, aspectH: 1824, overlap: true }, { src: imgCamisa1F, aspectW: 1621, aspectH: 1755 }],       title: "Camiseta",                    desc: "Uniforme padrão para equipes e promotores" },
  { imgs: [{ src: imgBone,     aspectW: 1670, aspectH: 1411 }],                                                                         title: "Boné",                        desc: "Identidade visual para equipes de campo." },
  { imgs: [{ src: imgSqueeze,  aspectW: 1446, aspectH: 1925 }],                                                                         title: "Squeeze de 750ml",            desc: "Prático, sustentável e ideal para ações e brindes." },
  { imgs: [{ src: imgSacola,   aspectW: 1972, aspectH: 2166 }],                                                                         title: "Sacola",                      desc: "Para kits, brindes e materiais promocionais." },
  { imgs: [{ src: imgBroche,   aspectW: 1628, aspectH: 1289 }],                                                                         title: "Botton (Broche)",             desc: "Divulgação e identificação da equipe." },
  { imgs: [{ src: imgAdesivo,  aspectW: 4096, aspectH: 2358 }],                                                                         title: "Adesivo / Ticket",            desc: "Para copos, equipamentos e vitrines." },
  { imgs: [{ src: imgCard,     aspectW: 2712, aspectH: 1626 }],                                                                         title: "Cartão de Visita",            desc: "Para parceiros e anunciantes." },
  { imgs: [{ src: imgFolheto,  aspectW: 3359, aspectH: 4096 }],                                                                         title: "Folheto / Flyer",             desc: "Material para abordagem e divulgação." },
  { imgs: [{ src: imgBackdrop, aspectW: 2711, aspectH: 2273 }],                                                                         title: "Banner / Backdrop",           desc: "Ideal para eventos e ações promocionais." },
  { imgs: [{ src: imgUniforme, aspectW: 4096, aspectH: 4096 }],                                                                         title: "Uniforme Promotor",           desc: "Camiseta - Boné para promotores e equipe." },
  { imgs: [{ src: imgDemais,   aspectW: 3801, aspectH: 2806 }],                                                                         title: "Outros Materiais Sugeridos",  desc: "Pulseira de silicone, chaveiro, caneta, bloco e outros itens." },
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
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex gap-[10px] items-center justify-between w-full flex-wrap">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] flex-1 min-w-[240px] text-center lg:text-left">
            <span className="text-[#1f2e91]">Acessórios para Acquafy</span>
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
              Seja um Parceiro
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
