"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ─── Countdown ──────────────────────────────────────────────────────────── */
function useCountdown(startSeconds = 600) {
  const [secs, setSecs] = useState(startSeconds);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* ─── Brazilian states ───────────────────────────────────────────────────── */
const BR_STATES = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
];

/* ─── Products ───────────────────────────────────────────────────────────── */
type Product = {
  id: string;
  img: string;
  name: string;
  sub: string;
  tank: string;
  price: number;
  badge?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "neo-fit",
    img: "/figma-assets/44f74064-36a2-4ed8-b19d-c0e125bc3613.png",
    name: "Neo FIT",
    sub: "6 em 1",
    tank: "Tanque 400 ml",
    price: 1990,
  },
  {
    id: "neo-smart",
    img: "/figma-assets/f4783269-9b05-4929-bf94-55ac43a2db0d.png",
    name: "Neo SMART H₂",
    sub: "7 em 1 + Hidrogenada",
    tank: "Tanque interno",
    price: 2490,
  },
  {
    id: "neo-touch",
    img: "/figma-assets/47309acf-e189-4002-8325-6d14513ce62c.png",
    name: "Neo TOUCH",
    sub: "6 em 1",
    tank: "Tanque 800 ml",
    price: 2990,
  },
  {
    id: "neo-plus",
    img: "/figma-assets/5a009cbe-c107-4867-a67d-45542361d091.png",
    name: "Neo PLUS",
    sub: "6 em 1",
    tank: "Tanque 1500 ml",
    price: 3490,
    badge: "Mais Vendido",
  },
  {
    id: "neo-ultra",
    img: "/figma-assets/a025ff9c-7a77-4fe2-a711-958c47093626.png",
    name: "Neo ULTRA",
    sub: "6 em 1",
    tank: "Tanque 3L",
    price: 3990,
  },
  {
    id: "neo-ultra-spark",
    img: "/figma-assets/e36daeb8-1e75-4c4b-93b8-ca391bf2e8a7.png",
    name: "Neo ULTRA SPARK",
    sub: "7 em 1 + Gás",
    tank: "Tanque 3L",
    price: 4490,
  },
  {
    id: "neo-max",
    img: "/figma-assets/cc9a0b6d-03ca-4c7c-a920-aa35796f2249.png",
    name: "Neo MAX",
    sub: "6 em 1",
    tank: "Tanque 3L",
    price: 4990,
  },
  {
    id: "neo-infinity",
    img: "/figma-assets/22fda6d3-1ea3-48aa-b26b-bd92fc65d286.png",
    name: "Neo INFINITY",
    sub: "6 em 1 · Painel IPS 15.6″",
    tank: "Tanque 3L",
    price: 6990,
    badge: "Premium",
  },
  {
    id: "neo-prestige",
    img: "/figma-assets/9d959c11-3d1b-4ee6-a012-3ae5ba6e218d.png",
    name: "Neo PRESTIGE",
    sub: "6 em 1 · Aço inox",
    tank: "Tanque 3L",
    price: 7990,
    badge: "Premium",
  },
  {
    id: "neo-prime",
    img: "/figma-assets/1286c1c8-ee96-4d96-9d75-9804a8992a0f.png",
    name: "Neo PRIME",
    sub: "6 em 1 · Top de linha",
    tank: "Tanque 3L",
    price: 8990,
    badge: "Premium",
  },
];

/* ─── Upsell ─────────────────────────────────────────────────────────────── */
const FILTER_KIT = {
  name: "Kit de Filtros Premium (1 ano)",
  desc: "Garanta 12 meses de água pura sem se preocupar com reposição.",
  price: 390,
  originalPrice: 590,
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatBRL(cents: number) {
  return `R$ ${(cents).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

/* ─── Step badge ─────────────────────────────────────────────────────────── */
function StepBadge({ n }: { n: number }) {
  return (
    <div className="w-[50px] h-[50px] rounded-full bg-[#0233c3] flex items-center justify-center shrink-0">
      <span className="text-[22px] font-['Avenir_LT_Pro:95_Black'] text-white leading-none">{n}</span>
    </div>
  );
}

/* ─── Form field ─────────────────────────────────────────────────────────── */
function FormField({
  id, label, placeholder, type = "text", required = false,
  error, value, onChange, children,
}: {
  id?: string; label: string; placeholder?: string; type?: string;
  required?: boolean; error?: string; value?: string;
  onChange?: (val: string) => void; children?: React.ReactNode;
}) {
  return (
    <div id={id} className="flex flex-col gap-[10px] w-full">
      <div className="flex gap-[6px] items-center">
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-[#333]">{label}</span>
        {required && <span className="text-[#dc2626] text-[14px]">*</span>}
      </div>
      {children ?? (
        <div className={`border rounded-[12px] px-[16px] py-[14px] w-full transition-colors ${error ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"}`}>
          <input
            type={type}
            placeholder={placeholder}
            value={value ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full text-[16px] text-[#333] placeholder:text-[#aab2bc] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']"
          />
        </div>
      )}
      {error && <p className="text-[13px] text-[#dc2626]">{error}</p>}
    </div>
  );
}

/* ─── Stars ──────────────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex gap-[4px]">
      {[0,1,2,3,4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#dfa727">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function CheckinMain() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [done, setDone] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filterKitAdded, setFilterKitAdded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | "boleto">("card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const timer = useCountdown(600);

  const [form, setForm] = useState({
    nome: "", email: "", telefone: "",
    cep: "", rua: "", numero: "", complemento: "",
    bairro: "", cidade: "", uf: "",
    cardNumber: "", expiry: "", cvc: "", nameOnCard: "",
  });

  useEffect(() => { setMounted(true); }, []);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome completo é obrigatório";
    if (!form.email.trim()) errs.email = "E-mail é obrigatório";
    if (!form.telefone.trim()) errs.telefone = "Telefone é obrigatório";
    if (!form.cep.trim()) errs.cep = "CEP é obrigatório";
    if (!form.rua.trim()) errs.rua = "Rua é obrigatória";
    if (!form.numero.trim()) errs.numero = "Número é obrigatório";
    if (!form.bairro.trim()) errs.bairro = "Bairro é obrigatório";
    if (!form.cidade.trim()) errs.cidade = "Cidade é obrigatória";
    if (!form.uf) errs.uf = "Estado é obrigatório";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstId = Object.keys(errs)[0];
      document.getElementById(firstId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (paymentMethod !== "card") return true;
    const errs: Record<string, string> = {};
    if (!form.cardNumber.trim()) errs.cardNumber = "Número do cartão é obrigatório";
    if (!form.expiry.trim()) errs.expiry = "Validade é obrigatória";
    if (!form.cvc.trim()) errs.cvc = "CVV é obrigatório";
    if (!form.nameOnCard.trim()) errs.nameOnCard = "Nome no cartão é obrigatório";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstId = Object.keys(errs)[0];
      document.getElementById(firstId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const grandTotal = (selectedProduct?.price ?? 0) + (filterKitAdded ? FILTER_KIT.price : 0);

  const STEPS = ["Modelo", "Dados", "Adicional", "Pagamento"];

  if (!mounted) return null;

  /* ── Success ─────────────────────────────────────────────────────────── */
  if (done) {
    return (
      <section className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-[24px] px-5 py-20 text-center">
        <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <p className="font-['Avenir_LT_Pro:95_Black'] text-[28px] text-[#1f2e91] leading-tight">Pedido confirmado!</p>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#555] mt-2 max-w-[420px] mx-auto leading-relaxed">
            Obrigado pela sua compra. Um e-mail de confirmação será enviado para{" "}
            <strong className="font-['Avenir_LT_Pro:85_Heavy']">{form.email || "seu e-mail"}</strong>.
          </p>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-white font-['Avenir_LT_Pro:85_Heavy'] text-[16px] px-8 py-3 rounded-[12px] transition-colors" style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
          ← Voltar ao site
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f6f9fe] py-[40px] px-5">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-[24px]">

        {/* ── Logo strip ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-[12px]">
          <img src="/figma-assets/5f557cfc-a356-4769-81a9-8e85ecc5ebdf.svg" alt="Acquafy" className="h-[32px] w-auto" />
          <div className="flex items-center gap-[8px] bg-white border border-[#0233c3] rounded-full px-[16px] py-[8px]">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <rect x="1" y="6" width="12" height="9" rx="2" stroke="#0233c3" strokeWidth="1.5"/>
              <path d="M4 6V4.5a3 3 0 0 1 6 0V6" stroke="#0233c3" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3]">CHECKIN SEGURO</span>
          </div>
        </div>

        {/* ── Step bar ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap bg-white rounded-[16px] overflow-hidden border border-[#e8ecf4]">
          {STEPS.map((label, i) => {
            const n = (i + 1) as 1 | 2 | 3 | 4;
            const isActive = step === n;
            const isDone = step > n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => { if (isDone) { setStep(n); setErrors({}); } }}
                className={`flex-[1_0_0] min-w-[80px] flex flex-col items-center gap-[8px] py-[16px] border-b-[3px] transition-colors ${isActive || isDone ? "border-[#0233c3]" : "border-transparent"}`}
              >
                <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors ${isActive ? "bg-[#0233c3]" : isDone ? "bg-[#36ae5c]" : "bg-[#e8ecf4]"}`}>
                  {isDone ? (
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <path d="M1 6l4.5 4.5L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span className={`text-[16px] font-['Avenir_LT_Pro:95_Black'] leading-none ${isActive ? "text-white" : "text-[#aab2bc]"}`}>{n}</span>
                  )}
                </div>
                <span className={`text-[13px] font-['Avenir_LT_Pro:85_Heavy'] ${isActive || isDone ? "text-[#333]" : "text-[#aab2bc]"}`}>{label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Two-column layout ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-[24px] items-start">

          {/* ══ LEFT COLUMN ════════════════════════════════════════════════ */}
          <div className="flex-[1_0_0] min-w-[300px] flex flex-col gap-[20px]">

            {/* ────────────── STEP 1: ESCOLHA O MODELO ─────────────────── */}
            {step === 1 && (
              <>
                <div className="bg-white border border-[#e8ecf4] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={1} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">Escolha o seu modelo</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">Selecione o purificador ideal para você.</p>
                    </div>
                  </div>

                  <div className="grid gap-[16px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
                    {PRODUCTS.map((p) => {
                      const sel = selectedProduct?.id === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedProduct(p)}
                          className={`relative flex flex-col items-center gap-[8px] p-[16px] rounded-[16px] border-2 transition-all text-left ${sel ? "border-[#0233c3] bg-[#f0f4ff]" : "border-[#e8ecf4] bg-white hover:border-[#0569ff]"}`}
                        >
                          {p.badge && (
                            <span className={`absolute top-[10px] right-[10px] text-[10px] font-['Avenir_LT_Pro:85_Heavy'] px-[8px] py-[4px] rounded-full text-white ${p.badge === "Mais Vendido" ? "bg-[#36ae5c]" : "bg-[#9f3df5]"}`}>
                              {p.badge}
                            </span>
                          )}
                          {sel && (
                            <div className="absolute top-[10px] left-[10px] w-[22px] h-[22px] rounded-full bg-[#0233c3] flex items-center justify-center">
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                          <img src={p.img} alt={p.name} className="h-[120px] w-auto object-contain" />
                          <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-center leading-tight w-full ${sel ? "text-[#0233c3]" : "text-[#1f2e91]"}`}>{p.name}</p>
                          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#777] text-center w-full">{p.sub}</p>
                          <p className="font-['Avenir_LT_Pro:95_Black'] text-[16px] text-[#0233c3] text-center w-full">{formatBRL(p.price)}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {!selectedProduct && (
                  <p className="text-[14px] text-[#dc2626] font-['Avenir_LT_Pro:55_Roman'] text-center">Selecione um modelo para continuar.</p>
                )}

                <button
                  type="button"
                  disabled={!selectedProduct}
                  onClick={() => { if (selectedProduct) setStep(2); }}
                  className={`w-full h-[56px] rounded-[12px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white transition-all ${selectedProduct ? "hover:opacity-90" : "opacity-40 cursor-not-allowed"}`}
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
                >
                  CONTINUAR →
                </button>
              </>
            )}

            {/* ────────────── STEP 2: DADOS DE ENTREGA ─────────────────── */}
            {step === 2 && (
              <>
                {/* Dados pessoais */}
                <div className="bg-white border border-[#e8ecf4] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={2} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">Dados pessoais</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">Usaremos estas informações para enviar o seu pedido.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <FormField id="nome" label="Nome completo" placeholder="Seu nome completo" required error={errors.nome} value={form.nome} onChange={(v) => updateField("nome", v)} />
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[1_0_0] min-w-[200px]">
                        <FormField id="email" label="E-mail" placeholder="seuemail@email.com" type="email" required error={errors.email} value={form.email} onChange={(v) => updateField("email", v)} />
                      </div>
                      <div className="flex-[1_0_0] min-w-[160px]">
                        <FormField id="telefone" label="Telefone / WhatsApp" placeholder="(11) 99999-9999" type="tel" required error={errors.telefone} value={form.telefone} onChange={(v) => updateField("telefone", v)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="bg-white border border-[#e8ecf4] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#1f2e91]">Endereço de entrega</p>
                  <div className="flex flex-col gap-[16px]">
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[1_0_0] min-w-[160px]">
                        <FormField id="cep" label="CEP" placeholder="00000-000" required error={errors.cep} value={form.cep} onChange={(v) => updateField("cep", v)} />
                      </div>
                      <div className="flex-[2_0_0] min-w-[220px]">
                        <FormField id="rua" label="Rua / Avenida" placeholder="Rua das Águas Claras" required error={errors.rua} value={form.rua} onChange={(v) => updateField("rua", v)} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[1_0_0] min-w-[100px]">
                        <FormField id="numero" label="Número" placeholder="123" required error={errors.numero} value={form.numero} onChange={(v) => updateField("numero", v)} />
                      </div>
                      <div className="flex-[2_0_0] min-w-[200px]">
                        <FormField id="complemento" label="Complemento" placeholder="Apto, sala, bloco..." value={form.complemento} onChange={(v) => updateField("complemento", v)} />
                      </div>
                    </div>
                    <FormField id="bairro" label="Bairro" placeholder="Seu bairro" required error={errors.bairro} value={form.bairro} onChange={(v) => updateField("bairro", v)} />
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[2_0_0] min-w-[180px]">
                        <FormField id="cidade" label="Cidade" placeholder="Sua cidade" required error={errors.cidade} value={form.cidade} onChange={(v) => updateField("cidade", v)} />
                      </div>
                      <div className="flex-[1_0_0] min-w-[120px]">
                        <FormField id="uf" label="Estado" required error={errors.uf}>
                          <div className={`border rounded-[12px] px-[16px] py-[14px] w-full transition-colors ${errors.uf ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"}`}>
                            <select
                              value={form.uf}
                              onChange={(e) => updateField("uf", e.target.value)}
                              className="w-full text-[16px] text-[#333] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']"
                            >
                              <option value="">UF</option>
                              {BR_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </FormField>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { if (validateStep2()) setStep(3); }}
                  className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
                >
                  CONTINUAR →
                </button>
              </>
            )}

            {/* ────────────── STEP 3: ADICIONAL ────────────────────────── */}
            {step === 3 && (
              <>
                <div className="bg-white border border-[#e8ecf4] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={3} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">Adicione ao pedido</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">Economize e garanta sua água pura por mais tempo.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFilterKitAdded((v) => !v)}
                    className={`rounded-[16px] p-[20px] flex flex-col gap-[16px] w-full text-left border-2 transition-all ${filterKitAdded ? "border-[#36ae5c] bg-[#f0faf4]" : "border-[#e8ecf4] bg-[#fafbff] hover:border-[#0569ff]"}`}
                  >
                    <div className="flex flex-wrap gap-[16px] items-center w-full">
                      <div className={`w-[28px] h-[28px] rounded-[6px] border-2 flex items-center justify-center shrink-0 transition-all ${filterKitAdded ? "bg-[#36ae5c] border-[#36ae5c]" : "border-[#cbd0d4] bg-white"}`}>
                        {filterKitAdded && (
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <path d="M1 5l3.5 3.5L13 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-[200px] flex flex-col gap-[4px]">
                        <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[17px] leading-tight ${filterKitAdded ? "text-[#36ae5c]" : "text-[#1f2e91]"}`}>
                          {FILTER_KIT.name}
                        </p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555] leading-normal">{FILTER_KIT.desc}</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0 gap-[2px]">
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#aab2bc] line-through">{formatBRL(FILTER_KIT.originalPrice)}</p>
                        <p className="font-['Avenir_LT_Pro:95_Black'] text-[20px] text-[#36ae5c]">{formatBRL(FILTER_KIT.price)}</p>
                      </div>
                    </div>
                    <div className="bg-[#36ae5c] rounded-full px-[16px] py-[6px] self-start">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white">Economize {formatBRL(FILTER_KIT.originalPrice - FILTER_KIT.price)}</p>
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
                >
                  CONTINUAR PARA PAGAMENTO →
                </button>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#777] text-center">
                  Ao prosseguir, você concorda com os nossos{" "}
                  <Link href="/termos" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0233c3]">Termos de Uso</Link>{" "}e{" "}
                  <Link href="/privacidade" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0233c3]">Política de Privacidade</Link>.
                </p>
              </>
            )}

            {/* ────────────── STEP 4: PAGAMENTO ────────────────────────── */}
            {step === 4 && (
              <>
                <div className="bg-white border border-[#e8ecf4] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={4} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">Forma de pagamento</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">Todas as transações são seguras e criptografadas.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[20px]">
                    {/* Payment tabs */}
                    <div className="flex flex-wrap gap-[12px]">
                      {([
                        { id: "card" as const, label: "Cartão de Crédito", icon: (
                          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <rect x="1" y="1" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M1 5h20" stroke="currentColor" strokeWidth="1.5"/>
                            <rect x="3" y="9" width="4" height="2" rx="0.5" fill="currentColor"/>
                          </svg>
                        )},
                        { id: "pix" as const, label: "PIX", icon: (
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M5 11l3-3 3 3-3 3-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M11 5l3 3-3 3-3-3 3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M11 11l3 3-3 3-3-3 3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M17 11l-3-3-3 3 3 3 3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                          </svg>
                        )},
                        { id: "boleto" as const, label: "Boleto", icon: (
                          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                            <rect x="1" y="1" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M5 5v8M7 5v8M10 5v8M13 5v8M15 5v8M17 5v8" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        )},
                      ]).map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id)}
                          className={`flex-[1_0_0] min-w-[120px] flex flex-col gap-[8px] items-center justify-center px-[12px] py-[16px] rounded-[12px] border-[1.5px] transition-all ${paymentMethod === m.id ? "bg-[#f0f4ff] border-[#0233c3] text-[#0233c3]" : "bg-white border-[#e8ecf4] text-[#777] hover:border-[#0569ff]"}`}
                        >
                          {m.icon}
                          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-center leading-tight">{m.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Card fields */}
                    {paymentMethod === "card" && (
                      <div className="flex flex-col gap-[16px]">
                        <FormField id="cardNumber" label="Número do cartão" placeholder="0000 0000 0000 0000" required error={errors.cardNumber} value={form.cardNumber} onChange={(v) => updateField("cardNumber", v)} />
                        <div className="flex flex-wrap gap-[16px]">
                          <div className="flex-[1_0_0] min-w-[160px]">
                            <FormField id="expiry" label="Validade (MM/AA)" placeholder="MM / AA" required error={errors.expiry} value={form.expiry} onChange={(v) => updateField("expiry", v)} />
                          </div>
                          <div className="flex-[1_0_0] min-w-[120px]">
                            <FormField id="cvc" label="CVV" placeholder="123" required error={errors.cvc} value={form.cvc} onChange={(v) => updateField("cvc", v)} />
                          </div>
                        </div>
                        <FormField id="nameOnCard" label="Nome no cartão" placeholder="Nome como impresso no cartão" required error={errors.nameOnCard} value={form.nameOnCard} onChange={(v) => updateField("nameOnCard", v)} />
                      </div>
                    )}

                    {/* PIX instructions */}
                    {paymentMethod === "pix" && (
                      <div className="bg-[#f6f9fe] border border-[#0569ff] rounded-[12px] p-[20px] flex flex-col gap-[8px]">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">Como funciona o PIX</p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555] leading-relaxed">
                          Após confirmar o pedido, você receberá um QR Code e a chave PIX por e-mail. O pagamento é aprovado em segundos e o pedido é processado imediatamente.
                        </p>
                      </div>
                    )}

                    {/* Boleto instructions */}
                    {paymentMethod === "boleto" && (
                      <div className="bg-[#f6f9fe] border border-[#dfa727] rounded-[12px] p-[20px] flex flex-col gap-[8px]">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">Como funciona o Boleto</p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555] leading-relaxed">
                          O boleto será enviado para o seu e-mail. Após o pagamento, a confirmação pode levar até 3 dias úteis para ser processada.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Complete button */}
                <button
                  type="button"
                  onClick={() => { if (validateStep4()) setDone(true); }}
                  className="w-full h-[60px] rounded-[12px] flex items-center justify-center gap-[10px] font-['Avenir_LT_Pro:95_Black'] text-[17px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
                >
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <rect x="1" y="7" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                    <path d="M5 7V5a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  FINALIZAR PEDIDO — {formatBRL(grandTotal)}
                </button>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#777] text-center">
                  Ao finalizar, você concorda com os{" "}
                  <Link href="/termos" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0233c3]">Termos de Uso</Link>{" "}e{" "}
                  <Link href="/privacidade" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0233c3]">Política de Privacidade</Link>.
                </p>
              </>
            )}
          </div>

          {/* ══ RIGHT COLUMN ════════════════════════════════════════════════ */}
          <div className="flex-[1_0_0] min-w-[280px] max-w-[480px] flex flex-col gap-[20px]">

            {/* ── Resumo do pedido ────────────────────────────────────────── */}
            <div className="bg-white border border-[#e8ecf4] rounded-[16px] p-[24px] flex flex-col gap-[20px]">
              <p className="font-['Avenir_LT_Pro:95_Black'] text-[20px] text-[#1f2e91]">Resumo do pedido</p>

              {selectedProduct ? (
                <div className="flex flex-wrap gap-[16px] items-center">
                  <div className="w-[100px] h-[100px] shrink-0 flex items-center justify-center bg-[#f6f9fe] rounded-[12px]">
                    <img src={selectedProduct.img} alt={selectedProduct.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-[160px] flex flex-col gap-[6px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-[#1f2e91]">{selectedProduct.name}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#777]">{selectedProduct.sub}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#aab2bc]">{selectedProduct.tank}</p>
                    <p className="font-['Avenir_LT_Pro:95_Black'] text-[18px] text-[#0233c3]">{formatBRL(selectedProduct.price)}</p>
                  </div>
                </div>
              ) : (
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#aab2bc] text-center py-[16px]">Nenhum modelo selecionado</p>
              )}

              {filterKitAdded && (
                <div className="flex flex-wrap gap-[16px] items-center border-t border-[#f0f0f0] pt-[20px]">
                  <div className="w-[100px] h-[100px] shrink-0 flex items-center justify-center bg-[#f0faf4] rounded-[12px]">
                    <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
                      <rect x="4" y="1" width="28" height="38" rx="4" stroke="#36ae5c" strokeWidth="1.5"/>
                      <path d="M10 10h16M10 18h16M10 26h10" stroke="#36ae5c" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-[140px] flex flex-col gap-[6px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">{FILTER_KIT.name}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#777]">{FILTER_KIT.desc}</p>
                    <div className="flex items-center gap-[8px]">
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#aab2bc] line-through">{formatBRL(FILTER_KIT.originalPrice)}</p>
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[16px] text-[#36ae5c]">{formatBRL(FILTER_KIT.price)}</p>
                    </div>
                    <button type="button" onClick={() => setFilterKitAdded(false)} className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#dc2626] underline self-start">Remover</button>
                  </div>
                </div>
              )}

              <div className="border-t border-[#f0f0f0] pt-[16px] flex flex-col gap-[10px]">
                <div className="flex justify-between items-center">
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555]">Subtotal</span>
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#333]">{formatBRL(selectedProduct?.price ?? 0)}</span>
                </div>
                {filterKitAdded && (
                  <div className="flex justify-between items-center">
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555]">Kit de Filtros</span>
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#36ae5c]">{formatBRL(FILTER_KIT.price)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555]">Frete</span>
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#36ae5c]">GRÁTIS</span>
                </div>
              </div>

              <div className="border-t border-[#f0f0f0] pt-[16px] flex justify-between items-center">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#333]">Total</span>
                <span className="font-['Avenir_LT_Pro:95_Black'] text-[22px] text-[#0233c3]">{formatBRL(grandTotal)}</span>
              </div>

              {/* Urgency alerts */}
              <div className="flex flex-col gap-[10px]">
                <div className="bg-[#fff8f0] border-2 border-[#f5c580] rounded-[10px] px-[16px] py-[10px] flex gap-[10px] items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dfa727" strokeWidth="1.8">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#b8831a]">Apenas 8 unidades em estoque!</p>
                </div>
                <div className="bg-[#f6f9fe] border-2 border-[#e8ecf4] rounded-[10px] px-[16px] py-[10px] flex gap-[10px] items-center">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="#0233c3" strokeWidth="1.5">
                    <circle cx="8" cy="9" r="7"/>
                    <path d="M8 5v4l2.5 2.5" strokeLinecap="round"/>
                  </svg>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3]">
                    Seu pedido está reservado por{" "}
                    <span className="text-[#dc2626]">{timer}</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Trust badges ───────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-[24px_48px] items-center justify-center py-[20px] border-t border-[#e8ecf4]">
          {[
            { label: "Compra 100% segura", icon: (
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="#0233c3" strokeWidth="1.5">
                <path d="M9 1L1 5v6c0 5.25 3.5 9.75 8 11 4.5-1.25 8-5.75 8-11V5L9 1z"/>
                <path d="M5 11l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )},
            { label: "Frete grátis para todo o Brasil", icon: (
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="#0233c3" strokeWidth="1.5">
                <path d="M1 13h12V1H1v12z" strokeLinejoin="round"/>
                <path d="M13 5h4l3 4v4h-7V5z" strokeLinejoin="round"/>
                <circle cx="5.5" cy="15.5" r="1.5"/>
                <circle cx="17.5" cy="15.5" r="1.5"/>
              </svg>
            )},
            { label: "Garantia de 1 ano", icon: (
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke="#0233c3" strokeWidth="1.5">
                <path d="M10 1L2 5v5c0 5 3.6 9.5 8 11 4.4-1.5 8-6 8-11V5L10 1z"/>
                <path d="M7 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )},
            { label: "Suporte especializado", icon: (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0233c3" strokeWidth="1.5">
                <path d="M11 3a8 8 0 0 0-8 8v2a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H5v-1a6 6 0 0 1 12 0v1h-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 0 2-2v-2a8 8 0 0 0-8-8z"/>
              </svg>
            )},
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-full bg-[#f0f4ff] flex items-center justify-center shrink-0">
                {badge.icon}
              </div>
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#333]">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* ── Compre com confiança + Depoimentos ────────────────────────── */}
        <div className="flex flex-wrap gap-[20px] items-start">

          {/* Compre com confiança */}
          <div className="flex-[1_0_0] min-w-[280px] rounded-[16px] px-[24px] py-[32px] flex flex-col gap-[24px]" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #f5f0ff 100%)" }}>
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[22px] text-[#1f2e91]">Compre com confiança</p>
            <div className="flex flex-col gap-[20px]">
              {[
                { title: "30 dias de satisfação garantida", desc: "Não ficou satisfeito? Devolvemos o seu dinheiro." },
                { title: "Garantia de 1 ano", desc: "Cobrimos defeitos de fabricação sem custo adicional." },
                { title: "Checkout seguro", desc: "Seus dados são protegidos com criptografia SSL 256 bits." },
                { title: "Instalação inclusa", desc: "Nossa equipe vai até você instalar o purificador." },
              ].map((item, i) => (
                <div key={i} className="flex gap-[16px] items-start">
                  <div className="w-[44px] h-[44px] rounded-full bg-white border border-[#e8ecf4] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#0233c3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">{item.title}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555] leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Depoimentos */}
          <div className="flex-[1_0_0] min-w-[280px] bg-white border border-[#e8ecf4] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[22px] text-[#1f2e91] text-center">O que dizem nossos clientes</p>
            <div className="flex flex-col gap-[24px]">
              {[
                { initials: "MC", name: "Mariana C.", role: "São Paulo, SP", quote: '"A qualidade da água mudou completamente. O Neo PLUS é incrível — minha família adora a água hidrogenada!"' },
                { initials: "RL", name: "Rafael L.", role: "Belo Horizonte, MG", quote: '"Comprei o Neo INFINITY para o escritório. O painel touch de 15″ impressiona todo mundo. Suporte impecável."' },
                { initials: "JS", name: "Juliana S.", role: "Curitiba, PR", quote: '"Instalação rápida, água gelada na hora. O app da Acquafy é muito prático para acompanhar os filtros."' },
              ].map((t, i) => (
                <div key={i} className="flex flex-wrap gap-[14px] items-start">
                  <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white" style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-[180px] flex flex-col gap-[6px]">
                    <div className="flex items-center justify-between flex-wrap gap-[4px]">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#333]">{t.name}</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#aab2bc]">{t.role}</p>
                    </div>
                    <Stars />
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#555] leading-relaxed">{t.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
