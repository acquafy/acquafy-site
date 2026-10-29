// components/mobile/sections/MobileProfileMenu.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coins, Headset, LogOut, MoonStar, PlusCircle, ScrollText } from "lucide-react";
import { usePlatform } from "@/components/mobile/PlatformProvider";
import { MobileActionSheet } from "@/components/mobile/ui/MobileActionSheet";
import { MobileConfirmSheet } from "@/components/mobile/ui/MobileConfirmSheet";
import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { MobileSwitch } from "@/components/mobile/ui/MobileSwitch";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { languageOptions, LOGOUT_ITEM, profileSections } from "@/config/profile-page";
import { endSession } from "@/lib/auth";
import { CURRENCIES, currencyList } from "@/lib/currency";
import { mobilePath } from "@/lib/mobile/platform";

/** The list under the profile card: sections (each a pushed screen), preferences (theme, currency), shortcuts and "Sair da Conta". */
export function MobileProfileMenu() {
  const platform = usePlatform();
  const router = useRouter();
  const toast = useToast();
  const { profile } = useProfile();
  const { theme, toggle } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const subtitleOf = (id: string, fallback: string) => (id === "idioma" ? (languageOptions.find((l) => l.value === profile.language)?.label ?? fallback) : fallback);

  const logout = () => {
    setLogoutOpen(false);
    endSession();
    toast({ title: "Sessão encerrada", description: "Até logo! Você saiu do Portal do Investidor.", tone: "info" });
    router.replace(mobilePath(platform, "welcome"));
    router.refresh();
  };

  return (
    <>
      <MobileListGroup aria-label="Minha conta">
        {profileSections.map((s) => (
          <MobileListRow key={s.id} icon={s.icon} tone={s.tone} title={s.label} subtitle={subtitleOf(s.id, s.description)} href={{ route: "profile", sub: s.id }} />
        ))}
      </MobileListGroup>

      <MobileListGroup header="Preferências" aria-label="Preferências">
        <MobileListRow
          icon={MoonStar}
          tone="violet"
          title="Modo noite"
          subtitle={theme === "dark" ? "Noite ativado" : "Dia ativado"}
          chevron={false}
          trailing={
            <MobileSwitch
              label="Modo noite"
              checked={theme === "dark"}
              onChange={() => {
                toggle();
                toast({ title: theme === "dark" ? "Modo dia ativado" : "Modo noite ativado", tone: "info" });
              }}
            />
          }
        />
        <MobileListRow icon={Coins} tone="green" title="Moeda de exibição" subtitle="Os repasses continuam em dólar" value={CURRENCIES[currency].short} onClick={() => setCurrencyOpen(true)} />
      </MobileListGroup>

      <MobileListGroup header="Mais" aria-label="Mais opções">
        <MobileListRow icon={ScrollText} tone="orange" title="Meu contrato" subtitle="Condições, andamento e opções" href={{ route: "contract" }} />
        <MobileListRow icon={PlusCircle} tone="violet" title="Solicitar purificadores" subtitle="Amplie seu investimento" href={{ route: "request" }} />
        <MobileListRow icon={Headset} tone="pink" title="Suporte" subtitle="Chamados, FAQ e canais de contato" href={{ route: "support" }} />
      </MobileListGroup>

      <MobileListGroup aria-label="Sessão">
        <MobileListRow icon={LogOut} destructive title={LOGOUT_ITEM.label} subtitle={LOGOUT_ITEM.description} onClick={() => setLogoutOpen(true)} />
      </MobileListGroup>

      <MobileActionSheet
        open={currencyOpen}
        onClose={() => setCurrencyOpen(false)}
        title="Moeda de exibição"
        description="Apenas a exibição muda: os repasses são pagos em dólar."
        items={currencyList.map((c) => ({
          id: c.code,
          label: `${c.name} (${c.short})`,
          selected: c.code === currency,
          onSelect: () => {
            setCurrency(c.code);
            toast({ title: "Moeda alterada", description: `Valores exibidos em ${c.name}.`, tone: "info" });
          },
        }))}
      />
      <MobileConfirmSheet open={logoutOpen} title="Sair da conta?" description="Você precisará entrar novamente para acessar o portal." confirmLabel="Sair" onConfirm={logout} onCancel={() => setLogoutOpen(false)}>
        <p className="text-[15px] text-ink-soft">Seus dados continuam seguros. Suas preferências ficam salvas neste aparelho.</p>
      </MobileConfirmSheet>
    </>
  );
}
