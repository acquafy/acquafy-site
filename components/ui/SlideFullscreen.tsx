"use client";
import Img from "@/components/ui/Img";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const ICON_STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function SlideFullscreenButton({ onOpen, label = "Tela cheia" }: { onOpen: () => void; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => { e.stopPropagation(); onOpen(); }}
      onKeyDown={(e) => e.stopPropagation()}
      className="absolute top-[10px] right-[10px] z-10 flex size-[32px] items-center justify-center rounded-[8px] bg-black/60 text-white opacity-0 transition-opacity duration-150 hover:bg-black/80 focus-visible:opacity-100 group-hover:opacity-100 cursor-pointer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path {...ICON_STROKE} d="M17 3c.464 0 .697 0 .892.022a3.5 3.5 0 0 1 3.086 3.086C21 6.303 21 6.536 21 7m-4 14c.464 0 .697 0 .892-.022a3.5 3.5 0 0 0 3.086-3.086C21 17.697 21 17.464 21 17M7 3c-.464 0-.697 0-.892.022a3.5 3.5 0 0 0-3.086 3.086C3 6.303 3 6.536 3 7m4 14c-.464 0-.697 0-.892-.022a3.5 3.5 0 0 1-3.086-3.086C3 17.697 3 17.464 3 17" />
      </svg>
    </button>
  );
}

export function SlideLightbox({
  src,
  alt = "",
  srcs,
  index = 0,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  src: string;
  alt?: string;
  srcs?: string[];
  index?: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onGoTo?: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev?.();
      else if (e.key === "ArrowRight") onNext?.();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const showNav = !!srcs && srcs.length > 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-[12px] bg-white/85 p-[20px]"
      onClick={onClose}
    >
      {/* Image wrapper — buttons are relative to this, ensuring they're always above the image */}
      <div
        className="relative min-h-0 flex-1 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Img
          alt={alt}
          src={src}
          className="max-h-full max-w-full rounded-[16px] object-contain shadow-2xl block"
        />

        {/* Close */}
        <button
          type="button"
          aria-label="Fechar"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-[10px] right-[10px] z-10 flex size-[44px] items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path {...ICON_STROKE} d="M18 6L6 18m12 0L6 6" />
          </svg>
        </button>

        {/* Prev */}
        {onPrev && (
          <button
            type="button"
            aria-label="Slide anterior"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10 flex size-[44px] items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path {...ICON_STROKE} d="M15 6s-6 4.419-6 6s6 6 6 6" />
            </svg>
          </button>
        )}

        {/* Next */}
        {onNext && (
          <button
            type="button"
            aria-label="Próximo slide"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 flex size-[44px] items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path {...ICON_STROKE} d="M9 6s6 4.419 6 6s-6 6-6 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {showNav && (
        <div
          className="flex gap-[8px] overflow-x-auto pb-[2px] max-w-full shrink-0"
          style={{ scrollbarWidth: "thin" }}
          onClick={(e) => e.stopPropagation()}
        >
          {srcs!.map((s, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => onGoTo?.(i)}
              className={`shrink-0 h-[56px] rounded-[6px] overflow-hidden border-2 transition-opacity cursor-pointer ${
                i === index ? "border-[#0233c3] opacity-100" : "border-transparent opacity-40 hover:opacity-70"
              }`}
            >
              <Img src={s} alt="" className="h-full w-auto block object-cover pointer-events-none" />
            </button>
          ))}
        </div>
      )}

      {/* Dots */}
      {showNav && (
        <div
          className="flex gap-[8px] items-center shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {srcs!.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => onGoTo?.(i)}
              className={`rounded-full transition-all cursor-pointer ${
                i === index ? "size-[10px] bg-[#0233c3]" : "size-[8px] bg-black/30 hover:bg-black/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
