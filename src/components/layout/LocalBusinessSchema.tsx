import { useEffect } from 'react';
import { businessSchema } from '../../lib/schema';

/** Site-wide local business structured data (replaces the build-time copy, if any). */
export function LocalBusinessSchema() {
  useEffect(() => {
    document.head.querySelectorAll('script[data-schema="business"]').forEach((s) => s.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.schema = 'business';
    script.text = JSON.stringify(businessSchema());
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
  return null;
}
