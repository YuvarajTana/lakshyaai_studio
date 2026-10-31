"use client";

/**
 * Procedural placeholder models. They are drawn in code (no downloads, no licences to
 * worry about) and sized to real-world proportions, so a client's GLB can replace one
 * later through <ModelSlot src="…" /> without re-framing the camera.
 */

import { ContactShadows, RoundedBox, useGLTF } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { Color, type Group, MathUtils, Vector2 } from "three";
import type { Vec3 } from "./ScrollRig";

/* -------------------------------------------------------------------------- */
/* Tower: a residential tower with selectable floors (real estate hero).        */
/* -------------------------------------------------------------------------- */
export interface TowerProps {
  floors?: number;
  /** Highlight this floor (0 = ground). */
  activeFloor?: number | null;
  onFloorSelect?: (floor: number) => void;
  colors?: { concrete?: string; glass?: string; accent?: string; ground?: string };
  position?: Vec3;
}

export function Tower({
  floors = 14,
  activeFloor = null,
  onFloorSelect,
  colors = {},
  position = [0, 0, 0],
}: TowerProps) {
  const { concrete = "#e9e4da", glass = "#9fb3b8", accent = "#c9a46a", ground = "#d9d2c5" } = colors;
  const [hover, setHover] = useState<number | null>(null);
  const h = 0.32;
  const lit = hover ?? activeFloor;

  return (
    <group position={position}>
      {/* plinth */}
      <mesh position={[0, 0.06, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.6, 0.12, 2.2]} />
        <meshStandardMaterial color={ground} roughness={0.95} />
      </mesh>
      {Array.from({ length: floors }, (_, i) => {
        const y = 0.12 + i * h;
        // gentle twist + setback gives an architectural silhouette instead of a box
        const twist = MathUtils.degToRad(i * 1.6);
        const inset = i > floors - 3 ? 0.18 : 0;
        const isLit = lit === i;
        return (
          <group
            key={i}
            position={[0, y, 0]}
            rotation-y={twist}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              setHover(i);
            }}
            onPointerOut={() => setHover((v) => (v === i ? null : v))}
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation();
              onFloorSelect?.(i);
            }}
          >
            <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.9 - inset, 0.04, 1.5 - inset]} />
              <meshStandardMaterial color={concrete} roughness={0.8} />
            </mesh>
            <mesh position={[0, h / 2 + 0.02, 0]} castShadow>
              <boxGeometry args={[1.72 - inset, h - 0.04, 1.32 - inset]} />
              {/* Reflective tinted glass without transmission: one render pass, phone-friendly. */}
              <meshStandardMaterial
                color={isLit ? accent : glass}
                emissive={isLit ? accent : "#000000"}
                emissiveIntensity={isLit ? 0.35 : 0}
                roughness={0.12}
                metalness={0.55}
                envMapIntensity={1.2}
              />
            </mesh>
            {/* balcony fins */}
            {[-0.6, 0, 0.6].map((x) => (
              <mesh key={x} position={[x, h / 2 + 0.02, (1.32 - inset) / 2 + 0.02]} castShadow>
                <boxGeometry args={[0.03, h - 0.04, 0.06]} />
                <meshStandardMaterial color={concrete} />
              </mesh>
            ))}
          </group>
        );
      })}
      {/* crown */}
      <mesh position={[0, 0.12 + floors * h + 0.05, 0]} rotation-y={MathUtils.degToRad(floors * 1.6)} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.1]} />
        <meshStandardMaterial color={concrete} roughness={0.7} />
      </mesh>
      <ContactShadows position={[0, 0.001, 0]} scale={8} blur={2.4} opacity={0.45} far={6} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* ProductSpeaker: a lathe-turned smart speaker (e-commerce hero).              */
/* -------------------------------------------------------------------------- */
export interface ProductProps {
  color?: string;
  accent?: string;
  /** Idle spin in radians per second; scroll can override via `rotation`. */
  spin?: number;
  position?: Vec3;
  children?: ReactNode;
}

export function ProductSpeaker({ color = "#1d1d1f", accent = "#3b5bff", spin = 0.25, position = [0, 0, 0], children }: ProductProps) {
  const ref = useRef<Group>(null);
  const profile = useMemo(() => {
    const pts: Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      // rounded pebble profile: wide belly, soft shoulders
      const r = 0.55 * Math.sin(Math.PI * MathUtils.lerp(0.08, 0.92, t)) + 0.12;
      pts.push(new Vector2(r, t * 1.6));
    }
    return pts;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += spin * dt;
  });

  return (
    <group ref={ref} position={position}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 96]} />
        <meshPhysicalMaterial color={color} roughness={0.9} sheen={1} sheenColor={new Color(color).offsetHSL(0, 0, 0.25)} sheenRoughness={0.6} />
      </mesh>
      {/* top cap */}
      <mesh position={[0, 1.6, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.18, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* light ring */}
      <mesh position={[0, 1.585, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.19, 0.22, 64]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      {children}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Villa: low resort pavilion with pool (hotel hero).                           */
/* -------------------------------------------------------------------------- */
export interface VillaProps {
  colors?: { wall?: string; roof?: string; wood?: string; water?: string; ground?: string };
  position?: Vec3;
}

export function Villa({ colors = {}, position = [0, 0, 0] }: VillaProps) {
  const { wall = "#efe7da", roof = "#e4dccd", wood = "#8a5a3b", water = "#5fa3a6", ground = "#d8ccb6" } = colors;
  return (
    <group position={position}>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={ground} roughness={1} />
      </mesh>
      {/* deck */}
      <mesh position={[0, 0.05, 0.6]} receiveShadow castShadow>
        <boxGeometry args={[6, 0.1, 3.4]} />
        <meshStandardMaterial color={wood} roughness={0.7} />
      </mesh>
      {/* pool */}
      <mesh position={[0, 0.07, 1.4]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[4.4, 1.4]} />
        <meshPhysicalMaterial color={water} roughness={0.05} metalness={0.1} clearcoat={1} />
      </mesh>
      {/* walls */}
      <mesh position={[-1.6, 0.85, -0.6]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.5, 1.4]} />
        <meshStandardMaterial color={wall} roughness={0.9} />
      </mesh>
      <mesh position={[1.9, 0.85, -0.6]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.5, 1.4]} />
        <meshStandardMaterial color={wall} roughness={0.9} />
      </mesh>
      {/* glass living room between the volumes */}
      <mesh position={[0.15, 0.85, -0.6]}>
        <boxGeometry args={[1.1, 1.5, 1.3]} />
        <meshStandardMaterial color="#cfe0df" roughness={0.05} metalness={0.6} transparent opacity={0.7} />
      </mesh>
      {/* floating roof slab */}
      <mesh position={[0, 1.72, -0.35]} castShadow>
        <boxGeometry args={[6.4, 0.14, 2.6]} />
        <meshStandardMaterial color={roof} roughness={0.85} />
      </mesh>
      {/* timber columns */}
      {[-2.9, -1.5, 1.5, 2.9].map((x) => (
        <mesh key={x} position={[x, 0.85, 0.85]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.6, 12]} />
          <meshStandardMaterial color={wood} />
        </mesh>
      ))}
      {/* palms as simple abstract forms */}
      {[
        [-3.8, 0, -1.8],
        [3.9, 0, -2.2],
        [4.4, 0, 1.8],
      ].map((p, i) => (
        <group key={i} position={p as Vec3}>
          <mesh position={[0, 1.2, 0]} castShadow rotation-z={0.08 * (i - 1)}>
            <cylinderGeometry args={[0.05, 0.08, 2.4, 8]} />
            <meshStandardMaterial color="#7b6247" />
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow>
            <icosahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial color="#5d7356" flatShading />
          </mesh>
        </group>
      ))}
      <ContactShadows position={[0, 0.002, 0]} scale={16} blur={2} opacity={0.35} far={4} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* ModelSlot: render a client GLB when you have one, a placeholder until then. */
/* -------------------------------------------------------------------------- */
export interface ModelSlotProps {
  src?: string;
  scale?: number;
  position?: Vec3;
  rotation?: Vec3;
  placeholder: ReactNode;
}

function Gltf({ src, ...props }: { src: string; scale?: number; position?: Vec3; rotation?: Vec3 }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} {...props} />;
}

export function ModelSlot({ src, placeholder, ...props }: ModelSlotProps) {
  return src ? <Gltf src={src} {...props} /> : <>{placeholder}</>;
}

/* -------------------------------------------------------------------------- */
/* Pebble: a rounded block for quick product mockups (phones, cards, boxes).  */
/* -------------------------------------------------------------------------- */
export function Pebble({ size = [1, 1.6, 0.18] as Vec3, color = "#111", radius = 0.12, position = [0, 0, 0] as Vec3 }) {
  return (
    <RoundedBox args={size} radius={radius} smoothness={6} position={position} castShadow>
      <meshPhysicalMaterial color={color} roughness={0.25} metalness={0.3} clearcoat={0.6} />
    </RoundedBox>
  );
}
