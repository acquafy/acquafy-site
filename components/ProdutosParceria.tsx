import type { ReactNode } from "react";

// Linha Essencial (Neo UP → Neo PLUS)
const imgNeoUp    = "/figma-assets/e23fc740-275e-4c85-84f9-36e147e4c7f6.png";
const imgNeoFit   = "/figma-assets/44f74064-36a2-4ed8-b19d-c0e125bc3613.png";
const imgNeoSmart = "/figma-assets/f4783269-9b05-4929-bf94-55ac43a2db0d.png";
const imgNeoTouch = "/figma-assets/47309acf-e189-4002-8325-6d14513ce62c.png";
const imgNeoPlus  = "/figma-assets/5a009cbe-c107-4867-a67d-45542361d091.png";

// Linha Neo Premium
const imgNeoUltra        = "/figma-assets/a025ff9c-7a77-4fe2-a711-958c47093626.png";
const imgNeoUltraSpark   = "/figma-assets/e36daeb8-1e75-4c4b-93b8-ca391bf2e8a7.png";
const imgNeoUltraSparkH2 = "/figma-assets/b42e0357-4339-485b-beb0-42e50b358494.png";
const imgNeoMax          = "/figma-assets/cc9a0b6d-03ca-4c7c-a920-aa35796f2249.png";
const imgNeoMaxSpark     = "/figma-assets/d2240635-3424-47d9-a264-6631fb173f63.png";
const imgNeoMaxSparkH2   = "/figma-assets/74bed368-254c-4522-ba2c-4798b2fb22ab.png";

// Acquafy Media
const imgMedia = "/figma-assets/2a11885b-0370-4a5b-8555-d39958426998.png";

type Product = { img: string; name: ReactNode; imgW: number; imgH: number };

const essencial: Product[] = [
  { img: imgNeoUp,    name: "Neo UP",                                           imgW: 3275, imgH: 4096 },
  { img: imgNeoFit,   name: "Neo FIT",                                          imgW: 3275, imgH: 4096 },
  { img: imgNeoSmart, name: <span>Neo SMART H<sup>2</sup></span>,               imgW: 3275, imgH: 4096 },
  { img: imgNeoTouch, name: "Neo TOUCH",                                        imgW: 3384, imgH: 4096 },
  { img: imgNeoPlus,  name: "Neo PLUS",                                         imgW: 3384, imgH: 4096 },
];

const premium: Product[] = [
  { img: imgNeoUltra,        name: "Neo ULTRA",                                        imgW: 3772, imgH: 4096 },
  { img: imgNeoUltraSpark,   name: "Neo ULTRA SPARK",                                  imgW: 3772, imgH: 4096 },
  { img: imgNeoUltraSparkH2, name: <span>Neo ULTRA SPARK H<sup>2</sup></span>,         imgW: 3772, imgH: 4096 },
  { img: imgNeoMax,          name: "Neo MAX",                                          imgW: 1515, imgH: 4012 },
  { img: imgNeoMaxSpark,     name: "Neo MAX SPARK",                                    imgW: 1515, imgH: 4012 },
  { img: imgNeoMaxSparkH2,   name: <span>Neo MAX SPARK H<sup>2</sup></span>,           imgW: 1515, imgH: 4012 },
];

function ProductItem({ p }: { p: Product }) {
  const ratio = p.imgW / p.imgH;
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center shrink-0">
      <div className="relative shrink-0" style={{ width: 80, height: 80 }}>
        <div className="relative w-full h-full">
          <img
            src={p.img}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
            style={{ aspectRatio: `${p.imgW}/${p.imgH}` }}
          />
        </div>
      </div>
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[19px] text-center bg-clip-text text-transparent max-w-[120px]"
         style={{ backgroundImage: "linear-gradient(to right, #0233c3, #0569ff)" }}>
        {p.name}
      </p>
    </div>
  );
}

export default function ProdutosParceria() {
  return (
    <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {"Produtos para cada "}
          <span className="text-[#0569ff]">modelo de parceria</span>
        </h2>

        <div className="flex flex-col gap-[40px] w-full">
          {/* Linha Essencial */}
          <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-start p-[20px] rounded-[16px] w-full">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91]">
              Linha Essencial
            </p>
            <div className="flex flex-wrap gap-[20px] items-start justify-start w-full overflow-x-auto">
              {essencial.map((p, i) => <ProductItem key={i} p={p} />)}
            </div>
          </div>

          {/* Linha Neo Premium + Acquafy Media */}
          <div className="flex flex-wrap gap-[20px] items-start w-full">
            {/* Linha Neo Premium */}
            <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[300px] p-[20px] rounded-[16px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91]">
                Linha Neo Premium
              </p>
              <div className="flex flex-wrap gap-[20px] items-start justify-start w-full overflow-x-auto">
                {premium.map((p, i) => <ProductItem key={i} p={p} />)}
              </div>
            </div>

            {/* Acquafy Media */}
            <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-start min-w-[240px] p-[20px] rounded-[16px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91]">
                Acquafy Media
              </p>
              <div className="relative w-full max-w-[260px]" style={{ aspectRatio: "3/4" }}>
                <img
                  src={imgMedia}
                  alt="Acquafy Media"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
