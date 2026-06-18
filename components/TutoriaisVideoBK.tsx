"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

type Video = {
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
      { titulo: "How to install the Neo purifier",              desc: "Complete step-by-step installation guide.",       duracao: "8 min"  },
      { titulo: "Getting started with the Acquafy app",         desc: "Set up and connect your device to the app.",      duracao: "5 min"  },
      { titulo: "How to replace the Neo purifier filter",       desc: "Simple and quick filter replacement.",            duracao: "4 min"  },
      { titulo: "Acquafy Media: advertise on the screen",       desc: "Create campaigns and monetize your screen.",      duracao: "10 min" },
      { titulo: "Acquafy Partnership: from Silver to Platinum", desc: "How to grow in the Acquafy partner network.",     duracao: "12 min" },
      { titulo: "Full tour of the app and features",            desc: "Explore all resources in the ecosystem.",         duracao: "15 min" },
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
  fr: {
    heading1: "Tutoriels et",
    heading2: "vidéos",
    subtitle: "Apprenez étape par étape avec nos tutoriels vidéo sur YouTube.",
    comingSoon: "Bientôt disponible",
    catLabels: {
      instalacao: "Installation",
      app:        "Application",
      manutencao: "Maintenance",
      media:      "Media",
      parceria:   "Partenariat",
    },
    videos: [
      { titulo: "Comment installer le purificateur Neo",              desc: "Guide complet d'installation étape par étape.",       duracao: "8 min"  },
      { titulo: "Premiers pas avec l'application Acquafy",            desc: "Configurez et connectez votre appareil à l'application.", duracao: "5 min"  },
      { titulo: "Comment remplacer le filtre du purificateur Neo",    desc: "Remplacement simple et rapide du filtre.",             duracao: "4 min"  },
      { titulo: "Acquafy Media : annoncez sur l'écran",               desc: "Créez des campagnes et monétisez votre écran.",        duracao: "10 min" },
      { titulo: "Partenariat Acquafy : de Silver à Platinum",         desc: "Comment progresser dans le réseau de partenaires Acquafy.", duracao: "12 min" },
      { titulo: "Visite complète de l'application et ses fonctionnalités", desc: "Explorez toutes les ressources de l'écosystème.", duracao: "15 min" },
    ],
  },
  de: {
    heading1: "Tutorials und",
    heading2: "Videos",
    subtitle: "Lernen Sie Schritt für Schritt mit unseren Video-Tutorials auf YouTube.",
    comingSoon: "Demnächst verfügbar",
    catLabels: {
      instalacao: "Installation",
      app:        "App",
      manutencao: "Wartung",
      media:      "Media",
      parceria:   "Partnerschaft",
    },
    videos: [
      { titulo: "So installieren Sie den Neo-Wasserreiniger",     desc: "Vollständige Schritt-für-Schritt-Installationsanleitung.", duracao: "8 min"  },
      { titulo: "Erste Schritte mit der Acquafy App",             desc: "Gerät einrichten und mit der App verbinden.",          duracao: "5 min"  },
      { titulo: "So ersetzen Sie den Filter des Neo-Reinigers",   desc: "Einfacher und schneller Filteraustausch.",             duracao: "4 min"  },
      { titulo: "Acquafy Media: Werbung auf dem Bildschirm",      desc: "Kampagnen erstellen und Bildschirm monetarisieren.",   duracao: "10 min" },
      { titulo: "Acquafy-Partnerschaft: von Silver bis Platinum", desc: "So wachsen Sie im Acquafy-Partnernetzwerk.",           duracao: "12 min" },
      { titulo: "Vollständige Tour durch App und Funktionen",     desc: "Alle Ressourcen des Ökosystems erkunden.",             duracao: "15 min" },
    ],
  },
  it: {
    heading1: "Tutorial e",
    heading2: "video",
    subtitle: "Impara passo dopo passo con i nostri tutorial video su YouTube.",
    comingSoon: "Prossimamente",
    catLabels: {
      instalacao: "Installazione",
      app:        "App",
      manutencao: "Manutenzione",
      media:      "Media",
      parceria:   "Partnership",
    },
    videos: [
      { titulo: "Come installare il purificatore Neo",              desc: "Guida completa all'installazione passo dopo passo.", duracao: "8 min"  },
      { titulo: "Primi passi con l'app Acquafy",                    desc: "Configura e collega il tuo dispositivo all'app.",    duracao: "5 min"  },
      { titulo: "Come sostituire il filtro del purificatore Neo",   desc: "Sostituzione del filtro semplice e rapida.",         duracao: "4 min"  },
      { titulo: "Acquafy Media: pubblicizza sullo schermo",         desc: "Crea campagne e monetizza il tuo schermo.",          duracao: "10 min" },
      { titulo: "Partnership Acquafy: da Silver a Platinum",        desc: "Come crescere nella rete di partner Acquafy.",       duracao: "12 min" },
      { titulo: "Tour completo dell'app e delle funzionalità",      desc: "Esplora tutte le risorse dell'ecosistema.",          duracao: "15 min" },
    ],
  },
  zh: {
    heading1: "教程与",
    heading2: "视频",
    subtitle: "通过我们在 YouTube 上的视频教程逐步学习。",
    comingSoon: "即将推出",
    catLabels: {
      instalacao: "安装",
      app:        "应用",
      manutencao: "维护",
      media:      "Media",
      parceria:   "合作伙伴",
    },
    videos: [
      { titulo: "如何安装 Neo 净水器",                          desc: "完整的逐步安装演练。",             duracao: "8 min"  },
      { titulo: "Acquafy 应用入门",                            desc: "设置并将您的设备连接到应用。",      duracao: "5 min"  },
      { titulo: "如何更换 Neo 净水器滤芯",                      desc: "简单快速的滤芯更换。",             duracao: "4 min"  },
      { titulo: "Acquafy Media：在屏幕上投放广告",              desc: "创建广告活动并实现屏幕变现。",      duracao: "10 min" },
      { titulo: "Acquafy 合作伙伴计划：从 Silver 到 Platinum",  desc: "如何在 Acquafy 合作伙伴网络中成长。", duracao: "12 min" },
      { titulo: "应用与功能完整导览",                          desc: "探索生态系统的所有资源。",          duracao: "15 min" },
    ],
  },
  ja: {
    heading1: "チュートリアルと",
    heading2: "動画",
    subtitle: "YouTube の動画チュートリアルでステップごとに学びましょう。",
    comingSoon: "近日公開",
    catLabels: {
      instalacao: "設置",
      app:        "アプリ",
      manutencao: "メンテナンス",
      media:      "Media",
      parceria:   "パートナーシップ",
    },
    videos: [
      { titulo: "Neo 浄水器の設置方法",                           desc: "完全なステップバイステップのインストールガイド。", duracao: "8 min"  },
      { titulo: "Acquafy アプリを使い始める",                     desc: "デバイスをセットアップしてアプリに接続します。", duracao: "5 min"  },
      { titulo: "Neo 浄水器フィルターの交換方法",                  desc: "簡単で素早いフィルター交換。",                 duracao: "4 min"  },
      { titulo: "Acquafy Media：画面に広告を掲載",                desc: "キャンペーンを作成し、画面を収益化します。",    duracao: "10 min" },
      { titulo: "Acquafy パートナーシップ：Silver から Platinum へ", desc: "Acquafy パートナーネットワークで成長する方法。", duracao: "12 min" },
      { titulo: "アプリと機能の完全ツアー",                       desc: "エコシステムのすべてのリソースを探索します。",  duracao: "15 min" },
    ],
  },
  ko: {
    heading1: "튜토리얼 및",
    heading2: "동영상",
    subtitle: "YouTube의 동영상 튜토리얼로 단계별로 배워보세요.",
    comingSoon: "출시 예정",
    catLabels: {
      instalacao: "설치",
      app:        "앱",
      manutencao: "유지보수",
      media:      "Media",
      parceria:   "파트너십",
    },
    videos: [
      { titulo: "Neo 정수기 설치 방법",                              desc: "완전한 단계별 설치 안내.",                    duracao: "8 min"  },
      { titulo: "Acquafy 앱 시작하기",                              desc: "기기를 설정하고 앱에 연결합니다.",             duracao: "5 min"  },
      { titulo: "Neo 정수기 필터 교체 방법",                         desc: "간단하고 빠른 필터 교체.",                    duracao: "4 min"  },
      { titulo: "Acquafy Media: 화면에 광고하기",                    desc: "캠페인을 만들고 화면을 수익화하세요.",         duracao: "10 min" },
      { titulo: "Acquafy 파트너십: Silver에서 Platinum까지",         desc: "Acquafy 파트너 네트워크에서 성장하는 방법.",   duracao: "12 min" },
      { titulo: "앱 및 기능 전체 둘러보기",                          desc: "에코시스템의 모든 리소스를 탐색하세요.",       duracao: "15 min" },
    ],
  },

  "pt-pt": {
    heading1: "Tutoriais e",
    heading2: "vídeos",
    subtitle: "Aprenda passo a passo com os nossos tutoriais em vídeo no YouTube.",
    comingSoon: "Em breve",
    catLabels: {
      instalacao: "Instalação",
      app:        "App",
      manutencao: "Manutenção",
      media:      "Media",
      parceria:   "Parceria",
    },
    videos: [
      { titulo: "Como instalar o purificador Neo",          desc: "Passo a passo completo de instalação.",               duracao: "8 min"  },
      { titulo: "Primeiros passos com a aplicação Acquafy", desc: "Configure e ligue o seu dispositivo à aplicação.",    duracao: "5 min"  },
      { titulo: "Como trocar o filtro do purificador Neo",  desc: "Substituição simples e rápida do filtro.",            duracao: "4 min"  },
      { titulo: "Acquafy Media: anuncie no ecrã",           desc: "Crie campanhas e monetize o seu ecrã.",              duracao: "10 min" },
      { titulo: "Parceria Acquafy: do Silver ao Platinum",  desc: "Como crescer na rede de parceiros Acquafy.",         duracao: "12 min" },
      { titulo: "Tour completo pela aplicação e funcionalidades", desc: "Explore todos os recursos do ecossistema.",     duracao: "15 min" },
    ],
  },
};

const videoCatKeys: string[] = ["instalacao", "app", "manutencao", "media", "parceria", "app"];
const videoIds: (string | null)[] = [null, null, null, null, null, null];
const catColors: Record<string, string> = {
  instalacao: "#dfa727",
  app:        "#0569ff",
  manutencao: "#36ae5c",
  media:      "#9f3df5",
  parceria:   "#1f2e91",
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
    <section
      id="tutoriais-videos"
      className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]"
    >
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading1}{" "}
            <span className="text-[#0569ff]">{t.heading2}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[24px] w-full">
          {videos.map((video) => {
            const catColor = catColors[video.categoriaKey] ?? "#0233c3";
            return (
              <div
                key={video.titulo}
                className="bg-white rounded-[16px] overflow-hidden border border-[#e8edf5] flex flex-col"
              >
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
  );
}
