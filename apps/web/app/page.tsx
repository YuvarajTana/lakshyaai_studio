import { themes, type ThemeName } from "@lakshya/tokens";
import { Art, Container, CtaBand, FeatureGrid, HeroMega, Kicker, SiteFooter, SiteHeader, Ticker, type ArtScene } from "@lakshya/ui";
import { Reveal, SplitReveal } from "@lakshya/motion";

const starters: Array<{ href: string; title: string; theme: ThemeName; scene: ArtScene; body: string; tags: string[] }> = [
  { href: "/story", title: "Storytelling", theme: "studio", scene: "dunes", body: "Brand stories that unfold as you scroll.", tags: ["Mega type", "Pinned chapters", "Image sequence", "Timeline"] },
  { href: "/estate", title: "Real estate", theme: "estate", scene: "facade", body: "A 3D tower with a live unit picker and a scroll tour.", tags: ["3D tower", "Unit table", "Camera tour", "Specs"] },
  { href: "/hotel", title: "Hotels & resorts", theme: "hotel", scene: "arch", body: "Editorial stays, experiences and a 3D grounds walk.", tags: ["Booking bar", "Filtered stays", "Chapters", "3D villa"] },
  { href: "/shop", title: "E-commerce", theme: "commerce", scene: "pedestal", body: "A 3D product page with hotspots and a working cart.", tags: ["3D product", "Hotspots", "Cart drawer", "Swatches"] },
];

const blocks = [
  { title: "Tokens & themes", body: "Four themes from one set of CSS variables. Switch a site's whole look with one attribute.", meta: "tokens" },
  { title: "Smooth scroll", body: "Lenis driven by GSAP's ticker, so ScrollTrigger never drifts. Native scroll for reduced motion.", meta: "motion" },
  { title: "Reveals & type", body: "Masked line, word and char reveals, scroll-scrubbed paragraphs, counters, parallax.", meta: "motion" },
  { title: "Pinned scenes", body: "Chapters, horizontal galleries, stacked cards and canvas image sequences on one sticky primitive.", meta: "motion" },
  { title: "3D stage", body: "One canvas with offline studio lighting, adaptive resolution and a fallback when WebGL is missing.", meta: "three" },
  { title: "Scroll camera", body: "Keyframe a camera path; scroll flies through it with damping and pointer sway.", meta: "three" },
  { title: "Section blocks", body: "Headers, three hero types, listings with filters, specs, units, booking, cart, footers.", meta: "ui" },
  { title: "Art slots", body: "Code-drawn illustrations that read the theme, each named for the photo or AI render that replaces it.", meta: "ui" },
];

export default function Hub() {
  return (
    <div data-theme="studio" className="page">
      <SiteHeader
        brand={
          <>
            <span className="brand-mark">L</span> LakshyaAI Studio
          </>
        }
        links={[
          { label: "Starters", href: "#starters" },
          { label: "Themes", href: "#themes" },
          { label: "Kit", href: "#kit" },
          { label: "Pricing", href: "#pricing" },
        ]}
        cta={{ label: "Get the code", href: "#pricing" }}
      />
      <HeroMega
        kicker="Tirupati & Bengaluru · free website code"
        word="Studio"
        lead="Aesthetic, 3D, scroll-driven websites. The code is free. We charge only to host and connect it."
        aside="Storytelling, real estate, hotels and e-commerce, built from one kit of tokens, motion, 3D and section blocks."
        cta={{ label: "See the starters", href: "#starters" }}
        media={<Art scene="horizon" seed={42} />}
      />
      <Ticker items={["Three.js", "GSAP ScrollTrigger", "Lenis", "Next.js", "Micro-interactions", "Static export", "Mobile first"]} />

      <section className="lk-section" id="starters">
        <Container>
          <div className="lk-head">
            <Kicker>Starters</Kicker>
            <SplitReveal className="lk-display lk-display--2xl">Four sites, one kit</SplitReveal>
          </div>
          <Reveal stagger={0.1} className="hub-starters">
            {starters.map((s, i) => (
              <a key={s.href} href={s.href} className="hub-starter" data-theme={s.theme} data-cursor="Open">
                <Art scene={s.scene} seed={i + 50} ratio="4/3" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </a>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="lk-section lk-section--surface" id="themes">
        <Container>
          <div className="lk-head">
            <Kicker>Themes</Kicker>
            <SplitReveal className="lk-display lk-display--2xl">One attribute, a different brand</SplitReveal>
          </div>
          <Reveal stagger={0.08} className="hub-themes">
            {(Object.keys(themes) as ThemeName[]).map((name) => {
              const t = themes[name];
              return (
                <div key={name} data-theme={name} className="hub-theme">
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

      <FeatureGrid id="kit" kicker="What's in the kit" title="The building blocks" features={blocks} />

      <section className="lk-section" id="pricing">
        <Container>
          <div className="lk-head">
            <Kicker>How it works</Kicker>
            <SplitReveal className="lk-display lk-display--2xl">Free code. Paid when it goes live.</SplitReveal>
          </div>
          <Reveal stagger={0.08} className="hub-model">
            <div>
              <strong>Free</strong>
              <h3>The code</h3>
              <p>Every starter and block, as a static site you can download and host anywhere. Personal and client use.</p>
            </div>
            <div>
              <strong>Hosted</strong>
              <h3>Live and connected</h3>
              <p>We put it on your domain and connect bookings, payments, forms, CMS and analytics. Quoted per project.</p>
            </div>
            <div>
              <strong>Custom</strong>
              <h3>Built for you</h3>
              <p>Your photos, your 3D models, your story. Plus dashboards and business software when you need them.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand kicker="Instagram · @studio.lakshyaai" title="DM a keyword, get the code" body="Every reel comes with its code and prompt. Follow, DM the keyword, and we'll send the link." cta={{ label: "Open Instagram", href: "https://instagram.com/studio.lakshyaai" }} />
      <SiteFooter
        wordmark="LakshyaAI"
        columns={[
          { title: "Starters", links: starters.map((s) => ({ label: s.title, href: s.href })) },
          { title: "Studio", links: [{ label: "studio.lakshyaai.com", href: "https://studio.lakshyaai.com" }, { label: "lakshyaai.com", href: "https://lakshyaai.com" }] },
          { title: "Based in", links: [{ label: "Tirupati", href: "#" }, { label: "Bengaluru", href: "#" }] },
        ]}
        note={<span>© {new Date().getFullYear()} LakshyaAI Studio</span>}
      />
    </div>
  );
}
