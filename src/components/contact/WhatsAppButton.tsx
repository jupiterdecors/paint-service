import { business, isWhatsAppConfigured } from '../../config/business';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import { ButtonAnchor } from '../ui/Button';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Opens a WhatsApp chat with Jupiter Decors. Renders nothing until a WhatsApp number is configured. */
export function WhatsAppButton({ className = '', label = 'Chat on WhatsApp' }: { className?: string; label?: string }) {
  if (!isWhatsAppConfigured()) return null;
  const greeting = `Hello ${business.name}, I'd like to enquire about painting work.`;
  return (
    <ButtonAnchor
      href={buildWhatsAppUrl(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
      size="lg"
      className={className}
    >
      <WhatsAppIcon /> {label}
    </ButtonAnchor>
  );
}
