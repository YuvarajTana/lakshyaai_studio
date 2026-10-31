import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ElementType, ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ as: Tag = "div", wide, className, children, style }: { as?: ElementType; wide?: boolean; className?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <Tag className={cx("lk-container", wide && "lk-container--wide", className)} style={style}>
      {children}
    </Tag>
  );
}

export function Section({ id, tone, className, children }: { id?: string; tone?: "default" | "surface" | "ink"; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cx("lk-section", tone && tone !== "default" && `lk-section--${tone}`, className)}>
      {children}
    </section>
  );
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("lk-kicker", className)}>{children}</p>;
}

export type DisplaySize = "mega" | "3xl" | "2xl" | "xl" | "lg";
export function Display({ as: Tag = "h2", size = "2xl", className, children }: { as?: ElementType; size?: DisplaySize; className?: string; children: ReactNode }) {
  return <Tag className={cx("lk-display", `lk-display--${size}`, className)}>{children}</Tag>;
}

type ButtonVariant = "solid" | "ghost" | "link";
type Common = { variant?: ButtonVariant; arrow?: boolean; children: ReactNode; className?: string; cursor?: string };

export function Button({ variant = "solid", arrow, children, className, cursor, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cx("lk-btn", `lk-btn--${variant}`, className)} data-cursor={cursor} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}

export function LinkButton({ variant = "solid", arrow, children, className, cursor, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cx("lk-btn", `lk-btn--${variant}`, className)} data-cursor={cursor} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </a>
  );
}

export function Arrow({ dir = "ne" }: { dir?: "ne" | "e" | "s" }) {
  const rotate = dir === "e" ? 45 : dir === "s" ? 135 : 0;
  return (
    <svg className="lk-arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M4 12 L12 4 M5 4 H12 V11" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Tag({ children, tone = "line" }: { children: ReactNode; tone?: "line" | "accent" }) {
  return <span className={cx("lk-tag", tone === "accent" && "lk-tag--accent")}>{children}</span>;
}

/** Money in Indian format by default: ₹1,24,000. */
export function Price({ amount, currency = "INR", locale = "en-IN", suffix, className }: { amount: number; currency?: string; locale?: string; suffix?: string; className?: string }) {
  const text = new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  return (
    <span className={cx("lk-price", className)}>
      {text}
      {suffix && <small>{suffix}</small>}
    </span>
  );
}
