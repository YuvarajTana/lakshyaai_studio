"use client";

import { Counter, HorizontalScroll, Magnetic, Marquee, Reveal, ScrubText, SplitReveal, useLenis } from "@lakshya/motion";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Art, type ArtProps } from "./art";
import { Arrow, Button, Container, Display, Kicker, LinkButton, Price, Tag, cx } from "./primitives";

/* ========================================================================== */
/* SiteHeader                                                                  */
/* ========================================================================== */
export interface NavLink {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  brand: ReactNode;
  links: NavLink[];
  cta?: NavLink;
  /** Extra controls on the right (cart button, language switch). */
  actions?: ReactNode;
  /** Start transparent over a hero, turn solid after scrolling. */
  overlay?: boolean;
}

export function SiteHeader({ brand, links, cta, actions, overlay = true }: SiteHeaderProps) {
  const [solid, setSolid] = useState(!overlay);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const go = (href: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (href.startsWith("#") && lenis) {
      e.preventDefault();
      lenis.scrollTo(href, { offset: -70 });
    }
  };

  return (
    <header className={cx("lk-header", solid && "lk-header--solid", open && "lk-header--open")}>
      <div className="lk-header__bar">
        <a href="#top" className="lk-header__brand" onClick={go("#top")}>
          {brand}
        </a>
        <nav className="lk-header__nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={go(l.href)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="lk-header__actions">
          {actions}
          {cta && (
            <LinkButton href={cta.href} onClick={go(cta.href)} className="lk-header__cta">
              {cta.label}
            </LinkButton>
          )}
          <button className="lk-header__burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className="lk-header__sheet" hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={go(l.href)}>
            {l.label}
          </a>
        ))}
        {cta && (
          <a href={cta.href} onClick={go(cta.href)} className="lk-header__sheet-cta">
            {cta.label} <Arrow />
          </a>
        )}
      </div>
    </header>
  );
}

/* ========================================================================== */
/* Heroes                                                                      */
/* ========================================================================== */
export interface HeroMegaProps {
  /** One or two words set enormous, edge to edge. */
  word: string;
  kicker?: string;
  lead?: ReactNode;
  cta?: NavLink;
  media?: ReactNode;
  aside?: ReactNode;
}

/** Oversized type over full-bleed media. Brand-first openings (storytelling, launches). */
export function HeroMega({ word, kicker, lead, cta, media, aside }: HeroMegaProps) {
  return (
    <section className="lk-hero-mega" id="top">
      {media && <div className="lk-hero-mega__media">{media}</div>}
      <div className="lk-hero-mega__top">
        <div>
          {kicker && <Kicker>{kicker}</Kicker>}
          {lead && <div className="lk-hero-mega__lead">{lead}</div>}
        </div>
        {aside && <div className="lk-hero-mega__aside">{aside}</div>}
      </div>
      <SplitReveal as="h1" by="chars" immediate className="lk-hero-mega__word">
        {word}
      </SplitReveal>
      {cta && (
        <div className="lk-hero-mega__cta">
          <Magnetic>
            <LinkButton href={cta.href} arrow cursor="Go">
              {cta.label}
            </LinkButton>
          </Magnetic>
        </div>
      )}
    </section>
  );
}

export interface HeroSplitProps {
  kicker?: string;
  title: string;
  body?: ReactNode;
  cta?: NavLink;
  media: ReactNode;
  footnote?: ReactNode;
}

/** Editorial split: copy on one side, tall image on the other. Hotels, villas, boutiques. */
export function HeroSplit({ kicker, title, body, cta, media, footnote }: HeroSplitProps) {
  return (
    <section className="lk-hero-split" id="top">
      <div className="lk-hero-split__copy">
        {kicker && <Kicker>{kicker}</Kicker>}
        <SplitReveal as="h1" by="lines" immediate className="lk-display lk-display--3xl">
          {title}
        </SplitReveal>
        {body && (
          <Reveal delay={0.3} className="lk-hero-split__body">
            {body}
          </Reveal>
        )}
        {cta && (
          <Reveal delay={0.45}>
            <LinkButton href={cta.href} variant="link" arrow>
              {cta.label}
            </LinkButton>
          </Reveal>
        )}
        {footnote && <div className="lk-hero-split__foot">{footnote}</div>}
      </div>
      <div className="lk-hero-split__media">{media}</div>
    </section>
  );
}

export interface HeroSceneProps {
  /** Usually a <SceneCanvas>, full-bleed behind the copy. */
  scene: ReactNode;
  kicker?: string;
  title: string;
  body?: ReactNode;
  cta?: NavLink;
  /** Floating panel (unit picker, booking widget, specs). */
  panel?: ReactNode;
  /** Desktop only: confine the canvas horizontally, e.g. { left: "30%", right: "28%" }, so the model sits between copy and panel. */
  sceneArea?: { left?: string; right?: string };
}

/** 3D-first hero: the scene is the page, copy floats on top. */
export function HeroScene({ scene, kicker, title, body, cta, panel, sceneArea }: HeroSceneProps) {
  return (
    <section className="lk-hero-scene" id="top">
      <div
        className="lk-hero-scene__canvas"
        style={{ "--lk-scene-left": sceneArea?.left ?? "0px", "--lk-scene-right": sceneArea?.right ?? "0px" } as React.CSSProperties}
      >
        {scene}
      </div>
      <div className="lk-hero-scene__copy">
        {kicker && <Kicker>{kicker}</Kicker>}
        <SplitReveal as="h1" by="words" immediate className="lk-display lk-display--3xl">
          {title}
        </SplitReveal>
        {body && (
          <Reveal delay={0.3} className="lk-hero-scene__body">
            {body}
          </Reveal>
        )}
        {cta && (
          <Reveal delay={0.45}>
            <Magnetic>
              <LinkButton href={cta.href} arrow>
                {cta.label}
              </LinkButton>
            </Magnetic>
          </Reveal>
        )}
      </div>
      {panel && <div className="lk-hero-scene__panel">{panel}</div>}
    </section>
  );
}

/* ========================================================================== */
/* Story blocks                                                                */
/* ========================================================================== */
export function Statement({ kicker, children, id }: { kicker?: string; children: string; id?: string }) {
  return (
    <section className="lk-section lk-statement" id={id}>
      <Container>
        {kicker && <Kicker>{kicker}</Kicker>}
        <ScrubText className="lk-statement__text">{children}</ScrubText>
      </Container>
    </section>
  );
}

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <Container className="lk-stats">
      {stats.map((s) => (
        <div key={s.label} className="lk-stats__item">
          <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} className="lk-stats__value" />
          <span className="lk-stats__label">{s.label}</span>
        </div>
      ))}
    </Container>
  );
}

export interface Feature {
  title: string;
  body: string;
  meta?: string;
}

export function FeatureGrid({ kicker, title, features, id }: { kicker?: string; title: string; features: Feature[]; id?: string }) {
  return (
    <section className="lk-section" id={id}>
      <Container>
        <div className="lk-head">
          {kicker && <Kicker>{kicker}</Kicker>}
          <SplitReveal className="lk-display lk-display--2xl">{title}</SplitReveal>
        </div>
        <Reveal stagger={0.08} className="lk-features">
          {features.map((f, i) => (
            <article key={f.title} className="lk-feature">
              <span className="lk-feature__num">{f.meta ?? String(i + 1).padStart(2, "0")}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export interface Milestone {
  when: string;
  title: string;
  body?: string;
  art?: ArtProps;
}

export function Timeline({ kicker, title, items, id }: { kicker?: string; title: string; items: Milestone[]; id?: string }) {
  return (
    <section className="lk-section" id={id}>
      <Container>
        <div className="lk-head">
          {kicker && <Kicker>{kicker}</Kicker>}
          <SplitReveal className="lk-display lk-display--2xl">{title}</SplitReveal>
        </div>
        <ol className="lk-timeline">
          {items.map((m, i) => (
            <Reveal as="li" key={m.when + m.title} className="lk-timeline__item" y={60}>
              <span className="lk-timeline__when">{m.when}</span>
              <div className="lk-timeline__body">
                <h3>{m.title}</h3>
                {m.body && <p>{m.body}</p>}
              </div>
              {m.art && <Art ratio="4/3" seed={i + 3} {...m.art} className="lk-timeline__art" />}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Gallery({ kicker, title, items, id }: { kicker?: string; title: string; items: Array<{ caption: string; art: ArtProps }>; id?: string }) {
  return (
    <div id={id}>
      <Container>
        <div className="lk-head lk-head--tight">
          {kicker && <Kicker>{kicker}</Kicker>}
          <SplitReveal className="lk-display lk-display--2xl">{title}</SplitReveal>
        </div>
      </Container>
      <HorizontalScroll>
        {items.map((it, i) => (
          <figure key={it.caption} className="lk-gallery__item" data-cursor="Drag">
            <Art ratio={i % 2 ? "3/4" : "4/3"} seed={i + 11} {...it.art} />
            <figcaption>
              <span>{String(i + 1).padStart(2, "0")}</span> {it.caption}
            </figcaption>
          </figure>
        ))}
      </HorizontalScroll>
    </div>
  );
}

export function Quote({ quote, by, role }: { quote: string; by: string; role?: string }) {
  return (
    <section className="lk-section lk-quote">
      <Container>
        <SplitReveal as="blockquote" by="lines" className="lk-quote__text">
          {`“${quote}”`}
        </SplitReveal>
        <Reveal className="lk-quote__by">
          <strong>{by}</strong>
          {role && <span>{role}</span>}
        </Reveal>
      </Container>
    </section>
  );
}

export function Ticker({ items }: { items: string[] }) {
  return (
    <div className="lk-ticker">
      <Marquee speed={40}>
        {items.map((t) => (
          <span key={t} className="lk-ticker__item">
            {t} <i aria-hidden="true">✦</i>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ========================================================================== */
/* Listings: properties, villas, rooms, products                               */
/* ========================================================================== */
export interface Listing {
  id: string;
  title: string;
  /** Location, size, category: short mono line under the title. */
  meta?: string;
  price?: number;
  priceSuffix?: string;
  tag?: string;
  category?: string;
  art: ArtProps;
  href?: string;
}

export function ListingCard({ item, ratio = "4/5" }: { item: Listing; ratio?: string }) {
  return (
    <a className="lk-card" href={item.href ?? "#"} data-cursor="View">
      <div className="lk-card__media">
        <Art ratio={ratio} {...item.art} />
        {item.tag && (
          <span className="lk-card__tag">
            <Tag>{item.tag}</Tag>
          </span>
        )}
      </div>
      <div className="lk-card__row">
        <h3>
          {item.title} <Arrow />
        </h3>
        {item.price !== undefined && <Price amount={item.price} suffix={item.priceSuffix} />}
      </div>
      {item.meta && <p className="lk-card__meta">{item.meta}</p>}
    </a>
  );
}

export interface ListingGridProps {
  kicker?: string;
  title: string;
  intro?: string;
  items: Listing[];
  layout?: "grid" | "staggered";
  /** Show a category rail on the left that filters the grid. */
  filter?: boolean;
  more?: NavLink;
  id?: string;
}

export function ListingGrid({ kicker, title, intro, items, layout = "grid", filter = false, more, id }: ListingGridProps) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[]))], [items]);
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? items : items.filter((i) => i.category === cat);

  return (
    <section className="lk-section" id={id}>
      <Container>
        <div className="lk-head lk-head--split">
          <div>
            {kicker && <Kicker>{kicker}</Kicker>}
            <SplitReveal className="lk-display lk-display--2xl">{title}</SplitReveal>
          </div>
          {intro && <p className="lk-head__intro">{intro}</p>}
        </div>
        <div className={cx("lk-listings", filter && "lk-listings--filter")}>
          {filter && (
            <ul className="lk-rail" role="tablist">
              {categories.map((c) => (
                <li key={c}>
                  <button role="tab" aria-selected={c === cat} onClick={() => setCat(c)}>
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={cx("lk-grid", layout === "staggered" && "lk-grid--staggered")} key={cat}>
            {shown.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.08}>
                <ListingCard item={item} ratio={layout === "staggered" ? (i % 2 ? "1/1" : "4/5") : "4/5"} />
              </Reveal>
            ))}
          </div>
        </div>
        {more && (
          <div className="lk-more">
            <LinkButton href={more.href} variant="link" arrow>
              {more.label}
            </LinkButton>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* Amenities, specs, units                                                     */
/* ========================================================================== */
export function SpecList({ title, items, kicker, id }: { title: string; kicker?: string; items: Array<{ label: string; value: string }>; id?: string }) {
  return (
    <section className="lk-section" id={id}>
      <Container className="lk-specs">
        <div>
          {kicker && <Kicker>{kicker}</Kicker>}
          <SplitReveal className="lk-display lk-display--2xl">{title}</SplitReveal>
        </div>
        <Reveal as="dl" stagger={0.05} className="lk-specs__list">
          {items.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export interface Unit {
  id: string;
  floor: number;
  name: string;
  size: string;
  beds: string;
  price: number;
  status: "available" | "reserved" | "sold";
}

/** Unit table that stays in sync with a 3D <Tower> through `activeFloor`. */
export function UnitTable({ units, activeFloor, onHover }: { units: Unit[]; activeFloor?: number | null; onHover?: (floor: number | null) => void }) {
  return (
    <div className="lk-units" role="table" aria-label="Available units">
      <div className="lk-units__row lk-units__row--head" role="row">
        <span role="columnheader">Floor</span>
        <span role="columnheader">Residence</span>
        <span role="columnheader">Price</span>
      </div>
      {units.map((u) => (
        <div
          key={u.id}
          role="row"
          className="lk-units__row"
          data-active={activeFloor === u.floor}
          data-status={u.status}
          onPointerEnter={() => onHover?.(u.floor)}
          onPointerLeave={() => onHover?.(null)}
          onFocus={() => onHover?.(u.floor)}
          tabIndex={0}
        >
          <span role="cell">{String(u.floor + 1).padStart(2, "0")}</span>
          <span role="cell">
            {u.name}
            <small>
              {u.beds} · {u.size}
            </small>
          </span>
          <span role="cell">{u.status === "available" ? <Price amount={u.price} /> : <Tag>{u.status}</Tag>}</span>
        </div>
      ))}
    </div>
  );
}

/* ========================================================================== */
/* BookingBar (UI only: wire to a booking engine in the paid tier)             */
/* ========================================================================== */
export function BookingBar({ onSearch, rooms = ["Garden Room", "Pool Villa", "Hill Suite"] }: { onSearch?: (q: { checkIn: string; checkOut: string; guests: number; room: string }) => void; rooms?: string[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const [q, setQ] = useState({ checkIn: today, checkOut: "", guests: 2, room: rooms[0] ?? "" });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(q);
  };
  return (
    <form className="lk-booking" onSubmit={submit}>
      <label>
        <span>Check in</span>
        <input type="date" value={q.checkIn} min={today} onChange={(e) => setQ({ ...q, checkIn: e.target.value })} required />
      </label>
      <label>
        <span>Check out</span>
        <input type="date" value={q.checkOut} min={q.checkIn} onChange={(e) => setQ({ ...q, checkOut: e.target.value })} required />
      </label>
      <label>
        <span>Guests</span>
        <select value={q.guests} onChange={(e) => setQ({ ...q, guests: Number(e.target.value) })}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Stay</span>
        <select value={q.room} onChange={(e) => setQ({ ...q, room: e.target.value })}>
          {rooms.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <Button type="submit" arrow>
        Check availability
      </Button>
    </form>
  );
}

/* ========================================================================== */
/* CTA + Footer                                                                */
/* ========================================================================== */
export function CtaBand({ kicker, title, body, cta, id }: { kicker?: string; title: string; body?: string; cta: NavLink; id?: string }) {
  return (
    <section className="lk-section lk-cta" id={id}>
      <Container>
        {kicker && <Kicker>{kicker}</Kicker>}
        <SplitReveal className="lk-display lk-display--3xl">{title}</SplitReveal>
        {body && <p className="lk-cta__body">{body}</p>}
        <Magnetic>
          <LinkButton href={cta.href} arrow cursor="Let's go">
            {cta.label}
          </LinkButton>
        </Magnetic>
      </Container>
    </section>
  );
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export function SiteFooter({ wordmark, columns, note }: { wordmark: string; columns: FooterColumn[]; note?: ReactNode }) {
  return (
    <footer className="lk-footer">
      <Container>
        <div className="lk-footer__cols">
          {columns.map((c) => (
            <div key={c.title}>
              <p className="lk-kicker">{c.title}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Display as="p" size="mega" className="lk-footer__word">
          {wordmark}
        </Display>
        {note && <div className="lk-footer__note">{note}</div>}
      </Container>
    </footer>
  );
}
