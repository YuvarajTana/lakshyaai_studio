"use client";

/**
 * Media-driven scroll and pointer effects. Original implementations of patterns common
 * on cinematic sites: a video scrubbed by scroll, a 360 turntable, a pill that opens into
 * a full-bleed frame, stacked depth plates, a pointer lens, a before/after slider and an
 * intro loader. All respect reduced motion.
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "./gsap";
import { Pinned } from "./scroll";

registerGsap();

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------- */
/* ScrollVideo: page scroll drives the video's playhead.                        */
/* Encode with a keyframe on every frame or seeking stutters:                   */
/*   ffmpeg -i in.mp4 -an -vf scale=1920:-2 -c:v libx264 -g 1 -crf 23 out.mp4   */
/* -------------------------------------------------------------------------- */
export interface ScrollVideoProps {
  src: string;
  poster?: string;
  /** Scroll length in viewport heights. */
  length?: number;
  /** Copy that fades through the clip; each item owns an equal slice of progress. */
  captions?: ReactNode[];
  className?: string;
  id?: string;
}

export function ScrollVideo({ src, poster, length = 4, captions = [], className, id }: ScrollVideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    let raf = 0;
    // Ease the playhead toward the scroll target so seeks don't jump frame-to-frame.
    const tick = () => {
      if (v.duration && !Number.isNaN(v.duration)) {
        const want = target.current * (v.duration - 0.05);
        const diff = want - v.currentTime;
        if (Math.abs(diff) > 0.01) v.currentTime += diff * 0.25;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Pinned
      id={id}
      length={length}
      className={className}
      stickyClassName="lk-svideo"
      onProgress={(p) => {
        target.current = p;
        if (captions.length) {
          const i = Math.min(captions.length - 1, Math.floor(p * captions.length));
          setActive((prev) => (prev === i ? prev : i));
        }
      }}
    >
      <video ref={video} className="lk-svideo__video" src={src} poster={poster} muted playsInline preload="auto" />
      {captions.length > 0 && (
        <div className="lk-svideo__captions">
          {captions.map((c, i) => (
            <div key={i} className="lk-svideo__caption" data-active={i === active}>
              {c}
            </div>
          ))}
        </div>
      )}
    </Pinned>
  );
}

/* -------------------------------------------------------------------------- */
/* Turntable: a frame sequence turned by drag (360 product / building spin),   */
/* or by pointer position (characters that look where you point).              */
/* -------------------------------------------------------------------------- */
export interface TurntableProps {
  frames?: string[];
  /** Procedural alternative: paint frame index i of `count`. */
  draw?: (ctx: CanvasRenderingContext2D, i: number, count: number, w: number, h: number) => void;
  count?: number;
  mode?: "drag" | "pointer";
  /** Slow idle spin until the visitor touches it (drag mode). */
  autoSpin?: boolean;
  className?: string;
  style?: CSSProperties;
  label?: string;
}

export function Turntable({ frames, draw, count: countProp, mode = "drag", autoSpin = true, className, style, label = "Drag to turn" }: TurntableProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const frame = useRef(0);
  const count = frames?.length ?? countProp ?? 36;
  const [hint, setHint] = useState(true);

  const paint = (i: number) => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const idx = ((Math.round(i) % count) + count) % count;
    if (draw) {
      ctx.clearRect(0, 0, c.width, c.height);
      draw(ctx, idx, count, c.width, c.height);
      return;
    }
    const img = imgs.current[idx];
    if (!img?.complete || !img.naturalWidth) return;
    const s = Math.min(c.width / img.naturalWidth, c.height / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
  };

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    if (frames) {
      imgs.current = frames.map((src, i) => {
        const img = new Image();
        img.src = src;
        if (i === 0) img.onload = () => paint(0);
        return img;
      });
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      paint(frame.current);
    };
    resize();
    window.addEventListener("resize", resize);

    let dragging = false;
    let startX = 0;
    let startFrame = 0;
    let touched = false;
    let raf = 0;

    const idle = () => {
      if (!touched && autoSpin && mode === "drag" && !reduced()) {
        frame.current += 0.12;
        paint(frame.current);
      }
      raf = requestAnimationFrame(idle);
    };
    raf = requestAnimationFrame(idle);

    const down = (e: PointerEvent) => {
      if (mode !== "drag") return;
      dragging = true;
      touched = true;
      setHint(false);
      startX = e.clientX;
      startFrame = frame.current;
      c.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (mode === "pointer") {
        const r = c.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        frame.current = t * (count - 1);
        paint(frame.current);
        return;
      }
      if (!dragging) return;
      // One full turn per canvas width of drag.
      frame.current = startFrame - ((e.clientX - startX) / c.clientWidth) * count;
      paint(frame.current);
    };
    const up = () => (dragging = false);
    const target: HTMLElement | Window = mode === "pointer" ? window : c;
    c.addEventListener("pointerdown", down);
    target.addEventListener("pointermove", move as EventListener);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      c.removeEventListener("pointerdown", down);
      target.removeEventListener("pointermove", move as EventListener);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames, count, mode, autoSpin]);

  return (
    <div className={`lk-turntable ${className ?? ""}`} style={style} data-mode={mode}>
      <canvas ref={canvas} aria-label={label} role="img" />
      {mode === "drag" && hint && <span className="lk-turntable__hint">↔ {label}</span>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ZoomReveal: a pill of media sits between two words, then opens to fill the  */
/* screen as you scroll while the words ride its edges out of frame.           */
/* -------------------------------------------------------------------------- */
export function ZoomReveal({ before, after, media, length = 2.5, id }: { before: string; after: string; media: ReactNode; length?: number; id?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  return (
    <Pinned
      id={id}
      length={length}
      stickyClassName="lk-zoom"
      onProgress={(p) => {
        const el = stage.current;
        if (!el) return;
        const t = Math.min(1, p / 0.8);
        el.style.setProperty("--t", (t * t * (3 - 2 * t)).toFixed(4));
      }}
    >
      <div ref={stage} className="lk-zoom__stage">
        <span className="lk-zoom__word lk-zoom__word--before">{before}</span>
        <div className="lk-zoom__pill">{media}</div>
        <span className="lk-zoom__word lk-zoom__word--after">{after}</span>
      </div>
    </Pinned>
  );
}

/* -------------------------------------------------------------------------- */
/* DepthLayers: plates stacked in depth; scrolling pushes the camera through.  */
/* Cut one render into foreground / mid / background PNGs and pass them in.    */
/* -------------------------------------------------------------------------- */
export interface DepthLayer {
  content: ReactNode;
  /** 0 = far background, 1 = nearest. Near layers move and scale more. */
  depth: number;
}

export function DepthLayers({ layers, overlay, length = 2, className }: { layers: DepthLayer[]; overlay?: ReactNode; length?: number; className?: string }) {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  return (
    <Pinned
      length={length}
      className={className}
      stickyClassName="lk-depth"
      onProgress={(p) => {
        if (reduced()) return;
        layers.forEach((l, i) => {
          const el = refs.current[i];
          if (!el) return;
          const scale = 1 + p * l.depth * 1.6;
          const y = p * (1 - l.depth) * -12;
          el.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`;
          el.style.opacity = l.depth > 0.85 ? String(1 - Math.max(0, p - 0.55) * 2.2) : "1";
        });
      }}
    >
      {layers.map((l, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="lk-depth__layer"
          style={{ zIndex: Math.round(l.depth * 10) }}
        >
          {l.content}
        </div>
      ))}
      {overlay && <div className="lk-depth__overlay">{overlay}</div>}
    </Pinned>
  );
}

/* -------------------------------------------------------------------------- */
/* RevealLens: a soft circle follows the pointer and shows a second image      */
/* through the first (day → night, empty → furnished, sketch → render).        */
/* -------------------------------------------------------------------------- */
export function RevealLens({ base, reveal, radius = 160, className, label = "Move to reveal" }: { base: ReactNode; reveal: ReactNode; radius?: number; className?: string; label?: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    // Own lerp loop: CSS custom properties need explicit px units.
    const cur = { x: el.clientWidth * 0.7, y: el.clientHeight * 0.45, r: radius };
    const want = { ...cur };
    let raf = 0;
    const tick = () => {
      const k = reduced() ? 1 : 0.18;
      cur.x += (want.x - cur.x) * k;
      cur.y += (want.y - cur.y) * k;
      cur.r += (want.r - cur.r) * k;
      el.style.setProperty("--x", `${cur.x.toFixed(1)}px`);
      el.style.setProperty("--y", `${cur.y.toFixed(1)}px`);
      el.style.setProperty("--r", `${cur.r.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      want.x = e.clientX - b.left;
      want.y = e.clientY - b.top;
    };
    const enter = () => (want.r = radius * 1.15);
    const leave = () => (want.r = radius);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, [radius]);
  return (
    <div ref={box} className={`lk-lens ${className ?? ""}`} data-cursor={label}>
      <div className="lk-lens__base">{base}</div>
      <div className="lk-lens__reveal" aria-hidden="true">
        {reveal}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BeforeAfter: drag (or arrow-key) a divider to compare two images.           */
/* -------------------------------------------------------------------------- */
export function BeforeAfter({ before, after, labels = ["Before", "After"], initial = 50, className }: { before: ReactNode; after: ReactNode; labels?: [string, string]; initial?: number; className?: string }) {
  const [pos, setPos] = useState(initial);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const set = (clientX: number) => {
    const b = box.current?.getBoundingClientRect();
    if (b) setPos(Math.min(100, Math.max(0, ((clientX - b.left) / b.width) * 100)));
  };
  return (
    <div
      ref={box}
      className={`lk-compare ${className ?? ""}`}
      style={{ "--pos": `${pos}%` } as CSSProperties}
      onPointerDown={(e) => {
        drag.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        set(e.clientX);
      }}
      onPointerMove={(e) => drag.current && set(e.clientX)}
      onPointerUp={() => (drag.current = false)}
    >
      <div className="lk-compare__after">{after}</div>
      <div className="lk-compare__before">{before}</div>
      <span className="lk-compare__label lk-compare__label--l">{labels[0]}</span>
      <span className="lk-compare__label lk-compare__label--r">{labels[1]}</span>
      <div
        className="lk-compare__handle"
        role="slider"
        tabIndex={0}
        aria-label="Comparison position"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        <span>‹ ›</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preloader: tagline builds word by word, the brand appears, the curtain      */
/* splits. Plays once per session; skipped entirely for reduced motion.        */
/* -------------------------------------------------------------------------- */
export function Preloader({ tagline, brand, storageKey = "lk-intro-seen" }: { tagline: string; brand: ReactNode; storageKey?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      let seen = false;
      try {
        seen = sessionStorage.getItem(storageKey) === "1";
      } catch {
        /* ignore */
      }
      if (seen || reduced()) {
        setDone(true);
        return;
      }
      document.documentElement.style.overflow = "hidden";
      const words = el.querySelectorAll(".lk-preloader__word");
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          try {
            sessionStorage.setItem(storageKey, "1");
          } catch {
            /* ignore */
          }
          setDone(true);
          ScrollTrigger.refresh();
        },
      });
      tl.from(words, { yPercent: 110, opacity: 0, stagger: 0.09, duration: 0.7, ease: "expo.out" })
        .to(words, { yPercent: -110, opacity: 0, stagger: 0.04, duration: 0.45, ease: "power2.in" }, "+=0.5")
        .from(".lk-preloader__brand", { scale: 0.8, opacity: 0, duration: 0.6, ease: "expo.out" })
        .to(".lk-preloader__brand", { opacity: 0, duration: 0.3 }, "+=0.4")
        .to(".lk-preloader__half--top", { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<")
        .to(".lk-preloader__half--bottom", { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, "<");
    },
    { scope: root },
  );

  if (done) return null;
  return (
    <div ref={root} className="lk-preloader" aria-hidden="true">
      <div className="lk-preloader__half lk-preloader__half--top" />
      <div className="lk-preloader__half lk-preloader__half--bottom" />
      <p className="lk-preloader__tagline">
        {tagline.split(" ").map((w, i) => (
          <span key={i} className="lk-preloader__mask">
            <span className="lk-preloader__word">{w}</span>
          </span>
        ))}
      </p>
      <div className="lk-preloader__brand">{brand}</div>
    </div>
  );
}
