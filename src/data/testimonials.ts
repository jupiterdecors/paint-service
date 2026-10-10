/**
 * Customer reviews.
 *
 * Only add REAL reviews from real customers, with their permission.
 * While this list is empty, the testimonials section is hidden on the
 * site.
 *
 * Example:
 * {
 *   name: 'Customer name',
 *   area: 'Anna Nagar',
 *   service: 'Interior Painting',
 *   quote: 'What the customer said…',
 *   sourceUrl: 'https://g.page/…',   // optional link to the original review
 * }
 */
export interface Testimonial {
  name: string;
  quote: string;
  area?: string;
  service?: string;
  sourceUrl?: string;
}

export const testimonials: Testimonial[] = [];
