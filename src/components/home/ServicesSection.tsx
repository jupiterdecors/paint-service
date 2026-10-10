import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceCard } from '../services/ServiceCard';
import { services } from '../../data/services';

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="services-title"
          title="Painting Solutions for Every Space"
          description="From new homes to refreshing existing spaces, find the right painting service for your needs."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
