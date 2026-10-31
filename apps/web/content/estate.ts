/**
 * Demo content for the Real Estate starter. Everything a client changes lives here:
 * swap the copy, units and art slots, and the page re-renders as their site.
 * All names, prices and places are fictional.
 */
import type { Listing, Unit } from "@lakshya/ui";

export const estate = {
  brand: "Banyan Point",
  nav: [
    { label: "Residences", href: "#residences" },
    { label: "Tour", href: "#tour" },
    { label: "Specs", href: "#specs" },
    { label: "Projects", href: "#projects" },
  ],
  cta: { label: "Book a site visit", href: "#visit" },
  hero: {
    kicker: "Tirupati · Alipiri Road · Possession 2028",
    title: "Fourteen floors, facing the hills",
    body: "Two and three bedroom residences with deep balconies, cross-ventilation and a view of Tirumala from every living room. Hover a floor to see what's open.",
  },
  units: [
    { id: "u13", floor: 13, name: "Crown Residence", beds: "4 BHK · private terrace", size: "3,450 sq ft", price: 32500000, status: "available" },
    { id: "u12", floor: 12, name: "Sky Residence", beds: "3 BHK", size: "2,180 sq ft", price: 18900000, status: "reserved" },
    { id: "u10", floor: 10, name: "Sky Residence", beds: "3 BHK", size: "2,180 sq ft", price: 18100000, status: "available" },
    { id: "u8", floor: 8, name: "Hill Residence", beds: "3 BHK", size: "1,960 sq ft", price: 15400000, status: "available" },
    { id: "u6", floor: 6, name: "Garden Residence", beds: "2 BHK", size: "1,420 sq ft", price: 10900000, status: "sold" },
    { id: "u3", floor: 3, name: "Garden Residence", beds: "2 BHK", size: "1,420 sq ft", price: 10200000, status: "available" },
  ] satisfies Unit[],
  statement:
    "We started with the light. Every residence is one apartment deep, so morning sun reaches the kitchen and the evening breeze crosses the living room before it leaves.",
  stats: [
    { value: 14, label: "Floors" },
    { value: 52, label: "Residences" },
    { value: 68, suffix: "%", label: "Open landscape" },
    { value: 2028, label: "Possession" },
  ],
  tour: [
    { title: "Arrival", body: "A shaded drop-off under the banyan, a double-height lobby, no basement smell." },
    { title: "Garden floors", body: "Floors one to six open onto the landscaped podium. Kids play where you can see them." },
    { title: "Sky deck", body: "A rooftop with a lap pool and a yoga lawn that looks straight at the seven hills." },
    { title: "Crown residence", body: "One home on the top floor with a private terrace that wraps three sides." },
  ],
  specs: [
    { label: "Structure", value: "RCC frame, seismic zone II+" },
    { label: "Ceiling height", value: "3.2 m floor to floor" },
    { label: "Flooring", value: "Kota stone + engineered teak" },
    { label: "Windows", value: "Double-glazed UPVC, mosquito mesh" },
    { label: "Power backup", value: "100% for common areas, 3 kW per home" },
    { label: "Water", value: "Rainwater harvesting + STP" },
    { label: "Parking", value: "2 covered slots per home, EV ready" },
    { label: "RERA", value: "Registration number on request" },
  ],
  projects: [
    { id: "p1", title: "Banyan Point", meta: "Tirupati · 52 homes", tag: "Now selling", category: "Residential", art: { scene: "facade", seed: 2, slot: "project-banyan-facade" } },
    { id: "p2", title: "Seven Hills Villas", meta: "Tiruchanur · 18 villas", tag: "Completed", category: "Villas", art: { scene: "horizon", seed: 7, slot: "project-villas-aerial" } },
    { id: "p3", title: "Kapila Court", meta: "Kapila Theertham · 36 homes", category: "Residential", art: { scene: "arch", seed: 5, slot: "project-kapila-interior" } },
    { id: "p4", title: "Renigunta Works", meta: "Renigunta · Grade-A office", tag: "Coming 2027", category: "Commercial", art: { scene: "grid", seed: 3, slot: "project-office-plan" } },
  ] satisfies Listing[],
  milestones: [
    { when: "2025", title: "Land and approvals", body: "Title cleared, layout approved, RERA registered.", art: { scene: "grid" as const } },
    { when: "2026", title: "Foundation and podium", body: "Raft foundation poured; landscape podium in progress.", art: { scene: "dunes" as const } },
    { when: "2027", title: "Structure tops out", body: "All fourteen floors cast; facade work begins.", art: { scene: "facade" as const } },
    { when: "2028", title: "Keys", body: "Handover with a 5-year structural warranty.", art: { scene: "arch" as const } },
  ],
};
