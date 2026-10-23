// Converts an image generated on Higgsfield (HTTPS URL or local file) to WebP at its final size.
// Usage: node scripts/assets/fetch-image.mjs <url|file> <output.webp> <width> <height|auto> [quality=82] [--trim]
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";

const args = process.argv.slice(2);
const trim = args.includes("--trim");
const [src, out, w, h, quality = "82"] = args.filter((a) => a !== "--trim");
if (!src || !out || !w || !h) {
  console.error("usage: fetch-image.mjs <url|file> <output.webp> <w> <h|auto> [quality] [--trim]");
  process.exit(1);
}

let buf;
if (src.startsWith("https://")) {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`HTTP ${res.status} while downloading`);
  buf = Buffer.from(await res.arrayBuffer());
} else {
  buf = await readFile(src);
}

await mkdir(dirname(out), { recursive: true });
let img = sharp(buf).rotate();
if (trim) img = sharp(await img.trim().toBuffer());
img = h === "auto" ? img.resize({ width: Number(w) }) : img.resize(Number(w), Number(h), { fit: "cover", position: "attention" });
const info = await img.webp({ quality: Number(quality), effort: 5, alphaQuality: 90 }).toFile(out);
console.log(`ok ${out} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
