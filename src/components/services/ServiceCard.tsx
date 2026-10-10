import { Link } from 'react-router-dom';
import type { Service } from '../../data/services';
import { SmartImage } from '../ui/SmartImage';

export function ServiceCard({ service, headingLevel = 'h3' }: { service: Service; headingLevel?: 'h2' | 'h3' }) {
  const Icon = service.icon;
  const Heading = headingLevel;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-200 hover:shadow-[0_20px_40px_-24px_rgba(23,54,83,0.35)]">
      <Link to={`/services/${service.slug}`} tabIndex={-1} aria-hidden className="block overflow-hidden">
        <SmartImage
          src={service.image}
          alt={service.imageAlt}
          aspect="aspect-[3/2]"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-lg bg-sand text-navy">
            <Icon aria-hidden className="size-5" />
          </span>
          <Heading className="text-xl font-bold tracking-[-0.01em]">
            <Link to={`/services/${service.slug}`} className="hover:text-terracotta-ink">
              {service.name}
            </Link>
          </Heading>
        </div>
        <p className="mt-4 flex-1 leading-relaxed text-muted">{service.summary}</p>
        <div className="mt-6 flex items-center gap-2 border-t border-line pt-5">
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex min-h-11 items-center rounded-md px-1 font-semibold text-navy underline-offset-4 hover:underline"
            aria-label={`Learn more about ${service.name}`}
          >
            Learn More
          </Link>
          <Link
            to={`/contact?service=${service.slug}#enquiry`}
            className="ml-auto inline-flex min-h-11 items-center rounded-lg bg-sand px-4 font-semibold text-terracotta-ink transition-colors hover:bg-sand-deep"
            aria-label={`Enquire now about ${service.name}`}
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </article>
  );
}
