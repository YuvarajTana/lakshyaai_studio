/** Demo content for the E-commerce starter. Fictional brand and products. */
import type { Product } from "@lakshya/ui";

export const shop = {
  brand: "Pebble Audio",
  nav: [
    { label: "Speaker", href: "#product" },
    { label: "Shop", href: "#shop" },
    { label: "Why Pebble", href: "#why" },
  ],
  hero: {
    kicker: "New · Pebble One",
    title: "Room-filling sound in a stone you can hold",
    body: "A smart speaker turned on a lathe, wrapped in recycled knit, tuned in Bengaluru.",
    cta: { label: "Shop Pebble One", href: "#shop" },
  },
  colors: [
    { name: "Basalt", body: "#1d1d1f", accent: "#3b5bff" },
    { name: "Sandstone", body: "#cbb89a", accent: "#ff5a36" },
    { name: "Moss", body: "#55634a", accent: "#c6ff3d" },
  ],
  tour: [
    { title: "One stone", body: "No seams, no screws you can see. The shell is a single turned form." },
    { title: "Halo ring", body: "Volume, voice and pairing in one ring of light on top." },
    { title: "Recycled knit", body: "Made from 31 plastic bottles. Acoustically transparent, washable." },
    { title: "Weighted base", body: "A steel slug keeps it planted at full volume." },
  ],
  tourHotspots: [[], ["ring"], ["ring", "fabric"], ["ring", "fabric", "base"]] as string[][],
  ticker: ["Free shipping over ₹2,999", "2-year warranty", "Made in India", "30-day returns", "Pay in 3 with UPI"],
  products: [
    { id: "p1", title: "Pebble One", price: 14999, compareAt: 17999, tag: "New", colors: ["#1d1d1f", "#cbb89a", "#55634a"], art: { scene: "pedestal", seed: 1, slot: "product-pebble-one" } },
    { id: "p2", title: "Pebble Mini", price: 7499, colors: ["#1d1d1f", "#cbb89a"], art: { scene: "pedestal", seed: 2, slot: "product-pebble-mini" } },
    { id: "p3", title: "Pebble Duo (pair)", price: 26999, tag: "Bundle", colors: ["#1d1d1f", "#55634a"], art: { scene: "pedestal", seed: 3, slot: "product-pebble-duo" } },
    { id: "p4", title: "Travel sleeve", price: 1499, colors: ["#cbb89a", "#3b5bff"], art: { scene: "pedestal", seed: 4, slot: "product-sleeve" } },
    { id: "p5", title: "Wall cradle", price: 999, art: { scene: "pedestal", seed: 5, slot: "product-cradle" } },
    { id: "p6", title: "Knit cover", price: 1999, colors: ["#55634a", "#ff5a36", "#1d1d1f"], art: { scene: "pedestal", seed: 6, slot: "product-cover" } },
  ] satisfies Product[],
  why: [
    { title: "Tuned for Indian rooms", body: "High ceilings, hard floors, ceiling fans: we tuned for them." },
    { title: "Works offline", body: "Bluetooth and line-in keep working when the Wi-Fi doesn't." },
    { title: "Repairable", body: "Every part can be replaced. We publish the guides." },
    { title: "Two-year warranty", body: "Doorstep pickup in 400+ cities." },
  ],
  quote: { quote: "It made my 1BHK sound like a concert hall, and it looks like a sculpture when it's off.", by: "Ananya R.", role: "Verified buyer, Hyderabad" },
};
