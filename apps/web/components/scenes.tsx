"use client";

import { OrbitControls } from "@react-three/drei";
import { Hotspots, ProductSpeaker, SceneCanvas, ScrollRig, Tower, Villa, type CameraKey, type Hotspot } from "@lakshya/three";
import { Art } from "@lakshya/ui";
import type { MutableRefObject } from "react";

const estateColors = { concrete: "#ece7dd", glass: "#a9b9b6", accent: "#c9a46a", ground: "#d9d2c5" };

/* Real estate -------------------------------------------------------------- */
export function TowerHero({ activeFloor, onFloorSelect }: { activeFloor: number | null; onFloorSelect: (f: number) => void }) {
  return (
    <SceneCanvas camera={{ position: [7, 4.6, 8.5], fov: 32 }} fallback={<Art scene="facade" seed={4} />}>
      <group position={[0, -2.4, 0]}>
        <Tower floors={14} activeFloor={activeFloor} onFloorSelect={onFloorSelect} colors={estateColors} />
      </group>
      <OrbitControls target={[0, 0, 0]} enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={0.9} maxPolarAngle={1.45} />
    </SceneCanvas>
  );
}

const towerKeys: CameraKey[] = [
  { position: [8, 1.6, 8], target: [0, 2, 0] },
  { position: [-7.5, 2.6, 5], target: [0, 1.4, 0] },
  { position: [-5, 8, -6.5], target: [0, 3.4, 0] },
  { position: [3.6, 6.4, 3.6], target: [0, 4.4, 0] },
];

export function TowerTour({ progress, activeFloor }: { progress: MutableRefObject<number>; activeFloor: number | null }) {
  return (
    <SceneCanvas camera={{ position: [8, 1.6, 8], fov: 35 }} fallback={<Art scene="facade" seed={9} />}>
      <Tower floors={14} activeFloor={activeFloor} colors={estateColors} />
      <ScrollRig progress={progress} keys={towerKeys} damping={3.5} />
    </SceneCanvas>
  );
}

/* Hotel -------------------------------------------------------------------- */
const villaKeys: CameraKey[] = [
  { position: [0, 11, 15], target: [0, 0, 0] },
  { position: [-9.5, 3.4, 9], target: [0, 0.8, 0] },
  { position: [2.5, 1.8, 8], target: [0, 0.4, 1.2] },
  { position: [11, 5, -6.5], target: [0, 1, -0.5] },
];

export function VillaTour({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <SceneCanvas camera={{ position: [0, 11, 15], fov: 35 }} fallback={<Art scene="horizon" seed={5} />}>
      <fog attach="fog" args={["#faf7f1", 14, 40]} />
      <Villa />
      <ScrollRig progress={progress} keys={villaKeys} damping={3} pointerSway={0.4} />
    </SceneCanvas>
  );
}

/* Commerce ----------------------------------------------------------------- */
export const speakerHotspots: Hotspot[] = [
  { id: "ring", position: [0.25, 1.62, 0], label: "Halo light ring", detail: "Shows volume and voice at a glance" },
  { id: "fabric", position: [0.62, 0.8, 0.2], label: "Recycled knit", detail: "Acoustically clear, washable" },
  { id: "base", position: [-0.4, 0.12, 0.3], label: "Weighted base", detail: "No rattle at full volume" },
];

const speakerKeys: CameraKey[] = [
  { position: [0, 1.4, 7], target: [0, 0.8, 0] },
  { position: [2.2, 3.4, 3.8], target: [0, 1.2, 0] },
  { position: [3.6, 1.3, 3], target: [0.2, 0.8, 0] },
  { position: [-3, 1, 3.6], target: [0, 0.5, 0] },
];

export function SpeakerHero({ color, accent }: { color: string; accent: string }) {
  return (
    <SceneCanvas camera={{ position: [0, 0.6, 7.5], fov: 30 }} fallback={<Art scene="pedestal" seed={2} />}>
      <group position={[0, -0.95, 0]}>
        <ProductSpeaker color={color} accent={accent} spin={0.35} />
      </group>
    </SceneCanvas>
  );
}

export function SpeakerTour({ progress, visible, color, accent }: { progress: MutableRefObject<number>; visible: string[]; color: string; accent: string }) {
  return (
    <SceneCanvas camera={{ position: [0, 1.4, 7], fov: 32 }} fallback={<Art scene="pedestal" seed={7} />}>
      <ProductSpeaker color={color} accent={accent} spin={0}>
        <Hotspots items={speakerHotspots} visible={visible} />
      </ProductSpeaker>
      <ScrollRig progress={progress} keys={speakerKeys} damping={4} pointerSway={0.15} />
    </SceneCanvas>
  );
}
