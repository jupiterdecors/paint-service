import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { business, getMissingConfig } from './src/config/business';
import { services } from './src/data/services';

/**
 * Build-time helper:
 *  - warns about business details that still need to be filled in
 *  - writes sitemap.xml and robots.txt into the build output
 */
function jupiterSeoPlugin(): Plugin {
  return {
    name: 'jupiter-seo',
    apply: 'build',
    buildStart() {
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
      const site = business.siteUrl.replace(/\/+$/, '');
      const routes = [
        '/',
        '/services',
        ...services.map((s) => `/services/${s.slug}`),
        '/projects',
        '/about',
        '/contact',
      ];

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
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), jupiterSeoPlugin()],
});
