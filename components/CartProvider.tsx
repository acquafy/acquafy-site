"use client";
import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { PRODUCT_CATALOG, PRODUCT_PRICES_BRL, formatBRL } from "@/lib/products";

type CartItem = { id: string; qty: number };

interface CartContextValue {
  cart: CartItem[];
  addToCart: (productId: string, label: string) => void;
  openCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  cart: [],
  addToCart: () => {},
  openCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{ id: string; label: string } | null>(null);
  const [toastFlyOut, setToastFlyOut] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastFlyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (toastFlyTimer.current) clearTimeout(toastFlyTimer.current);
    setToastFlyOut(true);
    toastFlyTimer.current = setTimeout(() => {
      setToast(null);
      setToastFlyOut(false);
    }, 600);
  }, []);

  const addToCart = useCallback((productId: string, label: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === productId);
      if (existing) return prev.map(i => i.id === productId ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: productId, qty: 1 }];
    });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (toastFlyTimer.current) clearTimeout(toastFlyTimer.current);
    setToastFlyOut(false);
    setToast({ id: productId, label });
    toastTimer.current = setTimeout(() => {
      setToastFlyOut(true);
      toastFlyTimer.current = setTimeout(() => {
        setToast(null);
        setToastFlyOut(false);
      }, 600);
    }, 4000);
  }, []);

  const openCart = useCallback(() => setShowCartPanel(true), []);

  const [extraBottom, setExtraBottom] = useState(0);
  const [pastBanner, setPastBanner] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const update = () => {
      const overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
      setExtraBottom(overlap > 0 ? overlap + 8 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const check = () => setPastBanner(window.scrollY > 150);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + (PRODUCT_PRICES_BRL[item.id] ?? 0) * item.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, openCart }}>
      {children}

      {/* ── BOTÃO FLUTUANTE CARRINHO ── */}
      {pathname !== '/checkin' && pastBanner && (
        <button
          onClick={() => setShowCartPanel(true)}
          suppressHydrationWarning
          className="fixed right-[20px] z-[9997] flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(2,51,195,0.30)] transition-transform hover:scale-110 cursor-pointer"
          style={{ background: "linear-gradient(135deg, #0233c3, #0569ff)", width: 46, height: 46, bottom: 86 + extraBottom }}
          title="Ver carrinho"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 2.5h2l2.5 11h9.5l2-8H6.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="18.5" r="1.5" fill="white"/>
            <circle cx="15.5" cy="18.5" r="1.5" fill="white"/>
          </svg>
          {cartCount > 0 && (
            <span
              className="absolute flex items-center justify-center rounded-full text-white font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-none"
              style={{ background: "#9f3df5", minWidth: 18, height: 18, top: -4, right: -4, padding: "0 4px" }}
            >
              {cartCount}
            </span>
          )}
        </button>
      )}

      {/* ── TOAST NOTIFICAÇÃO ── */}
      <div
        className="fixed top-[90px] right-[20px] z-[9999]"
        style={{
          opacity: toast ? (toastFlyOut ? 0 : 1) : 0,
          pointerEvents: toast && !toastFlyOut ? "auto" : "none",
          transform: toastFlyOut
            ? "translateY(calc(100vh - 210px)) scale(0.12)"
            : toast
              ? "translateX(0)"
              : "translateX(calc(100% + 20px))",
          transition: toastFlyOut
            ? "opacity 0.55s cubic-bezier(0.4, 0, 0.8, 0.9), transform 0.55s cubic-bezier(0.4, 0, 0.8, 0.9)"
            : "all 0.3s ease",
          transformOrigin: "right top",
        }}
      >
        {toast && (() => {
          const product = PRODUCT_CATALOG.find(p => p.id === toast.id);
          return (
            <div className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(2,51,195,0.18)] border border-[#e0e8f8] p-[16px] flex flex-col gap-[12px] w-[300px]">
              <div className="flex items-start gap-[12px]">
                <div className="flex items-center justify-center rounded-full shrink-0 size-[36px]" style={{ background: "linear-gradient(135deg, #36ae5c, #2a9a50)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#2a2a2b]">Adicionado ao carrinho!</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[15px] text-[#8a8f97] truncate">{toast.label}</p>
                </div>
                <button onClick={dismissToast} className="text-[#8a8f97] hover:text-[#333] transition-colors shrink-0 mt-[2px] cursor-pointer text-[16px] leading-none">×</button>
              </div>
              {product && (
                <div className="bg-[#f6f9fe] rounded-[10px] flex items-center gap-[10px] px-[12px] py-[8px]">
                  <img src={product.img} alt={product.label} className="size-[40px] object-contain shrink-0" />
                  <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[15px] text-[#1f2e91] truncate">{product.label}</p>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[15px] text-[#0233c3]">{formatBRL(PRODUCT_PRICES_BRL[toast.id] ?? 0)}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-[8px]">
                <button
                  onClick={dismissToast}
                  className="flex-1 py-[8px] rounded-full font-['Avenir_LT_Pro:85_Heavy'] text-[12px] border border-[#cbd0d4] text-[#555] hover:border-[#0233c3] hover:text-[#0233c3] transition-colors cursor-pointer"
                >
                  Continuar
                </button>
                <button
                  onClick={() => { dismissToast(); setShowCartPanel(true); }}
                  className="flex-1 py-[8px] rounded-full font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-white cursor-pointer hover:opacity-85 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #0569ff)" }}
                >
                  Ver carrinho
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── PAINEL CARRINHO ── */}
      {showCartPanel && (
        <div className="fixed inset-0 z-[9998]" onClick={() => setShowCartPanel(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div
            className="absolute top-0 right-0 h-full w-full max-w-[400px] bg-white flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e0e8f8]">
              <div className="flex items-center gap-[10px]">
                <div className="flex items-center justify-center rounded-full size-[36px]" style={{ background: "linear-gradient(135deg, #0233c3, #0569ff)" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2h1.5l2 9h8l1.5-6H5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="15" r="1.2" fill="white"/><circle cx="12.5" cy="15" r="1.2" fill="white"/></svg>
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91]">Carrinho ({cartCount})</p>
              </div>
              <button onClick={() => setShowCartPanel(false)} className="bg-[#f2f6fd] flex items-center justify-center rounded-full size-[36px] hover:bg-[#e8f0ff] transition-colors cursor-pointer text-[20px] text-[#555]">×</button>
            </div>

            <div className="flex-1 overflow-y-auto px-[24px] py-[16px] flex flex-col gap-[12px]">
              {cart.length === 0 ? (
                <div className="flex flex-col gap-[12px] items-center mt-[32px]">
                  <div className="flex items-center justify-center rounded-full size-[56px] mb-[4px]" style={{ background: "linear-gradient(135deg, #f0f4ff, #f5f0ff)" }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M3 3h2.5l3 14h12l2.5-10H8" stroke="#0233c3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12.5" cy="23" r="2" fill="#0233c3"/><circle cx="19.5" cy="23" r="2" fill="#0233c3"/></svg>
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91] text-center">Seu carrinho está vazio</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#8a8f97] text-center leading-[18px]">Explore nossos produtos e adicione ao carrinho.</p>
                  <div className="flex flex-col gap-[8px] w-full mt-[8px]">
                    <a href="/linha-neo" className="flex items-center justify-center gap-[8px] py-[11px] rounded-full font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white hover:opacity-85 transition-opacity" style={{ background: "linear-gradient(135deg, #0233c3, #0569ff)" }}>
                      Conheça a Linha Neo →
                    </a>
                    <a href="/compare" className="flex items-center justify-center gap-[8px] py-[11px] rounded-full font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3] border border-[#0233c3] hover:bg-[#f0f4ff] transition-colors">
                      Compare os Produtos →
                    </a>
                    <a href="/checkin" className="flex items-center justify-center gap-[8px] py-[11px] rounded-full font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#555] border border-[#cbd0d4] hover:border-[#0233c3] hover:text-[#0233c3] transition-colors">
                      Escolha e compre agora →
                    </a>
                  </div>
                </div>
              ) : cart.map(item => {
                const product = PRODUCT_CATALOG.find(p => p.id === item.id);
                if (!product) return null;
                return (
                  <div key={item.id} className="bg-[#f6f9fe] rounded-[12px] flex items-center gap-[12px] p-[12px]">
                    <img src={product.img} alt={product.label} className="size-[56px] object-contain shrink-0" />
                    <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#1f2e91] truncate">{product.label}</p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#8a8f97]">Linha Neo {product.linha}</p>
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#0233c3]">{formatBRL(PRODUCT_PRICES_BRL[item.id] ?? 0)}</p>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="size-[26px] flex items-center justify-center rounded-full bg-white border border-[#cbd0d4] text-[#333] hover:border-[#0233c3] hover:text-[#0233c3] transition-colors cursor-pointer text-[14px] font-bold">−</button>
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#2a2a2b] w-[20px] text-center">{item.qty}</span>
                      <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="size-[26px] flex items-center justify-center rounded-full bg-white border border-[#cbd0d4] text-[#333] hover:border-[#0233c3] hover:text-[#0233c3] transition-colors cursor-pointer text-[14px] font-bold">+</button>
                    </div>
                    <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} className="text-[#8a8f97] hover:text-[#e53935] transition-colors cursor-pointer text-[18px] shrink-0 leading-none">×</button>
                  </div>
                );
              })}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#e0e8f8] px-[24px] py-[20px] flex flex-col gap-[16px]">
                <div className="flex items-center justify-between">
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#555]">Total</p>
                  <p className="font-['Avenir_LT_Pro:95_Black'] text-[20px] text-[#0233c3]">{formatBRL(cartTotal)}</p>
                </div>
                <a
                  href={`/checkin?produtos=${encodeURIComponent(cart.map(i => `${i.id}:${i.qty}`).join(','))}`}
                  className="flex items-center justify-center gap-[8px] py-[14px] rounded-full font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-white cursor-pointer hover:opacity-85 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #0233c3, #0569ff)" }}
                >
                  Finalizar compra →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}
