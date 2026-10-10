import { Phone } from 'lucide-react';
import { business, isPhoneConfigured, telHref } from '../../config/business';
import { ButtonAnchor } from '../ui/Button';

/** Click-to-call button. Renders nothing until a phone number is configured. */
export function CallButton({ className = '' }: { className?: string }) {
  if (!isPhoneConfigured()) return null;
  return (
    <ButtonAnchor href={telHref()} variant="outline" size="lg" className={className}>
      <Phone aria-hidden className="size-5" /> Call {business.phone}
    </ButtonAnchor>
  );
}
