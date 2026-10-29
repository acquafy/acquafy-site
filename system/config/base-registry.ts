// config/base-registry.ts
//
// Catalog behind /base (the screens & components hub, same idea as the Interfy "video-blocks" index): every screen
// of the portal, where it lives on each platform, which design reference it follows and which organisms (sections)
// compose it. Whether a mobile screen exists is read from the file system (lib/base/inventory.ts), so the status
// never drifts from the code.

export type Platform = "desktop" | "ios" | "android";

export type ScreenDef = {
  id: string;
  title: string;
  /** Desktop route, or null when the screen only exists on mobile. */
  desktop: string | null;
  /** Mobile route segment under /m/<platform>/ (null: no mobile version planned). */
  mobile: string | null;
  /** Route group of the mobile screen: tab-bar screens vs. flow screens without the bar. */
  mobileGroup?: "tabs" | "flow";
  /** Design reference image(s) in the project root. */
  references: string[];
  /** Organism prefixes: `Home` matches components/sections/Home*.tsx and components/mobile/sections/MobileHome*.tsx. */
  organisms: string[];
  note?: string;
};

export const SCREENS: ScreenDef[] = [
  {
    id: "bem-vindo",
    title: "Bem-vindo (onboarding)",
    desktop: null,
    mobile: "bem-vindo",
    mobileGroup: "flow",
    references: ["PORTA - PARTE 1 _ MOBILE.jpeg"],
    organisms: ["Welcome"],
    note: "Só existe no app.",
  },
  { id: "login", title: "Login", desktop: "/login", mobile: "login", mobileGroup: "flow", references: ["PORTAL DE LOGIN - MOBILE.jpeg"], organisms: ["Login"] },
  { id: "home", title: "Home / Início", desktop: "/home", mobile: "home", mobileGroup: "tabs", references: ["DASHBOARD - MOBILE.jpeg"], organisms: ["Home"], note: "Atalhos e ações do dia a dia." },
  {
    id: "dashboard",
    title: "Dashboard",
    desktop: "/dashboard",
    mobile: null,
    references: ["DASHBOARD.jpeg"],
    organisms: ["Dashboard"],
    note: "Visão geral dos dados (no app, o Início reúne os números).",
  },
  {
    id: "purificadores",
    title: "Meus Purificadores",
    desktop: "/purificadores",
    mobile: "purificadores",
    mobileGroup: "tabs",
    references: ["MEUS PURIFICADORES.jpeg", "MEUS PURIFICADORES 2.jpeg"],
    organisms: ["Purifier", "Purifiers"],
  },
  {
    id: "extrato",
    title: "Extrato Financeiro",
    desktop: "/extrato",
    mobile: "financeiro",
    mobileGroup: "tabs",
    references: ["EXTRATO FINANCEIRO.jpeg", "EXTRATO FINANCEIRO - MOBILE.jpeg"],
    organisms: ["Statement", "Finance"],
  },
  { id: "calendario", title: "Calendário de Repasses", desktop: "/calendario", mobile: "calendario", mobileGroup: "tabs", references: ["CALENDÁRIO DE REPASSES.jpeg"], organisms: ["Calendar"] },
  { id: "documentos", title: "Documentos", desktop: "/documentos", mobile: "documentos", mobileGroup: "tabs", references: ["DOCUMENTOS - MOBILE.jpeg"], organisms: ["Documents", "Document"] },
  { id: "contrato", title: "Meu Contrato", desktop: "/contrato", mobile: "contrato", mobileGroup: "tabs", references: [], organisms: ["Contract"] },
  { id: "solicitar", title: "Solicitar Purificadores", desktop: "/solicitar", mobile: "solicitar", mobileGroup: "tabs", references: [], organisms: ["Request"] },
  { id: "suporte", title: "Suporte", desktop: "/suporte", mobile: "suporte", mobileGroup: "tabs", references: [], organisms: ["Support"] },
  { id: "perfil", title: "Meu Perfil", desktop: "/perfil", mobile: "perfil", mobileGroup: "tabs", references: ["MEU PERFIL MOBILE.jpeg"], organisms: ["Profile"] },
  { id: "seguranca", title: "Segurança", desktop: "/perfil?secao=seguranca", mobile: null, references: [], organisms: ["Profile"], note: "Seção do perfil; no app fica dentro de Perfil." },
  { id: "ajuda", title: "Central de Ajuda", desktop: "/perfil?secao=ajuda", mobile: null, references: [], organisms: ["Profile"], note: "Seção do perfil; no app fica dentro de Perfil." },
];

/** Atoms and molecules, grouped for the /base/componentes page and the inventory. */
export const UI_GROUPS: { title: string; files: string[] }[] = [
  { title: "Ações", files: ["Button", "IconButton", "ActionTile", "Menu", "Popover"] },
  { title: "Formulários", files: ["Field", "QuantityStepper", "RadioCardGroup", "PasswordStrength", "SettingRow"] },
  { title: "Dados", files: ["KpiCard", "Card", "DefinitionList", "BarChart", "ProgressBar", "Money", "Badge", "StatusBadge", "Avatar"] },
  { title: "Navegação", files: ["Tabs", "Pagination", "Stepper", "Accordion"] },
  { title: "Feedback", files: ["Modal", "EmptyState", "ChatBubble"] },
  { title: "Marca e ícones", files: ["PurifierIcon", "CurrencyFlag", "WaterBackdrop"] },
];

export const BASE_LINKS = {
  desktopEntry: "/home",
  loginDesktop: "/login",
};

/**
 * Production order of the screens, in sections (same idea as the A–E sections of the Interfy production base): the
 * numbering of /base/telas follows the order of this list. Entry first, then what the investor sees every day, then
 * the money, then management, then the account. Screens not listed here go to the end under "Outras".
 */
export const PRODUCTION_GROUPS: { id: string; title: string; description: string; screens: string[] }[] = [
  { id: "access", title: "Acesso", description: "Primeiro contato: onboarding do app e entrada.", screens: ["bem-vindo", "login"] },
  { id: "overview", title: "Visão geral", description: "O que o investidor vê ao entrar: atalhos do dia e dados gerais.", screens: ["home", "dashboard"] },
  { id: "investment", title: "Investimento", description: "Os purificadores, novos aportes e o contrato.", screens: ["purificadores", "solicitar", "contrato"] },
  { id: "finance", title: "Financeiro", description: "Repasses recebidos e a receber.", screens: ["extrato", "calendario"] },
  { id: "support", title: "Documentos e suporte", description: "Arquivos e atendimento.", screens: ["documentos", "suporte"] },
  { id: "account", title: "Conta", description: "Perfil, segurança e ajuda.", screens: ["perfil", "seguranca", "ajuda"] },
];
