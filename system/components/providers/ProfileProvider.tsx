// components/providers/ProfileProvider.tsx
"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { defaultProfile, type Profile } from "@/config/profile";
import { usePersistentState } from "@/lib/usePersistentState";

type ProfileContextValue = {
  profile: Profile;
  /** Merges `patch` into the profile and persists it. */
  updateProfile: (patch: Partial<Profile>) => void;
};

const ProfileContext = createContext<ProfileContextValue>({ profile: defaultProfile, updateProfile: () => {} });

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = usePersistentState<Profile>("profile", defaultProfile);
  const updateProfile = useCallback((patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch })), [setProfile]);
  const value = useMemo(() => ({ profile, updateProfile }), [profile, updateProfile]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  return useContext(ProfileContext);
}
