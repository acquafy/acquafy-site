// components/mobile/ui/MobileActionSheet.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileActionSheet.tsx and ui/android/MobileActionSheet.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileActionSheet";
import * as Android from "./android/MobileActionSheet";
import { byPlatform } from "./platform";

export type { ActionSheetItem } from "./ios/MobileActionSheet";
export const MobileActionSheet = byPlatform(Ios.MobileActionSheet, Android.MobileActionSheet) as typeof Ios.MobileActionSheet;
