"use client";

import Link from "next/link";
import { CHECKIN_FAMILIES, type CheckinFamily, type CheckinVariant } from "@/lib/checkin-products";

function getFamily(slug: string): CheckinFamily {
  return CHECKIN_FAMILIES.find((f) => f.slug === slug)!;
}

const BLUE_GRAD   = "linear-gradient(90deg, #0233c3, #0569ff)";
const PURPLE_GRAD = "linear-gradient(90deg, #0233c3, #9f3df5)";

function ProductCard({ variant, family }: { variant: CheckinVariant; family: CheckinFamily }) {
  const grad       = family.isPremium ? PURPLE_GRAD : BLUE_GRAD;
  const nameColor  = family.isPremium ? "#6e0cc3" : "#0233c3";

  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[310px] min-w-[160px] overflow-hidden p-[20px] rounded-[12px]">
      <div className="w-full h-[180px] shrink-0">
        <img
          alt=""
          className="w-full h-full object-contain pointer-events-none"
          src={variant.img}
        />
      </div>
      <p
        className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-center w-full min-h-[44px] flex items-center justify-center"
        style={{ color: nameColor }}
      >
        {variant.name}
      </p>
      <Link
        href={`/buy/checkin-${family.slug}`}
        className="flex items-center justify-center min-h-[40px] px-[10px] py-[8px] rounded-[8px] w-full shrink-0 font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white hover:opacity-90 active:opacity-80 transition-opacity mt-auto"
        style={{ backgroundImage: grad }}
      >
        Comprar
      </Link>
    </div>
  );
}

function ProductRow({ families }: { families: CheckinFamily[] }) {
  const items = families.flatMap((f) => f.variants.map((v) => ({ variant: v, family: f })));
  return (
    <div className="flex flex-wrap gap-[15px] items-stretch justify-center w-full">
      {items.map(({ variant, family }) => (
        <ProductCard key={variant.id} variant={variant} family={family} />
      ))}
    </div>
  );
}

function ProductGrid5({ families }: { families: CheckinFamily[] }) {
  const items = families.flatMap((f) => f.variants.map((v) => ({ variant: v, family: f })));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[15px] w-full">
      {items.map(({ variant, family }) => (
        <ProductCard key={variant.id} variant={variant} family={family} />
      ))}
    </div>
  );
}

export default function CheckinCatalog() {
  const neoUp         = getFamily("neo-up");
  const neoEssentials = getFamily("neo-essentials");
  const neoUltra      = getFamily("neo-ultra");
  const neoMax        = getFamily("neo-max");
  const neoInfinity   = getFamily("neo-infinity");
  const neoPrestige   = getFamily("neo-prestige");
  const neoPrime      = getFamily("neo-prime");
  const acquafyMedia  = getFamily("acquafy-media");

  return (
    <section className="w-full bg-white pt-[120px] pb-[100px] px-[20px]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-[40px]">

        {/* Header */}
        <div className="flex flex-col gap-[10px] text-center">
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[40px] xl:text-[48px] leading-[1.1] text-[#1f2e91]">
            Escolha o seu purificador
          </h1>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[17px] text-[#6b7280]">
            Selecione o modelo ideal para a sua necessidade
          </p>
        </div>

        {/* Neo Essentials */}
        <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-center justify-center p-[20px] rounded-[16px] w-full">
          <ProductRow families={[neoUp, neoEssentials]} />
          <ProductRow families={[neoUltra, neoMax]} />
        </div>

        {/* Neo Premium */}
        <div className="bg-[#f6f9fe] p-[20px] rounded-[16px] w-full">
          <ProductGrid5 families={[acquafyMedia, neoInfinity, neoPrestige, neoPrime]} />
        </div>

      </div>
    </section>
  );
}
