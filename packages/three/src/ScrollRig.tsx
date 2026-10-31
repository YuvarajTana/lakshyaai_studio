"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import { MathUtils, Spherical, Vector3 } from "three";

export type Vec3 = [number, number, number];

export interface CameraKey {
  /** Camera position at this key. */
  position: Vec3;
  /** Point the camera looks at. */
  target: Vec3;
  /** Optional field of view. */
  fov?: number;
}

export interface ScrollRigProps {
  /** 0..1 progress, usually from @lakshya/motion's useScrollProgress or Pinned onProgress. */
  progress: MutableRefObject<number>;
  keys: CameraKey[];
  /** Higher = snappier. 4 feels cinematic, 10 feels direct. */
  damping?: number;
  /** Subtle pointer parallax in world units. 0 disables. */
  pointerSway?: number;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Flies the camera through keyframes as the visitor scrolls.
 * Keys are spread evenly across 0..1; between keys the move is eased.
 */
export function ScrollRig({ progress, keys, damping = 4, pointerSway = 0.25 }: ScrollRigProps) {
  const { camera, pointer } = useThree();
  const pos = useRef(new Vector3());
  const tgt = useRef(new Vector3());
  const look = useRef(new Vector3(...(keys[0]?.target ?? [0, 0, 0])));
  const scratch = useRef({ a: new Vector3(), b: new Vector3(), s0: new Spherical(), s1: new Spherical(), sp: new Spherical() });
  const { a, b, s0, s1, sp } = scratch.current;

  useFrame((_, dt) => {
    if (keys.length === 0) return;
    const p = MathUtils.clamp(progress.current, 0, 1) * (keys.length - 1);
    const i = Math.min(keys.length - 2, Math.floor(p));
    const k0 = keys[Math.max(0, i)]!;
    const k1 = keys[Math.min(keys.length - 1, i + 1)]!;
    const t = keys.length === 1 ? 0 : smooth(p - Math.max(0, i));

    // Interpolate the target linearly, but the camera offset in spherical coordinates,
    // so moves arc around the subject instead of cutting through it.
    tgt.current.copy(a.set(...k0.target)).lerp(b.set(...k1.target), t);
    s0.setFromVector3(a.set(...k0.position).sub(b.set(...k0.target)));
    s1.setFromVector3(a.set(...k1.position).sub(b.set(...k1.target)));
    let dTheta = s1.theta - s0.theta;
    if (dTheta > Math.PI) dTheta -= Math.PI * 2;
    if (dTheta < -Math.PI) dTheta += Math.PI * 2;
    sp.set(
      MathUtils.lerp(s0.radius, s1.radius, t),
      MathUtils.lerp(s0.phi, s1.phi, t),
      s0.theta + dTheta * t,
    );
    pos.current.setFromSpherical(sp).add(tgt.current);
    if (pointerSway) {
      pos.current.x += pointer.x * pointerSway;
      pos.current.y += pointer.y * pointerSway * 0.5;
    }

    const lambda = 1 - Math.exp(-damping * dt);
    camera.position.lerp(pos.current, lambda);
    look.current.lerp(tgt.current, lambda);
    camera.lookAt(look.current);

    if (k0.fov && k1.fov && "fov" in camera) {
      const cam = camera as typeof camera & { fov: number; updateProjectionMatrix(): void };
      cam.fov = MathUtils.lerp(cam.fov, MathUtils.lerp(k0.fov, k1.fov, t), lambda);
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
