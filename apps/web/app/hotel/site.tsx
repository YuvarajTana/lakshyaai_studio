"use client";

import { useState } from "react";
import { PinnedChapters, Reveal, RevealLens, ZoomReveal } from "@lakshya/motion";
import { Art, BookingBar, Container, CtaBand, Gallery, HeroSplit, ListingGrid, Quote, SiteFooter, SiteHeader, Statement } from "@lakshya/ui";
import { ThemePage } from "@/components/ThemePage";
import { ScrollScene } from "@/components/ScrollScene";
import { VillaTour } from "@/components/lazy";
import { StudioCredit } from "@/components/StudioCredit";
import { hotel } from "@/content/hotel";

export function HotelSite() {
  const [query, setQuery] = useState("");
  return (
    <ThemePage theme="hotel">
      <SiteHeader brand={hotel.brand} links={hotel.nav} cta={hotel.cta} />
      <HeroSplit
        kicker={hotel.hero.kicker}
        title={hotel.hero.title}
        body={hotel.hero.body}
        cta={hotel.hero.cta}
        media={<Art scene="arch" seed={14} slot="hero-courtyard-dawn" alt="Courtyard at dawn" />}
      />
      <Container className="booking-wrap">
        <Reveal>
          <div id="reserve">
            <BookingBar rooms={hotel.stays.map((s) => s.title)} onSearch={(q) => setQuery(`${q.room} · ${q.guests} guests · ${q.checkIn} → ${q.checkOut}`)} />
            <p className="legend" aria-live="polite">
              {query ? `Demo search: ${query}. Hosted builds connect this to your booking engine.` : "Rates include breakfast and temple transfers."}
            </p>
          </div>
        </Reveal>
      </Container>
      <Statement kicker="The house">{hotel.statement}</Statement>
      <ZoomReveal before="Stay" after="awhile" media={<Art scene="horizon" seed={21} slot="zoom-pool-dusk" />} />
      <ListingGrid id="stays" kicker="Stay" title="Rooms, suites & villas" intro="Every room opens onto the courtyard or the hills. Rates include breakfast and temple transfers." items={hotel.stays} layout="staggered" filter />
      <div id="experiences">
        <PinnedChapters
          chapters={hotel.experiences.map((e) => ({
            kicker: e.kicker,
            title: e.title,
            body: e.body,
            media: <Art {...e.media} />,
          }))}
        />
      </div>
      <ScrollScene id="grounds" steps={hotel.grounds}>
        {(progress) => <VillaTour progress={progress} />}
      </ScrollScene>
      <section className="lk-section">
        <Container className="hotel-lens">
          <div>
            <p className="lk-kicker">Day &amp; night</p>
            <h2 className="lk-display lk-display--2xl">The pool villa after the sun goes down</h2>
            <p className="lk-head__intro">Move across the picture to switch on the evening lights.</p>
          </div>
          <RevealLens
            className="hotel-lens__media"
            base={<Art scene="horizon" seed={8} slot="villa-day" />}
            reveal={
              <div data-theme="story" style={{ height: "100%" }}>
                <Art scene="horizon" seed={8} slot="villa-night" />
              </div>
            }
            label="Night"
          />
        </Container>
      </section>
      <Gallery id="journal" kicker="Journal" title="A day at the house" items={hotel.gallery} />
      <Quote {...hotel.quote} />
      <CtaBand kicker="Direct bookings get the best rate" title="Stay with us" body="Free cancellation up to 72 hours before arrival." cta={{ label: "Check availability", href: "#reserve" }} />
      <SiteFooter
        wordmark={hotel.brand}
        columns={[
          { title: "Find us", links: [{ label: "Near Alipiri, Tirupati", href: "#" }, { label: "15 min from the airport", href: "#" }] },
          { title: "Contact", links: [{ label: "+91 00000 00000", href: "#" }, { label: "stay@example.com", href: "#" }] },
          { title: "Explore", links: hotel.nav },
        ]}
        note={<StudioCredit />}
      />
    </ThemePage>
  );
}
