import { ClipboardList, MessagesSquare, Paintbrush, Ruler, ShieldCheck } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { SmartImage } from '../ui/SmartImage';

const points = [
  { icon: Ruler, title: 'Preparation comes first', text: 'Cracks, flaking paint and uneven patches are dealt with before the first coat, and edges are finished cleanly.' },
  { icon: ClipboardList, title: 'Planned around your needs', text: 'Colours, finishes and the order of work are decided with you, for your home or workspace.' },
  { icon: MessagesSquare, title: 'Clear communication', text: 'You know what will be done, what to expect each day and who to speak to with questions.' },
  { icon: Paintbrush, title: 'The right paint for the job', text: 'We recommend paints and coatings that suit each surface, room and level of exposure.' },
  { icon: ShieldCheck, title: 'Careful, organised work', text: 'Furniture and floors are protected, materials are kept tidy and the site is cleaned up afterwards.' },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-sand py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="why-title"
            title="Quality in Every Coat"
            description="A good paint job is mostly the work you don’t see: the preparation, the planning and the care taken around your home."
          />
          <SmartImage
            src="/images/why-choose-us.jpg"
            alt="Painter applying masking tape along the ceiling edge before painting"
            aspect="aspect-[4/3]"
            className="mt-10 rounded-2xl"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
        <ul className="divide-y divide-line self-center">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-terracotta-ink">
                <Icon aria-hidden className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
