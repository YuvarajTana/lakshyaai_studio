"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger } from "./gsap";

const LenisContext = createContext<Lenis | null>(null);

/** Access the Lenis instance, e.g. `useLenis()?.scrollTo("#rooms")`. Null when reduced motion is on. */
export const useLenis = () => useContext(LenisContext);

export interface SmoothScrollProps {
  children: ReactNode;
  /** Lower = heavier, more cinematic. 0.1 is a good default. */
  lerp?: number;
}

/**
 * Wrap the app once. Drives Lenis from GSAP's ticker so ScrollTrigger and smooth scroll
 * never drift apart. Falls back to native scroll when the visitor prefers reduced motion.
 */
export function SmoothScroll({ children, lerp = 0.1 }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    registerGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [lerp]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
