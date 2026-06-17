"use client";

import Link from "next/link";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulOutArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  cta: string;
  categories: { label: string }[];
  products: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Coleção de",
    heading2: "Acessórios Acquafy",
    cta: "Fale conosco e saiba mais",
    categories: [
      { label: "Camisas & Uniformes" },
      { label: "Copos & Canecas" },
      { label: "Garrafas & Squeezes" },
      { label: "Bonés & Brindes" },
      { label: "Eventos & Promoção" },
    ],
    products: [
      { title: "Camiseta",               desc: "Tecido premium, confortável e resistente com logo bordado." },
      { title: "Camiseta Polo",          desc: "Design elegante e profissional para sua equipe e parceiros." },
      { title: "Boné",                   desc: "Ajuste confortável e acabamento premium com logo bordado." },
      { title: "Copo de papel de 180ml", desc: "Ideal para eventos e ações promocionais." },
      { title: "Squeeze de 750ml",       desc: "Garrafa reutilizável com design premium." },
      { title: "Copo de vidro de 400ml", desc: "Design sofisticado e resistente." },
      { title: "Caneca de 350ml",        desc: "Cerâmica premium com logo estampado." },
      { title: "Sacola Premium",         desc: "Ideal para kits e ações promocionais." },
      { title: "Cordão / Crachá",        desc: "Personalizado com a identidade Acquafy." },
      { title: "Adesivo / Ticket",       desc: "Perfeito para copos, equipamentos e materiais." },
      { title: "Botton (Broche)",        desc: "Ideal para equipe e divulgação da marca." },
      { title: "Cartão de Visita",       desc: "Para parceiros e anunciantes." },
    ],
  },
  en: {
    heading1: "Collection of",
    heading2: "Acquafy Accessories",
    cta: "Talk to us and learn more",
    categories: [
      { label: "Shirts & Uniforms" },
      { label: "Cups & Mugs" },
      { label: "Bottles & Squeeze Bottles" },
      { label: "Caps & Promotional Items" },
      { label: "Events & Promotion" },
    ],
    products: [
      { title: "T-Shirt",               desc: "Premium fabric, comfortable and durable with embroidered logo." },
      { title: "Polo Shirt",            desc: "Elegant and professional design for your team and partners." },
      { title: "Cap",                   desc: "Comfortable fit and premium finish with embroidered logo." },
      { title: "180ml Paper Cup",       desc: "Ideal for events and promotional actions." },
      { title: "750ml Squeeze Bottle",  desc: "Reusable bottle with premium design." },
      { title: "400ml Glass Cup",       desc: "Sophisticated and durable design." },
      { title: "350ml Mug",             desc: "Premium ceramic with printed logo." },
      { title: "Premium Tote Bag",      desc: "Ideal for kits and promotional actions." },
      { title: "Lanyard / Badge",       desc: "Customized with the Acquafy identity." },
      { title: "Sticker / Ticket",      desc: "Perfect for cups, equipment and materials." },
      { title: "Button (Brooch)",       desc: "Ideal for team use and brand promotion." },
      { title: "Business Card",         desc: "For partners and advertisers." },
    ],
  },
  es: {
    heading1: "Colección de",
    heading2: "Accesorios Acquafy",
    cta: "Hable con nosotros y sepa más",
    categories: [
      { label: "Camisas & Uniformes" },
      { label: "Vasos & Tazas" },
      { label: "Botellas & Squeeze" },
      { label: "Gorras & Promocionales" },
      { label: "Eventos & Promoción" },
    ],
    products: [
      { title: "Camiseta",              desc: "Tela premium, cómoda y resistente con logo bordado." },
      { title: "Camiseta Polo",         desc: "Diseño elegante y profesional para su equipo y socios." },
      { title: "Gorra",                 desc: "Ajuste cómodo y acabado premium con logo bordado." },
      { title: "Vaso de papel de 180ml",desc: "Ideal para eventos y acciones promocionales." },
      { title: "Squeeze de 750ml",      desc: "Botella reutilizable con diseño premium." },
      { title: "Vaso de vidrio de 400ml", desc: "Diseño sofisticado y resistente." },
      { title: "Taza de 350ml",         desc: "Cerámica premium con logo estampado." },
      { title: "Bolsa Premium",         desc: "Ideal para kits y acciones promocionales." },
      { title: "Cordón / Credencial",   desc: "Personalizado con la identidad Acquafy." },
      { title: "Adhesivo / Ticket",     desc: "Perfecto para vasos, equipos y materiales." },
      { title: "Botón (Broche)",        desc: "Ideal para equipo y difusión de la marca." },
      { title: "Tarjeta de Visita",     desc: "Para socios y anunciantes." },
    ],
  },
};

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

const categoryBase = [
  { icon: imgIconCamisa,  iconBg: "#0569ff",  iconW: 649, iconH: 656 },
  { icon: imgIconCaneca,  iconBg: "#6e54ef",  iconW: 629, iconH: 514 },
  { icon: imgIconSqueeze, iconBg: "#36ae5c",  iconW: 320, iconH: 472 },
  { icon: imgIconBone,    iconBg: "#ffa920",  iconW: 560, iconH: 642 },
  { icon: imgIconStar,    iconBg: "#e240ba",  iconW: 30,  iconH: 29  },
];

type Product = {
  imgs: { src: string; aspectW: number; aspectH: number; overlap?: boolean }[];
  title: string;
  desc: string;
};

const productImgs: { imgs: Product["imgs"] }[] = [
  {
    imgs: [
      { src: imgCamisa1C, aspectW: 1610, aspectH: 1824, overlap: true },
      { src: imgCamisa1F, aspectW: 1621, aspectH: 1755 },
    ],
  },
  {
    imgs: [
      { src: imgPolo11,  aspectW: 2512, aspectH: 2938, overlap: true },
      { src: imgPolo1C1, aspectW: 2487, aspectH: 2938 },
    ],
  },
  { imgs: [{ src: imgBone11,    aspectW: 1670, aspectH: 1411 }] },
  { imgs: [{ src: imgCopoPapel, aspectW: 1156, aspectH: 1625 }] },
  { imgs: [{ src: imgSqueeze,   aspectW: 1446, aspectH: 1925 }] },
  { imgs: [{ src: imgCopoVidro, aspectW: 2048, aspectH: 2048 }] },
  { imgs: [{ src: imgCaneca,    aspectW: 1300, aspectH: 1300 }] },
  { imgs: [{ src: imgSacola,    aspectW: 1972, aspectH: 2166 }] },
  { imgs: [{ src: imgCracha,    aspectW: 1253, aspectH: 1600 }] },
  { imgs: [{ src: imgAdesivo,   aspectW: 4096, aspectH: 2358 }] },
  { imgs: [{ src: imgBroche,    aspectW: 1628, aspectH: 1289 }] },
  { imgs: [{ src: imgCard,      aspectW: 2712, aspectH: 1626 }] },
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
  const { lang } = useLang();
  const t = T[lang];

  const categories = categoryBase.map((base, i) => ({
    ...base,
    label: t.categories[i].label,
  }));

  const products: Product[] = productImgs.map((p, i) => ({
    ...p,
    title: t.products[i].title,
    desc:  t.products[i].desc,
  }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex gap-[10px] items-center justify-between w-full flex-wrap">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] flex-1 min-w-[240px] text-center lg:text-left">
            <span className="text-[#1f2e91]">{t.heading1}</span>
            {" "}
            <span className="text-[#0569ff]">{t.heading2}</span>
          </h2>
        </div>

        {/* Categories row */}
        <div className="bg-white flex flex-wrap items-center justify-center overflow-hidden p-[20px] rounded-[16px] w-full">
          <div className="flex flex-1 flex-wrap min-w-[240px]">
            {categories.map((cat, i) => (
              <div
                key={i}
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
          {products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center w-full">
          <Link href="/contato?assunto=Acess%C3%B3rios%20Acquafy">
            <BtnAzulOutArrow>{t.cta}</BtnAzulOutArrow>
          </Link>
        </div>

      </div>
    </section>
  );
}
