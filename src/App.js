// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
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
    "Limited dojo edition with glow-ink kanji and reinforced seams for dramatic spins.",
  image: shirtFu,
  alt: "Black shirt with a frog performing martial arts"
};

function App() {
  const [cartItems, setCartItems] = useState({});

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

  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const decrementItem = (productId) => {
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
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      if (!(productId in prev)) return prev;
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

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

  return (
    <div className="App">
      <header className="topbar">
        <div className="brand">
          <img src={frogeLogo} alt="Froge Merch logo" />
          <span>froge-merch</span>
        </div>
        <nav>
          <a href="#catalog">Shop</a>
          <a href="#story">About</a>
          <a href="#cart">Cart ({cartCount})</a>
        </nav>
        <button className="cta" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>
          Start shopping
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-tag">New pond drop</p>
            <h1 id="hero-title">Dress like a frog who knows their angles.</h1>
            <p className="hero-sub">
              The froge-merch shop pairs premium fabrics with whimsical pondcore
              art. Add a few tees, fill your cart, and keep the silliness
              flowing.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>
                Shop collection
              </button>
              <button className="secondary" onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}>
                Learn our story
              </button>
            </div>
            <p className="hero-whisper">
              Psst… advanced frogs may discover a quiet dojo deeper in the site.
              <a href="#dojo"> Enter if you seek mastery.</a>
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

        <section id="catalog" className="catalog">
          <div className="catalog-header">
            <h2>Tees in the spotlight</h2>
            <p>Each design features original froge art screened with water-based inks.</p>
          </div>
          <div className="catalog-grid">
            <div className="product-grid">
              {catalogProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <img src={product.image} alt={product.alt} className="product-image" />
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
                        <button onClick={() => decrementItem(item.id)} aria-label={`Remove one ${item.name}`}>
                          −
                        </button>
                        <button onClick={() => addToCart(item.id)} aria-label={`Add one more ${item.name}`}>
                          +
                        </button>
                        <button onClick={() => removeFromCart(item.id)} className="cart-remove">
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
              We work with small-batch partners, print on premium cotton, and
              ship in recycled materials. Wear them to work, to the pond, or to a
              dramatic lily pad entrance.
            </p>
          </div>
          <ul className="perks-grid">
            <li>
              <span className="perk-emoji" role="img" aria-label="Thread icon">
                🧵
              </span>
              <h3>Soft & breathable</h3>
              <p>100% combed cotton, enzyme washed for reliable coziness.</p>
            </li>
            <li>
              <span className="perk-emoji" role="img" aria-label="Plant sprout">
                🌱
              </span>
              <h3>Eco inks</h3>
              <p>Water-based pigments that keep the pond pristine.</p>
            </li>
            <li>
              <span className="perk-emoji" role="img" aria-label="Sparkles">
                ✨
              </span>
              <h3>Limited runs</h3>
              <p>Fresh art drops monthly—when they sell out, they’re gone.</p>
            </li>
          </ul>
        </section>

        <section id="dojo" className="dojo">
          <div className="dojo-lantern" aria-hidden="true" />
          <div className="dojo-card">
            <h2>Secret dojo drop</h2>
            <p className="dojo-intro">
              You found the Shirt-Fu dojo. Only the most dedicated frogs discover
              this chamber of high-performance fabric.
            </p>
            <div className="dojo-product">
              <img src={secretProduct.image} alt={secretProduct.alt} />
              <div>
                <h3>{secretProduct.name}</h3>
                <p>{secretProduct.description}</p>
                <p className="price">{currency.format(secretProduct.price)}</p>
                <button onClick={() => addToCart(secretProduct.id)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <small>© {new Date().getFullYear()} froge-merch · Stay silly, stay soggy.</small>
      </footer>
    </div>
  );
}

export default App;
