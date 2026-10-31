"use client";

import { ImageSequence, PinnedChapters } from "@lakshya/motion";
import { Art, CtaBand, Gallery, HeroMega, Quote, SiteFooter, SiteHeader, Statement, Timeline } from "@lakshya/ui";
import { ThemePage } from "@/components/ThemePage";
import { StudioCredit } from "@/components/StudioCredit";
import { story } from "@/content/story";

/**
 * Procedural "roast" sequence: a bean darkens and cracks as you scroll.
 * Replace with `frames={[…urls]}` once a real (or AI-rendered) image sequence exists.
 */
function drawRoast(ctx: CanvasRenderingContext2D, t: number, w: number, h: number) {
  const green = [120, 140, 80];
  const gold = [196, 152, 72];
  const brown = [74, 42, 24];
  const mix = (a: number[], b: number[], k: number) => a.map((v, i) => Math.round(v + ((b[i] ?? v) - v) * k));
  const c = t < 0.5 ? mix(green, gold, t * 2) : mix(gold, brown, (t - 0.5) * 2);

  const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
  bg.addColorStop(0, `rgb(${30 + t * 20}, ${24 + t * 6}, ${38})`);
  bg.addColorStop(1, "#0b1020");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const r = Math.min(w, h) * 0.22;
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-0.4 + t * 0.8);
  ctx.scale(1 + t * 0.08, 1 + t * 0.08);
  // bean body
  const g = ctx.createRadialGradient(-r * 0.3, -r * 0.4, r * 0.1, 0, 0, r * 1.2);
  g.addColorStop(0, `rgb(${c.map((v) => Math.min(255, v + 50)).join(",")})`);
  g.addColorStop(1, `rgb(${c.join(",")})`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.72, r, 0, 0, Math.PI * 2);
  ctx.fill();
  // centre cut
  ctx.strokeStyle = `rgba(20,10,5,${0.4 + t * 0.5})`;
  ctx.lineWidth = r * 0.06;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.85);
  ctx.bezierCurveTo(r * 0.18, -r * 0.3, -r * 0.18, r * 0.3, 0, r * 0.85);
  ctx.stroke();
  // oil sheen after second crack
  if (t > 0.75) {
    ctx.fillStyle = `rgba(255,220,170,${(t - 0.75) * 0.6})`;
    ctx.beginPath();
    ctx.ellipse(-r * 0.25, -r * 0.35, r * 0.12, r * 0.28, -0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // roast scale
  const labels = ["Green", "Yellow", "Cinnamon", "City", "Full city"];
  ctx.font = `${Math.round(h * 0.022)}px "JetBrains Mono Variable", monospace`;
  ctx.textAlign = "center";
  labels.forEach((l, i) => {
    const x = w * (0.2 + i * 0.15);
    const on = t >= i / (labels.length - 1) - 0.05;
    ctx.fillStyle = on ? "#f5b544" : "rgba(238,241,247,0.35)";
    ctx.fillText(l.toUpperCase(), x, h * 0.16);
  });
}

export function StorySite() {
  return (
    <ThemePage theme="story">
      <SiteHeader brand={story.brand} links={story.nav} cta={{ label: "Order beans", href: "#estate" }} />
      <HeroMega
        kicker={story.hero.kicker}
        word={story.hero.word}
        lead={story.hero.lead}
        aside={story.hero.aside}
        cta={story.hero.cta}
        media={<Art scene="dunes" seed={30} slot="hero-estate-mist" alt="Mist over the coffee estate" />}
      />
      <Statement id="story" kicker="Why shade matters">
        {story.statement}
      </Statement>
      <PinnedChapters chapters={story.chapters.map((c) => ({ ...c, media: <Art {...c.media} /> }))} />
      <div id="roast">
        <ImageSequence
          draw={drawRoast}
          length={3}
          overlay={
            <div style={{ maxWidth: "34ch" }}>
              <p className="lk-kicker">The roast</p>
              <h2 className="lk-display lk-display--2xl">{story.sequence.title}</h2>
              <p style={{ color: "var(--lk-muted)" }}>{story.sequence.body}</p>
            </div>
          }
        />
      </div>
      <Timeline id="timeline" kicker="Seventy years" title="How we got here" items={story.milestones} />
      <Gallery kicker="From the archive" title="The estate" items={story.gallery} />
      <Quote {...story.quote} />
      <CtaBand id="estate" kicker="Roasted to order" title="Taste the shade" body="Single-estate arabica, roasted the morning we ship it." cta={{ label: "Order beans", href: "#estate" }} />
      <SiteFooter
        wordmark={story.brand}
        columns={[
          { title: "Estate", links: [{ label: "Chikmagalur, Karnataka", href: "#" }, { label: "Visits by appointment", href: "#" }] },
          { title: "Contact", links: [{ label: "hello@example.com", href: "#" }] },
          { title: "Explore", links: story.nav },
        ]}
        note={<StudioCredit />}
      />
    </ThemePage>
  );
}
