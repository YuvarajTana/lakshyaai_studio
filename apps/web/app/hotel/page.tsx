import type { Metadata } from "next";
import { HotelSite } from "./site";

export const metadata: Metadata = { title: "Hotel starter", description: "Editorial hotel site: booking bar, stays with filters, experiences, 3D grounds tour." };

export default function Page() {
  return <HotelSite />;
}
