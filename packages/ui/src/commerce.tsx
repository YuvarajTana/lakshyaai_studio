"use client";

/**
 * Commerce foundation: cart state + product card + cart drawer.
 * State lives in the browser (with a localStorage convenience). Checkout is a callback,
 * so a hosted build can plug in Razorpay, Shopify Storefront or Stripe without
 * touching the UI.
 */

import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { Art, type ArtProps } from "./art";
import { Button, Price, Tag, cx } from "./primitives";

export interface Product {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  category?: string;
  tag?: string;
  colors?: string[];
  art: ArtProps;
}

export interface CartLine {
  product: Product;
  qty: number;
  color?: string;
}

type Action =
  | { type: "add"; product: Product; color?: string }
  | { type: "qty"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "load"; lines: CartLine[] }
  | { type: "clear" };

function reducer(lines: CartLine[], a: Action): CartLine[] {
  switch (a.type) {
    case "add": {
      const hit = lines.find((l) => l.product.id === a.product.id && l.color === a.color);
      if (hit) return lines.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l));
      return [...lines, { product: a.product, qty: 1, color: a.color }];
    }
    case "qty":
      return lines.flatMap((l) => (l.product.id !== a.id ? [l] : a.qty <= 0 ? [] : [{ ...l, qty: a.qty }]));
    case "remove":
      return lines.filter((l) => l.product.id !== a.id);
    case "load":
      return a.lines;
    case "clear":
      return [];
  }
}

interface CartApi {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, color?: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartApi | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function CartProvider({ children, storageKey = "lk-cart" }: { children: ReactNode; storageKey?: string }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) dispatch({ type: "load", lines: JSON.parse(saved) as CartLine[] });
    } catch {
      /* storage blocked: cart still works for this visit */
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, storageKey]);

  const api = useMemo<CartApi>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      open,
      setOpen,
      add: (product, color) => {
        dispatch({ type: "add", product, color });
        setOpen(true);
      },
      setQty: (id, qty) => dispatch({ type: "qty", id, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [lines, open],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button className="lk-cart-btn" onClick={() => setOpen(true)} aria-label={`Cart, ${count} items`}>
      Cart <span>{count}</span>
    </button>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors?.[0]);
  return (
    <article className="lk-product">
      <div className="lk-product__media" data-cursor="Add">
        <Art ratio="1/1" scene="pedestal" {...product.art} />
        {product.tag && (
          <span className="lk-card__tag">
            <Tag tone="accent">{product.tag}</Tag>
          </span>
        )}
        <button className="lk-product__quick" onClick={() => add(product, color)}>
          Add to cart
        </button>
      </div>
      <div className="lk-product__row">
        <h3>{product.title}</h3>
        <span>
          {product.compareAt && <s className="lk-product__was">₹{product.compareAt.toLocaleString("en-IN")}</s>}
          <Price amount={product.price} />
        </span>
      </div>
      {product.colors && (
        <div className="lk-swatches" role="radiogroup" aria-label="Colour">
          {product.colors.map((c) => (
            <button
              key={c}
              role="radio"
              aria-checked={c === color}
              aria-label={c}
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      )}
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="lk-product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function CartDrawer({ onCheckout, freeShippingAt = 2999 }: { onCheckout?: (lines: CartLine[], subtotal: number) => void; freeShippingAt?: number }) {
  const { lines, subtotal, open, setOpen, setQty, remove } = useCart();
  const left = Math.max(0, freeShippingAt - subtotal);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <div className={cx("lk-drawer", open && "lk-drawer--open")} aria-hidden={!open}>
      <button className="lk-drawer__scrim" aria-label="Close cart" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />
      <aside className="lk-drawer__panel" role="dialog" aria-label="Cart" data-lenis-prevent>
        <header>
          <h2>Your cart</h2>
          <button onClick={() => setOpen(false)} aria-label="Close">
            ✕
          </button>
        </header>
        <div className="lk-drawer__ship">
          {left > 0 ? (
            <>
              Add <Price amount={left} /> more for free shipping
            </>
          ) : (
            "Free shipping unlocked"
          )}
          <span style={{ width: `${Math.min(100, (subtotal / freeShippingAt) * 100)}%` }} />
        </div>
        <ul className="lk-drawer__lines">
          {lines.length === 0 && <li className="lk-drawer__empty">Nothing here yet.</li>}
          {lines.map((l) => (
            <li key={l.product.id + (l.color ?? "")}>
              <Art ratio="1/1" scene="pedestal" {...l.product.art} />
              <div>
                <strong>{l.product.title}</strong>
                {l.color && <i style={{ background: l.color }} aria-label={l.color} />}
                <div className="lk-qty">
                  <button onClick={() => setQty(l.product.id, l.qty - 1)} aria-label="Decrease">
                    −
                  </button>
                  <span>{l.qty}</span>
                  <button onClick={() => setQty(l.product.id, l.qty + 1)} aria-label="Increase">
                    +
                  </button>
                </div>
              </div>
              <div className="lk-drawer__line-end">
                <Price amount={l.product.price * l.qty} />
                <button onClick={() => remove(l.product.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <footer>
          <div className="lk-drawer__total">
            <span>Subtotal</span>
            <Price amount={subtotal} />
          </div>
          <Button arrow disabled={!lines.length} onClick={() => onCheckout?.(lines, subtotal)}>
            Checkout
          </Button>
        </footer>
      </aside>
    </div>
  );
}
