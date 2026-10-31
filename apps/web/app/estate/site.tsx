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
import { HeroScene } from "@lakshya/ui";
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
      <ListingGrid id="projects" kicker="Our work" title="Other projects" intro="Homes and workplaces across the Tirupati region, built by the same team." items={estate.projects} filter />
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
