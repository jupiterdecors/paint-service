import { PageHeader } from '../components/ui/PageHeader';
import { Container } from '../components/ui/Container';
import { ProjectGallery } from '../components/home/ProjectGallery';
import { ButtonLink } from '../components/ui/Button';
import { useSeo } from '../lib/seo';

export default function ProjectsPage() {
  useSeo({
    title: 'Our Work — Painting Projects',
    description:
      'Browse Jupiter Decors painting projects in Chennai: interior painting, exterior painting, repainting, texture finishes and waterproofing.',
    path: '/projects',
  });

  return (
    <>
      <PageHeader
        title="See the Difference"
        description="Browse our work by category. Select any photo to see it larger, and use the arrow keys to move between photos."
        crumbs={[{ label: 'Our Work' }]}
      />
      <section aria-label="Project gallery" className="py-14 sm:py-16">
        <Container>
          <ProjectGallery />
        </Container>
      </section>
      <section className="border-t border-line py-16">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.01em]">Have a space that needs a fresh look?</h2>
            <p className="mt-2 text-muted">Tell us about your project and we’ll prepare a quotation.</p>
          </div>
          <ButtonLink to="/contact" variant="accent" size="lg" className="w-full sm:w-auto">
            Request a quotation
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
