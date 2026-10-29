// components/base/previews/LoginPreviews.tsx
import { MobileLogin } from "@/components/mobile/sections/MobileLogin";
import { LoginBrandPanel } from "@/components/sections/LoginBrandPanel";
import { LoginForm } from "@/components/sections/LoginForm";
import { LoginAccessDemo, LoginForgotDemo, MobileLoginAccessDemo, MobileLoginForgotDemo } from "./LoginDemos";
import type { PreviewMap } from "./types";

export const loginPreviews: PreviewMap = {
  LoginAccessModal: () => ({ node: <LoginAccessDemo /> }),
  LoginBrandPanel: () => ({ node: <LoginBrandPanel /> }),
  LoginForgotModal: () => ({ node: <LoginForgotDemo /> }),
  LoginForm: () => ({ node: <LoginForm /> }),
  MobileLogin: () => ({ node: <MobileLogin />, tall: true }),
  MobileLoginAccessSheet: () => ({ node: <MobileLoginAccessDemo />, tall: true }),
  MobileLoginForgotSheet: () => ({ node: <MobileLoginForgotDemo />, tall: true }),
};
