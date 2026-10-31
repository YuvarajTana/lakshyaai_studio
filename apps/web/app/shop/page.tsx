import type { Metadata } from "next";
import { ShopSite } from "./site";

export const metadata: Metadata = { title: "E-commerce starter", description: "3D product hero with colour picker, scroll feature tour with hotspots, product grid and cart." };

export default function Page() {
  return <ShopSite />;
}
