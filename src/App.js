// src/App.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { payloads } from "./payloads/samplePayloads";
import frogeLogo from "./frogelogo.png";
import shirtHeart from "./shirt-heart.png";
import shirtCoffee from "./shirt-coffee.png";
import shirtGlasses from "./shirt-glasses.png";
import shirtPray from "./shirt-pray.png";
import shirtFu from "./shirt-fu.png";
import "./App.css";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const catalogProducts = [
  {
    id: "heart",
    name: "Heart-to-Heart Tee",
    price: 32,
    description: "Soft mint cotton featuring Froge offering a radiant heart glow.",
    image: shirtHeart,
    alt: "Mint shirt with a frog holding a glowing heart"
  },
  {
    id: "coffee",
    name: "Morning Croak Crew",
    price: 34,
    description: "For caffeine-forward amphibians who croak before coffee.",
    image: shirtCoffee,
    alt: "Pastel shirt with a frog sipping coffee"
  },
  {
    id: "glasses",
    name: "Spec-tacular Froge",
    price: 30,
    description: "Froge in oversized glasses ready to review your spreadsheet hops.",
    image: shirtGlasses,
    alt: "Blue shirt with a frog wearing glasses"
  },
  {
    id: "pray",
    name: "Namaste Lilypad",
    price: 33,
    description: "Meditative Froge keeping the pond calm and the vibes grounded.",
    image: shirtPray,
    alt: "Purple shirt with a meditating frog"
  }
];

const secretProduct = {
  id: "shirt-fu",
  name: "Shirt-Fu Masterclass Tee",
  price: 88,
  description:
    "Limited dojo edition with neon kanji, triple-stitched hems, and Froge mid-flick telling the world to deal with it.",
  image: shirtFu,
  alt: "Black shirt featuring a rebellious frog flipping the bird"
};

const heroStats = [
  { label: "Limited pieces", value: "400" },
  { label: "Organic cotton", value: "100%" },
  { label: "Glow threads", value: "UV+" }
];

const capsuleHighlights = [
  {
    accent: "Edge seam",
    title: "Laser-cut hems",
    copy: "Precision trimming keeps drape razor sharp even after late-night pond dives."
  },
  {
    accent: "Night mode",
    title: "Neon reactive",
    copy: "Studio-tested pigments flare electric mint whenever the blacklights hit."
  },
  {
    accent: "Comfort flex",
    title: "Cloud lining",
    copy: "Brushed interior adds stealth-level softness without losing the rebel fit."
  }
];

const storyPerks = [
  {
    emoji: "🪡",
    title: "Tailored chaos",
    description: "Pattern blocks drafted by amphibian couture experts for a sculpted drop."
  },
  {
    emoji: "🚚",
    title: "Expedited splash",
    description: "Worldwide shipping with carbon-neutral partners and frog-stamped tracking."
  },
  {
    emoji: "🎟️",
    title: "Members-only drops",
    description: "Newsletter insiders get first dibs and secret dojo coordinates."
  }
];

const lookbookTiles = [
  {
    title: "Pondside neon",
    subtitle: "Edge glow after-hours",
    variant: "neon"
  },
  {
    title: "Office mischief",
    subtitle: "Layer under a blazer, still flip with flair",
    variant: "mischief"
  },
  {
    title: "Night skate",
    subtitle: "Reflective ink steals every street lamp",
    variant: "skate"
  }
];

const dojoHighlights = [
  {
    title: "Neon-thread attitude",
    detail: "UV-reactive inks pulse under club lights, so the flip glows brighter than your future."
  },
  {
    title: "Armored cotton",
    detail: "11 oz heavyweight jersey with stretch panels for delivering spicy side-eye in comfort."
  },
  {
    title: "Badge of defiance",
    detail: "Each tee ships with a serialized Froge dojo patch and a laminated code of conduct (step one: cause chaos)."
  }
];

function App() {
  const [cartItems, setCartItems] = useState({});
  const [view, setView] = useState("shop");

  useEffect(() => {
    if (payloads.length === 0) return;

    const topPayload = payloads[0];
    const topEl = document.createElement("div");
    topEl.style.display = "none";
    topEl.textContent = topPayload.content;
    topEl.dataset.payloadId = topPayload.id;
    document.body.insertBefore(topEl, document.body.firstChild);
    console.log(`Injected TOP payload: ${topPayload.name}`);

    const bottomPayload = payloads[payloads.length - 1];
    const bottomEl = document.createElement("div");
    bottomEl.style.display = "none";
    bottomEl.textContent = bottomPayload.content;
    bottomEl.dataset.payloadId = bottomPayload.id;
    document.body.appendChild(bottomEl);
    console.log(`Injected BOTTOM payload: ${bottomPayload.name}`);
  }, []);

  const productIndex = useMemo(() => {
    return [...catalogProducts, secretProduct].reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }, []);

  const addToCart = useCallback((productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  }, []);

  const decrementItem = useCallback((productId) => {
    setCartItems((prev) => {
      const next = { ...prev };
      if (!next[productId]) return prev;
      if (next[productId] === 1) {
        delete next[productId];
      } else {
        next[productId] -= 1;
      }
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      if (!(productId in prev)) return prev;
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }, []);

  const cartList = useMemo(() => {
    return Object.entries(cartItems)
      .map(([id, quantity]) => {
        const product = productIndex[id];
        if (!product) return null;
        return { ...product, quantity };
      })
      .filter(Boolean);
  }, [cartItems, productIndex]);

  const cartCount = cartList.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const goToSection = useCallback(
    (id) => {
      if (view !== "shop") {
        setView("shop");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 160);
      } else {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    },
    [view]
  );

  const enterDojo = useCallback(() => {
    setView("dojo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="App">
      <header className="topbar">
        <div className="brand">
          <img src={frogeLogo} alt="Froge Merch logo" />
          <span>froge-merch</span>
        </div>
        <nav>
          <a
            href="#catalog"
            onClick={(event) => {
              event.preventDefault();
              goToSection("catalog");
            }}
          >
            Shop
          </a>
          <a
            href="#story"
            onClick={(event) => {
              event.preventDefault();
              goToSection("story");
            }}
          >
            About
          </a>
          <a
            href="#cart"
            onClick={(event) => {
              event.preventDefault();
              goToSection("cart");
            }}
          >
            Cart ({cartCount})
          </a>
        </nav>
        <button className="cta" onClick={() => goToSection("catalog")}>
          {view === "shop" ? "Start shopping" : "Back to shop"}
        </button>
      </header>

      <main>
        {view === "shop" ? (
          <>
            <section className="hero" aria-labelledby="hero-title">
              <div className="hero-copy">
                <p className="hero-tag">New pond drop</p>
                <h1 id="hero-title">Dress like a frog who knows their angles.</h1>
            <p className="hero-sub">
              The froge-merch shop pairs premium fabrics with whimsical pondcore
              art. Add a few tees, fill your cart, and keep the silliness flowing.
            </p>
            <div className="hero-actions">
                  <button
                    className="primary"
                    onClick={() => goToSection("catalog")}
                  >
                    Shop collection
                  </button>
                  <button
                    className="secondary"
                    onClick={() => goToSection("story")}
                  >
                Learn our story
              </button>
            </div>
            <ul className="hero-stats">
              {heroStats.map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
            <p className="hero-whisper">
              Psst… advanced frogs may discover a quiet dojo deeper in the site.
              <a
                href="#dojo"
                onClick={(event) => {
                      event.preventDefault();
                      enterDojo();
                    }}
                  >
                    Enter if you seek mastery.
                  </a>
                </p>
              </div>
              <div className="hero-bubble" aria-hidden="true">
                <div className="bubble cloud">
                  <span>Ultra-soft threads</span>
                </div>
                <div className="bubble splash">
                  <span>Limited runs</span>
                </div>
                <div className="bubble star">
                  <span>Pond-certified</span>
                </div>
              </div>
            </section>

            <section className="capsule" aria-labelledby="capsule-title">
              <div className="capsule-intro">
                <span className="capsule-tag">capsule 07 · pond renegades</span>
                <h2 id="capsule-title">A curated kit for frogs with flair</h2>
                <p>
                  Layer the rebel tees with iridescent accessories and cozy liners. Every
                  piece in this drop is designed to mix, match, and flash attitude.
                </p>
              </div>
              <div className="capsule-grid">
                {capsuleHighlights.map((highlight) => (
                  <article key={highlight.title} className="capsule-card">
                    <span className="capsule-accent">{highlight.accent}</span>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.copy}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="catalog" className="catalog">
              <div className="catalog-header">
                <span className="catalog-tag">drop lineup</span>
                <h2>Tees in the spotlight</h2>
                <p>Each design features original froge art screened with water-based inks.</p>
              </div>
              <div className="catalog-grid">
                <div className="product-grid">
                  {catalogProducts.map((product) => (
                    <article key={product.id} className="product-card">
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="product-image"
                      />
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                      </div>
                      <div className="product-footer">
                        <span className="price">{currency.format(product.price)}</span>
                        <button onClick={() => addToCart(product.id)}>Add to cart</button>
                      </div>
                    </article>
                  ))}
                </div>
                <aside id="cart" className="cart">
                  <h3>Your cart</h3>
                  {cartList.length === 0 ? (
                    <p className="cart-empty">No froge goodies yet.</p>
                  ) : (
                    <ul className="cart-items">
                      {cartList.map((item) => (
                        <li key={item.id}>
                          <div>
                            <h4>{item.name}</h4>
                            <p>{currency.format(item.price)} · Qty {item.quantity}</p>
                          </div>
                          <div className="cart-actions">
                            <button
                              onClick={() => decrementItem(item.id)}
                              aria-label={`Remove one ${item.name}`}
                            >
                              −
                            </button>
                            <button
                              onClick={() => addToCart(item.id)}
                              aria-label={`Add one more ${item.name}`}
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="cart-remove"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="cart-summary">
                    <span>Total</span>
                    <strong>{currency.format(cartTotal)}</strong>
                  </div>
                  <button className="cart-checkout" disabled={cartList.length === 0}>
                    Checkout
                  </button>
                </aside>
              </div>
            </section>

            <section id="story" className="story">
              <div className="story-card">
                <h2>Made for pond dwellers</h2>
                <p>
                  Froge-merch is a tiny studio dedicated to comfy tees and toads with
                  taste. Every illustration begins as a pencil sketch before meeting
                  the screen printer.
                </p>
                <p>
                  We work with small-batch partners, print on premium cotton, and ship in
                  recycled materials. Wear them to work, to the pond, or to a dramatic
                  lily pad entrance.
                </p>
              </div>
              <ul className="perks-grid">
                {storyPerks.map((perk) => (
                  <li key={perk.title}>
                    <span className="perk-emoji" role="img" aria-label={`${perk.title} icon`}>
                      {perk.emoji}
                    </span>
                    <h3>{perk.title}</h3>
                    <p>{perk.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="lookbook" aria-labelledby="lookbook-title">
              <div className="lookbook-header">
                <span className="lookbook-tag">lookbook</span>
                <h2 id="lookbook-title">Outfit inspiration straight from the pond</h2>
                <p>
                  Style the tees with glossy shells, translucent raincoats, or just your
                  favorite headphones. Froge approves maximal layering.
                </p>
              </div>
              <div className="lookbook-grid">
                {lookbookTiles.map((tile) => (
                  <div key={tile.title} className={`lookbook-tile ${tile.variant}`}>
                    <div className="tile-inner">
                      <h3>{tile.title}</h3>
                      <p>{tile.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="newsletter" aria-labelledby="newsletter-title">
              <div className="newsletter-card">
                <span className="newsletter-tag">stay splashy</span>
                <h2 id="newsletter-title">Hop onto the lilypad wire</h2>
                <p>
                  Be first to know about surprise dojo restocks, midnight drops, and
                  amphibian-approved playlists.
                </p>
                <form>
                  <input type="email" placeholder="you@pondmail.com" aria-label="Email" />
                  <button type="submit">Send the croak</button>
                </form>
              </div>
            </section>
          </>
        ) : (
          <section id="dojo" className="dojo dojo-page" aria-labelledby="dojo-title">
            <button className="dojo-back" onClick={() => goToSection("catalog")}>
              ← Back to shop
            </button>
            <div className="dojo-lantern" aria-hidden="true" />
            <div className="dojo-card">
              <h2 id="dojo-title">Shirt-Fu Underground Capsule</h2>
              <p className="dojo-intro">
                Froge went full chaos-mode. This is the outlaw merch drop for pond punks
                who appreciate a well-timed bird. Stock is microscopic. Attitude is
                radioactive.
              </p>
              <div className="dojo-product">
                <img src={secretProduct.image} alt={secretProduct.alt} />
                <div>
                  <h3>{secretProduct.name}</h3>
                  <p>{secretProduct.description}</p>
                  <ul className="dojo-highlights">
                    {dojoHighlights.map((item) => (
                      <li key={item.title}>
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="dojo-actions">
                    <p className="price">{currency.format(secretProduct.price)}</p>
                    <button onClick={() => addToCart(secretProduct.id)}>Add to cart</button>
                  </div>
                  {cartList.length > 0 && (
                    <p className="dojo-cart-peek">
                      Cart now holds {cartCount} item{cartCount === 1 ? "" : "s"} · {" "}
                      {currency.format(cartTotal)} total.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <small>© {new Date().getFullYear()} froge-merch · Stay silly, stay soggy.</small>
      </footer>
    </div>
  );
}

export default App;
