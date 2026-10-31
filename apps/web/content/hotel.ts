/** Demo content for the Hotel starter. Fictional property. */
import type { Listing } from "@lakshya/ui";

export const hotel = {
  brand: "Kalyani House",
  nav: [
    { label: "Stays", href: "#stays" },
    { label: "Experiences", href: "#experiences" },
    { label: "The grounds", href: "#grounds" },
    { label: "Journal", href: "#journal" },
  ],
  cta: { label: "Reserve", href: "#reserve" },
  hero: {
    kicker: "Tirupati, Andhra Pradesh",
    title: "A quiet house at the foot of the hills",
    body: "Twenty-two rooms around a courtyard of neem and frangipani, ten minutes from Alipiri. Slow mornings, temple-town evenings.",
    cta: { label: "Plan your stay", href: "#stays" },
  },
  statement:
    "Kalyani House was a family home for three generations before it was a hotel. We kept the courtyard, the well and the habit of feeding everyone who walks in.",
  stays: [
    { id: "s1", title: "Courtyard Room", meta: "28 m² · Queen · Garden view", price: 6800, priceSuffix: "/nt", tag: "New", category: "Rooms", art: { scene: "arch", seed: 3, slot: "room-courtyard" } },
    { id: "s2", title: "Pool Villa", meta: "64 m² · King · Private plunge pool", price: 18500, priceSuffix: "/nt", tag: "Featured", category: "Villas", art: { scene: "horizon", seed: 8, slot: "villa-pool-dusk" } },
    { id: "s3", title: "Hill Suite", meta: "48 m² · King · Tirumala view", price: 12400, priceSuffix: "/nt", category: "Suites", art: { scene: "dunes", seed: 4, slot: "suite-hill-view" } },
    { id: "s4", title: "Family Loft", meta: "56 m² · 2 Queens · Sleeps 5", price: 14200, priceSuffix: "/nt", category: "Suites", art: { scene: "facade", seed: 6, slot: "loft-family" } },
    { id: "s5", title: "Garden Room", meta: "24 m² · Twin · Ground floor", price: 5400, priceSuffix: "/nt", category: "Rooms", art: { scene: "arch", seed: 9, slot: "room-garden" } },
    { id: "s6", title: "Neem Villa", meta: "72 m² · King · Outdoor shower", price: 21000, priceSuffix: "/nt", category: "Villas", art: { scene: "horizon", seed: 12, slot: "villa-neem" } },
  ] satisfies Listing[],
  experiences: [
    { kicker: "Dawn", title: "Darshan, without the queue anxiety", body: "Our concierge books your slot, drives you to Alipiri and is waiting when you come down.", media: { scene: "horizon" as const, seed: 21, slot: "exp-dawn-hills" } },
    { kicker: "Midday", title: "Lunch on banana leaf", body: "Andhra meals from the house kitchen: pappu, gongura, curd rice, and a second helping you didn't ask for.", media: { scene: "pedestal" as const, seed: 22, slot: "exp-meal" } },
    { kicker: "Evening", title: "Courtyard music", body: "Veena and mridangam under the neem tree on Fridays and Saturdays.", media: { scene: "arch" as const, seed: 23, slot: "exp-courtyard-night" } },
  ],
  grounds: [
    { title: "Arrive", body: "Gravel drive, a wall of bougainvillea, and the smell of filter coffee." },
    { title: "The courtyard", body: "Every room opens onto it; the old well still works." },
    { title: "Pool deck", body: "A long, shaded pool for doing nothing between temple visits." },
    { title: "The villas", body: "Six private villas at the back of the grounds, facing the hills." },
  ],
  gallery: [
    { caption: "The courtyard at six", art: { scene: "arch" as const, slot: "gallery-courtyard" } },
    { caption: "Pool villa, late afternoon", art: { scene: "horizon" as const, slot: "gallery-pool" } },
    { caption: "Breakfast on the veranda", art: { scene: "pedestal" as const, slot: "gallery-breakfast" } },
    { caption: "Hill suite terrace", art: { scene: "dunes" as const, slot: "gallery-terrace" } },
    { caption: "Lobby, original teak", art: { scene: "facade" as const, slot: "gallery-lobby" } },
  ],
  quote: {
    quote: "It felt like staying with relatives who happen to run a very good hotel.",
    by: "A guest from Chennai",
    role: "Stayed in the Hill Suite",
  },
};
