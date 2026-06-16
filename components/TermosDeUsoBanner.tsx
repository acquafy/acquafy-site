export default function TermosDeUsoBanner() {
  return (
    <section
      className="flex flex-col items-center justify-center overflow-hidden px-[20px] pt-[80px] pb-[60px] w-full"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f1fb 100%)" }}
    >
      <div className="flex flex-col gap-[20px] items-center max-w-[800px] w-full text-center">
        {/* Badge */}
        <div className="flex items-center justify-center">
          <span
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#0569ff] px-[16px] py-[8px] rounded-full border border-[#0569ff]/30"
            style={{ background: "rgba(5,105,255,0.08)" }}
          >
            Informações Legais
          </span>
        </div>

        <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[48px] leading-[56px] text-[#2a2a2b] mob:text-[32px] mob:leading-[40px]">
          Termos de{" "}
          <span className="text-[#0569ff]">Uso</span>
        </h1>

        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[28px] text-[#555] max-w-[620px]">
          Leia com atenção os termos e condições que regem o uso do nosso site
          e dos nossos produtos e serviços.
        </p>

        {/* Última atualização */}
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#888]">
          Última atualização: 16 de junho de 2026
        </p>
      </div>
    </section>
  );
}
