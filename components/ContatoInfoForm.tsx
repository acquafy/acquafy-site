"use client";

import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulBaseArrow } from "./ui/Buttons";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgLocal     = "/figma-assets/7fa577a3-29df-4b04-960c-1ec8b8f0b2bc.svg"; // 31.56×38    portrait
const imgMail      = "/figma-assets/29530df8-b9ae-4a2a-ad2e-0252d2e21f79.svg"; // 38×30.8     landscape
const imgPhone     = "/figma-assets/32a6f68d-b20c-4087-9c6d-4b88dd21ab20.svg"; // 37.99×38    sq
const imgGlobe     = "/figma-assets/9e125b07-e142-4b95-af65-cd8a7cb436d9.svg"; // 19×19       sq
const imgPessoas   = "/figma-assets/9cb3b0cd-c1de-41f5-a4b3-1272f0c3596b.svg"; // 38×35.24    landscape
const imgArrowDown = "/figma-assets/72341688-c02a-4f94-98be-fe0e7ea34dc6.svg"; // 10×6        landscape

const ASSUNTOS = [
  "Suporte técnico",
  "Parcerias",
  "Vendas",
  "Imprensa",
  "Distribuidores",
  "Outro",
];

// ── Contact info row ──────────────────────────────────────────────────────────
function InfoRow({
  icon, aspectW, aspectH, title, lines,
}: { icon: string; aspectW: number; aspectH: number; title: string; lines: string[] }) {
  return (
    <div className="flex gap-[16px] items-start py-[16px] border-b border-[#cbd0d4] last:border-b-0">
      <div className="shrink-0 mt-[2px]">
        <FigmaIcon src={icon} size={36} aspectW={aspectW} aspectH={aspectH} />
      </div>
      <div className="flex flex-col gap-[4px]">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#0233c3]">
          {title}
        </p>
        {lines.map((line, i) => (
          <p key={i} className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function ContatoInfoForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [aceito, setAceito] = useState(false);

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[60px] w-full">
      <div className="flex flex-wrap gap-[30px] items-start max-w-[1400px] w-full">

        {/* ── LEFT: Contact info ───────────────────────────────────────────── */}
        <div className="flex flex-[1_0_0] flex-col min-w-[280px] max-w-[440px] border border-[#cbd0d4] rounded-[16px] overflow-hidden">
          <div className="bg-[#f6f9fe] px-[28px] py-[20px] border-b border-[#cbd0d4]">
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[22px] leading-[28px] text-[#0233c3]">
              Neo Essentials
            </p>
          </div>

          <div className="flex flex-col px-[28px] py-[8px]">
            <InfoRow
              icon={imgLocal}   aspectW={31.56} aspectH={38}
              title="Sede Global"
              lines={["Orlando, Flórida, USA", "Acquafy Headquarters"]}
            />
            <InfoRow
              icon={imgMail}    aspectW={38}    aspectH={30.8}
              title="Email"
              lines={["contato@acquafy.com", "parcerias@acquafy.com"]}
            />
            <InfoRow
              icon={imgPhone}   aspectW={37.99} aspectH={38}
              title="Telefone / WhatsApp"
              lines={["+1 (407) 203-5669", "Segunda a Sexta, 8h às 18h (EST)"]}
            />
            <InfoRow
              icon={imgGlobe}   aspectW={19}    aspectH={19}
              title="Sede Global"
              lines={["Orlando, Flórida, USA", "Acquafy Headquarters"]}
            />
            <InfoRow
              icon={imgPessoas} aspectW={38}    aspectH={35.24}
              title="Sede Global"
              lines={["Orlando, Flórida, USA", "Acquafy Headquarters"]}
            />
          </div>
        </div>

        {/* ── RIGHT: Contact form ──────────────────────────────────────────── */}
        <div className="flex flex-[2_0_0] flex-col min-w-[300px] border border-[#cbd0d4] rounded-[16px] overflow-hidden">
          <div className="bg-[#f6f9fe] px-[28px] py-[20px] border-b border-[#cbd0d4]">
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[22px] leading-[28px] text-[#0233c3]">
              Envie uma mensagem
            </p>
          </div>

          <div className="flex flex-col gap-[20px] px-[28px] py-[28px]">
            {/* Nome + Email */}
            <div className="flex flex-wrap gap-[16px]">
              <div className="flex flex-[1_0_0] flex-col gap-[6px] min-w-[200px]">
                <label className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b]">
                  Nome completo<span className="text-[#0233c3]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="border border-[#cbd0d4] rounded-[8px] px-[14px] py-[12px] font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] placeholder:text-[#aab0b8] outline-none focus:border-[#0233c3] transition-colors"
                />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[6px] min-w-[200px]">
                <label className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b]">
                  E-mail<span className="text-[#0233c3]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-[#cbd0d4] rounded-[8px] px-[14px] py-[12px] font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] placeholder:text-[#aab0b8] outline-none focus:border-[#0233c3] transition-colors"
                />
              </div>
            </div>

            {/* Assunto */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b]">
                Assunto<span className="text-[#0233c3]">*</span>
              </label>
              <div className="relative">
                <select
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="w-full appearance-none border border-[#cbd0d4] rounded-[8px] px-[14px] py-[12px] font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] outline-none focus:border-[#0233c3] transition-colors bg-white cursor-pointer"
                >
                  <option value="" disabled>Selecione o assunto</option>
                  {ASSUNTOS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <FigmaIcon src={imgArrowDown} size={10} aspectW={10} aspectH={6} />
                </div>
              </div>
            </div>

            {/* Mensagem */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b]">
                Mensagem<span className="text-[#0233c3]">*</span>
              </label>
              <textarea
                placeholder="Como podemos ajudar você?"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={5}
                className="border border-[#cbd0d4] rounded-[8px] px-[14px] py-[12px] font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] placeholder:text-[#aab0b8] outline-none focus:border-[#0233c3] transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <BtnAzulBaseArrow className="w-full min-h-[50px] text-[16px]">
              Enviar mensagem
            </BtnAzulBaseArrow>

            {/* Privacy */}
            <div className="flex gap-[10px] items-center">
              <input
                type="checkbox"
                id="privacy"
                checked={aceito}
                onChange={(e) => setAceito(e.target.checked)}
                className="shrink-0 size-[16px] accent-[#0233c3] cursor-pointer"
              />
              <label
                htmlFor="privacy"
                className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[18px] text-[#2a2a2b] cursor-pointer"
              >
                Li e concordo com a{" "}
                <span className="text-[#0233c3] underline cursor-pointer">
                  Política de Privacidade
                </span>{" "}
                da Acquafy
              </label>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
