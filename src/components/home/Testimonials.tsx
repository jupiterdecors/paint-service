import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '../../data/testimonials';

/**
 * Shows real customer reviews from src/data/testimonials.ts.
 * With no reviews: hidden on the live site; a labelled placeholder appears only during development.
 */
export function Testimonials() {
  if (testimonials.length === 0) {
    if (!import.meta.env.DEV) return null;
    return (
      <section aria-label="Customer reviews placeholder" className="py-16">
        <Container>
          <div className="rounded-2xl border-2 border-dashed border-line p-8 text-center">
            <p className="font-semibold text-navy">Customer reviews section (placeholder)</p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
              Add real customer reviews in src/data/testimonials.ts and this section will appear. It is hidden on the
              live website until then. This notice only shows while developing.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section aria-labelledby="testimonials-title" className="bg-sand py-20 sm:py-24">
      <Container>
        <SectionHeading id="testimonials-title" title="What Our Customers Say" />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={`${t.name}-${t.quote.slice(0, 20)}`}>
              <figure className="flex h-full flex-col rounded-2xl bg-white p-7">
                <blockquote className="flex-1 text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-semibold text-navy">{t.name}</p>
                  {(t.area || t.service) && (
                    <p className="text-sm text-muted">{[t.service, t.area].filter(Boolean).join(', ')}</p>
                  )}
                  {t.sourceUrl && (
                    <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-medium text-terracotta-ink hover:underline">
                      Read the original review
                    </a>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
