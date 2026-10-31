import type { Metadata } from "next";
import { EstateSite } from "./site";

export const metadata: Metadata = { title: "Real estate starter", description: "3D tower with live unit picker, scroll tour, specs and projects." };

export default function Page() {
  return <EstateSite />;
}
