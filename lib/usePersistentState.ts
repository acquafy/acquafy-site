// lib/usePersistentState.ts
"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

/**
 * `useState` that survives reloads through localStorage. While the data is mocked this is what makes
 * edits (profile, tickets, uploads, …) feel real.
 *
 * Built on `useSyncExternalStore`: the server render and the hydration pass see `initial`, then React
 * switches to the stored value without a hydration mismatch (and without setState-in-effect). Every storage
 * access is guarded: private windows and blocked storage fall back to an in-memory copy.
 *
 * Returns `[value, setValue, ready]`; `ready` is false until the stored value has been applied.
 */

const listeners = new Set<() => void>();
const memory = new Map<string, string>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw(storageKey: string): string | null {
  const cached = memory.get(storageKey);
  if (cached !== undefined) return cached;
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function writeRaw(storageKey: string, raw: string): void {
  memory.set(storageKey, raw);
  try {
    window.localStorage.setItem(storageKey, raw);
  } catch {
    /* quota / blocked: the in-memory copy still serves this session */
  }
  listeners.forEach((l) => l());
}

const noopSubscribe = () => () => {};

export function usePersistentState<T>(key: string, initial: T): [T, (next: T | ((prev: T) => T)) => void, boolean] {
  const storageKey = `acquafy:${key}`;
  // Frozen on first render: callers usually pass an inline literal that changes identity every render.
  const [fallback] = useState(initial);
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(storageKey),
    () => null,
  );
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const value = useMemo<T>(() => {
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }, [raw, fallback]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const currentRaw = readRaw(storageKey);
      let current = fallback;
      if (currentRaw !== null) {
        try {
          current = JSON.parse(currentRaw) as T;
        } catch {
          /* corrupt entry: start from the initial value */
        }
      }
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(current) : next;
      writeRaw(storageKey, JSON.stringify(resolved));
    },
    [storageKey, fallback],
  );

  return [value, set, ready];
}
