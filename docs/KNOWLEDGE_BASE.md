# Lakshya AI Studio — Knowledge Base

Everything needed to understand, use and extend the foundation kit. Last updated 31 Oct 2026.

Contents
1. [Business and brand](#1-business-and-brand)
2. [Engagement model](#2-engagement-model)
3. [Design tokens and themes](#3-design-tokens-and-themes)
4. [Architecture](#4-architecture)
5. [Component reference](#5-component-reference)
6. [Starters](#6-starters)
7. [Recipes](#7-recipes)
8. [Media and asset pipeline](#8-media-and-asset-pipeline)
9. [Performance and accessibility](#9-performance-and-accessibility)
10. [References and research](#10-references-and-research)
11. [Decision log](#11-decision-log)
12. [Roadmap and backlog](#12-roadmap-and-backlog)
13. [Glossary and links](#13-glossary-and-links)

---

## 1. Business and brand

| | |
| --- | --- |
| Company | Lakshya AI, Tirupati & Bengaluru, India |
| Founder | Yuvaraj Tana (12+ years full-stack; Engineering Manager) |
| Studio | [studio.lakshyaai.com](https://studio.lakshyaai.com): live 3D worlds, scroll-story websites, AI products |
| Main site | [lakshyaai.com](https://lakshyaai.com): practical digital and AI solutions for professionals, everyday users and SMEs |
| Contact | contact@lakshyaai.com |
| Instagram | [@studio.lakshyaai](https://instagram.com/studio.lakshyaai) ("LakshyaAI Studio \| 3D Web"); reels end with "follow + DM a keyword to get the code" |
| GitHub | YuvarajTana (this repo: `lakshyaai_studio`) |

**What Studio sells.** Three offerings on studio.lakshyaai.com: live 3D operations worlds (airports, ports, hospitals, cities), interactive story websites (Story Kit), and end-to-end AI products (assistants grounded in the client's data). This kit is the shared groundwork for the story-website side and will grow into dashboards and SaaS.

**Story Kit** (as described on the Studio site): scroll-story templates for Indian brands, real-time 3D, mobile-first, rebranded from one config file, taking orders and enquiries by email or WhatsApp. The gallery shows ten templates (e.g. coffee, mango export, EV scooter, Tirupati homestay), each marked "Free code" or "Free with login code".

**Phase 1 focus** (from the brief): aesthetic websites with 3D, micro-interactions and GSAP animation, for storytelling, e-commerce, real estate and hotels. Most code is given away free; integration and hosting are paid.

## 2. Engagement model

Mirrors the tiers on studio.lakshyaai.com/#pricing (no public prices for these).

| Tier | Data | Client gets |
| --- | --- | --- |
| **Free code** | Demo content | A starter as a static site (`pnpm export`), personal and client use |
| **Showcase** (World or Story Site) | Simulated, styled on the client's brand | Hosted world or site + three reels of it |
| **Connected World** | Client's live data, read-only (APIs, IoT, ERP/WMS exports) | The world, a data gateway, the AI assistant |
| **Ops Twin & AI product** | Live, two-way (alerts, drill-downs, sign-in, roles, history replay) | Scoped end-to-end product + support retainer |

Other priced items on the Studio site: Prompt Pack Pro (₹500). Studio process: Discover → Prototype → Connect → Launch & support.

**Where paid work plugs into the code**: `BookingBar onSearch`, `CartDrawer onCheckout`, `Art src`, `ModelSlot src`, content files → CMS.

## 3. Design tokens and themes

Set `data-theme` on any wrapper; every block re-skins. Source: `packages/tokens/src/styles.css` (runtime) mirrored in `packages/tokens/src/index.ts` (for JS, three.js, canvas).

| Theme | Use | bg | ink | accent | accent-2 | accent-3 | Display / body / mono |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `studio` | Lakshya AI brand (matches studio.lakshyaai.com) | `#f4fbf7` | `#0f172a` | `#0e9f6e` | `#0d9488` | `#f59e0b` | Bricolage Grotesque 700 / Geist / Geist Mono |
| `story` | Dark editorial brand stories | `#0b1020` | `#eef1f7` | `#f5b544` | `#2ec4b6` | `#ff6b5b` | Fraunces 340 / Hanken Grotesk / JetBrains Mono |
| `estate` | Real estate, architecture | `#f1ede6` | `#191815` | `#9a6a3a` | `#3f5a4c` | `#c9a46a` | Hanken Grotesk 250 / Hanken / JetBrains |
| `hotel` | Hotels, resorts | `#faf7f1` | `#1d1b17` | `#b5643c` | `#7d8a6a` | `#d9b48a` | Instrument Serif / Hanken / JetBrains |
| `commerce` | Products, stores | `#ecebe7` | `#111111` | `#3b5bff` | `#c6ff3d` | `#ff5a36` | Space Grotesk 500 / Hanken / JetBrains |

**Studio dark mode** (same values as the live site's dark mode): bg `#0b1220`, surface `#111a2b`, ink `#e6edf5`, accent `#10b981`, accent-text `#34d399`, button `#10b981` on `#04130d`. Follows the OS; force with `data-mode="light" | "dark"`.

**Variables** every block reads: `--lk-bg --lk-surface --lk-ink --lk-muted --lk-line --lk-accent --lk-accent-2 --lk-accent-3 --lk-on-accent --lk-accent-text --lk-btn --lk-btn-ink --lk-font-display --lk-font-body --lk-font-mono --lk-display-weight --lk-display-tracking`.

**Scales** (theme-independent): fluid type `--lk-text-xs … --lk-text-mega` (clamp, 360→1600px), space `--lk-space-1 … 10`, `--lk-gutter` (16–48px), `--lk-max` 1440px, radii `--lk-radius-sm/…/lg`, `--lk-pill`, easing `--lk-ease-out` = `cubic-bezier(0.22,1,0.36,1)`.

Fonts are self-hosted via `@fontsource` (`packages/tokens/src/fonts.css`), so there's no Google Fonts request at runtime.

## 4. Architecture

```
pnpm workspace + Turborepo
├─ apps/web (Next.js 16, App Router, React 19)
│   ├─ app/layout.tsx         imports fonts + all package styles; <Providers> = SmoothScroll + Cursor
│   ├─ app/page.tsx           hub (studio theme)
│   ├─ app/kit/               component gallery
│   ├─ app/{story,estate,hotel,shop}/  page.tsx (metadata) + site.tsx ("use client")
│   ├─ content/*.ts           demo data per starter
│   └─ components/            ThemePage, ScrollScene, scenes.tsx + lazy.tsx (3D), draw.ts, DepthScene.tsx
└─ packages (TypeScript source, consumed via transpilePackages)
    ├─ tokens   → CSS vars, themes, fonts
    ├─ motion   → depends on gsap, @gsap/react, lenis
    ├─ three    → depends on three, @react-three/fiber, @react-three/drei
    └─ ui       → depends on motion + tokens
```

- **Static export**: `EXPORT=1 next build` → `output: "export"`, unoptimized images, trailing slashes. ~3 MB for all routes.
- **Smooth scroll**: Lenis instance driven by `gsap.ticker`; `lenis.on("scroll", ScrollTrigger.update)`; `lagSmoothing(0)`. Disabled under reduced motion.
- **Scroll primitive**: `Pinned` = a section `length × 100svh` tall with a `position: sticky` child; progress from a ScrollTrigger (start `top top`, end `bottom bottom`) written to a ref and `--lk-progress`. Chapters, horizontal scroll, image sequences, scroll video, zoom reveal, depth layers, scroll index and the 3D `ScrollScene` all build on it.
- **3D**: one `SceneCanvas` per scene; `ScrollRig` reads a progress ref each frame and eases the camera through keyframes in spherical coordinates around the target.

## 5. Component reference

### 5.1 `@lakshya/motion`

| Component / hook | Key props | Notes |
| --- | --- | --- |
| `SmoothScroll` | `lerp=0.1` | Wrap the app once. `useLenis()` → `lenis.scrollTo("#id")` |
| `Reveal` | `as, y=40, delay, stagger, start="top 85%"` | `stagger` animates direct children |
| `SplitReveal` | `as="h2", by="lines"\|"words"\|"chars", stagger, delay, immediate` | Masked reveal via SplitText (`autoSplit`) |
| `ScrubText` | `as="p"` | Words go from 18% to 100% opacity across scroll |
| `Parallax` | `speed=-15, zoom=1` | Percent of own height |
| `Counter` | `to, from, decimals, prefix, suffix, locale="en-IN"` | Counts once on enter |
| `Magnetic` | `strength=0.35` | Pointer-fine only |
| `Marquee` | `speed=30, reverse` | Speeds up with scroll velocity |
| `Cursor` | – | Follower dot; label from `data-cursor="…"` on any element |
| `Pinned` | `length=3, steps, onProgress, children(active)` | The scroll primitive |
| `PinnedChapters` | `chapters: {kicker,title,body,media}[]` | Media + copy crossfade per step |
| `HorizontalScroll` | `children` | Vertical scroll → horizontal track |
| `StackCards` | `children[]` | Sticky stacking cards |
| `ImageSequence` | `frames?: string[]`, `draw?(ctx,t,w,h)`, `length, overlay` | Canvas, cover-fit, preloaded |
| `ScrollVideo` | `src, poster, length=4, captions[]` | Eased playhead; needs `-g 1` encoding |
| `Turntable` | `frames?`, `draw?(ctx,i,count,w,h)`, `count=36, mode="drag"\|"pointer", autoSpin` | 360 spin or gaze-follow |
| `ZoomReveal` | `before, after, media, length=2.5` | Pill between two words → full-bleed |
| `DepthLayers` | `layers: {content, depth 0..1}[], overlay, length=2` | Near layers scale/move more |
| `RevealLens` | `base, reveal, radius=160, label` | Masked circle follows pointer |
| `BeforeAfter` | `before, after, labels, initial=50` | Drag or arrow keys; `role="slider"` |
| `Preloader` | `tagline, brand, storageKey` | Once per session; skipped for reduced motion |
| `ShaderGradient` | `colors?, speed=1, grain=0.03, scale=0.9, intensity=0.8` | One WebGL shader; colours default to theme vars; half-res; pauses off-screen |
| `useScrollProgress(ref, {start,end,onUpdate})` | | Returns a progress ref; sets `--lk-progress` |
| `useActiveStep(ref, steps)` | | Re-renders only on step change |
| `useReducedMotion`, `useIsTouch` | | |

### 5.2 `@lakshya/three`

| Component | Key props | Notes |
| --- | --- | --- |
| `SceneCanvas` | `camera, fallback, studioLights=true, …CanvasProps` | DPR [1,2], AdaptiveDpr, `shadows="percentage"`, `frameloop` pauses off-screen, WebGL check |
| `StudioLights` | `intensity` | Lightformer environment (no HDR download) + key light |
| `ScrollRig` | `progress (ref), keys: {position,target,fov?}[], damping=4, pointerSway=0.25` | Spherical interpolation, eased |
| `Hotspots` | `items: {id,position,label,detail}[], visible?: string[], onSelect` | drei `Html` pins |
| `Tower` | `floors=14, activeFloor, onFloorSelect, colors` | Twisting residential tower, hover/click floors |
| `Villa` | `colors` | Pavilion with pool, deck, columns, palms; 80×80 ground |
| `ProductSpeaker` | `color, accent, spin, children` | Lathe-turned speaker with light ring |
| `Pebble` | `size, color, radius` | Rounded block for quick product mockups |
| `ModelSlot` | `src?, placeholder, scale, position, rotation` | GLB when ready, placeholder until then |

### 5.3 `@lakshya/ui`

| Group | Components |
| --- | --- |
| Primitives | `Container`, `Section`, `Kicker`, `Display (size)`, `Button`, `LinkButton (variant solid/ghost/link, arrow, cursor)`, `Arrow`, `Tag`, `Price (INR, en-IN)`, `cx` |
| Art | `Art (scene horizon/arch/facade/pedestal/dunes/grid, seed, slot, src, ratio, showSlot)` |
| Header/footer | `SiteHeader (brand, links, cta, actions, overlay)`, `SiteFooter (wordmark, columns, note)`, `CtaBand` |
| Heroes | `HeroMega (word…)`, `HeroSplit (title, media…)`, `HeroScene (scene, panel, sceneArea)` |
| Story | `Statement`, `StatsRow`, `FeatureGrid`, `Timeline`, `Gallery`, `Quote`, `Ticker` |
| Listings | `ListingCard`, `ListingGrid (layout grid/staggered, filter, more)` |
| Real estate | `SpecList`, `UnitTable (units, activeFloor, onHover)` |
| Hotel | `BookingBar (rooms, onSearch)` |
| Commerce | `CartProvider (storageKey)`, `useCart`, `CartButton`, `ProductCard`, `ProductGrid`, `CartDrawer (onCheckout, freeShippingAt=2999)` |
| Interactive | `ScrollIndex (items)`, `ExpandCards (cards)`, `HoverList (rows)`, `StepPath (steps)` |

Live demos of the newer blocks: `/kit`.

## 6. Starters

All brands, people and prices are fictional.

| Route | Brand | Theme | Sections, in order |
| --- | --- | --- | --- |
| `/` | Lakshya AI Studio hub | studio | Badge hero over `ShaderGradient` → ticker → starters → themes → kit features → engagement tiers → green CTA band → footer |
| `/kit` | Component gallery | mixed | Every newer component, each in a fitting theme |
| `/story` | Kaapi Hills (coffee estate, Chikmagalur) | story | `Preloader` → `HeroMega` → `Statement` → `PinnedChapters` (grow/pick/dry/roast) → `ScrollVideo` (dawn) → `ImageSequence` (procedural roast) → `Timeline` → `Gallery` → `Quote` → CTA |
| `/estate` | Banyan Point (14-floor tower, Tirupati) | estate | `HeroScene` 3D tower + `UnitTable` (synced floors) → `Statement` → `StatsRow` → 3D scroll tour → `SpecList` → `BeforeAfter` (plan/finished) → `StepPath` (buying) → `ScrollIndex` (projects) → filtered `ListingGrid` → `Timeline` → CTA |
| `/hotel` | Kalyani House (courtyard hotel, Tirupati) | hotel | `HeroSplit` → `BookingBar` → `Statement` → `ZoomReveal` → staggered filtered stays → experience chapters → 3D villa tour → `RevealLens` day/night → `Gallery` → `Quote` → CTA |
| `/shop` | Pebble Audio (smart speaker, Bengaluru) | commerce | `HeroScene` 3D speaker + finish picker → `Ticker` → hotspot scroll tour → `ProductGrid` + cart → `FeatureGrid` → `Quote` → CTA → `CartDrawer` |

## 7. Recipes

### Make a client site from a starter
1. Copy `apps/web/app/<starter>/` to a new route (or a new app) and `apps/web/content/<starter>.ts`.
2. Add `[data-theme="client"]` to `packages/tokens/src/styles.css` (colours + fonts) and pass it to `ThemePage`.
3. Rewrite the content file: copy, prices, contact, nav anchors.
4. Replace art slots: drop images into `public/images/` and add `src` to each `Art` (see `docs/assets.md`).
5. 3D: swap placeholders for `ModelSlot src="/models/x.glb"`; keep model scale/origin so camera keys still frame it.
6. Hook paid features: `BookingBar onSearch`, `CartDrawer onCheckout` → booking engine / Razorpay / Shopify / WhatsApp link.
7. `pnpm -r typecheck && pnpm export` → deploy `apps/web/out`.

### Add a theme
Add the CSS block (all `--lk-*` colour vars, `--lk-font-display`, `--lk-display-weight`, `--lk-display-tracking`, optionally `--lk-btn`, `--lk-accent-text`), add the matching entry to `themes` in `index.ts`, import any new font in `fonts.css`. The hub's Themes section picks it up automatically.

### Add a 3D scroll scene
In `apps/web/components/scenes.tsx` write a component that takes `progress` and renders `<SceneCanvas>` + model + `<ScrollRig keys={…}>`. Export it via `lazy.tsx`. On the page, wrap it in `<ScrollScene steps={…}>{(progress, active) => <YourTour progress={progress} />}</ScrollScene>`. Tune keys: position radius ≈ 1.6–2× the model's height; spherical interpolation arcs around the target.

### Add a component
Package → `index.ts` export → package `styles.css` → demo in `/kit` → README table → this file.

## 8. Media and asset pipeline

- **Photos**: 2000px long edge (heroes 2400px), WebP, under 300 KB. One `Art` slot per image; the slot list is in `docs/assets.md`.
- **AI video → scroll**: generate a 4–10 s clip, then
  `ffmpeg -i in.mp4 -an -vf scale=1920:-2 -c:v libx264 -g 1 -crf 23 -movflags +faststart out.mp4` for `ScrollVideo`, or
  `ffmpeg -i in.mp4 -vf fps=24,scale=1600:-2 frames/f%03d.webp` for `ImageSequence`/`Turntable` (72 frames = smooth 360; 120–240 for a film).
- **Depth plates**: cut one render into sky / mid / foreground PNGs of identical size for `DepthLayers`.
- **3D models**: GLB, metres, origin at the base, compress with `gltf-transform optimize in.glb out.glb --texture-compress webp`. For towers, name floors `floor-00…` so units can highlight.
- **Demo media in repo**: `apps/web/public/media/estate-dawn.mp4` (procedural, 96 frames, `-g 1`) and its poster.

## 9. Performance and accessibility

- DPR capped at 2; `AdaptiveDpr`; canvases pause when off-screen; shader gradient renders at half resolution.
- No `transmission` materials (an extra render pass per frame); glass is metalness/roughness.
- 3D is lazy, client-only (`next/dynamic`, `ssr: false`).
- Per-frame work never sets React state.
- `prefers-reduced-motion`: no smooth scroll, no reveals, still frames for shaders and loops, preloader skipped.
- Touch: hover interactions have tap equivalents; `Magnetic` and `Cursor` are pointer-fine only.
- Semantics: buttons and links, `role="slider"` with arrow keys on `BeforeAfter`, `role="tablist"` on the listing filter, cart drawer closes on `Escape`, `aria-live` for demo search/checkout messages.

## 10. References and research

Full mapping in [docs/references.md](references.md). Summary:

- **Mobbin** (paid): four private collections, 36 sections, links in `references.md`: Storytelling, Real Estate, Hotels, E-commerce. Key influences: KOBU (hotels/villas grids, destination filter, editorial hero), Samara (oversized product name hero), VanMoof (scrubbed statement), Rains/Telepathic Instruments (product callouts), Going/Selfridges/Mews (timelines).
- **Scrolltide** (paid, scrolltide.co): 132 templates, ~70 components, 20 sections, 40 shaders. Dominant pattern: an AI-rendered film or frame sequence driven by the scrollbar with chapters of copy. Rebuilt as `ScrollVideo`, `Turntable`, `ZoomReveal`, `DepthLayers`, `RevealLens`, `ShaderGradient`, `Preloader`, `ScrollIndex`, `ExpandCards`, `HoverList`, `StepPath`.
- **Rule**: both libraries are references only. Their code, prompts, copy and imagery are not reproduced here; everything in the kit is original.
- **Studio site** (studio.lakshyaai.com): source of the `studio` theme tokens, tiers, process and Story Kit language.

## 11. Decision log

| Date | Decision | Why |
| --- | --- | --- |
| 31 Oct 2026 | Kit lives in `lakshyaai_studio` on branch `feat/foundation-kit` (PR #1); office demo moved to `demos/office/` | Studio repo is the home for interactive 3D sites; the Instagram DM page uses the separate `lakshya-tech-park` repo, so nothing breaks |
| 31 Oct 2026 | Next.js + React from day one (not vanilla) | One stack from free story sites to dashboards/SaaS later; static export keeps the free tier simple |
| 31 Oct 2026 | Packages ship TS source, no build step | Simpler monorepo; `transpilePackages` handles it |
| 31 Oct 2026 | Plain CSS + CSS variables, no Tailwind | Portable free code; one attribute re-skins; Tailwind/shadcn can come with dashboards |
| 31 Oct 2026 | CSS-sticky `Pinned` instead of ScrollTrigger pinning | Robust with Lenis and on mobile, no pin-spacing jumps |
| 31 Oct 2026 | Procedural 3D models + SVG `Art` placeholders | Sites look finished before assets exist; no licensing issues; every slot is named for replacement |
| 31 Oct 2026 | `studio` theme re-based on studio.lakshyaai.com tokens; old look kept as `story` | Earlier navy/Fraunces look didn't match the live brand |
| 31 Oct 2026 | Engagement tiers copied from the Studio site (no prices) | Keep kit and site consistent; don't invent pricing |
| 31 Oct 2026 | Self-hosted fonts via fontsource | No runtime Google request; works offline/static |
| 31 Oct 2026 | Removed `transmission` glass | Too slow on phones and software GL |

## 12. Roadmap and backlog

**Next components** (from the Scrolltide/Mobbin catalogue)
- Coverflow / arc / depth carousels for rooms and testimonials.
- Booking-enquiry section that sends to WhatsApp and email (Story Kit promise).
- Tabbed feature block (Features / 360° / Anatomy), decade-tab timeline, product rail.
- Image trail and pointer-mosaic backgrounds (fashion, food); particle text/globe (tech, export).

**Kit**
- Real photography or AI renders for the 28 art slots; GLBs for tower/villa/product.
- Per-starter export as its own static folder (one zip per Story Kit template).
- Client theme generator (pick 3 colours + fonts → theme block).
- CMS adapter for content files (hosted tier).
- Dashboards/SaaS track: add Tailwind/shadcn-compatible layer, charts, tables, auth shell.

**Pending checks**
- Main brand colour on lakshyaai.com is `#059669` (meta theme-color) vs Studio `#0e9f6e`; confirm which the kit should treat as canonical. The Chrome extension needs permission for lakshyaai.com to inspect it.

## 13. Glossary and links

| Term | Meaning |
| --- | --- |
| Starter | A complete demo site built from the kit (`/story`, `/estate`, `/hotel`, `/shop`) |
| Block | A prop-driven section component in `@lakshya/ui` |
| Art slot | Named placeholder illustration that a photo or render replaces |
| Pinned | Tall sticky section whose scroll progress drives an effect |
| Scroll rig | Camera keyframes interpolated by scroll progress |
| Free tier | Static export the client hosts themselves |
| Hosted tier | Studio hosts and integrates (Showcase / Connected / Ops Twin) |

**Links**
- Repo: https://github.com/YuvarajTana/lakshyaai_studio · PR #1: https://github.com/YuvarajTana/lakshyaai_studio/pull/1
- Studio: https://studio.lakshyaai.com · Main: https://lakshyaai.com · Founder: https://yuvarajtana.com
- Mobbin collections: see `docs/references.md`
- Scrolltide: https://www.scrolltide.co
- Libraries: GSAP https://gsap.com · Lenis https://lenis.darkroom.engineering · React Three Fiber https://r3f.docs.pmnd.rs · drei https://drei.docs.pmnd.rs · Next.js https://nextjs.org
