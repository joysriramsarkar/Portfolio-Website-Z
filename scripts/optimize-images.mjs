#!/usr/bin/env node
/**
 * ছবি অপটিমাইজার — public/ ফোল্ডারের PNG/JPEG → WebP
 *
 * ব্যবহার:
 *   node scripts/optimize-images.mjs --dry-run     # কিছুই লিখবে না, শুধু হিসাব দেখাবে
 *   node scripts/optimize-images.mjs               # পাশে .webp ফাইল বানাবে (মূল ফাইল অটুট)
 *   node scripts/optimize-images.mjs --delete-originals
 *                                                 # .webp বানানোর পর মূল PNG/JPG মুছে দেবে
 *   node scripts/optimize-images.mjs --max-width=2000 --quality=82
 *
 * নোট:
 * - মূল ফাইল ডিফল্টে মুছে যায় না — আগে @2x/আসল সোর্স আলাদা জায়গায় রেখে তবেই --delete-originals ব্যবহার করুন।
 * - চালানোর পর কোডে path বদলাতে হবে: /designs/foo.png → /designs/foo.webp
 *   (তবে next/image নিজেই WebP সার্ভ করে, তাই যেখানে next/image ব্যবহার হচ্ছে সেখানে
 *    দরকার শুধু ফাইল সাইজ কমানো — সরাসরি <img src> থাকলে path বদলাতে হবে।)
 */

import { readdir, stat, writeFile, unlink } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? Number(hit.split('=')[1]) : fallback;
};

const ROOT = 'public';
const DRY_RUN = flag('dry-run');
const DELETE_ORIGINALS = flag('delete-originals');
const MAX_WIDTH = value('max-width', 1600);
const QUALITY = value('quality', 78);
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) yield full;
  }
}

let before = 0;
let after = 0;
let converted = 0;
const rows = [];

for await (const file of walk(ROOT)) {
  const original = await stat(file);
  const image = sharp(file, { failOn: 'none' });
  const meta = await image.metadata();

  const resized = meta.width > MAX_WIDTH ? image.resize({ width: MAX_WIDTH }) : image;
  const encoded = await resized.webp({ quality: QUALITY, effort: 5 }).toBuffer();

  // ইতিমধ্যে ছোট ফাইলকে আর ছোঁয়া হবে না
  if (encoded.length >= original.size) continue;

  before += original.size;
  after += encoded.length;
  converted += 1;
  rows.push([
    relative(ROOT, file),
    `${mb(original.size)}${meta.width ? ` (${meta.width}px)` : ''}`,
    kb(encoded.length),
    `${Math.round((1 - encoded.length / original.size) * 100)}%`,
  ]);

  if (!DRY_RUN) {
    const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
    await writeFile(out, encoded);
    if (DELETE_ORIGINALS) await unlink(file);
  }
}

if (rows.length === 0) {
  console.log('✅ অপটিমাইজ করার মতো কিছু নেই — সব ফাইল ইতিমধ্যে ছোট।');
  process.exit(0);
}

const width = Math.max(...rows.map((r) => r[0].length));
for (const [name, original, next, saving] of rows) {
  console.log(`${name.padEnd(width)}  ${original.padStart(18)} → ${next.padStart(10)}  (-${saving})`);
}

console.log(
  `\n${DRY_RUN ? '[DRY RUN — কিছুই লেখা হয়নি]' : '[সম্পন্ন]'} ` +
    `${converted}টি ফাইল, ${mb(before)} → ${mb(after)} ` +
    `(-${Math.round((1 - after / before) * 100)}%, সাশ্রয় ${mb(before - after)})\n` +
    `সেটিংস: max-width=${MAX_WIDTH}, quality=${QUALITY}` +
    (DELETE_ORIGINALS && !DRY_RUN ? ', মূল ফাইল মুছে ফেলা হয়েছে' : '')
);
