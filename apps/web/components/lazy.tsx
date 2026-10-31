"use client";

import dynamic from "next/dynamic";

/* 3D loads only in the browser and only when the page needs it, keeping first paint light. */
export const TowerHero = dynamic(() => import("./scenes").then((m) => m.TowerHero), { ssr: false });
export const TowerTour = dynamic(() => import("./scenes").then((m) => m.TowerTour), { ssr: false });
export const VillaTour = dynamic(() => import("./scenes").then((m) => m.VillaTour), { ssr: false });
export const SpeakerHero = dynamic(() => import("./scenes").then((m) => m.SpeakerHero), { ssr: false });
export const SpeakerTour = dynamic(() => import("./scenes").then((m) => m.SpeakerTour), { ssr: false });
