// components/base/PreviewBoundary.tsx
"use client";

import { Component, type ReactNode } from "react";

type State = { error: Error | null };

/** Keeps one organism that throws while rendering from taking the whole gallery down: it shows the error in its own block. */
export class PreviewBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div role="alert" className="rounded-lg border border-danger/40 bg-danger-soft p-3 text-[13.5px] text-danger">
        <p className="font-bold">Erro ao renderizar este organismo.</p>
        <p className="mt-1 break-words">{this.state.error.message}</p>
      </div>
    );
  }
}
