"use client";

import { BeforeAfter, DepthLayers, RevealLens, ScrollVideo, ShaderGradient, Turntable, ZoomReveal } from "@lakshya/motion";
import { Art, Container, ExpandCards, HoverList, Kicker, ScrollIndex, SiteFooter, SiteHeader, StepPath } from "@lakshya/ui";
import type { ThemeName } from "@lakshya/tokens";
import type { ReactNode } from "react";
import { drawTowerFrame } from "@/components/draw";
import { estateLayers } from "@/components/DepthScene";

const STUDIO = "https://studio.lakshyaai.com";

function DemoHead({ name, pkg, children }: { name: string; pkg: "motion" | "ui"; children: ReactNode }) {
  return (
    <div className="kit-head">
      <p className="lk-kicker">{`import { ${name} } from "@lakshya/${pkg}"`}</p>
      <h2 className="lk-display lk-display--xl">{name}</h2>
      <p className="kit-head__body">{children}</p>
    </div>
  );
}

const gradients: ThemeName[] = ["studio", "story", "estate", "hotel", "commerce"];

export function KitSite() {
  return (
    <div data-theme="studio" className="page">
      <SiteHeader
        brand={
          <span className="lockup">
            Lakshya AI <span className="lockup__tag">Kit</span>
          </span>
        }
        links={[
          { label: "Starters", href: "/#starters" },
          { label: "Media", href: "#media" },
          { label: "Sections", href: "#sections" },
          { label: "Scroll", href: "#scroll" },
        ]}
        cta={{ label: "Start a project", href: `${STUDIO}/#contact` }}
      />

      <section className="kit-intro">
        <Container>
          <Kicker>Component library</Kicker>
          <h1 className="lk-display lk-display--3xl">
            The moving parts, <em>one at a time.</em>
          </h1>
          <p className="kit-head__body">
            Every block below is live. Each reads the theme it sits in, falls back gracefully on old phones, and stays still when a visitor asks for less motion.
          </p>
        </Container>
      </section>

      {/* Shader gradients ------------------------------------------------- */}
      <section className="lk-section" id="media">
        <Container>
          <DemoHead name="ShaderGradient" pkg="motion">
            A slow living gradient from one tiny WebGL shader, coloured by the theme around it. Hero backdrops, CTA bands, loading screens.
          </DemoHead>
          <div className="kit-gradients">
            {gradients.map((t) => (
              <div key={t} data-theme={t} data-mode={t === "studio" ? "light" : undefined} className="kit-gradient">
                <ShaderGradient />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Turntable + lens ------------------------------------------------- */}
      <section className="lk-section lk-section--surface">
        <Container className="kit-pair">
          <div data-theme="estate" className="kit-card">
            <DemoHead name="Turntable" pkg="motion">
              Drag to spin a frame sequence: a 360 of a building or product. Feed it renders, or AI video cut to stills. Pointer mode makes a character look where you point.
            </DemoHead>
            <Turntable draw={drawTowerFrame} count={72} />
          </div>
          <div data-theme="hotel" className="kit-card">
            <DemoHead name="RevealLens" pkg="motion">
              A soft lens follows the pointer and shows a second picture through the first: day to night, empty to furnished, sketch to render.
            </DemoHead>
            <RevealLens
              className="kit-media"
              base={<Art scene="horizon" seed={8} />}
              reveal={
                <div data-theme="story" style={{ height: "100%" }}>
                  <Art scene="horizon" seed={8} />
                </div>
              }
              label="Night"
            />
          </div>
        </Container>
      </section>

      {/* Before / after --------------------------------------------------- */}
      <section className="lk-section" data-theme="estate">
        <Container className="kit-pair kit-pair--wide">
          <DemoHead name="BeforeAfter" pkg="motion">
            Drag or use arrow keys to compare. Floor plan against finished home, bare site against landscaping, old shopfront against new.
          </DemoHead>
          <BeforeAfter className="kit-media" before={<Art scene="grid" seed={4} />} after={<Art scene="arch" seed={4} />} labels={["Plan", "Finished"]} />
        </Container>
      </section>

      {/* Zoom reveal ------------------------------------------------------ */}
      <div data-theme="hotel">
        <Container>
          <DemoHead name="ZoomReveal" pkg="motion">
            A pill of footage between two words opens to fill the screen as you scroll.
          </DemoHead>
        </Container>
        <ZoomReveal before="Stay" after="awhile" media={<Art scene="horizon" seed={21} />} />
      </div>

      {/* Sections ---------------------------------------------------------- */}
      <div id="sections" data-theme="hotel">
        <Container>
          <DemoHead name="ExpandCards" pkg="ui">
            Tall slivers that widen into a full card on hover or tap. Rooms, amenities, collections.
          </DemoHead>
        </Container>
        <ExpandCards
          cards={[
            { title: "Courtyard Room", meta: "28 m² · from ₹6,800", body: "Opens onto the neem courtyard. Queen bed, rain shower.", art: { scene: "arch", seed: 3 } },
            { title: "Pool Villa", meta: "64 m² · from ₹18,500", body: "Private plunge pool and a deck facing the hills.", art: { scene: "horizon", seed: 8 } },
            { title: "Hill Suite", meta: "48 m² · from ₹12,400", body: "A terrace with a straight view of Tirumala.", art: { scene: "dunes", seed: 4 } },
            { title: "Family Loft", meta: "56 m² · from ₹14,200", body: "Two queens and a reading nook. Sleeps five.", art: { scene: "facade", seed: 6 } },
            { title: "Neem Villa", meta: "72 m² · from ₹21,000", body: "Outdoor shower, garden bath, total quiet.", art: { scene: "horizon", seed: 12 } },
          ]}
        />
      </div>

      <div>
        <Container>
          <DemoHead name="HoverList" pkg="ui">
            A big numbered list. The active row opens with its copy and swings a picture in.
          </DemoHead>
        </Container>
        <HoverList
          rows={[
            { title: "Story sites", body: "Scroll-driven brand websites with real-time 3D, rebranded from one config file.", tags: ["GSAP", "Lenis", "Three.js"], art: { scene: "dunes", seed: 61 } },
            { title: "3D scenes", body: "Towers, villas and products you can turn, tour and click.", tags: ["R3F", "Hotspots", "Scroll camera"], art: { scene: "facade", seed: 62 } },
            { title: "Commerce", body: "Product pages with finishes, carts and enquiries by email or WhatsApp.", tags: ["Cart", "Razorpay-ready"], art: { scene: "pedestal", seed: 63 } },
            { title: "AI layer", body: "An assistant grounded in your own data, with sources shown.", tags: ["RAG", "Alerts"], art: { scene: "grid", seed: 64 } },
          ]}
        />
      </div>

      <div className="lk-section--surface">
        <Container>
          <DemoHead name="StepPath" pkg="ui">
            Steps joined by one line that draws itself as you scroll.
          </DemoHead>
        </Container>
        <StepPath
          steps={[
            { meta: "Week 1", title: "Discover", body: "Your brand, your customers, what the site must do." },
            { meta: "Week 1–2", title: "Prototype", body: "A live starter in your colours with your copy." },
            { meta: "Week 2–3", title: "Connect", body: "Bookings, payments, enquiries and analytics." },
            { meta: "Week 4", title: "Launch & support", body: "Your domain, monitoring and three launch reels." },
          ]}
        />
      </div>

      {/* Scroll-driven ------------------------------------------------------ */}
      <div id="scroll" data-theme="estate">
        <Container>
          <DemoHead name="DepthLayers" pkg="motion">
            Plates stacked in depth; scrolling pushes the camera through them. Cut one render into sky, mid and foreground layers.
          </DemoHead>
        </Container>
        <DepthLayers
          layers={estateLayers}
          overlay={
            <div>
              <p className="lk-kicker">Alipiri Road · Tirupati</p>
              <p className="lk-display lk-display--3xl">Walk into the view</p>
            </div>
          }
        />
      </div>

      <div data-theme="story">
        <Container>
          <DemoHead name="ScrollVideo" pkg="motion">
            Scroll drives the video playhead, with copy fading through it. Encode with a keyframe on every frame so seeking is smooth.
          </DemoHead>
        </Container>
        <ScrollVideo
          src="/media/estate-dawn.mp4"
          poster="/media/estate-dawn-poster.jpg"
          captions={[
            <>
              <p className="lk-kicker">5:40 am</p>
              <h3 className="lk-display lk-display--2xl">Mist on the slopes</h3>
            </>,
            <>
              <p className="lk-kicker">6:05 am</p>
              <h3 className="lk-display lk-display--2xl">The sun clears the ridge</h3>
            </>,
            <>
              <p className="lk-kicker">6:30 am</p>
              <h3 className="lk-display lk-display--2xl">Picking starts</h3>
            </>,
          ]}
        />
      </div>

      <div data-theme="estate">
        <Container>
          <DemoHead name="ScrollIndex" pkg="ui">
            Each project takes the whole screen in turn, its name set huge. A developer&apos;s portfolio, a hotel group&apos;s properties.
          </DemoHead>
        </Container>
        <ScrollIndex
          items={[
            { title: "Banyan Point", meta: "Tirupati · 52 homes · now selling", art: { scene: "facade", seed: 2 } },
            { title: "Seven Hills", meta: "Tiruchanur · 18 villas · completed", art: { scene: "horizon", seed: 7 } },
            { title: "Kapila Court", meta: "Kapila Theertham · 36 homes", art: { scene: "arch", seed: 5 } },
            { title: "Renigunta Works", meta: "Grade-A office · 2027", art: { scene: "grid", seed: 3 } },
          ]}
        />
      </div>

      <SiteFooter
        wordmark="Lakshya AI"
        columns={[
          { title: "Kit", links: [{ label: "Starters", href: "/" }, { label: "Story", href: "/story" }, { label: "Real estate", href: "/estate" }, { label: "Hotel", href: "/hotel" }, { label: "Shop", href: "/shop" }] },
          { title: "Studio", links: [{ label: "studio.lakshyaai.com", href: STUDIO }, { label: "contact@lakshyaai.com", href: "mailto:contact@lakshyaai.com" }] },
        ]}
        note={
          <>
            <span>© 2026 Lakshya AI Studio</span>
            <span>Demo content is fictional</span>
          </>
        }
      />
    </div>
  );
}
