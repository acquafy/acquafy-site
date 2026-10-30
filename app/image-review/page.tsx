"use client";
import { useState } from "react";

const ALL_IMAGES = [
  { file: "banner-neo-bg.webp", label: "Banner Neo — fundo (Hero)", section: "Banners" },
  { file: "banner-neo-products.webp", label: "Banner Neo — produtos (card mobile)", section: "Banners" },
  { file: "banner-contato-bg.webp", label: "Banner Contato — fundo", section: "Banners" },
  { file: "banner-contato-products.webp", label: "Banner Contato — produtos", section: "Banners" },
  { file: "banner-acessorios-bg.webp", label: "Banner Acessórios — fundo", section: "Banners" },
  { file: "banner-app-ai-iot.webp", label: "Banner App/AI/IoT", section: "Banners" },
  { file: "banner-app-ai-iot-menor.webp", label: "Banner App/AI/IoT — menor", section: "Banners" },
  { file: "banner-card-mobile.webp", label: "Banner card mobile", section: "Banners" },
  { file: "compare-banner-bg.webp", label: "Compare — fundo do banner", section: "Banners" },
  { file: "compare-banner-products.webp", label: "Compare — produtos", section: "Banners" },
  { file: "image-banner-home.webp", label: "Image Banner Home", section: "Banners" },
  { file: "main-image.webp", label: "Main Image (Hero)", section: "Seções" },
  { file: "compat-neo-premium.webp", label: "Compatibilidade Neo + Premium", section: "Seções" },
  { file: "image-filters.webp", label: "Filtros — imagem de destaque", section: "Seções" },
  { file: "image-suporte.webp", label: "Suporte — imagem de destaque", section: "Seções" },
  { file: "image-demais.webp", label: "Demais produtos — imagem", section: "Seções" },
  { file: "image-folheto.webp", label: "Folheto / Brochure", section: "Seções" },
  { file: "bg-essentials-section.webp", label: "BG Essentials — seção", section: "Seções" },
  { file: "platform-hero-bg.webp", label: "Platform — fundo hero", section: "Platform" },
  { file: "platform-hero-mockup.webp", label: "Platform — mockup hero", section: "Platform" },
  { file: "mockup-a.webp", label: "Mockup A", section: "Platform" },
  { file: "mockup-tablet-phone.webp", label: "Mockup tablet + phone", section: "Platform" },
  { file: "frame-1024.webp", label: "Frame 1024", section: "Frames" },
  { file: "frame-36-mobile-product.webp", label: "Frame 36 — mobile produto", section: "Frames" },
  { file: "acquafy-media-totem.webp", label: "Acquafy Media Totem", section: "Produtos em Cena" },
  { file: "neo-up-bow.webp", label: "Neo UP — Bow", section: "Produtos em Cena" },
  { file: "panel-led.webp", label: "Panel LED (produto antigo)", section: "Produtos em Cena" },
  { file: "premium-slide-1.webp", label: "Premium Slide 1", section: "Produtos em Cena" },
  { file: "premium-slide-2.webp", label: "Premium Slide 2", section: "Produtos em Cena" },
  { file: "premium-slideshow-1.webp", label: "Premium Slideshow 1", section: "Produtos em Cena" },
  { file: "premium-slideshow-2.webp", label: "Premium Slideshow 2", section: "Produtos em Cena" },
  { file: "premium-slideshow-3.webp", label: "Premium Slideshow 3", section: "Produtos em Cena" },
];

export default function ImageReviewPage() {
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const visible = ALL_IMAGES.filter((i) => !hidden.has(i.file));
  const sections = Array.from(new Set(ALL_IMAGES.map((i) => i.section)));

  const remove = (file: string) => setHidden((prev) => new Set([...prev, file]));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0a0a0a", minHeight: "100vh", color: "#fff", padding: "40px 32px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Revisão de Imagens com Produtos</h1>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 48 }}>
        {visible.length} imagens restantes — clique no × para remover da visualização.
      </p>

      {sections.map((section) => {
        const sectionImages = visible.filter((i) => i.section === section);
        if (sectionImages.length === 0) return null;
        return (
          <div key={section} style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#4dabf7", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24, borderBottom: "1px solid #1e1e1e", paddingBottom: 12 }}>
              {section} <span style={{ color: "#555", fontWeight: 400, fontSize: 13 }}>({sectionImages.length})</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {sectionImages.map(({ file, label }) => (
                <div key={file} style={{ background: "#111", borderRadius: 10, overflow: "hidden", border: "1px solid #222", position: "relative" }}>
                  <button
                    onClick={() => remove(file)}
                    style={{
                      position: "absolute", top: 8, right: 8, zIndex: 10,
                      width: 28, height: 28, borderRadius: "50%",
                      background: "rgba(255,255,255,0.12)", border: "none",
                      color: "#fff", fontSize: 16, lineHeight: 1,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                    aria-label="Remover"
                  >
                    ×
                  </button>
                  <div style={{ background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/figma-assets/${file}`}
                      alt={label}
                      style={{ maxWidth: "100%", maxHeight: 280, objectFit: "contain", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>{file}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
