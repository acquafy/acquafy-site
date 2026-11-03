// components/mobile/ui/MobileList.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileList.tsx and ui/android/MobileList.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileList";
import * as Android from "./android/MobileList";
import { byPlatform } from "./platform";

export const MobileListGroup = byPlatform(Ios.MobileListGroup, Android.MobileListGroup) as typeof Ios.MobileListGroup;
export const MobileListRow = byPlatform(Ios.MobileListRow, Android.MobileListRow) as typeof Ios.MobileListRow;
