// components/mobile/frame-context.tsx
"use client";

import { createContext, useContext } from "react";

type FrameContextValue = {
  /** Layer above the whole screen (inside the device frame): sheets and action sheets are portalled here. */
  overlayRoot: HTMLElement | null;
  /** The element that scrolls the screen content (nav bars watch it to collapse the large title). */
  scrollRoot: HTMLElement | null;
};

export const FrameContext = createContext<FrameContextValue>({ overlayRoot: null, scrollRoot: null });

export function useOverlayRoot(): HTMLElement | null {
  return useContext(FrameContext).overlayRoot;
}

export function useScrollRoot(): HTMLElement | null {
  return useContext(FrameContext).scrollRoot;
}
