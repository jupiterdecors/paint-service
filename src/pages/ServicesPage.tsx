import { PageHeader } from '../components/ui/PageHeader';
import { Container } from '../components/ui/Container';
import { ServiceCard } from '../components/services/ServiceCard';
import { ProcessSection } from '../components/home/ProcessSection';
import { ContactCTA } from '../components/home/ContactCTA';
import { services } from '../data/services';
import { useSeo } from '../lib/seo';

export default function ServicesPage() {
  useSeo('/services');

  return (
    <>
      <PageHeader
        title="Painting services for homes and professional spaces"
        description="Whether you’re painting a new home, refreshing a single room or fixing a damp wall, choose a service to see how we approach the work."
        crumbs={[{ label: 'Services' }]}
      />
      <section aria-label="All services" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} headingLevel="h2" />
            ))}
          </div>
        </Container>
      </section>
      <div className="border-t border-line">
        <ProcessSection />
      </div>
      <ContactCTA />
    </>
  );
}
