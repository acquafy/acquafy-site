// config/mobile-purifiers.ts
//
// Shapes shared by the mobile purifier screens. The storage key and the record are the same as the desktop's
// "Solicitar manutenção", so a request made on either side shows up on both.

export const MAINTENANCE_STORAGE_KEY = "purifier-maintenance";

export type MaintenanceRequest = { id: string; serial: string; reason: string; description: string; createdAt: string };
