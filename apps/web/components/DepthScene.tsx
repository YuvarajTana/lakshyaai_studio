/**
 * Four SVG plates for <DepthLayers>: sky, far hills, near hills, foreground leaves.
 * Replace each with a PNG layer cut from one render (sky / mid / foreground) for a real site.
 */
import type { DepthLayer } from "@lakshya/motion";

const svg = (children: React.ReactNode) => (
  <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {children}
  </svg>
);

export const estateLayers: DepthLayer[] = [
  {
    depth: 0,
    content: svg(
      <>
        <defs>
          <linearGradient id="dl-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--lk-bg)" />
            <stop offset="0.7" stopColor="var(--lk-surface)" />
            <stop offset="1" stopColor="var(--lk-accent-3)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#dl-sky)" />
        <circle cx="1080" cy="420" r="70" fill="var(--lk-accent)" opacity="0.9" />
      </>,
    ),
  },
  {
    depth: 0.3,
    content: svg(<path d="M0 560 C 260 470 420 520 640 480 S 1060 420 1300 470 1600 440 1600 440 V900 H0Z" fill="var(--lk-accent-2)" opacity="0.45" />),
  },
  {
    depth: 0.6,
    content: svg(<path d="M0 660 C 300 590 520 650 760 610 S 1200 560 1600 620 V900 H0Z" fill="var(--lk-accent-2)" opacity="0.8" />),
  },
  {
    depth: 1,
    content: svg(
      <g fill="var(--lk-ink)" opacity="0.9">
        <path d="M-40 900 C 60 760 120 700 230 640 C 180 740 160 820 200 900Z" />
        <path d="M120 900 C 150 760 260 690 360 670 C 300 760 270 830 300 900Z" />
        <path d="M1640 900 C 1540 760 1480 700 1370 640 C 1420 740 1440 820 1400 900Z" />
        <path d="M1480 900 C 1450 760 1340 690 1240 670 C 1300 760 1330 830 1300 900Z" />
      </g>,
    ),
  },
];
