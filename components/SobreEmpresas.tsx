// ── Brand logo assets ─────────────────────────────────────────────────────────
const imgInterfyLogo     = "/figma-assets/bd9110e1-ac06-47eb-a48a-8682234c3894.svg";
const imgEcofy           = "/figma-assets/849a7fc9-549d-43f0-8f8a-8a3ff7fb9710.svg";
const imgInterfyShopping = "/figma-assets/e3bd4ef1-a407-479d-9d93-7c6db7bee94c.svg";
const imgInnovecar       = "/figma-assets/fe76d27c-f0b1-41a9-9a86-674d13d9eebe.png";
const imgNeoai           = "/figma-assets/47a8f03b-2420-4610-927d-5d5a5e8ea14d.png";
const imgProcessdoc      = "/figma-assets/c8675b13-e006-4dcf-9a10-e61d5badd14c.svg";
const imgAcquafy         = "/figma-assets/579d82c1-6fbc-47b4-9c8e-88bf85d88497.svg";
const imgVisionfy        = "/figma-assets/36342c57-5273-4e54-92f9-aedc28a06503.svg";
const imgMediafy         = "/figma-assets/0e0e8dbe-7491-4978-b806-395894d8be3f.svg";
const imgDocsystem       = "/figma-assets/f0d16cf6-8b97-4b0e-b30a-84936420f146.svg";

// ── Aspect ratios exatos do Figma (content bounds de cada logo) ───────────────
// Padrão: container w-full com aspect-ratio fixo + img absolute inset-0
const brands = [
  { src: imgInterfyLogo,     alt: "Interfy",          aw: 160,      ah: 40.193  },
  { src: imgEcofy,           alt: "Ecofy",             aw: 208.80,   ah: 54.581  },
  { src: imgInterfyShopping, alt: "Interfy Shopping",  aw: 215.542,  ah: 51.362  },
  { src: imgInnovecar,       alt: "Innovecar",         aw: 3040,     ah: 834     },
  { src: imgNeoai,           alt: "NeoAI",             aw: 180,      ah: 62.586  },
  { src: imgProcessdoc,      alt: "Processdoc",        aw: 219.673,  ah: 54.188  },
  { src: imgAcquafy,         alt: "Acquafy",           aw: 1133.861, ah: 237.877 },
  { src: imgVisionfy,        alt: "Visionfy",          aw: 219.536,  ah: 50.456  },
  { src: imgMediafy,         alt: "Mediafy",           aw: 206.800,  ah: 54.020  },
  { src: imgDocsystem,       alt: "Docsystem",         aw: 219.423,  ah: 55.768  },
];

export default function SobreEmpresas() {
  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          Nossas Empresas e Marcas
        </h2>

        <div className="flex flex-wrap gap-[20px] items-center justify-center w-full">
          {brands.map((brand) => (
            <div
              key={brand.alt}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col items-center justify-center min-h-[130px] min-w-[220px] p-[40px] rounded-[16px]"
            >
              {/* Container com aspect-ratio fixo do Figma — preenche a largura total do card */}
              <div
                className="relative shrink-0 w-full overflow-hidden"
                style={{ aspectRatio: `${brand.aw} / ${brand.ah}` }}
              >
                <img
                  alt={brand.alt}
                  className="absolute inset-0 w-full h-full"
                  src={brand.src}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
