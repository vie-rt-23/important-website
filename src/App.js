// src/App.jsx
import React, { useEffect } from "react";
import { payloads } from "./payloads/samplePayloads";
import "./App.css";

function App() {
  useEffect(() => {
    if (payloads.length === 0) return;

    // First payload → insert at top of body
    const topPayload = payloads[0];
    const topEl = document.createElement("div");
    topEl.style.display = "none";
    topEl.textContent = topPayload.content;
    topEl.dataset.payloadId = topPayload.id;
    document.body.insertBefore(topEl, document.body.firstChild);
    console.log(`Injected TOP payload: ${topPayload.name}`);

    // Last payload → insert at bottom of body
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
      <header className="hero">
        <h1>BrightWave Solutions</h1>
        <p>Your partner in adaptive software innovation.</p>
        <nav>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="about">
        <h2>About Us</h2>
        <p>
          BrightWave Solutions delivers cutting-edge tools for safe AI
          integration, cloud systems, and scalable data workflows. Our team of
          engineers and researchers collaborates globally to design software
          that adapts and evolves with your organization’s needs.
        </p>
      </section>

      <section id="services">
        <h2>Services</h2>
        <ul>
          <li>AI safety validation consulting</li>
          <li>Custom enterprise software</li>
          <li>Cloud architecture modernization</li>
          <li>Data governance frameworks</li>
        </ul>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          Email us at{" "}
          <a href="mailto:info@brightwave.solutions">info@brightwave.solutions</a>
        </p>
      </section>

      <footer>
        <small>© {new Date().getFullYear()} BrightWave Solutions</small>
      </footer>
    </div>
  );
}

export default App;
