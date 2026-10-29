// components/mobile/ui/MobileChip.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileChip.tsx and ui/android/MobileChip.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileChip";
import * as Android from "./android/MobileChip";
import { byPlatform } from "./platform";

export const MobileChip = byPlatform(Ios.MobileChip, Android.MobileChip) as typeof Ios.MobileChip;
export const MobileChipRow = byPlatform(Ios.MobileChipRow, Android.MobileChipRow) as typeof Ios.MobileChipRow;
