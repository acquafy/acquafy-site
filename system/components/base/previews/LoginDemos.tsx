// components/base/previews/LoginDemos.tsx
"use client";

import { MobileLoginAccessSheet } from "@/components/mobile/sections/MobileLoginAccessSheet";
import { MobileLoginForgotSheet } from "@/components/mobile/sections/MobileLoginForgotSheet";
import { LoginAccessModal } from "@/components/sections/LoginAccessModal";
import { LoginForgotModal } from "@/components/sections/LoginForgotModal";
import { OpenDemo } from "./OpenDemo";

export function LoginAccessDemo() {
  return <OpenDemo>{(open, setOpen) => <LoginAccessModal open={open} onClose={() => setOpen(false)} />}</OpenDemo>;
}

export function LoginForgotDemo() {
  return <OpenDemo>{(open, setOpen) => <LoginForgotModal open={open} initialEmail="carlos.silva@email.com" onClose={() => setOpen(false)} />}</OpenDemo>;
}

export function MobileLoginAccessDemo() {
  return <OpenDemo app>{(open, setOpen) => <MobileLoginAccessSheet open={open} onClose={() => setOpen(false)} />}</OpenDemo>;
}

export function MobileLoginForgotDemo() {
  return <OpenDemo app>{(open, setOpen) => <MobileLoginForgotSheet open={open} initialEmail="carlos.silva@email.com" onClose={() => setOpen(false)} />}</OpenDemo>;
}
