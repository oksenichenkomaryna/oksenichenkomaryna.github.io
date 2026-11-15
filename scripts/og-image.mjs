// Generates public/og.png (1200×630) — run: node scripts/og-image.mjs
// Colors mirror @theme tokens in src/styles/global.css.
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const W = 1200,
  H = 630;
const c = {
  ink: "#0e0f12",
  panel: "#17191e",
  line: "#2a2d35",
  paper: "#eceae4",
  muted: "#8b8f99",
  playhead: "#ff3b30",
  v: "#5b7cfa",
  a: "#3ddc97",
};

const photo = await sharp(await readFile("src/assets/maryna.webp"))
  .resize(300, 300)
  .png()
  .toBuffer();
const bars = Array.from({ length: 64 }, (_, i) => {
  const h = 6 + Math.round(Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 34);
  return `<rect x="${80 + i * 11}" y="${560 - h / 2}" width="5" height="${h}" fill="${c.a}" opacity="0.8"/>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${c.ink}"/>
  <text x="80" y="92" font-family="Menlo, monospace" font-size="20" fill="${c.muted}" letter-spacing="2">VIDEO &amp; AUDIO EDITOR · PREMIERE PRO · 6 YEARS</text>
  <text x="80" y="200" font-family="Helvetica Neue, Arial, sans-serif" font-weight="700" font-size="64" fill="${c.paper}" letter-spacing="-2">Podcasts, interviews</text>
  <text x="80" y="272" font-family="Helvetica Neue, Arial, sans-serif" font-weight="700" font-size="64" fill="${c.paper}" letter-spacing="-2">and courses — edited</text>
  <text x="80" y="344" font-family="Helvetica Neue, Arial, sans-serif" font-weight="700" font-size="64" fill="${c.paper}" letter-spacing="-2">and on time.</text>
  <text x="80" y="420" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" fill="${c.paper}">Maryna Oksenichenko</text>
  <text x="80" y="458" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${c.muted}">100% Job Success · 5.0 from 14 Upwork reviews · Poznań, PL</text>
  <rect x="80" y="510" width="${W - 160}" height="1" fill="${c.line}"/>
  <rect x="80" y="514" width="300" height="10" rx="2" fill="${c.v}" opacity="0.85"/>
  <rect x="388" y="514" width="220" height="10" rx="2" fill="${c.v}" opacity="0.55"/>
  ${bars}
  <rect x="520" y="500" width="2" height="90" fill="${c.playhead}"/>
  <path d="M512 492h18l-9 10z" fill="${c.playhead}"/>
  <rect x="819" y="99" width="302" height="302" fill="none" stroke="${c.line}" stroke-width="2"/>
  <text x="820" y="430" font-family="Menlo, monospace" font-size="16" fill="${c.muted}" letter-spacing="2">CAM A · POZNAŃ, PL</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: 820, top: 100 }])
  .png({ compressionLevel: 9 })
  .toFile("public/og.png");
console.log("public/og.png written");
