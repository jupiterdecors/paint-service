import { ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { faqs } from '../../data/faqs';

export function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          id="faq-title"
          title="Frequently Asked Questions"
          description="Answers to common questions about our services and how to request a quotation."
        />
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.question} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
