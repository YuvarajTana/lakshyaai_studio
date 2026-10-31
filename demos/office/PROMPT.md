# Lakshya Tech Park — the prompt pack

This is the prompt pack behind the 3D office-building website. It is written to be pasted into Claude (Opus or Sonnet) in a single conversation: the master prompt first, then the follow-ups one at a time. Every follow-up assumes the previous result is in the chat.

Change the names (building, management company, tenants, rooms, people) before you paste. Everything in the demo is fictional.

---

## 1. Master prompt

```
Build a single-file interactive 3D website (HTML, CSS and JS in one file) using Three.js r128 from a CDN:
a walkable office building called "Lakshya Tech Park", managed by "Lakshya Realty".

The building:
- A shared ground-floor lobby with a concierge desk, a café corner, sofas, plants, and a lift core.
- Five office floors above it. Every floor has the same layout: a reception desk by the lifts, an open
  workspace, a meeting room, a founder's cabin and a lounge. A different company rents each floor:
  L1 Pixelmint (brand & product design studio), L2 Ledgerly (payments for small businesses),
  L3 Kiln Labs (applied AI research), L4 Saffron & Co. (corporate law chambers), L5 Cedar Health (telehealth).
  Each company has its own accent colour, carpet colour, signage and a receptionist.
- A realistic daylight look: glass facade, PBR materials, soft shadows, procedural textures drawn on canvases
  (plaster, oak, walnut, marble, carpet, brushed metal), an environment map for reflections, trees, a road
  with light traffic outside, and neighbouring towers in the distance. No cartoon look.

The experience:
- Start outside with an overview of the whole building and a dialog: "Walk in through the main entrance".
- The visitor is a human avatar ("YOU"). After entering, the camera follows the visitor from behind at a
  three-quarter angle. Floors above the current one lift away so the current floor is visible in cut-away.
- The concierge asks "Who are you visiting today?" and lists the five companies. On choosing one, the
  concierge steps out from behind the desk, points, draws an animated route on the floor, and walks the
  visitor to the lifts. The lift doors open, the cab rides up (with the floors updating), and the visitor
  walks out to that company's reception.
- The receptionist asks where to go (workspace, meeting room, cabin, lounge), leads the visitor there the
  same way, and shows a short description of the room. From there: another room, another company (lift
  panel), or back to the lobby.
- A building directory on the right lets you jump to any floor at any time.

UI (HTML over the canvas, not drawn in 3D): brand top-left with a "where am I" pill, a dialog card
top-centre with the options as buttons, the directory on the right, a status pill at the bottom
("Walking to the lifts…", "▲ L3 Going to Kiln Labs"), and small floating labels over people (YOU,
CONCIERGE, RECEPTIONIST). Fonts: Fraunces for titles, Hanken Grotesk for UI, JetBrains Mono for level
numbers. Palette: pine green #1f4a3d on a pale sky grey.

Engineering:
- Build all furniture and architecture from primitives and small helper functions (box, rounded box,
  cylinder, group); merge static meshes per material so the scene stays fast.
- Deterministic pseudo-random for textures and props so every load looks the same.
- Walking uses a simple navigation graph: every location hangs off a corridor, paths are built from chains
  of waypoints, the follower keeps a fixed gap behind the host.
- Drag to orbit, scroll or pinch to zoom, phone layout with the directory as a bottom strip.
- Show a loading screen with progress while textures and people load.
- Reduced-motion friendly, keyboard focus visible, no external assets except the Three.js scripts and fonts.
```

## 2. Follow-up prompts (one at a time)

**People.** "Replace the capsule people with two rigged humanoid characters (a man and a woman) loaded from GLB, with walk, idle, nod and point animations. Retarget a Mixamo animation set onto them so any Mixamo-named rig works. Recolour outfits per company. Keep a simple-figure fallback if the models fail to load."

**Guiding.** "When the host points, draw an animated dashed route on the floor in the company colour from the visitor to the destination, with a pulsing ring at the end. Fade it out when the visitor arrives."

**Lift.** "Make the lift a real cab: doors that slide open and closed, the cab moving between floors with the visitor inside, the status pill counting the levels, and the floors above lifting away as it rises."

**Outside.** "Add the surroundings: a road with cars, autos and a bus on two lanes, a row of shops opposite, trees (banyan, neem, gulmohar, palms), a signboard on the roof, and distant towers with a soft fog so the horizon fades."

**Performance.** "Measure frames per second and step quality down on slow devices: lower the pixel ratio first, then the shadow map. Keep the people's animations updating only when their floor is visible."

**Polish.** "Add a short loading screen with the building's name and a progress bar, a hint ('Drag to look around · scroll or pinch to zoom'), and make the directory highlight the floor you are on."

## 3. Make it yours

- Rename the building, the management company and the five tenants in the `COMPANIES` list near the top of the file.
- Change `BANYAN.accent` and each company's `accent` for the colours.
- The room descriptions live in each company's `rooms` object.
- Swap the two character files (`man.b64.txt`, `woman.b64.txt`) for your own GLB characters, base64-encoded, with Mixamo bone names.

Made by LakshyaAI Studio · Tirupati & Bengaluru · [lakshyaai.com](https://lakshyaai.com)
