function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2v8M5.5 7.5L8 10l2.5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12v.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type DownloadFile = {
  nome: string;
  tipo: "PDF" | "ZIP" | "APP";
  tamanho: string;
  href: string;
};

type DownloadCategoria = {
  titulo: string;
  arquivos: DownloadFile[];
  scroll?: boolean;
};

const tipoBadge: Record<DownloadFile["tipo"], { bg: string; color: string }> = {
  PDF: { bg: "#fee2e2", color: "#b91c1c" },
  ZIP: { bg: "#e0e7ff", color: "#4338ca" },
  APP: { bg: "#dcfce7", color: "#15803d" },
};

const categorias: DownloadCategoria[] = [
  {
    titulo: "Manuais",
    scroll: true,
    arquivos: [
      { nome: "Manual do Usuário — Neo UP",       tipo: "PDF", tamanho: "7 MB",   href: "#" },
      { nome: "Manual do Usuário — Neo FIT",      tipo: "PDF", tamanho: "8 MB",   href: "#" },
      { nome: "Manual do Usuário — Neo SMART H₂", tipo: "PDF", tamanho: "9 MB",   href: "#" },
      { nome: "Manual do Usuário — Neo TOUCH",    tipo: "PDF", tamanho: "8 MB",   href: "#" },
      { nome: "Manual do Usuário — Neo PLUS",     tipo: "PDF", tamanho: "9 MB",   href: "#" },
      { nome: "Manual do Usuário — Neo ULTRA",    tipo: "PDF", tamanho: "10 MB",  href: "#" },
      { nome: "Manual do Usuário — Neo MAX",      tipo: "PDF", tamanho: "11 MB",  href: "#" },
    ],
  },
  {
    titulo: "Guias Rápidos",
    arquivos: [
      { nome: "Guia de Instalação Rápida",       tipo: "PDF", tamanho: "2 MB",  href: "#" },
      { nome: "Guia de Manutenção e Limpeza",    tipo: "PDF", tamanho: "3 MB",  href: "#" },
      { nome: "Primeiros Passos — App Acquafy",  tipo: "PDF", tamanho: "4 MB",  href: "#" },
      { nome: "Guia do Parceiro Acquafy",        tipo: "PDF", tamanho: "5 MB",  href: "#" },
      { nome: "Guia de Troca de Filtros",        tipo: "PDF", tamanho: "2 MB",  href: "#" },
    ],
  },
  {
    titulo: "Softwares",
    arquivos: [
      { nome: "App Acquafy — iOS",    tipo: "APP", tamanho: "App Store",  href: "#" },
      { nome: "App Acquafy — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
      { nome: "Firmware Neo v2.4.1",  tipo: "ZIP", tamanho: "15 MB",      href: "#" },
    ],
  },
  {
    titulo: "Documentos",
    arquivos: [
      { nome: "Ficha Técnica — Linha Neo",           tipo: "PDF", tamanho: "3 MB",   href: "#" },
      { nome: "Certificado de Conformidade",         tipo: "PDF", tamanho: "1 MB",   href: "#" },
      { nome: "Contrato Modelo de Parceria",         tipo: "PDF", tamanho: "2 MB",   href: "#" },
      { nome: "Política de Garantia Acquafy",        tipo: "PDF", tamanho: "1 MB",   href: "#" },
      { nome: "Declaração de Conformidade ANATEL",   tipo: "PDF", tamanho: "500 KB", href: "#" },
    ],
  },
];

export default function DownloadsBK() {
  return (
    <section
      id="downloads"
      className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]"
    >
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            Downloads
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            Manuais, guias, softwares e documentos disponíveis para download.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] w-full">
          {categorias.map((cat) => (
            <div
              key={cat.titulo}
              className="border border-[#e8edf5] rounded-[16px] overflow-hidden"
            >
              {/* Category header */}
              <div className="bg-[#f6f9fe] px-[20px] py-[14px] border-b border-[#e8edf5]">
                <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91]">
                  {cat.titulo}
                </h3>
              </div>

              {/* File list */}
              <ul className={`list-none m-0 p-0 divide-y divide-[#f0f3f9]${cat.scroll ? " max-h-[282px] overflow-y-auto" : ""}`}>
                {cat.arquivos.map((arquivo) => {
                  const badge = tipoBadge[arquivo.tipo];
                  return (
                    <li key={arquivo.nome}>
                      <a
                        href={arquivo.href}
                        className="group flex gap-[12px] items-center px-[20px] py-[14px] hover:bg-[#f6f9fe] transition-colors no-underline"
                      >
                        {/* Type badge */}
                        <span
                          className="shrink-0 font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-none px-[7px] py-[4px] rounded-[4px] w-[36px] text-center"
                          style={{ backgroundColor: badge.bg, color: badge.color }}
                        >
                          {arquivo.tipo}
                        </span>

                        {/* File name */}
                        <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#333] group-hover:text-[#0233c3] transition-colors flex-1 min-w-0">
                          {arquivo.nome}
                        </span>

                        {/* File size */}
                        <span className="shrink-0 font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#999] whitespace-nowrap">
                          {arquivo.tamanho}
                        </span>

                        {/* Download button */}
                        <div className="shrink-0 flex items-center justify-center size-[32px] rounded-[8px] bg-[#f0f4ff] group-hover:bg-[#0233c3] transition-colors text-[#0233c3] group-hover:text-white">
                          <IconDownload />
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
