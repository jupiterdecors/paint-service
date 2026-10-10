import { Link } from 'react-router-dom';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { SmartImage } from '../ui/SmartImage';
import { services } from '../../data/services';

const swatches = [
  { name: 'Harbour navy', hex: '#173653' },
  { name: 'Terracotta', hex: '#D97745' },
  { name: 'Warm linen', hex: '#F5F1E8' },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[36%] bg-sand lg:block" />
      <Container className="relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="motion-safe:animate-rise">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-terracotta-ink">
            Professional painting services in Chennai
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.9rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem]"
          >
            Bring Your Walls to Life.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            Quality painting for beautiful homes and professional spaces. From a fresh coat of paint to a complete
            home transformation, Jupiter Decors is here to help.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/contact" variant="accent" size="lg" className="w-full sm:w-auto">
              Get a Free Quote
            </ButtonLink>
            <ButtonLink to="/services" variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Our Services
            </ButtonLink>
          </div>

          <nav aria-label="Popular services" className="mt-10 border-t border-line pt-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="font-medium text-navy underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-terracotta"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="relative lg:pl-4">
          <SmartImage
            src="/images/hero.jpg"
            alt="Painter applying a fresh coat of paint to the wall of a bright Chennai home"
            aspect="aspect-[4/3] lg:aspect-[4/5]"
            className="rounded-[28px] shadow-[0_30px_60px_-30px_rgba(23,54,83,0.45)]"
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
          />
          {/* Paint chip card — echoes a shade card from a paint shop */}
          <div className="absolute -bottom-6 left-4 flex items-stretch overflow-hidden rounded-xl bg-white shadow-[0_18px_40px_-18px_rgba(23,54,83,0.5)] sm:left-[-1.5rem]">
            <div className="flex">
              {swatches.map((s) => (
                <span key={s.hex} className="w-7 sm:w-9" style={{ background: s.hex }} title={s.name} />
              ))}
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-navy">Colour advice for every room</p>
              <p className="text-xs text-muted">Shades and finishes chosen with you</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
