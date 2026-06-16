const imgArrow = "/figma-assets/icon-arrow-c.svg";

type FilterCard = {
  num: string;
  title: string;
  desc: string;
  highlight?: boolean;
  gradient?: boolean;
};

const premium: FilterCard[] = [
  {
    num: "01",
    title: "PPF - Polypropilene Filter",
    desc: "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira.",
  },
  {
    num: "02",
    title: "ACF - Anti-Scale Activated Block Carbon Filter",
    desc: "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira.",
  },
  {
    num: "03",
    title: "ROF - Reverse Osmose Filter",
    desc: "Sistema que produz água com 99% de pureza (livre de vírus e bactérias com até 0,5 microns), foi desenvolvido para atender pessoas que queiram ou necessitem do consumo de uma água extremamente pura.",
    highlight: true,
    gradient: true,
  },
  {
    num: "04",
    title: "AAF - Alkaline Antioxidant Filter",
    desc: "Ele ajusta a faixa de pH da água, torna a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogênio",
  },
];

function FilterCard({ card, isLast }: { card: FilterCard; isLast: boolean }) {
  const isGrad = card.highlight && card.gradient;

  return (
    <div
      className={`flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-[210px] min-w-[200px] px-[20px] py-[25px] relative rounded-[16px] bg-[#f6f9fe]${card.highlight ? " border-2 border-[#0233c3]" : ""}`}
    >
      <div className="flex gap-[10px] items-center w-full shrink-0">
        <div
          className="flex flex-col items-center justify-center rounded-full shrink-0 size-[40px]"
          style={isGrad ? { backgroundImage: "linear-gradient(94deg, #0233c3 6.19%, #9f3df5 93.35%)" } : { backgroundColor: "#1f2e91" }}
        >
          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white text-center">{card.num}</span>
        </div>
        <p
          className={`font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] flex-1 min-w-0${isGrad ? " bg-clip-text text-transparent" : " text-[#1f2e91]"}`}
          style={isGrad ? { backgroundImage: "linear-gradient(147deg, #0233c3 6.19%, #9f3df5 93.35%)" } : undefined}
        >
          {card.title}
        </p>
      </div>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] flex-1 w-full">{card.desc}</p>
      {!isLast && (
        <div className="absolute -right-[10px] top-1/2 -translate-y-1/2 w-[10px] h-0 pointer-events-none">
          <div className="absolute" style={{ inset: "-7.36px -10% -7.36px 0" }}>
            <img alt="" className="block max-w-none size-full" src={imgArrow} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function FiltrosPremium() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2
          className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent text-center w-full"
          style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
        >
          Linha Premium - Sistema de Filtração de Alta Performance
        </h2>
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {premium.map((c, i) => (
            <FilterCard key={i} card={c} isLast={i === premium.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
