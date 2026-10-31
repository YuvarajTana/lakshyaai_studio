"use client";

import { useState } from "react";
import {
  CtaBand,
  ListingGrid,
  SiteFooter,
  SiteHeader,
  SpecList,
  Statement,
  StatsRow,
  Timeline,
  UnitTable,
} from "@lakshya/ui";
import { ThemePage } from "@/components/ThemePage";
import { ScrollScene } from "@/components/ScrollScene";
import { TowerHero, TowerTour } from "@/components/lazy";
import { StudioCredit } from "@/components/StudioCredit";
import { HeroScene, ScrollIndex, StepPath } from "@lakshya/ui";
import { BeforeAfter } from "@lakshya/motion";
import { Art, Container } from "@lakshya/ui";
import { estate } from "@/content/estate";

export function EstateSite() {
  const [floor, setFloor] = useState<number | null>(13);
  const available = estate.units.filter((u) => u.status === "available").length;

  return (
    <ThemePage theme="estate">
      <SiteHeader brand={estate.brand} links={estate.nav} cta={estate.cta} />
      <HeroScene
        kicker={estate.hero.kicker}
        title={estate.hero.title}
        body={estate.hero.body}
        cta={{ label: "Take the tour", href: "#tour" }}
        sceneArea={{ left: "40%", right: "26%" }}
        scene={<TowerHero activeFloor={floor} onFloorSelect={setFloor} />}
        panel={
          <div id="residences">
            <p className="panel-title">
              Residences <span>{available} available</span>
            </p>
            <UnitTable units={estate.units} activeFloor={floor} onHover={(f) => f !== null && setFloor(f)} />
            <p className="legend">Hover a row or click a floor on the tower</p>
          </div>
        }
      />
      <Statement kicker="The idea">{estate.statement}</Statement>
      <StatsRow stats={estate.stats} />
      <ScrollScene id="tour" steps={estate.tour}>
        {(progress, active) => <TowerTour progress={progress} activeFloor={active === 3 ? 13 : active === 1 ? 4 : null} />}
      </ScrollScene>
      <SpecList id="specs" kicker="Specifications" title="Built to outlast the loan" items={estate.specs} />
      <section className="lk-section lk-section--surface">
        <Container className="estate-compare">
          <div>
            <p className="lk-kicker">From drawing to home</p>
            <h2 className="lk-display lk-display--2xl">Drag to see the Sky Residence finished</h2>
          </div>
          <BeforeAfter before={<Art scene="grid" seed={12} slot="plan-sky-residence" />} after={<Art scene="arch" seed={12} slot="render-sky-residence" />} labels={["Floor plan", "Finished"]} />
        </Container>
      </section>
      <StepPath kicker="Buying with us" title="Five steps to your keys" steps={estate.buying} />
      <ScrollIndex id="projects" items={estate.projects.map((p) => ({ title: p.title, meta: [p.meta, p.tag].filter(Boolean).join(" · "), art: p.art }))} />
      <ListingGrid kicker="Our work" title="Browse by type" intro="Homes and workplaces across the Tirupati region, built by the same team." items={estate.projects} filter />
      <Timeline kicker="Construction" title="Where we are" items={estate.milestones} />
      <CtaBand id="visit" kicker="Site visits daily, 10–6" title="Come see the light for yourself" body="We'll pick you up from Tirupati station or the airport." cta={{ label: "Book a site visit", href: "#visit" }} />
      <SiteFooter
        wordmark={estate.brand}
        columns={[
          { title: "Visit", links: [{ label: "Alipiri Road, Tirupati", href: "#" }, { label: "Open daily 10–6", href: "#" }] },
          { title: "Talk to us", links: [{ label: "+91 00000 00000", href: "#" }, { label: "hello@example.com", href: "#" }] },
          { title: "Explore", links: estate.nav },
        ]}
        note={<StudioCredit />}
      />
    </ThemePage>
  );
}
