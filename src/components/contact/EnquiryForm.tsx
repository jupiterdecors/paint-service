import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, Loader2, Mail, Send } from 'lucide-react';
import { services } from '../../data/services';
import { business, isEmailConfigured, isFormspreeConfigured, isWhatsAppConfigured } from '../../config/business';
import { buildEnquiryMessage, buildMailtoUrl, buildWhatsAppUrl, type EnquiryDetails } from '../../lib/whatsapp';
import { submitToFormspree, validateEnquiry, type EnquiryErrors } from '../../lib/enquiry';
import { Button } from '../ui/Button';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ServiceSelect, type SelectOption } from './ServiceSelect';

const NOT_SURE = 'Not sure yet — I need advice';
const fieldOrder: (keyof EnquiryDetails)[] = ['name', 'phone', 'service', 'location', 'message'];
const serviceOptions: SelectOption[] = [
  ...services.map((s) => ({ value: s.name, label: s.name, icon: s.icon })),
  { value: NOT_SURE, label: NOT_SURE, icon: HelpCircle },
];

interface Props {
  /** Service slug to preselect, e.g. from /contact?service=waterproofing */
  defaultService?: string;
}

/**
 * Enquiry form. If a Formspree form ID is configured, the enquiry is posted to Formspree,
 * which emails it to the business. Otherwise it prepares a WhatsApp message (or, if no
 * WhatsApp number is set, an email) that the customer then sends themselves.
 */
export function EnquiryForm({ defaultService }: Props) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const preset = services.find((s) => s.slug === defaultService)?.name ?? '';
  const [values, setValues] = useState<EnquiryDetails>({ name: '', phone: '', service: preset, location: '', message: '' });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const channel: 'formspree' | 'whatsapp' | 'email' | null = isFormspreeConfigured()
    ? 'formspree'
    : isWhatsAppConfigured()
      ? 'whatsapp'
      : isEmailConfigured()
        ? 'email'
        : null;
  const id = (f: string) => `${uid}-${f}`;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setField(e.target.name as keyof EnquiryDetails, e.target.value);

  const setField = (name: keyof EnquiryDetails, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    setPreparedUrl(null);
    setSendError(null);
    setSent(false);
    if (submitted) setErrors(validateEnquiry(next));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateEnquiry(values);
    setErrors(errs);
    const firstInvalid = fieldOrder.find((f) => errs[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    if (!channel) return;

    if (channel === 'formspree') {
      setSending(true);
      setSendError(null);
      try {
        await submitToFormspree(business.formspreeFormId, values, honeypot);
        setSent(true);
        setSubmitted(false);
        setValues({ name: '', phone: '', service: '', location: '', message: '' });
      } catch (err) {
        setSendError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setSending(false);
      }
      return;
    }

    const text = buildEnquiryMessage(values);
    const url =
      channel === 'whatsapp'
        ? buildWhatsAppUrl(text)
        : buildMailtoUrl(text, `Painting enquiry: ${values.service} — ${values.location.trim()}`);
    setPreparedUrl(url);
    if (channel === 'whatsapp') window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  };

  const errorCount = Object.keys(errors).length;
  const inputBase =
    'mt-2 block w-full rounded-lg border bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15';
  const borderFor = (f: keyof EnquiryDetails) => (errors[f] ? 'border-red-600' : 'border-line hover:border-navy/30');

  const field = (f: keyof EnquiryDetails) => ({
    id: id(f),
    name: f,
    value: values[f],
    onChange,
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? id(`${f}-error`) : undefined,
  });

  const ErrorText = ({ f }: { f: keyof EnquiryDetails }) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
        <AlertCircle aria-hidden className="size-4 shrink-0" />
        {errors[f]}
      </p>
    ) : null;

  const Label = ({ f, children, optional }: { f: string; children: string; optional?: boolean }) => (
    <label htmlFor={id(f)} className="block text-[15px] font-semibold text-navy">
      {children} {optional ? <span className="font-normal text-muted">(optional)</span> : <span aria-hidden className="text-terracotta-ink">*</span>}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 sm:p-8" aria-describedby={channel ? id('how') : undefined}>
      {submitted && errorCount > 0 && (
        <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Please fix {errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`} to continue.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label f="name">Your name</Label>
          <input type="text" autoComplete="name" maxLength={80} className={`${inputBase} ${borderFor('name')} min-h-12`} {...field('name')} />
          <ErrorText f="name" />
        </div>
        <div>
          <Label f="phone">Phone number</Label>
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" maxLength={20} className={`${inputBase} ${borderFor('phone')} min-h-12`} {...field('phone')} />
          <ErrorText f="phone" />
        </div>
        <div>
          <Label f="service">Service needed</Label>
          <ServiceSelect
            id={id('service')}
            name="service"
            value={values.service}
            options={serviceOptions}
            placeholder="Select a service"
            onChange={(v) => setField('service', v)}
            invalid={!!errors.service}
            describedBy={errors.service ? id('service-error') : undefined}
            className={borderFor('service')}
          />
          <ErrorText f="service" />
        </div>
        <div>
          <Label f="location">Project location</Label>
          <input type="text" autoComplete="address-level3" placeholder="e.g. Adyar, Chennai" maxLength={120} className={`${inputBase} ${borderFor('location')} min-h-12`} {...field('location')} />
          <ErrorText f="location" />
        </div>
        <div className="sm:col-span-2">
          <Label f="message" optional>
            Project requirements
          </Label>
          <textarea rows={4} maxLength={1000} placeholder="Rooms or areas, approximate size, preferred timing, any damp or cracks…" className={`${inputBase} ${borderFor('message')} py-3`} {...field('message')} />
          <ErrorText f="message" />
        </div>
      </div>

      {/* Spam trap: hidden from people, filled in by bots. Formspree discards submissions where it is set. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" />

      <div className="mt-6">
        {channel === 'formspree' ? (
          <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" disabled={sending} aria-busy={sending || undefined}>
            {sending ? <Loader2 aria-hidden className="size-5 animate-spin" /> : <Send aria-hidden className="size-5" />}
            {sending ? 'Sending…' : 'Send enquiry'}
          </Button>
        ) : channel ? (
          <Button type="submit" variant={channel === 'whatsapp' ? 'whatsapp' : 'primary'} size="lg" className="w-full sm:w-auto">
            {channel === 'whatsapp' ? <WhatsAppIcon /> : <Mail aria-hidden className="size-5" />}
            {channel === 'whatsapp' ? 'Continue to WhatsApp' : 'Continue to email'}
          </Button>
        ) : (
          <p role="note" className="rounded-lg bg-sand px-4 py-3 text-sm text-ink">
            Online enquiries will be available soon. Contact details for {business.name} are being added.
          </p>
        )}
        {channel && (
          <p id={id('how')} className="mt-3 text-sm leading-relaxed text-muted">
            {channel === 'formspree'
              ? 'We’ll receive your enquiry by email and get back to you on the phone number you provide.'
              : channel === 'whatsapp'
              ? 'This opens WhatsApp with your enquiry already written. Your message is only sent to us when you tap Send in WhatsApp.'
              : 'This opens your email app with your enquiry already written. Your message is only sent to us when you send the email.'}
          </p>
        )}
      </div>

      {sent && (
        <div role="status" className="mt-6 flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
          <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">Thank you — your enquiry has been sent.</p>
            <p className="mt-1">We’ll contact you shortly on the phone number you shared.</p>
          </div>
        </div>
      )}

      {sendError && (
        <div role="alert" className="mt-6 flex gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">Sorry, your enquiry couldn’t be sent.</p>
            <p className="mt-1">
              {sendError} Please try again
              {isWhatsAppConfigured() ? (
                <>
                  {' '}or{' '}
                  <a href={buildWhatsAppUrl(buildEnquiryMessage(values))} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    send it on WhatsApp
                  </a>
                </>
              ) : null}
              .
            </p>
          </div>
        </div>
      )}

      {preparedUrl && (
        <div role="status" className="mt-6 flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
          <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">
              Your message is ready in {channel === 'whatsapp' ? 'WhatsApp' : 'your email app'}.
            </p>
            <p className="mt-1">
              We haven’t received it yet — please {channel === 'whatsapp' ? 'tap Send in WhatsApp' : 'send the email'} to
              complete your enquiry.{' '}
              <a href={preparedUrl} target={channel === 'whatsapp' ? '_blank' : undefined} rel="noopener noreferrer" className="font-semibold underline">
                {channel === 'whatsapp' ? 'Open WhatsApp again' : 'Open email again'}
              </a>
            </p>
          </div>
        </div>
      )}
    </form>
  );
}
