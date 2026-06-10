// â”€â”€ Product images â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const imgCopo     = "/figma-assets/e48f4053-5164-4c50-9628-8b18c5e4839d.png";
const imgCamisa1C = "/figma-assets/da733658-e071-4e5b-8c62-c809f890501e.png";
const imgCamisa1F = "/figma-assets/205829bb-6180-4a2b-968d-aa15c2974799.png";
const imgBone     = "/figma-assets/cfd118a1-31fa-4757-887e-6bd3a0f2285d.png";
const imgSqueeze  = "/figma-assets/e5bfb439-3d08-4d2f-aa91-385dec762f6c.png";
const imgSacola   = "/figma-assets/5da3a484-e07d-4721-bdb7-90ac2a917949.png";
const imgBroche   = "/figma-assets/bf223321-cb33-4232-b4a1-5844fad6510f.png";
const imgAdesivo  = "/figma-assets/2f0b6d29-00e1-44be-9ca6-e5c8152ba0bd.png";
const imgCard     = "/figma-assets/f7d07dff-1914-41e9-902e-bf2ce3055ca7.png";
const imgFolheto  = "/figma-assets/38890df3-72f7-40bf-92bd-ef1265dec194.png";
const imgBackdrop = "/figma-assets/c8375ee8-27e3-4b71-9d9d-276e4b0674dc.png";
const imgUniforme = "/figma-assets/e2586189-60fb-4f25-bb1a-f6def80b20f5.png";
const imgDemais   = "/figma-assets/a9d71019-dfd8-4ce4-8a92-af8c3970c951.png";

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
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] flex-1 min-w-[240px] text-center lg:text-left">
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

      </div>
    </section>
  );
}
