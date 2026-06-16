import Link from "next/link";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulOutArrow } from "./ui/Buttons";

// Category icons
const imgIconCamisa  = "/figma-assets/icon-camisa.svg";
const imgIconCaneca  = "/figma-assets/icon-caneca.svg";
const imgIconSqueeze = "/figma-assets/icon-squeeze.svg";
const imgIconBone    = "/figma-assets/icon-bone-item.svg";
const imgIconStar    = "/figma-assets/icon-star.svg";

// Product images
const imgCamisa1C = "/figma-assets/product-camisa-1c-a.webp";
const imgCamisa1F = "/figma-assets/product-camisa-1f-b.webp";
const imgPolo11   = "/figma-assets/product-polo-11.webp";
const imgPolo1C1  = "/figma-assets/product-polo-1c1.webp";
const imgBone11   = "/figma-assets/product-bone-11.webp";
const imgCopoPapel = "/figma-assets/product-paper-cup.webp";
const imgSqueeze   = "/figma-assets/product-squeeze-a.webp";
const imgCopoVidro = "/figma-assets/product-glass-cup.webp";
const imgCaneca    = "/figma-assets/product-caneca.webp";
const imgSacola    = "/figma-assets/product-sacola-a.webp";
const imgCracha    = "/figma-assets/product-cracha.webp";
const imgAdesivo   = "/figma-assets/product-sticker-a.webp";
const imgBroche    = "/figma-assets/product-broche-a.webp";
const imgCard      = "/figma-assets/card-a.webp";

const categories = [
  { icon: imgIconCamisa,  iconBg: "#0569ff",  iconW: 649, iconH: 656, label: "Camisas & Uniformes" },
  { icon: imgIconCaneca,  iconBg: "#6e54ef",  iconW: 629, iconH: 514, label: "Copos & Canecas" },
  { icon: imgIconSqueeze, iconBg: "#36ae5c",  iconW: 320, iconH: 472, label: "Garrafas & Squeezes" },
  { icon: imgIconBone,    iconBg: "#ffa920",  iconW: 560, iconH: 642, label: "Bonés & Brindes" },
  { icon: imgIconStar,    iconBg: "#e240ba",  iconW: 30,  iconH: 29,  label: "Eventos & Promoção" },
];

type Product = {
  imgs: { src: string; aspectW: number; aspectH: number; overlap?: boolean }[];
  title: string;
  desc: string;
};

const products: Product[] = [
  {
    imgs: [
      { src: imgCamisa1C, aspectW: 1610, aspectH: 1824, overlap: true },
      { src: imgCamisa1F, aspectW: 1621, aspectH: 1755 },
    ],
    title: "Camiseta",
    desc: "Tecido premium, confortável e resistente com logo bordado.",
  },
  {
    imgs: [
      { src: imgPolo11,  aspectW: 2512, aspectH: 2938, overlap: true },
      { src: imgPolo1C1, aspectW: 2487, aspectH: 2938 },
    ],
    title: "Camiseta Polo",
    desc: "Design elegante e profissional para sua equipe e parceiros.",
  },
  {
    imgs: [{ src: imgBone11, aspectW: 1670, aspectH: 1411 }],
    title: "Boné",
    desc: "Ajuste confortável e acabamento premium com logo bordado.",
  },
  {
    imgs: [{ src: imgCopoPapel, aspectW: 1156, aspectH: 1625 }],
    title: "Copo de papel de 180ml",
    desc: "Ideal para eventos e ações promocionais.",
  },
  {
    imgs: [{ src: imgSqueeze, aspectW: 1446, aspectH: 1925 }],
    title: "Squeeze de 750ml",
    desc: "Garrafa reutilizável com design premium.",
  },
  {
    imgs: [{ src: imgCopoVidro, aspectW: 2048, aspectH: 2048 }],
    title: "Copo de vidro de 400ml",
    desc: "Design sofisticado e resistente.",
  },
  {
    imgs: [{ src: imgCaneca, aspectW: 1300, aspectH: 1300 }],
    title: "Caneca de 350ml",
    desc: "Cerâmica premium com logo estampado.",
  },
  {
    imgs: [{ src: imgSacola, aspectW: 1972, aspectH: 2166 }],
    title: "Sacola Premium",
    desc: "Ideal para kits e ações promocionais.",
  },
  {
    imgs: [{ src: imgCracha, aspectW: 1253, aspectH: 1600 }],
    title: "Cordão / Crachá",
    desc: "Personalizado com a identidade Acquafy.",
  },
  {
    imgs: [{ src: imgAdesivo, aspectW: 4096, aspectH: 2358 }],
    title: "Adesivo / Ticket",
    desc: "Perfeito para copos, equipamentos e materiais.",
  },
  {
    imgs: [{ src: imgBroche, aspectW: 1628, aspectH: 1289 }],
    title: "Botton (Broche)",
    desc: "Ideal para equipe e divulgação da marca.",
  },
  {
    imgs: [{ src: imgCard, aspectW: 2712, aspectH: 1626 }],
    title: "Cartão de Visita",
    desc: "Para parceiros e anunciantes.",
  },
];

function ProductCard({ product }: { product: Product }) {
  const hasOverlap = product.imgs.length > 1 && product.imgs[0].overlap;
  return (
    <div className="bg-white flex flex-[1_0_0] gap-[20px] items-center min-h-[200px] min-w-[280px] overflow-hidden p-[5px] rounded-[16px]">
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
          <div className="flex items-center justify-center w-full h-full p-[10px]">
            <div className="relative max-h-[160px] max-w-[140px] w-full" style={{ aspectRatio: `${product.imgs[0].aspectW}/${product.imgs[0].aspectH}` }}>
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={product.imgs[0].src} />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col h-full items-start justify-between min-w-0 pr-[10px] py-[10px]">
        <div className="flex flex-col gap-[10px] items-start w-full">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[40px] w-full">
            {product.title}
          </p>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] w-full">
            {product.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ColecaoAcessorios() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex gap-[10px] items-center justify-between w-full flex-wrap">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] flex-1 min-w-[240px] text-center lg:text-left">
            <span className="text-[#1f2e91]">Coleção de</span>
            {" "}
            <span className="text-[#0569ff]">Acessórios Acquafy</span>
          </h2>
        </div>

        {/* Categories row */}
        <div className="bg-white flex flex-wrap items-center justify-center overflow-hidden p-[20px] rounded-[16px] w-full">
          <div className="flex flex-1 flex-wrap min-w-[240px]">
            {categories.map((cat, i) => (
              <div
                key={cat.label}
                className="flex flex-1 flex-col gap-[20px] items-center min-w-[180px] overflow-hidden p-[20px]"
              >
                <div className="flex flex-col items-center justify-center p-[15px] rounded-full shrink-0 size-[60px]" style={{ backgroundColor: cat.iconBg }}>
                  <FigmaIcon src={cat.icon} size={30} aspectW={cat.iconW} aspectH={cat.iconH} />
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center min-h-[50px] flex items-center w-full justify-center">
                  {cat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product cards grid */}
        <div className="flex flex-wrap gap-[20px] items-start w-full">
          {products.map((p) => (
            <ProductCard key={p.title} product={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center w-full">
          <Link href="/contato?assunto=Acess%C3%B3rios%20Acquafy">
            <BtnAzulOutArrow>Fale conosco e saiba mais</BtnAzulOutArrow>
          </Link>
        </div>

      </div>
    </section>
  );
}
