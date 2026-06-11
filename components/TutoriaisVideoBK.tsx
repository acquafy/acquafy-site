type Video = {
  // Para adicionar um vídeo real, substitua null pelo ID do YouTube (ex: "dQw4w9WgXcQ")
  videoId: string | null;
  titulo: string;
  desc: string;
  categoria: string;
  duracao: string;
};

const videos: Video[] = [
  { videoId: null, titulo: "Como instalar o purificador Neo",          desc: "Passo a passo completo de instalação.",          categoria: "Instalação", duracao: "8 min"  },
  { videoId: null, titulo: "Primeiros passos com o app Acquafy",       desc: "Configure e conecte seu dispositivo ao app.",    categoria: "App",        duracao: "5 min"  },
  { videoId: null, titulo: "Como trocar o filtro do purificador Neo",  desc: "Reposição simples e rápida do filtro.",          categoria: "Manutenção", duracao: "4 min"  },
  { videoId: null, titulo: "Acquafy Media: anuncie na tela",           desc: "Crie campanhas e monetize sua tela.",            categoria: "Media",      duracao: "10 min" },
  { videoId: null, titulo: "Parceria Acquafy: do Silver ao Platinum",  desc: "Como crescer na rede de parceiros Acquafy.",    categoria: "Parceria",   duracao: "12 min" },
  { videoId: null, titulo: "Tour completo pelo app e funcionalidades", desc: "Explore todos os recursos do ecossistema.",      categoria: "App",        duracao: "15 min" },
];

const catColors: Record<string, string> = {
  "Instalação": "#dfa727",
  "App":        "#0569ff",
  "Manutenção": "#36ae5c",
  "Media":      "#9f3df5",
  "Parceria":   "#1f2e91",
};

export default function TutoriaisVideoBK() {
  return (
    <section
      id="tutoriais-videos"
      className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]"
    >
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            Tutoriais e{" "}
            <span className="text-[#0569ff]">vídeos</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            Aprenda passo a passo com nossos tutoriais em vídeo no YouTube.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[24px] w-full">
          {videos.map((video) => {
            const catColor = catColors[video.categoria] ?? "#0233c3";
            return (
              <div
                key={video.titulo}
                className="bg-white rounded-[16px] overflow-hidden border border-[#e8edf5] flex flex-col"
              >
                {/* Video embed / Placeholder */}
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  {video.videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.titulo}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1f2e91] flex flex-col items-center justify-center gap-[14px]">
                      {/* YouTube-style play button */}
                      <div className="w-[62px] h-[44px] bg-[#ff0000] rounded-[12px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <polygon points="7,4 17,10 7,16" fill="white" />
                        </svg>
                      </div>
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] tracking-[0.08em] uppercase text-[rgba(255,255,255,0.4)]">
                        Em breve
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-[10px] p-[20px] flex-1">
                  <div className="flex gap-[8px] items-center">
                    <span
                      className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] leading-none px-[8px] py-[4px] rounded-full"
                      style={{ color: catColor, backgroundColor: catColor + "18" }}
                    >
                      {video.categoria}
                    </span>
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#999]">
                      {video.duracao}
                    </span>
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-[20px] text-[#1f2e91]">
                    {video.titulo}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#666] flex-1">
                    {video.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
