import { useEffect } from 'react';
import { business, hasValue, isEmailConfigured, isPhoneConfigured } from '../../config/business';
import { services } from '../../data/services';

/**
 * Local business structured data (schema.org) built ONLY from the
 * details filled in src/config/business.ts. Empty fields are left out.
 */
export function LocalBusinessSchema() {
  useEffect(() => {
    const site = business.siteUrl.replace(/\/+$/, '');
    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'HousePainter',
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
    if (site) {
      data.url = site;
      data.image = `${site}/images/hero.jpg`;
    }
    if (isPhoneConfigured()) data.telephone = business.phone;
    if (isEmailConfigured()) data.email = business.email;
    const sameAs = Object.values(business.social).filter((u) => hasValue(u));
    if (sameAs.length) data.sameAs = sameAs;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
  return null;
}
