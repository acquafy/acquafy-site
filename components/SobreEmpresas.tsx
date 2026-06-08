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

const brands = [
  { src: imgInterfyLogo,     alt: "Interfy" },
  { src: imgEcofy,           alt: "Ecofy" },
  { src: imgInterfyShopping, alt: "Interfy Shopping" },
  { src: imgInnovecar,       alt: "Innovecar" },
  { src: imgNeoai,           alt: "NeoAI" },
  { src: imgProcessdoc,      alt: "Processdoc" },
  { src: imgAcquafy,         alt: "Acquafy" },
  { src: imgVisionfy,        alt: "Visionfy" },
  { src: imgMediafy,         alt: "Mediafy" },
  { src: imgDocsystem,       alt: "Docsystem" },
];

export default function SobreEmpresas() {
  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center w-full">
          Nossas Empresas e Marcas
        </h2>
        <div className="flex flex-wrap gap-[20px] items-center justify-center w-full">
          {brands.map((brand) => (
            <div
              key={brand.alt}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col items-center justify-center min-h-[130px] min-w-[220px] p-[40px] rounded-[16px]"
            >
              <img
                alt={brand.alt}
                className="w-full h-full max-h-[60px] object-contain"
                src={brand.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
