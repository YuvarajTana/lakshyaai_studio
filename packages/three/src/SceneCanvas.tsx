"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Lightformer, Preload } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export interface SceneCanvasProps extends Omit<CanvasProps, "children"> {
  children: ReactNode;
  /** Shown when WebGL is unavailable (old phones, locked-down browsers). */
  fallback?: ReactNode;
  /** Studio lighting built from light panels: no HDR download needed. */
  studioLights?: boolean;
  className?: string;
}

/**
 * The one canvas every 3D block uses. Sensible defaults for marketing sites:
 * capped DPR, adaptive resolution while scrolling, offline studio environment,
 * and a graceful fallback instead of a blank box.
 */
export function SceneCanvas({ children, fallback, studioLights = true, className, camera, ...rest }: SceneCanvasProps) {
  const [ok, setOk] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => setOk(hasWebGL()), []);

  // Stop rendering when scrolled out of view: pages with several scenes stay smooth on phones.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ok]);

  if (ok === false) return <div className={`lk-scene lk-scene--fallback ${className ?? ""}`}>{fallback}</div>;
  if (ok === null) return <div className={`lk-scene ${className ?? ""}`} />;

  return (
    <div ref={wrap} className={`lk-scene ${className ?? ""}`}>
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={camera ?? { position: [0, 1.5, 6], fov: 35 }}
        shadows="percentage"
        {...rest}
      >
        <Suspense fallback={null}>
          {studioLights && <StudioLights />}
          {children}
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated={false} />
      </Canvas>
    </div>
  );
}

/** Soft key/fill/rim panels baked into an environment map. Works offline. */
export function StudioLights({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.25 * intensity} />
      <directionalLight position={[4, 6, 3]} intensity={1.6 * intensity} castShadow shadow-mapSize={[1024, 1024]} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3 * intensity} position={[0, 5, -6]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.5 * intensity} position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5 * intensity} position={[6, 1, 0]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={2 * intensity} position={[0, 4, 6]} scale={3} />
      </Environment>
    </>
  );
}
