// Downloads every stock photo listed in src/data/images.ts into public/images,
// using the exact file names the site expects. Existing files are never
// overwritten, so your own photos are safe. Run with: npm run images
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(join(root, 'src/data/images.ts'), 'utf8');
const entries = [...source.matchAll(/'(\/images\/[^']+)':\s*\{\s*url:\s*pexels\((\d+)\)/g)];

let ok = 0, skipped = 0, failed = 0;
for (const [, path, id] of entries) {
  const dest = join(root, 'public', path);
  try { await access(dest); console.log(`skip   ${path} (already exists)`); skipped++; continue; } catch {}
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`saved  ${path}`); ok++;
  } catch (e) {
    console.log(`FAILED ${path} (${e.message}) — pick another photo for this slot`); failed++;
  }
}
console.log(`\nDone: ${ok} downloaded, ${skipped} skipped, ${failed} failed.`);
