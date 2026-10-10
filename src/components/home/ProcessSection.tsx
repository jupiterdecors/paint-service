import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  { title: 'Tell us about your project', text: 'Share the service you need, your location and a few details through the enquiry form, WhatsApp or a call.' },
  { title: 'Discuss your requirements', text: 'We talk through the work, colours and finishes, and inspect the site if it’s needed to understand the job.' },
  { title: 'Receive a quotation', text: 'You get a quotation based on the scope of work we have agreed with you.' },
  { title: 'Schedule and complete', text: 'Once you approve, we agree on dates, complete the painting and walk through the finished work with you.' },
];

export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="py-20 sm:py-24">
      <Container>
        <SectionHeading id="process-title" title="How We Work" description="A simple, clear process from your first message to the final coat." />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-navy text-lg font-bold text-navy">
                  {i + 1}
                </span>
                {i < steps.length - 1 && <span aria-hidden className="hidden h-0.5 flex-1 bg-line lg:block" />}
              </div>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
