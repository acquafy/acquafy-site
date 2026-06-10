import FigmaIcon from "./FigmaIcon";

const imgPanel = "/figma-assets/4e6b8a1f-cde5-4362-bb86-960a54dd56c3.png";
const imgHomeMob = "/figma-assets/dc018212-75b4-4bfb-8453-a2918a035342.png"; // Acquafy AI app screenshot
const imgAppView = "/figma-assets/91df8984-0d8f-450d-9282-c33ab6e90584.png";
const imgCheckin = "/figma-assets/6e980cf7-5c09-4a14-8503-ec31deee8e89.svg"; // 30×30 sq, inset -5.36%
const imgWifi = "/figma-assets/b80097cb-1bf0-4bdb-b383-e091e3b69fcb.svg";
const imgBluetooth = "/figma-assets/d37a36f4-919f-4d4c-80c4-66382ea5540f.svg";

/**
 * CardImage — altura limitada a 220px, largura auto pelo aspect-ratio.
 *
 * Problema anterior: object-cover + container portrait (ex: 271/500) preenchia
 * a largura e cortava topo/baixo do smartphone.
 *
 * Solução: container h-[220px] max-w-[170px] + img object-contain.
 *   - Portrait (phone): max-h=220 → width = 220 × 271/500 ≈ 119px  ✓ sem corte
 *   - Landscape (panel): max-w=170 → height = 170 × 2265/4096 ≈ 94px ✓ sem corte
 */
function CardImage({ src }: { src: string; outerAspect?: string; innerAspect?: string }) {
  return (
    <div className="flex items-center justify-center h-[220px] max-w-[170px] overflow-hidden relative shrink-0">
      <img
        alt=""
        className="max-h-full max-w-full object-contain pointer-events-none"
        src={src}
      />
    </div>
  );
}

export default function Features() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-wrap gap-[10px] items-stretch justify-center max-w-[1400px] overflow-hidden w-full">

        {/* Card 1 – Painel LED Touch */}
        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
          <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[200px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] w-full">
              <span className="text-[#0569ff]">Painel LED </span>
              <span className="text-[#1f2e91]">Touch Inteligente</span>
            </p>
            <div className="flex flex-wrap gap-[20px] items-center min-h-[210px] w-full shrink-0">
              <CardImage src={imgPanel} outerAspect="4096/2265" />
              <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[210px]">
                <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                  {[
                    "Contagem regressiva de 365 dias até a troca dos filtros",
                    "Relógio digital e data",
                    "Status da água em tempo real",
                    "Comunicação total com o App + IA",
                    "Alertas Inteligentes",
                  ].map((check, i) => (
                    <div key={i} className="flex gap-[10px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={14} />
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#2a2a2b] flex-1 min-w-0">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 – Acquafy AI no App */}
        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
          <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[200px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#0569ff] w-full">
              Acquafy AI no App
            </p>
            <div className="flex flex-wrap gap-[20px] items-center min-h-[210px] w-full shrink-0">
              <CardImage src={imgHomeMob} outerAspect="1970/3639" innerAspect="271/500" />
              <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[210px]">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  Inteligência artificial que aprende, analisa e cuida da sua água.
                </p>
                <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                  {[
                    "Suporte inteligente 24/7",
                    "Alertas de filtros",
                    "Recomendações personalizadas",
                    "Análise do consumo e hidratação",
                    "Monitoramento do equipamento",
                    "Experiência conectada com IA",
                  ].map((check, i) => (
                    <div key={i} className="flex gap-[10px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={14} />
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#2a2a2b] flex-1 min-w-0">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 – Controle pelo App */}
        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
          <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[200px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#0569ff] w-full">
              Controle tudo pelo App Acquafy
            </p>
            <div className="flex flex-wrap gap-[20px] items-center min-h-[210px] w-full shrink-0">
              <CardImage src={imgAppView} outerAspect="1970/3639" />
              <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[210px]">
                <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                  {[
                    "Vida útil dos filtros",
                    "Dispositivos conectados",
                    "Suporte rápido e direto",
                    "Operação global",
                    "Multi Idioma",
                  ].map((check, i) => (
                    <div key={i} className="flex gap-[10px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={14} />
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#2a2a2b] flex-1 min-w-0">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Connectivity badges */}
                <div className="flex gap-[10px] items-center w-full shrink-0">
                  <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[5px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
                    <FigmaIcon src={imgWifi} size={12} aspectW={13.5} aspectH={9.5} />
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[9px] leading-[11px] text-[#0233c3] whitespace-nowrap">
                      WiFi 5
                    </span>
                  </div>
                  <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[5px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
                    <FigmaIcon src={imgBluetooth} size={12} aspectW={10} aspectH={15} />
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[9px] leading-[11px] text-[#0233c3] whitespace-nowrap">
                      Bluetooth 5.3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
