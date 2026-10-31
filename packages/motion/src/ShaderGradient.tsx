"use client";

/**
 * ShaderGradient: a slow, living mesh gradient drawn with one WebGL fragment shader.
 * No three.js, ~2 KB. Colours default to the active theme's accents, so it matches
 * whatever data-theme it sits in. Pauses off-screen; one still frame for reduced motion.
 */

import { useEffect, useRef, type CSSProperties } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Domain-warped value noise blending three colours over a base.
const FRAG = `
precision mediump float;
uniform vec2 uRes; uniform float uTime; uniform float uGrain; uniform float uScale; uniform float uMix;
uniform vec3 uBase; uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<4;i++){ v+=a*n(p); p*=2.02; a*=0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes; vec2 p = uv * vec2(uRes.x/uRes.y, 1.0) * uScale;
  float t = uTime * 0.04;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0*q + vec2(1.7, 9.2) + t*1.3), fbm(p + 3.0*q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 2.5*r);
  vec3 col = mix(uBase, uC1, smoothstep(0.3, 0.85, f) * uMix);
  col = mix(col, uC2, smoothstep(0.45, 1.0, length(q)) * 0.55 * uMix);
  col = mix(col, uC3, smoothstep(0.6, 1.0, r.x) * 0.35 * uMix);
  col += (h(gl_FragCoord.xy + uTime) - 0.5) * uGrain;
  gl_FragColor = vec4(col, 1.0);
}`;

function toRgb(css: string): [number, number, number] {
  const c = document.createElement("canvas").getContext("2d");
  if (!c) return [0, 0, 0];
  c.fillStyle = css;
  const hex = c.fillStyle as string; // normalised to #rrggbb when opaque
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return [0.5, 0.5, 0.5];
  const v = parseInt(m[1]!, 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

export interface ShaderGradientProps {
  /** Base + three blend colours. Defaults read --lk-bg and the theme accents. */
  colors?: [string, string, string, string];
  speed?: number;
  grain?: number;
  /** Size of the colour fields: lower = broader, calmer bands. */
  scale?: number;
  /** 0..1 how strongly the accents bleed over the base colour. */
  intensity?: number;
  className?: string;
  style?: CSSProperties;
}

export function ShaderGradient({ colors, speed = 1, grain = 0.03, scale = 0.9, intensity = 0.8, className, style }: ShaderGradientProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!canvas || !gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const cs = getComputedStyle(canvas);
    const palette = colors ?? [
      cs.getPropertyValue("--lk-bg").trim() || "#f4fbf7",
      cs.getPropertyValue("--lk-accent").trim() || "#0e9f6e",
      cs.getPropertyValue("--lk-accent-2").trim() || "#0d9488",
      cs.getPropertyValue("--lk-accent-3").trim() || "#f59e0b",
    ];
    const [base, c1, c2, c3] = palette.map(toRgb) as [number, number, number][];
    gl.uniform3fv(u("uBase"), base!);
    gl.uniform3fv(u("uC1"), c1!);
    gl.uniform3fv(u("uC2"), c2!);
    gl.uniform3fv(u("uC3"), c3!);
    gl.uniform1f(u("uGrain"), grain);
    gl.uniform1f(u("uScale"), scale);
    gl.uniform1f(u("uMix"), intensity);
    const uRes = u("uRes");
    const uTime = u("uTime");

    const resize = () => {
      // Half resolution is plenty for a soft gradient and keeps phones cool.
      const s = Math.min(window.devicePixelRatio, 2) * 0.5;
      canvas.width = Math.max(1, canvas.clientWidth * s);
      canvas.height = Math.max(1, canvas.clientHeight * s);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      if (visible) {
        gl.uniform1f(uTime, ((now - start) / 1000) * speed + 12);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      if (!still) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed, grain, scale, intensity]);

  return <canvas ref={ref} className={`lk-shader ${className ?? ""}`} style={style} aria-hidden="true" />;
}
