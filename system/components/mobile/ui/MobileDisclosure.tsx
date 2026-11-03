// components/mobile/ui/MobileDisclosure.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileDisclosure.tsx and ui/android/MobileDisclosure.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileDisclosure";
import * as Android from "./android/MobileDisclosure";
import { byPlatform } from "./platform";

export const MobileDisclosureGroup = byPlatform(Ios.MobileDisclosureGroup, Android.MobileDisclosureGroup) as typeof Ios.MobileDisclosureGroup;
