import type { Metadata } from "next";
import { KitSite } from "./site";

export const metadata: Metadata = { title: "Component library", description: "Live demos of every motion, media and section block in the Lakshya AI Studio kit." };

export default function Page() {
  return <KitSite />;
}
