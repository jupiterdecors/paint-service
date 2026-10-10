import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { business, getMissingConfig } from './src/config/business';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pages, fullTitle, notFoundSeo } from './src/data/seo';
import { businessSchema, pageSchema } from './src/lib/schema';
import { stockFallback } from './src/data/images';

/**
 * Build-time helper:
 *  - warns about business details that still need to be filled in
 *  - writes sitemap.xml and robots.txt into the build output
 *  - writes a static HTML file per route with its own title, description,
 *    canonical, Open Graph tags and structured data, so search engines and
 *    WhatsApp/Facebook link previews see the right details without running JS
 *  - writes 404.html (noindex) for unknown URLs
 * The page body is filled in afterwards by scripts/prerender.mjs.
 * Skipped during the SSR build (vite build --ssr), which only produces the renderer.
 */
const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ld = (data: unknown, kind: string) =>
  `<script type="application/ld+json" data-schema="${kind}">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

function jupiterSeoPlugin(): Plugin {
  let ssr = false;
  return {
    name: 'jupiter-seo',
    apply: 'build',
    configResolved(config) {
      ssr = !!config.build.ssr;
    },
    buildStart() {
      if (ssr) return;
      const missing = getMissingConfig();
      if (missing.length) {
        this.warn(
          `\n\n⚠  Business details not configured yet (src/config/business.ts):\n   - ${missing.join(
            '\n   - ',
          )}\n   The site will build, but fill these in before going live.\n`,
        );
      }
    },
    generateBundle() {
      if (ssr) return;
      const site = business.siteUrl.replace(/\/+$/, '');
      const routes = pages.filter((p) => !p.noindex).map((p) => p.path);

      if (site) {
        const today = new Date().toISOString().slice(0, 10);
        const xml =
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          routes
            .map((r) => `  <url><loc>${site}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`)
            .join('\n') +
          `\n</urlset>\n`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
      }

      const robots = `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site}/sitemap.xml\n` : ''}`;
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
    },
    closeBundle() {
      if (ssr) return;
      const out = join(process.cwd(), 'dist');
      const template = readFileSync(join(out, 'index.html'), 'utf8');
      const site = business.siteUrl.replace(/\/+$/, '');

      for (const page of pages) {
        const title = fullTitle(page);
        const url = site ? `${site}${page.path === '/' ? '/' : page.path}` : '';
        // Use the self-hosted photo if it was downloaded (npm run images), else the stock URL.
        const image = existsSync(join(out, page.image))
          ? site && `${site}${page.image}`
          : stockFallback(page.image) ?? (site && `${site}${page.image}`);

        const tags = [
          `<title>${esc(title)}</title>`,
          `<meta name="description" content="${esc(page.description)}" />`,
          `<meta name="robots" content="index, follow, max-image-preview:large" />`,
          url && `<link rel="canonical" href="${url}" />`,
          `<meta property="og:title" content="${esc(title)}" />`,
          `<meta property="og:description" content="${esc(page.description)}" />`,
          url && `<meta property="og:url" content="${url}" />`,
          image && `<meta property="og:image" content="${esc(image)}" />`,
          `<meta name="twitter:title" content="${esc(title)}" />`,
          `<meta name="twitter:description" content="${esc(page.description)}" />`,
          image && `<meta name="twitter:image" content="${esc(image)}" />`,
          ld(businessSchema(), 'business'),
          ...pageSchema(page.path).map((d) => ld(d, 'page')),
        ]
          .filter(Boolean)
          .join('\n    ');

        const html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, tags);
        const file = page.path === '/' ? join(out, 'index.html') : join(out, page.path, 'index.html');
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html);
      }

      const notFound = [
        `<title>${esc(fullTitle(notFoundSeo))}</title>`,
        `<meta name="description" content="${esc(notFoundSeo.description)}" />`,
        `<meta name="robots" content="noindex, follow" />`,
        ld(businessSchema(), 'business'),
      ].join('\n    ');
      writeFileSync(join(out, '404.html'), template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, notFound));
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), jupiterSeoPlugin()],
  // The SSR build only produces the page renderer for prerendering; it doesn't need public/ (photos etc.).
  build: { copyPublicDir: !isSsrBuild },
}));
