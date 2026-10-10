import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { Container } from '../components/ui/Container';
import { EnquiryForm } from '../components/contact/EnquiryForm';
import { ContactDetails } from '../components/contact/ContactDetails';
import { FAQ } from '../components/home/FAQ';
import { useSeo } from '../lib/seo';

export default function ContactPage() {
  const [params] = useSearchParams();
  useSeo('/contact');

  return (
    <>
      <PageHeader
        title="Let’s Give Your Space a Fresh Look"
        description="Share a few details about your project. We’ll get in touch to understand your requirements and prepare a quotation."
        crumbs={[{ label: 'Contact' }]}
      />
      <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24 py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <h2 id="enquiry-title" className="text-2xl font-bold tracking-[-0.01em]">
              Request a quotation
            </h2>
            <p className="mt-2 text-muted">Fields marked * are required.</p>
            <div className="mt-6">
              <EnquiryForm defaultService={params.get('service') ?? undefined} />
            </div>
          </div>
          <aside aria-labelledby="direct-title">
            <h2 id="direct-title" className="text-2xl font-bold tracking-[-0.01em]">
              Contact us directly
            </h2>
            <p className="mt-2 text-muted">Prefer to talk? Reach us on WhatsApp or by phone.</p>
            <div className="mt-6">
              <ContactDetails />
            </div>
          </aside>
        </Container>
      </section>
      <div className="border-t border-line">
        <FAQ />
      </div>
    </>
  );
}
