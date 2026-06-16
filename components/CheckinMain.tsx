"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { PRODUCT_PRICES_BRL, PRODUCT_IMAGES } from "@/lib/products";

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
  gas?: boolean;
  h2?: boolean;
};

type ProductGroup = {
  linha: "Essentials" | "Premium";
  formato: string;
  products: Product[];
};

const PRODUCT_GROUPS: ProductGroup[] = [
  {
    linha: "Essentials",
    formato: "Bancada",
    products: [
      { id: "neo-up",               img: "/figma-assets/neo-up-catalog.webp",      name: "Neo UP",              sub: "Apenas Natural",        tank: "—",            price: 1490 },
      { id: "neo-fit",              img: "/figma-assets/neo-fit.webp",             name: "Neo FIT",             sub: "6 em 1",                tank: "Tanque 400ml", price: 1990, badge: "Mais Vendido" },
      { id: "neo-smart-h2",         img: "/figma-assets/neo-smart-h2.webp",        name: "Neo SMART H₂",        sub: "7 em 1 + Hidrogenada",  tank: "Tanque 800ml", price: 2490, h2: true },
      { id: "neo-touch",            img: "/figma-assets/neo-touch.webp",           name: "Neo TOUCH",           sub: "6 em 1",                tank: "Tanque 800ml", price: 2990 },
      { id: "neo-plus",             img: "/figma-assets/neo-plus.webp",            name: "Neo PLUS",            sub: "6 em 1",                tank: "Tanque 1500ml",price: 3490 },
      { id: "neo-ultra",            img: "/figma-assets/neo-ultra.webp",           name: "Neo ULTRA",           sub: "6 em 1",                tank: "Tanque 3L",    price: 3990 },
      { id: "neo-ultra-spark",      img: "/figma-assets/neo-ultra-spark.webp",     name: "Neo ULTRA SPARK",     sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 4490, gas: true },
      { id: "neo-ultra-spark-h2",   img: "/figma-assets/neo-ultra-spark-h2.webp",  name: "Neo ULTRA SPARK H₂",  sub: "8 em 1 + Gás + H₂",    tank: "Tanque 3L",    price: 4990, gas: true, h2: true },
    ],
  },
  {
    linha: "Essentials",
    formato: "Coluna",
    products: [
      { id: "neo-max",              img: "/figma-assets/neo-max.webp",             name: "Neo MAX",             sub: "6 em 1",                tank: "Tanque 3L",    price: 4990 },
      { id: "neo-max-spark",        img: "/figma-assets/neo-max-spark.webp",       name: "Neo MAX SPARK",       sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 5490, gas: true },
      { id: "neo-max-spark-h2",     img: "/figma-assets/neo-max-spark-h2.webp",    name: "Neo MAX SPARK H₂",    sub: "8 em 1 + Gás + H₂",    tank: "Tanque 3L",    price: 5990, gas: true, h2: true },
    ],
  },
  {
    linha: "Premium",
    formato: "Bancada",
    products: [
      { id: "neo-infinity",         img: PRODUCT_IMAGES["neo-infinity"],         name: "Neo INFINITY",        sub: "6 em 1 · IPS 15.6″",    tank: "Tanque 3L",    price: 6990 },
      { id: "neo-infinity-spark",   img: PRODUCT_IMAGES["neo-infinity-spark"],   name: "Neo INFINITY SPARK",  sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 7490, gas: true },
      { id: "neo-infinity-spark-h2",img: PRODUCT_IMAGES["neo-infinity-spark-h2"],name: "Neo INFINITY SPARK H₂",sub: "8 em 1 + Gás + H₂",   tank: "Tanque 3L",    price: 7990, gas: true, h2: true },
      { id: "neo-prime",            img: PRODUCT_IMAGES["neo-prime"],            name: "Neo PRIME",           sub: "6 em 1",                tank: "Tanque 3L",    price: 7990 },
      { id: "neo-prime-spark",      img: PRODUCT_IMAGES["neo-prime-spark"],      name: "Neo PRIME SPARK",     sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 8490, gas: true },
      { id: "neo-prime-spark-h2",   img: PRODUCT_IMAGES["neo-prime-spark-h2"],   name: "Neo PRIME SPARK H₂",  sub: "8 em 1 + Gás + H₂",    tank: "Tanque 3L",    price: 8990, gas: true, h2: true },
    ],
  },
  {
    linha: "Premium",
    formato: "Embutido",
    products: [
      { id: "neo-prestige",         img: PRODUCT_IMAGES["neo-prestige"],         name: "Neo PRESTIGE",        sub: "6 em 1 · Aço inox",     tank: "Tanque 3L",    price: 7490 },
      { id: "neo-prestige-spark",   img: PRODUCT_IMAGES["neo-prestige-spark"],   name: "Neo PRESTIGE SPARK",  sub: "7 em 1 + Gás",          tank: "Tanque 3L",    price: 7990, gas: true },
      { id: "neo-prestige-spark-h2",img: PRODUCT_IMAGES["neo-prestige-spark-h2"],name: "Neo PRESTIGE SPARK H₂",sub: "8 em 1 + Gás + H₂",   tank: "Tanque 3L",    price: 8490, gas: true, h2: true },
    ],
  },
];

const ALL_PRODUCTS: Product[] = PRODUCT_GROUPS.flatMap((g) => g.products).map((p) => ({
  ...p,
  price: PRODUCT_PRICES_BRL[p.id] ?? p.price,
}));

const FILTER_TAGS = ["Todos", "Essentials", "Premium", "Bancada", "Coluna", "Embutido", "Água com Gás", "Água Hidrogenada"];

/* ─── Upsell ─────────────────────────────────────────────────────────────── */
type KitId = "essentials" | "premium";

const FILTER_KITS: { id: KitId; name: string; desc: string; price: number; originalPrice: number; color: string; bg: string }[] = [
  {
    id: "essentials",
    name: "Kit de Filtros Essentials (1 ano)",
    desc: "Filtros UF — compatível com toda a linha Neo Essentials. 12 meses sem se preocupar com reposição.",
    price: 290,
    originalPrice: 490,
    color: "#0233c3",
    bg: "#f0f4ff",
  },
  {
    id: "premium",
    name: "Kit de Filtros Premium (1 ano)",
    desc: "Filtros RO/Osmose Reversa — compatível com toda a linha Neo Premium. Filtros de alta performance para sistemas avançados.",
    price: 390,
    originalPrice: 590,
    color: "#9f3df5",
    bg: "#f5f0ff",
  },
];

const SHIPPING_OPTIONS = [
  { id: "gratis",  label: "Frete Grátis",       desc: "Entrega padrão — 5 a 7 dias úteis", price: 0    },
  { id: "express", label: "Entrega Expressa",    desc: "Chegada em 2 a 3 dias úteis",       price: 4990 },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatBRL(v: number) {
  return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

function isPremium(p: Product) {
  const g = PRODUCT_GROUPS.find((gr) => gr.products.some((x) => x.id === p.id));
  return g?.linha === "Premium";
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
function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2)  return d.length ? `(${d}` : "";
  if (d.length <= 6)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}
function maskCEP(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0,5)}-${d.slice(5)}` : d;
}
type CardBrand = "visa" | "mastercard" | "amex" | "elo" | "hipercard";
function detectCardBrand(v: string): CardBrand | null {
  const d = v.replace(/\D/g, "");
  if (!d) return null;
  if (/^3[47]/.test(d)) return "amex";
  if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(d)) return "elo";
  if (/^(606282|3841|384)/.test(d)) return "hipercard";
  if (/^5[1-5]/.test(d) || /^2[2-7]\d{2}/.test(d)) return "mastercard";
  if (/^4/.test(d)) return "visa";
  return null;
}
function maskCardNumber(v: string, brand: CardBrand | null): string {
  const d = v.replace(/\D/g, "");
  if (brand === "amex") {
    const s = d.slice(0, 15);
    if (s.length <= 4) return s;
    if (s.length <= 10) return `${s.slice(0,4)} ${s.slice(4)}`;
    return `${s.slice(0,4)} ${s.slice(4,10)} ${s.slice(10)}`;
  }
  const s = d.slice(0, 16);
  return s.replace(/(.{4})/g, "$1 ").trim();
}
function maskExpiry(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0,2)} / ${d.slice(2)}`;
}

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

/* ─── Qty controls ───────────────────────────────────────────────────────── */
function QtyControl({ qty, onDec, onInc, onRemove, premium }: {
  qty: number; onDec: () => void; onInc: () => void; onRemove: () => void; premium?: boolean;
}) {
  const accent = premium ? "#9f3df5" : "#0233c3";
  return (
    <div className="flex items-center justify-between w-full gap-[6px] mt-[2px]">
      <button type="button" onClick={onRemove}
        className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#dc2626] underline leading-none shrink-0">
        Remover
      </button>
      <div className="flex items-center gap-[4px] shrink-0">
        <button type="button" onClick={onDec}
          className="w-[24px] h-[24px] rounded-full border flex items-center justify-center text-[16px] leading-none transition-colors hover:bg-gray-50"
          style={{ borderColor: accent, color: accent }}>
          −
        </button>
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] min-w-[20px] text-center" style={{ color: accent }}>
          {qty}
        </span>
        <button type="button" onClick={onInc}
          className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[16px] leading-none text-white transition-colors"
          style={{ background: accent }}>
          +
        </button>
      </div>
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

  /* cart: { id, qty }[] */
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const [kitQty, setKitQty] = useState<Record<KitId, number>>({ essentials: 0, premium: 0 });
  const [shippingOption, setShippingOption] = useState("gratis");
  const [cepLoading, setCepLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | "boleto">("card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const timer = useCountdown(600);

  const [form, setForm] = useState({
    nome: "", email: "", telefone: "",
    cep: "", rua: "", numero: "", complemento: "",
    bairro: "", cidade: "", uf: "",
    cardNumber: "", expiry: "", cvc: "", nameOnCard: "",
  });

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    // ?produtos=neo-up:1,neo-fit:2 (from CartProvider "Finalizar compra")
    const produtos = params.get("produtos");
    if (produtos) {
      const items = produtos.split(",")
        .map((s) => { const [id, q] = s.split(":"); return { id, qty: parseInt(q) || 1 }; })
        .filter((i) => ALL_PRODUCTS.find((p) => p.id === i.id));
      if (items.length > 0) { setCart(items); return; }
    }
    // ?produto=neo-up (legacy single-product link)
    const produto = params.get("produto");
    if (produto && ALL_PRODUCTS.find((p) => p.id === produto)) {
      setCart([{ id: produto, qty: 1 }]);
    }
  }, []);

  /* ── Cart helpers ──────────────────────────────────────────────────────── */
  const cartItems = useMemo(
    () => cart.map(({ id, qty }) => ({ product: ALL_PRODUCTS.find((p) => p.id === id)!, qty })).filter((x) => x.product),
    [cart]
  );
  const productsSubtotal = useMemo(() => cartItems.reduce((sum, { product, qty }) => sum + product.price * qty, 0), [cartItems]);
  const kitsSubtotal = FILTER_KITS.reduce((sum, k) => sum + k.price * kitQty[k.id], 0);
  const shippingCost = SHIPPING_OPTIONS.find((o) => o.id === shippingOption)?.price ?? 0;
  const grandTotal = productsSubtotal + kitsSubtotal + shippingCost;
  const cardBrand = detectCardBrand(form.cardNumber);
  const totalQty = useMemo(() => cartItems.reduce((s, { qty }) => s + qty, 0), [cartItems]);

  function toggleCart(p: Product) {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      if (exists) return prev.filter((x) => x.id !== p.id);
      return [...prev, { id: p.id, qty: 1 }];
    });
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) => prev.map((x) => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }

  function goToStep(n: 1 | 2 | 3 | 4 | 5) {
    setStep(n);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── Filtered groups — always merged by linha (Essentials / Premium) ──── */
  const filteredGroups = useMemo(() => {
    let base = PRODUCT_GROUPS;
    if (activeFilter === "Essentials") base = base.filter((g) => g.linha === "Essentials");
    else if (activeFilter === "Premium") base = base.filter((g) => g.linha === "Premium");
    else if (activeFilter === "Bancada" || activeFilter === "Coluna" || activeFilter === "Embutido")
      base = base.filter((g) => g.formato === activeFilter);
    else if (activeFilter === "Água com Gás")
      base = base.map((g) => ({ ...g, products: g.products.filter((p) => p.gas) })).filter((g) => g.products.length > 0);
    else if (activeFilter === "Água Hidrogenada")
      base = base.map((g) => ({ ...g, products: g.products.filter((p) => p.h2) })).filter((g) => g.products.length > 0);

    /* merge groups with same linha into one */
    const merged: { linha: string; products: Product[] }[] = [];
    for (const g of base) {
      const existing = merged.find((m) => m.linha === g.linha);
      if (existing) existing.products.push(...g.products);
      else merged.push({ linha: g.linha, products: [...g.products] });
    }
    return merged;
  }, [activeFilter]);

  /* ── Validation ────────────────────────────────────────────────────────── */
  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  useEffect(() => {
    const digits = form.cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    fetch(`https://viacep.com.br/ws/${digits}/json/`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            rua:    data.logradouro || prev.rua,
            bairro: data.bairro     || prev.bairro,
            cidade: data.localidade || prev.cidade,
            uf:     data.uf         || prev.uf,
          }));
          setErrors((prev) => {
            const n = { ...prev };
            ["rua", "bairro", "cidade", "uf"].forEach((k) => delete n[k]);
            return n;
          });
        }
      })
      .catch(() => {})
      .finally(() => setCepLoading(false));
  }, [form.cep]);

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome completo é obrigatório";
    if (!form.email.trim()) errs.email = "E-mail é obrigatório";
    if (!form.telefone.trim()) errs.telefone = "Telefone é obrigatório";
    else if (form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido (DDD + número)";
    if (!form.cep.trim()) errs.cep = "CEP é obrigatório";
    else if (form.cep.replace(/\D/g, "").length !== 8) errs.cep = "CEP inválido";
    if (!form.rua.trim()) errs.rua = "Rua é obrigatória";
    if (!form.numero.trim()) errs.numero = "Número é obrigatório";
    if (!form.bairro.trim()) errs.bairro = "Bairro é obrigatório";
    if (!form.cidade.trim()) errs.cidade = "Cidade é obrigatória";
    if (!form.uf) errs.uf = "Estado é obrigatório";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      document.getElementById(Object.keys(errs)[0])?.scrollIntoView({ behavior: "smooth", block: "center" });
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
      document.getElementById(Object.keys(errs)[0])?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const STEPS = ["Modelo", "Dados", "Frete", "Adicional", "Pagamento"];

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
    <section className="w-full bg-white pt-[40px] pb-[120px] lg:py-[40px] px-5">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-[24px]">

        {/* ── Logo strip ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-[12px]">
          <div className="flex items-center gap-[8px] bg-white border border-[#0233c3] rounded-full px-[16px] py-[8px]">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <rect x="1" y="6" width="12" height="9" rx="2" stroke="#0233c3" strokeWidth="1.5"/>
              <path d="M4 6V4.5a3 3 0 0 1 6 0V6" stroke="#0233c3" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3]">CHECKIN SEGURO</span>
          </div>
        </div>

        {/* ── Step bar ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap bg-[#f6f9fe] rounded-[16px] overflow-hidden">
          {STEPS.map((label, i) => {
            const n = (i + 1) as 1 | 2 | 3 | 4 | 5;
            const isActive = step === n;
            const isDone = step > n;
            return (
              <button key={n} type="button"
                onClick={() => { if (isDone) goToStep(n); }}
                className={`flex-[1_0_0] min-w-[80px] flex flex-col items-center gap-[8px] py-[16px] border-b-[3px] transition-colors ${isActive || isDone ? "border-[#0233c3]" : "border-transparent"}`}>
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
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[20px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={1} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">Escolha o seu modelo</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">Você pode selecionar mais de um produto.</p>
                    </div>
                  </div>

                  {/* ── Filter tags ─────────────────────────────────────── */}
                  <div className="flex flex-wrap gap-[8px]">
                    {FILTER_TAGS.map((tag) => {
                      const active = activeFilter === tag;
                      let activeBg = "#0233c3";
                      if (tag === "Premium") activeBg = "#9f3df5";
                      if (tag === "Água com Gás") activeBg = "#0569ff";
                      if (tag === "Água Hidrogenada") activeBg = "#36ae5c";
                      return (
                        <button key={tag} type="button"
                          onClick={() => setActiveFilter(active ? "Todos" : tag)}
                          className={`font-['Avenir_LT_Pro:85_Heavy'] text-[13px] px-[12px] py-[6px] rounded-full border transition-all whitespace-nowrap ${
                            active
                              ? "text-white border-transparent"
                              : "bg-white text-[#555] border-[#e8ecf4] hover:border-[#0233c3] hover:text-[#0233c3]"
                          }`}
                          style={active ? { background: activeBg } : {}}>
                          {tag}
                        </button>
                      );
                    })}
                  </div>

                  {/* ── Product groups ──────────────────────────────────── */}
                  <div className="flex flex-col gap-[24px]">
                    {filteredGroups.map((group) => (
                      <div key={group.linha} className="flex flex-col gap-[12px]">
                        {/* Line header */}
                        <div className="flex items-center gap-[8px]">
                          <span className={`font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white px-[12px] py-[4px] rounded-full whitespace-nowrap ${group.linha === "Premium" ? "bg-[#9f3df5]" : "bg-[#0569ff]"}`}>
                            Neo {group.linha}
                          </span>
                          <div className="flex-1 h-px bg-[#f0f3f8]" />
                        </div>

                        {/* Cards grid */}
                        <div className="grid gap-[10px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(142px, 1fr))" }}>
                          {group.products.map((p) => {
                            const entry = cart.find((x) => x.id === p.id);
                            const selected = !!entry;
                            const prem = isPremium(p);
                            const accent = prem ? "#9f3df5" : "#0233c3";
                            const selBg = prem ? "bg-[#faf0ff]" : "bg-[#f0f4ff]";
                            return (
                              <div key={p.id}
                                className={`relative flex flex-col items-center gap-[6px] p-[12px] rounded-[14px] transition-all ${selected ? selBg : "bg-white"}`}>
                                {/* Badge */}
                                {p.badge && (
                                  <span className={`absolute top-[7px] right-[7px] text-[9px] font-['Avenir_LT_Pro:85_Heavy'] px-[6px] py-[3px] rounded-full text-white ${p.badge === "Mais Vendido" ? "bg-[#36ae5c]" : "bg-[#9f3df5]"}`}>
                                    {p.badge}
                                  </span>
                                )}
                                {/* Selected check */}
                                {selected && (
                                  <div className="absolute top-[7px] left-[7px] w-[20px] h-[20px] rounded-full flex items-center justify-center" style={{ background: accent }}>
                                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                      <path d="M1 3.5l2 2L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                )}
                                {/* Clickable image + name area */}
                                <button type="button" onClick={() => toggleCart(p)} className="w-full flex flex-col items-center gap-[4px]">
                                  <img src={p.img} alt={p.name} className="h-[100px] w-auto object-contain pointer-events-none" />
                                  <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-center leading-tight w-full`} style={{ color: selected ? accent : "#1f2e91" }}>
                                    {p.name}
                                  </p>
                                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[10px] text-[#777] text-center w-full">{p.sub}</p>
                                  <p className="font-['Avenir_LT_Pro:95_Black'] text-[13px] text-center w-full" style={{ color: accent }}>{formatBRL(p.price)}</p>
                                </button>
                                {/* Qty controls (only when in cart) */}
                                {selected && entry && (
                                  <QtyControl
                                    qty={entry.qty}
                                    onDec={() => updateQty(p.id, -1)}
                                    onInc={() => updateQty(p.id, +1)}
                                    onRemove={() => removeFromCart(p.id)}
                                    premium={prem}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {cart.length === 0 && (
                  <p className="text-[14px] text-[#dc2626] font-['Avenir_LT_Pro:55_Roman'] text-center">Selecione ao menos um modelo para continuar.</p>
                )}

                <button type="button" disabled={cart.length === 0}
                  onClick={() => { if (cart.length > 0) goToStep(2); }}
                  className={`w-full h-[56px] rounded-[12px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white transition-all ${cart.length > 0 ? "hover:opacity-90" : "opacity-40 cursor-not-allowed"}`}
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  {cart.length > 0 ? `CONTINUAR COM ${totalQty} PRODUTO${totalQty > 1 ? "S" : ""} →` : "CONTINUAR →"}
                </button>
              </>
            )}

            {/* ────────────── STEP 2: DADOS DE ENTREGA ─────────────────── */}
            {step === 2 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
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
                        <FormField id="telefone" label="Telefone / WhatsApp" placeholder="(11) 99999-9999" type="tel" required error={errors.telefone} value={form.telefone} onChange={(v) => updateField("telefone", maskPhone(v))} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#1f2e91]">Endereço de entrega</p>
                  <div className="flex flex-col gap-[16px]">
                    <div className="flex flex-wrap gap-[16px]">
                      <div className="flex-[1_0_0] min-w-[160px]">
                        <FormField id="cep" label="CEP" placeholder="00000-000" required error={errors.cep}>
                          <div className={`border rounded-[12px] px-[16px] py-[14px] w-full transition-colors flex items-center gap-[8px] ${errors.cep ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"}`}>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="00000-000"
                              value={form.cep}
                              onChange={(e) => updateField("cep", maskCEP(e.target.value))}
                              className="flex-1 text-[16px] text-[#333] placeholder:text-[#aab2bc] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']"
                            />
                            {cepLoading && (
                              <svg className="animate-spin size-[16px] shrink-0" style={{ color: "#0233c3" }} viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            )}
                          </div>
                        </FormField>
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
                            <select value={form.uf} onChange={(e) => updateField("uf", e.target.value)}
                              className="w-full text-[16px] text-[#333] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']">
                              <option value="">UF</option>
                              {BR_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </FormField>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="button"
                  onClick={() => { if (validateStep2()) goToStep(3); }}
                  className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  CONTINUAR →
                </button>
              </>
            )}

            {/* ────────────── STEP 3: FRETE ────────────────────────────── */}
            {step === 3 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={3} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">Opção de entrega</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">Escolha como prefere receber o seu pedido.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    {SHIPPING_OPTIONS.map((opt) => {
                      const active = shippingOption === opt.id;
                      return (
                        <button key={opt.id} type="button" onClick={() => setShippingOption(opt.id)}
                          className="rounded-[14px] border-2 p-[20px] flex items-center gap-[16px] text-left transition-all"
                          style={{ borderColor: active ? "#0233c3" : "#e8ecf4", background: active ? "#f0f4ff" : "#fafbff" }}>
                          <div className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                            style={{ borderColor: active ? "#0233c3" : "#cbd0d4" }}>
                            {active && <div className="w-[11px] h-[11px] rounded-full bg-[#0233c3]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-tight" style={{ color: active ? "#0233c3" : "#1f2e91" }}>{opt.label}</p>
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#777] mt-[2px]">{opt.desc}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            {opt.price === 0
                              ? <span className="font-['Avenir_LT_Pro:95_Black'] text-[16px] text-[#36ae5c]">GRÁTIS</span>
                              : <span className="font-['Avenir_LT_Pro:95_Black'] text-[16px] text-[#0233c3]">{formatBRL(opt.price)}</span>
                            }
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button type="button" onClick={() => goToStep(4)}
                  className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  CONTINUAR →
                </button>
              </>
            )}

            {/* ────────────── STEP 4: ADICIONAL ────────────────────────── */}
            {step === 4 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={4} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">Adicione ao pedido</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">Economize e garanta sua água pura por mais tempo.</p>
                    </div>
                  </div>

                  {FILTER_KITS.map((kit) => {
                    const qty = kitQty[kit.id];
                    const active = qty > 0;
                    return (
                      <div key={kit.id}
                        className="rounded-[16px] border-2 transition-all overflow-hidden"
                        style={{ borderColor: active ? kit.color : "#e8ecf4", background: active ? kit.bg : "#fafbff" }}>
                        {/* Top row: info + price */}
                        <div className="p-[20px] flex flex-wrap gap-[16px] items-center w-full">
                          <div className="flex-1 min-w-[160px] flex flex-col gap-[3px]">
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-tight" style={{ color: active ? kit.color : "#1f2e91" }}>{kit.name}</p>
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#777] leading-normal">{kit.desc}</p>
                          </div>
                          <div className="flex flex-col items-end shrink-0 gap-[1px]">
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#aab2bc] line-through">{formatBRL(kit.originalPrice)}</p>
                            <p className="font-['Avenir_LT_Pro:95_Black'] text-[18px]" style={{ color: kit.color }}>{formatBRL(kit.price)}</p>
                          </div>
                        </div>
                        {/* Bottom row: savings badge + qty controls */}
                        <div className="px-[20px] pb-[16px] flex items-center justify-between gap-[12px]">
                          <div className="rounded-full px-[12px] py-[4px]" style={{ background: `${kit.color}18` }}>
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px]" style={{ color: kit.color }}>
                              Economize {formatBRL(kit.originalPrice - kit.price)}
                            </p>
                          </div>
                          {/* Qty control */}
                          {active ? (
                            <div className="flex items-center gap-[8px]">
                              <button type="button"
                                onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: Math.max(0, prev[kit.id] - 1) }))}
                                className="w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center text-[18px] leading-none transition-colors hover:bg-white"
                                style={{ borderColor: kit.color, color: kit.color }}>−</button>
                              <span className="font-['Avenir_LT_Pro:95_Black'] text-[16px] min-w-[20px] text-center" style={{ color: kit.color }}>{qty}</span>
                              <button type="button"
                                onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: prev[kit.id] + 1 }))}
                                className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[18px] leading-none text-white transition-opacity hover:opacity-80"
                                style={{ background: kit.color }}>+</button>
                            </div>
                          ) : (
                            <button type="button"
                              onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: 1 }))}
                              className="flex items-center gap-[6px] rounded-full px-[16px] py-[6px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white transition-opacity hover:opacity-85"
                              style={{ background: kit.color }}>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                              </svg>
                              Adicionar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button type="button" onClick={() => goToStep(5)}
                  className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[16px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  CONTINUAR PARA PAGAMENTO →
                </button>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#777] text-center">
                  Ao prosseguir, você concorda com os nossos{" "}
                  <Link href="/termos-de-uso" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0569ff] hover:underline">Termos de Uso</Link>{" "}e{" "}
                  <Link href="/politicas-privacidade" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#9f3df5] hover:underline">Política de Privacidade</Link>.
                </p>
              </>
            )}

            {/* ────────────── STEP 5: PAGAMENTO ────────────────────────── */}
            {step === 5 && (
              <>
                <div className="bg-[#f6f9fe] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
                  <div className="flex gap-[12px] items-start">
                    <StepBadge n={5} />
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">Forma de pagamento</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] text-[#555]">Todas as transações são seguras e criptografadas.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-wrap gap-[12px]">
                      {([
                        { id: "card" as const, label: "Cartão de Crédito", icon: (<svg width="22" height="16" viewBox="0 0 22 16" fill="none"><rect x="1" y="1" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 5h20" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="9" width="4" height="2" rx="0.5" fill="currentColor"/></svg>) },
                        { id: "pix" as const, label: "PIX", icon: (<svg width="22" height="22" viewBox="0 0 578.98 578.98" fill="currentColor"><path d="M464.82 446.04l-103.18 103.18c-39.68,39.68 -104.61,39.68 -144.29,0l-103.04 -103.04c19.22,-0.18 35.61,-2.5 49.17,-6.98 14.21,-4.69 25.32,-11.73 33.35,-21.13l83.19 -84.54c4.27,-3.61 8.51,-5.43 12.7,-5.45 4.19,0.02 8.43,1.84 12.7,5.45l83.19 84.54c8.03,9.4 19.15,16.44 33.35,21.13 12.05,3.97 26.34,6.25 42.86,6.84zm-350.97 -312.78l103.5 -103.5c39.68,-39.68 104.61,-39.68 144.29,0l103.62 103.62c-16.71,0.56 -31.14,2.84 -43.3,6.85 -14.21,4.69 -25.32,11.73 -33.35,21.13l-83.19 84.54c-4.27,3.61 -8.51,5.43 -12.7,5.45 -4.19,-0.02 -8.43,-1.84 -12.7,-5.45l-83.19 -84.54c-8.03,-9.4 -19.15,-16.44 -33.35,-21.13 -13.67,-4.51 -30.21,-6.84 -49.63,-6.98zm-84.09 84.09l48.18 -48.18c36.94,-5.95 61.14,-3.63 78.45,2.47 17.52,6.17 28.02,16.24 37.54,25.5l0 0c60.63,61.3 79.88,76.43 79.93,76.47l0.03 0.02c2.38,1.67 5.65,3.09 9.13,4.09 3.56,1.03 7.37,1.63 10.68,1.63 3.31,0 6.97,-0.58 10.38,-1.59 3.4,-1.01 6.58,-2.44 8.95,-4.14l0.03 -0.02c0.06,-0.04 19.31,-15.17 79.93,-76.47l0 0c9.52,-9.26 20.02,-19.33 37.54,-25.5 15.81,-5.57 37.37,-7.99 69.14,-3.83l49.55 49.55c39.68,39.68 39.68,104.61 0,144.29l-50.24 50.24c-31.39,4.03 -52.75,1.61 -68.44,-3.92 -17.52,-6.17 -28.02,-16.24 -37.54,-25.5l0 0c-60.63,-61.3 -79.88,-76.43 -79.93,-76.47l-0.03 -0.02c-2.37,-1.7 -5.55,-3.14 -8.95,-4.14 -3.41,-1.01 -7.06,-1.59 -10.38,-1.59 -3.32,0 -7.12,0.61 -10.68,1.63 -3.49,1.01 -6.76,2.43 -9.13,4.09l-0.03 0.02c-0.06,0.04 -19.31,15.17 -79.93,76.47l0 0c-9.52,9.26 -20.02,19.33 -37.54,25.5 -17.2,6.06 -41.2,8.39 -77.73,2.59l-48.9 -48.9c-39.68,-39.68 -39.68,-104.61 0,-144.29z"/></svg>) },
                        { id: "boleto" as const, label: "Boleto", icon: (<svg width="22" height="18" viewBox="0 0 22 18" fill="none"><rect x="1" y="1" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 5v8M7 5v8M10 5v8M13 5v8M15 5v8M17 5v8" stroke="currentColor" strokeWidth="1.5"/></svg>) },
                      ]).map((m) => (
                        <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)}
                          className={`flex-[1_0_0] min-w-[120px] flex flex-col gap-[8px] items-center justify-center px-[12px] py-[16px] rounded-[12px] border-[1.5px] transition-all ${paymentMethod === m.id ? "bg-[#f0f4ff] border-[#0233c3] text-[#0233c3]" : "bg-white border-[#e8ecf4] text-[#777] hover:border-[#0569ff]"}`}>
                          {m.icon}
                          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-center leading-tight">{m.label}</span>
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "card" && (
                      <div className="flex flex-col gap-[16px]">
                        <FormField id="cardNumber" label="Número do cartão" required error={errors.cardNumber}>
                          <div className={`border rounded-[12px] px-[16px] py-[14px] w-full transition-colors flex items-center gap-[10px] ${errors.cardNumber ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"}`}>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="0000 0000 0000 0000"
                              value={form.cardNumber}
                              onChange={(e) => {
                                const brand = detectCardBrand(e.target.value);
                                updateField("cardNumber", maskCardNumber(e.target.value, brand));
                              }}
                              className="flex-1 min-w-0 text-[16px] text-[#333] placeholder:text-[#aab2bc] bg-transparent focus:outline-none font-['Avenir_LT_Pro:55_Roman']"
                            />
                            <div className="flex items-center gap-[3px] shrink-0">
                              {([
                                ["visa",       "Visa"],
                                ["mastercard", "Mastercard"],
                                ["elo",        "Elo"],
                                ["amex",       "American Express"],
                                ["hipercard",  "Hipercard"],
                              ] as [CardBrand, string][]).map(([id, alt]) => (
                                <img key={id} src={`/figma-assets/brand-${id}.svg`} alt={alt} width={34} height={22}
                                  className={`rounded-[3px] transition-opacity duration-150 ${cardBrand === null || cardBrand === id ? "opacity-100" : "opacity-20"}`} />
                              ))}
                            </div>
                          </div>
                        </FormField>
                        <div className="flex flex-wrap gap-[16px]">
                          <div className="flex-[1_0_0] min-w-[160px]">
                            <FormField id="expiry" label="Validade (MM/AA)" placeholder="MM / AA" required error={errors.expiry} value={form.expiry} onChange={(v) => updateField("expiry", maskExpiry(v))} />
                          </div>
                          <div className="flex-[1_0_0] min-w-[120px]">
                            <FormField id="cvc" label="CVV" placeholder="123" required error={errors.cvc} value={form.cvc} onChange={(v) => updateField("cvc", v.replace(/\D/g, "").slice(0, cardBrand === "amex" ? 4 : 3))} />
                          </div>
                        </div>
                        <FormField id="nameOnCard" label="Nome no cartão" placeholder="Nome como impresso no cartão" required error={errors.nameOnCard} value={form.nameOnCard} onChange={(v) => updateField("nameOnCard", v.toUpperCase())} />
                      </div>
                    )}
                    {paymentMethod === "pix" && (
                      <div className="bg-[#f6f9fe] border border-[#0569ff] rounded-[12px] p-[20px] flex flex-col gap-[8px]">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">Como funciona o PIX</p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555] leading-relaxed">Após confirmar o pedido, você receberá um QR Code e a chave PIX por e-mail. O pagamento é aprovado em segundos.</p>
                      </div>
                    )}
                    {paymentMethod === "boleto" && (
                      <div className="bg-[#f6f9fe] border border-[#dfa727] rounded-[12px] p-[20px] flex flex-col gap-[8px]">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">Como funciona o Boleto</p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555] leading-relaxed">O boleto será enviado para o seu e-mail. A confirmação pode levar até 3 dias úteis após o pagamento.</p>
                      </div>
                    )}
                  </div>
                </div>

                <button type="button" onClick={() => { if (validateStep4()) setDone(true); }}
                  className="w-full h-[60px] rounded-[12px] flex items-center justify-center gap-[10px] font-['Avenir_LT_Pro:95_Black'] text-[17px] text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <rect x="1" y="7" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                    <path d="M5 7V5a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  FINALIZAR PEDIDO — {formatBRL(grandTotal)}
                </button>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#777] text-center">
                  Ao finalizar, você concorda com os{" "}
                  <Link href="/termos-de-uso" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0569ff] hover:underline">Termos de Uso</Link>{" "}e{" "}
                  <Link href="/politicas-privacidade" className="font-['Avenir_LT_Pro:85_Heavy'] text-[#9f3df5] hover:underline">Política de Privacidade</Link>.
                </p>
              </>
            )}
          </div>

          {/* ══ RIGHT COLUMN ════════════════════════════════════════════════ */}
          <div className="flex-[1_0_0] min-w-[280px] max-w-[480px] self-start sticky top-[100px]">

            <div className="bg-[#f6f9fe] rounded-[16px] flex flex-col">

              {/* Header fixo */}
              <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[16px] shrink-0">
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[20px] text-[#1f2e91]">Resumo do pedido</p>
                {totalQty > 0 && (
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white bg-[#0233c3] px-[10px] py-[4px] rounded-full">
                    {totalQty} produto{totalQty > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Lista de produtos — com scroll */}
              <div className="px-[24px] flex flex-col gap-[16px] pb-[16px]">
                {cartItems.length > 0 ? (
                  <div className="flex flex-col gap-[16px]">
                    {cartItems.map(({ product: p, qty }) => {
                      const prem = isPremium(p);
                      const accent = prem ? "#9f3df5" : "#0233c3";
                      return (
                        <div key={p.id} className="flex gap-[12px] items-center border-b border-[#f0f0f0] pb-[16px] last:border-b-0 last:pb-0">
                          <div className="w-[80px] h-[80px] shrink-0 flex items-center justify-center bg-white rounded-[10px]">
                            <img src={p.img} alt={p.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-tight" style={{ color: "#1f2e91" }}>{p.name}</p>
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#777]">{p.sub}</p>
                            <p className="font-['Avenir_LT_Pro:95_Black'] text-[14px]" style={{ color: accent }}>{formatBRL(p.price)}</p>
                            <div className="flex items-center gap-[6px] mt-[4px]">
                              <button type="button" onClick={() => updateQty(p.id, -1)}
                                className="w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[14px] leading-none hover:bg-gray-50"
                                style={{ borderColor: accent, color: accent }}>−</button>
                              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] min-w-[18px] text-center" style={{ color: accent }}>{qty}</span>
                              <button type="button" onClick={() => updateQty(p.id, +1)}
                                className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[14px] leading-none text-white"
                                style={{ background: accent }}>+</button>
                              <button type="button" onClick={() => removeFromCart(p.id)}
                                className="ml-auto font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#dc2626] underline leading-none">Remover</button>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="font-['Avenir_LT_Pro:95_Black'] text-[15px]" style={{ color: accent }}>{formatBRL(p.price * qty)}</p>
                            {qty > 1 && <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#aab2bc]">× {qty}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#aab2bc] text-center py-[16px]">Nenhum modelo selecionado</p>
                )}

                {FILTER_KITS.filter((k) => kitQty[k.id] > 0).map((kit) => (
                  <div key={kit.id} className="flex gap-[12px] items-center border-t border-[#f0f0f0] pt-[16px]">
                    <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-tight" style={{ color: "#1f2e91" }}>{kit.name}</p>
                      <p className="font-['Avenir_LT_Pro:95_Black'] text-[13px]" style={{ color: kit.color }}>{formatBRL(kit.price)}</p>
                      <div className="flex items-center gap-[6px] mt-[2px]">
                        <button type="button"
                          onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: Math.max(0, prev[kit.id] - 1) }))}
                          className="w-[20px] h-[20px] rounded-full border flex items-center justify-center text-[13px] leading-none hover:bg-gray-50"
                          style={{ borderColor: kit.color, color: kit.color }}>−</button>
                        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] min-w-[16px] text-center" style={{ color: kit.color }}>{kitQty[kit.id]}</span>
                        <button type="button"
                          onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: prev[kit.id] + 1 }))}
                          className="w-[20px] h-[20px] rounded-full flex items-center justify-center text-[13px] leading-none text-white"
                          style={{ background: kit.color }}>+</button>
                        <button type="button"
                          onClick={() => setKitQty((prev) => ({ ...prev, [kit.id]: 0 }))}
                          className="ml-auto font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#dc2626] underline leading-none">Remover</button>
                      </div>
                    </div>
                    <p className="font-['Avenir_LT_Pro:95_Black'] text-[14px] shrink-0" style={{ color: kit.color }}>{formatBRL(kit.price * kitQty[kit.id])}</p>
                  </div>
                ))}
              </div>

              {/* Footer fixo — subtotal, total, avisos */}
              <div className="px-[24px] pb-[24px] shrink-0">
                <div className="border-t border-[#f0f0f0] pt-[16px] flex flex-col gap-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555]">Subtotal ({totalQty} produto{totalQty !== 1 ? "s" : ""})</span>
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#333]">{formatBRL(productsSubtotal)}</span>
                  </div>
                  {FILTER_KITS.filter((k) => kitQty[k.id] > 0).map((kit) => (
                    <div key={kit.id} className="flex justify-between items-center">
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555]">
                        Kit {kit.id === "essentials" ? "Essentials" : "Premium"} × {kitQty[kit.id]}
                      </span>
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px]" style={{ color: kit.color }}>{formatBRL(kit.price * kitQty[kit.id])}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center">
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#555]">Frete</span>
                    {shippingCost === 0
                      ? <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#36ae5c]">GRÁTIS</span>
                      : <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#333]">{formatBRL(shippingCost)}</span>
                    }
                  </div>
                </div>

                <div className="border-t border-[#f0f0f0] pt-[16px] mt-[10px] flex justify-between items-center">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#333]">Total</span>
                  <span className="font-['Avenir_LT_Pro:95_Black'] text-[22px] text-[#0233c3]">{formatBRL(grandTotal)}</span>
                </div>

                {/* CONTINUAR — coluna direita */}
                {step < 5 && (
                  <button
                    type="button"
                    disabled={step === 1 && cart.length === 0}
                    onClick={() => {
                      if (step === 1 && cart.length > 0) goToStep(2);
                      else if (step === 2) { if (validateStep2()) goToStep(3); }
                      else if (step === 3) goToStep(4);
                      else if (step === 4) goToStep(5);
                    }}
                    className={`mt-[16px] w-full h-[52px] rounded-[12px] flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white transition-all ${step === 1 && cart.length === 0 ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"}`}
                    style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
                  >
                    {step === 4 ? "CONTINUAR PARA PAGAMENTO →" : "CONTINUAR →"}
                  </button>
                )}
                {step === 5 && (
                  <button
                    type="button"
                    onClick={() => { if (validateStep4()) setDone(true); }}
                    className="mt-[16px] w-full h-[52px] rounded-[12px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
                  >
                    <svg width="16" height="18" viewBox="0 0 18 20" fill="none">
                      <rect x="1" y="7" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                      <path d="M5 7V5a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    FINALIZAR — {formatBRL(grandTotal)}
                  </button>
                )}

                <div className="flex flex-col gap-[10px] mt-[16px]">
                  <div className="bg-[#fff8f0] border-2 border-[#f5c580] rounded-[10px] px-[16px] py-[10px] flex gap-[10px] items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dfa727" strokeWidth="1.8">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#b8831a]">Apenas 8 unidades em estoque!</p>
                  </div>
                  <div className="bg-white border-2 border-[#e8ecf4] rounded-[10px] px-[16px] py-[10px] flex gap-[10px] items-center">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="#0233c3" strokeWidth="1.5">
                      <circle cx="8" cy="9" r="7"/>
                      <path d="M8 5v4l2.5 2.5" strokeLinecap="round"/>
                    </svg>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3]">
                      Seu pedido está reservado por <span className="text-[#dc2626]">{timer}</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ── Trust strip ────────────────────────────────────────────────── */}
        <div className="bg-[#f6f9fe] rounded-[16px] flex flex-wrap gap-[8px] items-center justify-center p-[20px]">
            {[
              { label: "Compra 100% segura",              desc: "Pagamento criptografado e protegido.",      icon: "/figma-assets/checkin-icon-shield.svg"   },
              { label: "Frete grátis para todo o Brasil", desc: "Entrega sem custo para qualquer estado.",   icon: "/figma-assets/checkin-icon-delivery.svg" },
              { label: "Garantia de 1 ano",               desc: "Cobertura total sem burocracia",            icon: "/figma-assets/checkin-icon-warranty.svg" },
              { label: "Suporte especializado",           desc: "Atendimento com especialistas Acquafy",     icon: "/figma-assets/checkin-icon-support.svg"  },
            ].map((badge, i) => (
              <div key={i} className="flex flex-[1_0_0] gap-[8px] items-center min-w-[180px]">
                <div className="size-[32px] flex items-center justify-center shrink-0">
                  <img src={badge.icon} alt="" className="h-[30px] w-auto" />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{badge.label}</span>
                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{badge.desc}</span>
                </div>
              </div>
            ))}
        </div>

        {/* ── Depoimentos ────────────────────────── */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[24px] text-[#1f2e91] leading-tight">O que dizem nossos clientes</p>
            <div className="flex items-center gap-[10px]">
              <div className="flex gap-[3px]">
                {[0,1,2,3,4].map((i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#dfa727">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="font-['Avenir_LT_Pro:95_Black'] text-[15px] text-[#dfa727]">4.9</span>
              <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#aab2bc]">· mais de 3.200 clientes satisfeitos</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {[
              { initials: "MC", name: "Mariana C.", role: "Cliente", city: "São Paulo, SP",       color: "#0233c3", colorB: "#0569ff", quote: "\"A qualidade da água mudou completamente. O Neo PLUS é incrível — minha família adora a água hidrogenada!\"" },
              { initials: "RL", name: "Rafael L.",  role: "Empresário", city: "Belo Horizonte, MG", color: "#9f3df5", colorB: "#c46cff", quote: "\"Comprei o Neo INFINITY para o escritório. O painel touch de 15″ impressiona todo mundo. Suporte impecável.\"" },
              { initials: "JS", name: "Juliana S.", role: "Consumidora", city: "Curitiba, PR",      color: "#36ae5c", colorB: "#52c97a", quote: "\"Instalação rápida, água gelada na hora. O app é muito prático para acompanhar a vida dos filtros.\"" },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-[16px] p-[24px] flex flex-col gap-[16px] shadow-[0_2px_12px_rgba(2,51,195,0.06)]">
                <div className="flex items-center gap-[14px]">
                  <div className="shrink-0 size-[52px] rounded-full flex items-center justify-center font-['Avenir_LT_Pro:95_Black'] text-[18px] text-white" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.colorB})` }}>
                    {t.initials}
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">{t.name}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#aab2bc]">{t.role} · {t.city}</p>
                  </div>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#444] leading-relaxed flex-1">{t.quote}</p>
                <div className="flex gap-[3px]">
                  {[0,1,2,3,4].map((j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#dfa727">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── MOBILE STICKY CTA ─────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-[9996] lg:hidden pointer-events-none">
        <div className="px-[16px] pb-[16px] pt-[28px] pointer-events-auto" style={{ background: "linear-gradient(to top, rgba(246,249,254,1) 70%, rgba(246,249,254,0))" }}>
          {step === 1 && (
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => { if (cart.length > 0) goToStep(2); }}
              className={`w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] transition-all ${cart.length > 0 ? "active:opacity-90" : "opacity-40 cursor-not-allowed"}`}
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              {cart.length > 0 ? `CONTINUAR COM ${totalQty} PRODUTO${totalQty > 1 ? "S" : ""} →` : "CONTINUAR →"}
            </button>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={() => { if (validateStep2()) goToStep(3); }}
              className="w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] active:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              CONTINUAR →
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] active:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              CONTINUAR →
            </button>
          )}
          {step === 4 && (
            <button
              type="button"
              onClick={() => goToStep(5)}
              className="w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] active:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              CONTINUAR PARA PAGAMENTO →
            </button>
          )}
          {step === 5 && (
            <button
              type="button"
              onClick={() => { if (validateStep4()) setDone(true); }}
              className="w-full h-[54px] rounded-[14px] flex items-center justify-center gap-[8px] font-['Avenir_LT_Pro:95_Black'] text-[15px] text-white shadow-[0_4px_24px_rgba(2,51,195,0.35)] active:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #0233c3, #9f3df5)" }}
            >
              <svg width="16" height="18" viewBox="0 0 18 20" fill="none">
                <rect x="1" y="7" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                <path d="M5 7V5a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              FINALIZAR PEDIDO →
            </button>
          )}
        </div>
      </div>

    </section>
  );
}
