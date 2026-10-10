import type { EnquiryDetails } from './whatsapp';

export type EnquiryErrors = Partial<Record<keyof EnquiryDetails, string>>;

/** Accepts Indian mobile and landline numbers, with or without +91 / 0. */
export function isValidIndianPhone(value: string): boolean {
  let digits = value.replace(/[\s\-().]/g, '');
  if (!/^\+?\d+$/.test(digits)) return false;
  digits = digits.replace(/^\+/, '');
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return /^\d{10}$/.test(digits) && !digits.startsWith('0');
}

export function validateEnquiry(d: EnquiryDetails): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = d.name.trim();
  if (!name) errors.name = 'Enter your name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 80) errors.name = 'Name must be 80 characters or fewer.';

  if (!d.phone.trim()) errors.phone = 'Enter your phone number.';
  else if (!isValidIndianPhone(d.phone)) errors.phone = 'Enter a 10-digit phone number, for example 98765 43210.';

  if (!d.service.trim()) errors.service = 'Choose the service you need.';

  const location = d.location.trim();
  if (!location) errors.location = 'Enter the area or locality of your project.';
  else if (location.length > 120) errors.location = 'Location must be 120 characters or fewer.';

  if (d.message.trim().length > 1000) errors.message = 'Project details must be 1,000 characters or fewer.';
  return errors;
}

/**
 * Sends the enquiry to Formspree (https://formspree.io/f/<id>), which emails it to the business.
 * Resolves on success; throws with Formspree's error message otherwise.
 */
export async function submitToFormspree(formId: string, d: EnquiryDetails, honeypot = ''): Promise<void> {
  const res = await fetch(`https://formspree.io/f/${encodeURIComponent(formId.trim())}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: d.name.trim(),
      phone: d.phone.trim(),
      service: d.service.trim(),
      location: d.location.trim(),
      message: d.message.trim(),
      _subject: `Painting enquiry: ${d.service.trim()} — ${d.location.trim()}`,
      _gotcha: honeypot,
    }),
  });
  if (res.ok) return;
  let detail = '';
  try {
    const data = (await res.json()) as { errors?: { message?: string }[]; error?: string };
    detail = data.errors?.map((e) => e.message).filter(Boolean).join(' ') || data.error || '';
  } catch {
    /* non-JSON error body */
  }
  throw new Error(detail || `Request failed (${res.status})`);
}
