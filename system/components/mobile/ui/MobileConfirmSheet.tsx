// components/mobile/ui/MobileConfirmSheet.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileConfirmSheet.tsx and ui/android/MobileConfirmSheet.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileConfirmSheet";
import * as Android from "./android/MobileConfirmSheet";
import { byPlatform } from "./platform";

export const MobileConfirmSheet = byPlatform(Ios.MobileConfirmSheet, Android.MobileConfirmSheet) as typeof Ios.MobileConfirmSheet;
