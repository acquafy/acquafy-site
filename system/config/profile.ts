// config/profile.ts
//
// The investor's editable profile (mock). `ProfileProvider` keeps the edited copy in localStorage, so a
// name or photo changed in "Meu Perfil" shows up in the header and everywhere else.

export type NotificationPrefs = {
  payoutEmail: boolean;
  payoutPush: boolean;
  statementMonthly: boolean;
  deviceAlerts: boolean;
  news: boolean;
};

export type BankAccount = {
  holder: string;
  bank: string;
  /** ABA routing number. */
  routing: string;
  /** Full account number; screens must show it masked ("•••• 4321"). */
  account: string;
  accountType: "checking" | "savings";
};

export type Profile = {
  name: string;
  role: string;
  email: string;
  phone: string;
  document: string;
  city: string;
  state: string;
  country: string;
  /** Data URL of an uploaded photo, or null (initials are shown). */
  avatar: string | null;
  language: "pt-BR" | "en-US" | "es-ES";
  twoFactor: boolean;
  notifications: NotificationPrefs;
  bank: BankAccount;
};

export const defaultProfile: Profile = {
  name: "Carlos Silva",
  role: "Investidor",
  email: "carlos.silva@email.com",
  phone: "+1 (407) 555-0123",
  document: "SSN •••-••-4821",
  city: "Orlando",
  state: "FL",
  country: "Estados Unidos",
  avatar: null,
  language: "pt-BR",
  twoFactor: false,
  notifications: { payoutEmail: true, payoutPush: true, statementMonthly: true, deviceAlerts: true, news: false },
  bank: { holder: "Carlos Silva", bank: "Bank of America", routing: "063100277", account: "004455664321", accountType: "checking" },
};

/** "•••• 4321" */
export function maskAccount(account: string): string {
  return `•••• ${account.slice(-4)}`;
}
