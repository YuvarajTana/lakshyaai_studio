"use client";

import { useState } from "react";
import {
  CartButton,
  CartDrawer,
  CartProvider,
  Container,
  CtaBand,
  FeatureGrid,
  HeroScene,
  Kicker,
  ProductGrid,
  Quote,
  SiteFooter,
  SiteHeader,
  Ticker,
} from "@lakshya/ui";
import { SplitReveal } from "@lakshya/motion";
import { ThemePage } from "@/components/ThemePage";
import { ScrollScene } from "@/components/ScrollScene";
import { SpeakerHero, SpeakerTour } from "@/components/lazy";
import { StudioCredit } from "@/components/StudioCredit";
import { shop } from "@/content/shop";

export function ShopSite() {
  const [colorIdx, setColorIdx] = useState(0);
  const [note, setNote] = useState("");
  const color = shop.colors[colorIdx]!;

  return (
    <ThemePage theme="commerce">
      <CartProvider storageKey="pebble-cart">
        <SiteHeader brand={shop.brand} links={shop.nav} actions={<CartButton />} />
        <HeroScene
          kicker={shop.hero.kicker}
          title={shop.hero.title}
          body={shop.hero.body}
          cta={shop.hero.cta}
          sceneArea={{ left: "44%", right: "24%" }}
          scene={<SpeakerHero color={color.body} accent={color.accent} />}
          panel={
            <div>
              <p className="panel-title">
                Finish <span>{color.name}</span>
              </p>
              <div className="lk-swatches" role="radiogroup" aria-label="Finish">
                {shop.colors.map((c, i) => (
                  <button key={c.name} role="radio" aria-checked={i === colorIdx} aria-label={c.name} style={{ background: c.body, width: 32, height: 32 }} onClick={() => setColorIdx(i)} />
                ))}
              </div>
            </div>
          }
        />
        <Ticker items={shop.ticker} />
        <ScrollScene id="product" steps={shop.tour}>
          {(progress, active) => <SpeakerTour progress={progress} visible={shop.tourHotspots[active] ?? []} color={color.body} accent={color.accent} />}
        </ScrollScene>
        <section className="lk-section" id="shop">
          <Container>
            <div className="lk-head">
              <Kicker>Shop</Kicker>
              <SplitReveal className="lk-display lk-display--2xl">The Pebble range</SplitReveal>
            </div>
            <ProductGrid products={shop.products} />
          </Container>
        </section>
        <FeatureGrid id="why" kicker="Why Pebble" title="Small details, loud results" features={shop.why} />
        <Quote {...shop.quote} />
        <CtaBand kicker="Free shipping over ₹2,999" title="Hear it at home for 30 days" cta={{ label: "Shop Pebble One", href: "#shop" }} />
        <SiteFooter
          wordmark={shop.brand}
          columns={[
            { title: "Help", links: [{ label: "Shipping", href: "#" }, { label: "Returns", href: "#" }, { label: "Warranty", href: "#" }] },
            { title: "Company", links: [{ label: "About", href: "#" }, { label: "Repair guides", href: "#" }] },
            { title: "Shop", links: shop.nav },
          ]}
          note={
            <>
              <StudioCredit />
              {note && <span aria-live="polite">{note}</span>}
            </>
          }
        />
        <CartDrawer onCheckout={(lines, subtotal) => setNote(`Demo checkout: ${lines.length} items, ₹${subtotal.toLocaleString("en-IN")}. Hosted builds connect Razorpay or Shopify here.`)} />
      </CartProvider>
    </ThemePage>
  );
}
