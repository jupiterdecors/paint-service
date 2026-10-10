import { useEffect } from 'react';
import { business } from '../config/business';

interface SeoOptions {
  title: string;
  description: string;
  /** Route path, e.g. '/services'. */
  path: string;
  /** Image path inside /public, e.g. '/images/hero.jpg'. */
  image?: string;
}

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

/** Sets a unique title, description, canonical URL and Open Graph tags for a page. */
export function useSeo({ title, description, path, image = '/images/hero.jpg' }: SeoOptions) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} | ${business.name}`;
    const site = business.siteUrl.replace(/\/+$/, '');
    const url = site ? `${site}${path}` : null;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', site ? `${site}${image}` : null);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertCanonical(url);
  }, [title, description, path, image]);
}
