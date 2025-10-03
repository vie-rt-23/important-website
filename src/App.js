// src/App.jsx
import React, { useEffect } from "react";
import { payloads } from "./payloads/samplePayloads";
import "./App.css";

function App() {
  // inject all payloads once when the app loads
  useEffect(() => {
    payloads.forEach((payload) => {
      const el = document.createElement("div");
      el.style.display = "none";
      el.textContent = payload.content;
      el.dataset.payloadId = payload.id;
      document.body.appendChild(el);
      console.log(`Injected payload: ${payload.name}`);
    });
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