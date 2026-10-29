// components/mobile/ui/MobileEmptyState.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileEmptyState.tsx and ui/android/MobileEmptyState.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileEmptyState";
import * as Android from "./android/MobileEmptyState";
import { byPlatform } from "./platform";

export const MobileEmptyState = byPlatform(Ios.MobileEmptyState, Android.MobileEmptyState) as typeof Ios.MobileEmptyState;
