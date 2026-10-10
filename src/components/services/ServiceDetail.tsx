import { Check } from 'lucide-react';
import type { Service } from '../../data/services';
import { services } from '../../data/services';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';
import { SmartImage } from '../ui/SmartImage';
import { PageHeader } from '../ui/PageHeader';
import { ServiceCard } from './ServiceCard';
import { WhatsAppButton } from '../contact/WhatsAppButton';

/** Shared layout for every service page — content comes from src/data/services.ts. */
export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader title={service.headline} crumbs={[{ label: 'Services', to: '/services' }, { label: service.name }]}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={`/contact?service=${service.slug}#enquiry`} variant="accent" size="lg" className="w-full sm:w-auto">
            Request a quotation
          </ButtonLink>
          <WhatsAppButton className="w-full sm:w-auto" label="Ask on WhatsApp" />
        </div>
      </PageHeader>

      <section aria-labelledby="overview-title" className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-sand text-navy">
                <Icon aria-hidden className="size-6" />
              </span>
              <h2 id="overview-title" className="text-2xl font-bold tracking-[-0.01em]">
                {service.name}
              </h2>
            </div>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/90">
              {service.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-10 text-base font-semibold">Suitable for</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {service.suitableFor.map((s) => (
                <li key={s} className="flex items-start gap-2 text-ink">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-terracotta-ink" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <SmartImage
            src={service.image}
            alt={service.imageAlt}
            aspect="aspect-[4/3]"
            className="rounded-2xl"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </Container>
      </section>

      <section aria-labelledby="benefits-title" className="bg-sand py-16 sm:py-20">
        <Container>
          <h2 id="benefits-title" className="text-3xl font-bold tracking-[-0.02em]">
            What you can expect
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <li key={b.title} className="border-l-2 border-terracotta pl-5">
                <h3 className="text-lg font-bold">{b.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="prep-title" className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 id="prep-title" className="text-3xl font-bold tracking-[-0.02em]">
              How we prepare and paint
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
              The exact steps depend on the condition of your walls, and we confirm them with you before work begins.
            </p>
            <SmartImage
              src={service.detailImage}
              alt={service.detailImageAlt}
              aspect="aspect-[4/3]"
              className="mt-8 rounded-2xl"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <ol className="space-y-0">
            {service.preparation.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                {i < service.preparation.length - 1 && (
                  <span aria-hidden className="absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-0.5 bg-line" />
                )}
                <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-navy font-bold text-white">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="quote-title" className="bg-navy py-16 text-white">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="quote-title" className="text-3xl font-bold tracking-[-0.02em] text-white">
              Planning {service.name.toLowerCase()}?
            </h2>
            <p className="mt-3 text-lg text-white/75">
              Share a few details about your space and we’ll get in touch to discuss the work and prepare a quotation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={`/contact?service=${service.slug}#enquiry`} variant="accent" size="lg" className="w-full sm:w-auto">
              Request a quotation
            </ButtonLink>
            <WhatsAppButton className="w-full sm:w-auto" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="other-title" className="py-16 sm:py-20">
        <Container>
          <h2 id="other-title" className="text-3xl font-bold tracking-[-0.02em]">
            Other services
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
