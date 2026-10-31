"use client";

import { Pinned } from "@lakshya/motion";
import { useRef, type MutableRefObject, type ReactNode } from "react";

export interface SceneStep {
  title: string;
  body: string;
}

/**
 * A pinned, scroll-driven 3D chapter. The scene receives a progress ref (0..1) to feed a
 * <ScrollRig>, plus the active step index for anything that changes per step.
 */
export function ScrollScene({
  steps,
  id,
  children,
}: {
  steps: SceneStep[];
  id?: string;
  children: (progress: MutableRefObject<number>, active: number) => ReactNode;
}) {
  const progress = useRef(0);
  return (
    <Pinned id={id} length={steps.length + 0.6} steps={steps.length} onProgress={(p) => (progress.current = p)}>
      {(active) => (
        <div className="scroll-scene">
          {children(progress, active)}
          <div className="scroll-scene__captions">
            {steps.map((s, i) => (
              <div key={s.title} className="scroll-scene__caption" data-active={i === active}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="scroll-scene__progress" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.title} data-active={i <= active} />
            ))}
          </div>
        </div>
      )}
    </Pinned>
  );
}
