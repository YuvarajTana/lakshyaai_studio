"use client";

import { Html } from "@react-three/drei";
import type { Vec3 } from "./ScrollRig";

export interface Hotspot {
  id: string;
  position: Vec3;
  label: string;
  detail?: string;
}

export interface HotspotsProps {
  items: Hotspot[];
  /** Ids to show; omit to show all. Drive this from scroll steps to reveal features one by one. */
  visible?: string[];
  onSelect?: (id: string) => void;
}

/** Labelled pins anchored to points on a model (product features, building amenities). */
export function Hotspots({ items, visible, onSelect }: HotspotsProps) {
  return (
    <>
      {items.map((h) => {
        const show = !visible || visible.includes(h.id);
        return (
          <Html key={h.id} position={h.position} center zIndexRange={[20, 0]}>
            <button
              type="button"
              className="lk-hotspot"
              data-show={show}
              tabIndex={show ? 0 : -1}
              onClick={() => onSelect?.(h.id)}
            >
              <span className="lk-hotspot__dot" />
              <span className="lk-hotspot__label">
                <strong>{h.label}</strong>
                {h.detail && <em>{h.detail}</em>}
              </span>
            </button>
          </Html>
        );
      })}
    </>
  );
}
