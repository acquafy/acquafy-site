// components/mobile/ui/MobileSectionHeader.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileSectionHeader.tsx and ui/android/MobileSectionHeader.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileSectionHeader";
import * as Android from "./android/MobileSectionHeader";
import { byPlatform } from "./platform";

export const MobileSectionHeader = byPlatform(Ios.MobileSectionHeader, Android.MobileSectionHeader) as typeof Ios.MobileSectionHeader;
