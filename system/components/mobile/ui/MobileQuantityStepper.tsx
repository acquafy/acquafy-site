// components/mobile/ui/MobileQuantityStepper.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileQuantityStepper.tsx and ui/android/MobileQuantityStepper.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileQuantityStepper";
import * as Android from "./android/MobileQuantityStepper";
import { byPlatform } from "./platform";

export const MobileQuantityStepper = byPlatform(Ios.MobileQuantityStepper, Android.MobileQuantityStepper) as typeof Ios.MobileQuantityStepper;
