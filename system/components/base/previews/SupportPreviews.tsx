// components/base/previews/SupportPreviews.tsx
import { MobileSupport } from "@/components/mobile/sections/MobileSupport";
import { SupportChannels } from "@/components/sections/SupportChannels";
import { SupportWorkspace } from "@/components/sections/SupportWorkspace";
import { portalToday } from "@/lib/portal/schedule";
import { MobileSupportChatDemo, MobileSupportTicketsDemo, SupportChatDemo, SupportFaqDemo, SupportSearchDemo, SupportTicketFormDemo, SupportTicketsDemo } from "./SupportDemos";
import type { PreviewMap } from "./types";

export const supportPreviews: PreviewMap = {
  SupportChannels: () => ({ node: <SupportChannels /> }),
  SupportChat: () => ({ node: <SupportChatDemo /> }),
  SupportFaq: () => ({ node: <SupportFaqDemo /> }),
  SupportSearch: () => ({ node: <SupportSearchDemo /> }),
  SupportTicketForm: () => ({ node: <SupportTicketFormDemo today={portalToday()} /> }),
  SupportTickets: () => ({ node: <SupportTicketsDemo today={portalToday()} /> }),
  SupportWorkspace: () => ({ node: <SupportWorkspace today={portalToday()} /> }),
  MobileSupport: () => ({ node: <MobileSupport today={portalToday()} />, tall: true }),
  MobileSupportChat: () => ({ node: <MobileSupportChatDemo />, tall: true }),
  MobileSupportTickets: () => ({ node: <MobileSupportTicketsDemo today={portalToday()} />, tall: true }),
};
