# Reference board

Saved to four private Mobbin collections (open while signed in to Mobbin):

- [LakshyaAI Studio — Storytelling](https://mobbin.com/collections/0797bf8b-d3fe-435c-9b06-4eb044d93dfd) · 13 sections
- [LakshyaAI Studio — Real Estate](https://mobbin.com/collections/920596d3-f09f-4ef2-9da0-a778e7cc8acf) · 6 sections
- [LakshyaAI Studio — Hotels](https://mobbin.com/collections/9b64bac8-3e0f-4bd9-a806-4074ce38940f) · 7 sections
- [LakshyaAI Studio — E-commerce](https://mobbin.com/collections/ef9c38e5-7a43-458f-bcd9-01b766f87f1a) · 10 sections

These are for studying patterns. Don't copy layouts, copy or imagery from them into client work; the kit's blocks are the original interpretations.

## Pattern → block

| Pattern seen | Where | Kit block |
| --- | --- | --- |
| Oversized product/brand name over full-bleed photo, small copy in the corners | [Samara](https://mobbin.com/sites/sections/19d48f9c-20f5-4d4e-84a8-a0abfcf2133c), [Agentcard](https://mobbin.com/sites/sections/bf129abc-ab32-4ea9-a872-6c99837e513d) | `HeroMega` |
| Editorial split hero: mono location kicker, serif name, "Book now ↗" | [KOBU hotel](https://mobbin.com/sites/sections/79b3c5a4-83c8-46f4-a63a-fcd4697964cd) | `HeroSplit` |
| Architectural illustration hero with technical grid | [Heron AI](https://mobbin.com/sites/sections/76dab96c-c33d-4d52-944b-7d32dc2274fa) | `Art scene="grid"`, `HeroScene` |
| Words greying in as you scroll a statement | [VanMoof](https://mobbin.com/sites/sections/572adcbe-3cce-44fc-8485-ed61a29c9b6f) | `ScrubText`, `Statement` |
| Two-up property cards: "NEW" tag, name ↗, price/night in mono, location below | [KOBU villas](https://mobbin.com/sites/sections/4226456d-e845-483a-ad1b-305a93fe7d36) | `ListingCard`, `ListingGrid` |
| Staggered, offset card grid | [KOBU hotels](https://mobbin.com/sites/sections/7dce8910-52a7-47da-9de4-21bc9456292a) | `ListingGrid layout="staggered"` |
| Destination list on the left filtering a grid | [KOBU destinations](https://mobbin.com/sites/sections/3cfe935a-4543-4397-b4f5-82128a07251e) | `ListingGrid filter` |
| Accommodation carousel bleeding off the edge | [KOBU property](https://mobbin.com/sites/sections/4c53b4ba-0ada-4f63-aad5-8ae76851b6f6) | `Gallery` (`HorizontalScroll`) |
| Product with labelled feature callouts | [Rains](https://mobbin.com/sites/sections/0c9ca7d4-3523-44f2-93cf-ee3137acc9d7), [Telepathic Instruments](https://mobbin.com/sites/sections/e19b1448-2e4b-4614-b64d-9f2cda0540c5) | `Hotspots` + `ScrollScene` |
| Feature cards with Features / 360° / Anatomy toggle | [Sunday](https://mobbin.com/sites/sections/e8714fa3-9716-45f1-80a8-ec75f10465c1) | `PinnedChapters` (next: tabbed variant) |
| Grid of renders on flat grey, maker avatar + price | [Zellerfeld](https://mobbin.com/sites/sections/adf70ee0-5902-4cfe-a34e-134082d083b1) | `ProductGrid` |
| Brutalist mono product rail with arrows | [SOTF](https://mobbin.com/sites/sections/5ea27774-07b3-446d-b208-6b31e42f1281) | `ProductGrid` (next: rail variant) |
| Product carousel with restock ticker | [Telepathic Instruments](https://mobbin.com/sites/sections/92682247-5cb5-460a-bc00-b7cc12b48606) | `Ticker` |
| Winding illustrated timeline | [Going](https://mobbin.com/sites/sections/7d0efe17-5f06-4a2c-a570-ab767ac8934b) | `Timeline` |
| Decade tabs + big year | [Selfridges](https://mobbin.com/sites/sections/2543b10c-9eb3-481b-b037-a332a1be62b5) | `Timeline` (next: decade tabs) |
| Dark brand story with rolling year counter | [Mews](https://mobbin.com/sites/sections/8b7d9d81-339d-4b24-a381-476d6d1b347f) | `Counter`, `Timeline` |
| Restaurant "making of" with quote | [Squarespace / Mosuke](https://mobbin.com/sites/sections/96a5a485-2b70-48b4-b3d4-f6e94e1cbc25) | `Quote`, `PinnedChapters` |
| Half photo, half colour block with big type | [Eat Hungry Tiger](https://mobbin.com/sites/sections/2331ed49-dec3-4209-aef8-dae217fa3578) | `PinnedChapters` |

## Still to add

- **Scrolltide** (paid, prompts + templates): not catalogued yet because the browser wasn't reachable. Next pass: open it in Chrome, add a "Scrolltide patterns" table here, and turn any missing effects into new `@lakshya/motion` components. Same rule: study, then write our own.
- Mobbin flows for booking and checkout (multi-step), once the hosted tier is wired.
