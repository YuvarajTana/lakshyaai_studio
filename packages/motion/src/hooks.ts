"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { registerGsap, ScrollTrigger } from "./gsap";

/** True when the visitor asked the OS for less motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** True on devices without a fine pointer (phones, tablets). */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => setTouch(!window.matchMedia("(pointer: fine)").matches), []);
  return touch;
}

export interface ScrollProgressOptions {
  /** ScrollTrigger start, default "top top" (element top hits viewport top). */
  start?: string;
  /** ScrollTrigger end, default "bottom bottom". */
  end?: string;
  /** Called every scroll frame with 0..1. Keep it cheap: write to refs / CSS vars, not state. */
  onUpdate?: (progress: number) => void;
}

/**
 * Scroll progress of an element as a ref (0..1), without re-rendering React.
 * Also writes `--lk-progress` on the element, so CSS can animate from it.
 * This is the backbone for pinned chapters, horizontal scroll, image sequences and 3D cameras.
 */
export function useScrollProgress<T extends HTMLElement>(
  target: RefObject<T | null>,
  { start = "top top", end = "bottom bottom", onUpdate }: ScrollProgressOptions = {},
) {
  const progress = useRef(0);
  const cb = useRef(onUpdate);
  cb.current = onUpdate;

  useEffect(() => {
    registerGsap();
    const el = target.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onUpdate: (self) => {
        progress.current = self.progress;
        el.style.setProperty("--lk-progress", self.progress.toFixed(4));
        cb.current?.(self.progress);
      },
    });
    return () => st.kill();
  }, [target, start, end]);

  return progress;
}

/** Index of the active step (0..steps-1) for a given progress; re-renders only when the step changes. */
export function useActiveStep<T extends HTMLElement>(target: RefObject<T | null>, steps: number) {
  const [active, setActive] = useState(0);
  const last = useRef(0);
  useScrollProgress(target, {
    onUpdate: (p) => {
      const i = Math.min(steps - 1, Math.floor(p * steps));
      if (i !== last.current) {
        last.current = i;
        setActive(i);
      }
    },
  });
  return active;
}
