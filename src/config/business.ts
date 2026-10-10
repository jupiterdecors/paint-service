/**
 * ─────────────────────────────────────────────────────────────
 *  JUPITER DECORS — BUSINESS DETAILS
 *  This is the ONLY file you need to edit to update contact
 *  details across the whole website.
 *
 *  Leave a value as an empty string ('') or empty list ([]) if
 *  you don't have it yet. Anything left empty is simply hidden
 *  on the website — nothing fake is ever shown.
 * ─────────────────────────────────────────────────────────────
 */

export interface WorkingHours {
  /** e.g. 'Monday – Saturday' */
  days: string;
  /** e.g. '9:00 AM – 7:00 PM' */
  hours: string;
}

export interface BusinessConfig {
  name: string;
  city: string;
  state: string;
  country: string;
  /** ISO country code used for structured data. */
  countryCode: string;
  description: string;
  /** Phone number shown on the site and used for click-to-call, e.g. '+91 98765 43210'. */
  phone: string;
  /** WhatsApp number with country code, e.g. '+91 98765 43210'. Spaces are fine. */
  whatsapp: string;
  email: string;
  /** Street address. Leave empty if you prefer not to publish it. */
  address: string;
  /** PIN code, e.g. '600040'. */
  postalCode: string;
  /** A Google Maps share link for your location (optional). */
  googleMapsUrl: string;
  workingHours: WorkingHours[];
  /** Areas you have confirmed you serve, e.g. ['Anna Nagar', 'Velachery']. */
  serviceAreas: string[];
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  /** The live website address, e.g. 'https://www.jupiterdecors.in'. Needed for SEO. */
  siteUrl: string;
  /**
   * Formspree form ID (the part after /f/ in your form endpoint, e.g. 'xyzabcde').
   * When set, the enquiry form is emailed to you through Formspree instead of opening WhatsApp.
   */
  formspreeFormId: string;
}

export const business: BusinessConfig = {
  name: 'Jupiter Decors',
  city: 'Chennai',
  state: 'Tamil Nadu',
  country: 'India',
  countryCode: 'IN',
  description:
    'Jupiter Decors is a painting service in Chennai offering interior, exterior, new house painting, repainting, waterproofing and texture painting for homes and professional spaces.',

  // ── Fill these in before going live ──────────────────────────
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  postalCode: '',
  googleMapsUrl: '',
  workingHours: [],
  serviceAreas: [],
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
  siteUrl: 'https://jupiterdecors.in',
  formspreeFormId: 'xdeazdrp',
};

/* ───────────── helpers (no need to edit below) ───────────── */

export const hasValue = (v: string | unknown[]) => (Array.isArray(v) ? v.length > 0 : v.trim().length > 0);

export const isPhoneConfigured = () => business.phone.replace(/\D/g, '').length >= 10;
export const isWhatsAppConfigured = () => business.whatsapp.replace(/\D/g, '').length >= 10;
export const isEmailConfigured = () => /.+@.+\..+/.test(business.email);
export const isFormspreeConfigured = () => /^[A-Za-z0-9]{6,}$/.test(business.formspreeFormId.trim());

/** `tel:` link built from the configured phone number. */
export const telHref = () => `tel:${business.phone.replace(/[^\d+]/g, '')}`;

export const socialLinks = () =>
  (Object.entries(business.social) as [keyof BusinessConfig['social'], string][])
    .filter(([, url]) => hasValue(url))
    .map(([network, url]) => ({ network, url }));

/** Lists every business detail that is still empty. */
export function getMissingConfig(): string[] {
  const missing: string[] = [];
  if (!isPhoneConfigured()) missing.push('phone — phone number for the call buttons');
  if (!isWhatsAppConfigured()) missing.push('whatsapp — WhatsApp number for enquiries');
  if (!isEmailConfigured()) missing.push('email — business email address');
  if (!hasValue(business.address)) missing.push('address — business address (optional)');
  if (!hasValue(business.workingHours)) missing.push('workingHours — opening hours');
  if (!hasValue(business.serviceAreas)) missing.push('serviceAreas — confirmed Chennai areas you serve');
  if (!hasValue(business.siteUrl)) missing.push('siteUrl — live website address (for SEO, sitemap)');
  return missing;
}
