import { MapPin } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';
import { business, hasValue } from '../../config/business';

export function ServiceAreas() {
  const areas = business.serviceAreas;
  return (
    <section aria-labelledby="areas-title" className="bg-navy py-20 text-white sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <h2 id="areas-title" className="text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl">
            A Chennai-based painting service
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
            {business.name} works on homes, apartments and professional spaces in {business.city}.{' '}
            {hasValue(areas)
              ? 'These are some of the areas we currently serve. If your locality isn’t listed, ask us — we’ll let you know if we can help.'
              : 'Tell us your locality when you enquire and we’ll confirm whether we can take on your project.'}
          </p>
          <ButtonLink to="/contact" variant="accent" size="lg" className="mt-8 w-full sm:w-auto">
            Check your area
          </ButtonLink>
        </div>
        {hasValue(areas) ? (
          <ul className="flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-[15px]">
                <MapPin aria-hidden className="size-4 text-terracotta" />
                {a}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-5 rounded-2xl border border-white/15 p-7">
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-white/10">
              <MapPin aria-hidden className="size-7 text-terracotta" />
            </span>
            <p className="text-lg text-white/85">
              Based in {business.city}, {business.state}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
