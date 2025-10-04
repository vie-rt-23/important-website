// src/App.jsx
import React, { useEffect } from "react";
import { payloads } from "./payloads/samplePayloads";
import frogeLogo from "./frogelogo.png";
import "./App.css";

const featuredProducts = [
  {
    name: "Lilypad Luxe Hoodie",
    price: "$52",
    description: "Glow-in-the-dark stitching so you can vibe after sunset.",
    emoji: "🪷"
  },
  {
    name: "Bubblegum Bucket Hat",
    price: "$28",
    description: "Reversible. Waterproof. 100% amphibious energy.",
    emoji: "🎩"
  },
  {
    name: "Moonlight Mug",
    price: "$18",
    description: "Heat-sensitive frog eyes that pop open at 120°F.",
    emoji: "☕"
  }
];

const perks = [
  {
    title: "Hyper-Soft Fabrics",
    description: "Thread spun from ethically sourced clouds and cozy dreams.",
    emoji: "🧵"
  },
  {
    title: "Pond-Friendly Packaging",
    description: "Shipped in compostable lily pads that float on happiness.",
    emoji: "📦"
  },
  {
    title: "Mystery Stickers",
    description: "Every order includes a secret frog doing something silly.",
    emoji: "✨"
  }
];

const testimonials = [
  {
    quote:
      "My froge hoodie is so soft that the neighborhood ducks keep asking for hugs.",
    name: "River (Chief Quack Officer)"
  },
  {
    quote: "Important meeting? Wore the bucket hat. Closed the deal in 7 hops.",
    name: "Juniper (Professional Leaper)"
  },
  {
    quote: "The mug shrieked with joy when I poured tea. Same, honestly.",
    name: "Milo (Tea Enthusiast)"
  }
];

function App() {
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

  return (
    <div className="App">
      <header className="topbar">
        <div className="brand">
          <img src={frogeLogo} alt="Froge Merch logo" />
          <span>froge-merch</span>
        </div>
        <nav>
          <a href="#shop">Shop</a>
          <a href="#story">Our Pond</a>
          <a href="#testimonials">Fan Mail</a>
        </nav>
        <button className="cta">Hop In</button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-tag">Limited Splash Edition</p>
            <h1 id="hero-title">Outfit your inner frog with maximum drip.</h1>
            <p className="hero-sub">
              Froge-merch was born in a bog, forged in glitter, and perfected by
              chaotic good designers. Every drop is a celebration of cozy chaos.
            </p>
            <div className="hero-actions">
              <button className="primary">Shop Featured</button>
              <button className="secondary">Meet the Froge</button>
            </div>
          </div>
          <div className="hero-bubble" aria-hidden="true">
            <div className="bubble cloud">
              <span>100% vibe</span>
            </div>
            <div className="bubble splash">
              <span>Certified croak couture</span>
            </div>
            <div className="bubble star">
              <span>Glitter warranty</span>
            </div>
          </div>
        </section>

        <section id="shop" className="products">
          <h2>Featured sillies</h2>
          <p className="section-sub">
            Each drop ships with a tiny manifesto and emergency tadpole snacks.
          </p>
          <div className="product-grid">
            {featuredProducts.map((item) => (
              <article key={item.name} className="product-card">
                <span className="product-emoji" role="img" aria-label="product emoji">
                  {item.emoji}
                </span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="product-footer">
                  <span className="price">{item.price}</span>
                  <button className="ghost">Add to cart</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="story">
          <div className="story-card">
            <h2>How we hopped here</h2>
            <p>
              One rainy night, a frog sketched a hoodie on a napkin and the
              universe said "yup". Now we craft merch infused with pondwater
              optimism and a dash of glittery rebellion. Everything is tested by
              professional lounge amphibians.
            </p>
            <p>
              Need office-approved whimsy? Want to give your friends frog envy?
              Welcome home.
            </p>
          </div>
          <ul className="perks-grid">
            {perks.map((perk) => (
              <li key={perk.title}>
                <span className="perk-emoji" role="img" aria-label="perk emoji">
                  {perk.emoji}
                </span>
                <h3>{perk.title}</h3>
                <p>{perk.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="testimonials" className="testimonials">
          <h2>Fan mail from the pond</h2>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name}>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>— {testimonial.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-card">
            <h2>Join the lilypad list</h2>
            <p>
              Subscribe for drop alerts, frog astrology, and secret coupon
              croaks.
            </p>
            <form>
              <input type="email" placeholder="email@ribbit.com" aria-label="Email" />
              <button type="submit">Croak at me</button>
            </form>
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
