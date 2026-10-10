import { business } from '../config/business';

export interface EnquiryDetails {
  name: string;
  phone: string;
  service: string;
  location: string;
  message: string;
}

/**
 * Converts a phone number in any common format into the digits-only
 * international format WhatsApp expects (e.g. '919876543210').
 * A 10-digit Indian number gets the 91 country code added.
 */
export function toWhatsAppDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
}

export function buildEnquiryMessage(d: EnquiryDetails): string {
  const lines = [
    `Hello ${business.name}, I would like a painting quotation.`,
    '',
    `Name: ${d.name.trim()}`,
    `Phone: ${d.phone.trim()}`,
    `Service: ${d.service.trim()}`,
    `Project location: ${d.location.trim()}`,
  ];
  if (d.message.trim()) {
    lines.push('', 'Project requirements:', d.message.trim());
  }
  return lines.join('\n');
}

/** Official WhatsApp click-to-chat link with the message URL-encoded. */
export function buildWhatsAppUrl(text?: string, number: string = business.whatsapp): string {
  const base = `https://wa.me/${toWhatsAppDigits(number)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function buildMailtoUrl(text: string, subject: string, email: string = business.email): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}
