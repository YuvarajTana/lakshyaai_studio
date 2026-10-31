"use client";

/**
 * Interactive section blocks: a full-screen project index, expanding cards,
 * a numbered hover list and a self-drawing process path.
 */

import { Pinned, Reveal, SplitReveal, useScrollProgress } from "@lakshya/motion";
import { useRef, useState, type CSSProperties } from "react";
import { Art, type ArtProps } from "./art";
import { Container, Kicker, cx } from "./primitives";

/* ========================================================================== */
/* ScrollIndex: each item takes the whole screen in turn, name set huge.       */
/* Good for a developer's projects, a hotel group's properties, collections.  */
/* ========================================================================== */
export interface IndexItem {
  title: string;
  meta?: string;
  art: ArtProps;
  href?: string;
}

export function ScrollIndex({ items, id }: { items: IndexItem[]; id?: string }) {
  return (
    <Pinned id={id} length={items.length + 0.4} steps={items.length} stickyClassName="lk-sindex">
      {(active) => (
        <>
          {items.map((it, i) => (
            <div key={it.title} className="lk-sindex__frame" data-active={i === active} data-past={i < active}>
              <Art {...it.art} />
            </div>
          ))}
          <div className="lk-sindex__shade" />
          <div className="lk-sindex__copy">
            <ol className="lk-sindex__count" aria-hidden="true">
              <li>{String(active + 1).padStart(2, "0")}</li>
              <li>/ {String(items.length).padStart(2, "0")}</li>
            </ol>
            {items.map((it, i) => (
              <a key={it.title} href={it.href ?? "#"} className="lk-sindex__title" data-active={i === active} aria-hidden={i !== active} tabIndex={i === active ? 0 : -1}>
                <span>{it.title}</span>
                {it.meta && <small>{it.meta}</small>}
              </a>
            ))}
          </div>
        </>
      )}
    </Pinned>
  );
}

/* ========================================================================== */
/* ExpandCards: tall slivers; the hovered (or tapped) one widens into a card.  */
/* ========================================================================== */
export interface ExpandCard {
  title: string;
  body: string;
  meta?: string;
  art: ArtProps;
}

export function ExpandCards({ kicker, title, cards, id }: { kicker?: string; title?: string; cards: ExpandCard[]; id?: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="lk-section" id={id}>
      <Container>
        {title && (
          <div className="lk-head">
            {kicker && <Kicker>{kicker}</Kicker>}
            <SplitReveal className="lk-display lk-display--2xl">{title}</SplitReveal>
          </div>
        )}
        <Reveal className="lk-expand">
          {cards.map((c, i) => (
            <button
              key={c.title}
              className="lk-expand__card"
              data-open={i === open}
              aria-expanded={i === open}
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
            >
              <Art {...c.art} />
              <span className="lk-expand__shade" />
              <span className="lk-expand__label">{c.title}</span>
              <span className="lk-expand__body">
                {c.meta && <em>{c.meta}</em>}
                <strong>{c.title}</strong>
                <span>{c.body}</span>
              </span>
            </button>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* HoverList: big numbered rows; the active row opens with copy and a picture. */
/* ========================================================================== */
export interface HoverRow {
  title: string;
  body: string;
  tags?: string[];
  art?: ArtProps;
}

export function HoverList({ kicker, title, rows, id }: { kicker?: string; title?: string; rows: HoverRow[]; id?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="lk-section" id={id}>
      <Container>
        {title && (
          <div className="lk-head">
            {kicker && <Kicker>{kicker}</Kicker>}
            <SplitReveal className="lk-display lk-display--2xl">{title}</SplitReveal>
          </div>
        )}
        <ul className="lk-hlist" onPointerLeave={() => setOpen(null)}>
          {rows.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.04}>
              <button className="lk-hlist__row" data-open={open === i} aria-expanded={open === i} onPointerEnter={() => setOpen(i)} onFocus={() => setOpen(i)} onClick={() => setOpen(open === i ? null : i)}>
                <span className="lk-hlist__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="lk-hlist__title">{r.title}</span>
                <span className="lk-hlist__more">
                  <span>{r.body}</span>
                  {r.tags && (
                    <span className="lk-hlist__tags">
                      {r.tags.map((t) => (
                        <i key={t}>{t}</i>
                      ))}
                    </span>
                  )}
                </span>
                {r.art && (
                  <span className="lk-hlist__pic">
                    <Art ratio="4/3" {...r.art} />
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* StepPath: process steps joined by one line that draws itself on scroll.    */
/* ========================================================================== */
export interface Step {
  title: string;
  body: string;
  meta?: string;
}

export function StepPath({ kicker, title, steps, id }: { kicker?: string; title?: string; steps: Step[]; id?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  useScrollProgress(wrap, {
    start: "top 75%",
    end: "bottom 60%",
    onUpdate: (p) => {
      wrap.current?.style.setProperty("--draw", p.toFixed(3));
      const n = Math.min(steps.length, Math.floor(p * steps.length + 0.15));
      setLit((prev) => (prev === n ? prev : n));
    },
  });
  return (
    <section className="lk-section" id={id}>
      <Container>
        {title && (
          <div className="lk-head">
            {kicker && <Kicker>{kicker}</Kicker>}
            <SplitReveal className="lk-display lk-display--2xl">{title}</SplitReveal>
          </div>
        )}
        <div ref={wrap} className="lk-steps" style={{ "--n": steps.length } as CSSProperties}>
          <div className="lk-steps__track" aria-hidden="true">
            <span className="lk-steps__line" />
          </div>
          <ol>
            {steps.map((s, i) => (
              <li key={s.title} data-lit={i < lit}>
                <span className="lk-steps__dot" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.meta && <span className="lk-steps__meta">{s.meta}</span>}
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

