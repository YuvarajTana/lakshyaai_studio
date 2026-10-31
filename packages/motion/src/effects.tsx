"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap, registerGsap, ScrollTrigger, SplitText, useGSAP } from "./gsap";

registerGsap();

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Polymorphic = { as?: ElementType; className?: string; style?: CSSProperties; children?: ReactNode };

/* -------------------------------------------------------------------------- */
/* Reveal: fade + rise when scrolled into view. `stagger` animates children.   */
/* -------------------------------------------------------------------------- */
export interface RevealProps extends Polymorphic {
  y?: number;
  delay?: number;
  /** Seconds between direct children. When set, children animate instead of the wrapper. */
  stagger?: number;
  start?: string;
}

export function Reveal({ as: Tag = "div", y = 40, delay = 0, stagger, start = "top 85%", className, style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced()) return;
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        delay,
        stagger,
        duration: 1,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* SplitReveal: masked line/word/char reveal for headlines.                    */
/* -------------------------------------------------------------------------- */
export interface SplitRevealProps extends Polymorphic {
  by?: "lines" | "words" | "chars";
  stagger?: number;
  delay?: number;
  /** Reveal on mount instead of on scroll (use for above-the-fold heroes). */
  immediate?: boolean;
}

export function SplitReveal({
  as: Tag = "h2",
  by = "lines",
  stagger,
  delay = 0,
  immediate = false,
  className,
  style,
  children,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced()) return;
      let tween: gsap.core.Tween | undefined;
      const split = SplitText.create(el, {
        type: by === "lines" ? "lines" : by === "words" ? "words,lines" : "chars,words,lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          tween?.kill();
          tween = gsap.from(self[by], {
            yPercent: 110,
            duration: 1.1,
            delay,
            ease: "expo.out",
            stagger: stagger ?? (by === "chars" ? 0.015 : by === "words" ? 0.04 : 0.09),
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true },
          });
          return tween;
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* ScrubText: words light up one by one as you scroll through a paragraph.     */
/* -------------------------------------------------------------------------- */
export function ScrubText({ as: Tag = "p", className, style, children }: Polymorphic) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced()) return;
      const split = SplitText.create(el, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 40%", scrub: true },
        },
      );
      return () => split.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Parallax: element drifts at a different speed than the page.                */
/* -------------------------------------------------------------------------- */
export interface ParallaxProps extends Polymorphic {
  /** Percent of own height to travel. Negative moves up faster. */
  speed?: number;
  /** Scale up slightly so edges never show when the content is an image. */
  zoom?: number;
}

export function Parallax({ as: Tag = "div", speed = -15, zoom = 1, className, style, children }: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced()) return;
      gsap.fromTo(
        el,
        { yPercent: -speed / 2, scale: zoom },
        {
          yPercent: speed / 2,
          scale: zoom,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Counter: number counts up when it enters view. Formats with Intl.           */
/* -------------------------------------------------------------------------- */
export interface CounterProps {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
}

export function Counter({ to, from = 0, decimals = 0, prefix = "", suffix = "", locale = "en-IN", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) =>
    prefix + n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced()) {
        el.textContent = fmt(to);
        return;
      }
      const obj = { v: from };
      gsap.to(obj, {
        v: to,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = fmt(obj.v);
        },
      });
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {fmt(from)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Magnetic: child leans toward the pointer. Wrap buttons and CTAs.            */
/* -------------------------------------------------------------------------- */
export function Magnetic({ strength = 0.35, children, className }: { strength?: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Marquee: endless ticker that speeds up and skews with scroll velocity.      */
/* -------------------------------------------------------------------------- */
export interface MarqueeProps {
  children: ReactNode;
  /** Seconds per loop at rest. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({ children, speed = 30, reverse = false, className }: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = track.current;
      if (!el || reduced()) return;
      const loop = gsap.to(el, { xPercent: reverse ? 50 : -50, duration: speed, ease: "none", repeat: -1 });
      if (reverse) gsap.set(el, { xPercent: -50 });
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 400, 4);
          gsap.to(loop, { timeScale: 1 + v, duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.3 });
        },
      });
      return () => st.kill();
    },
    { scope: track },
  );
  return (
    <div className={`lk-marquee ${className ?? ""}`} aria-hidden="false">
      <div ref={track} className="lk-marquee__track">
        <div className="lk-marquee__group">{children}</div>
        <div className="lk-marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Cursor: soft follower dot; grows and shows a label over [data-cursor].      */
/* -------------------------------------------------------------------------- */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    const el = dot.current;
    if (!el || reduced() || !window.matchMedia("(pointer: fine)").matches) return;
    el.style.display = "flex";
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const next = target?.dataset.cursor ?? "";
      el.dataset.active = target ? "true" : "false";
      setLabel((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div ref={dot} className="lk-cursor" aria-hidden="true" style={{ display: "none" }}>
      <span>{label}</span>
    </div>
  );
}
