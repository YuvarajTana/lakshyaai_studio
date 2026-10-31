# Art slots

Every `<Art>` in the starters names the photo or render that should replace it. Pass `src="/images/<slot>.webp"` (put files in `apps/web/public/images/`) and the illustration steps aside. Add `showSlot` to an `<Art>` while designing to see the slot name on the page.

Suggested size: 2000 px on the long edge, WebP, under 300 KB. Hero slots: 2400 px.

## /story

- `story-canopy`
- `story-picking`
- `story-drying`
- `story-roast`

## /estate

- `project-banyan-facade`
- `project-villas-aerial`
- `project-kapila-interior`
- `project-office-plan`

## /hotel

- `room-courtyard`
- `villa-pool-dusk`
- `suite-hill-view`
- `loft-family`
- `room-garden`
- `villa-neem`
- `exp-dawn-hills`
- `exp-meal`
- `exp-courtyard-night`
- `gallery-courtyard`
- `gallery-pool`
- `gallery-breakfast`
- `gallery-terrace`
- `gallery-lobby`

## /shop

- `product-pebble-one`
- `product-pebble-mini`
- `product-pebble-duo`
- `product-sleeve`
- `product-cradle`
- `product-cover`

## Heroes set in page code

- `hero-estate-mist` (/story)
- `hero-courtyard-dawn` (/hotel)

## 3D models

| Placeholder | Replace with | Notes |
| --- | --- | --- |
| `Tower` | Client building GLB | Keep floors as separate meshes named `floor-00`… so units can highlight |
| `Villa` | Resort site model | Ground at y=0, metres |
| `ProductSpeaker` | Product GLB | Base at y=0, ~1.6 units tall to keep camera keys |

Use `<ModelSlot src="/models/x.glb" placeholder={<Tower />} />`. Compress with `gltf-transform optimize in.glb out.glb --texture-compress webp`.
