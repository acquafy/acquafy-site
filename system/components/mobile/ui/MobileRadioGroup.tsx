// components/mobile/ui/MobileRadioGroup.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileRadioGroup.tsx and ui/android/MobileRadioGroup.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileRadioGroup";
import * as Android from "./android/MobileRadioGroup";
import { byPlatform } from "./platform";

export type { MobileRadioOption } from "./ios/MobileRadioGroup";
export const MobileRadioGroup = byPlatform(Ios.MobileRadioGroup, Android.MobileRadioGroup) as typeof Ios.MobileRadioGroup;
