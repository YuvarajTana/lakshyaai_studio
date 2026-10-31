# CLAUDE.md — context for AI agents working in this repo

Read this first. The full reference is [docs/KNOWLEDGE_BASE.md](docs/KNOWLEDGE_BASE.md).

## What this repo is

The **Lakshya AI Studio foundation kit**: shared tokens, motion, 3D and section blocks used to build aesthetic, scroll-driven websites for businesses (storytelling, real estate, hotels, e-commerce; later dashboards and SaaS). Owner: Yuvaraj Tana, Lakshya AI (Tirupati & Bengaluru).

Business model: the **code is free** (static export); **paid** when Lakshya AI Studio hosts it and connects it (bookings, payments, enquiries by email/WhatsApp, CMS). Sold through [studio.lakshyaai.com](https://studio.lakshyaai.com) and Instagram [@studio.lakshyaai](https://instagram.com/studio.lakshyaai).

## Commands

```bash
pnpm install
pnpm dev                     # apps/web on :3000
pnpm -r typecheck            # all packages + app
pnpm build                   # Next production build
pnpm export                  # static site → apps/web/out (free-tier deliverable)
```

Node 22, pnpm 10, Next 16, React 19, TypeScript **5.9** (not 7), three 0.187, R3F 9, drei 10, GSAP 3.15 (SplitText is free and bundled), Lenis 1.3.

## Layout

```
apps/web/app/            hub (/), component gallery (/kit), starters (/story /estate /hotel /shop)
apps/web/app/<x>/site.tsx   the starter page ("use client"); page.tsx only sets metadata
apps/web/content/<x>.ts     ALL demo copy/data for a starter — edit here to make a client site
apps/web/components/        app glue: Providers, ThemePage, ScrollScene, 3D scenes (scenes.tsx, lazy.tsx), draw.ts
packages/tokens          CSS variables + 5 themes; fonts.css (self-hosted fontsource)
packages/motion          Lenis/GSAP: SmoothScroll, reveals, Pinned + everything pinned, media effects, ShaderGradient
packages/three           SceneCanvas, ScrollRig, Hotspots, procedural models, ModelSlot
packages/ui              primitives, Art, sections, commerce (cart), interactive blocks
docs/                    KNOWLEDGE_BASE.md, references.md (Mobbin + Scrolltide map), assets.md (art slots, media encoding)
demos/office/            old Lakshya Tech Park 3D demo — do not modify
```

Packages ship TypeScript source (no build step); the app consumes them via `transpilePackages`.

## Rules (follow these)

1. **Colours, fonts, spacing come from tokens only.** Use `var(--lk-*)`. Never hard-code a hex in a block. A new look = a new `[data-theme="x"]` block in `packages/tokens/src/styles.css` + an entry in `tokens/src/index.ts`.
2. **Studio theme = the real brand** from studio.lakshyaai.com: mint `#f4fbf7`, emerald `#0e9f6e` / `#0d9488`, ink `#0f172a`, button `#08875d`, Bricolage Grotesque (display, 700, −0.035em) + Geist + Geist Mono, 24px card radius, pill buttons. Don't drift from it. The old navy/Fraunces look is the `story` theme.
3. **CSS class prefix `lk-`**, BEM-ish (`lk-card__media`). Package styles live in each package's `styles.css`; app-only glue in `apps/web/app/globals.css`.
4. **Everything pinned uses `<Pinned>`** (CSS sticky + `useScrollProgress`), not ScrollTrigger `pin`. Per-frame work writes to refs or CSS vars (`--lk-progress`), never React state; state only changes on step boundaries (`useActiveStep`).
5. **Reduced motion is mandatory.** Every animated component checks `prefers-reduced-motion` and renders a still, readable version. `SmoothScroll` falls back to native scroll.
6. **3D loads client-only and lazily**: scenes in `apps/web/components/scenes.tsx`, exported through `next/dynamic({ ssr: false })` in `lazy.tsx`. Always render through `<SceneCanvas>` (pauses off-screen, WebGL fallback, offline lighting). Avoid `transmission` materials (too heavy for phones).
7. **Content lives in `apps/web/content/*.ts`**, never inline in blocks. Blocks are prop-driven and reusable across verticals.
8. **Art slots**: use `<Art scene=… slot="name" />` until real photos exist; passing `src` swaps in the image. Keep `docs/assets.md` in sync when adding slots.
9. **Demo data is fictional** (brands, people, prices, phone numbers). Prices in INR via `<Price>` (`en-IN`). Never invent claims about Lakshya AI (response times, client counts, prices) that aren't on studio.lakshyaai.com.
10. **References are references.** Mobbin and Scrolltide (paid, licensed to Yuvaraj for his own builds) are studied for patterns only. Never copy their code, prompts, copy or imagery into this repo; write original implementations and record the mapping in `docs/references.md`.
11. **Mobile first.** Check 390px width; no horizontal scroll; touch alternatives for hover (`ExpandCards`, `HoverList` tap; `Turntable` drag).
12. **Accessibility basics**: real buttons/links, `aria-*` on sliders/tabs/dialogs, focus-visible styles, keyboard support (`BeforeAfter` arrow keys, cart `Escape`).

## Verify before you say "done"

- `pnpm -r typecheck` and `pnpm --filter @lakshya/web build` both clean.
- Screenshot changed routes at 1440×900 and 390×844. Headless Chrome needs `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader` for WebGL; software GL is slow, so give screenshots a long timeout.
- For 3D/scroll changes, scroll through the pinned section, not just the top of the page.

## Gotchas

- `ScrollVideo` needs an MP4 with a keyframe on every frame (`-g 1`), or seeking stutters.
- In a shallow clone, `git status` may not show tracking; add the fetch refspec for the branch.
- `gh` GraphQL is blocked in Claude Code sessions; use `gh api` REST (e.g. `gh api repos/YuvarajTana/lakshyaai_studio/pulls`).
- The Chrome extension is not permitted on lakshyaai.com (main site); studio.lakshyaai.com and scrolltide.co work.
- `pkill -f "next start"` can kill your own shell; kill `next-server` by PID instead.

## Adding things

- **Component**: put it in the right package, export from its `index.ts`, styles in that package's `styles.css`, add a demo to `/kit` (`apps/web/app/kit/site.tsx`), add a row to the README table and `docs/KNOWLEDGE_BASE.md`.
- **Starter**: `apps/web/app/<name>/{page,site}.tsx` + `apps/web/content/<name>.ts`, wrap in `<ThemePage theme=…>`, add a card on the hub.
- **Client site**: copy a starter, edit its content file, add a client theme, replace art slots and `ModelSlot src`, run `pnpm export`.
