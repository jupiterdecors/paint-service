import { Hero } from '../components/home/Hero';
import { ServicesSection } from '../components/home/ServicesSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ProjectGallery } from '../components/home/ProjectGallery';
import { ProcessSection } from '../components/home/ProcessSection';
import { Testimonials } from '../components/home/Testimonials';
import { ServiceAreas } from '../components/home/ServiceAreas';
import { FAQ } from '../components/home/FAQ';
import { ContactCTA } from '../components/home/ContactCTA';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ButtonLink } from '../components/ui/Button';
import { useSeo } from '../lib/seo';

export default function HomePage() {
  useSeo('/');

  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <section aria-labelledby="work-title" className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="work-title"
              title="See the Difference"
              description="A look at interior, exterior, texture and waterproofing work."
            />
            <ButtonLink to="/projects" variant="outline" className="shrink-0 self-start sm:self-auto">
              View all projects
            </ButtonLink>
          </div>
          <div className="mt-10">
            <ProjectGallery limit={6} />
          </div>
        </Container>
      </section>
      <ProcessSection />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      <ContactCTA />
    </>
  );
}
