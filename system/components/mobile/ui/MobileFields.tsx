// components/mobile/ui/MobileFields.tsx
//
// Platform switch: the iOS (Liquid Glass) and Android (Material 3 Expressive) versions of this primitive live in
// ui/ios/MobileFields.tsx and ui/android/MobileFields.tsx. Both keep the SAME props, so organisms import this file and never know the platform.
"use client";

import * as Ios from "./ios/MobileFields";
import * as Android from "./android/MobileFields";
import { byPlatform } from "./platform";

export const MobileTextField = byPlatform(Ios.MobileTextField, Android.MobileTextField) as typeof Ios.MobileTextField;
export const MobileTextArea = byPlatform(Ios.MobileTextArea, Android.MobileTextArea) as typeof Ios.MobileTextArea;
export const MobileSelect = byPlatform(Ios.MobileSelect, Android.MobileSelect) as typeof Ios.MobileSelect;
export const MobileSearchField = byPlatform(Ios.MobileSearchField, Android.MobileSearchField) as typeof Ios.MobileSearchField;
export const MobileCheckbox = byPlatform(Ios.MobileCheckbox, Android.MobileCheckbox) as typeof Ios.MobileCheckbox;
