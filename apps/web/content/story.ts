/** Demo content for the Storytelling starter: a brand story for a fictional coffee estate. */
export const story = {
  brand: "Kaapi Hills",
  nav: [
    { label: "Story", href: "#story" },
    { label: "The roast", href: "#roast" },
    { label: "Timeline", href: "#timeline" },
    { label: "Estate", href: "#estate" },
  ],
  hero: {
    kicker: "Chikmagalur · since 1952",
    word: "Kaapi",
    lead: "Seventy years, four generations, one hillside of shade-grown arabica.",
    aside: "Scroll to follow a coffee cherry from the bush to your cup.",
    cta: { label: "Read the story", href: "#story" },
  },
  statement:
    "Our grandfather planted coffee under silver oak and pepper vines because that's how the forest already grew. We still farm that way, and you can taste the shade.",
  chapters: [
    { kicker: "01 · Grow", title: "Under the canopy", body: "Arabica grows slowly in the shade of silver oak, so the cherry ripens longer and sweeter.", media: { scene: "dunes" as const, seed: 31, slot: "story-canopy" } },
    { kicker: "02 · Pick", title: "Only the red ones", body: "Every cherry is hand-picked, ripe ones only. A picker passes each bush up to five times a season.", media: { scene: "horizon" as const, seed: 32, slot: "story-picking" } },
    { kicker: "03 · Dry", title: "Sun on the patio", body: "Cherries dry on raised beds for three weeks, turned by hand every hour.", media: { scene: "grid" as const, seed: 33, slot: "story-drying" } },
    { kicker: "04 · Roast", title: "Small batches", body: "Twelve kilos at a time, roasted the morning we ship it.", media: { scene: "pedestal" as const, seed: 34, slot: "story-roast" } },
  ],
  sequence: { title: "From cherry to cup", body: "Scroll the roast. Green beans turn gold, then cinnamon, then the deep brown of a city roast." },
  milestones: [
    { when: "1952", title: "First planting", body: "Twelve acres of arabica under existing forest canopy." },
    { when: "1978", title: "The pulping house", body: "We stopped selling cherry and started processing our own." },
    { when: "2004", title: "Organic certification", body: "Formalised what we'd always done." },
    { when: "2026", title: "Direct to you", body: "Roasted on the estate, shipped within 48 hours." },
  ],
  gallery: [
    { caption: "Morning mist over the estate", art: { scene: "dunes" as const } },
    { caption: "The pulping house, 1978", art: { scene: "facade" as const } },
    { caption: "Pepper vines on silver oak", art: { scene: "horizon" as const } },
    { caption: "Drying beds in March", art: { scene: "grid" as const } },
    { caption: "The roastery", art: { scene: "pedestal" as const } },
  ],
  quote: { quote: "Good coffee is just patience you can drink.", by: "Appaji", role: "Founder, 1952" },
};
