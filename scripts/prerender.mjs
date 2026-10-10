// Runs after `vite build` and the SSR build (see package.json "build").
// Fills each route's dist/<route>/index.html with the page's rendered HTML, and
// writes dist/404.html, so search engines get the full page content without running JS.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');
const { render, routes } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

const MOUNT = '<div id="root"></div>';
const fill = (html, body, file) => {
  if (!html.includes(MOUNT)) throw new Error(`${file}: ${MOUNT} not found`);
  return html.replace(MOUNT, `<div id="root">${body}</div>`);
};

for (const route of [...routes, '/404']) {
  const file = route === '/' ? join(dist, 'index.html') : route === '/404' ? join(dist, '404.html') : join(dist, route, 'index.html');
  if (!existsSync(file)) throw new Error(`Missing ${file} — was it written by the jupiter-seo plugin?`);
  const html = await readFile(file, 'utf8');
  await writeFile(file, fill(html, render(route === '/404' ? '/__not-found__' : route), file));
  console.log(`prerendered ${route}`);
}

await rm(ssrDir, { recursive: true, force: true });
