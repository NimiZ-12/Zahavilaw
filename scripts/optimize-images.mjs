#!/usr/bin/env node
/**
 * Converts the raster images in /public to WebP and reports the saving.
 *
 *   node scripts/optimize-images.mjs          # convert, keep originals
 *   node scripts/optimize-images.mjs --prune  # convert, delete originals
 *   node scripts/optimize-images.mjs --check  # report only, write nothing
 *
 * Originals are kept by default so a conversion can be reviewed before the
 * JPG/PNG is removed. Anything already smaller as-is is left alone.
 *
 * Not covered on purpose:
 *  - public/og-image.jpg — social scrapers still handle JPEG most reliably.
 *  - src/app/icon.png, apple-icon.png, favicon.ico — favicons must stay PNG/ICO.
 */

import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");

const SKIP = new Set(["og-image.jpg"]);
const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png"]);

/** Widest each image is ever displayed at, times two for retina. */
const MAX_WIDTH = {
  "lobby.jpg": 1920, // decorative section background, never shown sharp
  "logo.png": 942, // rendered at 36px tall from a 471x240 source
  default: 1600,
  team: 640, // shown in a 112px circle
  clients: 480, // shown at 160x56
};

function widthFor(relPath, name) {
  if (MAX_WIDTH[name]) return MAX_WIDTH[name];
  if (relPath.startsWith("team/")) return MAX_WIDTH.team;
  if (relPath.startsWith("clients/")) return MAX_WIDTH.clients;
  return MAX_WIDTH.default;
}

async function* walk(dir, prefix = "") {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const abs = join(dir, item.name);
    const rel = prefix ? `${prefix}/${item.name}` : item.name;
    if (item.isDirectory()) yield* walk(abs, rel);
    else yield { abs, rel, name: item.name };
  }
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const prune = process.argv.includes("--prune");
const checkOnly = process.argv.includes("--check");

let originalTotal = 0;
let webpTotal = 0;
const rows = [];

for await (const file of walk(PUBLIC)) {
  if (!SOURCE_EXT.has(extname(file.name).toLowerCase())) continue;
  if (SKIP.has(file.name)) continue;

  const before = (await stat(file.abs)).size;
  const target = join(dirname(file.abs), `${basename(file.name, extname(file.name))}.webp`);
  const width = widthFor(file.rel, file.name);

  const pipeline = sharp(file.abs).rotate();
  const meta = await pipeline.metadata();
  const resized =
    meta.width && meta.width > width ? pipeline.resize({ width }) : pipeline;

  const buffer = await resized.webp({ quality: 82, effort: 6 }).toBuffer();

  if (!checkOnly) {
    await sharp(buffer).toFile(target);
    if (prune) await unlink(file.abs);
  }

  originalTotal += before;
  webpTotal += buffer.length;
  rows.push({
    file: file.rel,
    before,
    after: buffer.length,
    saved: 1 - buffer.length / before,
    resizedFrom: meta.width && meta.width > width ? meta.width : null,
    width: Math.min(meta.width ?? width, width),
  });
}

rows.sort((a, b) => b.before - a.before);

const pad = Math.max(...rows.map((r) => r.file.length), 4);
console.log(`\n${"file".padEnd(pad)}  ${"before".padStart(9)}  ${"webp".padStart(9)}  saved`);
console.log("-".repeat(pad + 32));
for (const r of rows) {
  const note = r.resizedFrom ? `  (${r.resizedFrom}px -> ${r.width}px)` : "";
  console.log(
    `${r.file.padEnd(pad)}  ${kb(r.before).padStart(9)}  ${kb(r.after).padStart(9)}  ` +
      `${(r.saved * 100).toFixed(0)}%${note}`,
  );
}
console.log("-".repeat(pad + 32));
console.log(
  `${"total".padEnd(pad)}  ${kb(originalTotal).padStart(9)}  ${kb(webpTotal).padStart(9)}  ` +
    `${((1 - webpTotal / originalTotal) * 100).toFixed(0)}%`,
);
if (checkOnly) console.log("\n--check: nothing written.");
else if (!prune) console.log("\nOriginals kept. Re-run with --prune to remove them.");
console.log();
