// components/mobile/ui/MobileCard.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileCard.tsx and ui/android/MobileCard.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileCard";
import * as Android from "./android/MobileCard";
import { byPlatform } from "./platform";

export const MobileCard = byPlatform(Ios.MobileCard, Android.MobileCard) as typeof Ios.MobileCard;
