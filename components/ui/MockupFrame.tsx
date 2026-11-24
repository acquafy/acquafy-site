"use client";

import { useEffect, useRef, useState } from "react";
import Img from "@/components/ui/Img";

/**
 * Frame for the tablet + phone mockup picture (16:9) used in the banners. The devices only fill the middle of the
 * picture, so the frame zooms it just enough for them to read larger without cropping them: with object-cover the visible
 * share of the picture depends on the frame's proportion, and the devices occupy about 58% x 76% of it (with margin).
 */
export default function MockupFrame({ className, src, alt }: { className: string; src: string; alt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const update = () => {
      const ratio = el.clientWidth / el.clientHeight; // frame aspect
      const picture = 16 / 9;
      const visibleW = Math.min(1, ratio / picture); // share of the picture's width that object-cover shows
      const visibleH = Math.min(1, picture / ratio); // share of the picture's height
      setZoom(Math.max(1, Math.min(visibleW / 0.58, visibleH / 0.76)));
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className={className}>
      <Img src={src} alt={alt} className="w-full h-full object-cover" style={{ transform: `scale(${zoom})` }} />
    </div>
  );
}
