import { PageHeader } from '../components/ui/PageHeader';
import { Container } from '../components/ui/Container';
import { SmartImage } from '../components/ui/SmartImage';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ServiceAreas } from '../components/home/ServiceAreas';
import { ButtonLink } from '../components/ui/Button';
import { business } from '../config/business';
import { services } from '../data/services';
import { useSeo } from '../lib/seo';

export default function AboutPage() {
  useSeo('/about');

  return (
    <>
      <PageHeader title="About Jupiter Decors" crumbs={[{ label: 'About Us' }]} />

      <section aria-labelledby="story-title" className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 id="story-title" className="text-3xl font-bold tracking-[-0.02em]">
              Painting that respects your home
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/90">
              <p>
                {business.name} is a painting service based in {business.city}, {business.state}. We paint homes,
                apartments and professional spaces — from a single room that needs refreshing to a complete new house.
              </p>
              <p>
                Our approach is simple: understand what you want, prepare the surface properly, use paints and coatings
                that suit the job, and keep you informed as the work progresses. We treat every home as if it were our
                own, with care for your furniture, floors and daily routine.
              </p>
              <p>
                We offer {services.map((s) => s.name.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' and $1')}.
              </p>
            </div>
            <ButtonLink to="/contact" variant="accent" size="lg" className="mt-8 w-full sm:w-auto">
              Talk to us about your project
            </ButtonLink>
          </div>
          <SmartImage
            src="/images/about.jpg"
            alt="Two painters in protective gear painting interior walls"
            aspect="aspect-[4/3]"
            className="rounded-2xl"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </Container>
      </section>

      <WhyChooseUs />
      <ServiceAreas />
    </>
  );
}
