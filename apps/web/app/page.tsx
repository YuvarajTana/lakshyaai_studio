import { themes, type ThemeName } from "@lakshya/tokens";
import { Art, Container, FeatureGrid, Kicker, LinkButton, SiteFooter, SiteHeader, Ticker, type ArtScene } from "@lakshya/ui";
import { Reveal, ShaderGradient, SplitReveal } from "@lakshya/motion";

const STUDIO = "https://studio.lakshyaai.com";

const starters: Array<{ href: string; title: string; theme: ThemeName; scene: ArtScene; label: string; body: string; tags: string[] }> = [
  { href: "/story", title: "Kaapi Hills", label: "Storytelling · coffee estate", theme: "story", scene: "dunes", body: "A brand story that unfolds as you scroll.", tags: ["Mega type", "Pinned chapters", "Roast sequence", "Timeline"] },
  { href: "/estate", title: "Banyan Point", label: "Real estate · Tirupati", theme: "estate", scene: "facade", body: "A 3D tower with a live unit picker and a camera tour.", tags: ["3D tower", "Unit table", "Scroll camera", "Specs"] },
  { href: "/hotel", title: "Kalyani House", label: "Hotel · Tirupati", theme: "hotel", scene: "arch", body: "Editorial stays, experiences and a 3D grounds walk.", tags: ["Booking bar", "Filtered stays", "Chapters", "3D villa"] },
  { href: "/shop", title: "Pebble Audio", label: "E-commerce · Bengaluru", theme: "commerce", scene: "pedestal", body: "A 3D product page with hotspots and a working cart.", tags: ["3D product", "Hotspots", "Cart drawer", "Finishes"] },
];

const blocks = [
  { title: "Tokens & themes", body: "Five themes from one set of CSS variables, Studio included in light and dark. One attribute re-skins a whole site.", meta: "tokens" },
  { title: "Smooth scroll", body: "Lenis driven by GSAP's ticker, so ScrollTrigger never drifts. Native scroll when the visitor prefers reduced motion.", meta: "motion" },
  { title: "Reveals & type", body: "Masked line, word and char reveals, scroll-scrubbed paragraphs, counters, parallax, magnetic buttons.", meta: "motion" },
  { title: "Pinned scenes", body: "Chapters, horizontal galleries, stacked cards and canvas image sequences, all on one sticky primitive.", meta: "motion" },
  { title: "3D stage", body: "One canvas with offline studio lighting, adaptive resolution, off-screen pausing and a WebGL fallback.", meta: "three" },
  { title: "Scroll camera", body: "Keyframe a camera path; scrolling flies through it in arcs, with damping and pointer sway.", meta: "three" },
  { title: "Section blocks", body: "Headers, three hero types, listings with filters, specs, units, booking bar, cart drawer, footers.", meta: "ui" },
  { title: "Art slots", body: "Themed illustrations that hold the layout until photos or AI renders arrive. Each slot is named.", meta: "ui" },
];

const tiers = [
  { name: "Free code", data: "Demo content", get: "The starter as a static site you download and host anywhere. Personal and client use." },
  { name: "Showcase", data: "Simulated, styled on your brand", get: "We rebrand it, host it on your domain and cut three reels from it." },
  { name: "Connected", data: "Your live data, read-only", get: "Bookings, payments, enquiries by email or WhatsApp, CMS and analytics wired in." },
  { name: "Ops Twin", data: "Live and two-way", get: "A scoped end-to-end product with sign-in, roles, alerts and a support retainer." },
];

export default function Hub() {
  return (
    <div data-theme="studio" className="page">
      <SiteHeader
        brand={
          <span className="lockup">
            Lakshya AI <span className="lockup__tag">Studio</span>
          </span>
        }
        links={[
          { label: "Starters", href: "#starters" },
          { label: "Themes", href: "#themes" },
          { label: "Kit", href: "#kit" },
          { label: "Components", href: "/kit" },
          { label: "Engagements", href: "#pricing" },
        ]}
        cta={{ label: "Start a project", href: `${STUDIO}/#contact` }}
      />

      <section className="hub-hero" id="top">
        <div className="hub-hero__glow" aria-hidden="true">
          <ShaderGradient speed={0.7} grain={0.015} scale={0.7} intensity={0.45} />
        </div>
        <Container className="hub-hero__inner">
          <Reveal>
            <span className="hub-badge">
              <i aria-hidden="true" /> Foundation kit · Lakshya AI Studio
            </span>
          </Reveal>
          <h1 className="lk-display hub-hero__title">
            One kit behind <em>every Studio site.</em>
          </h1>
          <Reveal delay={0.15} className="hub-hero__lead">
            Tokens, scroll motion, <strong>real-time 3D</strong> and section blocks for <strong>story sites, real estate, hotels and e-commerce</strong>. Rebrand a starter from one content file. The code is free; we charge to host and connect it.
          </Reveal>
          <Reveal delay={0.25} className="hub-hero__ctas">
            <LinkButton href="#starters" arrow>
              See the starters
            </LinkButton>
            <LinkButton href={`${STUDIO}/#contact`} variant="ghost">
              Start a project
            </LinkButton>
          </Reveal>
          <Reveal delay={0.35} stagger={0.08} className="hub-tiles">
            <div>
              <strong>Story sites</strong>
              <span>Scroll-driven brand websites</span>
            </div>
            <div>
              <strong>3D scenes</strong>
              <span>Towers, villas, products</span>
            </div>
            <div>
              <strong>Commerce</strong>
              <span>Cart, enquiries, bookings</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <Ticker items={["Three.js", "GSAP ScrollTrigger", "Lenis", "Next.js", "Micro-interactions", "Static export", "Mobile first", "Reduced-motion aware"]} />

      <section className="lk-section" id="starters">
        <Container>
          <div className="lk-head">
            <Kicker>01 · Starters</Kicker>
            <SplitReveal className="lk-display lk-display--2xl">Four sites, one kit</SplitReveal>
          </div>
          <Reveal stagger={0.1} className="hub-starters">
            {starters.map((s, i) => (
              <a key={s.href} href={s.href} className="hub-starter" data-theme={s.theme} data-cursor="Open">
                <div className="hub-starter__top">
                  <span>{s.label}</span>
                  <span>
                    {String(i + 1).padStart(2, "0")} / {String(starters.length).padStart(2, "0")}
                  </span>
                </div>
                <Art scene={s.scene} seed={i + 50} ratio="4/3" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="hub-starter__foot">
                  <span>
                    <strong>Free</strong> code
                  </span>
                  <span className="hub-starter__go">Open starter →</span>
                </div>
              </a>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="lk-section lk-section--surface" id="themes">
        <Container>
          <div className="lk-head">
            <Kicker>02 · Themes</Kicker>
            <SplitReveal className="lk-display lk-display--2xl">One attribute, a different brand</SplitReveal>
          </div>
          <Reveal stagger={0.08} className="hub-themes">
            {(Object.keys(themes) as ThemeName[]).map((name) => {
              const t = themes[name];
              return (
                <div key={name} data-theme={name} data-mode={name === "studio" ? "light" : undefined} className="hub-theme">
                  <p className="lk-kicker">data-theme=&quot;{name}&quot;</p>
                  <h3>{t.label}</h3>
                  <p>{t.use}</p>
                  <div className="hub-swatches">
                    {Object.values(t.color).map((c, i) => (
                      <span key={i} style={{ background: c }} title={c} />
                    ))}
                  </div>
                </div>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <FeatureGrid id="kit" kicker="03 · What's in the kit" title="The building blocks" features={blocks} />
      <Container>
        <LinkButton href="/kit" variant="ghost" arrow>
          See every component live
        </LinkButton>
      </Container>

      <section className="lk-section" id="pricing">
        <Container>
          <div className="lk-head">
            <Kicker>04 · Engagements</Kicker>
            <SplitReveal className="lk-display lk-display--2xl">Free code. Paid when it goes live.</SplitReveal>
          </div>
          <Reveal stagger={0.08} className="hub-tiers">
            {tiers.map((t) => (
              <div key={t.name} className="hub-tier">
                <h3>{t.name}</h3>
                <dl>
                  <dt>Data</dt>
                  <dd>{t.data}</dd>
                  <dt>You get</dt>
                  <dd>{t.get}</dd>
                </dl>
              </div>
            ))}
          </Reveal>
          <Reveal className="hub-tiers__cta">
            <LinkButton href={`${STUDIO}/#pricing`} variant="ghost" arrow>
              Plans on studio.lakshyaai.com
            </LinkButton>
          </Reveal>
        </Container>
      </section>

      <section className="hub-band">
        <Container className="hub-band__inner">
          <div>
            <SplitReveal className="lk-display lk-display--xl">Want one of these with your name on it?</SplitReveal>
            <p>Tell us about your business and what the site needs to do.</p>
          </div>
          <LinkButton href={`${STUDIO}/#contact`} arrow cursor="Let's talk">
            Start a project
          </LinkButton>
        </Container>
      </section>

      <SiteFooter
        wordmark="Lakshya AI"
        columns={[
          { title: "Starters", links: starters.map((s) => ({ label: s.title, href: s.href })) },
          {
            title: "Studio",
            links: [
              { label: "Live demos", href: `${STUDIO}/#library` },
              { label: "Story Kit", href: `${STUDIO}/#stories` },
              { label: "Free prompts", href: `${STUDIO}/#free` },
              { label: "Start a project", href: `${STUDIO}/#contact` },
            ],
          },
          {
            title: "Lakshya AI",
            links: [
              { label: "contact@lakshyaai.com", href: "mailto:contact@lakshyaai.com" },
              { label: "lakshyaai.com", href: "https://lakshyaai.com" },
              { label: "yuvarajtana.com", href: "https://yuvarajtana.com" },
            ],
          },
          { title: "Based in", links: [{ label: "Tirupati", href: "#" }, { label: "Bengaluru", href: "#" }] },
        ]}
        note={
          <>
            <span>© 2026 Lakshya AI Studio</span>
            <span>Demo sites and brands are fictional</span>
          </>
        }
      />
    </div>
  );
}
