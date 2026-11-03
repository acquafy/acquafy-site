// components/mobile/ui/MobileSegmented.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileSegmented.tsx and ui/android/MobileSegmented.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileSegmented";
import * as Android from "./android/MobileSegmented";
import { byPlatform } from "./platform";

export type { SegmentItem } from "./ios/MobileSegmented";
export const MobileSegmented = byPlatform(Ios.MobileSegmented, Android.MobileSegmented) as typeof Ios.MobileSegmented;
