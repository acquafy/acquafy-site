"use client";
import { useState } from "react";

const ALL_IMAGES = [
  { file: "banner-neo-bg.webp",           label: "Banner Neo — fundo (Hero)",     section: "Banners" },
  { file: "banner-neo-products.webp",     label: "Banner Neo — produtos mobile",  section: "Banners" },
  { file: "compare-banner-bg.webp",       label: "Compare — fundo",               section: "Banners" },
  { file: "compare-banner-products.webp", label: "Compare — produtos",            section: "Banners" },
  { file: "compat-neo-premium.webp",      label: "Compatibilidade Neo + Premium", section: "Banners" },

  { file: "neo-up-bow.webp",              label: "Neo UP — Bow",       section: "Neo Essentials" },
  { file: "frame-1024.webp",              label: "Frame 1024",          section: "Neo Essentials" },
  { file: "frame-36-mobile-product.webp", label: "Frame 36 — mobile",  section: "Neo Essentials" },

  { file: "premium-slide-1.webp",     label: "Premium Slide 1",     section: "Neo Premium" },
  { file: "premium-slide-2.webp",     label: "Premium Slide 2",     section: "Neo Premium" },
  { file: "premium-slideshow-1.webp", label: "Premium Slideshow 1", section: "Neo Premium" },
  { file: "premium-slideshow-2.webp", label: "Premium Slideshow 2", section: "Neo Premium" },
  { file: "premium-slideshow-3.webp", label: "Premium Slideshow 3", section: "Neo Premium" },
];

export default function ImageReviewPage() {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const visible = ALL_IMAGES.filter((i) => !hidden.has(i.file));
  const sections = Array.from(new Set(ALL_IMAGES.map((i) => i.section)));
  const remove = (file: string) => setHidden((prev) => new Set([...prev, file]));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0a0a0a", minHeight: "100vh", color: "#fff", padding: "40px 32px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Revisão — Produtos Neo Essentials &amp; Premium</h1>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 48 }}>{visible.length} imagens</p>

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
                  <button onClick={() => remove(file)} style={{ position: "absolute", top: 8, right: 8, zIndex: 10, width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", fontSize: 16, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Remover">×</button>
                  <div style={{ background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/figma-assets/${file}`} alt={label} style={{ maxWidth: "100%", maxHeight: 280, objectFit: "contain", display: "block" }} />
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
