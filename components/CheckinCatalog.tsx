"use client";

import Link from "next/link";
import { CHECKIN_FAMILIES } from "@/lib/checkin-products";
import { formatBRL } from "@/lib/products";

export default function CheckinCatalog() {
  return (
    <section className="w-full bg-white pt-[120px] pb-[100px] px-[24px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-[64px]">

        {/* Header */}
        <div className="flex flex-col gap-[10px] text-center">
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[40px] xl:text-[48px] leading-[1.1] text-[#1f2e91]">
            Escolha o seu purificador
          </h1>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[17px] text-[#6b7280]">
            Selecione o modelo ideal para a sua necessidade
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-[40px]">
          {CHECKIN_FAMILIES.map((family) => {
            const lowestPrice = Math.min(...family.variants.map((v) => v.price));
            const coverImg = family.variants[0].img;
            const accentGrad = family.isPremium
              ? "linear-gradient(135deg, #0233c3, #9f3df5)"
              : "linear-gradient(135deg, #0233c3, #0569ff)";

            return (
              <div
                key={family.slug}
                className="flex flex-col items-center gap-[16px]"
              >
                {/* Image */}
                <div className="w-full h-[160px] xl:h-[200px] flex items-center justify-center">
                  <img
                    src={coverImg}
                    alt={family.title}
                    className="max-h-[200px] max-w-[200px] w-auto object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col items-center gap-[4px] text-center">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[17px] text-[#1f2e91]">
                    {family.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#9ca3af]">
                    {family.subtitle}
                  </p>
                  <p
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] mt-[2px]"
                    style={{
                      background: accentGrad,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    A partir de {formatBRL(lowestPrice)}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={`/checkin/${family.slug}`}
                  className="h-[44px] px-[28px] rounded-[10px] flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-white transition-opacity hover:opacity-90"
                  style={{ background: accentGrad }}
                >
                  Comprar
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

