# LakshyaAI Studio — website foundation kit

The groundwork behind every LakshyaAI Studio site: design tokens, scroll motion, 3D, section blocks and four starter sites (storytelling, real estate, hotels, e-commerce). The code is free; LakshyaAI Studio charges to host it and connect it (bookings, payments, CMS, forms). Sold and marketed through [studio.lakshyaai.com](https://studio.lakshyaai.com) and [@studio.lakshyaai](https://instagram.com/studio.lakshyaai).

```
apps/web            Next.js app: the hub (/) and four starters (/story /estate /hotel /shop)
packages/tokens     Colours, type, spacing, easing; 5 themes switched by data-theme
packages/motion     Lenis + GSAP: smooth scroll, reveals, pinned scenes, image sequence, cursor
packages/three      React Three Fiber: one canvas, scroll camera, hotspots, procedural models
packages/ui         Section blocks: headers, heroes, listings, specs, units, booking, cart, footer
docs/               Reference board (Mobbin) and the art-slot list
demos/office        The earlier Lakshya Tech Park 3D office demo, unchanged
```

## Run it

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # production build + typecheck
pnpm export         # fully static site in apps/web/out — the free-tier deliverable
```

Node 20+ and pnpm 10.

## How the pieces fit

**Tokens.** Every block reads CSS variables (`--lk-bg`, `--lk-ink`, `--lk-accent`, `--lk-font-display` …). Put `data-theme="studio" | "story" | "estate" | "hotel" | "commerce"` on a wrapper and the whole subtree re-skins. **Studio** is the Lakshya AI brand taken from studio.lakshyaai.com (mint `#f4fbf7`, emerald `#0e9f6e`, Bricolage Grotesque + Geist + Geist Mono); it follows the OS into dark mode, or force it with `data-mode="light" | "dark"`. **Story** is the dark navy editorial look used by the storytelling starter. Add a client brand by adding one more `[data-theme="client"]` block in `packages/tokens/src/styles.css`.

**Motion.** Wrap the app in `<SmoothScroll>` once. Lenis runs from GSAP's ticker so ScrollTrigger never drifts, and everything falls back to native scroll and no animation when the visitor prefers reduced motion. Everything pinned is built on one primitive, `<Pinned>` (CSS sticky + scroll progress), which is sturdier on phones than pin-spacing:

| Component | Use it for |
| --- | --- |
| `Reveal`, `SplitReveal`, `ScrubText` | Fade-ups, masked headline reveals, words lighting up as you scroll |
| `Parallax`, `Counter`, `Magnetic`, `Marquee`, `Cursor` | Micro-interactions |
| `PinnedChapters` | A story told in steps: media and copy crossfade per chapter |
| `HorizontalScroll`, `StackCards` | Galleries and stacked cards |
| `ImageSequence` | Scroll-scrubbed frames on a canvas: pass image URLs or a `draw` function |
| `useScrollProgress`, `useActiveStep` | Build your own scroll-driven thing without re-rendering React |

**3D.** `<SceneCanvas>` is the only canvas you need: capped DPR, adaptive resolution, offline studio lighting (no HDR download), stops rendering when off-screen, and a fallback when WebGL is missing. `<ScrollRig>` flies the camera through keyframes as you scroll, arcing around the subject. `<Hotspots>` pins labels to points on a model. `Tower`, `Villa`, `ProductSpeaker` and `Pebble` are procedural placeholders sized to real proportions; `<ModelSlot src="/model.glb">` swaps in a client's GLB without re-framing.

**Blocks.** `@lakshya/ui` holds the sections, all driven by props. A starter is a page of blocks plus a content file (`apps/web/content/*.ts`). To make a client site, copy a starter, edit its content file, set its theme, and replace art slots with photos.

**Art slots.** `<Art scene="arch" slot="room-courtyard" />` draws a themed illustration so a site looks finished before photography exists. Pass `src` and the photo or AI render takes over. See [docs/assets.md](docs/assets.md) for every slot.

## Free vs paid

| Free (the code) | Hosted (paid) |
| --- | --- |
| `pnpm export` → static folder, host anywhere | Domain, hosting, SSL, monitoring |
| Booking bar, cart and forms work as UI | Wired to a booking engine, Razorpay/Shopify, CRM, email |
| Content in a TypeScript file | CMS so the owner edits copy and photos |

The hooks for the paid tier are already there: `BookingBar onSearch`, `CartDrawer onCheckout`, `ModelSlot src`, `Art src`.

## References

Patterns were studied from the Mobbin collections listed in [docs/references.md](docs/references.md). They are references, not sources: every component here is original code.

All names, properties, prices and people in the demos are fictional.
