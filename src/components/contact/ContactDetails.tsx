import { Clock, Mail, MapPin } from 'lucide-react';
import { business, hasValue, isEmailConfigured, isPhoneConfigured, isWhatsAppConfigured } from '../../config/business';
import { WhatsAppButton } from './WhatsAppButton';
import { CallButton } from './CallButton';

/** WhatsApp and call buttons plus location, email and hours — all from the business config. */
export function ContactDetails({ tone = 'light' }: { tone?: 'light' | 'sand' }) {
  const hasDirect = isWhatsAppConfigured() || isPhoneConfigured();
  return (
    <div>
      {hasDirect && (
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <WhatsAppButton className="w-full sm:w-auto" />
          <CallButton className="w-full sm:w-auto" />
        </div>
      )}

      <dl className={`${hasDirect ? 'mt-8' : ''} space-y-5 rounded-2xl p-6 ${tone === 'sand' ? 'bg-white' : 'bg-sand'}`}>
        <div className="flex gap-4">
          <dt>
            <MapPin aria-label="Location" className="size-5 text-terracotta-ink" />
          </dt>
          <dd>
            <address className="not-italic text-ink">
              {hasValue(business.address) && <span className="block">{business.address}</span>}
              {business.city}, {business.state}
              {hasValue(business.postalCode) && ` ${business.postalCode}`}, {business.country}
            </address>
            {hasValue(business.googleMapsUrl) && (
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-semibold text-navy underline underline-offset-4 hover:text-terracotta-ink"
              >
                View on Google Maps
              </a>
            )}
          </dd>
        </div>
        {isEmailConfigured() && (
          <div className="flex gap-4">
            <dt>
              <Mail aria-label="Email" className="size-5 text-terracotta-ink" />
            </dt>
            <dd>
              <a href={`mailto:${business.email}`} className="break-all font-medium text-navy hover:underline">
                {business.email}
              </a>
            </dd>
          </div>
        )}
        {hasValue(business.workingHours) && (
          <div className="flex gap-4">
            <dt>
              <Clock aria-label="Working hours" className="size-5 text-terracotta-ink" />
            </dt>
            <dd className="space-y-0.5 text-ink">
              {business.workingHours.map((w) => (
                <p key={w.days}>
                  <span className="font-medium">{w.days}:</span> {w.hours}
                </p>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
