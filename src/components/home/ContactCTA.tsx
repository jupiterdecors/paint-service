import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { EnquiryForm } from '../contact/EnquiryForm';
import { ContactDetails } from '../contact/ContactDetails';

export function ContactCTA({ defaultService }: { defaultService?: string }) {
  return (
    <section id="enquiry" aria-labelledby="contact-title" className="scroll-mt-24 bg-sand py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            title="Let’s Give Your Space a Fresh Look"
            description="Tell us what you’d like painted and where. We’ll get back to you to discuss the work and prepare a quotation."
          />
          <div className="mt-10">
            <ContactDetails tone="sand" />
          </div>
        </div>
        <EnquiryForm defaultService={defaultService} />
      </Container>
    </section>
  );
}
