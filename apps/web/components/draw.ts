/**
 * Procedural frame painters for demos. Swap for real frame sequences (renders, AI video
 * cut to stills) by passing `frames={[…urls]}` to the component instead of `draw`.
 */

const css = (name: string, el: Element = document.documentElement) => getComputedStyle(el).getPropertyValue(name).trim();

/** A tower turning on a plinth: one frame per angle, for <Turntable>. */
export function drawTowerFrame(ctx: CanvasRenderingContext2D, i: number, count: number, w: number, h: number) {
  const el = ctx.canvas;
  const accent = css("--lk-accent", el) || "#9a6a3a";
  const ink = css("--lk-ink", el) || "#191815";
  const surface = css("--lk-surface", el) || "#e6e0d5";
  const a = (i / count) * Math.PI * 2;
  const cx = w / 2;
  const base = h * 0.84;
  const s = Math.min(w, h) / 520;
  const hw = 95 * s;
  const hd = 70 * s;
  const tall = 330 * s;
  const tilt = 0.32; // camera elevation squash

  // plinth shadow
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.beginPath();
  ctx.ellipse(cx, base + 6 * s, 190 * s, 40 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  const corners = [
    [-hw, -hd],
    [hw, -hd],
    [hw, hd],
    [-hw, hd],
  ].map(([x, z]) => {
    const rx = x! * Math.cos(a) - z! * Math.sin(a);
    const rz = x! * Math.sin(a) + z! * Math.cos(a);
    return { x: cx + rx, y: base + rz * tilt, z: rz };
  });

  // faces sorted back to front
  const faces = [0, 1, 2, 3]
    .map((k) => {
      const p = corners[k]!;
      const q = corners[(k + 1) % 4]!;
      const nz = (p.z + q.z) / 2;
      return { p, q, nz, k };
    })
    .sort((m, n) => m.nz - n.nz);

  for (const f of faces) {
    if (f.nz < -10 * s) continue; // back faces hidden
    const light = 0.55 + 0.45 * Math.max(0, Math.cos(a + f.k * (Math.PI / 2) - 0.6));
    ctx.fillStyle = shade(surface, light);
    ctx.beginPath();
    ctx.moveTo(f.p.x, f.p.y);
    ctx.lineTo(f.q.x, f.q.y);
    ctx.lineTo(f.q.x, f.q.y - tall);
    ctx.lineTo(f.p.x, f.p.y - tall);
    ctx.closePath();
    ctx.fill();
    // window grid
    const floors = 12;
    const cols = 5;
    for (let r = 0; r < floors; r++) {
      for (let c = 0; c < cols; c++) {
        const u0 = (c + 0.18) / cols;
        const u1 = (c + 0.82) / cols;
        const v0 = (r + 0.25) / floors;
        const v1 = (r + 0.8) / floors;
        const lit = (r * 7 + c * 3 + f.k) % 9 === 0;
        ctx.fillStyle = lit ? accent : shade(ink, 0.35 + light * 0.25, 0.75);
        quad(ctx, f.p, f.q, tall, u0, u1, v0, v1);
      }
    }
  }
  // roof, outlined so it reads against a light background
  ctx.fillStyle = shade(surface, 0.86);
  ctx.strokeStyle = shade(ink, 1, 0.35);
  ctx.lineWidth = 1.5 * s;
  ctx.beginPath();
  corners.forEach((c, k) => (k ? ctx.lineTo(c.x, c.y - tall) : ctx.moveTo(c.x, c.y - tall)));
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function quad(ctx: CanvasRenderingContext2D, p: { x: number; y: number }, q: { x: number; y: number }, tall: number, u0: number, u1: number, v0: number, v1: number) {
  const pt = (u: number, v: number) => [p.x + (q.x - p.x) * u, p.y + (q.y - p.y) * u - tall * (1 - v)] as const;
  const a = pt(u0, v0);
  const b = pt(u1, v0);
  const c = pt(u1, v1);
  const d = pt(u0, v1);
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.lineTo(c[0], c[1]);
  ctx.lineTo(d[0], d[1]);
  ctx.closePath();
  ctx.fill();
}

function shade(hex: string, k: number, alpha = 1) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  const v = m ? parseInt(m[1]!, 16) : 0x888888;
  const r = Math.min(255, ((v >> 16) & 255) * k);
  const g = Math.min(255, ((v >> 8) & 255) * k);
  const b = Math.min(255, (v & 255) * k);
  return `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
}
