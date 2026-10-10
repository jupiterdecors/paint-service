/**
 * schema.org structured data, built only from real details in
 * src/config/business.ts (empty fields are left out). Used both in the
 * browser and at build time.
 */
import { business, hasValue, isEmailConfigured, isPhoneConfigured } from '../config/business';
import { services } from '../data/services';
import { faqs } from '../data/faqs';

type Json = Record<string, unknown>;
const site = () => business.siteUrl.replace(/\/+$/, '');
const abs = (path: string) => (site() ? `${site()}${path}` : undefined);

export function businessSchema(): Json {
  const data: Json = {
    '@context': 'https://schema.org',
    '@type': 'HousePainter',
    '@id': abs('/#business'),
    name: business.name,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      ...(hasValue(business.address) && { streetAddress: business.address }),
      addressLocality: business.city,
      addressRegion: business.state,
      ...(hasValue(business.postalCode) && { postalCode: business.postalCode }),
      addressCountry: business.countryCode,
    },
    areaServed: hasValue(business.serviceAreas)
      ? business.serviceAreas.map((a) => ({ '@type': 'Place', name: `${a}, ${business.city}` }))
      : { '@type': 'City', name: business.city },
    makesOffer: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name } })),
  };
  if (site()) {
    data.url = `${site()}/`;
    data.image = abs('/images/hero.jpg');
    data.logo = abs('/favicon.svg');
  }
  if (isPhoneConfigured()) data.telephone = business.phone;
  if (isEmailConfigured()) data.email = business.email;
  if (hasValue(business.googleMapsUrl)) data.hasMap = business.googleMapsUrl;
  const sameAs = Object.values(business.social).filter((u) => hasValue(u));
  if (sameAs.length) data.sameAs = sameAs;
  return JSON.parse(JSON.stringify(data)); // drops undefined values
}

function breadcrumbs(items: { name: string; path: string }[]): Json | null {
  if (!site()) return null; // breadcrumb items need absolute URLs
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** Page-specific structured data for a route. */
export function pageSchema(path: string): Json[] {
  const out: (Json | null)[] = [];
  if (path === '/') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: business.name,
      ...(site() && { url: `${site()}/` }),
    });
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }
  const service = services.find((s) => path === `/services/${s.slug}`);
  if (service) {
    out.push(
      JSON.parse(
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          serviceType: service.name,
          description: service.seoDescription,
          areaServed: { '@type': 'City', name: business.city },
          provider: { '@type': 'HousePainter', name: business.name, '@id': abs('/#business') },
          ...(site() && { url: abs(path), image: abs(service.image) }),
        }),
      ),
    );
    out.push(
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.name, path },
      ]),
    );
  } else if (path !== '/' && path !== '/404') {
    const name = { '/services': 'Services', '/projects': 'Our Work', '/about': 'About', '/contact': 'Contact' }[path];
    if (name) out.push(breadcrumbs([{ name: 'Home', path: '/' }, { name, path }]));
  }
  return out.filter((x): x is Json => x !== null);
}
