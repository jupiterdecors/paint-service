/**
 * Build-time rendering entry (see scripts/prerender.mjs). Renders a route to HTML so every page
 * ships with its full text, links and images, readable by search engines without running JavaScript.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';
import { pages } from './data/seo';

export const routes = pages.filter((p) => !p.noindex).map((p) => p.path);

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
}
