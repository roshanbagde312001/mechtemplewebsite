import React, { useMemo, useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND, COMPANY, CONTACT_INTERESTS, CONTACT_TIMELINES, PAGE_IMAGES, QUESTIONS } from '../content';
import { Link } from '../router';
import { Pill } from '../ui';
import { Block, PageHero, usePageMeta } from './Layout';

type Fields = { name: string; email: string; company: string; phone: string; interest: string; timeline: string; message: string };

// The site has no mail backend: submitting composes the enquiry in the visitor's own email app (stated next to the button).
export function ContactPage() {
  usePageMeta('Contact', `Contact ${BRAND} about software, AI, automation or data projects.`);
  const initialInterest = useMemo(() => {
    const wanted = new URLSearchParams(window.location.search).get('interest') ?? '';
    return wanted;
  }, []);
  const [fields, setFields] = useState<Fields>({ name: '', email: '', company: '', phone: '', interest: initialInterest, timeline: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (!fields.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Please enter a valid email address.';
    if (fields.message.trim().length < 10) next.message = 'Please describe what you need (a sentence or two is fine).';
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `Project enquiry${fields.interest ? ` – ${fields.interest}` : ''} – ${fields.name.trim()}`;
    const details = [
      `Name: ${fields.name.trim()}`,
      `Email: ${fields.email.trim()}`,
      fields.company.trim() ? `Company: ${fields.company.trim()}` : '',
      fields.phone.trim() ? `Phone: ${fields.phone.trim()}` : '',
      fields.interest ? `Interested in: ${fields.interest}` : '',
      fields.timeline ? `Timeline: ${fields.timeline}` : '',
    ].filter(Boolean);
    const body = `${details.join('\n')}\n\n${fields.message.trim()}`;
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const interests = initialInterest && !CONTACT_INTERESTS.includes(initialInterest) ? [initialInterest, ...CONTACT_INTERESTS] : CONTACT_INTERESTS;

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        label="Contact us"
        title={'Let\'s talk about\nwhat you need.'}
        image={PAGE_IMAGES.contact}
        intro={<p>Tell us about the problem you want to solve. We will reply with questions, an honest view of what technology can and cannot do for it, and a suggested next step.</p>}
      />

      <Block className="contact">
        <div className="contact__grid">
          <form className="form glass" onSubmit={submit} noValidate data-rv>
            <h2>Send an enquiry</h2>
            <div className="form__row">
              <Field label="Your name" required error={errors.name}><input value={fields.name} onChange={update('name')} autoComplete="name" required /></Field>
              <Field label="Email" required error={errors.email}><input type="email" value={fields.email} onChange={update('email')} autoComplete="email" required /></Field>
            </div>
            <div className="form__row">
              <Field label="Company or organisation"><input value={fields.company} onChange={update('company')} autoComplete="organization" /></Field>
              <Field label="Phone (optional)"><input type="tel" value={fields.phone} onChange={update('phone')} autoComplete="tel" /></Field>
            </div>
            <div className="form__row">
              <Field label="What are you interested in?">
                <select value={fields.interest} onChange={update('interest')}>
                  <option value="">Choose one (optional)</option>
                  {interests.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
              <Field label="Timeline">
                <select value={fields.timeline} onChange={update('timeline')}>
                  <option value="">Choose one (optional)</option>
                  {CONTACT_TIMELINES.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
            </div>
            <Field label="How can we help?" required error={errors.message}>
              <textarea rows={6} value={fields.message} onChange={update('message')} placeholder="What does your business do, what is slowing you down, and what would a good outcome look like?" required />
            </Field>
            <div className="form__foot">
              <Pill type="submit">Prepare email</Pill>
              <p className="form__hint">This opens your email app with your message ready to send to {COMPANY.email}. Nothing is stored on this website. See our <Link to="/privacy">privacy policy</Link>.</p>
            </div>
            {sent && (
              <p className="form__sent" role="status">
                Your email app should now be open with the message filled in; press send there to reach us. If nothing opened, email us directly at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
              </p>
            )}
          </form>

          <aside className="contact__side">
            <div className="glass contact__card" data-rv>
              <h2>Direct contact</h2>
              <ul className="contact__list">
                <li><Mail size={18} /><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
                {COMPANY.phone && <li><Phone size={18} /><a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}>{COMPANY.phone}</a></li>}
                {COMPANY.address && <li><MapPin size={18} /><span>{COMPANY.address}</span></li>}
                {COMPANY.hours && <li><Clock size={18} /><span>{COMPANY.hours}</span></li>}
              </ul>
              {COMPANY.socials.length > 0 && (
                <p className="contact__socials">{COMPANY.socials.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</p>
              )}
            </div>
            <div className="glass contact__card" data-rv>
              <h2>What happens next</h2>
              <ol className="contact__steps">
                <li><b>We read your message</b><span>and reply with questions or a time to talk.</span></li>
                <li><b>Discovery conversation</b><span>to understand your business, problem and goals.</span></li>
                <li><b>A clear proposal</b><span>with scope, approach and next steps in writing.</span></li>
              </ol>
            </div>
          </aside>
        </div>
      </Block>

      <Block label="Before you write" title="Common questions">
        <dl className="faq-list">
          {QUESTIONS.slice(0, 4).map((item) => <div key={item.q} className="glass" data-rv><dt>{item.q}</dt><dd>{item.a}</dd></div>)}
        </dl>
      </Block>
    </>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactElement<Record<string, unknown>> }) {
  const id = `f-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  const control = React.cloneElement(children, { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? `${id}-error` : undefined });
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {control}
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
