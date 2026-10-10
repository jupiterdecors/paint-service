import { Container } from '../components/ui/Container';
import { ButtonLink } from '../components/ui/Button';
import { useSeo } from '../lib/seo';

export default function NotFoundPage() {
  useSeo('/404');
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold text-terracotta-ink">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">This page doesn’t exist</h1>
        <p className="mt-4 text-lg text-muted">The link may be broken or the page may have moved. Go back to the homepage or browse our services.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/" variant="primary" size="lg">
            Go to homepage
          </ButtonLink>
          <ButtonLink to="/services" variant="outline" size="lg">
            View services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
