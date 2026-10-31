"use client";

import type { ThemeName } from "@lakshya/tokens";
import { useEffect, type ReactNode } from "react";

/** Sets the theme on <html> (so overscroll and scrollbars match) and on the page wrapper. */
export function ThemePage({ theme, children }: { theme: ThemeName; children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.dataset.theme;
    root.dataset.theme = theme;
    return () => {
      if (prev) root.dataset.theme = prev;
    };
  }, [theme]);
  return (
    <div data-theme={theme} className="page">
      {children}
    </div>
  );
}
