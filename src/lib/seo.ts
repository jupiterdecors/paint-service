import { useEffect } from 'react';
import { business } from '../config/business';
import { fullTitle, getPageSeo, type PageSeo } from '../data/seo';
import { pageSchema } from './schema';

function upsertMeta(attr: 'name' | 'property', key: string, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (href === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function setPageSchema(path: string) {
  document.head.querySelectorAll('script[data-schema="page"]').forEach((s) => s.remove());
  for (const data of pageSchema(path)) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.schema = 'page';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
}

/**
 * Applies the title, description, canonical URL, Open Graph / Twitter tags and
 * structured data for a route. Text comes from src/data/seo.ts; pass overrides
 * only if a page needs something different.
 */
export function useSeo(path: string, overrides: Partial<PageSeo> = {}) {
  const base = getPageSeo(path);
  const page = { ...base, ...overrides, path };
  const { title, description, image, noindex } = page;

  useEffect(() => {
    const t = fullTitle({ path, title });
    const site = business.siteUrl.replace(/\/+$/, '');
    const url = site && !noindex ? `${site}${path === '/' ? '/' : path}` : null;
    const img = site ? `${site}${image}` : null;

    document.title = t;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    upsertMeta('property', 'og:title', t);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('name', 'twitter:title', t);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);
    upsertCanonical(url);
    setPageSchema(path);
  }, [path, title, description, image, noindex]);
}
