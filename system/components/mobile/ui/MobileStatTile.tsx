// components/mobile/ui/MobileStatTile.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileStatTile.tsx and ui/android/MobileStatTile.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileStatTile";
import * as Android from "./android/MobileStatTile";
import { byPlatform } from "./platform";

export const MobileStatTile = byPlatform(Ios.MobileStatTile, Android.MobileStatTile) as typeof Ios.MobileStatTile;
