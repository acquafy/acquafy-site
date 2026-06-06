/**
 * FigmaIcon — replicates the Figma icon-component structure:
 *   outer fixed-size container → aspect-ratio inner wrapper → 2.5 % bleed div → img
 *
 * This prevents icons from appearing squished when the SVG has internal
 * padding or a viewBox that doesn't match the slot dimensions.
 *
 * Square usage (most icons):
 *   <FigmaIcon src={src} size={30} />
 *
 * Non-square usage (e.g. Cloud icon 30 × 22):
 *   <FigmaIcon src={src} size={30} aspectW={30} aspectH={22} />
 */

interface FigmaIconProps {
  src: string;
  alt?: string;
  /** Slot size in px — the outer container is always a square of this size */
  size: number;
  /** SVG content width  — only needed when content is NOT square (default = size) */
  aspectW?: number;
  /** SVG content height — only needed when content is NOT square (default = size) */
  aspectH?: number;
  /** Extra className forwarded to the outer container (e.g. for rotation) */
  className?: string;
}

export default function FigmaIcon({
  src,
  alt = "",
  size,
  aspectW,
  aspectH,
  className = "",
}: FigmaIconProps) {
  const w = aspectW ?? size;
  const h = aspectH ?? size;
  const bleed = 2.5;

  if (w === h) {
    /* ── Square icon ─────────────────────────────────────────────────── */
    return (
      <div
        className={`flex flex-col items-center justify-center relative shrink-0${className ? ` ${className}` : ""}`}
        style={{ width: size, height: size }}
      >
        <div
          className="relative min-h-px"
          style={{ aspectRatio: "1 / 1", flex: "1 0 0" }}
        >
          <div className="absolute inset-[-2.5%]">
            <img alt={alt} className="block max-w-none size-full" src={src} />
          </div>
        </div>
      </div>
    );
  }

  /* ── Non-square icon ──────────────────────────────────────────────── */
  // Scale so the LONGEST axis fills `size` px exactly.
  // e.g. 10×15 icon in a 30px slot → scale = 30/15 = 2 → inner = 20×30
  const scale = size / Math.max(w, h);
  const innerW = w * scale;
  const innerH = h * scale;

  // Bleed keeps equal absolute pixels on all 4 sides (= size × 2.5%).
  // Expressed as % of the inner dimension:
  //   long side  → always `size` px → 2.5% of size   = bleedLong
  //   short side → `scale × short` → same absolute px = bleedShort (larger %)
  const bleedShort = ((bleed * Math.max(w, h)) / Math.min(w, h)).toFixed(2);
  const bleedLong = bleed.toFixed(2);
  // CSS inset shorthand: "vertical horizontal"
  // Portrait (h > w): long=H → top/bottom use bleedLong, left/right use bleedShort
  // Landscape (w > h): long=W → left/right use bleedLong, top/bottom use bleedShort
  const inset =
    w > h
      ? `-${bleedShort}% -${bleedLong}%`   // landscape: bigger bleed vertically
      : `-${bleedLong}% -${bleedShort}%`;   // portrait:  bigger bleed horizontally

  return (
    <div
      className={`flex flex-col items-center justify-center relative shrink-0${className ? ` ${className}` : ""}`}
      style={{ width: size, height: size }}
    >
      {/* Inner wrapper: exact computed px — longest axis = size, other axis scales proportionally */}
      <div
        className="relative shrink-0"
        style={{ width: innerW, height: innerH }}
      >
        <div className="absolute" style={{ inset }}>
          <img alt={alt} className="block max-w-none size-full" src={src} />
        </div>
      </div>
    </div>
  );
}
