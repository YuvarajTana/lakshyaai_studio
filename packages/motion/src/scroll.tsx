"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useActiveStep, useScrollProgress } from "./hooks";

/* -------------------------------------------------------------------------- */
/* Pinned: a tall section whose content sticks while progress runs 0→1.         */
/* Everything below is built on this one primitive, using CSS sticky (robust    */
/* with Lenis and on mobile) instead of ScrollTrigger pin-spacing.              */
/* -------------------------------------------------------------------------- */
export interface PinnedProps {
  /** Scroll length in viewport heights. */
  length?: number;
  className?: string;
  stickyClassName?: string;
  /** Render prop receives the active step when `steps` is set. */
  steps?: number;
  children: ReactNode | ((active: number) => ReactNode);
  onProgress?: (p: number) => void;
  id?: string;
}

export function Pinned({ length = 3, steps = 1, className, stickyClassName, children, onProgress, id }: PinnedProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, { onUpdate: onProgress });
  const active = useActiveStep(ref, steps);
  return (
    <section ref={ref} id={id} className={`lk-pinned ${className ?? ""}`} style={{ height: `${length * 100}svh` }}>
      <div className={`lk-pinned__sticky ${stickyClassName ?? ""}`}>
        {typeof children === "function" ? children(active) : children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PinnedChapters: story told in steps; media and copy crossfade per chapter.  */
/* -------------------------------------------------------------------------- */
export interface Chapter {
  kicker?: string;
  title: ReactNode;
  body?: ReactNode;
  media: ReactNode;
}

export function PinnedChapters({ chapters, id }: { chapters: Chapter[]; id?: string }) {
  return (
    <Pinned id={id} length={chapters.length + 0.5} steps={chapters.length} stickyClassName="lk-chapters">
      {(active) => (
        <>
          <div className="lk-chapters__media">
            {chapters.map((c, i) => (
              <div key={i} className="lk-chapters__frame" data-active={i === active}>
                {c.media}
              </div>
            ))}
          </div>
          <div className="lk-chapters__copy">
            <ol className="lk-chapters__index" aria-hidden="true">
              {chapters.map((_, i) => (
                <li key={i} data-active={i === active}>
                  {String(i + 1).padStart(2, "0")}
                </li>
              ))}
            </ol>
            {chapters.map((c, i) => (
              <article key={i} className="lk-chapters__text" data-active={i === active} aria-hidden={i !== active}>
                {c.kicker && <p className="lk-kicker">{c.kicker}</p>}
                <h3>{c.title}</h3>
                {c.body && <div className="lk-chapters__body">{c.body}</div>}
              </article>
            ))}
          </div>
        </>
      )}
    </Pinned>
  );
}

/* -------------------------------------------------------------------------- */
/* HorizontalScroll: vertical scroll drives a horizontal track.                */
/* -------------------------------------------------------------------------- */
export function HorizontalScroll({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) distance.current = Math.max(0, el.scrollWidth - window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return (
    <Pinned
      id={id}
      length={3}
      className={className}
      stickyClassName="lk-hscroll"
      onProgress={(p) => {
        if (track.current) track.current.style.transform = `translate3d(${-p * distance.current}px,0,0)`;
      }}
    >
      <div ref={track} className="lk-hscroll__track">
        {children}
      </div>
    </Pinned>
  );
}

/* -------------------------------------------------------------------------- */
/* StackCards: cards pile on top of each other as you scroll.                  */
/* -------------------------------------------------------------------------- */
export function StackCards({ children, className }: { children: ReactNode[]; className?: string }) {
  return (
    <div className={`lk-stack ${className ?? ""}`}>
      {children.map((child, i) => (
        <div key={i} className="lk-stack__card" style={{ "--i": i } as CSSProperties}>
          {child}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ImageSequence: scroll-scrubbed frames on a canvas (the "Apple product" move).*/
/* Pass `frames` (image URLs, e.g. an AI render sequence) or `draw` to paint     */
/* procedurally. Images are preloaded and drawn with object-fit: cover.         */
/* -------------------------------------------------------------------------- */
export interface ImageSequenceProps {
  frames?: string[];
  /** Procedural alternative: paint frame t (0..1) onto the canvas. */
  draw?: (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => void;
  length?: number;
  overlay?: ReactNode;
  className?: string;
}

export function ImageSequence({ frames, draw, length = 3, overlay, className }: ImageSequenceProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const current = useRef(0);

  const paint = (t: number) => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const w = c.width;
    const h = c.height;
    if (draw) {
      draw(ctx, t, w, h);
      return;
    }
    const list = images.current;
    if (!list.length) return;
    const img = list[Math.min(list.length - 1, Math.round(t * (list.length - 1)))];
    if (!img?.complete || !img.naturalWidth) return;
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const iw = img.naturalWidth * s;
    const ih = img.naturalHeight * s;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
  };

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      paint(current.current);
    };
    if (frames?.length) {
      images.current = frames.map((src, i) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        if (i === 0) img.onload = () => paint(current.current);
        return img;
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);

  return (
    <Pinned
      length={length}
      className={className}
      stickyClassName="lk-sequence"
      onProgress={(p) => {
        current.current = p;
        paint(p);
      }}
    >
      <canvas ref={canvas} className="lk-sequence__canvas" />
      {overlay && <div className="lk-sequence__overlay">{overlay}</div>}
    </Pinned>
  );
}
