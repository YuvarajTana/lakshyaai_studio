import type { Metadata } from "next";
import { StorySite } from "./site";

export const metadata: Metadata = { title: "Storytelling starter", description: "Oversized type hero, scroll-scrubbed statement, pinned chapters, canvas image sequence, timeline and gallery." };

export default function Page() {
  return <StorySite />;
}
