// components/mobile/ui/MobileSwitch.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileSwitch.tsx and ui/android/MobileSwitch.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileSwitch";
import * as Android from "./android/MobileSwitch";
import { byPlatform } from "./platform";

export const MobileSwitch = byPlatform(Ios.MobileSwitch, Android.MobileSwitch) as typeof Ios.MobileSwitch;
