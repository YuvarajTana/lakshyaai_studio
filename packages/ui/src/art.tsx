/**
 * Art: code-drawn illustrations that stand in for photography.
 *
 * Every scene reads the active theme's colour variables, so the same <Art> looks right
 * in Studio, Estate, Hotel or Commerce. Each one carries a `slot` name: when a client's
 * photo or an AI render is ready, pass `src` and the illustration steps aside.
 */

import type { CSSProperties } from "react";

export type ArtScene = "horizon" | "arch" | "facade" | "pedestal" | "dunes" | "grid";

export interface ArtProps {
  scene?: ArtScene;
  /** Real image to use instead of the illustration. */
  src?: string;
  alt?: string;
  /** Deterministic variation, so a grid of cards doesn't repeat itself. */
  seed?: number;
  /** Name of the asset this slot expects, e.g. "hero-lobby-dusk". Shown in dev as a caption. */
  slot?: string;
  showSlot?: boolean;
  className?: string;
  style?: CSSProperties;
  ratio?: string;
}

const rand = (seed: number) => {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export function Art({ scene = "horizon", src, alt = "", seed = 1, slot, showSlot = false, className, style, ratio }: ArtProps) {
  const box: CSSProperties = { aspectRatio: ratio, ...style };
  if (src) {
    return (
      <div className={`lk-art ${className ?? ""}`} style={box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
    );
  }
  const r = rand(seed);
  const id = `a${seed}${scene}`;
  return (
    <div className={`lk-art ${className ?? ""}`} style={box} role="img" aria-label={alt || `${scene} illustration`}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--lk-accent-3)" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="var(--lk-surface)" />
            <stop offset="1" stopColor="var(--lk-bg)" />
          </linearGradient>
          <linearGradient id={`${id}deep`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--lk-accent-2)" stopOpacity="0.85" />
            <stop offset="1" stopColor="var(--lk-ink)" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id={`${id}sun`}>
            <stop offset="0" stopColor="var(--lk-accent)" />
            <stop offset="1" stopColor="var(--lk-accent)" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}grain`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0" />
          </filter>
        </defs>
        {scene === "horizon" && <Horizon id={id} r={r} />}
        {scene === "arch" && <ArchView id={id} r={r} />}
        {scene === "facade" && <Facade id={id} r={r} />}
        {scene === "pedestal" && <Pedestal id={id} r={r} />}
        {scene === "dunes" && <Dunes id={id} r={r} />}
        {scene === "grid" && <Blueprint r={r} />}
        <rect width="400" height="300" filter={`url(#${id}grain)`} />
      </svg>
      {showSlot && slot && <span className="lk-art__slot">slot · {slot}</span>}
    </div>
  );
}

type SceneProps = { id: string; r: () => number };

function Horizon({ id, r }: SceneProps) {
  const sunX = 120 + r() * 160;
  return (
    <>
      <rect width="400" height="300" fill={`url(#${id}sky)`} />
      <circle cx={sunX} cy={150} r={120} fill={`url(#${id}sun)`} opacity="0.6" />
      <circle cx={sunX} cy={150} r={26} fill="var(--lk-accent)" opacity="0.9" />
      <path d={`M0 190 Q 80 ${160 + r() * 20} 160 185 T 400 175 V300 H0Z`} fill="var(--lk-accent-2)" opacity="0.55" />
      <path d={`M0 210 Q 120 ${190 + r() * 15} 240 212 T 400 205 V300 H0Z`} fill="var(--lk-ink)" opacity="0.55" />
      <rect y="232" width="400" height="68" fill={`url(#${id}deep)`} />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={sunX - 30 + r() * 20} y={240 + i * 8} width={40 - i * 4} height="1.5" fill="var(--lk-accent)" opacity={0.5 - i * 0.06} />
      ))}
    </>
  );
}

function ArchView({ id, r }: SceneProps) {
  return (
    <>
      <rect width="400" height="300" fill="var(--lk-surface)" />
      <g>
        <clipPath id={`${id}arch`}>
          <path d="M130 300 V130 A70 70 0 0 1 270 130 V300Z" />
        </clipPath>
        <g clipPath={`url(#${id}arch)`}>
          <Horizon id={id} r={r} />
        </g>
        <path d="M130 300 V130 A70 70 0 0 1 270 130 V300" fill="none" stroke="var(--lk-line)" strokeWidth="6" />
      </g>
      <rect y="262" width="400" height="38" fill="var(--lk-accent-3)" opacity="0.35" />
      <ellipse cx="320" cy="262" rx="44" ry="6" fill="var(--lk-ink)" opacity="0.12" />
      <path d="M300 262 q20 -60 6 -110 M318 262 q-6 -50 22 -96 M310 262 q10 -40 -16 -80" stroke="var(--lk-accent-2)" strokeWidth="3" fill="none" />
      <rect x="40" y="226" width="70" height="36" rx="6" fill="var(--lk-ink)" opacity="0.18" />
    </>
  );
}

function Facade({ id, r }: SceneProps) {
  const cols = 6 + Math.floor(r() * 3);
  return (
    <>
      <rect width="400" height="300" fill={`url(#${id}sky)`} />
      <rect x="70" y="30" width="260" height="290" fill="var(--lk-surface)" />
      {Array.from({ length: 11 }, (_, row) =>
        Array.from({ length: cols }, (_, c) => {
          const w = 240 / cols;
          const lit = r() > 0.82;
          return (
            <rect
              key={`${row}-${c}`}
              x={80 + c * w}
              y={40 + row * 24}
              width={w - 6}
              height={16}
              fill={lit ? "var(--lk-accent)" : "var(--lk-accent-2)"}
              opacity={lit ? 0.85 : 0.35}
            />
          );
        }),
      )}
      {Array.from({ length: cols + 1 }, (_, c) => (
        <rect key={c} x={77 + c * (240 / cols)} y="30" width="3" height="270" fill="var(--lk-line)" />
      ))}
    </>
  );
}

function Pedestal({ id, r }: SceneProps) {
  const hue = r() > 0.5 ? "var(--lk-accent)" : "var(--lk-accent-3)";
  return (
    <>
      <rect width="400" height="300" fill="var(--lk-surface)" />
      <circle cx="200" cy="120" r="140" fill={`url(#${id}sun)`} opacity="0.35" />
      <ellipse cx="200" cy="236" rx="90" ry="14" fill="var(--lk-ink)" opacity="0.12" />
      <rect x="130" y="200" width="140" height="36" fill="var(--lk-bg)" />
      <ellipse cx="200" cy="200" rx="70" ry="12" fill="var(--lk-line)" />
      <rect x="170" y="110" width="60" height="90" rx="28" fill={hue} />
      <rect x="182" y="122" width="10" height="66" rx="5" fill="#fff" opacity="0.35" />
    </>
  );
}

function Dunes({ id, r }: SceneProps) {
  return (
    <>
      <rect width="400" height="300" fill={`url(#${id}sky)`} />
      {Array.from({ length: 5 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${140 + i * 34} C 100 ${110 + i * 34 + r() * 30}, 260 ${170 + i * 30 - r() * 30}, 400 ${130 + i * 36} V300 H0Z`}
          fill={i % 2 ? "var(--lk-accent-3)" : "var(--lk-accent)"}
          opacity={0.18 + i * 0.12}
        />
      ))}
    </>
  );
}

function Blueprint({ r }: { r: () => number }) {
  return (
    <>
      <rect width="400" height="300" fill="var(--lk-surface)" />
      {Array.from({ length: 21 }, (_, i) => (
        <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="300" stroke="var(--lk-line)" strokeWidth="1" />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="var(--lk-line)" strokeWidth="1" />
      ))}
      <rect x="80" y="60" width="240" height="180" fill="none" stroke="var(--lk-ink)" strokeWidth="3" />
      <line x1={80 + r() * 100 + 60} y1="60" x2={80 + r() * 100 + 60} y2="240" stroke="var(--lk-ink)" strokeWidth="2" />
      <line x1="80" y1="150" x2="200" y2="150" stroke="var(--lk-ink)" strokeWidth="2" />
      <path d="M200 240 A40 40 0 0 1 240 200" fill="none" stroke="var(--lk-accent)" strokeWidth="2" />
      <rect x="250" y="80" width="50" height="30" fill="var(--lk-accent)" opacity="0.3" />
    </>
  );
}
