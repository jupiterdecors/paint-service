import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from './Logo';
import { navItems } from './navigation';
import { services } from '../../data/services';
import { business, hasValue, isEmailConfigured, isPhoneConfigured, socialLinks, telHref } from '../../config/business';

const socialLabel: Record<string, string> = { instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube' };

export function Footer() {
  const year = new Date().getFullYear();
  const socials = socialLinks();

  return (
    <footer className="bg-navy text-white/80">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-sm leading-relaxed text-white/70">
            Interior and exterior painting, waterproofing and texture finishes for homes and professional spaces in{' '}
            {business.city}.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4">
              {socials.map((s) => (
                <li key={s.network}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:underline">
                    {socialLabel[s.network]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-white hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-white hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-3.5">
            {isPhoneConfigured() && (
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-[18px] shrink-0 text-terracotta" />
                <a href={telHref()} className="hover:text-white hover:underline">
                  {business.phone}
                </a>
              </li>
            )}
            {isEmailConfigured() && (
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-[18px] shrink-0 text-terracotta" />
                <a href={`mailto:${business.email}`} className="break-all hover:text-white hover:underline">
                  {business.email}
                </a>
              </li>
            )}
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-[18px] shrink-0 text-terracotta" />
              <address className="not-italic">
                {hasValue(business.address) && <span className="block">{business.address}</span>}
                {business.city}, {business.state}
                {hasValue(business.postalCode) && ` ${business.postalCode}`}
              </address>
            </li>
            {business.workingHours.map((w) => (
              <li key={w.days} className="flex gap-3">
                <Clock aria-hidden className="mt-0.5 size-[18px] shrink-0 text-terracotta" />
                <span>
                  {w.days}: {w.hours}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="mt-6 inline-block font-semibold text-white underline-offset-4 hover:underline">
            Request a quotation
          </Link>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p>Painting services in {business.city}, {business.state}</p>
        </Container>
      </div>
    </footer>
  );
}
