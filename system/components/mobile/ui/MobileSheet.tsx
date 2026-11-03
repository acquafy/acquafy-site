// components/mobile/ui/MobileSheet.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileSheet.tsx and ui/android/MobileSheet.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileSheet";
import * as Android from "./android/MobileSheet";
import { byPlatform } from "./platform";

export const MobileSheet = byPlatform(Ios.MobileSheet, Android.MobileSheet) as typeof Ios.MobileSheet;
