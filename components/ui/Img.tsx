import { getImageProps } from "next/image";
import { preload } from "react-dom";
import type { ComponentProps } from "react";

type ImgProps = ComponentProps<"img"> & {
  /**
   * The image is the page's LCP / above-the-fold image: load it eagerly, with high fetch priority, and emit a
   * `<link rel="preload">` for it in the document head. Use it only for an image that is visible at first paint.
   */
  priority?: boolean;
};

/** Raster images in /public are served through the Next.js image optimizer; SVGs, data/blob URLs and remote URLs are not. */
function isOptimizable(src: unknown): src is string {
  return typeof src === "string" && src.startsWith("/") && !src.startsWith("//") && !/\.svg($|\?)/i.test(src);
}

/** The element's CSS width does not depend on the image's natural size, so the browser knows it before the image loads. */
const EXPLICIT_WIDTH = /(^|\s)(\w+:)*(w-(full|screen|\d|\[)|size-(full|\d|\[)|min-w-full)/;

function hasExplicitWidth(className: string | undefined, style: ComponentProps<"img">["style"]): boolean {
  return style?.width !== undefined || EXPLICIT_WIDTH.test(className ?? "");
}

/**
 * Drop-in replacement for `<img>`. It keeps the element, classes and styles the Figma-derived layouts rely on (no
 * wrapper, no injected positioning) and adds what `next/image` provides:
 * - a responsive `srcSet` of resized AVIF/WebP variants from the Next.js image optimizer, so a 3200px source is not
 *   downloaded to fill a 380px card.
 * - `loading="lazy"` and `decoding="async"` by default, so off-screen and `display:none` images cost nothing.
 *
 * `sizes` defaults to `100vw` (never blurry). Lazy images whose width and height are set by CSS also get `sizes="auto"`, which lets
 * the browser pick the variant from the rendered width; browsers without auto-sizes use the fallback after the comma.
 */
export default function Img({ src, sizes, priority = false, loading, decoding, fetchPriority, ...rest }: ImgProps) {
  const eager = priority || loading === "eager";
  const attrs = {
    loading: eager ? ("eager" as const) : (loading ?? ("lazy" as const)),
    decoding: decoding ?? (eager ? ("sync" as const) : ("async" as const)),
    fetchPriority: fetchPriority ?? (priority ? ("high" as const) : undefined),
  };

  if (!isOptimizable(src)) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} sizes={sizes} {...attrs} {...rest} />;
  }

  const fallbackSizes = sizes ?? "100vw";
  const { props: optimized } = getImageProps({ src, alt: "", fill: true, sizes: fallbackSizes });
  // Auto sizes applies size containment: flow images with h-auto would otherwise collapse to 150px high.
  const hasExplicitHeight = rest.style?.height !== undefined || /(^|\s)(size-|h-(full|screen|\d|\[))/.test(rest.className ?? "");
  const autoSizes = !eager && hasExplicitWidth(rest.className, rest.style) && hasExplicitHeight && !fallbackSizes.startsWith("auto");
  const finalSizes = autoSizes ? `auto, ${fallbackSizes}` : fallbackSizes;

  if (priority) {
    preload(optimized.src, {
      as: "image",
      imageSrcSet: optimized.srcSet,
      imageSizes: finalSizes,
      fetchPriority: "high",
    });
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img src={optimized.src} srcSet={optimized.srcSet} sizes={finalSizes} {...attrs} {...rest} />
  );
}
