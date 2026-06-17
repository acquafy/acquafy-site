"use client";

import { useLang, type Lang } from "@/context/LanguageContext";
import { PtOnlyGuard } from "@/components/PtOnlyGuard";

type Video = {
  // Para adicionar um vídeo real, substitua null pelo ID do YouTube (ex: "dQw4w9WgXcQ")
  videoId: string | null;
  titulo: string;
  desc: string;
  categoriaKey: string;
  duracao: string;
};

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  comingSoon: string;
  catLabels: Record<string, string>;
  videos: { titulo: string; desc: string; duracao: string }[];
}> = {
  pt: {
    heading1: "Tutoriais e",
    heading2: "vídeos",
    subtitle: "Aprenda passo a passo com nossos tutoriais em vídeo no YouTube.",
    comingSoon: "Em breve",
    catLabels: {
      instalacao: "Instalação",
      app:        "App",
      manutencao: "Manutenção",
      media:      "Media",
      parceria:   "Parceria",
    },
    videos: [
      { titulo: "Como instalar o purificador Neo",          desc: "Passo a passo completo de instalação.",          duracao: "8 min"  },
      { titulo: "Primeiros passos com o app Acquafy",       desc: "Configure e conecte seu dispositivo ao app.",    duracao: "5 min"  },
      { titulo: "Como trocar o filtro do purificador Neo",  desc: "Reposição simples e rápida do filtro.",          duracao: "4 min"  },
      { titulo: "Acquafy Media: anuncie na tela",           desc: "Crie campanhas e monetize sua tela.",            duracao: "10 min" },
      { titulo: "Parceria Acquafy: do Silver ao Platinum",  desc: "Como crescer na rede de parceiros Acquafy.",    duracao: "12 min" },
      { titulo: "Tour completo pelo app e funcionalidades", desc: "Explore todos os recursos do ecossistema.",      duracao: "15 min" },
    ],
  },
  en: {
    heading1: "Tutorials and",
    heading2: "videos",
    subtitle: "Learn step by step with our video tutorials on YouTube.",
    comingSoon: "Coming soon",
    catLabels: {
      instalacao: "Installation",
      app:        "App",
      manutencao: "Maintenance",
      media:      "Media",
      parceria:   "Partnership",
    },
    videos: [
      { titulo: "How to install the Neo purifier",          desc: "Complete step-by-step installation guide.",      duracao: "8 min"  },
      { titulo: "Getting started with the Acquafy app",     desc: "Set up and connect your device to the app.",     duracao: "5 min"  },
      { titulo: "How to replace the Neo purifier filter",   desc: "Simple and quick filter replacement.",           duracao: "4 min"  },
      { titulo: "Acquafy Media: advertise on the screen",   desc: "Create campaigns and monetize your screen.",     duracao: "10 min" },
      { titulo: "Acquafy Partnership: from Silver to Platinum", desc: "How to grow in the Acquafy partner network.", duracao: "12 min" },
      { titulo: "Full tour of the app and features",        desc: "Explore all resources in the ecosystem.",        duracao: "15 min" },
    ],
  },
  es: {
    heading1: "Tutoriales y",
    heading2: "videos",
    subtitle: "Aprende paso a paso con nuestros tutoriales en vídeo en YouTube.",
    comingSoon: "Próximamente",
    catLabels: {
      instalacao: "Instalación",
      app:        "App",
      manutencao: "Mantenimiento",
      media:      "Media",
      parceria:   "Asociación",
    },
    videos: [
      { titulo: "Cómo instalar el purificador Neo",              desc: "Guía completa de instalación paso a paso.",         duracao: "8 min"  },
      { titulo: "Primeros pasos con la app Acquafy",             desc: "Configura y conecta tu dispositivo a la app.",      duracao: "5 min"  },
      { titulo: "Cómo cambiar el filtro del purificador Neo",    desc: "Reemplazo simple y rápido del filtro.",             duracao: "4 min"  },
      { titulo: "Acquafy Media: anuncia en la pantalla",         desc: "Crea campañas y monetiza tu pantalla.",             duracao: "10 min" },
      { titulo: "Asociación Acquafy: de Silver a Platinum",      desc: "Cómo crecer en la red de socios Acquafy.",          duracao: "12 min" },
      { titulo: "Tour completo por la app y funcionalidades",    desc: "Explora todos los recursos del ecosistema.",        duracao: "15 min" },
    ],
  },
};

const videoCatKeys: string[] = [
  "instalacao",
  "app",
  "manutencao",
  "media",
  "parceria",
  "app",
];

const videoIds: (string | null)[] = [null, null, null, null, null, null];

const catColors: Record<string, string> = {
  instalacao: "#dfa727",
  app:        "#0569ff",
  manutencao: "#36ae5c",
  media:      "#9f3df5",
  parceria:   "#1f2e91",
};

const PT_ONLY_SUB = {
  en: "Our video tutorials are currently available in Portuguese only.",
  es: "Nuestros tutoriales en vídeo están disponibles actualmente solo en Portugués.",
};

export default function TutoriaisVideoBK() {
  const { lang } = useLang();
  const t = T[lang];

  const videos: Video[] = t.videos.map((v, i) => ({
    videoId: videoIds[i],
    titulo: v.titulo,
    desc: v.desc,
    categoriaKey: videoCatKeys[i],
    duracao: v.duracao,
  }));

  return (
    <PtOnlyGuard subtitle={PT_ONLY_SUB}>
    <section
      id="tutoriais-videos"
      className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]"
    >
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading1}{" "}
            <span className="text-[#0569ff]">{t.heading2}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[24px] w-full">
          {videos.map((video) => {
            const catColor = catColors[video.categoriaKey] ?? "#0233c3";
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
                        {t.comingSoon}
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
                      {t.catLabels[video.categoriaKey]}
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
    </PtOnlyGuard>
  );
}

