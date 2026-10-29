// lib/mobile/devices.ts
//
// Form factors of the mobile app. The SAME screens run on a phone, a tablet and a foldable; what changes is the
// chrome (bottom bar → sidebar / navigation rail), the number of columns of the content, and the device drawn in the preview.
import type { Platform } from "./platform";

export type Device = "phone" | "tablet" | "foldable";

export const DEVICES: readonly Device[] = ["phone", "tablet", "foldable"];

export function isDevice(value: string | undefined | null): value is Device {
  return value === "phone" || value === "tablet" || value === "foldable";
}

export const DEVICE_LABEL: Record<Device, string> = { phone: "Celulares", tablet: "Tablet", foldable: "Foldable" };

/**
 * Screen size in CSS px (what the layout sees) and the room the bezel adds around it in the preview. Tablets are shown landscape
 * (iPad Pro 11", Pixel Tablet); foldables are shown unfolded, held like a book (hinge down the middle): Galaxy Z Fold on Android, the announced iPhone Fold on iOS.
 */
export const DEVICE_SIZE: Record<Platform, Partial<Record<Device, { width: number; height: number; bezel: number }>>> = {
  ios: {
    phone: { width: 390, height: 844, bezel: 20 },
    tablet: { width: 1194, height: 834, bezel: 28 },
    foldable: { width: 940, height: 705, bezel: 24 },
  },
  android: {
    phone: { width: 412, height: 915, bezel: 20 },
    tablet: { width: 1280, height: 800, bezel: 28 },
    foldable: { width: 928, height: 800, bezel: 24 },
  },
};

/** Query-string key of the stage (`/m/duo/home?d=tablet`). */
export const DEVICE_PARAM = "d";
