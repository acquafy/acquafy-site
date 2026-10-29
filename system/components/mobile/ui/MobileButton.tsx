// components/mobile/ui/MobileButton.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileButton.tsx and ui/android/MobileButton.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileButton";
import * as Android from "./android/MobileButton";
import { byPlatform } from "./platform";

export type { MobileButtonVariant, MobileButtonSize } from "./ios/MobileButton";
export { mobileButtonClass } from "./ios/MobileButton";
export const MobileButton = byPlatform(Ios.MobileButton, Android.MobileButton) as typeof Ios.MobileButton;
export const MobileButtonLink = byPlatform(Ios.MobileButtonLink, Android.MobileButtonLink) as typeof Ios.MobileButtonLink;
