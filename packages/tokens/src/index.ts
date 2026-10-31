/**
 * Design tokens. CSS variables in styles.css are the source of truth at runtime;
 * this file mirrors them for JS consumers (three.js materials, canvas drawing, GSAP).
 */

export type ThemeName = "studio" | "estate" | "hotel" | "commerce";

export interface ThemeTokens {
  label: string;
  /** Who the theme is for, shown in the kit playground. */
  use: string;
  color: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    line: string;
    accent: string;
    accent2: string;
    accent3: string;
  };
  font: { display: string; body: string; mono: string };
}

export const themes: Record<ThemeName, ThemeTokens> = {
  studio: {
    label: "Studio",
    use: "LakshyaAI's own look: dark navy, amber/teal/coral semantic accents",
    color: {
      bg: "#0b1020",
      surface: "#121a30",
      ink: "#eef1f7",
      muted: "#9aa3b8",
      line: "#24304d",
      accent: "#f5b544",
      accent2: "#2ec4b6",
      accent3: "#ff6b5b",
    },
    font: { display: "Fraunces Variable", body: "Hanken Grotesk Variable", mono: "JetBrains Mono Variable" },
  },
  estate: {
    label: "Estate",
    use: "Real estate and architecture: warm stone, thin oversized grotesk",
    color: {
      bg: "#f1ede6",
      surface: "#e6e0d5",
      ink: "#191815",
      muted: "#6f6a60",
      line: "#cfc7b8",
      accent: "#9a6a3a",
      accent2: "#3f5a4c",
      accent3: "#c9a46a",
    },
    font: { display: "Hanken Grotesk Variable", body: "Hanken Grotesk Variable", mono: "JetBrains Mono Variable" },
  },
  hotel: {
    label: "Hotel",
    use: "Hotels and resorts: ivory editorial serif, terracotta and sage",
    color: {
      bg: "#faf7f1",
      surface: "#f0ebe1",
      ink: "#1d1b17",
      muted: "#77705f",
      line: "#e1d9c9",
      accent: "#b5643c",
      accent2: "#7d8a6a",
      accent3: "#d9b48a",
    },
    font: { display: "Instrument Serif", body: "Hanken Grotesk Variable", mono: "JetBrains Mono Variable" },
  },
  commerce: {
    label: "Commerce",
    use: "Product and e-commerce: studio grey, electric blue, acid signal",
    color: {
      bg: "#ecebe7",
      surface: "#ffffff",
      ink: "#111111",
      muted: "#6b6b6b",
      line: "#d6d4ce",
      accent: "#3b5bff",
      accent2: "#c6ff3d",
      accent3: "#ff5a36",
    },
    font: { display: "Space Grotesk Variable", body: "Hanken Grotesk Variable", mono: "JetBrains Mono Variable" },
  },
};

export const ease = {
  /** Default for reveals: fast start, long soft landing. */
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  /** CSS equivalents for non-GSAP transitions. */
  cssOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  cssInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

export const duration = { fast: 0.35, base: 0.8, slow: 1.4 } as const;

export const breakpoints = { sm: 640, md: 900, lg: 1200, xl: 1600 } as const;
