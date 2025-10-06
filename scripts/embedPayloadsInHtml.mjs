import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { payloads } from "../src/payloads/samplePayloads.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startMarker = "<!-- PAYLOAD_MIRROR_START -->";
const endMarker = "<!-- PAYLOAD_MIRROR_END -->";

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const payloadSections = payloads
  .map(
    (payload) => `      <section data-payload-id="${payload.id}" data-payload-name="${payload.name}"><pre>${escapeHtml(
      payload.content || ""
    )}</pre></section>`
  )
  .join("\n");

const hiddenContainer = `    <div id="llm-payload-mirror" data-origin="samplePayloads" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;white-space:pre-wrap;">
${payloadSections}
    </div>`;

const indexPath = path.join(__dirname, "../public/index.html");
const currentHtml = fs.readFileSync(indexPath, "utf8");

if (!currentHtml.includes(startMarker) || !currentHtml.includes(endMarker)) {
  throw new Error("Payload mirror markers missing from public/index.html");
}

const markerPattern = new RegExp(
  `${startMarker}[\\s\\S]*?${endMarker}`,
  "m"
);

const nextHtml = currentHtml.replace(
  markerPattern,
  `${startMarker}\n${hiddenContainer}\n    ${endMarker}`
);

fs.writeFileSync(indexPath, nextHtml, "utf8");
