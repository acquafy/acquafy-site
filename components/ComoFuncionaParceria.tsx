"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgIconUser     = "/figma-assets/como-icon-user.svg";
const imgIconMobile   = "/figma-assets/como-icon-mobile.svg";
const imgIconLocation = "/figma-assets/como-icon-location.svg";
const imgIconScale    = "/figma-assets/como-icon-scale.svg";
const imgArrow        = "/figma-assets/como-arrow.svg";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  steps: { num: string; title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Como funciona o ",
    heading2: "Programa de Parceria Global",
    steps: [
      { num: "01", title: "Escolha seu nível", desc: "Selecione o modelo de parceria que melhor se encaixa no seu perfil e na sua estratégia." },
      { num: "02", title: "Receba estrutura digital", desc: "Acesso ao App, materiais, treinamentos, links, QR Codes e suporte multilíngue." },
      { num: "03", title: "Ative vendas mídia ou distribuição", desc: "Indique, opere o Acquafy Media ou distribua a linha Neo na sua região." },
      { num: "04", title: "Escale com a Plataforma Acquafy", desc: "Acompanhe resultados, expanda sua rede e cresça com o ecossistema global." },
    ],
  },
  "pt-pt": {
    heading1: "Como funciona o ",
    heading2: "Programa de Parceria Global",
    steps: [
      { num: "01", title: "Escolha o seu nível", desc: "Seleccione o modelo de parceria que melhor se adequa ao seu perfil e à sua estratégia." },
      { num: "02", title: "Receba estrutura digital", desc: "Acesso à App, materiais, formações, links, QR Codes e suporte multilingue." },
      { num: "03", title: "Active vendas de média ou distribuição", desc: "Indique, opere o Acquafy Media ou distribua a linha Neo na sua região." },
      { num: "04", title: "Escale com a Plataforma Acquafy", desc: "Acompanhe resultados, expanda a sua rede e cresça com o ecossistema global." },
    ],
  },
  en: {
    heading1: "How the ",
    heading2: "Global Partnership Program works",
    steps: [
      { num: "01", title: "Choose your level", desc: "Select the partnership model that best fits your profile and strategy." },
      { num: "02", title: "Receive digital structure", desc: "Access to the App, materials, training, links, QR Codes and multilingual support." },
      { num: "03", title: "Activate media sales or distribution", desc: "Refer, operate Acquafy Media or distribute the Neo line in your region." },
      { num: "04", title: "Scale with the Acquafy Platform", desc: "Track results, expand your network and grow with the global ecosystem." },
    ],
  },
  "en-gb": {
    heading1: "How the ",
    heading2: "Global Partnership Programme works",
    steps: [
      { num: "01", title: "Choose your level", desc: "Select the partnership model that best fits your profile and strategy." },
      { num: "02", title: "Receive digital structure", desc: "Access to the App, materials, training, links, QR Codes and multilingual support." },
      { num: "03", title: "Activate media sales or distribution", desc: "Refer, operate Acquafy Media or distribute the Neo line in your region." },
      { num: "04", title: "Scale with the Acquafy Platform", desc: "Track results, expand your network and grow with the global ecosystem." },
    ],
  },
  es: {
    heading1: "Cómo funciona el ",
    heading2: "Programa de Asociación Global",
    steps: [
      { num: "01", title: "Elige tu nivel", desc: "Selecciona el modelo de asociación que mejor se adapta a tu perfil y estrategia." },
      { num: "02", title: "Recibe estructura digital", desc: "Acceso a la App, materiales, entrenamientos, enlaces, QR Codes y soporte multilingüe." },
      { num: "03", title: "Activa ventas de medios o distribución", desc: "Indica, opera el Acquafy Media o distribuye la línea Neo en tu región." },
      { num: "04", title: "Escala con la Plataforma Acquafy", desc: "Monitorea resultados, expande tu red y crece con el ecosistema global." },
    ],
  },
  fr: {
    heading1: "Comment fonctionne le ",
    heading2: "Programme de Partenariat Mondial",
    steps: [
      { num: "01", title: "Choisissez votre niveau", desc: "Sélectionnez le modèle de partenariat qui correspond le mieux à votre profil et à votre stratégie." },
      { num: "02", title: "Recevez la structure digitale", desc: "Accès à l'App, aux supports, aux formations, aux liens, aux QR Codes et au support multilingue." },
      { num: "03", title: "Activez ventes médias ou distribution", desc: "Recommandez, opérez l'Acquafy Media ou distribuez la gamme Neo dans votre région." },
      { num: "04", title: "Évoluez avec la Plateforme Acquafy", desc: "Suivez vos résultats, développez votre réseau et grandissez avec l'écosystème mondial." },
    ],
  },
  de: {
    heading1: "So funktioniert das ",
    heading2: "Globale Partnerschaftsprogramm",
    steps: [
      { num: "01", title: "Wählen Sie Ihr Level", desc: "Wählen Sie das Partnerschaftsmodell, das am besten zu Ihrem Profil und Ihrer Strategie passt." },
      { num: "02", title: "Erhalten Sie digitale Struktur", desc: "Zugang zur App, Materialien, Schulungen, Links, QR-Codes und mehrsprachigem Support." },
      { num: "03", title: "Aktivieren Sie Medienverkauf oder Vertrieb", desc: "Empfehlen Sie, betreiben Sie Acquafy Media oder vertreiben Sie die Neo-Linie in Ihrer Region." },
      { num: "04", title: "Skalieren Sie mit der Acquafy-Plattform", desc: "Verfolgen Sie Ergebnisse, erweitern Sie Ihr Netzwerk und wachsen Sie mit dem globalen Ökosystem." },
    ],
  },
  it: {
    heading1: "Come funziona il ",
    heading2: "Programma di Partnership Globale",
    steps: [
      { num: "01", title: "Scegli il tuo livello", desc: "Seleziona il modello di partnership che meglio si adatta al tuo profilo e alla tua strategia." },
      { num: "02", title: "Ricevi la struttura digitale", desc: "Accesso all'App, materiali, formazione, link, QR Code e supporto multilingue." },
      { num: "03", title: "Attiva vendite media o distribuzione", desc: "Segnala, gestisci Acquafy Media o distribuisci la linea Neo nella tua regione." },
      { num: "04", title: "Scala con la Piattaforma Acquafy", desc: "Monitora i risultati, espandi la tua rete e cresci con l'ecosistema globale." },
    ],
  },
  zh: {
    heading1: "了解",
    heading2: "全球合作伙伴计划的运作方式",
    steps: [
      { num: "01", title: "选择您的级别", desc: "选择最适合您的资质和战略的合作模式。" },
      { num: "02", title: "获取数字化支持", desc: "访问应用程序、资料、培训、链接、二维码及多语言支持。" },
      { num: "03", title: "开启媒体销售或分销", desc: "推荐客户、运营 Acquafy Media 或在您的地区分销 Neo 系列产品。" },
      { num: "04", title: "借助 Acquafy 平台扩大规模", desc: "追踪业绩、拓展您的网络，与全球生态系统共同成长。" },
    ],
  },
  ja: {
    heading1: "",
    heading2: "グローバルパートナーシッププログラムの仕組み",
    steps: [
      { num: "01", title: "レベルを選択", desc: "あなたのプロフィールと戦略に最も合ったパートナーシップモデルをお選びください。" },
      { num: "02", title: "デジタル基盤を受け取る", desc: "アプリ、資料、トレーニング、リンク、QRコード、多言語サポートへのアクセスを提供します。" },
      { num: "03", title: "メディア販売または流通を開始", desc: "紹介、Acquafy Media の運営、またはお住まいの地域での Neo ラインの販売を行います。" },
      { num: "04", title: "Acquafy プラットフォームで拡大", desc: "成果を追跡し、ネットワークを拡大して、グローバルエコシステムとともに成長しましょう。" },
    ],
  },
  ko: {
    heading1: "",
    heading2: "글로벌 파트너십 프로그램 운영 방식",
    steps: [
      { num: "01", title: "레벨 선택", desc: "귀하의 프로필과 전략에 가장 적합한 파트너십 모델을 선택하세요." },
      { num: "02", title: "디지털 구조 제공", desc: "앱, 자료, 교육, 링크, QR 코드 및 다국어 지원에 액세스하세요." },
      { num: "03", title: "미디어 판매 또는 유통 활성화", desc: "추천, Acquafy Media 운영 또는 귀하의 지역에서 Neo 라인을 유통하세요." },
      { num: "04", title: "Acquafy 플랫폼으로 확장", desc: "결과를 추적하고, 네트워크를 확장하여 글로벌 생태계와 함께 성장하세요." },
    ],
  },
  sv: {
    heading1: "Hur ",
    heading2: "Globalt Partnerprogram fungerar",
    steps: [
      { num: "01", title: "Välj din nivå", desc: "Välj den partnerskapsmodell som bäst passar din profil och strategi." },
      { num: "02", title: "Ta emot digital struktur", desc: "Tillgång till appen, material, utbildningar, länkar, QR-koder och flerspråkig support." },
      { num: "03", title: "Aktivera medieförsäljning eller distribution", desc: "Rekommendera, driv Acquafy Media eller distribuera Neo-linjen i din region." },
      { num: "04", title: "Skala med Acquafy-plattformen", desc: "Följ resultaten, expandera ditt nätverk och väx med det globala ekosystemet." },
    ],
  },
  fi: {
    heading1: "Miten ",
    heading2: "Globaali kumppanuusohjelma toimii",
    steps: [
      { num: "01", title: "Valitse tasosi", desc: "Valitse kumppanuusmalli, joka sopii parhaiten profiiliisi ja strategiaasi." },
      { num: "02", title: "Vastaanota digitaalinen rakenne", desc: "Pääsy sovellukseen, materiaaleihin, koulutuksiin, linkkeihin, QR-koodeihin ja monikieliseen tukeen." },
      { num: "03", title: "Aktivoi mediamyynti tai jakelu", desc: "Suosittele, hallinnoi Acquafy Mediaa tai jaa Neo-linja alueellasi." },
      { num: "04", title: "Skaalaudu Acquafy-alustan avulla", desc: "Seuraa tuloksia, laajenna verkostoasi ja kasva globaalin ekosysteemin mukana." },
    ],
  },
  ru: {
    heading1: "Как работает ",
    heading2: "Глобальная партнерская программа",
    steps: [
      { num: "01", title: "Выберите свой уровень", desc: "Выберите модель партнерства, которая лучше всего соответствует вашему профилю и стратегии." },
      { num: "02", title: "Получите цифровую структуру", desc: "Доступ к приложению, материалам, обучению, ссылкам, QR-кодам и многоязычной поддержке." },
      { num: "03", title: "Активируйте медиапродажи или дистрибуцию", desc: "Рекомендуйте, управляйте Acquafy Media или распространяйте линейку Neo в вашем регионе." },
      { num: "04", title: "Масштабируйтесь с платформой Acquafy", desc: "Отслеживайте результаты, расширяйте сеть и развивайтесь вместе с глобальной экосистемой." },
    ],
  },
  ro: {
    heading1: "Cum functioneaza ",
    heading2: "Programul Global de Parteneriat",
    steps: [
      { num: "01", title: "Alege nivelul tau", desc: "Selecteaza modelul de parteneriat care se potriveste cel mai bine profilului si strategiei tale." },
      { num: "02", title: "Primeste structura digitala", desc: "Acces la aplicatie, materiale, traininguri, linkuri, coduri QR si suport multilingv." },
      { num: "03", title: "Activeaza vanzarile media sau distributia", desc: "Recomanda, opereaza Acquafy Media sau distribuie linia Neo in regiunea ta." },
      { num: "04", title: "Scalezi cu Platforma Acquafy", desc: "Urmareste rezultatele, extinde-ti reteaua si creste odata cu ecosistemul global." },
    ],
  },
  he: {
    heading1: "",
    heading2: "איך עובד תוכנית השותפות הגלובלית",
    steps: [
      { num: "01", title: "בחר את הרמה שלך", desc: "בחר את מודל השותפות המתאים ביותר לפרופיל ולאסטרטגיה שלך." },
      { num: "02", title: "קבל מבנה דיגיטלי", desc: "גישה לאפליקציה, חומרים, הדרכות, קישורים, קודי QR ותמיכה רב-לשונית." },
      { num: "03", title: "הפעל מכירות מדיה או הפצה", desc: "המלץ, הפעל את Acquafy Media או הפץ את קו Neo באזורך." },
      { num: "04", title: "הרחב עם פלטפורמת Acquafy", desc: "עקוב אחר התוצאות, הרחב את הרשת שלך וצמח עם המערכת האקולוגית הגלובלית." },
    ],
  },
};

const stepIcons = [imgIconUser, imgIconMobile, imgIconLocation, imgIconScale];

export default function ComoFuncionaParceria() {
  const { lang } = useLang();
  const t = T[lang];

  const steps = t.steps.map((s, i) => ({ ...s, icon: stepIcons[i] }));

  return (
    <section className="bg-white flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[28px] text-center min-w-[240px] w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[280px] p-[20px] relative rounded-[16px]"
            >
              {/* ícone + número do passo */}
              <div className="flex gap-[20px] items-center justify-center relative shrink-0 w-full">
                <div className="border border-[#cbd0d4] flex flex-col items-center justify-center p-[24px] rounded-full shrink-0 size-[100px]">
                  <img src={s.icon} alt="" className="size-[30px] object-contain shrink-0" />
                </div>
                <p className="-translate-y-1/2 absolute font-['Avenir_LT_Pro:85_Heavy'] leading-[50px] not-italic right-[48px] text-[40px] text-[#0569ff] top-[25px] translate-x-full whitespace-nowrap">
                  {s.num}
                </p>
              </div>

              {/* título */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[18px] leading-[22px] text-[#1f2e91] text-center shrink-0 w-full">
                {s.title}
              </p>

              {/* descrição */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] not-italic text-[16px] leading-[20px] text-[#333] text-center shrink-0 w-full">
                {s.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
