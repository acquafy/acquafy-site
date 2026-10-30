"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Fullscreen helpers for the panel slideshows.
 *   <SlideFullscreenButton onOpen={...} />  — shown at the top-right of the slide while the pointer is over it
 *   <SlideLightbox src alt onClose onPrev onNext /> — the current slide shown large, centred on the screen
 * The slide container needs the `group` class (and `relative`) for the button's hover state.
 */

const ICON_STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

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

function RoundButton({ onClick, label, className, children }: { onClick: () => void; label: string; className: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`absolute flex size-[44px] items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 cursor-pointer ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
    </button>
  );
}

export function SlideLightbox({
  src,
  alt = "",
  onClose,
  onPrev,
  onNext,
}: {
  src: string;
  alt?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-[20px]"
      onClick={onClose}
    >
      <img
        alt={alt}
        src={src}
        className="max-h-full max-w-full rounded-[16px] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <RoundButton onClick={onClose} label="Fechar" className="top-[20px] right-[20px]">
        <path {...ICON_STROKE} d="M18 6L6 18m12 0L6 6" />
      </RoundButton>
      {onPrev && (
        <RoundButton onClick={onPrev} label="Slide anterior" className="left-[20px] top-1/2 -translate-y-1/2">
          <path {...ICON_STROKE} d="M15 6s-6 4.419-6 6s6 6 6 6" />
        </RoundButton>
      )}
      {onNext && (
        <RoundButton onClick={onNext} label="Próximo slide" className="right-[20px] top-1/2 -translate-y-1/2">
          <path {...ICON_STROKE} d="M9 6s6 4.419 6 6s-6 6-6 6" />
        </RoundButton>
      )}
    </div>,
    document.body,
  );
}
