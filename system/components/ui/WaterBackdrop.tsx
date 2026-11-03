// components/ui/WaterBackdrop.tsx
"use client";

import { useEffect, useRef } from "react";

type Layer = { base: number; amp: number; length: number; speed: number; phase: number; alpha: number };

/** Four slow, overlapping sine waves; `base` is a fraction of the height measured from the top. */
const LAYERS: Layer[] = [
  { base: 0.62, amp: 0.05, length: 1.1, speed: 0.35, phase: 0, alpha: 0.55 },
  { base: 0.7, amp: 0.045, length: 0.8, speed: -0.5, phase: 1.7, alpha: 0.6 },
  { base: 0.78, amp: 0.04, length: 0.62, speed: 0.7, phase: 3.1, alpha: 0.7 },
  { base: 0.87, amp: 0.035, length: 0.5, speed: -0.9, phase: 4.6, alpha: 0.85 },
];

type Bubble = { x: number; speed: number; size: number; offset: number };
const BUBBLES: Bubble[] = Array.from({ length: 9 }, (_, i) => ({ x: (i * 0.113 + 0.07) % 1, speed: 0.025 + (i % 4) * 0.012, size: 2 + (i % 3) * 1.5, offset: (i * 0.37) % 1 }));

const FRAME_MS = 1000 / 30;

/**
 * Light "water" animation drawn on a <canvas>: gently moving waves and a few rising bubbles. It is a generated loop
 * (no video file to download): ~30 fps, capped pixel ratio, paused while off-screen or in a background tab, and a
 * single still frame when the visitor prefers reduced motion. Colours come from the `--wave-*` CSS variables, so Dia
 * and Noite each get their own tint. Decorative: `aria-hidden`.
 */
export function WaterBackdrop({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let colors = { a: "", b: "", bubble: "" };
    let raf = 0;
    let last = 0;
    let visible = true;
    const start = performance.now();

    const readColors = () => {
      const s = getComputedStyle(canvas);
      colors = { a: s.getPropertyValue("--wave-a").trim(), b: s.getPropertyValue("--wave-b").trim(), bubble: s.getPropertyValue("--wave-bubble").trim() };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      LAYERS.forEach((layer, i) => {
        const grad = ctx.createLinearGradient(0, height * layer.base, 0, height);
        grad.addColorStop(0, i % 2 ? colors.b : colors.a);
        grad.addColorStop(1, colors.a);
        // Crest of the wave, sampled once: the same points fill the body and draw the light on the edge.
        const crest: [number, number][] = [];
        for (let x = 0; x <= width + 10; x += 10) {
          const k = (x / (width * layer.length)) * Math.PI * 2;
          const y = height * layer.base + Math.sin(k + t * layer.speed + layer.phase) * height * layer.amp + Math.sin(k * 2.3 - t * layer.speed * 0.7) * height * layer.amp * 0.35;
          crest.push([x, y]);
        }

        ctx.globalAlpha = layer.alpha;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (const [x, y] of crest) ctx.lineTo(x, y);
        ctx.lineTo(width + 10, height);
        ctx.closePath();
        ctx.fill();

        // Thin glint along the crest; the CSS blur on the canvas melts it into a soft specular highlight.
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = colors.bubble;
        ctx.lineWidth = 1.5 + i * 0.4;
        ctx.beginPath();
        crest.forEach(([x, y], idx) => (idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.bubble;
      for (const b of BUBBLES) {
        const progress = (t * b.speed + b.offset) % 1;
        const y = height * (1.02 - progress * 0.75);
        const x = width * b.x + Math.sin(t * 0.8 + b.offset * 9) * 8;
        ctx.globalAlpha = Math.sin(progress * Math.PI) * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, b.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < FRAME_MS) return;
      last = now;
      draw(now);
    };

    readColors();
    resize();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    // Repaint with the new tint when the visitor flips Dia/Noite.
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(canvas);

    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersection.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
