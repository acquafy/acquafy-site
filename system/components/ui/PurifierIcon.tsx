// components/ui/PurifierIcon.tsx
//
// Countertop water purifier, drawn in the Lucide style (24×24 grid, round caps, `currentColor` stroke) so it drops in
// anywhere a `LucideIcon` is expected: body with a control panel and indicator, a water drop and the drip tray.
import { createLucideIcon } from "lucide-react";

export const PurifierIcon = createLucideIcon("purifier", [
  ["rect", { x: "5", y: "2", width: "14", height: "17", rx: "2", key: "body" }],
  ["path", { d: "M5 8h14", key: "panel" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "knob" }],
  ["path", { d: "M12 10.5c-1.6 1.9-2.4 3-2.4 4a2.4 2.4 0 0 0 4.8 0c0-1-.8-2.1-2.4-4z", key: "drop" }],
  ["path", { d: "M3 22h18", key: "tray" }],
]);
