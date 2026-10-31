"use client";

import { Cursor, SmoothScroll } from "@lakshya/motion";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      {children}
      <Cursor />
    </SmoothScroll>
  );
}
